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
    },
    
    
    onRender : function(ct, position){
        Roo.form.Checkbox.superclass.onRender.call(this, ct, position);
        
        if(this.inputValue !== undefined){
            this.el.dom.value = this.inputValue;
        }
         
        this.wrap = this.el.wrap({cls: "x-form-check-wrap"});
        //this.wrap = this.el.wrap({cls: 'x-menu-check-item '});
        //var viewEl = this.wrap.createChild({ 
        //    tag: 'img', cls: 'x-menu-item-icon', style: 'margin: 0px;' ,src : Roo.BLANK_IMAGE_URL });
        //this.viewEl = viewEl;   
        //this.wrap.on('click', this.onClick,  this); 
        
        //this.el.on('DOMAttrModified', this.setFromHidden,  this); //ff
        //this.el.on('propertychange', this.setFromHidden,  this);  //ie
        
        
        
        if(this.boxLabel){
            this.wrap.createChild({tag: 'label', htmlFor: this.el.id, cls: 'x-form-cb-label', html: this.boxLabel});
        //    viewEl.on('click', this.onClick,  this); 
        }
         if(this.checked){
            this.el.dom.checked =   'checked' ;
        }
         
    },
    /**
     * Sets the checked state of the checkbox.
     * On is always based on a string comparison between inputValue and the param.
     * @param {Boolean/String} value - the value to set 
     * @param {Boolean/String} suppressEvent - whether to suppress the checkchange event.
     */
    setValue : function(v,suppressEvent){
        
        
        //this.checked = (v === true || v === 'true' || v == '1' || String(v).toLowerCase() == 'on');
        //if(this.el && this.el.dom){
        //    this.el.dom.checked = this.checked;
        //    this.el.dom.defaultChecked = this.checked;
        //}
        this.setChecked(String(v) === String(this.inputValue), suppressEvent);
        
        this.el.dom.form[this.name].value = v;
     
        //this.fireEvent("check", this, this.checked);
    },
    // private..
    setChecked : function(state,suppressEvent)
    {
         
        if(this.wrap){
            this.wrap[state ? 'addClass' : 'removeClass']('x-menu-item-checked');
        }
        this.checked = state;
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
		 
		  
       
        
    },
    reset : function(){
        // this.setValue(this.resetValue);
        //this.originalValue = this.getValue();
        this.clearInvalid();
    } 
    
});