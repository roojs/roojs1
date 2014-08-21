/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.NavSidebar
 * @extends Roo.bootstrap.Navbar
 * Bootstrap Navbar class
 * 
 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavSidebar = function(config){
    Roo.bootstrap.NavSidebar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NavSidebar, Roo.bootstrap.Navbar,  {
    
    
    getAutoCreate : function(){
        
        
        return  {
            tag: 'div',
            cls: 'sidebar-nav'
        };
    
        
    }
    
    
    
});



 

 