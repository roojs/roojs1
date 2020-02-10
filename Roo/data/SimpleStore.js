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
 * @class Roo.data.SimpleStore
 * @extends Roo.data.Store
 * Small helper class to make creating Stores from Array data easier.
 * @cfg {Number} id The array index of the record id. Leave blank to auto generate ids.
 * @cfg {Array} fields An array of field definition objects, or field name strings.
 * @cfg {Object} an existing reader (eg. copied from another store)
 * @cfg {Array} data The multi-dimensional array of data
 * @constructor
 * @param {Object} config
 */
Roo.data.SimpleStore = function(config)
{
    Roo.data.SimpleStore.superclass.constructor.call(this, {
        isLocal : true,
        reader: typeof(config.reader) != 'undefined' ? config.reader : new Roo.data.ArrayReader({
                id: config.id
            },
            Roo.data.Record.create(config.fields)
        ),
        proxy : new Roo.data.MemoryProxy(config.data)
    });
    this.load();
};
Roo.extend(Roo.data.SimpleStore, Roo.data.Store);