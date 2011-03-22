/*
 * 
 * Licence- LGPL
 * 
 */

/**
 * @class Roo.form.DayPicker
 * @extends Roo.form.Field
 * A Day picker show [M] [T] [W] ....
 * @constructor
 * Creates a new Day Picker
 * @param {Object} config Configuration options
 */
Roo.form.DayPicker= function(config){
    Roo.form.DayPicker.superclass.constructor.call(this, config);
     
};

Roo.extend(Roo.form.DayPicker, Roo.form.Field,  {
    /**
     * @cfg {String} focusClass The CSS class to use when the checkbox receives focus (defaults to undefined)
     */
    focusClass : undefined,
    /**
     * @cfg {String} fieldClass The default CSS class for the checkbox (defaults to "x-form-field")
     */
    fieldClass: "x-form-field",
   
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "checkbox", autocomplete: "off"})
     */
    defaultAutoCreate : { tag: "input", type: 'hidden', autocomplete: "off"},
    
   
    actionMode : 'viewEl', 
    //
    // private
 
    inputType : 'hidden',
    
     
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
       
        this.wrap = this.el.wrap({cls: 'x-form-daypick-item '});
        
        var r1 = '<table><tr>'
        var r2 = '<tr class="x-form-daypick-icons">';
        for (var i=0; i < 7; i++) {
            r1+= '<td><div>' + Date.dayNames[i].substring(0,3) + '</div></td>';
            r2+= '<td><img class="x-menu-item-icon" src="' + Roo.BLANK_IMAGE_URL  +'"></td>';
        }
        
        var viewEl = this.wrap.createChild( r1 + '</tr>' + r2 + '</tr></table>');
        viewEl.select('img').on('click', this.onClick, this);
        this.viewEl = viewEl;   
        
        
        
        this.el.on('DOMAttrModified', this.setFromHidden,  this); //ff
        this.el.on('propertychange', this.setFromHidden,  this);  //ie
        
        
          

    },

    // private
    initValue : Roo.emptyFn,

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     */
    getValue : function(){
        return '';
        
    },

	// private
    onClick : function(e){ 
        //this.setChecked(!this.checked);
        Roo.get(e.target).toggleClass('x-menu-item-checked');
        this.refreshValue();
        //if(this.el.dom.checked != this.checked){
        //    this.setValue(this.el.dom.checked);
       // }
    },
    
    // private
    refreshValue : function()
    {
        var val = '';
        this.viewEl.select('img',true).each(function(e,i,n)  {
            val += e.is(".x-menu-item-checked") ? String(n) : ' ';
        });
        this.setValue(val, true);
    },

    /**
     * Sets the checked state of the checkbox.
     * On is always based on a string comparison between inputValue and the param.
     * @param {Boolean/String} value - the value to set 
     * @param {Boolean/String} suppressEvent - whether to suppress the checkchange event.
     */
    setValue : function(v,suppressEvent){
        if (!this.el.dom.value) {
            return;
        }
        this.el.dom.value = v;
        if (suppressEvent) {
            return ;
        }
        
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
         
        Roo.form.DayPicker.superclass.onDestroy.call(this);
    }

});