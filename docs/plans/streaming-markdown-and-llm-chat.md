# Plan: Streaming Markdown Widget and LLM Chat Client

**Status:** proposed  
**Created:** 2026-06-12

ℹ️ **`docs/guide-to-writing-plans.md`** checklist applies.

**🔷** Implementation **must** follow **`docs/coding-standards.md`** and **`docs/building-components.md`** — see **Coding standards (mandatory)** below.

## Purpose

- **🔷** Phase 1 — streaming markdown display widget `Roo.bootstrap.panel.StreamBox` (not an editor)
- **🔷** Widget in **`Roo.bootstrap.panel`** — embeddable in layout regions like other panel children
- **🔷** Incremental parser as **`Roo.MarkdownParser`** — `Roo/MarkdownParser.js` sibling to `Roo/Markdown.js`; logic copied from [streaming-markdown](https://github.com/thetarnav/streaming-markdown) (like `marked` in that file)
- **🔷** Phase 2 — streaming LLM client under **`Roo.ai`** — logic copied from [ko-ai](https://github.com/developit/ko-ai) into our own classes
- **🔷** Build: `Roo.MarkdownParser` + `Roo.ai` → **`dependancy_core.txt`** (roojs-core)
- **🔷** Build: `Roo.bootstrap.panel.StreamBox` → **`dependancy_bootstrap.txt`** (roojs-bootstrap)
- **🔷** No code-block syntax highlighting
- **🔷** No chat panel widget — StreamBox only
- **ℹ️** Legacy `Roo.Markdown.toHtml()` in `Roo/Markdown.js` stays unchanged
- **ℹ️** `Roo/form/Action/Sse.js` reviewed — not reused as-is; see **SSE transport**

---

## Phase 1 — streaming markdown

- **🔷** Read-only component — distinct from `Roo.bootstrap.form.Markdown`
- **🔷** `xtype: 'StreamBox'`, `xns: Roo.bootstrap.panel`
- **🔷** Extends `Roo.bootstrap.Component`
- **🔷** Incremental DOM render via `Roo.MarkdownParser`
- **🔷** `streaming: false` falls back to `Roo.Markdown.toHtml()`

---

## Phase 2 — LLM client

- **🔷** OpenAI-compatible streaming + tool `call` handlers in JS
- **🔷** `Roo.ai.Client` extends `Roo.util.Observable`
- **🔷** Wire to StreamBox: `text` → `append`; `complete` → `end`
- **ℹ️** Prefer backend proxy for API keys (application concern)

---

## SSE transport (`Roo.form.Action.Sse`)

ℹ️ `Roo/form/Action/Sse.js` — fetch + ReadableStream + `event:`/`data:` parsing. Used by form submit SSE path.

- **🚫** Not reusable as-is for LLM (FormData POST, fixed event types, MessageBox coupling)
- **🚫** Do not modify `Sse.js` or `Submit.js` in this plan
- **🔷** `Roo.ai.Client` owns its own HTTP/stream logic (copied from ko-ai), not `Roo.form.Action.Sse`

---

## Files to create

### Core (`dependancy_core.txt`)

- `Roo/MarkdownParser.js` — `Roo.MarkdownParser` + copied streaming-markdown internals (IIFE in same file, like `Roo.Markdown.marked`)
- `Roo/ai/namespace.js`
- `Roo/ai/Client.js` — `Roo.ai.Client` + copied ko-ai internals

ℹ️ `Roo/Markdown.js` unchanged (`toHtml`, `marked`). `Roo/MarkdownParser.js` is a sibling in `Roo/`.

### Bootstrap (`dependancy_bootstrap.txt`)

- `Roo/bootstrap/panel/StreamBox.js`

ℹ️ Uses existing `Roo/bootstrap/panel/namespace.js`.

ℹ️ **💩** `⏳` Add `StreamBox` to `@children` on `Roo.bootstrap.layout.Border` (docblock only).

### Not in scope

- **🚫** Edits to `Roo/Markdown.js`, `Roo.bootstrap.form.Markdown`, `Roo/form/Action/Sse.js`
- **🚫** Chat panel, syntax highlighting, separate `roojs-ai.js` bundle
- **🚫** Standalone third-party files (`smd.js`, `ko-ai.js`) — code lives inside our classes

---

## Coding standards (mandatory)

Implementation of these classes must follow **`docs/coding-standards.md`**. Key rules for this work:

- **🚫 No underscore-prefixed names** — no `this._parser`, `this._session`, etc. Use plain names (`parser`, `session`, …) or keep state in closures / IIFE like `Roo/Markdown.js`
- **🚫 No over-guarding** — no “just in case” null checks on values our own API establishes after `onRender` or `send`. Guard only real boundaries (e.g. optional config, before render)
- **`false` not `null`** — unset optional state uses `false` (`parser : false`, `tools : false`, `el : false`)
- **🚫 No `[]` or `{}` on prototype** — array/object defaults via `false` + lazy init in constructor or first use
- **Prototype defaults** — scalars on `Roo.extend` prototype; constructor only for `superclass.constructor`, `addEvents`, and per-instance collections if needed
- **🚫 No extra helper methods** — logic in `write` / `append` / `send` / `onRender` unless explicitly added later; no private `_foo` helpers
- **`Roo.extend` only** — no `Class.prototype = { … }`
- **Early returns** — flat control flow; no nested `else` chains; `switch` for mode/region-style branching
- **No template literals** — string `+` concatenation
- **Copied third-party code** — IIFE in same file as the class (inside `MarkdownParser.js`), same pattern as `Roo.Markdown.marked` in `Markdown.js`

---

## Concrete code proposals

⏳ Pseudo-markup — one line per member, no bodies, no JSDoc. Real code follows **`docs/coding-standards.md`** at implementation.

### `Roo/MarkdownParser.js`

```
// IIFE in same file (copied streaming-markdown, like Roo.Markdown.marked in Markdown.js)

Roo.MarkdownParser
  extends Roo.util.Observable
  constructor(container)          // Roo.Element | HTMLElement

  write(chunk)
  end()
  reset()
```

### `Roo/bootstrap/panel/StreamBox.js`

```
// xtype StreamBox, xns Roo.bootstrap.panel

Roo.bootstrap.panel.StreamBox
  extends Roo.bootstrap.Component

  // @cfg content, streaming, region
  content: ''
  streaming: true
  region: 'center'
  parser: false                    // set in onRender when streaming

  getAutoCreate()
  onRender(ct, position)
  append(chunk)
  end()
  reset()
  setContent(text)

  // events
  chunk(this, chunk)
  complete(this)
```

### `Roo/ai/namespace.js`

```
Roo.ai = {}
```

### `Roo/ai/Client.js`

```
// copied ko-ai logic in same file (IIFE or inline)

Roo.ai.Client
  extends Roo.util.Observable

  // @cfg apiKey, baseURL, model, instructions, mode, tools
  apiKey: ''
  baseURL: 'https://api.openai.com/v1'
  model: ''
  instructions: ''
  mode: 'responses'
  tools: false

  send(input)
  abort()

  // events
  text(this, chunk)
  toolcall(this, id, name, args)
  toolresult(this, id, name, result)
  complete(this)
  error(this, err)
```

### Tool definition (each `tools[]` entry)

```
type: 'function'
name: string
description: string
parameters: object          // JSON Schema
call(args): *
```

### Integration

```
StreamBox({ streaming: true })
Client({ apiKey, model, tools })
on text → box.append(chunk)
on complete → box.end()
send(input)
```

---

## References

- `Roo/Markdown.js` — precedent for copying third-party parser into a Roo class
- `Roo/form/Action/Sse.js` — existing SSE helper (form only)
- `docs/building-components.md`
- `docs/coding-standards.md`
