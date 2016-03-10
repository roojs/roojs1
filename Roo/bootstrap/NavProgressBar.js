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
 * 
 * @constructor
 * Create a new nav progress bar
 * @param {Object} config The config object
 */

Roo.bootstrap.NavProgressBar = function(config){
    Roo.bootstrap.NavProgressBar.superclass.constructor.call(this, config);

    this.bullets = this.bullets || [];
   
//    Roo.bootstrap.NavProgressBar.register(this);
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
    
    bullets : [],
    barItems : [],
    
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.NavProgressBar.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag : 'ul',
            cls: 'roo-navigation-bar' 
        }
        
        return cfg;
        
    },
    
    onRender : function(ct, position) 
    {
        Roo.bootstrap.NavProgressBar.superclass.onRender.call(this, ct, position);
        
        if(this.bullets.length){
            Roo.each(this.bullets, function(b){
               this.addItem(b);
            }, this);
        }
        
    },
    
    addItem : function(cfg)
    {
        var item = new Roo.bootstrap.NavProgressItem(cfg);
        
        item.parentId = this.id;
        item.onRender(this.el, null);
        
        this.barItems.push(item);
        
        this.formatBullets();
        
        return item;
    },
    
    getActive : function()
    {
        var active = false;
        
        Roo.each(this.barItems, function(v){
            
            if (!v.isActive()) {
                return;
            }
            
            active = v;
            return false;
            
        });
        
        return active;
    },
    
    setActiveItem : function(item)
    {
        var prev = false;
        
        Roo.each(this.barItems, function(v){
            if (v.rid == item.rid) {
                return ;
            }
            
            if (v.isActive()) {
                v.setActive(false);
                prev = v;
            }
        });

        item.setActive(true);
        
        this.fireEvent('changed', this, item, prev);
    },
    
    getBarItem: function(rid)
    {
        var ret = false;
        
        Roo.each(this.barItems, function(e) {
            if (e.rid != rid) {
                return;
            }
            
            ret =  e;
            return false;
        });
        
        return ret;
    },
    
    indexOfItem : function(item)
    {
        var index = false;
        
        Roo.each(this.barItems, function(v, i){
            
            if (v.rid != item.rid) {
                return;
            }
            
            index = i;
            return false
        });
        
        return index;
    },
    
    setActiveNext : function()
    {
        var i = this.indexOfItem(this.getActive());
        
        if (i > this.items.length) {
            return;
        }
        
        this.setActiveItem(this.items[i+1]);
    },
    
    setActivePrev : function()
    {
        var i = this.indexOfItem(this.getActive());
        
        if (i  < 1) {
            return;
        }
        
        this.setActiveItem(this.items[i-1]);
    },
    
    formatBullets : function()
    {
        if(!this.barItems.length){
            return;
        }
        
        var width = 100 / this.barItems.length;
        
        Roo.each(this.barItems, function(i){
            i.el.setStyle('width', width + '%');
        }, this);
    }
    
    
    
//    indexOfNav : function(item)
//    {
//        var index = false;
//        
//        Roo.each(this.items, function(v,i){
//            
//            if (v != item) {
//                return;
//            }
//            
//            index = i;
//            return false
//        });
//        
//        return index;
//    },
//    
    /**
    * adds a Navigation item
    * @param {Roo.bootstrap.NavProgressItem} the NavProgressItem to add
    */
    
//    
//    /**
//    * register a Navigation item
//    * @param {Roo.bootstrap.NavItem} the navitem to add
//    */
//    register : function(item)
//    {
//        this.items.push(item);
//        item.navId = this.navId;
//    
//    },
//    
//    /**
//    * clear all the Navigation item
//    */
//   
//    clearAll : function()
//    {
//        this.items = [];
//        this.el.dom.innerHTML = '';
//    },
//    
//    getNavItem: function(tabId)
//    {
//        var ret = false;
//        Roo.each(this.items, function(e) {
//            if (e.tabId == tabId) {
//               ret =  e;
//               return false;
//            }
//            return true;
//            
//        });
//        return ret;
//    },
//    
//    setActiveNext : function()
//    {
//        var i = this.indexOfNav(this.getActive());
//        
//        if (i > this.items.length) {
//            return;
//        }
//        
//        this.setActiveItem(this.items[i+1]);
//    },
//    
//    setActivePrev : function()
//    {
//        var i = this.indexOfNav(this.getActive());
//        
//        if (i  < 1) {
//            return;
//        }
//        
//        this.setActiveItem(this.items[i-1]);
//    },
//    
//    clearWasActive : function(except) {
//        Roo.each(this.items, function(e) {
//            if (e.tabId != except.tabId && e.was_active) {
//               e.was_active = false;
//               return false;
//            }
//            return true;
//            
//        });
//    },
//    
//    getWasActive : function ()
//    {
//        var r = false;
//        Roo.each(this.items, function(e) {
//            if (e.was_active) {
//               r = e;
//               return false;
//            }
//            return true;
//            
//        });
//        return r;
//    }
    
    
});

// 
//Roo.apply(Roo.bootstrap.NavProgressBar, {
//    
//    groups: {},
//     /**
//    * register a Navigation Group
//    * @param {Roo.bootstrap.NavGroup} the navgroup to add
//    */
//    register : function(bar)
//    {
//        this.groups[bar.navId] = bar;
//	
//    },
//    /**
//    * fetch a Navigation Bar based on the navigation ID
//    * @param {string} the nav bar to add
//    * @returns {Roo.bootstrap.NavProgressBar} the nav bar
//    */
//    get: function(navId) 
//    {
//        if (typeof(this.groups[navId]) == 'undefined') {
//            return false;
//        }
//        
//        return this.groups[navId] ;
//    }
//    
//});

 