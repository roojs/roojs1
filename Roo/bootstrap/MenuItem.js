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
 * @cfg {String} fa favicon to show on left of menu item.
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
    active : false,
    fa: false,
    
    getAutoCreate : function(){
        
        if(this.isContainer){
            return {
                tag: 'li',
                cls: 'dropdown-menu-item'
            };
        }
        var ctag = {
            tag: 'span',
            html: 'Link'
        }
        
        var anc = {
            tag : 'a',
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
            cls: 'dropdown-menu-item',
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

 

 