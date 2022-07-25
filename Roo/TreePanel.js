


/**
 * @class Roo.TreePanel
 * @extends Roo.panel.Content
 * @parent Roo.BorderLayout Roo.LayoutDialog builder
 * Treepanel component
 * 
 * @constructor
 * Create a new TreePanel. - defaults to fit/scoll contents.
 * @param {String/Object} config A string to set only the panel's title, or a config object
 */
Roo.TreePanel = function(config){
    var el = config.el;
    var tree = config.tree;
    delete config.tree; 
    delete config.el; // hopefull!
    
    // wrapper for IE7 strict & safari scroll issue
    
    var treeEl = el.createChild();
    config.resizeEl = treeEl;
    
    
    
    Roo.TreePanel.superclass.constructor.call(this, el, config);
 
 
    this.tree = new Roo.tree.TreePanel(treeEl , tree);
    //console.log(tree);
    this.on('activate', function()
    {
        if (this.tree.rendered) {
            return;
        }
        //console.log('render tree');
        this.tree.render();
    });
    // this should not be needed.. - it's actually the 'el' that resizes?
    // actuall it breaks the containerScroll - dragging nodes auto scroll at top
    
    //this.on('resize',  function (cp, w, h) {
    //        this.tree.innerCt.setWidth(w);
    //        this.tree.innerCt.setHeight(h);
    //        //this.tree.innerCt.setStyle('overflow-y', 'auto');
    //});

        
    
};

Roo.extend(Roo.TreePanel, Roo.ContentPanel, {   
    fitToFrame : true,
    autoScroll : true,
    /*
     * @cfg {Roo.tree.TreePanel} tree [required] The tree TreePanel, with config etc.
     */
    tree : false

});
