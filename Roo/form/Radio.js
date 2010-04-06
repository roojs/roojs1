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
 * @class Roo.form.Radio
 * @extends Roo.form.Checkbox
 * Single radio field.  Same as Checkbox, but provided as a convenience for automatically setting the input type.
 * Radio grouping is handled automatically by the browser if you give each radio in a group the same name.
 * @constructor
 * Creates a new Radio
 * @param {Object} config Configuration options
 */
Roo.form.Radio = function(){
    Roo.form.Radio.superclass.constructor.apply(this, arguments);
};
Roo.extend(Roo.form.Radio, Roo.form.Checkbox, {
    inputType: 'radio',

    /**
     * If this radio is part of a group, it will return the selected value
     * @return {String}
     */
    getGroupValue : function(){
        return this.el.up('form').child('input[name='+this.el.dom.name+']:checked', true).value;
    }
});