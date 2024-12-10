/*
 * - LGPL
 *
 * toast - notification popup.
 * 
 */

/**
 * @class Roo.bootstrap.Toast
 * @extends Roo.bootstrap.Component
 * Bootstrap Toaster Class - a notification with toasts
 * 
 * @constructor
 *
 * Create a new Toast - will auto create a toaster if necessary.
 * @cfg title {string} Title of toast
 * @cfg body {string} Body text of string
 * @cfg show_time {boolean} should a time stamp be show/updated? - default false?
 * @cfg timeout {number} how long until it should be hidden - -1 = never
 * @cfg progress {boolean} show progressBar
 *
 * 
 * @param {Object} config The config object
 *
 * 
 */

Roo.bootstrap.Toast  = function(config){
    if (Roo.bootstrap.Toaster.page === false) {
        (new Roo.bootstrap.Toaster()).show();
    }
    
    Roo.bootstrap.Toast.superclass.constructor.call(this, config);
    
};
 
Roo.extend(Roo.bootstrap.Toast, Roo.bootstrap.Component,  {
 
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Column.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'div',
            cls: 'toaster',
            cn : [
                {
                    tag: 'div',
                    cls : 'toast-holder'
                }
            ]
                
            
        };
         
        return cfg;
    },
    initEvents : function()
    {
         this.containerEl = this.el.select('.toast-holder', true).first();
    },
    getChildContainer : function() /// what children are added to.
    {
        return this.containerEl;
    }
   
});


