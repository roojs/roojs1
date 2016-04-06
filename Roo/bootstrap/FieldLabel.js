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
                    cls : 'invalid-label ' + this.invalidClass
                },
                {
                    tag : 'i',
                    cls : 'valid-label ' + this.validClass
                },
                {
                    tag : 'span',
                    html : this.html
                }
            ] 
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
    },
    
    /**
     * Mark this field as valid
     */
    markValid : function(){
        if(!this.el  || this.preventMark){ // not rendered
            return;
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        
        var feedback = this.el.select('.form-control-feedback', true).first();
            
        if(feedback){
            this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
        }

        if(this.disabled || this.allowBlank){
            return;
        }
        
        this.el.addClass(this.validClass);
        
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank && (this.getValue().length || this.forceFeedback)){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
                this.el.select('.form-control-feedback', true).first().addClass([this.validFeedbackClass]);
            }
            
        }
        
        this.fireEvent('valid', this);
    },
    
    /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        if(!this.el  || this.preventMark){ // not rendered
            return;
        }
        
        this.el.removeClass([this.invalidClass, this.validClass]);
        
        var feedback = this.el.select('.form-control-feedback', true).first();
            
        if(feedback){
            this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
        }

        if(this.disabled || this.allowBlank){
            return;
        }
        
        this.el.addClass(this.invalidClass);
        
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass([this.invalidFeedbackClass, this.validFeedbackClass]);
                
                if(this.getValue().length || this.forceFeedback){
                    this.el.select('.form-control-feedback', true).first().addClass([this.invalidFeedbackClass]);
                }
                
            }
            
        }
        
        this.fireEvent('invalid', this, msg);
    }
    
   
});

 

 