# Codex Workflow Guard

This repository has a large `app.js` surface area, so every Codex task must stay narrow and start from a clean, current baseline. Use this guide before opening, updating, or resolving any Codex PR.

## 1. Start from latest main

- Every Codex task must start from the latest `main` branch.
- Do not reuse a previous conflicted PR branch.
- Do not reuse a stale Codex branch.
- If the local branch includes old unrelated commits, stop and recreate the branch from latest `main` before editing.

## 2. One patch = one PR

- Finish one patch before starting another.
- Merge or close the PR before beginning the next patch.
- Wait for deploy when a UI/runtime patch needs browser verification.
- Hard refresh the deployed app and verify the requested behavior before starting a follow-up patch.
- Do not bundle old Weekly, Daily, IFVG/FVG, chart-label, Market Map, or scenario work into a new patch.

## 3. Preflight before coding

Before editing, Codex must verify and report internally that:

- Expected previous patches are already present on `main`.
- Target functions, renderers, fixtures, and files exist on the current branch.
- Expected files to change are identified.
- Patch scope is clear and narrow.
- The branch does not include stale unrelated changes.
- The current diff is empty or only contains intentional changes for this patch.

## 4. Stop conditions

Codex must stop and report before editing if:

- The branch appears stale or conflicted.
- Previous completed patches are missing from `main`.
- The requested patch requires unrelated Weekly/Daily/IFVG/chart-label changes.
- Files changed exceed the expected scope.
- `style.css` or `index.html` need changes for a non-UI patch.
- The `app.js` diff becomes too broad for the requested patch.
- The PR title or description includes unrelated old patch groups.
- A conflict cannot be resolved while preserving only the requested patch.

## 5. File-scope rules

Examples:

- Scenario TP ladder patch should usually touch `app.js` only.
- Pure logic patch should not touch `style.css`.
- UI style patch may touch `style.css`, but must not alter engine logic.
- Chart-label patch may touch `app.js` and `style.css` only when the label renderer and scoped styles require it.
- Documentation patch should not touch runtime files.
- If the expected file list changes, stop and explain why before continuing.

## 6. Conflict handling

If a PR has merge conflicts:

- Do not force merge.
- Do not resolve complex conflicts in the GitHub web editor.
- Prefer closing the PR and recreating it from latest `main`.
- If resolving locally, latest `main` is the source of truth.
- Preserve only the requested patch changes.
- Discard stale repeated code from old patches.
- Re-run the patch-specific validation after conflict resolution.

## 7. Required Codex output

Every Codex result should include:

A. Summary of Changes  
B. Files Changed  
C. Scope Check  
D. Validation Commands and Results  
E. Regression Safety Confirmation  
F. Rollback Note  
G. Verdict

If a user provides a more specific output format, follow that format while still including scope, validation, regression, rollback, and verdict information.

## 8. Required validation

For code patches, run:

```bash
node --check app.js
git diff --check
python3 -m json.tool version.json >/dev/null
git status --short
```

Also run targeted fixtures relevant to the patch.

For docs-only patches, run:

```bash
git diff --check
git status --short
```

If a docs-only patch unexpectedly touches `app.js`, also run:

```bash
node --check app.js
python3 -m json.tool version.json >/dev/null
```

## 9. Browser check rules

After UI/runtime patches:

- Wait for the GitHub Pages deploy.
- Hard refresh with Ctrl+F5 / Cmd+Shift+R.
- Confirm `Last Updated` and visible behavior.
- Check browser console errors when possible.
- Verify unrelated tabs/cards/charts still render normally.

## 10. Safe prompt header

Use this prompt header for future scoped Codex tasks:

```text
Start from the latest main branch.
Do not reuse any previous conflicted branch or stale Codex branch.
Patch only [PATCH NAME].
Before coding, verify latest main already contains the completed previous patches.
If this task includes unrelated old Weekly/Daily/IFVG/chart-label changes, stop and report before editing.
Expected files changed: [FILES].
Do not touch [NON-SCOPE FILES/AREAS].
```

## 11. Scope examples

- Patch 8H / Scenario TP ladder integrity: `app.js` only, target ladder helpers and fixtures only.
- Documentation/workflow guard patch: docs only; no runtime files.
- Styling-only patch: scoped `style.css` only unless a class hook already does not exist.
- Engine patch: engine helpers and targeted fixtures only; no chart rendering unless explicitly requested.
- Chart rendering patch: renderer and scoped styles only; no scenario, score, Market Map, or data-fetch changes.
