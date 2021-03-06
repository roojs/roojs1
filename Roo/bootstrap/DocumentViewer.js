
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentViewer
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentViewer class
 * @cfg {Boolean} showDownload (true|false) show download button (default true)
 * @cfg {Boolean} showTrash (true|false) show trash button (default true)
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
         * @event download
         * Fire after download button
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "download" : true,
        /**
         * @event trash
         * Fire after trash button
         * @param {Roo.bootstrap.DocumentViewer} this
         */
        "trash" : true
        
    });
};

Roo.extend(Roo.bootstrap.DocumentViewer, Roo.bootstrap.Component,  {
    
    showDownload : true,
    
    showTrash : true,
    
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
        this.bodyEl = this.el.select('.roo-document-viewer-body', true).first();
        this.bodyEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.thumbEl = this.el.select('.roo-document-viewer-thumb', true).first();
        this.thumbEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.imageEl = this.el.select('.roo-document-viewer-image', true).first();
        this.imageEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.footerEl = this.el.select('.roo-document-viewer-footer', true).first();
        this.footerEl.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.downloadBtn = this.el.select('.roo-document-viewer-download', true).first();
        this.downloadBtn.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.trashBtn = this.el.select('.roo-document-viewer-trash', true).first();
        this.trashBtn.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.bodyEl.on('click', this.onClick, this);
        this.downloadBtn.on('click', this.onDownload, this);
        this.trashBtn.on('click', this.onTrash, this);
        
        this.downloadBtn.hide();
        this.trashBtn.hide();
        
        if(this.showDownload){
            this.downloadBtn.show();
        }
        
        if(this.showTrash){
            this.trashBtn.show();
        }
        
        if(!this.showDownload && !this.showTrash) {
            this.footerEl.hide();
        }
        
    },
    
    initial : function()
    {
        this.fireEvent('initial', this);
        
    },
    
    onClick : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('click', this);
    },
    
    onDownload : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('download', this);
    },
    
    onTrash : function(e)
    {
        e.preventDefault();
        
        this.fireEvent('trash', this);
    }
    
});
