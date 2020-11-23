
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
    
    
    this.imageCollection  = new Roo.util.MixedCollection(function(r) { return r.data.id });
    
    
};

Roo.extend(Roo.bootstrap.CardUploader, Roo.bootstrap.Input,  {
    
     
    errorTimeout : 3000,
     
    images : false,
   
    imageCollection : false,
    
    getAutoCreate : function()
    {
        
        var cfg =  {
            cls :'form-group' ,
            cn : [
                {
                    tag : 'i',
                    cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                    tooltip : 'This field is required'
                },
                {
                    tag: 'label',
                   //cls : 'input-group-addon',
                    html : this.fieldLabel

                },

                {
                    tag: 'input',
                    id : id,
                    type : 'hidden',
                    value : this.value,
                    cls : 'd-none'
                },
                {
                    cls : 'roo-card-uploader-button-container'
                },
                {
                    cls : 'card-columns roo-card-uploader-container'
                }

            ]
        };
           
        
        var input = Roo.bootstrap.Input.prototype.getAutoCreate.call(this);
        
        
        btn.cls += ' w-100 mb-2';
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
               
            ]
            
        }
        
        
        return cfg;
    },
    
    getChildContainer : function() /// what children are added to.
    {
        return this.el;
    },
   
    
    initEvents : function()
    {
        
        Roo.bootstrap.Input.prototype.initEvents.call(this);
        
        this.addxtype({
            xns: Roo.bootstrap,
            xtype : 'Button',
            
            
        })
        
        
        
        
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
            mimetype : file.type,
            preview : false,
        })
        
    },
    
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
                                cls : 'col-11 text-left',
                                size: 'sm',
                                weight: 'link',
                                fa : 'download',
                                listeners : {
                                    click : function() {
                                        this.downloadCard(data.id)
                                    }
                                }
                            },
                          
                            {
                                xns : Roo.bootstrap,
                                xtype : 'Button',
                                
                                size : 'sm',
                                weight: 'danger',
                                cls : 'col-1',
                                fa : 'times',
                                listeners : {
                                    click : function() {
                                        this.removeCard(data.id)
                                    }
                                }
                            }
                        ]
                    }
                    
                ],
            }
            
        ];

        var cn = this.addxtype(
            {
                 
                xns : Roo.bootstrap,
                xtype : 'Card',
                closeable : true,
                header : !data.mimetype.match(/image/) && !data.preview ? "Document": false,
                header_image : data.mimetype.match(/image/) ? data.src  : data.preview,
                header_image_fit_square: true,
                data : data,
                html : false,
                 
                items : footer,
                initEvents : function() {
                    Roo.bootstrap.Card.prototype.initEvents.call(this);
                    this.imgEl = this.el.select('.card-img-top').first();
                    if (this.imgEl) {
                        this.imgEl.on('click', function() { t.previewCard( data.id); }, this);
                        this.imgEl.set({ 'pointer' : 'cursor' });
                                  
                    }
                    
                  
                }
                
            }
        );
        this.items.push(cn);
        
        
    }
    
    
});


Roo.bootstrap.CardUploader.ID = -1;