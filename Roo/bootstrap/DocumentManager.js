
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentManager
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentManager class
 * @cfg {Number} boxes number of boxes to show default 12
 * @cfg {Boolean} multiple multiple upload default true
 * @cfg {Number} minWidth default 300
 * @cfg {Number} minHeight default 300
 * 
 * @constructor
 * Create a new DocumentManager
 * @param {Object} config The config object
 */

Roo.bootstrap.DocumentManager = function(config){
    Roo.bootstrap.DocumentManager.superclass.constructor.call(this, config);
    
    this.addEvents({
        /**
         * @event onselect
         * Fire after select file
         * @param {Roo.bootstrap.DocumentManager} this
         */
        "onselect" : true
    });
};

Roo.extend(Roo.bootstrap.DocumentManager, Roo.bootstrap.Component,  {
    
    boxes : 12,
    inputName : '',
    minWidth : 300,
    minHeight : 300,
    multiple : true,
    files : [],
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-document-manager',
            cn : [
                {
                    tag : 'input',
                    cls : 'roo-document-manager-selector',
                    type : 'file'
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
        this.selector = this.el.select('.roo-document-manager-selector', true).first();
        this.selector.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.selector.hide();
        
        if(this.multiple){
            this.selector.attr('multiple', 'multiple');
        }
        
        this.selector.on('change', this.onSelect, this);
        
        this.uploadBtn = this.el.select('.roo-document-manager-upload-btn', true).first();
        this.uploadBtn.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.uploadBtn.on('click', this.onUpload, this);
        
    },
    
    onUpload : function(e)
    {
        e.preventDefault();
        
        this.selector.dom.click();
        
    },
    
    onSelect : function(e)
    {
        e.preventDefault();
        
        if(typeof(this.selector.dom.files) == 'undefined' || !this.selector.dom.files.length){
            return;
        }
        
        Roo.each(this.selector.dom.files, function(file){
            Roo.log(file);
        });
        
        
    }
    
    
    
});