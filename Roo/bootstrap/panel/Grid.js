
/**
 * @class Roo.bootstrap.panel.Grid
 * @extends Roo.bootstrap.panel.Content
 * @constructor
 * Create a new GridPanel.
 * @cfg {Roo.bootstrap.Table} grid The grid for this panel
 * @param {String/Object} config A string to set only the panel's title, or a config object

  new Roo.bootstrap.panel.Grid({
		grid: .....
		....
  }

 */



Roo.bootstrap.panel.Grid = function(config){
    
  
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);

    
    if(config.toolbar){
        var tool_el = this.wrapper.createChild();    
        this.toolbar = Roo.factory(config.toolbar);
        var ti = [];
        if (config.toolbar.items) {
            ti = config.toolbar.items ;
            delete config.toolbar.items ;
        }
        
        
        this.toolbar.render(tool_el);
        for(var i =0;i < ti.length;i++) {
          //  Roo.log(['add child', items[i]]);
            nitems.push(this.toolbar.addxtype(Roo.apply({}, ti[i])));
        }
        this.toolbar.items = nitems;
        
        delete config.toolbar;
    }
    
    this.wrapper.dom.appendChild(config.grid.getGridEl().dom);
    config.el = this.wrapper;
    
    Roo.bootstrap.panel.Grid.superclass.constructor.call(this, config);
    
  
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        var ctr = this.grid.getView().getFooterPanel(true);
        this.footer.dataSource = this.grid.dataSource;
        this.footer = Roo.factory(this.footer, Roo);
        this.footer.render(ctr);
        
    }
    
    
    config.grid.monitorWindowResize = false; // turn off autosizing
    config.grid.autoHeight = false;
    config.grid.autoWidth = false;
    this.grid = config.grid;
    this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
    
     
};

Roo.extend(Roo.bootstrap.panel.Grid, Roo.bootstrap.panel.Content, {
    getId : function(){
        return this.grid.id;
    },
    
    /**
     * Returns the grid for this panel
     * @return {Roo.bootstrap.Table} 
     */
    getGrid : function(){
        return this.grid;    
    },
    
    setSize : function(width, height){
        if(!this.ignoreResize(width, height)){
            var grid = this.grid;
            var size = this.adjustForComponents(width, height);
            grid.getGridEl().setSize(size.width, size.height);
            /*
            var thd = grid.getGridEl().select('thead',true).first();
            var tbd = grid.getGridEl().select('tbody', true).first();
            if (tbd) {
                tbd.setSize(width, height - thd.getHeight());
            }
            */
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
        Roo.bootstrap.panel.Grid.superclass.destroy.call(this); 
    }
});
