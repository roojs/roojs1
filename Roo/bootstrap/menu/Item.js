/*
 * - LGPL
 *
 * menu item
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Item
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {Boolean} submenu (true | false) default false
 * @cfg {String} html text of the item
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault (true | false) default true
 * 
 * 
 * @constructor
 * Create a new Item
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Item = function(config){
    Roo.bootstrap.menu.Item.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event mouseover
         * Fires when the mouse is hovering over this menu
         * @param {Roo.bootstrap.menu.Item} this
         * @param {Roo.EventObject} e
         */
        mouseover : true,
        /**
         * @event mouseout
         * Fires when the mouse exits this menu
         * @param {Roo.bootstrap.menu.Item} this
         * @param {Roo.EventObject} e
         */
        mouseout : true,
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        click : true
    });
};

Roo.extend(Roo.bootstrap.menu.Item, Roo.bootstrap.Component,  {
    
    submenu : false,
    href : '',
    html : '',
    preventDefault: true,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'li',
            cls : (this.submenu) ? 'dropdown-submenu' : '',
            cn : [
                {
                    tag : 'a',
                    href : this.href || '#',
                    html : this.html
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents : function() 
    {
        this.el.on('mouseover', this.onMouseOver, this);
        this.el.on('mouseout', this.onMouseOut, this);
        this.el.on('click', this.onClick, this);
        
    },
    
    onClick : function(e)
    {
        this.fireEvent("click", this, e);
    },
    
    onMouseOver : function(e)
    {
        this.fireEvent("mouseover", this, e);
    },
    
    onMouseOut : function(e)
    {
        this.fireEvent("mouseout", this, e);
    }
});

 

 