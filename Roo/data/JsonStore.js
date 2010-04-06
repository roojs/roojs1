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
/**
 * @extends Roo.data.Store
 * @class Roo.data.JsonStore
 * Small helper class to make creating Stores for JSON data easier. <br/>
<pre><code>
var store = new Roo.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date'}]
});
</code></pre>
 * <b>Note: Although they are not listed, this class inherits all of the config options of Store,
 * JsonReader and HttpProxy (unless inline data is provided).</b>
 * @cfg {Array} fields An array of field definition objects, or field name strings.
 * @constructor
 * @param {Object} config
 */
Roo.data.JsonStore = function(c){
    Roo.data.JsonStore.superclass.constructor.call(this, Roo.apply(c, {
        proxy: !c.data ? new Roo.data.HttpProxy({url: c.url}) : undefined,
        reader: new Roo.data.JsonReader(c, c.fields)
    }));
};
Roo.extend(Roo.data.JsonStore, Roo.data.Store);