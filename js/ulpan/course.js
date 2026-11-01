/* Ulpan course map. Levels follow the Ministry of Education's 2017 adult curriculum (א, ב, ג, ד);
   א+ is Mary's class (end of Aleph). A lesson = teach cards + new words + a mix of exercise generators.
   teach: {k:'text'|'table'|'pattern'|'list'|'clock'|'suffix'}  mix: [generator, count, options] */
(() => {
window.UL = window.UL || {};
UL.levels = [
  { id: 'a', he: 'א', t: ['Aleph: foundations', 'Alef: bases'], d: ['Present tense, plurals, adjectives, infinitives, את', 'Presente, plurales, adjetivos, infinitivos, את'] },
  { id: 'a+', he: 'א+', t: ['Aleph+: your class', 'Alef+: tu clase'], d: ['Past tense in 5 binyanim, prepositions, questions, time, connectors, plurals → end-of-Aleph exam', 'Pasado en 5 binyanim, preposiciones, preguntas, la hora, conectores, plurales → examen de fin de Alef'] },
  { id: 'b', he: 'ב', t: ['Bet', 'Bet'], d: ['Future, imperative, possessives, smichut, complex sentences, health → end-of-Bet exam', 'Futuro, imperativo, posesivos, smijut, oraciones complejas, salud → examen de fin de Bet'] },
  { id: 'c', he: 'ג', t: ['Gimel', 'Guímel'], d: ['Passive binyanim, formal connectors, newspapers and texts', 'Binyanim pasivos, conectores formales, prensa y textos'], soon: true },
  { id: 'd', he: 'ד', t: ['Dalet → nurses\' Hebrew exam', 'Dálet → examen de hebreo para enfermeras'], d: ['The Ministry of Health requires the nurses\' Hebrew proficiency exam at level ד (65% to pass)', 'El Ministerio de Salud exige el examen de hebreo para enfermeras en nivel ד (65% para aprobar)'], soon: true }
];
/* small banks used by Aleph lessons: את or nothing; יש / אין */
UL.et = [['אני רואה _ הסרט החדש.', 'את'], ['אני רואה _ סרט חדש.', '—'], ['היא פוגשת _ דני בקניון.', 'את'], ['הוא קונה _ לחם וחלב.', '—'], ['הוא קונה _ הלחם בסופר.', 'את'],
  ['אנחנו מכירים _ המורה הזאת.', 'את'], ['את רוצה _ התפוח הזה?', 'את'], ['את רוצה _ תפוח?', '—'], ['אני אוהבת _ ירושלים.', 'את'], ['הם כותבים _ מכתב לאימא.', '—'], ['הם שולחים _ המכתב היום.', 'את']];
UL.have = [['_ לי אח ושתי אחיות.', 'יש', 'I have a brother and two sisters.', 'Tengo un hermano y dos hermanas.'], ['_ לי זמן היום, אני עסוקה.', 'אין', "I don't have time today, I'm busy.", 'Hoy no tengo tiempo, estoy ocupada.'],
  ['_ לך עט? אני צריכה לכתוב משהו.', 'יש', 'Do you have a pen? I need to write something.', '¿Tienes un bolígrafo? Necesito escribir algo.'], ['בבניין שלנו _ מעלית, אז הולכים במדרגות.', 'אין', 'There is no elevator in our building, so we take the stairs.', 'En nuestro edificio no hay ascensor, así que subimos por la escalera.'],
  ['_ בעיר הרבה מסעדות טובות.', 'יש', 'There are many good restaurants in the city.', 'En la ciudad hay muchos restaurantes buenos.'], ['לילדים _ סבלנות היום.', 'אין', "The children have no patience today.", 'Hoy los niños no tienen paciencia.']];
const W = s => s.split(' ').map(x => x.replace(/_/g, ' '));
UL.units = [
  /* ---------- Aleph foundations ---------- */
  { id: 'a1', lv: 'a', icon: 'mary', he: 'נעים מאוד!', t: ['Nice to meet you', 'Mucho gusto'],
    lessons: [
      { t: ['Me and my family', 'Yo y mi familia'], teach: [{ k: 'text', en: 'Hebrew has no "am/is/are" in the present: אני אחות = I (am a) nurse. Adjectives and verbs agree with the person: אני תלמיד (m), אני תלמידה (f).', es: 'En presente el hebreo no usa "ser/estar": אני אחות = (soy) enfermera. Adjetivos y verbos concuerdan: אני תלמיד (m), אני תלמידה (f).' },
        { k: 'list', items: [['אני', 'I', 'yo'], ['אתה / את', 'you m / f', 'tú m / f'], ['הוא / היא', 'he / she', 'él / ella'], ['אנחנו', 'we', 'nosotros'], ['אתם / אתן', 'you pl m / f', 'ustedes m / f'], ['הם / הן', 'they m / f', 'ellos / ellas']] }],
        words: W('משפחה אבא אימא אח אחות בעל ילד ילדה עולה_חדשה שפה'), mix: [['mean', 3], ['pairs', 1], ['qword', 2], ['have', 2], ['listen', 2]] },
      { t: ['Where are you from?', '¿De dónde eres?'], teach: [{ k: 'list', items: [['איפה?', 'where?', '¿dónde?'], ['מאיפה?', 'from where?', '¿de dónde?'], ['לאן?', 'where to?', '¿adónde?'], ['מי? מה?', 'who? what?', '¿quién? ¿qué?'], ['מתי? למה? איך?', 'when? why? how?', '¿cuándo? ¿por qué? ¿cómo?'], ['כמה?', 'how many / how much?', '¿cuánto?']] }],
        words: W('ארץ עיר רחוב דירה עברית ספרדית מקצוע עבודה'), mix: [['mean', 3], ['qword', 3], ['build', 2, { lv: 'a' }], ['pick', 2]] }] },
  { id: 'a2', lv: 'a', icon: 'speed', he: 'זמן הווה', t: ['Present tense', 'Presente'],
    lessons: [
      { t: ["Pa'al: כותב, כותבת", "Pa'al: כותב, כותבת"], teach: [{ k: 'table', verb: 'לכתוב', tense: 'pres' }, { k: 'text', en: "Present tense has 4 forms: masculine, feminine, masculine plural, feminine plural. Pa'al pattern: X-ו-X-X (כותב).", es: "El presente tiene 4 formas: masculino, femenino, masculino plural, femenino plural. Patrón pa'al: X-ו-X-X (כותב)." }],
        words: W('ספר מחברת שיעור כיתה מורה'), mix: [['pres', 6, { b: 'paal' }], ['mean', 2], ['listen', 2]] },
      { t: ["Pi'el, hif'il, hitpa'el, nif'al in the present", "Pi'el, hif'il, hitpa'el, nif'al en presente"], teach: [{ k: 'pattern', tense: 'pres' }],
        words: W('מטבח חדר חלון דלת מפתח'), mix: [['pres', 6], ['binyan', 2], ['pick', 2]] }] },
  { id: 'a3', lv: 'a', icon: 'gem', he: 'רבים ותארים', t: ['Plurals & adjectives', 'Plurales y adjetivos'],
    lessons: [
      { t: ['ים / ות, and the irregular ones', 'ים / ות, y los irregulares'], teach: [{ k: 'text', en: 'Most masculine nouns take ים (ספר → ספרים), most feminine take ות (מילה → מילים is an exception!). Learn irregular plurals as pairs: שולחן → שולחנות, אישה → נשים, שנה → שנים, עיר → ערים.', es: 'La mayoría de masculinos toman ים (ספר → ספרים), los femeninos ות (¡מילה → מילים es excepción!). Aprende los plurales irregulares en pares: שולחן → שולחנות, אישה → נשים, שנה → שנים, עיר → ערים.' }],
        words: W('שולחן כיסא מילה שנה עיר אישה'), mix: [['plnoun', 6], ['pairs', 1], ['mean', 2]] },
      { t: ['The adjective follows the noun', 'El adjetivo sigue al sustantivo'], teach: [{ k: 'text', en: 'Adjective after the noun, same gender and number: ירקות ירוקים, שנים חדשות (שנה is feminine, even with ים!). With ה on the noun, put ה on the adjective too: הבית הגדול.', es: 'El adjetivo va después del sustantivo, con mismo género y número: ירקות ירוקים, שנים חדשות (¡שנה es femenino aunque lleve ים!). Si el sustantivo lleva ה, el adjetivo también: הבית הגדול.' }],
        words: [], mix: [['agree', 8], ['plural', 2]] }] },
  { id: 'a4', lv: 'a', icon: 'target', he: 'שם הפועל', t: ['Infinitives: want, need, can', 'Infinitivo: querer, necesitar, poder'],
    lessons: [
      { t: ['רוצה / צריך / יכול + infinitive', 'רוצה / צריך / יכול + infinitivo'], teach: [{ k: 'pattern', tense: 'inf' }],
        words: W('עבודה מסעדה קולנוע ים מוזיקה'), mix: [['inf', 6], ['binyan', 2], ['listen', 2]] },
      { t: ['את before a definite object', 'את ante un objeto definido'], teach: [{ k: 'text', en: 'Use את before a definite direct object: the noun has ה, it is a name, or it has זה/הזאת/האלה. No ה → no את: אני רואה סרט / אני רואה את הסרט.', es: 'Usa את ante un objeto directo definido: lleva ה, es un nombre propio, o lleva זה/הזאת/האלה. Sin ה, sin את: אני רואה סרט / אני רואה את הסרט.' }],
        words: [], mix: [['et', 6], ['prep', 3, { lv: 'a', tag: 'prep' }], ['build', 2, { lv: 'a' }]] }] },
  /* ---------- Aleph+ (Mary's class) ---------- */
  { id: 'p1', lv: 'a+', icon: 'calendar', he: "עבר: בניין פעל", t: ["Past tense: pa'al", "Pasado: pa'al"],
    lessons: [
      { t: ['The past-tense endings', 'Las terminaciones del pasado'], teach: [{ k: 'table', verb: 'לכתוב', tense: 'past' }, { k: 'suffix' }],
        words: W('אתמול בשבוע_שעבר מכתב חדשות עיתון'), mix: [['past', 7, { b: 'paal' }], ['listen', 2]] },
      { t: ['Irregular pa\'al: קניתי, הלכתי, קמתי', "Pa'al irregular: קניתי, הלכתי, קמתי"], teach: [{ k: 'table', verb: 'לקנות', tense: 'past' }, { k: 'table', verb: 'לקום', tense: 'past' }],
        words: W('שוק סופר בשר ירק פרי'), mix: [['past', 8, { irr: true }], ['mean', 2]] },
      { t: ['Past tense in sentences', 'El pasado en frases'], teach: [], words: [], mix: [['past', 5, { b: 'paal', all: true }], ['build', 3, { lv: 'a' }], ['spell', 2]] }] },
  { id: 'p2', lv: 'a+', icon: 'books', he: "עבר: פיעל והפעיל", t: ["Past: pi'el & hif'il", "Pasado: pi'el y hif'il"],
    lessons: [
      { t: ["Pi'el: דיבר, סיפר, שילם", "Pi'el: דיבר, סיפר, שילם"], teach: [{ k: 'table', verb: 'לדבר', tense: 'past' }, { k: 'text', en: "Pi'el past: X-י-X-X. The י stays in every person: דיברתי, דיברה, דיברו.", es: "Pasado pi'el: X-י-X-X. La י se mantiene en todas las personas: דיברתי, דיברה, דיברו." }],
        words: W('חשבון מזומן כרטיס_אשראי מחיר'), mix: [['past', 8, { b: 'piel' }], ['listen', 2]] },
      { t: ["Hif'il: הזמין → הזמנתי", "Hif'il: הזמין → הזמנתי"], teach: [{ k: 'table', verb: 'להזמין', tense: 'past' }, { k: 'text', en: "Hif'il keeps the י only in הוא, היא and הם: הזמין, הזמינה, הזמינו. With תי/ת/נו/תם the י disappears: הזמנתי.", es: "Hif'il mantiene la י solo en הוא, היא y הם: הזמין, הזמינה, הזמינו. Con תי/ת/נו/תם la י desaparece: הזמנתי." }],
        words: W('מתנה חתונה יום_הולדת חג'), mix: [['past', 8, { b: 'hifil' }], ['binyan', 2]] },
      { t: ['Mix and check', 'Mezcla y comprueba'], teach: [], words: [], mix: [['past', 6, { bs: ['piel', 'hifil'] }], ['binyan', 2], ['spell', 2]] }] },
  { id: 'p3', lv: 'a+', icon: 'sparkles', he: "עבר: התפעל ונפעל", t: ["Past: hitpa'el & nif'al", "Pasado: hitpa'el y nif'al"], weak: ['hitinf', 'nifpast'],
    lessons: [
      { t: ["Hitpa'el: התלבשתי, התקשרנו", "Hitpa'el: התלבשתי, התקשרנו"], teach: [{ k: 'table', verb: 'להתלבש', tense: 'past' }, { k: 'text', en: "Infinitive always starts להת-: להתלבש, להתפלל (not לתפלל!). With ס/ש/צ the ת swaps: הסתכל, השתמש, הצטער.", es: "El infinitivo siempre empieza por להת-: להתלבש, להתפלל (¡no לתפלל!). Con ס/ש/צ la ת cambia de lugar: הסתכל, השתמש, הצטער." }],
        words: W('מקלחת בגד חולצה שמלה'), mix: [['past', 6, { b: 'hitpael' }], ['hitinf', 3], ['listen', 1]] },
      { t: ["Nif'al: נכנסתי, נפגשנו, נשארו", "Nif'al: נכנסתי, נפגשנו, נשארו"], teach: [{ k: 'table', verb: 'להיפגש', tense: 'past' }, { k: 'text', en: "Nif'al past starts with נ: נפגש, נפגשה, נפגשו. The infinitive has הי: להיפגש. Don't mix them: היפגשו is wrong, נפגשו is right.", es: "El pasado de nif'al empieza por נ: נפגש, נפגשה, נפגשו. El infinitivo lleva הי: להיפגש. No los mezcles: היפגשו está mal, נפגשו está bien." }],
        words: W('בית_קפה פארק חבר חברה'), mix: [['past', 5, { b: 'nifal' }], ['nifpast', 3], ['pres', 2, { b: 'nifal' }]] },
      { t: ['Five binyanim, one table', 'Cinco binyanim, una tabla'], teach: [{ k: 'pattern', tense: 'past' }], words: [], mix: [['binyan', 4], ['past', 6, { all: true }]] }] },
  { id: 'p4', lv: 'a+', icon: 'match', he: 'מילות יחס', t: ['Prepositions & verb partners', 'Preposiciones y verbos con preposición'], weak: ['gov'],
    lessons: [
      { t: ['ב, ל, מ, של, עם, אצל, על יד, בין, מול', 'ב, ל, מ, של, עם, אצל, על יד, בין, מול'], teach: [{ k: 'list', items: [['ב…', 'in, at, by (bus)', 'en'], ['ל…', 'to, for', 'a, para'], ['מ…', 'from', 'de, desde'], ['של', 'of (belonging)', 'de (posesión)'], ['עם', 'with', 'con'], ['אצל', "at someone's place", 'en casa de'], ['על יד / ליד', 'next to', 'al lado de'], ['בין … ובין', 'between', 'entre'], ['מול', 'opposite', 'frente a']] }],
        words: W('אצל על_יד בין מול עם של'), mix: [['prep', 8, { tag: 'prep' }], ['pairs', 1]] },
      { t: ['Verbs that bring their preposition', 'Verbos que traen su preposición'], teach: [{ k: 'list', items: [['לטפל ב…', 'take care of', 'cuidar a'], ['לעזור ל…', 'help', 'ayudar a'], ['להפריע ל…', 'disturb', 'molestar a'], ['לחכות ל…', 'wait for', 'esperar a'], ['להתקשר ל…', 'call (phone)', 'llamar a'], ['לחשוב על…', 'think about', 'pensar en'], ['להתחתן עם…', 'marry', 'casarse con'], ['לפחד מ…', 'be afraid of', 'tener miedo de'], ['לחזור הביתה', 'go back home', 'volver a casa']] }],
        words: [], mix: [['prep', 8, { tag: 'gov' }], ['build', 2, { lv: 'a' }]] },
      { t: ['Prepositions in the exam', 'Preposiciones en el examen'], teach: [], words: [], mix: [['prep', 10]] }] },
  { id: 'p5', lv: 'a+', icon: 'bulb', he: 'שאלות', t: ['Asking questions', 'Hacer preguntas'],
    lessons: [
      { t: ['Which question word?', '¿Qué palabra interrogativa?'], teach: [{ k: 'text', en: 'Look at the underlined part of the answer: a place → איפה; a direction (ל…) → לאן; from (מ…) → מאיפה; a person after ל → למי; after עם → עם מי; after את → את מי; after של → של מי; a time → מתי / באיזו שעה; a reason (כי) → למה.', es: 'Mira la parte subrayada: un lugar → איפה; una dirección (ל…) → לאן; desde (מ…) → מאיפה; persona tras ל → למי; tras עם → עם מי; tras את → את מי; tras של → של מי; un tiempo → מתי / באיזו שעה; una razón (כי) → למה.' }],
        words: W('איפה לאן מאיפה מתי למה כמה איך'), mix: [['qword', 6], ['pairs', 1]] },
      { t: ['Write the question (exam task)', 'Escribe la pregunta (tarea del examen)'], teach: [], words: [], mix: [['qword', 8], ['build', 2, { lv: 'a' }]] }] },
  { id: 'p6', lv: 'a+', icon: 'thermo', he: 'מה השעה?', t: ['Telling the time & my day', 'La hora y mi día'], weak: ['time'],
    lessons: [
      { t: ['Hours, quarter, half', 'Horas, cuarto, media'], teach: [{ k: 'clock' }, { k: 'list', items: [['שבע ורבע', '7:15', 'las siete y cuarto'], ['שבע וחצי', '7:30', 'las siete y media'], ['רבע לשמונה', '7:45', 'las ocho menos cuarto'], ['שבע ועשרה', '7:10', 'las siete y diez'], ['עשרים לשמונה', '7:40', 'las ocho menos veinte']] }],
        words: W('שעה דקה רבע חצי בוקר צהריים ערב לילה'), mix: [['time', 8], ['listen', 2]] },
      { t: ['בבוקר, בצהריים, אחר הצהריים, בערב, בלילה', 'בבוקר, בצהריים, אחר הצהריים, בערב, בלילה'], teach: [{ k: 'list', items: [['5:00–11:59', 'בבוקר', 'por la mañana'], ['12:00–13:59', 'בצהריים', 'al mediodía'], ['14:00–17:59', 'אחר הצהריים', 'por la tarde'], ['18:00–21:59', 'בערב', 'por la noche (temprano)'], ['22:00–4:59', 'בלילה', 'de noche']] }],
        words: W('מוקדם מאוחר בדרך_כלל לפעמים תמיד אף_פעם_לא'), mix: [['time', 8, { day: true }], ['mean', 2]] },
      { t: ['My daily routine', 'Mi rutina diaria'], teach: [], words: [], mix: [['time', 4, { day: true }], ['build', 4, { lv: 'a' }], ['spell', 2]] }] },
  { id: 'p7', lv: 'a+', icon: 'flash', he: 'מילות קישור', t: ['Connectors: כי, לכן, כדי, בגלל', 'Conectores: כי, לכן, כדי, בגלל'],
    lessons: [
      { t: ['Reason and result', 'Causa y consecuencia'], teach: [{ k: 'list', items: [['כי + sentence', 'because', 'porque'], ['בגלל + noun', 'because of', 'por, a causa de'], ['לכן', 'so, therefore', 'por eso'], ['כדי + infinitive', 'in order to', 'para'], ['אבל', 'but', 'pero']] }],
        words: W('כי בגלל לכן כדי אבל'), mix: [['link', 8], ['pairs', 1]] },
      { t: ['Time order', 'Orden en el tiempo'], teach: [{ k: 'list', items: [['אחרי + noun', 'after', 'después de'], ['אחרי ש + sentence', 'after (something happened)', 'después de que'], ['אחר כך', 'afterwards', 'después'], ['לפני (ש)', 'before', 'antes (de que)'], ['כאשר / כש…', 'when', 'cuando']] }],
        words: W('אחר_כך כאשר אחרי_ש לפני_ש'), mix: [['link', 10]] }] },
  { id: 'p8', lv: 'a+', icon: 'trophy', he: 'יחיד ורבים', t: ['Whole sentences in the plural', 'Frases completas en plural'], weak: ['agree'],
    lessons: [
      { t: ['Change every word that agrees', 'Cambia cada palabra que concuerda'], teach: [{ k: 'text', en: 'Exam task: make the whole sentence plural. Change the person (אני → אנחנו, לי → לנו), the noun, the adjective, the verb and זה/הזאת → האלה. Example: אין לי ספר → אין לנו ספרים.', es: 'Tarea del examen: pasa toda la frase al plural. Cambia la persona (אני → אנחנו, לי → לנו), el sustantivo, el adjetivo, el verbo y זה/הזאת → האלה. Ejemplo: אין לי ספר → אין לנו ספרים.' }],
        words: [], mix: [['plural', 6], ['agree', 4]] },
      { t: ['Vocabulary in context', 'Vocabulario en contexto'], teach: [], words: W('חופשה מלון טיול מפה כרטיס'), mix: [['voc', 6], ['plural', 4]] }] },
  /* ---------- Bet ---------- */
  { id: 'b1', lv: 'b', icon: 'calendar', he: "עתיד: בניין פעל", t: ["Future: pa'al", "Futuro: pa'al"],
    lessons: [
      { t: ['אכתוב, תכתוב, יכתוב…', 'אכתוב, תכתוב, יכתוב…'], teach: [{ k: 'table', verb: 'לכתוב', tense: 'fut' }, { k: 'text', en: 'Future = prefix (א, ת, י, נ) + stem + ending for את (י) and plural (ו). Pa\'al has two vowel types: אכתוב (o) and אלמד (a).', es: 'Futuro = prefijo (א, ת, י, נ) + raíz + terminación para את (י) y plural (ו). Pa\'al tiene dos tipos: אכתוב (o) y אלמד (a).' }],
        words: W('מחר בשבוע_הבא חופשה'), mix: [['fut', 8, { b: 'paal' }], ['listen', 2]] },
      { t: ['Irregular futures: אלך, אסע, אקנה', 'Futuros irregulares: אלך, אסע, אקנה'], teach: [{ k: 'table', verb: 'ללכת', tense: 'fut' }, { k: 'table', verb: 'לנסוע', tense: 'fut' }],
        words: [], mix: [['fut', 8, { irr: true }], ['build', 2, { lv: 'b' }]] }] },
  { id: 'b2', lv: 'b', icon: 'books', he: 'עתיד: שאר הבניינים', t: ['Future: the other binyanim', 'Futuro: los otros binyanim'],
    lessons: [
      { t: ["Pi'el & hif'il: אדבר, אזמין", "Pi'el y hif'il: אדבר, אזמין"], teach: [{ k: 'table', verb: 'לדבר', tense: 'fut' }, { k: 'table', verb: 'להזמין', tense: 'fut' }], words: [], mix: [['fut', 8, { bs: ['piel', 'hifil'] }]] },
      { t: ["Hitpa'el & nif'al: אתלבש, אכנס", "Hitpa'el y nif'al: אתלבש, אכנס"], teach: [{ k: 'table', verb: 'להתלבש', tense: 'fut' }, { k: 'table', verb: 'להיכנס', tense: 'fut' }], words: [], mix: [['fut', 8, { bs: ['hitpael', 'nifal'] }]] },
      { t: ['Past, present or future?', '¿Pasado, presente o futuro?'], teach: [], words: [], mix: [['tense', 8], ['cond', 2]] }] },
  { id: 'b3', lv: 'b', icon: 'speaker', he: 'ציווי', t: ['Imperative & אל + future', 'Imperativo y אל + futuro'],
    lessons: [
      { t: ['סגור! סגרי! סגרו!', 'סגור! סגרי! סגרו!'], teach: [{ k: 'table', verb: 'לסגור', tense: 'imp' }, { k: 'text', en: 'Imperative = future without the ת: תסגור → סגור. Negative commands use אל + future: אל תסגור, אל תשכחי!', es: 'Imperativo = futuro sin la ת: תסגור → סגור. Las órdenes negativas usan אל + futuro: אל תסגור, אל תשכחי!' }],
        words: [], mix: [['imp', 8]] },
      { t: ['At the clinic: instructions', 'En la clínica: instrucciones'], teach: [], words: W('תרופה מרשם תור בדיקה חום'), mix: [['imp', 4, { neg: true }], ['cond', 4], ['mean', 2]] }] },
  { id: 'b4', lv: 'b', icon: 'heart', he: 'שלי, לי, איתי', t: ['Mine, to me, with me', 'Mío, a mí, conmigo'],
    lessons: [
      { t: ['שלי, שלך, שלו…', 'שלי, שלך, שלו…'], teach: [{ k: 'list', items: [['שלי / לי / איתי / אותי', 'my / to me / with me / me', 'mío / a mí / conmigo / me'], ['שלך / לך / איתך / אותך', 'your (m)', 'tuyo (m)'], ['שלך / לך / איתך / אותך', 'your (f)', 'tuyo (f)'], ['שלו / לו / איתו / אותו', 'his / him', 'suyo (él)'], ['שלה / לה / איתה / אותה', 'her', 'suyo (ella)'], ['שלנו / לנו / איתנו / אותנו', 'our / us', 'nuestro'], ['שלהם / להם / איתם / אותם', 'their / them', 'suyo (ellos)']] }],
        words: [], mix: [['suffix', 8]] },
      { t: ['In conversation', 'En la conversación'], teach: [], words: [], mix: [['suffix', 6], ['build', 2, { lv: 'b' }]] }] },
  { id: 'b5', lv: 'b', icon: 'clipboard', he: 'סמיכות', t: ['Smichut: בית ספר, בית חולים', 'Smijut: בית ספר, בית חולים'],
    lessons: [
      { t: ['Two nouns, one idea', 'Dos sustantivos, una idea'], teach: [{ k: 'text', en: 'In smichut the first noun can change (בית → בתי in plural) and ה goes on the second noun only: בית הספר, בתי החולים.', es: 'En la smijut el primer sustantivo puede cambiar (בית → בתי en plural) y la ה va solo en el segundo: בית הספר, בתי החולים.' }],
        words: W('בית_חולים בית_ספר בית_מרקחת קופת_חולים'), mix: [['smichut', 8], ['mean', 2]] }] },
  { id: 'b6', lv: 'b', icon: 'star', he: 'משפטים מורכבים', t: ['If, so that, while, although', 'Si, para que, mientras, aunque'],
    lessons: [
      { t: ['אם + future', 'אם + futuro'], teach: [{ k: 'text', en: 'For the future, both parts take future: אם יהיה חם, נלך לים. כדי ש + future: כדי שכולם יבינו.', es: 'Para el futuro, ambas partes van en futuro: אם יהיה חם, נלך לים. כדי ש + futuro: כדי שכולם יבינו.' }],
        words: W('אם למרות_ש בזמן_ש עדיין'), mix: [['cond', 6], ['link', 4, { lv: 'b' }]] }] },
  { id: 'b7', lv: 'b', icon: 'steth', he: 'בריאות', t: ['Health & the clinic', 'Salud y la clínica'],
    lessons: [
      { t: ['At the doctor', 'En el médico'], teach: [], words: W('ראש בטן גב כאב חום חולה בריא תרופה'), mix: [['mean', 4], ['pairs', 1], ['imp', 3, { neg: true }], ['listen', 2]] },
      { t: ['Booking, pharmacy, instructions', 'Turnos, farmacia, instrucciones'], teach: [], words: W('קופת_חולים תור מרשם בדיקה בית_מרקחת'), mix: [['voc', 4], ['cond', 3], ['spell', 2]] }] }
];
})();
