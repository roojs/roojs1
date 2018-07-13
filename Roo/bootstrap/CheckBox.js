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
 * @cfg {String} tooltip label tooltip
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
       check : true,
       /**
        * @event click
        * Fires when the element is click.
        * @param {Roo.bootstrap.CheckBox} this This input
        */
       click : true
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
    tooltip : '',
    
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
            value : this.inputValue,
            cls : 'roo-' + this.inputType, //'form-box',
            placeholder : this.placeholder || ''
            
        };
        
        if(this.inputType != 'radio'){
            var hidden =  {
                tag: 'input',
                type : 'hidden',
                cls : 'roo-hidden-value',
                value : this.checked ? this.inputValue : this.valueOff
            };
        }
        
            
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
            
            if(this.inputType != 'radio'){
                hidden.name = this.name;
                input.name = '_hidden_' + this.name;
            }
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
            
            if(this.inputType != 'radio'){
                inputblock.cn.push(hidden);
            }
            
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        }
        
        if (align ==='left' && this.fieldLabel.length) {
//                Roo.log("left and has label");
            cfg.cn = [
                {
                    tag: 'label',
                    'for' :  id,
                    cls : 'control-label',
                    html : this.fieldLabel
                },
                {
                    cls : "", 
                    cn: [
                        inputblock
                    ]
                }
            ];
            
            if(this.labelWidth > 12){
                cfg.cn[0].style = "width: " + this.labelWidth + 'px';
            }
            
            if(this.labelWidth < 13 && this.labelmd == 0){
                this.labelmd = this.labelWidth;
            }
            
            if(this.labellg > 0){
                cfg.cn[0].cls += ' col-lg-' + this.labellg;
                cfg.cn[1].cls += ' col-lg-' + (12 - this.labellg);
            }
            
            if(this.labelmd > 0){
                cfg.cn[0].cls += ' col-md-' + this.labelmd;
                cfg.cn[1].cls += ' col-md-' + (12 - this.labelmd);
            }
            
            if(this.labelsm > 0){
                cfg.cn[0].cls += ' col-sm-' + this.labelsm;
                cfg.cn[1].cls += ' col-sm-' + (12 - this.labelsm);
            }
            
            if(this.labelxs > 0){
                cfg.cn[0].cls += ' col-xs-' + this.labelxs;
                cfg.cn[1].cls += ' col-xs-' + (12 - this.labelxs);
            }
            
        } else if ( this.fieldLabel.length) {
//                Roo.log(" label");
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
            
//                Roo.log(" no label && no align");
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
        
        if(this.inputType != 'radio'){
            cfg.cn.push(hidden);
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
    hiddenEl: function ()
    {
        return this.el.select('input.roo-hidden-value',true).first();
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
    
    boxLabelEl: function()
    {
        return this.el.select('label.box-label',true).first();
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
    
    onClick : function(e)
    {   
        if(this.fireEvent('click', this, e) !== false){
            this.setChecked(!this.checked);
        }
        
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
        
        
        this.hiddenEl().dom.value = state ? this.inputValue : this.valueOff;
        
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
        
        return this.hiddenEl().dom.value;
        
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
        if(this.getVisibilityEl().hasClass('hidden') || !this.getVisibilityEl().isVisible(true)){
            return true;
        }
        
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
        if(this.getVisibilityEl().hasClass('hidden') || !this.getVisibilityEl().isVisible(true)){
            return true;
        }
        
        if(this.allowBlank){
            return true;
        }
        
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
            //return (this.getValue() == this.inputValue) ? true : false;
        }
        
        var group = Roo.bootstrap.CheckBox.get(this.groupId);
        
        if(!group){
            return false;
        }
        
        var r = false;
        
        for(var i in group){
            if(group[i].el.isVisible(true)){
                r = false;
                break;
            }
            
            r = true;
        }
        
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
        var _this = this;
        
        this.fireEvent('valid', this);
        
        var label = Roo.bootstrap.FieldLabel.get(this.name + '-group');
        
        if(this.groupId){
            label = Roo.bootstrap.FieldLabel.get(this.groupId + '-group');
        }
        
        if(label){
            label.markValid();
        }

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
        
        if(this.groupId){
            label = Roo.bootstrap.FieldLabel.get(this.groupId + '-group');
        }
        
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
        
    },
    
    clearInvalid : function()
    {
        Roo.bootstrap.Input.prototype.clearInvalid.call(this);
        
        // this.el.findParent('.form-group', false, true).removeClass([this.invalidClass, this.validClass]);
        
        var label = Roo.bootstrap.FieldLabel.get(this.name + '-group');
        
        if (label && label.iconEl) {
            label.iconEl.removeClass(label.validClass);
            label.iconEl.removeClass(label.invalidClass);
        }
    },
    
    disable : function()
    {
        if(this.inputType != 'radio'){
            Roo.bootstrap.CheckBox.superclass.disable.call(this);
            return;
        }
        
        var _this = this;
        
        if(this.rendered){
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                _this.getActionEl().addClass(this.disabledClass);
                e.dom.disabled = true;
            });
        }
        
        this.disabled = true;
        this.fireEvent("disable", this);
        return this;
    },

    enable : function()
    {
        if(this.inputType != 'radio'){
            Roo.bootstrap.CheckBox.superclass.enable.call(this);
            return;
        }
        
        var _this = this;
        
        if(this.rendered){
            Roo.each(this.el.up('form').select('input[name='+this.name+']', true).elements, function(e){
                _this.getActionEl().removeClass(this.disabledClass);
                e.dom.disabled = false;
            });
        }
        
        this.disabled = false;
        this.fireEvent("enable", this);
        return this;
    },
    
    setBoxLabel : function(v)
    {
        this.boxLabel = v;
        
        if(this.rendered){
            this.el.select('label.box-label',true).first().dom.innerHTML = (v === null || v === undefined ? '' : v);
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
