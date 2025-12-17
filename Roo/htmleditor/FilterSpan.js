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
    this.searchTag(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterSpan, Roo.htmleditor.FilterKeepChildren,
{
     
    tag : 'SPAN',
     
 
    replaceTag : function(node)
    {
        if (node.attributes && node.attributes.length > 0 && node.textContent.trim().length > 0) {
            return true; // walk if there are any.
        }
        
         

        Roo.htmleditor.FilterKeepChildren.prototype.replaceTag.call(this, node);
        return false;
     
    }
    
});