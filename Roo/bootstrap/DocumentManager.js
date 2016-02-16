
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.DocumentManager
 * @extends Roo.bootstrap.Component
 * Bootstrap DocumentManager class
 * @cfg {Number} boxes number of boxes to show default 12
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
    
    getAutoCreate : function()
    {
        var cfg = {
            tag : 'div',
            cls : 'roo-document-manager',
            cn : [
                {
                    tag : 'div',
                    cls : 'roo-document-manager-upload',
                    html : '<i class="fa fa-plus"></i>'
                }
            ]
        };
        
        return cfg;
        
    },
    
    initEvents : function()
    {
        this.uploadEl = this.el.select('.roo-document-manager-upload', true).first();
        this.uploadEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.uploadEl.on('click', this.onUpload, this);
    }
});