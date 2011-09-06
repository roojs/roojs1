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
 * @class Roo.tree.TreeLoader
 * @extends Roo.util.Observable
 * A TreeLoader provides for lazy loading of an {@link Roo.tree.TreeNode}'s child
 * nodes from a specified URL. The response must be a javascript Array definition
 * who's elements are node definition objects. eg:
 * <pre><code>
   [{ 'id': 1, 'text': 'A folder Node', 'leaf': false },
    { 'id': 2, 'text': 'A leaf Node', 'leaf': true }]
</code></pre>
 * <br><br>
 * A server request is sent, and child nodes are loaded only when a node is expanded.
 * The loading node's id is passed to the server under the parameter name "node" to
 * enable the server to produce the correct child nodes.
 * <br><br>
 * To pass extra parameters, an event handler may be attached to the "beforeload"
 * event, and the parameters specified in the TreeLoader's baseParams property:
 * <pre><code>
    myTreeLoader.on("beforeload", function(treeLoader, node) {
        this.baseParams.category = node.attributes.category;
    }, this);
</code></pre><
 * This would pass an HTTP parameter called "category" to the server containing
 * the value of the Node's "category" attribute.
 * @constructor
 * Creates a new Treeloader.
 * @param {Object} config A config object containing config properties.
 */
Roo.tree.TreeLoader = function(config){
    this.baseParams = {};
    this.requestMethod = "POST";
    Roo.apply(this, config);

    this.addEvents({
    
        /**
         * @event beforeload
         * Fires before a network request is made to retrieve the Json text which specifies a node's children.
         * @param {Object} This TreeLoader object.
         * @param {Object} node The {@link Roo.tree.TreeNode} object being loaded.
         * @param {Object} callback The callback function specified in the {@link #load} call.
         */
        beforeload : true,
        /**
         * @event load
         * Fires when the node has been successfuly loaded.
         * @param {Object} This TreeLoader object.
         * @param {Object} node The {@link Roo.tree.TreeNode} object being loaded.
         * @param {Object} response The response object containing the data from the server.
         */
        load : true,
        /**
         * @event loadexception
         * Fires if the network request failed.
         * @param {Object} This TreeLoader object.
         * @param {Object} node The {@link Roo.tree.TreeNode} object being loaded.
         * @param {Object} response The response object containing the data from the server.
         */
        loadexception : true,
        /**
         * @event create
         * Fires before a node is created, enabling you to return custom Node types 
         * @param {Object} This TreeLoader object.
         * @param {Object} attr - the data returned from the AJAX call (modify it to suit)
         */
        create : true
    });

    Roo.tree.TreeLoader.superclass.constructor.call(this);
};

