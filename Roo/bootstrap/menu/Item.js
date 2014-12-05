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
 * @cfg {String} icon Font awesome icon
 * @cfg {String} pos Submenu align to (left | right) default right 
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
    icon : false,
    pos : 'right',
    
    getAutoCreate : function()
    {
        var text = [
            {
                tag : 'span',
                cls : 'roo-menu-item-text',
                html : this.html
            }
        ];
        
        if(this.icon){
            text.unshift({
                tag : 'i',
                cls : 'fa ' + this.icon
            })
        }
        
        var cfg = {
            tag : 'li',
            cn : [
                {
                    tag : 'a',
                    href : this.href || '#',
                    cn : text
                }
            ]
        };
        
        if(this.disable){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'disabled' : (cfg.cls + ' disabled');
        }
        
        if(this.submenu){
            cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'dropdown-submenu' : (cfg.cls + ' dropdown-submenu');
            
            if(this.pos == 'left'){
                cfg.cls = (typeof(cfg.cls) == 'undefined') ? 'pull-left' : (cfg.cls + ' pull-left');
            }
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
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent("click", this, e);
    },
    
    onMouseOver : function(e)
    {
        if(this.submenu && this.pos == 'left'){
            this.el.select('ul.dropdown-menu', true).first().setLeft(this.el.select('ul.dropdown-menu', true).first().getWidth() * -1);
        }
        
        this.fireEvent("mouseover", this, e);
    },
    
    onMouseOut : function(e)
    {
        this.fireEvent("mouseout", this, e);
    }
});

 

 