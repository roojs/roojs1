/*
 * - LGPL
 *
 * Input
 * 
 */

/**
 * @class Roo.bootstrap.Input
 * @extends Roo.bootstrap.Component
 * Bootstrap Input class
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} inputType button | checkbox | email | file | hidden | image | number | password | radio | range | reset | search | submit | text
 * @cfg {String} name name of the input
 * @cfg {string} fieldLabel - the label associated
 * @cfg {string} placeholder - placeholder to put in text.
 * @cfg {string}  before - input group add on before
 * @cfg {string} after - input group add on after
 * @cfg {string} size - (lg|sm) or leave empty..
 * @cfg {Number} xs colspan out of 12 for mobile-sized screens
 * @cfg {Number} sm colspan out of 12 for tablet-sized screens
 * @cfg {Number} md colspan out of 12 for computer-sized screens
 * @cfg {Number} lg colspan out of 12 for large computer-sized screens
 * @cfg {string} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {Boolean} readOnly Specifies that the field should be read-only
 * @cfg {String} autocomplete - default is new-password see: https://developers.google.com/web/fundamentals/input/form/label-and-name-inputs?hl=en

 * @cfg {String} align (left|center|right) Default left
 * @cfg {Boolean} forceFeedback (true|false) Default false
 * 
 * 
 * 
 * 
 * @constructor
 * Create a new Input
 * @param {Object} config The config object
 */

Roo.bootstrap.Input = function(config){
    Roo.bootstrap.Input.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
             * @event focus
             * Fires when this field receives input focus.
             * @param {Roo.form.Field} this
             */
            focus : true,
            /**
             * @event blur
             * Fires when this field loses input focus.
             * @param {Roo.form.Field} this
             */
            blur : true,
            /**
             * @event specialkey
             * Fires when any key related to navigation (arrows, tab, enter, esc, etc.) is pressed.  You can check
             * {@link Roo.EventObject#getKey} to determine which key was pressed.
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject} e The event object
             */
            specialkey : true,
            /**
             * @event change
             * Fires just before the field blurs if the field value has changed.
             * @param {Roo.form.Field} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            change : true,
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
            valid : true,
             /**
             * @event keyup
             * Fires after the key up
             * @param {Roo.form.Field} this
             * @param {Roo.EventObject}  e The event Object
             */
            keyup : true
        });
};

