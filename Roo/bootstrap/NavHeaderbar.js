/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavHeaderbar
 * @extends Roo.bootstrap.Navbar
 * Bootstrap Sidebar class
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavHeaderbar = function(config){
    Roo.bootstrap.NavHeaderbar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavHeaderbar, Roo.bootstrap.Navbar,  {
    
    
    getAutoCreate : function(){
        
        
        return  {
            tag: 'div',
            cls: 'sidebar-nav'
        };
    
        
    }
    
    
    
});



 

 