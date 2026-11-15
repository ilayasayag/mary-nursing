/* Mock tests 5 and 6: eight new stations in the official format (Ministry briefing, 24.10.2026), so the
   last days before the exam bring cases she has not met. Same station format as js/data/mocks.js; content
   follows the app's units (Brunner & Suddarth, Wong's, Olds'), circular 204/2023 for anaphylaxis doses,
   and the sepsis and DKA rules already taught in Units 2 and 3. */

/* internal medicine */
NX.stations.push(
  { id: 'x-dka', kind: 'acute', img: 'man', area: 'medsurg', mins: 15, t: ['Vomiting with very high sugar', 'Vómitos con el azúcar muy alto'],
    door: ['Medical ward. Daniel, 24, type 1 diabetes, two days of vomiting; he stopped his insulin because he “wasn’t eating”. Glucose 510 mg/dL. Task: assess and manage.', 'Medicina interna. Daniel, 24, diabetes tipo 1, dos días de vómitos; dejó la insulina porque “no comía”. Glucosa 510 mg/dL. Tarea: valorar y actuar.'],
    steps: [
      { k: 'assess', v: { hr: 124, bp: '98/60', spo2: 98, rr: 30, t: 37.4, gl: 510 }, s: ['He breathes deeply and fast, his breath smells fruity. What do you suspect and check?', 'Respira profundo y rápido, con aliento afrutado. ¿Qué sospechas y qué compruebas?'],
        c: [[2, 'DKA: check ketones, blood gas and potassium', 'CAD: cetonas, gasometría y potasio', 'Kussmaul breathing, fruity breath and high glucose after missed insulin: diabetic ketoacidosis.', 'Respiración de Kussmaul, aliento afrutado y glucosa alta tras dejar la insulina: cetoacidosis diabética.'],
          [0, 'An anxiety attack: coach slower breathing', 'Ansiedad: guiarle para respirar más lento', 'His fast deep breathing compensates for acidosis; slowing it is harmful.', 'La respiración rápida y profunda compensa la acidosis; frenarla es dañino.'],
          [1, 'Gastroenteritis: give an antiemetic first', 'Gastroenteritis: antiemético primero', 'He may need one, but the emergency is the ketoacidosis.', 'Puede necesitarlo, pero la urgencia es la cetoacidosis.'],
          [0, 'Hypoglycemia: give him 15 g of sugar', 'Hipoglucemia: darle 15 g de azúcar', 'His glucose is 510 mg/dL.', 'Su glucosa es de 510 mg/dL.']] },
      { k: 'act', v: { hr: 120, bp: '96/58', spo2: 98, rr: 28, t: 37.4, gl: 498 }, s: ['The doctor orders IV fluids and an insulin infusion. His potassium is 3.1 mEq/L. What comes first?', 'El médico pauta sueros IV e insulina en infusión. Su potasio es 3,1 mEq/L. ¿Qué va primero?'],
        c: [[2, 'Fluids and potassium; insulin once K is up', 'Líquidos y potasio; insulina cuando suba el K', 'Insulin drives potassium into cells; starting it with K below 3.3 risks fatal arrhythmias.', 'La insulina mete el potasio en las células; iniciarla con K < 3,3 arriesga arritmias mortales.'],
          [-1, 'Start the insulin infusion right away', 'Iniciar la insulina enseguida', 'With K 3.1 this can drop potassium to a dangerous level.', 'Con K 3,1 puede bajar el potasio a un nivel peligroso.'],
          [0, 'A bolus of subcutaneous insulin and wait', 'Un bolo de insulina subcutánea y esperar', 'DKA is treated with an IV infusion, after fluids and potassium.', 'La CAD se trata con infusión IV, tras líquidos y potasio.'],
          [0, 'Restrict fluids to protect the heart', 'Restringir líquidos para proteger el corazón', 'He is severely dehydrated; fluids come first.', 'Está muy deshidratado; los líquidos van primero.']] },
      { k: 'assess', v: { hr: 102, bp: '112/70', spo2: 98, rr: 22, t: 37.2, gl: 240 }, s: ['Four hours later glucose is 240 mg/dL but he still has ketones. Next step usually ordered?', 'Cuatro horas después la glucosa es 240 mg/dL pero sigue con cetonas. ¿Siguiente paso habitual?'],
        c: [[2, 'Add dextrose to the fluids, keep the insulin', 'Añadir glucosa al suero y mantener la insulina', 'Insulin is still needed to clear the ketones; dextrose prevents hypoglycemia.', 'La insulina sigue haciendo falta para eliminar las cetonas; la glucosa previene la hipoglucemia.'],
          [-1, 'Stop the insulin: the glucose is fine now', 'Parar la insulina: la glucosa ya está bien', 'Ketoacidosis would return; the acidosis is not resolved.', 'La cetoacidosis volvería; la acidosis no está resuelta.'],
          [0, 'Give him a large meal to raise the sugar', 'Darle una comida grande para subir el azúcar', 'He is still unwell and nauseated; this is managed by IV fluids.', 'Sigue mal y con náuseas; se maneja con sueros IV.'],
          [1, 'Recheck the glucose again in four hours', 'Revisar la glucosa de nuevo en cuatro horas', 'Too long: glucose is checked hourly on an insulin infusion.', 'Demasiado tiempo: con insulina IV la glucosa se mide cada hora.']] }
    ],
    dq: [[1, ['Why must potassium be watched closely during insulin for DKA?', '¿Por qué hay que vigilar de cerca el potasio con insulina en la CAD?'], ['Insulin makes the kidneys keep it', 'Insulin moves potassium into cells', 'Potassium raises blood glucose', 'Ketones bind potassium in blood'], ['La insulina hace que el riñón lo retenga', 'La insulina mete el potasio en las células', 'El potasio sube la glucosa', 'Las cetonas fijan el potasio'], 'Insulin shifts potassium into cells, so the blood level can fall fast.', 'La insulina desplaza el potasio a las células y su nivel en sangre puede bajar rápido.']] },
  { id: 'x-gibleed', kind: 'acute', img: 'oldman', area: 'medsurg', mins: 15, t: ['Vomiting blood', 'Vómitos con sangre'],
    door: ['Medical ward. Shlomo, 66, takes ibuprofen daily for his knees. He vomited bright red blood and feels faint. Task: assess and manage.', 'Medicina interna. Shlomo, 66, toma ibuprofeno a diario por las rodillas. Vomitó sangre roja y se siente mareado. Tarea: valorar y actuar.'],
    steps: [
      { k: 'act', v: { hr: 122, bp: '94/58', spo2: 96, rr: 22, t: 36.6 }, s: ['He is pale and sweaty. First actions?', 'Está pálido y sudoroso. ¿Primeras acciones?'],
        c: [[2, 'Call for help, 2 large IV lines, nil by mouth', 'Pedir ayuda, 2 vías gruesas, dieta absoluta', 'Signs of shock from an upper GI bleed: large-bore access for fluids and blood, nothing by mouth.', 'Signos de shock por hemorragia digestiva alta: vías gruesas para líquidos y sangre, nada por boca.'],
          [0, 'Give him water to rinse his mouth and rest', 'Darle agua para enjuagarse y que descanse', 'Not the priority, and he may need endoscopy.', 'No es la prioridad, y puede necesitar endoscopia.'],
          [1, 'Measure all vital signs again in 15 minutes', 'Repetir todas las constantes en 15 minutos', 'He is already in shock: act now.', 'Ya está en shock: actuar ya.'],
          [-1, 'Sit him upright and give his next ibuprofen', 'Sentarlo y darle su siguiente ibuprofeno', 'NSAIDs likely caused the ulcer; upright worsens low BP.', 'Los AINE probablemente causaron la úlcera; sentarlo empeora la hipotensión.']] },
      { k: 'assess', v: { hr: 118, bp: '96/60', spo2: 97, rr: 20, t: 36.6 }, s: ['Blood is ordered. Which result do you send and check before the transfusion?', 'Se pauta sangre. ¿Qué pruebas envías y compruebas antes de la transfusión?'],
        c: [[2, 'Type and crossmatch, Hb, clotting, consent', 'Grupo y cruzadas, Hb, coagulación, consentimiento', 'Blood needs compatibility testing and signed consent (circular 03/2014).', 'La sangre requiere pruebas de compatibilidad y consentimiento firmado (circular 03/2014).'],
          [0, 'Only his blood glucose and a urine test', 'Solo la glucosa en sangre y la orina', 'Not what a transfusion needs.', 'No es lo que necesita una transfusión.'],
          [1, 'A full blood count, and nothing else', 'Un hemograma completo y nada más', 'Needed, but compatibility and consent are missing.', 'Hace falta, pero faltan la compatibilidad y el consentimiento.'],
          [0, 'A chest X-ray before anything else at all', 'Una radiografía de tórax antes que nada más', 'Not needed before blood.', 'No hace falta antes de la sangre.']] },
      { k: 'act', v: { hr: 108, bp: '102/64', spo2: 97, rr: 20, t: 38.2 }, s: ['15 minutes into the transfusion: temperature 38.2 °C, chills, back pain. First?', 'A los 15 minutos de la transfusión: 38,2 °C, escalofríos, dolor lumbar. ¿Primero?'],
        c: [[2, 'Stop it, keep the IV open, call for help', 'Pararla, vía abierta con suero, avisar', 'Possible hemolytic reaction: stop the blood, keep IV access, notify, return the bag per protocol.', 'Posible reacción hemolítica: parar la sangre, mantener la vía, avisar y devolver la bolsa según protocolo.'],
          [-1, 'Slow it down and finish the unit', 'Bajar el ritmo y terminar la unidad', 'Continuing a reaction can be fatal.', 'Continuar ante una reacción puede ser mortal.'],
          [0, 'Give paracetamol and continue', 'Dar paracetamol y continuar', 'Masks the reaction while it goes on.', 'Enmascara la reacción mientras sigue.'],
          [1, 'Recheck his identity on the wristband', 'Volver a comprobar su identidad', 'Part of the investigation, after stopping the blood.', 'Parte de la investigación, tras parar la sangre.']] }
    ],
    dq: [[2, ['Which drug group most likely caused his bleeding?', '¿Qué grupo de fármacos causó probablemente su sangrado?'], ['ACE inhibitors', 'Statins', 'NSAIDs', 'Diuretics'], ['IECA', 'Estatinas', 'AINE', 'Diuréticos'], 'NSAIDs such as ibuprofen damage the stomach lining and cause peptic ulcers.', 'Los AINE como el ibuprofeno dañan la mucosa gástrica y causan úlcera péptica.']] }
);

