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


Roo.onReady(function(){

    var ds = new Roo.data.Store({
        
      
         
        proxy: new Roo.data.ScriptTagProxy({
            url: 'http://www.roojs.com/forum/topics-remote.php'
        }),
        reader: new Roo.data.JsonReader({
            root: 'topics',
            totalProperty: 'totalCount',
            id: 'post_id'
        }, [
            {name: 'title', mapping: 'topic_title'},
            {name: 'topicId', mapping: 'topic_id'},
            {name: 'author', mapping: 'author'},
            {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
            {name: 'excerpt', mapping: 'post_text'}
        ])
        */
    });

    // Custom rendering Template
    var resultTpl = new Roo.Template(
        '<div class="search-item">',
            '<h3><span>{lastPost:date("M j, Y")}<br />by {author}</span>{title}</h3>',
            '{excerpt}',
        '</div>'
    );
    
    var search = new Roo.form.ComboBox({
        store: ds,
        displayField:'title',
        typeAhead: false,
        loadingText: 'Searching...',
        width: 570,
        pageSize:10,
        hideTrigger:true,
        tpl: resultTpl,
        onSelect: function(record){ // override default onSelect to do redirect
            window.location =
               String.format('http://www.roojs.com/forum/showthread.php?t={0}&p={1}', record.data.topicId, record.id);
        }
    });
    // apply it to the exsting input element
    search.applyTo('search');
});