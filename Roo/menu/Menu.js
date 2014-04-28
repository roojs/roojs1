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
 * @class Roo.menu.Menu
 * @extends Roo.util.Observable
 * A menu object.  This is the container to which you add all other menu items.  Menu can also serve a as a base class
 * when you want a specialzed menu based off of another component (like {@link Roo.menu.DateMenu} for example).
 * @constructor
 * Creates a new Menu
 * @param {Object} config Configuration options
 */
Roo.menu.Menu = function(config){
    Roo.apply(this, config);
    this.id = this.id || Roo.id();
    this.addEvents({
        /**
         * @event beforeshow
         * Fires before this menu is displayed
         * @param {Roo.menu.Menu} this
         */
        beforeshow : true,
        /**
         * @event beforehide
         * Fires before this menu is hidden
         * @param {Roo.menu.Menu} this
         */
        beforehide : true,
        /**
         * @event show
         * Fires after this menu is displayed
         * @param {Roo.menu.Menu} this
         */
        show : true,
        /**
         * @event hide
         * Fires after this menu is hidden
         * @param {Roo.menu.Menu} this
         */
        hide : true,
        /**
         * @event click
         * Fires when this menu is clicked (or when the enter key is pressed while it is active)
         * @param {Roo.menu.Menu} this
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         * @param {Roo.EventObject} e
         */
        click : true,
        /**
         * @event mouseover
         * Fires when the mouse is hovering over this menu
         * @param {Roo.menu.Menu} this
         * @param {Roo.EventObject} e
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         */
        mouseover : true,
        /**
         * @event mouseout
         * Fires when the mouse exits this menu
         * @param {Roo.menu.Menu} this
         * @param {Roo.EventObject} e
         * @param {Roo.menu.Item} menuItem The menu item that was clicked
         */
        mouseout : true,
        /**
         * @event itemclick
         * Fires when a menu item contained in this menu is clicked
         * @param {Roo.menu.BaseItem} baseItem The BaseItem that was clicked
         * @param {Roo.EventObject} e
         */
        itemclick: true
    });
    if (this.registerMenu) {
        Roo.menu.MenuMgr.register(this);
    }
    
    var mis = this.items;
    this.items = new Roo.util.MixedCollection();
    if(mis){
        this.add.apply(this, mis);
    }
};

