/**
 * @class Roo.bootstrap.menu.Item
 * @extends Roo.bootstrap.Component
 * @children  Roo.bootstrap.Button Roo.bootstrap.ButtonUploader Roo.bootstrap.Row Roo.bootstrap.Column Roo.bootstrap.Container
 * @parent Roo.bootstrap.menu.Menu
 * @licence LGPL
 * Bootstrap MenuItem class
 * 
 * @cfg {String} html the menu label
 * @cfg {String} href the link
 * @cfg {Boolean} preventDefault do not trigger A href on clicks (default false).
 * @cfg {Boolean} isContainer is it a container - just returns a drop down item..
 * @cfg {Boolean} active  used on sidebars to highlight active itesm
 * @cfg {String} fa favicon to show on left of menu item.
 * @cfg {Roo.bootsrap.Menu} menu the child menu.
 * 
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Item = function(config){
    Roo.bootstrap.menu.Item.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.bootstrap.menu.Item} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.menu.Item, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    preventDefault: false,
    isContainer : false,
    active : false,
    fa: false,
    
    getAutoCreate : function(){
        
        if(this.isContainer){
            return {
                tag: 'li',
                cls: 'roo-dropdown-menu-item '
            };
        }
        var ctag = {
            tag: 'span',
            html: 'Link'
        };
        
        var anc = {
            tag : 'a',
            cls : 'dropdown-item',
            href : '#',
            cn : [  ]
        };
        
        if (this.fa !== false) {
            anc.cn.push({
                tag : 'i',
                cls : 'fa fa-' + this.fa
            });
        }
        
        anc.cn.push(ctag);
        
        
        var cfg= {
            tag: 'li',
            cls: 'roo-dropdown-menu-item',
            cn: [ anc ]
        };
        if (this.parent().type == 'treeview') {
            cfg.cls = 'treeview-menu';
        }
        if (this.active) {
            cfg.cls += ' active';
        }
        
        
        
        anc.href = this.href || cfg.cn[0].href ;
        ctag.html = this.html || cfg.cn[0].html ;
        return cfg;
    },
    
    initEvents: function()
    {
        if (this.parent().type == 'treeview') {
            this.el.select('a').on('click', this.onClick, this);
        }
        
        if (this.menu) {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.menu = this.addxtype(Roo.apply({}, this.menu));
        }
        
    },
    onClick : function(e)
    {
        //Roo.log('item on click ');
        
        if(this.href === false || this.preventDefault){
            e.preventDefault();
        }
        //this.parent().hideMenuItems();
        
        this.fireEvent('click', this, e);
    },
    getEl : function()
    {
        return this.el;
    } 
});

 

 

 