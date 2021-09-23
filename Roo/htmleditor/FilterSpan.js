
/**
 *  filter span's with no attributes out..
 */

Roo.htmleditor.FilterSpan =  {

    walk : function (node)
    {
        Roo.htmleditor.Filter.walk.call(this, 'SPAN', true );
     
    },
    replace : function(node)
    {
        if (node.attributes && node.attributes.length > 0) {
            this.walk(node);
            return true;
        }
        for (var i = 0; i < node.childNodes.length; i++) {
            node.removeChild(node.childNodes[i]);
            // what if we need to walk these???
            node.insertBefore(node.childNodes[i], node);
            this.walk(node.childNodes[i]);
        }
        n.parentNode.removeChild(n);
        return false; // don't walk children
     
    }
    
};