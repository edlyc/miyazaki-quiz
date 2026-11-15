# Which Miyazaki Character Are You?

A whimsical, 40-question personality quiz that matches you to characters from the films of Hayao Miyazaki. It's a static site with no build step, hosted on GitHub Pages.

You get **one definitive character**, plus three "layers": your **core**, **stress/shadow**, and **relational** characters, drawn from 18 possible matches.

## Files

| File | What it is |
|---|---|
| `quiz-data.json` | **All quiz content**: questions, answer→trait signals, Q40 themes, 20 traits, 18 character profiles, and scoring weights. Edit this to change the quiz. |
| `app.js` | Quiz flow and scoring (follows `docs/SCORING.md` exactly). |
| `index.html`, `style.css` | Page and the painted-sky theme. |
| `docs/QUESTIONS.md` | Readable list of all questions and answers. |
| `docs/SCORING.md` | Full scoring specification, every answer mapping and character vector. |

## How scoring works (short version)

- Questions 1–39: pick 1–4 answers (or skip). Each answer gives +1/−1 signals on 20 traits; multiple picks are averaged.
- Question 40: free-text reflection (never scored) plus up to 3 optional themes that do count.
- Trait profile is compared to each character: 65% closeness + 35% pattern correlation, per role.
- Definitive match = 55% core + 20% stress + 25% relational. At least 25 questions must be answered.

## Run locally

The page loads `quiz-data.json`, so it needs a local server rather than opening the file directly:

```bash
python3 -m http.server
```

Then visit http://localhost:8000.

## Privacy & disclaimer

Answers are saved only in the visitor's browser (`localStorage`) so they can resume; nothing is sent anywhere. This is an unofficial, non-clinical fan project for fun. It is not a validated psychological test and is not affiliated with Studio Ghibli or Hayao Miyazaki. No film images or artwork are included.
