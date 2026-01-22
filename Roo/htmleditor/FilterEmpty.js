/**
 * @class Roo.htmleditor.FilterEmpty
 * filter empty elements
 * @constructor
 * Run a new Empty Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterEmpty = function(cfg)
{
    // no need to apply config.
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterEmpty, Roo.htmleditor.FilterBlack,
{
     
    tag : true,
     
 
    replaceTag : function(node)
    {
        // start from leaf node
        if(node.hasChildNodes()) {
            this.walk(node);
        }

        // only filter empty leaf element with certain tags
        if(
            ['B', 'I', 'U', 'S'].indexOf(node.tagName) < 0
            ||
            node.attributes && node.attributes.length > 0
        ) {
            return false; // don't walk
        }
        
        // check if node has any non-text child nodes (e.g. img, br, etc.)
        // if so, don't filter it
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType !== 3) { // not a text node
                    return false; // don't filter - has element children
                }
            }
        }
        
        // at this point, node only has text nodes (or no children)
        // filter if text content is empty after trim
        if (node.textContent.trim().length > 0) {
            return false; // don't filter - has meaningful text
        }

        Roo.htmleditor.FilterBlack.prototype.replaceTag.call(this, node);
        return false; // don't walk
     
    }
    
});