# QA Regression Checklist

Patch QA-1 is a stabilization/audit checklist. It does not change dashboard runtime behavior, add features, refactor `app.js`, or alter fixtures.

## 1. Browser/runtime smoke checks

Use this checklist after a GitHub Pages deploy or local static-server run:

1. Hard refresh the app (`Ctrl+F5` / `Cmd+Shift+R`) or append a cache-busting query string such as `?v=qa-1`.
2. Confirm the app loads without an `app.js` console error.
3. Confirm the BTC price appears after data load.
4. Confirm loading banners clear after data load.
5. Confirm Weekly context appears.
6. Confirm Market Zones populate.
7. Confirm Multi-Scenario Planning populates.
8. Confirm Export PDF button remains available.

## 2. Timeframe Context checks

Verify:

- Weekly tab opens.
- Daily tab opens.
- 4H tab opens.
- 1H tab opens.
- Card layout remains compact.
- There is no horizontal page scroll.

## 3. Weekly Structure checks

Verify when the corresponding patch is present on `main`:

- Weekly 1Y / 2Y selector appears.
- Weekly structure labels render when data exists.
- Weekly labels are limited and not crowded.
- Weekly RSI card renders.
- Weekly FVG / IFVG Context details expand.

## 4. Daily Structure checks

Verify when the corresponding patch is present on `main`:

- Daily Structure card renders.
- Structure Shift card renders.
- Against Weekly card renders.
- Daily structure labels render only on the Daily chart.
- Daily 3M / 6M / 1Y range changes update Daily labels.
- Daily Pattern / Channel output remains unchanged.
- Daily IFVG card remains unchanged.

## 5. IFVG/FVG Context checks

Verify when the corresponding patch is present on `main`:

- Standalone IFVG panel is hidden from the main visible dashboard flow.
- Weekly FVG / IFVG Context includes details.
- Daily IFVG card exists.
- 4H IFVG card exists.
- IFVG/FVG source arrays are not mutated by display rendering.

## 6. Multi-Scenario Planning checks

Verify:

- Tabbed scenario interface works.
- Only one scenario panel is visible by default.
- Primary Scenario opens first when available.
- Bullish/Bearish/Breakout/Breakdown/Wait tabs switch correctly.
- Scenario Score renders.
- Confirmation Status renders.
- Timeframe Confirmation Review renders when present.

## 7. Scenario TP ladder checks

Verify when Patch 8H is present on `main`:

- Bullish TP1 / TP2 / TP3 are ordered ascending.
- Bearish TP1 / TP2 / TP3 are ordered descending.
- Scenario zone is not reused as TP.
- Invalidation reference is not reused as TP.
- Missing TP renders unavailable / `—`.
- Scenario Score does not count invalid TP references as valid.

## 8. Market Zones / Market Map checks

Verify:

- Market Zones render normally.
- Market Preparation Map rows remain available.
- Market Map ranking/order is unchanged unless a targeted fixture confirms an expected change.
- Market Zones data is not mutated by scenario usage badges or card rendering.

## 9. Chart checks

Verify:

- Weekly chart renders.
- Daily chart renders when lower timeframe detail is opened.
- 4H chart renders.
- 1H chart renders.
- Weekly labels do not appear on Daily charts.
- Daily labels do not appear on Weekly/4H/1H charts.
- FVG/S/R overlays still render.
- Manual line / trendline controls remain present.

## 10. PDF/report checks

Verify:

- Export PDF button remains visible.
- PDF/report preview or export does not throw a runtime error.
- Report behavior remains unchanged unless a dedicated PDF patch is being tested.

## 11. Targeted fixture suites

Run the suites that exist on the current `main` branch and are relevant to the deployed patch set:

- `runScenarioTpLadderIntegrityFixtureTests()`
- `runScenarioScoreFixtureTests()`
- `runPrimaryScenarioSelectorFixtureTests()`
- `runScenarioConfirmationStatusFixtureTests()`
- `runMultiScenarioPlanningTabsFixtureTests()`
- `runMultiScenarioPlanningTabsNoImpactFixtureTests()`
- `runMarketMapCompactUiFixtureTests()`
- `runScenarioMarketMapUsageBadgeFixtureTests()`
- `runMarketZonesCardLayoutFixtureTests()`
- `runMarketZonesCardLayoutNoImpactFixtureTests()`
- `runDailyStructureDataContractAuditFixtureTests()`
- `runDailySwingClassificationFixtureTests()`
- `runDailyBosChochRefinementFixtureTests()`
- `runDailyValidationAgainstWeeklyRuntimeSafetyFixtureTests()`
- `runDailyValidationAgainstWeeklyFixtureTests()`
- `runDailyStructureChartLabelsFixtureTests()`
- `runWeeklySwingClassificationFixtureTests()`
- `runWeeklyStructureQualityFixtureTests()`
- `runWeeklyBosChochRefinementFixtureTests()`
- `runWeeklyStructureChartLabelsFixtureTests()`
- `runWeeklyStructureRangeSelectorFixtureTests()`
- `runWeeklyMajorStructureFixtureTests()`
- `runWeeklyStructureConflictCalibrationFixtureTests()`
- `runWeeklyRsiCardFixtureTests()`
- `runIfvgIntoTimeframeContextFixtureTests()`
- `runIfvgIntoTimeframeContextNoImpactFixtureTests()`
- `runWeeklyFvgContextDetailsFixtureTests()`
- `runWeeklyFvgContextDetailsNoImpactFixtureTests()`
- `runTimeframeContextCardGridFixtureTests()`
- `runTimeframeContextCardGridNoImpactFixtureTests()`
- `runTimeframeContextTabsFixtureTests()`
- `runH4ReactionContextFixtureTests()`
- `runH1TimingContextFixtureTests()`
- `runH4LiquiditySummaryFixtureTests()`
- `runChartLabelDensityFixtureTests()`
- `runChartLabelCollisionFixtureTests()`

If a fixture is not present on the latest `main`, do not reintroduce it during QA. Record it as unavailable for that baseline.

## 12. Validation commands

For QA stabilization patches, run:

```bash
node --check app.js
git diff --check
python3 -m json.tool version.json >/dev/null
git status --short
```

For docs-only QA checklist updates, `git diff --check` and `git status --short` are sufficient, but `node --check app.js` and `python3 -m json.tool version.json >/dev/null` may still be run to confirm runtime files remain parseable.

## 13. Known cache note

After GitHub Pages deploys, stale browser assets can make a fixed dashboard look broken. Always hard refresh or use a cache-busting query string before marking a regression as still present.
