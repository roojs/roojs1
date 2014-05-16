/*
 * - LGPL
 *
 * menu
 * 
 */

/**
 * @class Roo.bootstrap.Menu
 * @extends Roo.bootstrap.Component
 * Bootstrap Menu class - container for MenuItems
 * @cfg {String} type type of menu
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
    if (this.registerMenu) {
        Roo.bootstrap.MenuMgr.register(this);
    }
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
    this.menuitems = new Roo.util.MixedCollection(false, function(o) { return o.el.id; });
};

Roo.extend(Roo.bootstrap.Menu, Roo.bootstrap.Component,  {
    
   /// html : false,
    //align : '',
    triggerEl : false,  // is this set by component builder? -- it should really be fetched from parent()???
    type: false,
    /**
     * @cfg {Boolean} registerMenu True (default) - means that clicking on screen etc. hides it.
     */
    registerMenu : true,
    
    menuItems :false, // stores the menu items..
    
    hidden:true,
    
    parentMenu : false,
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
        //if (['right'].indexOf(this.align)!==-1) {
        //    cfg.cn[1].cls += ' pull-right'
        //}
        var cfg = {
            tag : 'ul',
            cls : 'dropdown-menu' ,
            style : 'z-index:1000'
            
        }
	
	if (this.type === 'submenu') {
	    cfg.cls = 'submenu active'
	}
	
        return cfg;
    },
    initEvents : function() {
        
       // Roo.log("ADD event");
       // Roo.log(this.triggerEl.dom);
        this.triggerEl.on('click', this.onTriggerPress, this);
        this.triggerEl.addClass('dropdown-toggle');
        this.el.on(Roo.isTouch ? 'touchstart' : 'click'   , this.onClick, this);

        this.el.on("mouseover", this.onMouseOver, this);
        this.el.on("mouseout", this.onMouseOut, this);
        
        
    },
    findTargetItem : function(e){
        var t = e.getTarget(".dropdown-menu-item", this.el,  true);
        if(!t){
            return false;
        }
        //Roo.log(t);         Roo.log(t.id);
        if(t && t.id){
            //Roo.log(this.menuitems);
            return this.menuitems.get(t.id);
            
            //return this.items.get(t.menuItemId);
        }
        
        return false;
    },
    onClick : function(e){
        Roo.log("menu.onClick");
        var t = this.findTargetItem(e);
        if(!t){
            return;
        }
        Roo.log(e);
        /*
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
        */
        Roo.log('pass click event');
        
        t.onClick(e);
        this.fireEvent("click", this, t, e);
    },
     onMouseOver : function(e){
        var t  = this.findTargetItem(e);
        //Roo.log(t);
        //if(t){
        //    if(t.canActivate && !t.disabled){
        //        this.setActiveItem(t, true);
        //    }
        //}
        
        this.fireEvent("mouseover", this, e, t);
    },
    isVisible : function(){
        return this.triggerEl.hasClass('open')
    },
     onMouseOut : function(e){
        var t  = this.findTargetItem(e);
        
        //if(t ){
        //    if(t == this.activeItem && t.shouldDeactivate(e)){
        //        this.activeItem.deactivate();
        //        delete this.activeItem;
        //    }
        //}
        this.fireEvent("mouseout", this, e, t);
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
            
            //xy = this.el.adjustForConstraints(xy);
        }
        //this.el.setXY(xy);
        //this.el.show();
        this.hideMenuItems();
        this.hidden = false;
        this.triggerEl.addClass('open');
        this.focus();
        this.fireEvent("show", this);
    },
    
    focus : function(){
        return;
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
        
        this.hideMenuItems();
        if(this.el && this.isVisible()){
            this.fireEvent("beforehide", this);
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.triggerEl.removeClass('open');;
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(deep === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    },
    
    onTriggerPress  : function(e)
    {
        
        Roo.log(e);
        //Roo.log(e.getTarget());
       // Roo.log(this.triggerEl.dom);
        //if (Roo.get(e.getTarget()).findParent('.dropdown-menu')) {
        //    return;
        //}
        if (this.isVisible()) {
            Roo.log('hide');
            this.hide();
        } else {
            this.show(this.triggerEl, false, false);
        }
        
        
    },
    
         
       
    
    hideMenuItems : function()
    {
        //$(backdrop).remove()
        Roo.select('.open',true).each(function(aa) {
            
            aa.removeClass('open');
          //var parent = getParent($(this))
          //var relatedTarget = { relatedTarget: this }
          
           //$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
          //if (e.isDefaultPrevented()) return
           //$parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    },
    addxtypeChild : function (tree, cntr) {
        var comp= Roo.bootstrap.Menu.superclass.addxtypeChild.call(this, tree, cntr);
          
        this.menuitems.add(comp);
        return comp;

    },
    getEl : function()
    {
        Roo.log(this.el);
        return this.el;
    }
});

 
 