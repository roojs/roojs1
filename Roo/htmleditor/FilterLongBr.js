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
    this.walkTag(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterLongBr, Roo.htmleditor.Filter,
{
    
     
    tag : 'BR',
    
     
    replaceTag : function(node)
    {
        Roo.log('REPLACE TAG');
        
        var ps = node.nextSibling;
        while (ps && ps.nodeType == 3 && ps.nodeValue.trim().length < 1) {
            ps = ps.nextSibling;
        }
        
        if (!ps &&  [ 'TD', 'TH', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6' ].indexOf(node.parentNode.tagName) > -1) { 
            node.parentNode.removeChild(node); // remove last BR inside one fo these tags
            return false;
        }
        
        if (!ps || ps.nodeType != 1) {
            return false;
        }
        
        if (!ps || ps.tagName != 'BR') {
           
            return false;
        }
        
        
        
        
        
        if (!node.previousSibling) {
            return false;
        }
        var ps = node.previousSibling;
        
        while (ps && ps.nodeType == 3 && ps.nodeValue.trim().length < 1) {
            ps = ps.previousSibling;
        }
        if (!ps || ps.nodeType != 1) {
            return false;
        }
        // if header or BR before.. then it's a candidate for removal.. - as we only want '2' of these..
        if (!ps || [ 'BR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6' ].indexOf(ps.tagName) < 0) {
            return false;
        }
        Roo.log('REMOVE');
        
        node.parentNode.removeChild(node); // remove me...
        
        return false; // no need to do children

    }
    
});