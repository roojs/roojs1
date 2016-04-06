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
             * @param {Roo.form.Field} this
             * @param {String} msg The validation message
             */
            invalid : true,
            /**
             * @event valid
             * Fires after the field has been validated with no errors.
             * @param {Roo.form.Field} this
             */
            valid : true
        });
};

Roo.extend(Roo.bootstrap.Element, Roo.bootstrap.Component,  {
    
    tag: 'div',
    cls: '',
    html: '',
    preventDefault: false, 
    clickable: false,
    
    getAutoCreate : function(){
        
        var cfg = {
            tag: this.tag,
            cls: this.cls,
            html: this.html
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        if(this.clickable){
            this.el.on('click', this.onClick, this);
        }
        
    },
    
    onClick : function(e)
    {
        if(this.preventDefault){
            e.preventDefault();
        }
        
        this.fireEvent('click', this, e);
    },
    
    getValue : function()
    {
        return this.el.dom.innerHTML;
    },
    
    setValue : function(value)
    {
        this.el.dom.innerHTML = value;
    }
   
});

 

 