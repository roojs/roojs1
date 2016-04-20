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
 * @class Roo.form.DateField
 * @extends Roo.form.TriggerField
 * Provides a date input field with a {@link Roo.DatePicker} dropdown and automatic date validation.
* @constructor
* Create a new DateField
* @param {Object} config
 */
Roo.form.DateField = function(config){
    Roo.form.DateField.superclass.constructor.call(this, config);
    
      this.addEvents({
         
        /**
         * @event select
         * Fires when a date is selected
	     * @param {Roo.form.DateField} combo This combo box
	     * @param {Date} date The date selected
	     */
        'select' : true
         
    });
    
    
    if(typeof this.minValue == "string") {
        this.minValue = this.parseDate(this.minValue);
    }
    if(typeof this.maxValue == "string") {
        this.maxValue = this.parseDate(this.maxValue);
    }
    this.ddMatch = null;
    if(this.disabledDates){
        var dd = this.disabledDates;
        var re = "(?:";
        for(var i = 0; i < dd.length; i++){
            re += dd[i];
            if(i != dd.length-1) re += "|";
        }
        this.ddMatch = new RegExp(re + ")");
    }
};

Roo.extend(Roo.form.DateField, Roo.form.TriggerField,  {
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support.  The format must be
     * valid according to {@link Date#parseDate} (defaults to 'm/d/y').
     */
    format : "m/d/y",
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it doesn't match the defined
     * format (defaults to 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|d').
     */
    altFormats : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d",
    /**
     * @cfg {Array} disabledDays
     * An array of days to disable, 0 based. For example, [0, 6] disables Sunday and Saturday (defaults to null).
     */
    disabledDays : null,
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day (defaults to 'Disabled')
     */
    disabledDaysText : "Disabled",
    /**
     * @cfg {Array} disabledDates
     * An array of "dates" to disable, as strings. These strings will be used to build a dynamic regular
     * expression so they are very powerful. Some examples:
     * <ul>
     * <li>["03/08/2003", "09/16/2003"] would disable those exact dates</li>
     * <li>["03/08", "09/16"] would disable those days for every year</li>
     * <li>["^03/08"] would only match the beginning (useful if you are using short years)</li>
     * <li>["03/../2006"] would disable every day in March 2006</li>
     * <li>["^03"] would disable every day in every March</li>
     * </ul>
     * In order to support regular expressions, if you are using a date format that has "." in it, you will have to
     * escape the dot when restricting dates. For example: ["03\\.08\\.03"].
     */
    disabledDates : null,
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date (defaults to 'Disabled')
     */
    disabledDatesText : "Disabled",
    /**
     * @cfg {Date/String} minValue
     * The minimum allowed date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to null).
     */
    minValue : null,
    /**
     * @cfg {Date/String} maxValue
     * The maximum allowed date. Can be either a Javascript date object or a string date in a
     * valid format (defaults to null).
     */
    maxValue : null,
    /**
     * @cfg {String} minText
     * The error text to display when the date in the cell is before minValue (defaults to
     * 'The date in this field must be after {minValue}').
     */
    minText : "The date in this field must be equal to or after {0}",
    /**
     * @cfg {String} maxText
     * The error text to display when the date in the cell is after maxValue (defaults to
     * 'The date in this field must be before {maxValue}').
     */
    maxText : "The date in this field must be equal to or before {0}",
    /**
     * @cfg {String} invalidText
     * The error text to display when the date in the field is invalid (defaults to
     * '{value} is not a valid date - it must be in the format {format}').
     */
    invalidText : "{0} is not a valid date - it must be in the format {1}",
    /**
     * @cfg {String} triggerClass
     * An additional CSS class used to style the trigger button.  The trigger will always get the
     * class 'x-form-trigger' and triggerClass will be <b>appended</b> if specified (defaults to 'x-form-date-trigger'
     * which displays a calendar icon).
     */
    triggerClass : 'x-form-date-trigger',
    

    /**
     * @cfg {Boolean} useIso
     * if enabled, then the date field will use a hidden field to store the 
     * real value as iso formated date. default (false)
     */ 
    useIso : false,
    /**
     * @cfg {String/Object} autoCreate
     * A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "10", autocomplete: "off"})
     */ 
    // private
    defaultAutoCreate : {tag: "input", type: "text", size: "10", autocomplete: "off"},
    
    // private
    hiddenField: false,
    
    onRender : function(ct, position)
    {
        Roo.form.DateField.superclass.onRender.call(this, ct, position);
        if (this.useIso) {
            //this.el.dom.removeAttribute('name'); 
            Roo.log("Changing name?");
            this.el.dom.setAttribute('name', this.name + '____hidden___' ); 
            this.hiddenField = this.el.insertSibling({ tag:'input', type:'hidden', name: this.name },
                    'before', true);
            this.hiddenField.value = this.value ? this.formatDate(this.value, 'Y-m-d') : '';
            // prevent input submission
            this.hiddenName = this.name;
        }
            
            
    },
    
    // private
    validateValue : function(value)
    {
        value = this.formatDate(value);
        if(!Roo.form.DateField.superclass.validateValue.call(this, value)){
            Roo.log('super failed');
            return false;
        }
        if(value.length < 1){ // if it's blank and textfield didn't flag it then it's valid
             return true;
        }
        var svalue = value;
        value = this.parseDate(value);
        if(!value){
            Roo.log('parse date failed' + svalue);
            this.markInvalid(String.format(this.invalidText, svalue, this.format));
            return false;
        }
        var time = value.getTime();
        if(this.minValue && time < this.minValue.getTime()){
            this.markInvalid(String.format(this.minText, this.formatDate(this.minValue)));
            return false;
        }
        if(this.maxValue && time > this.maxValue.getTime()){
            this.markInvalid(String.format(this.maxText, this.formatDate(this.maxValue)));
            return false;
        }
        if(this.disabledDays){
            var day = value.getDay();
            for(var i = 0; i < this.disabledDays.length; i++) {
            	if(day === this.disabledDays[i]){
            	    this.markInvalid(this.disabledDaysText);
                    return false;
            	}
            }
        }
        var fvalue = this.formatDate(value);
        if(this.ddMatch && this.ddMatch.test(fvalue)){
            this.markInvalid(String.format(this.disabledDatesText, fvalue));
            return false;
        }
        return true;
    },

    // private
    // Provides logic to override the default TriggerField.validateBlur which just returns true
    validateBlur : function(){
        return !this.menu || !this.menu.isVisible();
    },
    
    getName: function()
    {
        // returns hidden if it's set..
        if (!this.rendered) {return ''};
        return !this.hiddenName && this.el.dom.name  ? this.el.dom.name : (this.hiddenName || '');
        
    },

    /**
     * Returns the current date value of the date field.
     * @return {Date} The date value
     */
    getValue : function(){
        
        return  this.hiddenField ?
                this.hiddenField.value :
                this.parseDate(Roo.form.DateField.superclass.getValue.call(this)) || "";
    },

    /**
     * Sets the value of the date field.  You can pass a date object or any string that can be parsed into a valid
     * date, using DateField.format as the date format, according to the same rules as {@link Date#parseDate}
     * (the default format used is "m/d/y").
     * <br />Usage:
     * <pre><code>
//All of these calls set the same date value (May 4, 2006)

//Pass a date object:
var dt = new Date('5/4/06');
dateField.setValue(dt);

//Pass a date string (default format):
dateField.setValue('5/4/06');

//Pass a date string (custom format):
dateField.format = 'Y-m-d';
dateField.setValue('2006-5-4');
</code></pre>
     * @param {String/Date} date The date or valid date string
     */
    setValue : function(date){
        if (this.hiddenField) {
            this.hiddenField.value = this.formatDate(this.parseDate(date), 'Y-m-d');
        }
        Roo.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseDate(date)));
        // make sure the value field is always stored as a date..
        this.value = this.parseDate(date);
        
        
    },

    // private
    parseDate : function(value){
        if(!value || value instanceof Date){
            return value;
        }
        var v = Date.parseDate(value, this.format);
         if (!v && this.useIso) {
            v = Date.parseDate(value, 'Y-m-d');
        }
        if(!v && this.altFormats){
            if(!this.altFormatsArray){
                this.altFormatsArray = this.altFormats.split("|");
            }
            for(var i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
                v = Date.parseDate(value, this.altFormatsArray[i]);
            }
        }
        return v;
    },

    // private
    formatDate : function(date, fmt){
        return (!date || !(date instanceof Date)) ?
               date : date.dateFormat(fmt || this.format);
    },

    // private
    menuListeners : {
        select: function(m, d){
            
            this.setValue(d);
            this.fireEvent('select', this, d);
        },
        show : function(){ // retain focus styling
            this.onFocus();
        },
        hide : function(){
            this.focus.defer(10, this);
            var ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function to display the DatePicker
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Roo.menu.DateMenu();
        }
        Roo.apply(this.menu.picker,  {
            showClear: this.allowBlank,
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.ddMatch,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.useIso ? 'Y-m-d' : this.format,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.on(Roo.apply({}, this.menuListeners, {
            scope:this
        }));
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");
    },

    beforeBlur : function(){
        var v = this.parseDate(this.getRawValue());
        if(v){
            this.setValue(v);
        }
    },

    /*@
     * overide
     * 
     */
    isDirty : function() {
        if(this.disabled) {
            return false;
        }
        
        if(typeof(this.startValue) === 'undefined'){
            return false;
        }
        
        return String(this.getValue()) !== String(this.startValue);
        
    }
});