/*
 * RooJS Library 1.1.1
 * Copyright(c) 2008-2011  Alan Knowles
 *
 * License - LGPL
 */
 

/**
 * @class Roo.form.ComboCheck
 * @extends Roo.form.ComboBox
 * A combobox for multiple select items.
 * @constructor
 * Create a new ComboCheck
 * @param {Object} config Configuration options
 */
Roo.form.ComboCheck = function(config){
    Roo.form.ComboCheck.superclass.constructor.call(this, config);
    // should verify some data...
    // like
    // hiddenName = required..
    // displayField = required
    // valudField == required
   
};

Roo.extend(Roo.form.ComboCheck, Roo.form.ComboBox, {
     
     
    editable : false,
     
    
    
    // private
    onRender : function(ct, position){
        var _t = this;
        
        if(!this.tpl){
            this.tpl =  new Roo.Template({
                html :  '<div class="'+cls+'-item x-menu-check-item{' + this.valueField + ':this.checked}">' +
                   '<img class="x-menu-item-icon" style="margin: 0px;" src="' + Roo.BLANK_IMAGE_URL + '">' + 
                   '<span>{' + this.displayField + '}</span>' +
                    '</div>',
                checked: function (value, allValues) {
                    var ar = Roo.decode(_t.getValue()) || [];
                    var ar = typeof(ar) == 'Array' ? ar : [];
                    return ar.indexOf(value) ? ' x-menu-item-checked' : ''
                }
            });
        }
 
        
        Roo.form.ComboCheck.superclass.onRender.call(this, ct, position);
         
        
    },
 
 
});