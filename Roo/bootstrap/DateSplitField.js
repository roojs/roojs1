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
    
    initEvents: function() 
    {
        
    }
});

 