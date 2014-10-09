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
 * @class Roo.View
 * @extends Roo.util.Observable
 * Create a "View" for an element based on a data model or UpdateManager and the supplied DomHelper template. 
 * This class also supports single and multi selection modes. <br>
 * Create a data model bound view:
 <pre><code>
 var store = new Roo.data.Store(...);

 var view = new Roo.View({
    el : "my-element",
    tpl : '&lt;div id="{0}"&gt;{2} - {1}&lt;/div&gt;', // auto create template
 
    singleSelect: true,
    selectedClass: "ydataview-selected",
    store: store
 });

 // listen for node click?
 view.on("click", function(vw, index, node, e){
 alert('Node "' + node.id + '" at index: ' + index + " was clicked.");
 });

 // load XML data
 dataModel.load("foobar.xml");
 </code></pre>
 For an example of creating a JSON/UpdateManager view, see {@link Roo.JsonView}.
 * <br><br>
 * <b>Note: The root of your template must be a single node. Table/row implementations may work but are not supported due to
 * IE"s limited insertion support with tables and Opera"s faulty event bubbling.</b>
 * 
 * Note: old style constructor is still suported (container, template, config)
 * 
 * @constructor
 * Create a new View
 * @param {Object} config The config object
 * 
 */
Roo.View = function(config, depreciated_tpl, depreciated_config){
    
    if (typeof(depreciated_tpl) == 'undefined') {
        // new way.. - universal constructor.
        Roo.apply(this, config);
        this.el  = Roo.get(this.el);
    } else {
        // old format..
        this.el  = Roo.get(config);
        this.tpl = depreciated_tpl;
        Roo.apply(this, depreciated_config);
    }
    this.wrapEl  = this.el.wrap().wrap();
    ///this.el = this.wrapEla.appendChild(document.createElement("div"));
    
    
    if(typeof(this.tpl) == "string"){
        this.tpl = new Roo.Template(this.tpl);
    } else {
        // support xtype ctors..
        this.tpl = new Roo.factory(this.tpl, Roo);
    }
    
    
    this.tpl.compile();
   
  
    
     
    /** @private */
    this.addEvents({
        /**
         * @event beforeclick
         * Fires before a click is processed. Returns false to cancel the default action.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "beforeclick" : true,
        /**
         * @event click
         * Fires when a template node is clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "click" : true,
        /**
         * @event dblclick
         * Fires when a template node is double clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "dblclick" : true,
        /**
         * @event contextmenu
         * Fires when a template node is right clicked.
         * @param {Roo.View} this
         * @param {Number} index The index of the target node
         * @param {HTMLElement} node The target node
         * @param {Roo.EventObject} e The raw event object
         */
            "contextmenu" : true,
        /**
         * @event selectionchange
         * Fires when the selected nodes change.
         * @param {Roo.View} this
         * @param {Array} selections Array of the selected nodes
         */
            "selectionchange" : true,
    
        /**
         * @event beforeselect
         * Fires before a selection is made. If any handlers return false, the selection is cancelled.
         * @param {Roo.View} this
         * @param {HTMLElement} node The node to be selected
         * @param {Array} selections Array of currently selected nodes
         */
            "beforeselect" : true,
        /**
         * @event preparedata
         * Fires on every row to render, to allow you to change the data.
         * @param {Roo.View} this
         * @param {Object} data to be rendered (change this)
         */
          "preparedata" : true
          
          
        });



    this.el.on({
        "click": this.onClick,
        "dblclick": this.onDblClick,
        "contextmenu": this.onContextMenu,
        scope:this
    });

    this.selections = [];
    this.nodes = [];
    this.cmp = new Roo.CompositeElementLite([]);
    if(this.store){
        this.store = Roo.factory(this.store, Roo.data);
        this.setStore(this.store, true);
    }
    
    if ( this.footer && this.footer.xtype) {
           
         var fctr = this.wrapEl.appendChild(document.createElement("div"));
        
        this.footer.dataSource = this.store
        this.footer.container = fctr;
        this.footer = Roo.factory(this.footer, Roo);
        fctr.insertFirst(this.el);
        
        // this is a bit insane - as the paging toolbar seems to detach the el..
//        dom.parentNode.parentNode.parentNode
         // they get detached?
    }
    
    
    Roo.View.superclass.constructor.call(this);
    
    
};

