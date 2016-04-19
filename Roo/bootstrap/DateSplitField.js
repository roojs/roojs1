/*
 * - LGPL
 *
 * page DateSplitField.
 * 
 */


/**
 * @class Roo.bootstrap.DateSplitField
 * @extends Roo.bootstrap.Component
 * Bootstrap DateSplitField class
 * @cfg {string} fieldLabel - the label associated
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {Boolean} dayAllowBlank (true|false) default false
 * @cfg {Boolean} monthAllowBlank (true|false) default false
 * @cfg {Boolean} yearAllowBlank (true|false) default false
 * @cfg {string} dayPlaceholder 
 * @cfg {string} monthPlaceholder
 * @cfg {string} yearPlaceholder
 * @cfg {string} dayFormat default 'd'
 * @cfg {string} monthFormat default 'm'
 * @cfg {string} yearFormat default 'Y'

 *     
 * @constructor
 * Create a new DateSplitField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateSplitField = function(config){
    Roo.bootstrap.DateSplitField.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
         /**
         * @event years
         * getting the data of years
         * @param {Roo.bootstrap.DateSplitField} this
         * @param {Object} years
         */
        "years" : true,
        /**
         * @event days
         * getting the data of days
         * @param {Roo.bootstrap.DateSplitField} this
         * @param {Object} days
         */
        "days" : true,
        /**
         * @event invalid
         * Fires after the field has been marked as invalid.
         * @param {Roo.form.Field} this
         * @param {String} msg The validation message
         */
        invalid : true,
       /**
         * @event valid
         * Fires after the field has been validated with no errors.
         * @param {Roo.form.Field} this
         */
        valid : true
    });
};

