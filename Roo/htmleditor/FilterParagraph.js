/**
 * Filter Paragraph
 *
 * paragraphs cause a nightmare for shared content - this filter is designed to be called ? at various points when editing
 * like on 'push' to remove the <p> tags and replace them with line breaks.
 * 
 * 
 *
 */

Roo.htmleditor.FilterParagraph  =  {
    
    walk : function (body)
    {
        Roo.htmleditor.Filter.walk.call(this, body, 'P');
     
    },
     
     
    replace : function(node)
    {
        
        if (node.childNodes.length == 1 &&
            node.childNodes[0].nodeType == 3 &&
            node.childNodes[0].nodeType.textContent.trim().length < 1
            ) {
            // remove and replace with '<BR>';
            node.parentNode.replaceChild(node.documentOwner.createElement('BR'),node);
            return false; // no need to walk..
        }
        
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
        }
        // now what about this?
        // <p> &nbsp; </p>
        
        // double BR.
        node.insertBefore(node.documentOwner.createElement('BR'), node);
        node.parentNode.removeChild(node);
        
        return false;

    }
    
    
    
};