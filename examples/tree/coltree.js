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

 var tree = false; 
 
Roo.onReady(function(){
    // shorthand
    var Tree = Roo.tree;
    
    tree = new Tree.ColumnTree('tree-div', {
   // tree = new Tree.TreePanel('tree-div', {
        animate:true, 
        loader: new Tree.TreeLoader({
           dataUrl:'get-nodes.php?uiProvider=col',
           //dataUrl:'get-nodes.php',
            uiProviders: {
                col: Roo.tree.ColumnNodeUI
            }
        }),
        enableDD:true,
        containerScroll: true,
        
       width: 550,
      height: 300,
      rootVisible:false,
      autoScroll:true,
      title: 'Example ',
        
        columns:[{
            header:'Task',
            width:330,
            dataIndex:'task'
        },{
            header:'Type',
            width:100,
            dataIndex:'cls'
        },{
            header:'Size',
            width:100,
            dataIndex:'size'
        }],
  
        
        
        
    });

    // set the root node
    var root = new Tree.AsyncTreeNode({
        text: 'Ext JS',
        draggable:true,
        id:'source'
    });
    tree.setRootNode(root);

    // render the tree
    tree.render();
    root.expand();
});
