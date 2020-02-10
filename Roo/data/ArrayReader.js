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
 * @class Roo.data.ArrayReader
 * @extends Roo.data.DataReader
 * Data reader class to create an Array of Roo.data.Record objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <em>mapping</em> property
 * of the field definition if it exists, or the field's ordinal position in the definition.<br>
 * <p>
 * Example code:.
 * <pre><code>
var RecordDef = Roo.data.Record.create([
    {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
    {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.
]);
var myReader = new Roo.data.ArrayReader({
    id: 0                     // The subscript within row Array that provides an ID for the Record (optional)
}, RecordDef);
</code></pre>
 * <p>
 * This would consume an Array like this:
 * <pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
  </code></pre>
 
 * @constructor
 * Create a new JsonReader
 * @param {Object} meta Metadata configuration options.
 * @param {Object|Array} recordType Either an Array of field definition objects
 * 
 * @cfg {Array} fields Array of field definition objects
 * @cfg {String} id Name of the property within a row object that contains a record identifier value.
 * as specified to {@link Roo.data.Record#create},
 * or an {@link Roo.data.Record} object
 *
 * 
 * created using {@link Roo.data.Record#create}.
 */
Roo.data.ArrayReader = function(meta, recordType)
{    
    Roo.data.ArrayReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};

Roo.extend(Roo.data.ArrayReader, Roo.data.JsonReader, {
    
      /**
     * Create a data block containing Roo.data.Records from an XML document.
     * @param {Object} o An Array of row objects which represents the dataset.
     * @return {Object} A data block which is used by an {@link Roo.data.Store} object as
     * a cache of Roo.data.Records.
     */
    readRecords : function(o)
    {
        var sid = this.meta ? this.meta.id : null;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var records = [];
    	var root = o;
	for(var i = 0; i < root.length; i++){
		var n = root[i];
	    var values = {};
	    var id = ((sid || sid === 0) && n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
	    for(var j = 0, jlen = fields.length; j < jlen; j++){
		var f = fields.items[j];
		var k = f.mapping !== undefined && f.mapping !== null ? f.mapping : j;
		var v = n[k] !== undefined ? n[k] : f.defaultValue;
		v = f.convert(v);
		values[f.name] = v;
	    }
	    var record = new recordType(values, id);
	    record.json = n;
	    records[records.length] = record;
	}
	return {
	    records : records,
	    totalRecords : records.length
	};
    },
    /**
     * using 'cn' the nested child reader read the child array into it's child stores.
     *
     */
    loadDataFromChildren: function(rec)
    {
	// expect rec just to be an array.. eg [a,b,c, [...] << cn ]
	return this.loadData(rec.data.cn);
	
    }
    
    
});