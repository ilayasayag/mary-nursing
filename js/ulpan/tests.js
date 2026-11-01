/* Reading passages, writing tasks, the placement test and Mary's starting profile. */
window.UL = window.UL || {};

/* Mary's profile, read from her class test (11.10.26, 87.5) and homework photos, November 2026 */
UL.profile = {
  level: 'a+', score: 87.5,
  strong: [['Plural nouns with adjectives (ירקות ירוקים, שנים חדשות)', 'Plurales con adjetivos (ירקות ירוקים, שנים חדשות)'],
    ['Question words: באיזו שעה, למי, על מה, למה', 'Palabras interrogativas: באיזו שעה, למי, על מה, למה'],
    ['Past tense tables in all five binyanim', 'Tablas del pasado en los cinco binyanim'],
    ['Daily-routine writing with תמיד, לפעמים, בדרך כלל', 'Redacción sobre la rutina con תמיד, לפעמים, בדרך כלל']],
  weak: [['time', 'Telling the time: רבע לשתיים, minutes, בערב or בלילה', 'La hora: רבע לשתיים, los minutos, בערב o בלילה'],
    ['gov', 'Verbs with their preposition: מטפלת בכלבה, חוזרת הביתה', 'Verbos con su preposición: מטפלת בכלבה, חוזרת הביתה'],
    ['hitinf', 'Hitpa\'el infinitive: להתפלל (not לתפלל)', 'Infinitivo de hitpa\'el: להתפלל (no לתפלל)'],
    ['nifpast', 'Nif\'al past: נפגשו (not היפגשו)', 'Pasado de nif\'al: נפגשו (no היפגשו)'],
    ['read', 'Full answers in reading comprehension (all 3 things)', 'Respuestas completas en comprensión lectora (las 3 cosas)'],
    ['agree', 'Agreement in longer sentences: למקומות חדשים', 'Concordancia en frases largas: למקומות חדשים']]
};

