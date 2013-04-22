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
});