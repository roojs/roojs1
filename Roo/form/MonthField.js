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
 * @class Roo.form.MonthField
 * @extends Roo.form.TriggerField
 * Provides a date input field with a {@link Roo.DatePicker} dropdown and automatic date validation.
* @constructor
* Create a new MonthField
* @param {Object} config
 */
Roo.form.MonthField = function(config){
    Roo.log(this);
    Roo.form.MonthField.superclass.constructor.call(this, config);
    
      this.addEvents({
         
        /**
         * @event select
         * Fires when a date is selected
	     * @param {Roo.form.DateField} combo This combo box
	     * @param {Date} date The date selected
	     */
        'select' : true
         
    });
    
    
    if(typeof this.minValue == "string") this.minValue = this.parseDate(this.minValue);
    if(typeof this.maxValue == "string") this.maxValue = this.parseDate(this.maxValue);
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

Roo.extend(Roo.form.MonthField, Roo.form.TriggerField,  {
    
});