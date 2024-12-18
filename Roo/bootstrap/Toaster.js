/*
 * - LGPL
 *
 * toaster  - collection of toasts  - notification popups.
 * 
 */

/**
 * @class Roo.bootstrap.Toaster
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.Toast
 * Bootstrap Toaster Class - a notification with toasts
 * 
 * @constructor
 * Create a new Toaster - should really only be one on the page.?
 * 
 * @param {Object} config The config object
 */

Roo.bootstrap.Toaster = function(config){
    if (Roo.bootstrap.Toaster.page !== false) {
        throw "toaster already initialized";
    }
    
    Roo.bootstrap.Toaster.superclass.constructor.call(this, config);
    Roo.bootstrap.Toaster.page = this;
};
Roo.bootstrap.Toaster.page = false;

Roo.extend(Roo.bootstrap.Toaster, Roo.bootstrap.Component,  {
 
    getAutoCreate : function(){
         
        return cfg = {
            cls : 'bootstrap', // wrapped so we can use it elsewhere
            cn : [ {
                cls: 'toaster',  // add bootstrap so it can be used with roo classic
                cn : [
                    {
                        tag: 'div',
                        cls : 'toast-holder'
                    }
                ]    
            }]
            
        }; 
    },
    initEvents : function()
    {
         this.containerEl = this.el.select('.toast-holder', true).first();
    },
    getChildContainer : function() /// what children are added to.
    {
        return this.containerEl;
    },
    show : function ()
    {
        if (!this.el) {
            this.render(document.body);
        }
        this.el.removeClass('d-none');
    },
    hide : function()
    {
        this.el.addClass('d-none'); // not sure if this would ever be needed..
    }
   
});


