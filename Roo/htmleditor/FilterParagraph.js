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
    this.lang = cfg.lang || 'en';
}

Roo.extend(Roo.htmleditor.FilterParagraph, Roo.htmleditor.Filter,
{
    
     
    tag : 'P',
    
     
    replaceTag : function(node)
    {
        /*
                        // replace p by span and keep dir if it is not same as the document dir
                else if(node.tagName.toLowerCase() == 'p' && nodeDir != documentDir) {
                    var span = node.ownerDocument.createElement('span');
                    var ar = Array.from(node.childNodes);
                    for (var i = 0; i < ar.length; i++) {
                        node.removeChild(ar[i]);
                        span.appendChild(ar[i]);
                    }
                    span.setAttribute(a.name, nodeDir);
                    node.parentNode.insertBefore(span, node);
                    node.parentNode.removeChild(node);
                }
        */
        
        if (node.childNodes.length == 1 &&
            node.childNodes[0].nodeType == 3 &&
            node.childNodes[0].textContent.trim().length < 1
            ) {
            // remove and replace with '<BR>';
            node.parentNode.replaceChild(node.ownerDocument.createElement('BR'),node);
            return false; // no need to walk..
        }

        var documentDir = ['ar', 'he', 'fa', 'ur', 'ps', 'syr', 'dv', 'arc', 'nqo', 'sam', 'tzm', 'ug', 'yi'].includes(this.lang) ? 'rtl' : 'ltr';
        var nodeDir = node.hasAttribute('dir') ? node.getAttribute('dir').toLowerCase() : false;
        var span = node.ownerDocument.createElement('span');

        var ar = Array.from(node.childNodes);
        for (var i = 0; i < ar.length; i++) {
            node.removeChild(ar[i]);

            // copy content to span with a 'dir' attribute
            if(nodeDir && nodeDir != documentDir) {
                span.appendChild(ar[i]);
                continue;
            }

            // what if we need to walk these???
            node.parentNode.insertBefore(ar[i], node);
        }

        // now what about this?
        // <p> &nbsp; </p>
        
        // double BR.
        node.parentNode.insertBefore(node.ownerDocument.createElement('BR'), node);
        node.parentNode.insertBefore(node.ownerDocument.createElement('BR'), node);
        node.parentNode.removeChild(node);
        
        return false;

    }
    
});