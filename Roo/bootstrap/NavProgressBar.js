/*
 * - LGPL
 *
 * nav progress bar
 * 
 */

/**
 * @class Roo.bootstrap.NavProgressBar
 * @extends Roo.bootstrap.Component
 * Bootstrap NavProgressBar class
 * @cfg {String} navId - reference Id for navbar.
 * 
 * @constructor
 * Create a new nav progress bar
 * @param {Object} config The config object
 */

Roo.bootstrap.NavProgressBar = function(config){
    Roo.bootstrap.NavProgressBar.superclass.constructor.call(this, config);
    this.items = [];
   
    Roo.bootstrap.NavProgressBar.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavProgressBar} this
	     * @param {Roo.bootstrap.NavProgressItem} selected The item selected
	     * @param {Roo.bootstrap.NavProgressItem} prev The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.NavProgressBar, Roo.bootstrap.Component,  {
    
    items : [],
    navId : '',
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.NavProgressBar.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'roo-navigation-bar' 
        }
        
        return cfg;
    },
    
    /**
    * sets the active Navigation item
    * @param {Roo.bootstrap.NavProgressItem} the new current navitem
    */
    setActiveItem : function(item)
    {
        var prev = false;
        Roo.each(this.items, function(v){
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
    * @return {Roo.bootstrap.NavProgressItem} the current navitem
    */
    getActive : function()
    {
        var active = false;
        
        Roo.each(this.items, function(v){
            
            if (!v.isActive()) {
                return;
            }
            
            active = v;
            return false;
            
        });
        
        return active;
    },
    
    indexOfNav : function(item)
    {
        var index = false;
        
        Roo.each(this.items, function(v,i){
            
            if (v != item) {
                return;
            }
            
            index = i;
            return false
        });
        
        return index;
    },
    
    /**
    * adds a Navigation item
    * @param {Roo.bootstrap.NavProgressItem} the NavProgressItem to add
    */
    addItem : function(cfg)
    {
        var cn = new Roo.bootstrap.NavProgressItem(cfg);
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
        this.items.push(item);
        item.navId = this.navId;
    
    },
    
    /**
    * clear all the Navigation item
    */
   
    clearAll : function()
    {
        this.items = [];
        this.el.dom.innerHTML = '';
    },
    
    getNavItem: function(tabId)
    {
        var ret = false;
        Roo.each(this.items, function(e) {
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

 