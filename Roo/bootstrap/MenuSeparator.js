/*
 * - LGPL
 *
 * row
 * 
 */


/**
 * @class Roo.bootstrap.MenuItem
 * @extends Roo.bootstrap.Component
 * Bootstrap MenuItem class
 * @cfg {String} html the menu label
 * @cfg {String} href the link 
 * 
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

 

 