# Transparent scoring specification (version 1.0)

**Status:** This is an editorial, newly formalized scoring system created after the two conversational assessments. There was no hidden pre-existing objective algorithm behind their qualitative character assignments. A deterministic public quiz may produce different results. No psychometric validation, test-retest study, normative sampling, or clinical interpretation has been performed.

## 1. Dimensions

Each answer-option mapping below provides a signed signal of **+1** (evidence for a trait), **−1** (evidence against that trait), or **0** (no directional evidence). Signals are interpretive heuristics, not established psychological measurements.

| Short code | Profile | Label | Working meaning |
|---|---|---|---|
| `ca` | core | Compassion | Sensitivity to harm and the impulse to care |
| `ju` | core | Principled fairness | Consistency in values and concern for justice |
| `ac` | core | Practical agency | Taking action, adapting, moving problems forward |
| `au` | core | Autonomy | Protecting agency and freedom from imposed control |
| `in` | core | Reflective insight | Analyzing motives, context and complexity |
| `co` | core | Community | Belonging, interdependence, shared life |
| `wo` | core | Meaning & wonder | Purpose, imagination, beauty, possibility |
| `sk` | core | Competence & craft | Capability, preparation and practical skill |
| `ov` | stress | Overfunctioning | Taking on too much or staying useful to cope |
| `wd` | stress | Withdrawal | Emotional distancing or retreat when threatened |
| `re` | stress | Reactivity | Irritability, emotional flooding or sharp expression |
| `hv` | stress | Vigilance | Scanning for instability, signs or possible danger |
| `sc` | stress | Self-criticism | Shame, retrospective blame and over-scrutiny |
| `ct` | stress | Control-seeking | Tightening oversight when things feel uncertain |
| `at` | relational | Attunement | Reading and understanding another inner world |
| `rs` | relational | Reassurance seeking | Needing signs of safety and continued closeness |
| `pc` | relational | Practical care | Supporting people through action and problem solving |
| `dr` | relational | Direct expression | Talking about conflict and needs explicitly |
| `bd` | relational | Boundaries | Preserving space and distinguishing responsibilities |
| `pr` | relational | Steady presence | Offering or valuing reliable, unforced closeness |

## 2. Multiple-choice aggregation

1. For each question 1–39, retain up to **four selected answer options**. The “Something else” choice has no machine-scored signal; any typed explanation is not analyzed.
2. For each answered question, consider every trait that appears as a signal on **any** substantive answer choice for that question. This is the question’s *relevant-trait set*.
3. For each relevant trait, take the arithmetic **average** of the signed signals supplied by the selected substantive options (missing signals count as `0`). If someone selects A and C, they do not receive twice the weight of someone selecting A alone.
4. Add **1 unit of exposure** to the denominator of every relevant trait, and add that averaged signed signal to its numerator. Skipped questions and questions answered only with “Something else” do not contribute any scored exposure.
5. Turn each trait’s summed signal into a normalized value as follows:

```text
trait = 0.5 + 0.5 * (sum_of_signed_signals / total_exposure)
if total_exposure == 0: trait = 0.5
clamp trait between 0 and 1
```

For example, on a trait with three applicable answered questions and selected signals `+1`, `0`, and `−1`, the normalized trait score is `0.5`. A score of `0.5` denotes balanced or undifferentiated evidence; it is not a clinical midpoint.

## 3. Question 40: open response and optional self-coding

Written responses to Question 40 are **deliberately not analyzed by software**. Instead, a participant may select up to **three** theme chips. When at least one theme is chosen, every trait that appears in the possible theme menu receives **2 units of exposure**. For each such trait, the signed evidence is `+1` if any selected theme contains that trait, and `0` otherwise. No theme selected means Q40 is not scored. This is explicit self-description, not natural-language processing.

| Theme | Adds +1 evidence to |
|---|---|
| Protect life and alleviate suffering | `ca`, `ju` |
| Understand people beneath the surface | `in`, `at` |
| Create belonging and shared experiences | `co`, `pr` |
| Live freely and authentically | `au`, `wo` |
| Challenge injustice and reshape systems | `ju`, `ac` |
| Build, solve and become highly capable | `sk`, `ac` |
| Preserve beauty, play and wonder | `wo`, `co` |
| Show up for the people I love | `pc`, `pr` |
| Balance service with freedom and limits | `au`, `bd` |
| Learn, reflect and keep evolving | `in`, `wo` |

## 4. Character fit within each role

