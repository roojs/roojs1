//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)



Roo.onReady(function(){
    
    
    // create the Data Store
    var ds = new Roo.data.Store({
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Roo.data.ScriptTagProxy({
            url: 'http://extjs.com/forum/topics-remote.php'
        }),

        // create reader that reads the Topic records
        reader: new Roo.data.JsonReader({
            root: 'topics',
            totalProperty: 'totalCount',
            id: 'post_id'
        }, [
            {name: 'title', mapping: 'topic_title'},
            {name: 'author', mapping: 'author'},
            {name: 'totalPosts', mapping: 'topic_replies', type: 'int'},
            {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
            {name: 'excerpt', mapping: 'post_text'}
        ]),

        // turn on remote sorting
        remoteSort: true
    });
    
    var cm = new Roo.grid.ColumnModel([{
           id: 'topic', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
           header: "Topic",
           dataIndex: 'title',
           width: 490,
           renderer: renderTopic,
           css: 'white-space:normal;'
        },{
           header: "Author",
           dataIndex: 'author',
           width: 100,
           hidden: true
        },{
           id: 'last',
           header: "Last Post",
           dataIndex: 'lastPost',
           width: 150,
           renderer: renderLast
        }]);
    
    var view = Roo.grid.ViewPanel("view", {
        ds: ds,
        cm: cm,
        selModel: new Roo.grid.RowSelectionModel({singleSelect:true}),
        enableColLock:false,
        loadMask: true
    });
    
    
    viewpanel.render('view');

});