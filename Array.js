/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 /**
 * @class Array
 */
Roo.applyIf(Array.prototype, {
    /**
     * 
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(o){
       for (var i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) { return i; }
       }
 	   return -1;
    },

    /**
     * Removes the specified object from the array.  If the object is not found nothing happens.
     * @param {Object} o The object to remove
     */
    remove : function(o){
       var index = this.indexOf(o);
       if(index != -1){
           this.splice(index, 1);
       }
    },
    /**
     * Map (JS 1.6 compatibility)
     * @param {Function} function  to call
     */
    map : function(fun )
    {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }
        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this) {
                res[i] = fun.call(thisp, this[i], i, this);
            }
        }

        return res;
    },
    /**
     * equals
     * @param {Array} o The array to compare to
     * @returns {Boolean} true if the same
     */
    equals : function(b)
    {
            // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
        if (this === b) {
            return true;
        }
        if (b == null) {
            return false;
        }
        if (this.length !== b.length) {
            return false;
        }
          
        // sort?? a.sort().equals(b.sort());
          
        for (var i = 0; i < this.length; ++i) {
            if (this[i] !== b[i]) {
            return false;
            }
        }
        return true;
    } 
    
    
    
    
});

Roo.applyIf(Array, {
 /**
     * from
     * @static
     * @param {Array} o Or Array like object (eg. nodelist)
     * @returns {Array} 
     */
    from : function(o)
    {
        var ret= [];
    
        for (var i =0; i < o.length; i++) { 
            ret[i] = o[i];
        }
        return ret;
      
    }
});
