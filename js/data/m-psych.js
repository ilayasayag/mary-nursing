NX.addModule({
  id: 'psych', icon: '🧠',
  t: ['Mental Health Nursing', 'Enfermería de salud mental'],
  b: ['Therapeutic communication, safety, major disorders and psychiatric drugs (Townsend).', 'Comunicación terapéutica, seguridad, trastornos principales y psicofármacos (Townsend).'],
  exam: 'Mental health nursing care',
  lessons: [
    { t: ['Therapeutic communication', 'Comunicación terapéutica'],
      p: [
        ['Use open-ended questions, reflection, silence, clarifying, and focus on feelings: “Tell me more about…”, “You seem upset”.', 'Usa preguntas abiertas, reflejo, silencio, clarificación y céntrate en los sentimientos: “Cuénteme más sobre…”, “Parece preocupado”.'],
        ['Avoid “why” questions, false reassurance (“everything will be fine”), giving advice, changing the subject, arguing with delusions.', 'Evita preguntas “por qué”, falsas promesas (“todo irá bien”), dar consejos, cambiar de tema y discutir los delirios.'],
        ['With hallucinations: acknowledge that the experience is real to the patient but say you do not hear the voices, then focus on reality and safety (ask what the voices say).', 'Ante alucinaciones: reconoce que para el paciente es real pero di que tú no oyes las voces; centra en la realidad y la seguridad (pregunta qué dicen).'],
        ['Cultural and language accessibility is required in Israel (Director General circular 7/2011): use a professional interpreter, not family members, for clinical talks.', 'En Israel se exige la adecuación cultural y lingüística (circular 7/2011): usa un intérprete profesional, no familiares, en las conversaciones clínicas.']
      ],
      v: [['feelings', 'sentimientos', 'רגשות', 'regashot'], ['anxiety', 'ansiedad', 'חרדה', 'charada'], ['depression', 'depresión', 'דיכאון', 'dika’on'], ['interpreter', 'intérprete', 'מתורגמן', 'metargeman']] },
    { t: ['Suicide risk and safety', 'Riesgo de suicidio y seguridad'],
      p: [
        ['Ask directly: “Are you thinking of killing yourself?”. Asking does not increase risk. Assess plan, means, intent, timing and history.', 'Pregunta directamente: “¿Está pensando en quitarse la vida?”. Preguntar no aumenta el riesgo. Valora plan, medios, intención, momento y antecedentes.'],
        ['High risk: constant observation, remove dangerous objects, safety plan. Risk may rise when energy returns after starting antidepressants.', 'Riesgo alto: observación constante, retirar objetos peligrosos, plan de seguridad. El riesgo puede aumentar cuando vuelve la energía al iniciar antidepresivos.'],
        ['Aggression: early signs are pacing, raised voice, clenched fists. De-escalate first: calm voice, space, choices. Circular 6/2020 covers preventing violence in the health system.', 'Agresividad: signos tempranos son caminar de un lado a otro, voz alta, puños cerrados. Primero desescalar: voz calmada, espacio, opciones. La circular 6/2020 trata de la prevención de la violencia.'],
        ['Mechanical restraint and seclusion in psychiatric wards (Director General circular 10/2018) are a last resort, by physician order, with close monitoring and documentation.', 'La sujeción mecánica y el aislamiento en psiquiatría (circular 10/2018) son el último recurso, con orden médica, vigilancia estrecha y registro.']
      ],
      v: [['suicide', 'suicidio', 'אובדנות', 'ovdanut'], ['danger', 'peligro', 'סכנה', 'sakana'], ['violence', 'violencia', 'אלימות', 'alimut'], ['observation', 'observación', 'השגחה', 'hashgacha']] },
    { t: ['Major disorders', 'Trastornos principales'],
      p: [
        ['Schizophrenia: positive symptoms (hallucinations, delusions) and negative symptoms (flat affect, withdrawal, poor motivation).', 'Esquizofrenia: síntomas positivos (alucinaciones, delirios) y negativos (afecto plano, aislamiento, apatía).'],
        ['Bipolar mania: little sleep, pressured speech, grandiosity. Give finger foods and high-calorie snacks, low stimulation.', 'Manía bipolar: poco sueño, habla acelerada, grandiosidad. Dar comida que se pueda tomar con la mano, tentempiés calóricos, pocos estímulos.'],
        ['Alcohol withdrawal: starts 6-24 h after the last drink; delirium tremens around 48-96 h. Benzodiazepines, thiamine before glucose, seizure precautions.', 'Abstinencia alcohólica: empieza 6-24 h tras la última bebida; delirium tremens hacia 48-96 h. Benzodiacepinas, tiamina antes de la glucosa, precauciones anticonvulsivas.'],
        ['Anorexia nervosa: risks are low potassium, arrhythmia and refeeding syndrome; supervise meals and watch for 1 h after.', 'Anorexia nerviosa: riesgos de potasio bajo, arritmias y síndrome de realimentación; supervisar comidas y vigilar una hora después.']
      ],
      v: [['delusion', 'delirio (idea delirante)', 'מחשבת שווא', 'machshevet shav'], ['hallucination', 'alucinación', 'הזיה', 'hazaya'], ['sleep', 'sueño', 'שינה', 'shena'], ['alcohol', 'alcohol', 'אלכוהול', 'alkohol']] },
    { t: ['Psychiatric drugs', 'Psicofármacos'],
      p: [
        ['Antipsychotics (haloperidol): extrapyramidal effects; acute dystonia → anticholinergic (biperiden/diphenhydramine). Neuroleptic malignant syndrome: high fever, rigidity, confusion → stop drug, emergency.', 'Antipsicóticos (haloperidol): efectos extrapiramidales; distonía aguda → anticolinérgico (biperideno/difenhidramina). Síndrome neuroléptico maligno: fiebre alta, rigidez, confusión → suspender y urgencia.'],
        ['Clozapine: risk of agranulocytosis, so regular blood counts. Report sore throat or fever.', 'Clozapina: riesgo de agranulocitosis, hemogramas periódicos. Avisar de dolor de garganta o fiebre.'],
        ['Lithium: therapeutic about 0.6-1.2 mEq/L; toxic above ~1.5 (vomiting, diarrhea, coarse tremor, confusion). Keep normal salt and fluid intake.', 'Litio: terapéutico ~0,6-1,2 mEq/L; tóxico por encima de ~1,5 (vómitos, diarrea, temblor grueso, confusión). Mantener sal y líquidos normales.'],
        ['SSRIs take 2-4 weeks to work; watch for serotonin syndrome. MAOIs: avoid tyramine foods (aged cheese, cured meat, wine) → hypertensive crisis.', 'Los ISRS tardan 2-4 semanas; vigilar síndrome serotoninérgico. IMAO: evitar alimentos con tiramina (quesos curados, embutidos, vino) → crisis hipertensiva.']
      ],
      v: [['tremor', 'temblor', 'רעד', 'ra’ad'], ['psychiatric hospitalization', 'hospitalización psiquiátrica', 'אשפוז פסיכיאטרי', 'ishpuz psichiatri']] }
  ],
  q: [
    [1, 3, 'A patient says “Nobody cares if I live or die.” Best response?', 'El paciente dice “A nadie le importa si vivo o muero”. ¿Mejor respuesta?', ['“Of course they care.”', '“Why do you say that?”', '“Let’s talk about something happier.”', '“You feel no one cares. Are you thinking of hurting yourself?”'], ['“Claro que les importa.”', '“¿Por qué dice eso?”', '“Hablemos de algo más alegre.”', '“Siente que a nadie le importa. ¿Piensa en hacerse daño?”'], 'Reflect the feeling and ask directly about suicide.', 'Reflejar el sentimiento y preguntar directamente por el suicidio.'],
    [2, 1, 'A patient on haloperidol has fever 40 °C, muscle rigidity and confusion. Suspect:', 'Paciente con haloperidol, fiebre de 40 °C, rigidez y confusión. Sospechar:', ['Tardive dyskinesia', 'Neuroleptic malignant syndrome', 'Lithium toxicity', 'Serotonin syndrome only'], ['Discinesia tardía', 'Síndrome neuroléptico maligno', 'Toxicidad por litio', 'Solo síndrome serotoninérgico'], 'NMS: hyperthermia, rigidity, altered consciousness. Stop the antipsychotic, it is an emergency.', 'SNM: hipertermia, rigidez, alteración de conciencia. Suspender el antipsicótico; es una urgencia.'],
    [2, 0, 'Lithium level 1.9 mEq/L with vomiting and coarse tremor. Interpretation?', 'Litemia 1,9 mEq/L con vómitos y temblor grueso. ¿Interpretación?', ['Toxicity: hold the dose and notify', 'Therapeutic level', 'Too low, increase dose', 'Normal side effects'], ['Toxicidad: suspender la dosis y avisar', 'Nivel terapéutico', 'Bajo, aumentar dosis', 'Efectos esperables'], 'Above ~1.5 mEq/L is toxic.', 'Por encima de ~1,5 mEq/L es tóxico.'],
    [3, 2, 'Which food should a patient taking an MAOI avoid?', '¿Qué alimento debe evitar un paciente con IMAO?', ['Fresh apple', 'White rice', 'Aged cheese', 'Boiled egg'], ['Manzana fresca', 'Arroz blanco', 'Queso curado', 'Huevo cocido'], 'Tyramine-rich foods can cause hypertensive crisis.', 'Los alimentos ricos en tiramina pueden causar crisis hipertensiva.'],
    [3, 0, 'A patient admitted 30 hours after his last drink becomes tremulous, sweaty and anxious. Priority?', 'Paciente ingresado 30 horas tras su última bebida, con temblor, sudor y ansiedad. ¿Prioridad?', ['Assess withdrawal severity, give ordered benzodiazepine, seizure precautions', 'Discharge home', 'Encourage coffee', 'Give glucose before thiamine'], ['Valorar la abstinencia, dar la benzodiacepina pautada, precauciones anticonvulsivas', 'Dar el alta', 'Ofrecer café', 'Dar glucosa antes que tiamina'], 'Alcohol withdrawal can progress to seizures and DTs; thiamine is given before glucose.', 'La abstinencia puede progresar a convulsiones y delirium tremens; la tiamina va antes de la glucosa.']
  ]
});
