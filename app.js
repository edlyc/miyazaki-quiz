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
    const screen = el("div", "screen");
    screen.append(...nodes);
    app.replaceChildren(screen);
    window.scrollTo({ top: 0 });
  }

  // Drifting motes: dandelion fluff by day, fireflies by night
  const motes = document.querySelector(".motes");
  for (let i = 0; i < 18; i++) {
    const m = el("span");
    const size = 3 + Math.random() * 5;
    Object.assign(m.style, {
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${14 + Math.random() * 16}s`,
      animationDelay: `${-Math.random() * 30}s`,
    });
    motes.append(m);
  }

  function sparkleBurst() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = app.getBoundingClientRect();
    const glyphs = ["✨", "🌸", "⭐", "🍃", "✨", "🌼"];
    for (let i = 0; i < 22; i++) {
      const s = el("span", "sparkle", glyphs[i % glyphs.length]);
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 180;
      s.style.left = `${r.left + r.width / 2}px`;
      s.style.top = `${r.top + 90}px`;
      s.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      s.style.setProperty("--dy", `${Math.sin(angle) * dist - 40}px`);
      s.style.animationDelay = `${Math.random() * 0.2}s`;
      document.body.append(s);
      setTimeout(() => s.remove(), 2000);
    }
  }

  function start() {
    step = 0;
    scores = Object.fromEntries(quiz.characters.map((c) => [c.id, 0]));
    const btn = el("button", "primary", "Begin the journey");
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
    card.append(el("p", "eyebrow", "The wind whispers that you are…"), el("h1", null, best.name));
    if (best.film) card.append(el("p", "film", best.film));
    if (best.image) {
      const img = el("img");
      img.src = best.image;
      img.alt = best.name;
      card.append(img);
    }
    card.append(el("p", "desc", best.description));

    const again = el("button", "primary", "Wander again");
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
    sparkleBurst();
  }

  start();
})();
