
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentSlider
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentSlider class
 * @cfg {Number} total 
 * 
 * @constructor
 * Create a new DocumentViewer
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentSlider = function(config){
    Roo.bootstrap.DocumentSlider.superclass.constructor.call(this, config);
    
    this.files = [];
    
    this.addEvents({
        /**
         * @event initial
         * Fire after initEvent
         * @param {Roo.bootstrap.DocumentSlider} this
         */
        "initial" : true,
        /**
         * @event update
         * Fire after update
         * @param {Roo.bootstrap.DocumentSlider} this
         */
        "update" : true,
        /**
         * @event click
         * Fire after click
         * @param {Roo.bootstrap.DocumentSlider} this
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.DocumentSlider, Roo.bootstrap.Component,  {
    
    files : false,
    
    indicator : 0,
    
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
        
        this.prevIndicator = this.el.select('.roo-document-slider-prev i', true).first();
        this.prevIndicator.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.nextIndicator = this.el.select('.roo-document-slider-next i', true).first();
        this.nextIndicator.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.bodyEl.on('click', this.onClick, this);
        
        this.prevIndicator.on('click', this.prev, this);
        
        this.nextIndicator.on('click', this.next, this);
        
    },
    
    initial : function()
    {
        if(this.files.length){
            this.indicator = 1;
            this.update()
        }
        
        this.fireEvent('initial', this);
    },
    
    update : function()
    {
        this.imageEl.attr('src', this.files[this.indicator - 1]);
        
        this.titleEl.dom.innerHTML = String.format('{0} / {1}', this.indicator, this.files.length);
        
        this.prevIndicator.show();
        
        if(this.indicator == 1){
            this.prevIndicator.hide();
        }
        
        this.nextIndicator.show();
        
        if(this.indicator == this.files.length){
            this.nextIndicator.hide();
        }
        
        this.thumbEl.scrollTo('top');
        
        this.fireEvent('update', this);
    },
    
    onClick : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('click', this);
    },
    
    prev : function(e)
    {
        e.preventDefault();
        
        this.indicator = Math.max(1, this.indicator - 1);
        
        this.update();
    },
    
    next : function(e)
    {
        e.preventDefault();
        
        this.indicator = Math.min(this.files.length, this.indicator + 1);
        
        this.update();
    }
});
