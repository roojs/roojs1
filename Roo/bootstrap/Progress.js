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
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'progress-bar'
        };
      
        if(this.aria_valuenow){
            cfg['aria-valuenow'] = this.aria_valuenow;
        }
        
        if(this.label){
            cfg.html = this.label;
        }
        
        if(this.panel){
            cfg.cls += 'progress-bar-' + this.panel;
        }
        
        return cfg;
    }
   
});

 

 