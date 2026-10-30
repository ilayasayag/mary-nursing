/* Content registry. Each module file calls NX.addModule(...).
   Lesson:   { t:[en,es], p:[[en,es],...], v:[[en,es,he,tr],...] }
   Question: [difficulty 1-3, correctIndex, qEn, qEs, optsEn[], optsEs[]|0, whyEn, whyEs]
   Inline Hebrew hint inside lesson text:  [[word|עברית|translit]]  */
window.NX = {
  modules: [], qs: [], vocab: [],
  addModule(m) {
    const mod = {
      id: m.id, icon: m.icon, title: { en: m.t[0], es: m.t[1] },
      blurb: { en: m.b[0], es: m.b[1] }, exam: m.exam || '', lessons: []
    };
    m.lessons.forEach((l, li) => {
      const v = (l.v || []).map((x, i) => ({
        id: `${m.id}-${li}-${i}`, m: m.id, l: li, en: x[0], es: x[1], he: x[2], tr: x[3], alpha: !!l.alpha
      }));
      v.forEach(x => NX.vocab.push(x));
      mod.lessons.push({
        t: { en: l.t[0], es: l.t[1] },
        p: l.p.map(p => ({ en: p[0], es: p[1] })),
        v
      });
    });
    (m.q || []).forEach((r, i) => {
      NX.qs.push({
        id: `${m.id}${i}`, m: m.id, d: r[0], a: r[1],
        q: { en: r[2], es: r[3] },
        o: r[4].map((e, k) => ({ en: e, es: r[5] ? r[5][k] : e })),
        w: { en: r[6], es: r[7] }
      });
    });
    NX.modules.push(mod);
  }
};
