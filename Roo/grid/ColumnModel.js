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
 * @class Roo.grid.ColumnModel
 * @extends Roo.util.Observable
 * This is the default implementation of a ColumnModel used by the Grid. It defines
 * the columns in the grid.
 * <br>Usage:<br>
 <pre><code>
 var colModel = new Roo.grid.ColumnModel([
	{header: "Ticker", width: 60, sortable: true, locked: true},
	{header: "Company Name", width: 150, sortable: true},
	{header: "Market Cap.", width: 100, sortable: true},
	{header: "$ Sales", width: 100, sortable: true, renderer: money},
	{header: "Employees", width: 100, sortable: true, resizable: false}
 ]);
 </code></pre>
 * <p>
 
 * The config options listed for this class are options which may appear in each
 * individual column definition.
 * <br/>RooJS Fix - column id's are not sequential but use Roo.id() - fixes bugs with layouts.
 * @constructor
 * @param {Object} config An Array of column config objects. See this class's
 * config objects for details.
*/
Roo.grid.ColumnModel = function(config){
	/**
     * The config passed into the constructor
     */
    this.config = []; //config;
    this.lookup = {};

    // if no id, create one
    // if the column does not have a dataIndex mapping,
    // map it to the order it is in the config
    for(var i = 0, len = config.length; i < len; i++){
	this.addColumn(config[i]);
	
    }

    /**
     * The width of columns which have no width specified (defaults to 100)
     * @type Number
     */
    this.defaultWidth = 100;

    /**
     * Default sortable of columns which have no sortable specified (defaults to false)
     * @type Boolean
     */
    this.defaultSortable = false;

    this.addEvents({
        /**
	     * @event widthchange
	     * Fires when the width of a column changes.
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Number} newWidth The new width
	     */
	    "widthchange": true,
        /**
	     * @event headerchange
	     * Fires when the text of a header changes.
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Number} newText The new header text
	     */
	    "headerchange": true,
        /**
	     * @event hiddenchange
	     * Fires when a column is hidden or "unhidden".
	     * @param {ColumnModel} this
	     * @param {Number} columnIndex The column index
	     * @param {Boolean} hidden true if hidden, false otherwise
	     */
	    "hiddenchange": true,
	    /**
         * @event columnmoved
         * Fires when a column is moved.
         * @param {ColumnModel} this
         * @param {Number} oldIndex
         * @param {Number} newIndex
         */
        "columnmoved" : true,
        /**
         * @event columlockchange
         * Fires when a column's locked state is changed
         * @param {ColumnModel} this
         * @param {Number} colIndex
         * @param {Boolean} locked true if locked
         */
        "columnlockchange" : true
    });
    Roo.grid.ColumnModel.superclass.constructor.call(this);
};
Roo.extend(Roo.grid.ColumnModel, Roo.util.Observable, {
    /**
     * @cfg {String} header [required] The header text to display in the Grid view.
     */
	/**
     * @cfg {String} xsHeader Header at Bootsrap Extra Small width (default for all)
     */
	/**
     * @cfg {String} smHeader Header at Bootsrap Small width
     */
	/**
     * @cfg {String} mdHeader Header at Bootsrap Medium width
     */
	/**
     * @cfg {String} lgHeader Header at Bootsrap Large width
     */
	/**
     * @cfg {String} xlHeader Header at Bootsrap extra Large width
     */
    /**
     * @cfg {String} dataIndex  The name of the field in the grid's {@link Roo.data.Store}'s
     * {@link Roo.data.Record} definition from which to draw the column's value. If not
     * specified, the column's index is used as an index into the Record's data Array.
     */
    /**
     * @cfg {Number} width  The initial width in pixels of the column. Using this
     * instead of {@link Roo.grid.Grid#autoSizeColumns} is more efficient.
     */
    /**
     * @cfg {Boolean} sortable True if sorting is to be allowed on this column.
     * Defaults to the value of the {@link #defaultSortable} property.
     * Whether local/remote sorting is used is specified in {@link Roo.data.Store#remoteSort}.
     */
    /**
     * @cfg {Boolean} locked  True to lock the column in place while scrolling the Grid.  Defaults to false.
     */
    /**
     * @cfg {Boolean} fixed  True if the column width cannot be changed.  Defaults to false.
     */
    /**
     * @cfg {Boolean} resizable  False to disable column resizing. Defaults to true.
     */
    /**
     * @cfg {Boolean} hidden  True to hide the column. Defaults to false.
     */
    /**
     * @cfg {Function} renderer A function used to generate HTML markup for a cell
     * given the cell's data value. See {@link #setRenderer}. If not specified, the
     * default renderer returns the escaped data value. If an object is returned (bootstrap only)
     * then it is treated as a Roo Component object instance, and it is rendered after the initial row is rendered
     */
       /**
     * @cfg {Roo.grid.GridEditor} editor  For grid editors - returns the grid editor 
     */
    /**
     * @cfg {String} align (left|right) Set the CSS text-align property of the column.  Defaults to undefined (left).
     */
    /**
     * @cfg {String} valign (top|bottom|middle) Set the CSS vertical-align property of the column (eg. middle, top, bottom etc).  Defaults to undefined (middle)
     */
    /**
     * @cfg {String} cursor ( auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing)
     */
    /**
     * @cfg {String} tooltip mouse over tooltip text
     */
    /**
     * @cfg {Number} xs  can be '0' for hidden at this size (number less than 12)
     */
    /**
     * @cfg {Number} sm can be '0' for hidden at this size (number less than 12)
     */
    /**
     * @cfg {Number} md can be '0' for hidden at this size (number less than 12)
     */
    /**
     * @cfg {Number} lg   can be '0' for hidden at this size (number less than 12)
     */
	/**
     * @cfg {Number} xl   can be '0' for hidden at this size (number less than 12)
     */
    /**
     * Returns the id of the column at the specified index.
     * @param {Number} index The column index
     * @return {String} the id
     */
    getColumnId : function(index){
        return this.config[index].id;
    },

    /**
     * Returns the column for a specified id.
     * @param {String} id The column id
     * @return {Object} the column
     */
    getColumnById : function(id){
        return this.lookup[id];
    },

    
    /**
     * Returns the column Object for a specified dataIndex.
     * @param {String} dataIndex The column dataIndex
     * @return {Object|Boolean} the column or false if not found
     */
    getColumnByDataIndex: function(dataIndex){
        var index = this.findColumnIndex(dataIndex);
        return index > -1 ? this.config[index] : false;
    },
    
    /**
     * Returns the index for a specified column id.
     * @param {String} id The column id
     * @return {Number} the index, or -1 if not found
     */
    getIndexById : function(id){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].id == id){
                return i;
            }
        }
        return -1;
    },
    
    /**
     * Returns the index for a specified column dataIndex.
     * @param {String} dataIndex The column dataIndex
     * @return {Number} the index, or -1 if not found
     */
    
    findColumnIndex : function(dataIndex){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].dataIndex == dataIndex){
                return i;
            }
        }
        return -1;
    },
    
    
    moveColumn : function(oldIndex, newIndex){
        var c = this.config[oldIndex];
        this.config.splice(oldIndex, 1);
        this.config.splice(newIndex, 0, c);
        this.dataMap = null;
        this.fireEvent("columnmoved", this, oldIndex, newIndex);
    },

    isLocked : function(colIndex){
        return this.config[colIndex].locked === true;
    },

    setLocked : function(colIndex, value, suppressEvent){
        if(this.isLocked(colIndex) == value){
            return;
        }
        this.config[colIndex].locked = value;
        if(!suppressEvent){
            this.fireEvent("columnlockchange", this, colIndex, value);
        }
    },

    getTotalLockedWidth : function(){
        var totalWidth = 0;
        for(var i = 0; i < this.config.length; i++){
            if(this.isLocked(i) && !this.isHidden(i)){
                this.totalWidth += this.getColumnWidth(i);
            }
        }
        return totalWidth;
    },

    getLockedCount : function(){
        for(var i = 0, len = this.config.length; i < len; i++){
            if(!this.isLocked(i)){
                return i;
            }
        }
        
        return this.config.length;
    },

    /**
     * Returns the number of columns.
     * @return {Number}
     */
    getColumnCount : function(visibleOnly){
        if(visibleOnly === true){
            var c = 0;
            for(var i = 0, len = this.config.length; i < len; i++){
                if(!this.isHidden(i)){
                    c++;
                }
            }
            return c;
        }
        return this.config.length;
    },

    /**
     * Returns the column configs that return true by the passed function that is called with (columnConfig, index)
     * @param {Function} fn
     * @param {Object} scope (optional)
     * @return {Array} result
     */
    getColumnsBy : function(fn, scope){
        var r = [];
        for(var i = 0, len = this.config.length; i < len; i++){
            var c = this.config[i];
            if(fn.call(scope||this, c, i) === true){
                r[r.length] = c;
            }
        }
        return r;
    },

    /**
     * Returns true if the specified column is sortable.
     * @param {Number} col The column index
     * @return {Boolean}
     */
    isSortable : function(col){
        if(typeof this.config[col].sortable == "undefined"){
            return this.defaultSortable;
        }
        return this.config[col].sortable;
    },

    /**
     * Returns the rendering (formatting) function defined for the column.
     * @param {Number} col The column index.
     * @return {Function} The function used to render the cell. See {@link #setRenderer}.
     */
    getRenderer : function(col){
        if(!this.config[col].renderer){
            return Roo.grid.ColumnModel.defaultRenderer;
        }
        return this.config[col].renderer;
    },

    /**
     * Sets the rendering (formatting) function for a column.
     * @param {Number} col The column index
     * @param {Function} fn The function to use to process the cell's raw data
     * to return HTML markup for the grid view. The render function is called with
     * the following parameters:<ul>
     * <li>Data value.</li>
     * <li>Cell metadata. An object in which you may set the following attributes:<ul>
     * <li>css A CSS style string to apply to the table cell.</li>
     * <li>attr An HTML attribute definition string to apply to the data container element <i>within</i> the table cell.</li></ul>
     * <li>The {@link Roo.data.Record} from which the data was extracted.</li>
     * <li>Row index</li>
     * <li>Column index</li>
     * <li>The {@link Roo.data.Store} object from which the Record was extracted</li></ul>
     */
    setRenderer : function(col, fn){
        this.config[col].renderer = fn;
    },

    /**
     * Returns the width for the specified column.
     * @param {Number} col The column index
     * @param (optional) {String} gridSize bootstrap width size.
     * @return {Number}
     */
    getColumnWidth : function(col, gridSize)
	{
		var cfg = this.config[col];
		
		if (typeof(gridSize) == 'undefined') {
			return cfg.width * 1 || this.defaultWidth;
		}
		if (gridSize === false) { // if we set it..
			return cfg.width || false;
		}
		var sizes = ['xl', 'lg', 'md', 'sm', 'xs'];
		
		for(var i = sizes.indexOf(gridSize); i < sizes.length; i++) {
			if (typeof(cfg[ sizes[i] ] ) == 'undefined') {
				continue;
			}
			return cfg[ sizes[i] ];
		}
		return 1;
		
    },

    /**
     * Sets the width for a column.
     * @param {Number} col The column index
     * @param {Number} width The new width
     */
    setColumnWidth : function(col, width, suppressEvent){
        this.config[col].width = width;
        this.totalWidth = null;
        if(!suppressEvent){
             this.fireEvent("widthchange", this, col, width);
        }
    },

    /**
     * Returns the total width of all columns.
     * @param {Boolean} includeHidden True to include hidden column widths
     * @return {Number}
     */
    getTotalWidth : function(includeHidden){
        if(!this.totalWidth){
            this.totalWidth = 0;
            for(var i = 0, len = this.config.length; i < len; i++){
                if(includeHidden || !this.isHidden(i)){
                    this.totalWidth += this.getColumnWidth(i);
                }
            }
        }
        return this.totalWidth;
    },

    /**
     * Returns the header for the specified column.
     * @param {Number} col The column index
     * @return {String}
     */
    getColumnHeader : function(col){
        return this.config[col].header;
    },

    /**
     * Sets the header for a column.
     * @param {Number} col The column index
     * @param {String} header The new header
     */
    setColumnHeader : function(col, header){
        this.config[col].header = header;
        this.fireEvent("headerchange", this, col, header);
    },

    /**
     * Returns the tooltip for the specified column.
     * @param {Number} col The column index
     * @return {String}
     */
    getColumnTooltip : function(col){
            return this.config[col].tooltip;
    },
    /**
     * Sets the tooltip for a column.
     * @param {Number} col The column index
     * @param {String} tooltip The new tooltip
     */
    setColumnTooltip : function(col, tooltip){
            this.config[col].tooltip = tooltip;
    },

    /**
     * Returns the dataIndex for the specified column.
     * @param {Number} col The column index
     * @return {Number}
     */
    getDataIndex : function(col){
        return this.config[col].dataIndex;
    },

    /**
     * Return the dataIndex for displayed columns
     * @param {Array} add Array of data indexes added to the result
     * @return {Array} result
     */
    getDisplayedColumnIndexes: function(add) {
        var indexes = this.config.filter(function(c) {
            return typeof(c.hidden) == 'undefined' || c.hidden !== true;
        }).map(function(c) {
            return c.dataIndex;
        });

        return indexes.concat(add);
    },

    /**
     * Sets the dataIndex for a column.
     * @param {Number} col The column index
     * @param {Number} dataIndex The new dataIndex
     */
    setDataIndex : function(col, dataIndex){
        this.config[col].dataIndex = dataIndex;
    },

    
    
    /**
     * Returns true if the cell is editable.
     * @param {Number} colIndex The column index
     * @param {Number} rowIndex The row index - this is nto actually used..?
     * @return {Boolean}
     */
    isCellEditable : function(colIndex, rowIndex){
        return (this.config[colIndex].editable || (typeof this.config[colIndex].editable == "undefined" && this.config[colIndex].editor)) ? true : false;
    },

    /**
     * Returns the editor defined for the cell/column.
     * return false or null to disable editing.
     * @param {Number} colIndex The column index
     * @param {Number} rowIndex The row index
     * @return {Object}
     */
    getCellEditor : function(colIndex, rowIndex){
        return this.config[colIndex].editor;
    },

    /**
     * Sets if a column is editable.
     * @param {Number} col The column index
     * @param {Boolean} editable True if the column is editable
     */
    setEditable : function(col, editable){
        this.config[col].editable = editable;
    },


    /**
     * Returns true if the column is hidden.
     * @param {Number} colIndex The column index
     * @return {Boolean}
     */
    isHidden : function(colIndex){
        return this.config[colIndex].hidden;
    },


    /**
     * Returns true if the column width cannot be changed
     */
    isFixed : function(colIndex){
        return this.config[colIndex].fixed;
    },

    /**
     * Returns true if the column can be resized
     * @return {Boolean}
     */
    isResizable : function(colIndex){
        return colIndex >= 0 && this.config[colIndex].resizable !== false && this.config[colIndex].fixed !== true;
    },
    /**
     * Sets if a column is hidden.
     * @param {Number} colIndex The column index
     * @param {Boolean} hidden True if the column is hidden
     */
    setHidden : function(colIndex, hidden){
        this.config[colIndex].hidden = hidden;
        this.totalWidth = null;
        this.fireEvent("hiddenchange", this, colIndex, hidden);
    },

    /**
     * Sets the editor for a column.
     * @param {Number} col The column index
     * @param {Object} editor The editor object
     */
    setEditor : function(col, editor){
        this.config[col].editor = editor;
    },
    /**
     * Add a column (experimental...) - defaults to adding to the end..
     * @param {Object} config 
    */
    addColumn : function(c)
    {
    
	var i = this.config.length;
	this.config[i] = c;
	
	if(typeof c.dataIndex == "undefined"){
            c.dataIndex = i;
        }
        if(typeof c.renderer == "string"){
            c.renderer = Roo.util.Format[c.renderer];
        }
        if(typeof c.id == "undefined"){
            c.id = Roo.id();
        }
        if(c.editor && c.editor.xtype){
            c.editor  = Roo.factory(c.editor, Roo.grid);
        }
        if(c.editor && c.editor.isFormField){
            c.editor = new Roo.grid.GridEditor(c.editor);
        }
        this.lookup[c.id] = c;
    }
    
});

Roo.grid.ColumnModel.defaultRenderer = function(value)
{
    if(typeof value == "object") {
        return value;
    }
	if(typeof value == "string" && value.length < 1){
	    return "&#160;";
	}
    
	return String.format("{0}", value);
};

// Alias for backwards compatibility
Roo.grid.DefaultColumnModel = Roo.grid.ColumnModel;
