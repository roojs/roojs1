/**
 * @class Roo.lib.Selection
 * @constructor
 * This is a toolkit, normally used to copy features into a Dom Selection element
 * Roo.lib.Selection.wrap(x);
 *
 *
 *
 */
Roo.lib.Selection = function() { };

/**
 * Wrap a Dom Range object, to give it new features...
 * @static
 * @param {Range} the range to wrap
 */
Roo.lib.Selection.wrap = function(r, doc) {
    Roo.apply(r, Roo.lib.Selection.prototype);
    r.ownerDocument = doc; // usefull so we dont have to keep referening to it.
    return r;
};
/**
 * find a parent node eg. LI / OL
 * @param {string|Array} node name or array of nodenames
 * @return {DomElement|false}
 */
Roo.apply(Roo.lib.Selection.prototype,
{
    /**
     * the owner document
     */
    ownerDocument : false,
    
    getRangeAt : function(n)
    {
        return Roo.lib.Range.wrap(Selection.prototype.getRangeAt.call(this,n));
    },
    
    /**
     * insert node at selection 
     * @param {DomElement|string} node
     * @param {string} cursor (after|in|none) where to place the cursor after inserting.
     */
    insertNode: function(node, cursor)
    {
        if (typeof(node) == 'string') {
            node = this.ownerDocument.createElement(node);
            if (cursor == 'in') {
                node.innerHTML = '&nbsp;';
            }
        }
        
        var range = this.getRangeAt(0);
        
        if (this.type != 'Caret') {
            range.deleteContents();
        }
        var sn = node.childNodes[0]; // select the contents.

        
        
        range.insertNode(node);
        if (cursor == 'after') {
            node.insertAdjacentHTML('afterend', '&nbsp;');
            sn = node.nextSibling;
        }
        
        if (cursor == 'none') {
            return;
        }
        
        this.cursorText(sn);
    },
    
    cursorText : function(n)
    {
       
        //var range = this.getRangeAt(0);
        range = Roo.lib.Range.wrap(new Range());
        //range.selectNode(n);
        
        var ix = Array.from(n.parentNode.childNodes).indexOf(n);
        range.setStart(n.parentNode,ix);
        range.setEnd(n.parentNode,ix+1);
        //range.collapse(false);
         
        this.removeAllRanges();
        this.addRange(range);
        
        Roo.log([n, range, this,this.baseOffset,this.extentOffset, this.type]);
    },
    cursorAfter : function(n)
    {
        if (!n.nextSibling || n.nextSibling.nodeValue != '&nbsp;') {
            n.insertAdjacentHTML('afterend', '&nbsp;');
        }
        this.cursorText (n.nextSibling);
    }
        
    
});