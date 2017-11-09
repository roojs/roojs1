
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
            cls : 'roo-document-slider',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-document-slider-header',
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
        
        return cfg;
    },
    
    initEvents : function()
    {
        this.headerEl = this.el.select('.roo-document-slider-header', true).first();
        this.headerEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.titleEl = this.el.select('.roo-document-slider-header .roo-document-slider-header-title', true).first();
        this.titleEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.bodyEl = this.el.select('.roo-document-slider-body', true).first();
        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.thumbEl = this.el.select('.roo-document-slider-thumb', true).first();
        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.imageEl = this.el.select('.roo-document-slider-image', true).first();
        this.imageEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.prevEl = this.el.select('.roo-document-slider-prev', true).first();
        this.prevEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.nextEl = this.el.select('.roo-document-slider-next', true).first();
        this.nextEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        
    },
    
    initial : function()
    {
        this.fireEvent('initial', this);
    }
});
