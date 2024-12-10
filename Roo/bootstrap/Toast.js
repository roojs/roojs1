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
 * @cfg timeout {number|boolean} number of seconds until it should be hidden false
 * @cfg progress {number|boolean} show progressBar - false to hide, to show 0-100
 * @cfg {String} weight (primary|warning|info|danger|secondary|success|light|dark) colour to make the square!
 * 
 * @param {Object} config The config object
 *
 * 
 */

Roo.bootstrap.Toast  = function(config)
{
    if (Roo.bootstrap.Toaster.page === false) {
        (new Roo.bootstrap.Toaster()).show();
    }
    
    Roo.bootstrap.Toast.superclass.constructor.call(this, config);
      this.addEvents({
        // raw events
        /**
         * @event close
         * When a toast is closed (via button or timeout.)
         * @param {Roo.bootstrap.Toast} toast
         * @param {Roo.EventObject} e
         */
        "close" : true,
         /**
         * @event show
         * When a toast is show() - usually on contruction..
         * @param {Roo.bootstrap.Toast} toast
         * @param {Roo.EventObject} e
         */
        "show" : true,
    });
    
    
    this.render(Roo.bootstrap.Toaster.page.getChildContainer());
    this.fireEvent('show', this);
};
 
Roo.extend(Roo.bootstrap.Toast, Roo.bootstrap.Component,  {
    
    title : '',
    body : '',
    show_time : false,
    timeout : false,
    progress : false,
    weight : 'primary',
 
    getAutoCreate : function(){
          console.log(Roo.BLANK_IMAGE_URL);
        return {
            cls: 'toast fade show',
            role : 'alert',
            cn : [
                {
                    cls : 'toast-header',
                    cn : [
                        {
                            tag : 'img',
                            src : Roo.BLANK_IMAGE_URL,
                            cls : 'rounded mr-2 bg-' + this.weight,
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
                                cls : 'progress-bar bg-' + this.weight
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
        this.timerEl  = this.el.select('.toast-timer', true).first();
        this.progressEl  = this.el.select('.progress', true).first();
        
        if (this.body == '') {
            this.bodyTextEl.addClass('d-none');
            if (this.progress === false) {
                this.bodyEl.addClass('d-none');
            }
        }
        this.updateProgress(this.progress);
        
        this.closeEl.on('click', this.hide, this);
        if (this.timeout > 0) {
            this.hide.defer(this.timeout * 1000, this);
        }
        if (this.show_time > 0) {
            this.timerEl.removeClass('d-none');
            this.show_time = new Date();
            this.updateTimer();
             
        }
        
        
    },
    
    /**
     * hide and destroy the toast
     */
    hide : function() 
    {
        if (!this.el) {
            return;
        }
        if (this.show_time_interval !== false) {
            clearInterval(this.show_time_interval);
        }
        this.closeEl.un('click',this.hide);
        this.el.dom.parentNode.removeChild(this.el.dom);
        this.el = false;
        this.fireEvent('close', this);
        
    },
    
     
    updateTimer : function()
    {
        if (!this.el) {
            return;
        }
        if (this.show_time === false) {
            this.show_time = new Date();
        }
        
        var s = Math.floor(((new Date()) - this.show_time) / 1000);
        var m = Math.floor(s/60);
        this.timerEl.update(
            s < 1 ? 'now' :
            (
                s > 60 ? (m + " mins ago") : (s + " sec. ago")
            )
        );
        
        this.updateTimer.defer(s < 60 ? 5000 : 60000, this);
    },
    
    /**
     * update the Progress Bar
     * @param {Number|Boolean} false to hide, or number between 0-1
     */
    updateProgress : function(n)
    {
        this.progress = n
        if (this.progress !== false) {
            this.progress = Math.min(this.progress, 1.0);
            this.progress = Math.max(this.progress, 0.0);
            this.progressEl.removeClass("d-none");
            this.progressBarEl.setWidth(Math.floor(100 * this.progress) + '%');
            return;
        }
        
        this.progressEl.addClass('d-none');
    },
     /**
     * update body text
     * @param {string} text to put in body
     */
     updateBody : function(str)
     {
        this.bodyTextEl.update(str);
     }
});


