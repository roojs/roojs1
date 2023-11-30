/**
 * @class Roo.htmleditor.FilterParagraph
 * paragraphs cause a nightmare for shared content - this filter is designed to be called ? at various points when editing
 * like on 'push' to remove the <p> tags and replace them with line breaks.
 * @constructor
 * Run a new Paragraph Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterParagraph = function(cfg)
{
    // no need to apply config.
    this.searchTag(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterParagraph, Roo.htmleditor.Filter,
{
    
     
    tag : 'P',
    
     
    replaceTag : function(node)
    {
        
        if (node.childNodes.length == 1 &&
            node.childNodes[0].nodeType == 3 &&
            node.childNodes[0].textContent.trim().length < 1
            ) {
            // remove and replace with '<BR>';
            node.parentNode.replaceChild(node.ownerDocument.createElement('BR'),node);
            return false; // no need to walk..
        }

        var ar = Array.from(node.childNodes);
        for (var i = 0; i < ar.length; i++) {
            node.removeChild(ar[i]);
            // what if we need to walk these???
            node.parentNode.insertBefore(ar[i], node);
        }
        // now what about this?
        // <p> &nbsp; </p>
        
        // double BR.
        node.parentNode.insertBefore(node.ownerDocument.createElement('BR'), node);
        node.parentNode.insertBefore(node.ownerDocument.createElement('BR'), node);
        // node.parentNode.removeChild(node);
        
        return false;

    }
    
});