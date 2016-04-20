/*
 * - LGPL
 *
 * Radio
 *
 *
 * not inline
 *<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
 *
 *
 *inline
 *<span>
 *<label class="radio-inline">fieldLabel</label>
 *<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
</label>
<span>
 * 
 * 
 */

/**
 * @class Roo.bootstrap.Radio
 * @extends Roo.bootstrap.CheckBox
 * Bootstrap Radio class

 * @constructor
 * Create a new Radio
 * @param {Object} config The config object
 */

Roo.bootstrap.Radio = function(config){
    Roo.bootstrap.Radio.superclass.constructor.call(this, config);
   
};

Roo.extend(Roo.bootstrap.Radio, Roo.bootstrap.CheckBox,  {
    
    inputType: 'radio',
    inputValue: '',
    valueOff: '',
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        align = align || 'left'; // default...
        
        
        
        var id = Roo.id();
        
        var cfg = {
                tag : this.inline ? 'span' : 'div',
                cls : '',
                cn : []
        };
        
        var inline = this.inline ? ' radio-inline' : '';
        
        var lbl = {
                tag: 'label' ,
                // does not need for, as we wrap the input with it..
                'for' : id,
                cls : 'control-label box-label' + inline,
                cn : []
        };
        var labelWidth = this.labelWidth ? this.labelWidth *1 : 100;
        
        var fieldLabel = {
            tag: 'label' ,
            //cls : 'control-label' + inline,
            html : this.fieldLabel,
            style : 'width:' +  labelWidth  + 'px;line-height:1;vertical-align:bottom;cursor:default;' // should be css really.
        };
        
 
        
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            //value : (!this.checked) ? this.valueOff : this.inputValue,
            value : this.inputValue,
            cls : 'roo-radio',
            placeholder : this.placeholder || '' // ?? needed????
            
        };
        if (this.weight) { // Validity check?
            input.cls += " radio-" + this.weight;
        }
        if (this.disabled) {
            input.disabled=true;
        }
        
        if(this.checked){
            input.checked = this.checked;
        }
        
        if (this.name) {
            input.name = this.name;
        }
        
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        
        //?? can span's inline have a width??
        
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        var inputblock = input;
        
        if (this.before || this.after) {
            
            inputblock = {
                cls : 'input-group',
                tag : 'span',
                cn :  [] 
            };
            if (this.before) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.before
                });
            }
            inputblock.cn.push(input);
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        };
        
        
        if (this.fieldLabel && this.fieldLabel.length) {
            cfg.cn.push(fieldLabel);
        }
       
        // normal bootstrap puts the input inside the label.
        // however with our styled version - it has to go after the input.
       
        //lbl.cn.push(inputblock);
        
        var lblwrap =  {
            tag: 'span',
            cls: 'radio' + inline,
            cn: [
                inputblock,
                lbl
            ]
        };
        
        cfg.cn.push( lblwrap);
        
        if(this.boxLabel){
            lbl.cn.push({
                tag: 'span',
                html: this.boxLabel
            })
        }
         
        
        return cfg;
        
    },
    
    initEvents : function()
    {
//        Roo.bootstrap.CheckBox.superclass.initEvents.call(this);
        
        this.inputEl().on('click', this.onClick,  this);
        if (this.boxLabel) {
            //Roo.log('find label');
            this.el.select('span.radio label span',true).first().on('click', this.onClick,  this);
        }
        
    },
    
    inputEl: function ()
    {
        return this.el.select('input.roo-radio',true).first();
    },
    onClick : function()
    {   
        Roo.log("click");
        this.setChecked(true);
    },
    
    setChecked : function(state,suppressEvent)
    {
        if(state){
            Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
                v.dom.checked = false;
            });
        }
        Roo.log(this.inputEl().dom);
        this.checked = state;
        this.inputEl().dom.checked = state;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        //this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
    },
    
    getGroupValue : function()
    {
        var value = '';
        Roo.each(this.inputEl().up('form').select('input[name='+this.inputEl().dom.name+']', true).elements, function(v){
            if(v.dom.checked == true){
                value = v.dom.value;
            }
        });
        
        return value;
    },
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        return this.getGroupValue();
    }
    
});

 
