
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentViewer
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentViewer class
 * 
 * @constructor
 * Create a new DocumentViewer
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentViewer = function(config){
    Roo.bootstrap.DocumentViewer.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event initial
         * Fire after initEvent
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "initial" : true,
        /**
         * @event click
         * Fire after click
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "click" : true,
        /**
         * @event trash
         * Fire after trash button
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "trash" : true
        
    });
};

Roo.extend(Roo.bootstrap.DocumentViewer, Roo.bootstrap.Component,  {
    
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
                                cls : 'btn-group',
                                cn : [
                                    {
                                        tag : 'button',
                                        cls : 'btn btn-default roo-document-viewer-trash',
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
        
        this.bodyEl = this.el.select('.roo-document-viewer-body', true).first();
        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.thumbEl = this.el.select('.roo-document-viewer-thumb', true).first();
        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.imageEl = this.el.select('.roo-document-viewer-image', true).first();
        this.imageEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.footerEl = this.el.select('.roo-document-viewer-footer', true).first();
        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.trashBtn = this.el.select('.roo-document-viewer-trash', true).first();
        this.trashBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.bodyEl.on('click', this.onClick, this);
        
        this.trashBtn.on('click', this.onTrash, this);
        
    },
    
    initial : function()
    {
        this.thumbEl.setStyle('line-height', this.thumbEl.getHeight(true) + 'px');
        
        this.fireEvent('initial', this);
        
    },
    
    onClick : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('click', this);
    },
    
    onTrash : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('trash', this);
    }
    
});