/* adult surgical */
NX.stations.push(
  { id: 'x-thyroid', kind: 'acute', img: 'woman', area: 'medsurg', mins: 15, t: ['After a thyroidectomy', 'Tras una tiroidectomía'],
    door: ['Surgical ward, 6 hours after a total thyroidectomy. Rivka, 52, says her dressing feels tight and her voice sounds different. Task: assess and manage.', 'Cirugía, 6 horas tras una tiroidectomía total. Rivka, 52, dice que nota el apósito apretado y la voz distinta. Tarea: valorar y actuar.'],
    steps: [
      { k: 'assess', v: { hr: 104, bp: '138/84', spo2: 94, rr: 24, t: 37.0 }, s: ['The neck is swollen under the dressing and she has new noisy breathing. Most urgent concern?', 'El cuello está hinchado bajo el apósito y tiene una respiración ruidosa nueva. ¿Preocupación más urgente?'],
        c: [[2, 'A neck hematoma pressing on the airway', 'Un hematoma que comprime la vía aérea', 'Swelling with stridor after neck surgery threatens the airway: call the surgeon urgently.', 'Hinchazón con estridor tras cirugía del cuello amenaza la vía aérea: avisar al cirujano urgente.'],
          [0, 'Normal swelling after this operation', 'Una hinchazón normal tras esta cirugía', 'New stridor is never normal.', 'Un estridor nuevo nunca es normal.'],
          [1, 'Low calcium from parathyroid injury', 'Calcio bajo por lesión paratiroidea', 'A real risk later, but the airway comes first.', 'Un riesgo real más adelante, pero la vía aérea va primero.'],
          [0, 'Anxiety about her changed voice', 'Ansiedad por el cambio de voz', 'The noisy breathing is physical, not anxiety.', 'La respiración ruidosa es física, no ansiedad.']] },
      { k: 'act', v: { hr: 110, bp: '140/86', spo2: 92, rr: 26, t: 37.0 }, s: ['While you wait for the surgeon, what do you do?', 'Mientras esperas al cirujano, ¿qué haces?'],
        c: [[2, 'Sit her up, oxygen, stay, airway kit ready', 'Incorporarla, oxígeno, no irse, kit de vía aérea', 'Semi-Fowler’s, oxygen and the emergency airway equipment; never leave her.', 'Semi-Fowler, oxígeno y el material de vía aérea urgente; no dejarla sola.'],
          [-1, 'Lay her flat and put an ice pack on her neck', 'Tumbarla del todo y poner hielo en el cuello', 'Lying flat worsens her breathing.', 'Tumbada respira peor.'],
          [0, 'Rewrap the dressing more tightly', 'Volver a vendar el cuello más apretado', 'Tightening increases pressure on the airway.', 'Apretar aumenta la presión sobre la vía aérea.'],
          [1, 'Give the ordered pain relief and recheck', 'Dar la analgesia pautada y revalorar luego', 'Pain relief can wait: the airway is at risk.', 'La analgesia puede esperar: la vía aérea está en riesgo.']] },
      { k: 'assess', v: { hr: 96, bp: '132/80', spo2: 97, rr: 18, t: 36.9 }, s: ['The next day, after the hematoma was drained, she has tingling around her lips. What do you check?', 'Al día siguiente, tras drenar el hematoma, tiene hormigueo alrededor de los labios. ¿Qué compruebas?'],
        c: [[2, 'Calcium level, Chvostek and Trousseau', 'Calcio y signos de Chvostek o Trousseau', 'Perioral tingling after thyroid surgery suggests hypocalcemia; IV calcium gluconate should be available.', 'El hormigueo peribucal tras una cirugía tiroidea sugiere hipocalcemia; debe haber gluconato cálcico IV.'],
          [0, 'Her blood glucose before lunch only', 'Solo su glucemia antes de comer', 'Not the cause of these symptoms.', 'No es la causa de estos síntomas.'],
          [0, 'Her potassium and a urine sample', 'Su potasio y una muestra de orina', 'Not the likely problem here.', 'No es el problema probable aquí.'],
          [1, 'Her thyroid hormone level tomorrow', 'Su nivel de hormona tiroidea mañana', 'Useful later; the calcium is urgent.', 'Útil más tarde; el calcio es urgente.']] }
    ],
    dq: [[0, ['After a thyroidectomy, which item must be at the bedside?', 'Tras una tiroidectomía, ¿qué debe estar junto a la cama?'], ['A tracheostomy set and suction', 'An extra pillow for the neck', 'A heating pad for the wound', 'A glucose meter only'], ['Un set de traqueostomía y aspirador', 'Una almohada extra para el cuello', 'Una manta eléctrica para la herida', 'Solo un glucómetro'], 'Airway compromise (hematoma, laryngeal edema) is the main early danger: suction and emergency airway equipment at the bedside.', 'El compromiso de la vía aérea (hematoma, edema laríngeo) es el principal peligro precoz: aspirador y material de vía aérea junto a la cama.']] },
  { id: 'x-sepsis2', kind: 'acute', img: 'man', area: 'medsurg', mins: 15, t: ['Fever on day 4 after surgery', 'Fiebre el día 4 tras la cirugía'],
    door: ['Surgical ward, day 4 after a bowel resection. Amir, 61, has new abdominal pain and is shivering. Task: assess and manage.', 'Cirugía, día 4 tras una resección intestinal. Amir, 61, tiene dolor abdominal nuevo y tiritona. Tarea: valorar y actuar.'],
    steps: [
      { k: 'assess', v: { hr: 124, bp: '88/52', spo2: 94, rr: 26, t: 38.9 }, s: ['He is confused and his abdomen is rigid. What do you suspect?', 'Está confuso y tiene el abdomen rígido. ¿Qué sospechas?'],
        c: [[2, 'Sepsis, possibly from an anastomotic leak', 'Sepsis, posiblemente por fuga anastomótica', 'Fever, tachycardia, low BP, confusion and peritonism after bowel surgery: septic shock from a leak until proven otherwise.', 'Fiebre, taquicardia, hipotensión, confusión y peritonismo tras cirugía intestinal: shock séptico por fuga hasta que se demuestre lo contrario.'],
          [0, 'Normal post-operative pain and fever', 'Dolor y fiebre normales tras la cirugía', 'Day 4 shock with confusion is not normal.', 'Shock con confusión el día 4 no es normal.'],
          [1, 'A urinary infection from the catheter', 'Una infección urinaria por la sonda', 'Possible, but it does not explain the rigid abdomen.', 'Posible, pero no explica el abdomen rígido.'],
          [0, 'Anxiety about his long hospital stay', 'Ansiedad por el ingreso prolongado', 'His vital signs show shock.', 'Sus constantes muestran shock.']] },
      { k: 'act', v: { hr: 126, bp: '86/50', spo2: 95, rr: 26, t: 38.9 }, s: ['The physician is coming. Which bundle actions do you start?', 'Viene el médico. ¿Qué acciones del paquete de sepsis inicias?'],
        c: [[2, 'Cultures, lactate, fluids, antibiotics fast', 'Cultivos, lactato, líquidos, antibióticos ya', 'Blood cultures, lactate and IV fluids, then antibiotics without delay; nil by mouth for possible surgery.', 'Hemocultivos, lactato y sueros IV, y luego antibióticos sin demora; dieta absoluta por posible cirugía.'],
          [1, 'Paracetamol and recheck in an hour', 'Paracetamol y volver a valorar en una hora', 'Treats the fever, not the shock.', 'Trata la fiebre, no el shock.'],
          [-1, 'Wait for the culture results before anything', 'Esperar los cultivos antes de nada', 'Delaying antibiotics in septic shock raises mortality.', 'Retrasar antibióticos en el shock séptico aumenta la mortalidad.'],
          [0, 'Encourage him to drink and walk', 'Animarlo a beber y caminar', 'He may need surgery and is unstable.', 'Puede necesitar cirugía y está inestable.']] },
      { k: 'comm', v: { hr: 112, bp: '98/60', spo2: 96, rr: 22, t: 38.6 }, s: ['You call the surgeon. Which SBAR opening is best?', 'Llamas al cirujano. ¿Qué inicio SBAR es mejor?'],
        c: [[2, '“Amir, day 4 post resection, likely septic shock.”', '“Amir, día 4 de resección, probable shock séptico.”', 'Situation first: who, where, and the main concern, then the numbers.', 'Primero la situación: quién, dónde y la preocupación principal; luego las cifras.'],
          [0, '“I just wanted to tell you he seems unwell.”', '“Solo quería decirle que hoy no se le ve bien.”', 'Vague: gives no concern or data.', 'Vago: no da preocupación ni datos.'],
          [1, '“His BP is 86/50 and HR 126.”', '“Su PA es 86/50 y FC 126.”', 'Good data, but start with who he is and your concern.', 'Buenos datos, pero empieza por quién es y tu preocupación.'],
          [0, '“Can you come when you have a minute?”', '“¿Puede venir cuando tenga un minuto?”', 'Not urgent enough for septic shock.', 'No transmite urgencia ante un shock séptico.']] }
    ],
    dq: [[3, ['Which lab value helps measure the severity of sepsis?', '¿Qué valor de laboratorio ayuda a medir la gravedad de la sepsis?'], ['Cholesterol', 'Thyroid hormones', 'Serum amylase', 'Serum lactate'], ['Colesterol', 'Hormonas tiroideas', 'Amilasa sérica', 'Lactato sérico'], 'A raised lactate shows poor tissue perfusion and guides fluid resuscitation.', 'Un lactato elevado indica mala perfusión tisular y guía la reposición de líquidos.']] }
);