Roo.extend(Roo.tree.TreeLoader, Roo.util.Observable, {
    /**
    * @cfg {String} dataUrl The URL from which to request a Json string which
    * specifies an array of node definition object representing the child nodes
    * to be loaded.
    */
    /**
    * @cfg {Object} baseParams (optional) An object containing properties which
    * specify HTTP parameters to be passed to each request for child nodes.
    */
    /**
    * @cfg {Object} baseAttrs (optional) An object containing attributes to be added to all nodes
    * created by this loader. If the attributes sent by the server have an attribute in this object,
    * they take priority.
    */
    /**
    * @cfg {Object} uiProviders (optional) An object containing properties which
    * 
    * DEPRECIATED - use 'create' event handler to modify attributes - which affect creation.
    * specify custom {@link Roo.tree.TreeNodeUI} implementations. If the optional
    * <i>uiProvider</i> attribute of a returned child node is a string rather
    * than a reference to a TreeNodeUI implementation, this that string value
    * is used as a property name in the uiProviders object. You can define the provider named
    * 'default' , and this will be used for all nodes (if no uiProvider is delivered by the node data)
    */
    uiProviders : {},

    /**
    * @cfg {Boolean} clearOnLoad (optional) Default to true. Remove previously existing
    * child nodes before loading.
    */
    clearOnLoad : true,

    /**
    * @cfg {String} root (optional) Default to false. Use this to read data from an object 
    * property on loading, rather than expecting an array. (eg. more compatible to a standard
    * Grid query { data : [ .....] }
    */
    
    root : false,
     /**
    * @cfg {String} queryParam (optional) 
    * Name of the query as it will be passed on the querystring (defaults to 'node')
    * eg. the request will be ?node=[id]
    */
    
    
    queryParam: false,
    
    /**
     * Load an {@link Roo.tree.TreeNode} from the URL specified in the constructor.
     * This is called automatically when a node is expanded, but may be used to reload
     * a node (or append new children if the {@link #clearOnLoad} option is false.)
     * @param {Roo.tree.TreeNode} node
     * @param {Function} callback
     */
    load : function(node, callback){
        if(this.clearOnLoad){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
        if(node.attributes.children){ // preloaded json children
            var cs = node.attributes.children;
            for(var i = 0, len = cs.length; i < len; i++){
                node.appendChild(this.createNode(cs[i]));
            }
            if(typeof callback == "function"){
                callback();
            }
        }else if(this.dataUrl){
            this.requestData(node, callback);
        }
    },

    getParams: function(node){
        var buf = [], bp = this.baseParams;
        for(var key in bp){
            if(typeof bp[key] != "function"){
                buf.push(encodeURIComponent(key), "=", encodeURIComponent(bp[key]), "&");
            }
        }
        var n = this.queryParam === false ? 'node' : this.queryParam;
        buf.push(n + "=", encodeURIComponent(node.id));
        return buf.join("");
    },

    requestData : function(node, callback){
        if(this.fireEvent("beforeload", this, node, callback) !== false){
            this.transId = Roo.Ajax.request({
                method:this.requestMethod,
                url: this.dataUrl||this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {callback: callback, node: node},
                params: this.getParams(node)
            });
        }else{
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if(typeof callback == "function"){
                callback();
            }
        }
    },

    isLoading : function(){
        return this.transId ? true : false;
    },

    abort : function(){
        if(this.isLoading()){
            Roo.Ajax.abort(this.transId);
        }
    },

    // private
    createNode : function(attr){
        // apply baseAttrs, nice idea Corey!
        if(this.baseAttrs){
            Roo.applyIf(attr, this.baseAttrs);
        }
        if(this.applyLoader !== false){
            attr.loader = this;
        }
        // uiProvider = depreciated..
        
        if(typeof(attr.uiProvider) == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || 
                /**  eval:var:attr */ eval(attr.uiProvider);
        }
        if(typeof(this.uiProviders['default']) != 'undefined') {
            attr.uiProvider = this.uiProviders['default'];
        }
        
        this.fireEvent('create', this, attr);
        
        attr.leaf  = typeof(attr.leaf) == 'string' ? attr.leaf * 1 : attr.leaf;
        return(attr.leaf ?
                        new Roo.tree.TreeNode(attr) :
                        new Roo.tree.AsyncTreeNode(attr));
    },

    processResponse : function(response, node, callback){
        var json = response.responseText;
        try {
            
            var o = Roo.decode(json);
            
            if (!o.success) {
                // it's a failure condition.
                var a = response.argument;
                this.fireEvent("loadexception", this, a.node, response);
                Roo.log("Load failed - should have a handler really");
                
            }
            
            if (this.root !== false) {
                o = o[this.root];
            }
            
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            if(typeof callback == "function"){
                callback(this, node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    },

    handleResponse : function(response){
        this.transId = false;
        var a = response.argument;
        this.processResponse(response, a.node, a.callback);
        this.fireEvent("load", this, a.node, response);
    },

    handleFailure : function(response)
    {
        // should handle failure better..
        this.transId = false;
        var a = response.argument;
        this.fireEvent("loadexception", this, a.node, response);
        if(typeof a.callback == "function"){
            a.callback(this, a.node);
        }
    }
});