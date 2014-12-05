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
 * @cfg {Boolean} disable (true | false) default false
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
    disable : false,
    
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
        Roo.log(this.disable);
        if(this.disable){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'disabled' : (cfg.cls + ' disabled');
        }
        
        if(this.submenu){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'dropdown-submenu' : (cfg.cls + ' dropdown-submenu');
        }
        
        return cfg;
    },
    
    initEvents : function() 
    {
        this.el.on('mouseover', this.onMouseOver, this);
        this.el.on('mouseout', this.onMouseOut, this);
        
        this.el.select('a', true).first().on('click', this.onClick, this);
        
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

 

 