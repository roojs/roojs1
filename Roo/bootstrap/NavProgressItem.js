/*
 * - LGPL
 *
 * Nav Progress Item
 * 
 */

/**
 * @class Roo.bootstrap.NavProgressItem
 * @extends Roo.bootstrap.Component
 * Bootstrap NavProgressItem class
 * @cfg {String} rid the reference id
 * @cfg {Boolean} active (true|false) Is item active default false
 * @cfg {Boolean} disabled (true|false) Is item active default false
 * @cfg {String} html
 * @cfg {String} position (top|bottom) text position default bottom
 * @cfg {String} icon show icon instead of number
 * @cfg {Boolean} forceIcon (true|false) true to force show icon..if set to false, Roo.isTouch showing icon, otherwish number
 * 
 * @constructor
 * Create a new NavProgressItem
 * @param {Object} config The config object
 */
Roo.bootstrap.NavProgressItem = function(config){
    Roo.bootstrap.NavProgressItem.superclass.constructor.call(this, config);
    this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.bootstrap.NavProgressItem} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
   
};

Roo.extend(Roo.bootstrap.NavProgressItem, Roo.bootstrap.Component,  {
    
    rid : '',
    active : false,
    disabled : false,
    html : '',
    position : 'bottom',
    icon : false,
    forceIcon : false,
    
    getAutoCreate : function()
    {
        var iconCls = 'roo-navigation-bar-item-icon';
        
        if((this.forceIcon && this.icon) || !this.forceIcon && Roo.isTouch){
            iconCls += ' ' + this.icon;
        }
        
        var cfg = {
            tag: 'li',
            cls: 'roo-navigation-bar-item',
            cn : [
                {
                    tag : 'i',
                    cls : iconCls
                },
                {
                    tag : 'span',
                    cls : 'roo-navigation-bar-item-text ' + this.position,
                    html : this.html
                }
            ]
        }
        
        if(this.active){
            cfg.cls += ' active';
        }
        if(this.disabled){
            cfg.cls += ' disabled';
        }
        
        return cfg;
    },
    
    render : function(container, position){
        if(!this.rendered && this.fireEvent("beforerender", this) !== false){
            if(!container && this.el){
                this.el = Roo.get(this.el);
                container = this.el.dom.parentNode;
                this.allowDomMove = false;
            }
            this.container = Roo.get(container);
            this.rendered = true;
            if(position !== undefined){
                if(typeof position == 'number'){
                    position = this.container.dom.childNodes[position];
                }else{
                    position = Roo.getDom(position);
                }
            }
            this.onRender(container, position || null);
            if(this.cls){
                this.el.addClass(this.cls);
                delete this.cls;
            }
            if(this.style){
                this.el.applyStyles(this.style);
                delete this.style;
            }
            this.fireEvent("render", this);
            this.afterRender(this.container);
            if(this.hidden){
                this.hide();
            }
            if(this.disabled){
                this.disable();
            }
        }
        return this;
    },
    
    initEvents: function() 
    {
        this.iconEl = this.el.select('.roo-navigation-bar-item-icon', true).first();
        this.textEl = this.el.select('.roo-navigation-bar-item-text', true).first();
        
        if(Roo.isTouch){
            this.textEl.setVisibilityMode(Roo.Element.DISPLAY).hide();
        }
        
        this.iconEl.on('click', this.onClick, this);
        
    },
    
    onClick : function(e)
    {
        e.preventDefault();
        
        if(this.disabled){
            return;
        }
        
        if(this.fireEvent('click', this, e) === false){
            return;
        };
        
        this.parent().setActiveItem(this);
    },
    
    isActive: function () 
    {
        return this.active;
    },
    
    setActive : function(state)
    {
        if(this.active == state){
            return;
        }
        
        this.active = state;
        
        if (state) {
            this.el.addClass('active');
            return;
        }
        
        this.el.removeClass('active');
        
        return;
    },
    
    setDisabled : function(state)
    {
        if(this.disabled == state){
            return;
        }
        
        this.disabled = state;
        
        if (state) {
            this.el.addClass('disabled');
            return;
        }
        
        this.el.removeClass('disabled');
    },
    
    tooltipEl : function()
    {
        return this.el.select('.roo-navigation-bar-item-icon', true).first();;
    }
});
 

 