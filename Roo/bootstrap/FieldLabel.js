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
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: this.cls,
            html: this.html,
            for: this.for
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
    }
    
   
});

 

 