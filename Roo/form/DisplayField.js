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
 * @class Ext.form.DisplayField
 * @extends Ext.form.Field
 * A generic Field to display non-editable data.
 * @constructor
 * Creates a new Display Field item.
 * @param {Object} config Configuration options
 */
Ext.form.DisplayText = function(config){
    Ext.form.DisplayText.superclass.constructor.call(this, config);
    
};

Ext.extend(Ext.form.DisplayText, Ext.form.Field,  {
    /**
     * @cfg {String} focusClass The CSS class to use when the checkbox receives focus (defaults to undefined)
     */
    focusClass : undefined,
    /**
     * @cfg {String} fieldClass The default CSS class for the checkbox (defaults to "x-form-field")
     */
    fieldClass: 'x-form-field',
    
     /**
     * @cfg {Function} renderer The renderer for the field (so you can reformat output). should return raw HTML
     */
    renderer: undefined,
    
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "checkbox", autocomplete: "off"})
     */
     
    defaultAutoCreate : { tag: 'input', type: 'hidden', autocomplete: 'off'},

    onResize : function(){
        Ext.form.Field.superclass.onResize.apply(this, arguments);
        
    },

    initEvents : function(){
        // Ext.form.Checkbox.superclass.initEvents.call(this);
        // has no events...
       
    },


    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    // private
    onRender : function(ct, position){
        Ext.form.DisplayText.superclass.onRender.call(this, ct, position);
        //if(this.inputValue !== undefined){
        
        
        this.wrap = this.el.wrap();
        this.viewEl = this.wrap.createChild({ tag: 'div'});
        
        if (this.bodyStyle) {
            this.viewEl.applyStyles(this.bodyStyle);
        }
        //this.viewEl.setStyle('padding', '2px');
        
        this.setValue(this.value);
        
    },

    // private
    initValue : Ext.emptyFn,

  

	// private
    onClick : function(){
        
    },

    /**
     * Sets the checked state of the checkbox.
     * @param {Boolean/String} checked True, 'true', '1', or 'on' to check the checkbox, any other value will uncheck it.
     */
    setValue : function(v){
        this.value = v;
        var html = this.renderer ?  this.renderer(v) : String.format('{0}', v);
        this.viewEl.dom.innerHTML = html;
        Roo.form.DisplayText.superclass.setValue.call(this, v);

    }
});