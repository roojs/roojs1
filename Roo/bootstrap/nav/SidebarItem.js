/*
 * - LGPL
 *
 * sidebar item
 *
 *  li
 *    <span> icon </span>
 *    <span> text </span>
 *    <span>badge </span>
 */

/**
 * @class Roo.bootstrap.nav.SidebarItem
 * @extends Roo.bootstrap.nav.Item
 * Bootstrap Navbar.NavSidebarItem class
 * 
 * {String} badgeWeight (default|primary|success|info|warning|danger)the extra classes for the badge
 * {Boolean} open is the menu open
 * {Boolean} buttonView use button as the tigger el rather that a (default false)
 * {String} buttonWeight (default|primary|success|info|warning|danger)the extra classes for the button
 * {String} buttonSize (sm|md|lg)the extra classes for the button
 * {Boolean} showArrow show arrow next to the text (default true)
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.nav.SidebarItem = function(config){
    Roo.bootstrap.nav.SidebarItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
	 /**
	    * @event changed
	    * Fires when the active item active state changes
	    * @param {Roo.bootstrap.nav.SidebarItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.nav.SidebarItem, Roo.bootstrap.nav.Item,  {
    
    badgeWeight : 'default',
    
    open: false,
    
    buttonView : false,
    
    buttonWeight : 'default',
    
    buttonSize : 'md',
    
    showArrow : true,
    
    getAutoCreate : function(){
        
        
        var a = {
                tag: 'a',
                href : this.href || '#',
                cls: '',
                html : '',
                cn : []
        };
        
        if(this.buttonView){
            a = {
                tag: 'button',
                href : this.href || '#',
                cls: 'btn btn-' + this.buttonWeight + ' btn-' + this.buttonSize + 'roo-button-dropdown-toggle',
                html : this.html,
                cn : []
            };
        }
        
        var cfg = {
            tag: 'li',
            cls: '',
            cn: [ a ]
        };
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
        if (this.open) {
            cfg.cls += ' open x-open';
        }
        // left icon..
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            a.cn.push({ tag : 'i', cls : c }) ;
        }
        
        if(!this.buttonView){
            var span = {
                tag: 'span',
                html : this.html || ''
            };

            a.cn.push(span);
            
        }
        
        if (this.badge !== '') {
            a.cn.push({ tag: 'span',  cls : 'badge pull-right badge-' + this.badgeWeight, html: this.badge }); 
        }
        
        if (this.menu) {
            
            if(this.showArrow){
                a.cn.push({ tag : 'i', cls : 'glyphicon glyphicon-chevron-down pull-right'});
            }
            
            a.cls += ' dropdown-toggle treeview' ;
        }
        
        return cfg;
    },
    
    initEvents : function()
    { 
        if (typeof (this.menu) != 'undefined') {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.menu = this.addxtype(Roo.apply({}, this.menu));
        }
        
        this.el.on('click', this.onClick, this);
        
        if(this.badge !== ''){
            this.badgeEl = this.el.select('.badge', true).first().setVisibilityMode(Roo.Element.DISPLAY);
        }
        
    },
    
    onClick : function(e)
    {
        if(this.disabled){
            e.preventDefault();
            return;
        }
        
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
    },
    
    disable : function()
    {
        this.setDisabled(true);
    },
    
    enable : function()
    {
        this.setDisabled(false);
    },
    
    setDisabled : function(state)
    {
        if(this.disabled == state){
            return;
        }
        
        this.disabled = state;
        
        if (state) {
            this.el.addClass('disabled');
            return;
        }
        
        this.el.removeClass('disabled');
        
        return;
    },
    
    setActive : function(state)
    {
        if(this.active == state){
            return;
        }
        
        this.active = state;
        
        if (state) {
            this.el.addClass('active');
            return;
        }
        
        this.el.removeClass('active');
        
        return;
    },
    
    isActive: function () 
    {
        return this.active;
    },
    
    setBadge : function(str)
    {
        if(!this.badgeEl){
            return;
        }
        
        this.badgeEl.dom.innerHTML = str;
    }
    
   
     
 
});
 

 