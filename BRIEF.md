# P302 Castelzor Distribution Bottlenecks Interactive Data Story

## Project purpose

Build a scroll-driven, interactive report for a life-sciences supply chain specialist. The report follows Castelzor, a **fictional, ambient-storage prescription medicine**, from completed manufacturing through a manufacturer's outbound handoff, a wholesaler, a regional distributor, and a pharmacy. It shows where time accumulates, why it accumulates, what that means for pharmacy availability, and which intervention deserves a first pilot.

**The editorial conclusion:** Castelzor's largest single avoidable delay is not time spent traveling. It is the manual product-verification handoff at the regional distributor. A focused digital-verification pilot offers the clearest first test, while the rest of the journey still needs attention.

This is a fictional case study, not a description of a real medicine, company, data feed, compliance program, or regulatory requirement. All numerical data is invented and illustrative. Do not include any client- or employer-specific material or patient information. Do not claim that a particular technology guarantees product safety or satisfies a law.

## Audience and decision

**Primary reader:** A supply chain specialist responsible for diagnosing distribution friction and recommending operational improvements for Castelzor.

**Decision after reading:** Recommend whether to run a 90-day digital-verification pilot with the highest-volume regional distributor, with clear success measures and owners.

The reader should leave able to explain: where the delay occurs, how much it contributes to the end-to-end journey, what it puts at risk, and why this intervention should be tested first.

## One-sentence story and evidence model

For a fictional quarterly cohort of **1,000 lots**, the mean time from completed manufacturing to pharmacy availability is **6.8 days** against a **3.0-day planning reference**. The **3.8-day gap** is divided into five mutually exclusive, illustrative stage-level delay contributions. The regional distributor contributes the largest share at **1.4 days per lot on average** (about 37% of the gap).

The moving lot in the artwork is a **representative visual guide**, not an actual tracked lot. Metrics alongside it describe the aggregate cohort. Never imply that every individual lot experiences every average delay or that all stage impacts are additive for a particular lot. The five cohort-average stage contributions add to the cohort-average 3.8-day gap by construction.

## Story structure and data

| Chapter / stage | Bottleneck and evidence to reveal | Why it matters | Potential intervention |
| --- | --- | --- | --- |
| Opening: the journey | 6.8 mean days actual vs. 3.0 planning reference; 3.8-day gap across 1,000 lots | Establish the decision and time scale before showing a chart | Invite reader to follow the representative lot |
| 1. Manufacturing release | Quality-release documents are reconciled across disconnected systems; **+0.7 days per lot on average** | Product that is ready to ship waits for authorization; approximately **700 incremental lot-days** across the cohort | Shared digital release checklist, status visibility, and exception ownership |
| 2. Manufacturer outbound | Manual handoff scans and transport appointment coordination cause missed planned dispatch windows; **+0.4 days** | Dispatch variability makes downstream arrival times harder to plan; **400 incremental lot-days** | Electronic handoff events and appointment coordination |
| 3. Wholesaler | Allocation confirmation follows incoming orders instead of reflecting timely available inventory; **+0.8 days** | Lots wait to be assigned and onward inventory becomes harder to forecast; **800 incremental lot-days** | Shared allocation status and electronic order/availability updates |
| 4. Regional distributor | Some lots need manual record lookup and verification before onward movement; **+1.4 days** | Largest single contribution: **1,400 incremental lot-days**; onward movement and pharmacy replenishment wait on exception resolution | Pilot electronic product-verification records and a routed exception queue |
| 5. Pharmacy receiving | Limited advance visibility of arriving lots slows receiving reconciliation and stocking; **+0.5 days** | Product may have arrived but not yet be available for dispensing; **500 incremental lot-days** | Advance shipment notices and receiving-ready alerts |
| Closing: act | Total **3.8 incremental days** = 0.7 + 0.4 + 0.8 + 1.4 + 0.5 | Rank a realistic first action, acknowledge remaining bottlenecks | Test distributor-verification pilot with a baseline, owners, and decision threshold |

### Definitions and arithmetic

