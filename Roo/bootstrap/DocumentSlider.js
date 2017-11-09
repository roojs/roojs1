
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentSlider
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentSlider class
 * 
 * @constructor
 * Create a new DocumentViewer
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentSlider = function(config){
    Roo.bootstrap.DocumentSlider.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event initial
         * Fire after initEvent
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "initial" : true
    });
};

Roo.extend(Roo.bootstrap.DocumentSlider, Roo.bootstrap.Component,  {
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-document-viewer',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-document-viewer-body',
                    cn : [
                        {
                            tag : 'div',
                            cls : 'roo-document-viewer-thumb',
                            cn : [
                                {
                                    tag : 'img',
                                    cls : 'roo-document-viewer-image'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag : 'div',
                    cls : 'roo-document-viewer-footer',
                    cn : {
                        tag : 'div',
                        cls : 'btn-group btn-group-justified roo-document-viewer-btn-group',
                        cn : [
                            {
                                tag : 'div',
                                cls : 'btn-group roo-document-viewer-download',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default',
                                        html : '<i class="fa fa-download"></i>'
                                    }
                                ]
                            },
                            {
                                tag : 'div',
                                cls : 'btn-group roo-document-viewer-trash',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default',
                                        html : '<i class="fa fa-trash"></i>'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents : function()
    {
        
    },
    
    initial : function()
    {
        this.fireEvent('initial', this);
    }
});
