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
 * @cfg {Boolean} preventDefault do not trigger A href on clicks.
 * @cfg {Boolean} isContainer is it a container - just returns a drop down item..
 * @cfg {Boolean} active  used on sidebars to highlight active itesm
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
         * @param {Roo.bootstrap.MenuItem} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.MenuItem, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: true,
    isContainer : false,
    
    getAutoCreate : function(){
        
        if(this.isContainer){
            return {
                tag: 'li',
                cls: 'dropdown-menu-item'
            };
        }
        
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
        if (this.active) {
            cfg.cls += ' active';
        }
        
        
        
        cfg.cn[0].href = this.href || cfg.cn[0].href ;
        cfg.cn[0].html = this.html || cfg.cn[0].html ;
        return cfg;
    },
    
    initEvents: function() {
        if (this.parent().type == 'treeview') {
            this.el.select('a').on('click', this.onClick, this);
        }
        
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

 

 