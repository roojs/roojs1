/*
 * - LGPL
 *
 * Progress
 * 
 */

/**
 * @class Roo.bootstrap.Progress
 * @extends Roo.bootstrap.Component
 * Bootstrap Progress class
 * @cfg {Number} aria_valuenow aria-value now
 * @cfg {Number} aria_valuemin aria-value min
 * @cfg {Number} aria_valuemax aria-value max
 * @cfg {String} label label for the progress bar
 * @cfg {String} panel (success | info | warning | danger )
 * @cfg {String} role role of the progress bar
 * @cfg {Boolean} striped striped of the progress bar
 * @cfg {Boolean} active animated of the progress bar
 * @cfg {String} sr_only text
 * 
 * 
 * @constructor
 * Create a new Progress
 * @param {Object} config The config object
 */

Roo.bootstrap.Progress = function(config){
    Roo.bootstrap.Progress.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Progress, Roo.bootstrap.Component,  {
    
    aria_valuenow : false,
    aria_valuemin : 0,
    aria_valuemax : 100,
    label : false,
    panel : false,
    role : false,
    striped : false,
    active: false,
    sr_only: false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'progress',
            cn: [
                {
                    tag: 'div',
                    cls: 'progress-bar'
                }
            ]
        };
        
        
        if(this.striped){
            cfg.cls += ' progress-striped';
        }
      
        if(this.active){
            cfg.cls += ' active';
        }
        
        if(this.sr_only){
            cfg.cn[0].cn = {
                tag: 'span',
                cls: 'sr-only',
                html: this.sr_only
            }
        }
        
        if(this.role){
            cfg.cn[0].role = this.role;
        }
        
        if(this.aria_valuenow){
            cfg.cn[0]['aria-valuenow'] = this.aria_valuenow;
        }
        
        if(this.label){
            cfg.cn[0].html = this.label;
        }
        
        if(this.panel){
            cfg.cn[0].cls += ' progress-bar-' + this.panel;
        }
        
        return cfg;
    }
   
});

 

 