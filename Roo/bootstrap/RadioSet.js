/*
 * - LGPL
 *
 * RadioSet
 *
 *
 */

/**
 * @class Roo.bootstrap.RadioSet
 * @extends Roo.bootstrap.Component
 * Bootstrap RadioSet class
 * @cfg {Boolean} disabled is it disabled
 * @cfg {String} name name of the radio
 * @cfg {String} fieldLabel - the label associated
 * @cfg {String} value default value of the input
 * @cfg {Number} labelWidth set the width of label (0-12)
 * @cfg {String} labelAlign (top|left)
 * @cfg {String} indicatorpos (left|right) default left
 * @constructor
 * Create a new RadioSet
 * @param {Object} config The config object
 */

Roo.bootstrap.RadioSet = function(config){
    
    Roo.bootstrap.RadioSet.superclass.constructor.call(this, config);

    this.itmes = [];
};

Roo.extend(Roo.bootstrap.RadioSet, Roo.bootstrap.Component,  {

    items : false,
    fieldLabel : '',
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-set',
            cn : [
                {
                    tag : 'label',
                    cls : 'roo-radio-set-field-label',
                    cn : [
                        {
                            tag : 'span',
                            cls : 'roo-radio-set-field-label-text',
                            html : (this.fieldLabel.length) ? this.fieldLabel : ''
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-radio-set-items'
                }
            ]
        };
        
        return cfg;
        
    },

    initEvents : function()
    {
        this.fieldLabelEl = this.el.select('.roo-radio-set-field-label', true).first();
        this.fieldLabelEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.itemsEl = this.el.select('.roo-radio-set-items', true).first();
        this.itemsEl.setVisibilityMode(Roo.Element.DISPLAY);
        
    },
    
    getChildContainer : function()
    {
        return this.itemsEl;
    },

});
