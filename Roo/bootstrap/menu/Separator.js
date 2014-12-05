/*
 * - LGPL
 *
 * menu separator
 * 
 */
Roo.bootstrap.menu = Roo.bootstrap.menu || {};

/**
 * @class Roo.bootstrap.menu.Separator
 * @extends Roo.bootstrap.Component
 * Bootstrap Separator class
 * 
 * @constructor
 * Create a new Separator
 * @param {Object} config The config object
 */


Roo.bootstrap.menu.Separator = function(config){
    Roo.bootstrap.menu.Separator.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.menu.Separator, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
        var cfg = {
            tag : 'li',
            cls: 'divider'
        };
        
        return cfg;
    }
   
});

 

 