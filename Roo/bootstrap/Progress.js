/*
 * - LGPL
 *
 * Progress
 * 
 */

/**
 * @class Roo.bootstrap.Progress
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.ProgressBar
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
    
    striped : false,
    active: false,
    
    getAutoCreate : function(){
        var cfg = {
            tag: 'div',
            cls: 'progress'
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

 

 