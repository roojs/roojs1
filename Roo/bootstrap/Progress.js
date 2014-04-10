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
 * @cfg {String} size xs | sm | md | lg
 
 * @cfg {Number} aria_valuenow aria-value now
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
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'progress-bar'
        };
      
        if(this.aria_valuenow){
            cfg['aria-valuenow'] = this.aria_valuenow;
        }
        
        return cfg;
    }
   
});

 

 