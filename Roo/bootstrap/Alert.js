/**
 * @class Roo.bootstrap.Alert
 * @extends Roo.bootstrap.Component
 * Bootstrap Alert class - shows an alert area box
 * eg
 * <div class="alert alert-danger" role="alert"><span class="fa fa-exclamation-triangle"></span><span class="sr-only">Error:</span>
  Enter a valid email address
</div>
 * @licence LGPL
 * @cfg {String} title The title of alert
 * @cfg {String} html The content of alert
 * @cfg {String} weight (  success | info | warning | danger )
 * @cfg {String} fa font-awesomeicon
 * @cfg {Number} seconds default:-1 Number of seconds until it disapears (-1 means never.)
 * @cfg {Boolean} close true to show a x closer
 * 
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
    fa: false,
    faicon: false, // BC
    close : false,
    
    
    getAutoCreate : function()
    {
        
        var cfg = {
            tag : 'div',
            cls : 'alert',
            cn : [
                {
                    tag: 'button',
                    type :  "button",
                    cls: "close",
                    html : '×',
                    style : this.close ? '' : 'display:none'
                },
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
        if(this.fa){
            cfg.cn[0].cls += ' fa ' + this.fa;
        }
        
        if(this.weight){
            cfg.cls += ' alert-' + this.weight;
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        this.el.setVisibilityMode(Roo.Element.DISPLAY);
        this.titleEl =  this.el.select('.roo-alert-title',true).first();
        this.iconEl = this.el.select('.roo-alert-icon',true).first();
        if (this.seconds > 0) {
            this.hide.defer(this.seconds, this);
        }
    },
    
    setTitle : function(str)
    {
        this.titleEl.dom.innerHTML = str;
    },
    
    setText : function(str)
    {
        this.titleEl.dom.innerHTML = str;
    },
    
    setWeight : function(weight)
    {
        if(this.weight){
            this.el.removeClass('alert-' + this.weight);
        }
        
        this.weight = weight;
        
        this.el.addClass('alert-' + this.weight);
    },
    
    setIcon : function(icon)
    {
        if(this.faicon){
            this.alertEl.removeClass(['fa', 'fa-' + this.faicon]);
        }
        
        this.faicon = icon;
        
        this.alertEl.addClass(['fa', 'fa-' + this.faicon]);
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

 