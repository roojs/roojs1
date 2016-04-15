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

 *     
 * @constructor
 * Create a new DateSplitField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateSplitField = function(config){
    Roo.bootstrap.DateSplitField.superclass.constructor.call(this, config);
    
    
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
        Roo.bootstrap.NavProgressBar.superclass.onRender.call(this, ct, position);
        
        var day = new Roo.bootstrap.ComboBox({
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

                    for (var i = 1; i < 32; i ++){
                        if(i < 10){
                            i = '0' + i;
                        }
                        days.push([i.toString()]);
                    }             
                    return days;

                })(),
                fields : [ 'value' ]
            })
        });

        day.onRender(this.el.select('.roo-date-split-field-day', true).first(), null);
        
        Roo.log('render????????????????????????????????????????????????????????????????');
        Roo.log(day);
        
        
    },
    
    initEvents: function() 
    {
        
    }
});

 