/*
 * - LGPL
 *
 * menu item
 * 
 */


/**
 * @class Roo.bootstrap.MenuItem
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {String} html the menu label
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault (true | false) default true
 * 
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.MenuItem = function(config){
    Roo.bootstrap.MenuItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: true,
    
    getAutoCreate : function(){
        var cfg= {
            tag: 'li',
            cls: 'dropdown-menu-item',
            cn: [
                    {
                        tag : 'a',
                        href : '#',
                        html : 'Link'
                    }
                ]
        };
        if (this.parent().type == 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    },
    
    initEvents: function() {
        
        //this.el.select('a').on('click', this.onClick, this);
        
    },
    onClick : function(e)
    {
        Roo.log('item on click ');
        //if(this.preventDefault){
        //    e.preventDefault();
        //}
        //this.parent().hideMenuItems();
        
        this.fireEvent('click', this, e);
    },
    getEl : function()
    {
        return this.el;
    }
});

 

 