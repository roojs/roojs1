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
 * @class Roo.ViewPanel
 * @extends Roo.panel.Content
 * @constructor
 * Create a new ViewPanel.
 * @param {Roo.grid.Grid} grid The grid for this panel
 * @param {String/Object} config A string to set only the panel's title, or a config object
 */
Roo.ViewPanel = function(el, config){
     
    this.wrapper = Roo.DomHelper.append(document.body, // wrapper for IE7 strict & safari scroll issue
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);
        
    this.wrapper.dom.appendChild(el.dom);
    
    Roo.ViewPanel.superclass.constructor.call(this, this.wrapper, config);
    
    if(this.toolbar){
        this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);
    }
    // xtype created footer. - not sure if will work as we normally have to render first..
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        this.footer.container = this.wrapper.el; // this.getView().getFooterPanel(true);
        this.footer.dataSource = this.view.store;
        this.footer = Roo.factory(this.footer, Roo);
        
    }
    //??? create teh view???
    
    //grid.monitorWindowResize = false; // turn off autosizing
    //grid.autoHeight = false;
    //grid.autoWidth = false;
    //this.grid = grid;
    //this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
};

Roo.extend(Roo.ViewPanel, Roo.panel.Content, {
    
    autoCreate : true,
    getId : function(){
        return this.view.id;
    },
    
    /**
     * Returns the grid for this panel
     * @return {Roo.grid.Grid} 
     */
    getGrid : function(){
        return this.view;    
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