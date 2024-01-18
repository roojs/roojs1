
/**
 * @class Roo.panel.Grid
 * @extends Roo.panel.Content
 * @parent Roo.BorderLayout Roo.LayoutDialog builder
 * @constructor
 * Create a new GridPanel.
 * @cfg {Roo.grid.Grid} grid The grid for this panel
 */
Roo.panel.Grid = function(grid, config){
    
    // universal ctor...
    if (typeof(grid.grid) != 'undefined') {
        config = grid;
        grid = config.grid;
    }
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);
        
    this.wrapper.dom.appendChild(grid.getGridEl().dom);
    
    Roo.panel.Grid.superclass.constructor.call(this, this.wrapper, config);
    
    if(this.toolbar){
        this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);
    }
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        this.footer.container = this.grid.getView().getFooterPanel(true);
        this.footer.dataSource = this.grid.dataSource;
        this.footer = Roo.factory(this.footer, Roo);
        
    }
    
    grid.monitorWindowResize = false; // turn off autosizing
    grid.autoHeight = false;
    grid.autoWidth = false;
    this.grid = grid;
    this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
};

Roo.extend(Roo.panel.Grid, Roo.panel.Content, {
    getId : function(){
        return this.grid.id;
    },
    
    /**
     * Returns the grid for this panel
     * @return {Roo.grid.Grid} 
     */
    getGrid : function(){
        return this.grid;    
    },
    
    setSize : function(width, height){
        if(!this.ignoreResize(width, height)){
            var grid = this.grid;
            var size = this.adjustForComponents(width, height);
            grid.getGridEl().setSize(size.width, size.height);
            grid.autoSize();
        }
    },
    
    beforeSlide : function(){
        this.grid.getView().scroller.clip();
    },
    
    afterSlide : function(){
        this.grid.getView().scroller.unclip();
    },
    
    destroy : function(){
        this.grid.destroy();
        delete this.grid;
        Roo.panel.Grid.superclass.destroy.call(this); 
    }
});
