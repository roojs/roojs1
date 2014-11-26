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
 * @cfg {String} align left | right
 * @cfg {Boolean} inverse false | true
 * @cfg {String} type (nav|pills|tab) default nav
 * @cfg {String} navId - reference Id for navbar.

 * 
 * @constructor
 * Create a new nav group
 * @param {Object} config The config object
 */
Roo.bootstrap.dash = Roo.bootstrap.dash || {};
Roo.bootstrap.dash.TabGroup = function(config){
    Roo.bootstrap.dash.TabGroup.superclass.constructor.call(this, config);
    this.tabItems = [];
    //Roo.bootstrap.NavGroup.register(this);
     this.addEvents({
        /**
	     * @event changed
	     * Fires when the active item changes
	     * @param {Roo.bootstrap.NavGroup} this
	     * @param {Roo.bootstrap.Navbar.Item} item The item selected
	     * @param {Roo.bootstrap.Navbar.Item} item The previously selected item 
         */
        'changed': true
     });
    
};

Roo.extend(Roo.bootstrap.dash.TabGroup, Roo.bootstrap.Component,  {
    
    align: '',
    inverse: false,
    form: false,
    type: 'nav',
    navId : '',
    // private
    
    tabItems : false,
    
    getAutoCreate : function()
    {
        
        
        cfg = {
            tag : 'ul',
            cls: 'nav nav-tabs pull-right' 
        }
          
        
        return cfg;
    },
    
    // setActiveItem : function(item)
    // {
    //     var prev = false;
    //     Roo.each(this.navItems, function(v){
    //         if (v == item) {
    //             return ;
    //         }
    //         if (v.isActive()) {
    //             v.setActive(false, true);
    //             prev = v;
                
    //         }
            
    //     });

    //     item.setActive(true, true);
    //     this.fireEvent('changed', this, item, prev);
        
        
    // },
    
    // addItem : function(cfg)
    // {
    //     var cn = new Roo.bootstrap.NavItem(cfg);
    //     this.register(cn);
    //     cn.parentId = this.id;
    //     cn.onRender(this.el, null);
    //     return cn;
    // },
    
    // register : function(item)
    // {
    //     this.navItems.push( item);
    //     item.navId = this.navId;
    
    // },
    // getNavItem: function(tabId)
    // {
    //     var ret = false;
    //     Roo.each(this.navItems, function(e) {
    //         if (e.tabId == tabId) {
    //            ret =  e;
    //            return false;
    //         }
    //         return true;
            
    //     });
    //     return ret;
    // }
    
    
    
    
});

 


 