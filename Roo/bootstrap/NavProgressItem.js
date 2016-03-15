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
    
    getAutoCreate : function()
    {
        var iconCls = 'roo-navigation-bar-item-icon';
        
        Roo.log(this.icon);
        
        if(this.icon){
            iconCls += ((this.icon) ? (' ' + this.icon) : (' step-number')) ;
        }
        Roo.log(iconCls);
        var cfg = {
            tag: 'li',
            cls: 'roo-navigation-bar-item',
            cn : [
                {
                    tag : 'i',
                    cls : iconCls
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
    
    disable : function()
    {
        this.setDisabled(true);
    },
    
    enable : function()
    {
        this.setDisabled(false);
    },
    
    initEvents: function() 
    {
        this.iconEl = this.el.select('.roo-navigation-bar-item-icon', true).first();
        
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
 

 