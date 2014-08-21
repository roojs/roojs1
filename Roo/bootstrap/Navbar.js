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

 * @constructor
 * Create a new Navbar
 * @param {Object} config The config object
 */


Roo.bootstrap.Navbar = function(config){
    Roo.bootstrap.Navbar.superclass.constructor.call(this, config);
    
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    
   
    // private
    navItems : false,
    loadMask : false,
    
    
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
        if (this.el.select('.collapse').getCount()) {
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



 

 