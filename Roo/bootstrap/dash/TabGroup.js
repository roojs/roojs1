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
    
    title: '',
    // inverse: false,
    // form: false,
    // type: 'nav',
    // navId : '',
    // private
    
    tabItems : false,
    
    getAutoCreate : function()
    {
        
        Roo.log('');
        cfg = {
            tag : 'ul',
            cls: 'nav nav-tabs pull-right' ,
            cn: [{
                tag: 'span',
                cls: 'pull-left header',
                html: this.title ? this.title : 'Title',
            }]
        }
          
        
        return cfg;
    },
    
    
});

 


 