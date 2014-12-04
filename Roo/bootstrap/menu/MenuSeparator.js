/*
 * - LGPL
 *
 * menu separator
 * 
 */


/**
 * @class Roo.bootstrap.menu.MenuSeparator
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuSeparator class
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.MenuSeparator = function(config){
    Roo.bootstrap.menu.MenuSeparator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.menu.MenuSeparator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            tag : 'li',
            cls: 'divider'
        };
        
        return cfg;
    }
   
});

 

 