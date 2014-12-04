/*
 * - LGPL
 *
 * menu
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Menu
 * @extends Roo.bootstrap.Component
 * Bootstrap Menu class - container for MenuItems
 * @cfg {Boolean} submenu (true | false) default false
 * @cfg {String} html Text of the menu
 * @cfg {String} weight (primary | success | info | warning | danger | inverse) default empty
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.Menu = function(config){
    Roo.bootstrap.Menu.superclass.constructor.call(this, config);
    
//    this.addEvents({
//        /**
//         * @event beforeshow
//         * Fires before this menu is displayed
//         * @param {Roo.menu.Menu} this
//         */
//        beforeshow : true,
//        /**
//         * @event beforehide
//         * Fires before this menu is hidden
//         * @param {Roo.menu.Menu} this
//         */
//        beforehide : true,
//        /**
//         * @event show
//         * Fires after this menu is displayed
//         * @param {Roo.menu.Menu} this
//         */
//        show : true,
//        /**
//         * @event hide
//         * Fires after this menu is hidden
//         * @param {Roo.menu.Menu} this
//         */
//        hide : true,
//        /**
//         * @event click
//         * Fires when this menu is clicked (or when the enter key is pressed while it is active)
//         * @param {Roo.menu.Menu} this
//         * @param {Roo.menu.Item} menuItem The menu item that was clicked
//         * @param {Roo.EventObject} e
//         */
//        click : true,
//        /**
//         * @event mouseover
//         * Fires when the mouse is hovering over this menu
//         * @param {Roo.menu.Menu} this
//         * @param {Roo.EventObject} e
//         * @param {Roo.menu.Item} menuItem The menu item that was clicked
//         */
//        mouseover : true,
//        /**
//         * @event mouseout
//         * Fires when the mouse exits this menu
//         * @param {Roo.menu.Menu} this
//         * @param {Roo.EventObject} e
//         * @param {Roo.menu.Item} menuItem The menu item that was clicked
//         */
//        mouseout : true,
//        /**
//         * @event itemclick
//         * Fires when a menu item contained in this menu is clicked
//         * @param {Roo.menu.BaseItem} baseItem The BaseItem that was clicked
//         * @param {Roo.EventObject} e
//         */
//        itemclick: true
//    });
    
};

Roo.extend(Roo.bootstrap.menu.Menu, Roo.bootstrap.Component,  {
    
    submenu : false,
    html : '',
    weight : '',
    
    
//    getChildContainer : function() {
//        return this.el;  
//    },
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'btn-group',
            cn : [
                {
                    tag : 'button',
                    cls : 'btn ' + ((this.weight) ? ('btn-' + this.weight) : '')
                },
                {
                    tag : 'button',
                    cls : 'dropdown-toggle btn ' + ((this.weight) ? ('btn-' + this.weight) : '')
                }
            ]
            
        };
	 
        //if (['right'].indexOf(this.align)!==-1) {
        //    cfg.cn[1].cls += ' pull-right'
        //}
        
        
        var cfg = {
            tag : 'ul',
            cls : 'dropdown-menu' ,
            style : 'z-index:1000'
            
        }
	
        if (this.type === 'submenu') {
            cfg.cls = 'submenu active';
        }
        if (this.type === 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        
        return cfg;
    }
});

 
 