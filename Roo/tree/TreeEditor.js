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
 * @class Roo.tree.TreeEditor
 * @extends Roo.Editor
 * Provides editor functionality for inline tree node editing.  Any valid {@link Roo.form.Field} can be used
 * as the editor field.
 * @constructor
 * @param {Object} config (used to be the tree panel.)
 * @param {Object} oldconfig DEPRECIATED Either a prebuilt {@link Roo.form.Field} instance or a Field config object
 * 
 * @cfg {Roo.tree.TreePanel} tree The tree to bind to.
 * @cfg {Roo.form.TextField|Object} field The field configuration
 *
 * 
 */
Roo.tree.TreeEditor = function(config, oldconfig) { // was -- (tree, config){
    var tree = config;
    var field;
    if (oldconfig) { // old style..
        field = oldconfig.events ? oldconfig : new Roo.form.TextField(oldconfig);
    } else {
        // new style..
        tree = config.tree;
        config.field = config.field  || {};
        config.field.xtype = 'TextField';
        field = Roo.factory(config.field, Roo.form);
    }
    config = config || {};
    
    
    this.addEvents({
        /**
         * @event beforenodeedit
         * Fires when editing is initiated, but before the value changes.  Editing can be canceled by returning
         * false from the handler of this event.
         * @param {Editor} this
         * @param {Roo.tree.Node} node 
         */
        "beforenodeedit" : true
    });
    
    //Roo.log(config);
    Roo.tree.TreeEditor.superclass.constructor.call(this, field, config);

    this.tree = tree;

    tree.on('beforeclick', this.beforeNodeClick, this);
    tree.getTreeEl().on('mousedown', this.hide, this);
    this.on('complete', this.updateNode, this);
    this.on('beforestartedit', this.fitToTree, this);
    this.on('startedit', this.bindScroll, this, {delay:10});
    this.on('specialkey', this.onSpecialKey, this);
};

Roo.extend(Roo.tree.TreeEditor, Roo.Editor, {
    /**
     * @cfg {String} alignment
     * The position to align to (see {@link Roo.Element#alignTo} for more details, defaults to "l-l").
     */
    alignment: "l-l",
    // inherit
    autoSize: false,
    /**
     * @cfg {Boolean} hideEl
     * True to hide the bound element while the editor is displayed (defaults to false)
     */
    hideEl : false,
    /**
     * @cfg {String} cls
     * CSS class to apply to the editor (defaults to "x-small-editor x-tree-editor")
     */
    cls: "x-small-editor x-tree-editor",
    /**
     * @cfg {Boolean} shim
     * True to shim the editor if selects/iframes could be displayed beneath it (defaults to false)
     */
    shim:false,
    // inherit
    shadow:"frame",
    /**
     * @cfg {Number} maxWidth
     * The maximum width in pixels of the editor field (defaults to 250).  Note that if the maxWidth would exceed
     * the containing tree element's size, it will be automatically limited for you to the container width, taking
     * scroll and client offsets into account prior to each edit.
     */
    maxWidth: 250,

    editDelay : 350,

    // private
    fitToTree : function(ed, el){
        var td = this.tree.getTreeEl().dom, nd = el.dom;
        if(td.scrollLeft >  nd.offsetLeft){ // ensure the node left point is visible
            td.scrollLeft = nd.offsetLeft;
        }
        var w = Math.min(
                this.maxWidth,
                (td.clientWidth > 20 ? td.clientWidth : td.offsetWidth) - Math.max(0, nd.offsetLeft-td.scrollLeft) - /*cushion*/5);
        this.setSize(w, '');
        
        return this.fireEvent('beforenodeedit', this, this.editNode);
        
    },

    // private
    triggerEdit : function(node){
        this.completeEdit();
        this.editNode = node;
        this.startEdit(node.ui.textNode, node.text);
    },

    // private
    bindScroll : function(){
        this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
    },

    // private
    beforeNodeClick : function(node, e){
        var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
        this.lastClick = new Date();
        if(sinceLast > this.editDelay && this.tree.getSelectionModel().isSelected(node)){
            e.stopEvent();
            this.triggerEdit(node);
            return false;
        }
        return true;
    },

    // private
    updateNode : function(ed, value){
        this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
        this.editNode.setText(value);
    },

    // private
    onHide : function(){
        Roo.tree.TreeEditor.superclass.onHide.call(this);
        if(this.editNode){
            this.editNode.ui.focus();
        }
    },

    // private
    onSpecialKey : function(field, e){
        var k = e.getKey();
        if(k == e.ESC){
            e.stopEvent();
            this.cancelEdit();
        }else if(k == e.ENTER && !e.hasModifier()){
            e.stopEvent();
            this.completeEdit();
        }
    }
});