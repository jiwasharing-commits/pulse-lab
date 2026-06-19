# App.js Modularization Plan

Patch R1 is a documentation-only audit. It does not split `app.js`, move functions, change script tags, introduce imports/exports, or alter dashboard runtime behavior.

## 1. Current `app.js` responsibility map

`app.js` currently acts as both application bootstrap and feature container. Major responsibility areas include:

- **App bootstrap / global state**: DOM element cache, chart globals, market preparation state, layer state, active timeframe/range state, and startup calls.
- **Data fetching**: Binance ticker/candle requests, Fear & Greed request, lower-timeframe kline requests, error handling, and refresh orchestration.
- **Candle mapping / utilities**: kline-to-candle conversion, formatting helpers, number/date utilities, HTML escaping, range/preset helpers, and shared label utilities.
- **Weekly Structure Engine**: weekly swing detection, HH/HL/LH/LL/EH/EL classification, BOS/CHOCH interpretation, range/confidence output, and weekly structure labels.
- **Daily Structure Engine**: daily structure contract, closed-candle range handling, swing classification, structure shift, validation against weekly, and daily label data.
- **FVG / IFVG logic**: FVG scans, filled/partial/broken state, IFVG memory/context, multi-timeframe overlap, and FVG detail formatting.
- **Support / Resistance logic**: weekly/daily/4H support/resistance scanning, nearest/strongest levels, and S/R overlays.
- **Market Preparation Map**: map row generation, confluence scoring, row ordering, compact map rendering, and scenario usage badges.
- **Market Zones**: upside/downside/current zone cards, compact zone rendering, and no-impact fixtures.
- **Multi-Scenario Planning**: scenario snapshot building, TP ladder references, invalidation references, confirmation status, scenario score, primary scenario selection, and scenario card rendering.
- **Timeframe Context UI**: Weekly/Daily/4H/1H context cards, tabs, compact grids, details sections, and no-impact fixtures.
- **Weekly/Daily/4H/1H chart rendering**: Lightweight Charts setup, range selection, chart resize, data application, and lower-timeframe chart lifecycle.
- **Chart labels / overlays**: FVG overlays, S/R overlays, structure labels, trendlines/manual lines, density/collision helpers, and overlay redraw scheduling.
- **PDF/report export**: report data gathering, preview, export controls, and report-specific DOM rendering.
- **Fixtures / test helpers**: browser-exposed `run*FixtureTests()` helpers and no-impact/audit fixtures for each feature area.

## 2. Conflict-risk areas

High-conflict areas are sections that many patches touch or that connect multiple domains:

- **Scenario Planning / TP ladder**: depends on Market Map rows, current price, scenario score, confirmation status, primary selection, and UI rendering.
- **Weekly/Daily Structure Engine**: broad helper chains and fixture suites; often touches swing logic, chart labels, and Timeframe Context cards.
- **FVG/IFVG context**: shared by Weekly, Daily, 4H, Market Map, Timeframe Context, and scenario context.
- **Chart overlays / labels**: depends on chart lifecycle, DOM layers, resize/range callbacks, density helpers, and CSS.
- **Timeframe Context UI**: central card-grid renderer touched by Weekly/Daily/4H/1H feature patches.
- **Market Map / Market Zones**: shared data and UI source for scenarios, zone cards, badges, and fixtures.

## 3. Proposed future module boundaries

These are proposed boundaries only; no split is implemented by Patch R1.

| Proposed module | Owns | Reads | Must not own | Likely dependencies | Risk | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| `app.js` | Bootstrap, top-level orchestration, initial render calls | All module public APIs | Feature internals | State, data fetching, render modules | High | 8 |
| `modules/state.js` | Shared state shape, update helpers, default state factories | None or utilities only | Feature-specific algorithms | Utils | High | 8 |
| `modules/utils.js` | Pure formatting, numeric, date, HTML, range, array helpers | None | DOM, charts, app state | None | Low | 1 |
| `modules/data-fetching.js` | API URLs, fetch wrappers, kline/ticker/Fear & Greed loading | Utils | Rendering, scenario logic | Utils | Medium | 8 |
| `modules/weekly-structure-engine.js` | Weekly swing/structure/BOS/CHOCH logic and contract helpers | Utils, candles | Chart DOM, UI cards, scenario score | Utils | High | 4 |
| `modules/daily-structure-engine.js` | Daily swing/structure/shift/validation contract helpers | Utils, weekly context type | Chart DOM, scenario selection | Utils, weekly structure contract | High | 4 |
| `modules/fvg-ifvg-engine.js` | FVG/IFVG scans, memory, overlap/context builders | Utils, candle arrays | Market Map rendering, chart DOM | Utils, S/R types | High | 5 |
| `modules/support-resistance-engine.js` | S/R scans and nearest/strongest summaries | Utils, candles | Chart overlay DOM | Utils | Medium | 5 |
| `modules/market-map-engine.js` | Market map row generation, confluence scoring, ordering | FVG/IFVG, S/R, structure summaries | Scenario rendering, chart labels | Utils, engines | High | 7 |
| `modules/market-zones-ui.js` | Market zone card rendering and zone layout helpers | Market map rows, scenario usage index | Row generation/ranking | Utils, market map data | Medium | 7 |
| `modules/scenario-planning-engine.js` | Scenario snapshots, TP ladders, invalidation, confirmation, score, primary selection | Market map rows, IFVG context, current price | Market Map ranking, UI tabs | Utils, market map data | High | 6 |
| `modules/timeframe-context-ui.js` | Timeframe Context cards, tabs, compact grids, details HTML | Structure/FVG/SR summaries | Engines, fetches, chart DOM | Utils, engine outputs | Medium | 6 |
| `modules/chart-overlays.js` | FVG/S/R/trendline/manual overlay lifecycle and redraw scheduling | Chart instances, levels/zones | Engine calculations | Utils, chart APIs | High | 3 |
| `modules/chart-labels.js` | Label data formatting, density/collision, structure label renderers | Structure label data, chart APIs | Swing classification | Utils, chart APIs | Medium | 3 |
| `modules/pdf-report.js` | Report data collection, preview, export DOM | App state snapshots | Core feature logic | Utils, state snapshots | High | 8 |
| `modules/fixtures.js` | Browser-exposed fixture registration and shared fixture utilities | Public module APIs | Production runtime execution | All module public APIs | Medium | 2 |