Roo.extend(Roo.menu.Menu, Roo.util.Observable, {
    /**
     * @cfg {Number} minWidth The minimum width of the menu in pixels (defaults to 120)
     */
    minWidth : 120,
    /**
     * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop"
     * for bottom-right shadow (defaults to "sides")
     */
    shadow : "sides",
    /**
     * @cfg {String} subMenuAlign The {@link Roo.Element#alignTo} anchor position value to use for submenus of
     * this menu (defaults to "tl-tr?")
     */
    subMenuAlign : "tl-tr?",
    /**
     * @cfg {String} defaultAlign The default {@link Roo.Element#alignTo) anchor position value for this menu
     * relative to its element of origin (defaults to "tl-bl?")
     */
    defaultAlign : "tl-bl?",
    /**
     * @cfg {Boolean} allowOtherMenus True to allow multiple menus to be displayed at the same time (defaults to false)
     */
    allowOtherMenus : false,
    /**
     * @cfg {Boolean} registerMenu True (default) - means that clicking on screen etc. hides it.
     */
    registerMenu : true,

    hidden:true,

    // private
    render : function(){
        if(this.el){
            return;
        }
        var el = this.el = new Roo.Layer({
            cls: "x-menu",
            shadow:this.shadow,
            constrain: false,
            parentEl: this.parentEl || document.body,
            zindex:15000
        });

        this.keyNav = new Roo.menu.MenuNav(this);

        if(this.plain){
            el.addClass("x-menu-plain");
        }
        if(this.cls){
            el.addClass(this.cls);
        }
        // generic focus element
        this.focusEl = el.createChild({
            tag: "a", cls: "x-menu-focus", href: "#", onclick: "return false;", tabIndex:"-1"
        });
        var ul = el.createChild({tag: "ul", cls: "x-menu-list"});
        ul.on(Roo.isTouch ? 'touchstart' : 'click'   , this.onClick, this);
        
        ul.on("mouseover", this.onMouseOver, this);
        ul.on("mouseout", this.onMouseOut, this);
        this.items.each(function(item){
            if (item.hidden) {
                return;
            }
            
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            ul.dom.appendChild(li);
            item.render(li, this);
        }, this);
        this.ul = ul;
        this.autoWidth();
    },

    // private
    autoWidth : function(){
        var el = this.el, ul = this.ul;
        if(!el){
            return;
        }
        var w = this.width;
        if(w){
            el.setWidth(w);
        }else if(Roo.isIE){
            el.setWidth(this.minWidth);
            var t = el.dom.offsetWidth; // force recalc
            el.setWidth(ul.getWidth()+el.getFrameWidth("lr"));
        }
    },

    // private
    delayAutoWidth : function(){
        if(this.rendered){
            if(!this.awTask){
                this.awTask = new Roo.util.DelayedTask(this.autoWidth, this);
            }
            this.awTask.delay(20);
        }
    },

    // private
    findTargetItem : function(e){
        var t = e.getTarget(".x-menu-list-item", this.ul,  true);
        if(t && t.menuItemId){
            return this.items.get(t.menuItemId);
        }
    },

    // private
    onClick : function(e){
        Roo.log("menu.onClick");
        var t = this.findTargetItem(e);
        if(!t){
            return;
        }
        Roo.log(e);
        if (Roo.isTouch && e.type == 'touchstart' && t.menu  && !t.disabled) {
            if(t == this.activeItem && t.shouldDeactivate(e)){
                this.activeItem.deactivate();
                delete this.activeItem;
                return;
            }
            if(t.canActivate){
                this.setActiveItem(t, true);
            }
            return;
            
            
        }
        
        t.onClick(e);
        this.fireEvent("click", this, t, e);
    },

    // private
    setActiveItem : function(item, autoExpand){
        if(item != this.activeItem){
            if(this.activeItem){
                this.activeItem.deactivate();
            }
            this.activeItem = item;
            item.activate(autoExpand);
        }else if(autoExpand){
            item.expandMenu();
        }
    },

    // private
    tryActivate : function(start, step){
        var items = this.items;
        for(var i = start, len = items.length; i >= 0 && i < len; i+= step){
            var item = items.get(i);
            if(!item.disabled && item.canActivate){
                this.setActiveItem(item, false);
                return item;
            }
        }
        return false;
    },

    // private
    onMouseOver : function(e){
        var t;
        if(t = this.findTargetItem(e)){
            if(t.canActivate && !t.disabled){
                this.setActiveItem(t, true);
            }
        }
        this.fireEvent("mouseover", this, e, t);
    },

    // private
    onMouseOut : function(e){
        var t;
        if(t = this.findTargetItem(e)){
            if(t == this.activeItem && t.shouldDeactivate(e)){
                this.activeItem.deactivate();
                delete this.activeItem;
            }
        }
        this.fireEvent("mouseout", this, e, t);
    },

    /**
     * Read-only.  Returns true if the menu is currently displayed, else false.
     * @type Boolean
     */
    isVisible : function(){
        return this.el && !this.hidden;
    },

    /**
     * Displays this menu relative to another element
     * @param {String/HTMLElement/Roo.Element} element The element to align to
     * @param {String} position (optional) The {@link Roo.Element#alignTo} anchor position to use in aligning to
     * the element (defaults to this.defaultAlign)
     * @param {Roo.menu.Menu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    show : function(el, pos, parentMenu){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign), parentMenu, false);
    },

    /**
     * Displays this menu at a specific xy position
     * @param {Array} xyPosition Contains X & Y [x, y] values for the position at which to show the menu (coordinates are page-based)
     * @param {Roo.menu.Menu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    showAt : function(xy, parentMenu, /* private: */_e){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        if(_e !== false){
            this.fireEvent("beforeshow", this);
            xy = this.el.adjustForConstraints(xy);
        }
        this.el.setXY(xy);
        this.el.show();
        this.hidden = false;
        this.focus();
        this.fireEvent("show", this);
    },

    focus : function(){
        if(!this.hidden){
            this.doFocus.defer(50, this);
        }
    },

    doFocus : function(){
        if(!this.hidden){
            this.focusEl.focus();
        }
    },

    /**
     * Hides this menu and optionally all parent menus
     * @param {Boolean} deep (optional) True to hide all parent menus recursively, if any (defaults to false)
     */
    hide : function(deep){
        if(this.el && this.isVisible()){
            this.fireEvent("beforehide", this);
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.el.hide();
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(deep === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    },

    /**
     * Addds one or more items of any type supported by the Menu class, or that can be converted into menu items.
     * Any of the following are valid:
     * <ul>
     * <li>Any menu item object based on {@link Roo.menu.Item}</li>
     * <li>An HTMLElement object which will be converted to a menu item</li>
     * <li>A menu item config object that will be created as a new menu item</li>
     * <li>A string, which can either be '-' or 'separator' to add a menu separator, otherwise
     * it will be converted into a {@link Roo.menu.TextItem} and added</li>
     * </ul>
     * Usage:
     * <pre><code>
// Create the menu
var menu = new Roo.menu.Menu();

// Create a menu item to add by reference
var menuItem = new Roo.menu.Item({ text: 'New Item!' });

// Add a bunch of items at once using different methods.
// Only the last item added will be returned.
var item = menu.add(
    menuItem,                // add existing item by ref
    'Dynamic Item',          // new TextItem
    '-',                     // new separator
    { text: 'Config Item' }  // new item by config
);
</code></pre>
     * @param {Mixed} args One or more menu items, menu item configs or other objects that can be converted to menu items
     * @return {Roo.menu.Item} The menu item that was added, or the last one if multiple items were added
     */
    add : function(){
        var a = arguments, l = a.length, item;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if ((typeof(el) == "object") && el.xtype && el.xns) {
                el = Roo.factory(el, Roo.menu);
            }
            
            if(el.render){ // some kind of Item
                item = this.addItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    item = this.addSeparator();
                }else{
                    item = this.addText(el);
                }
            }else if(el.tagName || el.el){ // element
                item = this.addElement(el);
            }else if(typeof el == "object"){ // must be menu item config?
                item = this.addMenuItem(el);
            }
        }
        return item;
    },

    /**
     * Returns this menu's underlying {@link Roo.Element} object
     * @return {Roo.Element} The element
     */
    getEl : function(){
        if(!this.el){
            this.render();
        }
        return this.el;
    },

    /**
     * Adds a separator bar to the menu
     * @return {Roo.menu.Item} The menu item that was added
     */
    addSeparator : function(){
        return this.addItem(new Roo.menu.Separator());
    },

    /**
     * Adds an {@link Roo.Element} object to the menu
     * @param {String/HTMLElement/Roo.Element} el The element or DOM node to add, or its id
     * @return {Roo.menu.Item} The menu item that was added
     */
    addElement : function(el){
        return this.addItem(new Roo.menu.BaseItem(el));
    },

    /**
     * Adds an existing object based on {@link Roo.menu.Item} to the menu
     * @param {Roo.menu.Item} item The menu item to add
     * @return {Roo.menu.Item} The menu item that was added
     */
    addItem : function(item){
        this.items.add(item);
        if(this.ul){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.ul.dom.appendChild(li);
            item.render(li, this);
            this.delayAutoWidth();
        }
        return item;
    },

    /**
     * Creates a new {@link Roo.menu.Item} based an the supplied config object and adds it to the menu
     * @param {Object} config A MenuItem config object
     * @return {Roo.menu.Item} The menu item that was added
     */
    addMenuItem : function(config){
        if(!(config instanceof Roo.menu.Item)){
            if(typeof config.checked == "boolean"){ // must be check menu item config?
                config = new Roo.menu.CheckItem(config);
            }else{
                config = new Roo.menu.Item(config);
            }
        }
        return this.addItem(config);
    },

    /**
     * Creates a new {@link Roo.menu.TextItem} with the supplied text and adds it to the menu
     * @param {String} text The text to display in the menu item
     * @return {Roo.menu.Item} The menu item that was added
     */
    addText : function(text){
        return this.addItem(new Roo.menu.TextItem({ text : text }));
    },

    /**
     * Inserts an existing object based on {@link Roo.menu.Item} to the menu at a specified index
     * @param {Number} index The index in the menu's list of current items where the new item should be inserted
     * @param {Roo.menu.Item} item The menu item to add
     * @return {Roo.menu.Item} The menu item that was added
     */
    insert : function(index, item){
        this.items.insert(index, item);
        if(this.ul){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.ul.dom.insertBefore(li, this.ul.dom.childNodes[index]);
            item.render(li, this);
            this.delayAutoWidth();
        }
        return item;
    },

    /**
     * Removes an {@link Roo.menu.Item} from the menu and destroys the object
     * @param {Roo.menu.Item} item The menu item to remove
     */
    remove : function(item){
        this.items.removeKey(item.id);
        item.destroy();
    },

    /**
     * Removes and destroys all items in the menu
     */
    removeAll : function(){
        var f;
        while(f = this.items.first()){
            this.remove(f);
        }
    }
});

