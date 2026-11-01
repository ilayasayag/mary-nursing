/* Ulpan exercise banks (original items, written to the task types of the Ministry of Education's
   end-of-level exams, rama א and rama ב, 2017). "_" marks the gap. */
(() => {
window.UL = window.UL || {};
const rows = (s, n) => s.trim().split('\n').map(r => r.split('|').map(x => x.trim())).filter(r => r.length >= n);

/* prepositions and verb partners: sentence | answer | 3 distractors (,) | en | es | tag (prep/gov) | level */
UL.prep = rows(`
התיק החדש _ המורה נמצא על השולחן.|של|ב,ל,מ|The teacher's new bag is on the table.|El bolso nuevo de la profesora está sobre la mesa.|prep|a
הוא נוסע לעבודה _מכונית.|ב|ל,מ,של|He goes to work by car.|Él va al trabajo en auto.|prep|a
היא נוסעת בבוקר _רעננה לתל אביב.|מ|ב,ל,של|In the morning she travels from Ra'anana to Tel Aviv.|Por la mañana viaja de Raanana a Tel Aviv.|prep|a
הבניין של האוניברסיטה נמצא _ הקניון הגדול.|על יד|בין,עם,אצל|The university building is next to the big mall.|El edificio de la universidad está junto al centro comercial.|prep|a
ההורים מתגעגעים מאוד _ילדים שלהם.|ל|ב,מ,על|The parents miss their children a lot.|Los padres extrañan mucho a sus hijos.|gov|a
התלמידים מדברים עברית _כיתה.|ב|ל,מ,של|The students speak Hebrew in class.|Los alumnos hablan hebreo en clase.|prep|a
היא תיירת _אנגליה.|מ|ב,ל,של|She is a tourist from England.|Es una turista de Inglaterra.|prep|a
היא הולכת _קניון אחרי העבודה.|ל|ב,מ,על|She goes to the mall after work.|Va al centro comercial después del trabajo.|prep|a
היא יושבת _ שרה ובין חנה.|בין|על יד,עם,אצל|She sits between Sara and Hana.|Se sienta entre Sara y Hana.|prep|a
החתול משחק _ הכלב בגינה.|עם|של,אצל,בין|The cat plays with the dog in the garden.|El gato juega con el perro en el jardín.|prep|a
המפה _ ישראל תלויה על הקיר.|של|ב,ל,עם|The map of Israel hangs on the wall.|El mapa de Israel cuelga en la pared.|prep|a
המפתחות שלך _ המנהל.|אצל|עם,בגלל,בין|Your keys are with the manager.|Tus llaves las tiene el gerente.|prep|a
אני גרה _ חברה שלי עד שאמצא דירה.|אצל|עם,של,על יד|I'm staying at my friend's until I find an apartment.|Vivo en casa de mi amiga hasta encontrar apartamento.|prep|a
המרפאה נמצאת _ הבנק, בצד השני של הרחוב.|מול|בין,עם,אצל|The clinic is opposite the bank, across the street.|La clínica está frente al banco, al otro lado de la calle.|prep|a
אני מטפלת _כלבה שלי כל בוקר.|ב|ל,את,על|I take care of my dog every morning.|Cuido a mi perra cada mañana.|gov|a
הרעש מהרחוב מפריע _שכנים.|ל|את,ב,על|The street noise disturbs the neighbours.|El ruido de la calle molesta a los vecinos.|gov|a
אנחנו מחכים _אוטובוס כבר חצי שעה.|ל|את,ב,על|We've been waiting for the bus for half an hour.|Llevamos media hora esperando el autobús.|gov|a
היא התקשרה _רופא בבוקר.|ל|את,עם,ב|She called the doctor in the morning.|Llamó al médico por la mañana.|gov|a
אני חושבת _ המבחן כל הזמן.|על|ב,ל,עם|I think about the exam all the time.|Pienso en el examen todo el tiempo.|gov|a
דני התחתן _ אישה מצרפת.|עם|את,ל,ב|Danny married a woman from France.|Danny se casó con una mujer de Francia.|gov|a
הילד מפחד _כלב הגדול.|מה|את ה,לה,על ה|The child is afraid of the big dog.|El niño le tiene miedo al perro grande.|gov|a
אני עוזרת _שכנה הזקנה בקניות.|ל|את,ב,עם|I help the old neighbour with the shopping.|Ayudo a la vecina anciana con las compras.|gov|a
הם הסתכלו _ התמונות במוזיאון.|על|ב,את,ל|They looked at the pictures in the museum.|Miraron los cuadros en el museo.|gov|a
הוא התרגל _חום בישראל.|ל|את,ב,על|He got used to the heat in Israel.|Se acostumbró al calor en Israel.|gov|a
אני מתגעגעת _משפחה שלי בוונצואלה.|ל|את,ב,על|I miss my family in Venezuela.|Extraño a mi familia en Venezuela.|gov|a
הוא נכנס _כיתה ואמר שלום.|ל|את,ב,על|He came into the class and said hello.|Entró en la clase y dijo hola.|gov|a
אחרי האולפן היא חוזרת _ ואוכלת.|הביתה|את הבית,בבית,מהבית|After the ulpan she goes back home and eats.|Después del ulpán vuelve a casa y come.|gov|a
אני משלמת _מזומן בשוק.|ב|עם,את,ל|I pay cash at the market.|Pago en efectivo en el mercado.|prep|a
התלמיד ענה _ השאלה של המורה.|על|את,ל,ב|The student answered the teacher's question.|El alumno respondió la pregunta de la profesora.|gov|a
כדאי לשמור _ הבריאות.|על|את,ב,ל|It's worth taking care of your health.|Vale la pena cuidar la salud.|gov|a
את מכירה _ המורה החדשה?|את|ל,עם,על|Do you know the new teacher?|¿Conoces a la nueva profesora?|gov|a
אני אוהבת את האוכל _ האנשים בקראקס.|ואת|ול,ועם,ושל|I love the food and the people in Caracas.|Me encantan la comida y la gente de Caracas.|gov|a
היא קונה מתנה _אימא שלה.|ל|את,של,עם|She is buying a present for her mother.|Compra un regalo para su madre.|prep|a
אנחנו משתמשים _מחשב בעבודה.|ב|את,על,ל|We use a computer at work.|Usamos una computadora en el trabajo.|gov|b
הוא סיפר _חברים על הטיול.|ל|את,עם,על|He told his friends about the trip.|Les contó a sus amigos sobre el viaje.|gov|a
`, 7).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4], tag: r[5], lv: r[6] }));

