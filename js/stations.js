/* lev. MSR stations: timed exam-day practice built on NX.stations (js/data/stations.js).
   Each station runs as parts: think-aloud opening (red lines), clinical steps where Mary answers in her own
   words before the options appear, bedside calculations, teaching, procedure ordering, SBAR, the closing
   red lines and the examiner's debrief questions. A station passes at 70% with no critical error. */
(window.LEV_EXT = window.LEV_EXT || []).push(LEV => {
  'use strict';
  const { R, view, img, esc, shuffle, pick, L2, SFX, play, segments, stopVoice, touch, confetti, mascot, countUp, chips, save, onLeave } = LEV;
  const S = () => LEV.state();
  const $ = s => document.querySelector(s);
  const A = window.A;
  const es = () => S().lang === 'es';
  const T = (en, sp) => es() ? sp : en;
  const rec = () => S().stations || (S().stations = {});
  const KIND = {
    acute: ['Mannequin: acute patient', 'Maniquí: paciente agudo', 'sim'],
    med: ['Medication station', 'Estación de medicación', 'pharm'],
    comm: ['Actor: communication', 'Actor: comunicación', 'psych'],
    teach: ['Actor: teaching', 'Actor: educación', 'clipboard'],
    proc: ['Procedure (5 min)', 'Procedimiento (5 min)', 'syringe'],
    sbar: ['SBAR call', 'Llamada SBAR', 'phone']
  };
  const PASS = 70;

  /* ---------- reading aloud and the microphone ---------- */
  const say = txt => play(segments(txt, S().lang));
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let MIC = null;
  function micStop() { if (MIC) { MIC.on = false; try { MIC.r.stop(); } catch (e) { /* already stopped */ } MIC = null; } const b = $('#micbtn'); if (b) b.classList.remove('on'); }
  function micStart(onText) {
    if (!SR) return false;
    stopVoice(); micStop();
    const r = new SR(); r.lang = es() ? 'es-ES' : 'en-US'; r.continuous = true; r.interimResults = true;
    let base = '';
    r.onresult = e => { let txt = ''; for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript + ' '; onText((base + txt).toLowerCase()); };
    r.onend = () => { if (MIC && MIC.r === r && MIC.on) { base += ' '; try { r.start(); } catch (e) { micStop(); } } };
    r.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { micStop(); const n = $('#micnote'); if (n) n.textContent = T('Microphone blocked: tick the items yourself.', 'Micrófono bloqueado: marca los puntos tú misma.'); } };
    try { r.start(); } catch (e) { return false; }
    MIC = { r, on: true }; return true;
  }

  /* ---------- station runner ---------- */
  let ST = null, EXD = null, tick = 0;
  onLeave(() => { clearInterval(tick); micStop(); });
  function buildParts(st) {
    const dq = (st.dq || []).map(r => ({ p: 'dq', r }));
    if (st.kind === 'proc') return [{ p: 'order', id: st.proc }];
    if (st.kind === 'sbar') return [{ p: 'sbar', id: st.sbar }, ...dq];
    if (st.kind === 'drill') return [{ p: 'open' }, { p: 'close' }];
    const steps = st.kind === 'acute' ? NX.sims.find(s => s.id === st.sim).steps : st.steps;
    const mid = st.kind === 'teach' ? [{ p: 'teach', id: st.teach }, { p: 'back', id: st.teach }]
      : steps.map(x => x.calc ? { p: 'calc', id: x.calc } : { p: 'step', s: x });
    return [{ p: 'open' }, ...mid, { p: 'close' }, ...dq];
  }
  function runStation(st) {
    clearInterval(tick); micStop(); stopVoice();
    ST = { st, parts: buildParts(st), i: 0, pts: 0, max: 0, crit: [], log: [], start: Date.now(), deadline: Date.now() + st.mins * 60000, v: null };
    clearInterval(tick); tick = setInterval(tickClock, 1000);
    drawPart();
  }
  function tickClock() {
    const el = $('#stclock'); if (!ST) return clearInterval(tick);
    const left = Math.max(0, ST.deadline - Date.now());
    if (el) { el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; el.parentElement.classList.toggle('low', left < 120000); }
    if (!left) { clearInterval(tick); micStop(); ST.timeUp = true; SFX.no(); finishStation(); }
  }
  const crumb = () => EXD ? `<span class="crumb">${T('Exam day', 'Día de examen')} · ${T('station', 'estación')} ${EXD.k + 1}/${EXD.ids.length}</span>` : `<a class="crumb" href="#/stations">← ${T('Stations', 'Estaciones')}</a>`;
  const vcell = (k, label, val, unit, bad) => val === undefined ? '' : `<div class="vt ${k} ${bad ? 'alarm' : ''}"><small>${label}</small><b>${val}</b><i>${unit}</i></div>`;
  const isBad = (k, v) => ({ hr: v < 50 || v > 120, spo2: v < 90, rr: v < 10 || v > 28, t: v >= 38.5 || v < 35.5, gl: v < 70 || v > 250, bp: parseInt(v) < 90 || parseInt(v) >= 180 }[k]);
  function monitor(v) {
    if (!v) return '';
    const cells = [['hr', 'HR', 'bpm'], ['bp', 'BP', 'mmHg'], ['spo2', 'SpO₂', '%'], ['rr', 'RR', '/min'], ['t', 'T', '°C'], ['gl', 'Glu', 'mg/dL']].map(([k, l, u]) => vcell(k, l, v[k], u, isBad(k, v[k]))).join('');
    const crit = ['hr', 'spo2', 'bp', 'rr'].some(k => v[k] !== undefined && isBad(k, v[k]));
    return `<div class="monitor st-mon ${crit ? 'crit' : ''}"><svg class="ecgline" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M0 22 H60 L68 22 L72 6 L78 34 L84 22 H150 L158 22 L162 6 L168 34 L174 22 H240 L248 22 L252 6 L258 34 L264 22 H300"/></svg><div class="vitals">${cells}</div></div>`;
  }
  function frame(inner) {
    const st = ST.st, prog = ST.parts.map((_, k) => `<i class="${k < ST.i ? 'done' : k === ST.i ? 'cur' : ''}"></i>`).join('');
    view(`${crumb()}<div class="ward station-run">
      <aside class="bed card"><div class="pt">${img(st.img, 'pt-img')}<div><small>${L2(KIND[st.kind] ? KIND[st.kind] : ['Drill', 'Práctica'])}</small><h2>${L2(st.t)}</h2></div></div>
        <p class="ctx door">${chips(esc(L2(st.door)))}</p>${monitor(ST.v)}
        <div class="st-clock"><span>⏱</span><b id="stclock"></b></div><div class="simprog">${prog}</div></aside>
      <section class="step card" id="step"><div class="step-in pop">${inner}</div></section></div>`);
    tickClock();
  }
  const top = (label, cls, readTxt) => `<div class="step-top"><span class="skill ${cls}">${label}</span>${readTxt ? `<button class="readbtn" onclick="A.stRead()" aria-label="${T('Read aloud', 'Leer en voz alta')}">${img('speaker')}</button>` : ''}</div>`;
  let readNow = '';
  A.stRead = () => say(readNow);
  function drawPart() {
    const part = ST.parts[ST.i]; if (!part) return finishStation();
    micStop(); readNow = '';
    ({ open: drawTalk, close: drawTalk, step: drawStep, calc: drawCalc, teach: drawTeach, back: drawBack, order: drawOrder, sbar: drawSbar, dq: drawDq })[part.p](part);
    if (S().autoRead && readNow) setTimeout(() => { if (ST && ST.parts[ST.i] === part) say(readNow); }, 450);
  }
  const nextBtn = (cls = 'green') => `<button class="btn ${cls}" onclick="A.stNext()">${T('Next', 'Siguiente')} →</button>`;
  A.stNext = () => { ST.i++; drawPart(); };
  const addPts = (got, max) => { ST.pts += Math.max(0, got); ST.max += max; };
  const critical = txt => { if (!ST.crit.includes(txt)) ST.crit.push(txt); };

  /* think aloud: opening and closing red lines */
  function drawTalk(part) {
    const items = NX.redlines[part.p];
    part.ticks = part.ticks || {};
    const q = part.p === 'open' ? T('You walk into the room. Say out loud everything you do in your first minute, before any treatment.', 'Entras en la habitación. Di en voz alta todo lo que haces en tu primer minuto, antes de cualquier tratamiento.')
      : T('You are about to leave the patient. Say out loud how you finish safely.', 'Vas a dejar al paciente. Di en voz alta cómo terminas de forma segura.');
    readNow = q;
    frame(`${top(T('Think aloud', 'Pensar en voz alta'), 'safety', 1)}<p class="situation">${q}</p>
      <div class="talk"><button class="mic" id="micbtn" onclick="A.stMic()">${SR ? '🎙️' : '🗣️'}<span>${SR ? T('Speak', 'Hablar') : T('Say it out loud', 'Dilo en voz alta')}</span></button>
        <p class="fine" id="micnote">${SR ? T('The microphone ticks what it hears. Speak clearly.', 'El micrófono marca lo que oye. Habla con claridad.') : T('Say it out loud as in the exam, then tick honestly what you said.', 'Dilo en voz alta como en el examen y luego marca con honestidad lo que dijiste.')}</p>
        <p class="transcript" id="tx"></p></div>
      <div id="talkcheck" ${part.shown ? '' : 'hidden'}>${checklist(part, items)}</div>
      <div class="row" id="talkbtns">${part.shown ? `<button class="btn green" onclick="A.stTalkDone()">${T('Confirm', 'Confirmar')}</button>` : `<button class="btn blue" onclick="A.stTalkShow()">${T('I said it: show the checklist', 'Ya lo dije: ver la lista')}</button>`}</div>`);
  }
  const checklist = (part, items) => `<p class="fine">${T('Tick only what you actually said. ⚠ = critical safety point.', 'Marca solo lo que dijiste de verdad. ⚠ = punto crítico de seguridad.')}</p>
    <div class="redlist">${items.map(([id, cr, lab]) => `<label class="rl ${part.ticks[id] ? 'on' : ''}"><input type="checkbox" ${part.ticks[id] ? 'checked' : ''} onchange="A.stTick('${id}',this.checked)"><span>${cr ? '⚠ ' : ''}${esc(L2(lab))}</span></label>`).join('')}</div>`;
  A.stMic = () => {
    const part = ST.parts[ST.i];
    if (MIC) return micStop();
    const ok = micStart(txt => {
      const tx = $('#tx'); if (tx) tx.textContent = '“' + txt.trim() + '”';
      NX.redlines[part.p].forEach(([id, , , kEn, kEs]) => { if ((es() ? kEs : kEn).some(k => txt.includes(k))) part.ticks[id] = true; });
      if (part.shown) { const c = $('#talkcheck'); if (c) c.innerHTML = checklist(part, NX.redlines[part.p]); }
    });
    if (ok) { $('#micbtn').classList.add('on'); SFX.tap(); }
  };
  A.stTick = (id, v) => { ST.parts[ST.i].ticks[id] = v; };
  A.stTalkShow = () => { const part = ST.parts[ST.i]; part.shown = true; micStop(); drawTalk(part); };
  A.stTalkDone = () => {
    const part = ST.parts[ST.i], items = NX.redlines[part.p]; micStop();
    let got = 0; items.forEach(([id, cr, lab]) => { if (part.ticks[id]) got++; else if (cr) critical(L2(lab)); });
    addPts(got, items.length); ST.log.push({ p: part.p, got, max: items.length });
    const missed = items.filter(([id]) => !part.ticks[id]);
    $('#talkbtns').innerHTML = `<div class="simfb ${missed.length ? (missed.some(x => x[1]) ? 'bad' : 'meh') : 'good'} pop"><b>${got}/${items.length}</b>
      <p>${missed.length ? T('Say next time: ', 'La próxima vez di: ') + missed.map(x => L2(x[2])).join(' · ') : T('Every red line said out loud. Examiners can only score what they hear.', 'Todas las líneas rojas dichas en voz alta. Solo se puntúa lo que se oye.')}</p>${nextBtn(missed.some(x => x[1]) ? 'red' : 'green')}</div>`;
    document.querySelectorAll('#talkcheck input').forEach(x => x.disabled = true);
    if (missed.some(x => x[1])) SFX.no(); else SFX.ok();
  };

  /* clinical step: answer in your own words first, then choose */
  function drawStep(part) {
    const s = part.s; ST.v = s.v || ST.v;
    readNow = L2(s.s);
    const label = (LEV.t('skills') || {})[s.k] || T('Decision', 'Decisión');
    frame(`${top(label, s.k, 1)}<p class="situation">${chips(esc(L2(s.s)))}</p>
      <div id="stopts">${part.open ? opts(part) : `<div class="gate"><p>${T('Say out loud what you would do, as you would in front of the examiner.', 'Di en voz alta qué harías, como delante del examinador.')}</p>
        <button class="btn blue" onclick="A.stReveal()">${T('I said it: show the options', 'Ya lo dije: ver opciones')}</button></div>`}</div><div id="simfb"></div>`);
  }
  const opts = part => { part.order = part.order || shuffle(part.s.c.map((_, k) => k));
    return `<div class="choices">${part.order.map((k, n) => `<button class="choice" data-k="${k}" onclick="A.stPick(${k})"><kbd>${n + 1}</kbd><span>${chips(esc(L2([part.s.c[k][1], part.s.c[k][2]])))}</span></button>`).join('')}</div>`; };
  A.stReveal = () => { const part = ST.parts[ST.i]; part.open = true; $('#stopts').innerHTML = opts(part); };
  A.stPick = k => {
    const part = ST.parts[ST.i], c = part.s.c[k], sc = c[0], best = part.s.c.findIndex(x => x[0] === 2);
    addPts(sc, 2); ST.log.push({ p: 'step', sc, s: part.s, k });
    if (sc === -1) critical(L2([c[1], c[2]]));
    document.querySelectorAll('#step .choice').forEach(b => { b.disabled = true; const j = +b.dataset.k; if (j === best) b.classList.add('right'); else if (j === k) b.classList.add(sc === 1 ? 'meh' : 'bad'); });
    if (sc === 2) SFX.ok(); else if (sc === -1) { SFX.alarm(); const m = $('.st-mon'); if (m) m.classList.add('crit'); } else SFX.no();
    const label = sc === 2 ? '+2' : sc === 1 ? '+1' : sc === 0 ? '0' : T('⚠ Unsafe: critical error', '⚠ Inseguro: error crítico');
    $('#simfb').innerHTML = `<div class="simfb ${sc === 2 ? 'good' : sc === 1 ? 'meh' : 'bad'} pop"><b>${label}</b><p>${chips(esc(L2([c[3], c[4]])))}</p>${nextBtn(sc === 2 ? 'green' : sc === 1 ? 'orange' : 'red')}</div>`;
    if (S().autoRead) setTimeout(() => say(L2([c[3], c[4]])), 400);
  };

  /* bedside calculation */
  const calcById = id => NX.calcs.find(c => c.id === id);
  const num = s => +String(s).replace(',', '.').replace(/[^\d.+-]/g, '');
  function drawCalc(part) {
    const c = calcById(part.id); readNow = L2(c.q);
    frame(`${top(T('Calculation', 'Cálculo'), 'act', 1)}<p class="situation">${chips(esc(L2(c.q)))}</p>
      <div class="calc-row"><input id="calcin" class="calc-in" inputmode="decimal" autocomplete="off" placeholder="0" onkeydown="if(event.key==='Enter')A.stCalc()"><span class="calc-unit">${esc(L2(c.unit))}</span>
      <button class="btn green" onclick="A.stCalc()">${T('Check', 'Comprobar')}</button></div><p class="fine">${T('Desired ÷ have × volume. Rate = volume ÷ hours. Drops/min = volume × drop factor ÷ minutes.', 'Deseado ÷ disponible × volumen. Ritmo = volumen ÷ horas. Gotas/min = volumen × factor de goteo ÷ minutos.')}</p><div id="simfb"></div>`);
    setTimeout(() => { const i = $('#calcin'); if (i) i.focus(); }, 100);
  }
  A.stCalc = () => {
    const part = ST.parts[ST.i], c = calcById(part.id), inp = $('#calcin'); if (!inp || inp.disabled || inp.value.trim() === '') return;
    const ok = Math.abs(num(inp.value) - c.ans) <= c.tol + 1e-9; inp.disabled = true; inp.classList.add(ok ? 'ok' : 'bad');
    addPts(ok ? 2 : 0, 2); ST.log.push({ p: 'calc', ok });
    if (!ok && ST.st.kind === 'med') critical(T('Wrong dose calculation', 'Cálculo de dosis erróneo'));
    ok ? SFX.ok() : SFX.no();
    const ans = String(c.ans).replace('.', es() ? ',' : '.');
    $('#simfb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${ok ? '✓ ' : '✗ '}${ans} ${esc(L2(c.unit))}</b><p>${esc(L2(c.how))}</p>${ok ? '' : `<p class="fine">${T('In the exam, check a calculation with a colleague when unsure: never guess a dose.', 'En el examen, comprueba el cálculo con un compañero si dudas: nunca adivines una dosis.')}</p>`}${nextBtn(ok ? 'green' : 'red')}</div>`;
  };

  /* teaching: pick the key points, then the best teach-back */
  const teachById = id => NX.teach.find(c => c.id === id);
  function drawTeach(part) {
    const c = teachById(part.id), need = c.pts.filter(p => p[0]).length;
    part.order = part.order || shuffle(c.pts.map((_, k) => k)); part.sel = part.sel || [];
    readNow = L2(c.ctx);
    frame(`${top(T('Teaching', 'Educación'), 'teach', 1)}<p class="situation">${esc(L2(c.ctx))} ${T(`Choose the ${need} points you must teach.`, `Elige los ${need} puntos que debes enseñar.`)}</p>
      <div class="pick-grid">${part.order.map(k => `<button class="pick ${part.sel.includes(k) ? 'on' : ''}" data-k="${k}" onclick="A.stPickPt(${k})">${esc(L2([c.pts[k][1], c.pts[k][2]]))}</button>`).join('')}</div>
      <div class="row"><span class="chip" id="pickn">${part.sel.length}/${need}</span><button class="btn green" id="pickgo" ${part.sel.length === need ? '' : 'disabled'} onclick="A.stTeachDone()">${T('Check', 'Comprobar')}</button></div><div id="simfb"></div>`);
  }
  A.stPickPt = k => {
    const part = ST.parts[ST.i], c = teachById(part.id), need = c.pts.filter(p => p[0]).length; if (part.done) return;
    const i = part.sel.indexOf(k); if (i > -1) part.sel.splice(i, 1); else if (part.sel.length < need) part.sel.push(k); else return SFX.no();
    SFX.tap(); document.querySelectorAll('.pick').forEach(b => b.classList.toggle('on', part.sel.includes(+b.dataset.k)));
    $('#pickn').textContent = `${part.sel.length}/${need}`; $('#pickgo').disabled = part.sel.length !== need;
  };
  A.stTeachDone = () => {
    const part = ST.parts[ST.i], c = teachById(part.id), need = c.pts.filter(p => p[0]).length; part.done = true;
    const got = part.sel.filter(k => c.pts[k][0]).length;
    addPts(got, need); ST.log.push({ p: 'teach', got, max: need });
    document.querySelectorAll('.pick').forEach(b => { const k = +b.dataset.k, good = c.pts[k][0]; b.disabled = true; b.classList.add(good ? 'right' : part.sel.includes(k) ? 'bad' : 'off'); });
    got === need ? SFX.ok() : SFX.no();
    $('#simfb').innerHTML = `<div class="simfb ${got === need ? 'good' : got >= need - 1 ? 'meh' : 'bad'} pop"><b>${got}/${need}</b><p>${T('Green = must teach. Red = wrong advice you chose.', 'Verde = debes enseñarlo. Rojo = consejo erróneo que elegiste.')}</p>${nextBtn()}</div>`;
  };
  function drawBack(part) {
    const c = teachById(part.id);
    drawStep(Object.assign(part, { s: { k: 'teach', s: ['You finished teaching. How do you check that the patient understood?', 'Terminaste la educación. ¿Cómo compruebas que el paciente lo entendió?'], c: c.back } }));
  }

  /* procedure: put the steps in order */
  const procById = id => NX.procs.find(p => p.id === id);
  function drawOrder(part) {
    const p = procById(part.id); part.order = part.order || shuffle(p.steps.map((_, k) => k)); part.seq = part.seq || [];
    readNow = T('Put the steps in order.', 'Ordena los pasos.');
    frame(`${top(T('Procedure', 'Procedimiento'), 'act')}<p class="situation">${T('Tap the steps in the order you would do them. Say each one aloud as you tap. Tap a numbered step to undo.', 'Toca los pasos en el orden en que los harías. Dilos en voz alta al tocarlos. Toca uno numerado para deshacer.')}</p>
      <div class="order-list" id="olist">${part.order.map(k => `<button class="ostep" data-k="${k}" onclick="A.stOrd(${k})"><span class="onum"></span><span>${esc(L2(p.steps[k]))}</span></button>`).join('')}</div>
      <div class="row"><button class="btn green" id="ordgo" disabled onclick="A.stOrdDone()">${T('Check order', 'Comprobar orden')}</button></div><div id="simfb"></div>`);
    paintOrder(part);
  }
  function paintOrder(part) {
    document.querySelectorAll('.ostep').forEach(b => { const n = part.seq.indexOf(+b.dataset.k); b.querySelector('.onum').textContent = n > -1 ? n + 1 : ''; b.classList.toggle('on', n > -1); });
    const go = $('#ordgo'); if (go) go.disabled = part.seq.length !== part.order.length;
  }
  A.stOrd = k => {
    const part = ST.parts[ST.i]; if (part.done) return;
    const n = part.seq.indexOf(k); if (n > -1) part.seq.splice(n); else part.seq.push(k);
    SFX.tap(); paintOrder(part);
  };
  const lis = a => { const t = []; a.forEach(x => { let lo = 0, hi = t.length; while (lo < hi) { const m = (lo + hi) >> 1; if (t[m] < x) lo = m + 1; else hi = m; } t[lo] = x; }); return t.length; };
  A.stOrdDone = () => {
    const part = ST.parts[ST.i], p = procById(part.id); part.done = true;
    const got = lis(part.seq), n = p.steps.length, crit = p.crit || [];
    addPts(got, n); ST.log.push({ p: 'order', got, max: n });
    const critWrong = crit.filter(k => part.seq.indexOf(k) !== k);
    critWrong.forEach(k => critical(L2(p.steps[k])));
    /* re-draw in the correct order, showing where she put each step */
    $('#olist').innerHTML = p.steps.map((s, k) => { const mine = part.seq.indexOf(k) + 1, ok = mine === k + 1;
      return `<div class="ostep done ${ok ? 'right' : 'bad'}"><span class="onum">${k + 1}</span><span>${esc(L2(s))}${crit.includes(k) ? ` <em class="critag">⚠ ${T('critical', 'crítico')}</em>` : ''}</span>${ok ? '<b>✓</b>' : `<small>${T('You', 'Tú')}: ${mine}</small>`}</div>`; }).join('');
    $('#ordgo').remove();
    const pct = Math.round(100 * got / n); pct >= 90 && !critWrong.length ? SFX.ok() : SFX.no();
    $('#simfb').innerHTML = `<div class="simfb ${critWrong.length ? 'bad' : pct >= 80 ? 'good' : 'meh'} pop"><b>${got}/${n} ${T('in sequence', 'en secuencia')}</b>
      <p>${critWrong.length ? T('A critical step was out of place.', 'Un paso crítico quedó fuera de lugar.') : T('Good sequence.', 'Buena secuencia.')} 📚 ${esc(L2(p.src))}</p>${nextBtn(critWrong.length ? 'red' : 'green')}</div>`;
  };

  /* SBAR: sort each statement */
  const sbarById = id => NX.sbar.find(c => c.id === id);
  function drawSbar(part) {
    const c = sbarById(part.id); part.order = part.order || shuffle(c.items.map((_, k) => k)); part.pick = part.pick || {};
    readNow = L2(c.ctx);
    frame(`${top('SBAR', 'comm', 1)}<p class="situation">${esc(L2(c.ctx))} ${T('Sort each sentence: S, B, A, R, or ✕ if it does not belong in the call.', 'Clasifica cada frase: S, B, A, R, o ✕ si no corresponde a la llamada.')}</p>
      <div class="sbar-list">${part.order.map(k => `<div class="sbar-item" data-k="${k}"><p>${esc(L2([c.items[k][1], c.items[k][2]]))}</p><div class="sbar-btns">${'SBARX'.split('').map(L => `<button class="sb ${part.pick[k] === L ? 'on' : ''}" data-l="${L}" onclick="A.stSb(${k},'${L}')">${L === 'X' ? '✕' : L}</button>`).join('')}</div></div>`).join('')}</div>
      <p class="fine">S = ${T('Situation', 'Situación')} · B = ${T('Background', 'Antecedentes')} · A = ${T('Assessment', 'Valoración')} · R = ${T('Recommendation / request', 'Recomendación / petición')}</p>
      <div class="row"><button class="btn green" id="sbgo" ${Object.keys(part.pick).length === c.items.length ? '' : 'disabled'} onclick="A.stSbDone()">${T('Check', 'Comprobar')}</button></div><div id="simfb"></div>`);
  }
  A.stSb = (k, L) => {
    const part = ST.parts[ST.i], c = sbarById(part.id); if (part.done) return;
    part.pick[k] = L; SFX.tap();
    document.querySelectorAll(`.sbar-item[data-k="${k}"] .sb`).forEach(b => b.classList.toggle('on', b.dataset.l === L));
    $('#sbgo').disabled = Object.keys(part.pick).length !== c.items.length;
  };
  A.stSbDone = () => {
    const part = ST.parts[ST.i], c = sbarById(part.id); part.done = true;
    let got = 0; c.items.forEach((it, k) => { if (part.pick[k] === it[0]) got++; });
    addPts(got, c.items.length); ST.log.push({ p: 'sbar', got, max: c.items.length });
    document.querySelectorAll('.sbar-item').forEach(el => { const k = +el.dataset.k, ok = part.pick[k] === c.items[k][0]; el.classList.add(ok ? 'right' : 'bad');
      el.querySelectorAll('.sb').forEach(b => { b.disabled = true; if (b.dataset.l === c.items[k][0]) b.classList.add('ans'); }); });
    $('#sbgo').remove();
    const call = 'SBAR'.split('').map(L => c.items.filter(i => i[0] === L).map(i => L2([i[1], i[2]])).join(' ')).join(' ');
    readNow = call; got === c.items.length ? SFX.ok() : SFX.no();
    $('#simfb').innerHTML = `<div class="simfb ${got === c.items.length ? 'good' : 'meh'} pop"><b>${got}/${c.items.length}</b><p class="callscript">📞 ${esc(call)}</p>
      <div class="row"><button class="btn ghost" onclick="A.stRead()">${img('speaker')} ${T('Hear the call', 'Escuchar la llamada')}</button>${nextBtn()}</div></div>`;
  };

  /* examiner debrief question */
  function drawDq(part) {
    const r = part.r; part.order = part.order || shuffle([0, 1, 2, 3]);
    readNow = L2(r[1]);
    frame(`${top(T('Examiner’s question', 'Pregunta del examinador'), 'doc', 1)}<p class="situation">${esc(L2(r[1]))}</p>
      <div class="choices">${part.order.map((k, n) => `<button class="choice" data-k="${k}" onclick="A.stDq(${k})"><kbd>${n + 1}</kbd><span>${esc(es() ? r[3][k] : r[2][k])}</span></button>`).join('')}</div><div id="simfb"></div>`);
  }
  A.stDq = k => {
    const part = ST.parts[ST.i], r = part.r, ok = k === r[0];
    addPts(ok ? 1 : 0, 1); ST.log.push({ p: 'dq', ok });
    document.querySelectorAll('#step .choice').forEach(b => { b.disabled = true; const j = +b.dataset.k; if (j === r[0]) b.classList.add('right'); else if (j === k) b.classList.add('bad'); });
    ok ? SFX.ok() : SFX.no();
    $('#simfb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${ok ? '✓' : '✗'}</b><p>${esc(L2([r[4], r[5]]))}</p>${nextBtn(ok ? 'green' : 'red')}</div>`;
  };

  /* ---------- result of one station ---------- */
  function finishStation() {
    clearInterval(tick); micStop();
    const st = ST.st;
    /* parts not reached still count toward the maximum */
    ST.parts.slice(ST.i).forEach(p => { ST.max += ({ open: NX.redlines.open.length, close: NX.redlines.close.length, step: 2, back: 2, calc: 2, dq: 1, teach: (teachById(p.id) || { pts: [] }).pts.filter(x => x[0]).length, order: (procById(p.id) || { steps: [] }).steps.length, sbar: (sbarById(p.id) || { items: [] }).items.length })[p.p] || 0; });
    const pct = ST.max ? Math.round(100 * ST.pts / ST.max) : 0, pass = pct >= PASS && !ST.crit.length && !ST.timeUp;
    const secs = Math.round((Date.now() - ST.start) / 1000);
    if (st.kind !== 'drill') {
      const r = rec()[st.id] || {}; rec()[st.id] = { best: Math.max(r.best || 0, pct), pass: !!(r.pass || pass), n: (r.n || 0) + 1, last: pct };
    }
    save(); touch(10 + Math.round(pct / 10)); pass ? (SFX.win(), confetti()) : SFX.no();
    if (EXD) EXD.res.push({ id: st.id, pct, pass, crit: ST.crit.slice(), timeUp: !!ST.timeUp });
    const nextLabel = EXD ? (EXD.k + 1 < EXD.ids.length ? T('Next station', 'Siguiente estación') : T('See results', 'Ver resultados')) : '';
    view(`${crumb()}<section class="card debrief st-result"><div class="db-head">${mascot(pass ? 'happy' : 'sad', 'big jump')}<div>
        <h1>${L2(st.t)}</h1><p class="verdict ${pass ? 'pass' : 'fail'}">${pass ? T('Station passed', 'Estación superada') : T('Not passed yet', 'Aún no superada')}</p>
        <p class="pct"><b data-c="${pct}" data-suffix="%">0</b> <small>⏱ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')} / ${st.mins}:00</small></p></div></div>
      ${ST.timeUp ? `<p class="warnbox">⏰ ${T('Time ran out. In the exam, keep moving: say your priorities out loud even when unsure.', 'Se acabó el tiempo. En el examen sigue avanzando: di tus prioridades en voz alta aunque dudes.')}</p>` : ''}
      ${ST.crit.length ? `<div class="warnbox"><b>⚠ ${T('Critical errors (a station fails on these)', 'Errores críticos (suspenden la estación)')}</b><ul>${ST.crit.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>` : ''}
      <div class="skillbars">${ST.log.map(l => { const lab = { open: T('Opening red lines', 'Líneas rojas al entrar'), close: T('Closing red lines', 'Líneas rojas al salir'), step: T('Decision', 'Decisión'), calc: T('Calculation', 'Cálculo'), teach: T('Teaching points', 'Puntos de educación'), order: T('Procedure order', 'Orden del procedimiento'), sbar: 'SBAR', dq: T('Examiner’s question', 'Pregunta del examinador') }[l.p];
        const got = l.got !== undefined ? l.got : l.sc !== undefined ? Math.max(0, l.sc) : l.ok ? (l.p === 'dq' ? 1 : 2) : 0, max = l.max || (l.p === 'dq' ? 1 : 2);
        return `<div><span class="skill ${l.p === 'open' || l.p === 'close' ? 'safety' : l.p === 'dq' ? 'doc' : 'act'}">${lab}</span><div class="mbar-mini"><i style="width:${100 * got / max}%"></i></div><small>${got}/${max}</small></div>`; }).join('')}</div>
      <div class="row">${EXD ? `<button class="btn green" onclick="A.exNext()">${nextLabel} →</button>` : `<button class="btn green" onclick="A.stAgain()">${T('Try again', 'Repetir')}</button><a class="btn ghost" href="#/stations">${T('All stations', 'Todas las estaciones')}</a>`}</div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
    ST = Object.assign(ST, { finished: true });
  }
  A.stAgain = () => runStation(ST.st);

  /* ---------- exam day: 6 stations back to back ---------- */
  const byKind = k => NX.stations.filter(s => s.kind === k);
  function examDayIds() {
    const acute = shuffle(byKind('acute')).slice(0, 2), last = pick([...byKind('proc'), ...byKind('sbar')]);
    return [...acute, pick(byKind('med')), pick(byKind('comm')), pick(byKind('teach')), last].map(s => s.id);
  }
  R.examday = () => {
    clearInterval(tick); EXD = null;
    const mins = 15 + 15 + 12 + 10 + 10 + 5;
    view(`<a class="crumb" href="#/stations">← ${T('Stations', 'Estaciones')}</a><section class="card center-card exam-intro">${img('sim', 'head-img float')}
      <h1>${T('Exam day rehearsal', 'Ensayo del día de examen')}</h1>
      <p>${T(`6 stations back to back, about ${mins} minutes: 2 acute patients, a medication station, a communication station, a teaching station, and a procedure or SBAR call.`, `6 estaciones seguidas, unos ${mins} minutos: 2 pacientes agudos, una estación de medicación, una de comunicación, una de educación y un procedimiento o llamada SBAR.`)}</p>
      <ul class="rules">${[T('Read the door note before each station (1 minute).', 'Lee la nota de la puerta antes de cada estación (1 minuto).'), T('Think aloud: say your hand hygiene, identification and every check.', 'Piensa en voz alta: di la higiene de manos, la identificación y cada comprobación.'), T('Answer in your own words before the options appear.', 'Responde con tus palabras antes de ver las opciones.'), T('No going back. Like the real day, keep moving.', 'Sin volver atrás. Como el día real, sigue avanzando.'), T('A station passes at 70% with no critical error. MSR does not publish its scoring; this is a practice rule.', 'Una estación se supera con 70% y sin errores críticos. MSR no publica su puntuación; es una regla de práctica.')].map(x => `<li>${x}</li>`).join('')}</ul>
      <button class="btn green big" onclick="A.exStart()">${T('Start exam day', 'Empezar el día de examen')}</button></section>`);
  };
  A.exStart = () => { EXD = { ids: examDayIds(), k: 0, res: [], start: Date.now() }; doorCard(); };
  function doorCard() {
    const st = NX.stations.find(s => s.id === EXD.ids[EXD.k]); let left = 60;
    view(`<span class="crumb">${T('Exam day', 'Día de examen')} · ${T('station', 'estación')} ${EXD.k + 1}/${EXD.ids.length}</span>
      <section class="card door-card pop"><div class="door-sign">${img(st.img)}<div><small>${L2(KIND[st.kind])} · ${st.mins} min</small><h2>${L2(st.t)}</h2></div></div>
      <p class="door-note">${chips(esc(L2(st.door)))}</p><p class="fine">${T('Reading time', 'Tiempo de lectura')}: <b id="doorleft">1:00</b></p>
      <button class="btn green big" onclick="A.exEnter()">${T('Knock and enter', 'Llamar y entrar')} 🚪</button></section>`);
    if (S().autoRead) say(L2(st.door));
    clearInterval(tick); tick = setInterval(() => { left--; const el = $('#doorleft'); if (el) el.textContent = `0:${String(Math.max(0, left)).padStart(2, '0')}`; if (left <= 0) A.exEnter(); }, 1000);
  }
  A.exEnter = () => { clearInterval(tick); stopVoice(); runStation(NX.stations.find(s => s.id === EXD.ids[EXD.k])); };
  A.exNext = () => { EXD.k++; if (EXD.k < EXD.ids.length) return doorCard(); exResults(); };
  function exResults() {
    const res = EXD.res, passed = res.filter(r => r.pass).length, avg = Math.round(res.reduce((a, r) => a + r.pct, 0) / res.length);
    const b = S().best; b.examday = Math.max(b.examday || 0, avg); b.examdayPass = Math.max(b.examdayPass || 0, passed); save();
    const mins = Math.round((Date.now() - EXD.start) / 60000);
    view(`<a class="crumb" href="#/stations">← ${T('Stations', 'Estaciones')}</a><section class="card debrief"><div class="db-head">${mascot(passed >= 5 ? 'happy' : 'sad', 'big jump')}<div>
      <h1>${T('Exam day results', 'Resultados del día de examen')}</h1><p class="pct"><b data-c="${passed}">0</b>/${res.length} <small>${T('stations passed', 'estaciones superadas')} · ${T('average', 'media')} ${avg}% · ${mins} min</small></p></div></div>
      <ol class="exres">${res.map(r => { const st = NX.stations.find(s => s.id === r.id); return `<li class="${r.pass ? 'good' : 'bad'}"><span>${img(st.img)}</span><div><b>${L2(st.t)}</b><small>${L2(KIND[st.kind])}</small>${r.crit.length ? `<small class="critline">⚠ ${esc(r.crit.join(' · '))}</small>` : ''}${r.timeUp ? `<small class="critline">⏰ ${T('time ran out', 'se acabó el tiempo')}</small>` : ''}</div><em>${r.pct}%</em><a class="btn ghost small" href="#/station/${r.id}">${T('Redo', 'Repetir')}</a></li>`; }).join('')}</ol>
      <p class="fine">${T('Redo every station you did not pass before your next rehearsal.', 'Repite cada estación no superada antes del próximo ensayo.')}</p>
      <div class="row"><button class="btn green" onclick="A.exStart()">${T('New exam day', 'Nuevo día de examen')}</button><a class="btn ghost" href="#/stations">${T('All stations', 'Todas las estaciones')}</a></div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
    if (passed >= 5) confetti();
    EXD = null;
  }

  /* ---------- hub, single station, drills ---------- */
  R.station = id => {
    EXD = null;
    if (id === 'weak') {
      const pool = NX.stations.filter(s => ['acute', 'med', 'comm', 'teach'].includes(s.kind));
      const score = s => { const r = rec()[s.id]; return r ? (r.pass ? 100 + r.best : r.best) : -1; };
      const lowest = Math.min(...pool.map(score)); id = pick(pool.filter(s => score(s) === lowest)).id;
    }
    const st = NX.stations.find(s => s.id === id); if (!st) return R.stations();
    runStation(st);
  };
  R.redlines = () => { EXD = null; runStation({ id: 'drill', kind: 'drill', img: 'steth', mins: 3, t: ['Red-lines drill', 'Práctica de líneas rojas'], door: ['Say your opening and closing safety checks out loud, as you will in every station.', 'Di en voz alta tus comprobaciones de seguridad al entrar y al salir, como en cada estación.'] }); };
  R.stations = filter => {
    clearInterval(tick); EXD = null;
    const r = rec(), all = NX.stations, passed = all.filter(s => (r[s.id] || {}).pass).length;
    const card = (s, i) => { const x = r[s.id]; return `<a class="card st-card tilt" href="#/station/${s.id}" style="--d:${i * 40}ms">${img(s.img)}<div><h3>${L2(s.t)}</h3><small>${s.mins} min${x ? ` · ${T('best', 'mejor')} ${x.best}%` : ''}</small></div>${x ? `<span class="st-badge ${x.pass ? 'pass' : 'fail'}">${x.pass ? '✓' : '•'}</span>` : ''}</a>`; };
    const kinds = filter && KIND[filter] ? [filter] : Object.keys(KIND);
    view(`<section class="page-head">${img('sim', 'head-img float')}<div><h1>${T('MSR exam stations', 'Estaciones del examen MSR')}</h1>
        <p>${T('Timed stations like a simulation licensing exam at MSR: mannequin and actor scenarios, a medication station, procedures, SBAR and the examiner’s debrief. Say everything out loud.', 'Estaciones cronometradas como un examen de licencia por simulación en MSR: maniquí y actores, medicación, procedimientos, SBAR y el interrogatorio del examinador. Dilo todo en voz alta.')}</p></div></section>
      <div class="st-hero">
        <a class="card hero-exam tilt" href="#/examday">${img('trophy')}<div><h2>${T('Exam day rehearsal', 'Ensayo del día de examen')}</h2><p>${T('6 stations back to back, about 67 minutes', '6 estaciones seguidas, unos 67 minutos')}</p>${S().best.examday ? `<span class="chip">${T('best', 'mejor')}: ${S().best.examdayPass || 0}/6 · ${S().best.examday}%</span>` : ''}</div></a>
        <div class="st-tools">
          <a class="card tool tilt" href="#/redlines">${img('lock')}<b>${T('Red-lines drill', 'Líneas rojas')}</b><small>3 min</small></a>
          <a class="card tool tilt" href="#/calc">${img('calc')}<b>${T('Bedside calculations', 'Cálculos a pie de cama')}</b><small>${S().best.calc ? `${T('best', 'mejor')} ${S().best.calc}/8` : '8'}</small></a>
          <a class="card tool tilt" href="#/station/weak">${img('target')}<b>${T('My weakest station', 'Mi estación más débil')}</b><small>${passed}/${all.length} ${T('passed', 'superadas')}</small></a>
          <a class="card tool tilt" href="#/sim">${img('steth')}<b>${T('Simulation Ward (untimed)', 'Sala de simulación (sin tiempo)')}</b><small>9</small></a>
        </div></div>
      <div class="st-progress"><div class="mbar-mini"><i style="width:${100 * passed / all.length}%"></i></div><small>${passed}/${all.length} ${T('stations passed', 'estaciones superadas')}</small></div>
      ${kinds.map(k => `<h2 class="sec" id="k-${k}">${img(KIND[k][2])} ${L2(KIND[k])}</h2><div class="st-grid">${all.filter(s => s.kind === k).map(card).join('')}</div>`).join('')}`);
    if (filter) setTimeout(() => { const el = document.getElementById('k-' + filter); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 200);
  };

  /* bedside calculation drill: 8 random problems */
  let CD = null;
  R.calc = () => { clearInterval(tick); CD = { items: shuffle(NX.calcs).slice(0, 8), i: 0, ok: 0 }; drawCD(); };
  function drawCD() {
    const c = CD.items[CD.i]; readNow = L2(c.q);
    view(`<a class="crumb" href="#/stations">← ${T('Stations', 'Estaciones')}</a><div class="game-top"><h1>${img('calc')} ${T('Bedside calculations', 'Cálculos a pie de cama')}</h1><span class="chip">${CD.i + 1}/${CD.items.length} · ✓ ${CD.ok}</span></div>
      <section class="card calc-card pop"><p class="situation">${chips(esc(L2(c.q)))}</p>
      <div class="calc-row"><input id="calcin" class="calc-in" inputmode="decimal" autocomplete="off" placeholder="0" onkeydown="if(event.key==='Enter')A.cdCheck()"><span class="calc-unit">${esc(L2(c.unit))}</span><button class="btn green" onclick="A.cdCheck()">${T('Check', 'Comprobar')}</button></div>
      <p class="fine">${T('Desired ÷ have × volume · rate = volume ÷ hours · drops/min = volume × drop factor ÷ minutes', 'Deseado ÷ disponible × volumen · ritmo = volumen ÷ horas · gotas/min = volumen × factor ÷ minutos')}</p><div id="simfb"></div></section>`);
    setTimeout(() => { const i = $('#calcin'); if (i) i.focus(); }, 100);
  }
  A.cdCheck = () => {
    const c = CD.items[CD.i], inp = $('#calcin'); if (!inp || inp.disabled || inp.value.trim() === '') return;
    const ok = Math.abs(num(inp.value) - c.ans) <= c.tol + 1e-9; inp.disabled = true; inp.classList.add(ok ? 'ok' : 'bad'); if (ok) CD.ok++;
    ok ? SFX.ok() : SFX.no(); touch(ok ? 3 : 1);
    const last = CD.i === CD.items.length - 1, ans = String(c.ans).replace('.', es() ? ',' : '.');
    $('#simfb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${ok ? '✓' : '✗'} ${ans} ${esc(L2(c.unit))}</b><p>${esc(L2(c.how))}</p><button class="btn ${ok ? 'green' : 'red'}" onclick="A.cdNext()">${last ? T('Finish', 'Terminar') : T('Next', 'Siguiente')} →</button></div>`;
  };
  A.cdNext = () => {
    if (++CD.i < CD.items.length) return drawCD();
    const b = S().best; b.calc = Math.max(b.calc || 0, CD.ok); save(); if (CD.ok >= 7) confetti();
    view(`<section class="card center-card end-game">${mascot(CD.ok >= 6 ? 'happy' : 'sad', 'big jump')}<h1 class="pop">${T('Bedside calculations', 'Cálculos a pie de cama')}</h1>
      <p class="big-score"><b data-c="${CD.ok}">0</b>/8</p><p>${T('Write the formula, then the numbers, then check the answer makes sense (is 25 mL of morphine possible?).', 'Escribe la fórmula, luego los números, y comprueba que el resultado tiene sentido (¿25 mL de morfina es posible?).')}</p>
      <div class="row"><button class="btn green" onclick="A.go('#/calc')">${T('Again', 'Otra vez')}</button><a class="btn ghost" href="#/stations">${T('Stations', 'Estaciones')}</a></div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  };
});
