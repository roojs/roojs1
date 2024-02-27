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
     
    tag : ['B', 'I', 'U', 'S'],
     
 
    replaceTag : function(node)
    {
        // start from child
        if(node.hasChildNodes()) {
            node.walk();
        }

        // only filter empty leaf element with certain tags
        if(
            ['B', 'I', 'U', 'S'].indexOf(node.tagName) < 0
            ||
            node.attributes && node.attributes.length > 0
            ||
            node.hasChildNodes()
        ) {
            return false; // don't walk
        }

        Roo.htmleditor.FilterBlack.prototype.replaceTag.call(this, node);
        return false; // don't walk
     
    }
    
});