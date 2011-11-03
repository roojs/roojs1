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
 * @class Roo.tree.TreePanel
 * @extends Roo.data.Tree

 * @cfg {Boolean} rootVisible false to hide the root node (defaults to true)
 * @cfg {Boolean} lines false to disable tree lines (defaults to true)
 * @cfg {Boolean} enableDD true to enable drag and drop
 * @cfg {Boolean} enableDrag true to enable just drag
 * @cfg {Boolean} enableDrop true to enable just drop
 * @cfg {Object} dragConfig Custom config to pass to the {@link Roo.tree.TreeDragZone} instance
 * @cfg {Object} dropConfig Custom config to pass to the {@link Roo.tree.TreeDropZone} instance
 * @cfg {String} ddGroup The DD group this TreePanel belongs to
 * @cfg {String} ddAppendOnly True if the tree should only allow append drops (use for trees which are sorted)
 * @cfg {Boolean} ddScroll true to enable YUI body scrolling
 * @cfg {Boolean} containerScroll true to register this container with ScrollManager
 * @cfg {Boolean} hlDrop false to disable node highlight on drop (defaults to the value of Roo.enableFx)
 * @cfg {String} hlColor The color of the node highlight (defaults to C3DAF9)
 * @cfg {Boolean} animate true to enable animated expand/collapse (defaults to the value of Roo.enableFx)
 * @cfg {Boolean} singleExpand true if only 1 node per branch may be expanded
 * @cfg {Boolean} selModel A tree selection model to use with this TreePanel (defaults to a {@link Roo.tree.DefaultSelectionModel})
 * @cfg {Boolean} loader A TreeLoader for use with this TreePanel
 * @cfg {Object|Roo.tree.TreeEditor} editor The TreeEditor or xtype data to display when clicked.
 * @cfg {String} pathSeparator The token used to separate sub-paths in path strings (defaults to '/')
 * @cfg {Function} renderer DEPRECATED - use TreeLoader:create event / Sets the rendering (formatting) function for the nodes. to return HTML markup for the tree view. The render function is called with  the following parameters:<ul><li>The {Object} The data for the node.</li></ul>
 * @cfg {Function} rendererTip DEPRECATED - use TreeLoader:create event / Sets the rendering (formatting) function for the nodes hovertip to return HTML markup for the tree view. The render function is called with  the following parameters:<ul><li>The {Object} The data for the node.</li></ul>
 * 
 * @constructor
 * @param {String/HTMLElement/Element} el The container element
 * @param {Object} config
 */
