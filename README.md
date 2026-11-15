# Which Miyazaki Character Are You?

A static, no-build personality quiz hosted on GitHub Pages.

## Editing the quiz

All content lives in [`quiz-data.js`](quiz-data.js):

- **characters**: the possible results (`id`, `name`, `film`, `description`, optional `image` URL/path).
- **questions**: each answer awards points to one or more character ids. The highest total wins; ties go to whichever character is listed first.

## Run locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server
```

## Publishing

Pushes to `main` are served by GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