Every character has **three separate reference vectors**: one for the 8 core dimensions, one for the 6 stress dimensions, and one for the 6 relational dimensions. Each reference value runs from `0` to `1`. These values are **editorial character readings**, not measured data.

For each character and each role, we compute:

```text
RMSE = sqrt( mean_over_role_dimensions( (participant_trait - character_trait)^2 ) )
proximity = 1 - RMSE

correlation = PearsonCorrelation(participant_role_vector, character_role_vector)
If either vector has effectively zero variance, use correlation = 0.

role_fit = 100 * (0.65 * proximity + 0.35 * ((correlation + 1) / 2))
```

`proximity` rewards absolute resemblance in level; `correlation` rewards matching the **relative pattern** of strengths and vulnerabilities. The combination prevents profiles with uniformly middle-of-the-road values from automatically winning as often as a plain distance comparison would. The displayed match is **not a statistical probability**.

The **core**, **stress/shadow**, and **relational** characters are the top-ranked characters on their own respective role-fit scores. A character may occupy multiple roles. Ties are broken alphabetically by display name.

## 5. Definitive result

```text
definitive_fit = 0.55 * core_fit + 0.20 * stress_fit + 0.25 * relational_fit
```

The character with the greatest definitive-fit value is the single definitive match. Ties are broken alphabetically by character name. This result **need not be identical to the core match** because it integrates all three roles.

## 6. Complete answer-option-to-trait signals

Format: `QNN` / option / trait evidence. A `+` indicates `+1` and a `−` indicates `−1`. `—` means unscored. The full prose of each option is provided in `QUESTIONS.md` and `quiz-data.json`.

