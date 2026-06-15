# Building Roo Components

This guide describes how to write **components** in Roo.js. It is aimed at developers and AI agents working on the framework or application UI code.

## Elements vs components

These terms are **not** interchangeable in Roo:

| | Element | Component |
|---|---------|-----------|
| **What it is** | A wrapper around **one** DOM node | A **rich widget** — may own many DOM nodes |
| **Typical classes** | `Roo.Element` (DOM helper), `Roo.bootstrap.Element` (simple div-like building block) | `Roo.Component`, `Roo.bootstrap.Component` and subclasses |
| **Lifecycle** | Minimal — mostly DOM utilities | Full lifecycle: render, show/hide, enable/disable, destroy, events |
| **Children** | DOM children only | Child **components** via `items` / `addxtype` |

Use **components** for anything that participates in the UI builder, fires events, or composes other widgets. Use **elements** (especially `Roo.bootstrap.Element`) for simple tagged containers with optional `html` and click handling — not for complex behaviour.

## Class hierarchy

```
Roo.util.Observable
  └── Roo.Component          ← base for all major components
        └── Roo.BoxComponent ← visual components with box model
              └── Roo.bootstrap.Component  ← bootstrap base (most UI widgets)
                    └── Roo.bootstrap.Card, .Container, .form.Input, ...
```

Application UI is usually declared as **`Roo.XComponent`** modules whose `tree` / `_tree` function returns a nested config object. That tree is built by calling `addxtype` on the root component.

## Minimal component skeleton

```javascript
/*
 * - LGPL
 *
 * MyWidget — brief description
 */

/**
 * @class Roo.bootstrap.MyWidget
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.Component
 * @cfg {String} title text shown in the header
 * @constructor
 * @param {Object} config
 */
Roo.bootstrap.MyWidget = function(config) {
    Roo.bootstrap.MyWidget.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event activate
         * @param {Roo.bootstrap.MyWidget} this
         */
        'activate' : true
    });
};

Roo.extend(Roo.bootstrap.MyWidget, Roo.bootstrap.Component, {

    title : '',

    getAutoCreate : function()
    {
        return {
            tag : 'div',
            cls : 'my-widget',
            cn : [
                { tag : 'div', cls : 'my-widget-header' },
                { tag : 'div', cls : 'my-widget-body' }
            ]
        };
    },

    onRender : function(ct, position)
    {
        Roo.bootstrap.MyWidget.superclass.onRender.call(this, ct, position);
        this.headerEl = this.el.select('.my-widget-header', true).first();
        this.bodyEl = this.el.select('.my-widget-body', true).first();
        if (this.title) {
            this.headerEl.update(this.title);
        }
        this.initEvents();
    },

    getChildContainer : function()
    {
        return this.bodyEl || this.el;
    }
});
```

Key points:

- **Do not** use `items : []` or other `{}` / `[]` literals on the `Roo.extend` prototype — all instances would share one array/object (see **`docs/coding-standards.md`**).
- **`getAutoCreate`** — returns a [DomHelper](Roo/DomHelper.js) config (`tag`, `cls`, `html`, `cn` for children). The base `Roo.bootstrap.Component.onRender` calls `ct.createChild(cfg, position)` unless `this.el` is already set (e.g. from HTML overlay build).
- **`onRender`** — call the superclass first; then cache inner elements and call `initEvents`.
- **`getChildContainer`** — return the DOM node where **child components** should be rendered. Defaults to `this.el` on the base class; override when children go inside an inner div.

## Components that accept children

A component is **appendable** (can have child components) when:

1. Its JSDoc includes `@children Roo.bootstrap.Component` (or a narrower child type).
2. It implements **`getChildContainer`** to return the correct inner element (if not the root `this.el`).
3. Callers (or the builder) supply an **`items`** array in the xtype config tree.

### How `addxtype` builds children

`Roo.bootstrap.Component.addxtype` and `addxtypeChild` (in `Roo/bootstrap/Component.js`) drive tree construction:

1. `Roo.factory(tree)` creates the child component from `xtype` + `xns`.
2. The child is **`render`ed** into `parent[cntr](true)` — by default `parent.getChildContainer()`.
3. If `tree.items` exists, each item is passed recursively to `addxtype`.
4. Built children are stored on `cn.items`; `childrenrendered` fires when done.

Config tree example (as used inside `Roo.XComponent`):

```javascript
{
    xtype : 'Container',
    xns : Roo.bootstrap,
    cls : 'content',
    items : [
        {
            xtype : 'Header',
            xns : Roo.bootstrap,
            html : 'Dashboard'
        },
        {
            xtype : 'Row',
            xns : Roo.bootstrap,
            items : [
                {
                    xtype : 'Column',
                    xns : Roo.bootstrap,
                    lg : 6,
                    items : [
                        { xtype : 'Card', xns : Roo.bootstrap, title : 'Stats' }
                    ]
                }
            ]
        }
    ]
}
```

### Overriding `getChildContainer`

Many components wrap Bootstrap markup where children belong in an inner node:

