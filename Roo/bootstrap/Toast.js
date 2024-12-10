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
       
       
       
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="..." class="rounded mr-2" alt="...">
        <strong class="mr-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        See? Just like this.
      </div>
    </div>
    
    
    
        cfg = {
            cls: 'toast',
            role : 'alert',
            cn : [
                {
                    cls : 'toast-header',
                    cn : [
                        {
                            tag : 'img',
                            src : Roo.BLANK_IMAGE_URL,
                            cls : 'rounded mr-2'
                        },
                        {
                            tag : 'small'
                            cls : 'mr-auto',
                            html : this.title
                        },
                        {
                            tag : 'small'
                            cls : 'text-muted d-none',
                            html : ''
                        }
                        {
                            tag : 'button'
                            cls : 'ml-2 mb-1 close',
                            type : 'button',
                            cn : [
                                {
                                    tag: 'span',
                                    html : '&times;'
                                }
                            ]
                        }
                    ]
                    
                },
                {
                    cls : 'toast-body',
                    cn : [
                        {
                            cls : 'progress d-none',
                            cn : {
                                cls : 'progress-bar'                                
                            }
                        },
                        {
                            cls: 'toast-body-text',
                            html : this.body
                        }
                    ]
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