| Question | Option | Signals |
|---|---|---|
| 01 | A | `ac+`, `sk+`, `pc+` |
| 01 | B | `at+`, `hv+`, `ca+` |
| 01 | C | `re+`, `sk+` |
| 01 | D | `in+`, `hv+`, `ac−` |
| 01 | E | `ca+`, `ov+`, `pc+` |
| 01 | F | — |
| 02 | A | `at+`, `rs+`, `pr+` |
| 02 | B | `rs+`, `hv+`, `bd+` |
| 02 | C | `dr+`, `re+` |
| 02 | D | `bd+`, `rs−` |
| 02 | E | `sc+`, `hv+`, `rs+` |
| 02 | F | `wd+`, `bd+`, `pr−` |
| 02 | G | — |
| 03 | A | `pc+`, `ov+`, `ac+` |
| 03 | B | `sc+` |
| 03 | C | `re+`, `ju+`, `dr+` |
| 03 | D | `in+`, `sc+` |
| 03 | E | `bd+`, `wd+`, `dr+` |
| 03 | F | `ov+`, `rs+`, `at+` |
| 03 | G | — |
| 04 | A | `ov+`, `wd+`, `re+` |
| 04 | B | `re+`, `ct+` |
| 04 | C | `ct+`, `hv+` |
| 04 | D | `wd+`, `re−` |
| 04 | E | `rs+`, `wd−`, `pr+` |
| 04 | F | `ov+`, `sk+` |
| 04 | G | — |
| 05 | A | `dr+`, `bd+`, `au+` |
| 05 | B | `ca+`, `ov+`, `dr+` |
| 05 | C | `at+`, `pr+`, `ju−` |
| 05 | D | `re+`, `ct+` |
| 05 | E | `bd+`, `au+`, `wd+` |
| 05 | F | `pc+`, `ca+`, `sk+` |
| 05 | G | — |
| 06 | A | `in+`, `hv+` |
| 06 | B | `sk+`, `ov+`, `pc+` |
| 06 | C | `co+`, `dr+`, `pr+` |
| 06 | D | `sc+`, `hv+` |
| 06 | E | `at+`, `pr+`, `co−` |
| 06 | F | `au+`, `rs−` |
| 06 | G | — |
| 07 | A | `dr+`, `rs+` |
| 07 | B | `ca+`, `at+`, `re−` |
| 07 | C | `wd+`, `bd+` |
| 07 | D | `re+`, `sc+`, `dr+` |
| 07 | E | `ca+`, `sc+`, `ju+` |
| 07 | F | `wd+`, `sc+`, `re+` |
| 07 | G | — |
| 08 | A | `rs+`, `dr−` |
| 08 | B | `hv+`, `at+` |
| 08 | C | `wd+`, `bd+`, `rs+` |
| 08 | D | `ov+`, `pc+`, `rs+` |
| 08 | E | `dr+`, `rs+` |
| 08 | F | `sc+`, `wd+` |
| 08 | G | `re+`, `wd+` |
| 08 | H | — |
| 09 | A | `sk+`, `sc+`, `ov+` |
| 09 | B | `ac+`, `ov+`, `sk+` |
| 09 | C | `sc+`, `wd+` |
| 09 | D | `ac+`, `sk+`, `sc+` |
| 09 | E | `in+`, `pr+` |
| 09 | F | `ca+`, `ov+` |
| 09 | G | — |
| 10 | A | `at+`, `in+` |
| 10 | B | `ju+`, `dr+`, `bd+` |
| 10 | C | `in+`, `ca+` |
| 10 | D | `ac+`, `bd+` |
| 10 | E | `pr+`, `hv+` |
| 10 | F | `in+`, `at+` |
| 10 | G | `ca+`, `bd+`, `ju+` |
| 10 | H | — |
| 11 | A | `ju+`, `ac+`, `dr+` |
| 11 | B | `in+`, `ju+`, `dr+` |
| 11 | C | `wd+`, `re+` |
| 11 | D | `au+`, `in+`, `dr−` |
| 11 | E | `ca+`, `ju+`, `ac+` |
| 11 | F | `sc+`, `hv+` |
| 11 | G | — |
| 12 | A | `ca+`, `pc+`, `ov+` |
| 12 | B | `rs+`, `at+` |
| 12 | C | `ct+`, `re+` |
| 12 | D | `at+`, `ca+`, `pr+` |
| 12 | E | `bd+`, `au+` |
| 12 | F | `ov+`, `sc+`, `re+` |
| 12 | G | `ca+`, `wo+` |
| 12 | H | — |
| 13 | A | `in+`, `pr+` |
| 13 | B | `ju+`, `rs+` |
| 13 | C | `ct+`, `dr+` |
| 13 | D | `rs+`, `sc+` |
| 13 | E | `dr+`, `sc+` |
| 13 | F | `hv+`, `ju+` |
| 13 | G | — |
| 14 | A | `in+`, `sk+` |
| 14 | B | `sc+`, `wd+` |
| 14 | C | `dr+`, `in+` |
| 14 | D | `re+`, `in+`, `wd+` |
| 14 | E | `ac+`, `sk+` |
| 14 | F | `rs+`, `sc+` |
| 14 | G | `sc−`, `bd+` |
| 14 | H | — |
| 15 | A | `au+`, `ju+` |
| 15 | B | `in+`, `at+` |
| 15 | C | `ju+`, `ac+` |
| 15 | D | `hv+`, `bd+` |
| 15 | E | `in+`, `dr+` |
| 15 | F | `re+`, `au+`, `ju+` |
| 15 | G | — |
| 16 | A | `sc+`, `in+` |
| 16 | B | `rs+`, `hv+` |
| 16 | C | `wd+`, `au+` |
| 16 | D | `re+` |
| 16 | E | `sc+`, `in+` |
| 16 | F | `wd+`, `re−` |
| 16 | G | — |
| 17 | A | `pr+`, `at+`, `co+` |
| 17 | B | `sk+`, `ac+`, `ov+` |
| 17 | C | `hv+`, `rs+` |
| 17 | D | `co+`, `pr+` |
| 17 | E | `au+` |
| 17 | F | `ju+`, `sc+` |
| 17 | G | — |
| 18 | A | `ju+`, `ac+`, `dr+` |
| 18 | B | `in+`, `ac+`, `au+` |
| 18 | C | `in+`, `dr−` |
| 18 | D | `au+`, `wd+`, `bd+` |
| 18 | E | `hv+`, `sc+` |
| 18 | F | `ca+`, `ju+` |
| 18 | G | — |
| 19 | A | `sc+` |
| 19 | B | `ac+`, `sk+` |
| 19 | C | `sc+`, `wd+` |
| 19 | D | `wd+` |
| 19 | E | `in+`, `ac+` |
| 19 | F | `rs+`, `hv+` |
| 19 | G | `sc−`, `rs−` |
| 19 | H | — |
| 20 | A | `ov+`, `sk+`, `pc+` |
| 20 | B | `re+`, `ct+`, `ov+` |
| 20 | C | `dr+`, `sk+`, `bd+` |
| 20 | D | `bd+`, `au+` |
| 20 | E | `sc+`, `ov+` |
| 20 | F | `hv+`, `ct+` |
| 20 | G | — |
| 21 | A | `rs+`, `pr+` |
| 21 | B | `dr+`, `in+` |
| 21 | C | `bd+`, `rs−` |
| 21 | D | `sc+`, `hv+` |
| 21 | E | `re+`, `ju+` |
| 21 | F | `wd+`, `bd+` |
| 21 | G | — |
| 22 | A | `ac+`, `sk+` |
| 22 | B | `sc+` |
| 22 | C | `ac+`, `ov+`, `ct+` |
| 22 | D | `wd+`, `au+` |
| 22 | E | `in+`, `sk+` |
| 22 | F | `sc+`, `sk+` |
| 22 | G | — |
| 23 | A | `hv+`, `at+` |
| 23 | B | `dr+`, `rs+` |
| 23 | C | `bd+`, `hv+` |
| 23 | D | `wd+`, `rs+` |
| 23 | E | `rs−`, `hv−` |
| 23 | F | `at+`, `ov+`, `pc+` |
| 23 | G | — |
| 24 | A | `ov+`, `ca+`, `bd−` |
| 24 | B | `bd+`, `au+` |
| 24 | C | `re+`, `wd+` |
| 24 | D | `rs+`, `ov+` |
| 24 | E | `wd+`, `dr−` |
| 24 | F | `pc+`, `sk+`, `ac+` |
| 24 | G | — |
| 25 | A | `pr+`, `ca+` |
| 25 | B | `sk+`, `ac+` |
| 25 | C | `at+`, `in+` |
| 25 | D | `ac+`, `ju+` |
| 25 | E | `au+`, `wo+` |
| 25 | F | `ju+` |
| 25 | G | `co+`, `pr+` |
| 25 | H | — |
| 26 | A | `au+`, `re+`, `dr+` |
| 26 | B | `au+`, `hv+` |
| 26 | C | `au+`, `wd+` |
| 26 | D | `sc+` |
| 26 | E | `wd+`, `hv+`, `bd+` |
| 26 | F | `ju+`, `au+`, `sk+` |
| 26 | G | — |
| 27 | A | `wd+`, `bd+` |
| 27 | B | `ct+`, `hv+` |
| 27 | C | `ct+`, `ju+` |
| 27 | D | `rs+` |
| 27 | E | `sc+`, `ca+` |
| 27 | F | `ov+`, `re+` |
| 27 | G | `hv+` |
| 27 | H | — |
| 28 | A | `in+`, `hv+` |
| 28 | B | `rs+` |
| 28 | C | `hv+`, `bd+` |
| 28 | D | `bd+`, `rs+` |
| 28 | E | `sc+`, `hv+` |
| 28 | F | `ca+`, `pr+` |
| 28 | G | — |
| 29 | A | `ov+`, `pc+` |
| 29 | B | `ov+`, `re+` |
| 29 | C | `bd+`, `au+`, `ov−` |
| 29 | D | `wd+`, `bd+` |
| 29 | E | `ov+`, `sk+`, `pc+` |
| 29 | F | `rs+`, `ov+` |
| 29 | G | — |
| 30 | A | `ju+`, `in+` |
| 30 | B | `ca+`, `in+`, `ac+` |
| 30 | C | `co+`, `ca+` |
| 30 | D | `wo+`, `in+` |
| 30 | E | `ju+`, `ca+` |
| 30 | F | `ct+`, `sc+` |
| 30 | G | — |
| 31 | A | `wo+`, `re−` |
| 31 | B | `hv−`, `ov−` |
| 31 | C | `ac+`, `sc−` |
| 31 | D | `pr+`, `rs+`, `wd−` |
| 31 | E | `ct−`, `ov−` |
| 31 | F | `ac+`, `hv−` |
| 31 | G | — |
| 32 | A | `ov+`, `rs+` |
| 32 | B | `in+`, `at+` |
| 32 | C | `wo+`, `wd+` |
| 32 | D | `pr+`, `co+` |
| 32 | E | `pr+`, `pc+` |
| 32 | F | `wd+`, `rs+` |
| 32 | G | — |
| 33 | A | `ac+`, `ct+` |
| 33 | B | `hv+`, `in+` |
| 33 | C | `hv+`, `in+`, `ac−` |
| 33 | D | `rs+`, `pr+` |
| 33 | E | `ac+`, `sk+`, `pc+` |
| 33 | F | `wd+`, `sk+` |
| 33 | G | — |
| 34 | A | `ca+`, `at+`, `re−` |
| 34 | B | `at+`, `bd+`, `ju+` |
| 34 | C | `in+`, `ov+`, `bd−` |
| 34 | D | `ca+`, `re+` |
| 34 | E | `bd+`, `wd+` |
| 34 | F | `dr+`, `bd+`, `ac+` |
| 34 | G | — |
| 35 | A | `au+`, `wo+` |
| 35 | B | `ov+`, `ca+` |
| 35 | C | `sc+`, `in+` |
| 35 | D | `rs+`, `pr+` |
| 35 | E | `ca+`, `wo+` |
| 35 | F | `wo+`, `ac+` |
| 35 | G | — |
| 36 | A | `re+`, `bd+` |
| 36 | B | `rs+`, `pr+`, `ov+` |
| 36 | C | `sc+`, `bd+` |
| 36 | D | `re+`, `ov+`, `au+` |
| 36 | E | `bd+`, `ov−` |
| 36 | F | `sc+`, `ov+` |
| 36 | G | — |
| 37 | A | `hv+`, `pr+` |
| 37 | B | `hv+`, `in+` |
| 37 | C | `au+`, `ju+` |
| 37 | D | `sk+`, `re+` |
| 37 | E | `ca+`, `ju+` |
| 37 | F | `hv+`, `bd+` |
| 37 | G | — |
| 38 | A | `ac+`, `wo+` |
| 38 | B | `sc+`, `sk+` |
| 38 | C | `ju+`, `in+` |
| 38 | D | `sk+`, `sc+`, `ct+` |
| 38 | E | `hv+`, `ac−` |
| 38 | F | `ov+`, `ca+` |
| 38 | G | — |
| 39 | A | `rs+`, `pr+` |
| 39 | B | `at+`, `in+` |
| 39 | C | `pc+`, `rs+` |
| 39 | D | `pr+`, `rs+` |
| 39 | E | `pc+`, `ac+` |
| 39 | F | `pr+`, `bd+` |
| 39 | G | — |

