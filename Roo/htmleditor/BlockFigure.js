 

/**
 * @class Roo.htmleditor.BlockFigure
 * Block that has an image and a figcaption
 * @cfg {String} image_src the url for the image
 * @cfg {String} align (left|right) alignment for the block default left
 * @cfg {String} text_align (left|right) alignment for the text caption default left.
 * @cfg {String} caption the text to appear below  (and in the alt tag)
 * @cfg {String|number} image_width the width of the image number or %?
 * @cfg {String|number} image_height the height of the image number or %?
 * 
 * @constructor
 * Create a new Filter.
 * @param {Object} config Configuration options
 */

Roo.htmleditor.BlockFigure = function(cfg)
{
    if (cfg.node) {
        this.readElement(cfg.node);
        this.updateElement(cfg.node);
    }
    Roo.apply(this, cfg);
}
Roo.extend(Roo.htmleditor.BlockFigure, Roo.htmleditor.Block, {
 
    
    // setable values.
    image_src: '',
    
    align: 'left',
    caption : '',
    text_align: 'left',
    
    width : '46%',
    margin: '2%',
    
    // used by context menu
    friendly_name : 'Image with caption',
    deleteTitle : "Delete Image and Caption",
    
    context : { // ?? static really
        width : {
            title: "Width",
            width: 40
            // ?? number
        },
        margin : {
            title: "Margin",
            width: 40
            // ?? number
        },
        align: {
            title: "Align",
            opts : [[ "left"],[ "right"]],
            width : 80
            
        },
        text_align: {
            title: "Caption Align",
            opts : [ [ "left"],[ "right"],[ "center"]],
            width : 80
        },
        
       
        image_src : {
            title: "Src",
            width: 220
        }
    },
    /**
     * create a DomHelper friendly object - for use with
     * Roo.DomHelper.markup / overwrite / etc..
     */
    toObject : function()
    {
        var d = document.createElement('div');
        d.innerHTML = this.caption;
        
        return {
            tag: 'figure',
            'data-block' : 'Figure',
            contenteditable : 'false',
            style : {
                display: 'table',
                float :  this.align ,
                width :  this.width,
                margin:  this.margin
            },
            cn : [
                {
                    tag : 'img',
                    src : this.image_src,
                    alt : d.innerText.replace(/\n/g, " "), // removeHTML..
                    style: {
                        width: '100%'
                    }
                },
                {
                    tag: 'figcaption',
                    contenteditable : true,
                    style : {
                        'text-align': this.text_align
                    },
                    html : this.caption
                    
                }
            ]
        };
    },
    
    readElement : function(node)
    {
        this.image_src = this.getVal(node, 'img', 'src');
        this.align = this.getVal(node, 'figure', 'style', 'float');
        this.caption = this.getVal(node, 'figcaption', 'html');
        this.text_align = this.getVal(node, 'figcaption', 'style','text-align');
        this.width = this.getVal(node, 'figure', 'style', 'width');
        this.margin = this.getVal(node, 'figure', 'style', 'margin');
        
    } 
    
  
   
     
    
    
    
    
})

