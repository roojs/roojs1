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
 * @class Roo.menu.TextItem
 * @extends Roo.menu.BaseItem
 * Adds a static text string to a menu, usually used as either a heading or group separator.
 * Note: old style constructor with text is still supported.
 * 
 * @constructor
 * Creates a new TextItem
 * @param {Object} cfg Configuration
 */
Roo.menu.TextItem = function(cfg){
    if (typeof(cfg) == 'string') {
        this.text = cfg;
    } else {
        Roo.apply(this,cfg);
    }
    
    Roo.menu.TextItem.superclass.constructor.call(this);
};

Roo.extend(Roo.menu.TextItem, Roo.menu.BaseItem, {
    /**
     * @cfg {String} text Text to show on item.
     */
    text : '',
    
    /**
     * @cfg {Boolean} hideOnClick True to hide the containing menu after this item is clicked (defaults to false)
     */
    hideOnClick : false,
    /**
     * @cfg {String} itemCls The default CSS class to use for text items (defaults to "x-menu-text")
     */
    itemCls : "x-menu-text",

    // private
    onRender : function(){
        var s = document.createElement("span");
        s.className = this.itemCls;
        s.innerHTML = this.text;
        this.el = s;
        Roo.menu.TextItem.superclass.onRender.apply(this, arguments);
    }
});