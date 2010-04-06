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
 * @class Roo.menu.ColorItem
 * @extends Roo.menu.Adapter
 * A menu item that wraps the {@link Roo.ColorPalette} component.
 * @constructor
 * Creates a new ColorItem
 * @param {Object} config Configuration options
 */
Roo.menu.ColorItem = function(config){
    Roo.menu.ColorItem.superclass.constructor.call(this, new Roo.ColorPalette(config), config);
    /** The Roo.ColorPalette object @type Roo.ColorPalette */
    this.palette = this.component;
    this.relayEvents(this.palette, ["select"]);
    if(this.selectHandler){
        this.on('select', this.selectHandler, this.scope);
    }
};
Roo.extend(Roo.menu.ColorItem, Roo.menu.Adapter);