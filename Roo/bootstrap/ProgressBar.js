/*
 * - LGPL
 *
 * ProgressBar
 * 
 */

/**
 * @class Roo.bootstrap.ProgressBar
 * @extends Roo.bootstrap.Component
 * Bootstrap ProgressBar class
 * @cfg {Number} aria_valuenow aria-value now
 * @cfg {Number} aria_valuemin aria-value min
 * @cfg {Number} aria_valuemax aria-value max
 * @cfg {String} label label for the progress bar
 * @cfg {String} panel (success | info | warning | danger )
 * @cfg {String} role role of the progress bar
 * @cfg {String} sr_only text
 * 
 * 
 * @constructor
 * Create a new ProgressBar
 * @param {Object} config The config object
 */

Roo.bootstrap.ProgressBar = function(config){
    Roo.bootstrap.ProgressBar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.ProgressBar, Roo.bootstrap.Component,  {
    
    aria_valuenow : 0,
    aria_valuemin : 0,
    aria_valuemax : 100,
    label : false,
    panel : false,
    role : false,
    sr_only: false,
    
    getAutoCreate : function()
    {
        
        var cfg = {
            tag: 'div',
            cls: 'progress-bar',
            style: 'width:' + (this.aria_valuenow / this.aria_valuemax)
        };
        
        if(this.sr_only){
            cfg.cn = {
                tag: 'span',
                cls: 'sr-only',
                html: this.sr_only
            }
        }
        
        if(this.role){
            cfg.role = this.role;
        }
        
        if(this.aria_valuenow){
            cfg['aria-valuenow'] = this.aria_valuenow;
        }
        
        if(this.aria_valuemin){
            cfg['aria-valuemin'] = this.aria_valuemin;
        }
        
        if(this.aria_valuemax){
            cfg['aria-valuemax'] = this.aria_valuemax;
        }
        
        if(this.label && !this.sr_only){
            cfg.html = this.label;
        }
        
        if(this.panel){
            cfg.cls += ' progress-bar-' + this.panel;
        }
        
        return cfg;
    },
    
    update : function(aria_valuenow)
    {
        Roo.log('call update?');
        this.aria_valuenow = aria_valuenow;
        
        this.el.setStyle('width', (this.aria_valuenow / this.aria_valuemax));
        Roo.log(this);
    }
   
});

 

 