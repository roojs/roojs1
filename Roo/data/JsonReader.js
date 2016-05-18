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
 * @class Roo.data.JsonReader
 * @extends Roo.data.DataReader
 * Data reader class to create an Array of Roo.data.Record objects from a JSON response
 * based on mappings in a provided Roo.data.Record constructor.
 * 
 * The default behaviour of a store is to send ?_requestMeta=1, unless the class has recieved 'metaData' property
 * in the reply previously. 
 * 
 * <p>
 * Example code:
 * <pre><code>
var RecordDef = Roo.data.Record.create([
    {name: 'name', mapping: 'name'},     // "mapping" property not needed if it's the same as "name"
    {name: 'occupation'}                 // This field will use "occupation" as the mapping.
]);
var myReader = new Roo.data.JsonReader({
    totalProperty: "results",    // The property which contains the total dataset size (optional)
    root: "rows",                // The property which contains an Array of row objects
    id: "id"                     // The property within each row object that provides an ID for the record (optional)
}, RecordDef);
</code></pre>
 * <p>
 * This would consume a JSON file like this:
 * <pre><code>
{ 'results': 2, 'rows': [
    { 'id': 1, 'name': 'Bill', occupation: 'Gardener' },
    { 'id': 2, 'name': 'Ben', occupation: 'Horticulturalist' } ]
}
</code></pre>
 * @cfg {String} totalProperty Name of the property from which to retrieve the total number of records
 * in the dataset. This is only needed if the whole dataset is not passed in one go, but is being
 * paged from the remote server.
 * @cfg {String} successProperty Name of the property from which to retrieve the success attribute used by forms.
 * @cfg {String} root name of the property which contains the Array of row objects.
 * @cfg {String} id Name of the property within a row object that contains a record identifier value.
 * @cfg {Array} fields Array of field definition objects
 * @constructor
 * Create a new JsonReader
 * @param {Object} meta Metadata configuration options
 * @param {Object} recordType Either an Array of field definition objects,
 * or an {@link Roo.data.Record} object created using {@link Roo.data.Record#create}.
 */
Roo.data.JsonReader = function(meta, recordType){
    
    meta = meta || {};
    // set some defaults:
    Roo.applyIf(meta, {
        totalProperty: 'total',
        successProperty : 'success',
        root : 'data',
        id : 'id'
    });
    
    Roo.data.JsonReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};
Roo.extend(Roo.data.JsonReader, Roo.data.DataReader, {
    
    /**
     * @prop {Boolean} metaFromRemote  - if the meta data was loaded from the remote source.
     * Used by Store query builder to append _requestMeta to params.
     * 
     */
    metaFromRemote : false,
    /**
     * This method is only used by a DataProxy which has retrieved data from a remote server.
     * @param {Object} response The XHR object which contains the JSON data in its responseText.
     * @return {Object} data A data block which is used by an Roo.data.Store object as
     * a cache of Roo.data.Records.
     */
    read : function(response){
        var json = response.responseText;
       
        var o = /* eval:var:o */ eval("("+json+")");
        Roo.log(o);
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
        
        if(o.metaData){
            
            delete this.ef;
            this.metaFromRemote = true;
            this.meta = o.metaData;
            this.recordType = Roo.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        return this.readRecords(o);
    },

    // private function a store will implement
    onMetaChange : function(meta, recordType, o){

    },

    /**
	 * @ignore
	 */
    simpleAccess: function(obj, subsc) {
    	return obj[subsc];
    },

	/**
	 * @ignore
	 */
    getJsonAccessor: function(){
        var re = /[\[\.]/;
        return function(expr) {
            try {
                return(re.test(expr))
                    ? new Function("obj", "return obj." + expr)
                    : function(obj){
                        return obj[expr];
                    };
            } catch(e){}
            return Roo.emptyFn;
        };
    }(),

    /**
     * Create a data block containing Roo.data.Records from an XML document.
     * @param {Object} o An object which contains an Array of row objects in the property specified
     * in the config as 'root, and optionally a property, specified in the config as 'totalProperty'
     * which contains the total size of the dataset.
     * @return {Object} data A data block which is used by an Roo.data.Store object as
     * a cache of Roo.data.Records.
     */
    readRecords : function(o){
        /**
         * After any data loads, the raw JSON data is available for further custom processing.
         * @type Object
         */
        this.o = o;
        var s = this.meta, Record = this.recordType,
            f = Record ? Record.prototype.fields : null, fi = f ? f.items : [], fl = f ? f.length : 0;

//      Generate extraction functions for the totalProperty, the root, the id, and for each field
        if (!this.ef) {
            if(s.totalProperty) {
	            this.getTotal = this.getJsonAccessor(s.totalProperty);
	        }
	        if(s.successProperty) {
	            this.getSuccess = this.getJsonAccessor(s.successProperty);
	        }
	        this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
	        if (s.id) {
	        	var g = this.getJsonAccessor(s.id);
	        	this.getId = function(rec) {
	        		var r = g(rec);  
		        	return (r === undefined || r === "") ? null : r;
	        	};
	        } else {
	        	this.getId = function(){return null;};
	        }
            this.ef = [];
            for(var jj = 0; jj < fl; jj++){
                f = fi[jj];
                var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
                this.ef[jj] = this.getJsonAccessor(map);
            }
        }

    	var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
    	if(s.totalProperty){
            var vt = parseInt(this.getTotal(o), 10);
            if(!isNaN(vt)){
                totalRecords = vt;
            }
        }
        if(s.successProperty){
            var vs = this.getSuccess(o);
            if(vs === false || vs === 'false'){
                success = false;
            }
        }
        var records = [];
        for(var i = 0; i < c; i++){
                var n = root[i];
            var values = {};
            var id = this.getId(n);
            for(var j = 0; j < fl; j++){
                f = fi[j];
            var v = this.ef[j](n);
            if (!f.convert) {
                Roo.log('missing convert for ' + f.name);
                Roo.log(f);
                continue;
            }
            values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue);
            }
            var record = new Record(values, id);
            record.json = n;
            records[i] = record;
        }
        return {
            raw : o,
            success : success,
            records : records,
            totalRecords : totalRecords
        };
    }
});