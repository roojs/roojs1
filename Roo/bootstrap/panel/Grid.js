
/**
 * @class Roo.bootstrap.panel.Grid
 * @extends Roo.bootstrap.panel.Content
 * @constructor
 * Create a new GridPanel.
 * @cfg {Roo.bootstrap.Table} grid The grid for this panel
 * @param {Object} config A the config object
  
 */



Roo.bootstrap.panel.Grid = function(config)
{
    
      
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "roo-layout-grid-wrapper roo-layout-inactive-content"}, true);

    config.el = this.wrapper;
    //this.el = this.wrapper;
    
      if (config.container) {
        // ctor'ed from a Border/panel.grid
        
        
        this.wrapper.setStyle("overflow", "hidden");
        this.wrapper.addClass('roo-grid-container');

    }
    
    
    if(config.toolbar){
        var tool_el = this.wrapper.createChild();    
        this.toolbar = Roo.factory(config.toolbar);
        var ti = [];
        if (config.toolbar.items) {
            ti = config.toolbar.items ;
            delete config.toolbar.items ;
        }
        
        var nitems = [];
        this.toolbar.render(tool_el);
        for(var i =0;i < ti.length;i++) {
          //  Roo.log(['add child', items[i]]);
            nitems.push(this.toolbar.addxtype(Roo.apply({}, ti[i])));
        }
        this.toolbar.items = nitems;
        
        delete config.toolbar;
    }
    
    Roo.bootstrap.panel.Grid.superclass.constructor.call(this, config);
    config.grid.scrollBody = true;;
    config.grid.monitorWindowResize = false; // turn off autosizing
    config.grid.autoHeight = false;
    config.grid.autoWidth = false;
    
    this.grid = new config.grid.xns[config.grid.xtype](config.grid);
    
    if (config.background) {
        // render grid on panel activation (if panel background)
        this.on('activate', function(gp) {
            if (!gp.grid.rendered) {
                gp.grid.render(this.wrapper);
                gp.grid.getGridEl().replaceClass("roo-layout-inactive-content", "roo-layout-component-panel");   
            }
        });
            
    } else {
        this.grid.render(this.wrapper);
        this.grid.getGridEl().replaceClass("roo-layout-inactive-content", "roo-layout-component-panel");               

    }
    //this.wrapper.dom.appendChild(config.grid.getGridEl().dom);
    // ??? needed ??? config.el = this.wrapper;
    
    
    
  
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        var ctr = this.grid.getView().getFooterPanel(true);
        this.footer.dataSource = this.grid.dataSource;
        this.footer = Roo.factory(this.footer, Roo);
        this.footer.render(ctr);
        
    }
    
    
    
    
     
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
        if(this.title == 'Log Grid'){
            Roo.log(this);
            Roo.log(this.lastSize);
            Roo.log([width, height]);
        }
        
        if(!this.ignoreResize(width, height)){
            var grid = this.grid;
            var size = this.adjustForComponents(width, height);
            var gridel = grid.getGridEl();
            gridel.setSize(size.width, size.height);
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
