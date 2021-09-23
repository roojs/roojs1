/**
 *  remove tags but keep children
 */
Roo.htmleditor.FilterKeepChildren =  {
    
    black : false, // array
    walkWith : function (node, black)
    {
        this.black = black;
        this.walk(node);
     
    },
    walk : function (node)
    {
        Roo.htmleditor.Filter.walk.call(this, node, this.black);
     
    },
    
     
    replace : function(n)
    {
        // walk children...
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        n.parentNode.removeChild(n);
        return false; // don't walk children
        
        
    }
}