Roo.extend(Roo.bootstrap.DateSplitField, Roo.bootstrap.Component,  {
    
    fieldLabel : '',
    labelAlign : 'top',
    labelWidth : 3,
    dayAllowBlank : false,
    monthAllowBlank : false,
    yearAllowBlank : false,
    dayPlaceholder : '',
    monthPlaceholder : '',
    yearPlaceholder : '',
    dayFormat : 'd',
    monthFormat : 'm',
    yearFormat : 'Y',
    isFormField : true,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'row roo-date-split-field-group',
            cn : [
                {
                    tag : 'input',
                    type : 'hidden',
                    cls : 'form-hidden-field roo-date-split-field-group-value',
                    name : this.name
                }
            ]
        }
        
        if(this.fieldLabel){
            cfg.cn.push({
                tag : 'div',
                cls : 'column roo-date-split-field-label col-md-' + ((this.labelAlign == 'top') ? '12' : this.labelWidth),
                cn : [
                    {
                        tag : 'label',
                        html : this.fieldLabel
                    }
                ]
            });
        }
        
        Roo.each(['day', 'month', 'year'], function(t){
            cfg.cn.push({
                tag : 'div',
                cls : 'column roo-date-split-field-' + t + ' col-md-' + ((this.labelAlign == 'top') ? '4' : ((12 - this.labelWidth) / 3))
            });
        }, this);
        
        return cfg;
    },
    
    inputEl: function ()
    {
        return this.el.select('.roo-date-split-field-group-value', true).first();
    },
    
    onRender : function(ct, position) 
    {
        var _this = this;
        
        Roo.bootstrap.NavProgressBar.superclass.onRender.call(this, ct, position);
        
        this.inputEl = this.el.select('.roo-date-split-field-group-value', true).first();
        
        this.dayField = new Roo.bootstrap.ComboBox({
            allowBlank : this.dayAllowBlank,
            alwaysQuery : true,
            displayField : 'value',
            editable : false,
            fieldLabel : '',
            forceSelection : true,
            mode : 'local',
            placeholder : this.dayPlaceholder,
            selectOnFocus : true,
            tpl : '<div class="select2-result"><b>{value}</b></div>',
            triggerAction : 'all',
            typeAhead : true,
            valueField : 'value',
            store : new Roo.data.SimpleStore({
                data : (function() {    
                    var days = [];
                    _this.fireEvent('days', _this, days);
                    return days;
                })(),
                fields : [ 'value' ]
            }),
            listeners : {
                select : function (_self, record, index)
                {
                    _this.setValue(_this.getValue());
                }
            }
        });

        this.dayField.render(this.el.select('.roo-date-split-field-day', true).first(), null);
        
        this.monthField = new Roo.bootstrap.MonthField({
            after : '<i class=\"fa fa-calendar\"></i>',
            allowBlank : this.monthAllowBlank,
            placeholder : this.monthPlaceholder,
            readOnly : true,
            listeners : {
                render : function (_self)
                {
                    this.el.select('span.input-group-addon', true).first().on('click', function(e){
                        e.preventDefault();
                        _self.focus();
                    });
                },
                select : function (_self, oldvalue, newvalue)
                {
                    _this.setValue(_this.getValue());
                }
            }
        });
        
        this.monthField.render(this.el.select('.roo-date-split-field-month', true).first(), null);
        
        this.yearField = new Roo.bootstrap.ComboBox({
            allowBlank : this.yearAllowBlank,
            alwaysQuery : true,
            displayField : 'value',
            editable : false,
            fieldLabel : '',
            forceSelection : true,
            mode : 'local',
            placeholder : this.yearPlaceholder,
            selectOnFocus : true,
            tpl : '<div class="select2-result"><b>{value}</b></div>',
            triggerAction : 'all',
            typeAhead : true,
            valueField : 'value',
            store : new Roo.data.SimpleStore({
                data : (function() {
                    var years = [];
                    _this.fireEvent('years', _this, years);
                    return years;
                })(),
                fields : [ 'value' ]
            }),
            listeners : {
                select : function (_self, record, index)
                {
                    _this.setValue(_this.getValue());
                }
            }
        });

        this.yearField.render(this.el.select('.roo-date-split-field-year', true).first(), null);
    },
    
    setValue : function(v, format)
    {
        this.inputEl.dom.value = v;
        
        var f = format || (this.yearFormat + '-' + this.monthFormat + '-' + this.dayFormat);
        
        var d = Date.parseDate(v, f);
        
        if(!d){
            return;
        }
        
        this.dayField.setValue(d.format(this.dayFormat));
        this.monthField.setValue(d.format(this.monthFormat));
        this.yearField.setValue(d.format(this.yearFormat));
        
        this.validate();
        
        return;
    },
    
    setDay : function(v)
    {
        this.dayField.setValue(v);
        this.validate();
        
        return;
    },
    
    setMonth : function(v)
    {
        this.monthField.setValue(v);
        this.validate();
        return;
    },
    
    setYear : function(v)
    {
        this.yearField.setValue(v);
        this.validate();
        return;
    },
    
    getValue : function()
    {
        var f = this.yearFormat + '-' + this.monthFormat + '-' + this.dayFormat;
        
        var date = this.yearField.getValue() + '-' + this.monthField.getValue() + '-' + this.dayField.getValue();
        
        return date;
    },
    
    validate : function()
    {
        var d = this.dayField.validate();
        var m = this.monthField.validate();
        var y = this.yearField.validate();
        
        var valid = true;
        
        if(
                (!this.dayAllowBlank && !d) ||
                (!this.monthAllowBlank && !m) ||
                (!this.yearAllowBlank && !y)
        ){
            valid = false;
        }
        
        if(this.dayAllowBlank && this.monthAllowBlank && this.yearAllowBlank){
            return valid;
        }
        
        if(valid){
            this.markValid();
            return valid;
        }
        
        this.markInvalid();
        
        return valid;
    },
    
    markValid : function()
    {
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();

        if(label && icon){
            icon.remove();
        }
        
        this.fireEvent('valid', this);
    },
    
     /**
     * Mark this field as invalid
     * @param {String} msg The validation message
     */
    markInvalid : function(msg)
    {
        
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();

        if(label && !icon){
            this.el.select('.roo-date-split-field-label', true).createChild({
                tag : 'i',
                cls : 'text-danger fa fa-lg fa-star',
                tooltip : 'This field is required',
                style : 'margin-right:5px;'
            }, label, true);
        }
        
        this.fireEvent('invalid', this, msg);
    },
    
    clearInvalid : function()
    {
        var label = this.el.select('label', true).first();
        var icon = this.el.select('i.fa-star', true).first();

        if(label && icon){
            icon.remove();
        }
        
        this.fireEvent('valid', this);
    },
    
    getName: function()
    {
        return this.name;
    }
    
});

 