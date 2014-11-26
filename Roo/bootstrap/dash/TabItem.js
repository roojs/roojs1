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
Roo.bootstrap.dash.TabItem = function(config){
    Roo.bootstrap.dash.TabItem.superclass.constructor.call(this, config);
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

Roo.extend(Roo.bootstrap.dash.TabItem, Roo.bootstrap.Component,  {
    
    title: '',
    // inverse: false,
    // form: false,
    // type: 'nav',
    // navId : '',
    // private
    
  
    getAutoCreate : function()
    {
        
        
        cfg = {
            tag: 'li',
            cls: '',
            html: null,
            cn : [{
                tag: 'a',
                href: '#',
                html: this.tab1_text ? this.tab1_text : 'tab1'
            }]
        }
          
        
        return cfg;
    },
    
    
});

 


 