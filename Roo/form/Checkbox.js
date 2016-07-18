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
 * @class Roo.form.Checkbox
 * @extends Roo.form.Field
 * Single checkbox field.  Can be used as a direct replacement for traditional checkbox fields.
 * @constructor
 * Creates a new Checkbox
 * @param {Object} config Configuration options
 */
Roo.form.Checkbox = function(config){
    Roo.form.Checkbox.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event check
         * Fires when the checkbox is checked or unchecked.
	     * @param {Roo.form.Checkbox} this This checkbox
	     * @param {Boolean} checked The new checked value
	     */
        check : true
    });
};

Roo.extend(Roo.form.Checkbox, Roo.form.Field,  {
    /**
     * @cfg {String} focusClass The CSS class to use when the checkbox receives focus (defaults to undefined)
     */
    focusClass : undefined,
    /**
     * @cfg {String} fieldClass The default CSS class for the checkbox (defaults to "x-form-field")
     */
    fieldClass: "x-form-field",
    /**
     * @cfg {Boolean} checked True if the the checkbox should render already checked (defaults to false)
     */
    checked: false,
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "checkbox", autocomplete: "off"})
     */
    defaultAutoCreate : { tag: "input", type: 'hidden', autocomplete: "off"},
    /**
     * @cfg {String} boxLabel The text that appears beside the checkbox
     */
    boxLabel : "",
    /**
     * @cfg {String} inputValue The value that should go into the generated input element's value attribute
     */  
    inputValue : '1',
    /**
     * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
     */
     valueOff: '0', // value when not checked..

    actionMode : 'viewEl', 
    //
    // private
    itemCls : 'x-menu-check-item x-form-item',
    groupClass : 'x-menu-group-item',
    inputType : 'hidden',
    
    
    inSetChecked: false, // check that we are not calling self...
    
    inputElement: false, // real input element?
    basedOn: false, // ????
    
    isFormField: true, // not sure where this is needed!!!!

    onResize : function(){
        Roo.form.Checkbox.superclass.onResize.apply(this, arguments);
        if(!this.boxLabel){
            this.el.alignTo(this.wrap, 'c-c');
        }
    },

    initEvents : function(){
        Roo.form.Checkbox.superclass.initEvents.call(this);
        this.el.on("click", this.onClick,  this);
        this.el.on("change", this.onClick,  this);
    },


    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    // private
    onRender : function(ct, position){
        Roo.form.Checkbox.superclass.onRender.call(this, ct, position);
        /*
        if(this.inputValue !== undefined){
            this.el.dom.value = this.inputValue;
        }
        */
        //this.wrap = this.el.wrap({cls: "x-form-check-wrap"});
        this.wrap = this.el.wrap({cls: 'x-menu-check-item '});
        var viewEl = this.wrap.createChild({ 
            tag: 'img', cls: 'x-menu-item-icon', style: 'margin: 0px;' ,src : Roo.BLANK_IMAGE_URL });
        this.viewEl = viewEl;   
        this.wrap.on('click', this.onClick,  this); 
        
        this.el.on('DOMAttrModified', this.setFromHidden,  this); //ff
        this.el.on('propertychange', this.setFromHidden,  this);  //ie
        
        
        
        if(this.boxLabel){
            this.wrap.createChild({tag: 'label', htmlFor: this.el.id, cls: 'x-form-cb-label', html: this.boxLabel});
        //    viewEl.on('click', this.onClick,  this); 
        }
        //if(this.checked){
            this.setChecked(this.checked);
        //}else{
            //this.checked = this.el.dom;
        //}

    },

    // private
    initValue : Roo.emptyFn,

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     */
    getValue : function(){
        if(this.el){
            return String(this.el.dom.value) == String(this.inputValue ) ? this.inputValue : this.valueOff;
        }
        return this.valueOff;
        
    },

	// private
    onClick : function(){ 
        if (this.disabled) {
            return;
        }
        this.setChecked(!this.checked);

        //if(this.el.dom.checked != this.checked){
        //    this.setValue(this.el.dom.checked);
       // }
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
        //this.fireEvent("check", this, this.checked);
    },
    // private..
    setChecked : function(state,suppressEvent)
    {
        if (this.inSetChecked) {
            this.checked = state;
            return;
        }
        
    
        if(this.wrap){
            this.wrap[state ? 'addClass' : 'removeClass']('x-menu-item-checked');
        }
        this.checked = state;
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        this.inSetChecked = true;
        this.el.dom.value = state ? this.inputValue : this.valueOff;
        this.inSetChecked = false;
        
    },
    // handle setting of hidden value by some other method!!?!?
    setFromHidden: function()
    {
        if(!this.el){
            return;
        }
        //console.log("SET FROM HIDDEN");
        //alert('setFrom hidden');
        this.setValue(this.el.dom.value);
    },
    
    onDestroy : function()
    {
        if(this.viewEl){
            Roo.get(this.viewEl).remove();
        }
         
        Roo.form.Checkbox.superclass.onDestroy.call(this);
    },
    
    setBoxLabel : function(str)
    {
        this.wrap.select('.x-form-cb-label', true).first().dom.innerHTML = str;
    }

});