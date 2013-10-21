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
 * @class Roo.grid.EditorGrid
 * @extends Roo.grid.Grid
 * Class for creating and editable grid.
 * @param {String/HTMLElement/Roo.Element} container The element into which this grid will be rendered - 
 * The container MUST have some type of size defined for the grid to fill. The container will be 
 * automatically set to position relative if it isn't already.
 * @param {Object} dataSource The data model to bind to
 * @param {Object} colModel The column model with info about this grid's columns
 */
Roo.grid.ViewPanel = function(container, config){
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

    Roo.grid.ViewPanel.superclass.constructor.call(this);
};


Roo.extend(Roo.grid.ViewPanel, Roo.grid.Grid, {
    
});