/*
 * - LGPL
 *
 * table
 * 
 */

/**
 * @class Roo.bootstrap.Table
 * @extends Roo.bootstrap.Component
 * Bootstrap Table class
 * @cfg {String} cls table class
 * @cfg {String} align (left|center|right) Specifies the alignment of a table according to surrounding text
 * @cfg {String} bgcolor Specifies the background color for a table
 * @cfg {Number} border Specifies whether the table cells should have borders or not
 * @cfg {Number} cellpadding Specifies the space between the cell wall and the cell content
 * @cfg {Number} cellspacing Specifies the space between cells
 * @cfg {String} frame Specifies which parts of the outside borders that should be visible
 * @cfg {String} rules Specifies which parts of the inside borders that should be visible
 * @cfg {String} sortable Specifies that the table should be sortable
 * @cfg {String} summary Specifies a summary of the content of a table
 * @cfg {Number} width Specifies the width of a table
 * @cfg {String} layout table layout (auto | fixed | initial | inherit)
 * 
 * @cfg {boolean} striped Should the rows be alternative striped
 * @cfg {boolean} bordered Add borders to the table
 * @cfg {boolean} hover Add hover highlighting
 * @cfg {boolean} condensed Format condensed
 * @cfg {boolean} responsive Format condensed
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Boolean} footerShow (true|false) generate tfoot, default true
 * @cfg {Boolean} headerShow (true|false) generate thead, default true
 * @cfg {Boolean} rowSelection (true|false) default false
 * @cfg {Boolean} cellSelection (true|false) default false
 * @cfg {Roo.bootstrap.PagingToolbar} footer  a paging toolbar
 
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
    
    // BC...
    this.rowSelection = (typeof(config.RowSelection) != 'undefined') ? config.RowSelection : this.rowSelection;
    this.cellSelection = (typeof(config.CellSelection) != 'undefined') ? config.CellSelection : this.cellSelection;
    this.headerShow = (typeof(config.thead) != 'undefined') ? config.thead : this.headerShow;
    this.footerShow = (typeof(config.tfoot) != 'undefined') ? config.tfoot : this.footerShow;
    
    
    if (this.sm) {
        this.selModel = Roo.factory(this.sm, Roo.bootstrap.Table);
        this.sm = this.selModel;
        this.sm.xmodule = this.xmodule || false;
    }
    if (this.cm && typeof(this.cm.config) == 'undefined') {
        this.colModel = new Roo.grid.ColumnModel(this.cm);
        this.cm = this.colModel;
        this.cm.xmodule = this.xmodule || false;
    }
    if (this.store) {
        this.store= Roo.factory(this.store, Roo.data);
        this.ds = this.store;
        this.ds.xmodule = this.xmodule || false;
         
    }
    if (this.footer && this.store) {
        this.footer.dataSource = this.ds;
        this.footer = Roo.factory(this.footer);
    }
    
    /** @private */
    this.addEvents({
        /**
         * @event cellclick
         * Fires when a cell is clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "cellclick" : true,
        /**
         * @event celldblclick
         * Fires when a cell is double clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "celldblclick" : true,
        /**
         * @event rowclick
         * Fires when a row is clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowclick" : true,
        /**
         * @event rowdblclick
         * Fires when a row is double clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowdblclick" : true,
        /**
         * @event mouseover
         * Fires when a mouseover occur
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "mouseover" : true,
        /**
         * @event mouseout
         * Fires when a mouseout occur
         * @param {Roo.bootstrap.Table} this
         * @param {Roo.Element} el
         * @param {Number} rowIndex
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "mouseout" : true,
        /**
         * @event rowclass
         * Fires when a row is rendered, so you can change add a style to it.
         * @param {Roo.bootstrap.Table} this
         * @param {Object} rowcfg   contains record  rowIndex colIndex and rowClass - set rowClass to add a style.
         */
        'rowclass' : true,
          /**
         * @event rowsrendered
         * Fires when all the  rows have been rendered
         * @param {Roo.bootstrap.Table} this
         */
        'rowsrendered' : true
        
    });
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    cls: false,
    align: false,
    bgcolor: false,
    border: false,
    cellpadding: false,
    cellspacing: false,
    frame: false,
    rules: false,
    sortable: false,
    summary: false,
    width: false,
    striped : false,
    bordered: false,
    hover:  false,
    condensed : false,
    responsive : false,
    sm : false,
    cm : false,
    store : false,
    loadMask : false,
    footerShow : true,
    headerShow : true,
  
    rowSelection : false,
    cellSelection : false,
    layout : false,
    
    // Roo.Element - the tbody
    mainBody: false, 
    
    getAutoCreate : function(){
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'table',
            cls : 'table',
            cn : []
        }
            
        if (this.striped) {
            cfg.cls += ' table-striped';
        }
        
        if (this.hover) {
            cfg.cls += ' table-hover';
        }
        if (this.bordered) {
            cfg.cls += ' table-bordered';
        }
        if (this.condensed) {
            cfg.cls += ' table-condensed';
        }
        if (this.responsive) {
            cfg.cls += ' table-responsive';
        }
        
        if (this.cls) {
            cfg.cls+=  ' ' +this.cls;
        }
        
        // this lot should be simplifed...
        
        if (this.align) {
            cfg.align=this.align;
        }
        if (this.bgcolor) {
            cfg.bgcolor=this.bgcolor;
        }
        if (this.border) {
            cfg.border=this.border;
        }
        if (this.cellpadding) {
            cfg.cellpadding=this.cellpadding;
        }
        if (this.cellspacing) {
            cfg.cellspacing=this.cellspacing;
        }
        if (this.frame) {
            cfg.frame=this.frame;
        }
        if (this.rules) {
            cfg.rules=this.rules;
        }
        if (this.sortable) {
            cfg.sortable=this.sortable;
        }
        if (this.summary) {
            cfg.summary=this.summary;
        }
        if (this.width) {
            cfg.width=this.width;
        }
        if (this.layout) {
            cfg.style = (typeof(cfg.style) == 'undefined') ? ('table-layout:' + this.layout + ';') : (cfg.style + ('table-layout:' + this.layout + ';'));
        }
        
        if(this.store || this.cm){
            if(this.headerShow){
                cfg.cn.push(this.renderHeader());
            }
            
            cfg.cn.push(this.renderBody());
            
            if(this.footerShow){
                cfg.cn.push(this.renderFooter());
            }
            
            cfg.cls+=  ' TableGrid';
        }
        
        return { cn : [ cfg ] };
    },
    
    initEvents : function()
    {   
        if(!this.store || !this.cm){
            return;
        }
        
        //Roo.log('initEvents with ds!!!!');
        
        this.mainBody = this.el.select('tbody', true).first();
        
        
        var _this = this;
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.on('click', _this.sort, _this);
        });
        
        this.el.on("click", this.onClick, this);
        this.el.on("dblclick", this.onDblClick, this);
        
        // why is this done????? = it breaks dialogs??
        //this.parent().el.setStyle('position', 'relative');
        
        
        if (this.footer) {
            this.footer.parentId = this.id;
            this.footer.onRender(this.el.select('tfoot tr td').first(), null);        
        }
        
        this.maskEl = new Roo.LoadMask(this.el, { store : this.ds, msgCls: 'roo-el-mask-msg' });
        
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('update', this.onUpdate, this);
        this.store.on('add', this.onAdd, this);
        
    },
    
    onMouseover : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1; // start from 0
        
        this.fireEvent('mouseover', this, cell, rowIndex, cellIndex, e);
        
    },
    
    onMouseout : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1; // start from 0
        
        this.fireEvent('mouseout', this, cell, rowIndex, cellIndex, e);
        
    },
    
    onClick : function(e, el)
    {
        var cell = Roo.get(el);
        
        if(!cell || (!this.cellSelection && !this.rowSelection)){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        if(!cell || typeof(cell) == 'undefined'){
            return;
        }
        
        var row = cell.findParent('tr', false, true);
        
        if(!row || typeof(row) == 'undefined'){
            return;
        }
        
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = this.getRowIndex(row);
        
        // why??? - should these not be based on SelectionModel?
        if(this.cellSelection){
            this.fireEvent('cellclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.rowSelection){
            this.fireEvent('rowclick', this, row, rowIndex, e);
        }
        
        
    },
    
    onDblClick : function(e,el)
    {
        var cell = Roo.get(el);
        
        if(!cell || (!this.CellSelection && !this.RowSelection)){
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = cell.findParent('td', false, true);
        }
        
        if(!cell || typeof(cell) == 'undefined'){
            return;
        }
        
        var row = cell.findParent('tr', false, true);
        
        if(!row || typeof(row) == 'undefined'){
            return;
        }
        
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = this.getRowIndex(row);
        
        if(this.CellSelection){
            this.fireEvent('celldblclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.RowSelection){
            this.fireEvent('rowdblclick', this, row, rowIndex, e);
        }
    },
    
    sort : function(e,el)
    {
        var col = Roo.get(el);
        
        if(!col.hasClass('sortable')){
            return;
        }
        
        var sort = col.attr('sort');
        var dir = 'ASC';
        
        if(col.hasClass('glyphicon-arrow-up')){
            dir = 'DESC';
        }
        
        this.store.sortInfo = {field : sort, direction : dir};
        
        if (this.footer) {
            Roo.log("calling footer first");
            this.footer.onClick('first');
        } else {
        
            this.store.load({ params : { start : 0 } });
        }
    },
    
    renderHeader : function()
    {
        var header = {
            tag: 'thead',
            cn : []
        };
        
        var cm = this.cm;
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            
            var config = cm.config[i];
                    
            var c = {
                tag: 'th',
                style : '',
                html: cm.getColumnHeader(i)
            };
            
            if(typeof(config.tooltip) != 'undefined'){
                c.tooltip = config.tooltip;
            }
            
            if(typeof(config.colspan) != 'undefined'){
                c.colspan = config.colspan;
            }
            
            if(typeof(config.hidden) != 'undefined' && config.hidden){
                c.style += ' display:none;';
            }
            
            if(typeof(config.dataIndex) != 'undefined'){
                c.sort = config.dataIndex;
            }
            
            if(typeof(config.sortable) != 'undefined' && config.sortable){
                c.cls = 'sortable';
            }
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                c.style += ' text-align:' + config.align + ';';
            }
            
            if(typeof(config.width) != 'undefined'){
                c.style += ' width:' + config.width + 'px;';
            }
            
            if(typeof(config.cls) != 'undefined'){
                c.cls = (typeof(c.cls) == 'undefined') ? config.cls : (c.cls + ' ' + config.cls);
            }
            
            header.cn.push(c)
        }
        
        return header;
    },
    
    renderBody : function()
    {
        var body = {
            tag: 'tbody',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            colspan :  this.cm.getColumnCount()
                        }
                    ]
                }
            ]
        };
        
        return body;
    },
    
    renderFooter : function()
    {
        var footer = {
            tag: 'tfoot',
            cn : [
                {
                    tag: 'tr',
                    cn : [
                        {
                            tag : 'td',
                            colspan :  this.cm.getColumnCount()
                        }
                    ]
                }
            ]
        };
        
        return footer;
    },
    
    
    
    onLoad : function()
    {
        Roo.log('ds onload');
        this.clear();
        
        var _this = this;
        var cm = this.cm;
        var ds = this.store;
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.removeClass(['glyphicon', 'glyphicon-arrow-up', 'glyphicon-arrow-down']);
            
            if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'ASC'){
                e.addClass(['glyphicon', 'glyphicon-arrow-up']);
            }
            
            if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'DESC'){
                e.addClass(['glyphicon', 'glyphicon-arrow-down']);
            }
        });
        
        var tbody =  this.mainBody;
              
        if(ds.getCount() > 0){
            ds.data.each(function(d,rowIndex){
                var row =  this.renderRow(cm, ds, rowIndex);
                
                tbody.createChild(row);
                
                var _this = this;
                
                if(row.cellObjects.length){
                    Roo.each(row.cellObjects, function(r){
                        _this.renderCellObject(r);
                    })
                }
                
            }, this);
        }
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseover', _this.onMouseover, _this);
        });
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseout', _this.onMouseout, _this);
        });
        this.fireEvent('rowsrendered', this);
        //if(this.loadMask){
        //    this.maskEl.hide();
        //}
    },
    
    
    onUpdate : function(ds,record)
    {
        this.refreshRow(record);
    },
    
    onRemove : function(ds, record, index, isUpdate){
        if(isUpdate !== true){
            this.fireEvent("beforerowremoved", this, index, record);
        }
        var bt = this.mainBody.dom;
        
        var rows = this.el.select('tbody > tr', true).elements;
        
        if(typeof(rows[index]) != 'undefined'){
            bt.removeChild(rows[index].dom);
        }
        
//        if(bt.rows[index]){
//            bt.removeChild(bt.rows[index]);
//        }
        
        if(isUpdate !== true){
            //this.stripeRows(index);
            //this.syncRowHeights(index, index);
            //this.layout();
            this.fireEvent("rowremoved", this, index, record);
        }
    },
    
    onAdd : function(ds, records, rowIndex)
    {
        //Roo.log('on Add called');
        // - note this does not handle multiple adding very well..
        var bt = this.mainBody.dom;
        for (var i =0 ; i < records.length;i++) {
            //Roo.log('call insert row Add called on ' + rowIndex + ':' + i);
            //Roo.log(records[i]);
            //Roo.log(this.store.getAt(rowIndex+i));
            this.insertRow(this.store, rowIndex + i, false);
            return;
        }
        
    },
    
    
    refreshRow : function(record){
        var ds = this.store, index;
        if(typeof record == 'number'){
            index = record;
            record = ds.getAt(index);
        }else{
            index = ds.indexOf(record);
        }
        this.insertRow(ds, index, true);
        this.onRemove(ds, record, index+1, true);
        //this.syncRowHeights(index, index);
        //this.layout();
        this.fireEvent("rowupdated", this, index, record);
    },
    
    insertRow : function(dm, rowIndex, isUpdate){
        
        if(!isUpdate){
            this.fireEvent("beforerowsinserted", this, rowIndex);
        }
            //var s = this.getScrollState();
        var row = this.renderRow(this.cm, this.store, rowIndex);
        // insert before rowIndex..
        var e = this.mainBody.createChild(row,this.getRowDom(rowIndex));
        
        var _this = this;
                
        if(row.cellObjects.length){
            Roo.each(row.cellObjects, function(r){
                _this.renderCellObject(r);
            })
        }
            
        if(!isUpdate){
            this.fireEvent("rowsinserted", this, rowIndex);
            //this.syncRowHeights(firstRow, lastRow);
            //this.stripeRows(firstRow);
            //this.layout();
        }
        
    },
    
    
    getRowDom : function(rowIndex)
    {
        var rows = this.el.select('tbody > tr', true).elements;
        
        return (typeof(rows[rowIndex]) == 'undefined') ? false : rows[rowIndex];
        
    },
    // returns the object tree for a tr..
  
    
    renderRow : function(cm, ds, rowIndex) 
    {
        
        var d = ds.getAt(rowIndex);
        
        var row = {
            tag : 'tr',
            cn : []
        };
            
        var cellObjects = [];
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            var config = cm.config[i];
            
            var renderer = cm.getRenderer(i);
            var value = '';
            var id = false;
            
            if(typeof(renderer) !== 'undefined'){
                value = renderer(d.data[cm.getDataIndex(i)], false, d);
            }
            // if object are returned, then they are expected to be Roo.bootstrap.Component instances
            // and are rendered into the cells after the row is rendered - using the id for the element.
            
            if(typeof(value) === 'object'){
                id = Roo.id();
                cellObjects.push({
                    container : id,
                    cfg : value 
                })
            }
            
            var rowcfg = {
                record: d,
                rowIndex : rowIndex,
                colIndex : i,
                rowClass : ''
            }

            this.fireEvent('rowclass', this, rowcfg);
            
            var td = {
                tag: 'td',
                cls : rowcfg.rowClass,
                style: '',
                html: (typeof(value) === 'object') ? '' : value
            };
            
            if (id) {
                td.id = id;
            }
            
            if(typeof(config.colspan) != 'undefined'){
                td.colspan = config.colspan;
            }
            
            if(typeof(config.hidden) != 'undefined' && config.hidden){
                td.style += ' display:none;';
            }
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                td.style += ' text-align:' + config.align + ';';
            }
            
            if(typeof(config.width) != 'undefined'){
                td.style += ' width:' +  config.width + 'px;';
            }
            
            if(typeof(config.cursor) != 'undefined'){
                td.style += ' cursor:' +  config.cursor + ';';
            }
            
            if(typeof(config.cls) != 'undefined'){
                td.cls = (typeof(td.cls) == 'undefined') ? config.cls : (td.cls + ' ' + config.cls);
            }
             
            row.cn.push(td);
           
        }
        
        row.cellObjects = cellObjects;
        
        return row;
          
    },
    
    
    
    onBeforeLoad : function()
    {
        //Roo.log('ds onBeforeLoad');
        
        //this.clear();
        
        //if(this.loadMask){
        //    this.maskEl.show();
        //}
    },
     /**
     * Remove all rows
     */
    clear : function()
    {
        this.el.select('tbody', true).first().dom.innerHTML = '';
    },
    /**
     * Show or hide a row.
     * @param {Number} rowIndex to show or hide
     * @param {Boolean} state hide
     */
    setRowVisibility : function(rowIndex, state)
    {
        var bt = this.mainBody.dom;
        
        var rows = this.el.select('tbody > tr', true).elements;
        
        if(typeof(rows[rowIndex]) == 'undefined'){
            return;
        }
        rows[rowIndex].dom.style.display = state ? '' : 'none';
    },
    
    
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.bootstrap.Table.RowSelectionModel();
        }
        return this.selModel;
    },
    /*
     * Render the Roo.bootstrap object from renderder
     */
    renderCellObject : function(r)
    {
        var _this = this;
        
        var t = r.cfg.render(r.container);
        
        if(r.cfg.cn){
            Roo.each(r.cfg.cn, function(c){
                var child = {
                    container: t.getChildContainer(),
                    cfg: c
                }
                _this.renderCellObject(child);
            })
        }
    },
    
    getRowIndex : function(row)
    {
        var rowIndex = -1;
        
        Roo.each(this.el.select('tbody > tr', true).elements, function(el, index){
            if(el != row){
                return;
            }
            
            rowIndex = index;
        });
        
        return rowIndex;
    }
   
});

 

 