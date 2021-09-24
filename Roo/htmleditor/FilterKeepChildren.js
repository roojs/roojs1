/**
 * @class Roo.htmleditor.FilterKeepChildren
 * remove tags but keep children
 * @constructor
 * Run a new Keep Children Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterKeepChildren = function(cfg)
{
    Roo.apply(this, cfg);
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterKeepChildren, Roo.htmleditor.FilterBlack,
{
    
  
    replaceTag : function(node)
    {
        // walk children...
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        node.parentNode.removeChild(node);
        return false; // don't walk children
        
        
    }
});