/* write the question: answer sentence | focus | correct question | 3 wrong questions (;) | en | es */
UL.qword = rows(`
אני מתחילה ללמוד בשעה 8:30.|בשעה 8:30|באיזו שעה את מתחילה ללמוד?|איפה את מתחילה ללמוד?;למה את מתחילה ללמוד?;מאיפה את מתחילה ללמוד?|I start studying at 8:30.|Empiezo a estudiar a las 8:30.
לילדים אין תמיד סבלנות.|לילדים|למי אין תמיד סבלנות?|מי אין לו תמיד סבלנות?;עם מי אין תמיד סבלנות?;של מי אין תמיד סבלנות?|Children don't always have patience.|Los niños no siempre tienen paciencia.
אנחנו חושבים על ההפסקה.|על ההפסקה|על מה אתם חושבים?|על מי אתם חושבים?;למה אתם חושבים?;מתי אתם חושבים?|We're thinking about the break.|Pensamos en el recreo.
אני הולכת לישון מאוחר כי אני עובדת בלילה.|כי אני עובדת בלילה|למה את הולכת לישון מאוחר?|מתי את הולכת לישון מאוחר?;איפה את הולכת לישון מאוחר?;איך את הולכת לישון מאוחר?|I go to sleep late because I work at night.|Me acuesto tarde porque trabajo de noche.
היא מיהרה לעבודה.|לעבודה|לאן היא מיהרה?|איפה היא מיהרה?;מאיפה היא מיהרה?;מתי היא מיהרה?|She hurried to work.|Se apuró para ir al trabajo.
הוא התחתן עם אישה יפה מאוד.|עם אישה יפה מאוד|עם מי הוא התחתן?|את מי הוא התחתן?;למי הוא התחתן?;של מי הוא התחתן?|He married a very beautiful woman.|Se casó con una mujer muy bonita.
תחנת האוטובוס נמצאת ברחוב יפו.|ברחוב יפו|איפה נמצאת תחנת האוטובוס?|לאן נמצאת תחנת האוטובוס?;מאיפה נמצאת תחנת האוטובוס?;מתי נמצאת תחנת האוטובוס?|The bus stop is on Jaffa Street.|La parada de autobús está en la calle Yafo.
הבן הזה של מיכאל.|של מיכאל|של מי הבן הזה?|למי הבן הזה?;עם מי הבן הזה?;מי הבן הזה?|This son is Michael's.|Este hijo es de Michael.
הם קנו לאימא שלהם פרחים.|לאימא שלהם|למי הם קנו פרחים?|עם מי הם קנו פרחים?;של מי הם קנו פרחים?;מה הם קנו לאימא שלהם?|They bought flowers for their mother.|Le compraron flores a su madre.
בתחנה יש עכשיו 30 אנשים.|30 אנשים|כמה אנשים יש עכשיו בתחנה?|מי יש עכשיו בתחנה?;איפה יש עכשיו 30 אנשים?;מתי יש בתחנה 30 אנשים?|There are 30 people at the stop now.|Ahora hay 30 personas en la parada.
ראיתי את הסרט בקולנוע "חן".|בקולנוע "חן"|איפה ראית את הסרט?|מתי ראית את הסרט?;איזה סרט ראית?;למה ראית את הסרט?|I saw the film at the "Chen" cinema.|Vi la película en el cine "Jen".
היא שתתה מים קרים.|מים קרים|מה היא שתתה?|איפה היא שתתה?;למה היא שתתה?;כמה היא שתתה?|She drank cold water.|Bebió agua fría.
הם פנו לרחוב ויצמן.|לרחוב ויצמן|לאן הם פנו?|איפה הם פנו?;מאיפה הם פנו?;מתי הם פנו?|They turned into Weizmann Street.|Doblaron hacia la calle Weizmann.
הן עלו לארץ מברזיל.|מברזיל|מאיפה הן עלו לארץ?|לאן הן עלו?;איפה הן עלו לארץ?;מתי הן עלו לארץ?|They immigrated to Israel from Brazil.|Inmigraron a Israel desde Brasil.
היא ראתה את רחל בקניון.|את רחל|את מי היא ראתה בקניון?|מי ראתה אותה בקניון?;למי היא ראתה בקניון?;עם מי היא ראתה בקניון?|She saw Rachel at the mall.|Vio a Rajel en el centro comercial.
הם בנו מפעל בצפון.|בצפון|איפה הם בנו מפעל?|לאן הם בנו מפעל?;מה הם בנו?;מתי הם בנו מפעל?|They built a factory in the north.|Construyeron una fábrica en el norte.
רציתי להזמין את רותי לקפה ועוגה.|את רותי|את מי רצית להזמין לקפה ועוגה?|מה רצית להזמין לקפה ועוגה?;למי רצית להזמין קפה ועוגה?;עם מי רצית להזמין לקפה ועוגה?|I wanted to invite Ruti for coffee and cake.|Quería invitar a Ruti a café y pastel.
רציתי לקנות חולצה לבנה.|לבנה|איזו חולצה רצית לקנות?|איזה חולצה רצית לקנות?;כמה חולצות רצית לקנות?;למה רצית לקנות חולצה?|I wanted to buy a white shirt.|Quería comprar una camisa blanca.
הסרט מתחיל בשמונה בערב.|בשמונה בערב|מתי הסרט מתחיל?|איפה הסרט מתחיל?;למה הסרט מתחיל?;כמה הסרט מתחיל?|The film starts at eight in the evening.|La película empieza a las ocho de la noche.
אני גרה בתל אביב שנה.|שנה|כמה זמן את גרה בתל אביב?|מתי את גרה בתל אביב?;איפה את גרה שנה?;למה את גרה בתל אביב?|I've lived in Tel Aviv for a year.|Vivo en Tel Aviv desde hace un año.
הוא נוסע לעבודה באוטובוס.|באוטובוס|איך הוא נוסע לעבודה?|לאן הוא נוסע באוטובוס?;מתי הוא נוסע לעבודה?;למה הוא נוסע לעבודה?|He goes to work by bus.|Va al trabajo en autobús.
החולצה עולה 80 שקלים.|80 שקלים|כמה עולה החולצה?|איזו חולצה עולה 80 שקלים?;מה עולה 80 שקלים?;מתי החולצה עולה?|The shirt costs 80 shekels.|La camisa cuesta 80 séqueles.
אני מוונצואלה.|מוונצואלה|מאיפה את?|איפה את?;לאן את?;מי את?|I'm from Venezuela.|Soy de Venezuela.
`, 6).map(r => ({ s: r[0], f: r[1], q: r[2], d: r[3].split(';'), en: r[4], es: r[5] }));

