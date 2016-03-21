/*
 * - LGPL
 *
 * Alert
 * 
 */

/**
 * @class Roo.bootstrap.Alert
 * @extends Roo.bootstrap.Component
 * Bootstrap Alert class
 * @cfg {String} title The title of alert
 * @cfg {String} html The content of alert
 * @cfg {String} weight (  success | info | warning | danger )
 * @cfg {String} faicon font-awesomeicon
 * 
 * @constructor
 * Create a new alert
 * @param {Object} config The config object
 */


Roo.bootstrap.Alert = function(config){
    Roo.bootstrap.Alert.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.Alert, Roo.bootstrap.Component,  {
    
    title: '',
    html: '',
    weight: false,
    faicon: false,
    
    getAutoCreate : function()
    {
        
        var cfg = {
            tag : 'div',
            cls : 'alert',
            cn : [
                {
                    tag : 'i',
                    cls : 'roo-alert-icon'
                    
                },
                {
                    tag : 'b',
                    cls : 'roo-alert-title',
                    html : this.title
                },
                {
                    tag : 'span',
                    cls : 'roo-alert-text',
                    html : this.html
                }
            ]
        };
        
        if(this.faicon){
            cfg.cn[0].cls += ' fa ' + this.faicon;
        }
        
        if(this.weight){
            cfg.cls += ' alert-' + this.weight;
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        this.el.setVisibilityMode(Roo.Element.DISPLAY);
    },
    
    setTitle : function(str)
    {
        this.el.select('.roo-alert-title',true).first().dom.innerHTML = str;
    },
    
    setText : function(str)
    {
        this.el.select('.roo-alert-text',true).first().dom.innerHTML = str;
    },
    
    setWeight : function(weight)
    {
        if(this.weight){
            this.el.select('.alert',true).first().removeClass('alert-' + this.weight);
        }
        
        this.weight = weight;
        
        this.el.select('.alert',true).first().addClass('alert-' + this.weight);
    },
    
    setIcon : function(icon)
    {
        if(this.faicon){
            this.el.select('.roo-alert-icon',true).first().removeClass(['fa', 'fa-' + this.faicon]);
        }
        
        this.faicon = icon;
        
        this.el.select('.roo-alert-icon',true).first().addClass(['fa', 'fa-' + this.faicon]);
    },
    
    hide: function() 
    {
        this.el.hide();   
    },
    
    show: function() 
    {  
        this.el.show();   
    }
    
});

 