| Component | `getChildContainer` returns |
|-----------|----------------------------|
| `Roo.bootstrap.Component` (default) | `this.el` |
| `Roo.bootstrap.Container` (panel mode) | `.panel-body` inside the panel |
| `Roo.bootstrap.Toaster` | `.toast-holder` (set in `initEvents`) |
| `Roo.bootstrap.Card` | inner card body element |
| `Roo.bootstrap.Modal` | modal body; buttons use `getButtonContainer` |

Example from `Roo.bootstrap.Toaster`:

```javascript
getAutoCreate : function()
{
    return {
        cls : 'bootstrap',
        cn : [{
            cls : 'toaster',
            cn : [{ tag : 'div', cls : 'toast-holder' }]
        }]
    };
},
initEvents : function()
{
    this.containerEl = this.el.select('.toast-holder', true).first();
},
getChildContainer : function()
{
    return this.containerEl;
}
```

When adding a new container component, decide where children live in the DOM and point `getChildContainer` there. If `getChildContainer` returns `false` (e.g. before render), `addxtypeChild` skips rendering children.

### `container_method`

Per-child override: set `container_method` on a child config (string name of a parent method) when children must attach to a non-default container. Used by complex layouts (e.g. nav bars with separate header/body regions).

## Simple appendable element: `Roo.bootstrap.Element`

For a **single-DOM** wrapper that still accepts child components through the xtype system, extend `Roo.bootstrap.Component` (or use `Roo.bootstrap.Element` directly):

```javascript
/**
 * @class Roo.bootstrap.Element
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.Component
 * @cfg {String} tag  HTML tag (default div)
 * @cfg {String} html inner HTML (optional; prefer children)
 */
```

`Roo.bootstrap.Element` uses the default `getChildContainer` → `this.el`, so child xtypes are appended as DOM descendants of the created tag. Use `html` for static content; use `items` for child components.

## Application modules: `Roo.XComponent`

Full pages or embeddable UI chunks are **`Roo.XComponent`** instances, not single component classes:

```javascript
MyApp.Dashboard = new Roo.XComponent({
    parent   : false,           // top-level, or name of parent module
    order    : '001',
    region   : 'center',
    name     : 'Dashboard',
    disabled : false,
    _tree : function()
    {
        return {
            xtype : 'Container',
            xns : Roo.bootstrap,
            items : [ /* ... */ ]
        };
    }
});
```

Registration and build flow:

1. **`Roo.XComponent.register(module)`** — called from the constructor; modules are queued.
2. **`Roo.XComponent.build()`** — resolves parent/child order, then calls **`render()`** on each module.
3. **`render()`** — obtains the tree from `_tree()` or `tree()`, ensures a layout parent exists, then calls **`this.parent.el.addxtype(tree)`** to instantiate the widget tree.

Embed modes:

- **`parent : false`** — classic SPA; creates a border layout root.
- **`parent : '#my-div'`** — render into an existing DOM id.
- **`parent : 'bootstrap-body'`** — bootstrap body / `Roo.bootstrap.Body` integration.

See `Roo/XComponent.js` for full usage patterns (Classic Roo, Embedded Roo, Bootstrap Roo, string overlays).

## Instantiating from config: `Roo.factory`

```javascript
var card = Roo.factory({
    xtype : 'Card',
    xns : Roo.bootstrap,
    title : 'Hello',
    items : [ ... ]
});
```

`Roo.factory` reads `xtype` and `xns`, constructs `new ns[xtype](config)`, and clears `xns` on the instance to prevent re-factory loops. Config objects without `xtype` are returned unchanged.

## Events

- Base component events: `render`, `destroy`, `show`, `hide`, `enable`, `disable` (`Roo.Component`).
- Register custom events in the constructor with `this.addEvents({ 'myevent' : true })`.
- Wire DOM events in **`initEvents`**, called from `onRender` after the element exists.
- Container components fire **`childrenrendered`** when all `items` have been built.

## HTML overlay build (`build_from_html`)

When `Roo.XComponent.build_from_html` is true, the builder may match existing DOM nodes marked with `xtype` attributes instead of creating fresh elements. Components with `can_build_overlaid : false` or flexy template directives (`flexy:if`, `flexy:foreach`) skip overlay matching. This matters mainly for builder-generated HTML previews — not typical hand-written components.

## Checklist for a new component

1. Choose the correct base class (`Roo.bootstrap.Component` for most bootstrap UI).
2. Add JSDoc with `@class`, `@extends`, `@cfg`, and `@children` if appendable.
3. Define config defaults on the prototype.
4. Implement `getAutoCreate` for DOM structure.
5. Override `onRender` / `initEvents` for behaviour and DOM caching.
6. Override **`getChildContainer`** if children go inside an inner element.
7. Register the class on the namespace so `xtype` resolves (e.g. `Roo.bootstrap.MyWidget`).
8. Add the file to the buildSDK dependency list if it ships in a bundle.

## Related reading

- **`docs/coding-standards.md`** — JavaScript style for Roo code
- **`Roo/bootstrap/Component.js`** — `addxtype`, `getChildContainer`, `onRender`
- **`Roo/XComponent.js`** — application module build system
- Generated API docs under **`docs/symbols/`** for existing component `@cfg` options
