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
 * @class Roo.menu.DateItem
 * @extends Roo.menu.Adapter
 * A menu item that wraps the {@link Roo.DatPicker} component.
 * @constructor
 * Creates a new DateItem
 * @param {Object} config Configuration options
 */
Roo.menu.DateItem = function(config){
    Roo.menu.DateItem.superclass.constructor.call(this, new Roo.DatePicker(config), config);
    /** The Roo.DatePicker object @type Roo.DatePicker */
    this.picker = this.component;
    this.addEvents({select: true});
    
    this.picker.on("render", function(picker){
        picker.getEl().swallowEvent("click");
        picker.container.addClass("x-menu-date-item");
    });

    this.picker.on("select", this.onSelect, this);
};

Roo.extend(Roo.menu.DateItem, Roo.menu.Adapter, {
    // private
    onSelect : function(picker, date){
        this.fireEvent("select", this, date, picker);
        Roo.menu.DateItem.superclass.handleClick.call(this);
    }
});