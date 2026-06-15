---
name: roojs-coding-standards
description: >-
  Enforces Roo.js JavaScript coding standards for this project. Use when
  implementing, editing, or reviewing Roo.js code, Roo.bootstrap components,
  Roo.extend classes, XComponent modules, or any JavaScript in this repository.
---

# Roo.js Coding Standards

**Mandatory** for all Roo.js implementation work in this repository.

## Before writing or changing code

1. **Read** [docs/coding-standards.md](../../../docs/coding-standards.md) — canonical, full standards.
2. **If building or changing components**, also read [docs/building-components.md](../../../docs/building-components.md).
3. **Match surrounding code** in the file you are editing; when in doubt, follow the docs above.

Do not rely on general JavaScript style or other projects' conventions. This project's Roo.js rules override them.

## Critical rules (never violate)

These are called out in the doc as **CRITICAL** or **FORBIDDEN**:

| Rule | Requirement |
|------|-------------|
| Underscore prefix | No new `_name` variables or properties (except established framework names like `_tree`, `_strings`) |
| Shared mutable defaults | Never `[]` or `{}` on the `Roo.extend` prototype — use `false` and lazy init |
| String building in loops | No `s += "x"` in loops — use `Array(n).join` or array + `join` |
| Character looping | No char-by-char string loops — use `indexOf`, `split`, `replace`, regex |
| Template literals | Use `+` concatenation unless the user explicitly asks for backticks |
| Unset values | Use `false`, not `null`, for optional Roo state |

## High-priority patterns

Apply these on every change (details and examples in the doc):

- **JSDoc:** Multiline `/** ... */` with `@class`, `@cfg`, `@param`, `@return`, `@event` as appropriate — not one-liners for behaviour.
- **Braces:** Constructor `function(config) {` same line; prototype methods in `Roo.extend` put `{` on the next line; control structures `if (x) {` same line, never one-line `if`.
- **`this.`:** Always prefix instance properties and methods inside component methods.
- **Temp variables:** Inline single-use and trivial aliases; alias only 4+ step chains.
- **Nesting:** Early return / `continue`; flat loop bodies; prefer `switch` over long `if/else if` chains.
- **Defaults:** Scalar defaults on prototype in `Roo.extend`; per-instance collections in constructor or lazy init.
- **Methods:** Prefer extending `onRender`, `getAutoCreate`, etc.; no new helpers unless the task requires them.
- **Debug:** `Roo.debug && Roo.log(...)` — no class/method names or timestamps in messages.
- **Structure:** `Roo.namespace` → constructor → `Roo.extend` → lifecycle overrides only when needed.

## Terminology

- **Element** — thin DOM wrapper (`Roo.Element`, `Roo.bootstrap.Element`).
- **Component** — widget extending `Roo.Component` / `Roo.bootstrap.Component`.

## Verification checklist

Before finishing a Roo.js change:

- [ ] Read relevant sections of `docs/coding-standards.md` for the areas touched
- [ ] No new underscore-prefixed names
- [ ] No `[]`/`{}` prototype defaults; `false` for unset optional state
- [ ] Brace style matches Roo.extend vs constructor rules
- [ ] JSDoc updated for new/changed public API
- [ ] No template literals unless requested
- [ ] Minimal scope — no extra helpers or unrelated refactors

## Additional resources

- [docs/coding-standards.md](../../../docs/coding-standards.md) — full standards with good/bad examples
- [docs/building-components.md](../../../docs/building-components.md) — component hierarchy, skeleton, lifecycle
