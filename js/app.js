/* lev. – Mary's nursing exam prep. Single-page app, no build step. Content lives in js/data/*.js */
(() => {
  'use strict';
  const EXAM = new Date('2026-11-18T08:00:00+02:00');
  const KEY = 'nurseil.v1';
  const GOAL = 50;
  const $ = s => document.querySelector(s);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.random() * a.length | 0];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const today = () => new Date().toISOString().slice(0, 10);
  const img = (n, c = '') => `<img src="img/${n}.png" alt="" class="${c}" draggable="false">`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const UNIT_COLORS = ['#58cc02', '#1cb0f6', '#ce82ff', '#ff9600', '#ff4b4b', '#00cd9c', '#ff86d0', '#2b70c9', '#ffc800', '#7c5cff'];

  /* ---------- state ---------- */
  const def = { name: 'Mary', lang: 'en', hints: true, sound: true, autoRead: true, rate: 1, xp: 0, streak: 0, last: '', done: {}, stats: {}, box: {}, wrong: [], best: {}, plan: {}, badges: [], answered: 0, daily: { d: '', xp: 0 }, sims: {}, planStart: '', updatedAt: 0, lastBackup: 0, remindAfter: 0 };
  let S;
  try { S = Object.assign({}, def, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = Object.assign({}, def); }
  if (!S.planStart) S.planStart = today();
  /* second copy in IndexedDB: survives some localStorage clean-ups and lets us recover if localStorage is wiped */
  const idb = (() => {
    let dbp;
    const open = () => dbp || (dbp = new Promise((res, rej) => { const r = indexedDB.open('lev', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }));
    return {
      get: k => open().then(db => new Promise(res => { const q = db.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => res(undefined); })).catch(() => undefined),
      set: (k, v) => open().then(db => { db.transaction('kv', 'readwrite').objectStore('kv').put(v, k); }).catch(() => { /* IndexedDB unavailable */ })
    };
  })();
  let afterSave = null; /* set by cloud sync once signed in */
  const save = () => {
    S.updatedAt = Date.now();
    const json = JSON.stringify(S);
    try { localStorage.setItem(KEY, json); } catch (e) { /* storage blocked: progress lives in memory */ }
    idb.set(KEY, json);
    if (afterSave) afterSave();
  };

  /* ---------- i18n ---------- */
  const UI = {
    en: {
      learn: 'Learn', sim: 'Sim Ward', practice: 'Practice', plan: 'My plan', exam: 'The exam', me: 'Profile',
      morning: 'Good morning', evening: 'Good evening', day: 'Hi',
      daysTo: 'days to your exam', examDay: 'Exam day! You’ve got this.', examDone: 'Exam done. So proud of you!',
      unit: 'Unit', start: 'START', continue: 'Continue', check: 'Check', skip: 'Skip', next: 'Next', finish: 'Finish',
      correct: ['Nicely done!', 'Excellent!', 'You nailed it!', 'Perfect!', '¡Muy bien!'], wrongT: 'Correct answer:', why: 'Why',
      newWord: 'New word', tapPairs: 'Tap the matching pairs', listenQ: 'What do you hear?', meanHeb: 'Which is the Hebrew for', whatMeans: 'What does this mean?', letterQ: 'Which letter is this?',
      lessonDone: 'Lesson complete!', quizDone: 'Unit checkpoint passed!', totalXp: 'Total XP', accuracy: 'Accuracy', time: 'Time',
      outHearts: 'Out of hearts', outHeartsD: 'Mistakes are how we learn. Take a breath and try again.', retry: 'Try again', quit: 'Quit',
      quitQ: 'Quit? You’ll lose this lesson’s progress.', keep: 'Keep learning', unitQuiz: 'Unit checkpoint',
      streak: 'Day streak', dailyGoal: 'Daily goal', wod: 'Word of the day', listen: 'Listen', badges: 'Badges',
      simTitle: 'Simulation Ward', simIntro: 'Your exam is a virtual-reality patient-care simulation. Manage these patients step by step: safety, assessment, action, communication, documentation. The monitor reacts to your choices.',
      patient: 'Patient', yrs: 'yrs', skills: { safety: 'Safety', assess: 'Assessment', act: 'Intervention', comm: 'Communication', doc: 'Documentation' },
      debrief: 'Debrief', best: 'Best answer', yourPick: 'Your choice', again: 'Play again', backWard: 'Back to the ward', pts: 'pts',
      flash: 'Hebrew cards', flashD: 'Medical Hebrew with spaced repetition: your language on the front, Hebrew on the back.', match: 'Match Madness', matchD: 'Match drugs to antidotes, signs to conditions, normal values and rules. Against the clock.',
      speed: 'Priority Rush', speedD: '90 seconds of exam questions. Streaks give double points!', source: 'Source', hebMoment: 'Hebrew moment',
      mock: 'Mock exam', mockD: 'Timed, forward-only, adaptive. No feedback until the end, like a real exam.', review: 'Fix mistakes', reviewD: 'Retry every question you got wrong.',
      noWrong: 'No mistakes to fix. Amazing!', deck: 'Deck', all: 'All units', mastered: 'mastered', reveal: 'Tap to flip', know: 'Got it', notyet: 'Again',
      answer: 'Your answer', steps: 'Solution', length: 'Length', questions: 'questions', byTopic: 'By topic', score: 'Score', play: 'Play', record: 'Record',
      planTitle: 'Mary’s sprint plan', planD: 'One focused day at a time. Tick each day when you finish it.', today: 'Today', hebDaily: '10 min Hebrew flashcards',
      settings: 'Settings', name: 'Name', language: 'Language', hints: 'Hebrew hints in lessons', sound: 'Sound effects', reset: 'Reset all progress', resetQ: 'Erase all progress on this device?',
      on: 'On', off: 'Off', level: 'Level', lessons: 'lessons', of: 'of', timeUp: 'Time is up',
      readAloud: 'Read aloud', autoRead: 'Read questions aloud automatically', auto: 'Auto', speed2: 'Reading speed', slow: 'Slow', normal: 'Normal',
      testAudio: 'Test audio', audioHe: 'Hebrew: recorded clips', voiceFound: 'voice', voiceNone: 'no voice on this device',
      autoVoice: 'Automatic', voicesTitle: 'Reading voice', voiceTip: 'For a natural, human voice, download a free better voice once: iPhone: Settings → Accessibility → Read & Speak (Spoken Content) → Voices → English → “Ava (Premium)” or “Samantha (Enhanced)”; Spanish → “Mónica (Enhanced)” or “Paulina (Enhanced)”. Mac: System Settings → Accessibility → Read & Speak → System voice → Manage voices. Then reopen the app and pick it here (★ = better voice).',
      noVoice: 'This device has no {l} voice. Add one in system settings → Accessibility → Spoken content.',
      saveTitle: 'Save your progress', localOnly: 'Progress is saved on this device, in two places. On iPhone, Safari can erase website data after a few weeks without use, so install the app or send yourself a copy every few days. To continue on another phone or computer, open that link there.',
      cloudOff: 'Cloud sign-in is not switched on yet (Ilay needs to add the Firebase settings).', cloudLoading: 'Connecting to cloud save…',
      cloudPitch: 'Sign in once and your progress is saved online and shared between your phone and computer.', googleBtn: 'Continue with Google',
      emailPh: 'your@email.com', emailBtn: 'Email me a sign-in link', emailSent: 'Check your email and tap the link to sign in.', emailAgain: 'Confirm your email to finish signing in:',
      signedInAs: 'Signed in as', syncing: 'Syncing…', syncedAt: 'Saved online at', syncNow: 'Sync now', signOut: 'Sign out',
      shareBtn: 'Send progress to my other device', shareText: 'Open this link to continue my lev. nursing progress', linkCopied: 'Link copied. Paste it into WhatsApp or an email to yourself.',
      copyManual: 'Copy this link and send it to yourself:', qrBtn: 'Show QR code', qrHelp: 'Scan with the other device’s camera to move your progress there.', qrBig: 'Too much progress for one QR code. Use the link instead.',
      importTitle: 'Progress from another device', importD: 'This link holds saved progress. Merge it into this device? Nothing here will be lost.', mergeBtn: 'Merge into this device', cancel: 'Cancel',
      importBad: 'This link looks damaged. Ask for a new one.', imported: 'Progress merged!',
      installBtn: 'Install the app', installIOS: 'On iPhone: tap Share ⬆︎, then “Add to Home Screen”. The app keeps progress safer and works offline.', installed: 'Installed as an app ✓',
      installNote: 'Note: an installed app has its own storage. Send progress from the browser to the app once with the link above.',
      persistOk: 'Storage on this device is protected ✓', remindTitle: 'Keep your progress safe', remindD: 'Send yourself a copy so nothing is lost if this phone clears its data.', later: 'Later',
      lastBackup: 'Last copy sent:', never: 'never',
      backupBtn: 'Download backup', restoreBtn: 'Restore from backup', restored: 'Progress restored!', restoreBad: 'That file is not a lev backup.',
      disclaimer: 'Unofficial study aid, written from the official MOH topic list and the Sept–Dec 2026 reading list. It does not replace the textbooks. Always check details with the Nursing Division.',
      cheer: ['You’re doing great, {n}!', 'Every lesson is a step closer, {n}.', '¡Vamos, {n}! Keep going.', 'Hebrew + nursing = superpower, {n}.']
    },
    es: {
      learn: 'Aprender', sim: 'Simulación', practice: 'Practicar', plan: 'Mi plan', exam: 'El examen', me: 'Perfil',
      morning: 'Buenos días', evening: 'Buenas noches', day: 'Hola',
      daysTo: 'días para tu examen', examDay: '¡Hoy es el examen! Tú puedes.', examDone: 'Examen hecho. ¡Qué orgullo!',
      unit: 'Unidad', start: 'EMPEZAR', continue: 'Continuar', check: 'Comprobar', skip: 'Saltar', next: 'Siguiente', finish: 'Terminar',
      correct: ['¡Muy bien!', '¡Excelente!', '¡Lo clavaste!', '¡Perfecto!', 'Nicely done!'], wrongT: 'Respuesta correcta:', why: 'Por qué',
      newWord: 'Palabra nueva', tapPairs: 'Toca las parejas', listenQ: '¿Qué escuchas?', meanHeb: '¿Cuál es el hebreo de', whatMeans: '¿Qué significa?', letterQ: '¿Qué letra es?',
      lessonDone: '¡Lección completada!', quizDone: '¡Control de unidad superado!', totalXp: 'XP total', accuracy: 'Precisión', time: 'Tiempo',
      outHearts: 'Sin corazones', outHeartsD: 'De los errores se aprende. Respira y vuelve a intentarlo.', retry: 'Reintentar', quit: 'Salir',
      quitQ: '¿Salir? Perderás el progreso de esta lección.', keep: 'Seguir aprendiendo', unitQuiz: 'Control de unidad',
      streak: 'Racha', dailyGoal: 'Meta diaria', wod: 'Palabra del día', listen: 'Escuchar', badges: 'Insignias',
      simTitle: 'Sala de simulación', simIntro: 'Tu examen es una simulación de cuidado del paciente en realidad virtual. Gestiona estos pacientes paso a paso: seguridad, valoración, intervención, comunicación y documentación. El monitor reacciona a tus decisiones.',
      patient: 'Paciente', yrs: 'años', skills: { safety: 'Seguridad', assess: 'Valoración', act: 'Intervención', comm: 'Comunicación', doc: 'Documentación' },
      debrief: 'Análisis', best: 'Mejor respuesta', yourPick: 'Tu elección', again: 'Jugar otra vez', backWard: 'Volver a la sala', pts: 'pts',
      flash: 'Tarjetas de hebreo', flashD: 'Hebreo médico con repetición espaciada: tu idioma delante, hebreo detrás.', match: 'Parejas locas', matchD: 'Une fármacos con antídotos, signos con enfermedades, valores normales y normas. Contra reloj.',
      speed: 'Carrera de prioridades', speedD: '90 segundos de preguntas de examen. ¡Las rachas dan doble puntuación!', source: 'Fuente', hebMoment: 'Momento de hebreo',
      mock: 'Simulacro', mockD: 'Con tiempo, sin volver atrás, adaptativo. Sin correcciones hasta el final, como un examen real.', review: 'Corregir errores', reviewD: 'Repite las preguntas que fallaste.',
      noWrong: 'No hay errores que corregir. ¡Increíble!', deck: 'Mazo', all: 'Todas las unidades', mastered: 'dominadas', reveal: 'Toca para girar', know: 'La sé', notyet: 'Otra vez',
      answer: 'Tu respuesta', steps: 'Solución', length: 'Longitud', questions: 'preguntas', byTopic: 'Por tema', score: 'Puntuación', play: 'Jugar', record: 'Récord',
      planTitle: 'Plan intensivo de Mary', planD: 'Un día enfocado cada vez. Marca cada día al terminarlo.', today: 'Hoy', hebDaily: '10 min de tarjetas de hebreo',
      settings: 'Ajustes', name: 'Nombre', language: 'Idioma', hints: 'Pistas en hebreo en las lecciones', sound: 'Efectos de sonido', reset: 'Borrar todo el progreso', resetQ: '¿Borrar todo el progreso de este dispositivo?',
      on: 'Sí', off: 'No', level: 'Nivel', lessons: 'lecciones', of: 'de', timeUp: 'Se acabó el tiempo',
      readAloud: 'Leer en voz alta', autoRead: 'Leer las preguntas en voz alta automáticamente', auto: 'Auto', speed2: 'Velocidad de lectura', slow: 'Lenta', normal: 'Normal',
      testAudio: 'Probar audio', audioHe: 'Hebreo: grabaciones', voiceFound: 'voz', voiceNone: 'no hay voz en este dispositivo',
      autoVoice: 'Automática', voicesTitle: 'Voz de lectura', voiceTip: 'Para una voz natural, descarga una vez una voz mejor (gratis): iPhone: Ajustes → Accesibilidad → Leer y hablar (Contenido leído) → Voces → Español → “Mónica (mejorada)” o “Paulina (mejorada)”; Inglés → “Ava (Premium)”. Mac: Ajustes del Sistema → Accesibilidad → Leer y hablar → Voz del sistema → Gestionar voces. Luego vuelve a abrir la app y elígela aquí (★ = voz mejor).',
      noVoice: 'Este dispositivo no tiene voz en {l}. Añádela en Ajustes → Accesibilidad → Contenido leído.',
      saveTitle: 'Guarda tu progreso', localOnly: 'El progreso se guarda en este dispositivo, en dos lugares. En iPhone, Safari puede borrar los datos de las webs tras unas semanas sin uso: instala la app o envíate una copia cada pocos días. Para seguir en otro móvil u ordenador, abre ese enlace allí.',
      cloudOff: 'El inicio de sesión en la nube aún no está activado (Ilay debe añadir los ajustes de Firebase).', cloudLoading: 'Conectando con la nube…',
      cloudPitch: 'Inicia sesión una vez y tu progreso se guarda en línea y se comparte entre el móvil y el ordenador.', googleBtn: 'Continuar con Google',
      emailPh: 'tu@correo.com', emailBtn: 'Enviarme un enlace de acceso', emailSent: 'Revisa tu correo y toca el enlace para entrar.', emailAgain: 'Confirma tu correo para terminar de entrar:',
      signedInAs: 'Sesión iniciada como', syncing: 'Sincronizando…', syncedAt: 'Guardado en línea a las', syncNow: 'Sincronizar', signOut: 'Cerrar sesión',
      shareBtn: 'Enviar progreso a mi otro dispositivo', shareText: 'Abre este enlace para continuar mi progreso en lev.', linkCopied: 'Enlace copiado. Pégalo en WhatsApp o en un correo para ti.',
      copyManual: 'Copia este enlace y envíatelo:', qrBtn: 'Mostrar código QR', qrHelp: 'Escanéalo con la cámara del otro dispositivo para pasar allí tu progreso.', qrBig: 'Hay demasiado progreso para un QR. Usa el enlace.',
      importTitle: 'Progreso de otro dispositivo', importD: 'Este enlace contiene progreso guardado. ¿Unirlo a este dispositivo? No se perderá nada de aquí.', mergeBtn: 'Unir a este dispositivo', cancel: 'Cancelar',
      importBad: 'Este enlace parece dañado. Pide uno nuevo.', imported: '¡Progreso unido!',
      installBtn: 'Instalar la app', installIOS: 'En iPhone: toca Compartir ⬆︎ y luego “Añadir a pantalla de inicio”. La app protege mejor el progreso y funciona sin conexión.', installed: 'Instalada como app ✓',
      installNote: 'Nota: la app instalada tiene su propio almacenamiento. Envía el progreso del navegador a la app una vez con el enlace de arriba.',
      persistOk: 'Almacenamiento protegido en este dispositivo ✓', remindTitle: 'Protege tu progreso', remindD: 'Envíate una copia para no perder nada si el móvil borra sus datos.', later: 'Más tarde',
      lastBackup: 'Última copia enviada:', never: 'nunca',
      backupBtn: 'Descargar copia', restoreBtn: 'Restaurar copia', restored: '¡Progreso restaurado!', restoreBad: 'Ese archivo no es una copia de lev.',
      disclaimer: 'Material de estudio no oficial, escrito a partir de los temas oficiales y la bibliografía de sept–dic 2026. No sustituye a los libros. Confirma siempre los detalles con la División de Enfermería.',
      cheer: ['¡Lo estás haciendo genial, {n}!', 'Cada lección te acerca más, {n}.', '¡Vamos, {n}! Sigue así.', 'Hebreo + enfermería = superpoder, {n}.']
    }
  };
  const t = k => UI[S.lang][k] ?? UI.en[k] ?? k;
  const L = o => (o && (o[S.lang] || o.en)) || '';
  const L2 = a => S.lang === 'es' ? a[1] : a[0];
  const meaning = v => v[S.lang] || v.en;
  const hint = s => s.replace(/\[\[(.+?)\|(.+?)\|(.+?)\]\]/g, (m, w, he, tr) => S.hints
    ? `<span class="hint" data-say="${he}"><b>${w}</b> <span class="he" lang="he" dir="rtl">${he}</span> <i>${tr}</i></span>` : `<b>${w}</b>`);
  const modById = id => NX.modules.find(m => m.id === id);
  const daysLeft = () => Math.ceil((EXAM - Date.now()) / 864e5);

  /* ---------- sound, speech, confetti ---------- */
  let AC;
  function tone(seq) {
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      let t0 = AC.currentTime;
      seq.forEach(([f, d, type = 'sine', v = .14]) => {
        const o = AC.createOscillator(), g = AC.createGain();
        o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(.0008, t0 + d);
        o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + d); t0 += d * .75;
      });
    } catch (e) { /* audio unavailable */ }
  }
  const SFX = {
    ok: () => tone([[784, .1], [1175, .22]]), no: () => tone([[220, .16, 'square', .06], [165, .26, 'square', .06]]),
    win: () => tone([[523, .1], [659, .1], [784, .1], [1047, .35]]), tap: () => tone([[520, .05, 'triangle', .05]]),
    alarm: () => tone([[960, .14, 'square', .05], [720, .14, 'square', .05], [960, .14, 'square', .05], [720, .14, 'square', .05]]),
    pop: () => tone([[660, .06, 'triangle', .07], [990, .08, 'triangle', .07]])
  };
  /* ---------- voice: pre-recorded Hebrew clips + the device's voices for English/Spanish ----------
     Text is split into Hebrew and non-Hebrew runs and played as one queue, so a sentence like
     "chest pain כאב בחזה that may spread…" is read in English with the Hebrew in a native voice. */
  const HEB = /[֐-׿]/;
  const HEB_RUN = /([֐-׿][֐-׿\s"'’\-/]*[֐-׿]\??|[֐-׿])/;
  const NOVELTY = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Wobble|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Zarvox|Fred|Junior|Ralph|Kathy|Grand(ma|pa)|Rocko|Sandy|Shelley|Reed|Eddy|Flo\b/;
  let voices = [];
  const loadVoices = () => { try { voices = speechSynthesis.getVoices(); } catch (e) { voices = []; } };
  loadVoices(); try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) { /* no speech API */ }
  const voicesFor = lang => voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(lang) && !NOVELTY.test(v.name));
  function voiceFor(lang) {
    const pool = voicesFor(lang), chosen = (S.voice || {})[lang];
    if (chosen) { const v = pool.find(x => x.name === chosen); if (v) return v; }
    /* natural/premium voices sound human; online Google/Microsoft voices beat the robotic compact ones (we read sentence by sentence, so their long-text cut-off does not bite) */
    const score = v => (/Premium|Enhanced|Natural|Neural|Siri/i.test(v.name) ? 6 : 0) + (/Google|Microsoft/.test(v.name) ? 3 : 0) + (/Samantha|Ava|Alex|Daniel|Karen|Moira|M[oó]nica|Paulina|Jorge|Juan|Diego|Carmit/.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0) - (NOVELTY.test(v.name) ? 9 : 0);
    return pool.slice().sort((a, b) => score(b) - score(a))[0] || null;
  }
  let vq = [], vtok = 0, vAudio = null, warned = {};
  function stopVoice() {
    vtok++; vq = []; document.body.classList.remove('speaking');
    try { speechSynthesis.cancel(); } catch (e) { /* no speech API */ }
    if (vAudio) { vAudio.pause(); vAudio = null; }
  }
  function segments(text, lang) {
    const out = [];
    String(text).replace(/\s+/g, ' ').split(HEB_RUN).forEach(part => {
      if (!part || !part.trim()) return;
      if (HEB.test(part)) out.push({ he: part.trim() });
      else part.split(/(?<=[.!?:;])\s+/).forEach(s => { if (/[\p{L}\p{N}]/u.test(s)) out.push({ text: s.trim(), lang }); });
    });
    return out;
  }
  function play(segs) {
    stopVoice(); if (!segs.length) return;
    vq = segs; const tok = vtok; document.body.classList.add('speaking');
    setTimeout(() => nextSeg(tok), 60); /* Chrome drops an utterance queued right after cancel() */
  }
  function nextSeg(tok) {
    if (tok !== vtok) return;
    const s = vq.shift();
    if (!s) return document.body.classList.remove('speaking');
    if (s.he) {
      const id = NX.audio[s.he] ?? NX.audio[s.he.replace(/\?$/, '')] ?? NX.audio[s.he + '?'];
      if (id) {
        const a = new Audio(`audio/he/${id}.m4a`); vAudio = a; a.playbackRate = S.rate < 1 ? .9 : 1;
        a.onended = a.onerror = () => nextSeg(tok); a.play().catch(() => nextSeg(tok)); return;
      }
      return utter(s.he, 'he', tok);
    }
    utter(s.text, s.lang, tok);
  }
  function utter(text, lang, tok) {
    const v = 'speechSynthesis' in window ? voiceFor(lang) : null;
    if (!v) { if (!warned[lang]) { warned[lang] = 1; toast(t('noVoice').replace('{l}', { he: 'עברית', en: 'English', es: 'español' }[lang]), 'speaker'); } return nextSeg(tok); }
    const u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; u.rate = lang === 'he' ? .85 : (S.rate || 1);
    u.onend = u.onerror = () => nextSeg(tok);
    speechSynthesis.speak(u);
  }
  /* speak(): one string, any language. readEl(): what a card shows, minus transliterations, key hints and images. */
  const speak = text => play(segments(text, S.lang));
  const textOf = el => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('i, kbd, img, svg, .spk, .readbtn').forEach(x => x.remove()); return c.textContent; };
  const htmlText = h => { const d = document.createElement('div'); d.innerHTML = h; return textOf(d); };
  const readParts = parts => play(parts.filter(Boolean).flatMap(p => segments(p, S.lang)));
  const readEl = (...els) => readParts(els.flat().map(textOf));
  const readChoices = root => [...root.querySelectorAll('.choice')].map((b, k) => `${k + 1}, ${textOf(b)}`);
  /* iOS/Safari only allow audio after a user gesture: prime both channels on the first tap */
  document.addEventListener('pointerdown', () => {
    try { const a = new Audio('audio/he/h0.m4a'); a.volume = 0; a.play().catch(() => { }); } catch (e) { /* no audio */ }
    try { speechSynthesis.speak(new SpeechSynthesisUtterance('')); } catch (e) { /* no speech API */ }
  }, { once: true });
  function confetti() {
    if (reduced) return;
    const c = $('#confetti'), x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const P = Array.from({ length: 170 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 16, vy: -Math.random() * 16 - 5, s: 7 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .35, c: pick(UNIT_COLORS) }));
    let f = 0;
    (function loop() {
      x.clearRect(0, 0, c.width, c.height);
      P.forEach(p => { p.vy += .38; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (++f < 200) requestAnimationFrame(loop); else x.clearRect(0, 0, c.width, c.height);
    })();
  }
  function countUp(el, to, ms = 900) {
    if (!el) return; const t0 = performance.now();
    (function step(n) { const k = Math.min(1, (n - t0) / ms); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + (el.dataset.suffix || ''); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  function toast(msg, image) {
    const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = `${image ? img(image) : ''}<span>${msg}</span>`;
    document.body.appendChild(el); setTimeout(() => el.classList.add('out'), 2400); setTimeout(() => el.remove(), 2800);
  }

  /* ---------- mascot: Lev the heart (לב = heart) ---------- */
  /* each instance gets its own gradient id: a shared id breaks when the first copy sits in a hidden element */
  let levN = 0;
  const mascot = (mood = 'happy', cls = '') => { const gid = `lg${++levN}`; return `<svg class="lev ${mood} ${cls}" viewBox="0 0 120 120" aria-hidden="true">
    <defs><radialGradient id="${gid}" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#ff7a8a"/><stop offset="1" stop-color="#e5243b"/></radialGradient></defs>
    <ellipse cx="60" cy="112" rx="30" ry="5" class="lev-shadow"/>
    <g class="lev-body">
      <path d="M60 104C30 82 10 64 10 40 10 24 22 12 38 12c10 0 17 5 22 13 5-8 12-13 22-13 16 0 28 12 28 28 0 24-20 42-50 64z" fill="url(#${gid})" stroke="#b5162b" stroke-width="3"/>
      <g class="lev-cap"><path d="M36 20 L60 6 L84 20 L80 30 L40 30 Z" fill="#fff" stroke="#cfd8e3" stroke-width="2"/><rect x="56" y="12" width="8" height="14" rx="2" fill="#ff4b4b"/><rect x="53" y="15" width="14" height="8" rx="2" fill="#ff4b4b"/></g>
      <g class="lev-eyes"><ellipse cx="44" cy="52" rx="9" ry="11" fill="#fff"/><ellipse cx="76" cy="52" rx="9" ry="11" fill="#fff"/>
        <circle cx="46" cy="54" r="5" fill="#1f2a37"/><circle cx="78" cy="54" r="5" fill="#1f2a37"/><circle cx="48" cy="51" r="1.8" fill="#fff"/><circle cx="80" cy="51" r="1.8" fill="#fff"/></g>
      <ellipse cx="34" cy="68" rx="6" ry="3.5" fill="#ff9aa8" opacity=".8"/><ellipse cx="86" cy="68" rx="6" ry="3.5" fill="#ff9aa8" opacity=".8"/>
      <path class="lev-mouth" d="${mood === 'sad' ? 'M50 76 Q60 68 70 76' : 'M48 70 Q60 84 72 70'}" fill="${mood === 'sad' ? 'none' : '#7a0f1e'}" stroke="#7a0f1e" stroke-width="3" stroke-linecap="round"/>
    </g></svg>`; };

  /* ---------- progress ---------- */
  const BADGES = [
    ['first', 'seed', 'First lesson', 'Primera lección', () => Object.keys(S.done).length >= 1],
    ['ten', 'books', '10 lessons', '10 lecciones', () => Object.keys(S.done).length >= 10],
    ['sim1', 'sim', 'First simulation', 'Primera simulación', () => Object.keys(S.sims).length >= 1],
    ['sim3', 'steth', '3-star nurse', 'Enfermera 3 estrellas', () => Object.values(S.sims).some(s => s.stars === 3)],
    ['simAll', 'crown', 'Every ward case', 'Todos los casos', () => Object.keys(S.sims).length >= NX.sims.length],
    ['q100', 'hundred', '100 answers', '100 respuestas', () => S.answered >= 100],
    ['streak7', 'fire', '7-day streak', '7 días seguidos', () => S.streak >= 7],
    ['rush15', 'speed', 'Priority Rush 15+', 'Carrera de prioridades 15+', () => (S.best.speed || 0) >= 15],
    ['heb50', 'heb', '50 Hebrew words', '50 palabras', () => Object.values(S.box).filter(b => b >= 4).length >= 50],
    ['mock', 'trophy', 'Mock exam done', 'Simulacro hecho', () => !!S.best.mock]
  ];
  function touch(xp) {
    const d = today();
    if (S.last !== d) { const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10); S.streak = S.last === y ? S.streak + 1 : 1; S.last = d; }
    if (S.daily.d !== d) S.daily = { d, xp: 0 };
    const before = S.daily.xp;
    S.xp += xp || 0; S.daily.xp += xp || 0;
    if (before < GOAL && S.daily.xp >= GOAL) setTimeout(() => toast(S.lang === 'es' ? '¡Meta diaria cumplida!' : 'Daily goal reached!', 'target'), 600);
    BADGES.forEach(b => { if (!S.badges.includes(b[0]) && b[4]()) { S.badges.push(b[0]); setTimeout(() => { toast(L2([b[2], b[3]]), b[1]); SFX.pop(); }, 900); } });
    save(); chrome();
  }
  const level = () => Math.floor(Math.sqrt(S.xp / 40)) + 1;
  function stat(m, ok) { const s = S.stats[m] || (S.stats[m] = { ok: 0, n: 0 }); s.n++; if (ok) s.ok++; S.answered++; }
  const nodeKey = (m, i) => `${m}-${i}`;
  function nextNode() {
    for (const m of NX.modules) { for (let i = 0; i < m.lessons.length; i++) if (!S.done[nodeKey(m.id, i)]) return [m.id, i]; if (!S.done[nodeKey(m.id, 'q')]) return [m.id, 'q']; }
    return null;
  }

  /* ---------- chrome: sidebar, mobile bar, rail ---------- */
  function chrome() {
    document.documentElement.lang = S.lang;
    $('#logoMark').innerHTML = mascot('happy', 'mini');
    document.querySelectorAll('[data-nav]').forEach(a => { a.querySelector('span').textContent = a.dataset.nav === 'me' ? S.name : t(a.dataset.nav); });
    const dl = daysLeft();
    const stats = `<span class="stat fire ${S.last === today() ? 'lit' : ''}">${img('fire')}<b>${S.streak}</b></span><span class="stat">${img('gem')}<b>${S.xp}</b></span><span class="stat">${img('calendar')}<b>${Math.max(0, dl)}</b></span>`;
    $('#mbar').innerHTML = `<a class="logo" href="#/"><span class="logo-mark">${mascot('happy', 'mini')}</span></a>${stats}<a href="#/me" class="avatar">${img('mary')}</a>`;
    const pct = Math.min(100, Math.round(100 * (S.daily.d === today() ? S.daily.xp : 0) / GOAL));
    const w = wordOfDay();
    $('#rail').innerHTML = `
      <div class="stats-row">${stats}</div>
      <section class="card countdown tilt">
        ${img('mary', 'float')}<div><small>${esc(S.name)} · 18.11.2026</small>
        <b class="big">${dl > 0 ? dl : dl === 0 ? '🎉' : '✓'}</b><span>${dl > 0 ? t('daysTo') : dl === 0 ? t('examDay') : t('examDone')}</span></div>
      </section>
      <section class="card goal"><h3>${img('target')} ${t('dailyGoal')}</h3>
        <div class="goalbar"><i style="width:${pct}%"></i><span>${S.daily.d === today() ? S.daily.xp : 0} / ${GOAL} XP</span></div></section>
      <section class="card wod"><h3>${img('speaker')} ${t('wod')}</h3>
        <button class="wod-word" data-say="${w.he}"><span class="he" lang="he" dir="rtl">${w.he}</span><i>${esc(w.tr)}</i><b>${esc(meaning(w))}</b></button></section>
      <section class="card"><h3>${img('trophy')} ${t('badges')}</h3><div class="mini-badges">${BADGES.map(b => `<span class="${S.badges.includes(b[0]) ? 'on' : ''}" title="${esc(L2([b[2], b[3]]))}">${img(b[1])}</span>`).join('')}</div></section>
      <p class="fine">${t('disclaimer')}</p>`;
  }
  function wordOfDay() { const pool = NX.vocab.filter(v => !v.alpha); return pool[Math.floor(Date.now() / 864e5) % pool.length]; }

  const view = html => { const a = $('#app'); a.innerHTML = html; a.classList.remove('enter'); void a.offsetWidth; a.classList.add('enter'); window.scrollTo(0, 0); };
  let timer = null; const stopTimer = () => { if (timer) clearInterval(timer); timer = null; };

  /* ---------- LEARN: the path ---------- */
  const R = {};
  R.learn = () => {
    const h = new Date().getHours(), dl = daysLeft();
    const greet = h < 12 ? [t('morning'), 'בוקר טוב', 'boker tov'] : h >= 18 ? [t('evening'), 'ערב טוב', 'erev tov'] : [t('day'), 'שלום', 'shalom'];
    const nx = nextNode();
    let n = 0;
    view(`
      <section class="hello">
        <div class="bubble"><b>${greet[0]}, ${esc(S.name)}!</b> <span class="hint" data-say="${greet[1]}"><span class="he" lang="he" dir="rtl">${greet[1]}</span> <i>${greet[2]}</i></span>
          <p>${dl > 0 ? `<b>${dl}</b> ${t('daysTo')} · ` : ''}${pick(t('cheer')).replace('{n}', esc(S.name))}</p></div>
        ${mascot('happy', 'big bounce')}
      </section>
      ${S.xp >= 30 && Date.now() - (S.lastBackup || 0) > 3 * 864e5 && Date.now() > (S.remindAfter || 0) ? `<section class="remind card pop">${img('phone', 'wiggle')}<div><b>${t('remindTitle')}</b><p>${t('remindD')}</p>
        <div class="row"><button class="btn green small" onclick="A.share()">${t('shareBtn')}</button><button class="btn ghost small" onclick="A.remindLater()">${t('later')}</button></div></div></section>` : ''}
      <a class="sim-cta tilt" href="#/sim">${img('sim', 'wiggle')}<div><b>${t('simTitle')}</b><span>${S.lang === 'es' ? `${Object.keys(S.sims).length} de ${NX.sims.length} casos hechos · practica para el 18/11` : `${Object.keys(S.sims).length} of ${NX.sims.length} cases done · practice for 18/11`}</span></div><span class="go">→</span></a>
      ${NX.modules.map((m, u) => {
        const col = UNIT_COLORS[u % UNIT_COLORS.length];
        const nodes = m.lessons.map((l, i) => ({ k: i, title: L(l.t) })).concat([{ k: 'q', title: t('unitQuiz') }]);
        return `<section class="unit" style="--u:${col}">
          <header class="unit-head"><div><small>${t('unit')} ${u + 1}</small><h2>${L(m.title)}</h2><p>${L(m.blurb)}</p></div>${img(m.id, 'unit-img float')}</header>
          <div class="path">${nodes.map((nd, j) => {
            const key = nodeKey(m.id, nd.k), done = !!S.done[key], cur = nx && nx[0] === m.id && nx[1] === nd.k;
            const off = Math.round(Math.sin((n++) * 0.95) * 72);
            const icon = nd.k === 'q' ? 'trophy' : done ? 'check' : j === 0 ? 'star' : 'books';
            return `<div class="node-wrap" style="--x:${off}px">
              ${cur ? `<span class="start-bubble">${t('start')}</span>` : ''}
              <a href="#/${nd.k === 'q' ? 'quiz/' + m.id : 'lesson/' + m.id + '/' + nd.k}" class="node ${done ? 'done' : ''} ${cur ? 'cur' : ''} ${!done && !cur ? 'todo' : ''} ${nd.k === 'q' ? 'quiz' : ''}" data-tip="${esc(nd.title)}" aria-label="${esc(nd.title)}">${img(icon)}</a>
            </div>`;
          }).join('')}</div>
        </section>`;
      }).join('')}`);
  };

  /* ---------- question builders ---------- */
  function vocabMCQ(pool, v, mode) {
    const alpha = v.alpha; mode = mode || (alpha ? 'he' : pick(['he', 'mean']));
    const others = shuffle(pool.filter(x => x.he !== v.he && meaning(x) !== meaning(v) && x.alpha === alpha)).slice(0, 3);
    if (others.length < 3) others.push(...shuffle(NX.vocab.filter(x => x.he !== v.he && x.alpha === alpha && !others.includes(x))).slice(0, 3 - others.length));
    const opts = shuffle([v, ...others]);
    const heChip = x => `<span class="he" lang="he" dir="rtl">${x.he}</span>`;
    const base = { type: 'mcq', m: v.m, d: 1, a: opts.indexOf(v), say: v.he, w: `${heChip(v)} <i>${esc(v.tr)}</i> = <b>${esc(meaning(v))}</b>` };
    if (mode === 'listen') return { ...base, q: `<div class="listen-q"><button class="speaker-big" data-say="${v.he}">${img('speaker')}</button></div>`, title: t('listenQ'), o: opts.map(x => esc(meaning(x))), autoSay: v.he };
    if (mode === 'mean') return { ...base, title: `${t('meanHeb')} “${esc(meaning(v))}”?`, q: '', o: opts.map(x => heChip(x)), tiles: true };
    return { ...base, title: alpha ? t('letterQ') : t('whatMeans'), q: `<button class="he-prompt" data-say="${v.he}"><span class="he" lang="he" dir="rtl">${v.he}</span>${S.hints && !alpha ? `<i>${esc(v.tr)}</i>` : ''}</button>`, o: opts.map(x => esc(meaning(x))) };
  }
  /* honest provenance on Mary's Sept–Dec 2026 reading list: laws/circulars and AHA were checked against
     their texts; textbook topics were checked against open references, not the (paid) books themselves */
  const BOOK = { fund: 'Kozier & Erb (Fundamentals)', medsurg: 'Brunner & Suddarth (Med-Surg, 16th ed.)', pharm: 'Nursing Drug Handbook 2025-2026',
    peds: 'Wong’s (Pediatrics, 12th ed.)', mat: 'Olds’ (Maternal-Newborn)', psych: 'Townsend (Psychiatric)' };
  const SEARCHED = { medsurg: true, peds: true };
  const SOURCE = new Proxy({}, { get: (_, m) =>
    m === 'law' ? (S.lang === 'es' ? 'Leyes israelíes y circulares del Ministerio · verificado con los textos oficiales' : 'Israeli laws and Ministry circulars · checked against the official texts')
    : m === 'emerg' ? (S.lang === 'es' ? 'AHA 2020 SVB adulto y primeros auxilios · verificado con la guía' : 'AHA 2020 Adult BLS and First Aid · checked against the guideline')
    /* Brunner & Suddarth 16th and Wong's 12th are searchable in Google Books; key facts were checked in their text */
    : SEARCHED[m] ? (S.lang === 'es' ? `${BOOK[m]} · datos clave verificados en el texto del libro (búsqueda de Google Books)` : `${BOOK[m]} · key facts checked in the book's text (Google Books search)`)
    : BOOK[m] ? (S.lang === 'es' ? `Tema de ${BOOK[m]} · verificado con referencias abiertas (el libro no permite búsqueda)` : `Topic from ${BOOK[m]} · checked against open references (the book is not searchable online)`)
    : undefined });
  const uniqVocab = list => { const seen = new Set(); return list.filter(v => { const k1 = 'h' + v.he, k2 = 'm' + meaning(v); if (seen.has(k1) || seen.has(k2)) return false; seen.add(k1); seen.add(k2); return true; }); };
  const staticMCQ = q => ({ type: 'mcq', id: q.id, m: q.m, d: q.d, a: q.a, title: '', q: `<p class="qtext">${esc(L(q.q))}</p>`, o: q.o.map(o => esc(L(o))), w: esc(L(q.w)), src: SOURCE[q.m] });

  /* ---------- SESSION engine (Duolingo-style overlay) ---------- */
  let X = null;
  function session(cards, opts) {
    X = Object.assign({ cards, i: 0, hearts: 5, ok: 0, n: 0, sel: null, checked: false, start: Date.now(), hasHearts: true, retry: true, silent: false, log: [], onEnd: null }, opts);
    $('#overlay').hidden = false; document.body.classList.add('locked');
    if (X.adaptive && !X.cards[0]) X.cards[0] = X.adaptive();
    drawCard();
    if (X.deadline) { stopTimer(); timer = setInterval(tickSession, 1000); }
  }
  function closeSession(goHash) {
    stopTimer(); stopVoice(); $('#overlay').hidden = true; $('#overlay').innerHTML = ''; document.body.classList.remove('locked'); X = null;
    if (goHash !== undefined) { if (location.hash === goHash) route(); else location.hash = goHash; }
  }
  function tickSession() {
    if (!X || !X.deadline) return stopTimer();
    const left = Math.max(0, X.deadline - Date.now()), el = $('#sclock');
    if (el) el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`;
    if (!left) { X.timeUp = true; endSession(); }
  }
  function drawCard() {
    const c = X.cards[X.i]; if (!c) return endSession();
    X.sel = null; X.checked = false;
    const pct = Math.round(100 * X.i / X.cards.length);
    let body = '', foot = '';
    if (c.type === 'teach') {
      body = `<div class="teach">${mascot('happy', 'talk')}<div class="speech pop">${c.html}</div></div>`;
      foot = `<button class="btn green wide" onclick="A.cont()">${t('continue')}</button>`;
    } else if (c.type === 'word') {
      body = `<h2 class="ctitle">${img(c.moment ? 'heb' : 'sparkles')} ${c.moment ? t('hebMoment') : t('newWord')}</h2><button class="word-card pop" data-say="${c.v.he}">
        <span class="he" lang="he" dir="rtl">${c.v.he}</span><i>${esc(c.v.tr)}</i><b>${esc(meaning(c.v))}</b>${img('speaker', 'spk')}</button>`;
      foot = `<button class="btn green wide" onclick="A.cont()">${t('continue')}</button>`;
    } else if (c.type === 'pairs') {
      const L_ = shuffle(c.items), R_ = shuffle(c.items);
      body = `<h2 class="ctitle">${t('tapPairs')}</h2><div class="pairs"><div>${L_.map(v => `<button class="ptile he" lang="he" dir="rtl" data-id="${v.id}" data-s="L" data-say="${v.he}">${v.he}</button>`).join('')}</div>
        <div>${R_.map(v => `<button class="ptile" data-id="${v.id}" data-s="R">${esc(meaning(v))}</button>`).join('')}</div></div>`;
      foot = `<button class="btn green wide" id="ctn" disabled onclick="A.cont()">${t('continue')}</button>`;
      X.pair = { sel: null, done: 0, total: c.items.length };
    } else {
      body = `${c.title ? `<h2 class="ctitle">${c.title}</h2>` : ''}${c.q}
        <div class="choices ${c.tiles ? 'tiles' : ''}">${c.o.map((o, k) => `<button class="choice" data-k="${k}" onclick="A.sel(${k})"><kbd>${k + 1}</kbd><span>${o}</span></button>`).join('')}</div>`;
      foot = X.silent ? `<button class="btn green" id="chk" disabled onclick="A.check()">${t('next')}</button>` : `<button class="btn ghost" onclick="A.skip()">${t('skip')}</button>`;
    }
    $('#overlay').innerHTML = `<div class="sess">
      <header class="sess-top"><button class="x" onclick="A.quitAsk()" aria-label="${t('quit')}">✕</button>
        <div class="pbar"><i style="width:${pct}%"></i></div>
        <button class="readbtn" onclick="A.readCard()" aria-label="${t('readAloud')}" title="${t('readAloud')}">${img('speaker')}</button>
        <button class="autochip ${S.autoRead ? 'on' : ''}" onclick="A.toggleAuto(this)" aria-pressed="${S.autoRead}" title="${t('autoRead')}">${t('auto')}</button>
        ${X.deadline ? `<span class="clock">⏱ <b id="sclock"></b></span>` : X.hasHearts ? `<span class="hearts ${X.lostAnim ? 'lost' : ''}">${img('heart')}<b>${X.hearts}</b></span>` : ''}</header>
      <div class="sess-body"><div class="card-in">${body}</div></div>
      <footer class="sess-foot" id="foot"><div class="foot-in">${foot}</div></footer></div>`;
    X.lostAnim = false;
    if (X.deadline) tickSession();
    if (S.autoRead) setTimeout(() => { if (X && X.cards[X.i] === c) readCard(); }, 380);
    else if (c.type === 'word') setTimeout(() => play([{ he: c.v.he }]), 300);
    else if (c.autoSay) setTimeout(() => play([{ he: c.autoSay }]), 350);
  }
  function readCard() {
    const c = X && X.cards[X.i], ov = $('#overlay'); if (!c) return;
    if (c.type === 'teach') return readEl(ov.querySelector('.speech'));
    if (c.type === 'word') return play([{ he: c.v.he }, ...segments(meaning(c.v), S.lang)]);
    if (c.type === 'pairs') return readParts([t('tapPairs')]);
    if (c.autoSay) return play([...segments(t('listenQ'), S.lang), { he: c.autoSay }]);
    readParts([textOf(ov.querySelector('.ctitle')), textOf(ov.querySelector('.qtext')), textOf(ov.querySelector('.he-prompt')), ...readChoices(ov)]);
  }
  function sel(k) {
    if (X.checked) return; X.sel = k;
    document.querySelectorAll('.choice').forEach((b, j) => b.classList.toggle('sel', j === k));
    if (!X.silent) return check(); /* tap = answer: feedback right away */
    SFX.tap(); $('#chk').disabled = false;
    if (S.autoRead) readParts([textOf(document.querySelectorAll('.choice')[k])]);
  }
  function check() {
    if (X.checked || X.sel === null) return;
    const c = X.cards[X.i], ok = X.sel === c.a; X.checked = true;
    X.n++; if (ok) X.ok++; X.log.push({ m: c.m, ok, d: c.d });
    stat(c.m, ok);
    if (c.id) { const w = S.wrong.indexOf(c.id); if (ok && w > -1) S.wrong.splice(w, 1); if (!ok && w < 0) S.wrong.push(c.id); }
    if (X.adaptive) X.level = Math.max(1, Math.min(3, X.level + (ok ? 1 : -1)));
    if (X.silent) { save(); return setTimeout(advance, 120); }
    document.querySelectorAll('.choice').forEach((b, j) => { b.disabled = true; if (j === c.a) b.classList.add('right'); else if (j === X.sel) b.classList.add('bad'); });
    if (ok) { SFX.ok(); } else {
      SFX.no(); if (X.hasHearts) { X.hearts--; const h = document.querySelector('.hearts'); if (h) { h.classList.add('lost'); h.querySelector('b').textContent = X.hearts; } }
      if (X.retry && !c.retried) X.cards.push({ ...c, retried: true });
    }
    if (c.say) setTimeout(() => play([{ he: c.say }]), 350);
    else if (S.autoRead && !ok) setTimeout(() => readParts([t('wrongT'), htmlText(c.o[c.a])]), 450);
    $('#foot').className = `sess-foot ${ok ? 'good' : 'bad'}`;
    $('#foot').innerHTML = `<div class="foot-in fb"><div class="fb-txt">${ok ? `<h3>${img('check')} ${pick(t('correct'))}</h3>` : `<h3>${t('wrongT')}</h3><p class="ans">${c.o[c.a]}</p>`}
      ${c.w ? `<p class="why">${c.w}</p>` : ''}${c.src ? `<p class="src">📚 ${t('source')}: ${c.src}</p>` : ''}</div><button class="readbtn" onclick="A.readFb()" aria-label="${t('readAloud')}">${img('speaker')}</button><button class="btn ${ok ? 'green' : 'red'}" onclick="A.cont()">${t('continue')}</button></div>`;
    touch(ok ? 2 : 0);
  }
  function advance() {
    if (X.hasHearts && X.hearts <= 0) return outOfHearts();
    X.i++;
    if (X.adaptive && X.i < X.cards.length) X.cards[X.i] = X.adaptive();
    drawCard();
  }
  function outOfHearts() {
    SFX.no();
    $('#overlay').innerHTML = `<div class="sess center"><div class="end pop">${mascot('sad', 'big')}<h1>${t('outHearts')}</h1><p>${t('outHeartsD')}</p>
      <div class="row"><button class="btn green" onclick="A.retrySession()">${t('retry')}</button><button class="btn ghost" onclick="A.closeTo('#/')">${t('quit')}</button></div></div></div>`;
  }
  function endSession() {
    stopTimer();
    const secs = Math.round((Date.now() - X.start) / 1000), acc = X.n ? Math.round(100 * X.ok / X.n) : 100;
    const xp = (X.xpBase || 10) + X.ok * 2 + (X.n && X.ok === X.n ? 5 : 0);
    if (X.onEnd) X.onEnd(acc);
    touch(xp); SFX.win(); confetti();
    let extra = '';
    if (X.byTopic) {
      const by = {}; X.log.forEach(r => { const b = by[r.m] || (by[r.m] = { ok: 0, n: 0 }); b.n++; if (r.ok) b.ok++; });
      extra = `<div class="topics">${Object.entries(by).map(([m, b]) => `<div>${img(m)}<span>${L(modById(m).title)}</span><div class="mbar-mini"><i style="width:${100 * b.ok / b.n}%"></i></div><small>${b.ok}/${b.n}</small></div>`).join('')}</div>`;
    }
    $('#overlay').innerHTML = `<div class="sess center"><div class="end">
      ${mascot('happy', 'big jump')}<h1 class="pop">${X.timeUp ? t('timeUp') : X.doneTitle || t('lessonDone')}</h1>
      <div class="end-stats">
        <div class="es gold"><small>${t('totalXp')}</small><b data-c="${xp}">0</b></div>
        <div class="es green"><small>${t('accuracy')}</small><b data-c="${acc}" data-suffix="%">0</b></div>
        <div class="es blue"><small>${t('time')}</small><b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div>
      </div>${extra}
      <button class="btn green wide" onclick="A.closeTo('${X.back || '#/'}')">${t('continue')}</button></div></div>`;
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  }

  /* lesson & quiz sessions */
  R.lesson = (id, i) => {
    const m = modById(id); i = +i; const l = m && m.lessons[i]; if (!l) return R.learn();
    const teach = l.p.map(p => ({ type: 'teach', html: hint(esc(L(p))) }));
    let cards = [];
    if (id === 'heb') {
      /* the Hebrew unit itself: words, pairs and listening */
      const words = l.v.slice(0, 5);
      cards = teach.concat(words.map(v => ({ type: 'word', v })));
      if (l.v.length >= 4) cards.push({ type: 'pairs', items: shuffle(words).slice(0, 4) });
      cards.push(vocabMCQ(l.v, pick(words)), vocabMCQ(l.v, pick(words), 'listen'));
    } else {
      /* exam first: teaching interleaved with this lesson's clinical questions, then a short Hebrew moment */
      const lq = shuffle(NX.qs.filter(q => q.m === id && q.l === i)).map(staticMCQ);
      teach.forEach((c, k) => { cards.push(c); if (k >= 1 && lq.length) cards.push(lq.shift()); });
      cards.push(...lq);
      const words = l.v.slice(0, 2), pool = NX.vocab.filter(v => v.m === id);
      words.forEach(v => cards.push({ type: 'word', v, moment: true }));
      const pairItems = uniqVocab([...words, ...shuffle(pool)]).slice(0, 4);
      if (pairItems.length >= 3) cards.push({ type: 'pairs', items: pairItems });
      if (words.length) cards.push(vocabMCQ(pool, pick(words), 'he'));
    }
    R.learn();
    session(cards, { back: '#/', xpBase: 15, onEnd: () => { S.done[nodeKey(id, i)] = 1; } });
  };
  R.quiz = id => {
    const m = modById(id); if (!m) return R.learn();
    const pool = NX.vocab.filter(v => v.m === id);
    const exam = shuffle(NX.qs.filter(q => q.m === id)).slice(0, 10).map(staticMCQ);
    const heb = uniqVocab(shuffle(pool));
    const cards = shuffle(exam.concat(heb.slice(0, id === 'heb' ? 8 : 2).map(v => vocabMCQ(pool, v, 'he'))));
    if (heb.length >= 4) cards.splice(Math.floor(cards.length / 2), 0, { type: 'pairs', items: heb.slice(-4) });
    R.learn();
    session(cards, { back: '#/', xpBase: 25, doneTitle: t('quizDone'), onEnd: acc => { if (acc >= 60) S.done[nodeKey(id, 'q')] = 1; } });
  };
  R.review = () => {
    const cards = S.wrong.map(id => NX.qs.find(q => q.id === id)).filter(Boolean).map(staticMCQ);
    R.practice();
    if (!cards.length) return toast(t('noWrong'), 'party');
    session(shuffle(cards), { back: '#/practice', hasHearts: false, retry: false });
  };

  /* mock exam (adaptive, silent, timed) */
  let mockPool = [];
  function pickAdaptive() {
    for (let gap = 0; gap < 3; gap++) {
      const c = mockPool.filter(q => Math.abs(q.d - X.level) === gap);
      if (c.length) { const q = pick(c); mockPool.splice(mockPool.indexOf(q), 1); return q; }
    }
    return staticMCQ(pick(NX.qs.filter(q => q.m !== 'heb')));
  }
  function startMock(n) {
    mockPool = NX.qs.filter(q => q.m !== 'heb').map(staticMCQ);
    session(new Array(n).fill(null), { back: '#/practice', hasHearts: false, retry: false, silent: true, adaptive: pickAdaptive, level: 2, deadline: Date.now() + n * 1.65 * 60000, byTopic: true, xpBase: 30, doneTitle: t('mock'),
      onEnd: acc => { S.best.mock = Math.max(S.best.mock || 0, acc); } });
  }

  /* ---------- SIM WARD ---------- */
  R.sim = id => {
    if (id) return runSim(id);
    view(`<section class="page-head">${img('sim', 'head-img float')}<div><h1>${t('simTitle')}</h1><p>${t('simIntro')}</p></div></section>
      <div class="sim-grid">${NX.sims.map((s, i) => {
        const r = S.sims[s.id];
        return `<a class="card sim-card tilt" href="#/sim/${s.id}" style="--d:${i * 60}ms">
          <div class="sim-pic">${img(s.img)}<span class="area">${img(s.area)}</span></div>
          <div><h3>${L2(s.t)}</h3><p>${esc(s.name)}${s.age > 1 ? `, ${s.age} ${t('yrs')}` : ''}</p>
          <div class="stars">${[1, 2, 3].map(k => `<span class="${r && r.stars >= k ? 'on' : ''}">★</span>`).join('')}${r ? `<small>${r.best}%</small>` : ''}</div></div></a>`;
      }).join('')}</div>`);
  };
  let SIM = null, ecgRAF = 0;
  function runSim(id) {
    const s = NX.sims.find(x => x.id === id); if (!s) return R.sim();
    SIM = { s, i: 0, pts: 0, max: s.steps.length * 2, log: [], skills: {} };
    view(`<a class="crumb" href="#/sim">← ${t('simTitle')}</a>
      <div class="ward">
        <aside class="bed card">
          <div class="pt">${img(s.img, 'pt-img')}<div><small>${t('patient')}</small><h2>${esc(s.name)}</h2><p>${s.age > 1 ? s.age + ' ' + t('yrs') : ''}</p></div></div>
          <p class="ctx">${L2(s.ctx)}</p>
          <div class="monitor" id="mon"><canvas id="ecg" width="600" height="120"></canvas><div class="vitals" id="vit"></div></div>
          <div class="simprog" id="simprog"></div>
        </aside>
        <section class="step card" id="step"></section>
      </div>`);
    drawStep();
    startECG();
  }
  const isBad = (k, v) => ({ hr: v < 50 || v > 120, spo2: v < 90, rr: v < 10 || v > 28, t: v >= 38.5 || v < 35.5, gl: v !== '?' && (v < 70 || v > 250), bp: parseInt(v) < 90 || parseInt(v) >= 180 }[k]);
  function drawVitals(v, crit) {
    SIM.v = v;
    const cell = (k, label, val, unit) => val === undefined ? '' : `<div class="vt ${k} ${isBad(k, val) ? 'alarm' : ''}"><small>${label}</small><b>${val}</b><i>${unit}</i></div>`;
    $('#vit').innerHTML = cell('hr', 'HR', v.hr, 'bpm') + cell('bp', 'BP', v.bp, 'mmHg') + cell('spo2', 'SpO₂', v.spo2, '%') + cell('rr', 'RR', v.rr, '/min') + cell('t', 'T', v.t, '°C') + (v.gl !== undefined ? cell('gl', 'Glu', v.gl, 'mg/dL') : '');
    $('#mon').classList.toggle('crit', !!crit);
  }
  function startECG() {
    cancelAnimationFrame(ecgRAF);
    const c = $('#ecg'); if (!c) return; const x = c.getContext('2d'); let pos = 0, last = performance.now(), y0 = 70, prevY = y0;
    const beat = ph => ph < .08 ? -Math.sin(ph / .08 * Math.PI) * 6 : ph < .14 ? 0 : ph < .16 ? 8 : ph < .19 ? -48 : ph < .22 ? 18 : ph < .3 ? 0 : ph < .42 ? -Math.sin((ph - .3) / .12 * Math.PI) * 10 : 0;
    let ph = 0;
    (function loop(n) {
      if (!document.body.contains(c)) return;
      const dt = (n - last) / 1000; last = n; const hr = (SIM && SIM.v && SIM.v.hr) || 80;
      const crit = $('#mon') && $('#mon').classList.contains('crit');
      const speed = 140; const steps = Math.max(1, Math.round(speed * dt));
      for (let k = 0; k < steps; k++) {
        ph += (hr / 60) / speed; if (ph > 1) ph -= 1;
        const y = y0 + beat(ph) + (crit ? (Math.random() - .5) * 6 : 0);
        x.clearRect(pos, 0, 14, c.height);
        x.strokeStyle = crit ? '#ff4b4b' : '#4cff7a'; x.lineWidth = 2.4; x.beginPath(); x.moveTo(pos - 1, prevY); x.lineTo(pos, y); x.stroke();
        prevY = y; pos = (pos + 1) % c.width; if (pos === 0) prevY = y0;
      }
      ecgRAF = requestAnimationFrame(loop);
    })(last);
  }
  function drawStep() {
    const st = SIM.s.steps[SIM.i];
    $('#simprog').innerHTML = SIM.s.steps.map((_, k) => `<i class="${k < SIM.i ? 'done' : k === SIM.i ? 'cur' : ''}"></i>`).join('');
    drawVitals(st.v);
    const order = shuffle(st.c.map((c, k) => k));
    $('#step').innerHTML = `<div class="step-in pop"><div class="step-top"><span class="skill ${st.k}">${t('skills')[st.k]}</span>
      <button class="readbtn" onclick="A.readStep()" aria-label="${t('readAloud')}" title="${t('readAloud')}">${img('speaker')}</button>
      <button class="autochip ${S.autoRead ? 'on' : ''}" onclick="A.toggleAuto(this)" aria-pressed="${S.autoRead}" title="${t('autoRead')}">${t('auto')}</button></div>
      <p class="situation">${L2(st.s)}</p>
      <div class="choices">${order.map((k, n) => `<button class="choice" data-k="${k}" onclick="A.simPick(${k})"><kbd>${n + 1}</kbd><span>${esc(L2([st.c[k][1], st.c[k][2]]))}</span></button>`).join('')}</div>
      <div id="simfb"></div></div>`;
    if (S.autoRead) setTimeout(() => { if (SIM && SIM.s.steps[SIM.i] === st) readStep(); }, SIM.i === 0 ? 600 : 300);
  }
  const readStep = () => { const s = $('#step'); if (s) readParts([textOf(s.querySelector('.situation')), ...readChoices(s)]); };
  function simPick(k) {
    const st = SIM.s.steps[SIM.i], c = st.c[k], sc = c[0], best = st.c.findIndex(x => x[0] === 2);
    SIM.pts += Math.max(0, sc); SIM.log.push({ i: SIM.i, k, sc });
    const sk = SIM.skills[st.k] || (SIM.skills[st.k] = { p: 0, m: 0 }); sk.p += Math.max(0, sc); sk.m += 2;
    document.querySelectorAll('#step .choice').forEach(b => { b.disabled = true; const j = +b.dataset.k; if (j === best) b.classList.add('right'); else if (j === k) b.classList.add(sc === 1 ? 'meh' : 'bad'); });
    if (sc === 2) SFX.ok(); else if (sc === -1) {
      SFX.alarm(); const v = st.v, worse = { ...v, hr: Math.min(170, v.hr + 22), spo2: Math.max(78, v.spo2 - 6), rr: Math.min(36, v.rr + 6) };
      drawVitals(worse, true); setTimeout(() => { if (SIM && SIM.s.steps[SIM.i] === st) drawVitals(st.v); }, 2600);
    } else SFX.no();
    const cls = sc === 2 ? 'good' : sc === 1 ? 'meh' : 'bad', label = sc === 2 ? `+2 ${t('pts')}` : sc === 1 ? `+1 ${t('pts')}` : sc === 0 ? `0 ${t('pts')}` : (S.lang === 'es' ? '⚠ Inseguro' : '⚠ Unsafe');
    const last = SIM.i === SIM.s.steps.length - 1;
    $('#simfb').innerHTML = `<div class="simfb ${cls} pop"><b>${label}</b><p>${esc(L2([c[3], c[4]]))}</p>
      <button class="btn ${sc === 2 ? 'green' : sc === 1 ? 'orange' : 'red'}" onclick="A.simNext()">${last ? t('debrief') : t('next')} →</button></div>`;
    if (S.autoRead) setTimeout(() => readParts([L2([c[3], c[4]])]), sc === -1 ? 1000 : 400);
    touch(sc === 2 ? 4 : 1);
  }
  function simNext() {
    SIM.i++;
    if (SIM.i < SIM.s.steps.length) return drawStep();
    cancelAnimationFrame(ecgRAF);
    const pct = Math.round(100 * SIM.pts / SIM.max), stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const prev = S.sims[SIM.s.id]; S.sims[SIM.s.id] = { best: Math.max(pct, prev ? prev.best : 0), stars: Math.max(stars, prev ? prev.stars : 0) };
    touch(20 + stars * 10); SFX.win(); if (stars >= 2) confetti();
    view(`<a class="crumb" href="#/sim">← ${t('simTitle')}</a>
      <section class="card debrief"><div class="db-head">${mascot(stars ? 'happy' : 'sad', 'big jump')}<div><h1>${t('debrief')}: ${L2(SIM.s.t)}</h1>
        <div class="stars big">${[1, 2, 3].map(k => `<span class="${stars >= k ? 'on pop' : ''}" style="animation-delay:${k * 180}ms">★</span>`).join('')}</div><p class="pct"><b data-c="${pct}" data-suffix="%">0</b></p></div></div>
        <div class="skillbars">${Object.entries(SIM.skills).map(([k, v]) => `<div><span class="skill ${k}">${t('skills')[k]}</span><div class="mbar-mini"><i style="width:${100 * v.p / v.m}%"></i></div><small>${v.p}/${v.m}</small></div>`).join('')}</div>
        <ol class="db-steps">${SIM.log.map(r => { const st = SIM.s.steps[r.i], b = st.c.find(x => x[0] === 2), mine = st.c[r.k];
          return `<li class="${r.sc === 2 ? 'good' : r.sc === -1 ? 'bad' : 'meh'}"><p>${L2(st.s)}</p>${r.sc !== 2 ? `<p><small>${t('yourPick')}:</small> ${esc(L2([mine[1], mine[2]]))}</p>` : ''}<p><small>${t('best')}:</small> <b>${esc(L2([b[1], b[2]]))}</b></p></li>`; }).join('')}</ol>
        <div class="row"><a class="btn green" href="#/sim/${SIM.s.id}" onclick="setTimeout(A.route)">${t('again')}</a><a class="btn ghost" href="#/sim">${t('backWard')}</a></div></section>`);
    document.querySelectorAll('[data-c]').forEach(el => countUp(el, +el.dataset.c));
  }

  /* ---------- PRACTICE hub & games ---------- */
  R.practice = () => {
    const games = [['mock', 'mock', '#/mock', S.best.mock ? `${t('record')}: ${S.best.mock}%` : ''], ['speed', 'speed', '#/speed', S.best.speed ? `${t('record')}: ${S.best.speed}` : ''],
      ['match', 'match', '#/match', ''], ['review', 'review', '#/review', `${S.wrong.length}`], ['flash', 'flash', '#/flash/all', '']];
    view(`<section class="page-head">${img('target', 'head-img float')}<div><h1>${t('practice')}</h1></div></section>
      <div class="game-grid">${games.map(([k, im, h, sub], i) => `<a class="card game tilt" href="${h}" style="--d:${i * 60}ms;--g:${UNIT_COLORS[i]}">
        ${img(im, 'wiggle')}<h3>${t(k)}</h3><p>${t(k + 'D')}</p>${sub ? `<span class="chip">${sub}</span>` : ''}</a>`).join('')}</div>`);
  };
  R.mock = () => {
    const total = NX.qs.filter(q => q.m !== 'heb').length;
    view(`<a class="crumb" href="#/practice">← ${t('practice')}</a><section class="card center-card">${img('mock', 'head-img float')}<h1>${t('mock')}</h1><p>${t('mockD')}</p>
      <h3>${t('length')}</h3><div class="row">${[20, 50, total].map((n, i) => `<button class="btn ${i === 1 ? 'green' : 'blue'}" onclick="A.startMock(${n})">${n} ${t('questions')} · ${Math.round(n * 1.65)}′</button>`).join('')}</div></section>`);
  };

  let F = null;
  const deckPool = id => id === 'all' ? NX.vocab : NX.vocab.filter(v => v.m === id);
  const deckPicker = (route, id) => `<label class="deck">${t('deck')} <select onchange="location.hash='#/${route}/'+this.value">
      <option value="all">${t('all')}</option>${NX.modules.map(m => `<option value="${m.id}" ${m.id === id ? 'selected' : ''}>${L(m.title)}</option>`).join('')}</select></label>`;
  R.flash = id => {
    id = id || 'all'; const pool = deckPool(id); if (!pool.length) return R.practice();
    const minBox = Math.min(...pool.map(v => S.box[v.id] || 0)), v = pick(pool.filter(x => (S.box[x.id] || 0) === minBox));
    const mastered = pool.filter(x => (S.box[x.id] || 0) >= 4).length; F = { id, v };
    view(`<a class="crumb" href="#/practice">← ${t('practice')}</a><div class="game-top"><h1>${img('flash')} ${t('flash')}</h1>${deckPicker('flash', id)}</div>
      <div class="mbar-mini wide"><i style="width:${100 * mastered / pool.length}%"></i></div><p class="muted">${mastered}/${pool.length} ${t('mastered')}</p>
      <div class="flip" id="flip" onclick="A.flip()"><div class="face front">${img(v.m, 'face-img')}<b>${esc(meaning(v))}</b><span class="muted">${t('reveal')} 👆</span></div>
      <div class="face back"><span class="he huge" lang="he" dir="rtl">${v.he}</span><i>${esc(v.tr)}</i><b>${esc(meaning(v))}</b></div></div>
      <div class="row center"><button class="btn red" onclick="A.grade(0)">${t('notyet')}</button><button class="btn blue round" data-say="${v.he}">${img('speaker')}</button><button class="btn green" onclick="A.grade(1)">${t('know')}</button></div>`);
  };
  function flip() { const f = $('#flip'); f.classList.toggle('on'); SFX.tap(); if (f.classList.contains('on')) speak(F.v.he); }
  function grade(ok) { S.box[F.v.id] = ok ? Math.min(5, (S.box[F.v.id] || 0) + 1) : 1; ok ? SFX.ok() : SFX.tap(); touch(ok ? 3 : 1); R.flash(F.id); }

  let M = null;
  /* Match Madness: clinical pairs (drug → antidote, sign → condition, values, rules), with a Hebrew hint where there is one */
  R.match = () => {
    const set = shuffle(NX.pairs).slice(0, 5).map((p, i) => ({ id: 'p' + i, left: L2([p[0], p[1]]), right: L2([p[2], p[3]]), he: p[4] }));
    M = { set, sel: null, done: 0, start: Date.now(), miss: 0 };
    view(`<a class="crumb" href="#/practice">← ${t('practice')}</a><div class="game-top"><h1>${img('match')} ${t('match')}</h1><span class="clock big" id="mt">0s</span></div>
      <p class="muted">${t('matchD')}</p>
      <div class="pairs big clinical"><div>${shuffle(set).map(p => `<button class="ptile" data-id="${p.id}" data-s="L"${p.he ? ` data-say="${p.he}"` : ''}>${esc(p.left)}${p.he && S.hints ? `<small class="he" lang="he" dir="rtl">${p.he}</small>` : ''}</button>`).join('')}</div>
      <div>${shuffle(set).map(p => `<button class="ptile" data-id="${p.id}" data-s="R">${esc(p.right)}</button>`).join('')}</div></div>`);
    X = null; stopTimer(); timer = setInterval(() => { const el = $('#mt'); if (!el) return stopTimer(); el.textContent = `${Math.round((Date.now() - M.start) / 1000)}s`; }, 500);
  };
  /* shared pair-tile logic for the Match game and in-lesson pairs */
  function tile(b) {
    const P = X && X.pair ? X.pair : M; if (!P || b.classList.contains('ok')) return;
    SFX.tap();
    if (!P.sel || P.sel.dataset.s === b.dataset.s) { if (P.sel) P.sel.classList.remove('sel'); P.sel = b; b.classList.add('sel'); return; }
    const a = P.sel; P.sel = null; a.classList.remove('sel');
    if (a.dataset.id === b.dataset.id) {
      [a, b].forEach(x => x.classList.add('ok')); P.done++; SFX.ok();
      const total = P.total || P.set.length;
      if (P.done === total) {
        if (X && X.pair) { $('#ctn').disabled = false; X.pair = null; X.ok++; X.n++; }
        else { stopTimer(); const s = Math.round((Date.now() - M.start) / 1000); touch(20); confetti(); SFX.win(); toast(`${s}s · ${M.miss} ✗ · +20 XP`, 'match'); setTimeout(() => R.match(), 1600); }
      }
    } else { if (M && !X) M.miss++; SFX.no(); [a, b].forEach(x => { x.classList.add('shake'); setTimeout(() => x.classList.remove('shake'), 450); }); }
  }

  /* Priority Rush: 90 seconds of exam questions; a wrong answer shows the right one before moving on */
  const RUSH_MS = 90000;
  let SP = null;
  R.speed = () => {
    SP = { pool: NX.qs.filter(q => q.m !== 'heb'), score: 0, combo: 0, end: 0 };
    view(`<a class="crumb" href="#/practice">← ${t('practice')}</a><section class="card center-card">${img('speed', 'head-img float')}<h1>${t('speed')}</h1><p>${t('speedD')}</p>
      ${S.best.speed ? `<p class="chip">${t('record')}: ${S.best.speed}</p>` : ''}<button class="btn green big" onclick="A.speedGo()">${t('play')} ▶</button></section>`);
  };
  function speedGo() { SP.end = Date.now() + RUSH_MS; SP.score = 0; SP.combo = 0; stopTimer(); stopVoice(); timer = setInterval(speedTick, 200); speedQ(); }
  function speedTick() {
    const left = Math.max(0, SP.end - Date.now()), el = $('#sclk'), bar = $('#sbar');
    if (el) el.textContent = Math.ceil(left / 1000); if (bar) bar.style.width = `${100 * left / RUSH_MS}%`;
    if (!left) {
      stopTimer(); const best = S.best.speed || 0, rec = SP.score > best; if (rec) S.best.speed = SP.score; touch(SP.score * 2); SFX.win(); if (rec) confetti();
      view(`<section class="card center-card">${mascot('happy', 'big jump')}<h1 class="pop">${SP.score}</h1><p>${rec ? '🏆 ' + t('record') + '!' : t('record') + ': ' + best}</p>
        <div class="row"><button class="btn green" onclick="A.speedRestart()">${t('again')}</button><a class="btn ghost" href="#/practice">${t('practice')}</a></div></section>`);
    }
  }
  function speedQ() {
    const q = pick(SP.pool); SP.q = staticMCQ(q);
    view(`<div class="speed-top"><b class="clock big" id="sclk">${RUSH_MS / 1000}</b><div class="pbar"><i id="sbar"></i></div><span class="score">⭐ ${SP.score}</span>${SP.combo > 2 ? `<span class="combo pop">🔥×${SP.combo}</span>` : ''}</div>
      <section class="card speed-card pop">${img(q.m, 'rush-img')}${SP.q.q}<div class="choices">${SP.q.o.map((o, k) => `<button class="choice" onclick="A.speedAns(${k},this)"><kbd>${k + 1}</kbd><span>${o}</span></button>`).join('')}</div></section>`);
    speedTick();
  }
  function speedAns(k, b) {
    if (SP.lock) return; SP.lock = true;
    const ok = k === SP.q.a; b.classList.add(ok ? 'right' : 'bad');
    if (!ok) document.querySelectorAll('.speed-card .choice')[SP.q.a].classList.add('right');
    if (ok) { SP.combo++; SP.score += SP.combo > 4 ? 2 : 1; SFX.ok(); } else { SP.combo = 0; SFX.no(); }
    stat(SP.q.m, ok);
    setTimeout(() => { SP.lock = false; if (SP.end > Date.now()) speedQ(); }, ok ? 450 : 1600);
  }

  /* ---------- PLAN: day-by-day sprint to 18.11 ---------- */
  /* aligned to the END: the last entry is always the day before the exam */
  const SPRINT = [
    ['sim', 'mi', 'fund'], ['sim', 'hypo', 'medsurg'], ['sim', 'ana', 'pharm'], ['sim', 'bleed', 'medsurg'], ['sim', 'copd', 'law'], ['sim', 'stroke', 'emerg'],
    ['sim', 'pph', 'mat'], ['sim', 'child', 'peds'], ['sim', 'psy', 'psych'], ['law', 'rush'], ['match', 'review'], ['mock'], ['simall', 'rush'], ['law', 'review'],
    ['simall', 'fund'], ['mock', 'review'], ['simall', 'emerg'], ['simall'], ['rest']
  ];
  R.plan = () => {
    const start = new Date(S.planStart + 'T12:00:00'), end = new Date('2026-11-17T12:00:00');
    const days = []; for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d));
    const tdy = today();
    const taskHtml = task => {
      const [kind, a] = task;
      if (kind === 'sim') { const s = NX.sims.find(x => x.id === a); return `<a href="#/sim/${a}">${img('sim')} ${L2(s.t)}</a>`; }
      if (kind === 'simall') return `<a href="#/sim">${img('sim')} ${t('simTitle')} ×3</a>`;
      if (kind === 'mock') return `<a href="#/mock">${img('mock')} ${t('mock')}</a>`;
      if (kind === 'review') return `<a href="#/review">${img('review')} ${t('review')}</a>`;
      if (kind === 'rush') return `<a href="#/speed">${img('speed')} ${t('speed')}</a>`;
      if (kind === 'match') return `<a href="#/match">${img('match')} ${t('match')}</a>`;
      if (kind === 'rest') return `<span>${img('heart')} ${S.lang === 'es' ? 'Repaso suave, revisa la invitación, descansa' : 'Light review, check your invitation, rest'}</span>`;
      const m = modById(kind); return `<a href="#/">${img(m.id)} ${L(m.title)}</a>`;
    };
    view(`<section class="page-head">${img('calendar', 'head-img float')}<div><h1>${t('planTitle')}</h1><p>${t('planD')}</p></div></section>
      <ol class="sprint">${days.map((d, i) => {
        const key = d.toISOString().slice(0, 10), item = SPRINT[Math.max(0, SPRINT.length - (days.length - i))];
        const tasks = item[0] === 'sim' ? [['sim', item[1]], [item[2]]] : item.map(k => [k]);
        const isToday = key === tdy, done = S.plan[key];
        return `<li class="${isToday ? 'today' : ''} ${done ? 'done' : ''} ${key < tdy && !done ? 'missed' : ''}" style="--d:${i * 40}ms">
          <label class="tick"><input type="checkbox" ${done ? 'checked' : ''} onchange="A.planTick('${key}',this.checked)"><span></span></label>
          <div class="day"><b>${d.toLocaleDateString(S.lang === 'es' ? 'es' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</b>${isToday ? `<em>${t('today')}</em>` : ''}</div>
          <div class="tasks">${tasks.map(taskHtml).join('')}<span class="muted">${img('heb')} ${t('hebDaily')}</span></div></li>`;
      }).join('')}
      <li class="exam-day"><div class="day"><b>18.11</b></div><div class="tasks">${img('mary')} <b>${esc(S.name)} · ${S.lang === 'es' ? '¡Día del examen! Mucha suerte' : 'Exam day! בהצלחה (behatzlacha), good luck!'}</b></div></li></ol>`);
  };

  /* ---------- EXAM info & PROFILE ---------- */
  R.exam = () => view(document.getElementById(`exam-${S.lang}`).innerHTML);
  R.me = () => {
    const tot = NX.modules.reduce((n, m) => n + m.lessons.length, 0), done = Object.keys(S.done).filter(k => !k.endsWith('-q')).length;
    view(`<section class="profile card">${img('mary', 'avatar-big float')}<div><h1>${esc(S.name)}</h1><p>${t('level')} ${level()} · ${S.xp} XP</p></div></section>
      <div class="pstats">
        <div class="card">${img('fire')}<b>${S.streak}</b><small>${t('streak')}</small></div>
        <div class="card">${img('books')}<b>${done}/${tot}</b><small>${t('lessons')}</small></div>
        <div class="card">${img('sim')}<b>${Object.keys(S.sims).length}/${NX.sims.length}</b><small>${t('simTitle')}</small></div>
        <div class="card">${img('heb')}<b>${Object.values(S.box).filter(b => b >= 4).length}</b><small>עברית</small></div>
      </div>
      <h2>${t('badges')}</h2><div class="badge-grid">${BADGES.map(b => `<div class="badge ${S.badges.includes(b[0]) ? 'on' : ''}">${img(b[1])}<small>${esc(L2([b[2], b[3]]))}</small></div>`).join('')}</div>
      <h2>${img('check')} ${t('saveTitle')}</h2><section class="card settings" id="cloudbox">${cloudBox()}</section>
      <h2>${t('settings')}</h2><section class="card settings">
        <label>${t('name')} <input value="${esc(S.name)}" maxlength="24" onchange="A.setName(this.value)"></label>
        <label>${t('language')} <span class="seg"><button class="${S.lang === 'en' ? 'on' : ''}" onclick="A.setLang('en')">English</button><button class="${S.lang === 'es' ? 'on' : ''}" onclick="A.setLang('es')">Español</button></span></label>
        <label>${t('hints')} <span class="seg"><button class="${S.hints ? 'on' : ''}" onclick="A.setOpt('hints',true)">${t('on')}</button><button class="${!S.hints ? 'on' : ''}" onclick="A.setOpt('hints',false)">${t('off')}</button></span></label>
        <label>${t('sound')} <span class="seg"><button class="${S.sound ? 'on' : ''}" onclick="A.setOpt('sound',true)">${t('on')}</button><button class="${!S.sound ? 'on' : ''}" onclick="A.setOpt('sound',false)">${t('off')}</button></span></label>
        <label>${t('autoRead')} <span class="seg"><button class="${S.autoRead ? 'on' : ''}" onclick="A.setOpt('autoRead',true)">${t('on')}</button><button class="${!S.autoRead ? 'on' : ''}" onclick="A.setOpt('autoRead',false)">${t('off')}</button></span></label>
        <label>${t('speed2')} <span class="seg"><button class="${S.rate < 1 ? 'on' : ''}" onclick="A.setOpt('rate',.8)">${t('slow')}</button><button class="${S.rate >= 1 ? 'on' : ''}" onclick="A.setOpt('rate',1)">${t('normal')}</button></span></label>
        <div class="audiotest"><button class="btn blue" onclick="A.testAudio()">${img('speaker')} ${t('testAudio')}</button><ul id="audiorep"></ul></div>
        ${voicePicker()}
        <button class="btn red small" onclick="A.reset()">${t('reset')}</button></section>
      <p class="fine">${t('disclaimer')} · 3D images: Microsoft Fluent Emoji (MIT).</p>`);
  };

  /* ---------- saving progress: backup file + optional cloud sync (Firebase, configured in js/cloud-config.js) ---------- */
  /* merge two progress objects without losing work done on either device */
  function merge(a, b) {
    const newer = (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b, older = newer === a ? b : a;
    const m = Object.assign({}, def, older, newer);
    const maxMap = (x = {}, y = {}) => { const o = { ...x }; for (const k in y) o[k] = Math.max(o[k] || 0, y[k] || 0); return o; };
    m.xp = Math.max(a.xp || 0, b.xp || 0); m.answered = Math.max(a.answered || 0, b.answered || 0);
    m.done = { ...a.done, ...b.done }; m.plan = { ...older.plan, ...newer.plan };
    m.box = maxMap(a.box, b.box); m.best = maxMap(a.best, b.best);
    m.badges = [...new Set([...(a.badges || []), ...(b.badges || [])])]; m.wrong = [...new Set([...(a.wrong || []), ...(b.wrong || [])])];
    m.stats = {}; for (const k of new Set([...Object.keys(a.stats || {}), ...Object.keys(b.stats || {})])) { const x = (a.stats || {})[k], y = (b.stats || {})[k]; m.stats[k] = !x ? y : !y ? x : x.n >= y.n ? x : y; }
    m.sims = {}; for (const k of new Set([...Object.keys(a.sims || {}), ...Object.keys(b.sims || {})])) { const x = (a.sims || {})[k] || {}, y = (b.sims || {})[k] || {}; m.sims[k] = { best: Math.max(x.best || 0, y.best || 0), stars: Math.max(x.stars || 0, y.stars || 0) }; }
    m.lastBackup = Math.max(a.lastBackup || 0, b.lastBackup || 0);
    m.planStart = [a.planStart, b.planStart].filter(Boolean).sort()[0] || today();
    if ((a.last || '') !== (b.last || '')) { const l = (a.last || '') > (b.last || '') ? a : b; m.last = l.last; m.streak = l.streak; } else m.streak = Math.max(a.streak || 0, b.streak || 0);
    m.daily = (a.daily || {}).d === (b.daily || {}).d ? { d: a.daily.d, xp: Math.max(a.daily.xp, b.daily.xp) } : ((a.daily || {}).d || '') > ((b.daily || {}).d || '') ? a.daily : b.daily;
    return m;
  }
  function backupDownload() {
    S.lastBackup = Date.now(); save();
    const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `lev-progress-${S.name.toLowerCase()}-${today()}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function backupRestore(file) {
    if (!file) return;
    file.text().then(txt => {
      const data = JSON.parse(txt); if (typeof data !== 'object' || !('xp' in data)) throw new Error('not a backup');
      S = merge(S, data); save(); toast(t('restored'), 'check'); route();
    }).catch(() => toast(t('restoreBad'), 'lock'));
  }

  /* ---------- move progress between devices without an account: a link (and QR) that carries the progress ---------- */
  const toB64u = bytes => { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const fromB64u = str => { const b = atob(str.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, c => c.charCodeAt(0)); };
  async function packProgress() {
    const slim = JSON.parse(JSON.stringify(S));
    for (const k in slim) if (JSON.stringify(slim[k]) === JSON.stringify(def[k])) delete slim[k];
    const raw = new TextEncoder().encode(JSON.stringify(slim));
    if ('CompressionStream' in window) {
      const z = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer());
      return 'z' + toB64u(z);
    }
    return 'j' + toB64u(raw);
  }
  async function unpackProgress(code) {
    const bytes = fromB64u(code.slice(1));
    const txt = code[0] === 'z' ? await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text() : new TextDecoder().decode(bytes);
    const d = JSON.parse(txt); if (typeof d !== 'object' || d === null) throw new Error('bad'); return d;
  }
  const transferUrl = async () => `${location.origin}${location.pathname}#/import/${await packProgress()}`;
  async function shareProgress() {
    const url = await transferUrl(); S.lastBackup = Date.now(); save(); refreshCloudBox();
    const banner = document.querySelector('.remind'); if (banner) banner.remove();
    if (navigator.share) { try { await navigator.share({ title: 'lev.', text: t('shareText'), url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(url); toast(t('linkCopied'), 'check'); } catch (e) { prompt(t('copyManual'), url); }
  }
  async function showQR() {
    const box = $('#qrbox'); if (!box) return;
    const url = await transferUrl();
    if (url.length > 2300) { box.innerHTML = `<p class="fine">${t('qrBig')}</p>`; return; }
    if (!window.QRCode) await new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc); }).catch(() => null);
    if (!window.QRCode) { box.innerHTML = `<p class="fine">${t('qrBig')}</p>`; return; }
    box.innerHTML = `<div id="qr" class="qr"></div><p class="fine">${t('qrHelp')}</p>`;
    try { new QRCode($('#qr'), { text: url, width: 240, height: 240, correctLevel: QRCode.CorrectLevel.L }); S.lastBackup = Date.now(); save(); }
    catch (e) { box.innerHTML = `<p class="fine">${t('qrBig')}</p>`; }
  }
  let pendingImport = null;
  R.import = async code => {
    try { pendingImport = await unpackProgress(code || ''); } catch (e) { pendingImport = null; }
    if (!pendingImport) { toast(t('importBad'), 'lock'); location.replace('#/'); return; }
    const d = pendingImport, lessons = Object.keys(d.done || {}).length, sims = Object.keys(d.sims || {}).length;
    view(`<section class="card center-card">${img('mary', 'head-img float')}<h1>${t('importTitle')}</h1><p>${t('importD')}</p>
      <div class="pstats"><div class="card">${img('gem')}<b>${d.xp || 0}</b><small>XP</small></div><div class="card">${img('books')}<b>${lessons}</b><small>${t('lessons')}</small></div><div class="card">${img('sim')}<b>${sims}</b><small>${t('simTitle')}</small></div></div>
      <div class="row"><button class="btn green" onclick="A.mergeImport()">${t('mergeBtn')}</button><a class="btn ghost" href="#/">${t('cancel')}</a></div></section>`);
  };
  let installEvt = null, persisted = false;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; refreshCloudBox(); });
  function installRow() {
    if (standalone()) return `<p>📲 ${t('installed')}</p>`;
    if (installEvt) return `<div class="row"><button class="btn green" onclick="A.install()">📲 ${t('installBtn')}</button></div><p class="fine">${t('installNote')}</p>`;
    if (isIOS()) return `<p class="muted">📲 ${t('installIOS')}</p><p class="fine">${t('installNote')}</p>`;
    return '';
  }

  const CLOUD = window.NX_CLOUD || null;
  const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';
  let cloud = { ready: false, user: null, synced: 0, busy: false, err: '' };
  let pushTimer = null;
  async function cloudInit() {
    if (!CLOUD) return;
    try {
      const [{ initializeApp }, A_, F_] = await Promise.all([import(FB + 'firebase-app.js'), import(FB + 'firebase-auth.js'), import(FB + 'firebase-firestore.js')]);
      const app = initializeApp(CLOUD), auth = A_.getAuth(app), db = F_.getFirestore(app);
      cloud = Object.assign(cloud, { A_, F_, auth, db, ready: true });
      /* finish an email-link sign-in when Mary comes back from the email */
      if (A_.isSignInWithEmailLink(auth, location.href)) {
        let email = ''; try { email = localStorage.getItem('lev.email') || ''; } catch (e) { /* storage blocked */ }
        if (!email) email = prompt(t('emailAgain')) || '';
        if (email) { await A_.signInWithEmailLink(auth, email, location.href); try { localStorage.removeItem('lev.email'); } catch (e) { /* storage blocked */ } }
        history.replaceState(null, '', location.pathname + '#/me');
      }
      A_.getRedirectResult(auth).catch(e => { cloud.err = authError(e); refreshCloudBox(); });
      A_.onAuthStateChanged(auth, async user => {
        cloud.user = user; afterSave = user ? schedulePush : null;
        if (user) await cloudPull();
        refreshCloudBox();
      });
    } catch (e) { cloud.err = authError(e); refreshCloudBox(); }
  }
  const authError = e => {
    const c = (e && e.code) || '';
    if (c.includes('operation-not-allowed')) return S.lang === 'es' ? 'Este método de acceso no está activado en Firebase (Authentication → Sign-in method).' : 'This sign-in method is not switched on in Firebase (Authentication → Sign-in method).';
    if (c.includes('unauthorized-domain')) return S.lang === 'es' ? 'Esta dirección no está en los dominios autorizados de Firebase.' : 'This site address is not in Firebase’s authorized domains.';
    if (c.includes('network-request-failed')) return S.lang === 'es' ? 'Sin conexión. Inténtalo de nuevo.' : 'No connection. Please try again.';
    if (c.includes('invalid-email')) return S.lang === 'es' ? 'Ese correo no parece válido.' : 'That email does not look right.';
    return String((e && (e.code || e.message)) || e);
  };
  const progressDoc = () => cloud.F_.doc(cloud.db, 'progress', cloud.user.uid);
  async function cloudPull() {
    try {
      cloud.busy = true; refreshCloudBox();
      const snap = await cloud.F_.getDoc(progressDoc());
      if (snap.exists()) { S = merge(S, snap.data().state || {}); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } route(); }
      await cloudPush();
    } catch (e) { cloud.err = String(e.message || e); } finally { cloud.busy = false; refreshCloudBox(); }
  }
  async function cloudPush() {
    if (!cloud.user) return;
    try { await cloud.F_.setDoc(progressDoc(), { state: JSON.parse(JSON.stringify(S)), email: cloud.user.email || '', savedAt: Date.now() }); cloud.synced = Date.now(); cloud.err = ''; }
    catch (e) { cloud.err = String(e.message || e); }
    refreshCloudBox();
  }
  function schedulePush() { clearTimeout(pushTimer); pushTimer = setTimeout(cloudPush, 2500); }
  function cloudBox() {
    const transfer = `<div class="row"><button class="btn green" onclick="A.share()">${img('phone')} ${t('shareBtn')}</button><button class="btn blue" onclick="A.qr()">${t('qrBtn')}</button></div>
      <div id="qrbox"></div>
      <p class="fine">${t('lastBackup')} ${S.lastBackup ? new Date(S.lastBackup).toLocaleString() : t('never')}${persisted ? ' · ' + t('persistOk') : ''}</p>`;
    const backup = `<div class="row"><button class="btn ghost small" onclick="A.backup()">${t('backupBtn')}</button>
      <label class="btn ghost small">${t('restoreBtn')}<input type="file" accept="application/json,.json" hidden onchange="A.restore(this.files[0])"></label></div>`;
    let top;
    if (!CLOUD) top = `<p class="muted">${t('localOnly')}</p>`;
    else if (!cloud.ready) top = `<p class="muted">${cloud.err ? '⚠ ' + esc(cloud.err) : t('cloudLoading')}</p>`;
    else if (cloud.user) top = `<p>☁️ <b>${t('signedInAs')}</b> ${esc(cloud.user.email || cloud.user.displayName || '')}</p>
      <p class="muted">${cloud.busy ? t('syncing') : cloud.synced ? `${t('syncedAt')} ${new Date(cloud.synced).toLocaleTimeString()}` : ''}${cloud.err ? ' · ⚠ ' + esc(cloud.err) : ''}</p>
      <div class="row"><button class="btn green small" onclick="A.syncNow()">${t('syncNow')}</button><button class="btn ghost small" onclick="A.signOut()">${t('signOut')}</button></div>`;
    else top = `<p class="muted">${t('cloudPitch')}</p>
      <div class="row"><button class="btn blue" onclick="A.googleIn()">G&nbsp; ${t('googleBtn')}</button></div>
      <form class="row" onsubmit="A.emailIn(this.email.value);return false"><input name="email" type="email" required placeholder="${t('emailPh')}" autocomplete="email"><button class="btn green">${t('emailBtn')}</button></form>
      ${cloud.err ? `<p class="fine">⚠ ${esc(cloud.err)}</p>` : ''}`;
    return top + `<hr>${transfer}${installRow() ? '<hr>' + installRow() : ''}<hr>${backup}`;
  }
  function refreshCloudBox() { const b = $('#cloudbox'); if (b) b.innerHTML = cloudBox(); }

  /* choose the reading voice per language; previews on change */
  function voicePicker() {
    loadVoices();
    const row = (lang, label) => {
      const pool = voicesFor(lang), cur = (S.voice || {})[lang] || '';
      const best = voiceFor(lang);
      return `<label>${label} <span class="voicepick"><select onchange="A.setVoice('${lang}', this.value)"><option value="">${t('autoVoice')}${best && !cur ? ` (${esc(best.name)})` : ''}</option>
        ${pool.map(v => `<option value="${esc(v.name)}" ${v.name === cur ? 'selected' : ''}>${esc(v.name)}${/Premium|Enhanced|Natural|Neural|Siri/i.test(v.name) ? ' ★' : ''}${v.localService ? '' : ' · online'}</option>`).join('')}</select>
        <button class="readbtn" onclick="A.previewVoice('${lang}')" aria-label="${t('listen')}">${img('speaker')}</button></span></label>`;
    };
    return `<h3>${t('voicesTitle')}</h3>${row(S.lang, S.lang === 'es' ? 'Español' : 'English')}<p class="fine">${t('voiceTip')}</p>`;
  }

  /* ---------- router & events ---------- */
  function route() {
    stopTimer(); stopVoice(); cancelAnimationFrame(ecgRAF);
    const [, page, a, b] = (location.hash || '#/').split('/');
    const tab = { '': 'learn', lesson: 'learn', quiz: 'learn', sim: 'sim', practice: 'practice', flash: 'practice', match: 'practice', speed: 'practice', mock: 'practice', review: 'practice', plan: 'plan', exam: 'exam', me: 'me', import: 'me' }[page || ''] || 'learn';
    document.querySelectorAll('[data-nav]').forEach(x => x.classList.toggle('active', x.dataset.nav === tab));
    $('#app').classList.toggle('wide', tab !== 'learn' && tab !== 'me');
    (R[page] || R.learn)(a, b);
    chrome();
  }
  window.addEventListener('hashchange', () => { if (X && !$('#overlay').hidden) closeSession(); route(); });
  document.addEventListener('click', e => {
    const s = e.target.closest('[data-say]'); if (s && !s.classList.contains('ptile')) speak(s.dataset.say);
    const p = e.target.closest('.ptile'); if (p) { if (p.dataset.say) speak(p.dataset.say); tile(p); }
  });
  document.addEventListener('keydown', e => {
    if (!X || $('#overlay').hidden) return;
    if (/^[1-4]$/.test(e.key) && document.querySelector('.choice')) sel(+e.key - 1);
    if (e.key === 'Enter') { const b = $('#foot .btn.green:not([disabled]), #foot .btn.red'); if (b) b.click(); }
  });

  window.A = {
    route, sel, check, flip, grade, startMock, simPick, simNext, speedGo, speedAns,
    card: () => X && X.cards[X.i], /* read-only hook for automated tests */
    /* speaker buttons toggle: tap while reading = stop */
    readCard: () => document.body.classList.contains('speaking') ? stopVoice() : readCard(),
    readStep: () => document.body.classList.contains('speaking') ? stopVoice() : readStep(),
    readFb: () => document.body.classList.contains('speaking') ? stopVoice() : readEl($('.fb-txt')),
    setVoice: (lang, name) => { S.voice = Object.assign({}, S.voice, { [lang]: name || undefined }); save(); A.previewVoice(lang); },
    previewVoice: lang => {
      const sample = { en: `Hi ${S.name}, this is how questions will sound.`, es: `Hola ${S.name}, así sonarán las preguntas.`, he: 'שלום, בהצלחה במבחן' }[lang];
      if (lang === 'he') { const v = voiceFor('he'); if (!v) return play([{ he: 'בהצלחה' }]); stopVoice(); const tok = vtok; vq = []; document.body.classList.add('speaking'); return utter(sample, 'he', tok); }
      stopVoice(); const tok = vtok; document.body.classList.add('speaking'); utter(sample, lang, tok);
    },
    toggleAuto: b => { S.autoRead = !S.autoRead; save(); document.querySelectorAll('.autochip').forEach(x => { x.classList.toggle('on', S.autoRead); x.setAttribute('aria-pressed', S.autoRead); }); if (!S.autoRead) stopVoice(); else (X ? readCard : readStep)(); },
    testAudio: () => {
      loadVoices();
      const rep = (ok, label) => `<li class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'} ${label}</li>`;
      const vEn = voiceFor('en'), vEs = voiceFor('es'), vHe = voiceFor('he');
      $('#audiorep').innerHTML = rep(true, `${t('audioHe')} (${Object.keys(NX.audio).length})${vHe ? ` + ${vHe.name}` : ''}`)
        + rep(!!vEs, `Español: ${vEs ? vEs.name + ' ' + t('voiceFound') : t('voiceNone')}`) + rep(!!vEn, `English: ${vEn ? vEn.name + ' ' + t('voiceFound') : t('voiceNone')}`);
      play([{ he: 'שלום' }, ...segments(S.lang === 'es' ? `Hola ${S.name}, así suena la lectura en voz alta.` : `Hi ${S.name}, this is how read-aloud sounds.`, S.lang), { he: 'בהצלחה' }]);
    },
    cont: () => { SFX.tap(); advance(); },
    skip: () => { X.cards.push(X.cards[X.i]); X.i++; drawCard(); },
    quitAsk: () => { if (X.i === 0 || confirm(t('quitQ'))) closeSession(X.back || '#/'); },
    closeTo: h => closeSession(h),
    retrySession: () => { const o = X; session(o.cards.filter(c => !c.retried), { back: o.back, xpBase: o.xpBase, onEnd: o.onEnd, doneTitle: o.doneTitle }); },
    speedRestart: () => R.speed(),
    planTick: (k, v) => { S.plan[k] = v; if (v) { SFX.win(); confetti(); } touch(v ? 25 : 0); R.plan(); },
    setName: v => { S.name = v.trim() || 'Mary'; save(); route(); },
    setLang: l => { S.lang = l; save(); route(); },
    setOpt: (k, v) => { S[k] = v; save(); route(); },
    reset: () => { if (confirm(t('resetQ'))) { S = Object.assign({}, def, { lang: S.lang, name: S.name, planStart: today() }); save(); route(); } },
    backup: backupDownload, restore: backupRestore, share: shareProgress, qr: showQR,
    mergeImport: () => { if (!pendingImport) return; S = merge(S, pendingImport); pendingImport = null; save(); toast(t('imported'), 'party'); confetti(); location.hash = '#/'; },
    install: async () => { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice.catch(() => null); installEvt = null; refreshCloudBox(); },
    remindLater: () => { S.remindAfter = Date.now() + 864e5; save(); route(); },
    googleIn: async () => {
      const prov = new cloud.A_.GoogleAuthProvider(); prov.setCustomParameters({ prompt: 'select_account' });
      try { await cloud.A_.signInWithPopup(cloud.auth, prov); }
      catch (e) {
        if (/popup-blocked|operation-not-supported|web-storage-unsupported/.test(e.code || '')) { try { await cloud.A_.signInWithRedirect(cloud.auth, prov); return; } catch (e2) { e = e2; } }
        if (!/popup-closed-by-user|cancelled-popup-request/.test(e.code || '')) { cloud.err = authError(e); refreshCloudBox(); }
      }
    },
    emailIn: async email => {
      try { await cloud.A_.sendSignInLinkToEmail(cloud.auth, email, { url: location.origin + location.pathname, handleCodeInApp: true }); try { localStorage.setItem('lev.email', email); } catch (e) { /* storage blocked */ } toast(t('emailSent'), 'check'); }
      catch (e) { cloud.err = authError(e); refreshCloudBox(); }
    },
    syncNow: () => cloudPull(),
    signOut: async () => { await cloud.A_.signOut(cloud.auth); refreshCloudBox(); }
  };
  route();
  cloudInit();
  idb.get(KEY).then(v => {
    if (!v) { save(); return; }
    try {
      const d = JSON.parse(v);
      if ((d.updatedAt || 0) > (S.updatedAt || 0)) { S = merge(S, d); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } route(); }
      else if ((S.updatedAt || 0) > (d.updatedAt || 0)) idb.set(KEY, JSON.stringify(S)); /* the IndexedDB copy is behind: catch it up */
    } catch (e) { /* bad copy */ }
  });
  if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => p || navigator.storage.persist()).then(p => { persisted = !!p; refreshCloudBox(); }).catch(() => { /* not supported */ });
  if ('serviceWorker' in navigator && /^(https:|http:\/\/localhost)/.test(location.href)) navigator.serviceWorker.register('sw.js').catch(() => { /* offline support unavailable */ });
})();