## 7. Complete character reference vectors

Each vector appears in the precise axis order shown in its column header. Higher = more of that dimension in the editorial profile. Values can be directly edited in `quiz-data.json`; be sure to update the embedded JSON in `index.html` before publishing.

**Core order:** `ca`, `ju`, `ac`, `au`, `in`, `co`, `wo`, `sk`  
**Stress order:** `ov`, `wd`, `re`, `hv`, `sc`, `ct`  
**Relational order:** `at`, `rs`, `pc`, `dr`, `bd`, `pr`

| Character | Film | Core vector | Stress vector | Relational vector |
|---|---|---|---|---|
| Nausicaä | Nausicaä of the Valley of the Wind | `0.98, 0.95, 0.83, 0.72, 0.87, 0.88, 0.92, 0.72` | `0.91, 0.40, 0.67, 0.80, 0.80, 0.70` | `0.96, 0.82, 0.82, 0.58, 0.62, 0.90` |
| Ashitaka | Princess Mononoke | `0.79, 0.96, 0.95, 0.94, 0.90, 0.76, 0.78, 0.91` | `0.58, 0.64, 0.53, 0.56, 0.61, 0.47` | `0.76, 0.58, 0.93, 0.89, 0.87, 0.85` |
| Sophie Hatter | Howl’s Moving Castle | `0.90, 0.75, 0.72, 0.55, 0.80, 0.82, 0.79, 0.84` | `0.85, 0.47, 0.46, 0.56, 0.72, 0.50` | `0.97, 0.78, 0.95, 0.55, 0.67, 0.98` |
| Pazu | Castle in the Sky | `0.77, 0.79, 0.96, 0.70, 0.61, 0.88, 0.91, 0.92` | `0.71, 0.26, 0.48, 0.43, 0.53, 0.42` | `0.76, 0.58, 0.99, 0.79, 0.72, 0.98` |
| Kiki | Kiki’s Delivery Service | `0.72, 0.70, 0.78, 0.85, 0.67, 0.65, 0.92, 0.95` | `0.98, 0.67, 0.54, 0.73, 0.97, 0.75` | `0.70, 0.83, 0.91, 0.59, 0.41, 0.74` |
| Porco Rosso | Porco Rosso | `0.58, 0.78, 0.85, 0.99, 0.83, 0.51, 0.64, 0.95` | `0.43, 0.99, 0.92, 0.69, 0.65, 0.48` | `0.46, 0.37, 0.78, 0.69, 0.98, 0.57` |
| San | Princess Mononoke | `0.83, 0.96, 0.94, 0.92, 0.52, 0.71, 0.69, 0.74` | `0.65, 0.89, 0.98, 0.96, 0.50, 0.76` | `0.65, 0.39, 0.75, 0.62, 0.89, 0.72` |
| Howl | Howl’s Moving Castle | `0.66, 0.65, 0.63, 0.97, 0.84, 0.44, 0.98, 0.88` | `0.42, 0.97, 0.90, 0.63, 0.76, 0.70` | `0.82, 0.86, 0.69, 0.42, 0.90, 0.61` |
| Chihiro | Spirited Away | `0.90, 0.81, 0.81, 0.58, 0.83, 0.80, 0.88, 0.64` | `0.83, 0.55, 0.61, 0.90, 0.73, 0.50` | `0.91, 0.81, 0.82, 0.70, 0.62, 0.93` |
| Lady Eboshi | Princess Mononoke | `0.66, 0.73, 0.98, 0.78, 0.81, 0.88, 0.56, 0.99` | `0.82, 0.45, 0.77, 0.40, 0.47, 0.97` | `0.58, 0.44, 0.94, 0.94, 0.91, 0.66` |
| Sheeta | Castle in the Sky | `0.95, 0.88, 0.77, 0.72, 0.76, 0.79, 0.86, 0.73` | `0.78, 0.55, 0.52, 0.74, 0.78, 0.50` | `0.97, 0.76, 0.82, 0.73, 0.70, 0.96` |
| Satsuki | My Neighbor Totoro | `0.88, 0.72, 0.87, 0.53, 0.61, 0.96, 0.85, 0.96` | `0.96, 0.43, 0.54, 0.68, 0.71, 0.64` | `0.87, 0.65, 0.98, 0.67, 0.58, 0.96` |
| Jiro Horikoshi | The Wind Rises | `0.58, 0.67, 0.94, 0.75, 0.95, 0.51, 0.97, 0.99` | `0.91, 0.71, 0.36, 0.62, 0.93, 0.68` | `0.66, 0.52, 0.82, 0.59, 0.78, 0.72` |
| Mahito Maki | The Boy and the Heron | `0.72, 0.76, 0.84, 0.86, 0.92, 0.51, 0.87, 0.65` | `0.47, 0.96, 0.69, 0.83, 0.86, 0.55` | `0.71, 0.56, 0.60, 0.45, 0.81, 0.69` |
| Haku | Spirited Away | `0.83, 0.75, 0.83, 0.63, 0.78, 0.62, 0.66, 0.84` | `0.86, 0.82, 0.42, 0.58, 0.64, 0.65` | `0.75, 0.55, 0.93, 0.73, 0.79, 0.95` |
| Fio Piccolo | Porco Rosso | `0.76, 0.74, 0.99, 0.88, 0.78, 0.81, 0.86, 0.98` | `0.75, 0.32, 0.60, 0.45, 0.55, 0.47` | `0.74, 0.52, 0.98, 0.94, 0.76, 0.91` |
| Ponyo | Ponyo | `0.90, 0.67, 0.97, 0.94, 0.41, 0.82, 0.99, 0.43` | `0.38, 0.23, 0.85, 0.25, 0.18, 0.36` | `0.82, 0.96, 0.71, 0.93, 0.43, 0.93` |
| Lisa | Ponyo | `0.88, 0.79, 0.98, 0.81, 0.63, 0.90, 0.79, 0.96` | `0.87, 0.40, 0.78, 0.63, 0.56, 0.79` | `0.81, 0.66, 0.99, 0.93, 0.72, 0.92` |

## 8. Design limitations and versioning

- **No objective answer key.** A choice may reflect context, life stage, culture, a coping response, or self-perception rather than a stable personality dimension.
- **No automated interpretation of narrative context.** This differs substantially from the original conversational reading, where open-ended elaborations and personal meaning changed interpretation.
- **No formal trauma assessment.** “Stress/shadow” means broad self-reported patterns under pressure, not a diagnosis or identified trauma response.
- **Question 15 was not identical in the two interviews.** The public version uses the second, answerable-by-most-people version about withheld information. `QUESTIONS.md` includes the earlier version.
- **Character set is curated.** More characters, different editorial vectors, or different question weights will change the answers. No claims of representative or exhaustive classification are made.
- **The weights are design choices.** `0.65/0.35` role-fit blending, `0.55/0.20/0.25` definitive weighting, and Question 40’s `2` exposure units were chosen for an interpretable interactive experience; they have not been empirically fitted to data.
- **Reproducibility.** The repository makes every option signal, character reference vector, formula, and tie-break rule inspectable. If you change any, update the version and documentation.

