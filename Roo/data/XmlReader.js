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
 * @class Roo.data.XmlReader
 * @extends Roo.data.DataReader
 * Data reader class to create an Array of {@link Roo.data.Record} objects from an XML document
 * based on mappings in a provided Roo.data.Record constructor.<br><br>
 * <p>
 * <em>Note that in order for the browser to parse a returned XML document, the Content-Type
 * header in the HTTP response must be set to "text/xml".</em>
 * <p>
 * Example code:
 * <pre><code>
var RecordDef = Roo.data.Record.create([
   {name: 'name', mapping: 'name'},     // "mapping" property not needed if it's the same as "name"
   {name: 'occupation'}                 // This field will use "occupation" as the mapping.
]);
var myReader = new Roo.data.XmlReader({
   totalRecords: "results", // The element which contains the total dataset size (optional)
   record: "row",           // The repeated element which contains row information
   id: "id"                 // The element within the row that provides an ID for the record (optional)
}, RecordDef);
</code></pre>
 * <p>
 * This would consume an XML file like this:
 * <pre><code>
&lt;?xml?>
&lt;dataset>
 &lt;results>2&lt;/results>
 &lt;row>
   &lt;id>1&lt;/id>
   &lt;name>Bill&lt;/name>
   &lt;occupation>Gardener&lt;/occupation>
 &lt;/row>
 &lt;row>
   &lt;id>2&lt;/id>
   &lt;name>Ben&lt;/name>
   &lt;occupation>Horticulturalist&lt;/occupation>
 &lt;/row>
&lt;/dataset>
</code></pre>
 * @cfg {String} totalRecords The DomQuery path from which to retrieve the total number of records
 * in the dataset. This is only needed if the whole dataset is not passed in one go, but is being
 * paged from the remote server.
 * @cfg {String} record The DomQuery path to the repeated element which contains record information.
 * @cfg {String} success The DomQuery path to the success attribute used by forms.
 * @cfg {String} id The DomQuery path relative from the record element to the element that contains
 * a record identifier value.
 * @constructor
 * Create a new XmlReader
 * @param {Object} meta Metadata configuration options
 * @param {Mixed} recordType The definition of the data record type to produce.  This can be either a valid
 * Record subclass created with {@link Roo.data.Record#create}, or an array of objects with which to call
 * Roo.data.Record.create.  See the {@link Roo.data.Record} class for more details.
 */
Roo.data.XmlReader = function(meta, recordType){
    meta = meta || {};
    Roo.data.XmlReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};
Roo.extend(Roo.data.XmlReader, Roo.data.DataReader, {
    
    readerType : 'Xml',
    
    /**
     * This method is only used by a DataProxy which has retrieved data from a remote server.
	 * @param {Object} response The XHR object which contains the parsed XML document.  The response is expected
	 * to contain a method called 'responseXML' that returns an XML document object.
     * @return {Object} records A data block which is used by an {@link Roo.data.Store} as
     * a cache of Roo.data.Records.
     */
    read : function(response){
        var doc = response.responseXML;
        if(!doc) {
            throw {message: "XmlReader.read: XML Document not available"};
        }
        return this.readRecords(doc);
    },

    /**
     * Create a data block containing Roo.data.Records from an XML document.
	 * @param {Object} doc A parsed XML document.
     * @return {Object} records A data block which is used by an {@link Roo.data.Store} as
     * a cache of Roo.data.Records.
     */
    readRecords : function(doc){
        /**
         * After any data loads/reads, the raw XML Document is available for further custom processing.
         * @type XMLDocument
         */
        this.xmlData = doc;
        var root = doc.documentElement || doc;
    	var q = Roo.DomQuery;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var sid = this.meta.id;
    	var totalRecords = 0, success = true;
    	if(this.meta.totalRecords){
    	    totalRecords = q.selectNumber(this.meta.totalRecords, root, 0);
    	}
        
        if(this.meta.success){
            var sv = q.selectValue(this.meta.success, root, true);
            success = sv !== false && sv !== 'false';
    	}
    	var records = [];
    	var ns = q.select(this.meta.record, root);
        for(var i = 0, len = ns.length; i < len; i++) {
	        var n = ns[i];
	        var values = {};
	        var id = sid ? q.selectValue(sid, n) : undefined;
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
	            var f = fields.items[j];
                var v = q.selectValue(f.mapping || f.name, n, f.defaultValue);
	            v = f.convert(v);
	            values[f.name] = v;
	        }
	        var record = new recordType(values, id);
	        record.node = n;
	        records[records.length] = record;
	    }

	    return {
	        success : success,
	        records : records,
	        totalRecords : totalRecords || records.length
	    };
    }
});