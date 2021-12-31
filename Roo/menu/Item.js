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
 * @class Roo.menu.Item
 * @extends Roo.menu.BaseItem
 * A base class for all menu items that require menu-related functionality (like sub-menus) and are not static
 * display items.  Item extends the base functionality of {@link Roo.menu.BaseItem} by adding menu-specific
 * activation and click handling.
 * @constructor
 * Creates a new Item
 * @param {Object} config Configuration options
 */
Roo.menu.Item = function(config){
    Roo.menu.Item.superclass.constructor.call(this, config);
    if(this.menu){
        this.menu = Roo.menu.MenuMgr.get(this.menu);
    }
};
Roo.extend(Roo.menu.Item, Roo.menu.BaseItem, {
    /**
     * @cfg {Roo.menu.Menu} menu
     * A Sub menu
     */
    /**
     * @cfg {String} text
     * The text to show on the menu item.
     */
    text: '',
     /**
     * @cfg {String} html to render in menu
     * The text to show on the menu item (HTML version).
     */
    html: '',
    /**
     * @cfg {String} icon
     * The path to an icon to display in this menu item (defaults to Roo.BLANK_IMAGE_URL)
     */
    icon: undefined,
    /**
     * @cfg {String} itemCls The default CSS class to use for menu items (defaults to "x-menu-item")
     */
    itemCls : "x-menu-item",
    /**
     * @cfg {Boolean} canActivate True if this item can be visually activated (defaults to true)
     */
    canActivate : true,
    /**
     * @cfg {Number} showDelay Length of time in milliseconds to wait before showing this item (defaults to 200)
     */
    showDelay: 200,
    // doc'd in BaseItem
    hideDelay: 200,

    // private
    ctype: "Roo.menu.Item",
    
    // private
    onRender : function(container, position){
        var el = document.createElement("a");
        el.hideFocus = true;
        el.unselectable = "on";
        el.href = this.href || "#";
        if(this.hrefTarget){
            el.target = this.hrefTarget;
        }
        el.className = this.itemCls + (this.menu ?  " x-menu-item-arrow" : "") + (this.cls ?  " " + this.cls : "");
        
        var html = this.html.length ? this.html  : String.format('{0}',this.text);
        
        el.innerHTML = String.format(
                '<img src="{0}" class="x-menu-item-icon {1}" />' + html,
                this.icon || Roo.BLANK_IMAGE_URL, this.iconCls || '');
        this.el = el;
        Roo.menu.Item.superclass.onRender.call(this, container, position);
    },

    /**
     * Sets the text to display in this menu item
     * @param {String} text The text to display
     * @param {Boolean} isHTML true to indicate text is pure html.
     */
    setText : function(text, isHTML){
        if (isHTML) {
            this.html = text;
        } else {
            this.text = text;
            this.html = '';
        }
        if(this.rendered){
            var html = this.html.length ? this.html  : String.format('{0}',this.text);
     
            this.el.update(String.format(
                '<img src="{0}" class="x-menu-item-icon {2}">' + html,
                this.icon || Roo.BLANK_IMAGE_URL, this.text, this.iconCls || ''));
            this.parentMenu.autoWidth();
        }
    },

    // private
    handleClick : function(e){
        if(!this.href){ // if no link defined, stop the event automatically
            e.stopEvent();
        }
        Roo.menu.Item.superclass.handleClick.apply(this, arguments);
    },

    // private
    activate : function(autoExpand){
        if(Roo.menu.Item.superclass.activate.apply(this, arguments)){
            this.focus();
            if(autoExpand){
                this.expandMenu();
            }
        }
        return true;
    },

    // private
    shouldDeactivate : function(e){
        if(Roo.menu.Item.superclass.shouldDeactivate.call(this, e)){
            if(this.menu && this.menu.isVisible()){
                return !this.menu.getEl().getRegion().contains(e.getPoint());
            }
            return true;
        }
        return false;
    },

    // private
    deactivate : function(){
        Roo.menu.Item.superclass.deactivate.apply(this, arguments);
        this.hideMenu();
    },

    // private
    expandMenu : function(autoActivate){
        if(!this.disabled && this.menu){
            clearTimeout(this.hideTimer);
            delete this.hideTimer;
            if(!this.menu.isVisible() && !this.showTimer){
                this.showTimer = this.deferExpand.defer(this.showDelay, this, [autoActivate]);
            }else if (this.menu.isVisible() && autoActivate){
                this.menu.tryActivate(0, 1);
            }
        }
    },

    // private
    deferExpand : function(autoActivate){
        delete this.showTimer;
        this.menu.show(this.container, this.parentMenu.subMenuAlign || "tl-tr?", this.parentMenu);
        if(autoActivate){
            this.menu.tryActivate(0, 1);
        }
    },

    // private
    hideMenu : function(){
        clearTimeout(this.showTimer);
        delete this.showTimer;
        if(!this.hideTimer && this.menu && this.menu.isVisible()){
            this.hideTimer = this.deferHide.defer(this.hideDelay, this);
        }
    },

    // private
    deferHide : function(){
        delete this.hideTimer;
        this.menu.hide();
    }
});