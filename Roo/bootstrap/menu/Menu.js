 
/**
 * @class Roo.bootstrap.menu.Menu
 * @extends Roo.bootstrap.Component
 * @licence LGPL
 * @children Roo.bootstrap.menu.Item Roo.bootstrap.menu.Separator
 * @parent none
 * Bootstrap Menu class - container for MenuItems - normally has to be added to a object that supports the menu property
 * 
 * @cfg {String} type (dropdown|treeview|submenu) type of menu
 * @cfg {bool} hidden  if the menu should be hidden when rendered.
 * @cfg {bool} stopEvent (true|false)  Stop event after trigger press (default true)
 * @cfg {bool} isLink (true|false)  the menu has link disable auto expand and collaspe (default false)
* @cfg {bool} hideTrigger (true|false)  default false - hide the carret for trigger.
* @cfg {String} align  default tl-bl? == below  - how the menu should be aligned. 
 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config objectQ
 */


Roo.bootstrap.menu.Menu = function(config){
    
    if (config.type == 'treeview') {
	// normally menu's are drawn attached to the document to handle layering etc..
	// however treeview (used by the docs menu is drawn into the parent element)
	this.container_method = 'getChildContainer'; 
    }
    
    Roo.bootstrap.menu.Menu.superclass.constructor.call(this, config);
    if (this.registerMenu && this.type != 'treeview')  {
        Roo.bootstrap.menu.Manager.register(this);
    }
    
    
    this.addEvents({
        /**
         * @event beforeshow
         * Fires before this menu is displayed (return false to block)
         * @param {Roo.menu.Menu} this
         */
        beforeshow : true,
        /**
         * @event beforehide
         * Fires before this menu is hidden (return false to block)
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

Roo.extend(Roo.bootstrap.menu.Menu, Roo.bootstrap.Component,  {
    
   /// html : false,
   
    triggerEl : false,  // is this set by component builder? -- it should really be fetched from parent()???
    type: false,
    /**
     * @cfg {Boolean} registerMenu True (default) - means that clicking on screen etc. hides it.
     */
    registerMenu : true,
    
    menuItems :false, // stores the menu items..
    
    hidden:true,
        
    parentMenu : false,
    
    stopEvent : true,
    
    isLink : false,
    
    container_method : 'getDocumentBody', // so the menu is rendered on the body and zIndex works.
    
    hideTrigger : false,
    
    align : 'tl-bl?',
    
    
    getChildContainer : function() {
        return this.el;  
    },
    
    getAutoCreate : function(){
	 
        //if (['right'].indexOf(this.align)!==-1) {
        //    cfg.cn[1].cls += ' pull-right'
        //}
         
        var cfg = {
            tag : 'ul',
            cls : 'dropdown-menu shadow' ,
            style : 'z-index:1000'
            
        };
	
        if (this.type === 'submenu') {
            cfg.cls = 'submenu active';
        }
        if (this.type === 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        
        return cfg;
    },
    initEvents : function() {
        
       // Roo.log("ADD event");
       // Roo.log(this.triggerEl.dom);
        if (this.triggerEl) {
            
            this.triggerEl.on('click', this.onTriggerClick, this);
            
            this.triggerEl.on(Roo.isTouch ? 'touchstart' : 'mouseup', this.onTriggerPress, this);
            
            if (!this.hideTrigger) {
                if (this.triggerEl.hasClass('nav-item') && this.triggerEl.select('.nav-link',true).length) {
                    // dropdown toggle on the 'a' in BS4?
                    this.triggerEl.select('.nav-link',true).first().addClass(['dropdown-toggle','dropdown-item']);
                } else {
                    this.triggerEl.addClass(['dropdown-toggle', 'dropdown-item']);
                }
            }
        }
        
        if (Roo.isTouch) {
            this.el.on('touchstart'  , this.onTouch, this);
        }
        this.el.on('click' , this.onClick, this);

        this.el.on("mouseover", this.onMouseOver, this);
        this.el.on("mouseout", this.onMouseOut, this);
        
    },
    
    findTargetItem : function(e)
    {
        var t = e.getTarget(".roo-dropdown-menu-item", this.el,  true);
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
    
    onTouch : function(e) 
    {
        Roo.log("menu.onTouch");
        //e.stopEvent(); this make the user popdown broken
        this.onClick(e);
    },
    
    onClick : function(e)
    {
        Roo.log("menu.onClick");
        
        var t = this.findTargetItem(e);
        if(!t || t.isContainer){
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
        
        var _this = this;
        
        if(!t.href.length || t.href == '#'){
            (function() { _this.hide(); }).defer(100);
        }
        
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
        return !this.hidden;
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
    show : function(el, pos, parentMenu)
    {
        if (false === this.fireEvent("beforeshow", this)) {
	    Roo.log("show canceled");
	    return;
	}
	this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }
        this.el.addClass('show'); // show otherwise we do not know how big we are..
	 
	var xy = this.el.getAlignToXY(el, pos);
	
	// bl-tl << left align  below
	// tl-bl << left align 
	
	if(this.el.getWidth() + xy[0] >= Roo.lib.Dom.getViewWidth()){
	    // if it goes to far to the right.. -> align left.
	    xy = this.el.getAlignToXY(el, this.align.replace('/l/g', 'r'))
        }
	if(xy[0] < 0){
	    // was left align - go right?
	    xy = this.el.getAlignToXY(el, this.align.replace('/r/g', 'l'))
        }
	
	// goes down the bottom
        if(this.el.getHeight() + xy[1] >= Roo.lib.Dom.getViewHeight() ||
	   xy[1]  < 0 ){
	    var a = this.align.replace('?', '').split('-');
	    xy = this.el.getAlignToXY(el, a[1]  + '-' + a[0] + '?')
	    
        }
        
        this.showAt(  xy , parentMenu, false);
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
        
        //this.el.show();
        this.hideMenuItems();
        this.hidden = false;
	if (this.triggerEl) {
	    this.triggerEl.addClass('open');
	}
        
	this.el.addClass('show');
        
	
	
        // reassign x when hitting right
        
        // reassign y when hitting bottom
        
        // but the list may align on trigger left or trigger top... should it be a properity?
        
        if(this.el.getStyle('top') != 'auto' && this.el.getStyle('top').slice(-1) != "%"){
            this.el.setXY(xy);
        }
        
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
    hide : function(deep)
    {
        if (false === this.fireEvent("beforehide", this)) {
            Roo.log("hide canceled");
            return;
        }
        this.hideMenuItems();
        if(this.el && this.isVisible()){
           
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            if (this.triggerEl) {
                this.triggerEl.removeClass('open');
            }
            
            this.el.removeClass('show');
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(deep === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    },
    
    onTriggerClick : function(e)
    {
        Roo.log('trigger click');
        
        var target = e.getTarget();
        
        Roo.log(target.nodeName.toLowerCase());
        
        if(target.nodeName.toLowerCase() === 'i'){
            e.preventDefault();
        }
        
    },
    
    onTriggerPress  : function(e)
    {
        Roo.log('trigger press');
        //Roo.log(e.getTarget());
       // Roo.log(this.triggerEl.dom);
       
        // trigger only occurs on normal menu's -- if it's a treeview or dropdown... do not hide/show..
        var pel = Roo.get(e.getTarget());
        if (pel.findParent('.dropdown-menu') || pel.findParent('.treeview-menu') ) {
            Roo.log('is treeview or dropdown?');
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() !== 'i' && this.isLink){
            return;
        }
        
        if (this.isVisible()) {
            Roo.log('hide');
            this.hide();
        } else {
            Roo.log('show');
            
            this.show(this.triggerEl, this.align, false);
        }
        
        if(this.stopEvent || e.getTarget().nodeName.toLowerCase() === 'i'){
            e.stopEvent();
        }
        
    },
       
    
    hideMenuItems : function()
    {
        Roo.log("hide Menu Items");
        if (!this.el) { 
            return;
        }
        
        this.el.select('.open',true).each(function(aa) {
            
            aa.removeClass('open');
         
        });
    },
    addxtypeChild : function (tree, cntr) {
        var comp= Roo.bootstrap.menu.Menu.superclass.addxtypeChild.call(this, tree, cntr);
          
        this.menuitems.add(comp);
        return comp;

    },
    getEl : function()
    {
        Roo.log(this.el);
        return this.el;
    },
    
    clear : function()
    {
        this.getEl().dom.innerHTML = '';
        this.menuitems.clear();
    }
});

 
 