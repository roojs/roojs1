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
        this.el.select('.navbar-toggle',true).on('click', , this);
        
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
        if (this.el && this.el.select('.collapse').getCount()) {
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
    },
    onToggle : function()
    {
        
        if(this.fireEvent('beforetoggle', this) === false){
            return;
        }
        var ce = this.el.select('.navbar-collapse',true).first();
      
        if (ce.hasClass('collapse')) {
           this.expand();
        } else {
            this.collapse();
        }
        
        
    
    }
    expand : function ()
    {
        var ce = this.el.select('.navbar-collapse',true).first();
               // show it...
        ce.addClass('in'); // old...
        ce.removeClass('collapse');
        ce.addClass('show');
        var h = ce.getHeight();
        Roo.log(h);
        ce.removeClass('show');
        // at this point we should be able to see it..
        ce.addClass('collapsing');
        
        ce.setHeight(0); // resize it ...
        ce.on('transitionend', function() {
            //Roo.log('done transition');
            ce.removeClass('collapsing');
            ce.addClass('show');
            ce.removeClass('collapse');

            ce.dom.style.height = '';
        }, this, { single: true} );
        ce.setHeight(h);
    },
    
    collapse : function()
    {
        var ce = this.el.select('.navbar-collapse',true).first();
        ce.removeClass('in'); // old...
        ce.setHeight(ce.getHeight());
        ce.removeClass('show');
        ce.addClass('collapsing');
        
        ce.on('transitionend', function() {
            ce.dom.style.height = '';
            ce.removeClass('collapsing');
            ce.addClass('collapse');
        }, this, { single: true} );
        ce.setHeight(0);
    }
    
    
    
});



 

 