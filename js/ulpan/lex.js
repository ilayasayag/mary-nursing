/* Ulpan vocabulary (Aleph → Bet). Row: "hebrew|transliteration|english|español|topic|level|gender:plural"
   gender:plural only for nouns (m/f + plural form). Adjectives: UL.adj below with their 4 forms. */
window.UL = window.UL || {};
UL.topics = {
  me: ['About me', 'Sobre mí'], family: ['Family', 'Familia'], home: ['Home', 'Casa'], food: ['Food & drink', 'Comida y bebida'],
  city: ['City & places', 'Ciudad y lugares'], time: ['Time & days', 'Tiempo y días'], work: ['Work & study', 'Trabajo y estudio'],
  shop: ['Shopping & money', 'Compras y dinero'], body: ['Body & health', 'Cuerpo y salud'], weather: ['Weather & nature', 'Clima y naturaleza'],
  free: ['Free time', 'Tiempo libre'], feel: ['Feelings', 'Sentimientos'], link: ['Little words', 'Palabras pequeñas'], travel: ['Transport & travel', 'Transporte y viajes']
};
UL.lexRows = `
אני|ani|I|yo|me|a
אתה|ata|you (m)|tú (m)|me|a
את|at|you (f)|tú (f)|me|a
הוא|hu|he|él|me|a
היא|hi|she|ella|me|a
אנחנו|anachnu|we|nosotros|me|a
אתם|atem|you (m pl)|ustedes (m)|me|a
הם|hem|they (m)|ellos|me|a
הן|hen|they (f)|ellas|me|a
שם|shem|name|nombre|me|a|m:שמות
גיל|gil|age|edad|me|a|m:גילים
ארץ|erets|country, land|país, tierra|me|a|f:ארצות
עולה חדש|ole chadash|new immigrant (m)|nuevo inmigrante (m)|me|a|m:עולים חדשים
עולה חדשה|ola chadasha|new immigrant (f)|nueva inmigrante (f)|me|a|f:עולות חדשות
שפה|safa|language|idioma|me|a|f:שפות
עברית|ivrit|Hebrew|hebreo|me|a
ספרדית|sfaradit|Spanish|español (idioma)|me|a
אנגלית|anglit|English|inglés|me|a
מקצוע|miktsoa|profession|profesión|work|a|m:מקצועות
אחות|achot|nurse; sister|enfermera; hermana|work|a|f:אחיות
רופא|rofe|doctor|médico|work|a|m:רופאים
תלמיד|talmid|student (m)|alumno|work|a|m:תלמידים
תלמידה|talmida|student (f)|alumna|work|a|f:תלמידות
מורה|mora|teacher|profesor(a)|work|a|f:מורות
אולפן|ulpan|Hebrew school (ulpan)|escuela de hebreo (ulpán)|work|a|m:אולפנים
כיתה|kita|class(room)|clase, aula|work|a|f:כיתות
שיעור|shiur|lesson|lección, clase|work|a|m:שיעורים
שיעורי בית|shiurei bayit|homework|tarea|work|a
מחברת|machberet|notebook|cuaderno|work|a|f:מחברות
ספר|sefer|book|libro|work|a|m:ספרים
עט|et|pen|bolígrafo|work|a|m:עטים
מילה|mila|word|palabra|work|a|f:מילים
משפט|mishpat|sentence|oración|work|a|m:משפטים
שאלה|she'ela|question|pregunta|work|a|f:שאלות
תשובה|tshuva|answer|respuesta|work|a|f:תשובות
מבחן|mivchan|exam|examen|work|a|m:מבחנים
עבודה|avoda|work, job|trabajo|work|a|f:עבודות
משרד|misrad|office|oficina|work|a|m:משרדים
מנהל|menahel|manager|gerente, director|work|a|m:מנהלים
בית חולים|beit cholim|hospital|hospital|work|a|m:בתי חולים
משמרת|mishmeret|shift|turno|work|b|f:משמרות
משכורת|maskoret|salary|salario|work|b|f:משכורות
ראיון עבודה|reayon avoda|job interview|entrevista de trabajo|work|b|m:ראיונות עבודה
ניסיון|nisayon|experience|experiencia|work|b|m:ניסיונות
משפחה|mishpacha|family|familia|family|a|f:משפחות
אבא|aba|dad|papá|family|a|m:אבות
אימא|ima|mom|mamá|family|a|f:אימהות
הורים|horim|parents|padres|family|a
בן|ben|son; boy|hijo; niño|family|a|m:בנים
בת|bat|daughter; girl|hija; niña|family|a|f:בנות
ילד|yeled|child, boy|niño|family|a|m:ילדים
ילדה|yalda|girl|niña|family|a|f:ילדות
אח|ach|brother|hermano|family|a|m:אחים
בעל|baal|husband|esposo|family|a|m:בעלים
אישה|isha|woman; wife|mujer; esposa|family|a|f:נשים
איש|ish|man|hombre|family|a|m:אנשים
בחור|bachur|young man, guy|chico, joven|family|a|m:בחורים
בחורה|bachura|young woman|chica, joven|family|a|f:בחורות
דוד|dod|uncle|tío|family|a|m:דודים
דודה|doda|aunt|tía|family|a|f:דודות
סבא|saba|grandfather|abuelo|family|a|m:סבים
סבתא|savta|grandmother|abuela|family|a|f:סבתות
חבר|chaver|friend (m)|amigo|family|a|m:חברים
חברה|chavera|friend (f)|amiga|family|a|f:חברות
שכן|shachen|neighbour|vecino|family|a|m:שכנים
חתונה|chatuna|wedding|boda|family|a|f:חתונות
יום הולדת|yom huledet|birthday|cumpleaños|family|a|m:ימי הולדת
מתנה|matana|gift|regalo|family|a|f:מתנות
בית|bayit|house, home|casa|home|a|m:בתים
דירה|dira|apartment|apartamento|home|a|f:דירות
חדר|cheder|room|habitación|home|a|m:חדרים
מטבח|mitbach|kitchen|cocina|home|a|m:מטבחים
חדר שינה|cheder sheina|bedroom|dormitorio|home|a|m:חדרי שינה
מקלחת|miklachat|shower|ducha|home|a|f:מקלחות
שולחן|shulchan|table|mesa|home|a|m:שולחנות
כיסא|kise|chair|silla|home|a|m:כיסאות
מיטה|mita|bed|cama|home|a|f:מיטות
חלון|chalon|window|ventana|home|a|m:חלונות
דלת|delet|door|puerta|home|a|f:דלתות
מפתח|mafte'ach|key|llave|home|a|m:מפתחות
קומה|koma|floor (storey)|piso (planta)|home|a|f:קומות
מעלית|ma'alit|elevator|ascensor|home|a|f:מעליות
מדרגות|madregot|stairs|escaleras|home|a
שכירות|schirut|rent|alquiler|home|b
בעל הבית|baal habayit|landlord|casero, dueño|home|b
אוכל|ochel|food|comida|food|a
ארוחת בוקר|aruchat boker|breakfast|desayuno|food|a|f:ארוחות בוקר
ארוחת צהריים|aruchat tsohorayim|lunch|almuerzo|food|a|f:ארוחות צהריים
ארוחת ערב|aruchat erev|dinner|cena|food|a|f:ארוחות ערב
לחם|lechem|bread|pan|food|a|m:לחמים
מים|mayim|water|agua|food|a
קפה|kafe|coffee|café|food|a
תה|te|tea|té|food|a
חלב|chalav|milk|leche|food|a
מיץ|mits|juice|jugo|food|a|m:מיצים
ביצה|beitsa|egg|huevo|food|a|f:ביצים
גבינה|gvina|cheese|queso|food|a|f:גבינות
בשר|basar|meat|carne|food|a
עוף|of|chicken|pollo|food|a|m:עופות
דג|dag|fish|pescado|food|a|m:דגים
ירק|yerek|vegetable|verdura|food|a|m:ירקות
פרי|pri|fruit|fruta|food|a|m:פירות
תפוח|tapuach|apple|manzana|food|a|m:תפוחים
תפוז|tapuz|orange|naranja|food|a|m:תפוזים
עגבנייה|agvaniya|tomato|tomate|food|a|f:עגבניות
מלפפון|melafefon|cucumber|pepino|food|a|m:מלפפונים
אורז|orez|rice|arroz|food|a
סוכר|sukar|sugar|azúcar|food|a
מלח|melach|salt|sal|food|a
עוגה|uga|cake|pastel|food|a|f:עוגות
יין|yayin|wine|vino|food|a|m:יינות
כוס|kos|glass, cup|vaso, taza|food|a|f:כוסות
צלחת|tsalachat|plate|plato|food|a|f:צלחות
מסעדה|mis'ada|restaurant|restaurante|food|a|f:מסעדות
בית קפה|beit kafe|café|cafetería|food|a|m:בתי קפה
מלצר|meltsar|waiter|mesero|food|a|m:מלצרים
מלצרית|meltsarit|waitress|mesera|food|a|f:מלצריות
חשבון|cheshbon|bill; account|cuenta|food|a|m:חשבונות
עיר|ir|city|ciudad|city|a|f:ערים
רחוב|rechov|street|calle|city|a|m:רחובות
כביש|kvish|road|carretera|city|a|m:כבישים
שוק|shuk|market|mercado|city|a|m:שווקים
סופר|super|supermarket|supermercado|city|a|m:סופרים
חנות|chanut|shop|tienda|city|a|f:חנויות
קניון|kanyon|mall|centro comercial|city|a|m:קניונים
בנק|bank|bank|banco|city|a|m:בנקים
דואר|do'ar|post office; mail|correo|city|a
מרפאה|mirpa'a|clinic|clínica|city|a|f:מרפאות
בית מרקחת|beit merkachat|pharmacy|farmacia|city|a|m:בתי מרקחת
בית ספר|beit sefer|school|escuela|city|a|m:בתי ספר
בית כנסת|beit kneset|synagogue|sinagoga|city|a|m:בתי כנסת
פארק|park|park|parque|city|a|m:פארקים
ים|yam|sea|mar|city|a|m:ימים
מוזיאון|muze'on|museum|museo|city|a|m:מוזיאונים
קולנוע|kolno'a|cinema|cine|city|a
סרט|seret|film, movie|película|free|a|m:סרטים
מקום|makom|place|lugar|city|a|m:מקומות
תחנה|tachana|station, stop|estación, parada|travel|a|f:תחנות
אוטובוס|otobus|bus|autobús|travel|a|m:אוטובוסים
רכבת|rakevet|train|tren|travel|a|f:רכבות
מונית|monit|taxi|taxi|travel|a|f:מוניות
מכונית|mechonit|car|auto|travel|a|f:מכוניות
אופניים|ofanayim|bicycle|bicicleta|travel|a
ברגל|baregel|on foot|a pie|travel|a
שדה תעופה|sde te'ufa|airport|aeropuerto|travel|a|m:שדות תעופה
טיול|tiyul|trip, hike|paseo, excursión|travel|a|m:טיולים
מפה|mapa|map|mapa|travel|a|f:מפות
ימינה|yamina|to the right|a la derecha|travel|a
שמאלה|smola|to the left|a la izquierda|travel|a
ישר|yashar|straight ahead|derecho|travel|a
רמזור|ramzor|traffic light|semáforo|travel|b|m:רמזורים
כרטיס|kartis|ticket; card|boleto; tarjeta|travel|a|m:כרטיסים
חופשה|chufsha|vacation|vacaciones|travel|a|f:חופשות
מלון|malon|hotel|hotel|travel|a|m:מלונות
כסף|kesef|money|dinero|shop|a
שקל|shekel|shekel|séquel|shop|a|m:שקלים
מחיר|mechir|price|precio|shop|a|m:מחירים
מבצע|mivtsa|sale, special offer|oferta|shop|b|m:מבצעים
מזומן|mezuman|cash|efectivo|shop|a
כרטיס אשראי|kartis ashrai|credit card|tarjeta de crédito|shop|a|m:כרטיסי אשראי
קבלה|kabala|receipt|recibo|shop|b|f:קבלות
בגד|beged|item of clothing|prenda|shop|a|m:בגדים
חולצה|chultsa|shirt|camisa|shop|a|f:חולצות
מכנסיים|michnasayim|trousers|pantalones|shop|a
שמלה|simla|dress|vestido|shop|a|f:שמלות
נעליים|na'alayim|shoes|zapatos|shop|a
מידה|mida|size|talla|shop|b|f:מידות
תיק|tik|bag|bolso|shop|a|m:תיקים
זמן|zman|time|tiempo|time|a|m:זמנים
שעה|sha'a|hour; o'clock|hora|time|a|f:שעות
דקה|daka|minute|minuto|time|a|f:דקות
רבע|reva|quarter|cuarto|time|a
חצי|chetsi|half|media|time|a
יום|yom|day|día|time|a|m:ימים
לילה|layla|night|noche|time|a|m:לילות
בוקר|boker|morning|mañana|time|a
צהריים|tsohorayim|noon|mediodía|time|a
אחר הצהריים|achar hatsohorayim|afternoon|tarde|time|a
ערב|erev|evening|tarde-noche|time|a
שבוע|shavua|week|semana|time|a|m:שבועות
חודש|chodesh|month|mes|time|a|m:חודשים
שנה|shana|year|año|time|a|f:שנים
היום|hayom|today|hoy|time|a
אתמול|etmol|yesterday|ayer|time|a
מחר|machar|tomorrow|mañana (día)|time|a
עכשיו|achshav|now|ahora|time|a
אחר כך|achar kach|afterwards|después|time|a
מוקדם|mukdam|early|temprano|time|a
מאוחר|me'uchar|late|tarde|time|a
בדרך כלל|bederech klal|usually|por lo general|time|a
תמיד|tamid|always|siempre|time|a
לפעמים|lif'amim|sometimes|a veces|time|a
אף פעם לא|af pa'am lo|never|nunca|time|a
יום ראשון|yom rishon|Sunday|domingo|time|a
יום שני|yom sheni|Monday|lunes|time|a
יום שלישי|yom shlishi|Tuesday|martes|time|a
יום רביעי|yom revi'i|Wednesday|miércoles|time|a
יום חמישי|yom chamishi|Thursday|jueves|time|a
יום שישי|yom shishi|Friday|viernes|time|a
שבת|shabat|Saturday, Shabbat|sábado|time|a
סוף שבוע|sof shavua|weekend|fin de semana|time|a
בשבוע הבא|bashavua haba|next week|la semana próxima|time|b
בשבוע שעבר|bashavua she'avar|last week|la semana pasada|time|a
קיץ|kayits|summer|verano|weather|a
חורף|choref|winter|invierno|weather|a
אביב|aviv|spring|primavera|weather|a
סתיו|stav|autumn|otoño|weather|a
מזג אוויר|mezeg avir|weather|clima|weather|a
גשם|geshem|rain|lluvia|weather|a|m:גשמים
שמש|shemesh|sun|sol|weather|a
חם|cham|hot|calor, caliente|weather|a
קר|kar|cold|frío|weather|a
טבע|teva|nature|naturaleza|weather|a
עץ|ets|tree|árbol|weather|a|m:עצים
פרח|perach|flower|flor|weather|a|m:פרחים
כלב|kelev|dog|perro|free|a|m:כלבים
כלבה|kalba|dog (f)|perra|free|a|f:כלבות
חתול|chatul|cat|gato|free|a|m:חתולים
מוזיקה|muzika|music|música|free|a
שיר|shir|song|canción|free|a|m:שירים
עיתון|iton|newspaper|periódico|free|a|m:עיתונים
מכתב|michtav|letter|carta|free|a|m:מכתבים
חדשות|chadashot|news|noticias|free|a
טלוויזיה|televizya|television|televisión|free|a
טלפון|telefon|telephone|teléfono|free|a|m:טלפונים
מחשב|machshev|computer|computadora|free|a|m:מחשבים
אינטרנט|internet|internet|internet|free|a
ספורט|sport|sport|deporte|free|a
חג|chag|holiday|fiesta|free|a|m:חגים
גוף|guf|body|cuerpo|body|a|m:גופים
ראש|rosh|head|cabeza|body|a|m:ראשים
יד|yad|hand, arm|mano|body|a|f:ידיים
רגל|regel|leg, foot|pierna, pie|body|a|f:רגליים
עין|ayin|eye|ojo|body|a|f:עיניים
אוזן|ozen|ear|oreja|body|a|f:אוזניים
פה|pe|mouth|boca|body|a
בטן|beten|belly|vientre|body|a
גב|gav|back|espalda|body|a
לב|lev|heart|corazón|body|a
כאב|ke'ev|pain|dolor|body|a|m:כאבים
חום|chom|fever; heat|fiebre; calor|body|a
חולה|chole|sick (m); patient|enfermo; paciente|body|a|m:חולים
בריא|bari|healthy|sano|body|a
תרופה|trufa|medicine|medicamento|body|a|f:תרופות
תור|tor|appointment; line|turno, cita; fila|body|a|m:תורים
קופת חולים|kupat cholim|health fund|caja de salud|body|a|f:קופות חולים
מרשם|mirsham|prescription|receta|body|b|m:מרשמים
בדיקה|bdika|test, check-up|examen, chequeo|body|a|f:בדיקות
שמח|same'ach|happy|feliz|feel|a
עצוב|atsuv|sad|triste|feel|a
עייף|ayef|tired|cansado|feel|a
רעב|ra'ev|hungry|hambriento|feel|a
צמא|tsame|thirsty|sediento|feel|a
עסוק|asuk|busy|ocupado|feel|a
מתרגש|mitragesh|excited|emocionado|feel|a
לחוץ|lachuts|stressed|estresado|feel|b
כועס|ko'es|angry|enojado|feel|a
מפחד|mefached|afraid|asustado|feel|a
גם|gam|also|también|link|a
אבל|aval|but|pero|link|a
כי|ki|because|porque|link|a
לכן|lachen|therefore, so|por eso|link|a
בגלל|biglal|because of|a causa de|link|a
כדי|kedei|in order to|para (+ infinitivo)|link|a
אחרי ש|acharei she|after (+ clause)|después de que|link|a
לפני ש|lifnei she|before (+ clause)|antes de que|link|a
כאשר|ka'asher|when (formal)|cuando|link|a
כש|kshe|when|cuando|link|a
אם|im|if|si|link|a
או|o|or|o|link|a
עם|im|with|con|link|a
בלי|bli|without|sin|link|a
של|shel|of, belonging to|de (posesión)|link|a
אצל|etsel|at (someone's place)|en casa de|link|a
על יד|al yad|next to|al lado de|link|a
מול|mul|opposite|frente a|link|a
בין|bein|between|entre|link|a
על|al|on; about|sobre; acerca de|link|a
מתחת ל|mitachat le|under|debajo de|link|a
ליד|leyad|near, next to|cerca de, junto a|link|a
עד|ad|until|hasta|link|a
מאוד|me'od|very|muy|link|a
קצת|ktsat|a little|un poco|link|a
הרבה|harbe|a lot, many|mucho|link|a
כל|kol|every, all|cada, todo|link|a
עוד|od|more, another|más, otro|link|a
כבר|kvar|already|ya|link|a
עדיין|adayin|still|todavía|link|b
רק|rak|only|solo|link|a
איפה|eifo|where|dónde|link|a
לאן|le'an|where to|adónde|link|a
מאיפה|me'eifo|from where|de dónde|link|a
מתי|matai|when (question)|cuándo|link|a
למה|lama|why|por qué|link|a
כמה|kama|how many, how much|cuánto|link|a
מי|mi|who|quién|link|a
מה|ma|what|qué|link|a
איך|eich|how|cómo|link|a
איזה|eize|which (m)|cuál (m)|link|a
איזו|eizo|which (f)|cuál (f)|link|a
בשביל|bishvil|for|para|link|a
בזמן ש|bizman she|while|mientras|link|b
למרות ש|lamrot she|although|aunque|link|b
אז|az|so, then|entonces|link|a
פעם|pa'am|once; time (occasion)|una vez|time|a|f:פעמים
פעמיים|pa'amayim|twice|dos veces|time|a
`;
UL.lex = UL.lexRows.trim().split('\n').map((r, i) => {
  const [he, tr, en, es, topic, lv, np] = r.split('|');
  const [g, pl] = (np || '').split(':');
  return { id: 'w' + i, he, tr, en, es, topic, lv, g: g || null, pl: pl || null };
});
/* adjectives with their 4 forms (m, f, m pl, f pl) */
UL.adjRows = `
גדול|גדולה|גדולים|גדולות|big|grande|a
קטן|קטנה|קטנים|קטנות|small|pequeño|a
טוב|טובה|טובים|טובות|good|bueno|a
רע|רעה|רעים|רעות|bad|malo|a
יפה|יפה|יפים|יפות|beautiful|bonito|a
חדש|חדשה|חדשים|חדשות|new|nuevo|a
ישן|ישנה|ישנים|ישנות|old (thing)|viejo (cosa)|a
עתיק|עתיקה|עתיקים|עתיקות|ancient|antiguo|a
זקן|זקנה|זקנים|זקנות|old (person)|anciano|a
צעיר|צעירה|צעירים|צעירות|young|joven|a
ארוך|ארוכה|ארוכים|ארוכות|long|largo|a
קצר|קצרה|קצרים|קצרות|short|corto|a
רחב|רחבה|רחבים|רחבות|wide|ancho|a
צר|צרה|צרים|צרות|narrow|estrecho|a
נקי|נקייה|נקיים|נקיות|clean|limpio|a
מלוכלך|מלוכלכת|מלוכלכים|מלוכלכות|dirty|sucio|a
טרי|טרייה|טריים|טריות|fresh|fresco|a
יקר|יקרה|יקרים|יקרות|expensive; dear|caro; querido|a
זול|זולה|זולים|זולות|cheap|barato|a
חם|חמה|חמים|חמות|hot|caliente|a
קר|קרה|קרים|קרות|cold|frío|a
ירוק|ירוקה|ירוקים|ירוקות|green|verde|a
אדום|אדומה|אדומים|אדומות|red|rojo|a
כחול|כחולה|כחולים|כחולות|blue|azul|a
לבן|לבנה|לבנים|לבנות|white|blanco|a
שחור|שחורה|שחורים|שחורות|black|negro|a
חכם|חכמה|חכמים|חכמות|clever|inteligente|a
נחמד|נחמדה|נחמדים|נחמדות|nice|simpático|a
עשיר|עשירה|עשירים|עשירות|rich|rico|a
עני|ענייה|עניים|עניות|poor|pobre|a
שמח|שמחה|שמחים|שמחות|happy|feliz|a
עייף|עייפה|עייפים|עייפות|tired|cansado|a
חולה|חולה|חולים|חולות|sick|enfermo|a
נשוי|נשואה|נשואים|נשואות|married|casado|a
קשה|קשה|קשים|קשות|hard, difficult|difícil|a
קל|קלה|קלים|קלות|easy, light|fácil, ligero|a
מעניין|מעניינת|מעניינים|מעניינות|interesting|interesante|a
שקט|שקטה|שקטים|שקטות|quiet|tranquilo|a
רועש|רועשת|רועשים|רועשות|noisy|ruidoso|a
פנוי|פנויה|פנויים|פנויות|free, available|libre, disponible|a
תחרותי|תחרותית|תחרותיים|תחרותיות|competitive|competitivo|b
מסוכן|מסוכנת|מסוכנים|מסוכנות|dangerous|peligroso|b
חשוב|חשובה|חשובים|חשובות|important|importante|a
`;
UL.adj = UL.adjRows.trim().split('\n').map((r, i) => { const [m, f, mp, fp, en, es, lv] = r.split('|'); return { id: 'j' + i, m, f, mp, fp, en, es, lv }; });
/* lookup used by the photo scanner: strips the one-letter prefixes ו ה ב ל מ ש כ when the bare word is known */
UL.find = word => {
  const w = word.replace(/[֑-ׇ]/g, '').replace(/[^א-ת'"]/g, '');
  if (!w) return null;
  const hit = x => UL.lex.find(e => e.he === x || e.pl === x) || UL.adj.find(a => [a.m, a.f, a.mp, a.fp].includes(x))
    || UL.verbs.find(v => v.inf === x || [...v.pres, ...v.past, ...v.fut].includes(x));
  let r = hit(w); if (r) return { w, entry: r };
  for (let i = 1; i <= 3 && i < w.length - 1; i++) { if (!/^[והבלמשכ]+$/.test(w.slice(0, i))) break; r = hit(w.slice(i)); if (r) return { w: w.slice(i), entry: r, prefix: w.slice(0, i) }; }
  return null;
};
