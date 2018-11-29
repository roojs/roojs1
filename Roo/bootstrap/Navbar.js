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
    this.addEvents({
        // raw events
        /**
         * @event beforetoggle
         * Fire before toggle the menu
         * @param {Roo.EventObject} e
         */
        "beforetoggle" : true
    });
};

Roo.extend(Roo.bootstrap.Navbar, Roo.bootstrap.Component,  {
    
    
   
    // private
    navItems : false,
    loadMask : false,
    
    
    getAutoCreate : function(){
        
        
        throw { message : "nav bar is now a abstract base class - use NavSimplebar / NavHeaderbar / NavSidebar etc..."};
        
    },
    
    initEvents :function ()
    {
        //Roo.log(this.el.select('.navbar-toggle',true));
        this.el.select('.navbar-toggle',true).on('click', function() {
            if(this.fireEvent('beforetoggle', this) !== false){
                var ce = this.el.select('.navbar-collapse',true).first();
                ce.toggleClass('in'); // old...
                if (ce.hasClass('collapse')) {
                    // show it...
                    ce.removeClass('collapse show');
                    ce.setHeight(ce.getHeight()); // resize it ...
                    // now flag it as moving..
                    ce.addClass('collapsing');
                    
                    (function() { ce.removeClass('collapsing'); }).defer(100);
                } else {
                    ce.addClass('collapsing');
                    ce.removeClass('show');
                    (function() {
                        ce.removeClass('collapsing');
                        ce.addClass('collapse');
                    }).defer(200);
                    
                }
            }
            
        }, this);
        
        var mark = {
            tag: "div",
            cls:"x-dlg-mask"
        };
        
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



 

 