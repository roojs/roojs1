
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentViewer
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentViewer class
 * @cfg {Number} thumbWidth default 300
 * @cfg {Number} thumbHeight default 300
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
        "initial" : true
        
    });
};

Roo.extend(Roo.bootstrap.DocumentViewer, Roo.bootstrap.Component,  {
    
    thumbWidth : 300,
    thumbHeight : 300,
    
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
                            cls : 'roo-document-viewer-preview',
                            style : 'width: ' + this.thumbWidth + 'px; height: ' + this.thumbHeight + 'px;'
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
        
        this.previewEl = this.el.select('.roo-document-viewer-preview', true).first();
        this.previewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.thumbEl = this.el.select('.roo-document-viewer-thumb', true).first();
        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.footerEl = this.el.select('.roo-document-viewer-footer', true).first();
        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.trashBtn = this.el.select('.roo-document-viewer-trash', true).first();
        this.trashBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        var _this = this;
        
//        window.addEventListener("resize", function() { _this.resize(); } );
        
        this.bodyEl.on('click', this.onClick, this);
        
        this.trashBtn.on('click', this.onTrash, this);
        
        this.fireEvent('initial', this);
    },
    
    resize : function()
    {
        this.setThumbBoxPosition();
    },
    
    onClick : function()
    {
        
    },
    
    onTrash : function()
    {
        
    }
    
});
