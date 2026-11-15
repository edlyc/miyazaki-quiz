(function () {
  const quiz = window.QUIZ;
  const app = document.getElementById("app");
  let step = 0;
  let scores = {};

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  function render(nodes) {
    app.replaceChildren(...nodes);
    window.scrollTo({ top: 0 });
  }

  function start() {
    step = 0;
    scores = Object.fromEntries(quiz.characters.map((c) => [c.id, 0]));
    const btn = el("button", "primary", "Start the quiz");
    btn.onclick = showQuestion;
    render([el("h1", null, quiz.title), el("p", "intro", quiz.intro), btn]);
    document.title = quiz.title;
  }

  function showQuestion() {
    const q = quiz.questions[step];
    const progress = el("div", "progress");
    const bar = el("div", "bar");
    bar.style.width = `${(step / quiz.questions.length) * 100}%`;
    progress.append(bar);

    const list = el("div", "answers");
    q.answers.forEach((a) => {
      const b = el("button", "answer", a.text);
      b.onclick = () => {
        for (const [id, pts] of Object.entries(a.points || {})) {
          scores[id] = (scores[id] || 0) + pts;
        }
        step++;
        step < quiz.questions.length ? showQuestion() : showResult();
      };
      list.append(b);
    });

    render([
      progress,
      el("p", "count", `Question ${step + 1} of ${quiz.questions.length}`),
      el("h2", null, q.text),
      list,
    ]);
  }

  function showResult() {
    // Highest score wins; ties go to the character listed first.
    const best = quiz.characters.reduce((a, b) => (scores[b.id] > scores[a.id] ? b : a));
    const card = el("section", "result");
    card.append(el("p", "count", "You are…"), el("h1", null, best.name));
    if (best.film) card.append(el("p", "film", best.film));
    if (best.image) {
      const img = el("img");
      img.src = best.image;
      img.alt = best.name;
      card.append(img);
    }
    card.append(el("p", null, best.description));

    const again = el("button", "primary", "Take it again");
    again.onclick = start;
    const share = el("button", "secondary", "Share");
    share.onclick = async () => {
      const text = `I got ${best.name} on "${quiz.title}"!`;
      try {
        if (navigator.share) await navigator.share({ text, url: location.href });
        else {
          await navigator.clipboard.writeText(`${text} ${location.href}`);
          share.textContent = "Link copied!";
        }
      } catch (_) {}
    };
    const row = el("div", "row");
    row.append(again, share);
    render([card, row]);
  }

  start();
})();
