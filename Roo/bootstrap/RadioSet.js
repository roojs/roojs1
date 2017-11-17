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
 * @cfg {string} fieldLabel - the label associated
 * @cfg {string} value default value of the input
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
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-radio-set',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-radio-set-fieldlable',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-document-slider-header-title'
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-document-slider-body',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-document-slider-prev',
                            cn : [
                                {
                                    tag : 'i',
                                    cls : 'fa fa-chevron-left'
                                }
                            ]
                        },
                        {
                            tag : 'div',
                            cls : 'roo-document-slider-thumb',
                            cn : [
                                {
                                    tag : 'img',
                                    cls : 'roo-document-slider-image'
                                }
                            ]
                        },
                        {
                            tag : 'div',
                            cls : 'roo-document-slider-next',
                            cn : [
                                {
                                    tag : 'i',
                                    cls : 'fa fa-chevron-right'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        
        if(!)
        
    },

    initEvents : function()
    {
        
    }

});
