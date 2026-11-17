/* Mock 8: the final exam built from Mary's notebook. Stations chosen for her pages: COPD (SpO2 88-92%, respiratory
   acidosis), thyroidectomy (low calcium: tingling, Chvostek, Trousseau), febrile seizure (6 months to 5 years),
   preeclampsia with an actor (magnesium and its stop rules). The knowledge test is 30 questions from her pages. */
NX.mocks.push({ id: 8, t: ['Final: your notes', 'Final: tus notas'], notes: true, fresh: true, st: ['a-copd', 'x-thyroid', 'x-seizure', 'x-preecl'] });
NX.mocks.sort((a, b) => (a.focus ? 1 : 0) - (b.focus ? 1 : 0) || a.id - b.id);
