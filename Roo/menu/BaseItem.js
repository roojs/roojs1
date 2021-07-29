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
 * @class Roo.menu.BaseItem
 * @extends Roo.Component
 * @abstract
 * The base class for all items that render into menus.  BaseItem provides default rendering, activated state
 * management and base configuration options shared by all menu components.
 * @constructor
 * Creates a new BaseItem
 * @param {Object} config Configuration options
 */
Roo.menu.BaseItem = function(config){
    Roo.menu.BaseItem.superclass.constructor.call(this, config);

    this.addEvents({
        /**
         * @event click
         * Fires when this item is clicked
         * @param {Roo.menu.BaseItem} this
         * @param {Roo.EventObject} e
         */
        click: true,
        /**
         * @event activate
         * Fires when this item is activated
         * @param {Roo.menu.BaseItem} this
         */
        activate : true,
        /**
         * @event deactivate
         * Fires when this item is deactivated
         * @param {Roo.menu.BaseItem} this
         */
        deactivate : true
    });

    if(this.handler){
        this.on("click", this.handler, this.scope, true);
    }
};

Roo.extend(Roo.menu.BaseItem, Roo.Component, {
    /**
     * @cfg {Function} handler
     * A function that will handle the click event of this menu item (defaults to undefined)
     */
    /**
     * @cfg {Boolean} canActivate True if this item can be visually activated (defaults to false)
     */
    canActivate : false,
    
     /**
     * @cfg {Boolean} hidden True to prevent creation of this menu item (defaults to false)
     */
    hidden: false,
    
    /**
     * @cfg {String} activeClass The CSS class to use when the item becomes activated (defaults to "x-menu-item-active")
     */
    activeClass : "x-menu-item-active",
    /**
     * @cfg {Boolean} hideOnClick True to hide the containing menu after this item is clicked (defaults to true)
     */
    hideOnClick : true,
    /**
     * @cfg {Number} hideDelay Length of time in milliseconds to wait before hiding after a click (defaults to 100)
     */
    hideDelay : 100,

    // private
    ctype: "Roo.menu.BaseItem",

    // private
    actionMode : "container",

    // private
    render : function(container, parentMenu){
        this.parentMenu = parentMenu;
        Roo.menu.BaseItem.superclass.render.call(this, container);
        this.container.menuItemId = this.id;
    },

    // private
    onRender : function(container, position){
        this.el = Roo.get(this.el);
        container.dom.appendChild(this.el.dom);
    },

    // private
    onClick : function(e){
        if(!this.disabled && this.fireEvent("click", this, e) !== false
                && this.parentMenu.fireEvent("itemclick", this, e) !== false){
            this.handleClick(e);
        }else{
            e.stopEvent();
        }
    },

    // private
    activate : function(){
        if(this.disabled){
            return false;
        }
        var li = this.container;
        li.addClass(this.activeClass);
        this.region = li.getRegion().adjust(2, 2, -2, -2);
        this.fireEvent("activate", this);
        return true;
    },

    // private
    deactivate : function(){
        this.container.removeClass(this.activeClass);
        this.fireEvent("deactivate", this);
    },

    // private
    shouldDeactivate : function(e){
        return !this.region || !this.region.contains(e.getPoint());
    },

    // private
    handleClick : function(e){
        if(this.hideOnClick){
            this.parentMenu.hide.defer(this.hideDelay, this.parentMenu, [true]);
        }
    },

    // private
    expandMenu : function(autoActivate){
        // do nothing
    },

    // private
    hideMenu : function(){
        // do nothing
    }
});