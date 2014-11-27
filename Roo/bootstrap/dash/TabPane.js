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
Roo.bootstrap.dash.TabPane = function(config){
    Roo.bootstrap.dash.TabPane.superclass.constructor.call(this, config);
    
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

Roo.extend(Roo.bootstrap.dash.TabPane, Roo.bootstrap.Component,  {
    
    //text: '',
    // inverse: false,
    // form: false,
    // type: 'nav',
    // navId : '',
    // private
    
  
    getAutoCreate : function()
    {
        
        Roo.log(this);
        cfg = {
            tag: 'div',
            cls: 'tab-content no-padding',
            html: null
        }
          
        
        return cfg;
    },
    
    
});

 


 