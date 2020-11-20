
/*
* Licence: LGPL
*/

/**
 * @class Roo.bootstrap.CardUploader
 * @extends Roo.bootstrap.Button
 * Bootstrap Card Uploader class - it's a button which when you add files to it, adds cards below with preview and the name...
 * @cfg {Number} errorTimeout default 3000
 * @cfg {Boolean} name  the field name for each image..
 * @cfg {Array}  images  an array of ?? Img objects ??? when loading existing files..
 *
 * @constructor
 * Create a new CardUploader
 * @param {Object} config The config object
 */

Roo.bootstrap.CardUploader = function(config){
    
 
    
    Roo.bootstrap.CardUploader.superclass.constructor.call(this, config);
    
    
    this.imageCollection  = new Roo.util.MixedCollection(function(r) { return r.id });
    
    
};

Roo.extend(Roo.bootstrap.CardUploader, Roo.bootstrap.Button,  {
    
     
    errorTimeout : 3000,
     
    images : false,
   
    imageCollection : false,
    
    getAutoCreate : function()
    {
        var btn = Roo.bootstrap.Button.prototype.getAutoCreate.call(this);
        
        var cfg = {
            cls : 'roo-card-uploader-wrap',
            cn : [
                btn,
                {
                    tag : 'input',
                    cls : 'd-none roo-card-upload-selector',
                    type : 'file',
                    multiple : 'multiple'
                },
                {
                    cls : 'card-columns roo-card-uploader-container'
                }
            ]
            
        }
        
        
        return cfg;
    },
    
    getChildContainer : function() /// what children are added to.
    {
        return this.containerEl;
    },
   
    
    initEvents : function()
    {
        Roo.bootstrap.Button.prototype.initEvents.call(this);
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
            title : file.name,
            mimetype : file.mimetype,
        })
        
    },
    
    addCard : function (data)
    {
        // hidden input element?
        // if the file is not an image...
        //then we need to use something other that and header_image
        
        //   remove.....
        
        var cn = this.addxtype(
            {
                 
                xns : Roo.bootstrap,
                xtype : 'Card',
                closeable : true,
                header_image : data.src,
                data : data,
                
                listeners : {
                    click : function() {
                        // view..
                    }
                },
                items : [
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
                                        xtype : 'Link',
                                        html : String.format("<small>{0}</small>", data.title),
                                        cls : 'p-9'
                                    },
                                    {
                                        xns : Roo.bootstrap,
                                        xtype : 'Button',
                                        html : 'Delete',
                                        size : 'sm',
                                        cls : 'ml-auto p-3',
                                        fa : 'times'
                                    }
                                ]
                            }
                            
                        ],
                    }
                    
                ]
                  
                
            }
        );
        this.items.push(cn);
        
        
    }
    
    
});


Roo.bootstrap.CardUploader.ID = -1;