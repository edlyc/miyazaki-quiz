// ─────────────────────────────────────────────────────────────
//  QUIZ CONTENT — this is the only file you need to edit.
//
//  characters: every possible result. `id` is used for scoring.
//  questions:  each answer lists points per character id.
//              The character with the most points wins.
//
//  The entries below are PLACEHOLDERS to show the format.
// ─────────────────────────────────────────────────────────────

window.QUIZ = {
  title: "Which Miyazaki Character Are You?",
  intro: "Answer a few questions to find the Studio Ghibli character who matches you best.",

  characters: [
    {
      id: "chihiro",
      name: "Chihiro",
      film: "Spirited Away",
      description: "Placeholder: steady, adaptable, and braver than you think.",
    },
    {
      id: "howl",
      name: "Howl",
      film: "Howl's Moving Castle",
      description: "Placeholder: dramatic, charming, and secretly very kind.",
    },
    {
      id: "san",
      name: "San",
      film: "Princess Mononoke",
      description: "Placeholder: fierce, loyal, and close to nature.",
    },
  ],

  questions: [
    {
      text: "Placeholder: It's a free Saturday. You…",
      answers: [
        { text: "Explore somewhere new", points: { chihiro: 2 } },
        { text: "Redecorate (again)", points: { howl: 2 } },
        { text: "Head into the woods", points: { san: 2 } },
      ],
    },
    {
      text: "Placeholder: Your friends would call you…",
      answers: [
        { text: "Dependable", points: { chihiro: 2, san: 1 } },
        { text: "Magnetic", points: { howl: 2 } },
        { text: "Protective", points: { san: 2 } },
      ],
    },
  ],
};
