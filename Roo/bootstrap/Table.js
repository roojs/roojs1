/**
 * @class Roo.bootstrap.Table
 * @licence LGBL
 * @extends Roo.bootstrap.Component
 * @children Roo.bootstrap.TableBody
 * Bootstrap Table class.  This class represents the primary interface of a component based grid control.
 * Similar to Roo.grid.Grid
 * <pre><code>
 var table = Roo.factory({
    xtype : 'Table',
    xns : Roo.bootstrap,
    autoSizeColumns: true,
    
    
    store : {
        xtype : 'Store',
        xns : Roo.data,
        remoteSort : true,
        sortInfo : { direction : 'ASC', field: 'name' },
        proxy : {
           xtype : 'HttpProxy',
           xns : Roo.data,
           method : 'GET',
           url : 'https://example.com/some.data.url.json'
        },
        reader : {
           xtype : 'JsonReader',
           xns : Roo.data,
           fields : [ 'id', 'name', whatever' ],
           id : 'id',
           root : 'data'
        }
    },
    cm : [
        {
            xtype : 'ColumnModel',
            xns : Roo.grid,
            align : 'center',
            cursor : 'pointer',
            dataIndex : 'is_in_group',
            header : "Name",
            sortable : true,
            renderer : function(v, x , r) {  
            
                return String.format("{0}", v)
            }
            width : 3
        } // more columns..
    ],
    selModel : {
        xtype : 'RowSelectionModel',
        xns : Roo.bootstrap.Table
        // you can add listeners to catch selection change here....
    }
     

 });
 // set any options
 grid.render(Roo.get("some-div"));
</code></pre>

Currently the Table  uses multiple headers to try and handle XL / Medium etc... styling



 *
 * @cfg {Roo.grid.AbstractSelectionModel} sm The selection model to use (cell selection is not supported yet)
 * @cfg {Roo.data.Store} store The data store to use
 * @cfg {Roo.grid.ColumnModel} cm[] A column for the grid.
 * 
 * @cfg {String} cls table class
 *
 *
 * @cfg {string} empty_results  Text to display for no results 
 * @cfg {boolean} striped Should the rows be alternative striped
 * @cfg {boolean} bordered Add borders to the table
 * @cfg {boolean} hover Add hover highlighting
 * @cfg {boolean} condensed Format condensed
 * @cfg {boolean} responsive default false - if this is on, columns are rendered with col-xs-4 etc. classes, otherwise columns will be sized by CSS,
 *                also adds table-responsive (see bootstrap docs for details)
 * @cfg {Boolean} loadMask (true|false) default false
 * @cfg {Boolean} footerShow (true|false) generate tfoot, default true
 * @cfg {Boolean} footerRow (true|false) generate tfoot with columns of values, default false
 * @cfg {Boolean} headerShow (true|false) generate thead, default true
 * @cfg {Boolean} rowSelection (true|false) default false
 * @cfg {Boolean} cellSelection (true|false) default false
 * @cfg {Boolean} scrollBody (true|false) default false - body scrolled / fixed header (with resizable columns)
 * @cfg {Roo.bootstrap.PagingToolbar} footer  a paging toolbar
 * @cfg {Boolean} lazyLoad  auto load data while scrolling to the end (default false)
 * @cfg {Boolean} auto_hide_footer  auto hide footer if only one page (default false)
 * @cfg {Boolean} enableColumnResize default true if columns can be resized = needs scrollBody to be set to work (drag/drop)
 * @cfg {Boolean} disableAutoSize disable autoSize() and initCSS()
 *
 * 
 * @cfg {Number} minColumnWidth default 50 pixels minimum column width 
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config)
{
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
     
    // BC...
    this.rowSelection = (typeof(config.rowSelection) != 'undefined') ? config.rowSelection : this.rowSelection;
    this.cellSelection = (typeof(config.cellSelection) != 'undefined') ? config.cellSelection : this.cellSelection;
    this.headerShow = (typeof(config.thead) != 'undefined') ? config.thead : this.headerShow;
    this.footerShow = (typeof(config.tfoot) != 'undefined') ? config.tfoot : this.footerShow;
    
    this.view = this; // compat with grid.
    
    this.sm = this.sm || {xtype: 'RowSelectionModel'};
    if (this.sm) {
        this.sm.grid = this;
        this.selModel = Roo.factory(this.sm, Roo.grid);
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
        'rowsrendered' : true,
        /**
         * @event contextmenu
         * The raw contextmenu event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "contextmenu" : true,
        /**
         * @event rowcontextmenu
         * Fires when a row is right clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Number} rowIndex
         * @param {Roo.EventObject} e
         */
        "rowcontextmenu" : true,
        /**
         * @event cellcontextmenu
         * Fires when a cell is right clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Number} rowIndex
         * @param {Number} cellIndex
         * @param {Roo.EventObject} e
         */
         "cellcontextmenu" : true,
         /**
         * @event headercontextmenu
         * Fires when a header is right clicked
         * @param {Roo.bootstrap.Table} this
         * @param {Number} columnIndex
         * @param {Roo.EventObject} e
         */
        "headercontextmenu" : true,
        /**
         * @event mousedown
         * The raw mousedown event for the entire grid.
         * @param {Roo.EventObject} e
         */
        "mousedown" : true
        
    });
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    cls: false,
    
    empty_results : '',
    striped : false,
    scrollBody : false,
    bordered: false,
    hover:  false,
    condensed : false,
    responsive : false,
    sm : false,
    cm : false,
    store : false,
    loadMask : false,
    footerShow : true,
    footerRow : false,
    headerShow : true,
    enableColumnResize: true,
    disableAutoSize: false,
  
    rowSelection : false,
    cellSelection : false,
    layout : false,

    minColumnWidth : 50,
    
    // Roo.Element - the tbody
    bodyEl: false,  // <tbody> Roo.Element - thead element    
    headEl: false,  // <thead> Roo.Element - thead element
    resizeProxy : false, // proxy element for dragging?


    
    container: false, // used by gridpanel...
    
    lazyLoad : false,
    
    CSS : Roo.util.CSS,
    
    auto_hide_footer : false,
    
    view: false, // actually points to this..
    
    getAutoCreate : function()
    {
        var cfg = Roo.apply({}, Roo.bootstrap.Table.superclass.getAutoCreate.call(this));
        
        cfg = {
            tag: 'table',
            cls : 'table', 
            cn : []
        };
        // this get's auto added by panel.Grid
        if (this.scrollBody) {
            cfg.cls += ' table-body-fixed';
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
        
        
        
        if (this.layout) {
            cfg.style = (typeof(cfg.style) == 'undefined') ? ('table-layout:' + this.layout + ';') : (cfg.style + ('table-layout:' + this.layout + ';'));
        }
        
        if(this.store || this.cm){
            if(this.headerShow){
                cfg.cn.push(this.renderHeader());
            }
            
            cfg.cn.push(this.renderBody());
            
            if(this.footerShow || this.footerRow){
                cfg.cn.push(this.renderFooter());
            }

            // where does this come from?
            //cfg.cls+=  ' TableGrid';
        }
        
        return { cn : [ cfg ] };
    },
    
    initEvents : function()
    {   
        if(!this.store || !this.cm){
            return;
        }
        if (this.selModel) {
            this.selModel.initEvents();
        }
        
        
        //Roo.log('initEvents with ds!!!!');
        
        this.bodyEl = this.el.select('tbody', true).first();
        this.headEl = this.el.select('thead', true).first();
        this.mainFoot = this.el.select('tfoot', true).first();
        
        
        
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.on('click', this.sort, this);
        }, this);
        
        
        // why is this done????? = it breaks dialogs??
        //this.parent().el.setStyle('position', 'relative');
        
        
        if (this.footer) {
            this.footer.parentId = this.id;
            this.footer.onRender(this.el.select('tfoot tr td').first(), null);
            
            if(this.lazyLoad){
                this.el.select('tfoot tr td').first().addClass('hide');
            }
        } 
        
        if(this.loadMask) {
            this.maskEl = new Roo.LoadMask(this.el, { store : this.ds, msgCls: 'roo-el-mask-msg' });
        }
        
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('update', this.onUpdate, this);
        this.store.on('add', this.onAdd, this);
        this.store.on("clear", this.clear, this);
        
        this.el.on("contextmenu", this.onContextMenu, this);
        
        
        this.cm.on("headerchange", this.onHeaderChange, this);
        this.cm.on("hiddenchange", this.onHiddenChange, this, arguments);

 //?? does bodyEl get replaced on render?
        this.bodyEl.on("click", this.onClick, this);
        this.bodyEl.on("dblclick", this.onDblClick, this);        
        this.bodyEl.on('scroll', this.onBodyScroll, this);

        // guessing mainbody will work - this relays usually caught by selmodel at present.
        this.relayEvents(this.bodyEl, ["mousedown","mouseup","mouseover","mouseout","keypress"]);
  
  
        this.resizeProxy = Roo.get(document.body).createChild({ cls:"x-grid-resize-proxy", html: '&#160;' });
        
  
        if(this.headEl && this.enableColumnResize !== false && Roo.grid.SplitDragZone){
            new Roo.grid.SplitDragZone(this, this.headEl.dom, false); // not sure what 'lockedHd is for this implementation..)
        }
        
        this.initCSS();
    },
    // Compatibility with grid - we implement all the view features at present.
    getView : function()
    {
        return this;
    },
    
    initCSS : function()
    {
        if(this.disableAutoSize) {
            return;
        }
        
        var cm = this.cm, styles = [];
        this.CSS.removeStyleSheet(this.id + '-cssrules');
        var headHeight = this.headEl ? this.headEl.dom.clientHeight : 0;
        // we can honour xs/sm/md/xl  as widths...
        // we first have to decide what widht we are currently at...
        var sz = Roo.getGridSize();
        
        var total = 0;
        var last = -1;
        var cols = []; // visable cols.
        var total_abs = 0;
        for(var i = 0, len = cm.getColumnCount(); i < len; i++) {
            var w = cm.getColumnWidth(i, false);
            if(cm.isHidden(i)){
                cols.push( { rel : false, abs : 0 });
                continue;
            }
            if (w !== false) {
                cols.push( { rel : false, abs : w });
                total_abs += w;
                last = i; // not really..
                continue;
            }
            var w = cm.getColumnWidth(i, sz);
            if (w > 0) {
                last = i
            }
            total += w;
            cols.push( { rel : w, abs : false });
        }
        
        var avail = this.bodyEl.dom.clientWidth - total_abs;
        
        var unitWidth = Math.floor(avail / total);
        var rem = avail - (unitWidth * total);
        
        var hidden, width, pos = 0 , splithide , left;
        for(var i = 0, len = cm.getColumnCount(); i < len; i++) {
            
            hidden = 'display:none;';
            left = '';
            width  = 'width:0px;';
            splithide = '';
            if(!cm.isHidden(i)){
                hidden = '';
                
                
                // we can honour xs/sm/md/xl ?
                var w = cols[i].rel == false ? cols[i].abs : (cols[i].rel * unitWidth);
                if (w===0) {
                    hidden = 'display:none;';
                }
                // width should return a small number...
                if (i == last) {
                    w+=rem; // add the remaining with..
                }
                pos += w;
                left = "left:" + (pos -4) + "px;";
                width = "width:" + w+ "px;";
                
            }
            if (this.responsive) {
                width = '';
                left = '';
                hidden = cm.isHidden(i) ? 'display:none;' : '';
                splithide = 'display: none;';
            }
            
            styles.push( '#' , this.id , ' .x-col-' , i, " {", cm.config[i].css, width, hidden, "}\n" );
            if (this.headEl) {
                if (i == last) {
                    splithide = 'display:none;';
                }
                
                styles.push('#' , this.id , ' .x-hcol-' , i, " { ", width, hidden," }\n",
                            '#' , this.id , ' .x-grid-split-' , i, " { ", left, splithide, 'height:', (headHeight - 4), "px;}\n",
                            // this is the popover version..
                            '.popover-inner #' , this.id , ' .x-grid-split-' , i, " { ", left, splithide, 'height:', 100, "%;}\n"
                );
            }
            
        }
        //Roo.log(styles.join(''));
        this.CSS.createStyleSheet( styles.join(''), this.id + '-cssrules');
        
    },
    
    
    
    onContextMenu : function(e, t)
    {
        this.processEvent("contextmenu", e);
    },
    
    processEvent : function(name, e)
    {
        if (name != 'touchstart' ) {
            this.fireEvent(name, e);    
        }
        
        var t = e.getTarget();
        
        var cell = Roo.get(t);
        
        if(!cell){
            return;
        }
        
        if(cell.findParent('tfoot', false, true)){
            return;
        }
        
        if(cell.findParent('thead', false, true)){
            
            if(e.getTarget().nodeName.toLowerCase() != 'th'){
                cell = Roo.get(t).findParent('th', false, true);
                if (!cell) {
                    Roo.log("failed to find th in thead?");
                    Roo.log(e.getTarget());
                    return;
                }
            }
            
            var cellIndex = cell.dom.cellIndex;
            
            var ename = name == 'touchstart' ? 'click' : name;
            this.fireEvent("header" + ename, this, cellIndex, e);
            
            return;
        }
        
        if(e.getTarget().nodeName.toLowerCase() != 'td'){
            cell = Roo.get(t).findParent('td', false, true);
            if (!cell) {
                Roo.log("failed to find th in tbody?");
                Roo.log(e.getTarget());
                return;
            }
        }
        
        var row = cell.findParent('tr', false, true);
        var cellIndex = cell.dom.cellIndex;
        var rowIndex = row.dom.rowIndex - 1;
        
        if(row !== false){
            
            this.fireEvent("row" + name, this, rowIndex, e);
            
            if(cell !== false){
            
                this.fireEvent("cell" + name, this, rowIndex, cellIndex, e);
            }
        }
        
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
        //if(this.cellSelection){
            this.fireEvent('cellclick', this, cell, rowIndex, cellIndex, e);
        //}
        
        //if(this.rowSelection){
            this.fireEvent('rowclick', this, row, rowIndex, e);
        //}
         
    },
        
    onDblClick : function(e,el)
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
        
        if(this.cellSelection){
            this.fireEvent('celldblclick', this, cell, rowIndex, cellIndex, e);
        }
        
        if(this.rowSelection){
            this.fireEvent('rowdblclick', this, row, rowIndex, e);
        }
    },
    findRowIndex : function(el)
    {
        var cell = Roo.get(el);
        if(!cell) {
            return false;
        }
        var row = cell.findParent('tr', false, true);
        
        if(!row || typeof(row) == 'undefined'){
            return false;
        }
        return this.getRowIndex(row);
    },
    sort : function(e,el)
    {
        var col = Roo.get(el);
        
        if(!col.hasClass('sortable')){
            return;
        }
        
        var sort = col.attr('sort');
        var dir = 'ASC';
        
        if(col.select('i', true).first().hasClass('fa-arrow-up')){
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
        this.totalWidth = 0;
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            
            var config = cm.config[i];
            
            var c = {
                tag: 'th',
                cls : 'x-hcol-' + i,
                style : '',
                
                html: cm.getColumnHeader(i)
            };
            
            var tooltip = cm.getColumnTooltip(i);
            if (tooltip) {
                c.tooltip = tooltip;
            }
            
            
            var hh = '';
            
            if(typeof(config.sortable) != 'undefined' && config.sortable){
                c.cls += ' sortable';
                c.html = '<i class="fa"></i>' + c.html;
            }
            
            // could use BS4 hidden-..-down 
            
            if(typeof(config.lgHeader) != 'undefined'){
                hh += '<span class="hidden-xs hidden-sm hidden-md ">' + config.lgHeader + '</span>';
            }
            
            if(typeof(config.mdHeader) != 'undefined'){
                hh += '<span class="hidden-xs hidden-sm hidden-lg">' + config.mdHeader + '</span>';
            }
            
            if(typeof(config.smHeader) != 'undefined'){
                hh += '<span class="hidden-xs hidden-md hidden-lg">' + config.smHeader + '</span>';
            }
            
            if(typeof(config.xsHeader) != 'undefined'){
                hh += '<span class="hidden-sm hidden-md hidden-lg">' + config.xsHeader + '</span>';
            }
            
            if(hh.length){
                c.html = hh;
            }
            
            if(typeof(config.tooltip) != 'undefined'){
                c.tooltip = config.tooltip;
            }
            
            if(typeof(config.colspan) != 'undefined'){
                c.colspan = config.colspan;
            }
            
            // hidden is handled by CSS now
            
            if(typeof(config.dataIndex) != 'undefined'){
                c.sort = config.dataIndex;
            }
            
           
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                c.style += ' text-align:' + config.align + ';';
            }
            
            /* width is done in CSS
             *if(typeof(config.width) != 'undefined'){
                c.style += ' width:' + config.width + 'px;';
                this.totalWidth += config.width;
            } else {
                this.totalWidth += 100; // assume minimum of 100 per column?
            }
            */
            
            if(typeof(config.cls) != 'undefined'){
                c.cls = (typeof(c.cls) == 'undefined') ? config.cls : (c.cls + ' ' + config.cls);
            }
            // this is the bit that doesnt reall work at all...
            
            if (this.responsive) {
                 
            
                ['xs','sm','md','lg'].map(function(size){
                    
                    if(typeof(config[size]) == 'undefined'){
                        return;
                    }
                     
                    if (!config[size]) { // 0 = hidden
                        // BS 4 '0' is treated as hide that column and below.
                        c.cls += ' hidden-' + size + ' hidden' + size + '-down';
                        return;
                    }
                    
                    c.cls += ' col-' + size + '-' + config[size] + (
                        size == 'xs' ? (' col-' + config[size] ) : '' // bs4 col-{num} replaces col-xs
                    );
                    
                    
                });
            }
            // at the end?
            
            c.html +=' <span class="x-grid-split x-grid-split-' + i + '"></span>';
            
            
            
            
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
//        Roo.log('ds onload');
        this.clear();
        
        var _this = this;
        var cm = this.cm;
        var ds = this.store;
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.select('i', true).removeClass(['fa-arrow-up', 'fa-arrow-down']);
            if (_this.store.sortInfo) {
                    
                if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'ASC'){
                    e.select('i', true).addClass(['fa-arrow-up']);
                }
                
                if(e.hasClass('sortable') && e.attr('sort') == _this.store.sortInfo.field && _this.store.sortInfo.direction.toUpperCase() == 'DESC'){
                    e.select('i', true).addClass(['fa-arrow-down']);
                }
            }
        });
        
        var tbody =  this.bodyEl;
              
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
        } else if (this.empty_results.length) {
            this.el.mask(this.empty_results, 'no-spinner');
        }
        
        var tfoot = this.el.select('tfoot', true).first();
        
        if(this.footerShow && !this.footerRow && this.auto_hide_footer && this.mainFoot){
            
            this.mainFoot.setVisibilityMode(Roo.Element.DISPLAY).hide();
            
            var total = this.ds.getTotalCount();
            
            if(this.footer.pageSize < total){
                this.mainFoot.show();
            }
        }

        if(!this.footerShow && this.footerRow) {

            var tr = {
                tag : 'tr',
                cn : []
            };

            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
                var footer = typeof(cm.config[i].footer) == "function" ? cm.config[i].footer(ds, cm.config[i]) : cm.config[i].footer;
                var td = {
                    tag: 'td',
                    cls : ' x-fcol-' + i,
                    html: footer
                };

                tr.cn.push(td);
                
            }
            
            tfoot.dom.innerHTML = '';

            tfoot.createChild(tr);
        }
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseover', _this.onMouseover, _this);
        });
        
        Roo.each(this.el.select('tbody td', true).elements, function(e){
            e.on('mouseout', _this.onMouseout, _this);
        });
        this.fireEvent('rowsrendered', this);
        
        this.autoSize();
        
        this.initCSS(); /// resize cols

        
    },
    
    
    onUpdate : function(ds,record)
    {
        this.refreshRow(record);
        this.autoSize();
    },
    
    onRemove : function(ds, record, index, isUpdate){
        if(isUpdate !== true){
            this.fireEvent("beforerowremoved", this, index, record);
        }
        var bt = this.bodyEl.dom;
        
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
        var bt = this.bodyEl.dom;
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
            if (index < 0) {
                return; // should not happen - but seems to 
            }
        }
        this.insertRow(ds, index, true);
        this.autoSize();
        this.onRemove(ds, record, index+1, true);
        this.autoSize();
        //this.syncRowHeights(index, index);
        //this.layout();
        this.fireEvent("rowupdated", this, index, record);
    },
    // private - called by RowSelection
    onRowSelect : function(rowIndex){
        var row = this.getRowDom(rowIndex);
        row.addClass(['bg-info','info']);
    },
    // private - called by RowSelection
    onRowDeselect : function(rowIndex)
    {
        if (rowIndex < 0) {
            return;
        }
        var row = this.getRowDom(rowIndex);
        row.removeClass(['bg-info','info']);
    },
      /**
     * Focuses the specified row.
     * @param {Number} row The row index
     */
    focusRow : function(row)
    {
        //Roo.log('GridView.focusRow');
        var x = this.bodyEl.dom.scrollLeft;
        this.focusCell(row, 0, false);
        this.bodyEl.dom.scrollLeft = x;

    },
     /**
     * Focuses the specified cell.
     * @param {Number} row The row index
     * @param {Number} col The column index
     * @param {Boolean} hscroll false to disable horizontal scrolling
     */
    focusCell : function(row, col, hscroll)
    {
        //Roo.log('GridView.focusCell');
        var el = this.ensureVisible(row, col, hscroll);
        // not sure what focusEL achives = it's a <a> pos relative 
        //this.focusEl.alignTo(el, "tl-tl");
        //if(Roo.isGecko){
        //    this.focusEl.focus();
        //}else{
        //    this.focusEl.focus.defer(1, this.focusEl);
        //}
    },
    
     /**
     * Scrolls the specified cell into view
     * @param {Number} row The row index
     * @param {Number} col The column index
     * @param {Boolean} hscroll false to disable horizontal scrolling
     */
    ensureVisible : function(row, col, hscroll)
    {
        //Roo.log('GridView.ensureVisible,' + row + ',' + col);
        //return null; //disable for testing.
        if(typeof row != "number"){
            row = row.rowIndex;
        }
        if(row < 0 && row >= this.ds.getCount()){
            return  null;
        }
        col = (col !== undefined ? col : 0);
        var cm = this.cm;
        while(cm.isHidden(col)){
            col++;
        }

        var el = this.getCellDom(row, col);
        if(!el){
            return null;
        }
        var c = this.bodyEl.dom;

        var ctop = parseInt(el.offsetTop, 10);
        var cleft = parseInt(el.offsetLeft, 10);
        var cbot = ctop + el.offsetHeight;
        var cright = cleft + el.offsetWidth;

        //var ch = c.clientHeight - this.mainHd.dom.offsetHeight;
        var ch = 0; //?? header is not withing the area?
        var stop = parseInt(c.scrollTop, 10);
        var sleft = parseInt(c.scrollLeft, 10);
        var sbot = stop + ch;
        var sright = sleft + c.clientWidth;
        /*
        Roo.log('GridView.ensureVisible:' +
                ' ctop:' + ctop +
                ' c.clientHeight:' + c.clientHeight +
                ' this.mainHd.dom.offsetHeight:' + this.mainHd.dom.offsetHeight +
                ' stop:' + stop +
                ' cbot:' + cbot +
                ' sbot:' + sbot +
                ' ch:' + ch  
                );
        */
        if(ctop < stop){
            c.scrollTop = ctop;
            //Roo.log("set scrolltop to ctop DISABLE?");
        }else if(cbot > sbot){
            //Roo.log("set scrolltop to cbot-ch");
            c.scrollTop = cbot-ch;
        }

        if(hscroll !== false){
            if(cleft < sleft){
                c.scrollLeft = cleft;
            }else if(cright > sright){
                c.scrollLeft = cright-c.clientWidth;
            }
        }

        return el;
    },
    
    
    insertRow : function(dm, rowIndex, isUpdate){
        
        if(!isUpdate){
            this.fireEvent("beforerowsinserted", this, rowIndex);
        }
            //var s = this.getScrollState();
        var row = this.renderRow(this.cm, this.store, rowIndex);
        // insert before rowIndex..
        var e = this.bodyEl.createChild(row,this.getRowDom(rowIndex));
        
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
    getCellDom : function(rowIndex, colIndex)
    {
        var row = this.getRowDom(rowIndex);
        if (row === false) {
            return false;
        }
        var cols = row.select('td', true).elements;
        return (typeof(cols[colIndex]) == 'undefined') ? false : cols[colIndex];
        
    },
    
    // returns the object tree for a tr..
  
    
    renderRow : function(cm, ds, rowIndex) 
    {
        var d = ds.getAt(rowIndex);
        
        var row = {
            tag : 'tr',
            cls : 'x-row-' + rowIndex,
            cn : []
        };
            
        var cellObjects = [];
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            var config = cm.config[i];
            
            var renderer = cm.getRenderer(i);
            var value = '';
            var id = false;
            
            if(typeof(renderer) !== 'undefined'){
                value = renderer.call(config, d.data[cm.getDataIndex(i)], false, d);
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
            };

            this.fireEvent('rowclass', this, rowcfg);
            
            var td = {
                tag: 'td',
                // this might end up displaying HTML?
                // this is too messy... - better to only do it on columsn you know are going to be too long
                //tooltip : (typeof(value) === 'object') ? '' : value,
                cls : rowcfg.rowClass + ' x-col-' + i,
                style: '',
                html: (typeof(value) === 'object') ? '' : value
            };
            
            if (id) {
                td.id = id;
            }
            
            if(typeof(config.colspan) != 'undefined'){
                td.colspan = config.colspan;
            }
            
            
            
            if(typeof(config.align) != 'undefined' && config.align.length){
                td.style += ' text-align:' + config.align + ';';
            }
            if(typeof(config.valign) != 'undefined' && config.valign.length){
                td.style += ' vertical-align:' + config.valign + ';';
            }
            /*
            if(typeof(config.width) != 'undefined'){
                td.style += ' width:' +  config.width + 'px;';
            }
            */
            
            if(typeof(config.cursor) != 'undefined'){
                td.style += ' cursor:' +  config.cursor + ';';
            }
            
            if(typeof(config.cls) != 'undefined'){
                td.cls = (typeof(td.cls) == 'undefined') ? config.cls : (td.cls + ' ' + config.cls);
            }
            if (this.responsive) {
                ['xs','sm','md','lg'].map(function(size){
                    
                    if(typeof(config[size]) == 'undefined'){
                        return;
                    }
                    
                    
                      
                    if (!config[size]) { // 0 = hidden
                        // BS 4 '0' is treated as hide that column and below.
                        td.cls += ' hidden-' + size + ' hidden' + size + '-down';
                        return;
                    }
                    
                    td.cls += ' col-' + size + '-' + config[size] + (
                        size == 'xs' ? (' col-' +   config[size] ) : '' // bs4 col-{num} replaces col-xs
                    );
                     
    
                });
            }
            row.cn.push(td);
           
        }
        
        row.cellObjects = cellObjects;
        
        return row;
          
    },
    
    
    
    onBeforeLoad : function()
    {
        this.el.unmask(); // if needed.
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
        var bt = this.bodyEl.dom;
        
        var rows = this.el.select('tbody > tr', true).elements;
        
        if(typeof(rows[rowIndex]) == 'undefined'){
            return;
        }
        rows[rowIndex][ state ? 'removeClass' : 'addClass']('d-none');
        
    },
    
    
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Roo.bootstrap.Table.RowSelectionModel({grid: this});
        }
        return this.selModel;
    },
    /*
     * Render the Roo.bootstrap object from renderder
     */
    renderCellObject : function(r)
    {
        var _this = this;
        
        r.cfg.parentId = (typeof(r.container) == 'string') ? r.container : r.container.id;
        
        var t = r.cfg.render(r.container);
        
        if(r.cfg.cn){
            Roo.each(r.cfg.cn, function(c){
                var child = {
                    container: t.getChildContainer(),
                    cfg: c
                };
                _this.renderCellObject(child);
            })
        }
    },
    /**
     * get the Row Index from a dom element.
     * @param {Roo.Element} row The row to look for
     * @returns {Number} the row
     */
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
    },
    /**
     * get the header TH element for columnIndex
     * @param {Number} columnIndex
     * @returns {Roo.Element}
     */
    getHeaderIndex: function(colIndex)
    {
        var cols = this.headEl.select('th', true).elements;
        return cols[colIndex]; 
    },
    /**
     * get the Column Index from a dom element. (using regex on x-hcol-{colid})
     * @param {domElement} cell to look for
     * @returns {Number} the column
     */
    getCellIndex : function(cell)
    {
        var id = String(cell.className).match(Roo.bootstrap.Table.cellRE);
        if(id){
            return parseInt(id[1], 10);
        }
        return 0;
    },
     /**
     * Returns the grid's underlying element = used by panel.Grid
     * @return {Element} The element
     */
    getGridEl : function(){
        return this.el;
    },
     /**
     * Forces a resize - used by panel.Grid
     * @return {Element} The element
     */
    autoSize : function()
    {
        if(this.disableAutoSize) {
            return;
        }
        //var ctr = Roo.get(this.container.dom.parentElement);
        var ctr = Roo.get(this.el.dom);
        
        var thd = this.getGridEl().select('thead',true).first();
        var tbd = this.getGridEl().select('tbody', true).first();
        var tfd = this.getGridEl().select('tfoot', true).first();
        
        var cw = ctr.getWidth();
        this.getGridEl().select('tfoot tr, tfoot  td',true).setWidth(cw);
        
        if (tbd) {
            
            tbd.setWidth(ctr.getWidth());
            // if the body has a max height - and then scrolls - we should perhaps set up the height here
            // this needs fixing for various usage - currently only hydra job advers I think..
            //tdb.setHeight(
            //        ctr.getHeight() - ((thd ? thd.getHeight() : 0) + (tfd ? tfd.getHeight() : 0))
            //); 
            var barsize = (tbd.dom.offsetWidth - tbd.dom.clientWidth);
            cw -= barsize;
        }
        cw = Math.max(cw, this.totalWidth);
        this.getGridEl().select('tbody tr',true).setWidth(cw);
        this.initCSS();
        
        // resize 'expandable coloumn?
        
        return; // we doe not have a view in this design..
        
    },
    onBodyScroll: function()
    {
        //Roo.log("body scrolled');" + this.bodyEl.dom.scrollLeft);
        if(this.headEl){
            this.headEl.setStyle({
                'position' : 'relative',
                'left': (-1* this.bodyEl.dom.scrollLeft) + 'px'
            });
        }
        
        if(this.lazyLoad){
            
            var scrollHeight = this.bodyEl.dom.scrollHeight;
            
            var scrollTop = Math.ceil(this.bodyEl.getScroll().top);
            
            var height = this.bodyEl.getHeight();
            
            if(scrollHeight - height == scrollTop) {
                
                var total = this.ds.getTotalCount();
                
                if(this.footer.cursor + this.footer.pageSize < total){
                    
                    this.footer.ds.load({
                        params : {
                            start : this.footer.cursor + this.footer.pageSize,
                            limit : this.footer.pageSize
                        },
                        add : true
                    });
                }
            }
            
        }
    },
    onColumnSplitterMoved : function(i, diff)
    {
        this.userResized = true;
        
        var cm = this.colModel;
        
        var w = this.getHeaderIndex(i).getWidth() + diff;
        
        
        cm.setColumnWidth(i, w, true);
        this.initCSS();
        //var cid = cm.getColumnId(i); << not used in this version?
       /* Roo.log(['#' + this.id + ' .x-col-' + i, "width", w + "px"]);
        
        this.CSS.updateRule( '#' + this.id + ' .x-col-' + i, "width", w + "px");
        this.CSS.updateRule('#' + this.id + ' .x-hcol-' + i, "width", w + "px");
        this.CSS.updateRule('#' + this.id + ' .x-grid-split-' + i, "left", w + "px");
*/
        //this.updateSplitters();
        //this.layout(); << ??
        this.fireEvent("columnresize", i, w);
    },
    onHeaderChange : function()
    {
        var header = this.renderHeader();
        var table = this.el.select('table', true).first();
        
        this.headEl.remove();
        this.headEl = table.createChild(header, this.bodyEl, false);
        
        Roo.each(this.el.select('thead th.sortable', true).elements, function(e){
            e.on('click', this.sort, this);
        }, this);
        
        if(this.enableColumnResize !== false && Roo.grid.SplitDragZone){
            new Roo.grid.SplitDragZone(this, this.headEl.dom, false); // not sure what 'lockedHd is for this implementation..)
        }
        
    },
    
    onHiddenChange : function(colModel, colIndex, hidden)
    {
        /*
        this.cm.setHidden()
        var thSelector = '#' + this.id + ' .x-hcol-' + colIndex;
        var tdSelector = '#' + this.id + ' .x-col-' + colIndex;
        
        this.CSS.updateRule(thSelector, "display", "");
        this.CSS.updateRule(tdSelector, "display", "");
        
        if(hidden){
            this.CSS.updateRule(thSelector, "display", "none");
            this.CSS.updateRule(tdSelector, "display", "none");
        }
        */
        // onload calls initCSS()
        this.onHeaderChange();
        this.onLoad();
    },
    
    setColumnWidth: function(col_index, width)
    {
        // width = "md-2 xs-2..."
        if(!this.colModel.config[col_index]) {
            return;
        }
        
        var w = width.split(" ");
        
        var rows = this.el.dom.getElementsByClassName("x-col-"+col_index);
        
        var h_row = this.el.dom.getElementsByClassName("x-hcol-"+col_index);
        
        
        for(var j = 0; j < w.length; j++) {
            
            if(!w[j]) {
                continue;
            }
            
            var size_cls = w[j].split("-");
            
            if(!Number.isInteger(size_cls[1] * 1)) {
                continue;
            }
            
            if(!this.colModel.config[col_index][size_cls[0]]) {
                continue;
            }
            
            if(!h_row[0].classList.contains("col-"+size_cls[0]+"-"+this.colModel.config[col_index][size_cls[0]])) {
                continue;
            }
            
            h_row[0].classList.replace(
                "col-"+size_cls[0]+"-"+this.colModel.config[col_index][size_cls[0]],
                "col-"+size_cls[0]+"-"+size_cls[1]
            );
            
            for(var i = 0; i < rows.length; i++) {
                
                var size_cls = w[j].split("-");
                
                if(!Number.isInteger(size_cls[1] * 1)) {
                    continue;
                }
                
                if(!this.colModel.config[col_index][size_cls[0]]) {
                    continue;
                }
                
                if(!rows[i].classList.contains("col-"+size_cls[0]+"-"+this.colModel.config[col_index][size_cls[0]])) {
                    continue;
                }
                
                rows[i].classList.replace(
                    "col-"+size_cls[0]+"-"+this.colModel.config[col_index][size_cls[0]],
                    "col-"+size_cls[0]+"-"+size_cls[1]
                );
            }
            
            this.colModel.config[col_index][size_cls[0]] = size_cls[1];
        }
    }
});

// currently only used to find the split on drag.. 
Roo.bootstrap.Table.cellRE = /(?:.*?)x-grid-(?:hd|cell|split)-([\d]+)(?:.*?)/;

/**
 * @depricated
*/
Roo.bootstrap.Table.AbstractSelectionModel = Roo.grid.AbstractSelectionModel;
Roo.bootstrap.Table.RowSelectionModel = Roo.grid.RowSelectionModel;
