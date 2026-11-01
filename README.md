# lev. — Mary's nursing exam prep

A playful, Duolingo-style study app for the Israeli **Simulation Licensure Exam for New Immigrant Nurses**
(18 November 2026, MSR Tel HaShomer). English and Spanish, with medical Hebrew woven in.
Static HTML/CSS/JS: no build step and no backend. Progress is saved in the browser.

Content follows the official **September–December 2026** reading list (including CPR per AHA 2020).

## What's inside
- **Learn path**: 8 clinical units (43 lessons) where teaching is interleaved with 3-4 exam-style questions per lesson (ordered warm-up → core → exam-hard, tagged on each card), then a short "Hebrew moment"; a Bedside Medical Hebrew unit at the end; a checkpoint per unit. Hearts, XP, streaks, daily goal.
- **200 exam questions** (English + Spanish), each with four close options in random order: the wrong answers are real actions, drugs or values that fit a different situation, and option length gives no clue. Each answer shows its source on the reading list (textbook, AHA 2020, law or MOH circular). Law and circular claims were checked against the official texts.
- **MSR stations** (the Stations tab): 34 timed stations modelled on how MSR runs simulation licensing exams: 9 mannequin cases, 4 medication stations with bedside calculations, 3 actor communication stations, 4 teaching stations with teach-back, 10 five-minute procedures (step order, critical steps flagged) and 4 SBAR calls. Each station opens and closes with the safety red lines said out loud (the microphone ticks what it hears, where the browser supports it), asks for an answer in Mary's own words before showing options, and ends with the examiner's debrief questions. Practice rule: a station passes at 70% with no critical error. Plus a full **exam-day rehearsal** (6 stations, about 67 minutes), a red-lines drill and a bedside-calculation drill.
- **Daily plan**: from 2 November 2026 every day has timed stations, a procedure and a short knowledge block, with full rehearsals on 12 and 16 November. Earlier days keep their original tasks.
- **Simulation Ward**: 9 interactive patient cases with a live ECG/vitals monitor. Each choice is scored on safety, assessment, intervention, communication and documentation, followed by a debrief.
- **Practice**: timed adaptive mock exam, Priority Rush (90 s of exam questions), Match Madness (drug→antidote, sign→condition, values, rules), fix-your-mistakes, Hebrew cards.
- **Exam games**: Triage Rush (order 4 patients, animated debrief), Med Pass (give / hold / clarify from the order and chart, rules checked in Brunner & Suddarth), Vital Check (low / normal / high on an animated gauge).
- **Hebrew games**: Word Rain (falling words, lives, combos), Memory Flip (3D card pairs), Hebrew cards with 4-option quiz mode.
- **Visual lessons**: values become chips, gas formulas get subscripts, dense paragraphs become fact rows.
- **Audio**: every Hebrew word is pre-recorded (`audio/he`); questions and answers are read aloud with the device voice, with Hebrew pronounced natively.
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

## Check the content
```bash
node tools/validate.js
```
Checks every question, case, station, procedure, calculation and teaching card in both languages: answer keys, missing text, images, Hebrew audio, and that the right answer never stands out by being longer than the others.

## Add content
- Stations: `js/data/stations.js` (red lines, procedures, SBAR, calculations, teaching, stations); engine in `js/stations.js`.
- Game content: `js/data/games-data.js` (triage rounds, med-pass cards, normal ranges). Games: `js/games.js`.
- Lesson questions: `js/data/lessonq.js` (keyed `module-lessonIndex`). Clinical match pairs: `js/data/pairs.js`.
- Modules: `js/data/m-*.js`. A lesson is `{ t:[en,es], p:[[en,es]...], v:[[en,es,hebrew,translit]...] }`; a question is `[difficulty, correctIndex, qEn, qEs, optionsEn, optionsEs|0, whyEn, whyEs]`; inline Hebrew hint: `[[word|עברית|translit]]`.
- Simulation cases: `js/data/sims.js` (each choice scores 2 best / 1 ok / 0 unhelpful / -1 unsafe).

## Credits & disclaimer
3D images: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (MIT). Fonts: Fredoka, Nunito, Rubik (Google Fonts).
Unofficial study aid. The content is original and written from the Ministry of Health's topic list and reading list. It does not reproduce the copyrighted textbooks. Always verify with the MOH Nursing Division.
