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
    
    toHtml : function(doc)
    {
        return Roo.DomHelper.markup({
            tag: 'figure',
            'data-block' : 'BlockFigure',
            contenteditable : 'false',
            style : 'text-align:' + this.align,
            cn : [
                {
                    tag : 'img',
                    src : this.src
                },
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

