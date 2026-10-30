NX.addModule({
  id: 'mat', icon: '🤰',
  t: ['Maternity & Women’s Health', 'Maternidad y salud de la mujer'],
  b: ['Pregnancy, labor, fetal monitoring, postpartum, newborn and breastfeeding (Olds’ Maternal-Newborn).', 'Embarazo, parto, monitorización fetal, puerperio, recién nacido y lactancia (Olds’ Maternal-Newborn).'],
  exam: 'Gynecology and midwifery nursing',
  lessons: [
    { t: ['Pregnancy basics', 'Bases del embarazo'],
      p: [
        ['Naegele’s rule: first day of last menstrual period - 3 months + 7 days (+1 year) = estimated due date.', 'Regla de Naegele: primer día de la última menstruación - 3 meses + 7 días (+1 año) = fecha probable de parto.'],
        ['G/P: gravida = number of pregnancies; para = births after 20 weeks. TPAL: Term, Preterm, Abortions, Living children.', 'G/P: gesta = número de embarazos; para = partos tras 20 semanas. TPAL: a término, pretérmino, abortos, hijos vivos.'],
        ['Fetal heart rate normal 110-160/min. Fundal height in cm ≈ weeks of pregnancy between about 20 and 36 weeks.', 'FCF normal 110-160/min. Altura uterina en cm ≈ semanas entre ~20 y 36.'],
        ['Gestational diabetes screening at 24-28 weeks. Rh-negative mother: anti-D immunoglobulin at about 28 weeks and within 72 h after birth of an Rh-positive baby.', 'Cribado de diabetes gestacional a las 24-28 semanas. Madre Rh negativa: inmunoglobulina anti-D hacia las 28 semanas y en las 72 h tras el parto de un bebé Rh positivo.']
      ],
      v: [['pregnancy', 'embarazo', 'היריון', 'herayon'], ['pregnant woman', 'embarazada', 'אישה בהיריון', 'isha be-herayon'], ['fetus', 'feto', 'עובר', 'ubar'], ['uterus', 'útero', 'רחם', 'rechem']] },
    { t: ['Danger signs: preeclampsia, bleeding', 'Señales de alarma: preeclampsia, sangrado'],
      p: [
        ['Preeclampsia: BP 140/90 or more after 20 weeks with proteinuria or organ signs (headache, vision changes, epigastric pain). Eclampsia = seizures.', 'Preeclampsia: PA ≥140/90 tras la semana 20 con proteinuria o signos de órgano (cefalea, visión borrosa, dolor epigástrico). Eclampsia = convulsiones.'],
        ['Magnesium sulfate prevents seizures. Monitor reflexes, respiratory rate (stop if below 12), urine output and level. Antidote: calcium gluconate.', 'El sulfato de magnesio previene convulsiones. Vigilar reflejos, FR (suspender si <12), diuresis y niveles. Antídoto: gluconato cálcico.'],
        ['Placenta previa: painless bright red bleeding; no vaginal exam. Placental abruption: painful bleeding, rigid board-like uterus; emergency.', 'Placenta previa: sangrado rojo indoloro; sin tacto vaginal. Desprendimiento: sangrado doloroso, útero rígido “en tabla”; urgencia.']
      ],
      v: [['bleeding', 'sangrado', 'דימום', 'dimum'], ['seizure', 'convulsión', 'פרכוס', 'pirkus'], ['placenta', 'placenta', 'שליה', 'shilya']] },
    { t: ['Labor and fetal monitoring', 'Parto y monitorización fetal'],
      p: [
        ['Stages: 1 dilation to 10 cm (latent, active, transition); 2 full dilation to birth; 3 birth to delivery of placenta; 4 the first hours of recovery.', 'Etapas: 1 dilatación hasta 10 cm (latente, activa, transición); 2 de dilatación completa al nacimiento; 3 alumbramiento de la placenta; 4 primeras horas de recuperación.'],
        ['Decelerations VEAL CHOP: Variable = Cord compression; Early = Head compression (benign); Accelerations = OK; Late = Placental insufficiency.', 'Desaceleraciones VEAL CHOP: Variables = compresión del Cordón; Precoces = compresión de la cabeza (benignas); Aceleraciones = bien; Tardías = insuficiencia Placentaria.'],
        ['Late decelerations: turn to the left side, stop oxytocin, give IV fluids and oxygen per protocol, notify. Ruptured membranes: check fetal heart right away (cord prolapse risk).', 'Desaceleraciones tardías: decúbito lateral izquierdo, suspender oxitocina, líquidos IV y oxígeno según protocolo, avisar. Rotura de membranas: controlar FCF enseguida (riesgo de prolapso de cordón).'],
        ['Cord prolapse: relieve pressure on the cord (hand in vagina lifting the presenting part, knee-chest position), call for emergency birth. Circular 172/2021 covers RN competence in assisting an emergency birth.', 'Prolapso de cordón: liberar la presión (mano en vagina elevando la presentación, posición genupectoral) y avisar para parto urgente. La circular 172/2021 trata de la competencia de la enfermera en el parto de urgencia.']
      ],
      v: [['labor / birth', 'parto', 'לידה', 'leida'], ['contraction', 'contracción', 'ציר', 'tzir'], ['umbilical cord', 'cordón umbilical', 'חבל הטבור', 'chevel ha-tabur'], ['midwife', 'matrona', 'מיילדת', 'meyaledet']] },
    { t: ['Postpartum and newborn', 'Puerperio y recién nacido'],
      p: [
        ['Fundus should be firm, midline, near the umbilicus after birth and descend about 1 cm a day. A soft “boggy” uterus: massage the fundus first. A displaced fundus usually means a full bladder.', 'El fondo uterino debe estar firme, central, a nivel del ombligo y descender ~1 cm al día. Si está blando: masaje uterino primero. Desviado suele indicar vejiga llena.'],
        ['Lochia: rubra (red, days 1-3), serosa (pink-brown), alba (white). Large clots or soaking a pad in an hour = hemorrhage risk.', 'Loquios: rubra (rojos, días 1-3), serosa (rosados), alba (blancos). Coágulos grandes o empapar una compresa en una hora = riesgo de hemorragia.'],
        ['Apgar at 1 and 5 minutes: heart rate, respiratory effort, muscle tone, reflex irritability, colour (0-2 each, max 10).', 'Apgar al 1 y a los 5 minutos: frecuencia cardiaca, esfuerzo respiratorio, tono, reflejos, color (0-2 cada uno, máx. 10).'],
        ['Newborn care: vitamin K IM, eye prophylaxis, hepatitis B vaccine, keep warm, skin-to-skin. Jaundice in the first 24 h is pathological.', 'Cuidados del recién nacido: vitamina K IM, profilaxis ocular, vacuna de hepatitis B, mantener el calor, piel con piel. Ictericia en las primeras 24 h es patológica.'],
        ['Breastfeeding teaching (circular 142/2018): good latch with areola in mouth, feed on demand 8-12 times a day, 6 or more wet diapers a day after day 4-5.', 'Educación en lactancia (circular 142/2018): buen agarre con la areola en la boca, a demanda 8-12 veces al día, ≥6 pañales mojados al día después del día 4-5.']
      ],
      v: [['newborn', 'recién nacido', 'יילוד', 'yilod'], ['breastfeeding', 'lactancia', 'הנקה', 'hanaka'], ['jaundice', 'ictericia', 'צהבת', 'tzahevet'], ['woman after birth', 'puérpera', 'יולדת', 'yoledet']] }
  ],
  q: [
    [1, 0, 'LMP was 10 March 2026. By Naegele’s rule, the due date is:', 'FUM 10 de marzo de 2026. Según Naegele, la fecha probable de parto es:', ['17 December 2026', '10 December 2026', '3 January 2027', '17 November 2026'], ['17 de diciembre de 2026', '10 de diciembre de 2026', '3 de enero de 2027', '17 de noviembre de 2026'], 'March - 3 months = December; 10 + 7 = 17 → 17 December 2026.', 'Marzo - 3 meses = diciembre; 10 + 7 = 17 → 17 de diciembre de 2026.'],
    [2, 2, 'The monitor shows late decelerations. Which action comes first?', 'El monitor muestra desaceleraciones tardías. ¿Qué hacer primero?', ['Increase the oxytocin', 'Place the woman supine', 'Turn her to the left side and stop the oxytocin', 'Document and recheck in 1 hour'], ['Aumentar la oxitocina', 'Colocarla en decúbito supino', 'Girarla a la izquierda y suspender la oxitocina', 'Documentar y revisar en 1 hora'], 'Late decelerations = placental insufficiency; improve uterine blood flow first.', 'Tardías = insuficiencia placentaria; primero mejorar el flujo uteroplacentario.'],
    [2, 1, 'A woman on magnesium sulfate has RR 10/min and absent reflexes. Which drug should be ready?', 'Una mujer con sulfato de magnesio tiene FR 10/min y reflejos ausentes. ¿Qué fármaco preparar?', ['Oxytocin', 'Calcium gluconate', 'Naloxone', 'Vitamin K'], ['Oxitocina', 'Gluconato cálcico', 'Naloxona', 'Vitamina K'], 'Signs of magnesium toxicity: stop the infusion, give calcium gluconate per order.', 'Signos de toxicidad por magnesio: suspender la infusión y dar gluconato cálcico según orden.'],
    [1, 3, 'One hour after birth the uterus is soft and bleeding is heavy. First action?', 'Una hora tras el parto el útero está blando y hay sangrado abundante. ¿Primera acción?', ['Give a bedpan', 'Call the family', 'Lower the head of the bed only', 'Massage the fundus'], ['Dar una cuña', 'Llamar a la familia', 'Solo bajar la cabecera', 'Masaje del fondo uterino'], 'Uterine atony is the main cause of postpartum hemorrhage; massage first.', 'La atonía es la principal causa de hemorragia posparto; masaje primero.'],
    [3, 0, 'Painless bright red vaginal bleeding at 32 weeks. What should the nurse avoid?', 'Sangrado vaginal rojo e indoloro a las 32 semanas. ¿Qué debe evitar la enfermera?', ['A vaginal examination', 'Fetal heart monitoring', 'IV access', 'Counting pads'], ['El tacto vaginal', 'La monitorización fetal', 'La vía IV', 'Contar compresas'], 'Suspected placenta previa: no vaginal exam (could cause massive bleeding).', 'Sospecha de placenta previa: no tacto vaginal (puede provocar hemorragia masiva).'],
    [3, 2, 'A newborn has HR 110, weak cry, some flexion, grimace, blue hands and feet. Apgar?', 'Recién nacido con FC 110, llanto débil, algo de flexión, mueca, manos y pies azulados. ¿Apgar?', ['4', '5', '6', '8'], 0, 'HR >100 = 2, weak cry = 1, some flexion = 1, grimace = 1, acrocyanosis = 1 → 6.', 'FC >100 = 2, llanto débil = 1, algo de flexión = 1, mueca = 1, acrocianosis = 1 → 6.']
  ]
});
