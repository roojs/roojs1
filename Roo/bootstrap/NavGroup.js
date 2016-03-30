/*
 * - LGPL
 *
 * nav group
 * 
 */

/**
 * @class Roo.bootstrap.NavGroup
 * @extends Roo.bootstrap.Component
 * Bootstrap NavGroup class
 * @cfg {String} align (left|right)
 * @cfg {Boolean} inverse
 * @cfg {String} type (nav|pills|tab) default nav
 * @cfg {String} navId - reference Id for navbar.

 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */

Roo.bootstrap.NavGroup = function(config){
    Roo.bootstrap.NavGroup.superclass.constructor.call(this, config);
    this.navItems = [];
   
    Roo.bootstrap.NavGroup.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavGroup} this
	     * @param {Roo.bootstrap.Navbar.Item} selected The item selected
	     * @param {Roo.bootstrap.Navbar.Item} prev The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.NavGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    type: 'nav',
    navId : '',
    // private
    
    navItems : false, 
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.NavGroup.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'nav' 
        };
        
        if (['tabs','pills'].indexOf(this.type)!==-1) {
            cfg.cls += ' nav-' + this.type
        } else {
            if (this.type!=='nav') {
                Roo.log('nav type must be nav/tabs/pills')
            }
            cfg.cls += ' navbar-nav'
        }
        
        if (this.parent().sidebar) {
            cfg = {
                tag: 'ul',
                cls: 'dashboard-menu sidebar-menu'
            }
            
            return cfg;
        }
        
        if (this.form === true) {
            cfg = {
                tag: 'form',
                cls: 'navbar-form'
            }
            
            if (this.align === 'right') {
                cfg.cls += ' navbar-right';
            } else {
                cfg.cls += ' navbar-left';
            }
        }
        
        if (this.align === 'right') {
            cfg.cls += ' navbar-right';
        }
        
        if (this.inverse) {
            cfg.cls += ' navbar-inverse';
            
        }
        
        
        return cfg;
    },
    /**
    * sets the active Navigation item
    * @param {Roo.bootstrap.NavItem} the new current navitem
    */
    setActiveItem : function(item)
    {
        var prev = false;
        Roo.each(this.navItems, function(v){
            if (v == item) {
                return ;
            }
            if (v.isActive()) {
                v.setActive(false, true);
                prev = v;
                
            }
            
        });

        item.setActive(true, true);
        this.fireEvent('changed', this, item, prev);
        
        
    },
    /**
    * gets the active Navigation item
    * @return {Roo.bootstrap.NavItem} the current navitem
    */
    getActive : function()
    {
        
        var prev = false;
        Roo.each(this.navItems, function(v){
            
            if (v.isActive()) {
                prev = v;
                
            }
            
        });
        return prev;
    },
    
    indexOfNav : function()
    {
        
        var prev = false;
        Roo.each(this.navItems, function(v,i){
            
            if (v.isActive()) {
                prev = i;
                
            }
            
        });
        return prev;
    },
    /**
    * adds a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    addItem : function(cfg)
    {
        var cn = new Roo.bootstrap.NavItem(cfg);
        this.register(cn);
        cn.parentId = this.id;
        cn.onRender(this.el, null);
        return cn;
    },
    /**
    * register a Navigation item
    * @param {Roo.bootstrap.NavItem} the navitem to add
    */
    register : function(item)
    {
        this.navItems.push( item);
        item.navId = this.navId;
    
    },
    
    /**
    * clear all the Navigation item
    */
   
    clearAll : function()
    {
        this.navItems = [];
        this.el.dom.innerHTML = '';
    },
    
    getNavItem: function(tabId)
    {
        var ret = false;
        Roo.each(this.navItems, function(e) {
            if (e.tabId == tabId) {
               ret =  e;
               return false;
            }
            return true;
            
        });
        return ret;
    },
    
    setActiveNext : function()
    {
        var i = this.indexOfNav(this.getActive());
        if (i > this.navItems.length) {
            return;
        }
        this.setActiveItem(this.navItems[i+1]);
    },
    setActivePrev : function()
    {
        var i = this.indexOfNav(this.getActive());
        if (i  < 1) {
            return;
        }
        this.setActiveItem(this.navItems[i-1]);
    },
    clearWasActive : function(except) {
        Roo.each(this.navItems, function(e) {
            if (e.tabId != except.tabId && e.was_active) {
               e.was_active = false;
               return false;
            }
            return true;
            
        });
    },
    getWasActive : function ()
    {
        var r = false;
        Roo.each(this.navItems, function(e) {
            if (e.was_active) {
               r = e;
               return false;
            }
            return true;
            
        });
        return r;
    }
    
    
});

 
Roo.apply(Roo.bootstrap.NavGroup, {
    
    groups: {},
     /**
    * register a Navigation Group
    * @param {Roo.bootstrap.NavGroup} the navgroup to add
    */
    register : function(navgrp)
    {
        this.groups[navgrp.navId] = navgrp;
	
    },
    /**
    * fetch a Navigation Group based on the navigation ID
    * @param {string} the navgroup to add
    * @returns {Roo.bootstrap.NavGroup} the navgroup 
    */
    get: function(navId) {
        if (typeof(this.groups[navId]) == 'undefined') {
            return false;
            //this.register(new Roo.bootstrap.NavGroup({ navId : navId }));
        }
        return this.groups[navId] ;
    }
    
    
    
});

 