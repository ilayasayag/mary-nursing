/* lev. games: Triage Rush, Med Pass, Vital Check (exam) and Word Rain, Memory Flip (Hebrew).
   Registered into the app through window.LEV_EXT; app.js passes in its helpers (LEV). */
(window.LEV_EXT = window.LEV_EXT || []).push(LEV => {
  'use strict';
  const { R, view, img, esc, shuffle, pick, t, L2, meaning, SFX, play, segments, touch, stat, confetti, toast, mascot, countUp, chips, uniqVocab, save, onLeave } = LEV;
  const S = () => LEV.state();
  const $ = s => document.querySelector(s);
  const A = window.A;
  const es = () => S().lang === 'es';
  const best = (k, v, lower = false) => { const b = S().best; const cur = b[k]; if (cur === undefined || (lower ? v < cur : v > cur)) { b[k] = v; save(); return true; } return false; };
  const head = (icon, key, extra = '') => `<a class="crumb" href="${/\/ul$/.test(location.hash) ? '#/ulpan/games' : '#/practice'}">← ${/\/ul$/.test(location.hash) ? (S().lang === 'es' ? 'Juegos' : 'Games') : t('practice')}</a><div class="game-top"><h1>${img(icon)} ${t(key)}</h1>${extra}</div>`;
  const vitalsChips = v => [['HR', v.hr, '/min'], ['BP', v.bp, ''], ['SpO₂', v.spo2, '%'], ['RR', v.rr, '/min'], ['T', v.t, '°C'], ['Glu', v.gl, 'mg/dL']]
    .filter(x => x[1] !== undefined).map(([k, val, u]) => `<span class="vchip"><small>${k}</small><b>${val}</b><i>${u}</i></span>`).join('');
  function endCard(title, big, sub, again, extra = '', happy = true) {
    view(`<section class="card center-card end-game">${mascot(happy ? 'happy' : 'sad', 'big jump')}<h1 class="pop">${title}</h1>
      <p class="big-score"><b data-c="${big}">0</b></p><p>${sub}</p>${extra}
      <div class="row"><button class="btn green" onclick="${again}">${t('again')}</button><a class="btn ghost" href="#/practice">${t('practice')}</a></div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  }
  const starsHtml = n => `<div class="stars big">${[1, 2, 3].map(k => `<span class="${n >= k ? 'on pop' : ''}" style="animation-delay:${k * 160}ms">★</span>`).join('')}</div>`;

  /* ======================= TRIAGE RUSH ======================= */
  let TR = null;
  R.triage = () => {
    TR = { rounds: shuffle(NX.triage).slice(0, 5), i: 0, score: 0, max: 0, perfect: 0 };
    drawTriage();
  };
  function drawTriage() {
    const r = TR.rounds[TR.i]; TR.picks = []; TR.done = false;
    TR.cards = r.p.map((p, k) => ({ k, p }));
    view(`${head('emerg', 'triage', `<span class="chip">${t('round')} ${TR.i + 1}/${TR.rounds.length} · ⭐ ${TR.score}</span>`)}
      <div class="ward-board card"><div class="board-top">${img('sim')}<div><small>${t('tapOrder')}</small><h2>${L2(r.t)}</h2></div><span class="board-light"></span></div>
      <div class="tri-grid" id="trigrid">${TR.cards.map(c => triCard(c)).join('')}</div>
      <p class="fine center">${t('undoTip')}</p><div id="trifb"></div></div>`);
  }
  function triCard({ k, p }) {
    return `<button class="tri-card" data-k="${k}" onclick="A.triPick(${k})"><span class="rank" hidden></span>
      <div class="tri-who">${img(p[1], 'tri-img')}<b>${esc(p[0])}</b></div>
      <p class="tri-c">${chips(esc(L2(p[2])))}</p><div class="vchips">${vitalsChips(p[3])}</div></button>`;
  }
  A.triPick = k => {
    if (TR.done) return;
    const i = TR.picks.indexOf(k);
    if (i > -1) TR.picks.splice(i); else TR.picks.push(k);
    SFX.tap();
    document.querySelectorAll('.tri-card').forEach(c => {
      const pos = TR.picks.indexOf(+c.dataset.k), badge = c.querySelector('.rank');
      c.classList.toggle('picked', pos > -1); badge.hidden = pos < 0; if (pos > -1) badge.textContent = pos + 1;
    });
    if (TR.picks.length === 4) setTimeout(revealTriage, 250);
  };
  function revealTriage() {
    TR.done = true;
    const r = TR.rounds[TR.i], grid = $('#trigrid');
    let pts = 0; r.order.forEach((k, pos) => { if (TR.picks[pos] === k) pts += pos === 0 ? 3 : 1; });
    TR.score += pts; TR.max += 6; if (pts === 6) TR.perfect++;
    stat('emerg', TR.picks[0] === r.order[0]);
    /* FLIP: move the cards into the correct order with an animation */
    const cards = [...grid.children], before = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
    r.order.forEach((k, pos) => {
      const c = cards.find(x => +x.dataset.k === k); grid.appendChild(c);
      const mine = TR.picks.indexOf(k), ok = mine === pos;
      c.classList.add(ok ? 'ok' : 'wrong'); c.disabled = true;
      c.querySelector('.rank').hidden = false;
      c.querySelector('.rank').innerHTML = `${pos + 1}`;
      c.insertAdjacentHTML('beforeend', `<span class="tri-verdict">${ok ? '✓' : `${t('yourRank')}: ${mine + 1}`}</span>`);
    });
    cards.forEach(c => { const a = before.get(c), b = c.getBoundingClientRect(); c.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.2,.9,.3,1.2)' }); });
    pts === 6 ? (SFX.win(), confetti()) : pts >= 3 ? SFX.ok() : SFX.no();
    touch(pts * 2);
    $('#trifb').innerHTML = `<div class="simfb ${pts === 6 ? 'good' : pts >= 3 ? 'meh' : 'bad'} pop"><b>${pts === 6 ? t('perfect') : `+${pts} / 6`}</b><p>${chips(esc(L2(r.why)))}</p>
      <button class="btn ${pts === 6 ? 'green' : 'blue'}" onclick="A.triNext()">${TR.i < TR.rounds.length - 1 ? t('next') : t('finish')} →</button></div>`;
    if (S().autoRead) play(segments(L2(r.why), S().lang));
  }
  A.triNext = () => {
    TR.i++;
    if (TR.i < TR.rounds.length) return drawTriage();
    const pct = Math.round(100 * TR.score / TR.max), rec = best('triage', pct);
    if (TR.perfect) { S().best.triageAce = (S().best.triageAce || 0) + TR.perfect; save(); }
    touch(20); if (pct >= 70) confetti();
    endCard(t('triage'), pct, `${rec ? '🏆 ' + t('record') + '! · ' : ''}${TR.perfect} × ${t('perfect')}`, 'A.go(\'triage\')', starsHtml(pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0), pct >= 50);
    $('.big-score b').dataset.suffix = '%';
  };

  /* ======================= MED PASS ======================= */
  let MP = null;
  const ACT = { give: ['✅', 'green'], hold: ['✋', 'orange'], clarify: ['❓', 'blue'] };
  R.medpass = () => { MP = { items: shuffle(NX.medpass).slice(0, 8), i: 0, score: 0, streak: 0, bestStreak: 0 }; drawMed(); };
  function drawMed() {
    const [drug, pt, chart] = MP.items[MP.i]; MP.done = false;
    view(`${head('pharm', 'medpass', `<span class="chip">${MP.i + 1}/${MP.items.length} · 🔥 ${MP.streak}</span>`)}
      <div class="medpass">
        <div class="cart card"><div class="cart-top">${img('pharm', 'pill-img')}<small>${t('orderLbl')}</small></div>
          <div class="mar"><span class="rx">Rx</span><b>${esc(drug)}</b></div><div class="stamp" id="stamp" hidden></div></div>
        <div class="chartcard card"><div class="cart-top">${img('clipboard')}<small>${t('chart')}</small></div>
          <h3>${esc(L2(pt))}</h3><div class="chartrows">${chart.map(([k, v]) => `<div class="crow"><span>${esc(k)}</span><b>${chips(esc(v))}</b></div>`).join('')}</div></div>
      </div>
      <div class="med-actions">${['give', 'hold', 'clarify'].map(a => `<button class="btn ${ACT[a][1]} big" onclick="A.medAct('${a}')">${ACT[a][0]} ${t(a)}</button>`).join('')}</div>
      <div id="medfb"></div>`);
  }
  A.medAct = a => {
    if (MP.done) return; MP.done = true;
    const [drug, , chart, ans, why, src] = MP.items[MP.i], ok = a === ans;
    MP.score += ok ? 1 : 0; MP.streak = ok ? MP.streak + 1 : 0; MP.bestStreak = Math.max(MP.bestStreak, MP.streak);
    stat('pharm', ok); touch(ok ? 6 : 1); ok ? SFX.ok() : SFX.no();
    document.querySelectorAll('.med-actions .btn').forEach(b => { b.disabled = true; });
    document.querySelectorAll('.crow').forEach((row, k) => { if (chart[k][2] === 'bad') row.classList.add('flag'); });
    const st = $('#stamp'); st.hidden = false; st.className = `stamp ${ans}`; st.textContent = t(ans).toUpperCase();
    document.querySelector('.pill-img').classList.add(ans === 'give' ? 'drop' : 'back');
    $('#medfb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${ok ? '✓ ' + t(ans) : `${t('wrongT')} ${t(ans)}`}</b><p>${chips(esc(L2(why)))}</p>
      <p class="src">📚 ${esc(src)}</p><button class="btn ${ok ? 'green' : 'red'}" onclick="A.medNext()">${MP.i < MP.items.length - 1 ? t('next') : t('finish')} →</button></div>`;
    if (S().autoRead) play(segments(L2(why), S().lang));
  };
  A.medNext = () => {
    MP.i++;
    if (MP.i < MP.items.length) return drawMed();
    const n = MP.items.length, rec = best('medpass', MP.score);
    if (MP.score === n) { S().best.medpassPerfect = (S().best.medpassPerfect || 0) + 1; save(); confetti(); }
    touch(15);
    endCard(t('medpass'), MP.score, `/ ${n} · 🔥 ${MP.bestStreak} ${t('streakLbl')}${rec ? ' · 🏆 ' + t('record') : ''}`, 'A.go(\'medpass\')', starsHtml(MP.score === n ? 3 : MP.score >= n - 2 ? 2 : MP.score >= n / 2 ? 1 : 0), MP.score >= n / 2);
  };

  /* ======================= VITAL CHECK ======================= */
  let VC = null;
  function vitalItem() {
    const r = pick(NX.ranges), [lab, unit, lo, hi, min, max, dec, note] = r, step = Math.pow(10, -dec);
    const can = ['normal']; if (lo - step > min) can.push('low', 'low'); if (hi + step < max) can.push('high', 'high');
    const cat = pick(can), rnd = (a, b) => +(a + Math.random() * (b - a)).toFixed(dec);
    let v = cat === 'normal' ? rnd(lo, hi) : cat === 'low' ? rnd(min, lo - step) : rnd(hi + step, max);
    if (cat === 'low' && v >= lo) v = +(lo - step).toFixed(dec); if (cat === 'high' && v <= hi) v = +(hi + step).toFixed(dec);
    return { lab, unit, lo, hi, min, max, dec, note, v, cat };
  }
  R.vitals = () => { VC = { items: Array.from({ length: 12 }, vitalItem), i: 0, score: 0, streak: 0, bestStreak: 0 }; drawVital(); };
  const fmt = (x, dec) => x.toFixed(dec).replace('.', es() ? ',' : '.');
  function drawVital() {
    const it = VC.items[VC.i]; VC.done = false;
    const pos = x => Math.max(0, Math.min(100, 100 * (x - it.min) / (it.max - it.min)));
    view(`${head('thermo', 'vitals', `<span class="chip">${VC.i + 1}/${VC.items.length} · 🔥 ${VC.streak}</span>`)}
      <section class="card vital-card pop"><small class="muted">${esc(L2(it.note))}</small><h2>${chips(esc(L2(it.lab)))}</h2>
        <div class="vital-value"><b>${fmt(it.v, it.dec)}</b><i>${esc(it.unit)}</i></div>
        <div class="gauge" id="gauge"><div class="band" style="left:${pos(it.lo)}%;width:${Math.max(1.5, pos(it.hi) - pos(it.lo))}%"></div>
          <div class="marker" style="left:${pos(it.v)}%"><span>${fmt(it.v, it.dec)}</span></div>
          <div class="ticks"><span>${fmt(it.min, it.dec)}</span><span>${fmt(it.max, it.dec)}</span></div></div>
        <div class="vital-actions"><button class="btn blue big" onclick="A.vitalAns('low')">↓ ${t('low')}</button><button class="btn green big" onclick="A.vitalAns('normal')">✓ ${t('normalBtn')}</button><button class="btn red big" onclick="A.vitalAns('high')">↑ ${t('high')}</button></div>
        <div id="vfb"></div></section>`);
  }
  A.vitalAns = a => {
    if (VC.done) return; VC.done = true;
    const it = VC.items[VC.i], ok = a === it.cat;
    VC.score += ok ? 1 : 0; VC.streak = ok ? VC.streak + 1 : 0; VC.bestStreak = Math.max(VC.bestStreak, VC.streak);
    ok ? SFX.ok() : SFX.no(); touch(ok ? 3 : 1);
    $('#gauge').classList.add('show', it.cat);
    document.querySelectorAll('.vital-actions .btn').forEach(b => { b.disabled = true; });
    const range = it.lo === it.hi ? fmt(it.lo, it.dec) : `${fmt(it.lo, it.dec)}–${fmt(it.hi, it.dec)}`;
    $('#vfb').innerHTML = `<div class="simfb ${ok ? 'good' : 'bad'} pop"><b>${ok ? pick(t('correct')) : `${t('wrongT')} ${t(it.cat === 'normal' ? 'normalBtn' : it.cat)}`}</b>
      <p>${t('normalRange')}: <span class="val">${`${range} ${esc(it.unit)}`.trim()}</span></p><button class="btn ${ok ? 'green' : 'red'}" onclick="A.vitalNext()">${VC.i < VC.items.length - 1 ? t('next') : t('finish')} →</button></div>`;
  };
  A.vitalNext = () => {
    VC.i++;
    if (VC.i < VC.items.length) return drawVital();
    const n = VC.items.length, rec = best('vitals', VC.score); touch(10); if (VC.score >= n - 1) confetti();
    endCard(t('vitals'), VC.score, `/ ${n} · 🔥 ${VC.bestStreak} ${t('streakLbl')}${rec ? ' · 🏆 ' + t('record') : ''}`, 'A.go(\'vitals\')', starsHtml(VC.score >= n - 1 ? 3 : VC.score >= n - 3 ? 2 : VC.score >= n / 2 ? 1 : 0), VC.score >= n / 2);
  };

  /* ======================= WORD RAIN ======================= */
  let WR = null;
  let rainSrc = '';
  R.rain = src => {
    rainSrc = src === 'ul' ? 'ul' : '';
    const prior = S().best.rain;
    view(`${head('heb', 'rain')}<section class="card center-card rain-intro">${img('heb', 'head-img float')}<p>${t('rainD')}</p>
      ${prior ? `<p class="chip">${t('record')}: ${prior}</p>` : ''}<button class="btn green big" onclick="A.rainGo()">${t('play')} ▶</button></section>`);
  };
  A.rainGo = () => {
    const pool = uniqVocab(rainSrc === 'ul' && LEV.ulVocab ? LEV.ulVocab() : NX.vocab.filter(v => !v.alpha && v.he.length <= 22));
    WR = { pool, words: [], score: 0, lives: 3, combo: 0, level: 1, speed: 38, spawnEvery: 3200, lastSpawn: 0, last: performance.now(), target: null, raf: 0, over: false };
    view(`<div class="rain-hud"><span class="hearts">${'❤'.repeat(3)}</span><b id="rscore">0</b><span class="chip" id="rlevel">Lv 1</span></div>
      <div class="rain-stage" id="stage"><div class="clouds"></div><div class="ground"></div></div>
      <div class="choices tiles rain-opts" id="ropts"></div>`);
    onLeave(() => cancelAnimationFrame(WR.raf));
    WR.raf = requestAnimationFrame(rainLoop);
  };
  function rainSpawn() {
    const used = new Set(WR.words.map(w => w.v.he)), v = pick(WR.pool.filter(x => !used.has(x.he)));
    const el = document.createElement('div'); el.className = 'drop'; el.innerHTML = `<span class="he" lang="he" dir="rtl">${v.he}</span>${S().hints ? `<i>${esc(v.tr)}</i>` : ''}`;
    const lane = [12, 50, 88].filter(x => !WR.words.some(w => w.x === x && w.y < 30)); const x = lane.length ? pick(lane) : pick([12, 50, 88]);
    el.style.left = x + '%'; $('#stage').appendChild(el);
    WR.words.push({ v, el, x, y: -8 });
  }
  function rainTarget() {
    const lowest = WR.words.slice().sort((a, b) => b.y - a.y)[0] || null;
    if (lowest === WR.target) return;
    WR.words.forEach(w => w.el.classList.toggle('target', w === lowest)); WR.target = lowest;
    if (!lowest) { $('#ropts').innerHTML = ''; return; }
    const others = shuffle(WR.pool.filter(x => x.he !== lowest.v.he && meaning(x) !== meaning(lowest.v))).slice(0, 3);
    WR.opts = shuffle([lowest.v, ...others]);
    $('#ropts').innerHTML = WR.opts.map((o, k) => `<button class="choice" onclick="A.rainAns(${k})"><span>${esc(meaning(o))}</span></button>`).join('');
    play([{ he: lowest.v.he }]);
  }
  function rainLoop(now) {
    if (!document.body.contains($('#stage') || document.createElement('i'))) return;
    const dt = Math.min(.05, (now - WR.last) / 1000); WR.last = now;
    if (now - WR.lastSpawn > WR.spawnEvery || !WR.words.length) { rainSpawn(); WR.lastSpawn = now; }
    for (const w of WR.words.slice()) {
      w.y += WR.speed * dt * (w === WR.target ? 1 : .92); w.el.style.top = w.y + '%';
      if (w.y >= 86) { rainLose(w, true); }
    }
    rainTarget();
    if (!WR.over) WR.raf = requestAnimationFrame(rainLoop);
  }
  function burst(el, cls) {
    const r = el.getBoundingClientRect(), st = $('#stage').getBoundingClientRect();
    for (let i = 0; i < 12; i++) { const p = document.createElement('span'); p.className = `spark ${cls}`; p.style.left = (r.left - st.left + r.width / 2) + 'px'; p.style.top = (r.top - st.top + r.height / 2) + 'px';
      p.style.setProperty('--dx', (Math.random() - .5) * 160 + 'px'); p.style.setProperty('--dy', (Math.random() - .7) * 140 + 'px'); $('#stage').appendChild(p); setTimeout(() => p.remove(), 700); }
  }
  function rainRemove(w) { WR.words.splice(WR.words.indexOf(w), 1); w.el.remove(); if (WR.target === w) WR.target = null; }
  function rainLose(w, landed) {
    WR.lives--; WR.combo = 0; SFX.no();
    $('#stage').classList.add('hit'); setTimeout(() => $('#stage') && $('#stage').classList.remove('hit'), 350);
    if (landed) { burst(w.el, 'bad'); toast(`${w.v.he} = ${meaning(w.v)}`, 'heb'); rainRemove(w); }
    document.querySelector('.rain-hud .hearts').textContent = '❤'.repeat(Math.max(0, WR.lives)) + '♡'.repeat(3 - Math.max(0, WR.lives));
    if (WR.lives <= 0) rainOver();
  }
  A.rainAns = k => {
    const w = WR.target; if (!w || WR.over) return;
    if (WR.opts[k] === w.v) {
      WR.combo++; WR.score += WR.combo >= 5 ? 2 : 1; SFX.ok(); burst(w.el, 'good'); rainRemove(w); stat('heb', true);
      $('#rscore').textContent = WR.score; $('#rscore').classList.remove('bump'); void $('#rscore').offsetWidth; $('#rscore').classList.add('bump');
      if (WR.score >= WR.level * 6) { WR.level++; WR.speed *= 1.14; WR.spawnEvery = Math.max(1300, WR.spawnEvery * .86); $('#rlevel').textContent = 'Lv ' + WR.level; toast(t('levelUp'), 'sparkles'); }
    } else { w.el.classList.add('shake'); setTimeout(() => w.el.classList.remove('shake'), 400); stat('heb', false); rainLose(w, false); }
  };
  function rainOver() {
    WR.over = true; cancelAnimationFrame(WR.raf);
    const rec = best('rain', WR.score); touch(WR.score * 2); if (rec) confetti();
    setTimeout(() => endCard(t('gameOver'), WR.score, `Lv ${WR.level}${rec ? ' · 🏆 ' + t('record') + '!' : ` · ${t('record')}: ${S().best.rain}`}`, 'A.rainGo()', '', true), 600);
  }

  /* ======================= MEMORY FLIP ======================= */
  let MF = null;
  R.memory = id => {
    id = id || 'all';
    const pool = uniqVocab(shuffle(id === 'ul' && LEV.ulVocab ? LEV.ulVocab() : NX.vocab.filter(v => !v.alpha && (id === 'all' || v.m === id) && v.he.length <= 18 && meaning(v).length <= 26)));
    const set = pool.slice(0, 6);
    MF = { id, set, open: [], matched: 0, moves: 0, start: Date.now(), lock: false };
    const cards = shuffle(set.flatMap(v => [{ v, side: 'he' }, { v, side: 'mean' }]));
    view(`${head('flash', 'memory', `<span class="chip" id="mmoves">0 ${t('moves')}</span><label class="deck"><select onchange="location.hash='#/memory/'+this.value">
        <option value="all">${t('all')}</option><option value="ul" ${id === 'ul' ? 'selected' : ''}>${S().lang === 'es' ? 'Ulpán (hebreo general)' : 'Ulpan (general Hebrew)'}</option>${NX.modules.map(m => `<option value="${m.id}" ${m.id === id ? 'selected' : ''}>${esc(LEV.L(m.title))}</option>`).join('')}</select></label>`)}
      <div class="mem-grid">${cards.map((c, k) => `<button class="mem" data-id="${c.v.id}" data-k="${k}" onclick="A.memFlip(this)">
        <span class="mem-in"><span class="mem-back">${img('heart')}</span><span class="mem-front ${c.side}">${c.side === 'he' ? `<span class="he" lang="he" dir="rtl">${c.v.he}</span>` : `<span>${esc(meaning(c.v))}</span>`}</span></span></button>`).join('')}</div>`);
  };
  A.memFlip = b => {
    if (MF.lock || b.classList.contains('open') || b.classList.contains('done')) return;
    b.classList.add('open'); SFX.tap(); MF.open.push(b);
    const card = MF.set.find(v => v.id === b.dataset.id); if (b.querySelector('.mem-front.he')) play([{ he: card.he }]);
    if (MF.open.length < 2) return;
    MF.moves++; $('#mmoves').textContent = `${MF.moves} ${t('moves')}`;
    const [a, c] = MF.open; MF.open = [];
    if (a.dataset.id === c.dataset.id) {
      MF.matched++; SFX.ok(); setTimeout(() => { a.classList.add('done'); c.classList.add('done'); }, 250);
      const v = MF.set.find(x => x.id === a.dataset.id); setTimeout(() => play([{ he: v.he }, ...segments(meaning(v), S().lang)]), 300);
      if (MF.matched === MF.set.length) {
        const secs = Math.round((Date.now() - MF.start) / 1000), stars = MF.moves <= 9 ? 3 : MF.moves <= 13 ? 2 : 1, rec = best('memory', MF.moves, true);
        touch(15 + stars * 5); confetti(); SFX.win();
        setTimeout(() => endCard(t('memory'), MF.moves, `${t('moves')} · ${secs}s${rec ? ' · 🏆 ' + t('record') + '!' : ''}`, `A.go('memory/${MF.id}')`, starsHtml(stars)), 900);
      }
    } else {
      MF.lock = true; SFX.no(); [a, c].forEach(x => x.classList.add('miss'));
      setTimeout(() => { [a, c].forEach(x => x.classList.remove('open', 'miss')); MF.lock = false; }, 850);
    }
  };

  /* restart helper used by "play again" buttons (same hash would not re-route) */
  A.go = h => { if (location.hash === '#/' + h) A.route(); else location.hash = '#/' + h; };
});
