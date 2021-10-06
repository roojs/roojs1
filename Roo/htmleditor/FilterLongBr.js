/**
 * @class Roo.htmleditor.FilterLongBr
 * BR/BR/BR - keep a maximum of 2...
 * @constructor
 * Run a new Long BR Filter
 * @param {Object} config Configuration options
 */

Roo.htmleditor.FilterLongBr = function(cfg)
{
    // no need to apply config.
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterLongBr, Roo.htmleditor.Filter,
{
    
     
    tag : 'BR',
    
     
    replaceTag : function(node)
    {
        
        if (!node.previousSibling) {
            return false;
        }
        var ps = node.previousSibling;
        
        if (ps && ps.nodeType == 3 && ps.nodeValue.trim()) {
            ps = ps.previousSibling;
        }
        if (!ps || ps.tagName != 'BR') {
            return false;
        }
        
        var ps = node.nextSibling;
        
        if (ps && ps.nodeType == 3 && ps.nodeValue.trim()) {
            ps = ps.nextSibling;
        }
        if (!ps || ps.tagName != 'BR') {
            return false;
        }
        
        
        node.parentNode.removeChild(node); // remove me...
        
        return false; // no need to do children

    }
    
});