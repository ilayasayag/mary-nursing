/* Content validator: node tools/validate.js
   Loads every data file the way the browser does and checks structure, both languages,
   answer keys, length clues, image and audio files. Exits 1 on any error. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataFiles = [...html.matchAll(/<script src="(js\/data\/[^"?]+)/g)].map(m => m[1]);
dataFiles.forEach(f => (0, eval)(fs.readFileSync(path.join(root, f), 'utf8')));
const NX = window.NX;

const errors = [], warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);
const filled = x => typeof x === 'string' && x.trim().length > 0;
const pair = (where, x, what) => { if (!Array.isArray(x) || !filled(x[0]) || !filled(x[1])) err(where, `${what} needs [en, es]`); };
const imgOk = (where, n) => { if (!fs.existsSync(path.join(root, 'img', n + '.png'))) err(where, `missing image img/${n}.png`); };

/* questions */
const ids = new Set(), stems = new Map();
let longest = { n: 0, en: 0 };
for (const q of NX.qs) {
  const w = q.id;
  if (ids.has(w)) err(w, 'duplicate id'); ids.add(w);
  if (![1, 2, 3].includes(q.d)) err(w, 'difficulty must be 1-3');
  if (q.o.length !== 4) err(w, 'needs 4 options');
  if (!(q.a >= 0 && q.a < q.o.length)) err(w, 'answer index out of range');
  if (!filled(q.q.en) || !filled(q.q.es)) err(w, 'question text missing');
  if (!filled(q.w.en) || !filled(q.w.es)) err(w, 'explanation missing');
  q.o.forEach((o, k) => { if (!filled(o.en) || !filled(o.es)) err(w, `option ${k} missing text`); });
  if (new Set(q.o.map(o => o.en)).size !== q.o.length) err(w, 'duplicate options (en)');
  if (stems.has(q.q.en)) err(w, `same question as ${stems.get(q.q.en)}`); stems.set(q.q.en, w);
  if (q.m !== 'heb') {
    const c = q.o[q.a].en.length, d = q.o.filter((_, k) => k !== q.a).map(o => o.en.length), mx = Math.max(...d);
    longest.n++; if (c > mx) longest.en++;
    if (c > mx * 1.15 && c - mx > 4) (q.m === 'fund' ? warn : err)(w, `correct answer stands out by length (${c} vs ${mx})`);
  }
}

/* modules, lessons, vocab, audio */
for (const m of NX.modules) for (const [i, l] of m.lessons.entries()) {
  const w = `${m.id} lesson ${i}`;
  if (!filled(l.t.en) || !filled(l.t.es)) err(w, 'title missing');
  l.p.forEach((p, k) => { if (!filled(p.en) || !filled(p.es)) err(w, `paragraph ${k} missing a language`); });
  if (m.id !== 'heb' && !NX.qs.some(q => q.m === m.id && q.l === i)) err(w, 'lesson has no questions');
}
for (const v of NX.vocab) {
  if (!filled(v.he) || !filled(v.en) || !filled(v.es)) err(v.id, 'vocab needs he/en/es');
  const f = NX.audio && NX.audio[v.he];
  if (!f) warn(v.id, `no recorded audio for ${v.he}`);
  else if (!fs.existsSync(path.join(root, 'audio/he', f + '.m4a'))) err(v.id, `audio file ${f}.m4a missing`);
}

/* simulation ward */
for (const s of NX.sims || []) {
  imgOk(s.id, s.img); pair(s.id, s.t, 'title'); pair(s.id, s.ctx, 'context');
  s.steps.forEach((st, k) => {
    const w = `${s.id} step ${k}`;
    pair(w, st.s, 'situation');
    if (st.c.length !== 4) err(w, 'needs 4 choices');
    if (st.c.filter(c => c[0] === 2).length !== 1) err(w, 'needs exactly one best (2) choice');
    st.c.forEach((c, j) => { if (![2, 1, 0, -1].includes(c[0]) || c.slice(1).some(x => !filled(x))) err(w, `choice ${j} malformed`); });
    if (!st.v || st.v.hr === undefined) err(w, 'monitor values missing');
  });
}

/* games */
for (const [i, r] of (NX.triage || []).entries()) {
  const w = `triage ${i}`;
  if (r.p.length !== 4 || [...r.order].sort().join() !== '0,1,2,3') err(w, 'needs 4 patients and an order of 0-3');
  r.p.forEach(p => { imgOk(w, p[1]); pair(w, p[2], 'complaint'); });
  pair(w, r.why, 'why');
}
for (const [i, c] of (NX.medpass || []).entries()) {
  const w = `medpass ${i} (${c[0]})`;
  if (!['give', 'hold', 'clarify'].includes(c[3])) err(w, 'answer must be give/hold/clarify');
  pair(w, c[1], 'patient'); pair(w, c[4], 'why');
}
for (const r of NX.ranges || []) if (!(r[2] <= r[3] && r[4] < r[2] && r[3] <= r[5])) err(`range ${r[0]}`, 'needs min < lo ≤ hi ≤ max');
for (const [i, p] of (NX.pairs || []).entries()) if (p.slice(0, 4).some(x => !filled(x))) err(`pair ${i}`, 'needs 4 texts');

