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
 * @class Roo.bootstrap.NavSidebarItem
 * @extends Roo.bootstrap.NavItem
 * Bootstrap Navbar.NavSidebarItem class
 * {String} badgeWeight (default|primary|success|info|warning|danger)the extra classes for the badge
 * @constructor
 * Create a new Navbar Button
 * @param {Object} config The config object
 */
Roo.bootstrap.NavSidebarItem = function(config){
    Roo.bootstrap.NavSidebarItem.superclass.constructor.call(this, config);
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
	    * @param {Roo.bootstrap.NavSidebarItem} this
	    * @param {boolean} state the new state
	     
         */
        'changed': true
    });
   
};

Roo.extend(Roo.bootstrap.NavSidebarItem, Roo.bootstrap.NavItem,  {
    
    badgeWeight : 'default',
    
    getAutoCreate : function(){
        
        
        var a = {
                tag: 'a',
                href : this.href || '#',
                cls: '',
                html : '',
                cn : []
        };
        var cfg = {
            tag: 'li',
            cls: '',
            cn: [ a ]
        };
        var span = {
            tag: 'span',
            html : this.html || ''
        };
        
        
        if (this.active) {
            cfg.cls += ' active';
        }
        
        if (this.disabled) {
            cfg.cls += ' disabled';
        }
        
        // left icon..
        if (this.glyphicon || this.icon) {
            var c = this.glyphicon  ? ('glyphicon glyphicon-'+this.glyphicon)  : this.icon;
            a.cn.push({ tag : 'i', cls : c }) ;
        }
        // html..
        a.cn.push(span);
        // then badge..
        if (this.badge !== '') {
            
            a.cn.push({ tag: 'span',  cls : 'badge pull-right badge-' + this.badgeWeight, html: this.badge }); 
        }
        // fi
        if (this.menu) {
            a.cn.push({ tag : 'i', cls : 'glyphicon glyphicon-chevron-down pull-right'});
            a.cls += 'dropdown-toggle treeview' ;
            
        }
        
        
        
        return cfg;
         
	   
    },
    
    initEvents : function()
    { 
        if (typeof (this.menu) != 'undefined') {
            this.menu.type = 'treeview';
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
        
        this.fireEvent('click', this);
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
 

 