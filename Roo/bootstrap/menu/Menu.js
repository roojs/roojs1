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
 * Bootstrap Menu class - container for Menu
 * @cfg {String} html Text of the menu
 * @cfg {String} weight (default | primary | success | info | warning | danger | inverse)
 * @cfg {String} icon Font awesome icon
 * @cfg {String} pos Menu align to (top | bottom) default bottom
 * 
 * 
 * @constructor
 * Create a new Menu
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Menu = function(config){
    Roo.bootstrap.menu.Menu.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event beforeshow
         * Fires before this menu is displayed
         * @param {Roo.bootstrap.menu.Menu} this
         */
        beforeshow : true,
        /**
         * @event beforehide
         * Fires before this menu is hidden
         * @param {Roo.bootstrap.menu.Menu} this
         */
        beforehide : true,
        /**
         * @event show
         * Fires after this menu is displayed
         * @param {Roo.bootstrap.menu.Menu} this
         */
        show : true,
        /**
         * @event hide
         * Fires after this menu is hidden
         * @param {Roo.bootstrap.menu.Menu} this
         */
        hide : true,
        /**
         * @event click
         * Fires when this menu is clicked (or when the enter key is pressed while it is active)
         * @param {Roo.bootstrap.menu.Menu} this
         * @param {Roo.EventObject} e
         */
        click : true
    });
    
};

Roo.extend(Roo.bootstrap.menu.Menu, Roo.bootstrap.Component,  {
    
    submenu : false,
    html : '',
    weight : 'default',
    icon : false,
    pos : 'bottom',
    
    
    getChildContainer : function() {
        if(this.isSubMenu){
            return this.el;
        }
        
        return this.el.select('ul.dropdown-menu', true).first();  
    },
    
    getAutoCreate : function()
    {
        var text = [
            {
                tag : 'span',
                cls : 'roo-menu-text',
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
            tag : 'div',
            cls : 'btn-group',
            cn : [
                {
                    tag : 'button',
                    cls : 'dropdown-button btn btn-' + this.weight,
                    cn : text
                },
                {
                    tag : 'button',
                    cls : 'dropdown-toggle btn btn-' + this.weight,
                    cn : [
                        {
                            tag : 'span',
                            cls : 'caret'
                        }
                    ]
                },
                {
                    tag : 'ul',
                    cls : 'dropdown-menu'
                }
            ]
            
        };
        
        if(this.pos == 'top'){
            cfg.cls += ' dropup';
        }
        
        if(this.isSubMenu){
            cfg = {
                tag : 'ul',
                cls : 'dropdown-menu'
            }
        }
	
        return cfg;
    },
    
    onRender : function(ct, position)
    {
        this.isSubMenu = ct.hasClass('dropdown-submenu');
        
        Roo.bootstrap.menu.Menu.superclass.onRender.call(this, ct, position);
    },
    
    initEvents : function() 
    {
        
        this.list().setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'none';
        
        if(this.isSubMenu){
            return;
        }
        
        this.hidden = true;
        
        this.triggerEl = this.el.select('button.dropdown-toggle', true).first();
        this.triggerEl.on('click', this.onTriggerPress, this);
        
        this.buttonEl = this.el.select('button.dropdown-button', true).first();
        this.buttonEl.on('click', this.onClick, this);
        
    },
    
    list : function()
    {
        if(this.isSubMenu){
            return this.el;
        }
        
        return this.el.select('ul.dropdown-menu', true).first();
    },
    
    onClick : function(e)
    {
        this.fireEvent("click", this, e);
    },
    
    onTriggerPress  : function(e)
    {   
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    },
    
    isVisible : function(){
        return !this.hidden;
    },
    
    show : function()
    {
        this.fireEvent("beforeshow", this);
        
        this.hidden = false;
//        this.el.addClass('open');
        
        this.list().show();
        
        Roo.get(document).on("mouseup", this.onMouseUp, this);
        
        this.fireEvent("show", this);
        
    },
    
    hide : function()
    {
        this.fireEvent("beforehide", this);
        
        this.hidden = true;
        this.el.removeClass('open');
        
        Roo.get(document).un("mouseup", this.onMouseUp);
        
        this.fireEvent("hide", this);
    },
    
    onMouseUp : function()
    {
        this.hide();
    }
    
});

 
 