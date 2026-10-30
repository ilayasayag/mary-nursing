NX.addModule({
  id: 'calc', icon: '🧮',
  t: ['Dosage Calculations', 'Cálculo de dosis'],
  b: ['The formulas you need, with metric units. Then practise without limits in the Dosage Lab.', 'Las fórmulas que necesitas, en unidades métricas. Luego practica sin límite en el Laboratorio de dosis.'],
  exam: 'Pharmacy calculations (medical calculations)',
  lessons: [
    { t: ['Units and conversions', 'Unidades y conversiones'],
      p: [
        ['1 g = 1000 mg; 1 mg = 1000 mcg; 1 L = 1000 mL; 1 kg = 2.2 lb. The exam gives lab values in metric units and an on-screen calculator.', '1 g = 1000 mg; 1 mg = 1000 mcg; 1 L = 1000 mL; 1 kg = 2,2 lb. El examen da valores en unidades métricas y una calculadora en pantalla.'],
        ['Convert to the same unit BEFORE you calculate. Most errors come from mixing mg and mcg.', 'Convierte a la misma unidad ANTES de calcular. La mayoría de errores vienen de mezclar mg y mcg.'],
        ['Write a leading zero (0.5 mg), never a trailing zero (5 mg, not 5.0 mg).', 'Escribe el cero a la izquierda (0,5 mg), nunca un cero final (5 mg, no 5,0 mg).']
      ],
      v: [['milligram', 'miligramo', 'מיליגרם', 'miligram'], ['weight', 'peso', 'משקל', 'mishkal'], ['calculation', 'cálculo', 'חישוב', 'chishuv']] },
    { t: ['Tablets and liquids', 'Comprimidos y líquidos'],
      p: [
        ['Formula: (Desired dose ÷ Dose on hand) × Quantity. Example: order 500 mg, tablets are 250 mg → 2 tablets.', 'Fórmula: (dosis deseada ÷ dosis disponible) × cantidad. Ejemplo: orden 500 mg, comprimidos de 250 mg → 2 comprimidos.'],
        ['Liquids: order 30 mg, syrup 10 mg/5 mL → (30 ÷ 10) × 5 = 15 mL.', 'Líquidos: orden 30 mg, jarabe 10 mg/5 mL → (30 ÷ 10) × 5 = 15 mL.'],
        ['Check if the answer makes sense: more than 3 tablets or more than a few mL IM is a red flag to recheck.', 'Comprueba si tiene sentido: más de 3 comprimidos o varios mL IM es una señal para revisar.']
      ],
      v: [['syrup', 'jarabe', 'סירופ', 'sirop'], ['milliliter', 'mililitro', 'מיליליטר', 'mililiter']] },
    { t: ['Weight-based (children)', 'Por peso (niños)'],
      p: [
        ['Dose (mg) = mg/kg × weight (kg). If the order is per day and divided, divide by the number of doses.', 'Dosis (mg) = mg/kg × peso (kg). Si la orden es diaria y fraccionada, divide por el número de tomas.'],
        ['Example: 40 mg/kg/day divided every 8 h, child 15 kg → 600 mg/day → 200 mg per dose.', 'Ejemplo: 40 mg/kg/día cada 8 h, niño de 15 kg → 600 mg/día → 200 mg por toma.'],
        ['Always compare with the safe range in the drug handbook before giving.', 'Compara siempre con el rango seguro del manual antes de administrar.']
      ],
      v: [['child', 'niño', 'ילד', 'yeled'], ['kilogram', 'kilogramo', 'קילוגרם', 'kilogram']] },
    { t: ['IV rates', 'Velocidad de infusión'],
      p: [
        ['Pump rate (mL/h) = volume (mL) ÷ time (h). 1000 mL over 8 h = 125 mL/h.', 'Bomba (mL/h) = volumen (mL) ÷ tiempo (h). 1000 mL en 8 h = 125 mL/h.'],
        ['Drops per minute = (volume mL × drop factor gtt/mL) ÷ time in minutes. Macro sets are usually 20 gtt/mL; micro sets 60 gtt/mL (then gtt/min = mL/h).', 'Gotas por minuto = (volumen mL × factor de goteo gtt/mL) ÷ minutos. Equipos macro suelen ser 20 gtt/mL; micro 60 gtt/mL (gtt/min = mL/h).'],
        ['mcg/kg/min infusions: mL/h = (dose × kg × 60) ÷ concentration (mcg/mL).', 'Infusiones en mcg/kg/min: mL/h = (dosis × kg × 60) ÷ concentración (mcg/mL).']
      ],
      v: [['drops', 'gotas', 'טיפות', 'tipot'], ['hour', 'hora', 'שעה', 'sha’a'], ['minute', 'minuto', 'דקה', 'daka']] }
  ],
  q: [
    [1, 1, 'Order: amoxicillin 500 mg. Available: 250 mg tablets. How many tablets?', 'Orden: amoxicilina 500 mg. Disponible: comprimidos de 250 mg. ¿Cuántos?', ['1', '2', '3', '4'], 0, '500 ÷ 250 = 2 tablets.', '500 ÷ 250 = 2 comprimidos.'],
    [2, 2, 'Infuse 1000 mL over 8 hours. Pump rate?', 'Infundir 1000 mL en 8 horas. ¿Velocidad de la bomba?', ['80 mL/h', '100 mL/h', '125 mL/h', '150 mL/h'], 0, '1000 ÷ 8 = 125 mL/h.', '1000 ÷ 8 = 125 mL/h.'],
    [2, 0, '500 mL over 4 h with a 20 gtt/mL set. Drops per minute?', '500 mL en 4 h con equipo de 20 gtt/mL. ¿Gotas por minuto?', ['42 gtt/min', '21 gtt/min', '63 gtt/min', '125 gtt/min'], 0, '(500 × 20) ÷ 240 min = 41.7 ≈ 42 gtt/min.', '(500 × 20) ÷ 240 min = 41,7 ≈ 42 gtt/min.'],
    [3, 3, 'A 12 kg child is prescribed 50 mg/kg/day divided every 6 hours. How many mg per dose?', 'Niño de 12 kg con 50 mg/kg/día cada 6 horas. ¿Cuántos mg por toma?', ['600 mg', '300 mg', '200 mg', '150 mg'], 0, '50 × 12 = 600 mg/day ÷ 4 doses = 150 mg.', '50 × 12 = 600 mg/día ÷ 4 tomas = 150 mg.'],
    [3, 1, 'Dopamine 5 mcg/kg/min for 80 kg. Bag: 400 mg in 250 mL (1600 mcg/mL). Rate in mL/h?', 'Dopamina 5 mcg/kg/min para 80 kg. Bolsa: 400 mg en 250 mL (1600 mcg/mL). ¿mL/h?', ['5 mL/h', '15 mL/h', '24 mL/h', '30 mL/h'], 0, '5 × 80 × 60 = 24 000 mcg/h ÷ 1600 = 15 mL/h.', '5 × 80 × 60 = 24 000 mcg/h ÷ 1600 = 15 mL/h.']
  ]
});
