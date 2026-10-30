NX.addModule({
  id: 'peds', icon: '🧸',
  t: ['Pediatric Nursing', 'Enfermería pediátrica'],
  b: ['Growth, vital signs, common illnesses, safety and vaccines (Wong’s; MOH immunization guide).', 'Crecimiento, signos vitales, enfermedades comunes, seguridad y vacunas (Wong; guía de vacunación del Ministerio).'],
  exam: 'Pediatric nursing care',
  lessons: [
    { t: ['Growth and development', 'Crecimiento y desarrollo'],
      p: [
        ['Birth weight doubles by about 5-6 months and triples by 1 year.', 'El peso al nacer se duplica hacia los 5-6 meses y se triplica al año.'],
        ['Milestones: social smile ~2 months, head control ~4 months, sits ~6-7 months, stranger anxiety ~6-8 months, walks ~12 months.', 'Hitos: sonrisa social ~2 meses, control cefálico ~4 meses, se sienta ~6-7 meses, angustia ante extraños ~6-8 meses, camina ~12 meses.'],
        ['Erikson: infant trust, toddler autonomy, preschool initiative, school-age industry, adolescent identity. Toddlers like choices and rituals; teenagers value privacy.', 'Erikson: lactante confianza, preescolar pequeño autonomía, preescolar iniciativa, escolar laboriosidad, adolescente identidad. A los pequeños les ayudan las opciones y rutinas; los adolescentes valoran la privacidad.']
      ],
      v: [['baby / infant', 'bebé / lactante', 'תינוק', 'tinok'], ['child', 'niño', 'ילד', 'yeled'], ['adolescent', 'adolescente', 'מתבגר', 'mitbager'], ['parents', 'padres', 'הורים', 'horim']] },
    { t: ['Vital signs and assessment', 'Signos vitales y valoración'],
      p: [
        ['Newborn/infant: HR about 100-160/min, RR about 30-60/min. Toddler: HR ~90-150, RR ~24-40. School age: HR ~70-120, RR ~18-30.', 'Recién nacido/lactante: FC ~100-160/min, FR ~30-60/min. Niño pequeño: FC ~90-150, FR ~24-40. Escolar: FC ~70-120, FR ~18-30.'],
        ['Count infant respirations and apical pulse for a full minute. Do the least invasive parts first while the child is calm.', 'Cuenta la respiración y el pulso apical del lactante durante un minuto completo. Haz primero lo menos invasivo mientras está tranquilo.'],
        ['Pain: FLACC (Face, Legs, Activity, Cry, Consolability) for young children; FACES scale from about 3 years; numeric scale for older children.', 'Dolor: FLACC (cara, piernas, actividad, llanto, consuelo) en pequeños; escala de caras desde ~3 años; numérica en mayores.'],
        ['Dehydration signs: sunken fontanelle, few wet diapers, no tears, dry mouth, lethargy.', 'Signos de deshidratación: fontanela hundida, pocos pañales mojados, sin lágrimas, boca seca, letargo.']
      ],
      v: [['fontanelle', 'fontanela', 'מרפס', 'merpes'], ['diaper', 'pañal', 'חיתול', 'chitul'], ['crying', 'llanto', 'בכי', 'bechi'], ['dehydration', 'deshidratación', 'התייבשות', 'hityabshut']] },
    { t: ['Airway illnesses', 'Enfermedades respiratorias'],
      p: [
        ['Croup: barking cough, inspiratory stridor, worse at night. Treat with steroids (dexamethasone) and nebulized epinephrine if severe.', 'Crup: tos perruna, estridor inspiratorio, peor de noche. Corticoide (dexametasona) y adrenalina nebulizada si es grave.'],
        ['Epiglottitis: high fever, drooling, tripod position, muffled voice. Do NOT examine the throat with a tongue depressor; keep the child calm and prepare for airway support.', 'Epiglotitis: fiebre alta, babeo, posición en trípode, voz apagada. NO explorar la garganta con depresor; mantener al niño tranquilo y preparar soporte de vía aérea.'],
        ['Bronchiolitis (often RSV) in infants: suction the nose, keep hydrated, give oxygen if needed, watch for apnea.', 'Bronquiolitis (a menudo VRS) en lactantes: aspirar la nariz, hidratar, oxígeno si precisa, vigilar apneas.'],
        ['Cystic fibrosis: diagnosed by sweat chloride test; give pancreatic enzymes with every meal and snack; chest physiotherapy.', 'Fibrosis quística: test del sudor; enzimas pancreáticas con cada comida y tentempié; fisioterapia respiratoria.']
      ],
      v: [['cough', 'tos', 'שיעול', 'si’ul'], ['breathing', 'respiración', 'נשימה', 'neshima'], ['fever', 'fiebre', 'חום', 'chom']] },
    { t: ['GI, heart and other conditions', 'Digestivo, corazón y otras patologías'],
      p: [
        ['Pyloric stenosis: projectile non-bilious vomiting at 2-8 weeks, olive-shaped mass. Intussusception: sudden colicky pain, legs drawn up, “currant jelly” stool, sausage-shaped mass.', 'Estenosis pilórica: vómito en proyectil no bilioso a las 2-8 semanas, masa en oliva. Invaginación: dolor cólico brusco, piernas flexionadas, heces en “jalea de grosella”, masa en salchicha.'],
        ['Kawasaki disease: fever 5 days or more, red eyes, strawberry tongue, peeling hands and feet. Risk: coronary aneurysm. Treatment: IVIG and aspirin (an exception to the usual no-aspirin rule in children).', 'Enfermedad de Kawasaki: fiebre ≥5 días, ojos rojos, lengua aframbuesada, descamación de manos y pies. Riesgo: aneurisma coronario. Tratamiento: IgIV y aspirina (excepción a la regla de no dar aspirina a niños).'],
        ['Avoid aspirin in children with viral illness (Reye syndrome). No honey under 12 months (botulism).', 'Evitar aspirina en niños con infección viral (síndrome de Reye). Nada de miel antes de los 12 meses (botulismo).'],
        ['Celiac disease: lifelong gluten-free diet (no wheat, barley, rye). Type 1 diabetes: insulin, carbohydrate counting, sick-day rules.', 'Celiaquía: dieta sin gluten de por vida (sin trigo, cebada, centeno). Diabetes tipo 1: insulina, conteo de hidratos, reglas para días de enfermedad.']
      ],
      v: [['vomiting', 'vómito', 'הקאה', 'hak’a'], ['stool', 'heces', 'צואה', 'tzo’a'], ['allergy', 'alergia', 'אלרגיה', 'alergia']] },
    { t: ['Safety, abuse and vaccines', 'Seguridad, maltrato y vacunas'],
      p: [
        ['Safe sleep: on the back, firm flat mattress, no pillows or toys, no smoking. Car seat rear-facing as long as possible. Circular 158/2019 covers preventing unintentional injury from birth to 6 years.', 'Sueño seguro: boca arriba, colchón firme y plano, sin almohadas ni juguetes, sin humo. Silla de auto a contramarcha el mayor tiempo posible. La circular 158/2019 trata de la prevención de lesiones no intencionales de 0 a 6 años.'],
        ['Suspected abuse: injuries that do not match the story, different healing stages, delay seeking care. The nurse must report (Penal Law §368D; Director General circular 25/2003).', 'Sospecha de maltrato: lesiones que no coinciden con el relato, distintos estadios de curación, retraso en consultar. La enfermera debe notificar (Código Penal §368D; circular 25/2003).'],
        ['Vaccines follow the Israeli MOH immunization guide (on Mary’s reading list): routine childhood schedule, timing rules, catch-up to age 17, special situations, anaphylaxis after vaccination.', 'Las vacunas siguen la guía de vacunación del Ministerio (en la bibliografía de Mary): calendario infantil, reglas de intervalo, puesta al día hasta 17 años, situaciones especiales y anafilaxia tras la vacuna.'],
        ['Well-baby clinics in Israel are called Tipat Chalav (“drop of milk”). They run growth checks and most childhood vaccines.', 'Los centros de salud infantil en Israel se llaman Tipat Jalav (“gota de leche”) y hacen los controles de crecimiento y la mayoría de vacunas.']
      ],
      v: [['vaccine', 'vacuna', 'חיסון', 'chisun'], ['well-baby clinic', 'centro de salud infantil', 'טיפת חלב', 'tipat chalav'], ['neglect', 'negligencia / abandono', 'הזנחה', 'haznacha'], ['abuse', 'maltrato', 'התעללות', 'hit’alelut']] }
  ],
  q: [
    [1, 2, 'At what age does a healthy infant usually triple the birth weight?', '¿A qué edad suele triplicar un lactante sano su peso al nacer?', ['3 months', '6 months', '12 months', '24 months'], ['3 meses', '6 meses', '12 meses', '24 meses'], 'Doubles at about 5-6 months, triples at about 12 months.', 'Se duplica hacia 5-6 meses y se triplica hacia los 12.'],
    [2, 1, 'A 3-year-old has high fever, drooling and sits leaning forward. What must the nurse AVOID?', 'Un niño de 3 años tiene fiebre alta, babeo y se inclina hacia delante. ¿Qué debe EVITAR la enfermera?', ['Keeping the child on the parent’s lap', 'Examining the throat with a tongue depressor', 'Preparing airway equipment', 'Letting the child sit upright'], ['Dejarlo en brazos de los padres', 'Explorar la garganta con depresor', 'Preparar material de vía aérea', 'Dejarlo sentado'], 'Suspected epiglottitis: a throat exam can trigger complete airway obstruction.', 'Sospecha de epiglotitis: explorar la garganta puede provocar obstrucción completa.'],
    [2, 0, 'A 6-week-old has projectile non-bilious vomiting after feeds. Most likely?', 'Un bebé de 6 semanas tiene vómitos en proyectil no biliosos tras las tomas. ¿Lo más probable?', ['Pyloric stenosis', 'Intussusception', 'Celiac disease', 'Appendicitis'], ['Estenosis pilórica', 'Invaginación', 'Celiaquía', 'Apendicitis'], 'Classic pyloric stenosis presentation, often with an olive-shaped mass.', 'Presentación clásica de estenosis pilórica, a menudo con masa en oliva.'],
    [3, 3, 'Which statement about Kawasaki disease is correct?', '¿Qué afirmación sobre la enfermedad de Kawasaki es correcta?', ['Aspirin is always contraindicated', 'Antibiotics are the main treatment', 'Fever lasts less than 24 h', 'The main risk is coronary artery aneurysm'], ['La aspirina está siempre contraindicada', 'Los antibióticos son el tratamiento principal', 'La fiebre dura <24 h', 'El principal riesgo es el aneurisma coronario'], 'Kawasaki: IVIG + aspirin; coronary aneurysm is the feared complication.', 'Kawasaki: IgIV + aspirina; la complicación temida es el aneurisma coronario.'],
    [2, 2, 'Which pain scale fits a 2-year-old after surgery?', '¿Qué escala de dolor es adecuada para un niño de 2 años operado?', ['Numeric 0-10', 'Visual analogue scale', 'FLACC', 'Glasgow scale'], ['Numérica 0-10', 'Escala visual analógica', 'FLACC', 'Escala de Glasgow'], 'FLACC is behavioural and suits pre-verbal children.', 'FLACC es conductual y sirve para niños que aún no se expresan bien.'],
    [3, 0, 'A toddler has bruises of different colours on the back and the story keeps changing. What should the nurse do?', 'Un niño pequeño tiene hematomas de distintos colores en la espalda y el relato cambia. ¿Qué debe hacer la enfermera?', ['Document objectively and report per the mandatory reporting law', 'Confront the parents', 'Wait for the next visit', 'Only tell a colleague'], ['Documentar objetivamente y notificar según la ley de notificación obligatoria', 'Confrontar a los padres', 'Esperar a la siguiente visita', 'Solo comentarlo a un colega'], 'Suspected abuse requires objective documentation and reporting (Penal Law 368D, circular 25/2003).', 'La sospecha de maltrato exige documentar y notificar (Código Penal 368D, circular 25/2003).']
  ]
});
