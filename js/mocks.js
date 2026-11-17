/* lev. Unit 9: mock tests in the official format (Ministry of Health briefing, 24.10.2026) and the cheat sheets.
   A mock runs stations 1-4 through the station engine (15 minutes each), then the timed knowledge test
   (30 questions in 15 minutes, no feedback until the end), then feedback that joins this mock with
   Mary's whole progress. Pass mark 60, all five stations combined (equal weights: the Ministry does not
   publish the weighting). Papers 1-3 are fixed; mock 4 is built from her weakest and untried areas. */
(window.LEV_EXT = window.LEV_EXT || []).push(LEV => {
  'use strict';
  const { R, view, img, esc, shuffle, L, L2, SFX, touch, stat, confetti, mascot, countUp, chips, save, modById } = LEV;
  const S = () => LEV.state();
  const $ = s => document.querySelector(s);
  const A = window.A;
  const es = () => S().lang === 'es';
  const T = (en, sp) => es() ? sp : en;
  const PASS = 60, KMIN = 15;
  const TOPICS = [['psych', 7], ['pharm', 8], ['law', 8], ['calc', 7]];
  const stById = id => NX.stations.find(s => s.id === id);
  const mockById = n => NX.mocks.find(m => m.id === +n);
  const rec = id => (S().stations || {})[id];
  const pctOf = m => { const s = (S().stats || {})[m]; return s && s.n ? Math.round(100 * s.ok / s.n) : null; };
  const best = n => S().best['mx' + n] || 0;
  const page = m => /^notes\.\d$/.test(m) ? +m.slice(6) : -1; /* 'notes.3' = page 3 of Mary's notebook */
  const topicLabel = m => m === 'calc' ? T('Calculations', 'Cálculos') : page(m) > -1 ? L(modById('notes').lessons[page(m)].t) : L(modById(m).title);
  const topicImg = m => m === 'calc' ? 'calc' : page(m) > -1 ? 'notes' : m;
  const daysLeft = () => Math.ceil((new Date('2026-11-18T08:00:00') - Date.now()) / 864e5);
  const tone = p => p === null ? 'none' : p >= 85 ? 'good' : p >= 70 ? 'meh' : 'bad';

  /* each paper serves questions she has not answered yet (LEV.fresh: unseen first, random within a tie); calculations
     are generated fresh with new numbers every time, plus the least-seen bedside problems */
  const rng = seed => () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const seeded = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const r2 = x => Math.round(x * 100) / 100, r1 = x => Math.round(x * 10) / 10;
  const fmt = x => String(r2(x)).replace('.', es() ? ',' : '.');
  const seenN = id => (S().seen || {})[id] || 0;
  /* options: the answer plus three classic slips (wrong formula, inverted ratio, decimal shift), all distinct */
  function choices(ans, slips, unit, r) {
    const wrong = [...new Set([...slips, ans * 10, ans / 2, ans * 2].map(r2))].filter(x => x > 0 && x !== r2(ans)).slice(0, 3);
    const vals = seeded([r2(ans), ...wrong], r);
    return { o: vals.map(x => `${fmt(x)} ${L2(unit)}`), a: vals.indexOf(r2(ans)) };
  }
  function calcQ(c, r) {
    return Object.assign({ m: 'calc', id: 'calc:' + c.id, q: L2(c.q), w: L2(c.how) }, choices(c.ans, [c.ans / 10], c.unit, r));
  }
  const one = a => a[Math.floor(Math.random() * a.length)];
  const ML = ['mL', 'mL'];
  const GEN = [
    () => { const [d, s, conc, doses] = one([['Furosemide', 'Furosemida', 10, [20, 40, 60]], ['Ondansetron', 'Ondansetrón', 2, [4, 8]], ['Metoclopramide', 'Metoclopramida', 5, [5, 10]], ['Morphine', 'Morfina', 10, [2, 3, 4, 5]], ['Gentamicin', 'Gentamicina', 40, [80, 120, 160]]]), dose = one(doses), ans = dose / conc;
      return { q: [`${d} ${dose} mg IV is ordered. The ampoule holds ${conc} mg/mL. How many mL do you draw up?`, `Se pauta ${s} ${dose} mg IV. La ampolla tiene ${conc} mg/mL. ¿Cuántos mL cargas?`], ans, slips: [conc / dose, dose * conc], unit: ML,
        how: [`${dose} ÷ ${conc} × 1 mL = ${fmt(ans)} mL.`, `${dose} ÷ ${conc} × 1 mL = ${fmt(ans)} mL.`] }; },
    () => { const [d, s, tab] = one([['Metoprolol', 'Metoprolol', 25], ['Warfarin', 'Warfarina', 5], ['Prednisone', 'Prednisona', 5], ['Furosemide', 'Furosemida', 40]]), mult = one([0.5, 1.5, 2, 3]), dose = tab * mult;
      return { q: [`${d} ${fmt(dose)} mg by mouth is ordered. Scored tablets are ${tab} mg. How many tablets?`, `Se pauta ${s} ${fmt(dose)} mg oral. Los comprimidos ranurados son de ${tab} mg. ¿Cuántos comprimidos?`], ans: mult, slips: [tab / dose, mult + 1], unit: ['tablets', 'comprimidos'],
        how: [`${fmt(dose)} ÷ ${tab} = ${fmt(mult)} tablet(s).`, `${fmt(dose)} ÷ ${tab} = ${fmt(mult)} comprimido(s).`] }; },
    () => { const [vol, h] = one([[1000, 8], [1000, 6], [1000, 12], [500, 4], [500, 6], [250, 2], [100, 0.5], [1000, 10]]), ans = r1(vol / h);
      return { q: [`${vol} mL of IV fluid over ${fmt(h)} hours by infusion pump. Rate in mL/h?`, `${vol} mL de suero IV en ${fmt(h)} horas con bomba. ¿Ritmo en mL/h?`], ans, slips: [r1(vol / (h * 60)), r1(vol / h / 2)], unit: ['mL/h', 'mL/h'],
        how: [`${vol} ÷ ${fmt(h)} h = ${fmt(ans)} mL/h.`, `${vol} ÷ ${fmt(h)} h = ${fmt(ans)} mL/h.`] }; },
    () => { const [vol, h] = one([[1000, 8], [500, 4], [1000, 6], [250, 2], [500, 6]]), df = one([20, 15, 10]), ans = Math.round(vol * df / (h * 60));
      return { q: [`${vol} mL over ${h} hours by gravity. The set delivers ${df} drops/mL. Drops per minute?`, `${vol} mL en ${h} horas por gravedad. El equipo da ${df} gotas/mL. ¿Gotas por minuto?`], ans, slips: [Math.round(vol / (h * 60)), Math.round(vol * df / h / 10)], unit: ['drops/min', 'gotas/min'],
        how: [`${vol} × ${df} ÷ ${h * 60} min = ${ans} drops/min (rounded).`, `${vol} × ${df} ÷ ${h * 60} min = ${ans} gotas/min (redondeado).`] }; },
    () => { const [d, s, perKg, mg, per] = one([['Paracetamol', 'Paracetamol', 15, 120, 5], ['Ibuprofen', 'Ibuprofeno', 10, 100, 5]]), kg = 8 + Math.floor(Math.random() * 17), dose = perKg * kg, ans = r1(dose / mg * per);
      return { q: [`${d} ${perKg} mg/kg for a ${kg} kg child. The syrup is ${mg} mg/${per} mL. How many mL?`, `${s} ${perKg} mg/kg para un niño de ${kg} kg. El jarabe es de ${mg} mg/${per} mL. ¿Cuántos mL?`], ans, slips: [r1(dose / mg), dose / 10], unit: ML,
        how: [`${perKg} × ${kg} = ${dose} mg. ${dose} ÷ ${mg} × ${per} mL = ${fmt(ans)} mL.`, `${perKg} × ${kg} = ${dose} mg. ${dose} ÷ ${mg} × ${per} mL = ${fmt(ans)} mL.`] }; },
    () => { const [units, bag] = one([[25000, 500], [25000, 250]]), per = units / bag, order = one([800, 1000, 1200, 1500]), ans = r1(order / per);
      return { q: [`Heparin ${units.toLocaleString('en')} units in ${bag} mL. The order is ${order} units/h. Pump rate in mL/h?`, `Heparina ${units.toLocaleString('es')} unidades en ${bag} mL. La orden es ${order} unidades/h. ¿Ritmo en mL/h?`], ans, slips: [r1(per / order * 100), r1(order / units * 100)], unit: ['mL/h', 'mL/h'],
        how: [`${units} ÷ ${bag} = ${per} units/mL. ${order} ÷ ${per} = ${fmt(ans)} mL/h.`, `${units} ÷ ${bag} = ${per} unidades/mL. ${order} ÷ ${per} = ${fmt(ans)} mL/h.`] }; },
    () => { const dose = one([3, 5, 8, 10]), kg = 50 + 5 * Math.floor(Math.random() * 9), ans = r1(dose * kg * 60 / 1600);
      return { q: [`Dopamine 400 mg in 250 mL. The order is ${dose} mcg/kg/min for a ${kg} kg patient. Pump rate in mL/h?`, `Dopamina 400 mg en 250 mL. La orden es ${dose} mcg/kg/min para un paciente de ${kg} kg. ¿Ritmo en mL/h?`], ans, slips: [r2(dose * kg / 1600), r1(dose * 60 / 1600 * 10)], unit: ['mL/h', 'mL/h'],
        how: [`400 mg ÷ 250 mL = 1600 mcg/mL. ${dose} × ${kg} × 60 ÷ 1600 = ${fmt(ans)} mL/h.`, `400 mg ÷ 250 mL = 1600 mcg/mL. ${dose} × ${kg} × 60 ÷ 1600 = ${fmt(ans)} mL/h.`] }; }
  ];
  function genQ(r, hard) { const g = one(hard ? GEN.slice(3) : GEN)(); return Object.assign({ m: 'calc', id: '', gen: true, q: L2(g.q), w: L2(g.how) }, choices(g.ans, g.slips, g.unit, r)); }
  function bankQ(q, r) {
    const ord = seeded(q.o.map((_, k) => k), r);
    return { m: q.m, tp: q.pg !== undefined ? 'notes.' + q.pg : undefined, id: q.id, q: L(q.q), o: ord.map(k => L(q.o[k])), a: ord.indexOf(q.a), w: L(q.w) };
  }
  const poolOf = m => m === 'calc' ? NX.calcs.map(c => Object.assign({}, c, { id: 'calc:' + c.id, raw: c })) : NX.qs.filter(q => q.m === m);
  /* k questions of topic m: unseen first; calculations are mostly generated */
  function topicItems(m, k, r, first = []) {
    if (m === 'calc') { const gen = Math.ceil(k * 0.6); return [...Array(gen)].map(() => genQ(r)).concat(LEV.fresh(poolOf('calc')).slice(0, k - gen).map(c => calcQ(c.raw, r))); }
    const pool = LEV.fresh(poolOf(m)).sort((a, b) => (first.includes(b.id) ? 1 : 0) - (first.includes(a.id) ? 1 : 0) || seenN(a.id) - seenN(b.id));
    return pool.slice(0, k).map(q => bankQ(q, r));
  }
  /* Mock 7: only hard (level 3) questions, unseen first, plus select-all items scored all-or-nothing, and the harder calculations */
  function sataQ(x, r) { const ord = seeded(x.o.map((_, k) => k), r);
    return { m: x.m, id: 'sata:' + x.id, multi: true, q: L2(x.q), o: ord.map(k => L2([x.o[k][0], x.o[k][1]])), ans: ord.map((k, i) => x.o[k][2] ? i : -1).filter(i => i > -1), w: L2(x.w) }; }
  function hardPaper() {
    const r = rng(Date.now() % 100000), hardOf = m => LEV.fresh(NX.qs.filter(q => q.m === m && q.d === 3));
    const sata = LEV.fresh((NX.sata || []).map(x => Object.assign({}, x, { id: 'sata:' + x.id, raw: x }))).slice(0, 6).map(x => sataQ(x.raw, r));
    return shuffle([...sata, ...hardOf('psych').slice(0, 6), ...hardOf('pharm').slice(0, 6), ...hardOf('law').slice(0, 5)].map(q => q.multi ? q : bankQ(q, r)).concat([...Array(7)].map(() => genQ(r, true))));
  }
  const kMin = n => (mockById(n) || {}).hard ? 12 : KMIN;
  /* Mock 8: 30 questions from her notebook, spread over the 8 pages; on each page her past mistakes first,
     then the exam questions she has not seen (not the ones from the lessons), then the least seen */
  const NOTES_N = [4, 4, 4, 4, 4, 4, 3, 3];
  function notesPaper() {
    const r = rng(Date.now() % 100000), wrong = S().wrong || [];
    const rank = q => (wrong.includes(q.id) ? 0 : 3) + (seenN(q.id) ? 1 : 0) + (q.l === undefined ? 0 : 1);
    return shuffle(NOTES_N.flatMap((k, pg) => shuffle(NX.qs.filter(q => q.m === 'notes' && q.pg === pg)).sort((a, b) => rank(a) - rank(b) || seenN(a.id) - seenN(b.id)).slice(0, k).map(q => bankQ(q, r))));
  }
  function paper(n) {
    if ((mockById(n) || {}).notes) return notesPaper();
    if ((mockById(n) || {}).hard) return hardPaper();
    if (n === 4) return focusPaper();
    const r = rng(Date.now() % 100000);
    return shuffle(TOPICS.flatMap(([m, k]) => topicItems(m, k, r)));
  }
  /* mock 4: more questions from her weaker topics; unseen first, then her past mistakes */
  function focusPaper() {
    const acc = { psych: pctOf('psych'), pharm: pctOf('pharm'), law: pctOf('law'), calc: S().best.calc ? Math.round(100 * S().best.calc / 8) : null };
    const gap = m => Math.max(5, 100 - (acc[m] === null ? 70 : acc[m]));
    const tot = TOPICS.reduce((a, [m]) => a + gap(m), 0);
    const counts = TOPICS.map(([m]) => [m, 5 + Math.round(10 * gap(m) / tot)]);
    while (counts.reduce((a, c) => a + c[1], 0) > 30) counts.sort((a, b) => b[1] - a[1])[0][1]--;
    while (counts.reduce((a, c) => a + c[1], 0) < 30) counts.sort((a, b) => gap(b[0]) - gap(a[0]))[0][1]++;
    const r = rng(Date.now() % 100000), wrong = S().wrong || [];
    return shuffle(counts.flatMap(([m, k]) => topicItems(m, k, r, wrong)));
  }
  /* mock 4 stations: in each slot, the station she has not tried yet, else her lowest score */
  function idsFor(n) {
    const mk = mockById(n); if (!mk.focus) return mk.st.slice();
    return NX.mockSlots.slice(0, 4).map((slot, i) => {
      const score = id => { const x = rec(id); return x ? (x.pass ? 100 + x.best : x.best) : -1; };
      return slot.ids.slice().sort((a, b) => score(a) - score(b))[0] || mk.st[i];
    });
  }

  /* where she stands, per station of the real exam, from everything she has practised */
  function readiness() {
    const avg = xs => { const v = xs.filter(x => x !== null && x !== undefined); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null; };
    const stP = i => NX.mockSlots[i].ids.map(id => rec(id) ? rec(id).best : null);
    const untried = i => NX.mockSlots[i].ids.filter(id => !rec(id)).length;
    return [
      { p: avg([pctOf('medsurg'), pctOf('emerg'), ...stP(0)]), n: untried(0) },
      { p: avg([pctOf('medsurg'), ...stP(1)]), n: untried(1) },
      { p: avg([pctOf('peds'), ...stP(2)]), n: untried(2) },
      { p: avg([pctOf('mat'), ...stP(3)]), n: untried(3) },
      { p: avg([pctOf('psych'), pctOf('pharm'), pctOf('law'), S().best.calc ? Math.round(100 * S().best.calc / 8) : null]), n: 0 }
    ];
  }
  const bars = () => document.querySelectorAll('[data-w]').forEach((el, i) => setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 120 + i * 70));

  /* ---------- hub ---------- */
  const hubDrill = () => { const n = allCards().length;
    return n ? `<button class="btn green wide mx-drillall" onclick="A.go('#/mockdrill/all')">🎯 ${T(`Practise all my mistakes (${n})`, `Practicar todos mis errores (${n})`)}<small>${T('from every mock and every quiz: only what you got wrong', 'de todos los exámenes y tests: solo lo que fallaste')}</small></button>` : ''; };
  R.mocks = () => {
    const rd = readiness(), dl = daysLeft();
    const focusIds = idsFor(4);
    view(`<a class="crumb" href="#/">← ${T('Unit 9', 'Unidad 9')}</a>
      <section class="card mx-hero"><div class="mx-hero-txt"><small>${dl > 0 ? `${dl} ${T('days to go', 'días')} · ` : ''}18.11.2026 · MSR</small><h1>${T('Mock tests', 'Exámenes de prueba')}</h1>
        <p>${T('Built like the real exam: 5 stations of 15 minutes, an interpreter in each, pass at 60. Every retake brings knowledge-test questions you have not seen yet.', 'Como el examen real: 5 estaciones de 15 minutos, intérprete en cada una, aprobado con 60. Cada vez que repites, la prueba de conocimientos trae preguntas que aún no has visto.')}</p></div>${mascot('happy', 'big bounce')}
        <div class="mx-format">${NX.mockSlots.map((s, i) => `<div class="mx-slot" style="--d:${i * 90}ms"><b>${i + 1}</b>${img(s.icon)}<small>${esc(L2(s.t))}</small></div>`).join('')}</div></section>
      <h2 class="sec">${img('target')} ${T('Where you stand', 'Dónde estás')}</h2>
      <section class="card mx-ready"><p class="fine">${T('From all your practice so far: lessons, quizzes and stations in each area.', 'De toda tu práctica hasta ahora: lecciones, tests y estaciones de cada área.')}</p>
        ${rd.map((r, i) => `<div class="mx-rrow ${tone(r.p)}">${img(NX.mockSlots[i].icon)}<span>${i + 1} · ${esc(L2(NX.mockSlots[i].t))}${r.n ? `<em>${r.n} ${T('new to try', 'por probar')}</em>` : ''}</span>
          <div class="mx-bar"><i data-w="${r.p || 0}"></i></div><b>${r.p === null ? '–' : r.p + '%'}</b></div>`).join('')}</section>
      <h2 class="sec">${img('trophy')} ${T(`Your ${NX.mocks.length} mock tests`, `Tus ${NX.mocks.length} exámenes de prueba`)}</h2>
      <div class="mx-papers">${NX.mocks.map((m, i) => { const b = best(m.id), ids = m.focus ? focusIds : m.st;
        return `<a class="card mx-paper tilt ${m.focus ? 'focus' : ''} ${m.fresh ? 'fresh' : ''} ${m.hard ? 'hard' : ''}" href="#/mocktest/${m.id}" style="--d:${i * 80}ms">${(m.fresh || m.hard) && !b ? `<span class="mx-newtag">${m.hard ? T('HARD', 'DIFÍCIL') : m.notes ? T('FINAL', 'FINAL') : T('NEW', 'NUEVO')}</span>` : ''}
          <div class="mx-paper-top"><span class="mx-num">${m.focus ? '★' : m.hard ? '🔥' : m.notes ? '📓' : m.id}</span><div><h3>${esc(L2(m.t))}</h3><small>${m.focus ? T('Your weakest and untried areas', 'Tus áreas más débiles y sin probar') : m.notes ? T('Your notebook · 5 stations · 75 min', 'Tu cuaderno · 5 estaciones · 75 min') : m.hard ? T('No options · self-scored · 12-min test', 'Sin opciones · autoevaluado · prueba de 12 min') : m.fresh ? T('New cases · 5 stations · 75 min', 'Casos nuevos · 5 estaciones · 75 min') : T('5 stations · 75 minutes', '5 estaciones · 75 minutos')}</small></div></div>
          <div class="mx-icons">${ids.map(id => img(stById(id).img)).join('')}${img('clipboard')}</div>
          ${b ? `<span class="mx-stamp mini ${b >= PASS ? 'pass' : 'fail'}">${b >= PASS ? T('PASS', 'APROBADO') : T('NOT YET', 'AÚN NO')} · ${b}%</span><span class="mx-retake">↻ ${T('Retake: new questions', 'Repetir: preguntas nuevas')}</span>` : `<span class="mx-go">${T('Start', 'Empezar')} →</span>`}</a>`; }).join('')}</div>
      ${NX.mocks.some(m => (S().mockReview || {})[m.id] || best(m.id)) ? `<h2 class="sec">${img('review')} ${T('Review your mistakes', 'Revisa tus errores')}</h2>${hubDrill()}<div class="mx-rv-list">${NX.mocks.filter(m => (S().mockReview || {})[m.id] || best(m.id)).map(m => { const rv = (S().mockReview || {})[m.id];
        if (!rv) return `<a class="card mx-rv-link old tilt" href="#/mockreview/${m.id}"><span class="mx-num">${m.focus ? '★' : m.id}</span><div><b>${esc(L2(m.t))}</b><small>${best(m.id)}/100 · ${T('taken before mistakes were saved', 'hecho antes de guardar los errores')}</small></div><em>${T('why?', '¿por qué?')} →</em></a>`;
        return `<a class="card mx-rv-link tilt" href="#/mockreview/${m.id}"><span class="mx-num">${m.focus ? '★' : m.id}</span><div><b>${esc(L2(m.t))}</b><small>${rv.d.split('-').reverse().slice(0, 2).join('.')} · ${rv.total}/100</small></div><em>${missCount(rv)} ${T('to review', 'por revisar')} →</em></a>`; }).join('')}</div>` : ''}
      <a class="card mx-cheat-cta tilt" href="#/cheats">${img('bulb', 'wiggle')}<div><b>${T('Cheat sheets', 'Chuletas')}</b><span>${T('The numbers and rules to read right before the exam', 'Las cifras y reglas para leer justo antes del examen')}</span></div><span class="go">→</span></a>`);
    bars();
  };

  /* ---------- one mock ---------- */
  let MX = null, K = null, KT = 0;
  const track = k => `<span class="mx-track">${[1, 2, 3, 4, 5].map(i => `<i class="${i < k ? 'done' : i === k ? 'cur' : ''}">${i}</i>`).join('')}</span>`;
  const crumb = k => `<span class="crumb mx-crumb">${img('trophy')} ${esc(L2(mockById(MX.n).t))} ${track(k)}</span>`;
  R.mocktest = n => {
    clearInterval(KT); const mk = mockById(n); if (!mk) return R.mocks();
    const ids = idsFor(mk.id), b = best(mk.id);
    view(`<a class="crumb" href="#/mocks">← ${T('Mock tests', 'Exámenes de prueba')}</a>
      <section class="card center-card mx-intro">${img('trophy', 'head-img float')}<h1>${esc(L2(mk.t))}</h1>
        ${mk.hard ? `<p class="mx-hardnote">🔥 ${T('The hardest mock. In the patient stations there are no options: you say (or type) what you would do, then see the model answer and score yourself honestly, the way an examiner would. Miss an action and the patient gets worse. The knowledge test has only hard questions, some “select all that apply”, in 12 minutes.', 'El examen más difícil. En las estaciones no hay opciones: dices (o escribes) lo que harías, ves la respuesta modelo y te puntúas con honestidad, como un examinador. Si omites una acción, el paciente empeora. La prueba de conocimientos solo tiene preguntas difíciles, algunas de “marca todas las correctas”, en 12 minutos.')}</p>` : ''}
        ${mk.notes ? `<p class="mx-notesnote">📓 ${T('Built from your own notebook. The stations match your pages: COPD and oxygen targets, low calcium after thyroid surgery, a febrile seizure, and preeclampsia on magnesium. The test asks about every page, your past mistakes first.', 'Hecho con tu propio cuaderno. Las estaciones encajan con tus páginas: EPOC y objetivo de oxígeno, calcio bajo tras cirugía de tiroides, una convulsión febril y preeclampsia con magnesio. La prueba pregunta por cada página, primero tus errores anteriores.')}</p>` : ''}
        ${mk.focus ? `<p>${T('Built from your progress: in each area, the station you have not tried yet or scored lowest on, and more questions from your weaker topics.', 'Hecho con tu progreso: en cada área, la estación que aún no probaste o con menor nota, y más preguntas de tus temas más flojos.')}</p>` : ''}
        <ol class="mx-plan">${ids.map((id, i) => `<li style="--d:${i * 70}ms">${img(stById(id).img)}<div><b>${i + 1} · ${esc(L2(NX.mockSlots[i].t))}</b><small>15 min · ${esc(L2(LEV.stationKind(stById(id).kind)))}</small></div></li>`).join('')}
          <li style="--d:280ms">${img('clipboard')}<div><b>5 · ${T('Knowledge test', 'Prueba de conocimientos')}</b><small>${mk.hard ? T('30 hard questions · 12 min · incl. select-all', '30 preguntas difíciles · 12 min · con selección múltiple') + ' · ' : ''}${mk.notes ? T('30 questions from your 7 notebook pages · 15 min', '30 preguntas de las 7 páginas de tu cuaderno · 15 min') : T('30 questions · 15 min · mental health, pharmacology, laws, calculations', '30 preguntas · 15 min · salud mental, farmacología, leyes, cálculos')}</small></div></li></ol>
        <ul class="rules">${[T('Read each case first, as you will in your own language on the day.', 'Lee primero cada caso, como harás en tu idioma el día del examen.'), T('Think aloud: hand hygiene, identification, every check.', 'Piensa en voz alta: higiene de manos, identificación, cada comprobación.'), T('Station 5 shows no answers until the end, like the real test.', 'La estación 5 no muestra respuestas hasta el final, como la prueba real.'), T('Pass at 60, all five stations combined.', 'Se aprueba con 60, las cinco estaciones combinadas.')].map(x => `<li>${x}</li>`).join('')}</ul>
        ${b ? `<p class="chip">${T('best so far', 'tu mejor nota')}: ${b}%</p>` : ''}
        <button class="btn green big" onclick="A.mxStart(${mk.id})">${T('Start the mock test', 'Empezar el examen')} 🏁</button></section>`);
  };
  A.mxStart = n => { MX = { n: +n, ids: idsFor(+n), k: 0, res: [], start: Date.now() }; K = null; SFX.pop(); door(); };
  function door() {
    if (MX.k === 4) return kIntro();
    const st = stById(MX.ids[MX.k]), slot = NX.mockSlots[MX.k];
    view(`${crumb(MX.k + 1)}<section class="card door-card mx-door pop"><div class="mx-door-num">${MX.k + 1}</div>
      <div class="door-sign">${img(st.img)}<div><small>${esc(L2(slot.t))} · 15 min</small><h2>${esc(L2(st.t))}</h2></div></div>
      <p class="mx-interp"><span>🗣️</span>${T('Your interpreter is with you. Read the case, put on the uniform, then knock.', 'Tu intérprete está contigo. Lee el caso, ponte el uniforme y llama a la puerta.')}</p>
      <p class="door-note">${chips(esc(L2(st.door)))}</p>
      <button class="btn green big" onclick="A.mxEnter()">${T('Knock and enter', 'Llamar y entrar')} 🚪</button></section>`);
  }
  A.mxEnter = () => {
    const st = stById(MX.ids[MX.k]), k = MX.k;
    LEV.runStation(Object.assign({}, st, { mins: 15 }), {
      crumb: crumb(k + 1), next: k < 3 ? T('Next station', 'Siguiente estación') : T('Station 5: knowledge test', 'Estación 5: prueba de conocimientos'),
      exam: true, open: !!mockById(MX.n).hard, onResult: r => { if (MX) MX.res[k] = r; }, onNext: () => { if (!MX) return R.mocks(); MX.k = k + 1; door(); } });
  };

  /* ---------- station 5: 30 questions, 15 minutes ---------- */
  function kIntro() {
    view(`${crumb(5)}<section class="card door-card mx-door pop"><div class="mx-door-num">5</div>
      <div class="door-sign">${img('clipboard')}<div><small>${T('Knowledge test', 'Prueba de conocimientos')} · ${kMin(MX.n)} min</small><h2>${mockById(MX.n).hard ? T('30 hard questions', '30 preguntas difíciles') : mockById(MX.n).notes ? T('30 questions from your notes', '30 preguntas de tus notas') : T('30 questions', '30 preguntas')}</h2></div></div>
      <div class="mx-topics">${(mockById(MX.n).notes ? NOTES_N.map((_, pg) => 'notes.' + pg) : TOPICS.map(([m]) => m)).map(m => `<span>${img(topicImg(m))}${esc(topicLabel(m))}</span>`).join('')}</div>
      <p class="mx-interp"><span>⏱️</span>${mockById(MX.n).hard ? T('24 seconds each. Some say “select all that apply”: all the right ones and no wrong one, or it counts as wrong.', '24 segundos cada una. Algunas dicen “marca todas las correctas”: todas las correctas y ninguna incorrecta, o cuenta como fallo.') : T('About 30 seconds each. Answer every question; you will see the answers at the end.', 'Unos 30 segundos cada una. Responde todas; verás las respuestas al final.')}</p>
      <button class="btn green big" onclick="A.mxKStart()">${T('Start the test', 'Empezar la prueba')} ✍️</button></section>`);
  }
  A.mxKStart = () => { K = { qs: paper(MX.n), i: 0, ans: [], min: kMin(MX.n), deadline: Date.now() + kMin(MX.n) * 60000 }; clearInterval(KT); KT = setInterval(tickK, 1000); drawK(); };
  const RING = 2 * Math.PI * 19;
  function tickK() {
    const el = $('#kclock'); if (!K || !el) { clearInterval(KT); K = null; return; }
    const left = Math.max(0, K.deadline - Date.now());
    el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
    const ring = $('#kring'); if (ring) { ring.style.strokeDashoffset = RING * (1 - left / (K.min * 60000)); ring.classList.toggle('low', left < 120000); }
    if (!left) { clearInterval(KT); SFX.no(); finishK(true); }
  }
  function drawK() {
    const q = K.qs[K.i], n = K.qs.length;
    view(`${crumb(5)}<section class="card mxk" id="mxk">
      <div class="mxk-top"><div class="mx-ring"><svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="19"/><circle class="fg" id="kring" cx="22" cy="22" r="19" style="stroke-dasharray:${RING}"/></svg><b id="kclock"></b></div>
        <div class="mxk-dots">${K.qs.map((_, k) => `<i class="${k === K.i ? 'cur' : K.ans[k] !== undefined ? 'done' : k < K.i ? 'skip' : ''}"></i>`).join('')}</div><span class="chip">${K.i + 1}/${n}</span></div>
      <div class="mxk-card pop"><span class="mxk-topic">${img(topicImg(q.m))}${esc(topicLabel(q.m))}${q.gen || !seenN(q.id) ? `<em class="mxk-new">${T('new', 'nueva')}</em>` : ''}</span>
        <p class="mxk-q">${chips(esc(q.q))}</p>${q.multi ? `<p class="mxk-multi">☑️ ${T('Select all that apply', 'Marca todas las correctas')}</p>` : ''}
        <div class="choices ${q.multi ? 'multi' : ''}">${q.o.map((o, k) => `<button class="choice ${picked(K.i, k) ? 'sel' : ''}" data-k="${k}" onclick="A.mxPick(${k})"><kbd>${k + 1}</kbd><span>${chips(esc(o))}</span></button>`).join('')}</div></div>
      <div class="row mxk-foot">${K.i ? `<button class="btn ghost" onclick="A.mxPrevQ()">← ${T('Back', 'Atrás')}</button>` : ''}<button class="btn green" onclick="A.mxNextQ()">${K.i + 1 < n ? T('Next', 'Siguiente') : T('Finish', 'Terminar')} →</button></div></section>`);
    tickK();
  }
  const picked = (i, k) => Array.isArray(K.ans[i]) ? K.ans[i].includes(k) : K.ans[i] === k;
  const isRight = (q, a) => q.multi ? Array.isArray(a) && a.length === q.ans.length && q.ans.every(k => a.includes(k)) : a === q.a;
  A.mxPick = k => { if (!K) return; const q = K.qs[K.i];
    if (q.multi) { const a = Array.isArray(K.ans[K.i]) ? K.ans[K.i] : []; K.ans[K.i] = a.includes(k) ? a.filter(x => x !== k) : a.concat(k); if (!K.ans[K.i].length) K.ans[K.i] = undefined; }
    else K.ans[K.i] = k;
    SFX.tap(); document.querySelectorAll('#mxk .choice').forEach(b => b.classList.toggle('sel', picked(K.i, +b.dataset.k))); };
  A.mxPrevQ = () => { if (!K || !K.i) return; K.i--; drawK(); };
  A.mxNextQ = () => {
    if (!K) return;
    if (K.i + 1 < K.qs.length) { K.i++; return drawK(); }
    const blank = K.qs.filter((_, k) => K.ans[k] === undefined).length;
    if (blank && !confirm(T(`${blank} question(s) without an answer. Finish anyway?`, `${blank} pregunta(s) sin responder. ¿Terminar igualmente?`))) return;
    clearInterval(KT); finishK(false);
  };
  function finishK(timeUp) {
    const by = {}, wrong = [];
    K.qs.forEach((q, k) => {
      const ok = isRight(q, K.ans[k]), key = q.tp || q.m, b = by[key] || (by[key] = [0, 0]); b[1]++; if (ok) b[0]++;
      if (q.id) LEV.markSeen(q.id);
      if (q.m !== 'calc' && !q.multi) { stat(q.m, ok); const w = S().wrong, i = w.indexOf(q.id); if (ok && i > -1) w.splice(i, 1); if (!ok && i < 0) w.push(q.id); }
      if (!ok) wrong.push({ q, pick: K.ans[k] });
    });
    const okN = K.qs.filter((q, k) => isRight(q, K.ans[k])).length;
    MX.k5 = { pct: Math.round(100 * okN / K.qs.length), ok: okN, n: K.qs.length, by, wrong, timeUp };
    K = null; results();
  }

  /* ---------- results and feedback ---------- */
  /* the weakest of each kind, so this mock, station 5 and her whole progress all get a say */
  const rvNow = () => (S().mockReview || {})[MX.n] || { st: [], k5: { miss: [] } };
  const drillN = id => { const x = rvNow().st.find(y => y.id === id); return x ? drillable(x) : 0; };
  const wrongIn = m => S().wrong.filter(id => (NX.qs.find(q => q.id === id) || {}).m === m).length;
  function focusList() {
    const st = MX.res.filter(r => r && (r.crit.length || r.pct < 70 || r.timeUp)).sort((a, b) => a.pct - b.pct).slice(0, 3)
      .map(r => { const s = stById(r.id); return { ic: s.img, txt: `${T('Redo', 'Repite')} “${L2(s.t)}”: ${r.pct}%${r.crit.length ? ` · ⚠ ${T('a critical error', 'un error crítico')}` : ''}${r.timeUp ? ` · ⏰ ${T('time ran out', 'se acabó el tiempo')}` : ''}`, href: drillN(r.id) ? `#/mockdrill/${MX.n}/${s.id}` : `#/station/${s.id}`, more: drillN(r.id) ? T(`only the ${drillN(r.id)} steps you missed`, `solo los ${drillN(r.id)} pasos que fallaste`) : '' }; });
    const k5 = Object.entries(MX.k5.by).filter(([, [ok, n]]) => n && ok / n < 0.7).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).slice(0, 2)
      .map(([m, [ok, n]]) => ({ ic: topicImg(m), txt: `${T('Station 5', 'Estación 5')} · ${topicLabel(m)}: ${ok}/${n}`, href: drillCards([rvNow()], 'k5:' + m).length ? `#/mockdrill/${MX.n}/k5:${m}` : m === 'calc' ? '#/calc' : page(m) > -1 ? `#/lesson/notes/${page(m)}` : `#/quiz/${m}`, more: drillCards([rvNow()], 'k5:' + m).length ? T('only the questions you missed', 'solo las preguntas que fallaste') : '' }));
    const weak = ['mat', 'pharm', 'law', 'psych', 'peds', 'medsurg', 'emerg'].map(m => [m, pctOf(m)]).filter(([, p]) => p !== null && p < 85).sort((a, b) => a[1] - b[1]).slice(0, 1)
      .map(([m, p]) => ({ ic: m, txt: wrongIn(m) ? T(`Across all your practice, ${L(modById(m).title)} is at ${p}%`, `En toda tu práctica, ${L(modById(m).title)} está en ${p}%`) : T(`Across all your practice, ${L(modById(m).title)} is at ${p}%: one more unit quiz`, `En toda tu práctica, ${L(modById(m).title)} está en ${p}%: un test más de la unidad`), href: wrongIn(m) ? `#/review/${m}` : `#/quiz/${m}`, more: wrongIn(m) ? T(`only the ${wrongIn(m)} questions you got wrong`, `solo las ${wrongIn(m)} preguntas que fallaste`) : '' }));
    const procs = NX.stations.filter(s => s.kind === 'proc' && rec(s.id) && !rec(s.id).pass);
    const skills = procs.length ? [{ ic: 'syringe', txt: T(`Skills you will use inside the cases, not passed yet: ${procs.map(s => L2(s.t)).join(', ')}`, `Técnicas que usarás dentro de los casos, aún sin superar: ${procs.map(s => L2(s.t)).join(', ')}`), href: '#/stations/proc' }] : [];
    return [...st, ...k5, ...weak, ...skills];
  }
  /* the review of one attempt: every station mistake and every missed question, saved as text so she can reopen it */
  function buildReview(total, sc) {
    return { d: new Date().toISOString().slice(0, 10), total, sc,
      st: MX.ids.map((id, i) => { const r = MX.res[i] || { pct: 0, crit: [], miss: [] }; return { id, t: L2(stById(id).t), slot: L2(NX.mockSlots[i].t), pct: r.pct, crit: r.crit || [], miss: r.miss || [] }; }),
      k5: { ok: MX.k5.ok, n: MX.k5.n, miss: MX.k5.wrong.map(({ q, pick }) => ({ m: q.tp || q.m, id: q.id || '', o: q.multi ? undefined : q.o, a: q.multi ? undefined : q.a, topic: topicLabel(q.tp || q.m), q: q.q, mine: pick === undefined ? T('no answer', 'sin respuesta') : Array.isArray(pick) ? pick.map(k => q.o[k]).join(' · ') : q.o[pick], best: q.multi ? q.ans.map(k => q.o[k]).join(' · ') : q.o[q.a], why: q.w })) } };
  }
  /* ---------- mistakes-only drill: just the steps and questions she got wrong, nothing else ---------- */
  const qCard = x => { if (!x.id && !x.o) { /* older reviews kept only the text */ const q = NX.qs.find(b => L(b.q) === x.q); return q ? LEV.staticMCQ(q) : null; }
    const bank = x.id && NX.qs.find(b => b.id === x.id); if (bank) return LEV.staticMCQ(bank);
    if (!x.o || x.a === undefined) return null; const ord = shuffle(x.o.map((_, k) => k));
    return { type: 'mcq', m: x.m, title: '', q: `<p class="qtext">${chips(esc(x.q))}</p>`, o: ord.map(k => chips(esc(x.o[k]))), a: ord.indexOf(x.a), w: chips(esc(x.why || '')) }; };
  const stCards = x => x.miss.map(m => LEV.mistakeCard(m, x.id)).filter(Boolean);
  const drillable = x => stCards(x).length;
  /* rvs: reviews to draw from; only: a station id, 'k5', or nothing for everything */
  function drillCards(rvs, only) {
    const seen = new Set(), out = [];
    const add = c => { if (!c) return; const key = c.id || c.q; if (seen.has(key)) return; seen.add(key); out.push(c); };
    rvs.forEach(rv => {
      const k5 = only && only.startsWith('k5'), topic = k5 && only.split(':')[1];
      if (!k5) rv.st.filter(x => !only || x.id === only).forEach(x => stCards(x).forEach(add));
      if (!only || k5) rv.k5.miss.filter(x => !topic || x.m === topic).forEach(x => add(qCard(x)));
    });
    return out;
  }
  const allReviews = () => Object.values(S().mockReview || {});
  /* every saved mock mistake plus every question still in Fix mistakes (older mocks put theirs there) */
  const allCards = () => { const cards = drillCards(allReviews());
    S().wrong.map(id => NX.qs.find(q => q.id === id)).filter(Boolean).forEach(q => { if (!cards.some(c => c.id === q.id)) cards.push(LEV.staticMCQ(q)); });
    return cards; };
  /* #/mockdrill/all · #/mockdrill/<mock> · #/mockdrill/<mock>/<station id | k5> */
  R.mockdrill = (n, only) => {
    const all = n === 'all', cards = all ? allCards() : drillCards([(S().mockReview || {})[n]].filter(Boolean), only);
    const back = all ? '#/mocks' : `#/mockreview/${n}`;
    if (!cards.length) return view(`<a class="crumb" href="${back}">← ${T('Back', 'Volver')}</a><section class="card center-card">${mascot('happy', 'big')}<h2>${T('Nothing left to fix here', 'No queda nada por corregir aquí')}</h2></section>`);
    LEV.drill(shuffle(cards), { back, doneTitle: T('Mistakes practised', 'Errores practicados') });
  };
  const missCount = rv => rv.st.reduce((a, x) => a + x.miss.length, 0) + rv.k5.miss.length;
  function reviewHtml(rv, n) {
    const item = (x, topic) => `<div class="mx-rq ${x.crit ? 'crit' : ''}">${topic ? `<span class="mxk-topic">${img(topicImg(x.m))}${esc(x.topic)}</span>` : ''}<p class="q">${chips(esc(x.q))}</p>
      ${x.mine ? `<p class="ans bad">✗ ${T('You', 'Tú')}: ${chips(esc(x.mine))}</p>` : ''}${x.best ? `<p class="ans ok">✓ ${T('Best', 'Mejor')}: ${chips(esc(x.best))}</p>` : ''}${x.why ? `<p class="why">💡 ${chips(esc(x.why))}</p>` : ''}</div>`;
    const stations = rv.st.filter(x => x.miss.length).map(x => `<div class="mx-rv-st"><h4>${esc(x.slot)} · ${esc(x.t)} <em>${x.pct}%</em></h4>${x.miss.map(m => item(m)).join('')}
      ${drillable(x) ? `<a class="btn ghost small" href="#/mockdrill/${n}/${x.id}">${T('Practise only these', 'Practicar solo estos')} (${drillable(x)})</a>` : ''}</div>`).join('');
    return `<section class="card mx-review" id="mx-mistakes"><h2>${img('review')} ${T('Your mistakes', 'Tus errores')} (${missCount(rv)})</h2>
      ${missCount(rv) ? `<p class="fine">${T('Each one shows your answer, the best answer and why. Read the 💡 lines: that is what to do next time.', 'Cada uno muestra tu respuesta, la mejor y por qué. Lee las líneas 💡: es lo que harás la próxima vez.')}</p>` : `<p class="mx-allgood">🌟 ${T('No mistakes in this attempt.', 'Ningún error en este intento.')}</p>`}
      ${stations ? `<h3 class="mx-rv-h">${T('Patient stations', 'Estaciones de pacientes')}</h3>${stations}` : ''}
      ${rv.k5.miss.length ? `<h3 class="mx-rv-h">${T('Knowledge test', 'Prueba de conocimientos')} · ${rv.k5.ok}/${rv.k5.n}</h3>${rv.k5.miss.map(m => item(m, true)).join('')}
        <a class="btn blue small" href="#/mockdrill/${n}/k5">${T('Practise only these questions', 'Practicar solo estas preguntas')}</a>` : ''}
      ${drillCards([rv]).length ? `<button class="btn green wide mx-drillall" onclick="A.go('#/mockdrill/${n}')">🎯 ${T(`Practise only my mistakes (${drillCards([rv]).length})`, `Practicar solo mis errores (${drillCards([rv]).length})`)}</button>` : ''}</section>`;
  }
  R.mockreview = n => {
    const mk = mockById(n), rv = ((S().mockReview || {})[n]); if (!mk) return R.mocks();
    view(`<a class="crumb" href="#/mocks">← ${T('Mock tests', 'Exámenes de prueba')}</a>
      <section class="card mx-rv-head">${img('review', 'head-img float')}<div><h1>${esc(L2(mk.t))}</h1><p>${rv ? `${rv.d.split('-').reverse().slice(0, 2).join('.')} · ${rv.total}/100 · ${missCount(rv)} ${T('mistakes', 'errores')}` : best(mk.id) ? `${best(mk.id)}/100 · ${T('score only', 'solo la nota')}` : T('Not taken yet.', 'Aún no lo hiciste.')}</p></div></section>
      ${rv ? reviewHtml(rv, n) : `<section class="card mx-oldrv"><p>${T('You took this mock before the app saved each mistake, so only your score was kept. The knowledge-test questions you missed then are not lost: they are in “Practise all my mistakes”. Take this mock again to get a full review of its stations.', 'Hiciste este examen antes de que la app guardara cada error, así que solo quedó tu nota. Las preguntas que fallaste entonces no se pierden: están en “Practicar todos mis errores”. Repite este examen para tener la revisión completa de sus estaciones.')}</p><a class="btn blue" href="#/mockdrill/all">🎯 ${T('Practise all my mistakes', 'Practicar todos mis errores')}</a></section>`}
      <div class="row mx-end"><button class="btn green" onclick="A.go('#/mocktest/${mk.id}')">${T('Try this mock again', 'Repetir este examen')}</button></div>`);
  };
  function results() {
    const sc = [0, 1, 2, 3].map(i => MX.res[i] ? MX.res[i].pct : 0).concat(MX.k5.pct);
    const total = Math.round(sc.reduce((a, b) => a + b, 0) / 5), pass = total >= PASS, mk = mockById(MX.n);
    const b = S().best; b['mx' + MX.n] = Math.max(b['mx' + MX.n] || 0, total);
    S().mockLast = { n: MX.n, total, d: new Date().toISOString().slice(0, 10), sc };
    const rv = buildReview(total, sc); (S().mockReview || (S().mockReview = {}))[MX.n] = rv; const nMiss = missCount(rv);
    touch(30 + Math.round(total / 4)); save();
    const mins = Math.round((Date.now() - MX.start) / 60000), focus = focusList();
    /* gauge: a half circle, with a tick at the pass mark */
    const ARC = Math.PI * 50, at = p => { const th = Math.PI * (1 - p / 100); return [60 + 50 * Math.cos(th), 60 - 50 * Math.sin(th)]; }, [px, py] = at(PASS);
    view(`<a class="crumb" href="#/mocks">← ${T('Mock tests', 'Exámenes de prueba')}</a>
      <section class="card mx-result ${pass ? 'pass' : 'fail'}">
        <div class="mx-gauge"><svg viewBox="0 0 120 70"><path class="bg" d="M10 60 A50 50 0 0 1 110 60"/><path class="fg" id="mxarc" d="M10 60 A50 50 0 0 1 110 60" style="stroke-dasharray:${ARC};stroke-dashoffset:${ARC}"/>
          <line class="mark" x1="${px}" y1="${py}" x2="${60 + 0.78 * (px - 60)}" y2="${60 + 0.78 * (py - 60)}"/></svg>
          <div class="mx-score"><b data-c="${total}">0</b><small>/100 · ${T('pass', 'aprobado')} ${PASS}</small></div></div>
        <div class="mx-stamp ${pass ? 'pass' : 'fail'}">${pass ? T('PASS', 'APROBADO') : T('NOT YET', 'AÚN NO')}</div>
        <h1>${esc(L2(mk.t))}</h1><p class="fine">${mins} min · ${T('all five stations combined, equal weights (the Ministry does not publish its weighting)', 'las cinco estaciones combinadas, mismo peso (el Ministerio no publica su ponderación)')}</p>
        ${mascot(pass ? 'happy' : 'sad', 'big jump')}</section>
      ${nMiss ? `<button class="btn red mx-misslink" onclick="document.getElementById('mx-mistakes').scrollIntoView({ behavior: 'smooth', block: 'start' })">📋 ${T(`See your ${nMiss} mistakes and what to do`, `Ver tus ${nMiss} errores y qué hacer`)} ↓</button>` : ''}
      <h2 class="sec">${img('sim')} ${T('Station by station', 'Estación por estación')}</h2>
      <section class="card mx-rows">${MX.ids.map((id, i) => { const r = MX.res[i] || { pct: 0, crit: [], timeUp: false }, st = stById(id);
        return `<div class="mx-row ${tone(r.pct)}"><span class="mx-n">${i + 1}</span>${img(st.img)}<div><b>${esc(L2(st.t))}</b><small>${esc(L2(NX.mockSlots[i].t))}${r.crit.length ? ` · <em class="critline">⚠ ${esc(r.crit.join(' · '))}</em>` : ''}${r.timeUp ? ` · ⏰` : ''}</small><div class="mx-bar"><i data-w="${r.pct}"></i></div></div><em>${r.pct}%</em><a class="btn ghost small" href="#/station/${id}">${T('Redo', 'Repetir')}</a></div>`; }).join('')}
        <div class="mx-row ${tone(MX.k5.pct)}"><span class="mx-n">5</span>${img('clipboard')}<div><b>${T('Knowledge test', 'Prueba de conocimientos')} · ${MX.k5.ok}/${MX.k5.n}</b><small>${MX.k5.timeUp ? '⏰ ' + T('time ran out', 'se acabó el tiempo') : ''}</small>
          <div class="mx-topics small">${Object.entries(MX.k5.by).map(([m, [ok, n]]) => `<span class="${tone(Math.round(100 * ok / n))}">${img(topicImg(m))}${esc(topicLabel(m))} ${ok}/${n}</span>`).join('')}</div><div class="mx-bar"><i data-w="${MX.k5.pct}"></i></div></div><em>${MX.k5.pct}%</em></div></section>
      <h2 class="sec">${img('target')} ${T('What to focus on now', 'En qué centrarte ahora')}</h2>
      <section class="card mx-focus">${focus.length ? `<ol>${focus.map((f, i) => `<li style="--d:${i * 90}ms"><a href="${f.href}">${img(f.ic)}<span>${esc(f.txt)}${f.more ? `<small class="mx-only">🎯 ${esc(f.more)}</small>` : ''}</span><b>→</b></a></li>`).join('')}</ol>`
        : `<p class="mx-allgood">🌟 ${T('Nothing below 70% and no critical errors. Keep the red lines out loud and read the cheat sheets the night before.', 'Nada por debajo de 70% y sin errores críticos. Sigue diciendo las líneas rojas en voz alta y lee las chuletas la noche antes.')}</p>`}</section>
      ${reviewHtml(rv, MX.n)}
      <div class="row mx-end"><button class="btn green" onclick="A.go('#/mocktest/${MX.n}')">${T('Try this mock again', 'Repetir este examen')}</button><a class="btn ghost" href="#/mocks">${T('All mock tests', 'Todos los exámenes')}</a></div>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
    requestAnimationFrame(() => { const a = $('#mxarc'); if (a) a.style.strokeDashoffset = ARC * (1 - total / 100); });
    bars();
    if (pass) { SFX.win(); confetti(); } else SFX.no();
  }

  /* ---------- cheat sheets ---------- */
  const seen = () => S().cheats || (S().cheats = {});
  R.cheats = () => {
    const all = NX.cheats.length + 1, done = () => NX.cheats.filter(c => seen()[c.id]).length + (seen().he ? 1 : 0);
    const row = r => r[1] ? `<li><span>${esc(es() ? r[2] : r[0])}</span><b>${chips(esc(es() ? r[3] : r[1]))}</b></li>` : `<li class="tip">💡 ${chips(esc(es() ? r[2] : r[0]))}</li>`;
    const card = (c, i) => `<article class="card cheat ${seen()[c.id] ? 'got' : ''}" id="ch-${c.id}" style="--c:${c.c};--d:${i * 50}ms">
      <header>${img(c.img)}<h2>${esc(L2(c.t))}</h2><button class="cheat-got" onclick="A.cheatGot('${c.id}')" aria-label="${T('Got it', 'Lo tengo')}">✓</button></header>
      <ul>${c.rows.map(row).join('')}</ul></article>`;
    const he = `<article class="card cheat he-card ${seen().he ? 'got' : ''}" id="ch-he" style="--c:#7c5cff;--d:${NX.cheats.length * 50}ms">
      <header>${img('heb')}<h2>${T('Hebrew at the bedside', 'Hebreo junto a la cama')}</h2><button class="cheat-got" onclick="A.cheatGot('he')" aria-label="${T('Got it', 'Lo tengo')}">✓</button></header>
      <ul>${NX.cheatsHe.map(h => `<li><button class="cheat-he" data-say="${h[0]}"><span class="he" lang="he" dir="rtl">${h[0]}</span><i>${esc(h[1])}</i><small>${esc(es() ? h[3] : h[2])}</small>${img('speaker')}</button></li>`).join('')}</ul></article>`;
    view(`<a class="crumb" href="#/mocks">← ${T('Mock tests', 'Exámenes de prueba')}</a>
      <section class="card cheat-head">${img('bulb', 'head-img float')}<div><h1>${T('Cheat sheets', 'Chuletas')}</h1><p>${T('The small things worth remembering right before the exam. Tap ✓ when a card is in your head.', 'Lo pequeño que conviene recordar justo antes del examen. Toca ✓ cuando tengas una tarjeta en la cabeza.')}</p></div>
        <div class="mx-ring cheat-ring"><svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="19"/><circle class="fg" id="chring" cx="22" cy="22" r="19" style="stroke-dasharray:${RING};stroke-dashoffset:${RING}"/></svg><b id="chcount">${done()}/${all}</b></div></section>
      <nav class="cheat-nav">${NX.cheats.map(c => `<a href="#/cheats" onclick="event.preventDefault();document.getElementById('ch-${c.id}').scrollIntoView({behavior:'smooth',block:'start'})" style="--c:${c.c}">${img(c.img)}<span>${esc(L2(c.t).split(/[:·(]/)[0].trim())}</span></a>`).join('')}
        <a href="#/cheats" onclick="event.preventDefault();document.getElementById('ch-he').scrollIntoView({behavior:'smooth',block:'start'})" style="--c:#7c5cff">${img('heb')}<span>${T('Hebrew', 'Hebreo')}</span></a></nav>
      <div class="cheat-grid">${NX.cheats.map(card).join('')}${he}</div>`);
    const paint = () => { const n = done(), r = $('#chring'), c = $('#chcount'); if (r) r.style.strokeDashoffset = RING * (1 - n / all); if (c) c.textContent = `${n}/${all}`; };
    requestAnimationFrame(paint);
    A.cheatGot = id => {
      const s = seen(); s[id] = s[id] ? 0 : 1; save();
      const el = document.getElementById('ch-' + id); if (el) { el.classList.toggle('got', !!s[id]); if (s[id]) { el.classList.remove('stamped'); void el.offsetWidth; el.classList.add('stamped'); } }
      s[id] ? SFX.ok() : SFX.tap(); paint();
      if (s[id] && done() === all) { confetti(); touch(20); }
    };
  };

  /* ---------- Unit 9 on the Learn path ---------- */
  LEV.unitExtra.notes = () => { const b = best(8);
    return `<div class="mx-unit notes-unit"><a class="card notes-final tilt" href="#/mocktest/8">${img('trophy', 'wiggle')}<div><b>${T('Final exam: your notes', 'Examen final: tus notas')}</b><span>${T('4 stations that match your pages + 30 questions from all 7 of them', '4 estaciones que encajan con tus páginas + 30 preguntas de las 7')}</span>${b ? `<em class="mx-stamp mini ${b >= PASS ? 'pass' : 'fail'}">${b}%</em>` : ''}</div><span class="go">→</span></a>
      <a class="card notes-quick tilt" href="#/quiz/notes">${img('flash')}<div><b>${T('Quick check: 10 questions', 'Repaso rápido: 10 preguntas')}</b><span>${T('All pages mixed, about 5 minutes', 'Todas las páginas mezcladas, unos 5 minutos')}</span></div><span class="go">→</span></a></div>`; };
  LEV.unitExtra.exam = () => `<div class="mx-unit">
      ${NX.mocks.map((m, i) => { const b = best(m.id); return `<a class="mx-mini tilt ${m.focus ? 'focus' : ''} ${m.fresh ? 'fresh' : ''} ${m.hard ? 'hard' : ''}" href="#/mocktest/${m.id}" style="--d:${i * 70}ms">${(m.fresh || m.hard) && !b ? `<span class="mx-newtag">${m.hard ? T('HARD', 'DIFÍCIL') : m.notes ? T('FINAL', 'FINAL') : T('NEW', 'NUEVO')}</span>` : ''}<span class="mx-num">${m.focus ? '★' : m.hard ? '🔥' : m.notes ? '📓' : m.id}</span><small>${esc(L2(m.t))}</small>${b ? `<em class="${b >= PASS ? 'pass' : 'fail'}">${b}% · ↻</em>` : `<em>${T('start', 'empezar')}</em>`}</a>`; }).join('')}
      <a class="mx-mini cheat tilt" href="#/cheats" style="--d:${NX.mocks.length * 70}ms">${img('bulb')}<small>${T('Cheat sheets', 'Chuletas')}</small><em>${T('read', 'leer')}</em></a>
    </div><a class="mx-unit-all" href="#/mocks">${T('All mock tests and where you stand', 'Todos los exámenes y dónde estás')} →</a>`;
});
