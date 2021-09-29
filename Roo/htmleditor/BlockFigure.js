/**
 *  
 * <figure data-block="BlockFigure" contenteditable="false" role="group" style="text-align:left">' + 
        <img data-name="image" src="{SRC}">' + 
        <figcaption data-name="caption" contenteditable="true" style="text-align:left">XXXX</figcaption>
    </figure>
    <br/>
    
    usage:
     -- add to document..
    new Roo.htmleditor.BlockFigure{
        image_src : 'http://www.google.com',
        caption : 'test',
    }
     -- load document, and search for elements of this...
    Roo.DomQuery.select('*[data-block])
    // loop each and call ctor ({node : xxx})
    -- html editor click
    ** see if parent has Element.findParent(*[data-block]);
    use ?? to 
    
 */

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
    
    image_width : '',
    image_height : '',
    
    // used by context menu
    friendly_name : 'Image with caption',
    
    context : { // ?? static really
        image_width : {
            title: "Width",
            width: 40
        },
        image_height:  {
            title: "Height",
            width: 40
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
        
        var img = {
            tag : 'img',
            src : this.image_src,
            alt : d.innerText.replace(/\n/g, " ") // removeHTML..
        };
        if ((''+this.image_width).length > 0) {
            img.width = this.image_width;
        }
        if ((''+ this.image_height).length > 0) {
            img.height = this.image_height;
        }
        return {
            tag: 'figure',
            'data-block' : 'Figure',
            contenteditable : 'false',
            style : 'display:table; float:' + this.align,
            cn : [
                img,
                {
                    tag: 'figcaption',
                    contenteditable : true,
                    style : 'text-align:' + this.text_align,
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
    } 
    
  
   
     
    
    
    
    
})

