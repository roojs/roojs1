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
 * @class Roo.grid.Grid
 * @extends Roo.util.Observable
 * This class represents the primary interface of a component based grid control.
 * <br><br>Usage:<pre><code>
 var grid = new Roo.grid.Grid("my-container-id", {
     ds: myDataStore,
     cm: myColModel,
     selModel: mySelectionModel,
     autoSizeColumns: true,
     monitorWindowResize: false,
     trackMouseOver: true
 });
 // set any options
 grid.render();
 * </code></pre>
 * <b>Common Problems:</b><br/>
 * - Grid does not resize properly when going smaller: Setting overflow hidden on the container
 * element will correct this<br/>
 * - If you get el.style[camel]= NaNpx or -2px or something related, be certain you have given your container element
 * dimensions. The grid adapts to your container's size, if your container has no size defined then the results
 * are unpredictable.<br/>
 * - Do not render the grid into an element with display:none. Try using visibility:hidden. Otherwise there is no way for the
 * grid to calculate dimensions/offsets.<br/>
  * @constructor
 * @param {String/HTMLElement/Roo.Element} container The element into which this grid will be rendered -
 * The container MUST have some type of size defined for the grid to fill. The container will be
 * automatically set to position relative if it isn't already.
 * @param {Object} config A config object that sets properties on this grid.
 */
