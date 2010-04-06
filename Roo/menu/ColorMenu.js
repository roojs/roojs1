/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.menu.ColorMenu
 * @extends Roo.menu.Menu
 * A menu containing a {@link Roo.menu.ColorItem} component (which provides a basic color picker).
 * @constructor
 * Creates a new ColorMenu
 * @param {Object} config Configuration options
 */
Roo.menu.ColorMenu = function(config){
    Roo.menu.ColorMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var ci = new Roo.menu.ColorItem(config);
    this.add(ci);
    /**
     * The {@link Roo.ColorPalette} instance for this ColorMenu
     * @type ColorPalette
     */
    this.palette = ci.palette;
    /**
     * @event select
     * @param {ColorPalette} palette
     * @param {String} color
     */
    this.relayEvents(ci, ["select"]);
};
Roo.extend(Roo.menu.ColorMenu, Roo.menu.Menu);