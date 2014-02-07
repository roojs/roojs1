/*
 * - LGPL
 *
 * form
 * 
 */

/**
 * @class Roo.bootstrap.Form
 * @extends Roo.bootstrap.Component
 * Bootstrap Form class
 * @cfg {String} method  GET | POST (default POST)
 * @cfg {String} labelAlign top | left (default top)
 * 
 * @constructor
 * Create a new Form
 * @param {Object} config The config object
 */


Roo.bootstrap.Form = function(config){
    Roo.bootstrap.Form.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event clientvalidation
         * If the monitorValid config option is true, this event fires repetitively to notify of valid state
         * @param {Form} this
         * @param {Boolean} valid true if the form has passed client-side validation
         */
        clientvalidation: true,
        /**
         * @event beforeaction
         * Fires before any action is performed. Return false to cancel the action.
         * @param {Form} this
         * @param {Action} action The action to be performed
         */
        beforeaction: true,
        /**
         * @event actionfailed
         * Fires when an action fails.
         * @param {Form} this
         * @param {Action} action The action that failed
         */
        actionfailed : true,
        /**
         * @event actioncomplete
         * Fires when an action is completed.
         * @param {Form} this
         * @param {Action} action The action that completed
         */
        actioncomplete : true
    });
    
};

Roo.extend(Roo.bootstrap.Form, Roo.bootstrap.Component,  {
      
     /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */
    method : 'POST',
    /**
     * @cfg {String} url
     * The URL to use for form actions if one isn't supplied in the action options.
     */
    /**
     * @cfg {Boolean} fileUpload
     * Set to true if this form is a file upload.
     */
     
    /**
     * @cfg {Object} baseParams
     * Parameters to pass with all requests. e.g. baseParams: {id: '123', foo: 'bar'}.
     */
      
    /**
     * @cfg {Number} timeout Timeout for form actions in seconds (default is 30 seconds).
     */
    timeout: 30,

    // private
    activeAction : null,
 
    
    
    /**
     * childForms - used for multi-tab forms
     * @type {Array}
     */
    childForms : false,
    
    
    
    /**
     * By default wait messages are displayed with Roo.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     * @type Mixed
     */
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id(),
            cls : ''
        }
        
        if (this.labelAlign == 'left' ) {
            cfg.cls += ' form-horizontal';
        }
        return cfg;
    },
    initEvents : function()
    {
        this.el.on('submit', this.onSubmit, this);
        
        
    }
    
});

 
