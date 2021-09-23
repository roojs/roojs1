/**
 * Filter Comments
 *
 * Remove Comments..
 * 
 * 
 * 
 *
 */

Roo.htmleditor.FilterComment =  {


    walk : function (node)
    {
        Roo.htmleditor.Filter.walk.call(this, node, false);
     
    },
    replaceComment : function(n)
    {
            n.parentNode.removeChild(n);
    }
}