
/**
 * @class Roo.LayoutDialog
 * @extends Roo.BasicDialog
 * @children Roo.panel.Content
 * @parent builder none
 * Dialog which provides adjustments for working with a layout in a Dialog.
 * Add your necessary layout config options to the dialog's config.<br>
 * Example usage (including a nested layout):
 * <pre><code>
if(!dialog){
    dialog = new Roo.LayoutDialog("download-dlg", {
        modal: true,
        width:600,
        height:450,
        shadow:true,
        minWidth:500,
        minHeight:350,
        autoTabs:true,
        proxyDrag:true,
        // layout config merges with the dialog config
        center:{
            tabPosition: "top",
            alwaysShowTabs: true
        }
    });
    dialog.addKeyListener(27, dialog.hide, dialog);
    dialog.setDefaultButton(dialog.addButton("Close", dialog.hide, dialog));
    dialog.addButton("Build It!", this.getDownload, this);

    // we can even add nested layouts
    var innerLayout = new Roo.layout.Border("dl-inner", {
        east: {
            initialSize: 200,
            autoScroll:true,
            split:true
        },
        center: {
            autoScroll:true
        }
    });
    innerLayout.beginUpdate();
    innerLayout.add("east", new Roo.panel.Content("dl-details"));
    innerLayout.add("center", new Roo.panel.Content("selection-panel"));
    innerLayout.endUpdate(true);

    var layout = dialog.getLayout();
    layout.beginUpdate();
    layout.add("center", new Roo.panel.Content("standard-panel",
                        {title: "Download the Source", fitToFrame:true}));
    layout.add("center", new Roo.panel.NestedLayout(innerLayout,
               {title: "Build your own roo.js"}));
    layout.getRegion("center").showPanel(sp);
    layout.endUpdate();
}
</code></pre>
    * @constructor
    * @param {String/HTMLElement/Roo.Element} el The id of or container element, or config
    * @param {Object} config configuration options
  */
Roo.LayoutDialog = function(el, cfg){
    
    var config=  cfg;
    if (typeof(cfg) == 'undefined') {
        config = Roo.apply({}, el);
        // not sure why we use documentElement here.. - it should always be body.
        // IE7 borks horribly if we use documentElement.
        // webkit also does not like documentElement - it creates a body element...
        el = Roo.get( document.body || document.documentElement ).createChild();
        //config.autoCreate = true;
    }
    
    
    config.autoTabs = false;
    Roo.LayoutDialog.superclass.constructor.call(this, el, config);
    this.body.setStyle({overflow:"hidden", position:"relative"});
    this.layout = new Roo.layout.Border(this.body.dom, config);
    this.layout.monitorWindowResize = false;
    this.el.addClass("x-dlg-auto-layout");
    // fix case when center region overwrites center function
    this.center = Roo.BasicDialog.prototype.center;
    this.on("show", this.layout.layout, this.layout, true);
    if (config.items) {
        var xitems = config.items;
        delete config.items;
        Roo.each(xitems, this.addxtype, this);
    }
    
    
};
Roo.extend(Roo.LayoutDialog, Roo.BasicDialog, {
    
    
    /**
     * @cfg {Roo.layout.Region} east  
     */
    /**
     * @cfg {Roo.layout.Region} west
     */
    /**
     * @cfg {Roo.layout.Region} south
     */
    /**
     * @cfg {Roo.layout.Region} north
     */
    /**
     * @cfg {Roo.layout.Region} center
     */
    /**
     * @cfg {Roo.Button} buttons[]  Bottom buttons..
     */
    
    
    /**
     * Ends update of the layout <strike>and resets display to none</strike>. Use standard beginUpdate/endUpdate on the layout.
     * @deprecated
     */
    endUpdate : function(){
        this.layout.endUpdate();
    },

    /**
     * Begins an update of the layout <strike>and sets display to block and visibility to hidden</strike>. Use standard beginUpdate/endUpdate on the layout.
     *  @deprecated
     */
    beginUpdate : function(){
        this.layout.beginUpdate();
    },

    /**
     * Get the BorderLayout for this dialog
     * @return {Roo.layout.Border}
     */
    getLayout : function(){
        return this.layout;
    },

    showEl : function(){
        Roo.LayoutDialog.superclass.showEl.apply(this, arguments);
        if(Roo.isIE7){
            this.layout.layout();
        }
    },

    // private
    // Use the syncHeightBeforeShow config option to control this automatically
    syncBodyHeight : function(){
        Roo.LayoutDialog.superclass.syncBodyHeight.call(this);
        if(this.layout){this.layout.layout();}
    },
    
      /**
     * Add an xtype element (actually adds to the layout.)
     * @return {Object} xdata xtype object data.
     */
    
    addxtype : function(c) {
        return this.layout.addxtype(c);
    }
});