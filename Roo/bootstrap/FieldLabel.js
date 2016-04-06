/*
 * - LGPL
 *
 * FieldLabel
 * 
 */

/**
 * @class Roo.bootstrap.FieldLabel
 * @extends Roo.bootstrap.Component
 * Bootstrap FieldLabel class
 * @cfg {String} html contents of the element
 * @cfg {String} tag tag of the element default label
 * @cfg {String} cls class of the element
 * @cfg {String} for label target 
 * @cfg {Boolean} allowBlank (true|false) target allowBlank default true
 * @cfg {String} invalidClass default "text-danger fa fa-lg fa-exclamation-triangle"
 * @cfg {String} validClass default "text-success fa fa-lg fa-check"
 * 
 * @constructor
 * Create a new FieldLabel
 * @param {Object} config The config object
 */

Roo.bootstrap.FieldLabel = function(config){
    Roo.bootstrap.Element.superclass.constructor.call(this, config);
    
    this.addEvents({
            /**
             * @event invalid
             * Fires after the field has been marked as invalid.
             * @param {Roo.form.FieldLabel} this
             * @param {String} msg The validation message
             */
            invalid : true,
            /**
             * @event valid
             * Fires after the field has been validated with no errors.
             * @param {Roo.form.FieldLabel} this
             */
            valid : true
        });
};

Roo.extend(Roo.bootstrap.FieldLabel, Roo.bootstrap.Component,  {
    
    tag: 'label',
    cls: '',
    html: '',
    for: '',
    allowBlank : true,
    invalidClass : 'text-danger fa fa-lg fa-exclamation-triangle',
    validClass : 'text-success fa fa-lg fa-check',
    
    getAutoCreate : function(){
        
        var cfg = {
            tag : this.tag,
            cls : this.cls,
            for : this.for,
            cn : [
                {
                    tag : 'i',
                    cls : ''
                },
                {
                    tag : 'div',
                    html : this.html
                }
            ] 
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        this.iconEl = this.el.select('i', true).first();
        
        this.iconEl.setVisibilityMode(Roo.Element.DISPLAY).hide();
        
        this.markValid();
        
    },
    
    /**
     * Mark this field as valid
     */
    markValid : function()
    {
        this.iconEl.show();
        
        this.iconEl.removeClass(this.invalidClass);
        
        this.iconEl.addClass(this.validClass);
        
        this.fireEvent('valid', this);
    },
    
    /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        this.iconEl.show();
        
        this.iconEl.removeClass(this.validClass);
        
        this.iconEl.addClass(this.invalidClass);
        
        this.fireEvent('invalid', this, msg);
    }
    
   
});

 

 