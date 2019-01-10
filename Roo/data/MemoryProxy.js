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
 * @class Roo.data.MemoryProxy
 * An implementation of Roo.data.DataProxy that simply passes the data specified in its constructor
 * to the Reader when its load method is called.
 * @constructor
 * @param {Object} data The data object which the Reader uses to construct a block of Roo.data.Records.
 */
Roo.data.MemoryProxy = function(data){
    if (data.data) {
        data = data.data;
    }
    Roo.data.MemoryProxy.superclass.constructor.call(this);
    this.data = data;
};

Roo.extend(Roo.data.MemoryProxy, Roo.data.DataProxy, {
    
    /**
     * Load data from the requested source (in this case an in-memory
     * data object passed to the constructor), read the data object into
     * a block of Roo.data.Records using the passed Roo.data.DataReader implementation, and
     * process that block using the passed callback.
     * @param {Object} params This parameter is not used by the MemoryProxy class.
     * @param {Roo.data.DataReader} reader The Reader object which converts the data
     * object into a block of Roo.data.Records.
     * @param {Function} callback The function into which to pass the block of Roo.data.records.
     * The function must be passed <ul>
     * <li>The Record block object</li>
     * <li>The "arg" argument from the load function</li>
     * <li>A boolean success indicator</li>
     * </ul>
     * @param {Object} scope The scope in which to call the callback
     * @param {Object} arg An optional argument which is passed to the callback as its second parameter.
     */
    load : function(params, reader, callback, scope, arg){
        params = params || {};
        var result;
        try {
            result = reader.readRecords(params.data ? params : this.data);
        }catch(e){
            this.fireEvent("loadexception", this, arg, null, e);
            callback.call(scope, null, arg, false);
            return;
        }
        callback.call(scope, result, arg, true);
    },
    
    // private
    update : function(params, records){
        
    }
});