/* child */
NX.stations.push(
  { id: 'x-anaph', kind: 'acute', img: 'boy', area: 'peds', mins: 15, t: ['Swelling after a snack', 'Hinchazón tras un tentempié'],
    door: ['Pediatric ward. Yoni, 6, 22 kg, ate a cookie with peanuts at a birthday in the playroom. His lips are swelling. His mother is with him. Task: assess and manage.', 'Pediatría. Yoni, 6 años, 22 kg, comió una galleta con cacahuetes en un cumpleaños en la sala de juegos. Se le hinchan los labios. Su madre está con él. Tarea: valorar y actuar.'],
    steps: [
      { k: 'assess', v: { hr: 142, bp: '84/50', spo2: 92, rr: 34, t: 36.9 }, s: ['He wheezes, has hives and is pale and floppy. What is this?', 'Tiene sibilancias, urticaria y está pálido y flojo. ¿Qué es?'],
        c: [[2, 'Anaphylaxis: a life-threatening reaction', 'Anafilaxia: una reacción con riesgo vital', 'Skin signs with breathing trouble and low BP after a known trigger: anaphylaxis.', 'Signos cutáneos con dificultad respiratoria e hipotensión tras un desencadenante: anafilaxia.'],
          [0, 'A mild allergy that needs only cream', 'Una alergia leve que solo necesita crema', 'Wheeze and low BP make it life-threatening.', 'Las sibilancias y la hipotensión la hacen grave.'],
          [1, 'An asthma attack from running around', 'Una crisis de asma por correr', 'There is wheeze, but hives and low BP point to anaphylaxis.', 'Hay sibilancias, pero la urticaria y la hipotensión apuntan a anafilaxia.'],
          [0, 'Choking on a piece of the cookie', 'Atragantamiento con un trozo de galleta', 'He is breathing and has hives and swelling.', 'Respira y tiene urticaria e hinchazón.']] },
      { k: 'act', v: { hr: 146, bp: '82/48', spo2: 91, rr: 36, t: 36.9 }, s: ['Which drug and dose first for a 22 kg child (circular 204/2023)?', '¿Qué fármaco y dosis primero para un niño de 22 kg (circular 204/2023)?'],
        c: [[2, 'Epinephrine 0.15 mg IM, outer thigh', 'Adrenalina 0,15 mg IM, cara externa del muslo', 'Children 15-30 kg: 0.15 mg IM into the thigh, as soon as possible.', 'Niños de 15-30 kg: 0,15 mg IM en el muslo, cuanto antes.'],
          [0, 'An oral antihistamine syrup first', 'Primero un jarabe antihistamínico oral', 'Too slow and does not treat airway or shock.', 'Demasiado lento y no trata la vía aérea ni el shock.'],
          [-1, 'Epinephrine 1 mg as a fast IV push', 'Adrenalina 1 mg en bolo IV rápido', 'That dose and route are for cardiac arrest; dangerous here.', 'Esa dosis y vía son para la parada; peligrosas aquí.'],
          [1, 'Epinephrine 0.3 mg IM, outer thigh', 'Adrenalina 0,3 mg IM, cara externa del muslo', 'Right drug and route, but 0.3 mg is the dose from 30 kg.', 'Fármaco y vía correctos, pero 0,3 mg es la dosis desde 30 kg.']] },
      { k: 'act', v: { hr: 128, bp: '92/56', spo2: 94, rr: 28, t: 36.9 }, s: ['After epinephrine he improves a little. Next?', 'Tras la adrenalina mejora algo. ¿Siguiente?'],
        c: [[2, 'Lie him down, legs up, oxygen, monitor', 'Tumbarlo, piernas arriba, oxígeno, vigilar', 'Supine with legs raised (or sitting if breathing is hard), oxygen, IV access, and repeat doses only by physician order.', 'Tumbado con piernas elevadas (o sentado si le cuesta respirar), oxígeno, vía IV y repetir solo por orden médica.'],
          [-1, 'Let him stand up and walk to his bed', 'Dejar que se levante y camine a la cama', 'Standing can cause sudden collapse in anaphylaxis.', 'Ponerse de pie puede provocar un colapso súbito.'],
          [0, 'Send him home once the hives fade', 'Enviarlo a casa cuando baje la urticaria', 'A second-phase reaction can occur: he needs observation.', 'Puede haber una reacción bifásica: necesita observación.'],
          [1, 'Give the mother a leaflet on allergies', 'Dar a la madre un folleto sobre alergias', 'Later; right now he needs monitoring.', 'Más adelante; ahora necesita vigilancia.']] }
    ],
    dq: [[1, ['Before discharge, what must the family get?', 'Antes del alta, ¿qué debe recibir la familia?'], ['A peanut-free diet for one week only', 'An epinephrine auto-injector and a plan', 'A course of antibiotics at home', 'Advice to avoid all exercise'], ['Dieta sin cacahuete solo una semana', 'Un autoinyector de adrenalina y un plan', 'Antibióticos en casa', 'Consejo de evitar todo ejercicio'], 'An auto-injector, training in its use, a written anaphylaxis plan and lifelong avoidance of the trigger.', 'Un autoinyector, formación para usarlo, un plan escrito de anafilaxia y evitar el desencadenante de por vida.']] },
  { id: 'x-croup', kind: 'acute', img: 'baby', area: 'peds', mins: 15, t: ['Barking cough at night', 'Tos perruna por la noche'],
    door: ['Pediatric emergency, 2 a.m. Noa, 2, has a barking cough and noisy breathing; she is crying on her father’s lap. Task: assess, manage and involve the father.', 'Urgencias pediátricas, 2 de la madrugada. Noa, 2 años, tiene tos perruna y respiración ruidosa; llora en brazos de su padre. Tarea: valorar, actuar e implicar al padre.'],
    steps: [
      { k: 'assess', v: { hr: 150, spo2: 94, rr: 40, t: 38.0 }, s: ['Stridor at rest and chest retractions. What do you do first?', 'Estridor en reposo y tiraje torácico. ¿Qué haces primero?'],
        c: [[2, 'Keep her calm on dad’s lap; tell the doctor', 'Tranquila en brazos de papá; avisar', 'Crying worsens the obstruction; stridor at rest is moderate croup that needs treatment.', 'El llanto empeora la obstrucción; el estridor en reposo es crup moderado que necesita tratamiento.'],
          [-1, 'Look in her throat with a tongue depressor', 'Mirar la garganta con un depresor', 'If this were epiglottitis it could cause total obstruction; do not upset her.', 'Si fuera epiglotitis podría causar obstrucción total; no la alteres.'],
          [0, 'Lay her flat on the bed to examine her', 'Tumbarla en la camilla para explorarla', 'She breathes better upright and calm.', 'Respira mejor incorporada y tranquila.'],
          [1, 'Take her straight for a neck X-ray', 'Llevarla directamente a una radiografía', 'Not needed first and distressing.', 'No hace falta primero y la angustia.']] },
      { k: 'act', v: { hr: 148, spo2: 95, rr: 38, t: 38.0 }, s: ['Which treatment is usually ordered for moderate croup?', '¿Qué tratamiento se suele pautar en el crup moderado?'],
        c: [[2, 'Dexamethasone, and nebulized epinephrine', 'Dexametasona y adrenalina nebulizada', 'A steroid reduces swelling over hours; nebulized epinephrine works within minutes for stridor at rest.', 'El corticoide reduce la inflamación en horas; la adrenalina nebulizada actúa en minutos ante el estridor en reposo.'],
          [0, 'Antibiotics for a bacterial infection', 'Antibióticos por infección bacteriana', 'Croup is usually viral.', 'El crup suele ser vírico.'],
          [0, 'A cough syrup to stop the barking', 'Un jarabe para quitar la tos', 'Does not treat the airway swelling.', 'No trata la inflamación de la vía aérea.'],
          [1, 'Paracetamol for the fever only', 'Solo paracetamol para la fiebre', 'Comfort, but not airway treatment.', 'Confort, pero no trata la vía aérea.']] },
      { k: 'comm', v: { hr: 124, spo2: 97, rr: 30, t: 37.8 }, s: ['After treatment she is calmer. The father asks why they cannot go home yet.', 'Tras el tratamiento está más tranquila. El padre pregunta por qué no pueden irse aún.'],
        c: [[2, '“The spray wears off in a few hours; we watch her.”', '“El aerosol se pasa en unas horas; la vigilamos.”', 'Nebulized epinephrine can wear off and stridor can return: observe for a few hours.', 'La adrenalina nebulizada puede pasarse y volver el estridor: observar unas horas.'],
          [0, '“Hospital rules: everyone stays until morning.”', '“Normas del hospital: todos se quedan hasta mañana.”', 'Gives no real reason.', 'No da una razón real.'],
          [1, '“The doctor decides; I don’t really know.”', '“Decide el médico; no lo sé.”', 'You can explain the reason.', 'Puedes explicar el motivo.'],
          [0, '“She is fine now, you can leave if you like.”', '“Ya está bien, pueden irse si quieren.”', 'Unsafe before the observation period ends.', 'Inseguro antes de acabar la observación.']] }
    ],
    dq: [[0, ['Which sign would make you think of epiglottitis rather than croup?', '¿Qué signo te haría pensar en epiglotitis en vez de crup?'], ['Drooling and a tripod position', 'A barking cough worse at night', 'A runny nose for two days', 'Mild fever with a hoarse voice'], ['Babeo y posición en trípode', 'Tos perruna peor de noche', 'Moco dos días', 'Fiebre leve con voz ronca'], 'Epiglottitis: high fever, drooling, tripod position, muffled voice, often no barking cough.', 'Epiglotitis: fiebre alta, babeo, posición en trípode, voz apagada, a menudo sin tos perruna.']] }
);