/* reading passages. q: [type, question, options, answer(s), en, es]. type mc | tf | multi (pick all that apply) */
UL.reads = [
  { id: 'r-dana', lv: 'a', t: 'הבוקר של דנה', kind: 'story',
    text: 'דנה היא אחות בבית החולים "שיבא". בדרך כלל היא מתחילה את היום מוקדם מאוד: היא קמה בשעה חמש ורבע, מתקלחת ושותה כוס קפה עם חלב. היא לא אוכלת בבוקר, כי היא לא רעבה כל כך מוקדם. בשעה שש היא יוצאת מהבית ונוסעת לעבודה באוטובוס.\nבצהריים, בסביבות השעה אחת וחצי, היא אוכלת ארוחת צהריים עם האחיות במחלקה. בשעה שלוש היא גומרת את המשמרת וחוזרת הביתה. בערב היא מבשלת ארוחה קלה, מדברת בטלפון עם אימא שלה וקוראת ספר. כשהיא עייפה, היא הולכת לישון מוקדם.',
    q: [['mc', 'מה המקצוע של דנה?', ['אחות', 'רופאה', 'מורה', 'נהגת'], 0, "What is Dana's job?", '¿Cuál es la profesión de Dana?'],
      ['mc', 'למה דנה לא אוכלת בבוקר?', ['כי היא לא רעבה מוקדם', 'כי אין לה זמן', 'כי היא בדיאטה', 'כי היא אוכלת באוטובוס'], 0, "Why doesn't Dana eat in the morning?", '¿Por qué Dana no desayuna?'],
      ['tf', 'דנה נוסעת לעבודה ברכבת.', ['נכון', 'לא נכון'], 1, 'Dana goes to work by train.', 'Dana va al trabajo en tren.'],
      ['multi', 'מה דנה עושה בערב? (3 דברים)', ['מבשלת ארוחה קלה', 'מדברת עם אימא שלה', 'קוראת ספר', 'רואה סרט', 'הולכת לים', 'עובדת במחלקה'], [0, 1, 2], 'What does Dana do in the evening? (3 things)', '¿Qué hace Dana por la noche? (3 cosas)']] },
  { id: 'r-party', lv: 'a', t: 'מסיבת סוף אולפן', kind: 'notice',
    text: 'תלמידים יקרים,\nביום חמישי, 26.11, בשעה 17:00, תתקיים מסיבת סוף האולפן.\nהמסיבה תהיה בחדר הגדול בקומה השנייה.\nכל תלמיד מביא מאכל מהארץ שלו.\nהכניסה חינם. אפשר להזמין בני משפחה.\nבתוכנית: שירים בעברית, ריקודים ותעודות.\nנתראה!',
    q: [['mc', 'מתי המסיבה?', ['ביום חמישי בחמש אחרי הצהריים', 'ביום שישי בחמש אחרי הצהריים', 'ביום חמישי בשבע בערב', 'ביום ראשון בחמש בערב'], 0, 'When is the party?', '¿Cuándo es la fiesta?'],
      ['mc', 'איפה המסיבה?', ['בחדר הגדול בקומה השנייה', 'בכיתה בקומה הראשונה', 'בפארק', 'במסעדה'], 0, 'Where is the party?', '¿Dónde es la fiesta?'],
      ['mc', 'מה כל תלמיד מביא?', ['מאכל מהארץ שלו', 'מתנה למורה', 'עשרים שקלים', 'מחברת ועט'], 0, 'What does each student bring?', '¿Qué lleva cada alumno?'],
      ['tf', 'צריך לשלם כדי להיכנס למסיבה.', ['נכון', 'לא נכון'], 1, 'You have to pay to get in.', 'Hay que pagar para entrar.']] },
  { id: 'r-flat', lv: 'a', t: 'דירה חדשה', kind: 'story',
    text: 'לפני חודש יוסי ונועה עברו לדירה חדשה בחיפה. הדירה גדולה ויפה: יש בה שלושה חדרים, מטבח גדול ומרפסת עם נוף לים. אבל יש בעיה אחת: הדירה בקומה החמישית ואין בבניין מעלית.\nבהתחלה זה היה קשה, במיוחד כשהם קנו רהיטים חדשים. השכנים עזרו להם להעלות את הספה ואת המקרר במדרגות. עכשיו יוסי ונועה אומרים שהמדרגות טובות לבריאות, ושהם לא צריכים ללכת לחדר כושר.',
    q: [['mc', 'מתי יוסי ונועה עברו לדירה?', ['לפני חודש', 'לפני שנה', 'בשבוע שעבר', 'אתמול'], 0, 'When did they move?', '¿Cuándo se mudaron?'],
      ['mc', 'מה הבעיה בדירה?', ['אין מעלית', 'אין מטבח', 'אין מרפסת', 'היא קטנה מדי'], 0, 'What is the problem with the apartment?', '¿Cuál es el problema del apartamento?'],
      ['mc', 'מי עזר להם להעלות את הספה?', ['השכנים', 'ההורים', 'בעל הבית', 'החברים מהעבודה'], 0, 'Who helped them carry the sofa?', '¿Quién les ayudó a subir el sofá?'],
      ['tf', 'יוסי ונועה הולכים כל יום לחדר כושר.', ['נכון', 'לא נכון'], 1, 'They go to the gym every day.', 'Van al gimnasio todos los días.']] },
  { id: 'r-kupa', lv: 'a', t: 'הודעה מקופת החולים', kind: 'notice',
    text: 'לקוחות יקרים,\nבשבוע הבא, מיום ראשון עד יום חמישי, יתקיים במרפאה מבצע חיסונים נגד שפעת.\nשעות: בבוקר 8:00–12:00, אחר הצהריים 16:00–19:00.\nהחיסון חינם לכל חברי קופת החולים.\nאין צורך לקבוע תור.\nיש להביא תעודה מזהה.\nבריאות טובה!',
    q: [['mc', 'מה יש במרפאה בשבוע הבא?', ['חיסונים נגד שפעת', 'בדיקות דם', 'שיעור עברית', 'מבצע בבית המרקחת'], 0, 'What is happening next week?', '¿Qué hay la semana que viene?'],
      ['mc', 'כמה עולה החיסון?', ['הוא חינם', '20 שקלים', '50 שקלים', 'זה לא כתוב'], 0, 'How much is the vaccine?', '¿Cuánto cuesta la vacuna?'],
      ['tf', 'צריך לקבוע תור לפני שבאים.', ['נכון', 'לא נכון'], 1, 'You need an appointment.', 'Hay que pedir turno.'],
      ['mc', 'מה צריך להביא?', ['תעודה מזהה', 'מרשם מהרופא', 'כסף מזומן', 'תמונה עדכנית'], 0, 'What do you need to bring?', '¿Qué hay que llevar?']] },
  { id: 'r-heat', lv: 'b', t: 'שומרים על הבריאות בקיץ', kind: 'story',
    text: 'בקיץ בישראל חם מאוד, ולפעמים הטמפרטורה מגיעה ל-40 מעלות. משרד הבריאות ממליץ לשתות הרבה מים, גם כשלא מרגישים צמא, כי הגוף מאבד נוזלים בזמן החום.\nחשוב לא לשהות בשמש בין השעות 11:00 ל-16:00, ואם יוצאים מהבית, כדאי ללבוש בגדים בהירים ולשים כובע. אנשים מבוגרים וילדים קטנים צריכים להיזהר במיוחד, כי הגוף שלהם רגיש יותר.\nמי שמרגיש סחרחורת, כאב ראש או חולשה צריך לנוח במקום קריר, לשתות מים, ואם המצב לא משתפר — לפנות לרופא.',
    q: [['mc', 'למה צריך לשתות הרבה מים בקיץ?', ['כי הגוף מאבד נוזלים', 'כי המים זולים', 'כי אין מה לאכול', 'כי הרופאים אוהבים מים'], 0, 'Why drink a lot of water in summer?', '¿Por qué beber mucha agua en verano?'],
      ['tf', 'מומלץ לצאת לשמש בשעה 13:00.', ['נכון', 'לא נכון'], 1, 'It is recommended to go out in the sun at 13:00.', 'Se recomienda salir al sol a las 13:00.'],
      ['multi', 'מי צריך להיזהר במיוחד? (2)', ['אנשים מבוגרים', 'ילדים קטנים', 'ספורטאים', 'מורים'], [0, 1], 'Who must be especially careful? (2)', '¿Quién debe tener especial cuidado? (2)'],
      ['mc', 'מה עושים כשמרגישים סחרחורת?', ['נחים במקום קריר ושותים מים', 'יוצאים לשמש כדי להתחמם', 'אוכלים ארוחה גדולה ושוכבים', 'עושים ספורט קל בחוץ'], 0, 'What do you do if you feel dizzy?', '¿Qué se hace si uno se marea?']] },
  { id: 'r-job', lv: 'b', t: 'עבודה ראשונה בישראל', kind: 'story',
    text: 'קרלוס עלה לארץ מארגנטינה לפני שנה. בארגנטינה הוא עבד עשר שנים כאח בחדר מיון. כשהגיע לישראל, הוא למד חמישה חודשים באולפן ועבר את מבחן הרישוי של משרד הבריאות.\nבשבוע הבא הוא יתחיל לעבוד בבית חולים בבאר שבע. בהתחלה הוא יעבוד במשמרות בוקר, ואחרי חודשיים יתחיל לעבוד גם בלילות. קרלוס קצת מתרגש, כי הוא עדיין לא מדבר עברית מצוין. "אני אמשיך ללמוד עברית בערב," הוא אומר, "כי אני רוצה להבין כל מילה שהחולים אומרים לי."',
    q: [['mc', 'איפה קרלוס עבד בארגנטינה?', ['בחדר מיון', 'במרפאה', 'בבית ספר', 'בבית מרקחת'], 0, 'Where did Carlos work in Argentina?', '¿Dónde trabajaba Carlos en Argentina?'],
      ['mc', 'מתי קרלוס יתחיל לעבוד?', ['בשבוע הבא', 'לפני שנה', 'אחרי חודשיים', 'מחר'], 0, 'When will Carlos start working?', '¿Cuándo empezará a trabajar Carlos?'],
      ['tf', 'בהתחלה קרלוס יעבוד בלילות.', ['נכון', 'לא נכון'], 1, 'At first Carlos will work nights.', 'Al principio Carlos trabajará de noche.'],
      ['mc', 'למה קרלוס ימשיך ללמוד עברית?', ['כדי להבין את החולים', 'כי הוא נכשל במבחן', 'כי הוא אוהב ללמוד בערב', 'כדי לעבור לגור בבאר שבע'], 0, 'Why will Carlos keep studying Hebrew?', '¿Por qué seguirá Carlos estudiando hebreo?']] }
];

