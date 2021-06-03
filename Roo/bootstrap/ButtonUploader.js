
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.ButtonUploader
 * @extends Roo.bootstrap.Button
 * Bootstrap Button Uploader class - it's a button which when you add files to it
 *
 * 
 * @cfg {Number} errorTimeout default 3000
 * @cfg {Array}  images  an array of ?? Img objects ??? when loading existing files..
 * @cfg {Array}  html The button text.
 * @cfg {Boolean}  multiple (default true) Should the upload allow multiple files to be uploaded.
 *
 * @constructor
 * Create a new CardUploader
 * @param {Object} config The config object
 */

Roo.bootstrap.ButtonUploader = function(config){
    
 
    
    Roo.bootstrap.ButtonUploader.superclass.constructor.call(this, config);
    
     
     this.addEvents({
         // raw events
        /**
         * @event beforeselect
         * When button is pressed, before show upload files dialog is shown
         * @param {Roo.bootstrap.UploaderButton} this
         *
         */
        'beforeselect' : true,
         /**
         * @event fired when files have been selected, 
         * When a the download link is clicked
         * @param {Roo.bootstrap.UploaderButton} this
         * @param {Array} Array of files that have been uploaded
         */
        'uploaded' : true
        
    });
};
 
Roo.extend(Roo.bootstrap.ButtonUploader, Roo.bootstrap.Button,  {
    
     
    errorTimeout : 3000,
     
    images : false,
   
    fileCollection : false,
    allowBlank : true,
    
    getAutoCreate : function()
    {
        var im = {
            tag: 'input',
            
            type : 'file',
            cls : 'd-none  roo-card-upload-selector' 
          
        }
        if (this.multiple) {
            im.multiple = 'multiple';
        }
        
        return  {
            cls :'div' ,
            cn : [
                Roo.bootstrap.Button.prototype.getAutoCreate.call(this),
                im

            ]
        };
           
         
    },
     
   
    initEvents : function()
    {
        
        Roo.bootstrap.Button.prototype.initEvents.call(this);
        
        
        
        
        
        this.urlAPI = (window.createObjectURL && window) || 
                                (window.URL && URL.revokeObjectURL && URL) || 
                                (window.webkitURL && webkitURL);
                        
         
         
         
        this.selectorEl = this.el.select('.roo-card-upload-selector', true).first();
        
        this.selectorEl.on('change', this.onFileSelected, this);
         
         
       
    },
    
   
    onClick : function(e)
    {
        e.preventDefault();
        
        if ( this.fireEvent('beforeselect', this) === false) {
            return;
        }
         
        this.selectorEl.dom.click();
         
    },
    
    onFileSelected : function(e)
    {
        e.preventDefault();
        
        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){
            return;
        }
        var files = Array.prototype.slice.call(this.selectorEl.dom.files);
        this.selectorEl.dom.reset();
        
        this.fireEvent('uploaded', this,  files );
        
    },
    
       
   
    
    /**
     * addCard - add an Attachment to the uploader
     * @param data - the data about the image to upload
     *
     * {
          id : 123
          title : "Title of file",
          is_uploaded : false,
          src : "http://.....",
          srcfile : { the File upload object },
          mimetype : file.type,
          preview : false,
          is_deleted : 0
          .. any other data...
        }
     *
     * 
    */
     
    reset: function()
    {
         
         this.selectorEl
    } 
    
    
    
    
});
 