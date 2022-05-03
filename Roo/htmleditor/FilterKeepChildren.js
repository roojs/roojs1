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
    if (this.tag === false) {
        return; // dont walk.. (you can use this to use this just to do a child removal on a single tag )
    }
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterKeepChildren, Roo.htmleditor.FilterBlack,
{
    
  
    replaceTag : function(node)
    {
        console.log("FilterKeepChildren replaceTag");
        // walk children...
        //Roo.log(node);
        var ar = Array.from(node.childNodes);
        //remove first..
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].nodeType == 1) {
                if (
                    (typeof(this.tag) == 'object' && this.tag.indexOf(ar[i].tagName) > -1)
                    || // array and it matches
                    (typeof(this.tag) == 'string' && this.tag == ar[i].tagName)
                ) {
                    this.replaceTag(ar[i]); // child is blacklisted as well...
                    continue;
                }
            }
        }  
        ar = Array.from(node.childNodes);
        for (var i = 0; i < ar.length; i++) {
         
            node.removeChild(ar[i]);
            // what if we need to walk these???
            node.parentNode.insertBefore(ar[i], node);
            if (this.tag !== false) {
                this.walk(ar[i]);
                
            }
        }
        node.parentNode.removeChild(node);
        return false; // don't walk children
        
        
    }
});