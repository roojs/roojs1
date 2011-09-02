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
        
        if(!this.tpl){
            this.tpl = '<div class="'+cls+'-item">{' + this.displayField + '}</div>';
        }
 
        
        Roo.form.ComboCheck.superclass.onRender.call(this, ct, position);
         
        
    },
 

    /** 
    * @cfg {Boolean} grow 
    * @hide 
    */
    /** 
    * @cfg {Number} growMin 
    * @hide 
    */
    /** 
    * @cfg {Number} growMax 
    * @hide 
    */
    /**
     * @hide
     * @method autoSize
     */
});