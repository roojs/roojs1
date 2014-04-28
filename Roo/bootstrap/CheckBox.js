/*
 * - LGPL
 *
 * CheckBox
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Component
 * Bootstrap CheckBox class
 * 
 * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
 * 
 * @constructor
 * Create a new CheckBox
 * @param {Object} config The config object
 */

Roo.bootstrap.CheckBox = function(config){
    Roo.bootstrap.CheckBox.superclass.constructor.call(this, config);
   
        this.addEvents({
            /**
            * @event check
            * Fires when the element is checked or unchecked.
            * @param {Roo.bootstrap.Input} this This input
            * @param {Boolean} checked The new checked value
            */
           check : true
        });
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
    
    
    getAutoCreate : function()
    {
        
        
    },
    
    initEvents : function()
    {
        this.inputEl().on('click', this.onClick,  this);
    },
    
//    getGroupValue : function()
//    {
//        if(typeof(this.inputEl().up('form').child('input[name='+this.inputEl().dom.name+']:checked', true)) == 'undefined'){
//            return '';
//        }
//        
//        return this.inputEl().up('form').child('input[name='+this.inputEl().dom.name+']:checked', true).value;
//    },
    
    onClick : function()
    {
        if(this.inputType != 'checkbox' && this.inputType != 'radio'){
            return;
        }
        
        this.setChecked(!this.checked);
    },
    
    setChecked : function(state,suppressEvent)
    {
    
        this.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.inputEl().dom.value = state ? this.value : this.valueOff;
        
    }
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
//    getValue : function(){
//        return this.getGroupValue();
//    },
    
});

 