Roo.extend(Roo.bootstrap.Input, Roo.bootstrap.Component,  {
     /**
     * @cfg {String/Boolean} validationEvent The event that should initiate field validation. Set to false to disable
      automatic validation (defaults to "keyup").
     */
    validationEvent : "keyup",
     /**
     * @cfg {Boolean} validateOnBlur Whether the field should validate when it loses focus (defaults to true).
     */
    validateOnBlur : true,
    /**
     * @cfg {Number} validationDelay The length of time in milliseconds after user input begins until validation is initiated (defaults to 250)
     */
    validationDelay : 250,
     /**
     * @cfg {String} focusClass The CSS class to use when the field receives focus (defaults to "x-form-focus")
     */
    focusClass : "x-form-focus",  // not needed???
    
       
    /**
     * @cfg {String} invalidClass The CSS class to use when marking a field invalid (defaults to "x-form-invalid")
     */
    invalidClass : "has-warning",
    
    /**
     * @cfg {String} validClass The CSS class to use when marking a field valid (defaults to "x-form-invalid")
     */
    validClass : "has-success",
    
    /**
     * @cfg {Boolean} hasFeedback (true|false) default true
     */
    hasFeedback : true,
    
    /**
     * @cfg {String} invalidFeedbackIcon The CSS class to use when create feedback icon (defaults to "x-form-invalid")
     */
    invalidFeedbackClass : "glyphicon-warning-sign",
    
    /**
     * @cfg {String} validFeedbackIcon The CSS class to use when create feedback icon (defaults to "x-form-invalid")
     */
    validFeedbackClass : "glyphicon-ok",
    
    /**
     * @cfg {Boolean} selectOnFocus True to automatically select any existing field text when the field receives input focus (defaults to false)
     */
    selectOnFocus : false,
    
     /**
     * @cfg {String} maskRe An input mask regular expression that will be used to filter keystrokes that don't match (defaults to null)
     */
    maskRe : null,
       /**
     * @cfg {String} vtype A validation type name as defined in {@link Roo.form.VTypes} (defaults to null)
     */
    vtype : null,
    
      /**
     * @cfg {Boolean} disableKeyFilter True to disable input keystroke filtering (defaults to false)
     */
    disableKeyFilter : false,
    
       /**
     * @cfg {Boolean} disabled True to disable the field (defaults to false).
     */
    disabled : false,
     /**
     * @cfg {Boolean} allowBlank False to validate that the value length > 0 (defaults to true)
     */
    allowBlank : true,
    /**
     * @cfg {String} blankText Error text to display if the allow blank validation fails (defaults to "This field is required")
     */
    blankText : "This field is required",
    
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
    
    autocomplete: false,
    
    
    fieldLabel : '',
    inputType : 'text',
    
    name : false,
    placeholder: false,
    before : false,
    after : false,
    size : false,
    hasFocus : false,
    preventMark: false,
    isFormField : true,
    value : '',
    labelWidth : 2,
    labelAlign : false,
    readOnly : false,
    align : false,
    formatedValue : false,
    forceFeedback : false,
    
    parentLabelAlign : function()
    {
        var parent = this;
        while (parent.parent()) {
            parent = parent.parent();
            if (typeof(parent.labelAlign) !='undefined') {
                return parent.labelAlign;
            }
        }
        return 'left';
        
    },
    
    getAutoCreate : function(){
        
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        if(this.inputType != 'hidden'){
            cfg.cls = 'form-group' //input-group
        }
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : this.value,
            cls : 'form-control',
            placeholder : this.placeholder || '',
            autocomplete : this.autocomplete || 'new-password'
        };
        
        
        if(this.align){
            input.style = (typeof(input.style) == 'undefined') ? ('text-align:' + this.align) : (input.style + 'text-align:' + this.align);
        }
        
        if(this.maxLength && this.maxLength != Number.MAX_VALUE){
            input.maxLength = this.maxLength;
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        if (this.readOnly) {
            input.readonly=true;
        }
        
        if (this.name) {
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        var inputblock = input;
        
        var feedback = {
            tag: 'span',
            cls: 'glyphicon form-control-feedback'
        };
            
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
            
            inputblock = {
                cls : 'has-feedback',
                cn :  [
                    input,
                    feedback
                ] 
            };  
        }
        
        if (this.before || this.after) {
            
            inputblock = {
                cls : 'input-group',
                cn :  [] 
            };
            
            if (this.before && typeof(this.before) == 'string') {
                
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-before input-group-addon',
                    html : this.before
                });
            }
            if (this.before && typeof(this.before) == 'object') {
                this.before = Roo.factory(this.before);
                
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-before input-group-' +
                        (this.before.xtype == 'Button' ? 'btn' : 'addon')  //?? what about checkboxes - that looks like a bit of a hack thought? 
                });
            }
            
            inputblock.cn.push(input);
            
            if (this.after && typeof(this.after) == 'string') {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-after input-group-addon',
                    html : this.after
                });
            }
            if (this.after && typeof(this.after) == 'object') {
                this.after = Roo.factory(this.after);
                
                inputblock.cn.push({
                    tag :'span',
                    cls : 'roo-input-after input-group-' +
                        (this.after.xtype == 'Button' ? 'btn' : 'addon')  //?? what about checkboxes - that looks like a bit of a hack thought? 
                });
            }
            
            if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
                inputblock.cls += ' has-feedback';
                inputblock.cn.push(feedback);
            }
        };
        
        if (align ==='left' && this.fieldLabel.length) {
                
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
                        cn: [
                            inputblock
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                cfg.cn = [
                    
                        inputblock
                    
                ];
                
                
        };
        
        if (this.parentType === 'Navbar' &&  this.parent().bar) {
           cfg.cls += ' navbar-form';
        }
        
        return cfg;
        
    },
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input.form-control',true).first();
    },
    
    tooltipEl : function()
    {
        return this.inputEl();
    },
    
    setDisabled : function(v)
    {
        var i  = this.inputEl().dom;
        if (!v) {
            i.removeAttribute('disabled');
            return;
            
        }
        i.setAttribute('disabled','true');
    },
    initEvents : function()
    {
          
        this.inputEl().on("keydown" , this.fireKey,  this);
        this.inputEl().on("focus", this.onFocus,  this);
        this.inputEl().on("blur", this.onBlur,  this);
        
        this.inputEl().relayEvent('keyup', this);
 
        // reference to original value for reset
        this.originalValue = this.getValue();
        //Roo.form.TextField.superclass.initEvents.call(this);
        if(this.validationEvent == 'keyup'){
            this.validationTask = new Roo.util.DelayedTask(this.validate, this);
            this.inputEl().on('keyup', this.filterValidation, this);
        }
        else if(this.validationEvent !== false){
            this.inputEl().on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        
        if(this.selectOnFocus){
            this.on("focus", this.preFocus, this);
            
        }
        if(this.maskRe || (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Roo.form.VTypes[this.vtype+'Mask']))){
            this.inputEl().on("keypress", this.filterKeys, this);
        }
       /* if(this.grow){
            this.el.on("keyup", this.onKeyUp,  this, {buffer:50});
            this.el.on("click", this.autoSize,  this);
        }
        */
        if(this.inputEl().is('input[type=password]') && Roo.isSafari){
            this.inputEl().on('keydown', this.SafariOnKeyDown, this);
        }
        
        if (typeof(this.before) == 'object') {
            this.before.render(this.el.select('.roo-input-before',true).first());
        }
        if (typeof(this.after) == 'object') {
            this.after.render(this.el.select('.roo-input-after',true).first());
        }
        
        
    },
    filterValidation : function(e){
        if(!e.isNavKeyPress()){
            this.validationTask.delay(this.validationDelay);
        }
    },
     /**
     * Validates the field value
     * @return {Boolean} True if the value is valid, else false
     */
    validate : function(){
        //if(this.disabled || this.validateValue(this.processValue(this.getRawValue()))){
        if(this.disabled || this.validateValue(this.getRawValue())){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
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
                return true;
            }
            return false;
        }
        
        if(value.length < this.minLength){
            return false;
        }
        if(value.length > this.maxLength){
            return false;
        }
        if(this.vtype){
            var vt = Roo.form.VTypes;
            if(!vt[this.vtype](value, this)){
                return false;
            }
        }
        if(typeof this.validator == "function"){
            var msg = this.validator(value);
            if(msg !== true){
                return false;
            }
        }
        
        if(this.regex && !this.regex.test(value)){
            return false;
        }
        
        return true;
    },

    
    
     // private
    fireKey : function(e){
        //Roo.log('field ' + e.getKey());
        if(e.isNavKeyPress()){
            this.fireEvent("specialkey", this, e);
        }
    },
    focus : function (selectText){
        if(this.rendered){
            this.inputEl().focus();
            if(selectText === true){
                this.inputEl().dom.select();
            }
        }
        return this;
    } ,
    
    onFocus : function(){
        if(!Roo.isOpera && this.focusClass){ // don't touch in Opera
           // this.el.addClass(this.focusClass);
        }
        if(!this.hasFocus){
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    },
    
    beforeBlur : Roo.emptyFn,

    
    // private
    onBlur : function(){
        this.beforeBlur();
        if(!Roo.isOpera && this.focusClass){ // don't touch in Opera
            //this.el.removeClass(this.focusClass);
        }
        this.hasFocus = false;
        if(this.validationEvent !== false && this.validateOnBlur && this.validationEvent != "blur"){
            this.validate();
        }
        var v = this.getValue();
        if(String(v) !== String(this.startValue)){
            this.fireEvent('change', this, v, this.startValue);
        }
        this.fireEvent("blur", this);
    },
    
    /**
     * Resets the current field value to the originally loaded value and clears any validation messages
     */
    reset : function(){
        this.setValue(this.originalValue);
        this.validate();
    },
     /**
     * Returns the name of the field
     * @return {Mixed} name The name field
     */
    getName: function(){
        return this.name;
    },
     /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        
        var v = this.inputEl().getValue();
        
        return v;
    },
    /**
     * Returns the raw data value which may or may not be a valid, defined value.  To return a normalized value see {@link #getValue}.
     * @return {Mixed} value The field value
     */
    getRawValue : function(){
        var v = this.inputEl().getValue();
        
        return v;
    },
    
    /**
     * Sets the underlying DOM field's value directly, bypassing validation.  To set the value with validation see {@link #setValue}.
     * @param {Mixed} value The value to set
     */
    setRawValue : function(v){
        return this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
    },
    
    selectText : function(start, end){
        var v = this.getRawValue();
        if(v.length > 0){
            start = start === undefined ? 0 : start;
            end = end === undefined ? v.length : end;
            var d = this.inputEl().dom;
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
     * Sets a data value into the field and validates it.  To set the value directly without validation see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     */
    setValue : function(v){
        this.value = v;
        if(this.rendered){
            this.inputEl().dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }
    },
    
    /*
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
  */
    preFocus : function(){
        
        if(this.selectOnFocus){
            this.inputEl().dom.select();
        }
    },
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
     /**
     * Clear any invalid styles/messages for this field
     */
    clearInvalid : function(){
        
        if(!this.el || this.preventMark){ // not rendered
            return;
        }
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();
        
        if(label && icon){
            icon.remove();
        }
        
        this.el.removeClass(this.invalidClass);
        
        if(this.hasFeedback && this.inputType != 'hidden' && !this.allowBlank){
            
            var feedback = this.el.select('.form-control-feedback', true).first();
            
            if(feedback){
                this.el.select('.form-control-feedback', true).first().removeClass(this.invalidFeedbackClass);
            }
            
        }
        
        this.fireEvent('valid', this);
    },
    
     /**
     * Mark this field as valid
     */
    markValid : function()
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
        
        var formGroup = this.el.findParent('.form-group', false, true);
        
        if(formGroup){
            
            var label = formGroup.select('label', true).first();
            var icon = formGroup.select('i.fa-star', true).first();
            
            if(label && icon){
                icon.remove();
            }
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
        
        var formGroup = this.el.findParent('.form-group', false, true);
        
        if(formGroup){
            var label = formGroup.select('label', true).first();
            var icon = formGroup.select('i.fa-star', true).first();

            if(!this.getValue().length && label && !icon){
                this.el.findParent('.form-group', false, true).createChild({
                    tag : 'i',
                    cls : 'text-danger fa fa-lg fa-star',
                    tooltip : 'This field is required',
                    style : 'margin-right:5px;'
                }, label, true);
            }
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
    },
    // private
    SafariOnKeyDown : function(event)
    {
        // this is a workaround for a password hang bug on chrome/ webkit.
        
        var isSelectAll = false;
        
        if(this.inputEl().dom.selectionEnd > 0){
            isSelectAll = (this.inputEl().dom.selectionEnd - this.inputEl().dom.selectionStart - this.getValue().length == 0) ? true : false;
        }
        if(((event.getKey() == 8 || event.getKey() == 46) && this.getValue().length ==1)){ // backspace and delete key
            event.preventDefault();
            this.setValue('');
            return;
        }
        
        if(isSelectAll  && event.getCharCode() > 31){ // not backspace and delete key
            
            event.preventDefault();
            // this is very hacky as keydown always get's upper case.
            //
            var cc = String.fromCharCode(event.getCharCode());
            this.setValue( event.shiftKey ?  cc : cc.toLowerCase());
            
        }
    },
    adjustWidth : function(tag, w){
        tag = tag.toLowerCase();
        if(typeof w == 'number' && Roo.isStrict && !Roo.isSafari){
            if(Roo.isIE && (tag == 'input' || tag == 'textarea')){
                if(tag == 'input'){
                    return w + 2;
                }
                if(tag == 'textarea'){
                    return w-2;
                }
            }else if(Roo.isOpera){
                if(tag == 'input'){
                    return w + 2;
                }
                if(tag == 'textarea'){
                    return w-2;
                }
            }
        }
        return w;
    }
    
});

 