/* connectors: sentence | answer | 3 distractors | en | es | level */
UL.link = rows(`
גמרתי את העבודה בבית, _ ראיתי חדשות בטלוויזיה.|אחר כך|כדי,אחרי ש,בגלל|I finished the work at home, then I watched the news on TV.|Terminé el trabajo en casa y después vi las noticias en la tele.|a
_ גמרתי את העבודה, ראיתי חדשות בטלוויזיה.|אחרי ש|אחר כך,כדי,לכן|After I finished the work, I watched the news.|Después de terminar el trabajo, vi las noticias.|a
אתמול קמתי מוקדם, _ הייתי צריך לנסוע לשדה התעופה.|כי|לפני,בגלל,לכן|Yesterday I got up early because I had to go to the airport.|Ayer me levanté temprano porque tenía que ir al aeropuerto.|a
אני צריכה לפתוח חשבון, _ הלכתי לבנק.|לכן|בגלל,כדי,כי|I need to open an account, so I went to the bank.|Necesito abrir una cuenta, por eso fui al banco.|a
הלכתי לבנק, _ הוא היה סגור.|אבל|כי,כאשר,לכן|I went to the bank, but it was closed.|Fui al banco, pero estaba cerrado.|a
הלכתי לבנק _ לפתוח חשבון.|כדי|כי,לכן,אבל|I went to the bank to open an account.|Fui al banco para abrir una cuenta.|a
לא יצאנו לטיול _ הגשם.|בגלל|כי,לכן,כדי|We didn't go on the trip because of the rain.|No salimos de excursión por la lluvia.|a
_ אני חוזרת מהעבודה, אני מתקלחת.|כאשר|כי,לכן,כדי|When I come back from work, I shower.|Cuando vuelvo del trabajo, me ducho.|a
היא לומדת עברית _ לעבוד כאחות בישראל.|כדי|כי,בגלל,לכן|She studies Hebrew in order to work as a nurse in Israel.|Estudia hebreo para trabajar como enfermera en Israel.|a
אני עייפה, _ אני הולכת לישון מוקדם.|לכן|כי,בגלל,כדי|I'm tired, so I go to sleep early.|Estoy cansada, por eso me acuesto temprano.|a
אני הולכת לישון מוקדם, _ אני עייפה.|כי|לכן,כדי,אבל|I go to sleep early because I'm tired.|Me acuesto temprano porque estoy cansada.|a
הוא לא בא לשיעור, _ הוא חולה.|כי|בגלל,לכן,כדי|He didn't come to class because he is sick.|No vino a clase porque está enfermo.|a
אני אוהבת קפה, _ אני לא שותה הרבה.|אבל|כי,לכן,כדי|I like coffee, but I don't drink a lot.|Me gusta el café, pero no tomo mucho.|a
_ הארוחה אנחנו שותים קפה.|אחרי|אחרי ש,אחר כך,כי|After the meal we drink coffee.|Después de la comida tomamos café.|a
_ שאני יוצאת מהבית, אני סוגרת את החלונות.|לפני|אחרי,כי,לכן|Before I leave the house, I close the windows.|Antes de salir de casa, cierro las ventanas.|a
קודם אני אוכלת ארוחת בוקר, _ אני נוסעת לאולפן.|אחר כך|אחרי ש,לפני,כי|First I eat breakfast, then I go to the ulpan.|Primero desayuno, después voy al ulpán.|a
את רוצה תה _ קפה?|או|גם,אבל,כי|Do you want tea or coffee?|¿Quieres té o café?|a
_ יש לך זמן, בואי לקפה.|אם|כי,לכן,כדי|If you have time, come for coffee.|Si tienes tiempo, ven a tomar un café.|a
נשארנו בבית _ החום.|בגלל|כי,לכן,כדי|We stayed home because of the heat.|Nos quedamos en casa por el calor.|a
הוא עובד קשה _ לקנות דירה.|כדי|כי,בגלל,אבל|He works hard in order to buy an apartment.|Trabaja duro para comprar un apartamento.|a
עדיין לא אכלתי, _ אני רעבה.|לכן|כי,בגלל,כדי|I haven't eaten yet, so I'm hungry.|Todavía no comí, por eso tengo hambre.|a
_ שהיה חם, יצאנו לטייל.|למרות|בגלל,כי,לכן|Although it was hot, we went out for a walk.|Aunque hacía calor, salimos a pasear.|b
היא שתתה קפה _ שהיא קראה עיתון.|בזמן|לכן,כי,אבל|She drank coffee while she read the newspaper.|Tomó café mientras leía el periódico.|b
הוא לקח מטרייה _ שלא יירטב.|כדי|כי,בגלל,למרות|He took an umbrella so that he wouldn't get wet.|Llevó un paraguas para no mojarse.|b
`, 6).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4], lv: r[5] }));

