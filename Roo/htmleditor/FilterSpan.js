/**
 * @class Roo.htmleditor.FilterSpan
 * filter span's with no attributes out..
 * @constructor
 * Run a new Span Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterSpan = function(cfg)
{
    // no need to apply config.
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterSpan, Roo.htmleditor.Filter,
{
     
    tag : 'SPAN',
     
 
    replaceTag : function(node)
    {
        if (node.attributes && node.attributes.length > 0) {
            this.walk(node);
            return true;
        }
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        n.parentNode.removeChild(n);
        return false; // don't walk children
     
    }
    
});