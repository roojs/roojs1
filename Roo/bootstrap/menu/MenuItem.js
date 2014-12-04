/*
 * - LGPL
 *
 * menu item
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.MenuItem
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {String} html text of the item
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault (true | false) default true
 * 
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.MenuItem = function(config){
    Roo.bootstrap.menu.MenuItem.superclass.constructor.call(this, config);
//    this.addEvents({
//        // raw events
//        /**
//         * @event click
//         * The raw click event for the entire grid.
//         * @param {Roo.EventObject} e
//         */
//        "click" : true
//    });
};

Roo.extend(Roo.bootstrap.menu.MenuItem, Roo.bootstrap.Component,  {
    
    href : '',
    html : '',
    preventDefault: true,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'li',
            cn : [
                {
                    tag : 'a',
                    href : this.href || '#',
                    html : this.html
                }
            ]
        };
        
        return cfg;
        
    }
});

 

 