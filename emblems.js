// Original emblem art for each result: a round painted badge with a symbol
// that nods to the character's story. No film artwork is reproduced.
// Each entry: sky gradient [top, bottom] and SVG markup in a 100×100 box.
window.EMBLEMS = (function () {
  const ink = "#3a3326", cream = "#fffaf0";
  return {
    nausicaa: { // a wind-borne feather
      sky: ["#8fd0e8", "#e9f6ea"],
      art: `<path d="M30 76 C34 52 52 30 76 22 C70 44 56 64 30 76 Z" fill="${cream}" stroke="#5b8f9c" stroke-width="2"/>
            <path d="M30 76 L68 30" stroke="#5b8f9c" stroke-width="2" stroke-linecap="round"/>
            <path d="M42 62 l10 2 M48 54 l11 1 M55 45 l10 0 M61 37 l8 -1" stroke="#5b8f9c" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M20 40 q8 -4 16 0 M62 74 q8 -4 16 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    },
    ashitaka: { // an arrow in flight over the forest
      sky: ["#b9d9a8", "#f3ecd2"],
      art: `<path d="M8 82 q12 -16 24 0 q12 -18 26 0 q12 -14 26 0 L92 92 L8 92 Z" fill="#5c8f5e"/>
            <path d="M22 66 L74 28" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
            <path d="M74 28 l-11 1 l5 4 Z M74 28 l-3 10 l-4 -5 Z" fill="${ink}"/>
            <path d="M22 66 l-2 -9 M22 66 l-9 -1 M27 62 l-2 -9 M27 62 l-9 -1" stroke="#b5533a" stroke-width="2.5" stroke-linecap="round"/>`,
    },
    sophie: { // a ribboned hat
      sky: ["#c9b3db", "#f6e9dc"],
      art: `<ellipse cx="50" cy="64" rx="34" ry="10" fill="#d9b98a" stroke="${ink}" stroke-width="2"/>
            <path d="M32 63 C32 40 68 40 68 63 Z" fill="#e8cc9c" stroke="${ink}" stroke-width="2"/>
            <path d="M32.5 57 Q50 62 67.5 57 L68 63 Q50 67 32 63 Z" fill="#7a5ea8"/>
            <path d="M64 60 q10 6 6 16 M66 60 q14 2 14 12" stroke="#7a5ea8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    },
    pazu: { // a sturdy gear and a dawn
      sky: ["#f7c98c", "#fbeed3"],
      art: `<circle cx="50" cy="54" r="22" fill="#9a8a6e" stroke="${ink}" stroke-width="2"/>
            <g fill="#9a8a6e" stroke="${ink}" stroke-width="2">
              ${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="45" y="24" width="10" height="10" rx="2" transform="rotate(${a} 50 54)"/>`).join("")}
            </g>
            <circle cx="50" cy="54" r="19" fill="#9a8a6e"/>
            <circle cx="50" cy="54" r="8" fill="#fbeed3" stroke="${ink}" stroke-width="2"/>`,
    },
    kiki: { // a broom streaking past the moon
      sky: ["#7fa8d8", "#d9e8f2"],
      art: `<circle cx="64" cy="36" r="16" fill="${cream}"/>
<g transform="translate(-12 6)">
            <path d="M18 74 L70 46" stroke="#8a5a34" stroke-width="4" stroke-linecap="round"/>
            <path d="M70 46 L88 30 L86 50 L92 44 L84 58 Z" fill="#d9a85b" stroke="${ink}" stroke-width="1.5"/>
            <path d="M74 44 l8 6" stroke="#b5533a" stroke-width="3"/>
            </g>
            <path d="M12 60 q8 0 12 -4 M10 70 q6 0 10 -3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    },
    porco: { // a little red seaplane
      sky: ["#7fc4dc", "#e7f4ef"],
      art: `<path d="M8 80 q10 -5 20 0 t20 0 t20 0 t24 0" stroke="#4f9ab5" stroke-width="3" fill="none"/>
            <path d="M24 56 C32 48 64 46 78 52 L80 58 C64 62 36 62 24 60 Z" fill="#c8483a" stroke="${ink}" stroke-width="2"/>
            <rect x="34" y="44" width="40" height="5" rx="2" fill="#c8483a" stroke="${ink}" stroke-width="1.5"/>
            <path d="M78 52 l8 -10 l2 12 Z" fill="#c8483a" stroke="${ink}" stroke-width="1.5"/>
            <path d="M22 50 v16" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M40 62 l-4 10 h28 l-4 -10" stroke="${ink}" stroke-width="1.5" fill="none"/>`,
    },
    san: { // a paw print and the moon
      sky: ["#c0d8b0", "#efe6cf"],
      art: `<circle cx="70" cy="28" r="10" fill="${cream}"/>
            <ellipse cx="48" cy="62" rx="15" ry="13" fill="#b5533a"/>
            <ellipse cx="30" cy="44" rx="6" ry="8" fill="#b5533a" transform="rotate(-20 30 44)"/>
            <ellipse cx="42" cy="34" rx="6" ry="8" fill="#b5533a"/>
            <ellipse cx="56" cy="34" rx="6" ry="8" fill="#b5533a"/>
            <ellipse cx="67" cy="44" rx="6" ry="8" fill="#b5533a" transform="rotate(20 67 44)"/>`,
    },
    howl: { // a falling star
      sky: ["#4a4f8c", "#b08bb8"],
      art: `<path d="M18 22 C34 34 46 48 54 58" stroke="#fff3c4" stroke-width="3" stroke-linecap="round" opacity=".7"/>
            <path d="M62 44 l5 11 l12 1 l-9 8 l3 12 l-11 -6 l-11 6 l3 -12 l-9 -8 l12 -1 Z" fill="#ffe27a" stroke="#fff" stroke-width="1.5"/>
            <circle cx="28" cy="70" r="1.6" fill="#fff"/><circle cx="80" cy="26" r="1.6" fill="#fff"/><circle cx="36" cy="30" r="1.2" fill="#fff"/>`,
    },
    chihiro: { // a glowing paper lantern
      sky: ["#e8a47c", "#f7dfc2"],
      art: `<circle cx="50" cy="56" r="30" fill="#ffd98a" opacity=".45"/>
            <path d="M50 18 v10" stroke="${ink}" stroke-width="2"/>
            <rect x="40" y="26" width="20" height="6" rx="2" fill="${ink}"/>
            <path d="M38 32 C28 46 28 62 38 76 L62 76 C72 62 72 46 62 32 Z" fill="#e2563d" stroke="${ink}" stroke-width="2"/>
            <path d="M34 46 h32 M32 58 h36 M35 70 h30" stroke="#b5533a" stroke-width="1.5"/>
            <rect x="40" y="76" width="20" height="6" rx="2" fill="${ink}"/>`,
    },
    eboshi: { // the forge's flame
      sky: ["#a9897a", "#f0d7bf"],
      art: `<path d="M50 16 C58 32 74 40 72 60 C71 74 61 84 50 84 C39 84 29 74 28 60 C27 46 38 40 40 28 C46 36 46 42 50 46 C54 38 52 28 50 16 Z" fill="#e2763d" stroke="${ink}" stroke-width="2"/>
            <path d="M50 46 C58 54 62 62 60 70 C58 77 54 80 50 80 C46 80 41 77 40 70 C39 63 44 58 50 46 Z" fill="#ffd36a"/>
            <rect x="26" y="84" width="48" height="6" rx="2" fill="${ink}"/>`,
    },
    sheeta: { // a softly glowing pendant
      sky: ["#9bc4e2", "#e3eef6"],
      art: `<path d="M30 20 Q50 46 70 20" stroke="${ink}" stroke-width="1.5" fill="none"/>
            <circle cx="50" cy="58" r="22" fill="#a6e3f0" opacity=".5"/>
            <path d="M50 36 L62 54 L50 76 L38 54 Z" fill="#59bcd6" stroke="${ink}" stroke-width="2"/>
            <path d="M50 36 L50 76 M38 54 H62" stroke="#d6f5fb" stroke-width="1.5"/>
            <circle cx="50" cy="38" r="3" fill="${ink}"/>`,
    },
    satsuki: { // an umbrella in the rain
      sky: ["#9fb7c4", "#e3ecef"],
      art: `<path d="M20 52 C20 30 80 30 80 52 C75 47 70 47 65 52 C60 47 55 47 50 52 C45 47 40 47 35 52 C30 47 25 47 20 52 Z" fill="#e0a43a" stroke="${ink}" stroke-width="2"/>
            <path d="M50 52 V78 q0 6 -6 6 q-5 0 -5 -5" stroke="${ink}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M24 64 l-3 7 M32 72 l-3 7 M70 64 l-3 7 M78 72 l-3 7 M62 76 l-3 7" stroke="#5f8fb0" stroke-width="2" stroke-linecap="round"/>`,
    },
    jiro: { // a paper plane on the wind
      sky: ["#a8d4e8", "#f4efdc"],
      art: `<path d="M16 58 L86 30 L54 74 L48 60 Z" fill="${cream}" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>
            <path d="M48 60 L86 30 L40 56 Z" fill="#e5dcc6" stroke="${ink}" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M14 76 q14 -8 26 -2 M8 66 q10 -6 18 -2" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    },
    mahito: { // a heron crossing a quiet sky
      sky: ["#8ea3b8", "#e8e2d4"],
      art: `<path d="M18 50 Q34 36 50 48 Q66 36 84 46 Q66 44 56 54 L50 56 L44 54 Q34 44 18 50 Z" fill="#6f7f92" stroke="${ink}" stroke-width="1.5"/>
            <path d="M50 52 Q56 60 68 60 L80 58" stroke="${ink}" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M80 58 l8 -1" stroke="#d9a85b" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M14 80 h72" stroke="#6f7f92" stroke-width="1.5" opacity=".6"/>`,
    },
    haku: { // a winding river
      sky: ["#6fb0b8", "#d8eee8"],
      art: `<path d="M66 12 C30 26 74 44 40 56 C18 64 42 80 30 92" stroke="#e8f7f4" stroke-width="16" fill="none" stroke-linecap="round"/>
            <path d="M66 12 C30 26 74 44 40 56 C18 64 42 80 30 92" stroke="#3e8a95" stroke-width="7" fill="none" stroke-linecap="round"/>
            <path d="M58 24 q4 2 8 0 M44 64 q4 2 8 0" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    },
    fio: { // a wrench and a pencil, crossed
      sky: ["#f2b8a0", "#fbecd9"],
      art: `<g transform="rotate(45 50 50)">
              <rect x="46" y="26" width="8" height="48" rx="3" fill="#8f9aa6" stroke="${ink}" stroke-width="2"/>
              <path d="M40 16 a12 12 0 1 0 20 0 l-4 6 h-12 Z" fill="#8f9aa6" stroke="${ink}" stroke-width="2"/>
            </g>
            <g transform="rotate(-45 50 50)">
              <rect x="46" y="22" width="8" height="46" fill="#e0a43a" stroke="${ink}" stroke-width="2"/>
              <path d="M46 68 L50 80 L54 68 Z" fill="#f0d7a8" stroke="${ink}" stroke-width="2"/>
              <rect x="46" y="18" width="8" height="6" fill="#d97b8f" stroke="${ink}" stroke-width="2"/>
            </g>`,
    },
    ponyo: { // a bright little fish among bubbles
      sky: ["#78c2d6", "#d6f0f2"],
      art: `<path d="M24 54 C30 38 56 36 66 52 C56 66 32 68 24 54 Z" fill="#ea5a3c" stroke="${ink}" stroke-width="2"/>
            <path d="M64 52 L82 40 L78 52 L82 64 Z" fill="#ea5a3c" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="35" cy="50" r="3" fill="${ink}"/>
            <path d="M30 58 q4 3 8 0" stroke="${ink}" stroke-width="1.5" fill="none"/>
            <circle cx="22" cy="30" r="4" fill="none" stroke="#fff" stroke-width="2"/>
            <circle cx="34" cy="22" r="2.5" fill="none" stroke="#fff" stroke-width="2"/>
            <circle cx="70" cy="76" r="3.5" fill="none" stroke="#fff" stroke-width="2"/>`,
    },
    lisa: { // a cliff-top house with a warm light on
      sky: ["#6f86b8", "#f2c99c"],
      art: `<path d="M8 92 L8 74 Q30 64 50 66 Q70 68 92 62 L92 92 Z" fill="#5c8f5e"/>
            <rect x="38" y="48" width="26" height="20" fill="${cream}" stroke="${ink}" stroke-width="2"/>
            <path d="M34 50 L51 34 L68 50 Z" fill="#c8483a" stroke="${ink}" stroke-width="2" stroke-linejoin="round"/>
            <rect x="45" y="54" width="9" height="8" fill="#ffd36a" stroke="${ink}" stroke-width="1.5"/>
            <path d="M54 58 L90 44 L90 70 Z" fill="#ffe9a8" opacity=".55"/>`,
    },
  };
})();

window.emblemSVG = function (id, size) {
  const e = window.EMBLEMS[id];
  if (!e) return "";
  const gid = `sky-${id}-${Math.random().toString(36).slice(2, 7)}`;
  return `<svg class="emblem" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${e.sky[0]}"/><stop offset="1" stop-color="${e.sky[1]}"/></linearGradient>
      <clipPath id="${gid}-c"><circle cx="50" cy="50" r="46"/></clipPath>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#${gid})"/>
    <g clip-path="url(#${gid}-c)">${e.art}</g>
    <circle cx="50" cy="50" r="46" fill="none" stroke="#fffaf0" stroke-width="4"/>
  </svg>`;
};
