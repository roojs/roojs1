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
 * @class Roo.bootstrap.PagingToolbar
 * @extends Roo.Row
 * A specialized toolbar that is bound to a {@link Roo.data.Store} and provides automatic paging controls.
 * @constructor
 * Create a new PagingToolbar
 * @param {Object} config The config object
 */
Roo.bootstrap.PagingToolbar = function(config)
{
    // old args format still supported... - xtype is prefered..
        // created from xtype...
    var ds = config.dataSource;
    
    this.toolbarItems = [];
    if (config.items) {
        this.toolbarItems = config.items;
//        config.items = [];
    }
    
    Roo.bootstrap.PagingToolbar.superclass.constructor.call(this, config);
    this.ds = ds;
    this.cursor = 0;
    if (ds) { 
        this.bind(ds);
    }
    
    this.navgroup = new Roo.bootstrap.NavGroup({ cls: 'pagination' });
    
};

Roo.extend(Roo.bootstrap.PagingToolbar, Roo.bootstrap.NavSimplebar, {
    /**
     * @cfg {Roo.data.Store} dataSource
     * The underlying data store providing the paged data
     */
    /**
     * @cfg {String/HTMLElement/Element} container
     * container The id or element that will contain the toolbar
     */
    /**
     * @cfg {Boolean} displayInfo
     * True to display the displayMsg (defaults to false)
     */
    /**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to 20)
     */
    pageSize: 20,
    /**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to "Displaying {start} - {end} of {total}")
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to "No data to display")
     */
    emptyMsg : 'No data to display',
    /**
     * Customizable piece of the default paging text (defaults to "Page")
     * @type String
     */
    beforePageText : "Page",
    /**
     * Customizable piece of the default paging text (defaults to "of %0")
     * @type String
     */
    afterPageText : "of {0}",
    /**
     * Customizable piece of the default paging text (defaults to "First Page")
     * @type String
     */
    firstText : "First Page",
    /**
     * Customizable piece of the default paging text (defaults to "Previous Page")
     * @type String
     */
    prevText : "Previous Page",
    /**
     * Customizable piece of the default paging text (defaults to "Next Page")
     * @type String
     */
    nextText : "Next Page",
    /**
     * Customizable piece of the default paging text (defaults to "Last Page")
     * @type String
     */
    lastText : "Last Page",
    /**
     * Customizable piece of the default paging text (defaults to "Refresh")
     * @type String
     */
    refreshText : "Refresh",

    // private
    onRender : function(ct, position) 
    {   
        Roo.bootstrap.PagingToolbar.superclass.onRender.call(this, ct, position);
        this.navgroup.parentId = this.id;
        this.navgroup.onRender(this.el, null);
        // add the buttons to the navgroup
        
        if(this.displayInfo){
            Roo.log(this.el.select('ul.navbar-nav',true).first());
            this.el.select('ul.navbar-nav',true).first().createChild({cls:'x-paging-info'});
            this.displayEl = this.el.select('.x-paging-info', true).first();
//            var navel = this.navgroup.addItem( { tagtype : 'span', html : '', cls : 'x-paging-info', preventDefault : true } );
//            this.displayEl = navel.el.select('span',true).first();
        }
        
        var _this = this;
        
        Roo.each(_this.toolbarItems, function(e) {
            _this.navgroup.addItem(e);
        });
        
        this.first = this.navgroup.addItem({
            tooltip: this.firstText,
            cls: "prev",
            icon : 'fa fa-backward',
            disabled: true,
            listeners : { click : this.onClick.createDelegate(this, ["first"]) }
        });
        
        this.prev =  this.navgroup.addItem({
            tooltip: this.prevText,
            cls: "prev",
            icon : 'fa fa-step-backward',
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["prev"]) }
        });
    //this.addSeparator();
        
        
        var field = this.navgroup.addItem( {
            tagtype : 'span',
            cls : 'x-paging-position',
            
            html : this.beforePageText  +
                '<input type="text" size="3" value="1" class="x-grid-page-number">' +
                '<span class="x-paging-after">' +  String.format(this.afterPageText, 1) + '</span>'
         } ); //?? escaped?
        
        this.field = field.el.select('input', true).first();
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
    
    
        this.afterTextEl =  field.el.select('.x-paging-after',true).first();
        //this.field.setHeight(18);
        //this.addSeparator();
        this.next = this.navgroup.addItem({
            tooltip: this.nextText,
            cls: "next",
            html : ' <i class="fa fa-step-forward">',
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["next"]) }
        });
        this.last = this.navgroup.addItem({
            tooltip: this.lastText,
            icon : 'fa fa-forward',
            cls: "next",
            disabled: true,
            listeners : { click :  this.onClick.createDelegate(this, ["last"]) }
        });
    //this.addSeparator();
        this.loading = this.navgroup.addItem({
            tooltip: this.refreshText,
            icon: 'fa fa-refresh',
            
            listeners : { click : this.onClick.createDelegate(this, ["refresh"]) }
        });

    },

    // private
    updateInfo : function(){
        if(this.displayEl){
            var count = this.ds.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.ds.getTotalCount()    
                );
            this.displayEl.update(msg);
        }
    },

    // private
    onLoad : function(ds, r, o){
       this.cursor = o.params ? o.params.start : 0;
       var d = this.getPageData(),
            ap = d.activePage,
            ps = d.pages;
        
       this.afterTextEl.dom.innerHTML = String.format(this.afterPageText, d.pages);
       this.field.dom.value = ap;
       this.first.setDisabled(ap == 1);
       this.prev.setDisabled(ap == 1);
       this.next.setDisabled(ap == ps);
       this.last.setDisabled(ap == ps);
       this.loading.enable();
       this.updateInfo();
    },

    // private
    getPageData : function(){
        var total = this.ds.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    // private
    onLoadError : function(){
        this.loading.enable();
    },

    // private
    onPagingKeydown : function(e){
        var k = e.getKey();
        var d = this.getPageData();
        if(k == e.RETURN){
            var v = this.field.dom.value, pageNum;
            if(!v || isNaN(pageNum = parseInt(v, 10))){
                this.field.dom.value = d.activePage;
                return;
            }
            pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
            e.stopEvent();
        }
        else if(k == e.HOME || (k == e.UP && e.ctrlKey) || (k == e.PAGEUP && e.ctrlKey) || (k == e.RIGHT && e.ctrlKey) || k == e.END || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey))
        {
          var pageNum = (k == e.HOME || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey)) ? 1 : d.pages;
          this.field.dom.value = pageNum;
          this.ds.load({params:{start: (pageNum - 1) * this.pageSize, limit: this.pageSize}});
          e.stopEvent();
        }
        else if(k == e.UP || k == e.RIGHT || k == e.PAGEUP || k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
        {
          var v = this.field.dom.value, pageNum; 
          var increment = (e.shiftKey) ? 10 : 1;
          if(k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
            increment *= -1;
          if(!v || isNaN(pageNum = parseInt(v, 10))) {
            this.field.dom.value = d.activePage;
            return;
          }
          else if(parseInt(v, 10) + increment >= 1 & parseInt(v, 10) + increment <= d.pages)
          {
            this.field.dom.value = parseInt(v, 10) + increment;
            pageNum = Math.min(Math.max(1, pageNum + increment), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
          }
          e.stopEvent();
        }
    },

    // private
    beforeLoad : function(){
        if(this.loading){
            this.loading.disable();
        }
    },

    // private
    onClick : function(which){
        var ds = this.ds;
        if (!ds) {
            return;
        }
        switch(which){
            case "first":
                ds.load({params:{start: 0, limit: this.pageSize}});
            break;
            case "prev":
                ds.load({params:{start: Math.max(0, this.cursor-this.pageSize), limit: this.pageSize}});
            break;
            case "next":
                ds.load({params:{start: this.cursor+this.pageSize, limit: this.pageSize}});
            break;
            case "last":
                var total = ds.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                ds.load({params:{start: lastStart, limit: this.pageSize}});
            break;
            case "refresh":
                ds.load({params:{start: this.cursor, limit: this.pageSize}});
            break;
        }
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to unbind
     */
    unbind : function(ds){
        ds.un("beforeload", this.beforeLoad, this);
        ds.un("load", this.onLoad, this);
        ds.un("loadexception", this.onLoadError, this);
        ds.un("remove", this.updateInfo, this);
        ds.un("add", this.updateInfo, this);
        this.ds = undefined;
    },

    /**
     * Binds the paging toolbar to the specified {@link Roo.data.Store}
     * @param {Roo.data.Store} store The data store to bind
     */
    bind : function(ds){
        ds.on("beforeload", this.beforeLoad, this);
        ds.on("load", this.onLoad, this);
        ds.on("loadexception", this.onLoadError, this);
        ds.on("remove", this.updateInfo, this);
        ds.on("add", this.updateInfo, this);
        this.ds = ds;
    }
});