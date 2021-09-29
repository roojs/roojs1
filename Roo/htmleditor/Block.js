/**
 *
 * Base class for html editor blocks
 *
 * also includes a few utilitiy function for them.
 */

Roo.htmleditor.Block  = function(cfg)
{
    // do nothing .. should not be called really.
}


Roo.htmleditor.Block.prototype = {
    
     // used by context menu
    friendly_name : 'Image with caption',
    
    context : false,
    
    
     /**
     * convert to plain HTML for calling insertAtCursor..
     */
    toHTML : function()
    {
        return Roo.DomHelper.markup(this.toObject());
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