- **Start / end:** Clock starts when manufacturing is completed and stops when the pharmacy marks product available for dispensing. Product availability is an operational status; do not claim observed patient outcomes.
- **3.0-day planning reference:** A simplified, fictional end-to-end benchmark, not a contractual SLA or a validated best-case travel time.
- **Delay contribution:** Extra cohort-average time attributed to a stage above its planned time, using one mutually exclusive assignment for each delay event. `0.7 + 0.4 + 0.8 + 1.4 + 0.5 = 3.8` days.
- **Lot-days:** Lots multiplied by incremental mean delay days. This is an exposure/flow measure, **not** dollars saved, medication waste, or guaranteed new sales.
- **Business case:** Approximately 37% of the avoidable time gap sits in distributor verification (`1.4 / 3.8`). If a pilot removed an *assumed* 1.0 day of that 1.4-day contribution on average, modeled end-to-end time would fall from 6.8 to **5.8 days**, leaving a **2.8-day gap**. This is a scenario, not an observed effect or promise.
- **Optional detail if implemented:** 52% of lots encountered a manual verification exception and those affected experienced about 2.7 extra days on average; `0.52 × 2.7 ≈ 1.4` days averaged across all lots. Do not display this statistic unless the explanation and denominator are clear.

## Scroll experience

Design a single-page report, not an analytics dashboard. A sticky illustration of the supply chain acts as the grounding element; the representative Castelzor lot advances as the reader moves through the chapters. On smaller screens, the journey can sit above the current chapter rather than forcing an unusable sticky two-column layout.

1. **Lead with the answer.** Headline: “Castelzor reaches pharmacies 3.8 days later than planned.” Deck: “The biggest single hold is a verification handoff, not a truck in transit.” Mark data as fictional/illustrative near the opening.
2. **Orient the reader.** Introduce five distinct steps with short labels and the 3.0 vs. 6.8 day comparison. Define what “available at pharmacy” means.
3. **Reveal each bottleneck.** As a chapter becomes active, advance the representative lot to that step, pause it, highlight the stage's +days, add that contribution to an on-screen cumulative tally, and reveal an insight, implication, and possible fix.
4. **Show the cumulative pattern.** Compare the five contributions in one compact graphic. Clearly identify the regional distributor as the largest single contributor, without implying all other steps are negligible.
5. **Test an intervention.** A current-state / pilot-scenario toggle changes the modeled total from 6.8 to 5.8 days and distributor contribution from 1.4 to 0.4. Label the change “illustrative modeled scenario”; keep the other stage values unchanged.
6. **Close with a decision.** Recommend a 90-day pilot with one distributor. List measures, owners, and a review checkpoint. Offer “Back to top” or chapter navigation so the reader can revisit evidence.

### Suggested conclusion and pilot

**Recommendation:** Pilot an electronic verification workflow and exception queue with one high-volume regional distributor for 90 days. Include a controlled baseline and compare mean verification time per lot, share of lots requiring manual records, end-to-end availability time, and exception-resolution time. Assign a supply-chain owner and a distributor operations partner; decide whether to expand only after reviewing the measured results and implementation effort. These are proposed project roles, not named people.

## Interaction and accessibility requirements

- Scroll activates chapters and updates the route illustration, highlighted node, stage contribution, and cumulative delay. It must work when scrolling both forward and backward and on direct chapter navigation.
- The current-state / pilot-scenario control changes the displayed numbers, explanatory text, and visual state together. It must be keyboard operable and announce its state accessibly.
- Give readers visible chapter links or a progress indicator, descriptive headings, chart labels, and sufficient contrast. Do not communicate delay by color or motion alone.
- Respect `prefers-reduced-motion`; reveal all content without relying on animation. The full story must remain readable when JavaScript-driven scroll effects do not trigger or the reader skips chapters.
- On mobile, avoid clipped labels, sideways scrolling, and sticky overlays that cover text. Check approximately 375 px, 768 px, and 1440 px widths.
- Include a small data/methodology note and fictional-data disclosure; do not present synthetic numbers as validated industry research.
- Provide an obvious fallback for any unsupported scroll behavior and a gracefully handled empty/missing data state if the data model permits one.

## Visual direction

Make this feel like a decision-oriented life-sciences report: precise typography, restrained color, clear chain-of-custody-inspired wayfinding, and compact annotations. The lot and route should remain the recurring visual anchor. Distinguish **physical movement** from **waiting for confirmation** through line style, labels, or state rather than color alone. Use “pause” or “hold” states that help explain the delay without suggesting every lot physically stops in the same place. Avoid a generic BI dashboard, dense gauge cards, decorative laboratory imagery, or animation with no explanatory purpose.

## Vue application setup

Build this as a **Vue 3 + TypeScript + Vite** single-page web app. Use Vue Single File Components with the Composition API and `<script setup lang="ts">`. Local typed data is sufficient; no backend, API, authentication, or true shipment-tracking integration is required.

In the VS Code terminal, from the parent directory where you want the new repository:

```bash
npm create vite@latest castelzor-story -- --template vue-ts
cd castelzor-story
npm install
npm run dev
```

Use an up-to-date Node.js release supported by the installed Vue/Vite toolchain; verify `node --version` and follow any scaffold warning. Install the **Vue - Official** VS Code extension. Copy this file into the new project's root as `BRIEF.md` before implementation. Run `npm run build` before deployment. The official setup references are [Vue Quick Start](https://vuejs.org/guide/quick-start.html) and [Vite Getting Started](https://vite.dev/guide/).

### Suggested file organization

```text
castelzor-story/
├── BRIEF.md
├── README.md
├── LICENSE
├── docs/
│   ├── context.md
│   ├── data-method.md
│   └── decisions.md
├── src/
│   ├── components/
│   │   ├── SupplyChainJourney.vue
│   │   ├── StoryChapter.vue
│   │   ├── DelayStack.vue
│   │   ├── ScenarioToggle.vue
│   │   └── MethodologyNote.vue
│   ├── composables/
│   │   └── useActiveChapter.ts
│   ├── data/
│   │   └── storyData.ts
│   ├── types/
│   │   └── story.ts
│   ├── App.vue
│   ├── main.ts
│   └── style.css
└── package.json
```

### Technical approach

- Keep all narrative copy, stage durations, intervention labels, and scenario values in typed data so charts, annotations, and totals cannot drift apart.
- Use a Vue composable with `IntersectionObserver` to track the active chapter and update a reactive `activeChapter`; supply a sensible default if observation is unavailable.
- Build the route as accessible HTML/CSS or an inline SVG, with a readable text equivalent. CSS transitions are enough; no heavy animation framework is required.
- Use semantic sections and buttons, real text labels, `aria-current` for chapter navigation where appropriate, and `prefers-reduced-motion` for transitions.
- Derive the cumulative tally and scenario totals from stage data, rather than hardcoding the same number in multiple components.
- Optional small chart libraries are fine, but a custom semantic comparison is preferable to an oversized visualization dependency for a five-value story.

## Implementation plan and repository evidence

1. Commit the brief, README, LICENSE, context, data-method note, and an initial `docs/decisions.md` before building the finished experience.
2. Implement the complete static story and all five chapters, with the conclusion understandable even without animation.
3. Add scroll-linked route transitions and chapter navigation; verify reverse scrolling and direct jumping.
4. Add the scenario toggle and test the 6.8 → 5.8 calculation and all stage labels.
5. Refine responsive and reduced-motion behavior, keyboard interaction, methodology note, and empty/fallback states.
6. Run the production build, deploy, test the public or reviewer-accessible URL, and update the README with access instructions and final screenshots if helpful.

Maintain organized AI scaffolding (the brief and context documents, plus any coding-assistant instructions you actually use) and update decisions across work sessions. Make descriptive commits such as `define fictional cohort and stage metrics`, `build scroll-linked lot journey`, `add distributor pilot comparison`, and `verify mobile and reduced-motion flow`. Do not manufacture commit history retrospectively.

## Review acceptance checklist

### Does it work?

- [ ] The deployed site is reachable with any reviewer access instructions supplied; password protection is recommended if appropriate.
- [ ] A first-time reader can follow the representative lot through all five distinct steps and reach the recommendation.
- [ ] Scroll forward/backward and chapter links keep active step, metrics, and content synchronized.
- [ ] The pilot toggle updates the total, distributor delay, and narrative without inconsistent numbers.
- [ ] The story works at desktop, tablet, and phone sizes; reduced-motion and keyboard paths remain usable.

### Is the repo set up right?

- [ ] Root `BRIEF.md`, meaningful `README.md`, and `LICENSE` are present.
- [ ] AI-readable context, method, and decision documents are organized and match the final build.
- [ ] File structure is navigable, and meaningful commits show real progress over time.

### Does it look right and show thinking?

- [ ] Life-sciences distribution context, lot movement, verification friction, and pharmacy availability are legible without generic-dashboard tropes.
- [ ] The opening communicates a specific finding, the middle supplies evidence, and the close presents a justified action.
- [ ] The BRIEF reads like a plan made before construction; design decisions in this brief are visible in the deployed experience.
- [ ] Fictional data, reference period, denominators, scenario assumptions, and limitations are labeled clearly.

## Boundaries

Do not imply real Castelzor products, validated pharmaceutical performance benchmarks, real-world drug serialization requirements, patient outcomes, cost savings, or guaranteed benefits. If the narrative changes materially during building, update `BRIEF.md` and the decision log so the submitted plan still matches the implemented experience.