/* singular sentence | plural sentence | 3 wrong plurals (;) | en | es */
UL.plural = rows(`
בחופשה האחרונה נשארתי בבית.|בחופשות האחרונות נשארנו בבית.|בחופשה האחרונה נשארנו בבית.;בחופשות האחרונים נשארנו בבית.;בחופשות האחרונות נשארתי בבית.|On the last holiday I stayed home.|En las últimas vacaciones me quedé en casa.
יש בירושלים בית עתיק.|יש בירושלים בתים עתיקים.|יש בירושלים בתים עתיקות.;יש בירושלים בית עתיקים.;יש בירושלים ביתים עתיקים.|There is an old house in Jerusalem.|Hay una casa antigua en Jerusalén.
אתה רוצה ללכת לרופא.|אתם רוצים ללכת לרופאים.|אתם רוצה ללכת לרופאים.;אתם רוצים ללכת לרופא.;אתן רוצים ללכת לרופאים.|You want to go to the doctor.|Quieres ir al médico.
אני מכיר את האיש הזה.|אנחנו מכירים את האנשים האלה.|אנחנו מכירים את האישים האלה.;אנחנו מכירים את האנשים הזה.;אנחנו מכיר את האנשים האלה.|I know this man.|Conozco a este hombre.
הילדה הקטנה משחקת בפארק.|הילדות הקטנות משחקות בפארק.|הילדות הקטנים משחקות בפארק.;הילדות הקטנות משחקים בפארק.;הילדים הקטנות משחקות בפארק.|The little girl plays in the park.|La niña pequeña juega en el parque.
התלמיד החדש כותב מילה חדשה.|התלמידים החדשים כותבים מילים חדשות.|התלמידים החדשים כותבים מילים חדשים.;התלמידים החדשים כותבות מילים חדשות.;התלמידים החדשות כותבים מילים חדשות.|The new student writes a new word.|El alumno nuevo escribe una palabra nueva.
השולחן הגדול עומד בחדר.|השולחנות הגדולים עומדים בחדרים.|השולחנות הגדולות עומדות בחדרים.;השולחנים הגדולים עומדים בחדרים.;השולחנות הגדולים עומדות בחדרים.|The big table stands in the room.|La mesa grande está en la habitación.
האישה הצעירה קנתה שמלה יפה.|הנשים הצעירות קנו שמלות יפות.|האישות הצעירות קנו שמלות יפות.;הנשים הצעירים קנו שמלות יפות.;הנשים הצעירות קנתה שמלות יפות.|The young woman bought a nice dress.|La mujer joven compró un vestido bonito.
החלון בחדר שלי פתוח.|החלונות בחדרים שלנו פתוחים.|החלונים בחדרים שלנו פתוחים.;החלונות בחדרים שלנו פתוחות.;החלונות בחדרים שלי פתוחים.|The window in my room is open.|La ventana de mi habitación está abierta.
את רוצה לשתות קפה?|אתן רוצות לשתות קפה?|אתן רוצים לשתות קפה?;אתם רוצות לשתות קפה?;אתן רוצה לשתות קפה?|Do you (f) want to drink coffee?|¿Quieres tomar café?
הרופא בדק את החולה.|הרופאים בדקו את החולים.|הרופאים בדק את החולים.;הרופאים בדקנו את החולים.;הרופאים בדקה את החולים.|The doctor examined the patient.|El médico examinó al paciente.
השיר הזה יפה מאוד.|השירים האלה יפים מאוד.|השירים הזה יפים מאוד.;השירים האלה יפות מאוד.;השירות האלה יפים מאוד.|This song is very beautiful.|Esta canción es muy bonita.
המילה הזאת קשה.|המילים האלה קשות.|המילים האלה קשים.;המילות האלה קשות.;המילים הזאת קשות.|This word is difficult.|Esta palabra es difícil.
השנה עברה מהר.|השנים עברו מהר.|השנות עברו מהר.;השנים עברה מהר.;השנים עברנו מהר.|The year went by fast.|El año pasó rápido.
אני גרה בדירה קטנה.|אנחנו גרות בדירות קטנות.|אנחנו גרים בדירות קטנים.;אנחנו גרה בדירות קטנות.;אנחנו גרות בדירות קטנים.|I live in a small apartment.|Vivo en un apartamento pequeño.
הוא קם מוקדם ונסע לעבודה.|הם קמו מוקדם ונסעו לעבודה.|הם קם מוקדם ונסעו לעבודה.;הם קמו מוקדם ונסע לעבודה.;הם קמנו מוקדם ונסענו לעבודה.|He got up early and went to work.|Se levantó temprano y fue al trabajo.
היא סידרה את הבית לכבוד שבת.|הן סידרו את הבתים לכבוד שבת.|הן סידרה את הבתים לכבוד שבת.;הן סידרו את הביתים לכבוד שבת.;הן סידרנו את הבתים לכבוד שבת.|She tidied the house for Shabbat.|Ordenó la casa para el sábado.
יש לי ספר חדש.|יש לנו ספרים חדשים.|יש לי ספרים חדשים.;יש לנו ספרים חדשות.;יש לנו ספרות חדשים.|I have a new book.|Tengo un libro nuevo.
`, 5).map(r => ({ s: r[0], p: r[1], d: r[2].split(';'), en: r[3], es: r[4] }));