/* writing tasks (exam part 3): 6-8 lines. checks are looked for in her text; model shows a good answer */
UL.writes = [
  { id: 'w-day', lv: 'a', t: ['My daily routine', 'Mi rutina diaria'], he: 'כתבו 6–8 משפטים על סדר היום שלכם. השתמשו במילות זמן (בבוקר, בצהריים, בערב, בדרך כלל, לפעמים).',
    checks: [['בבוקר|בצהריים|בערב|בלילה|אחר הצהריים', 'parts of the day', 'partes del día'], ['בדרך כלל|לפעמים|תמיד|אף פעם', 'how often', 'frecuencia'], ['בשעה|ורבע|וחצי|רבע ל', 'a time', 'una hora'], ['אחר כך|אחרי|לפני|ואז', 'order words', 'palabras de orden']],
    model: 'בדרך כלל אני קמה בשש וחצי בבוקר. אני מתקלחת ושותה קפה עם חלב. בשבע ורבע אני מטיילת עם הכלבה שלי בפארק. אחר כך אני הולכת לאולפן ברגל. בצהריים אני חוזרת הביתה ואוכלת ארוחת צהריים. אחרי הצהריים אני כותבת שיעורי בית. לפעמים אני נפגשת עם חברות בבית קפה. בערב אני מדברת בטלפון עם המשפחה שלי בוונצואלה.' },
  { id: 'w-gift', lv: 'a', t: ['I love buying gifts', 'Me encanta comprar regalos'], he: '"אני אוהבת לקנות מתנות". כתבו למי אתם אוהבים לקנות מתנה, אילו מתנות ואיפה אתם קונים.',
    checks: [['ל[א-ת]+|לאימא|לחברה|למשפחה', 'for whom', 'para quién'], ['קונה|קניתי|לקנות', 'the verb לקנות', 'el verbo לקנות'], ['ב[א-ת]+|בקניון|בשוק|באינטרנט', 'where', 'dónde'], ['כי|בגלל', 'a reason', 'una razón']],
    model: 'אני אוהבת מאוד לקנות מתנות. בדרך כלל אני קונה מתנות למשפחה שלי ולחברות שלי. לאימא שלי אני קונה פרחים או ספר טוב, כי היא אוהבת לקרוא. לחברה הכי טובה שלי אני קונה בגדים או תכשיטים. אני קונה מתנות בקניון או בשוק, ולפעמים באינטרנט. בחודש שעבר קניתי לאחי שעון חדש ליום ההולדת שלו. הוא שמח מאוד!' },
  { id: 'w-season', lv: 'a', t: ['Summer or winter?', '¿Verano o invierno?'], he: '"קיץ או חורף": איזו עונה אתם אוהבים יותר? כתבו למה, מה מזג האוויר ומה אתם אוהבים לעשות בעונה הזאת.',
    checks: [['קיץ|חורף|אביב|סתיו', 'a season', 'una estación'], ['כי|בגלל', 'a reason', 'una razón'], ['חם|קר|גשם|שמש|מזג האוויר', 'the weather', 'el clima'], ['אוהבת|אוהב|ללכת|לשחות|לטייל', 'what you like to do', 'lo que te gusta hacer']],
    model: 'אני אוהבת את הקיץ יותר מהחורף. בקיץ חם ויש שמש כל יום, ואני לא אוהבת קור. בקיץ אני הולכת לים עם חברים ושוחה הרבה. בערב אנחנו יושבים בבית קפה על יד הים ואוכלים גלידה. בקראקס מזג האוויר נעים כל השנה, לכן אני אוהבת ימים חמים. בחורף יש הרבה גשם, ואני נשארת בבית וקוראת ספר.' },
  { id: 'w-weekend', lv: 'a', t: ['Last weekend (past tense)', 'El fin de semana pasado (pasado)'], he: 'כתבו 6–8 משפטים: מה עשיתם בסוף השבוע שעבר? (בזמן עבר)',
    checks: [['תי |נו |תי\\.|נו\\.|תי,|נו,', 'past tense verbs (…תי / …נו)', 'verbos en pasado (…תי / …נו)'], ['ביום שישי|בשבת|בסוף השבוע', 'which day', 'qué día'], ['עם', 'with whom', 'con quién'], ['אחר כך|אחרי|ואז|בערב', 'order words', 'palabras de orden']],
    model: 'ביום שישי בבוקר קמתי מאוחר. אחר כך הלכתי לשוק וקניתי ירקות ופירות טריים. בצהריים בישלתי ארוחה ואכלתי עם השכנה שלי. בערב נסענו לתל אביב וישבנו בבית קפה על יד הים. בשבת נשארתי בבית, נחתי וכתבתי שיעורי בית. בערב התקשרתי לאימא שלי ודיברנו שעה.' },
  { id: 'w-plans', lv: 'b', t: ['My plans for next year (future)', 'Mis planes para el año que viene (futuro)'], he: 'כתבו 6–8 משפטים: מה תעשו בשנה הבאה? (בזמן עתיד)',
    checks: [['אעבוד|אלמד|אגור|אסע|אתחיל|אמשיך|נ[א-ת]+', 'future verbs (א… / נ…)', 'verbos en futuro (א… / נ…)'], ['בשנה הבאה|בעתיד|בשבוע הבא|אחרי', 'future time words', 'palabras de tiempo futuro'], ['כדי|כי|אם', 'reason or condition', 'razón o condición'], ['עבודה|אולפן|דירה|בית חולים', 'work or study', 'trabajo o estudio']],
    model: 'בשנה הבאה אני אגמור את האולפן ואתחיל לעבוד כאחות בבית חולים. אם אעבור את מבחן הרישוי, אחפש עבודה במחלקה פנימית. אני אמשיך ללמוד עברית בערב, כדי לדבר עם החולים בלי בעיות. אולי נעבור לדירה גדולה יותר. בקיץ ניסע לטייל בצפון. אני אזמין את אימא שלי לבקר אותי בישראל.' },
  { id: 'w-letter', lv: 'b', t: ['A letter to the landlord', 'Una carta al casero'], he: 'כתבו מכתב לבעל הבית: יש בעיה בדירה. ספרו מה הבעיה, ממתי, ובקשו שיתקן.',
    checks: [['שלום|לכבוד', 'a greeting', 'un saludo'], ['בעיה|לא עובד|שבור', 'the problem', 'el problema'], ['מ[א-ת]+|כבר|לפני', 'since when', 'desde cuándo'], ['אבקש|בבקשה|אפשר|תוכל', 'a polite request', 'una petición cortés']],
    model: 'שלום משה,\nאני כותבת לך כי יש לנו בעיה בדירה. כבר שלושה ימים אין מים חמים, והדוד לא עובד. ניסינו להדליק אותו כמה פעמים, אבל זה לא עזר. אנחנו לא יכולים להתקלח, וזה קשה מאוד, במיוחד בחורף. אבקש ממך לשלוח טכנאי השבוע. אם לא נהיה בבית, המפתח יהיה אצל השכנה רינה.\nתודה רבה,\nמרי' }
];

