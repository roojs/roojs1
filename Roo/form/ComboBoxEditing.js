/*
 * Copyright(c) 2010 RooJSolutions
 * Licence LGPL
 *
 * <script type="text/javascript">
 */
 

/**
 * @class Roo.form.ComboBoxEditing
 * @extends Roo.form.ComboBox
 * Add on to the combobox with support
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Ext.form.ComboBoxAdder = function(config){
    
    Ext.form.ComboBoxAdder.superclass.constructor.call(this, config);
    this.on('select', function(cb, rec, ix) {
        cb.lastData = rec.data;
    });
    this.addEvents({
        'adderclick' : true
    });
}
 
Ext.extend(Ext.form.ComboBoxAdder, Ext.form.ComboBox, { 
    lastData : false,
    //onAddClick: function() { },
    
    onRender : function(ct, position) 
    {
        Ext.form.ComboBoxAdder.superclass.onRender.call(this, ct, position); 
        this.adder = this.wrap.createChild(
            {tag: 'img', src: Ext.BLANK_IMAGE_URL, cls: 'x-form-adder' });  
        var _t = this;
        this.adder.on('click', function(e) {
            _t.fireEvent('adderclick', this, e);
        }, _t);
        //this.adder.on('click', this.onAddClick, _t);
    }
    
});