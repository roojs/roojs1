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
 
// Base class for reading structured data from a data source.  This class is intended to be
// extended (see ArrayReader, JsonReader and XmlReader) and should not be created directly.

/**
 * @class Roo.data.DataReader
 * Base class for reading structured data from a data source.  This class is intended to be
 * extended (see {Roo.data.ArrayReader}, {Roo.data.JsonReader} and {Roo.data.XmlReader}) and should not be created directly.
 */

Roo.data.DataReader = function(meta, recordType){
    
    this.meta = meta;
    
    this.recordType = recordType instanceof Array ? 
        Roo.data.Record.create(recordType) : recordType;
};

Roo.data.DataReader.prototype = {
     /**
     * Create an empty record
     * @param {Object} data (optional) - overlay some values
     * @return {Roo.data.Record} record created.
     */
    newRow :  function(d) {
        var da =  {};
        this.recordType.prototype.fields.each(function(c) {
            switch( c.type) {
                case 'int' : da[c.name] = 0; break;
                case 'date' : da[c.name] = new Date(); break;
                case 'float' : da[c.name] = 0.0; break;
                case 'boolean' : da[c.name] = false; break;
                
                default : da[c.name] = ""; break;
            }
            
        });
        return new this.recordType(Roo.apply(da, d));
    }
    
};