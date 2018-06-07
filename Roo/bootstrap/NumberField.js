/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.NumberField
 * @extends Roo.bootstrap.Input
 * Bootstrap NumberField class
 * 
 * 
 * 
 * 
 * @constructor
 * Create a new NumberField
 * @param {Object} config The config object
 */

Roo.bootstrap.NumberField = function(config){
    Roo.bootstrap.NumberField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.NumberField, Roo.bootstrap.Input, {
    
    /**
     * @cfg {Boolean} allowDecimals False to disallow decimal values (defaults to true)
     */
    allowDecimals : true,
    /**
     * @cfg {String} decimalSeparator Character(s) to allow as the decimal separator (defaults to '.')
     */
    decimalSeparator : ".",
    /**
     * @cfg {Number} decimalPrecision The maximum precision to display after the decimal separator (defaults to 2)
     */
    decimalPrecision : 2,
    /**
     * @cfg {Boolean} allowNegative False to prevent entering a negative sign (defaults to true)
     */
    allowNegative : true,
    /**
     * @cfg {Number} minValue The minimum allowed value (defaults to Number.NEGATIVE_INFINITY)
     */
    minValue : Number.NEGATIVE_INFINITY,
    /**
     * @cfg {Number} maxValue The maximum allowed value (defaults to Number.MAX_VALUE)
     */
    maxValue : Number.MAX_VALUE,
    /**
     * @cfg {String} minText Error text to display if the minimum value validation fails (defaults to "The minimum value for this field is {minValue}")
     */
    minText : "The minimum value for this field is {0}",
    /**
     * @cfg {String} maxText Error text to display if the maximum value validation fails (defaults to "The maximum value for this field is {maxValue}")
     */
    maxText : "The maximum value for this field is {0}",
    /**
     * @cfg {String} nanText Error text to display if the value is not a valid number.  For example, this can happen
     * if a valid character like '.' or '-' is left in the field with no number (defaults to "{value} is not a valid number")
     */
    nanText : "{0} is not a valid number",
    /**
     * @cfg {Boolean} castInt (true|false) cast int if true (defalut true)
     */
    castInt : true,
    /**
     * @cfg {Boolean} thousandsSeparator (true|false) display thousands separator (e.g. "100,000") (defalut true)
     */
    thousandsSeparator : false,

    // private
    initEvents : function()
    {   
        Roo.bootstrap.NumberField.superclass.initEvents.call(this);
        
        var allowed = "0123456789";
        
        if(this.allowDecimals){
            allowed += this.decimalSeparator;
        }
        
        if(this.allowNegative){
            allowed += "-";
        }
        
        this.stripCharsRe = new RegExp('[^'+allowed+']', 'gi');
        
        var keyPress = function(e){
            
            var k = e.getKey();
            
            var c = e.getCharCode();
            
            if(
                    (String.fromCharCode(c) == '.' || String.fromCharCode(c) == '-') &&
                    allowed.indexOf(String.fromCharCode(c)) === -1
            ){
                e.stopEvent();
                return;
            }
            
            if(!Roo.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)){
                return;
            }
            
            if(allowed.indexOf(String.fromCharCode(c)) === -1){
                e.stopEvent();
            }
        };
        
        this.el.on("keypress", keyPress, this);
    },
    
    validateValue : function(value)
    {
        
        if(!Roo.bootstrap.NumberField.superclass.validateValue.call(this, value)){
            return false;
        }
        
        var num = this.parseValue(value);
        
        if(isNaN(num)){
            this.markInvalid(String.format(this.nanText, value));
            return false;
        }
        
        if(num < this.minValue){
            this.markInvalid(String.format(this.minText, this.minValue));
            return false;
        }
        
        if(num > this.maxValue){
            this.markInvalid(String.format(this.maxText, this.maxValue));
            return false;
        }
        
        return true;
    },

    getValue : function()
    {
        return this.fixPrecision(this.parseValue(Roo.bootstrap.NumberField.superclass.getValue.call(this)));
    },

    parseValue : function(value)
    {
        value = parseFloat(String(value).replace(this.decimalSeparator, "."));
        return isNaN(value) ? '' : value;
    },

    fixPrecision : function(value)
    {
        var nan = isNaN(value);
        
        if(!this.allowDecimals || this.decimalPrecision == -1 || nan || !value){
            return nan ? '' : value;
        }
        return parseFloat(value).toFixed(this.decimalPrecision);
    },

    setValue : function(v)
    {
        v = this.fixPrecision(v);
        Roo.bootstrap.NumberField.superclass.setValue.call(this, String(v).replace(".", this.decimalSeparator));
    },

    decimalPrecisionFcn : function(v)
    {
        return Math.floor(v);
    },

    beforeBlur : function()
    {
        if(!this.castInt){
            return;
        }
        
        var v = this.parseValue(this.getRawValue());
        if(v){
            this.setValue(v);
        }
    }
    
});

 
