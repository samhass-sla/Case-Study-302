# Decision log

## Initial build

- Keep the experience as a single scroll-driven report, not a dashboard; use a sticky desktop route and place it above the chapters on narrower screens.
- Keep stage copy, cohort size, planning reference, stage delays, and pilot reduction in local typed data. Derive totals, lot-days, contribution ranking, and cumulative delay from those values.
- Use IntersectionObserver for chapter activation, with a scroll-position fallback and native fragment links for direct navigation.
- Treat the lot marker as representative only. Label aggregate figures, the fictional cohort, and the scenario assumption near the evidence.
- Use a custom semantic five-row comparison rather than a charting dependency; update its ranking when the modeled scenario changes.
- Recommend a 90-day pilot with a controlled baseline, four measures, proposed project owners, and a day-90 review before expansion.

## Visual direction update

- Recenter the visual story on a representative cartoon medicine carton moving through a looping route with five distinct facility illustrations; keep the cohort/representative-lot distinction explicit.
- Shift the report palette to royal purple with white, black, and slate support colors.
- As scroll changes the active chapter, move the parcel, trace the completed route, highlight the current wait node, and animate the active copy into view. Keep inactive chapter content readable and visible; disable motion under `prefers-reduced-motion`.
- When Regional Distributor is active, tint the parcel, route trace, facility, and chapter heading red and show an accessible warning triangle to distinguish the largest hold; clear the alert state at every other stage.

## Validation status

- `npm run build` passes with Vue type-checking enabled.
- Browser review at 375, 768, and 1,440 CSS-pixel widths found no page-level horizontal overflow; the route is sticky on desktop and stacks above the story on narrower screens.
- Chapter links update the active route in both directions. Keyboard activation of the scenario switch updates the total to 5.8 days, regional contribution to 0.4 days, remaining gap to 2.8 days, and re-ranks the largest remaining stage.
- Emulated reduced-motion mode reports `scroll-behavior: auto`; all report content remains in the document without requiring animation.
- A local development server is available. No public deployment target or reviewer access configuration was supplied.
