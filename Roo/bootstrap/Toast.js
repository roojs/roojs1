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
 * @cfg timeout {number|boolean} how long until it should be hidden false
 * @cfg progress {number|boolean} show progressBar - false to hide, to show 0-100
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
    
    title : '',
    body : '',
    show_time : false,
    timeout : false,
    progress : false,
 
    getAutoCreate : function(){
         
       
        
    
    
    
        return {
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
                            tag : 'small',
                            cls : 'mr-auto',
                            html : this.title
                        },
                        {
                            tag : 'small',
                            cls : 'toast-timer text-muted d-none',
                            html : ''
                        },
                        {
                            tag : 'button',
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
        
    },
    progressBarEl : null,

    progressEl : null,
    bodyEl : null,
    
    bodyTextEl : null,
    closeEl : null,
    timerEl  : null,
     
    initEvents : function()
    {
        this.progressBarEl = this.el.select('.progress-bar', true).first();
        this.bodyEl = this.el.select('.toast-body', true).first();
        this.bodyTextEl = this.el.select('.toast-body-text', true).first();
        this.closeEl = this.el.select('.close', true).first();
        this.timerEl  = this.el.select('.toast-timer', true).first
        this.progressEl  = this.el.select('.progress', true).first();
        
        if (this.body == '') {
            this.bodyTextEl.addClass('d-none');
            if (this.progress === false) {
                this.bodyEl.addClass('d-none');
            }
        }
        if (this.progress !== false) {
            this.progressEl.removeClass("d-none");
            this.progresBar.el.setWidth(this.progress + '%');
        }
        this.closeEl.on('click', this.hide, this);
        if (this.timeout > 0) {
            this.hide.defer(this.timeout, this);
        }
        if (this.show_time > 0) {
            this.timerEl.removeClass('d-none');
            this.show_time = new Date();
            this.updateTimer();
            this.show_time_interval = setInterval(this.updateTimer.createDelegate(this), 1000);
        }
        
        
    },
    hide : function() // actually deletes the notification.
    {
        if (!this.el) {
            return;
        }
        if (this.show_time_interval !== false) {
            clearInterval(this.show_time_interval);
        }
        this.closeEl.un('click');
        this.el.dom.parentNode.removeChild(this.el.dom);
        this.el = false;
        
        
    },
    updateTimer : function()
    {
        if (!this.el) {
            return;
        }
        var s = Math.floor(((new Date()) - this.show_time) / 1000);
        var m = Math.floor(s/60);
        this.timerEl.update(
            s < 1 ? 'now' :
            (
                s > 60 ? (m + " mins ago") : (s + " seconds ago")
            )
        );
    }
    
});