/* MSR stations */
const S = NX.stations || [], P = NX.procs || [], SB = NX.sbar || [], C = NX.calcs || [], T = NX.teach || [];
const sid = new Set();
for (const st of S) {
  const w = `station ${st.id}`;
  if (sid.has(st.id)) err(w, 'duplicate id'); sid.add(st.id);
  pair(w, st.t, 'title'); pair(w, st.door, 'door note'); imgOk(w, st.img);
  if (!(st.mins > 0)) err(w, 'needs minutes');
  if (st.sim && !(NX.sims || []).some(s => s.id === st.sim)) err(w, `unknown sim ${st.sim}`);
  if (st.proc && !P.some(p => p.id === st.proc)) err(w, `unknown procedure ${st.proc}`);
  if (st.sbar && !SB.some(p => p.id === st.sbar)) err(w, `unknown SBAR case ${st.sbar}`);
  if (st.teach && !T.some(p => p.id === st.teach)) err(w, `unknown teaching case ${st.teach}`);
  (st.calc || []).forEach(id => { if (!C.some(c => c.id === id)) err(w, `unknown calc ${id}`); });
  if (!['acute', 'med', 'comm', 'teach', 'proc', 'sbar'].includes(st.kind)) err(w, `unknown kind ${st.kind}`);
  if (st.kind === 'acute' && !st.sim) err(w, 'acute station needs a sim');
  if (['med', 'comm'].includes(st.kind) && !(st.steps || []).length) err(w, 'needs steps');
  if (!(st.dq || []).length && st.kind !== 'proc') warn(w, 'no debrief questions');
  (st.steps || []).forEach((x, k) => {
    if (x.calc) { if (!C.some(c => c.id === x.calc)) err(`${w} step ${k}`, `unknown calc ${x.calc}`); return; }
    pair(`${w} step ${k}`, x.s, 'situation');
    if (x.c.length !== 4 || x.c.filter(c => c[0] === 2).length !== 1) err(`${w} step ${k}`, 'needs 4 choices with one best');
    x.c.forEach((c, j) => { if (![2, 1, 0, -1].includes(c[0]) || c.slice(1).some(y => !filled(y))) err(`${w} step ${k}`, `choice ${j} malformed`); });
  });
  (st.dq || []).forEach((r, k) => {
    if (r.length !== 6 || r[2].length !== 4 || r[3].length !== 4 || !(r[0] >= 0 && r[0] < 4) || [r[1][0], r[1][1], r[4], r[5]].some(x => !filled(x))) err(`${w} debrief ${k}`, 'malformed');
  });
}
for (const p of P) {
  const w = `procedure ${p.id}`;
  pair(w, p.t, 'title'); imgOk(w, p.img);
  if (p.steps.length < 6) err(w, 'needs at least 6 steps');
  p.steps.forEach((s, k) => pair(`${w} step ${k}`, s, 'step'));
  (p.crit || []).forEach(k => { if (!p.steps[k]) err(w, `critical step ${k} does not exist`); });
  pair(w, p.src, 'source');
}
for (const c of SB) {
  const w = `sbar ${c.id}`; pair(w, c.t, 'title'); pair(w, c.ctx, 'context');
  c.items.forEach((it, k) => { if (!'SBARX'.includes(it[0]) || !filled(it[1]) || !filled(it[2])) err(`${w} item ${k}`, 'needs [S|B|A|R|X, en, es]'); });
  for (const L of 'SBAR') if (!c.items.some(it => it[0] === L)) err(w, `no ${L} statement`);
}
for (const c of C) {
  const w = `calc ${c.id}`; pair(w, c.q, 'question'); pair(w, c.how, 'working'); pair(w, c.unit, 'unit');
  if (typeof c.ans !== 'number' || !(c.tol >= 0)) err(w, 'needs numeric answer and tolerance');
}
for (const c of T) {
  const w = `teach ${c.id}`; pair(w, c.t, 'title'); pair(w, c.ctx, 'context');
  if (c.pts.filter(p => p[0]).length < 3 || c.pts.filter(p => !p[0]).length < 2) err(w, 'needs ≥3 key points and ≥2 wrong ones');
  if (c.back.length !== 4 || c.back.filter(b => b[0] === 2).length !== 1) err(w, 'teach-back needs 4 choices with one best');
}

/* length clue in scored choices (stations, debriefs, Simulation Ward, teach-back) */
const clue = (w, texts, best) => { const c = texts[best].length, d = texts.filter((_, k) => k !== best).map(x => x.length), mx = Math.max(...d);
  if (c > mx * 1.15 && c - mx > 4) err(w, `best choice stands out by length (${c} vs ${mx})`); };
const both = (w, ch, best) => { clue(w + ' (en)', ch.map(c => c[1]), best); clue(w + ' (es)', ch.map(c => c[2]), best); };
for (const s of NX.sims || []) s.steps.forEach((st, k) => both(`sim ${s.id} step ${k}`, st.c, st.c.findIndex(c => c[0] === 2)));
for (const st of S) {
  (st.steps || []).forEach((x, k) => { if (!x.calc) both(`station ${st.id} step ${k}`, x.c, x.c.findIndex(c => c[0] === 2)); });
  (st.dq || []).forEach((r, k) => { clue(`station ${st.id} debrief ${k} (en)`, r[2], r[0]); clue(`station ${st.id} debrief ${k} (es)`, r[3], r[0]); });
}
for (const c of T) both(`teach ${c.id} teach-back`, c.back, c.back.findIndex(b => b[0] === 2));

/* report */
const pct = longest.n ? Math.round(100 * longest.en / longest.n) : 0;
console.log(`questions ${NX.qs.length} · sims ${(NX.sims || []).length} · stations ${S.length} · procedures ${P.length} · SBAR ${SB.length} · calcs ${C.length} · teaching ${T.length}`);
console.log(`correct answer is the longest option in ${pct}% of exam questions (chance 25%)`);
warnings.forEach(x => console.log('warn ', x));
errors.forEach(x => console.log('ERROR', x));
console.log(errors.length ? `${errors.length} errors` : 'all checks passed');
process.exitCode = errors.length ? 1 : 0;
