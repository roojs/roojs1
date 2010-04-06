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

Roo.BLANK_IMAGE_URL  = "../../images/default/s.gif";


Roo.onReady(function(){

    // create the Data Store
    var ds = new Roo.data.Store({
        // load using HTTP
        proxy: new Roo.data.HttpProxy({url: 'sheldon.xml'}),

        // the return will be XML, so lets set up a reader
        reader: new Roo.data.XmlReader({
               // records will have an "Item" tag
               record: 'Item',
               id: 'ASIN',
               totalRecords: '@total'
           }, [
               // set up the fields mapping into the xml doc
               // The first needs mapping, the others are very basic
               {name: 'Author', mapping: 'ItemAttributes > Author'},
               'Title', 'Manufacturer', 'ProductGroup'
           ])
    });

    var cm = new Roo.grid.ColumnModel([
	    {header: "Author", width: 120, dataIndex: 'Author'},
		{header: "Title", width: 180, dataIndex: 'Title'},
		{header: "Manufacturer", width: 115, dataIndex: 'Manufacturer'},
		{header: "Product Group", width: 100, dataIndex: 'ProductGroup'}
	]);
    cm.defaultSortable = true;

    // create the grid
    var grid = new Roo.grid.Grid('example-grid', {
        ds: ds,
        cm: cm
    });
    grid.render();

    ds.load();
});
