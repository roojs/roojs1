/*
 * - LGPL
 *
 * menu separator
 * 
 */
Roo.bootstrap.dropdown = Roo.bootstrap.dropdown || {};

/**
 * @class Roo.bootstrap.dropdown.MenuSeparator
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuSeparator class
 * 
 * @constructor
 * Create a new MenuItem
 * @param {Object} config The config object
 */


Roo.bootstrap.dropdown.MenuSeparator = function(config){
    Roo.bootstrap.dropdown.MenuSeparator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.dropdown.MenuSeparator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            tag : 'li',
            cls: 'divider'
        };
        
        return cfg;
    }
   
});

 

 