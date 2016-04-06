/*
 * - LGPL
 *
 * CheckBox
 * 
 */

/**
 * @class Roo.bootstrap.CheckBox
 * @extends Roo.bootstrap.Input
 * Bootstrap CheckBox class
 * 
 * @cfg {String} valueOff The value that should go into the generated input element's value when unchecked.
 * @cfg {String} inputValue The value that should go into the generated input element's value when checked.
 * @cfg {String} boxLabel The text that appears beside the checkbox
 * @cfg {String} weight (primary|warning|info|danger|success) The text that appears beside the checkbox
 * @cfg {Boolean} checked initnal the element
 * @cfg {Boolean} inline inline the element (default false)
 * @cfg {String} groupId the checkbox group id // normal just use for checkbox
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
        * @param {Roo.bootstrap.CheckBox} this This input
        * @param {Boolean} checked The new checked value
        */
       check : true
    });
    
};

Roo.extend(Roo.bootstrap.CheckBox, Roo.bootstrap.Input,  {
  
    inputType: 'checkbox',
    inputValue: 1,
    valueOff: 0,
    boxLabel: false,
    checked: false,
    weight : false,
    inline: false,
    
    getAutoCreate : function()
    {
        var align = (!this.labelAlign) ? this.parentLabelAlign() : this.labelAlign;
        
        var id = Roo.id();
        
        var cfg = {};
        
        cfg.cls = 'form-group ' + this.inputType; //input-group
        
        if(this.inline){
            cfg.cls += ' ' + this.inputType + '-inline';
        }
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            value : this.inputType == 'radio' ? this.inputValue : ((!this.checked) ? this.valueOff : this.inputValue),
            cls : 'roo-' + this.inputType, //'form-box',
            placeholder : this.placeholder || ''
            
        };
        
        if (this.weight) { // Validity check?
            cfg.cls += " " + this.inputType + "-" + this.weight;
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
            
        }
        
        if (align ==='left' && this.fieldLabel.length) {
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-md-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-md-" + (12 - this.labelWidth), 
                        cn: [
                            inputblock
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                Roo.log(" label");
                cfg.cn = [
                   
                    {
                        tag: this.boxLabel ? 'span' : 'label',
                        'for': id,
                        cls: 'control-label box-input-label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    inputblock
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg.cn = [  inputblock ] ;
                
                
        }
        if(this.boxLabel){
             var boxLabelCfg = {
                tag: 'label',
                //'for': id, // box label is handled by onclick - so no for...
                cls: 'box-label',
                html: this.boxLabel
            };
            
            if(this.tooltip){
                boxLabelCfg.tooltip = this.tooltip;
            }
             
            cfg.cn.push(boxLabelCfg);
        }
        
        
       
        return cfg;
        
    },
    
    /**
     * return the real input element.
     */
    inputEl: function ()
    {
        return this.el.select('input.roo-' + this.inputType,true).first();
    },
    
    labelEl: function()
    {
        return this.el.select('label.control-label',true).first();
    },
    /* depricated... */
    
    label: function()
    {
        return this.labelEl();
    },
    
    initEvents : function()
    {
//        Roo.bootstrap.CheckBox.superclass.initEvents.call(this);
        
        this.inputEl().on('click', this.onClick,  this);
        
        if (this.boxLabel) { 
            this.el.select('label.box-label',true).first().on('click', this.onClick,  this);
        }
        
        this.startValue = this.getValue();
        
        if(this.groupId){
            Roo.bootstrap.CheckBox.register(this);
        }
    },
    
    onClick : function()
    {   
        this.setChecked(!this.checked);
    },
    
    setChecked : function(state,suppressEvent)
    {
        this.startValue = this.getValue();
        
        if(this.inputType == 'radio'){
            
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                e.dom.checked = false;
            });
            
            this.inputEl().dom.checked = true;
            
            this.inputEl().dom.value = this.inputValue;
            
            if(suppressEvent !== true){
                this.fireEvent('check', this, true);
            }
            
            this.validate();
            
            return;
        }
        
        this.checked = state;
        
        this.inputEl().dom.checked = state;
        
        this.inputEl().dom.value = state ? this.inputValue : this.valueOff;
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, state);
        }
        
        this.validate();
    },
    
    getValue : function()
    {
        if(this.inputType == 'radio'){
            return this.getGroupValue();
        }
        
        return this.inputEl().getValue();
        
    },
    
    getGroupValue : function()
    {
        if(typeof(this.el.up('form').child('input[name='+this.name+']:checked', true)) == 'undefined'){
            return '';
        }
        
        return this.el.up('form').child('input[name='+this.name+']:checked', true).value;
    },
    
    setValue : function(v,suppressEvent)
    {
        if(this.inputType == 'radio'){
            this.setGroupValue(v, suppressEvent);
            return;
        }
        
        this.setChecked(((typeof(v) == 'undefined') ? this.checked : (String(v) === String(this.inputValue))), suppressEvent);
        
        this.validate();
    },
    
    setGroupValue : function(v, suppressEvent)
    {
        this.startValue = this.getValue();
        
        Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
            e.dom.checked = false;
            
            if(e.dom.value == v){
                e.dom.checked = true;
            }
        });
        
        if(suppressEvent !== true){
            this.fireEvent('check', this, true);
        }

        this.validate();
        
        return;
    },
    
    validate : function()
    {
        if(
                this.disabled || 
                (this.inputType == 'radio' && this.validateRadio()) ||
                (this.inputType == 'checkbox' && this.validateCheckbox())
        ){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
    },
    
    validateRadio : function()
    {
        var valid = false;
        
        Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
            if(!e.dom.checked){
                return;
            }
            
            valid = true;
            
            return false;
        });
        
        return valid;
    },
    
    validateCheckbox : function()
    {
        if(!this.groupId){
            return (this.getValue() == this.inputValue || this.allowBlank) ? true : false;
        }
        
        var group = Roo.bootstrap.CheckBox.get(this.groupId);
        
        if(!group){
            return false;
        }
        
        var r = false;
        
        for(var i in group){
            if(r){
                break;
            }
            
            r = (group[i].getValue() == group[i].inputValue) ? true : false;
        }
        
        return r;
    },
    
    /**
     * Mark this field as valid
     */
    markValid : function()
    {
        if(this.allowBlank){
            return;
        }
        
        var _this = this;
        
        this.fireEvent('valid', this);
        
        if(this.inputType == 'radio'){
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                e.findParent('.form-group', false, true).removeClass([_this.invalidClass, _this.validClass]);
                e.findParent('.form-group', false, true).addClass(_this.validClass);
            });
            
            return;
        }
        
        if(!this.groupId){
            this.el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            this.el.findParent('.form-group', false, true).addClass(this.validClass);
            return;
        }
        
        var group = Roo.bootstrap.CheckBox.get(this.groupId);
            
        if(!group){
            return;
        }
        
        for(var i in group){
            group[i].el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            group[i].el.findParent('.form-group', false, true).addClass(this.validClass);
        }
    },
    
     /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        if(this.allowBlank){
            return;
        }
        
        var _this = this;
        
        this.fireEvent('invalid', this, msg);
        
        var label = Roo.bootstrap.FieldLabel.get(this.name + '-group');
        
        if(label){
            label.markInvalid();
        }
        
        if(this.inputType == 'radio'){
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                e.findParent('.form-group', false, true).removeClass([_this.invalidClass, _this.validClass]);
                e.findParent('.form-group', false, true).addClass(_this.invalidClass);
            });
            
            return;
        }
        
        if(!this.groupId){
            this.el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            this.el.findParent('.form-group', false, true).addClass(this.invalidClass);
            return;
        }
        
        var group = Roo.bootstrap.CheckBox.get(this.groupId);
            
        if(!group){
            return;
        }
        
        for(var i in group){
            group[i].el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
            group[i].el.findParent('.form-group', false, true).addClass(this.invalidClass);
        }
        
    }
    
});

Roo.apply(Roo.bootstrap.CheckBox, {
    
    groups: {},
    
     /**
    * register a CheckBox Group
    * @param {Roo.bootstrap.CheckBox} the CheckBox to add
    */
    register : function(checkbox)
    {
        if(typeof(this.groups[checkbox.groupId]) == 'undefined'){
            this.groups[checkbox.groupId] = {};
        }
        
        if(this.groups[checkbox.groupId].hasOwnProperty(checkbox.name)){
            return;
        }
        
        this.groups[checkbox.groupId][checkbox.name] = checkbox;
	
    },
    /**
    * fetch a CheckBox Group based on the group ID
    * @param {string} the group ID
    * @returns {Roo.bootstrap.CheckBox} the CheckBox group
    */
    get: function(groupId) {
        if (typeof(this.groups[groupId]) == 'undefined') {
            return false;
        }
        
        return this.groups[groupId] ;
    }
    
    
});
