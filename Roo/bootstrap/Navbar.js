/*
 * - LGPL
 *
 * navbar
 * 
 */

/**
 * @class Roo.bootstrap.Navbar
 * @extends Roo.bootstrap.Component
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


Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    
    bar: false,
    brand: '',
    inverse: false,
    position: '',
    align : false,
    type: false,
    arrangement: '',
    brand_href: false,
    main : false,
    loadMask : false,
    tag : false,
    
    // private
    navItems : false,
    
    getAutoCreate : function(){
        
        
        throw { message : "nav bar is now a abstract base class - use SimpleBar / HeaderBar / SideBar etc..."};
        
    },
    
    initEvents :function ()
    {
        //Roo.log(this.el.select('.navbar-toggle',true));
        this.el.select('.navbar-toggle',true).on('click', function() {
           // Roo.log('click');
            this.el.select('.navbar-collapse',true).toggleClass('in');                                 
        }, this);
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask"
        }
        
        this.maskEl = Roo.DomHelper.append(this.el, mark, true);
        
        var size = this.el.getSize();
        this.maskEl.setSize(size.width, size.height);
        this.maskEl.enableDisplayMode("block");
        this.maskEl.hide();
        
        if(this.loadMask){
            this.maskEl.show();
        }
    },
    
    
    getChildContainer : function()
    {
        if (this.bar === true) {
            return this.el.select('.collapse',true).first();
        }
        
        return this.el;
    },
    
    mask : function()
    {
        this.maskEl.show();
    },
    
    unmask : function()
    {
        this.maskEl.hide();
    }
    
    
    
});



 

 