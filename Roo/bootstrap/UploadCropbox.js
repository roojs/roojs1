
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.UploadCropbox
 * @extends Roo.bootstrap.Component
 * Bootstrap UploadCropbox class
 * 
 * @constructor
 * Create a new UploadCropbox
 * @param {Object} config The config object
 */

Roo.bootstrap.UploadCropbox = function(config){
    Roo.bootstrap.UploadCropbox.superclass.constructor.call(this, config);
     
};

Roo.extend(Roo.bootstrap.UploadCropbox, Roo.bootstrap.Component,  {
    
    
    getAutoCreate : function()
    {
        return {
            tag : 'div',
            cls : 'row roo-upload-cropbox',
            cn : [
                {
                    tag : 'div',
                    cls : 'col-xs-12 roo-upload-cropbox-image-section'
                },
                {
                    tag : 'div',
                    cls : 'col-xs-12 roo-upload-cropbox-footer-section',
                    cn : {
                        tag : 'div',
                        cls : 'row btn-group btn-group-justified roo-upload-cropbox-btn-group',
                        cn : [
                            {
                                tag : 'button',
                                cls : 'btn btn-default',
                                html : '<i class="fa fa-undo"></i>'
                            },
                            {
                                tag : 'button',
                                cls : 'btn btn-default',
                                html : '<i class="fa fa-picture-o"></i>'
                            },
                            {
                                tag : 'button',
                                cls : 'btn btn-default',
                                html : '<i class="fa fa-repeat"></i>'
                            }
                        ]
                    }
                }
            ]
        }
        
          
    }
});