Roo.grid.Grid = function(container, config){
	// initialize the container
	this.container = Roo.get(container);
	this.container.update("");
	this.container.setStyle("overflow", "hidden");
    this.container.addClass('x-grid-container');

    this.id = this.container.id;

    Roo.apply(this, config);
    // check and correct shorthanded configs
    if(this.ds){
        this.dataSource = this.ds;
        delete this.ds;
    }
    if(this.cm){
        this.colModel = this.cm;
        delete this.cm;
    }
    if(this.sm){
        this.selModel = this.sm;
        delete this.sm;
    }

    if (this.selModel) {
        this.selModel = Roo.factory(this.selModel, Roo.grid);
        this.sm = this.selModel;
        this.sm.xmodule = this.xmodule || false;
    }
    if (typeof(this.colModel.config) == 'undefined') {
        this.colModel = new Roo.grid.ColumnModel(this.colModel);
        this.cm = this.colModel;
        this.cm.xmodule = this.xmodule || false;
    }
    if (this.dataSource) {
        this.dataSource= Roo.factory(this.dataSource, Roo.data);
        this.ds = this.dataSource;
        this.ds.xmodule = this.xmodule || false;
         
    }
    
    
    
    if(this.width){
        this.container.setWidth(this.width);
    }

    if(this.height){
        this.container.setHeight(this.height);
    }
    /** @private */
	this.addEvents({
        // raw events
        /**
         * @event click
         * The raw click event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "click" : true,
        /**
         * @event dblclick
         * The raw dblclick event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "dblclick" : true,
        /**
         * @event contextmenu
         * The raw contextmenu event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "contextmenu" : true,
        /**
         * @event mousedown
         * The raw mousedown event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mousedown" : true,
        /**
         * @event mouseup
         * The raw mouseup event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseup" : true,
        /**
         * @event mouseover
         * The raw mouseover event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseover" : true,
        /**
         * @event mouseout
         * The raw mouseout event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mouseout" : true,
        /**
         * @event keypress
         * The raw keypress event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "keypress" : true,
        /**
         * @event keydown
         * The raw keydown event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "keydown" : true,

        // custom events

        /**
         * @event cellclick
         * Fires when a cell is clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "cellclick" : true,
        /**
         * @event celldblclick
         * Fires when a cell is double clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "celldblclick" : true,
        /**
         * @event rowclick
         * Fires when a row is clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowclick" : true,
        /**
         * @event rowdblclick
         * Fires when a row is double clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowdblclick" : true,
        /**
         * @event headerclick
         * Fires when a header is clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headerclick" : true,
        /**
         * @event headerdblclick
         * Fires when a header cell is double clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headerdblclick" : true,
        /**
         * @event rowcontextmenu
         * Fires when a row is right clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowcontextmenu" : true,
        /**
         * @event cellcontextmenu
         * Fires when a cell is right clicked
         * @param {Grid} this
         * @param {Number} rowIndex
         * @param {Number} cellIndex
         * @param {Roo.EventObject} e
         */
         "cellcontextmenu" : true,
        /**
         * @event headercontextmenu
         * Fires when a header is right clicked
         * @param {Grid} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headercontextmenu" : true,
        /**
         * @event bodyscroll
         * Fires when the body element is scrolled
         * @param {Number} scrollLeft
         * @param {Number} scrollTop
         */
        "bodyscroll" : true,
        /**
         * @event columnresize
         * Fires when the user resizes a column
         * @param {Number} columnIndex
         * @param {Number} newSize
         */
        "columnresize" : true,
        /**
         * @event columnmove
         * Fires when the user moves a column
         * @param {Number} oldIndex
         * @param {Number} newIndex
         */
        "columnmove" : true,
        /**
         * @event startdrag
         * Fires when row(s) start being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {event} e The raw browser event
         */
        "startdrag" : true,
        /**
         * @event enddrag
         * Fires when a drag operation is complete
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {event} e The raw browser event
         */
        "enddrag" : true,
        /**
         * @event dragdrop
         * Fires when dragged row(s) are dropped on a valid DD target
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragdrop" : true,
        /**
         * @event dragover
         * Fires while row(s) are being dragged. "targetId" is the id of the Yahoo.util.DD object the selected rows are being dragged over.
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragover" : true,
        /**
         * @event dragenter
         *  Fires when the dragged row(s) first cross another DD target while being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragenter" : true,
        /**
         * @event dragout
         * Fires when the dragged row(s) leave another DD target while being dragged
         * @param {Grid} this
         * @param {Roo.GridDD} dd The drag drop object
         * @param {String} targetId The target drag drop object
         * @param {event} e The raw browser event
         */
        "dragout" : true,
        /**
         * @event rowclass
         * Fires when a row is rendered, so you can change add a style to it.
         * @param {GridView} gridview   The grid view
         * @param {Object} rowcfg   contains record  rowIndex and rowClass - set rowClass to add a style.
         */
        'rowclass' : true,

        /**
         * @event render
         * Fires when the grid is rendered
         * @param {Grid} grid
         */
        'render' : true
    });

    Roo.grid.Grid.superclass.constructor.call(this);
};
Roo.extend(Roo.grid.Grid, Roo.util.Observable, {
    
    /**
     * @cfg {String} ddGroup - drag drop group.
     */

    /**
     * @cfg {Number} minColumnWidth The minimum width a column can be resized to. Default is 25.
     */
    minColumnWidth : 25,

    /**
     * @cfg {Boolean} autoSizeColumns True to automatically resize the columns to fit their content
     * <b>on initial render.</b> It is more efficient to explicitly size the columns
     * through the ColumnModel's {@link Roo.grid.ColumnModel#width} config option.  Default is false.
     */
    autoSizeColumns : false,

    /**
     * @cfg {Boolean} autoSizeHeaders True to measure headers with column data when auto sizing columns. Default is true.
     */
    autoSizeHeaders : true,

    /**
     * @cfg {Boolean} monitorWindowResize True to autoSize the grid when the window resizes. Default is true.
     */
    monitorWindowResize : true,

    /**
     * @cfg {Boolean} maxRowsToMeasure If autoSizeColumns is on, maxRowsToMeasure can be used to limit the number of
     * rows measured to get a columns size. Default is 0 (all rows).
     */
    maxRowsToMeasure : 0,

    /**
     * @cfg {Boolean} trackMouseOver True to highlight rows when the mouse is over. Default is true.
     */
    trackMouseOver : true,

    /**
    * @cfg {Boolean} enableDrag  True to enable drag of rows. Default is false. (double check if this is needed?)
    */
    
    /**
    * @cfg {Boolean} enableDragDrop True to enable drag and drop of rows. Default is false.
    */
    enableDragDrop : false,
    
    /**
    * @cfg {Boolean} enableColumnMove True to enable drag and drop reorder of columns. Default is true.
    */
    enableColumnMove : true,
    
    /**
    * @cfg {Boolean} enableColumnHide True to enable hiding of columns with the header context menu. Default is true.
    */
    enableColumnHide : true,
    
    /**
    * @cfg {Boolean} enableRowHeightSync True to manually sync row heights across locked and not locked rows. Default is false.
    */
    enableRowHeightSync : false,
    
    /**
    * @cfg {Boolean} stripeRows True to stripe the rows.  Default is true.
    */
    stripeRows : true,
    
    /**
    * @cfg {Boolean} autoHeight True to fit the height of the grid container to the height of the data. Default is false.
    */
    autoHeight : false,

    /**
     * @cfg {String} autoExpandColumn The id (or dataIndex) of a column in this grid that should expand to fill unused space. This id can not be 0. Default is false.
     */
    autoExpandColumn : false,

    /**
    * @cfg {Number} autoExpandMin The minimum width the autoExpandColumn can have (if enabled).
    * Default is 50.
    */
    autoExpandMin : 50,

    /**
    * @cfg {Number} autoExpandMax The maximum width the autoExpandColumn can have (if enabled). Default is 1000.
    */
    autoExpandMax : 1000,

    /**
    * @cfg {Object} view The {@link Roo.grid.GridView} used by the grid. This can be set before a call to render().
    */
    view : null,

    /**
    * @cfg {Object} loadMask An {@link Roo.LoadMask} config or true to mask the grid while loading. Default is false.
    */
    loadMask : false,
    /**
    * @cfg {Roo.dd.DropTarget} dropTarget An {@link Roo.dd.DropTarget} config
    */
    dropTarget: false,
    
   
    
    // private
    rendered : false,

    /**
    * @cfg {Boolean} autoWidth True to set the grid's width to the default total width of the grid's columns instead
    * of a fixed width. Default is false.
    */
    /**
    * @cfg {Number} maxHeight Sets the maximum height of the grid - ignored if autoHeight is not on.
    */
    /**
     * Called once after all setup has been completed and the grid is ready to be rendered.
     * @return {Roo.grid.Grid} this
     */
    render : function()
    {
        var c = this.container;
        // try to detect autoHeight/width mode
        if((!c.dom.offsetHeight || c.dom.offsetHeight < 20) || c.getStyle("height") == "auto"){
    	    this.autoHeight = true;
    	}
    	var view = this.getView();
        view.init(this);

        c.on("click", this.onClick, this);
        c.on("dblclick", this.onDblClick, this);
        c.on("contextmenu", this.onContextMenu, this);
        c.on("keydown", this.onKeyDown, this);
        if (Roo.isTouch) {
            c.on("touchstart", this.onTouchStart, this);
        }

        this.relayEvents(c, ["mousedown","mouseup","mouseover","mouseout","keypress"]);

        this.getSelectionModel().init(this);

        view.render();

        if(this.loadMask){
            this.loadMask = new Roo.LoadMask(this.container,
                    Roo.apply({store:this.dataSource}, this.loadMask));
        }
        
        
        if (this.toolbar && this.toolbar.xtype) {
            this.toolbar.container = this.getView().getHeaderPanel(true);
            this.toolbar = new Roo.Toolbar(this.toolbar);
        }
        if (this.footer && this.footer.xtype) {
            this.footer.dataSource = this.getDataSource();
            this.footer.container = this.getView().getFooterPanel(true);
            this.footer = Roo.factory(this.footer, Roo);
        }
        if (this.dropTarget && this.dropTarget.xtype) {
            delete this.dropTarget.xtype;
            this.dropTarget =  new Roo.dd.DropTarget(this.getView().mainBody, this.dropTarget);
        }
        
        
        this.rendered = true;
        this.fireEvent('render', this);
        return this;
    },

	/**
	 * Reconfigures the grid to use a different Store and Column Model.
	 * The View will be bound to the new objects and refreshed.
	 * @param {Roo.data.Store} dataSource The new {@link Roo.data.Store} object
	 * @param {Roo.grid.ColumnModel} The new {@link Roo.grid.ColumnModel} object
	 */
    reconfigure : function(dataSource, colModel){
        if(this.loadMask){
            this.loadMask.destroy();
            this.loadMask = new Roo.LoadMask(this.container,
                    Roo.apply({store:dataSource}, this.loadMask));
        }
        this.view.bind(dataSource, colModel);
        this.dataSource = dataSource;
        this.colModel = colModel;
        this.view.refresh(true);
    },

    // private
    onKeyDown : function(e){
        this.fireEvent("keydown", e);
    },

    /**
     * Destroy this grid.
     * @param {Boolean} removeEl True to remove the element
     */
    destroy : function(removeEl, keepListeners){
        if(this.loadMask){
            this.loadMask.destroy();
        }
        var c = this.container;
        c.removeAllListeners();
        this.view.destroy();
        this.colModel.purgeListeners();
        if(!keepListeners){
            this.purgeListeners();
        }
        c.update("");
        if(removeEl === true){
            c.remove();
        }
    },

    // private
    processEvent : function(name, e){
        // does this fire select???
        Roo.log('grid:processEvent '  + name);
        
        if (name != 'touchstart' ) {
            this.fireEvent(name, e);    
        }
        
        var t = e.getTarget();
        var v = this.view;
        var header = v.findHeaderIndex(t);
        if(header !== false){
            var ename = name == 'touchstart' ? 'click' : name;
             
            this.fireEvent("header" + ename, this, header, e);
        }else{
            var row = v.findRowIndex(t);
            var cell = v.findCellIndex(t);
            if (name == 'touchstart') {
                // first touch is always a click.
                // hopefull this happens after selection is updated.?
                name = false;
                
                if (typeof(this.selModel.getSelectedCell) != 'undefined') {
                    var cs = this.selModel.getSelectedCell();
                    if (row == cs[0] && cell == cs[1]){
                        name = 'dblclick';
                    }
                }
                if (typeof(this.selModel.getSelections) != 'undefined') {
                    var cs = this.selModel.getSelections();
                    var ds = this.dataSource;
                    if (cs.length == 1 && ds.getAt(row) == cs[0]){
                        name = 'dblclick';
                    }
                }
                if (!name) {
                    return;
                }
            }
            
            
            if(row !== false){
                this.fireEvent("row" + name, this, row, e);
                if(cell !== false){
                    this.fireEvent("cell" + name, this, row, cell, e);
                }
            }
        }
    },

    // private
    onClick : function(e){
        this.processEvent("click", e);
    },
   // private
    onTouchStart : function(e){
        this.processEvent("touchstart", e);
    },

    // private
    onContextMenu : function(e, t){
        this.processEvent("contextmenu", e);
    },

    // private
    onDblClick : function(e){
        this.processEvent("dblclick", e);
    },

    // private
    walkCells : function(row, col, step, fn, scope){
        var cm = this.colModel, clen = cm.getColumnCount();
        var ds = this.dataSource, rlen = ds.getCount(), first = true;
        if(step < 0){
            if(col < 0){
                row--;
                first = false;
            }
            while(row >= 0){
                if(!first){
                    col = clen-1;
                }
                first = false;
                while(col >= 0){
                    if(fn.call(scope || this, row, col, cm) === true){
                        return [row, col];
                    }
                    col--;
                }
                row--;
            }
        } else {
            if(col >= clen){
                row++;
                first = false;
            }
            while(row < rlen){
                if(!first){
                    col = 0;
                }
                first = false;
                while(col < clen){
                    if(fn.call(scope || this, row, col, cm) === true){
                        return [row, col];
                    }
                    col++;
                }
                row++;
            }
        }
        return null;
    },

    // private
    getSelections : function(){
        return this.selModel.getSelections();
    },

    /**
     * Causes the grid to manually recalculate its dimensions. Generally this is done automatically,
     * but if manual update is required this method will initiate it.
     */
    autoSize : function(){
        if(this.rendered){
            this.view.layout();
            if(this.view.adjustForScroll){
                this.view.adjustForScroll();
            }
        }
    },

    /**
     * Returns the grid's underlying element.
     * @return {Element} The element
     */
    getGridEl : function(){
        return this.container;
    },

    // private for compatibility, overridden by editor grid
    stopEditing : function(){},

    /**
     * Returns the grid's SelectionModel.
     * @return {SelectionModel}
     */
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.grid.RowSelectionModel();
        }
        return this.selModel;
    },

    /**
     * Returns the grid's DataSource.
     * @return {DataSource}
     */
    getDataSource : function(){
        return this.dataSource;
    },

    /**
     * Returns the grid's ColumnModel.
     * @return {ColumnModel}
     */
    getColumnModel : function(){
        return this.colModel;
    },

    /**
     * Returns the grid's GridView object.
     * @return {GridView}
     */
    getView : function(){
        if(!this.view){
            this.view = new Roo.grid.GridView(this.viewConfig);
        }
        return this.view;
    },
    /**
     * Called to get grid's drag proxy text, by default returns this.ddText.
     * @return {String}
     */
    getDragDropText : function(){
        var count = this.selModel.getCount();
        return String.format(this.ddText, count, count == 1 ? '' : 's');
    }
});
/**
 * Configures the text is the drag proxy (defaults to "%0 selected row(s)").
 * %0 is replaced with the number of selected rows.
 * @type String
 */
Roo.grid.Grid.prototype.ddText = "{0} selected row{1}";