/* everyday sentences for building and dictation: he | en | es | level */
UL.sent = rows(`
בדרך כלל אני קמה מוקדם בבוקר.|I usually get up early in the morning.|Por lo general me levanto temprano.|a
בשעה שבע וחצי אני מטיילת עם הכלבה שלי.|At half past seven I walk my dog.|A las siete y media paseo a mi perra.|a
אחרי זה אני מטפלת בכלבה שלי.|After that I take care of my dog.|Después cuido a mi perra.|a
אני הולכת לאולפן בשעה שמונה ורבע.|I go to the ulpan at a quarter past eight.|Voy al ulpán a las ocho y cuarto.|a
בצהריים אני חוזרת הביתה ואוכלת.|At noon I go back home and eat.|Al mediodía vuelvo a casa y como.|a
אני תמיד אוכלת בבית.|I always eat at home.|Siempre como en casa.|a
לפעמים אני אוכלת במסעדה.|Sometimes I eat at a restaurant.|A veces como en un restaurante.|a
אני אף פעם לא אוכלת בשיעור.|I never eat in class.|Nunca como en clase.|a
אני תמיד הולכת לאולפן ברגל.|I always walk to the ulpan.|Siempre voy a pie al ulpán.|a
בדרך כלל אני קוראת חדשות באינטרנט.|I usually read the news online.|Por lo general leo las noticias en internet.|a
אני אוהבת את מזג האוויר ואת הטבע.|I love the weather and the nature.|Me encantan el clima y la naturaleza.|a
בשבת אני קונה מתנה למשפחה שלי.|On Shabbat I buy a present for my family.|El sábado compro un regalo para mi familia.|a
אתמול ראינו סרט בקולנוע.|Yesterday we saw a film at the cinema.|Ayer vimos una película en el cine.|a
הם קנו את הבשר בשוק.|They bought the meat at the market.|Compraron la carne en el mercado.|a
איפה ראית את הסרט?|Where did you see the film?|¿Dónde viste la película?|a
אני לומדת עברית כדי לעבוד כאחות.|I study Hebrew in order to work as a nurse.|Estudio hebreo para trabajar como enfermera.|a
אני גרה בדירה קטנה על יד הים.|I live in a small apartment near the sea.|Vivo en un apartamento pequeño cerca del mar.|a
המורה שלנו נחמדה מאוד.|Our teacher is very nice.|Nuestra profesora es muy simpática.|a
הספר של הילד נמצא על השולחן.|The boy's book is on the table.|El libro del niño está sobre la mesa.|a
התור לרופא בשעה עשר ורבע.|The doctor's appointment is at a quarter past ten.|El turno con el médico es a las diez y cuarto.|a
יש לי כאב ראש וחום.|I have a headache and a fever.|Tengo dolor de cabeza y fiebre.|a
אנחנו נפגשים כל שבת בבית קפה.|We meet every Saturday at a café.|Nos reunimos cada sábado en un café.|a
הם התחתנו בקיץ שעבר.|They got married last summer.|Se casaron el verano pasado.|a
נכנסתי לכיתה ואמרתי שלום.|I came into the class and said hello.|Entré en la clase y dije hola.|a
היא התקשרה לאימא שלה בערב.|She called her mother in the evening.|Llamó a su madre por la noche.|a
בשבוע הבא אסע לירושלים.|Next week I will travel to Jerusalem.|La semana que viene viajaré a Jerusalén.|b
מחר נלך לים עם החברים.|Tomorrow we will go to the beach with friends.|Mañana iremos a la playa con los amigos.|b
אל תשכח לקחת את התרופה!|Don't forget to take the medicine!|¡No olvides tomar el medicamento!|b
הרופא אמר שאני צריכה לנוח.|The doctor said I need to rest.|El médico dijo que necesito descansar.|b
אם יהיה לי זמן, אבקר אותך.|If I have time, I will visit you.|Si tengo tiempo, te visitaré.|b
`, 4).map(r => ({ he: r[0], en: r[1], es: r[2], lv: r[3] }));

