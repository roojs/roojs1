/*
 * - LGPL
 *
 * FieldLabel
 * 
 */

/**
 * @class Roo.bootstrap.form.FieldLabel
 * @extends Roo.bootstrap.Component
 * Bootstrap FieldLabel class
 * @cfg {String} html contents of the element
 * @cfg {String} tag tag of the element default label
 * @cfg {String} cls class of the element
 * @cfg {String} target label target 
 * @cfg {Boolean} allowBlank (true|false) target allowBlank default true
 * @cfg {String} invalidClass DEPRICATED - BS4 uses is-invalid
 * @cfg {String} validClass DEPRICATED - BS4 uses is-valid
 * @cfg {String} iconTooltip default "This field is required"
 * @cfg {String} indicatorpos (left|right) default left
 * 
 * @constructor
 * Create a new FieldLabel
 * @param {Object} config The config object
 */

Roo.bootstrap.form.FieldLabel = function(config){
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

Roo.extend(Roo.bootstrap.form.FieldLabel, Roo.bootstrap.Component,  {
    
    tag: 'label',
    cls: '',
    html: '',
    target: '',
    allowBlank : true,
    invalidClass : 'has-warning',
    validClass : 'has-success',
    iconTooltip : 'This field is required',
    indicatorpos : 'left',
    
    getAutoCreate : function(){
        
	var cls = "";
	if (!this.allowBlank) {
	    cls  = "visible";
	}
	
        var cfg = {
            tag : this.tag,
            cls : 'roo-bootstrap-field-label ' + this.cls,
            for : this.target,
            cn : [
                {
                    tag : 'i',
                    cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star ' + cls,
                    tooltip : this.iconTooltip
                },
                {
                    tag : 'span',
                    html : this.html
                }
            ] 
        };
        
        if(this.indicatorpos == 'right'){
            var cfg = {
                tag : this.tag,
                cls : 'roo-bootstrap-field-label ' + this.cls,
                for : this.target,
                cn : [
                    {
                        tag : 'span',
                        html : this.html
                    },
                    {
                        tag : 'i',
                        cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star '+ cls,
                        tooltip : this.iconTooltip
                    }
                ] 
            };
        }
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.Element.superclass.initEvents.call(this);
        
        this.indicator = this.indicatorEl();
        
        if(this.indicator){
            this.indicator.removeClass('visible');
            this.indicator.addClass('invisible');
        }
        
        Roo.bootstrap.form.FieldLabel.register(this);
    },
    
    indicatorEl : function()
    {
        var indicator = this.el.select('i.roo-required-indicator',true).first();
        
        if(!indicator){
            return false;
        }
        
        return indicator;
        
    },
    
    /**
     * Mark this field as valid
     */
    markValid : function()
    {
        if(this.indicator){
            this.indicator.removeClass('visible');
            this.indicator.addClass('invisible');
        }
        if (Roo.bootstrap.version == 3) {
	    this.el.removeClass(this.invalidClass);
	    this.el.addClass(this.validClass);
	} else {
	    this.el.removeClass('is-invalid');
            this.el.addClass('is-valid');
	}
        
        
        this.fireEvent('valid', this);
    },
    
    /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        if(this.indicator){
            this.indicator.removeClass('invisible');
            this.indicator.addClass('visible');
        }
          if (Roo.bootstrap.version == 3) {
	    this.el.removeClass(this.validClass);
	    this.el.addClass(this.invalidClass);
	} else {
	    this.el.removeClass('is-valid');
            this.el.addClass('is-invalid');
	}
        
        
        this.fireEvent('invalid', this, msg);
    }
    
   
});

Roo.apply(Roo.bootstrap.form.FieldLabel, {
    
    groups: {},
    
     /**
    * register a FieldLabel Group
    * @param {Roo.bootstrap.form.FieldLabel} the FieldLabel to add
    */
    register : function(label)
    {
        if(this.groups.hasOwnProperty(label.target)){
            return;
        }
     
        this.groups[label.target] = label;
	
    },
    /**
    * fetch a FieldLabel Group based on the target
    * @param {string} target
    * @returns {Roo.bootstrap.form.FieldLabel} the CheckBox group
    */
    get: function(target) {
        if (typeof(this.groups[target]) == 'undefined') {
            return false;
        }
        
        return this.groups[target] ;
    }
});

 

 