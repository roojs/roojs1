/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.TabGroup
 * @extends Roo.bootstrap.Column
 * Bootstrap Column class
 * 
 * @constructor
 * Create a new TabGroup
 * @param {Object} config The config object
 */

Roo.bootstrap.TabGroup = function(config){
    Roo.bootstrap.TabGroup.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TabGroup, Roo.bootstrap.Column,  {
    
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.TabGroup.superclass.getAutoCreate.call(this));
        
        cfg.cls += ' tab-content';
        
        return cfg;
    },
    
   
});

 

 