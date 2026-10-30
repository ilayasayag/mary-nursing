NX.addModule({
  id: 'heb', icon: '🇮🇱',
  t: ['Medical Hebrew Starter', 'Hebreo médico inicial'],
  b: ['Alphabet, numbers, body, symptoms and the phrases you need at the bedside. Start here and keep a little of it every day.',
      'Alfabeto, números, cuerpo, síntomas y las frases del lado de la cama. Empieza aquí y repasa un poco cada día.'],
  exam: 'Hebrew proficiency (separate from the exam)',
  lessons: [
    { t: ['The alphabet (alef-bet)', 'El alfabeto (alef-bet)'], alpha: true,
      p: [
        ['Hebrew is read right to left. There are 22 letters, no capitals, and 5 letters change shape at the end of a word (ך ם ן ף ץ).', 'El hebreo se lee de derecha a izquierda. Hay 22 letras, sin mayúsculas, y 5 letras cambian de forma al final de la palabra (ך ם ן ף ץ).'],
        ['Most texts leave out the vowel dots (niqqud), so you learn words as shapes. Exam text and patient forms are written this way.', 'La mayoría de los textos omiten los puntos de vocales (niqqud), así que aprendes las palabras como formas. El examen y los formularios se escriben así.'],
        ['Some letters have two sounds: ב b/v, כ k/ch, פ p/f. ש is sh or s depending on the dot.', 'Algunas letras tienen dos sonidos: ב b/v, כ k/ch, פ p/f. ש es sh o s según el punto.']
      ],
      v: [
        ['Letter alef – silent / “a”', 'Letra alef – muda / “a”', 'א', 'alef'], ['Letter bet – b / v', 'Letra bet – b / v', 'ב', 'bet'],
        ['Letter gimel – g', 'Letra guimel – g', 'ג', 'gimel'], ['Letter dalet – d', 'Letra dalet – d', 'ד', 'dalet'],
        ['Letter hey – h', 'Letra hei – h', 'ה', 'hey'], ['Letter vav – v / o / u', 'Letra vav – v / o / u', 'ו', 'vav'],
        ['Letter zayin – z', 'Letra zain – z', 'ז', 'zayin'], ['Letter chet – ch (like “Bach”)', 'Letra jet – j fuerte', 'ח', 'chet'],
        ['Letter tet – t', 'Letra tet – t', 'ט', 'tet'], ['Letter yod – y / i', 'Letra yod – y / i', 'י', 'yod'],
        ['Letter kaf – k / ch', 'Letra kaf – k / j', 'כ', 'kaf'], ['Letter lamed – l', 'Letra lámed – l', 'ל', 'lamed'],
        ['Letter mem – m', 'Letra mem – m', 'מ', 'mem'], ['Letter nun – n', 'Letra nun – n', 'נ', 'nun'],
        ['Letter samech – s', 'Letra sámej – s', 'ס', 'samech'], ['Letter ayin – silent / “a”', 'Letra ayin – muda / “a”', 'ע', 'ayin'],
        ['Letter pey – p / f', 'Letra pei – p / f', 'פ', 'pey'], ['Letter tsadi – ts', 'Letra tsadi – ts', 'צ', 'tsadi'],
        ['Letter kuf – k', 'Letra kuf – k', 'ק', 'kuf'], ['Letter resh – r (throaty)', 'Letra resh – r (gutural)', 'ר', 'resh'],
        ['Letter shin – sh / s', 'Letra shin – sh / s', 'ש', 'shin'], ['Letter tav – t', 'Letra tav – t', 'ת', 'tav']
      ] },
    { t: ['Numbers, doses and times', 'Números, dosis y horarios'],
      p: [
        ['You will meet numbers in doses, vital signs and pain scores. Learn 0-10 first.', 'Verás números en dosis, signos vitales y escalas de dolor. Aprende primero del 0 al 10.'],
        ['Pain scale in Hebrew: “[[from zero to ten|מאפס עד עשר|me-efes ad eser]]”.', 'Escala de dolor en hebreo: “[[de cero a diez|מאפס עד עשר|me-efes ad eser]]”.']
      ],
      v: [
        ['zero', 'cero', 'אפס', 'efes'], ['one', 'uno', 'אחת', 'achat'], ['two', 'dos', 'שתיים', 'shtayim'], ['three', 'tres', 'שלוש', 'shalosh'],
        ['four', 'cuatro', 'ארבע', 'arba'], ['five', 'cinco', 'חמש', 'chamesh'], ['six', 'seis', 'שש', 'shesh'], ['seven', 'siete', 'שבע', 'sheva'],
        ['eight', 'ocho', 'שמונה', 'shmone'], ['nine', 'nueve', 'תשע', 'tesha'], ['ten', 'diez', 'עשר', 'eser'],
        ['times a day', 'veces al día', 'פעמים ביום', 'pa’amim ba-yom'], ['before meals', 'antes de las comidas', 'לפני האוכל', 'lifnei ha-ochel'],
        ['after meals', 'después de las comidas', 'אחרי האוכל', 'acharei ha-ochel'], ['in the morning', 'por la mañana', 'בבוקר', 'ba-boker'],
        ['at night', 'por la noche', 'בלילה', 'ba-laila'], ['every eight hours', 'cada ocho horas', 'כל שמונה שעות', 'kol shmone sha’ot']
      ] },
    { t: ['The body', 'El cuerpo'],
      p: [
        ['Body words are the base of every assessment. Notice that many are feminine and end in -a.', 'Las partes del cuerpo son la base de toda valoración. Muchas son femeninas y terminan en -a.'],
        ['Tip: say each word out loud while you touch the body part. Use the speaker button on flashcards.', 'Truco: di cada palabra en voz alta mientras tocas esa parte del cuerpo. Usa el altavoz en las tarjetas.']
      ],
      v: [
        ['heart', 'corazón', 'לב', 'lev'], ['lung', 'pulmón', 'ריאה', 're’a'], ['liver', 'hígado', 'כבד', 'kaved'], ['kidney', 'riñón', 'כליה', 'kilya'],
        ['stomach', 'estómago', 'קיבה', 'keiva'], ['brain', 'cerebro', 'מוח', 'moach'], ['blood', 'sangre', 'דם', 'dam'], ['bone', 'hueso', 'עצם', 'etzem'],
        ['skin', 'piel', 'עור', 'or'], ['head', 'cabeza', 'ראש', 'rosh'], ['chest', 'pecho', 'חזה', 'chaze'], ['abdomen / belly', 'abdomen / vientre', 'בטן', 'beten'],
        ['back', 'espalda', 'גב', 'gav'], ['leg / foot', 'pierna / pie', 'רגל', 'regel'], ['hand', 'mano', 'יד', 'yad'], ['arm', 'brazo', 'זרוע', 'zro’a'],
        ['eye', 'ojo', 'עין', 'ayin'], ['ear', 'oreja / oído', 'אוזן', 'ozen'], ['throat', 'garganta', 'גרון', 'garon'], ['urinary bladder', 'vejiga', 'שלפוחית השתן', 'shalpuchit ha-sheten']
      ] },
    { t: ['Symptoms and pain', 'Síntomas y dolor'],
      p: [
        ['“[[Where does it hurt?|איפה כואב לך?|eifo ko’ev lecha?]]” is the first question of most assessments (use “lach” for a woman).', '“[[¿Dónde le duele?|איפה כואב לך?|eifo ko’ev lecha?]]” es la primera pregunta de casi toda valoración (usa “lach” si es mujer).'],
        ['Ask onset, location, quality, intensity (0-10), what makes it better or worse.', 'Pregunta inicio, localización, calidad, intensidad (0-10) y qué lo mejora o empeora.']
      ],
      v: [
        ['pain', 'dolor', 'כאב', 'ke’ev'], ['fever', 'fiebre', 'חום', 'chom'], ['cough', 'tos', 'שיעול', 'si’ul'], ['shortness of breath', 'falta de aire (disnea)', 'קוצר נשימה', 'kotzer neshima'],
        ['nausea', 'náuseas', 'בחילה', 'bchila'], ['vomiting', 'vómito', 'הקאה', 'hak’a'], ['dizziness', 'mareo', 'סחרחורת', 'sachrachoret'], ['headache', 'dolor de cabeza', 'כאב ראש', 'ke’ev rosh'],
        ['chest pain', 'dolor de pecho', 'כאב בחזה', 'ke’ev ba-chaze'], ['diarrhea', 'diarrea', 'שלשול', 'shilshul'], ['constipation', 'estreñimiento', 'עצירות', 'atzirut'],
        ['bleeding', 'sangrado', 'דימום', 'dimum'], ['swelling (edema)', 'hinchazón (edema)', 'בצקת', 'batzeket'], ['rash', 'sarpullido / erupción', 'פריחה', 'prichá'],
        ['weakness', 'debilidad', 'חולשה', 'chulsha'], ['fatigue', 'cansancio', 'עייפות', 'ayefut'], ['palpitations', 'palpitaciones', 'דפיקות לב', 'dfikot lev'], ['allergy', 'alergia', 'אלרגיה', 'alergia']
      ] },
    { t: ['People, places and procedures', 'Personas, lugares y procedimientos'],
      p: [
        ['Nurse is “[[achot|אחות|achot]]” (female) and “[[ach|אח|ach]]” (male). The same word “ach” also means brother, so the context decides.', 'Enfermera es “[[achot|אחות|achot]]” y enfermero “[[ach|אח|ach]]”. “Ach” también significa hermano; el contexto decide.'],
        ['In Israel the word for patient is often “metupal” (the one being treated) rather than “chole” (sick person).', 'En Israel la palabra habitual para paciente es “metupal” (el que recibe tratamiento) más que “chole” (enfermo).']
      ],
      v: [
        ['doctor', 'médico', 'רופא', 'rofe'], ['nurse (female)', 'enfermera', 'אחות', 'achot'], ['nurse (male)', 'enfermero', 'אח', 'ach'], ['patient', 'paciente', 'מטופל', 'metupal'],
        ['hospital', 'hospital', 'בית חולים', 'beit cholim'], ['emergency room', 'sala de urgencias', 'חדר מיון', 'cheder miun'], ['intensive care', 'cuidados intensivos', 'טיפול נמרץ', 'tipul nemratz'],
        ['clinic', 'clínica / consultorio', 'מרפאה', 'mirpa’a'], ['medication', 'medicamento', 'תרופה', 'trufa'], ['injection', 'inyección', 'זריקה', 'zrika'],
        ['blood test', 'análisis de sangre', 'בדיקת דם', 'bdikat dam'], ['X-ray', 'radiografía', 'צילום רנטגן', 'tzilum rentgen'], ['surgery', 'cirugía', 'ניתוח', 'nitu’ach'],
        ['anesthesia', 'anestesia', 'הרדמה', 'herdama'], ['discharge (from hospital)', 'alta hospitalaria', 'שחרור', 'shichrur'], ['pregnancy', 'embarazo', 'היריון', 'herayon'], ['birth', 'parto', 'לידה', 'leida']
      ] },
    { t: ['Bedside phrases', 'Frases junto a la cama'],
      p: [
        ['Hebrew verbs change for the gender of the person you speak to. Masculine: “-ch/-a”; feminine: “-i / -ech”. When unsure, give both: “kach/ki”.', 'Los verbos hebreos cambian según el género de la persona a quien hablas. Si dudas, di ambos: “kach/ki”.'],
        ['Keep the sentences short. Point, mime, and use a translated picture board while your Hebrew grows.', 'Usa frases cortas. Señala, haz mímica y apóyate en un tablero de imágenes mientras mejora tu hebreo.']
      ],
      v: [
        ['Where does it hurt?', '¿Dónde le duele?', 'איפה כואב לך?', 'eifo ko’ev lecha/lach?'],
        ['Do you have allergies?', '¿Tiene alergias?', 'יש לך אלרגיות?', 'yesh lecha/lach alergiyot?'],
        ['Take a deep breath.', 'Respire hondo.', 'קח/י נשימה עמוקה', 'kach/ki neshima amuka'],
        ['I will measure your blood pressure.', 'Voy a medirle la presión.', 'אני אמדוד לך לחץ דם', 'ani emdod lecha lachatz dam'],
        ['When did it start?', '¿Cuándo empezó?', 'מתי זה התחיל?', 'matai ze hitchil?'],
        ['Do you take medications?', '¿Toma medicamentos?', 'אתה/את לוקח/ת תרופות?', 'ata/at lokeach/lokachat trufot?'],
        ['Don’t worry.', 'No se preocupe.', 'אל תדאג/י', 'al tid’ag/tid’agi'],
        ['Please sign here.', 'Firme aquí, por favor.', 'בבקשה תחתום/תחתמי כאן', 'bevakasha tachtom/tachtemi kan'],
        ['Nothing by mouth (fasting).', 'En ayunas.', 'בצום', 'be-tzom'],
        ['I will be right back.', 'Vuelvo enseguida.', 'אני חוזר/ת מיד', 'ani chozer/chozeret miyad'],
        ['Do you need an interpreter?', '¿Necesita un intérprete?', 'צריך/ה מתורגמן?', 'tzarich/tzricha metargeman?']
      ] },
    { t: ['Forms, consent and rights', 'Formularios, consentimiento y derechos'],
      p: [
        ['Forms you will see on the ward: informed consent, medication list, allergy sheet, discharge letter.', 'Formularios habituales en sala: consentimiento informado, lista de medicamentos, hoja de alergias, carta de alta.'],
        ['The exam cites laws and circulars in Hebrew and in the exam language. Learn the Hebrew name of each law you study in the Law module.', 'El examen cita leyes y circulares en hebreo y en el idioma del examen. Aprende el nombre hebreo de cada ley del módulo de Legislación.']
      ],
      v: [
        ['informed consent', 'consentimiento informado', 'הסכמה מדעת', 'haskama meda’at'], ['signature', 'firma', 'חתימה', 'chatima'], ['identity card', 'documento de identidad', 'תעודת זהות', 'te’udat zehut'],
        ['Patient’s Rights Law', 'Ley de Derechos del Paciente', 'חוק זכויות החולה', 'chok zchuyot ha-chole'], ['confidentiality', 'confidencialidad', 'סודיות', 'sodiyut'],
        ['ethics committee', 'comité de ética', 'ועדת אתיקה', 'va’adat etika'], ['circular (Ministry directive)', 'circular (directriz del Ministerio)', 'חוזר', 'chozer'], ['Ministry of Health', 'Ministerio de Salud', 'משרד הבריאות', 'misrad ha-briut'],
        ['nursing', 'enfermería', 'סיעוד', 'si’ud'], ['Nursing Division', 'División de Enfermería', 'מינהל האחיות', 'minhal ha-achayot']
      ] },
    { t: ['Hebrew roots: guess 3 words from 1', 'Raíces hebreas: 3 palabras con 1'],
      p: [
        ['Most Hebrew words are built from a 3-letter root. Learn the root and you can guess the family. Root ר-פ-א (r-f-a) is about healing.', 'La mayoría de las palabras hebreas se forman de una raíz de 3 letras. Aprende la raíz y adivinarás la familia. La raíz ר-פ-א (r-f-a) trata de curar.'],
        ['Root י-ל-ד (y-l-d) is about birth and children. Root ב-ד-ק (b-d-k) is about checking, testing.', 'La raíz י-ל-ד (y-l-d) se refiere al nacimiento y a los niños. La raíz ב-ד-ק (b-d-k), a revisar y examinar.']
      ],
      v: [
        ['doctor (root r-f-a)', 'médico (raíz r-f-a)', 'רופא', 'rofe'], ['medicine, the field', 'medicina (ciencia)', 'רפואה', 'refu’a'], ['drug, medication', 'fármaco', 'תרופה', 'trufa'],
        ['child', 'niño', 'ילד', 'yeled'], ['birth, labor', 'parto', 'לידה', 'leida'], ['newborn', 'recién nacido', 'ילוד', 'yalud'], ['woman in labor / postpartum', 'parturienta / puérpera', 'יולדת', 'yoledet'],
        ['test, examination', 'examen / prueba', 'בדיקה', 'bdika'], ['to examine', 'examinar', 'לבדוק', 'livdok']
      ] }
  ],
  q: [
    [1, 1, 'In which direction is Hebrew read?', '¿En qué dirección se lee el hebreo?', ['Left to right', 'Right to left', 'Top to bottom', 'It depends on the word'], ['De izquierda a derecha', 'De derecha a izquierda', 'De arriba abajo', 'Depende de la palabra'], 'Hebrew is read right to left, but numbers inside text are read left to right.', 'El hebreo se lee de derecha a izquierda, pero los números dentro del texto se leen de izquierda a derecha.'],
    [1, 2, 'The Hebrew word “רופא” (rofe) means:', 'La palabra hebrea “רופא” (rofe) significa:', ['Nurse', 'Patient', 'Doctor', 'Pharmacist'], ['Enfermera', 'Paciente', 'Médico', 'Farmacéutico'], 'Rofe = doctor, from the root r-f-a (to heal).', 'Rofe = médico, de la raíz r-f-a (curar).'],
    [2, 0, 'Which word shares the same root (r-f-a) as “rofe”?', '¿Qué palabra comparte la raíz (r-f-a) con “rofe”?', ['תרופה (trufa) – medication', 'בדיקה (bdika) – test', 'לידה (leida) – birth', 'שחרור (shichrur) – discharge'], ['תרופה (trufa) – medicamento', 'בדיקה (bdika) – prueba', 'לידה (leida) – parto', 'שחרור (shichrur) – alta'], 'Trufa (medication) and refu’a (medicine) are in the same word family as rofe.', 'Trufa (medicamento) y refu’a (medicina) pertenecen a la misma familia que rofe.'],
    [2, 3, 'How does the exam present Latin medical terms inside Hebrew text, according to the Ministry page?', 'Según la página del Ministerio, ¿cómo presenta el examen los términos médicos latinos dentro del texto hebreo?', ['Never at all', 'In a footnote', 'In bold', 'Latin term in parentheses after the Hebrew'], ['Nunca', 'En nota al pie', 'En negrita', 'Término latino entre paréntesis tras el hebreo'], 'The Ministry states that professional terms appear in Hebrew or Latin, with the Latin in parentheses, and acronyms are expanded in parentheses.', 'El Ministerio indica que los términos aparecen en hebreo o latín, con el latín entre paréntesis y las siglas desarrolladas entre paréntesis.']
  ]
});
