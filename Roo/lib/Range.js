/**
 * @class Roo.lib.Range
 * @constructor
 * This is a toolkit, normally used to copy features into a Dom Range element
 * Roo.lib.Range.wrap(x);
 *
 *
 *
 */
Roo.lib.Range = function() { };

/**
 * Wrap a Dom Range object, to give it new features...
 * @static
 * @param {Range} the range to wrap
 */
Roo.lib.Range.wrap = function(r) {
    return Roo.apply(r, Roo.lib.Range.prototype);
};
/**
 * find a parent node eg. LI / OL
 * @param {string|Array} node name or array of nodenames
 * @return {DomElement|false}
 */
Roo.apply(Roo.lib.Range.prototype,
{
    
    closest : function(str)
    {
        if (typeof(str) != 'string') {
            // assume it's a array.
            for(var k of str) {
                var r = this.closest(k);
                if (r !== false) {
                    return r;
                }
                
            }
            return false;
        }
        str = str.toLowerCase();
        var n = this.commonAncestorContainer; // might not be a node
        while (n.nodeType != 1) {
            n = n.parentNode;
        }
        
        if (n.nodeName.toLowerCase() == str ) {
            return n;
        }
        if (n.nodeName.toLowerCase() == 'body') {
            return false;
        }
            
        return n.closest(str) || false;
        
    },
    cloneRange : function()
    {
        return Roo.lib.Range.wrap(Range.prototype.cloneRange.call(this));
    }
});