// MenuNav is a private utility class used internally by the Menu
Roo.menu.MenuNav = function(menu){
    Roo.menu.MenuNav.superclass.constructor.call(this, menu.el);
    this.scope = this.menu = menu;
};

Roo.extend(Roo.menu.MenuNav, Roo.KeyNav, {
    doRelay : function(e, h){
        var k = e.getKey();
        if(!this.menu.activeItem && e.isNavKeyPress() && k != e.SPACE && k != e.RETURN){
            this.menu.tryActivate(0, 1);
            return false;
        }
        return h.call(this.scope || this, e, this.menu);
    },

    up : function(e, m){
        if(!m.tryActivate(m.items.indexOf(m.activeItem)-1, -1)){
            m.tryActivate(m.items.length-1, -1);
        }
    },

    down : function(e, m){
        if(!m.tryActivate(m.items.indexOf(m.activeItem)+1, 1)){
            m.tryActivate(0, 1);
        }
    },

    right : function(e, m){
        if(m.activeItem){
            m.activeItem.expandMenu(true);
        }
    },

    left : function(e, m){
        m.hide();
        if(m.parentMenu && m.parentMenu.activeItem){
            m.parentMenu.activeItem.activate();
        }
    },

    enter : function(e, m){
        if(m.activeItem){
            e.stopPropagation();
            m.activeItem.onClick(e);
            m.fireEvent("click", this, m.activeItem);
            return true;
        }
    }
});