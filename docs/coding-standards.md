# Coding Standards

Canonical JavaScript style and patterns for Roo.js and related codebases. Written for **AI agents** — **mandatory** for agents implementing or changing Roo.js code. Human contributors may treat this as a helpful guide.

Adapted from the OLLM Chat project standards; Vala-specific rules have been replaced with Roo.js equivalents.

## Terminology

- **Element** — a thin wrapper around a single DOM node (`Roo.Element`, or `Roo.bootstrap.Element`). Use for simple markup, not rich UI.
- **Component** — a widget class extending `Roo.Component` / `Roo.bootstrap.Component`. Components manage lifecycle, events, and may contain many DOM nodes and child components. See **`docs/building-components.md`**.

## Docblocks / JSDoc

**IMPORTANT:** Documentation comments for classes, methods, config options, and events must use **multiline** JSDoc form. Do not use one-line docblocks when documenting behaviour, parameters, or return values.

- Use full `/** ... */` blocks with a summary line, optional body, and standard tags: `@class`, `@extends`, `@cfg`, `@param`, `@return`, `@event`, `@children`.
- For classes: include purpose, main roles, and `@see` when referring to related types.
- For config: list every `@cfg` the builder or caller may set.
- For components that accept children, include `@children Roo.bootstrap.Component` (or the appropriate child type).

**Bad (one-liner):**
```javascript
/** Render the card body. */
onRender : function(ct, position) { ... }
```

**Good (multiline with tags):**
```javascript
/**
 * Fetch the element that child components are appended to.
 * Override when the DOM structure has an inner container
 * (e.g. `.panel-body`, `.toast-holder`).
 *
 * @return {Roo.Element|false} container element, or false if not rendered
 */
getChildContainer : function()
{
    return this.el;
}
```

Reserve single-line `/** ... */` only for trivial, self-explanatory cases.

**Line length in docblocks:** Break long summary or body lines so they stay readable (see Line Length below).

## String building

**IMPORTANT:** Prefer normal string concatenation with `+` for short joins. Do not use template literals (backticks) unless explicitly asked.

**Exception:** Multi-line usage/help strings may use concatenation across lines for readability.

**Bad:**
```javascript
var message = `Error: component '${name}' not found`;
```

**Good:**
```javascript
var message = "Error: component '" + name + "' not found";
```

## Temporary variables

**IMPORTANT:** Avoid single-use temporary variables. If a variable is only used once, inline it directly.

**IMPORTANT:** Avoid temporary variables that are just pointers to object properties. Access the property directly instead.

**IMPORTANT:** Trivial aliases are forbidden. A variable that is only an alias for a single property or method result (e.g. `var path = file.path`) must never be used — inline the expression at each use site instead.

**EXCEPTION:** The only allowed aliases are for long chains (4+ steps). Aliasing is permitted only when the expression is a long property/method chain such as `this.el.dom.parentNode.childNodes[0]`.

**Bad:**
```javascript
var width = this.el.getWidth();
if (width <= 1) {
    return;
}
```

**Good:**
```javascript
if (this.el.getWidth() <= 1) {
    return;
}
```

**Also Good (long chain exception):**
```javascript
var holder = this.el.select('.toast-holder', true).first();
if (holder) {
    holder.addClass('active');
    holder.removeClass('d-none');
}
```

## Brace placement

**IMPORTANT:** Use line breaks for braces on **prototype methods** inside `Roo.extend` (opening `{` on the line after `function(...)`). Constructors use the opening `{` on the **same line** as `function(...)`.

**IMPORTANT:** Put a **space before `{`** on function declarations: `function(config) {`, not `function(config){`.

**IMPORTANT:** Do NOT use line breaks for braces in control structures (`if`, `switch`, `while`, `for`, etc.) — but still use a space before `{` on those: `if (x) {`.

**IMPORTANT:** Never put the whole `if`/`else` on one line. Always use line breaks so the opening brace and body are on separate lines.

