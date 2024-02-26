/**
 * @class Roo.htmleditor.FilterEmpty
 * filter empty elements (normally <B> on paste)
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
        Roo.log(node);
        Roo.log(node.childNodes.length);
        
        var ar = Array.from(node.childNodes);
        for (var i = 0; i < ar.length; i++) {
            this.walk(ar[i]);
        }

        if (node.innerHTML.trim() != '') {
            return true;
        }
        if (node.attributes && node.attributes.length > 0) {
            return true; // walk if there are any.
        }
        Roo.htmleditor.FilterBlack.prototype.replaceTag.call(this, node);
        return false;
     
    }
    
});