## 4. Dependency map notes

- **State should be split late**, because many features currently read/write shared globals and the migration risk is high.
- **Utilities should be split first**, because pure helpers have the lowest runtime coupling.
- **Fixtures can move early** if they remain browser-exposed under the same `window.run*` names.
- **Chart overlays and labels should be separated from engine logic** so future visual patches do not conflict with structure/FVG algorithm patches.
- **Scenario planning should move after Market Map and fixture boundaries are stable**, because it reads Market Map rows and affects score/confirmation/primary selection.
- **PDF/report should move late**, because it may read broad app state and DOM output from multiple features.

## 5. Safe split order

Recommended incremental sequence:

1. **Phase 0 — docs/audit only**: keep runtime unchanged. Patch R1 belongs here.
2. **Phase 1 — pure utility extraction**: move only stateless helpers with no DOM, no chart, no state mutation, and no fixture behavior changes.
3. **Phase 2 — fixture/test helper extraction**: preserve all `window.run*FixtureTests` names and run the moved fixture suites.
4. **Phase 3 — chart label/overlay extraction**: move overlay/label helpers after utilities are stable; keep chart lifecycle calls in `app.js` initially.
5. **Phase 4 — Weekly/Daily structure engine extraction**: move engine helpers without UI renderers; keep contracts stable.
6. **Phase 5 — FVG/IFVG extraction**: move scan/context builders without changing Market Map or Timeframe Context behavior.
7. **Phase 6 — scenario planning extraction**: move scenario snapshot/TP ladder/score/confirmation/primary helpers after Market Map outputs are stable.
8. **Phase 7 — Market Map / Market Zones extraction**: split data generation before UI rendering; keep row order fixtures unchanged.
9. **Phase 8 — final `app.js` bootstrap cleanup**: leave `app.js` as orchestrator only after feature modules and state boundaries are stable.

## 6. Rules for future split patches

- One module split per PR.
- No behavior change during a split.
- Do not combine refactor work with feature work.
- Keep function names stable where possible.
- Keep `window` exports stable for fixtures and browser-console validation.
- Preserve existing script loading behavior until a dedicated module-loading patch is approved.
- Run existing fixture suites relevant to the moved code.
- Browser check after each UI/runtime split.
- Rollback must be simple: reverting one split PR should restore the previous file layout.
- If the diff expands beyond the intended module, stop and report before continuing.

## 7. GitHub Pages compatibility notes

Patch R1 does not implement script or module loading changes. Future options:

### Option A — multiple plain scripts

- Keep simple script tags with predictable load order if the current setup supports it.
- Lowest conceptual complexity for GitHub Pages.
- Requires careful global/export ordering.

### Option B — `type="module"` migration

- Use ES modules only after a dedicated audit and browser compatibility check.
- Requires import/export changes and may affect globals/fixtures.
- Should not be combined with feature work.

### Option C — `app.js` orchestrator with window-attached modules

- Keep `app.js` as the bootstrap/orchestrator.
- Attach module APIs to `window.PulseLab*` namespaces where needed.
- Useful intermediate step before full ES module migration.

Recommendation: start with Option A or C for early splits, then consider Option B only after all fixture and deployment constraints are understood.

## 8. Fixture impact checklist

Future split patches should run fixture groups related to the moved code, including:

- Weekly structure fixtures.
- Daily structure fixtures.
- FVG/IFVG fixtures.
- Scenario fixtures.
- Market Map fixtures.
- Market Zones fixtures.
- Chart label fixtures.
- Timeframe Context fixtures.
- No-impact fixtures for source data mutation and rendering stability.

## 9. High-risk warnings

Do not split these early unless the patch is dedicated and heavily validated:

- Scenario planning + score + confirmation + primary selection.
- Market Map ranking/order.
- Shared global state and update helpers.
- Chart creation/render lifecycle.
- PDF/report export.
- Any area that requires simultaneous changes to engine logic, UI rendering, and fixtures.

## 10. Recommended next refactor patch

Recommended next step after R1, only after review and browser check:

**Patch R2 — Extract Pure Utility Helpers Audit**

Alternative if the team is ready for code movement:

**Patch R2 — Extract Pure Utility Helpers**

R2 should be optional, one-module only, and must not move engine, scenario, Market Map, chart, or PDF/report logic.