Roo.extend(Roo.View, Roo.util.Observable, {
    
     /**
     * @cfg {Roo.data.Store} store Data store to load data from.
     */
    store : false,
    
    /**
     * @cfg {String|Roo.Element} el The container element.
     */
    el : '',
    
    /**
     * @cfg {String|Roo.Template} tpl The template used by this View 
     */
    tpl : false,
    /**
     * @cfg {String} dataName the named area of the template to use as the data area
     *                          Works with domtemplates roo-name="name"
     */
    dataName: false,
    /**
     * @cfg {String} selectedClass The css class to add to selected nodes
     */
    selectedClass : "x-view-selected",
     /**
     * @cfg {String} emptyText The empty text to show when nothing is loaded.
     */
    emptyText : "",
    
    /**
     * @cfg {String} text to display on mask (default Loading)
     */
    mask : false,
    /**
     * @cfg {Boolean} multiSelect Allow multiple selection
     */
    multiSelect : false,
    /**
     * @cfg {Boolean} singleSelect Allow single selection
     */
    singleSelect:  false,
    
    /**
     * @cfg {Boolean} toggleSelect - selecting 
     */
    toggleSelect : false,
    
    /**
     * Returns the element this view is bound to.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.wrapEl;
    },
    
    

    /**
     * Refreshes the view. - called by datachanged on the store. - do not call directly.
     */
    refresh : function(){
        Roo.log('refresh');
        var t = this.tpl;
        
        // if we are using something like 'domtemplate', then
        // the what gets used is:
        // t.applySubtemplate(NAME, data, wrapping data..)
        // the outer template then get' applied with
        //     the store 'extra data'
        // and the body get's added to the
        //      roo-name="data" node?
        //      <span class='roo-tpl-{name}'></span> ?????
        
        
        
        this.clearSelections();
        this.el.update("");
        var html = [];
        var records = this.store.getRange();
        if(records.length < 1) {
            
            // is this valid??  = should it render a template??
            
            this.el.update(this.emptyText);
            return;
        }
        var el = this.el;
        if (this.dataName) {
            this.el.update(t.apply(this.store.meta)); //????
            el = this.el.child('.roo-tpl-' + this.dataName);
        }
        
        for(var i = 0, len = records.length; i < len; i++){
            var data = this.prepareData(records[i].data, i, records[i]);
            this.fireEvent("preparedata", this, data, i, records[i]);
            html[html.length] = Roo.util.Format.trim(
                this.dataName ?
                    t.applySubtemplate(this.dataName, data, this.store.meta) :
                    t.apply(data)
            );
        }
        
        
        
        el.update(html.join(""));
        this.nodes = el.dom.childNodes;
        this.updateIndexes(0);
    },
    

    /**
     * Function to override to reformat the data that is sent to
     * the template for each node.
     * DEPRICATED - use the preparedata event handler.
     * @param {Array/Object} data The raw data (array of colData for a data model bound view or
     * a JSON object for an UpdateManager bound view).
     */
    prepareData : function(data, index, record)
    {
        this.fireEvent("preparedata", this, data, index, record);
        return data;
    },

    onUpdate : function(ds, record){
         Roo.log('on update');   
        this.clearSelections();
        var index = this.store.indexOf(record);
        var n = this.nodes[index];
        this.tpl.insertBefore(n, this.prepareData(record.data, index, record));
        n.parentNode.removeChild(n);
        this.updateIndexes(index, index);
    },

    
    
// --------- FIXME     
    onAdd : function(ds, records, index)
    {
        Roo.log(['on Add', ds, records, index] );        
        this.clearSelections();
        if(this.nodes.length == 0){
            this.refresh();
            return;
        }
        var n = this.nodes[index];
        for(var i = 0, len = records.length; i < len; i++){
            var d = this.prepareData(records[i].data, i, records[i]);
            if(n){
                this.tpl.insertBefore(n, d);
            }else{
                
                this.tpl.append(this.el, d);
            }
        }
        this.updateIndexes(index);
    },

    onRemove : function(ds, record, index){
        Roo.log('onRemove');
        this.clearSelections();
        var el = this.dataName  ?
            this.el.child('.roo-tpl-' + this.dataName) :
            this.el; 
        
        el.dom.removeChild(this.nodes[index]);
        this.updateIndexes(index);
    },

    /**
     * Refresh an individual node.
     * @param {Number} index
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    updateIndexes : function(startIndex, endIndex){
        var ns = this.nodes;
        startIndex = startIndex || 0;
        endIndex = endIndex || ns.length - 1;
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].nodeIndex = i;
        }
    },

    /**
     * Changes the data store this view uses and refresh the view.
     * @param {Store} store
     */
    setStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("datachanged", this.refresh);
            this.store.un("add", this.onAdd);
            this.store.un("remove", this.onRemove);
            this.store.un("update", this.onUpdate);
            this.store.un("clear", this.refresh);
            this.store.un("beforeload", this.onBeforeLoad);
            this.store.un("load", this.onLoad);
            this.store.un("loadexception", this.onLoad);
        }
        if(store){
          
            store.on("datachanged", this.refresh, this);
            store.on("add", this.onAdd, this);
            store.on("remove", this.onRemove, this);
            store.on("update", this.onUpdate, this);
            store.on("clear", this.refresh, this);
            store.on("beforeload", this.onBeforeLoad, this);
            store.on("load", this.onLoad, this);
            store.on("loadexception", this.onLoad, this);
        }
        
        if(store){
            this.refresh();
        }
    },
    /**
     * onbeforeLoad - masks the loading area.
     *
     */
    onBeforeLoad : function(store,opts)
    {
         Roo.log('onBeforeLoad !!');   
        if (!opts.add) {
            this.el.update("");
        }
        this.el.mask(this.mask ? this.mask : "Loading" ); 
    },
    onLoad : function ()
    {
        this.el.unmask();
    },
    

    /**
     * Returns the template node the passed child belongs to or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemFromChild : function(node){
        var el = this.dataName  ?
            this.el.child('.roo-tpl-' + this.dataName,true) :
            this.el.dom; 
        
        if(!node || node.parentNode == el){
		    return node;
	    }
	    var p = node.parentNode;
	    while(p && p != el){
            if(p.parentNode == el){
            	return p;
            }
            p = p.parentNode;
        }
	    return null;
    },

    /** @ignore */
    onClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            var index = this.indexOf(item);
            if(this.onItemClick(item, index, e) !== false){
                this.fireEvent("click", this, index, item, e);
            }
        }else{
            this.clearSelections();
        }
    },

    /** @ignore */
    onContextMenu : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("contextmenu", this, this.indexOf(item), item, e);
        }
    },

    /** @ignore */
    onDblClick : function(e){
        var item = this.findItemFromChild(e.getTarget());
        if(item){
            this.fireEvent("dblclick", this, this.indexOf(item), item, e);
        }
    },

    onItemClick : function(item, index, e)
    {
        if(this.fireEvent("beforeclick", this, index, item, e) === false){
            return false;
        }
        if (this.toggleSelect) {
            var m = this.isSelected(item) ? 'unselect' : 'select';
            Roo.log(m);
            var _t = this;
            _t[m](item, true, false);
            return true;
        }
        if(this.multiSelect || this.singleSelect){
            if(this.multiSelect && e.shiftKey && this.lastSelection){
                this.select(this.getNodes(this.indexOf(this.lastSelection), index), false);
            }else{
                this.select(item, this.multiSelect && e.ctrlKey);
                this.lastSelection = item;
            }
            e.preventDefault();
        }
        return true;
    },

    /**
     * Get the number of selected nodes.
     * @return {Number}
     */
    getSelectionCount : function(){
        return this.selections.length;
    },

    /**
     * Get the currently selected nodes.
     * @return {Array} An array of HTMLElements
     */
    getSelectedNodes : function(){
        return this.selections;
    },

    /**
     * Get the indexes of the selected nodes.
     * @return {Array}
     */
    getSelectedIndexes : function(){
        var indexes = [], s = this.selections;
        for(var i = 0, len = s.length; i < len; i++){
            indexes.push(s[i].nodeIndex);
        }
        return indexes;
    },

    /**
     * Clear all selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange event
     */
    clearSelections : function(suppressEvent){
        if(this.nodes && (this.multiSelect || this.singleSelect) && this.selections.length > 0){
            this.cmp.elements = this.selections;
            this.cmp.removeClass(this.selectedClass);
            this.selections = [];
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
    },

    /**
     * Returns true if the passed node is selected
     * @param {HTMLElement/Number} node The node or node index
     * @return {Boolean}
     */
    isSelected : function(node){
        var s = this.selections;
        if(s.length < 1){
            return false;
        }
        node = this.getNode(node);
        return s.indexOf(node) !== -1;
    },

    /**
     * Selects nodes.
     * @param {Array/HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node, id of a template node or an array of any of those to select
     * @param {Boolean} keepExisting (optional) true to keep existing selections
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange vent
     */
    select : function(nodeInfo, keepExisting, suppressEvent){
        if(nodeInfo instanceof Array){
            if(!keepExisting){
                this.clearSelections(true);
            }
            for(var i = 0, len = nodeInfo.length; i < len; i++){
                this.select(nodeInfo[i], true, true);
            }
            return;
        } 
        var node = this.getNode(nodeInfo);
        if(!node || this.isSelected(node)){
            return; // already selected.
        }
        if(!keepExisting){
            this.clearSelections(true);
        }
        if(this.fireEvent("beforeselect", this, node, this.selections) !== false){
            Roo.fly(node).addClass(this.selectedClass);
            this.selections.push(node);
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
        
        
    },
      /**
     * Unselects nodes.
     * @param {Array/HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node, id of a template node or an array of any of those to select
     * @param {Boolean} keepExisting (optional) true IGNORED (for campatibility with select)
     * @param {Boolean} suppressEvent (optional) true to skip firing of the selectionchange vent
     */
    unselect : function(nodeInfo, keepExisting, suppressEvent)
    {
        if(nodeInfo instanceof Array){
            Roo.each(this.selections, function(s) {
                this.unselect(s, nodeInfo);
            }, this);
            return;
        }
        var node = this.getNode(nodeInfo);
        if(!node || !this.isSelected(node)){
            Roo.log("not selected");
            return; // not selected.
        }
        // fireevent???
        var ns = [];
        Roo.each(this.selections, function(s) {
            if (s == node ) {
                Roo.fly(node).removeClass(this.selectedClass);

                return;
            }
            ns.push(s);
        },this);
        
        this.selections= ns;
        this.fireEvent("selectionchange", this, this.selections);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo){
        if(typeof nodeInfo == "string"){
            return document.getElementById(nodeInfo);
        }else if(typeof nodeInfo == "number"){
            return this.nodes[nodeInfo];
        }
        return nodeInfo;
    },

    /**
     * Gets a range template nodes.
     * @param {Number} startIndex
     * @param {Number} endIndex
     * @return {Array} An array of nodes
     */
    getNodes : function(start, end){
        var ns = this.nodes;
        start = start || 0;
        end = typeof end == "undefined" ? ns.length - 1 : end;
        var nodes = [];
        if(start <= end){
            for(var i = start; i <= end; i++){
                nodes.push(ns[i]);
            }
        } else{
            for(var i = start; i >= end; i--){
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node
     * @param {HTMLElement/String/Number} nodeInfo An HTMLElement template node, index of a template node or the id of a template node
     * @return {Number} The index of the node or -1
     */
    indexOf : function(node){
        node = this.getNode(node);
        if(typeof node.nodeIndex == "number"){
            return node.nodeIndex;
        }
        var ns = this.nodes;
        for(var i = 0, len = ns.length; i < len; i++){
            if(ns[i] == node){
                return i;
            }
        }
        return -1;
    }
});