**Bad:**
```javascript
Roo.bootstrap.MyWidget = function(config){
    if (config.disabled){ return; }
};
```

**Good:**
```javascript
Roo.bootstrap.MyWidget = function(config) {
    Roo.bootstrap.MyWidget.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    onClick : function(e)
    {
        if (this.disabled) {
            return;
        }
        this.fireEvent('click', this, e);
    }
});
```

## Underscore prefix on variables and fields

**CRITICAL — FORBIDDEN:** Do NOT use a leading underscore (`_`) on variable names or property names in new code, except where the Roo framework already uses established names (e.g. `_tree` on `Roo.XComponent`, `_strings` for builder translations). Do not introduce new underscore-prefixed names.

**Bad:**
```javascript
this._items = [];
this._rendered = false;
```

**Good:**
```javascript
this.items = [];
this.rendered = false;
```

## `this` prefix

**IMPORTANT:** Always use `this.` when accessing instance properties or calling instance methods inside component methods.

**Bad:**
```javascript
onRender : function(ct, position)
{
    el = ct.createChild(cfg, position);
    initEvents();
}
```

**Good:**
```javascript
onRender : function(ct, position)
{
    this.el = ct.createChild(cfg, position);
    this.initEvents();
}
```

## Reducing nesting

**IMPORTANT:** Avoid nested code by using early returns, `continue` in loops, and avoiding `else` when possible.

**STRICT — Loops:** In loops, use `continue` to handle each case and keep the loop body flat. Do not chain `else if` inside loops.

**STRICT — Else:** Prefer early return or `continue` so the main path is not inside an `else` block.

**Bad:**
```javascript
for (var i = 0; i < items.length; i++) {
    if (items[i].is_valid) {
        if (items[i].needs_processing) {
            this.process(items[i]);
        } else {
            this.skip(items[i]);
        }
    }
}
```

**Good:**
```javascript
for (var i = 0; i < items.length; i++) {
    if (!items[i].is_valid) {
        continue;
    }
    if (items[i].needs_processing) {
        this.process(items[i]);
        continue;
    }
    this.skip(items[i]);
}
```

## Variable declarations

**STRICT:** Do **not** declare variables in a block at the top of a function. Declare each variable at the point of first use, in the narrowest scope where it is valid (inside the `if`, loop, or `{script:}` block that needs it).

Loop counters may be declared in the `for` initializer (`for (var i = 0; …)`).

**Bad:**
```javascript
formatRows : function(data)
{
    var lines = [];
    var mod;
    var i;
    var rows = data.rows || [];

    if (!rows.length) {
        lines.push('_(none)_');
    }
    for (i = 0; i < rows.length; i += 1) {
        ...
    }
}
```

**Good:**
```javascript
formatRows : function(data)
{
    var lines = [];

    if (!(data.rows || []).length) {
        lines.push('_(none)_');
        return lines.join('\n');
    }
    for (var i = 0; i < data.rows.length; i += 1) {
        ...
    }
}
```

**jtemplates** (`jtemplates/*.html`) are for **static prompt fragments** (instructions, examples). Dynamic installation data (catalogs, fetched records) is formatted on the **server endpoint** that owns the data, not in a jtemplate or client-side formatter.

## Switch/case vs if/else if

**IMPORTANT:** Use `switch/case` rather than long chains of `if/else if` when matching a single value.

**Bad:**
```javascript
if (region === 'north') {
    return new Roo.layout.North(cfg);
} else if (region === 'south') {
    return new Roo.layout.South(cfg);
} else if (region === 'east') {
    return new Roo.layout.East(cfg);
}
```

**Good:**
```javascript
switch (region) {
    case 'north':
        return new Roo.layout.North(cfg);
    case 'south':
        return new Roo.layout.South(cfg);
    case 'east':
        return new Roo.layout.East(cfg);
    default:
        return new Roo.layout.Center(cfg);
}
```

