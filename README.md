# lev. — Mary's nursing exam prep

A playful, Duolingo-style study app for the Israeli **Simulation Licensure Exam for New Immigrant Nurses**
(18 November 2026, MSR Tel HaShomer). English and Spanish, with medical Hebrew woven in.
Static HTML/CSS/JS: no build step and no backend. Progress is saved in the browser.

Content follows the official **September–December 2026** reading list (including CPR per AHA 2020).

## What's inside
- **Learn path**: 10 units, 49 bite-size lessons (teach cards, new Hebrew words, tap-the-pairs, listening, quiz), plus a checkpoint per unit. Hearts, XP, streaks, daily goal.
- **Simulation Ward**: 9 interactive patient cases with a live ECG/vitals monitor. Each choice is scored on safety, assessment, intervention, communication and documentation, followed by a debrief.
- **Practice**: flashcards (spaced repetition + Hebrew speech), Match Madness, 60-second Speed Round, Dosage Lab, timed adaptive mock exam, fix-your-mistakes.
- **My plan**: a day-by-day sprint to exam day. **The exam**: what is known about the simulation exam, plus simulation tips.
- Lev, a heart-shaped nurse mascot (*lev* = heart in Hebrew), confetti, sound effects, light and dark mode, phone layout.

## Run locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000. Opening `index.html` directly also works in Chrome.

## Publish on GitHub Pages
1. Create a repo on your personal GitHub account and push these files to `main`.
2. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / root.
3. The site goes live at `https://<username>.github.io/<repo>/`.

## Add content
- Modules: `js/data/m-*.js`. A lesson is `{ t:[en,es], p:[[en,es]...], v:[[en,es,hebrew,translit]...] }`; a question is `[difficulty, correctIndex, qEn, qEs, optionsEn, optionsEs|0, whyEn, whyEs]`; inline Hebrew hint: `[[word|עברית|translit]]`.
- Simulation cases: `js/data/sims.js` (each choice scores 2 best / 1 ok / 0 unhelpful / -1 unsafe).

## Credits & disclaimer
3D images: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT). Fonts: Fredoka, Nunito, Rubik (Google Fonts).
Unofficial study aid. The content is original and written from the Ministry of Health's topic list and reading list. It does not reproduce the copyrighted textbooks. Always verify with the MOH Nursing Division.