Roo.tree.TreePanel = function(el, config){
    var root = false;
    var loader = false;
    if (config.root) {
        root = config.root;
        delete config.root;
    }
    if (config.loader) {
        loader = config.loader;
        delete config.loader;
    }
    
    Roo.apply(this, config);
    Roo.tree.TreePanel.superclass.constructor.call(this);
    this.el = Roo.get(el);
    this.el.addClass('x-tree');
    //console.log(root);
    if (root) {
        this.setRootNode( Roo.factory(root, Roo.tree));
    }
    if (loader) {
        this.loader = Roo.factory(loader, Roo.tree);
    }
   /**
    * Read-only. The id of the container element becomes this TreePanel's id.
    */
    this.id = this.el.id;
    this.addEvents({
        /**
        * @event beforeload
        * Fires before a node is loaded, return false to cancel
        * @param {Node} node The node being loaded
        */
        "beforeload" : true,
        /**
        * @event load
        * Fires when a node is loaded
        * @param {Node} node The node that was loaded
        */
        "load" : true,
        /**
        * @event textchange
        * Fires when the text for a node is changed
        * @param {Node} node The node
        * @param {String} text The new text
        * @param {String} oldText The old text
        */
        "textchange" : true,
        /**
        * @event beforeexpand
        * Fires before a node is expanded, return false to cancel.
        * @param {Node} node The node
        * @param {Boolean} deep
        * @param {Boolean} anim
        */
        "beforeexpand" : true,
        /**
        * @event beforecollapse
        * Fires before a node is collapsed, return false to cancel.
        * @param {Node} node The node
        * @param {Boolean} deep
        * @param {Boolean} anim
        */
        "beforecollapse" : true,
        /**
        * @event expand
        * Fires when a node is expanded
        * @param {Node} node The node
        */
        "expand" : true,
        /**
        * @event disabledchange
        * Fires when the disabled status of a node changes
        * @param {Node} node The node
        * @param {Boolean} disabled
        */
        "disabledchange" : true,
        /**
        * @event collapse
        * Fires when a node is collapsed
        * @param {Node} node The node
        */
        "collapse" : true,
        /**
        * @event beforeclick
        * Fires before click processing on a node. Return false to cancel the default action.
        * @param {Node} node The node
        * @param {Roo.EventObject} e The event object
        */
        "beforeclick":true,
        /**
        * @event checkchange
        * Fires when a node with a checkbox's checked property changes
        * @param {Node} this This node
        * @param {Boolean} checked
        */
        "checkchange":true,
        /**
        * @event click
        * Fires when a node is clicked
        * @param {Node} node The node
        * @param {Roo.EventObject} e The event object
        */
        "click":true,
        /**
        * @event dblclick
        * Fires when a node is double clicked
        * @param {Node} node The node
        * @param {Roo.EventObject} e The event object
        */
        "dblclick":true,
        /**
        * @event contextmenu
        * Fires when a node is right clicked
        * @param {Node} node The node
        * @param {Roo.EventObject} e The event object
        */
        "contextmenu":true,
        /**
        * @event beforechildrenrendered
        * Fires right before the child nodes for a node are rendered
        * @param {Node} node The node
        */
        "beforechildrenrendered":true,
        /**
        * @event startdrag
        * Fires when a node starts being dragged
        * @param {Roo.tree.TreePanel} this
        * @param {Roo.tree.TreeNode} node
        * @param {event} e The raw browser event
        */ 
       "startdrag" : true,
       /**
        * @event enddrag
        * Fires when a drag operation is complete
        * @param {Roo.tree.TreePanel} this
        * @param {Roo.tree.TreeNode} node
        * @param {event} e The raw browser event
        */
       "enddrag" : true,
       /**
        * @event dragdrop
        * Fires when a dragged node is dropped on a valid DD target
        * @param {Roo.tree.TreePanel} this
        * @param {Roo.tree.TreeNode} node
        * @param {DD} dd The dd it was dropped on
        * @param {event} e The raw browser event
        */
       "dragdrop" : true,
       /**
        * @event beforenodedrop
        * Fires when a DD object is dropped on a node in this tree for preprocessing. Return false to cancel the drop. The dropEvent
        * passed to handlers has the following properties:<br />
        * <ul style="padding:5px;padding-left:16px;">
        * <li>tree - The TreePanel</li>
        * <li>target - The node being targeted for the drop</li>
        * <li>data - The drag data from the drag source</li>
        * <li>point - The point of the drop - append, above or below</li>
        * <li>source - The drag source</li>
        * <li>rawEvent - Raw mouse event</li>
        * <li>dropNode - Drop node(s) provided by the source <b>OR</b> you can supply node(s)
        * to be inserted by setting them on this object.</li>
        * <li>cancel - Set this to true to cancel the drop.</li>
        * </ul>
        * @param {Object} dropEvent
        */
       "beforenodedrop" : true,
       /**
        * @event nodedrop
        * Fires after a DD object is dropped on a node in this tree. The dropEvent
        * passed to handlers has the following properties:<br />
        * <ul style="padding:5px;padding-left:16px;">
        * <li>tree - The TreePanel</li>
        * <li>target - The node being targeted for the drop</li>
        * <li>data - The drag data from the drag source</li>
        * <li>point - The point of the drop - append, above or below</li>
        * <li>source - The drag source</li>
        * <li>rawEvent - Raw mouse event</li>
        * <li>dropNode - Dropped node(s).</li>
        * </ul>
        * @param {Object} dropEvent
        */
       "nodedrop" : true,
        /**
        * @event nodedragover
        * Fires when a tree node is being targeted for a drag drop, return false to signal drop not allowed. The dragOverEvent
        * passed to handlers has the following properties:<br />
        * <ul style="padding:5px;padding-left:16px;">
        * <li>tree - The TreePanel</li>
        * <li>target - The node being targeted for the drop</li>
        * <li>data - The drag data from the drag source</li>
        * <li>point - The point of the drop - append, above or below</li>
        * <li>source - The drag source</li>
        * <li>rawEvent - Raw mouse event</li>
        * <li>dropNode - Drop node(s) provided by the source.</li>
        * <li>cancel - Set this to true to signal drop not allowed.</li>
        * </ul>
        * @param {Object} dragOverEvent
        */
       "nodedragover" : true
        
    });
    if(this.singleExpand){
       this.on("beforeexpand", this.restrictExpand, this);
    }
    if (this.editor) {
        this.editor.tree = this;
        this.editor = Roo.factory(this.editor, Roo.tree);
    }
    
    if (this.selModel) {
        this.selModel = Roo.factory(this.selModel, Roo.tree);
        
        
    }
   
};
Roo.extend(Roo.tree.TreePanel, Roo.data.Tree, {
    rootVisible : true,
    animate: Roo.enableFx,
    lines : true,
    enableDD : false,
    hlDrop : Roo.enableFx,
  
    renderer: false,
    
    rendererTip: false,
    // private
    restrictExpand : function(node){
        var p = node.parentNode;
        if(p){
            if(p.expandedChild && p.expandedChild.parentNode == p){
                p.expandedChild.collapse();
            }
            p.expandedChild = node;
        }
    },

    // private override
    setRootNode : function(node){
        Roo.tree.TreePanel.superclass.setRootNode.call(this, node);
        if(!this.rootVisible){
            node.ui = new Roo.tree.RootTreeNodeUI(node);
        }
        return node;
    },

    /**
     * Returns the container element for this TreePanel
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the default TreeLoader for this TreePanel
     */
    getLoader : function(){
        return this.loader;
    },

    /**
     * Expand all nodes
     */
    expandAll : function(){
        this.root.expand(true);
    },

    /**
     * Collapse all nodes
     */
    collapseAll : function(){
        this.root.collapse(true);
    },

    /**
     * Returns the selection model used by this TreePanel
     */
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.tree.DefaultSelectionModel();
        }
        return this.selModel;
    },

    /**
     * Retrieve an array of checked nodes, or an array of a specific attribute of checked nodes (e.g. "id")
     * @param {String} attribute (optional) Defaults to null (return the actual nodes)
     * @param {TreeNode} startNode (optional) The node to start from, defaults to the root
     * @return {Array}
     */
    getChecked : function(a, startNode){
        startNode = startNode || this.root;
        var r = [];
        var f = function(){
            if(this.attributes.checked){
                r.push(!a ? this : (a == 'id' ? this.id : this.attributes[a]));
            }
        }
        startNode.cascade(f);
        return r;
    },

    /**
     * Expands a specified path in this TreePanel. A path can be retrieved from a node with {@link Roo.data.Node#getPath}
     * @param {String} path
     * @param {String} attr (optional) The attribute used in the path (see {@link Roo.data.Node#getPath} for more info)
     * @param {Function} callback (optional) The callback to call when the expand is complete. The callback will be called with
     * (bSuccess, oLastNode) where bSuccess is if the expand was successful and oLastNode is the last node that was expanded.
     */
    expandPath : function(path, attr, callback){
        attr = attr || "id";
        var keys = path.split(this.pathSeparator);
        var curNode = this.root;
        if(curNode.attributes[attr] != keys[1]){ // invalid root
            if(callback){
                callback(false, null);
            }
            return;
        }
        var index = 1;
        var f = function(){
            if(++index == keys.length){
                if(callback){
                    callback(true, curNode);
                }
                return;
            }
            var c = curNode.findChild(attr, keys[index]);
            if(!c){
                if(callback){
                    callback(false, curNode);
                }
                return;
            }
            curNode = c;
            c.expand(false, false, f);
        };
        curNode.expand(false, false, f);
    },

    /**
     * Selects the node in this tree at the specified path. A path can be retrieved from a node with {@link Roo.data.Node#getPath}
     * @param {String} path
     * @param {String} attr (optional) The attribute used in the path (see {@link Roo.data.Node#getPath} for more info)
     * @param {Function} callback (optional) The callback to call when the selection is complete. The callback will be called with
     * (bSuccess, oSelNode) where bSuccess is if the selection was successful and oSelNode is the selected node.
     */
    selectPath : function(path, attr, callback){
        attr = attr || "id";
        var keys = path.split(this.pathSeparator);
        var v = keys.pop();
        if(keys.length > 0){
            var f = function(success, node){
                if(success && node){
                    var n = node.findChild(attr, v);
                    if(n){
                        n.select();
                        if(callback){
                            callback(true, n);
                        }
                    }else if(callback){
                        callback(false, n);
                    }
                }else{
                    if(callback){
                        callback(false, n);
                    }
                }
            };
            this.expandPath(keys.join(this.pathSeparator), attr, f);
        }else{
            this.root.select();
            if(callback){
                callback(true, this.root);
            }
        }
    },

    getTreeEl : function(){
        return this.el;
    },

    /**
     * Trigger rendering of this TreePanel
     */
    render : function(){
        if (this.innerCt) {
            return this; // stop it rendering more than once!!
        }
        
        this.innerCt = this.el.createChild({tag:"ul",
               cls:"x-tree-root-ct " +
               (this.lines ? "x-tree-lines" : "x-tree-no-lines")});

        if(this.containerScroll){
            Roo.dd.ScrollManager.register(this.el);
        }
        if((this.enableDD || this.enableDrop) && !this.dropZone){
           /**
            * The dropZone used by this tree if drop is enabled
            * @type Roo.tree.TreeDropZone
            */
             this.dropZone = new Roo.tree.TreeDropZone(this, this.dropConfig || {
               ddGroup: this.ddGroup || "TreeDD", appendOnly: this.ddAppendOnly === true
           });
        }
        if((this.enableDD || this.enableDrag) && !this.dragZone){
           /**
            * The dragZone used by this tree if drag is enabled
            * @type Roo.tree.TreeDragZone
            */
            this.dragZone = new Roo.tree.TreeDragZone(this, this.dragConfig || {
               ddGroup: this.ddGroup || "TreeDD",
               scroll: this.ddScroll
           });
        }
        this.getSelectionModel().init(this);
        if (!this.root) {
            console.log("ROOT not set in tree");
            return;
        }
        this.root.render();
        if(!this.rootVisible){
            this.root.renderChildren();
        }
        return this;
    }
});