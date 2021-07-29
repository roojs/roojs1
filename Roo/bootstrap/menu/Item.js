 /**
 * @class Roo.bootstrap.menu.Item
 * @extends Roo.bootstrap.Component
 * @licence LGPL
 * Bootstrap MenuItem class
 * @cfg {Boolean} submenu default false - 
 * @cfg {String} html text of the item
 * @cfg {String} href the link
 * @cfg {Boolean} disabled  is the item disabled - default false 
 * @cfg {Boolean} preventDefault stop trigger click event to parent elements - default true
 * @cfg {String} fa  Font awesome icon
 * @cfg {String} pos (left|right) Submenu align to  default right 
 * @cfg {Roo.bootsrap.Menu} menu the child menu.
 
 * 
 * @constructor
 * Create a new Menu  Item
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
    active : false,    
    fa : false,
    pos : 'right',
    
    isContainer : false, // ?? only a <li drowdonw-menu-item">
    
    getAutoCreate : function()
    {
        
        if(this.isContainer){
            return {
                tag: 'li',
                cls: 'dropdown-menu-item '
            };
        }
        
        var ctag = {
            tag: 'span',
            cls : 'roo-menu-item-text',
            html : this.html
        };
        
        var anc = {
            tag : 'a',
            cls : 'dropdown-item',
            href : this.href || '#',
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
        
        if(this.disabled){
            cfg.cls +=  ' disabled' 
        }
        
        if(this.submenu){
            cfg.cls +=  'dropdown-submenu';
            
            if(this.pos == 'left'){
                cfg.cls +=  ' pull-left';
            }
        }
        anc.href = this.href || cfg.cn[0].href ;
        ctag.html = this.html || cfg.cn[0].html ;
        return cfg;
         
         
    },
    
    initEvents : function() 
    {
        if (this.parent().type == 'treeview') {
            this.el.select('a').on('click', this.onClick, this);
        }
        if (this.menu) {
            this.menu.parentType = this.xtype;
            this.menu.triggerEl = this.el;
            this.menu = this.addxtype(Roo.apply({}, this.menu));
        }
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

 

 