/* women's health: conversation with an actor + teaching */
NX.teach.push(
  { id: 'ppd', img: 'woman', t: ['Mood after birth', 'El ánimo tras el parto'],
    ctx: ['Tamar, 3 weeks after the birth, is going home from the clinic visit with a plan.', 'Tamar, 3 semanas tras el parto, se va de la consulta con un plan.'],
    pts: [[1, 'Depression after birth is common and treatable', 'La depresión tras el parto es frecuente y tratable'],
      [1, 'Call at once with any thought of harming herself or the baby', 'Llamar enseguida ante cualquier idea de hacerse daño o hacérselo al bebé'],
      [1, 'Accept help with night feeds so she can sleep', 'Aceptar ayuda con las tomas nocturnas para dormir'],
      [1, 'Come back for the follow-up appointment and screening', 'Volver a la cita de seguimiento y al cribado'],
      [0, 'It is just the baby blues and will pass alone', 'Es solo tristeza posparto y se pasará sola'],
      [0, 'Stop breastfeeding to feel better', 'Dejar el pecho para sentirse mejor'],
      [0, 'Keep it to herself so the family won’t worry', 'Guardárselo para que la familia no se preocupe']],
    back: [[2, '“Tell me what you’d do if the dark thoughts came back.”', '“Dígame qué haría si volvieran esas ideas oscuras.”', 'She states her own safety plan.', 'Expone su propio plan de seguridad.'],
      [0, '“You’ll be fine, won’t you?”', '“Estará bien, ¿verdad?”', 'Leading yes/no question.', 'Pregunta de sí/no que induce la respuesta.'],
      [1, '“Here are the numbers; call them if you need to.”', '“Aquí tiene los teléfonos; llame si lo necesita.”', 'Helpful, but no check of understanding.', 'Ayuda, pero no comprueba la comprensión.'],
      [0, '“Your husband will keep an eye on you.”', '“Su marido estará pendiente de usted.”', 'She needs her own plan.', 'Ella necesita su propio plan.']] },
  { id: 'ptl', img: 'mat', t: ['Signs of preterm labor', 'Signos de parto pretérmino'],
    ctx: ['Michal, 31 weeks, is going home after her contractions settled.', 'Michal, de 31 semanas, se va a casa tras calmarse las contracciones.'],
    pts: [[1, 'Regular contractions or tightening: come back', 'Contracciones regulares o endurecimiento: volver'],
      [1, 'Fluid leaking from the vagina: come back at once', 'Pérdida de líquido por la vagina: volver enseguida'],
      [1, 'Bleeding, or pelvic pressure and low backache that comes and goes', 'Sangrado, o presión pélvica y lumbalgia que va y viene'],
      [1, 'Fewer baby movements: get checked the same day', 'Menos movimientos del bebé: revisarse el mismo día'],
      [0, 'Tightening is normal at 31 weeks, ignore it', 'El endurecimiento es normal a las 31 semanas, ignorarlo'],
      [0, 'Wait until the morning if the waters break at night', 'Esperar a la mañana si rompe aguas de noche'],
      [0, 'Drink less water to slow the contractions', 'Beber menos agua para frenar las contracciones']],
    back: [[2, '“Tell me which signs would bring you back tonight.”', '“Dígame qué signos la harían volver esta noche.”', 'She names the warning signs herself.', 'Nombra ella misma las señales de alarma.'],
      [0, '“You know what to look for, right?”', '“Ya sabe qué vigilar, ¿verdad?”', 'Leading yes/no question.', 'Pregunta de sí/no que induce la respuesta.'],
      [1, '“It is all in the leaflet, read it later.”', '“Está todo en el folleto, léalo luego.”', 'Useful backup, but no check.', 'Buen apoyo, pero no comprueba.'],
      [0, '“Don’t worry, it probably won’t happen again.”', '“No se preocupe, seguramente no volverá a pasar.”', 'False reassurance, no teaching check.', 'Tranquilizar en falso, sin comprobar.']] }
);
NX.stations.push(
  { id: 'x-ppd', kind: 'actor', teach: 'ppd', img: 'woman', area: 'mat', mins: 15, t: ['Three weeks after the birth', 'Tres semanas tras el parto'],
    door: ['Women’s health clinic. Tamar, 34, three weeks after her second baby, comes for a check. She looks tired and says little. (An actor plays Tamar.) Task: assess, talk with her and teach.', 'Consulta de salud de la mujer. Tamar, 34, tres semanas tras su segundo bebé, viene a control. Se la ve cansada y habla poco. (Una actriz hace de Tamar.) Tarea: valorar, hablar con ella y educar.'],
    steps: [
      { k: 'comm', v: { hr: 84, bp: '116/72', spo2: 99, rr: 16, t: 36.8 }, s: ['She says: “I cry every day and I don’t enjoy the baby.” Best reply?', 'Dice: “Lloro todos los días y no disfruto del bebé.” ¿Mejor respuesta?'],
        c: [[2, '“That sounds very hard. Tell me more about it.”', '“Suena muy difícil. Cuénteme más.”', 'Acknowledge and invite her to talk; then screen properly.', 'Reconocer y invitarla a hablar; luego cribar bien.'],
          [0, '“All new mothers feel like that, it’s normal.”', '“Todas las madres se sienten así, es normal.”', 'At 3 weeks this is beyond the baby blues; do not dismiss it.', 'A las 3 semanas va más allá de la tristeza posparto; no lo minimices.'],
          [0, '“You should be happy, you have a healthy baby.”', '“Debería estar feliz, tiene un bebé sano.”', 'Guilt-inducing and closes the conversation.', 'Genera culpa y cierra la conversación.'],
          [1, '“Try to get out of the house more often.”', '“Intente salir más de casa.”', 'Kind, but she first needs assessment.', 'Amable, pero primero necesita valoración.']] },
      { k: 'assess', v: { hr: 84, bp: '116/72', spo2: 99, rr: 16, t: 36.8 }, s: ['What must you ask her directly?', '¿Qué debes preguntarle directamente?'],
        c: [[2, 'Thoughts of harming herself or the baby', 'Ideas de hacerse daño o hacérselo al bebé', 'Asking directly about self-harm and harm to the baby is essential and does not put the idea in her head.', 'Preguntar directamente por autolesión y daño al bebé es esencial y no le mete la idea.'],
          [0, 'Whether she has gone back to the gym', 'Si ya ha vuelto a ir al gimnasio', 'Not the priority.', 'No es la prioridad.'],
          [1, 'How many hours the baby sleeps', 'Cuántas horas seguidas duerme el bebé', 'Relevant context, but safety comes first.', 'Contexto relevante, pero primero la seguridad.'],
          [0, 'Which formula brand she prefers', 'Qué marca de leche artificial prefiere', 'Not relevant.', 'No es relevante.']] },
      { k: 'act', v: { hr: 86, bp: '118/74', spo2: 99, rr: 16, t: 36.8 }, s: ['She denies thoughts of harm, but the screening score is high. Next?', 'Niega ideas de daño, pero la puntuación del cribado es alta. ¿Siguiente?'],
        c: [[2, 'Refer to mental health today; plan support', 'Derivar hoy a salud mental; planificar apoyos', 'A high score needs prompt referral, a safety plan and support at home.', 'Una puntuación alta requiere derivación pronta, plan de seguridad y apoyo en casa.'],
          [0, 'Reassure her and see her in 3 months', 'Tranquilizarla y verla en 3 meses', 'Too late for likely postpartum depression.', 'Demasiado tarde ante una probable depresión posparto.'],
          [-1, 'Tell her to stop all medicines and rest', 'Decirle que deje toda medicación y descanse', 'Unsafe advice without assessment.', 'Consejo inseguro sin valoración.'],
          [1, 'Give her a leaflet on postpartum mood', 'Darle un folleto sobre el ánimo posparto', 'Helpful, but not enough on its own.', 'Ayuda, pero no basta sola.']] }
    ],
    dq: [[3, ['Which sign suggests postpartum psychosis rather than depression?', '¿Qué signo sugiere psicosis posparto en vez de depresión?'], ['Crying often in the evening', 'Tiredness and poor sleep', 'Worry about breastfeeding', 'Hallucinations and confusion'], ['Llorar a menudo por la tarde', 'Cansancio y mal sueño', 'Preocupación por la lactancia', 'Alucinaciones y confusión'], 'Hallucinations, confusion or bizarre behavior after birth: postpartum psychosis, a psychiatric emergency.', 'Alucinaciones, confusión o conducta extraña tras el parto: psicosis posparto, una urgencia psiquiátrica.']] },
  { id: 'x-ptl', kind: 'actor', teach: 'ptl', img: 'mat', area: 'mat', mins: 15, t: ['Contractions at 31 weeks', 'Contracciones a las 31 semanas'],
    door: ['Maternity triage. Michal, 29, 31 weeks, first pregnancy, has tightening every 8 minutes and low backache since morning. (An actor plays Michal.) Task: assess, talk with her and teach.', 'Urgencias de maternidad. Michal, 29, 31 semanas, primer embarazo, tiene endurecimientos cada 8 minutos y lumbalgia desde la mañana. (Una actriz hace de Michal.) Tarea: valorar, hablar con ella y educar.'],
    steps: [
      { k: 'assess', v: { hr: 96, bp: '118/70', spo2: 99, rr: 18, t: 36.9 }, s: ['What do you assess first?', '¿Qué valoras primero?'],
        c: [[2, 'Contractions, fetal heart, fluid, blood', 'Contracciones, latido, líquido o sangrado', 'Confirm preterm labor signs and fetal wellbeing, and check for rupture of membranes or bleeding.', 'Confirmar signos de parto pretérmino y bienestar fetal, y descartar rotura de membranas o sangrado.'],
          [0, 'Her weight gain during the pregnancy', 'Su aumento de peso durante el embarazo', 'Not the priority now.', 'No es la prioridad ahora.'],
          [1, 'Her urine for a possible infection', 'Su orina por si hubiera una infección', 'Useful (UTI can trigger contractions), but not first.', 'Útil (la ITU puede desencadenar contracciones), pero no lo primero.'],
          [0, 'Her plans for the baby’s new room', 'Sus planes para el cuarto del bebé', 'Not relevant.', 'No es relevante.']] },
      { k: 'teach', v: { hr: 94, bp: '116/70', spo2: 99, rr: 18, t: 36.9 }, s: ['Betamethasone is ordered. She asks why. Best explanation?', 'Se pauta betametasona. Pregunta por qué. ¿Mejor explicación?'],
        c: [[2, '“It helps his lungs if he’s born early.”', '“Ayuda a sus pulmones si nace antes.”', 'Antenatal corticosteroids mature the fetal lungs before 34 weeks.', 'Los corticoides prenatales maduran los pulmones fetales antes de las 34 semanas.'],
          [0, '“It stops the contractions for good.”', '“Para las contracciones para siempre.”', 'It does not stop labor.', 'No frena el parto.'],
          [0, '“It treats an infection you might have.”', '“Trata una infección que podría tener.”', 'It is not an antibiotic.', 'No es un antibiótico.'],
          [1, '“The doctor ordered it, it’s routine.”', '“Lo pautó el médico, es rutina.”', 'True but not an explanation.', 'Cierto, pero no es una explicación.']] },
      { k: 'comm', v: { hr: 92, bp: '116/70', spo2: 99, rr: 18, t: 36.9 }, s: ['She is frightened: “Will my baby survive if he comes now?”', 'Está asustada: “¿Sobrevivirá mi bebé si nace ahora?”'],
        c: [[2, '“At 31 weeks babies usually do well; here’s our plan.”', '“A las 31 semanas suelen ir bien; este es el plan.”', 'Honest, hopeful and concrete; offer to involve the neonatal team.', 'Honesta, esperanzadora y concreta; ofrecer hablar con el equipo neonatal.'],
          [0, '“Nothing will happen to him, don’t worry at all.”', '“No pasará nada, no se preocupe.”', 'False reassurance.', 'Tranquilizar en falso.'],
          [0, '“I can’t talk about that, please ask the doctor.”', '“No puedo hablar de eso, pregunte al médico.”', 'You can give general, honest information.', 'Puedes dar información general y honesta.'],
          [1, '“Let’s focus on resting for now.”', '“Centrémonos en descansar por ahora.”', 'Avoids her question.', 'Evita su pregunta.']] }
    ],
    dq: [[1, ['Magnesium sulfate before 32 weeks is given mainly to:', 'El sulfato de magnesio antes de las 32 semanas se da sobre todo para:'], ['Lower the mother’s BP', 'Protect the baby’s brain', 'Stop all contractions', 'Prevent infection'], ['Bajar la PA materna', 'Proteger el cerebro del bebé', 'Parar todas las contracciones', 'Prevenir infecciones'], 'Before 32 weeks magnesium sulfate gives fetal neuroprotection (less cerebral palsy).', 'Antes de las 32 semanas el sulfato de magnesio protege el cerebro fetal (menos parálisis cerebral).']] }
);

/* the two new mocks and the slot pools */
NX.mocks.push(
  { id: 5, t: ['Mock test 5', 'Examen de prueba 5'], fresh: true, st: ['x-dka', 'x-thyroid', 'x-anaph', 'x-ppd'] },
  { id: 6, t: ['Mock test 6', 'Examen de prueba 6'], fresh: true, st: ['x-gibleed', 'x-sepsis2', 'x-croup', 'x-ptl'] }
);
NX.mocks.sort((a, b) => (a.focus ? 1 : 0) - (b.focus ? 1 : 0) || a.id - b.id); /* "Made for you" stays last */
[['x-dka', 'x-gibleed'], ['x-thyroid', 'x-sepsis2'], ['x-anaph', 'x-croup'], ['x-ppd', 'x-ptl']].forEach((ids, i) => NX.mockSlots[i].ids.push(...ids));
