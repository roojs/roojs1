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
 * @cfg {string} format default 'Y-m-d'

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
        "days" : true
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
    format : 'Y-m-d',
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'row roo-date-split-field-group',
            cn : []
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
    
    onRender : function(ct, position) 
    {
        var _this = this;
        
        Roo.bootstrap.NavProgressBar.superclass.onRender.call(this, ct, position);
        
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
            })
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
            })
        });

        this.yearField.render(this.el.select('.roo-date-split-field-year', true).first(), null);
    },
    
    initEvents: function() 
    {
        
    }
});

 