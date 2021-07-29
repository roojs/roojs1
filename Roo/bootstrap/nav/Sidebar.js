/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.nav.Sidebar
 * @extends Roo.bootstrap.Navbar
 * @children Roo.bootstrap.nav.Group Roo.bootstrap.Container Roo.bootstrap.Form Roo.bootstrap.Row Roo.bootstrap.Column Roo.bootstrap.Link
 * Bootstrap Sidebar class
 * 
 * @constructor
 * Create a new Sidebar
 * @param {Object} config The config object
 */


Roo.bootstrap.nav.Sidebar = function(config){
    Roo.bootstrap.nav.Sidebar.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.nav.Sidebar, Roo.bootstrap.nav.Bar,  {
    
    sidebar : true, // used by Navbar Item and NavbarGroup at present...
    
    getAutoCreate : function(){
        
        
        return  {
            tag: 'div',
            cls: 'sidebar sidebar-nav'
        };
    
        
    }
    
    
    
});



 

 