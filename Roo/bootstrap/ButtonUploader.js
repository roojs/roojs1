
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

 *
 * @constructor
 * Create a new CardUploader
 * @param {Object} config The config object
 */

Roo.bootstrap.ButtonUploader = function(config){
    
 
    
    Roo.bootstrap.ButtonUploader.superclass.constructor.call(this, config);
    
    
    this.fileCollection   = new Roo.util.MixedCollection(false,function(r) {
        return r.data.id
     });
    
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
         * @param {Roo.bootstrap.Card} this
         * @param {Object} The image information data  contains 
         */
        'uploaded' : true
        
    });
};
 
Roo.extend(Roo.bootstrap.CardUploader, Roo.bootstrap.Button,  {
    
     
    errorTimeout : 3000,
     
    images : false,
   
    fileCollection : false,
    allowBlank : true,
    
    getAutoCreate : function()
    {
        
        
        return  {
            cls :'div' ,
            cn : [
                Roo.bootstrap.Button.prototype.getAutoCreate(),
                {
                    tag: 'input',
                    multiple : 'multiple',
                    type : 'file',
                    cls : 'd-none  roo-card-upload-selector' 
                  
                }
                 

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
        
        Roo.each(this.selectorEl.dom.files, function(file){
            var url = this.urlAPI.createObjectURL(file); // not sure...
            this.fireEvent('uploaded', this, [file, url]);
        }, this);
         
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
 