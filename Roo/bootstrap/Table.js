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
 * 
 * @cfg {boolean} striped Should the rows be alternative striped
 * @cfg {boolean} bordered Add borders to the table
 * @cfg {boolean} hover Add hover highlighting
 * @cfg {boolean} condensed Format condensed
 * @cfg {boolean} responsive Format condensed
 *
 
 
 * 
 * @constructor
 * Create a new Table
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
    
    if (this.sm) {
        this.selModel = Roo.factory(this.sm, Roo.bootstrap.Table);
        this.sm = this.selModel;
        this.sm.xmodule = this.xmodule || false;
    }
    if (this.cm && typeof(this.cm.config) == 'undefined') {
        this.colModel = new Roo.bootstrap.Table.ColumnModel(this.cm);
        this.cm = this.colModel;
        this.cm.xmodule = this.xmodule || false;
    }
    if (this.store) {
        this.store= Roo.factory(this.store, Roo.data);
        this.ds = this.store;
        this.ds.xmodule = this.xmodule || false;
         
    }
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
        
        if(this.store || this.cm){
            cfg.cn.push(this.renderHeader());
            cfg.cn.push(this.renderBody());
            cfg.cn.push(this.renderFooter());
            
            cfg.cls+=  ' TableGrid';
        }
        
        return cfg;
    },
//    
//    initTableGrid : function()
//    {
//        var cfg = {};
//        
//        var header = {
//            tag: 'thead',
//            cn : []
//        };
//        
//        var cm = this.cm;
//        
//        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
//            header.cn.push({
//                tag: 'th',
//                html: cm.getColumnHeader(i)
//            })
//        }
//        
//        cfg.push(header);
//        
//        return cfg;
//        
//        
//    },
    
    initEvents : function()
    {   
        if(!this.store || !this.cm){
            return;
        }
        
        Roo.log('initEvents with ds!!!!');
        
//        this.maskEl = Roo.DomHelper.append(this.el.select('.TableGrid', true).first(), {tag: "div", cls:"x-dlg-mask"}, true);
//        this.maskEl.enableDisplayMode("block");
//        this.maskEl.show();
        
        this.store.on('load', this.onLoad, this);
        this.store.on('beforeload', this.onBeforeLoad, this);
        
        this.store.load();
        
        
        
    },
    
    renderHeader : function()
    {
        var header = {
            tag: 'thead',
            cn : []
        };
        
        var cm = this.cm;
        
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            header.cn.push({
                tag: 'th',
                html: cm.getColumnHeader(i)
            })
        }
        
        return header;
    },
    
    renderBody : function()
    {
        var body = {
            tag: 'tbody',
            cn : []
        };
        
        return body;
    },
    
    renderFooter : function()
    {
        var footer = {
            tag: 'tfoot',
            cn : []
        };
        
        return footer;
    },
    
    onLoad : function()
    {
        Roo.log('ds onload');
        
        var _this = this;
        var tbody = this.el.select('tbody', true).first();
        if(this.store.getCount() > 0){
            this.store.data.each(function(d){
                var row = {
                    tag : 'tr',
                    cn : []
                }
                
                tbody.createChild(row);
                
                
            });
        }
        
        
        if(this.loadMask){
            this.maskEl.hide();
        }
    },
    
    onBeforeLoad : function()
    {
        Roo.log('ds onBeforeLoad');
        
        this.clear();
        
        if(this.loadMask){
            this.maskEl.show();
        }
    },
    
    clear : function()
    {
        this.el.select('tbody', true).first().dom.innerHTML = '';
    }
   
});

 

 