/* vocabulary in context (exam part 6): sentence | answer | 2 distractors | en | es */
UL.voc = rows(`
כשאני נכנסת לחנות אני אומרת: _|אתה יכול לעזור לי?|להתראות!,מזל טוב!|When I walk into a shop I say: "Can you help me?"|Cuando entro a una tienda digo: "¿Puede ayudarme?"
אין לי כוח, אני _.|חלשה|שמנה,בריאה|I have no strength, I'm weak.|No tengo fuerzas, estoy débil.
בשוק אפשר לשלם רק _.|במזומן|בכרטיס אשראי,באהבה|At the market you can only pay cash.|En el mercado solo se puede pagar en efectivo.
ירושלים, צפת ועכו הן _.|ערים|הרים,ימים|Jerusalem, Safed and Acre are cities.|Jerusalén, Safed y Acre son ciudades.
רינה אוהבת את ה_, כי חם ואפשר ללכת לים.|קיץ|חורף,סתיו|Rina loves summer, because it's hot and you can go to the beach.|A Rina le encanta el verano, porque hace calor y se puede ir a la playa.
למי שחוגג יום הולדת אומרים: _|מזל טוב!|לילה טוב!,רפואה שלמה!|To someone celebrating a birthday you say "Mazal tov!"|A quien cumple años se le dice "¡Mazal tov!"
למי שחולה אומרים: _|רפואה שלמה!|מזל טוב!,בתיאבון!|To someone who is sick you say "Refua shlema!"|A quien está enfermo se le dice "¡Refuá shlemá!"
לפני האוכל אומרים: _|בתיאבון!|לחיים!,שבת שלום!|Before eating you say "Bete'avon!"|Antes de comer se dice "¡Beteavón!"
בבית מרקחת קונים _.|תרופות|בגדים,כרטיסים|At a pharmacy you buy medicines.|En la farmacia se compran medicamentos.
כדי לנסוע ברכבת צריך לקנות _.|כרטיס|מתנה,חשבון|To travel by train you need to buy a ticket.|Para viajar en tren hay que comprar un boleto.
אני צריכה לראות רופא, אז אני קובעת _ בקופת חולים.|תור|חשבון,שיעור|I need to see a doctor, so I book an appointment at the health fund.|Necesito ver a un médico, así que pido turno en la caja de salud.
אני לא מבינה. את יכולה _ שוב?|להסביר|לשמור,לסגור|I don't understand. Can you explain again?|No entiendo. ¿Puedes explicar otra vez?
הדירה רחוקה מהעבודה, לכן אני נוסעת _.|באוטובוס|ברגל,במעלית|The apartment is far from work, so I go by bus.|El apartamento está lejos del trabajo, por eso voy en autobús.
אחרי ארוחה גדולה אני כבר לא _.|רעבה|צעירה,חכמה|After a big meal I'm not hungry anymore.|Después de una comida grande ya no tengo hambre.
בבוקר אני שותה _ עם חלב.|קפה|לחם,ביצה|In the morning I drink coffee with milk.|Por la mañana tomo café con leche.
`, 5).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4] }));

