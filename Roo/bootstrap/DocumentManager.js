
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentManager
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentManager class
 * @cfg {Number} boxes number of boxes to show default 12
 * @cfg {Number} inputName name of the input
 * @cfg {Number} minWidth default 300
 * @cfg {Number} minHeight default 300
 * 
 * @constructor
 * Create a new DocumentManager
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentManager = function(config){
    Roo.bootstrap.DocumentManager.superclass.constructor.call(this, config);
    
    
};

Roo.extend(Roo.bootstrap.DocumentManager, Roo.bootstrap.Component,  {
    
    boxes : 12,
    inputName : '',
    minWidth : 300,
    minHeight : 300,
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-document-manager',
            cn : [
                {
                    tag : 'input',
                    cls : 'roo-document-manager-file',
                    type : 'file',
                    name : this.inputName
                },
                {
                    tag : 'div',
                    cls : 'roo-document-manager-upload-btn',
                    html : '<i class="fa fa-plus"></i>'
                }
            ]
        };
        
        return cfg;
        
    },
    
    initEvents : function()
    {
        this.fileEl = this.el.select('.roo-document-manager-file', true).first();
        this.fileEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.fileEl.hide();
        
        this.fileEl.on('change', this.onSelectFile, this);
        
        this.uploadBtn = this.el.select('.roo-document-manager-upload-btn', true).first();
        this.uploadBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.uploadBtn.on('click', this.onUpload, this);
    },
    
    onUpload : function(e)
    {
        e.preventDefault();
        
        this.fileEl.dom.click();
    },
    
    onSelectFile : function(e)
    {
        e.preventDefault();
        
        Roo.log(this.fileEl.dom);
    }
});