(async function () {
  "use strict";

  // ── Data ──────────────────────────────────────────────────────
  // All questions, answer signals, character profiles and weights live in
  // quiz-data.json. Scoring follows docs/SCORING.md exactly.
  const app = document.getElementById("app");
  let DATA;
  try {
    DATA = await (await fetch("quiz-data.json", { cache: "no-cache" })).json();
  } catch (e) {
    app.innerHTML = '<div class="screen"><h2>The wind carried the quiz away…</h2><p>Please refresh the page to try again.</p></div>';
    return;
  }

  const MC = DATA.questions.length;   // 39 multiple-choice questions
  const TOTAL = MC + 1;               // + the open reflection (Q40)
  const STORAGE = "miyazaki-character-quiz-v1";
  const OTHER = "Something else.";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const scored = (o) => Object.keys(o.signals || {}).length > 0;

  const fresh = () => ({ page: 0, answers: {}, other: {}, reflection: "", themes: [], completed: false });
  let state = fresh();
  try {
    const saved = localStorage.getItem(STORAGE);
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch (e) {}
  const persist = () => { try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (e) {} };

  function render(html) {
    app.innerHTML = `<div class="screen">${html}</div>`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // ── Scoring (see docs/SCORING.md) ─────────────────────────────
  function getSignature() {
    const sum = {}, den = {};
    for (const k of Object.keys(DATA.traits)) { sum[k] = 0; den[k] = 0; }
    let answered = 0;
    for (const q of DATA.questions) {
      const ids = state.answers[q.id] || [];
      const picks = q.options.filter((o) => ids.includes(o.id) && scored(o));
      if (!picks.length) continue;
      answered++;
      const relevant = new Set(q.options.flatMap((o) => Object.keys(o.signals)));
      for (const k of relevant) {
        den[k]++;
        sum[k] += picks.reduce((s, o) => s + (o.signals[k] || 0), 0) / picks.length;
      }
    }
    if (state.themes.length) {
      const w = DATA.scoring.themeWeight;
      const chosen = DATA.themes.filter((t) => state.themes.includes(t.id));
      const relevant = new Set(DATA.themes.flatMap((t) => Object.keys(t.signals)));
      for (const k of relevant) {
        den[k] += w;
        sum[k] += w * (chosen.some((t) => t.signals[k]) ? 1 : 0);
      }
    }
    const values = {};
    for (const k of Object.keys(DATA.traits)) {
      values[k] = den[k] === 0 ? 0.5 : Math.max(0, Math.min(1, 0.5 + 0.5 * sum[k] / den[k]));
    }
    return { values, answered };
  }

  function fitRole(role, ch, values) {
    const axes = DATA.axisOrder[role];
    const a = axes.map((k) => values[k]), b = axes.map((k) => ch[role][k]);
    const proximity = 1 - Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0) / axes.length);
    const mean = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;
    const av = mean(a), bv = mean(b);
    const num = a.reduce((s, v, i) => s + (v - av) * (b[i] - bv), 0);
    const va = a.reduce((s, v) => s + (v - av) ** 2, 0), vb = b.reduce((s, v) => s + (v - bv) ** 2, 0);
    const corr = va > 1e-12 && vb > 1e-12 ? Math.max(-1, Math.min(1, num / Math.sqrt(va * vb))) : 0;
    return 100 * (0.65 * proximity + 0.35 * (corr + 1) / 2);
  }

  function rankResults(values) {
    const w = DATA.scoring;
    const all = DATA.characters.map((ch) => {
      const core = fitRole("core", ch, values), stress = fitRole("stress", ch, values), relational = fitRole("relational", ch, values);
      return { ...ch, core, stress, relational, total: w.coreWeight * core + w.stressWeight * stress + w.relationalWeight * relational };
    });
    const by = (key) => [...all].sort((a, b) => b[key] - a[key] || a.name.localeCompare(b.name));
    return { definitive: by("total")[0], core: by("core")[0], stress: by("stress")[0], relational: by("relational")[0], top: by("total").slice(0, 5) };
  }

  // ── Intro ─────────────────────────────────────────────────────
  function renderIntro() {
    const resuming = Object.keys(state.answers).length || state.reflection || state.themes.length;
    render(`
      <p class="eyebrow">An unofficial, non-clinical character study</p>
      <h1>${esc(DATA.title)}</h1>
      <p class="intro">Forty questions about how you care, choose, protect yourself, face uncertainty, and find meaning. You'll meet one definitive character, plus the ones who mirror your core, your shadow, and the way you love.</p>
      <ul class="notes">
        <li>Answer with what you <em>actually</em> tend to do, including the less flattering parts.</li>
        <li>Pick up to four answers when several fit, or skip anything that doesn't.</li>
        <li>It takes about 15–25 minutes. Your answers are saved in this browser so you can come back to it.</li>
      </ul>
      <div class="row">
        <button class="primary" id="start">${resuming ? "Continue the journey" : "Begin the journey"}</button>
        ${resuming ? '<button class="secondary" id="reset">Start over</button>' : ""}
      </div>
      ${methodDetails()}
    `);
    document.getElementById("start").onclick = () => { state.completed = false; persist(); renderQuestion(); };
    const r = document.getElementById("reset");
    if (r) r.onclick = doReset;
  }

  function methodDetails() {
    return `<details class="method"><summary>How the scoring works</summary>
      <p>Each answer adds small +1 or −1 signals across 20 traits: eight for core personality, six for how you handle stress, and six for relationships. Picking several answers averages them, so extra clicks don't add extra weight. “Something else” and written text aren't scored.</p>
      <p>Your trait profile is compared with 18 character profiles. Each fit blends 65% closeness with 35% pattern similarity. Your definitive character weighs core 55%, stress 20% and relationships 25%; the three layer characters are ranked separately.</p>
      <p>This is a fan-made, editorial typology for fun, not a validated psychological test. All mappings are public in <a href="docs/SCORING.md">SCORING.md</a>.</p>
      <p class="micro">Answers never leave your device. Unofficial fan project; not affiliated with Studio Ghibli or Hayao Miyazaki.</p>
    </details>`;
  }

  function doReset() {
    if (!confirm("Clear your answers and start fresh?")) return;
    state = fresh();
    persist();
    renderQuestion();
  }

  // ── Questions ─────────────────────────────────────────────────
  function renderQuestion() {
    const n = state.page;
    const head = `
      <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${TOTAL}" aria-valuenow="${n}">
        <div class="bar" style="width:${(n / TOTAL) * 100}%"></div>
      </div>
      <div class="qhead"><p class="count">Question ${n + 1} of ${TOTAL}</p><p class="hint">${n < MC ? "Choose up to four" : "Open reflection"}</p></div>`;
    let body;

    if (n < MC) {
      const q = DATA.questions[n], sel = state.answers[q.id] || [];
      const otherOpt = q.options.find((o) => o.text === OTHER);
      body = `<h2>${esc(q.prompt)}</h2>
        <div class="answers">${q.options.map((o) => `
          <button type="button" class="answer" data-id="${o.id}" aria-pressed="${sel.includes(o.id)}">${esc(o.text)}</button>`).join("")}
        </div>
        ${otherOpt ? `<div id="other-wrap" ${sel.includes(otherOpt.id) ? "" : "hidden"}>
          <label for="other-input" class="hint">Tell it in your own words (optional, not scored)</label>
          <textarea id="other-input" rows="3" placeholder="The nuance, in your words…">${esc(state.other[q.id] || "")}</textarea></div>` : ""}`;
    } else {
      body = `<h2>${esc(DATA.question40.prompt)}</h2>
        <label for="reflection" class="hint">Write freely. This text isn't read or scored by anything.</label>
        <textarea id="reflection" rows="5" placeholder="Your own words…">${esc(state.reflection)}</textarea>
        <h3>Which themes best capture what you wrote?</h3>
        <p class="hint">Optional, up to three. Unlike your writing, these count toward your result.</p>
        <div class="pills">${DATA.themes.map((t) => `
          <button type="button" class="pill" data-theme="${t.id}" aria-pressed="${state.themes.includes(t.id)}">${esc(t.label)}</button>`).join("")}
        </div>`;
    }

    render(`${head}${body}
      <p id="alert" class="alert" role="status" hidden></p>
      <div class="nav">
        <button type="button" class="ghost" id="back" ${n === 0 ? "disabled" : ""}>← Back</button>
        <div class="nav-end">
          <button type="button" class="ghost" id="skip">${n === MC ? "Skip themes & finish" : "Skip"}</button>
          <button type="button" class="primary" id="next">${n === MC ? "Reveal my character ✨" : "Next →"}</button>
        </div>
      </div>
      <div class="foot"><button type="button" class="link" id="reset">Start over</button><span class="micro">Saved in this browser</span></div>`);

    if (n < MC) {
      const q = DATA.questions[n];
      app.querySelectorAll("[data-id]").forEach((btn) => btn.addEventListener("click", () => {
        const id = btn.dataset.id, o = q.options.find((p) => p.id === id);
        let arr = [...(state.answers[q.id] || [])];
        if (arr.includes(id)) arr = arr.filter((k) => k !== id);
        else if (scored(o) && arr.filter((k) => scored(q.options.find((p) => p.id === k))).length >= DATA.scoring.maximumSelections) {
          return alertText("You can choose up to four. Tap one to deselect it first.");
        } else arr.push(id);
        state.answers[q.id] = arr;
        persist();
        app.querySelectorAll("[data-id]").forEach((x) => x.setAttribute("aria-pressed", String(arr.includes(x.dataset.id))));
        const wrap = document.getElementById("other-wrap");
        const otherOpt = q.options.find((p) => p.text === OTHER);
        if (wrap) wrap.hidden = !arr.includes(otherOpt.id);
        alertText("");
      }));
      const other = document.getElementById("other-input");
      if (other) other.oninput = (e) => { state.other[q.id] = e.target.value; persist(); };
    } else {
      document.getElementById("reflection").oninput = (e) => { state.reflection = e.target.value; persist(); };
      app.querySelectorAll("[data-theme]").forEach((btn) => btn.addEventListener("click", () => {
        const key = btn.dataset.theme;
        let arr = [...state.themes];
        if (arr.includes(key)) arr = arr.filter((v) => v !== key);
        else if (arr.length >= 3) return alertText("Choose up to three themes. Tap one to deselect it first.");
        else arr.push(key);
        state.themes = arr;
        persist();
        app.querySelectorAll("[data-theme]").forEach((x) => x.setAttribute("aria-pressed", String(arr.includes(x.dataset.theme))));
        alertText("");
      }));
    }

    document.getElementById("back").onclick = () => { state.page = Math.max(0, n - 1); persist(); renderQuestion(); };
    document.getElementById("next").onclick = () => advance(false);
    document.getElementById("skip").onclick = () => advance(true);
    document.getElementById("reset").onclick = doReset;
  }

  function alertText(msg) {
    const a = document.getElementById("alert");
    if (!a) return;
    a.textContent = msg;
    a.hidden = !msg;
  }

  function advance(skip) {
    if (state.page < MC) { state.page++; persist(); renderQuestion(); return; }
    if (skip) state.themes = [];
    const { answered } = getSignature();
    const min = DATA.scoring.minimumAnswered;
    if (answered < min) {
      return alertText(`Almost there! Please answer at least ${min} of the multiple-choice questions so the match means something. You've answered ${answered} so far (“Something else” on its own doesn't count). Use ← Back to fill a few in.`);
    }
    state.completed = true;
    persist();
    renderResults();
  }

  // ── Results ───────────────────────────────────────────────────
  function topTraits(role, values) {
    return DATA.axisOrder[role].map((k) => ({ value: values[k], ...DATA.traits[k] })).sort((a, b) => b.value - a.value).slice(0, 3);
  }

  function layer(icon, title, ch) {
    return `<div class="layer">${window.emblemSVG(ch.id, 64)}<div><p class="tag">${icon} ${title}</p><h3>${esc(ch.name)}</h3><p class="film">${esc(ch.film)}</p><p>${esc(ch.summary)}</p></div></div>`;
  }

  function renderResults() {
    const { values, answered } = getSignature();
    const r = rankResults(values), best = r.definitive;
    const groups = [["core", "Underlying personality"], ["stress", "Under pressure"], ["relational", "In relationships"]];

    render(`
      <section class="result">
        <p class="eyebrow">The wind whispers that you are…</p>
        <div class="hero-emblem">${window.emblemSVG(best.id, 132)}</div>
        <h1>${esc(best.name)}</h1>
        <p class="film">${esc(best.film)}</p>
        <p class="desc">${esc(best.summary)}</p>
      </section>

      <h2 class="section">Your three character layers</h2>
      <div class="layers">
        ${layer("🌳", "Core", r.core)}
        ${layer("🌩️", "Stress / shadow", r.stress)}
        ${layer("🤝", "Relational", r.relational)}
      </div>

      <h2 class="section">What your answers leaned toward</h2>
      <div class="traits">${groups.map(([role, label]) => `
        <div><p class="tag">${label}</p>${topTraits(role, values).map((t) => `
          <div class="trait"><span>${esc(t.label)}</span><span class="track"><span style="width:${Math.round(t.value * 100)}%"></span></span><span class="micro">${Math.round(t.value * 100)}</span></div>`).join("")}
        </div>`).join("")}
      </div>

      <details class="method"><summary>Other close matches</summary>
        <ol>${r.top.slice(1).map((c) => `<li>${window.emblemSVG(c.id, 32)}<span><strong>${esc(c.name)}</strong>, ${esc(c.film)}</span></li>`).join("")}</ol>
        <p class="micro">Results can be close; picking one definitive character is part of the scoring rule.</p>
      </details>
      <details class="method"><summary>How this result was calculated</summary>
        <p>${answered} of ${MC} multiple-choice questions were scored, plus ${state.themes.length} theme(s) from Question 40. Your written reflection was not scored.</p>
        <p>Character fit is 65% profile closeness and 35% pattern similarity; your definitive character weighs core 55%, stress 20%, relationships 25%. It's a relative match, not a probability, and a fan-made typology rather than a psychological test. Full details in <a href="docs/SCORING.md">SCORING.md</a>.</p>
      </details>

      <div class="row">
        <button class="primary" id="share">Share my result</button>
        <button class="secondary" id="review">Review answers</button>
        <button class="secondary" id="restart">Take it again</button>
      </div>
      <p id="share-status" class="micro" role="status"></p>
    `);

    document.getElementById("restart").onclick = doReset;
    document.getElementById("review").onclick = () => { state.page = 0; state.completed = false; persist(); renderQuestion(); };
    document.getElementById("share").onclick = async () => {
      const url = location.href.split("#")[0];
      const text = `My Miyazaki character is ${best.name} (${best.film})!\nCore: ${r.core.name} · Shadow: ${r.stress.name} · Relational: ${r.relational.name}`;
      const status = document.getElementById("share-status");
      try {
        if (navigator.share) await navigator.share({ title: DATA.title, text, url });
        else { await navigator.clipboard.writeText(`${text}\n${url}`); status.textContent = "Copied to your clipboard ✨"; }
      } catch (e) {
        if (e.name !== "AbortError") status.textContent = "Couldn't copy here. Select the names above to share them.";
      }
    };
    sparkleBurst();
  }

  // ── Decoration ────────────────────────────────────────────────
  // Drifting motes: dandelion fluff by day, fireflies by night
  const motes = document.querySelector(".motes");
  for (let i = 0; i < 18; i++) {
    const m = document.createElement("span");
    const size = 3 + Math.random() * 5;
    Object.assign(m.style, {
      left: `${Math.random() * 100}%`, width: `${size}px`, height: `${size}px`,
      animationDuration: `${14 + Math.random() * 16}s`, animationDelay: `${-Math.random() * 30}s`,
    });
    motes.append(m);
  }

  function sparkleBurst() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = app.getBoundingClientRect();
    const glyphs = ["✨", "🌸", "⭐", "🍃", "✨", "🌼"];
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = glyphs[i % glyphs.length];
      const angle = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 180;
      s.style.left = `${box.left + box.width / 2}px`;
      s.style.top = `${box.top + 90}px`;
      s.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      s.style.setProperty("--dy", `${Math.sin(angle) * dist - 40}px`);
      s.style.animationDelay = `${Math.random() * 0.2}s`;
      document.body.append(s);
      setTimeout(() => s.remove(), 2000);
    }
  }

  // ── Start ─────────────────────────────────────────────────────
  if (state.completed) renderResults();
  else renderIntro();
})();
