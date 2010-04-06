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
 * @class Roo.menu.DateMenu
 * @extends Roo.menu.Menu
 * A menu containing a {@link Roo.menu.DateItem} component (which provides a date picker).
 * @constructor
 * Creates a new DateMenu
 * @param {Object} config Configuration options
 */
Roo.menu.DateMenu = function(config){
    Roo.menu.DateMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var di = new Roo.menu.DateItem(config);
    this.add(di);
    /**
     * The {@link Roo.DatePicker} instance for this DateMenu
     * @type DatePicker
     */
    this.picker = di.picker;
    /**
     * @event select
     * @param {DatePicker} picker
     * @param {Date} date
     */
    this.relayEvents(di, ["select"]);

    this.on('beforeshow', function(){
        if(this.picker){
            this.picker.hideMonthPicker(true);
        }
    }, this);
};
Roo.extend(Roo.menu.DateMenu, Roo.menu.Menu, {
    cls:'x-date-menu'
});