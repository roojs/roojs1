/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.form.TextField
 * @extends Roo.form.Field
 * Basic text field.  Can be used as a direct replacement for traditional text inputs, or as the base
 * class for more sophisticated input controls (like {@link Roo.form.TextArea} and {@link Roo.form.ComboBox}).
 * @constructor
 * Creates a new TextField
 * @param {Object} config Configuration options
 */
Roo.form.TextField = function(config){
    Roo.form.TextField.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event autosize
         * Fires when the autosize function is triggered.  The field may or may not have actually changed size
         * according to the default logic, but this event provides a hook for the developer to apply additional
         * logic at runtime to resize the field if needed.
	     * @param {Roo.form.Field} this This text field
	     * @param {Number} width The new field width
	     */
        autosize : true
    });
};

Roo.extend(Roo.form.TextField, Roo.form.Field,  {
    /**
     * @cfg {Boolean} grow True if this field should automatically grow and shrink to its content
     */
    grow : false,
    /**
     * @cfg {Number} growMin The minimum width to allow when grow = true (defaults to 30)
     */
    growMin : 30,
    /**
     * @cfg {Number} growMax The maximum width to allow when grow = true (defaults to 800)
     */
    growMax : 800,
    /**
     * @cfg {String} vtype A validation type name as defined in {@link Roo.form.VTypes} (defaults to null)
     */
    vtype : null,
    /**
     * @cfg {String} maskRe An input mask regular expression that will be used to filter keystrokes that don't match (defaults to null)
     */
    maskRe : null,
    /**
     * @cfg {Boolean} disableKeyFilter True to disable input keystroke filtering (defaults to false)
     */
    disableKeyFilter : false,
    /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to true)
     */
    allowBlank : true,
    /**
     * @cfg {Number} minLength Minimum input field length required (defaults to 0)
     */
    minLength : 0,
    /**
     * @cfg {Number} maxLength Maximum input field length allowed (defaults to Number.MAX_VALUE)
     */
    maxLength : Number.MAX_VALUE,
    /**
     * @cfg {String} minLengthText Error text to display if the minimum length validation fails (defaults to "The minimum length for this field is {minLength}")
     */
    minLengthText : "The minimum length for this field is {0}",
    /**
     * @cfg {String} maxLengthText Error text to display if the maximum length validation fails (defaults to "The maximum length for this field is {maxLength}")
     */
    maxLengthText : "The maximum length for this field is {0}",
    /**
     * @cfg {Boolean} selectOnFocus True to automatically select any existing field text when the field receives input focus (defaults to false)
     */
    selectOnFocus : false,
    /**
     * @cfg {Boolean} allowLeadingSpace True to prevent the stripping of leading white space 
     */    
    allowLeadingSpace : false,
    /**
     * @cfg {String} blankText Error text to display if the allow blank validation fails (defaults to "This field is required")
     */
    blankText : "This field is required",
    /**
     * @cfg {Function} validator A custom validation function to be called during field validation (defaults to null).
     * If available, this function will be called only after the basic validators all return true, and will be passed the
     * current field value and expected to return boolean true if the value is valid or a string error message if invalid.
     */
    validator : null,
    /**
     * @cfg {RegExp} regex A JavaScript RegExp object to be tested against the field value during validation (defaults to null).
     * If available, this regex will be evaluated only after the basic validators all return true, and will be passed the
     * current field value.  If the test fails, the field will be marked invalid using {@link #regexText}.
     */
    regex : null,
    /**
     * @cfg {String} regexText The error text to display if {@link #regex} is used and the test fails during validation (defaults to "")
     */
    regexText : "",
    /**
     * @cfg {String} emptyText The default text to display in an empty field - placeholder... (defaults to null).
     */
    emptyText : null,
   

    // private
    initEvents : function()
    {
        if (this.emptyText) {
            this.el.attr('placeholder', this.emptyText);
        }
        
        Roo.form.TextField.superclass.initEvents.call(this);
        if(this.validationEvent == 'keyup'){
            this.validationTask = new Roo.util.DelayedTask(this.validate, this);
            this.el.on('keyup', this.filterValidation, this);
        }
        else if(this.validationEvent !== false){
            this.el.on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        
        if(this.selectOnFocus){
            this.on("focus", this.preFocus, this);
        }
		if (!this.allowLeadingSpace) {
			this.on('blur', this.cleanLeadingSpace, this);
		}
	
        if(this.maskRe || (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Roo.form.VTypes[this.vtype+'Mask']))){
            this.el.on("keypress", this.filterKeys, this);
        }
        if(this.grow){
            this.el.on("keyup", this.onKeyUp,  this, {buffer:50});
            this.el.on("click", this.autoSize,  this);
        }
        if(this.el.is('input[type=password]') && Roo.isSafari){
            this.el.on('keydown', this.SafariOnKeyDown, this);
        }
    },

    processValue : function(value){
        if(this.stripCharsRe){
            var newValue = value.replace(this.stripCharsRe, '');
            if(newValue !== value){
                this.setRawValue(newValue);
                return newValue;
            }
        }
        return value;
    },

    filterValidation : function(e){
        if(!e.isNavKeyPress()){
            this.validationTask.delay(this.validationDelay);
        }
    },

    // private
    onKeyUp : function(e){
        if(!e.isNavKeyPress()){
            this.autoSize();
        }
    },
    // private - clean the leading white space
    cleanLeadingSpace : function(e)
    {
        if ( this.inputType == 'file') {
            return;
        }
        
        this.setValue((this.getValue() + '').replace(/^\s+/,''));
    },
    /**
     * Resets the current field value to the originally-loaded value and clears any validation messages.
     *  
     */
    reset : function(){
        Roo.form.TextField.superclass.reset.call(this);
       
    }, 
    // private
    preFocus : function(){
        
        if(this.selectOnFocus){
            this.el.dom.select();
        }
    },

    
    // private
    filterKeys : function(e){
        var k = e.getKey();
        if(!Roo.isIE && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE && e.button == -1))){
            return;
        }
        var c = e.getCharCode(), cc = String.fromCharCode(c);
        if(Roo.isIE && (e.isSpecialKey() || !cc)){
            return;
        }
        if(!this.maskRe.test(cc)){
            e.stopEvent();
        }
    },

    setValue : function(v){
        
        Roo.form.TextField.superclass.setValue.apply(this, arguments);
        
        this.autoSize();
    },

    /**
     * Validates a value according to the field's validation rules and marks the field as invalid
     * if the validation fails
     * @param {Mixed} value The value to validate
     * @return {Boolean} True if the value is valid, else false
     */
    validateValue : function(value){
        if(value.length < 1)  { // if it's blank
             if(this.allowBlank){
                this.clearInvalid();
                return true;
             }else{
                this.markInvalid(this.blankText);
                return false;
             }
        }
        if(value.length < this.minLength){
            this.markInvalid(String.format(this.minLengthText, this.minLength));
            return false;
        }
        if(value.length > this.maxLength){
            this.markInvalid(String.format(this.maxLengthText, this.maxLength));
            return false;
        }
        if(this.vtype){
            var vt = Roo.form.VTypes;
			if (value.trim() != value) { // trim before checking email (and other stuf??)
				value = value.trim();
				this.el.dom.value  = value;
			}
			
            if(!vt[this.vtype](value, this)){
                this.markInvalid(this.vtypeText || vt[this.vtype +'Text']);
                return false;
            }
        }
        if(typeof this.validator == "function"){
            var msg = this.validator(value);
            if(msg !== true){
                this.markInvalid(msg);
                return false;
            }
        }
        if(this.regex && !this.regex.test(value)){
            this.markInvalid(this.regexText);
            return false;
        }
        return true;
    },

    /**
     * Selects text in this field
     * @param {Number} start (optional) The index where the selection should start (defaults to 0)
     * @param {Number} end (optional) The index where the selection should end (defaults to the text length)
     */
    selectText : function(start, end){
        var v = this.getRawValue();
        if(v.length > 0){
            start = start === undefined ? 0 : start;
            end = end === undefined ? v.length : end;
            var d = this.el.dom;
            if(d.setSelectionRange){
                d.setSelectionRange(start, end);
            }else if(d.createTextRange){
                var range = d.createTextRange();
                range.moveStart("character", start);
                range.moveEnd("character", v.length-end);
                range.select();
            }
        }
    },

    /**
     * Automatically grows the field to accomodate the width of the text up to the maximum field width allowed.
     * This only takes effect if grow = true, and fires the autosize event.
     */
    autoSize : function(){
        if(!this.grow || !this.rendered){
            return;
        }
        if(!this.metrics){
            this.metrics = Roo.util.TextMetrics.createInstance(this.el);
        }
        var el = this.el;
        var v = el.dom.value;
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(v));
        v = d.innerHTML;
        d = null;
        v += "&#160;";
        var w = Math.min(this.growMax, Math.max(this.metrics.getWidth(v) + /* add extra padding */ 10, this.growMin));
        this.el.setWidth(w);
        this.fireEvent("autosize", this, w);
    },
    
    // private
    SafariOnKeyDown : function(event)
    {
        // ingore ctrl press
		
		 
        if ([ 16, 17 ].indexOf(event.keyCode)) {
			return;
		}
		// this is a workaround for a password hang bug on chrome/ webkit.		
        var isSelectAll = false;
        
        if(this.el.dom.selectionEnd > 0){
            isSelectAll = (this.el.dom.selectionEnd - this.el.dom.selectionStart - this.getValue().length == 0) ? true : false;
        }
        if(((event.getKey() == 8 || event.getKey() == 46) && this.getValue().length ==1)){ // backspace and delete key
            event.preventDefault();
            this.setValue('');
            return;
        }
        
        // skip handling paste
        if(isSelectAll && event.getCharCode() > 31 && !(event.ctrlKey && event.getCharCode() == 86)){ // backspace and delete key
            
            event.preventDefault();
            // this is very hacky as keydown always get's upper case.
            
            var cc = String.fromCharCode(event.getCharCode());
            
            
            this.setValue( event.shiftKey ?  cc : cc.toLowerCase());
            
        }
        
        
    }
});