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
    weight: '',
    faicon: false,
    
    getAutoCreate : function()
    {
        
        var cfg = {
            tag : 'div',
            cls : 'alert',
            cn : [
                {
                    tag : 'b',
                    cls : 'roo-alert-title',
                    html : this.title
                },
                {
                    tag : 'span',
                    cls : 'roo-alert-content',
                    html : this.html
                }
            ]
        };
        
        if(this.faicon){
            cfg.cn.unshift({
                tag : 'i',
                cls : 'fa ' + this.faicon
            });
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        
    },
    
    setText : function(str)
    {
        this.el.select('.roo-button-text',true).first().dom.innerHTML = str;
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

 