/* placement: 3 stages. [skill, sentence/question, correct, 3 distractors, en, es] */
UL.placeRows = {
  a: [['pres', 'החברות שלי _ רדיו כל ערב.', 'שומעות', 'שומעים,לשמוע,שומעת', 'My friends listen to the radio every evening.', 'Mis amigas escuchan la radio cada noche.'],
    ['inf', 'כדאי _ חם היום, כי קר בחוץ.', 'להתלבש', 'מתלבשות,מתלבש,התלבש', "It's worth dressing warmly today, it's cold outside.", 'Conviene abrigarse hoy, hace frío afuera.'],
    ['agree', 'קנינו פירות _ בשוק.', 'טריים', 'טרי,טריות,טרייה', 'We bought fresh fruit at the market.', 'Compramos fruta fresca en el mercado.'],
    ['plural', 'בחדר יש שלושה _.', 'חלונות', 'חלונים,חלונה,חלון', 'There are three windows in the room.', 'En la habitación hay tres ventanas.'],
    ['et', 'אני אוהבת _ האוכל הישראלי.', 'את', 'ל,ב,של', 'I love Israeli food.', 'Me encanta la comida israelí.'],
    ['prep', 'היא נוסעת לעבודה _אוטובוס.', 'ב', 'ל,מ,של', 'She goes to work by bus.', 'Va al trabajo en autobús.'],
    ['qword', '_ את גרה? — אני גרה בחיפה.', 'איפה', 'לאן,מאיפה,מתי', 'Where do you live? — In Haifa.', '¿Dónde vives? — En Haifa.'],
    ['have', '_ לי זמן היום, אני עסוקה מאוד.', 'אין', 'לא,יש,אני', "I don't have time today, I'm very busy.", 'Hoy no tengo tiempo, estoy muy ocupada.']],
  ap: [['paal', 'אתמול אנחנו _ את העבודה מאוחר. (לגמור)', 'גמרנו', 'גמרו,גומרים,נגמור', 'Yesterday we finished the work late.', 'Ayer terminamos el trabajo tarde.'],
    ['piel', 'הם _ עם המורה אחרי השיעור. (לדבר)', 'דיברו', 'דיברנו,מדברים,לדבר', 'They spoke with the teacher after class.', 'Hablaron con la profesora después de clase.'],
    ['hifil', 'היא _ פיצה הביתה. (להזמין)', 'הזמינה', 'הזמנתי,מזמינה,הזמינו', 'She ordered pizza home.', 'Pidió pizza a casa.'],
    ['hitpael', 'דינה ודני _ בקיץ שעבר. (להתחתן)', 'התחתנו', 'מתחתנים,התחתנה,התחתנתם', 'Dina and Danny got married last summer.', 'Dina y Danny se casaron el verano pasado.'],
    ['nifpast', 'החברים _ בבית קפה בשבת. (להיפגש)', 'נפגשו', 'היפגשו,נפגשים,נפגשנו', 'The friends met at a café on Saturday.', 'Los amigos se reunieron en un café el sábado.'],
    ['hitinf', 'הם רוצים _ בבית הכנסת. (פלל)', 'להתפלל', 'לתפלל,להיתפלל,התפללו', 'They want to pray at the synagogue.', 'Quieren rezar en la sinagoga.'],
    ['gov', 'אני מטפלת _כלבה שלי כל בוקר.', 'ב', 'ל,את,על', 'I take care of my dog every morning.', 'Cuido a mi perra cada mañana.'],
    ['gov', 'אחרי העבודה אני חוזרת _.', 'הביתה', 'את הבית,לבית שלי את,מהבית', 'After work I go back home.', 'Después del trabajo vuelvo a casa.'],
    ['time', '13:45 — השעה _ בצהריים.', 'רבע לשתיים', 'רבע דקות לשתיים,אחת ורבע,שתיים ורבע', "It's a quarter to two in the afternoon.", 'Son las dos menos cuarto de la tarde.'],
    ['time', '21:05 — השעה _.', 'תשע וחמש בערב', 'תשע וחמש בבוקר,חמש ותשע בערב,תשע וחמישים בערב', "It's five past nine in the evening.", 'Son las nueve y cinco de la noche.'],
    ['link', 'הלכתי לבנק _ לפתוח חשבון.', 'כדי', 'כי,לכן,אבל', 'I went to the bank to open an account.', 'Fui al banco para abrir una cuenta.'],
    ['link', 'לא יצאנו לטיול _ הגשם.', 'בגלל', 'כי,לכן,כדי', "We didn't go out because of the rain.", 'No salimos por la lluvia.']],
  b: [['fut', 'מחר אני _ לירושלים. (לנסוע)', 'אסע', 'נסעתי,נוסעת,תיסע', 'Tomorrow I will travel to Jerusalem.', 'Mañana viajaré a Jerusalén.'],
    ['fut', 'בשבוע הבא הם _ דירה חדשה. (לחפש)', 'יחפשו', 'חיפשו,מחפשים,נחפש', 'Next week they will look for a new apartment.', 'La semana que viene buscarán un apartamento nuevo.'],
    ['imp', 'דני, _ את הדלת, בבקשה! (לסגור)', 'סגור', 'סגרת,סוגר,תסגרי', 'Danny, close the door, please!', '¡Danny, cierra la puerta, por favor!'],
    ['imp', 'אל _ את המפתח! (לשכוח, את)', 'תשכחי', 'שכחי,שכחת,לשכוח', "Don't forget the key!", '¡No olvides la llave!'],
    ['suffix', 'דני, אני רוצה לדבר _.', 'איתך', 'אותך,לך,שלך', 'Danny, I want to talk with you.', 'Danny, quiero hablar contigo.'],
    ['smichut', 'יש בעיר שלנו שלושה _.', 'בתי ספר', 'בתים ספר,בית ספרים,בתי ספרים', 'There are three schools in our city.', 'Hay tres escuelas en nuestra ciudad.'],
    ['cond', 'אם יהיה חם מחר, אנחנו _ לים.', 'נלך', 'הלכנו,הולכים,ללכת', "If it's hot tomorrow, we'll go to the beach.", 'Si mañana hace calor, iremos a la playa.'],
    ['cond', 'אני מדברת לאט כדי שכולם _.', 'יבינו', 'הבינו,מבינים,להבין', 'I speak slowly so that everyone understands.', 'Hablo despacio para que todos entiendan.']]
};
UL.skills = {
  pres: ['Present tense', 'Presente'], inf: ['Infinitive', 'Infinitivo'], agree: ['Adjective agreement', 'Concordancia'], plural: ['Plurals', 'Plurales'], et: ['את (direct object)', 'את (objeto directo)'],
  prep: ['Prepositions', 'Preposiciones'], qword: ['Question words', 'Interrogativos'], have: ['יש / אין', 'יש / אין'], paal: ["Past: pa'al", "Pasado: pa'al"], piel: ["Past: pi'el", "Pasado: pi'el"],
  hifil: ["Past: hif'il", "Pasado: hif'il"], hitpael: ["Past: hitpa'el", "Pasado: hitpa'el"], nifpast: ["Past: nif'al", "Pasado: nif'al"], hitinf: ["Hitpa'el infinitive", "Infinitivo hitpa'el"],
  gov: ['Verb + preposition', 'Verbo + preposición'], time: ['Telling the time', 'La hora'], link: ['Connectors', 'Conectores'], fut: ['Future', 'Futuro'], imp: ['Imperative', 'Imperativo'],
  suffix: ['Mine, with you…', 'Posesivos, contigo…'], smichut: ['Smichut', 'Smijut'], cond: ['If / so that', 'Si / para que'], read: ['Reading', 'Lectura'], write: ['Writing', 'Escritura'], vocab: ['Vocabulary', 'Vocabulario']
};
