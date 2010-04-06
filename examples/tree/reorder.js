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
    // shorthand
    var Tree = Roo.tree;
    
    var tree = new Tree.TreePanel('tree-div', {
        animate:true, 
        loader: new Tree.TreeLoader({
            dataUrl:'get-nodes.php'
        }),
        enableDD:true,
        containerScroll: true
    });

    // set the root node
    var root = new Tree.AsyncTreeNode({
        text: 'Ext JS',
        draggable:false,
        id:'source'
    });
    tree.setRootNode(root);

    // render the tree
    tree.render();
    root.expand();
});