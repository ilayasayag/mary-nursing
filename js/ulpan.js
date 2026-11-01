/* lev. Ulpan: a separate Hebrew course (Aleph → Bet) with its own progress, placement test,
   lessons, games, conversations, mock exams in the Ministry of Education format, and a photo scanner. */
(window.LEV_EXT = window.LEV_EXT || []).push(LEV => {
  'use strict';
  const { R, view, img, esc, shuffle, pick, L2, SFX, play, stopVoice, touch, confetti, toast, mascot, countUp, save, onLeave } = LEV;
  const S = () => LEV.state();
  const $ = s => document.querySelector(s);
  const A = window.A;
  const es = () => S().lang === 'es';
  const T = (en, sp) => es() ? sp : en;
  const UL = window.UL;
  const he = (t, cls = '') => `<span class="he ${cls}" lang="he" dir="rtl">${esc(t)}</span>`;
  const mean = x => es() ? x.es : x.en;
  /* keep Hebrew runs inside English/Spanish text in the right order */
  const bidi = t => esc(t).replace(/([\u05D0-\u05EA][\u05D0-\u05EA\s,'"״׳()+-]*[\u05D0-\u05EA)])/g, '<bdi class="he" dir="rtl">$1</bdi>');
  const sayHe = t => play([{ he: t }]);
  const U = () => { const s = S(); if (!s.ulpan) s.ulpan = {}; const u = s.ulpan;
    for (const [k, v] of Object.entries({ xp: 0, lv: UL.profile.level, done: {}, tests: {}, box: {}, skill: {}, best: {}, talks: {}, decks: [], placed: null, exams: {} })) if (u[k] === undefined) u[k] = v;
    return u; };
  const gain = n => { const u = U(); u.xp += n; touch(n); };
  const skillMark = (k, ok) => { if (!k) return; const s = U().skill; const x = s[k] || (s[k] = { n: 0, ok: 0 }); x.n++; if (ok) x.ok++; };
  const unitsOf = lv => UL.units.filter(u => u.lv === lv);
  const lessonKey = (u, i) => `${u}-${i}`;
  const lvHe = id => (UL.levels.find(l => l.id === id) || {}).he || '';

  /* ===================== exercise generators ===================== */
  const words = list => list.map(w => UL.lex.find(e => e.he === w)).filter(Boolean);
  const verbsWhere = o => UL.verbs.filter(v => (!o.b || v.b === o.b) && (!o.bs || o.bs.includes(v.b)) && (!o.irr || v.irr) && (o.lv !== 'a' || v.lv === 'a'));
  const PAST_SUBJ = [['אני', 0], ['אתה', 1], ['את', 2], ['הוא', 3], ['דני', 3], ['היא', 4], ['רותי', 4], ['אנחנו', 5], ['אתם', 6], ['אתן', 7], ['הם', 8], ['הילדים', 8], ['החברות שלי', 8]];
  const PRES_SUBJ = [['דני', 0], ['הוא', 0], ['אתה', 0], ['רותי', 1], ['היא', 1], ['את', 1], ['הילדים', 2], ['הם', 2], ['אתם', 2], ['החברות שלי', 3], ['הן', 3], ['אתן', 3]];
  const FUT_SUBJ = [['אני', 0], ['אתה', 1], ['את', 2], ['הוא', 3], ['דני', 3], ['היא', 4], ['רותי', 4], ['אנחנו', 5], ['אתם', 6], ['הם', 7], ['הילדים', 7]];
  const uniq = (correct, cands, n = 3) => { const out = []; for (const c of shuffle(cands)) if (c && c !== correct && !out.includes(c) && c !== '—') { out.push(c); if (out.length === n) break; } return out; };
  const mcq = (o) => ({ type: 'mcq', ...o });
  const gapCard = (s, a, d, skill, tr, extra = {}) => mcq({ skill, sent: s, opts: shuffle([a, ...d]), ans: a, tr, ...extra });
  const BIN_NAMES = Object.entries(UL.binyanim).map(([k, b]) => [k, b.he, b.tr]);
  const IMP_OK = 'לסגור לפתוח לכתוב לבדוק לשמוע לזכור לשאול לשלוח לעזור לחזור לקרוא לשמור לדבר לספר לשלם לחפש לסדר לבקש לבשל להזמין להמשיך להסביר להדליק להתלבש להתקשר להסתכל להיכנס להישאר להיזהר לקנות לשתות לעשות לענות לבוא לשים לשבת לצאת ללכת לקחת לתת לאכול לנסות לחכות לנקות להביא לקום לרדת לשכוח'.split(' ');
  const H12 = ['שתים עשרה', 'אחת', 'שתיים', 'שלוש', 'ארבע', 'חמש', 'שש', 'שבע', 'שמונה', 'תשע', 'עשר', 'אחת עשרה'];
  const dayPart = h => h >= 5 && h < 12 ? 'בבוקר' : h >= 12 && h < 14 ? 'בצהריים' : h >= 14 && h < 18 ? 'אחר הצהריים' : h >= 18 && h < 22 ? 'בערב' : 'בלילה';
  function timePhrase(h, m) {
    const n = H12[h % 12], nx = H12[(h + 1) % 12];
    return { 0: n, 5: n + ' וחמש', 10: n + ' ועשרה', 15: n + ' ורבע', 20: n + ' ועשרים', 25: n + ' ועשרים וחמש', 30: n + ' וחצי', 40: 'עשרים ל' + nx, 45: 'רבע ל' + nx, 50: 'עשרה ל' + nx, 55: 'חמש ל' + nx }[m];
  }
  function timeCard(o = {}) {
    const h = 1 + (Math.random() * 23 | 0), m = pick([0, 5, 10, 15, 20, 25, 30, 40, 45, 50, 55]);
    const p = timePhrase(h, m), dp = dayPart(h), full = `${p} ${dp}`;
    const parts = ['בבוקר', 'בצהריים', 'אחר הצהריים', 'בערב', 'בלילה'].filter(x => x !== dp);
    const wrong = [`${p} ${pick(parts)}`];
    const n = H12[h % 12], nx = H12[(h + 1) % 12];
    if (m === 45) wrong.push(`${n} ורבע ${dp}`, `רבע דקות ל${nx} ${dp}`, `רבע ל${n} ${dp}`);
    else if (m === 15) wrong.push(`רבע ל${n} ${dp}`, `רבע ל${nx} ${dp}`);
    else if (m === 5) wrong.push(`${n} וחמישה ${dp}`, `חמש ו${n} ${dp}`);
    else if (m >= 40) wrong.push(`${timePhrase(h - 1 < 0 ? 23 : h - 1, m)} ${dp}`, `${n} ו${{ 40: 'עשרים', 50: 'עשרה', 55: 'חמש' }[m]} ${dp}`);
    else wrong.push(`${timePhrase((h + 1) % 24, m)} ${dp}`, `${timePhrase((h + 23) % 24, m)} ${dp}`);
    const digital = `${h}:${String(m).padStart(2, '0')}`;
    if (!o.day && Math.random() < .35) {
      const dWrong = uniq(digital, [`${(h + 1) % 24}:${String(m).padStart(2, '0')}`, `${h}:${String((m + 15) % 60).padStart(2, '0')}`, `${(h + 12) % 24}:${String(m).padStart(2, '0')}`, `${(h + 23) % 24}:${String(m).padStart(2, '0')}`]);
      return mcq({ skill: 'time', prompt: full, say: full, opts: shuffle([digital, ...dWrong]), ans: digital, ltr: true, title: T('What time is it?', '¿Qué hora es?') });
    }
    return mcq({ skill: 'time', clock: [h, m], digital, opts: shuffle([full, ...uniq(full, wrong)]), ans: full, say: full, title: T('What time is it?', '¿Qué hora es?') });
  }
  /* adjectives that make sense for each kind of noun */
  const ADJ_FOR = { person: 'נחמד חכם צעיר זקן שמח עייף עשיר יפה טוב חדש', thing: 'גדול קטן חדש ישן יפה יקר זול נקי טוב לבן שחור כחול אדום ירוק',
    food: 'טרי טוב יקר זול חם קר ירוק אדום', place: 'גדול קטן חדש ישן יפה נקי שקט רועש עתיק יקר', time: 'ארוך קצר טוב קשה קל חדש מעניין' };
  const PEOPLE = 'ילד ילדה חבר חברה שכן תלמיד תלמידה רופא מורה אחות בחור בחורה איש אישה מלצר מלצרית'.split(' ');
  function agreePair() {
    const n = pick(UL.lex.filter(e => e.g && e.pl && !e.he.includes(' ') && (PEOPLE.includes(e.he) || ['home', 'food', 'city', 'shop', 'travel', 'free'].includes(e.topic) || ['שיעור', 'מבחן', 'שאלה', 'מילה', 'ספר', 'מחברת', 'טיול', 'שבוע', 'שנה', 'חודש', 'יום', 'לילה'].includes(e.he))));
    const kind = PEOPLE.includes(n.he) ? 'person' : n.topic === 'food' && !['כוס', 'צלחת', 'מסעדה', 'מלצר', 'מלצרית', 'חשבון'].includes(n.he) ? 'food'
      : ['עיר', 'רחוב', 'כביש', 'שוק', 'סופר', 'חנות', 'קניון', 'בנק', 'מרפאה', 'פארק', 'מוזיאון', 'מקום', 'תחנה', 'בית', 'דירה', 'חדר', 'מטבח', 'מסעדה', 'מלון', 'כיתה'].includes(n.he) ? 'place'
      : ['שיעור', 'מבחן', 'שאלה', 'מילה', 'טיול', 'שבוע', 'שנה', 'חודש', 'יום', 'לילה', 'סרט', 'שיר', 'חופשה'].includes(n.he) ? 'time' : 'thing';
    const adjs = ADJ_FOR[kind].split(' ').map(m => UL.adj.find(a => a.m === m)).filter(Boolean);
    return [n, adjs];
  }
  const verbTr = v => `${v.inf} = ${mean(v)}`;
  const GEN = {
    mean: (o, L) => { const pool = L.length ? L : UL.lex; const w = pick(pool); const others = uniq(mean(w), shuffle(UL.lex.filter(e => e.topic === w.topic && e.he !== w.he)).map(mean));
      return mcq({ skill: 'vocab', word: w, prompt: w.he, say: w.he, opts: shuffle([mean(w), ...others]), ans: mean(w), ltr: true, title: T('What does it mean?', '¿Qué significa?') }); },
    pick: (o, L) => { const pool = L.length ? L : UL.lex; const w = pick(pool); const others = uniq(w.he, shuffle(UL.lex.filter(e => e.topic === w.topic)).map(e => e.he));
      return mcq({ skill: 'vocab', word: w, prompt: mean(w), opts: shuffle([w.he, ...others]), ans: w.he, promptLtr: true, title: T('Which is the Hebrew?', '¿Cuál es en hebreo?') }); },
    listen: (o, L) => { const pool = L.length ? L : UL.lex; const w = pick(pool); const others = uniq(w.he, shuffle(UL.lex.filter(e => e.topic === w.topic)).map(e => e.he));
      return mcq({ skill: 'vocab', word: w, listen: w.he, opts: shuffle([w.he, ...others]), ans: w.he, title: T('What do you hear?', '¿Qué escuchas?') }); },
    spell: (o, L) => { const pool = (L.length ? L : UL.lex).filter(e => !e.he.includes(' ') && e.he.length >= 3 && e.he.length <= 7); const w = pick(pool.length ? pool : UL.lex.filter(e => !e.he.includes(' ') && e.he.length <= 6));
      return { type: 'spell', skill: 'vocab', word: w, target: w.he, title: T('Listen and spell it', 'Escucha y escríbelo') }; },
    pairs: (o, L) => { const pool = shuffle(L.length >= 4 ? L : UL.lex.filter(e => e.lv === 'a')).filter((e, i, a) => a.findIndex(x => mean(x) === mean(e)) === i); return { type: 'pairs', items: pool.slice(0, 4) }; },
    pres: o => { const v = pick(verbsWhere(o).filter(v => v.pres[0] !== '—')); const [s, i] = pick(PRES_SUBJ); const a = v.pres[i];
      return gapCard(`${s} _ ${UL.vx[v.inf]} כל יום.`, a, uniq(a, [...v.pres, v.inf, v.past[3]]), 'pres', verbTr(v), { cue: v.inf }); },
    inf: o => { let pool = (o.verbs ? UL.verbs.filter(x => o.verbs.includes(x.inf)) : verbsWhere(o)).filter(v => v.pres[0] !== '—' && v.inf !== 'לרצות');
      if (!pool.length) pool = UL.verbs.filter(v => v.pres[0] !== '—' && v.inf !== 'לרצות'); const v = pick(pool); const fr = pick(['אני רוצה', 'כדאי', 'הוא צריך', 'אנחנו יכולים', 'היא אוהבת']); const a = v.inf;
      return gapCard(`${fr} _ ${UL.vx[v.inf]}.`, a, uniq(a, [v.pres[0], v.pres[1], v.past[3], v.pres[2]]), 'inf', verbTr(v)); },
    past: o => { const pool = o.all ? UL.verbs : verbsWhere(o); const v = pick(pool); const [s, i] = pick(PAST_SUBJ); const a = v.past[i];
      const tw = pick(['אתמול', 'בשבוע שעבר', 'אתמול בערב', 'לפני שנה']);
      const near = { 0: [5, 3, 1], 1: [0, 3, 6], 2: [4, 0, 7], 3: [4, 8, 0], 4: [3, 8, 2], 5: [8, 0, 6], 6: [5, 8, 7], 7: [6, 4, 8], 8: [5, 3, 4] }[i].map(k => v.past[k]);
      return gapCard(`${tw} ${s} _ ${UL.vx[v.inf]}.`, a, uniq(a, [...near, v.pres[i === 4 || i === 2 ? 1 : 0], v.inf]), skillOfB(v.b, 'past'), verbTr(v), { cue: v.inf }); },
    fut: o => { const v = pick(verbsWhere(o)); const [s, i] = pick(FUT_SUBJ); const a = v.fut[i]; const tw = pick(['מחר', 'בשבוע הבא', 'בשנה הבאה', 'מחר בבוקר']);
      const pastI = [0, 1, 2, 3, 4, 5, 6, 8][i];
      return gapCard(`${tw} ${s} _ ${UL.vx[v.inf]}.`, a, uniq(a, [v.past[pastI], v.fut[(i + 1) % 8], v.fut[i === 5 ? 0 : 5], v.pres[0]]), 'fut', verbTr(v), { cue: v.inf }); },
    imp: o => { const v = pick(UL.verbs.filter(v => IMP_OK.includes(v.inf) && v.imp)); const [ad, i] = pick([['דני,', 0], ['רותי,', 1], ['ילדים,', 2]]);
      if (o.neg || Math.random() < .3) { const a = v.fut[[1, 2, 6][i]]; return gapCard(`${ad} אל _ ${UL.vx[v.inf]}!`, a, uniq(a, [v.imp[i], v.fut[[2, 1, 1][i]], v.inf]), 'imp', verbTr(v), { cue: v.inf }); }
      const a = v.imp[i]; return gapCard(`${ad} _ ${UL.vx[v.inf]}, בבקשה!`, a, uniq(a, [...v.imp, v.past[[1, 2, 6][i]]]), 'imp', verbTr(v), { cue: v.inf }); },
    tense: () => { const v = pick(UL.verbs.filter(v => v.pres[0] !== '—')); const [tw, t] = pick([['אתמול', 'past'], ['עכשיו', 'pres'], ['מחר', 'fut']]); const [s, pi, ri, fi] = pick([['הוא', 3, 0, 3], ['היא', 4, 1, 4], ['הם', 8, 2, 7]]);
      const forms = { past: v.past[pi], pres: v.pres[ri], fut: v.fut[fi] }; const a = forms[t];
      return gapCard(`${tw} ${s} _ ${UL.vx[v.inf]}.`, a, uniq(a, [...Object.values(forms), v.inf]), 'fut', verbTr(v), { cue: v.inf }); },
    binyan: () => { const v = pick(UL.verbs.filter(v => !v.irr)); const [form, tn] = pick([[v.past[pick([0, 3, 4, 8])], 'past'], [v.pres[pick([0, 1])], 'pres'], [v.inf, 'inf']]);
      const right = BIN_NAMES.find(b => b[0] === v.b); const others = shuffle(BIN_NAMES.filter(b => b[0] !== v.b)).slice(0, 3);
      return mcq({ skill: skillOfB(v.b, 'past'), prompt: form, say: form, opts: shuffle([right, ...others]).map(b => `${b[1]} · ${b[2]}`), ans: `${right[1]} · ${right[2]}`, ltr: true, title: T('Which binyan?', '¿Qué binyán?'), tr: verbTr(v) }); },
    hitinf: () => { const v = pick(UL.verbs.filter(v => v.b === 'hitpael')); const a = v.inf, rest = a.slice(2);
      return gapCard(`הם רוצים _ ${UL.vx[v.inf]}.`, a, ['ל' + rest, 'להי' + rest, a.slice(1)], 'hitinf', verbTr(v), { cue: mean(v) }); },
    nifpast: () => { const v = pick(UL.verbs.filter(v => v.b === 'nifal')); const [s, i] = pick(PAST_SUBJ); const a = v.past[i];
      return gapCard(`אתמול ${s} _ ${UL.vx[v.inf]}.`, a, uniq(a, ['הי' + a.slice(1), v.pres[i === 4 ? 1 : i === 8 ? 2 : 0], v.fut[Math.min(i, 7)]]), 'nifpast', verbTr(v), { cue: v.inf }); },
    agree: () => { const [n, adjs] = agreePair(); const adj = pick(adjs); const pl = Math.random() < .5, def = Math.random() < .4;
      const key = (n.g === 'f' ? 'f' : 'm') + (pl ? 'p' : ''); const form = { m: adj.m, f: adj.f, mp: adj.mp, fp: adj.fp }[key];
      const noun = (def ? 'ה' : '') + (pl ? n.pl : n.he), a = (def ? 'ה' : '') + form;
      const opts = [...new Set([adj.m, adj.f, adj.mp, adj.fp].map(x => (def ? 'ה' : '') + x))];
      return mcq({ skill: 'agree', sent: `${def ? 'אני אוהבת את' : 'יש לנו'} ${noun} _.`, opts: shuffle(opts), ans: a, tr: `${n.he}${n.g === 'f' ? ' (f)' : ' (m)'} · ${adj.m} = ${mean(adj)}` }); },
    plnoun: () => { const n = pick(UL.lex.filter(e => e.pl && !e.he.includes(' ') && !e.pl.includes(' ')));
      const fx = UL.fixFinals, cut = /ה$/.test(n.he) || (/ת$/.test(n.he) && n.g === 'f'), base = cut ? n.he.slice(0, -1) : n.he;
      const cands = [base + 'ים', base + 'ות', ...(cut ? [] : [n.he + 'ים', n.he + 'ות']), n.pl.endsWith('ים') ? n.pl.slice(0, -2) + 'ות' : n.pl.slice(0, -2) + 'ים'].map(fx);
      const w = uniq(n.pl, cands);
      return mcq({ skill: 'plural', prompt: n.he, say: n.he, opts: shuffle([n.pl, ...w]), ans: n.pl, title: T('Plural?', '¿Plural?'), tr: `${n.he} = ${mean(n)} (${n.g})` }); },
    prep: o => { const x = pick(UL.prep.filter(p => (!o.tag || p.tag === o.tag) && (!o.lv || p.lv === o.lv))); return gapCard(x.s, x.a, x.d, x.tag === 'gov' ? 'gov' : 'prep', mean(x)); },
    qword: () => { const x = pick(UL.qword); return mcq({ skill: 'qword', answer: x.s, focus: x.f, opts: shuffle([x.q, ...x.d]), ans: x.q, title: T('Write the question', 'Escribe la pregunta'), tr: mean(x) }); },
    link: o => { const x = pick(UL.link.filter(l => !o.lv || l.lv === o.lv)); return gapCard(x.s, x.a, x.d, 'link', mean(x)); },
    voc: () => { const x = pick(UL.voc); return gapCard(x.s, x.a, x.d, 'vocab', mean(x)); },
    suffix: () => { const x = pick(UL.suffix); return gapCard(x.s, x.a, x.d, 'suffix', mean(x)); },
    smichut: () => { const x = pick(UL.smichut); return gapCard(x.s, x.a, x.d, 'smichut', mean(x)); },
    cond: () => { const x = pick(UL.cond); return gapCard(x.s, x.a, x.d, x.s.includes('אל ') || /\(ל/.test(x.s) ? 'imp' : 'cond', mean(x)); },
    plural: () => { const x = pick(UL.plural); return mcq({ skill: 'plural', prompt: x.s, say: x.s, opts: shuffle([x.p, ...x.d]), ans: x.p, title: T('Make it plural', 'Pásalo al plural'), tr: mean(x), long: true }); },
    et: () => { const [s, a] = pick(UL.et); return gapCard(s, a, [a === 'את' ? '—' : 'את'], 'et', ''); },
    have: () => { const [s, a, en, sp] = pick(UL.have); return gapCard(s, a, [a === 'יש' ? 'אין' : 'יש', 'לא'], 'have', es() ? sp : en); },
    time: o => timeCard(o),
    build: o => { const x = pick(UL.sent.filter(s => !o.lv || s.lv === o.lv || (o.lv === 'b'))); return { type: 'build', skill: 'build', target: x.he, tr: mean(x), tiles: shuffle(x.he.split(' ')) }; }
  };
  function skillOfB(b, t) { return t === 'past' ? { paal: 'paal', piel: 'piel', hifil: 'hifil', hitpael: 'hitpael', nifal: 'nifpast' }[b] : t; }
  const SKILL_GEN = { time: ['time', {}], gov: ['prep', { tag: 'gov' }], prep: ['prep', { tag: 'prep' }], hitinf: ['hitinf', {}], nifpast: ['nifpast', {}], agree: ['agree', {}], paal: ['past', { b: 'paal' }],
    piel: ['past', { b: 'piel' }], hifil: ['past', { b: 'hifil' }], hitpael: ['past', { b: 'hitpael' }], pres: ['pres', {}], inf: ['inf', {}], plural: ['plural', {}], et: ['et', {}], qword: ['qword', {}], link: ['link', {}],
    fut: ['fut', {}], imp: ['imp', {}], suffix: ['suffix', {}], smichut: ['smichut', {}], cond: ['cond', {}], have: ['have', {}], vocab: ['mean', {}], read: ['qword', {}], build: ['build', {}] };
  const gen = (name, n, o = {}, L = []) => Array.from({ length: n }, () => GEN[name](o, L));
  function lessonCards(unit, li) {
    const l = unit.lessons[li], W = words(l.words || []), cards = [];
    (l.teach || []).forEach(t => cards.push({ type: 'teach', t }));
    W.forEach(w => cards.push({ type: 'word', word: w }));
    const mix = (l.mix || []).flatMap(([g, n, o]) => gen(g, n, o || {}, W));
    /* keep each generator's items apart a little: interleave */
    return cards.concat(shuffle(mix));
  }

  /* ===================== session engine (overlay) ===================== */
  let X = null;
  function session(cards, o = {}) {
    stopVoice();
    X = Object.assign({ cards, i: 0, ok: 0, n: 0, retry: true, silent: false, log: [], start: Date.now() }, o, { hearts: o.hearts === false || o.silent ? null : 5 });
    if (X.hearts === undefined) X.hearts = 5;
    $('#overlay').hidden = false; document.body.classList.add('locked');
    onLeave(closeU);
    draw();
  }
  function closeU() { if (!X) return; stopVoice(); X = null; $('#overlay').hidden = true; $('#overlay').innerHTML = ''; document.body.classList.remove('locked'); }
  A.uQuit = () => { if (X && X.n && !confirm(T('Leave this lesson?', '¿Salir de la lección?'))) return; const back = X && X.back; closeU(); if (back) location.hash = back; };
  const gapHtml = (s, fill, cls = '') => esc(s).replace('_', `<span class="gap ${cls}">${fill ? esc(fill) : '&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`);
  function clockSvg(h, m, cls = '') {
    const ang = (v, max) => v / max * 360;
    const hA = ang((h % 12) + m / 60, 12), mA = ang(m, 60);
    const ticks = Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="8" x2="50" y2="${i % 3 ? 13 : 16}" transform="rotate(${i * 30} 50 50)"/>`).join('');
    return `<svg class="uclock ${cls}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="face"/><g class="ticks">${ticks}</g>
      <line class="hh" x1="50" y1="50" x2="50" y2="27" style="--a:${hA}deg"/><line class="mh" x1="50" y1="50" x2="50" y2="14" style="--a:${mA}deg"/><circle cx="50" cy="50" r="3.5" class="pin"/></svg>`;
  }
  function draw() {
    const c = X.cards[X.i]; if (!c) return finish();
    if (c.type === 'gate') return gate(c);
    X.sel = null; X.done = false;
    const pct = Math.round(100 * X.i / X.cards.length);
    let body = '', foot = X.silent ? '' : `<button class="btn ghost" onclick="A.uSkip()">${T('Skip', 'Saltar')}</button>`;
    if (c.type === 'teach') { body = teachHtml(c.t); foot = `<button class="btn green wide" onclick="A.uNext()">${T('Continue', 'Continuar')}</button>`; }
    else if (c.type === 'word') { const w = c.word;
      body = `<h2 class="ctitle">${img('sparkles')} ${T('New word', 'Palabra nueva')}</h2><button class="word-card uword pop" onclick="A.uSay('${esc(w.he)}')">${he(w.he)}<i>${esc(w.tr)}</i><b>${esc(mean(w))}</b>
        ${w.pl ? `<small>${T('plural', 'plural')}: ${he(w.pl)}${w.g ? ` · ${w.g === 'f' ? T('feminine', 'femenino') : T('masculine', 'masculino')}` : ''}</small>` : ''}${img('speaker', 'spk')}</button>`;
      foot = `<button class="btn green wide" onclick="A.uNext()">${T('Continue', 'Continuar')}</button>`; setTimeout(() => sayHe(w.he), 300); }
    else if (c.type === 'pairs') {
      body = `<h2 class="ctitle">${T('Tap the matching pairs', 'Toca las parejas')}</h2><div class="pairs"><div>${shuffle(c.items).map(w => `<button class="ptile he" lang="he" dir="rtl" data-id="${w.id}" data-s="L" onclick="A.uPair(this)">${esc(w.he)}</button>`).join('')}</div>
        <div>${shuffle(c.items).map(w => `<button class="ptile" data-id="${w.id}" data-s="R" onclick="A.uPair(this)">${esc(mean(w))}</button>`).join('')}</div></div>`;
      foot = `<button class="btn green wide" id="uctn" disabled onclick="A.uNext()">${T('Continue', 'Continuar')}</button>`; X.pair = { sel: null, done: 0, n: c.items.length };
    } else if (c.type === 'build' || c.type === 'spell') {
      const tiles = c.type === 'build' ? c.tiles : shuffle([...c.target.split(''), ...shuffle('אבגדהוזחטיכלמנסעפצקרשת'.split('').filter(x => !c.target.includes(x))).slice(0, 2)]);
      X.built = [];
      body = `<h2 class="ctitle">${c.type === 'build' ? T('Build the sentence', 'Construye la frase') : c.title}</h2>
        ${c.type === 'build' ? `${c.dict ? `<div class="listen-q"><button class="speaker-big" onclick="A.uSay('${esc(c.target)}')">${img('speaker')}</button></div>` : ''}<p class="utr">${esc(c.tr)}</p>` : `<div class="listen-q"><button class="speaker-big" onclick="A.uSay('${esc(c.target)}')">${img('speaker')}</button><p class="utr">${esc(mean(c.word))}</p></div>`}
        <div class="ubuilt ${c.type}" id="ubuilt" lang="he" dir="rtl"></div>
        <div class="utiles ${c.type}" lang="he" dir="rtl">${tiles.map((t, k) => `<button class="utile" data-k="${k}" onclick="A.uTile(${k})">${esc(t)}</button>`).join('')}</div>`;
      X.tiles = tiles;
      foot = `<button class="btn ghost" onclick="A.uSkip()">${T('Skip', 'Saltar')}</button><button class="btn green" id="uchk" disabled onclick="A.uCheckBuild()">${T('Check', 'Comprobar')}</button>`;
      if (c.type === 'spell' || c.dict) setTimeout(() => sayHe(c.target), 300);
    } else {
      const head = c.title ? `<h2 class="ctitle">${c.title}</h2>` : '';
      let q = '';
      if (c.clock) q = `<div class="uclock-wrap pop">${clockSvg(c.clock[0], c.clock[1])}<b class="digital">${c.digital}</b></div>`;
      else if (c.listen) q = `<div class="listen-q"><button class="speaker-big" onclick="A.uSay('${esc(c.listen)}')">${img('speaker')}</button></div>`;
      else if (c.answer) q = `<p class="uq">${T('Answer', 'Respuesta')}: ${he(c.answer)}</p><p class="ufocus">${T('Ask about', 'Pregunta por')}: ${he(c.focus, 'mark')}</p>`;
      else if (c.sent) q = `<p class="uq he-sent" lang="he" dir="rtl">${gapHtml(c.sent)}</p>${c.cue ? `<p class="ucue">(${he(c.cue)})</p>` : ''}`;
      else if (c.prompt) q = `<button class="uprompt ${c.promptLtr ? 'ltr' : ''}" ${c.say ? `onclick="A.uSay('${esc(c.say)}')"` : ''}>${c.promptLtr ? esc(c.prompt) : he(c.prompt)}${c.say ? img('speaker', 'spk') : ''}</button>`;
      body = `${head}${q}<div class="choices ${c.long ? 'long' : ''}">${c.opts.map((o, k) => `<button class="choice" data-k="${k}" onclick="A.uSel(${k})"><kbd>${k + 1}</kbd>${c.ltr ? `<span>${esc(o)}</span>` : he(o)}</button>`).join('')}</div>`;
      if (X.silent) foot = `<button class="btn green" id="uchk" disabled onclick="A.uCheck()">${T('Next', 'Siguiente')}</button>`;
      if (c.listen) setTimeout(() => sayHe(c.listen), 300);
    }
    $('#overlay').innerHTML = `<div class="sess usess"><header class="sess-top"><button class="x" onclick="A.uQuit()" aria-label="quit">✕</button>
      <div class="pbar"><i style="width:${pct}%"></i></div>${X.hearts !== null ? `<span class="hearts">${img('heart')}<b>${X.hearts}</b></span>` : ''}</header>
      <div class="sess-body"><div class="card-in">${body}</div></div><footer class="sess-foot" id="ufoot"><div class="foot-in">${foot}</div></footer></div>`;
  }
  function teachHtml(t) {
    const txt = x => `<p>${bidi(es() ? x.es : x.en)}</p>`;
    let inner = '';
    if (t.k === 'text') inner = txt(t);
    if (t.k === 'list') inner = `<table class="utable">${t.items.map(([h, en, sp]) => `<tr><td>${he(h)}</td><td>${bidi(es() ? sp : en)}</td></tr>`).join('')}</table>`;
    if (t.k === 'table') inner = conjTable(UL.verb(t.verb), t.tense);
    if (t.k === 'suffix') inner = `<p>${T('Past endings (the same in every binyan):', 'Terminaciones del pasado (iguales en todos los binyanim):')}</p><div class="sfx-grid">${UL.persons.past.map((p, i) => `<div>${he(p)}<b class="he" lang="he">${['…תי', '…ת', '…ת', '—', '…ה', '…נו', '…תם', '…תן', '…ו'][i]}</b></div>`).join('')}</div>`;
    if (t.k === 'pattern') { const ex = { paal: 'לכתוב', piel: 'לדבר', hifil: 'להזמין', hitpael: 'להתלבש', nifal: 'להיכנס' };
      inner = `<table class="utable pat"><tr><th></th><th>${T('infinitive', 'infinitivo')}</th><th>${T(t.tense === 'past' ? 'past (he)' : 'present (he)', t.tense === 'past' ? 'pasado (él)' : 'presente (él)')}</th></tr>${Object.entries(ex).map(([b, inf]) => { const v = UL.verb(inf);
        return `<tr><td><b>${UL.binyanim[b].he}</b><small>${UL.binyanim[b].tr}</small></td><td>${rootMark(v.inf, v.root)}</td><td>${rootMark(t.tense === 'past' ? v.past[3] : v.pres[0], v.root)}</td></tr>`; }).join('')}</table>`; }
    if (t.k === 'clock') inner = `<div class="clock-teach">${clockSvg(7, 45, 'spin')}<p>${T('Hours use feminine numbers: אחת, שתיים, שלוש… Minutes "after" use ו (שבע ורבע), minutes "to" use ל (רבע לשמונה). Then add the part of the day.', 'Las horas usan números femeninos: אחת, שתיים, שלוש… Los minutos "y" usan ו (שבע ורבע), los "menos" usan ל (רבע לשמונה). Después, la parte del día.')}</p></div>`;
    return `<div class="teach">${mascot('happy', 'talk')}<div class="speech pop uteach">${inner}</div></div>`;
  }
  /* color the root letters inside a form */
  function rootMark(form, root) {
    if (!root) return he(form);
    const r = root.split('').map(c => UL.fixFinals(c)), base = c => ({ 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' }[c] || c);
    let k = 0; const out = form.split('').map(ch => { if (k < 3 && base(ch) === base(r[k])) { k++; return `<b class="rl">${ch}</b>`; } return ch; }).join('');
    return `<span class="he" lang="he" dir="rtl">${out}</span>`;
  }
  function conjTable(v, tense) {
    const rows = tense === 'past' ? UL.persons.past.map((p, i) => [p, v.past[i]]) : tense === 'fut' ? UL.persons.fut.map((p, i) => [p, v.fut[i]])
      : tense === 'imp' ? UL.persons.imp.map((p, i) => [p, v.imp ? v.imp[i] : '—']) : UL.persons.pres.map((p, i) => [p, v.pres[i]]);
    return `<p class="vt-head">${he(v.inf)} · ${esc(mean(v))} · <b>${UL.binyanim[v.b].he}</b></p><table class="utable conj">${rows.map(([p, f]) => `<tr><td>${he(p)}</td><td>${rootMark(f, v.root)}<button class="mini-spk" onclick="A.uSay('${esc(f)}')">🔊</button></td></tr>`).join('')}</table>`;
  }
  A.uSay = t => sayHe(t);
  A.uNext = () => { X.i++; draw(); };
  A.uSkip = () => { const c = X.cards[X.i]; X.n++; X.log.push({ c, ok: false }); skillMark(c.skill, false); if (X.retry && !c.again) X.cards.push({ ...c, again: true }); X.i++; draw(); };
  A.uSel = k => {
    if (X.done) return; X.sel = k; const c = X.cards[X.i];
    document.querySelectorAll('.usess .choice').forEach((b, j) => b.classList.toggle('sel', j === k));
    if (X.silent) { SFX.tap(); $('#uchk').disabled = false; return; }
    A.uCheck();
  };
  A.uCheck = () => {
    if (X.done || X.sel === null) return; X.done = true;
    const c = X.cards[X.i], ok = c.opts[X.sel] === c.ans;
    result(ok, c, () => {
      document.querySelectorAll('.usess .choice').forEach((b, j) => { b.disabled = true; if (c.opts[j] === c.ans) b.classList.add('right'); else if (j === X.sel) b.classList.add('bad'); });
      const g = document.querySelector('.usess .gap'); if (g) { g.textContent = c.ans; g.classList.add(ok ? 'ok' : 'bad'); }
    });
  };
  function result(ok, c, paint) {
    X.n++; if (ok) X.ok++; X.log.push({ c, ok }); skillMark(c.skill, ok);
    if (c.word) { const b = U().box; b[c.word.id] = Math.max(0, Math.min(5, (b[c.word.id] || 0) + (ok ? 1 : -1))); }
    if (X.silent) { save(); setTimeout(() => { X.i++; draw(); }, 120); return; }
    paint();
    if (ok) SFX.ok(); else { SFX.no(); if (X.hearts !== null) { X.hearts--; const h = document.querySelector('.usess .hearts b'); if (h) h.textContent = X.hearts; } if (X.retry && !c.again) X.cards.push({ ...c, again: true }); }
    const full = c.sent ? c.sent.replace('_', c.ans) : c.ans;
    if (c.say || c.sent || c.target) setTimeout(() => sayHe(c.sent ? full : c.target || c.say), 300);
    $('#ufoot').className = `sess-foot ${ok ? 'good' : 'bad'}`;
    $('#ufoot').innerHTML = `<div class="foot-in fb"><div class="fb-txt">${ok ? `<h3>${img('check')} ${pick(es() ? ['¡Muy bien!', '¡Excelente!', '¡Perfecto!'] : ['Great!', 'Excellent!', 'Perfect!'])}</h3>` : `<h3>${T('Correct answer:', 'Respuesta correcta:')}</h3><p class="ans">${he(c.target || c.ans)}</p>`}
      ${c.sent ? `<p class="why">${he(full)}</p>` : ''}${c.tr ? `<p class="src">${esc(c.tr)}</p>` : ''}</div><button class="btn ${ok ? 'green' : 'red'}" onclick="A.uAfter()">${T('Continue', 'Continuar')}</button></div>`;
    gain(ok ? 2 : 0); save();
  }
  A.uAfter = () => { if (X.hearts !== null && X.hearts <= 0) return outOfHearts(); X.i++; draw(); };
  function outOfHearts() { SFX.no(); $('#overlay').innerHTML = `<div class="sess center"><div class="end pop">${mascot('sad', 'big')}<h1>${T('Out of hearts', 'Sin corazones')}</h1><p>${T('Mistakes are how you learn. Try the lesson again.', 'Los errores enseñan. Repite la lección.')}</p>
    <div class="row"><button class="btn green" onclick="A.uRestart()">${T('Try again', 'Repetir')}</button><button class="btn ghost" onclick="A.uQuit()">${T('Quit', 'Salir')}</button></div></div></div>`; }
  A.uRestart = () => { const o = X.restart; closeU(); if (o) o(); };
  A.uPair = el => {
    if (el.classList.contains('ok')) return;
    const p = X.pair;
    if (el.dataset.s === 'L') sayHe(el.textContent);
    if (!p.sel || p.sel.dataset.s === el.dataset.s) { document.querySelectorAll('.usess .ptile').forEach(t => t.classList.remove('sel')); el.classList.add('sel'); p.sel = el; return; }
    if (p.sel.dataset.id === el.dataset.id) { [p.sel, el].forEach(t => { t.classList.remove('sel'); t.classList.add('ok'); }); SFX.ok(); p.done++; p.sel = null; if (p.done === p.n) { $('#uctn').disabled = false; X.n++; X.ok++; gain(3); } }
    else { [p.sel, el].forEach(t => { t.classList.add('bad'); setTimeout(() => t.classList.remove('bad', 'sel'), 400); }); SFX.no(); p.sel = null; }
  };
  A.uTile = k => {
    if (X.done) return; const c = X.cards[X.i]; const at = X.built.indexOf(k);
    if (at > -1) X.built.splice(at, 1); else X.built.push(k);
    SFX.tap();
    const sep = c.type === 'build' ? ' ' : '';
    $('#ubuilt').innerHTML = X.built.map(i => `<button class="utile on" onclick="A.uTile(${i})">${esc(X.tiles[i])}</button>`).join('');
    document.querySelectorAll('.usess .utiles .utile').forEach(b => b.classList.toggle('used', X.built.includes(+b.dataset.k)));
    $('#uchk').disabled = !X.built.length;
    X.builtText = X.built.map(i => X.tiles[i]).join(sep);
  };
  A.uCheckBuild = () => {
    if (X.done) return; X.done = true; const c = X.cards[X.i];
    const norm = s => s.replace(/[.,!?״"']/g, '').trim();
    const ok = norm(X.builtText || '') === norm(c.target);
    result(ok, c, () => { $('#ubuilt').classList.add(ok ? 'ok' : 'bad'); document.querySelectorAll('.usess .utile').forEach(b => b.disabled = true); });
  };
  function finish() {
    const acc = X.n ? Math.round(100 * X.ok / X.n) : 100, secs = Math.round((Date.now() - X.start) / 1000);
    const xp = 10 + X.ok * 2; gain(10);
    if (X.onEnd) X.onEnd(acc);
    save(); SFX.win(); if (acc >= 80) confetti();
    const by = {}; X.log.forEach(r => { if (!r.c.skill) return; const b = by[r.c.skill] || (by[r.c.skill] = { ok: 0, n: 0 }); b.n++; if (r.ok) b.ok++; });
    $('#overlay').innerHTML = `<div class="sess center"><div class="end">${mascot(acc >= 60 ? 'happy' : 'sad', 'big jump')}<h1 class="pop">${X.title || T('Lesson complete!', '¡Lección completada!')}</h1>
      <div class="end-stats"><div class="es gold"><small>XP</small><b data-c="${xp}">0</b></div><div class="es green"><small>${T('Accuracy', 'Precisión')}</small><b data-c="${acc}" data-suffix="%">0</b></div>
      <div class="es blue"><small>${T('Time', 'Tiempo')}</small><b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div></div>
      ${X.extra ? X.extra(by) : ''}<button class="btn green wide" onclick="A.uDone()">${T('Continue', 'Continuar')}</button></div></div>`;
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  }
  A.uDone = () => { const back = X && X.back || '#/ulpan'; closeU(); if (location.hash === back) R.ulpan(); else location.hash = back; };

  /* ===================== pages ===================== */
  const levelProgress = lv => { const us = unitsOf(lv), tot = us.reduce((n, u) => n + u.lessons.length + 1, 0), d = U().done;
    const done = us.reduce((n, u) => n + u.lessons.filter((_, i) => d[lessonKey(u.id, i)]).length + (U().tests[u.id] >= 75 ? 1 : 0), 0); return { done, tot }; };
  function nextLesson() {
    const u = U(); const order = ['a', 'a+', 'b']; const start = order.indexOf(u.lv);
    for (const lv of order.slice(Math.max(0, start))) for (const unit of unitsOf(lv)) {
      for (let i = 0; i < unit.lessons.length; i++) if (!u.done[lessonKey(unit.id, i)]) return { unit, i };
      if (!(u.tests[unit.id] >= 75)) return { unit, i: 'test' };
    }
    return null;
  }
  function weakSkills(n = 3) {
    const sk = U().skill;
    const measured = Object.entries(sk).filter(([k, v]) => v.n >= 3 && SKILL_GEN[k]).map(([k, v]) => [k, v.ok / v.n]).sort((a, b) => a[1] - b[1]);
    const fromPhotos = UL.profile.weak.map(w => w[0]).filter(k => SKILL_GEN[k] && !(sk[k] && sk[k].n >= 6 && sk[k].ok / sk[k].n >= .85));
    return [...new Set([...measured.filter(m => m[1] < .8).map(m => m[0]), ...fromPhotos])].slice(0, n);
  }
  const subTabs = cur => `<nav class="utabs">${[['path', 'books', T('Path', 'Camino')], ['games', 'target', T('Games', 'Juegos')], ['talk', 'phone', T('Talk', 'Conversar')], ['scan', 'sparkles', T('Scan a page', 'Escanear')], ['exam', 'trophy', T('Exams', 'Exámenes')], ['verbs', 'flash', T('Verbs', 'Verbos')]]
    .map(([k, i, l]) => `<a href="#/ulpan/${k}" class="${cur === k ? 'on' : ''}">${img(i)}<span>${l}</span></a>`).join('')}</nav>`;
  function ulHead() {
    const u = U(), p = levelProgress(u.lv);
    return `<section class="uhead card"><div class="ubadge"><b class="he" lang="he">${lvHe(u.lv)}</b><small>${T('level', 'nivel')}</small></div>
      <div class="uhead-mid"><h1>${T('Ulpan Hebrew', 'Hebreo del ulpán')} <span class="he" lang="he">עברית</span></h1>
        <div class="ubar"><i style="width:${p.tot ? 100 * p.done / p.tot : 0}%"></i><span>${p.done}/${p.tot} ${T('steps in level', 'pasos del nivel')} ${lvHe(u.lv)}</span></div></div>
      <div class="uxp">${img('gem')}<b>${u.xp}</b><small>XP</small></div></section>`;
  }
  R.ulpan = sub => {
    sub = sub || 'path';
    ({ path: pagePath, games: pageGames, talk: pageTalk, scan: pageScan, exam: pageExams, verbs: pageVerbs })[sub] ? ({ path: pagePath, games: pageGames, talk: pageTalk, scan: pageScan, exam: pageExams, verbs: pageVerbs })[sub]() : pagePath();
  };
  function pagePath() {
    const u = U(), nx = nextLesson(), weak = weakSkills();
    const profile = !u.placed ? `<section class="card uprofile"><h2>${img('mary')} ${T('Where Mary is now', 'Dónde está Mary ahora')}</h2>
        <p>${T(`From her class test (87.5, 11.10.26) and homework: level ${lvHe(UL.profile.level)}, the end of Aleph.`, `Según su examen de clase (87,5, 11.10.26) y sus deberes: nivel ${lvHe(UL.profile.level)}, el final de Alef.`)}</p>
        <div class="two"><div><h3>💪 ${T('Strong', 'Fuerte')}</h3><ul>${UL.profile.strong.map(s => `<li>${bidi(L2(s))}</li>`).join('')}</ul></div>
        <div><h3>🎯 ${T('To work on', 'A trabajar')}</h3><ul>${UL.profile.weak.map(w => `<li>${bidi(es() ? w[2] : w[1])}</li>`).join('')}</ul></div></div>
        <a class="btn green" href="#/uplace">${T('Take the quick level test (8 min)', 'Hacer el test rápido de nivel (8 min)')} →</a></section>` : '';
    const cta = nx ? `<a class="card ucta tilt" href="${nx.i === 'test' ? `#/utest/${nx.unit.id}` : `#/ulesson/${nx.unit.id}/${nx.i}`}">${img(nx.unit.icon, 'wiggle')}<div><small>${T('Continue', 'Continuar')} · ${lvHe(nx.unit.lv)}</small>
        <b>${nx.i === 'test' ? T('Unit test: ', 'Test de la unidad: ') + esc(L2(nx.unit.t)) : esc(L2(nx.unit.lessons[nx.i].t))}</b><span>${he(nx.unit.he)}</span></div><span class="go">→</span></a>` : '';
    const weakCard = weak.length ? `<a class="card uweak tilt" href="#/uweak">${img('target')}<div><small>${T('Fix my weak spots', 'Mejorar mis puntos débiles')}</small><b>${weak.map(k => esc(L2(UL.skills[k]))).join(' · ')}</b></div><span class="go">→</span></a>` : '';
    view(`${ulHead()}${subTabs('path')}${profile}<div class="ucta-row">${cta}${weakCard}</div>
      ${UL.levels.map(L => {
        const us = unitsOf(L.id), cur = L.id === u.lv;
        return `<section class="ulevel ${cur ? 'cur' : ''} ${L.soon ? 'soon' : ''}"><div class="ulevel-h"><b class="he" lang="he">${L.he}</b><div><h2>${esc(L2(L.t))}</h2><p>${esc(L2(L.d))}</p></div>
          ${cur ? `<span class="chip">${T('you are here', 'estás aquí')}</span>` : ''}${L.id === 'a+' || L.id === 'b' ? `<a class="chip" href="#/uexam/${L.id === 'a+' ? 'a' : 'b'}">📝 ${T('mock exam', 'examen de prueba')}</a>` : ''}</div>
          ${L.soon ? `<p class="fine">${L.id === 'd' ? T('Next nurses\' Hebrew exam dates (Ministry of Education): 3–4 Nov 2026, 2–3 Feb, 18–19 May, 3–4 Aug 2027. Dictionaries are not allowed; 65% passes.', 'Próximas fechas del examen de hebreo para enfermeras (Ministerio de Educación): 3–4 nov 2026, 2–3 feb, 18–19 may, 3–4 ago 2027. No se permite diccionario; se aprueba con 65%.') : T('Unlocks after Bet.', 'Se desbloquea después de Bet.')}</p>` : ''}
          <div class="uunits">${us.map(unit => { const done = unit.lessons.filter((_, i) => u.done[lessonKey(unit.id, i)]).length, tp = u.tests[unit.id];
            return `<div class="uunit card ${done === unit.lessons.length && tp >= 75 ? 'complete' : ''} ${(unit.weak || []).some(w => weak.includes(w)) ? 'focus' : ''}">
              <div class="uunit-h">${img(unit.icon)}<div><h3>${esc(L2(unit.t))}</h3>${he(unit.he)}</div>${(unit.weak || []).some(w => weak.includes(w)) ? `<span class="tag">🎯</span>` : ''}</div>
              <div class="ulessons">${unit.lessons.map((l, i) => `<a href="#/ulesson/${unit.id}/${i}" class="ul ${u.done[lessonKey(unit.id, i)] ? 'done' : ''}" title="${esc(L2(l.t))}"><i>${u.done[lessonKey(unit.id, i)] ? '✓' : i + 1}</i><span>${esc(L2(l.t))}</span></a>`).join('')}
                <a href="#/utest/${unit.id}" class="ul test ${tp >= 75 ? 'done' : ''}"><i>${tp >= 75 ? '★' : '?'}</i><span>${T('Unit test', 'Test')}${tp !== undefined ? ` · ${tp}%` : ''}</span></a></div></div>`; }).join('')}</div></section>`;
      }).join('')}`);
  }
  R.ulesson = (id, i) => {
    const unit = UL.units.find(u => u.id === id); i = +i; if (!unit || !unit.lessons[i]) return R.ulpan();
    R.ulpan();
    const start = () => session(lessonCards(unit, i), { back: '#/ulpan', restart: start, onEnd: acc => { if (acc >= 50) U().done[lessonKey(id, i)] = 1; } });
    start();
  };
  R.utest = id => {
    const unit = UL.units.find(u => u.id === id); if (!unit) return R.ulpan();
    R.ulpan();
    const start = () => { const mix = unit.lessons.flatMap(l => (l.mix || []).filter(m => !['pairs'].includes(m[0])).map(m => [m[0], Math.max(1, Math.round(m[1] / 2)), m[2], words(l.words || [])]));
      const cards = shuffle(mix.flatMap(([g, n, o, W]) => gen(g, n, o || {}, W))).slice(0, 12);
      session(cards, { back: '#/ulpan', hearts: false, retry: false, title: T('Unit test', 'Test de la unidad'), restart: start,
        onEnd: acc => { const t = U().tests; t[id] = Math.max(t[id] || 0, acc); if (acc >= 75) { gain(20); } } }); };
    start();
  };
  R.uweak = () => {
    R.ulpan();
    const ks = weakSkills(4); if (!ks.length) return toast(T('No weak spots yet. Keep going!', 'Aún no hay puntos débiles. ¡Sigue así!'), 'party');
    const cards = shuffle(ks.flatMap(k => gen(SKILL_GEN[k][0], 4, SKILL_GEN[k][1])));
    session(cards, { back: '#/ulpan', title: T('Weak spots practised', 'Puntos débiles practicados') });
  };
  /* placement test */
  R.uplace = () => {
    R.ulpan();
    const mk = (row, stage) => { const [skill, q, a, d, en, sp] = row; return { type: 'mcq', skill, sent: q, opts: shuffle([a, ...d.split(',')]), ans: a, tr: es() ? sp : en, stage }; };
    const stages = { a: UL.placeRows.a.map(r => mk(r, 'a')), ap: UL.placeRows.ap.map(r => mk(r, 'ap')), b: UL.placeRows.b.map(r => mk(r, 'b')) };
    const intro = { type: 'teach', t: { k: 'text', en: '28 quick questions in three steps (Aleph, Aleph+, Bet). No hints and no hearts: answer what you know. It stops early when a step is too hard.', es: '28 preguntas rápidas en tres pasos (Alef, Alef+, Bet). Sin pistas ni corazones: responde lo que sepas. Se detiene antes si un paso es demasiado difícil.' } };
    session([intro, ...stages.a, { type: 'gate', stage: 'a' }], { silent: true, hearts: false, retry: false, back: '#/ulpan', title: T('Level test done', 'Test de nivel terminado'), stages });
  };
  /* gate cards make the placement adaptive: continue to the next stage only if this one went well */
  function gate(c) {
    const st = c.stage, items = X.log.filter(r => r.c.stage === st), ok = items.filter(r => r.ok).length, need = { a: 6, ap: 8, b: 5 }[st], nextSt = { a: 'ap', ap: 'b' }[st];
    if (ok >= need && nextSt) { X.cards.splice(X.i + 1, 0, ...X.stages[nextSt], { type: 'gate', stage: nextSt }); X.i++; return draw(); }
    const lv = st === 'a' ? 'a' : st === 'ap' ? 'a+' : 'b';
    const sk = {}; X.log.forEach(r => { if (!r.c.skill || !r.c.stage) return; const x = sk[r.c.skill] || (sk[r.c.skill] = [0, 0]); x[1]++; if (r.ok) x[0]++; });
    U().placed = { d: new Date().toISOString().slice(0, 10), lv, sk }; U().lv = lv; save();
    X.extra = () => `<div class="uplaced"><p>${T('Your starting level', 'Tu nivel inicial')}: <b class="he" lang="he">${lvHe(lv)}</b></p><div class="skillbars">${Object.entries(sk).map(([k, [o, n]]) =>
      `<div><span>${esc(L2(UL.skills[k] || [k, k]))}</span><div class="mbar-mini"><i style="width:${100 * o / n}%"></i></div><small>${o}/${n}</small></div>`).join('')}</div></div>`;
    X.i = X.cards.length; return finish();
  }

  /* ===================== games ===================== */
  const GAMES = [['clock', 'thermo', T('Clock Rush', 'Carrera del reloj'), T('Read the clock: רבע ל…, ועשרים, בערב or בלילה', 'Lee el reloj: רבע ל…, ועשרים, בערב o בלילה')],
    ['forge', 'flash', T('Verb Forge', 'Forja de verbos'), T('Build verb forms letter by letter from the root', 'Construye verbos letra a letra desde la raíz')],
    ['builder', 'books', T('Sentence Builder', 'Constructor de frases'), T('Put the words in the right order', 'Ordena las palabras')],
    ['pop', 'party', T('Preposition Pop', 'Explota preposiciones'), T('Pop the right preposition before it flies away', 'Explota la preposición correcta antes de que se escape')],
    ['agree', 'gem', T('Agree!', '¡Concuerda!'), T('60 seconds of adjective agreement', '60 segundos de concordancia')],
    ['qmaker', 'bulb', T('Question Maker', 'Hacedor de preguntas'), T('Ask about the highlighted part', 'Pregunta por la parte resaltada')],
    ['pluralizer', 'trophy', T('Plural Machine', 'Máquina de plurales'), T('Turn whole sentences into the plural', 'Pasa frases enteras al plural')],
    ['dictation', 'speaker', T('Dictation', 'Dictado'), T('Hear it, spell it', 'Escúchalo, escríbelo')],
    ['urain', 'heb', T('Word Rain (Ulpan words)', 'Lluvia de palabras (ulpán)'), T('Catch the falling words', 'Atrapa las palabras que caen')],
    ['umemory', 'flash', T('Memory Flip (Ulpan words)', 'Memoria (ulpán)'), T('Match Hebrew and meaning', 'Une hebreo y significado')]];
  function pageGames() {
    const b = U().best;
    view(`${ulHead()}${subTabs('games')}<div class="game-grid">${GAMES.map(([k, i, t, d], n) => `<a class="card game tilt" href="#/ugame/${k}" style="--d:${n * 50}ms">${img(i, 'wiggle')}<h3>${t}</h3><p>${d}</p>${b[k] ? `<span class="chip">${T('record', 'récord')}: ${b[k]}</span>` : ''}</a>`).join('')}</div>`);
  }
  R.ugame = k => {
    if (k === 'urain') return location.hash = '#/rain/ul';
    if (k === 'umemory') return location.hash = '#/memory/ul';
    const games = { clock: () => runRush('clock', T('Clock Rush', 'Carrera del reloj'), () => timeCard(), 10),
      builder: () => runRush('builder', T('Sentence Builder', 'Constructor de frases'), () => GEN.build({}), 8),
      qmaker: () => runRush('qmaker', T('Question Maker', 'Hacedor de preguntas'), () => GEN.qword(), 8),
      pluralizer: () => runRush('pluralizer', T('Plural Machine', 'Máquina de plurales'), () => GEN.plural(), 8),
      dictation: () => runRush('dictation', T('Dictation', 'Dictado'), () => Math.random() < .5 ? GEN.spell({}, []) : { ...GEN.build({ lv: 'a' }), dict: true }, 8),
      forge: forgeGame, pop: popGame, agree: agreeGame };
    (games[k] || pageGames)();
  };
  function runRush(key, title, make, n) {
    R.ulpan('games');
    session(Array.from({ length: n }, make), { back: '#/ulpan/games', hearts: false, title,
      onEnd: acc => { const b = U().best; const sc = Math.round(acc * n / 100); if (!b[key] || sc > b[key]) b[key] = sc; } });
  }
  /* Verb Forge: root letters + target → build the form from letter tiles */
  let VF = null;
  function forgeGame() {
    const pool = UL.verbs.filter(v => !v.irr && v.lv === 'a');
    VF = { rounds: Array.from({ length: 8 }, () => { const v = pick(pool); const t = pick(['past', 'past', 'pres', 'inf']); const i = t === 'past' ? pick([0, 3, 4, 5, 8]) : t === 'pres' ? pick([0, 1, 2]) : 0;
      return { v, t, i, form: t === 'inf' ? v.inf : v[t][i] }; }), k: 0, score: 0 };
    drawForge();
  }
  function drawForge() {
    const r = VF.rounds[VF.k]; if (!r) { const b = U().best; if (!b.forge || VF.score > b.forge) b.forge = VF.score; save(); confetti();
      return view(`<a class="crumb" href="#/ulpan/games">← ${T('Games', 'Juegos')}</a><section class="card center-card end-game">${mascot('happy', 'big jump')}<h1>${T('Verb Forge', 'Forja de verbos')}</h1><p class="big-score"><b>${VF.score}</b>/8</p><div class="row"><button class="btn green" onclick="A.uGame('forge')">${T('Again', 'Otra vez')}</button></div></section>`); }
    const who = r.t === 'inf' ? T('infinitive', 'infinitivo') : r.t === 'past' ? UL.persons.past[r.i] + ' · ' + T('past', 'pasado') : UL.persons.pres[r.i] + ' · ' + T('present', 'presente');
    const letters = shuffle([...r.form.split(''), ...shuffle(['י', 'ה', 'ת', 'נ', 'ו', 'מ', 'ל'].filter(x => !r.form.includes(x))).slice(0, 2)]);
    VF.letters = letters; VF.built = [];
    view(`<a class="crumb" href="#/ulpan/games">← ${T('Games', 'Juegos')}</a><div class="game-top"><h1>${img('flash')} ${T('Verb Forge', 'Forja de verbos')}</h1><span class="chip">${VF.k + 1}/8 · ⭐ ${VF.score}</span></div>
      <section class="card forge pop"><div class="root-row" lang="he" dir="rtl">${r.v.root.split('').map(ch => `<span class="root-l">${ch}</span>`).join('<i>·</i>')}</div>
        <p class="forge-target"><b>${UL.binyanim[r.v.b].he}</b> · ${he(who)} · ${esc(mean(r.v))}</p>
        <div class="anvil" id="anvil" lang="he" dir="rtl"></div>
        <div class="utiles" lang="he" dir="rtl">${letters.map((l, k) => `<button class="utile" data-k="${k}" onclick="A.fTile(${k})">${l}</button>`).join('')}</div>
        <div class="row"><button class="btn ghost" onclick="A.fClear()">${T('Clear', 'Borrar')}</button><button class="btn green" onclick="A.fCheck()">${T('Forge it!', '¡Forjar!')}</button></div><div id="ffb"></div></section>`);
  }
  A.uGame = k => R.ugame(k);
  A.fTile = k => { if (VF.done) return; const at = VF.built.indexOf(k); if (at > -1) VF.built.splice(at, 1); else VF.built.push(k); SFX.tap();
    $('#anvil').innerHTML = VF.built.map(i => `<span class="slot">${VF.letters[i]}</span>`).join('');
    document.querySelectorAll('.forge .utile').forEach(b => b.classList.toggle('used', VF.built.includes(+b.dataset.k))); };
  A.fClear = () => { VF.built = []; $('#anvil').innerHTML = ''; document.querySelectorAll('.forge .utile').forEach(b => b.classList.remove('used')); };
  A.fCheck = () => {
    if (VF.done) return; const r = VF.rounds[VF.k], got = UL.fixFinals(VF.built.map(i => VF.letters[i]).join('')), ok = got === r.form; VF.done = true;
    if (ok) { VF.score++; SFX.ok(); gain(3); } else SFX.no();
    $('#anvil').classList.add(ok ? 'ok' : 'bad'); sayHe(r.form);
    $('#ffb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${he(r.form)}</b><p>${rootMark(r.form, r.v.root)} · ${esc(verbTr(r.v))}</p><button class="btn ${ok ? 'green' : 'red'}" onclick="A.fNext()">${T('Next', 'Siguiente')} →</button></div>`;
  };
  A.fNext = () => { VF.k++; VF.done = false; drawForge(); };
  /* Preposition Pop: bubbles float up; tap the right one */
  let PP = null;
  function popGame() {
    PP = { score: 0, lives: 3, k: 0, raf: 0 };
    view(`<a class="crumb" href="#/ulpan/games">← ${T('Games', 'Juegos')}</a><div class="game-top"><h1>${img('party')} ${T('Preposition Pop', 'Explota preposiciones')}</h1><span class="chip" id="ppstat">❤❤❤ · 0</span></div>
      <section class="card pop-stage"><p class="uq he-sent" id="ppq" lang="he" dir="rtl"></p><div class="bubbles" id="bubbles"></div><div id="ppfb"></div></section>`);
    onLeave(() => { clearTimeout(PP.timer); clearTimeout(PP.next); PP.gone = true; });
    popRound();
  }
  function popRound() {
    if (PP.gone || !$('#ppq')) return;
    const x = pick(UL.prep); PP.cur = x; PP.locked = false;
    $('#ppq').innerHTML = gapHtml(x.s);
    const opts = shuffle([x.a, ...x.d]); const speed = 24 + PP.k * 2.2;
    $('#bubbles').innerHTML = opts.map((o, i) => `<button class="bubble he" lang="he" style="--x:${10 + i * 22}%;--dur:${Math.max(4.5, 9 - PP.k * .3)}s;--delay:${i * .25}s" onclick="A.ppTap(this,'${esc(o)}')">${esc(o)}</button>`).join('');
    clearTimeout(PP.timer); PP.timer = setTimeout(() => { if (!PP.locked) A.ppTap(null, null); }, (Math.max(4.5, 9 - PP.k * .3) + .8) * 1000);
  }
  A.ppTap = (el, o) => {
    if (PP.locked || PP.gone || !$('#ppq')) return; PP.locked = true; clearTimeout(PP.timer); const ok = o === PP.cur.a;
    if (el) { el.classList.add(ok ? 'popped' : 'wrong'); }
    if (ok) { PP.score++; SFX.ok(); gain(1); } else { PP.lives--; SFX.no(); }
    $('#ppq').innerHTML = gapHtml(PP.cur.s, PP.cur.a, ok ? 'ok' : 'bad'); sayHe(PP.cur.s.replace('_', PP.cur.a));
    $('#ppstat').textContent = `${'❤'.repeat(Math.max(0, PP.lives))} · ${PP.score}`;
    PP.k++;
    PP.next = setTimeout(() => {
      if (PP.gone || !$('#ppfb')) return;
      if (PP.lives <= 0 || PP.k >= 15) { const b = U().best; if (!b.pop || PP.score > b.pop) b.pop = PP.score; save(); if (PP.score >= 10) confetti();
        $('#ppfb').innerHTML = `<div class="simfb ${PP.score >= 10 ? 'good' : 'meh'} pop"><b>${PP.score}/15</b><button class="btn green" onclick="A.uGame('pop')">${T('Play again', 'Jugar otra vez')}</button></div>`; $('#bubbles').innerHTML = ''; return; }
      popRound();
    }, ok ? 900 : 1600);
  };
  /* Agree! 60-second rush */
  let AG = null;
  function agreeGame() {
    AG = { score: 0, streak: 0, end: Date.now() + 60000 };
    view(`<a class="crumb" href="#/ulpan/games">← ${T('Games', 'Juegos')}</a><div class="game-top"><h1>${img('gem')} ${T('Agree!', '¡Concuerda!')}</h1><span class="chip" id="agt">60s</span><span class="chip" id="ags">0</span></div>
      <section class="card agree-card" id="agc"></section>`);
    const t = setInterval(() => { const left = Math.max(0, Math.ceil((AG.end - Date.now()) / 1000)); const el = $('#agt'); if (el) el.textContent = left + 's'; if (!left) { clearInterval(t); agreeEnd(); } }, 250);
    onLeave(() => clearInterval(t));
    agreeRound();
  }
  function agreeRound() { if (!$('#agc')) return; const c = GEN.agree(); AG.c = c;
    $('#agc').innerHTML = `<p class="uq he-sent" lang="he" dir="rtl">${gapHtml(c.sent)}</p><p class="utr">${esc(c.tr)}</p><div class="choices tiles">${c.opts.map(o => `<button class="choice" onclick="A.agPick(this,'${esc(o)}')">${he(o)}</button>`).join('')}</div>`; }
  A.agPick = (el, o) => { if (Date.now() > AG.end) return; const ok = o === AG.c.ans; el.classList.add(ok ? 'right' : 'bad');
    if (ok) { AG.score += 1 + (AG.streak >= 4 ? 1 : 0); AG.streak++; SFX.ok(); } else { AG.streak = 0; SFX.no(); }
    skillMark('agree', ok); $('#ags').textContent = AG.score + (AG.streak >= 4 ? ' 🔥' : ''); setTimeout(agreeRound, ok ? 250 : 700); };
  function agreeEnd() { if (!$('#agc')) return; const b = U().best; if (!b.agree || AG.score > b.agree) b.agree = AG.score; gain(AG.score); save(); if (AG.score >= 15) confetti();
    $('#agc').innerHTML = `<div class="center">${mascot('happy', 'big jump')}<h2>${T('Time!', '¡Tiempo!')}</h2><p class="big-score"><b>${AG.score}</b></p><button class="btn green" onclick="A.uGame('agree')">${T('Again', 'Otra vez')}</button></div>`; }

  /* ===================== conversations ===================== */
  function pageTalk() {
    const d = U().talks;
    view(`${ulHead()}${subTabs('talk')}<div class="talk-grid">${UL.talks.map((t, n) => `<a class="card talk-card tilt" href="#/utalk/${t.id}" style="--d:${n * 40}ms">${img(t.img)}<div><h3>${esc(L2(t.t))}</h3>${he(t.scene)}<small>${lvHe(t.lv)}${d[t.id] ? ` · ★ ${d[t.id]}%` : ''}</small></div></a>`).join('')}</div>`);
  }
  let TK = null;
  R.utalk = id => {
    const t = UL.talks.find(x => x.id === id); if (!t) return pageTalk();
    TK = { t, i: 0, ok: 0, n: 0, q: 0 };
    view(`<a class="crumb" href="#/ulpan/talk">← ${T('Conversations', 'Conversaciones')}</a><section class="card chat"><div class="chat-head">${img(t.img)}<div><h2>${esc(L2(t.t))}</h2>${he(t.scene)}</div>
      <button class="btn ghost small" onclick="A.tkTr()">${T('Translation', 'Traducción')}</button></div><div class="chat-log" id="clog"></div><div class="chat-foot" id="cfoot"></div></section>`);
    onLeave(() => { clearTimeout(TK && TK.timer); stopVoice(); });
    talkStep();
  };
  A.tkTr = () => document.querySelector('.chat').classList.toggle('show-tr');
  const bubble = (who, text, tr, me) => { const c = UL.cast[who] || UL.cast.me;
    return `<div class="msg ${me ? 'me' : ''} pop">${img(c[1], 'av')}<div class="bub"><small>${c[0]}</small>${he(text)}<button class="mini-spk" onclick="A.uSay('${esc(text)}')">🔊</button><em class="tr">${esc(tr)}</em></div></div>`; };
  function talkStep() {
    const t = TK.t, l = t.lines[TK.i], log = $('#clog'); if (!log) return;
    if (!l) return talkQuestions();
    const [who, text, en, sp] = l;
    if (who === 'me') {
      const opts = shuffle(text.map((x, k) => [x, k]));
      $('#cfoot').innerHTML = `<p class="your-turn">${img('mary')} ${T('Your turn: choose what Mary says', 'Tu turno: elige qué dice Mary')}</p><div class="choices">${opts.map(([x, k]) => `<button class="choice" onclick="A.tkPick(${k},this)">${he(x)}</button>`).join('')}</div>`;
      log.scrollTop = log.scrollHeight; return;
    }
    $('#cfoot').innerHTML = `<div class="typing"><i></i><i></i><i></i></div>`;
    TK.timer = setTimeout(() => { log.insertAdjacentHTML('beforeend', bubble(who, text, es() ? sp : en)); log.scrollTop = log.scrollHeight; sayHe(text);
      $('#cfoot').innerHTML = `<button class="btn green wide" onclick="A.tkNext()">${T('Continue', 'Continuar')}</button>`; }, 700);
  }
  A.tkNext = () => { TK.i++; talkStep(); };
  A.tkPick = (k, el) => {
    const l = TK.t.lines[TK.i], ok = k === 0; TK.n++; if (ok) TK.ok++;
    el.classList.add(ok ? 'right' : 'bad'); ok ? SFX.ok() : SFX.no(); skillMark('vocab', ok);
    setTimeout(() => { $('#clog').insertAdjacentHTML('beforeend', bubble('me', l[1][0], es() ? l[3] : l[2], true)); sayHe(l[1][0]);
      $('#cfoot').innerHTML = ok ? `<button class="btn green wide" onclick="A.tkNext()">${T('Continue', 'Continuar')}</button>` : `<p class="fine">${T('Mary would say:', 'Mary diría:')} ${he(l[1][0])}</p><button class="btn green wide" onclick="A.tkNext()">${T('Continue', 'Continuar')}</button>`;
      $('#clog').scrollTop = $('#clog').scrollHeight; }, ok ? 300 : 900);
  };
  function talkQuestions() {
    const q = TK.t.q[TK.q];
    if (!q) { const pct = TK.n ? Math.round(100 * TK.ok / TK.n) : 100; const d = U().talks; d[TK.t.id] = Math.max(d[TK.t.id] || 0, pct); gain(10 + TK.ok * 2); save(); SFX.win(); if (pct >= 80) confetti();
      $('#cfoot').innerHTML = `<div class="simfb ${pct >= 70 ? 'good' : 'meh'} pop"><b>${pct}%</b><p>${T('Conversation complete. Replay it with your own voice: read Mary\'s lines out loud.', 'Conversación completa. Repítela con tu voz: lee en voz alta las frases de Mary.')}</p><div class="row"><a class="btn green" href="#/ulpan/talk">${T('More conversations', 'Más conversaciones')}</a></div></div>`; return; }
    const [qq, opts, a, en, sp] = q, sh = shuffle(opts.map((o, k) => [o, k]));
    $('#cfoot').innerHTML = `<p class="your-turn">❓ ${he(qq)} <em class="tr-inline">${esc(es() ? sp : en)}</em></p><div class="choices">${sh.map(([o, k]) => `<button class="choice" onclick="A.tkQ(${k},${a},this)">${he(o)}</button>`).join('')}</div>`;
  }
  A.tkQ = (k, a, el) => { const ok = k === a; TK.n++; if (ok) TK.ok++; el.classList.add(ok ? 'right' : 'bad'); ok ? SFX.ok() : SFX.no(); skillMark('read', ok); setTimeout(() => { TK.q++; talkQuestions(); }, ok ? 500 : 1200); };

  /* ===================== verbs explorer ===================== */
  function pageVerbs(sel) {
    const v = UL.verb(sel || (U().lastVerb) || 'להתלבש'); U().lastVerb = v.inf;
    view(`${ulHead()}${subTabs('verbs')}<section class="card verbs"><div class="vpick"><select onchange="A.vPick(this.value)">${Object.keys(UL.binyanim).map(b => `<optgroup label="${UL.binyanim[b].he} · ${UL.binyanim[b].tr}">${UL.verbs.filter(x => x.b === b).map(x => `<option value="${x.inf}" ${x.inf === v.inf ? 'selected' : ''}>${x.inf} · ${esc(mean(x))}</option>`).join('')}</optgroup>`).join('')}</select></div>
      <div class="vgrid">${['past', 'pres', 'fut', 'imp'].map(t => `<div><h3>${{ past: T('Past', 'Pasado'), pres: T('Present', 'Presente'), fut: T('Future', 'Futuro'), imp: T('Imperative', 'Imperativo') }[t]} <span class="he" lang="he">${{ past: 'עבר', pres: 'הווה', fut: 'עתיד', imp: 'ציווי' }[t]}</span></h3>${conjTable(v, t)}</div>`).join('')}</div>
      ${v.irr ? `<p class="fine">⚠ ${T('Irregular verb: learn its forms by heart.', 'Verbo irregular: aprende sus formas de memoria.')}</p>` : `<p class="fine">${T('Coloured letters are the root.', 'Las letras de color son la raíz.')}</p>`}</section>`);
  }
  A.vPick = inf => pageVerbs(inf);

  /* ===================== exams (Ministry of Education format) ===================== */
  function pageExams() {
    const e = U().exams;
    view(`${ulHead()}${subTabs('exam')}<div class="exam-cards">
      ${[['a', T('End of Aleph exam', 'Examen de fin de Alef'), T('Reading 30 · Language 50 · Writing 20 · 2 hours', 'Lectura 30 · Lengua 50 · Escritura 20 · 2 horas')], ['b', T('End of Bet exam', 'Examen de fin de Bet'), T('Reading 30 · Language 40 · Writing 30 · 2¼ hours', 'Lectura 30 · Lengua 40 · Escritura 30 · 2¼ horas')]].map(([k, t, d]) =>
        `<a class="card exam-card tilt" href="#/uexam/${k}">${img('trophy')}<div><h3>${t}</h3><p>${d}</p>${e[k] ? `<span class="chip">${T('best', 'mejor')}: ${e[k]}</span>` : ''}</div></a>`).join('')}
      <div class="card exam-card info">${img('clipboard')}<div><h3>${T('Nurses\' Hebrew proficiency exam', 'Examen de hebreo para enfermeras')}</h3><p>${T('Level ד. Rephrasing, connectors, a medical reading, a cloze and a nursing anamnesis report. 65% passes; no dictionary.', 'Nivel ד. Paráfrasis, conectores, lectura médica, texto con huecos y un informe de anamnesis de enfermería. Se aprueba con 65%; sin diccionario.')}</p></div></div></div>
      <p class="fine">${T('Mock exams follow the Ministry of Education\'s published sample exams for the end of levels א and ב (2017 curriculum). Questions are original.', 'Los exámenes de prueba siguen los modelos publicados por el Ministerio de Educación para el fin de los niveles א y ב (programa 2017). Las preguntas son originales.')}</p>`);
  }
  let EX = null;
  R.uexam = lv => {
    lv = lv === 'b' ? 'b' : 'a';
    const reads = UL.reads.filter(r => r.lv === lv);
    const story = pick(reads.filter(r => r.kind === 'story')), notice = reads.find(r => r.kind === 'notice') || pick(reads.filter(r => r !== story));
    const g = (name, n, o) => gen(name, n, o || {});
    const parts = lv === 'a' ? [
      { t: T('Part 1 · Reading comprehension', 'Parte 1 · Comprensión lectora'), pts: 30, read: [[story, 20], [notice, 10]] },
      { t: T('Part 2 · Language', 'Parte 2 · Lengua'), pts: 50, secs: [[T('1. Choose the right word', '1. Elige la palabra correcta'), [...g('pres', 3), ...g('inf', 2)], 1], [T('2. Write the verb in the past', '2. Escribe el verbo en pasado'), g('past', 5, { all: true }), 1],
        [T('3. Write the matching question', '3. Escribe la pregunta adecuada'), g('qword', 6), 2], [T('4. Choose the right word (connectors)', '4. Elige la palabra adecuada (conectores)'), g('link', 6, { lv: 'a' }), 1],
        [T('5. Write the sentences in the plural', '5. Escribe las frases en plural'), g('plural', 6), 2], [T('6. Choose the right word (vocabulary)', '6. Elige la palabra correcta (vocabulario)'), g('voc', 5), 2]] },
      { t: T('Part 3 · Writing', 'Parte 3 · Escritura'), pts: 20, write: UL.writes.filter(w => w.lv === 'a').slice(0, 3) }]
      : [{ t: T('Part 1 · Reading comprehension', 'Parte 1 · Comprensión lectora'), pts: 30, read: [[story, 30]] },
        { t: T('Part 2 · Language', 'Parte 2 · Lengua'), pts: 40, secs: [[T('1. Write the verb in the past', '1. Escribe el verbo en pasado'), g('past', 8, { all: true }), 1], [T('2. Write the verb in the future', '2. Escribe el verbo en futuro'), g('fut', 8), 1],
          [T('3. Right tense and form', '3. Tiempo y forma correctos'), [...g('tense', 3), ...g('imp', 3)], 2], [T('4. Write in the plural', '4. Escribe en plural'), g('plural', 3), 2], [T('5. Conditions and "so that"', '5. Condiciones y "para que"'), g('cond', 3), 2]] },
        { t: T('Part 3 · Writing', 'Parte 3 · Escritura'), pts: 30, write: UL.writes.filter(w => w.lv === 'b') }];
    EX = { lv, parts, ans: {}, write: { id: null, text: '' }, start: Date.now(), mins: lv === 'a' ? 120 : 135, timed: false };
    view(`<a class="crumb" href="#/ulpan/exam">← ${T('Exams', 'Exámenes')}</a><section class="card center-card exam-intro">${img('trophy', 'head-img float')}
      <h1>${lv === 'a' ? T('End of Aleph exam', 'Examen de fin de Alef') : T('End of Bet exam', 'Examen de fin de Bet')}</h1>
      <p>${parts.map(p => `${esc(p.t)} (${p.pts})`).join(' · ')}</p><p class="fine">${T('No dictionary, no translation, as in the real exam. Translations appear only in the review at the end.', 'Sin diccionario ni traducción, como en el examen real. Las traducciones aparecen solo en la revisión final.')}</p>
      <div class="row"><button class="btn green big" onclick="A.exGo(true)">⏱ ${T('Full time', 'Tiempo real')} (${EX.mins}′)</button><button class="btn ghost" onclick="A.exGo(false)">${T('Practice, no timer', 'Práctica, sin tiempo')}</button></div></section>`);
  };
  A.exGo = timed => { EX.timed = timed; EX.start = Date.now(); drawExam();
    if (timed) { const t = setInterval(() => { const el = $('#exclock'); if (!EX || EX.done) return clearInterval(t); const left = Math.max(0, EX.start + EX.mins * 60000 - Date.now());
      if (el) el.textContent = `${Math.floor(left / 3600000)}:${String(Math.floor(left / 60000) % 60).padStart(2, '0')}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; if (!left) { clearInterval(t); A.exSubmit(true); } }, 1000); onLeave(() => clearInterval(t)); } };
  function drawExam() {
    let qn = 0;
    const qHtml = (id, c) => { const sel = EX.ans[id];
      const stem = c.answer ? `${he(c.answer)} <small>(${T('ask about', 'pregunta por')} ${he(c.focus, 'mark')})</small>` : c.sent ? `<span lang="he" dir="rtl" class="he-sent">${gapHtml(c.sent)}</span>${c.cue ? ` <small>(${he(c.cue)})</small>` : ''}` : he(c.prompt);
      return `<div class="exq" id="q-${id}"><p><b>${++qn}.</b> ${stem}</p><div class="exopts">${c.opts.map((o, k) => `<button class="exopt ${sel === k ? 'on' : ''}" onclick="A.exAns('${id}',${k})">${he(o)}</button>`).join('')}</div></div>`; };
    const html = EX.parts.map((p, pi) => `<section class="card expart"><h2>${esc(p.t)} <small>(${p.pts})</small></h2>
      ${p.read ? p.read.map(([r, pts], ri) => `<article class="exread"><h3>${he(r.t)}</h3><div class="extext he" lang="he" dir="rtl">${esc(r.text).replace(/\n/g, '<br>')}</div>
        ${r.q.map((q, qi) => { const id = `r${pi}_${ri}_${qi}`, sel = EX.ans[id] || (q[0] === 'multi' ? [] : undefined);
          return `<div class="exq"><p><b>${qi + 1}.</b> ${he(q[1])}</p><div class="exopts">${q[2].map((o, k) => `<button class="exopt ${q[0] === 'multi' ? (sel.includes(k) ? 'on' : '') : sel === k ? 'on' : ''}" onclick="A.exAns('${id}',${k},${q[0] === 'multi'})">${he(o)}</button>`).join('')}</div></div>`; }).join('')}</article>`).join('') : ''}
      ${p.secs ? p.secs.map(([t, cs], si) => `<h3 class="exsec">${esc(t)}</h3>${cs.map((c, ci) => qHtml(`s${pi}_${si}_${ci}`, c)).join('')}`).join('') : ''}
      ${p.write ? `<p>${T('Choose one topic and write 6–8 lines:', 'Elige un tema y escribe 6–8 líneas:')}</p><div class="exw">${p.write.map(w => `<button class="exopt ${EX.write.id === w.id ? 'on' : ''}" onclick="A.exW('${w.id}')">${he(w.he)}</button>`).join('')}</div>
        <textarea id="extext" class="extext-in" lang="he" dir="rtl" rows="9" placeholder="כתבו כאן…" oninput="A.exText(this.value)">${esc(EX.write.text)}</textarea><p class="fine" id="exwc"></p>` : ''}</section>`).join('');
    view(`<div class="exbar"><b>${EX.lv === 'a' ? T('End of Aleph', 'Fin de Alef') : T('End of Bet', 'Fin de Bet')}</b>${EX.timed ? `<span class="chip">⏱ <b id="exclock"></b></span>` : ''}<button class="btn green" onclick="A.exSubmit()">${T('Submit', 'Entregar')}</button></div>${html}
      <div class="row"><button class="btn green big" onclick="A.exSubmit()">${T('Submit the exam', 'Entregar el examen')}</button></div>`);
    A.exText(EX.write.text, true);
  }
  A.exAns = (id, k, multi) => { if (EX.done) return; if (multi) { const a = EX.ans[id] || (EX.ans[id] = []); const i = a.indexOf(k); if (i > -1) a.splice(i, 1); else a.push(k); } else EX.ans[id] = k;
    const y = window.scrollY; drawExam(); window.scrollTo(0, y); SFX.tap(); };
  A.exW = id => { EX.write.id = id; const y = window.scrollY; drawExam(); window.scrollTo(0, y); };
  A.exText = (v, quiet) => { EX.write.text = v; const lines = v.split(/[.!?\n]+/).filter(x => x.trim().split(/\s+/).length >= 3).length, wc = v.trim() ? v.trim().split(/\s+/).length : 0; const el = $('#exwc'); if (el) el.textContent = `${lines} ${T('sentences', 'oraciones')} · ${wc} ${T('words', 'palabras')}`; };
  A.exSubmit = force => {
    if (!force && !confirm(T('Submit the exam now?', '¿Entregar el examen ahora?'))) return;
    EX.done = true; const res = [], review = [];
    EX.parts.forEach((p, pi) => {
      let got = 0;
      if (p.read) p.read.forEach(([r, pts], ri) => { const per = pts / r.q.length; r.q.forEach((q, qi) => { const a = EX.ans[`r${pi}_${ri}_${qi}`]; let ok;
        if (q[0] === 'multi') { const s = (a || []).slice().sort().join(), c = q[3].slice().sort().join(); ok = s === c; const hit = (a || []).filter(k => q[3].includes(k)).length - (a || []).filter(k => !q[3].includes(k)).length; got += Math.max(0, hit) / q[3].length * per; }
        else { ok = a === q[3]; if (ok) got += per; }
        skillMark('read', ok); if (!ok) review.push([q[1], q[0] === 'multi' ? q[3].map(k => q[2][k]).join(' · ') : q[2][q[3]], es() ? q[5] : q[4]]); }); });
      if (p.secs) { const tot = p.secs.reduce((n, [, cs, w]) => n + cs.length * w, 0);
        p.secs.forEach(([t, cs, w], si) => cs.forEach((c, ci) => { const a = EX.ans[`s${pi}_${si}_${ci}`], ok = a !== undefined && c.opts[a] === c.ans; skillMark(c.skill, ok); if (ok) got += w * p.pts / tot;
          else review.push([c.sent || c.answer || c.prompt, c.sent ? c.sent.replace('_', c.ans) : c.ans, c.tr || '']); })); }
      if (p.write) { const w = UL.writes.find(x => x.id === EX.write.id), txt = EX.write.text;
        const lines = txt.split(/[.!?\n]+/).filter(x => x.trim().split(/\s+/).length >= 3).length;
        const checks = w ? w.checks.map(([re, en, sp]) => [new RegExp(re).test(txt), es() ? sp : en]) : [];
        const sc = !w ? 0 : (checks.filter(c => c[0]).length / checks.length) * p.pts * .5 + Math.min(1, lines / 6) * p.pts * .5;
        got += sc; EX.writeRes = { w, checks, lines, sc: Math.round(sc) }; }
      res.push([p.t, Math.round(got * 10) / 10, p.pts]);
    });
    const total = Math.round(res.reduce((n, r) => n + r[1], 0)); const e = U().exams; e[EX.lv] = Math.max(e[EX.lv] || 0, total); gain(30); save();
    if (total >= 70) confetti(); SFX.win();
    const wr = EX.writeRes;
    view(`<a class="crumb" href="#/ulpan/exam">← ${T('Exams', 'Exámenes')}</a><section class="card debrief"><div class="db-head">${mascot(total >= 70 ? 'happy' : 'sad', 'big jump')}<div><h1>${T('Your mark', 'Tu nota')}</h1><p class="pct"><b data-c="${total}">0</b>/100</p></div></div>
      <div class="skillbars">${res.map(([t, g, p]) => `<div><span>${esc(t)}</span><div class="mbar-mini"><i style="width:${100 * g / p}%"></i></div><small>${g}/${p}</small></div>`).join('')}</div>
      ${wr && wr.w ? `<h3>${T('Writing check (estimated)', 'Revisión de la escritura (estimada)')}</h3><ul class="wchecks">${wr.checks.map(([ok, l]) => `<li class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'} ${esc(l)}</li>`).join('')}<li class="${wr.lines >= 6 ? 'ok' : 'no'}">${wr.lines >= 6 ? '✓' : '✗'} ${T('6+ sentences', '6+ oraciones')} (${wr.lines})</li></ul>
        <details><summary>${T('Model answer', 'Respuesta modelo')}</summary><p class="he model" lang="he" dir="rtl">${esc(wr.w.model).replace(/\n/g, '<br>')}</p></details>
        <p class="fine">${T('A teacher also marks grammar and spelling: compare your text with the model and fix three things.', 'Un profesor también corrige gramática y ortografía: compara tu texto con el modelo y corrige tres cosas.')}</p>` : ''}
      ${review.length ? `<h3>${T('Review your mistakes', 'Revisa tus errores')}</h3><ol class="db-steps">${review.map(([q, a, tr]) => `<li class="bad"><p>${he(q)}</p><p><small>${T('Correct', 'Correcto')}:</small> ${he(a)}</p>${tr ? `<p class="fine">${esc(tr)}</p>` : ''}</li>`).join('')}</ol>` : ''}
      <div class="row"><a class="btn green" href="#/uexam/${EX.lv}" onclick="setTimeout(A.route)">${T('New exam', 'Nuevo examen')}</a><a class="btn ghost" href="#/ulpan">${T('Back to the path', 'Volver al camino')}</a></div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  };

  /* ===================== scan a page → live games ===================== */
  function pageScan() {
    const d = U().decks;
    view(`${ulHead()}${subTabs('scan')}<section class="card scan">
      <h2>${img('sparkles')} ${T('Turn a page into games', 'Convierte una página en juegos')}</h2>
      <p>${T('Photograph a page from the textbook or homework. Lev reads it on this device, works out what it practises (the topic, the type of question and the level) and gives you clean practice questions on exactly that, with the page\'s own verbs and words.', 'Fotografía una página del libro o de los deberes. Lev la lee en este dispositivo, entiende qué practica (el tema, el tipo de pregunta y el nivel) y te da preguntas limpias justo sobre eso, con los verbos y palabras de la página.')}</p>
      <label class="dropzone" id="dz"><input type="file" accept="image/*" capture="environment" onchange="A.scanFile(this.files[0])" hidden>${img('sparkles', 'float')}<b>${T('Take or choose a photo', 'Hacer o elegir una foto')}</b><small>${T('or paste text below', 'o pega texto abajo')}</small></label>
      <div id="scanstat"></div>
      <textarea id="scantext" class="extext-in" lang="he" dir="rtl" rows="6" placeholder="${T('Hebrew text appears here, or paste it', 'El texto en hebreo aparece aquí, o pégalo')}"></textarea>
      <div class="row"><button class="btn green" onclick="A.scanMake()">${T('Make games', 'Crear juegos')} →</button></div></section>
      ${d.length ? `<h2 class="sec">${img('books')} ${T('My scanned pages', 'Mis páginas escaneadas')}</h2><div class="talk-grid">${d.map(x => `<a class="card talk-card tilt" href="#/udeck/${x.id}">${img('clipboard')}<div><h3>${bidi(x.title || '')}</h3><small>${x.d}</small></div></a>`).join('')}</div>` : ''}`);
  }
  let tessLoading = null;
  const loadTess = () => tessLoading || (tessLoading = new Promise((ok, no) => { if (window.Tesseract) return ok(); const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); }));
  /* prepare a phone photo for reading: grey and enlarged (tests on Mary's pages: clearest result) */
  async function prepImage(file) {
    const bmp = await createImageBitmap(file), scale = Math.min(2, 2400 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
    const x = c.getContext('2d'); x.filter = 'grayscale(1)'; x.drawImage(bmp, 0, 0, c.width, c.height); return c;
  }
  /* split words the reader glued together, using known words and verb forms: היאענתהלמורה → היא ענתה למורה */
  const SMALL = new Set('של את על עם לא גם כי מה מי זה זו הם הן יש אין היא הוא אני אתה אנחנו אתם או אז רק כל עוד'.split(' '));
  function segment(w) {
    if (w.length < 5 || UL.find(w)) return w;
    const n = w.length, best = Array(n + 1).fill(null); best[0] = [];
    for (let i = 0; i < n; i++) if (best[i]) for (let j = i + 2; j <= Math.min(n, i + 12); j++) {
      const piece = w.slice(i, j); if ((SMALL.has(piece) || UL.find(piece)) && (!best[j] || best[j].length > best[i].length + 1)) best[j] = [...best[i], piece];
    }
    return best[n] && best[n].length <= 4 ? best[n].map(UL.fixFinals).join(' ') : w;
  }
  /* ---------- understand the page: topic, task type, level → practice from the stock bank ----------
     The camera text is only evidence. Clues: printed instructions, question words, verb forms (tense and binyan),
     times, prepositions, connectors and plural/agreement cues. */
  const TOPICS = {
    qword: { t: ['Writing questions (איפה, לאן, למי, את מי…)', 'Escribir preguntas (איפה, לאן, למי, את מי…)'], gen: [['qword', 6]] },
    past: { t: ['Past tense', 'Pasado'], gen: [['past', 6]] },
    pres: { t: ['Present tense', 'Presente'], gen: [['pres', 5]] },
    fut: { t: ['Future tense', 'Futuro'], gen: [['fut', 5]] },
    inf: { t: ['Infinitives', 'Infinitivo'], gen: [['inf', 4]] },
    binyan: { t: ['Binyanim (verb patterns)', 'Binyanim (patrones verbales)'], gen: [['binyan', 3], ['hitinf', 1], ['nifpast', 1]] },
    imp: { t: ['Imperative', 'Imperativo'], gen: [['imp', 4]] },
    prep: { t: ['Prepositions', 'Preposiciones'], gen: [['prep', 5]] },
    link: { t: ['Connectors', 'Conectores'], gen: [['link', 5]] },
    plural: { t: ['Singular → plural', 'Singular → plural'], gen: [['plural', 4], ['plnoun', 2]] },
    agree: { t: ['Adjective agreement', 'Concordancia del adjetivo'], gen: [['agree', 5]] },
    time: { t: ['Telling the time', 'La hora'], gen: [['time', 6]] },
    et: { t: ['את before a definite object', 'את ante objeto definido'], gen: [['et', 4]] },
    write: { t: ['Writing about your day', 'Escribir sobre tu día'], gen: [['build', 4]] },
    read: { t: ['Reading comprehension', 'Comprensión lectora'], gen: [['qword', 3], ['voc', 3]] },
    vocab: { t: ['Vocabulary', 'Vocabulario'], gen: [['voc', 4]] }
  };
  const QW = ['איפה', 'לאן', 'מאיפה', 'מתי', 'למה', 'כמה', 'איך', 'איזה', 'איזו', 'באיזו', 'למי', 'מי', 'מה'];
  function understand(raw, rawAll = '') {
    const text = (raw + ' ' + rawAll).replace(/\s+/g, ' '), toks = [...new Set(tokens(raw).map(segment).join(' ').split(' ').filter(w => w.length >= 2))];
    const sc = {}; const add = (k, n) => { if (n > 0) sc[k] = (sc[k] || 0) + n; };
    const has = re => (text.match(re) || []).length;
    const verbs = [], words = [];
    toks.forEach(w => { const f = UL.find(w); if (!f) return;
      if (f.entry.inf) { const v = f.entry; let tense = v.inf === f.w ? 'inf' : null; ['past', 'pres', 'fut'].forEach(t => { if (!tense && v[t].includes(f.w)) tense = t; }); verbs.push({ w: f.w, v, tense }); }
      else if (f.entry.he && f.entry.he.length >= 2) words.push(f.entry); });
    /* printed instructions are the strongest clue */
    add('qword', has(/כתבו שאלות|שאלו|כתבו את השאלה|מילות שאלה/g) * 8);
    add('past', has(/בעבר|זמן עבר|עבר\b/g) * 6); add('pres', has(/בהווה|זמן הווה/g) * 6); add('fut', has(/בעתיד|זמן עתיד/g) * 7);
    add('inf', has(/שם הפועל|שם פועל/g) * 6); add('binyan', has(/בניין|בנין|פיעל|הפעיל|התפעל|נפעל/g) * 5);
    add('binyan', has(/השלימו את הטבלה/g) * 3); add('past', has(/השלימו את הטבלה/g) * 2);
    add('plural', has(/ברבים|יחיד|רבים/g) * 6); add('agree', has(/שם תואר|שמות תואר|תואר/g) * 5);
    add('prep', has(/מילות יחס|מילת יחס/g) * 8); add('link', has(/מילות קישור|מילת קישור/g) * 8);
    add('time', has(/\d{1,2}:\d{2}/g) * 3 + has(/השעה|מה השעה|שעות/g) * 3);
    add('write', has(/כתבו \d|כתבו משפטים|סדר היום|כתיבה|חיבור/g) * 5); add('read', has(/קראו את|הבנת הנקרא|ענו על השאלות/g) * 6);
    add('imp', has(/ציווי/g) * 7);
    /* content clues */
    add('qword', toks.filter(w => QW.includes(w)).length + Math.min(10, has(/\?/g)) * .8);
    if (has(/עבר/g) && has(/הווה/g)) add('past', 6);
    const tc = { past: 0, pres: 0, fut: 0, inf: 0 }; verbs.forEach(v => { if (v.tense) tc[v.tense]++; });
    add('past', tc.past * 1.2); add('pres', tc.pres); add('fut', tc.fut * 1.3); add('inf', tc.inf * .8);
    add('et', has(/את ה/g) >= 3 ? 3 : 0); add('prep', toks.filter(w => ['על יד', 'אצל', 'בין', 'מול', 'ליד'].includes(w)).length * 1.5);
    add('link', toks.filter(w => ['כי', 'לכן', 'בגלל', 'כדי', 'אבל', 'כאשר'].includes(w)).length * 1.2);
    add('time', toks.filter(w => ['רבע', 'חצי', 'בבוקר', 'בצהריים', 'בערב', 'בלילה'].includes(w)).length * 1.2);
    const ranked = Object.entries(sc).filter(([k, v]) => v >= 3 && TOPICS[k]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);
    if (!ranked.length) ranked.push(words.length >= 4 ? 'vocab' : 'qword');
    const bins = [...new Set(verbs.map(v => v.v.b))];
    const lv = sc.fut >= 3 || sc.imp >= 3 ? 'b' : sc.past >= 3 || sc.binyan >= 3 || sc.link >= 3 ? 'a+' : 'a';
    const topicWords = {}; words.forEach(e => { if (e.topic) topicWords[e.topic] = (topicWords[e.topic] || 0) + 1; });
    return { conf: toks.length, topics: ranked, verbs: [...new Map(verbs.map(v => [v.v.inf, v.v.inf])).values()], tenseOf: tc, bins, lv, words: [...new Set(words.map(e => e.he))].slice(0, 30),
      themes: Object.entries(topicWords).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k) };
  }
  /* a practice set from the stock generators, tuned with the page's own verbs and words */
  function pageCards(a, n = 15) {
    const pageVerbs = a.verbs.map(i => UL.verb(i)).filter(Boolean), W = a.words.map(h => UL.lex.find(e => e.he === h)).filter(Boolean);
    const cards = [];
    a.topics.forEach((k, rank) => TOPICS[k].gen.forEach(([g, c]) => {
      const count = Math.max(1, Math.round(c * (rank === 0 ? 1.4 : rank === 1 ? 1 : .7)));
      for (let i = 0; i < count; i++) {
        if (['past', 'pres', 'fut', 'inf'].includes(g) && pageVerbs.length && Math.random() < .6) cards.push(verbCard(g, pick(pageVerbs)));
        else cards.push(GEN[g]({ all: g === 'past' }, W));
      }
    }));
    if (W.length >= 4) cards.push(...gen('mean', 2, {}, W), GEN.pairs({}, W));
    return shuffle(cards).slice(0, n);
  }
  function verbCard(t, v) {
    if (t === 'inf') return GEN.inf({ verbs: [v.inf] }) ;
    const subj = t === 'past' ? pick(PAST_SUBJ) : t === 'fut' ? pick(FUT_SUBJ) : pick(PRES_SUBJ), [s, i] = subj;
    const a = v[t][i]; if (!a || a === '—') return GEN.past({ all: true });
    const tw = t === 'past' ? pick(['אתמול', 'בשבוע שעבר']) : t === 'fut' ? pick(['מחר', 'בשבוע הבא']) : pick(['עכשיו', 'כל יום']);
    const others = t === 'pres' ? v.pres : v[t];
    return gapCard(`${tw} ${s} _ ${UL.vx[v.inf] || ''}.`.replace(' .', '.'), a, uniq(a, [...others, v.inf]), t === 'past' ? skillOfB(v.b, 'past') : t, verbTr(v), { cue: v.inf });
  }
  const topicLine = a => a.topics.map(k => `<span class="tchip">${bidi(L2(TOPICS[k].t))}</span>`).join('');
  let LAST = null;
  A.scanFile = async file => {
    if (!file) return; const st = $('#scanstat'), url = URL.createObjectURL(file);
    st.innerHTML = `<div class="scanning"><img src="${url}" alt=""><div class="scanline"></div></div><div class="ubar"><i id="scanbar" style="width:3%"></i><span id="scanmsg">${T('Loading the Hebrew reader…', 'Cargando el lector de hebreo…')}</span></div>`;
    try {
      await loadTess();
      const canvas = await prepImage(file);
      const worker = await Tesseract.createWorker('heb', 1, { logger: m => { const b = $('#scanbar'), msg = $('#scanmsg'); if (b && m.progress) b.style.width = Math.max(3, Math.round(m.progress * 100)) + '%';
        if (msg) msg.textContent = m.status === 'recognizing text' ? T('Reading the page…', 'Leyendo la página…') : T('Preparing…', 'Preparando…'); } });
      const { data } = await worker.recognize(canvas); await worker.terminate();
      /* confident words only (handwriting and margins come back as low-confidence noise), glued words split */
      const lines = (data.lines || []).map(l => (l.words || []).filter(wd => wd.confidence >= 60 && /[א-ת]{2,}/.test(wd.text)).map(wd => segment(wd.text.replace(/[^א-ת.,?!"'0-9:-]/g, ''))).join(' ').trim()).filter(t => t.split(' ').length >= 2);
      const text = lines.join('\n') + '\n' + (data.text.match(/\d{1,2}:\d{2}/g) || []).join(' ');
      if (!text.trim()) { st.innerHTML = `<p class="warnbox">${T('No clear Hebrew text found. Try a straight, well-lit photo.', 'No se encontró texto claro. Prueba una foto recta y bien iluminada.')}</p>`; return; }
      LAST = { text, raw: data.text.slice(0, 4000), url, words: (data.words || []).filter(wd => wd.confidence >= 60).length }; showUnderstanding(); SFX.ok();
    } catch (e) { st.innerHTML = `<p class="warnbox">${T('The page reader could not load (no internet?). You can still paste text.', 'No se pudo cargar el lector (¿sin internet?). Aún puedes pegar texto.')}</p>`; }
  };
  function showUnderstanding() {
    const a = LAST.a || (LAST.a = understand(LAST.text, LAST.raw));
    $('#scantext').value = LAST.text;
    const weak = (LAST.words || 99) < 15;
    $('#scanstat').innerHTML = `<div class="understood pop"><img class="ocr-thumb" src="${LAST.url}" alt=""><div>
      <h3>${img('bulb')} ${T('This page practises', 'Esta página practica')}</h3><div class="tchips">${topicLine(a)}</div>
      ${weak ? `<p class="warnbox">${T('This page is mostly handwriting, so this is a guess. Tap the right topics below.', 'Esta página es casi toda manuscrita, así que es una suposición. Toca abajo los temas correctos.')}</p>` : ''}
      <p class="fine">${T('Level', 'Nivel')} ${he(lvHe(a.lv))}${a.verbs.length ? ` · ${T('verbs on the page', 'verbos en la página')}: ${a.verbs.slice(0, 6).map(v => he(v)).join(', ')}` : ''}${a.themes.length ? ` · ${T('words about', 'palabras sobre')} ${a.themes.map(t => esc(L2(UL.topics[t]))).join(', ')}` : ''}</p>
      <details ${weak ? 'open' : ''}><summary>${T('Not quite right? Choose the topics', '¿No es exacto? Elige los temas')}</summary><div class="tpick">${Object.keys(TOPICS).map(k => `<button class="${a.topics.includes(k) ? 'on' : ''}" onclick="A.topicToggle('${k}')">${bidi(L2(TOPICS[k].t))}</button>`).join('')}</div></details>
      <div class="row"><button class="btn green big" onclick="A.scanMake()">${T('Practise this topic', 'Practicar este tema')} →</button></div></div></div>`;
  }
  A.topicToggle = k => { const a = LAST.a, i = a.topics.indexOf(k); if (i > -1) { if (a.topics.length > 1) a.topics.splice(i, 1); } else a.topics.push(k); SFX.tap(); showUnderstanding(); };
  A.scanMake = () => {
    const text = ($('#scantext').value || '').trim().slice(0, 3000);
    if (tokens(text).length < 3) return toast(T('Add a photo or some Hebrew text first.', 'Primero añade una foto o texto en hebreo.'), 'heb');
    const same = LAST && LAST.a && LAST.text.trim().slice(0, 3000) === text, raw = same ? LAST.raw : '';
    const a = same ? LAST.a : understand(text);
    const d = { id: 'd' + Date.now().toString(36), title: a.topics.map(k => L2(TOPICS[k].t).split(' (')[0]).join(' · '), text, raw: (raw || '').slice(0, 3000), a, d: new Date().toISOString().slice(0, 10) };
    const u = U(); u.decks.unshift(d); u.decks = u.decks.slice(0, 20); save(); location.hash = '#/udeck/' + d.id;
  };
  const tokens = text => text.split(/\s+/).map(w => w.replace(/[^א-ת'"-]/g, '')).filter(w => w.length >= 2);
  R.udeck = id => {
    const d = U().decks.find(x => x.id === id); if (!d) return R.ulpan('scan');
    const a = d.a || (d.a = understand(d.text, d.raw || ''));
    view(`<a class="crumb" href="#/ulpan/scan">← ${T('Scan', 'Escanear')}</a><section class="card deck-page"><p class="fine">${d.d}</p><h1>${img('bulb')} ${T('Your page', 'Tu página')}</h1>
      <div class="tchips">${topicLine(a)}</div><p class="fine">${T('Level', 'Nivel')} ${he(lvHe(a.lv))}</p>
      <div class="deck-play">
        <button class="card tool tilt" onclick="A.deckPlay('${id}','practice')">${img('target')}<b>${T('Practise these topics', 'Practicar estos temas')}</b><small>15</small></button>
        <button class="card tool tilt" onclick="A.deckPlay('${id}','test')">${img('trophy')}<b>${T('Mini test', 'Mini test')}</b><small>10 · ${T('no hints', 'sin pistas')}</small></button>
        ${a.verbs.length ? `<button class="card tool tilt" onclick="A.deckPlay('${id}','verbs')">${img('flash')}<b>${T('The page\'s verbs', 'Los verbos de la página')}</b><small>${a.verbs.length}</small></button>` : ''}
        ${a.words.length >= 4 ? `<button class="card tool tilt" onclick="A.deckPlay('${id}','words')">${img('books')}<b>${T('The page\'s words', 'Las palabras de la página')}</b><small>${a.words.length}</small></button>` : ''}
      </div>
      ${a.verbs.length ? `<h3>${T('Verbs on the page', 'Verbos de la página')}</h3><div class="wordchips">${a.verbs.map(i => { const v = UL.verb(i); return `<a class="wc verb" href="#/ulpan/verbs" onclick="A.vPick && setTimeout(()=>A.vPick('${i}'),50)">${he(i)}<small>${esc(mean(v))} · ${UL.binyanim[v.b].he}</small></a>`; }).join('')}</div>` : ''}
      ${a.words.length ? `<h3>${T('Words on the page', 'Palabras de la página')}</h3><div class="wordchips">${a.words.map(h => { const e = UL.lex.find(x => x.he === h); return `<span class="wc known" onclick="A.uSay('${esc(h)}')">${he(h)}<small>${e ? esc(mean(e)) : ''}</small></span>`; }).join('')}</div>` : ''}
      <details><summary>${T('What the camera read (for checking)', 'Lo que leyó la cámara (para revisar)')}</summary><p class="he raw" lang="he" dir="rtl">${esc(d.text).replace(/\n/g, '<br>')}</p></details>
      <div class="row"><button class="btn ghost" onclick="A.deckDel('${id}')">${T('Delete this page', 'Borrar esta página')}</button></div></section>`);
  };
  A.deckDel = id => { if (!confirm(T('Delete this page and its practice?', '¿Borrar esta página y su práctica?'))) return; const u = U(); u.decks = u.decks.filter(x => x.id !== id); save(); location.hash = '#/ulpan/scan'; };
  A.deckPlay = (id, mode) => {
    const d = U().decks.find(x => x.id === id), a = d.a || understand(d.text, d.raw || ''); let cards = [];
    if (mode === 'practice') cards = pageCards(a, 15);
    if (mode === 'test') cards = pageCards(a, 10).filter(c => c.type === 'mcq' || c.type === 'build');
    if (mode === 'verbs') cards = shuffle(a.verbs).flatMap(i => { const v = UL.verb(i); return [verbCard(pick(['past', 'past', 'pres', 'fut'].filter(t => t !== 'fut' || a.lv === 'b')), v), verbCard('past', v)]; }).slice(0, 10);
    if (mode === 'words') { const W = a.words.map(h => UL.lex.find(e => e.he === h)).filter(Boolean); cards = [...gen('mean', 4, {}, W), GEN.pairs({}, W), ...gen('listen', 3, {}, W), ...gen('pick', 3, {}, W)]; }
    if (!cards.length) return toast(T('Not enough on this page for that. Try Practise.', 'No hay suficiente para eso. Prueba Practicar.'), 'heb');
    R.udeck(id);
    session(cards, { back: '#/udeck/' + id, hearts: mode === 'test' ? false : undefined, retry: mode !== 'test', title: mode === 'test' ? T('Mini test done', 'Mini test terminado') : T('Page practised', 'Página practicada') });
  };

  /* plug Word Rain / Memory Flip with Ulpan words */
  window.__ulDebug = { X: () => X, GEN, gen, lessonCards }; /* used by the automated browser checks */
  LEV.ulVocab = () => UL.lex.filter(e => e.he.length <= 16 && mean(e).length <= 24);
});
