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
 * @cfg {Boolean} striped striped of the progress bar
 * @cfg {Boolean} active animated of the progress bar
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
        
        
        return cfg;
    }
   
});

 

 