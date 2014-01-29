/*
 * - LGPL
 *
 * menu separator
 * 
 */


/**
 * @class Roo.bootstrap.MenuSeparator
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuSeparator class
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.MenuSeparator = function(config){
    Roo.bootstrap.MenuSeparator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.MenuSeparator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            cls: 'divider',
            tag : 'li'
        };
        
        return cfg;
    }
   
});

 

 