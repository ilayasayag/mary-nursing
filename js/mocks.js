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
  const topicLabel = m => m === 'calc' ? T('Calculations', 'Cálculos') : L(modById(m).title);
  const topicImg = m => m === 'calc' ? 'calc' : m;
  const daysLeft = () => Math.ceil((new Date('2026-11-18T08:00:00') - Date.now()) / 864e5);
  const tone = p => p === null ? 'none' : p >= 85 ? 'good' : p >= 70 ? 'meh' : 'bad';

  /* deterministic papers: each topic is shuffled once with a fixed seed, so papers 1-3 take different slices */
  const rng = seed => () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const seeded = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = x => String(Math.round(x * 100) / 100).replace('.', es() ? ',' : '.');
  function calcQ(c, r) {
    const wrong = [...new Set([c.ans * 10, c.ans / 10, c.ans * 2, c.ans / 2].map(x => Math.round(x * 100) / 100))].filter(x => x > 0 && x !== c.ans);
    const vals = seeded([c.ans, ...seeded(wrong, r).slice(0, 3)], r);
    return { m: 'calc', id: c.id, q: L2(c.q), o: vals.map(x => `${fmt(x)} ${L2(c.unit)}`), a: vals.indexOf(c.ans), w: L2(c.how) };
  }
  function bankQ(q, r) {
    const ord = seeded(q.o.map((_, k) => k), r);
    return { m: q.m, id: q.id, q: L(q.q), o: ord.map(k => L(q.o[k])), a: ord.indexOf(q.a), w: L(q.w) };
  }
  const poolOf = m => m === 'calc' ? NX.calcs : NX.qs.filter(q => q.m === m);
  function paper(n) {
    if (n === 4) return focusPaper();
    const out = [], r = rng(4200 + n);
    TOPICS.forEach(([m, k], ti) => {
      const pool = seeded(poolOf(m), rng(97 + ti));
      for (let j = 0; j < k; j++) { const item = pool[((n - 1) * k + j) % pool.length]; out.push(m === 'calc' ? calcQ(item, r) : bankQ(item, r)); }
    });
    return seeded(out, r);
  }
  /* mock 4: more questions from her weaker topics, her past mistakes first */
  function focusPaper() {
    const acc = { psych: pctOf('psych'), pharm: pctOf('pharm'), law: pctOf('law'), calc: S().best.calc ? Math.round(100 * S().best.calc / 8) : null };
    const gap = m => Math.max(5, 100 - (acc[m] === null ? 70 : acc[m]));
    const tot = TOPICS.reduce((a, [m]) => a + gap(m), 0);
    const counts = TOPICS.map(([m]) => [m, 5 + Math.round(10 * gap(m) / tot)]);
    while (counts.reduce((a, c) => a + c[1], 0) > 30) counts.sort((a, b) => b[1] - a[1])[0][1]--;
    while (counts.reduce((a, c) => a + c[1], 0) < 30) counts.sort((a, b) => gap(b[0]) - gap(a[0]))[0][1]++;
    const r = rng(Date.now() % 100000), wrong = new Set(S().wrong || []), out = [];
    counts.forEach(([m, k]) => {
      const pool = shuffle(poolOf(m)).sort((a, b) => (wrong.has(b.id) ? 1 : 0) - (wrong.has(a.id) ? 1 : 0));
      pool.slice(0, k).forEach(item => out.push(m === 'calc' ? calcQ(item, r) : bankQ(item, r)));
    });
    return shuffle(out);
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
  R.mocks = () => {
    const rd = readiness(), dl = daysLeft();
    const focusIds = idsFor(4);
    view(`<a class="crumb" href="#/">← ${T('Unit 9', 'Unidad 9')}</a>
      <section class="card mx-hero"><div class="mx-hero-txt"><small>${dl > 0 ? `${dl} ${T('days to go', 'días')} · ` : ''}18.11.2026 · MSR</small><h1>${T('Mock tests', 'Exámenes de prueba')}</h1>
        <p>${T('Built like the real exam: 5 stations of 15 minutes, an interpreter in each, pass at 60.', 'Como el examen real: 5 estaciones de 15 minutos, intérprete en cada una, aprobado con 60.')}</p></div>${mascot('happy', 'big bounce')}
        <div class="mx-format">${NX.mockSlots.map((s, i) => `<div class="mx-slot" style="--d:${i * 90}ms"><b>${i + 1}</b>${img(s.icon)}<small>${esc(L2(s.t))}</small></div>`).join('')}</div></section>
      <h2 class="sec">${img('target')} ${T('Where you stand', 'Dónde estás')}</h2>
      <section class="card mx-ready"><p class="fine">${T('From all your practice so far: lessons, quizzes and stations in each area.', 'De toda tu práctica hasta ahora: lecciones, tests y estaciones de cada área.')}</p>
        ${rd.map((r, i) => `<div class="mx-rrow ${tone(r.p)}">${img(NX.mockSlots[i].icon)}<span>${i + 1} · ${esc(L2(NX.mockSlots[i].t))}${r.n ? `<em>${r.n} ${T('new to try', 'por probar')}</em>` : ''}</span>
          <div class="mx-bar"><i data-w="${r.p || 0}"></i></div><b>${r.p === null ? '–' : r.p + '%'}</b></div>`).join('')}</section>
      <h2 class="sec">${img('trophy')} ${T('Your 4 mock tests', 'Tus 4 exámenes de prueba')}</h2>
      <div class="mx-papers">${NX.mocks.map((m, i) => { const b = best(m.id), ids = m.focus ? focusIds : m.st;
        return `<a class="card mx-paper tilt ${m.focus ? 'focus' : ''}" href="#/mocktest/${m.id}" style="--d:${i * 80}ms">
          <div class="mx-paper-top"><span class="mx-num">${m.focus ? '★' : m.id}</span><div><h3>${esc(L2(m.t))}</h3><small>${m.focus ? T('Your weakest and untried areas', 'Tus áreas más débiles y sin probar') : T('5 stations · 75 minutes', '5 estaciones · 75 minutos')}</small></div></div>
          <div class="mx-icons">${ids.map(id => img(stById(id).img)).join('')}${img('clipboard')}</div>
          ${b ? `<span class="mx-stamp mini ${b >= PASS ? 'pass' : 'fail'}">${b >= PASS ? T('PASS', 'APROBADO') : T('NOT YET', 'AÚN NO')} · ${b}%</span>` : `<span class="mx-go">${T('Start', 'Empezar')} →</span>`}</a>`; }).join('')}</div>
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
        ${mk.focus ? `<p>${T('Built from your progress: in each area, the station you have not tried yet or scored lowest on, and more questions from your weaker topics.', 'Hecho con tu progreso: en cada área, la estación que aún no probaste o con menor nota, y más preguntas de tus temas más flojos.')}</p>` : ''}
        <ol class="mx-plan">${ids.map((id, i) => `<li style="--d:${i * 70}ms">${img(stById(id).img)}<div><b>${i + 1} · ${esc(L2(NX.mockSlots[i].t))}</b><small>15 min · ${esc(L2(LEV.stationKind(stById(id).kind)))}</small></div></li>`).join('')}
          <li style="--d:280ms">${img('clipboard')}<div><b>5 · ${T('Knowledge test', 'Prueba de conocimientos')}</b><small>${T('30 questions · 15 min · mental health, pharmacology, laws, calculations', '30 preguntas · 15 min · salud mental, farmacología, leyes, cálculos')}</small></div></li></ol>
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
      onResult: r => { if (MX) MX.res[k] = r; }, onNext: () => { if (!MX) return R.mocks(); MX.k = k + 1; door(); } });
  };

  /* ---------- station 5: 30 questions, 15 minutes ---------- */
  function kIntro() {
    view(`${crumb(5)}<section class="card door-card mx-door pop"><div class="mx-door-num">5</div>
      <div class="door-sign">${img('clipboard')}<div><small>${T('Knowledge test', 'Prueba de conocimientos')} · 15 min</small><h2>${T('30 questions', '30 preguntas')}</h2></div></div>
      <div class="mx-topics">${TOPICS.map(([m, n]) => `<span>${img(topicImg(m))}${esc(topicLabel(m))}</span>`).join('')}</div>
      <p class="mx-interp"><span>⏱️</span>${T('About 30 seconds each. Answer every question; you will see the answers at the end.', 'Unos 30 segundos cada una. Responde todas; verás las respuestas al final.')}</p>
      <button class="btn green big" onclick="A.mxKStart()">${T('Start the test', 'Empezar la prueba')} ✍️</button></section>`);
  }
  A.mxKStart = () => { K = { qs: paper(MX.n), i: 0, ans: [], deadline: Date.now() + KMIN * 60000 }; clearInterval(KT); KT = setInterval(tickK, 1000); drawK(); };
  const RING = 2 * Math.PI * 19;
  function tickK() {
    const el = $('#kclock'); if (!K || !el) { clearInterval(KT); K = null; return; }
    const left = Math.max(0, K.deadline - Date.now());
    el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
    const ring = $('#kring'); if (ring) { ring.style.strokeDashoffset = RING * (1 - left / (KMIN * 60000)); ring.classList.toggle('low', left < 120000); }
    if (!left) { clearInterval(KT); SFX.no(); finishK(true); }
  }
  function drawK() {
    const q = K.qs[K.i], n = K.qs.length;
    view(`${crumb(5)}<section class="card mxk" id="mxk">
      <div class="mxk-top"><div class="mx-ring"><svg viewBox="0 0 44 44"><circle class="bg" cx="22" cy="22" r="19"/><circle class="fg" id="kring" cx="22" cy="22" r="19" style="stroke-dasharray:${RING}"/></svg><b id="kclock"></b></div>
        <div class="mxk-dots">${K.qs.map((_, k) => `<i class="${k === K.i ? 'cur' : K.ans[k] !== undefined ? 'done' : k < K.i ? 'skip' : ''}"></i>`).join('')}</div><span class="chip">${K.i + 1}/${n}</span></div>
      <div class="mxk-card pop"><span class="mxk-topic">${img(topicImg(q.m))}${esc(topicLabel(q.m))}</span>
        <p class="mxk-q">${chips(esc(q.q))}</p>
        <div class="choices">${q.o.map((o, k) => `<button class="choice ${K.ans[K.i] === k ? 'sel' : ''}" data-k="${k}" onclick="A.mxPick(${k})"><kbd>${k + 1}</kbd><span>${chips(esc(o))}</span></button>`).join('')}</div></div>
      <div class="row mxk-foot">${K.i ? `<button class="btn ghost" onclick="A.mxPrevQ()">← ${T('Back', 'Atrás')}</button>` : ''}<button class="btn green" onclick="A.mxNextQ()">${K.i + 1 < n ? T('Next', 'Siguiente') : T('Finish', 'Terminar')} →</button></div></section>`);
    tickK();
  }
  A.mxPick = k => { if (!K) return; K.ans[K.i] = k; SFX.tap(); document.querySelectorAll('#mxk .choice').forEach(b => b.classList.toggle('sel', +b.dataset.k === k)); };
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
      const ok = K.ans[k] === q.a, b = by[q.m] || (by[q.m] = [0, 0]); b[1]++; if (ok) b[0]++;
      if (q.m !== 'calc') { stat(q.m, ok); const w = S().wrong, i = w.indexOf(q.id); if (ok && i > -1) w.splice(i, 1); if (!ok && i < 0) w.push(q.id); }
      if (!ok) wrong.push({ q, pick: K.ans[k] });
    });
    const okN = K.qs.filter((q, k) => K.ans[k] === q.a).length;
    MX.k5 = { pct: Math.round(100 * okN / K.qs.length), ok: okN, n: K.qs.length, by, wrong, timeUp };
    K = null; results();
  }

  /* ---------- results and feedback ---------- */
  /* the weakest of each kind, so this mock, station 5 and her whole progress all get a say */
  function focusList() {
    const st = MX.res.filter(r => r && (r.crit.length || r.pct < 70 || r.timeUp)).sort((a, b) => a.pct - b.pct).slice(0, 3)
      .map(r => { const s = stById(r.id); return { ic: s.img, txt: `${T('Redo', 'Repite')} “${L2(s.t)}”: ${r.pct}%${r.crit.length ? ` · ⚠ ${T('a critical error', 'un error crítico')}` : ''}${r.timeUp ? ` · ⏰ ${T('time ran out', 'se acabó el tiempo')}` : ''}`, href: `#/station/${s.id}` }; });
    const k5 = Object.entries(MX.k5.by).filter(([, [ok, n]]) => n && ok / n < 0.7).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).slice(0, 2)
      .map(([m, [ok, n]]) => ({ ic: topicImg(m), txt: `${T('Station 5', 'Estación 5')} · ${topicLabel(m)}: ${ok}/${n}`, href: m === 'calc' ? '#/calc' : `#/quiz/${m}` }));
    const weak = ['mat', 'pharm', 'law', 'psych', 'peds', 'medsurg', 'emerg'].map(m => [m, pctOf(m)]).filter(([, p]) => p !== null && p < 85).sort((a, b) => a[1] - b[1]).slice(0, 1)
      .map(([m, p]) => ({ ic: m, txt: T(`Across all your practice, ${L(modById(m).title)} is at ${p}%: one more unit quiz`, `En toda tu práctica, ${L(modById(m).title)} está en ${p}%: un test más de la unidad`), href: `#/quiz/${m}` }));
    const procs = NX.stations.filter(s => s.kind === 'proc' && rec(s.id) && !rec(s.id).pass);
    const skills = procs.length ? [{ ic: 'syringe', txt: T(`Skills you will use inside the cases, not passed yet: ${procs.map(s => L2(s.t)).join(', ')}`, `Técnicas que usarás dentro de los casos, aún sin superar: ${procs.map(s => L2(s.t)).join(', ')}`), href: '#/stations/proc' }] : [];
    return [...st, ...k5, ...weak, ...skills];
  }
  function results() {
    const sc = [0, 1, 2, 3].map(i => MX.res[i] ? MX.res[i].pct : 0).concat(MX.k5.pct);
    const total = Math.round(sc.reduce((a, b) => a + b, 0) / 5), pass = total >= PASS, mk = mockById(MX.n);
    const b = S().best; b['mx' + MX.n] = Math.max(b['mx' + MX.n] || 0, total);
    S().mockLast = { n: MX.n, total, d: new Date().toISOString().slice(0, 10), sc };
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
      <h2 class="sec">${img('sim')} ${T('Station by station', 'Estación por estación')}</h2>
      <section class="card mx-rows">${MX.ids.map((id, i) => { const r = MX.res[i] || { pct: 0, crit: [], timeUp: false }, st = stById(id);
        return `<div class="mx-row ${tone(r.pct)}"><span class="mx-n">${i + 1}</span>${img(st.img)}<div><b>${esc(L2(st.t))}</b><small>${esc(L2(NX.mockSlots[i].t))}${r.crit.length ? ` · <em class="critline">⚠ ${esc(r.crit.join(' · '))}</em>` : ''}${r.timeUp ? ` · ⏰` : ''}</small><div class="mx-bar"><i data-w="${r.pct}"></i></div></div><em>${r.pct}%</em><a class="btn ghost small" href="#/station/${id}">${T('Redo', 'Repetir')}</a></div>`; }).join('')}
        <div class="mx-row ${tone(MX.k5.pct)}"><span class="mx-n">5</span>${img('clipboard')}<div><b>${T('Knowledge test', 'Prueba de conocimientos')} · ${MX.k5.ok}/${MX.k5.n}</b><small>${MX.k5.timeUp ? '⏰ ' + T('time ran out', 'se acabó el tiempo') : ''}</small>
          <div class="mx-topics small">${Object.entries(MX.k5.by).map(([m, [ok, n]]) => `<span class="${tone(Math.round(100 * ok / n))}">${img(topicImg(m))}${esc(topicLabel(m))} ${ok}/${n}</span>`).join('')}</div><div class="mx-bar"><i data-w="${MX.k5.pct}"></i></div></div><em>${MX.k5.pct}%</em></div></section>
      <h2 class="sec">${img('target')} ${T('What to focus on now', 'En qué centrarte ahora')}</h2>
      <section class="card mx-focus">${focus.length ? `<ol>${focus.map((f, i) => `<li style="--d:${i * 90}ms"><a href="${f.href}">${img(f.ic)}<span>${esc(f.txt)}</span><b>→</b></a></li>`).join('')}</ol>`
        : `<p class="mx-allgood">🌟 ${T('Nothing below 70% and no critical errors. Keep the red lines out loud and read the cheat sheets the night before.', 'Nada por debajo de 70% y sin errores críticos. Sigue diciendo las líneas rojas en voz alta y lee las chuletas la noche antes.')}</p>`}</section>
      ${MX.k5.wrong.length ? `<details class="card mx-review"><summary>${img('review')} ${T('Review the questions you missed', 'Repasa las preguntas que fallaste')} (${MX.k5.wrong.length})</summary>
        ${MX.k5.wrong.map(({ q, pick }) => `<div class="mx-rq"><span class="mxk-topic">${img(topicImg(q.m))}${esc(topicLabel(q.m))}</span><p>${chips(esc(q.q))}</p>
          <p class="ans ok">✓ ${chips(esc(q.o[q.a]))}</p>${pick !== undefined ? `<p class="ans bad">✗ ${chips(esc(q.o[pick]))}</p>` : `<p class="ans bad">✗ ${T('no answer', 'sin respuesta')}</p>`}<p class="why">${chips(esc(q.w))}</p></div>`).join('')}</details>` : ''}
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
  LEV.unitExtra.exam = () => `<div class="mx-unit">
      ${NX.mocks.map((m, i) => { const b = best(m.id); return `<a class="mx-mini tilt ${m.focus ? 'focus' : ''}" href="#/mocktest/${m.id}" style="--d:${i * 70}ms"><span class="mx-num">${m.focus ? '★' : m.id}</span><small>${esc(L2(m.t))}</small>${b ? `<em class="${b >= PASS ? 'pass' : 'fail'}">${b}%</em>` : `<em>${T('start', 'empezar')}</em>`}</a>`; }).join('')}
      <a class="mx-mini cheat tilt" href="#/cheats" style="--d:280ms">${img('bulb')}<small>${T('Cheat sheets', 'Chuletas')}</small><em>${T('read', 'leer')}</em></a>
    </div><a class="mx-unit-all" href="#/mocks">${T('All mock tests and where you stand', 'Todos los exámenes y dónde estás')} →</a>`;
});
