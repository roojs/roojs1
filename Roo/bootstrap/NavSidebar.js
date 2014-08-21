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
 * @cfg {String} position (fixed-top|fixed-bottom|static-top) position
 * @cfg {String} brand what is brand
 * @cfg {Boolean} inverse is inverted color
 * @cfg {String} type (nav | pills | tabs)
 * @cfg {Boolean} arrangement stacked | justified
 * @cfg {String} align (left | right) alignment
 * @cfg {String} brand_href href of the brand
 * @cfg {Boolean} main (true|false) main nav bar? default false
 * @cfg {Boolean} loadMask (true|false) loadMask on the bar
 * @cfg {String} tag (header|footer|nav|div) default is nav 

 * 
 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.NavSidebar = function(config){
    Roo.bootstrap.NavSidebar.superclass.constructor.call(this, config);
   
    
};

Roo.extend(Roo.bootstrap.NavSidebar, Roo.bootstrap.Navbar,  {
    
    sidebar : true,
    
    getAutoCreate : function(){
        
        
        return  {
            tag: 'div',
            cls: 'sidebar-nav'
        };
    
        
    }
    
    
    
});



 

 