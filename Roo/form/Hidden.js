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
 * @class Roo.form.Hidden
 * @extends Roo.form.TextField
 * Simple Hidden element used on forms 
 * 
 * usage: form.add(new Roo.form.HiddenField({ 'name' : 'test1' }));
 * 
 * @constructor
 * Creates a new Hidden form element.
 * @param {Object} config Configuration options
 */



// easy hidden field...
Roo.form.Hidden = function(config){
    Roo.form.Hidden.superclass.constructor.call(this, config);
};
  
Roo.extend(Roo.form.Hidden, Roo.form.TextField, {
    fieldLabel:      '',
    inputType:      'hidden',
    width:          50,
    allowBlank:     true,
    labelSeparator: '',
    hidden:         true,
    itemCls :       'x-form-item-display-none'


});


