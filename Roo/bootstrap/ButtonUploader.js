
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
    
 
    
    Roo.bootstrap.CardUploader.superclass.constructor.call(this, config);
    
    
    this.fileCollection   = new Roo.util.MixedCollection(false,function(r) {
        return r.data.id
     });
    
     this.addEvents({
         // raw events
        /**
         * @event preview
         * When a image is clicked on - and needs to display a slideshow or similar..
         * @param {Roo.bootstrap.Card} this
         * @param {Object} The image information data 
         *
         */
        'preview' : true,
         /**
         * @event download
         * When a the download link is clicked
         * @param {Roo.bootstrap.Card} this
         * @param {Object} The image information data  contains 
         */
        'download' : true
        
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
    
    getChildContainer : function() /// what children are added to.
    {
        return this.containerEl;
    },
   
    getButtonContainer : function() /// what children are added to.
    {
        return this.el.select(".roo-card-uploader-button-container").first();
    },
   
    initEvents : function()
    {
        
        Roo.bootstrap.Input.prototype.initEvents.call(this);
        
        var t = this;
        this.addxtype({
            xns: Roo.bootstrap,

            xtype : 'Button',
            container_method : 'getButtonContainer' ,            
            html :  this.html, // fix changable?
            cls : 'w-100 ',
            listeners : {
                'click' : function(btn, e) {
                    t.onClick(e);
                }
            }
        });
        
        
        
        
        this.urlAPI = (window.createObjectURL && window) || 
                                (window.URL && URL.revokeObjectURL && URL) || 
                                (window.webkitURL && webkitURL);
                        
         
         
         
        this.selectorEl = this.el.select('.roo-card-upload-selector', true).first();
        
        this.selectorEl.on('change', this.onFileSelected, this);
        if (this.images) {
            var t = this;
            this.images.forEach(function(img) {
                t.addCard(img)
            });
            this.images = false;
        }
        this.containerEl = this.el.select('.roo-card-uploader-container', true).first();
         
       
    },
    
   
    onClick : function(e)
    {
        e.preventDefault();
         
        this.selectorEl.dom.click();
         
    },
    
    onFileSelected : function(e)
    {
        e.preventDefault();
        
        if(typeof(this.selectorEl.dom.files) == 'undefined' || !this.selectorEl.dom.files.length){
            return;
        }
        
        Roo.each(this.selectorEl.dom.files, function(file){    
            this.addFile(file);
        }, this);
         
    },
    
      
    
      
    
    addFile : function(file)
    {
           
        if(typeof(file) === 'string'){
            throw "Add file by name?"; // should not happen
            return;
        }
        
        if(!file || !this.urlAPI){
            return;
        }
        
        // file;
        // file.type;
        
        var _this = this;
        
        
        var url = _this.urlAPI.createObjectURL( file);
           
        this.addCard({
            id : Roo.bootstrap.CardUploader.ID--,
            is_uploaded : false,
            src : url,
            srcfile : file,
            title : file.name,
            mimetype : file.type,
            preview : false,
            is_deleted : 0
        });
        
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
    
    addCard : function (data)
    {
        // hidden input element?
        // if the file is not an image...
        //then we need to use something other that and header_image
        var t = this;
        //   remove.....
        var footer = [
            {
                xns : Roo.bootstrap,
                xtype : 'CardFooter',
                 items: [
                    {
                        xns : Roo.bootstrap,
                        xtype : 'Element',
                        cls : 'd-flex',
                        items : [
                            
                            {
                                xns : Roo.bootstrap,
                                xtype : 'Button',
                                html : String.format("<small>{0}</small>", data.title),
                                cls : 'col-10 text-left',
                                size: 'sm',
                                weight: 'link',
                                fa : 'download',
                                listeners : {
                                    click : function() {
                                     
                                        t.fireEvent( "download", t, data );
                                    }
                                }
                            },
                          
                            {
                                xns : Roo.bootstrap,
                                xtype : 'Button',
                                style: 'max-height: 28px; ',
                                size : 'sm',
                                weight: 'danger',
                                cls : 'col-2',
                                fa : 'times',
                                listeners : {
                                    click : function() {
                                        t.removeCard(data.id)
                                    }
                                }
                            }
                        ]
                    }
                    
                ] 
            }
            
        ];
        
        var cn = this.addxtype(
            {
                 
                xns : Roo.bootstrap,
                xtype : 'Card',
                closeable : true,
                header : !data.mimetype.match(/image/) && !data.preview ? "Document": false,
                header_image : data.mimetype.match(/image/) ? data.src  : data.preview,
                header_image_fit_square: true, // fixme  - we probably need to use the 'Img' element to do stuff like this.
                data : data,
                html : false,
                 
                items : footer,
                initEvents : function() {
                    Roo.bootstrap.Card.prototype.initEvents.call(this);
                    var card = this;
                    this.imgEl = this.el.select('.card-img-top').first();
                    if (this.imgEl) {
                        this.imgEl.on('click', function() { t.fireEvent( "preview", t, data ); }, this);
                        this.imgEl.set({ 'pointer' : 'cursor' });
                                  
                    }
                    this.getCardFooter().addClass('p-1');
                    
                  
                }
                
            }
        );
        // dont' really need ot update items.
        // this.items.push(cn);
        this.fileCollection.add(cn);
        
        if (!data.srcfile) {
            this.updateInput();
            return;
        }
            
        var _t = this;
        var reader = new FileReader();
        reader.addEventListener("load", function() {  
            data.srcdata =  reader.result;
            _t.updateInput();
        });
        reader.readAsDataURL(data.srcfile);
        
        
        
    },
    removeCard : function(id)
    {
        
        var card  = this.fileCollection.get(id);
        card.data.is_deleted = 1;
        card.data.src = ''; /// delete the source - so it reduces size of not uploaded images etc.
        //this.fileCollection.remove(card);
        //this.items = this.items.filter(function(e) { return e != card });
        // dont' really need ot update items.
        card.el.dom.parentNode.removeChild(card.el.dom);
        this.updateInput();

        
    },
    reset: function()
    {
        this.fileCollection.each(function(card) {
            if (card.el.dom && card.el.dom.parentNode) {
                card.el.dom.parentNode.removeChild(card.el.dom);
            }
        });
        this.fileCollection.clear();
        this.updateInput();
    },
    
    updateInput : function()
    {
         var data = [];
        this.fileCollection.each(function(e) {
            data.push(e.data);
            
        });
        this.inputEl().dom.value = JSON.stringify(data);
        
        
        
    }
    
    
});


Roo.bootstrap.CardUploader.ID = -1;