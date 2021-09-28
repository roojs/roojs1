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

Roo.htmleditor.BlockFigure = function(cfg)
{
    if (cfg.node) {
        this.fromElement(cfg.node);
    }
    Roo.apply(this, cfg);
}

Roo.htmleditor.BlockFigure.prototype = {
    
    // setable values.
    image_src: '',
    
    align: 'left',
    caption : '',
    text_align: 'left',
    
    image_width : '',
    image_height : '',
    
    edit : { // ?? static really
        image_width : {
            title: "Width",
            width: 40,
        },
        image_height:  {
            title: "Height",
            width: 40
        },
        align: {
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        text_align: {
            title: "Caption Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        
        alt: {
            title: "Alt",
            width: 120
        },
        src : {
            title: "Src",
            width: 220
        }
    },
    
    toHtml : function(doc)
    {
        
        var img = {
            tag : 'img',
            src : this.src,
            alt : this.alt,
        };
        if ((''+this.width).length) {
            img.width = this.width;
        }
        if ((''+ this.height).length) {
            img.height = this.height;
        }
        return Roo.DomHelper.markup({
            tag: 'figure',
            'data-block' : 'BlockFigure',
            contenteditable : 'false',
            style : 'text-align:' + this.align,
            cn : [
                img,
                {
                    tag: 'figcaption',
                    'data-name' : 'caption',
                    contenteditable : true,
                    style : 'text-align:left',
                    html : this.caption 
                }
            ]
        });
    },
    fromElement : function(node)
    {
        this.image_src = this.getVal(node, 'img', 'src');
        this.align = this.getVal(node, 'figure', 'style', 'text-align');
        this.caption = this.getVal(node, 'figcaption', 'html');
        this.text_align = this.getVal(node, 'figcaption', 'style','text-align');
    },
    
    getVal : function(node, tag, attr, style)
    {
        var n = node;
        if (n.tagName != tag.toUpperCase()) {
            // in theory we could do figure[3] << 3rd figure? or some more complex search..?
            // but kiss for now.
            n = node.getElementsByTagName(tag).item(0);
        }
        if (attr == 'html') {
            return n.innerHTML;
        }
        if (attr == 'style') {
            return Roo.get(n).getStyle(style);
        }
        
        return Roo.get(n).attr(attr);
            
    }
    
    
    
    
    
    
}