## Property and config defaults

**IMPORTANT:** Set defaults on the prototype object inside `Roo.extend`, not in the constructor, unless the value depends on constructor arguments.

**CRITICAL — shared mutable defaults:** Never put **`[]` or `{}`** (arrays or objects) as default values on the prototype object passed to `Roo.extend`. In JavaScript, arrays are objects; one literal is created when the class is defined and **every instance shares that same reference**. Mutating `this.items.push(...)` on one instance affects all others.

**Bad (shared array on prototype):**
```javascript
Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    cls : '',
    items : [],        // WRONG — one array for all instances
    listeners : {}     // WRONG — one object for all instances
});
```

**Good (scalar or sentinel on prototype; create per instance when needed):**
```javascript
Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    cls : '',
    items : false,     // use false until first use — not null, not []
    disabled : false
});

// in a method, when you need a collection:
addChild : function(child)
{
    this.items = this.items || [];
    this.items.push(child);
}
```

**Also Good (constructor init when every instance needs its own collection):**
```javascript
Roo.bootstrap.MyWidget = function(config) {
    Roo.bootstrap.MyWidget.superclass.constructor.call(this, config);
    this.items = [];
};
```

Prefer **`false`** (Roo convention for optional child lists) or lazy `this.items = this.items || []` over prototype literals.

## Avoid null — use `false`

**IMPORTANT:** In Roo.js, use **`false`** for unset or optional values — not **`null`**. This is the established framework convention (`el : false`, `items : false`, `parent : false`, optional strings like `name : false`).

**Why:** `false` reads clearly as “not set” in Roo code; it avoids mixing two sentinels; and tests like `if (!this.el)` and `this.items = this.items || []` work consistently. Legacy code sometimes uses `null`; new code should use `false`.

**Bad:**
```javascript
Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    el : null,
    items : null,
    tooltip : null
});

getChildContainer : function()
{
    if (this.containerEl == null) {
        return false;
    }
    return this.containerEl;
}
```

**Good:**
```javascript
Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    el : false,
    items : false,
    tooltip : false
});

getChildContainer : function()
{
    if (!this.containerEl) {
        return false;
    }
    return this.containerEl;
}
```

**Also Good (lazy init from `false`):**
```javascript
addChild : function(child)
{
    if (!this.items) {
        this.items = [];
    }
    this.items.push(child);
}
```

Use **`null` only** where an external API requires it (e.g. DOM APIs, third-party libraries) — not for optional Roo component properties or internal “not yet set” state.

**Bad (defaults belong on prototype, not constructor, for simple scalars):**
```javascript
Roo.bootstrap.MyWidget = function(config) {
    Roo.bootstrap.MyWidget.superclass.constructor.call(this, config);
    this.cls = '';
    this.items = [];
};
```

**Good (scalar defaults on prototype):**
```javascript
Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {
    cls : '',
    items : false,
    disabled : false
});
```

## Defensive code and null checks

**Defensive code (general):** Avoid branches whose only purpose is to handle situations your own API should already rule out. Fix the contract or caller instead of guarding everywhere downstream.

**Strong justification required:** Any defensive check must be backed by a concrete reason: external input, optional DOM nodes before render, or documented framework behaviour. "Just in case" is not sufficient.

**Null checks:** Prefer **`false`** over **`null`** for unset Roo state (see above). Design APIs so required values are present after render. Guard only at genuine boundaries (e.g. `getChildContainer` returning `false` before `onRender`, optional config the caller may omit).

**Bad:**
```javascript
addChild : function(child)
{
    if (child == null) {
        return;
    }
    if (this.items == null) {
        this.items = [];
    }
    this.items.push(child);
}
```

**Good:**
```javascript
addChild : function(child)
{
    if (!this.items) {
        this.items = [];
    }
    this.items.push(child);
}
```

## Line length and breaking

