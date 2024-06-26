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
    // hacky?
    if ((typeof(this.tag) == 'object' && this.tag.indexOf(":") > -1)) {
        this.cleanNamespace = true;
    }
        
    this.walk(cfg.node);
}

Roo.extend(Roo.htmleditor.FilterKeepChildren, Roo.htmleditor.FilterBlack,
{
    cleanNamespace : false, // should really be an option, rather than using ':' inside of this tag.
  
    replaceTag : function(node)
    {
        // walk children...
        //Roo.log(node.tagName);
        var ar = Array.from(node.childNodes);
        //remove first..
        
        for (var i = 0; i < ar.length; i++) {
            var e = ar[i];
            if (e.nodeType == 1) {
                if (
                    (typeof(this.tag) == 'object' && this.tag.indexOf(e.tagName) > -1)
                    || // array and it matches
                    (typeof(this.tag) == 'string' && this.tag == e.tagName)
                    ||
                    (e.tagName.indexOf(":") > -1 && typeof(this.tag) == 'object' && this.tag.indexOf(":") > -1)
                    ||
                    (e.tagName.indexOf(":") > -1 && typeof(this.tag) == 'string' && this.tag == ":")
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
        //Roo.log("REMOVE:" + node.tagName);
        node.parentNode.removeChild(node);
        return false; // don't walk children
        
        
    }
});