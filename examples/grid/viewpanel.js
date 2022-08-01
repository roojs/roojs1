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

var grid = false;

Roo.onReady(function(){
    Roo.QuickTips.init();
    function formatBoolean(value){
        return value ? 'Yes' : 'No';  
    };
    
    function formatDate(value){
        return value ? value.dateFormat('M d, Y') : '';
    };
    // shorthand alias
//    var fm = Roo.form, Ed = Roo.ViewPanel;

    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store (created below)
    var cm = new Roo.grid.ColumnModel([{
           header: "Common Name",
           dataIndex: 'url',
           width: 220  /*,
           
           editor: new Ed(new fm.TextField({
               allowBlank: false
           })) */
        }]);
    Roo.log(cm);
    // by default columns are sortable
    cm.defaultSortable = true;

    // this could be inline, but we want to define the Plant record
    // type so we can add records dynamically
    // 
    // create the Data Store
    var ds = new Roo.data.Store({
        // load using HTTP
        proxy: new Roo.data.HttpProxy({url: 'get-images.php'}),
        remoteSort : true,
        
        // the return will be XML, so lets set up a reader
        reader: new Roo.data.JsonReader({
            root: 'images',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
            {name: 'name', type: 'string'},
            {name: 'size', type: 'string'},
            {name: 'lastmod', type: 'string'},
            {name: 'url', type: 'string'}
        ])
    });

    // create the editor grid
    grid = new Roo.ViewPanel('editor-grid', {
        ds: ds,
        cm: cm,
        enableColLock:false,
        multiSort : true,
        enableDragDrop : true
       
    });
    
   

    var layout = Roo.BorderLayout.create({
        center: {
            margins:{left:3,top:3,right:3,bottom:3},
            panels: [new Roo.panel.Grid(grid)]
        }
    }, 'grid-panel');


    // render it
    grid.render();
    
    
    var gridHead = grid.getView().getHeaderPanel(true);
    var tb = new Roo.Toolbar(gridHead, [{
        text: 'Add new',
        handler : function(){
            Roo.log('clicked');
        }
    }]);

    // trigger the data store load
//    ds.load();
    
    var gridFoot = grid.getView().getFooterPanel(true);

    // add a paging toolbar to the grid's footer
    var paging = new Roo.PagingToolbar(gridFoot, ds, {
        pageSize: 25,
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    });
    // add the detailed view button
    paging.add('-', {
        pressed: true,
        enableToggle:true,
        text: 'Detailed View',
        cls: 'x-btn-text-icon details',
        toggleHandler: toggleDetails
    });

    // trigger the data store load
    ds.load({params:{start:0, limit:25}});

    function toggleDetails(btn, pressed){
        cm.getColumnById('topic').renderer = pressed ? renderTopic : renderTopicPlain;
        cm.getColumnById('last').renderer = pressed ? renderLast : renderLastPlain;
        grid.getView().refresh();
    }
});