**IMPORTANT:** Avoid long lines in code, docblocks, and comments.

- **Code:** Break on `(` when calls are long; break on `+` when concatenation is long; put each argument on its own line when broken.
- **Docblocks:** Break so lines stay readable (roughly 72–80 characters).

**Bad:**
```javascript
this.el.update('<span class="label">' + Roo.util.Format.htmlEncode(this.fieldLabel) + '</span>' + this.getInputMarkup());
```

**Good:**
```javascript
this.el.update(
    '<span class="label">' + Roo.util.Format.htmlEncode(this.fieldLabel) + '</span>' +
    this.getInputMarkup()
);
```

## Debug and logging

**IMPORTANT:** Use `Roo.debug && Roo.log(...)` for debug output. Do not wrap debug-only logic in extra fields, counters, or sampling/throttling.

**IMPORTANT:** Do NOT include class names, method names, or timestamps in log messages — the browser console already provides location context.

**Bad:**
```javascript
console.log('[Roo.bootstrap.Card.onRender] rendering card id=' + this.id);
if (this.debugCount++ % 10 === 0) {
    Roo.log('sampled debug');
}
```

**Good:**
```javascript
Roo.debug && Roo.log('render card id=' + this.id);
```

## Building strings in loops

**CRITICAL — FORBIDDEN:** Do NOT build strings inside a loop by repeated concatenation (`s += "x"`). Use an array and `join`, or `Array(n).join`, when you need repeated units.

**Bad:**
```javascript
var prefix = '';
for (var i = 0; i < this.level; i++) {
    prefix += '> ';
}
```

**Good:**
```javascript
var prefix = Array(this.level + 1).join('> ');
```

## Character looping

**CRITICAL — FORBIDDEN:** Do NOT loop through strings character by character unless there is absolutely no other way. Prefer `indexOf`, `split`, `replace`, and regex.

**Bad:**
```javascript
for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === '#') {
        level++;
    } else {
        break;
    }
}
```

**Good:**
```javascript
var match = str.match(/^#+/);
var level = match ? match[0].length : 0;
```

## Roo component structure

**IMPORTANT:** Follow the established class pattern:

1. File header comment (`/* - LGPL */` and brief description).
2. JSDoc `@class` block with `@extends`, `@cfg`, `@children` as needed.
3. Constructor calling `superclass.constructor.call(this, config)` and `addEvents` for custom events.
4. `Roo.extend(Class, SuperClass, { ... prototype ... })`.
5. Override `getAutoCreate`, `onRender`, `initEvents`, `getChildContainer` only when needed.

**IMPORTANT:** Use `xtype` and `xns` in component trees; instantiate via `Roo.factory(config)` or `parent.addxtype(config)`.

**IMPORTANT:** Do not add new helper methods unless the task or plan explicitly requires one. Prefer a few lines in an existing method (`onRender`, `getAutoCreate`, etc.).

## Method names

**IMPORTANT:** Prefer short, concise method names. Avoid long narrative names that restate the file or type.

**IMPORTANT:** Do not add new methods unless explicitly requested. Default to extending existing lifecycle methods.

**Bad:**
```javascript
mergeTooltipConfigurationIntoElementAttributes : function(obj) { ... }
```

**Good (inline in existing method until extraction is approved):**
```javascript
onRender : function(ct, position)
{
    Roo.bootstrap.Component.superclass.onRender.call(this, ct, position);
    if (this.tooltip) {
        this.tooltipEl().attr('tooltip', this.tooltip);
    }
}
```

## Namespace and globals

**IMPORTANT:** Place classes under the correct namespace (`Roo.bootstrap`, `Roo.form`, etc.) using `Roo.namespace` or nested object assignment. Do not pollute the global scope with unprefixed names.

**IMPORTANT:** Application modules built with `Roo.XComponent` live on named globals (e.g. `MyApp.Dashboard`). Keep module names aligned with builder `part` / `parent` references.