/* Bet: possessive and inflected prepositions | answer | distractors | en | es */
UL.suffix = rows(`
זה הספר _. קניתי אותו אתמול.|שלי|שלו,שלה,שלנו|This is my book. I bought it yesterday.|Este es mi libro. Lo compré ayer.
דני, אני רוצה לדבר _ רגע.|איתך|אותך,לך,שלך|Danny, I want to talk with you for a moment.|Danny, quiero hablar contigo un momento.
רותי לא בבית. אני אתקשר _ מחר.|אליה|אותה,איתה,שלה|Ruti isn't home. I'll call her tomorrow.|Ruti no está en casa. La llamaré mañana.
יש _ שני ילדים: בן ובת.|לנו|אותנו,שלנו,איתנו|We have two children: a son and a daughter.|Tenemos dos hijos: un hijo y una hija.
ראיתי את המורה בקניון, אבל היא לא ראתה _.|אותי|לי,שלי,איתי|I saw the teacher at the mall, but she didn't see me.|Vi a la profesora en el centro comercial, pero ella no me vio.
הילדים ישנים _ סבתא בסוף השבוע.|אצל|עם,של,על יד|The children sleep at grandma's on the weekend.|Los niños duermen en casa de la abuela el fin de semana.
המפתחות _, תבקשי מהם.|אצלם|אותם,להם,שלהם|The keys are with them, ask them.|Las llaves las tienen ellos, pídeselas.
אני אוהבת את ההורים _ מאוד.|שלי|לי,אותי,איתי|I love my parents very much.|Quiero mucho a mis padres.
מה שלומך? _ טוב, תודה.|לי|אותי,שלי,איתי|How are you? I'm fine, thanks.|¿Cómo estás? Estoy bien, gracias.
הוא חבר טוב. אני סומכת _.|עליו|אותו,לו,שלו|He's a good friend. I trust him.|Es un buen amigo. Confío en él.
הבת _ לומדת באוניברסיטה.|שלהם|להם,אותם,אצלם|Their daughter studies at university.|Su hija estudia en la universidad.
אתם באים _ לסרט הערב?|איתנו|אותנו,לנו,שלנו|Are you coming with us to the film tonight?|¿Vienen con nosotros al cine esta noche?
`, 5).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4] }));

/* Bet: smichut | answer | distractors | en | es */
UL.smichut = rows(`
הילדים לומדים ב_ ליד הבית.|בית ספר|ספר בית,בית של ספר,בית הספרים|The children study at a school near home.|Los niños estudian en una escuela cerca de casa.
יש בעיר שלנו שלושה _.|בתי ספר|בתים ספר,בית ספרים,בתי ספרים|There are three schools in our city.|Hay tres escuelas en nuestra ciudad.
_ נמצא ליד הבנק.|בית הספר|הבית ספר,הבית הספר,בית ספר ה|The school is next to the bank.|La escuela está al lado del banco.
אני קונה תרופות ב_.|בית מרקחת|מרקחת בית,בית של מרקחת,ביתי מרקחת|I buy medicines at a pharmacy.|Compro medicamentos en una farmacia.
אכלנו _ עם קפה.|עוגת שוקולד|עוגה שוקולד,שוקולד עוגה,עוגות שוקולד אחת|We ate chocolate cake with coffee.|Comimos pastel de chocolate con café.
בסופר אני משלמת ב_.|כרטיס אשראי|אשראי כרטיס,כרטיס של אשראי,כרטיסי האשראי ה|At the supermarket I pay by credit card.|En el supermercado pago con tarjeta de crédito.
_ שלי עובד בבנק.|בעל הבית|הבעל בית,בעל בית ה,בעלת הבית|My landlord works at a bank.|Mi casero trabaja en un banco.
החדר הזה הוא _ של הילדים.|חדר השינה|החדר שינה,חדר שינה ה,השינה חדר|This room is the children's bedroom.|Esta habitación es el dormitorio de los niños.
בבית חולים יש הרבה _.|חדרי ניתוח|חדרים ניתוח,חדר ניתוחים,חדרי ניתוחים ה|A hospital has many operating rooms.|Un hospital tiene muchos quirófanos.
`, 5).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4] }));

/* Bet: future, conditions and "so that" | answer | distractors | en | es */
UL.cond = rows(`
אם יהיה חם מחר, אנחנו _ לים.|נלך|הלכנו,הולכים,ללכת|If it's hot tomorrow, we'll go to the beach.|Si mañana hace calor, iremos a la playa.
אם תלמדי כל יום, את _ את המבחן.|תעברי|עברת,עוברת,לעבור|If you study every day, you'll pass the exam.|Si estudias cada día, aprobarás el examen.
אני מדברת לאט כדי שכולם _.|יבינו|הבינו,מבינים,להבין|I speak slowly so that everyone understands.|Hablo despacio para que todos entiendan.
המורה אמרה ש_ מבחן בשבוע הבא.|יהיה|היה,הייתה,להיות|The teacher said there will be a test next week.|La profesora dijo que habrá un examen la semana que viene.
אל _ את החלון, קר בחוץ!|תפתח|פתח,פותח,לפתוח|Don't open the window, it's cold outside!|¡No abras la ventana, hace frío afuera!
אל _ לקחת את התרופה אחרי האוכל!|תשכחי|שכחת,שוכחת,לשכוח|Don't forget to take the medicine after eating!|¡No olvides tomar el medicamento después de comer!
_ את הדלת, בבקשה. (לסגור, אתה)|סגור|תסגרי,סוגר,סגרת|Close the door, please.|Cierra la puerta, por favor.
רותי, _ לי בבקשה את המלח. (לתת)|תני|תן,נותנת,נתת|Ruti, please pass me the salt.|Ruti, pásame la sal, por favor.
כשאגמור את האולפן, אני _ לעבוד בבית חולים.|אתחיל|התחלתי,מתחילה,להתחיל|When I finish the ulpan, I'll start working at a hospital.|Cuando termine el ulpán, empezaré a trabajar en un hospital.
בשבוע הבא הם _ ויצאו לחופשה בטבריה.|יתחתנו|התחתנו,מתחתנים,להתחתן|Next week they'll get married and go on holiday in Tiberias.|La semana que viene se casarán y se irán de vacaciones a Tiberíades.
`, 5).map(r => ({ s: r[0], a: r[1], d: r[2].split(','), en: r[3], es: r[4] }));

/* extra words for each verb, so generated sentences sound natural */
UL.vx = {
  'לכתוב': 'מכתב לאימא', 'ללמוד': 'עברית באולפן', 'לעבוד': 'בבית החולים', 'לגמור': 'את העבודה', 'לסגור': 'את החלון', 'לפתוח': 'את הדלת',
  'לבדוק': 'את הבדיקות', 'לשמוע': 'מוזיקה ברדיו', 'לזכור': 'את המילים החדשות', 'לחשוב': 'על המבחן', 'לשאול': 'את המורה שאלה', 'לשלוח': 'הודעה לחבר',
  'לפגוש': 'את דני בקניון', 'לעזור': 'לשכנה הזקנה', 'לשכוח': 'את המפתח בבית', 'לחזור': 'הביתה מאוחר', 'לקרוא': 'ספר בעברית', 'לרקוד': 'בחתונה',
  'לשמור': 'על הילדים', 'לצחוק': 'מהסרט', 'לגדול': 'בקראקס', 'לדבר': 'עם הרופא', 'לספר': 'לחברים על הטיול', 'לבקר': 'את סבתא', 'לשלם': 'במזומן',
  'לחפש': 'עבודה חדשה', 'לטפל': 'בחולים', 'לסדר': 'את החדר', 'לבקש': 'עזרה מהמורה', 'לקבל': 'מתנה יפה', 'לבשל': 'ארוחת ערב', 'לשחק': 'עם הכלב',
  'לסבול': 'מהחום', 'להזמין': 'פיצה הביתה', 'להתחיל': 'לעבוד בשמונה', 'להמשיך': 'ללמוד בערב', 'להרגיש': 'טוב יותר', 'להסביר': 'את השיעור', 'להחליט': 'לנסוע לאילת',
  'להפריע': 'לשכנים', 'להמליץ': 'על המסעדה', 'להסכים': 'עם המורה', 'להדליק': 'את האור', 'להתלבש': 'מהר', 'להתקשר': 'לאימא', 'להתחתן': 'בקיץ',
  'להתרגש': 'לפני המבחן', 'להתרחץ': 'בים', 'להתפלל': 'בבית הכנסת', 'להתרגל': 'לחום', 'להתקדם': 'בעברית', 'להסתכל': 'על התמונות', 'להשתמש': 'במחשב',
  'להצטער': 'על הרעש', 'להתקלח': 'בערב', 'להיכנס': 'לכיתה', 'להיפגש': 'בבית קפה', 'להישאר': 'בבית', 'להירדם': 'מול הטלוויזיה', 'להיזהר': 'בכביש',
  'לקנות': 'ירקות בשוק', 'לשתות': 'קפה עם חלב', 'לראות': 'סרט בקולנוע', 'לעשות': 'שיעורי בית', 'לרצות': 'לנוח', 'לבנות': 'בית חדש', 'לענות': 'על השאלה',
  'לעלות': 'במדרגות', 'לפנות': 'ימינה', 'להיות': 'בבית', 'לגור': 'בתל אביב', 'לקום': 'מוקדם', 'לבוא': 'לשיעור', 'לשים': 'את הספר על השולחן', 'לרוץ': 'בפארק',
  'לטוס': 'לאילת', 'לשבת': 'בכיתה', 'לרדת': 'מהאוטובוס', 'לצאת': 'מהבית', 'לדעת': 'את התשובה', 'ללכת': 'לסופר', 'לקחת': 'את התרופה', 'לתת': 'מתנה לחבר',
  'לנסוע': 'לירושלים', 'ליפול': 'ברחוב', 'לאכול': 'ארוחת בוקר', 'לאהוב': 'את הסרט', 'לומר': 'תודה למורה', 'לנסות': 'לדבר עברית', 'לחכות': 'לאוטובוס',
  'לנקות': 'את הבית', 'להבין': 'את השאלה', 'להכיר': 'את המורה החדשה', 'להגיע': 'לעבודה בזמן', 'להביא': 'עוגה למסיבה'
};
})();
