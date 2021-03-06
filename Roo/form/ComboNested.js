/*
 * RooJS Library 1.1.1
 * Copyright(c) 2008-2011  Alan Knowles
 *
 * License - LGPL
 */
 

/**
 * @class Roo.form.ComboNested
 * @extends Roo.form.ComboBox
 * A combobox for that allows selection of nested items in a list,
 * eg.
 *
 *  Book
 *    -> red
 *    -> green
 *  Table
 *    -> square
 *      ->red
 *      ->green
 *    -> rectangle
 *      ->green
 *      
 * 
 * @constructor
 * Create a new ComboNested
 * @param {Object} config Configuration options
 */
Roo.form.ComboNested = function(config){
    Roo.form.ComboCheck.superclass.constructor.call(this, config);
    // should verify some data...
    // like
    // hiddenName = required..
    // displayField = required
    // valudField == required
    var req= [ 'hiddenName', 'displayField', 'valueField' ];
    var _t = this;
    Roo.each(req, function(e) {
        if ((typeof(_t[e]) == 'undefined' ) || !_t[e].length) {
            throw "Roo.form.ComboNested : missing value for: " + e;
        }
    });
     
    
};

Roo.extend(Roo.form.ComboNested, Roo.form.ComboBox, {
   
    /*
     * @config {Number} max Number of columns to show
     */
    
    maxColumns : 3,
   
    list : null, // the outermost div..
    innerLists : null, // the
    views : null,
    stores : null,
    // private
    loadingChildren : false,
    
    onRender : function(ct, position)
    {
        Roo.form.ComboBox.superclass.onRender.call(this, ct, position); // skip parent call - got to above..
        
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id:  (this.hiddenId||this.hiddenName)},
                    'before', true);
            this.hiddenField.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
             
             
        }
	
        if(Roo.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        var cls = 'x-combo-list';

        this.list = new Roo.Layer({
            shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        });

        var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        this.list.swallowEvent('mousewheel');
        this.assetHeight = 0;

        if(this.title){
            this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
            this.assetHeight += this.header.getHeight();
        }
        this.innerLists = [];
        this.views = [];
        this.stores = [];
        for (var i =0 ; i < this.maxColumns; i++) {
            this.onRenderList( cls, i);
        }
        
        // always needs footer, as we are going to have an 'OK' button.
        this.footer = this.list.createChild({cls:cls+'-ft'});
        this.pageTb = new Roo.Toolbar(this.footer);  
        var _this = this;
        this.pageTb.add(  {
            
            text: 'Done',
            handler: function()
            {
                _this.collapse();
            }
        });
        
        if ( this.allowBlank && !this.disableClear) {
            
            this.pageTb.add(new Roo.Toolbar.Fill(), {
                cls: 'x-btn-icon x-btn-clear',
                text: '&#160;',
                handler: function()
                {
                    _this.collapse();
                    _this.clearValue();
                    _this.onSelect(false, -1);
                }
            });
        }
        if (this.footer) {
            this.assetHeight += this.footer.getHeight();
        }
        
    },
    onRenderList : function (  cls, i)
    {
        
        var lw = Math.floor(
                ((this.listWidth * this.maxColumns || Math.max(this.wrap.getWidth(), this.minListWidth)) - this.list.getFrameWidth('lr')) / this.maxColumns
        );
        
        this.list.setWidth(lw); // default to '1'

        var il = this.innerLists[i] = this.list.createChild({cls:cls+'-inner'});
        //il.on('mouseover', this.onViewOver, this, { list:  i });
        //il.on('mousemove', this.onViewMove, this, { list:  i });
        il.setWidth(lw);
        il.setStyle({ 'overflow-x' : 'hidden'});

        if(!this.tpl){
            this.tpl = new Roo.Template({
                html :  '<div class="'+cls+'-item '+cls+'-item-{cn:this.isEmpty}">{' + this.displayField + '}</div>',
                isEmpty: function (value, allValues) {
                    //Roo.log(value);
                    var dl = typeof(value.data) != 'undefined' ? value.data.length : value.length; ///json is a nested response..
                    return dl ? 'has-children' : 'no-children'
                }
            });
        }
        
        var store  = this.store;
        if (i > 0) {
            store  = new Roo.data.SimpleStore({
                //fields : this.store.reader.meta.fields,
                reader : this.store.reader,
                data : [ ]
            });
        }
        this.stores[i]  = store;
                  
        var view = this.views[i] = new Roo.View(
            il,
            this.tpl,
            {
                singleSelect:true,
                store: store,
                selectedClass: this.selectedClass
            }
        );
        view.getEl().setWidth(lw);
        view.getEl().setStyle({
            position: i < 1 ? 'relative' : 'absolute',
            top: 0,
            left: (i * lw ) + 'px',
            display : i > 0 ? 'none' : 'block'
        });
        view.on('selectionchange', this.onSelectChange.createDelegate(this, {list : i }, true));
        view.on('dblclick', this.onDoubleClick.createDelegate(this, {list : i }, true));
        //view.on('click', this.onViewClick, this, { list : i });

        store.on('beforeload', this.onBeforeLoad, this);
        store.on('load',  this.onLoad, this, { list  : i});
        store.on('loadexception', this.onLoadException, this);

        // hide the other vies..
        
        
        
    },
      
    restrictHeight : function()
    {
        var mh = 0;
        Roo.each(this.innerLists, function(il,i) {
            var el = this.views[i].getEl();
            el.dom.style.height = '';
            var inner = el.dom;
            var h = Math.max(il.clientHeight, il.offsetHeight, il.scrollHeight);
            // only adjust heights on other ones..
            mh = Math.max(h, mh);
            if (i < 1) {
                
                el.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
                il.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
               
            }
            
            
        }, this);
        
        this.list.beginUpdate();
        this.list.setHeight(mh+this.list.getFrameWidth('tb')+this.assetHeight);
        this.list.alignTo(this.el, this.listAlign);
        this.list.endUpdate();
        
    },
     
    
    // -- store handlers..
    // private
    onBeforeLoad : function()
    {
        if(!this.hasFocus){
            return;
        }
        this.innerLists[0].update(this.loadingText ?
               '<div class="loading-indicator">'+this.loadingText+'</div>' : '');
        this.restrictHeight();
        this.selectedIndex = -1;
    },
    // private
    onLoad : function(a,b,c,d)
    {
        if (!this.loadingChildren) {
            // then we are loading the top level. - hide the children
            for (var i = 1;i < this.views.length; i++) {
                this.views[i].getEl().setStyle({ display : 'none' });
            }
            var lw = Math.floor(
                ((this.listWidth * this.maxColumns || Math.max(this.wrap.getWidth(), this.minListWidth)) - this.list.getFrameWidth('lr')) / this.maxColumns
            );
        
             this.list.setWidth(lw); // default to '1'

            
        }
        if(!this.hasFocus){
            return;
        }
        
        if(this.store.getCount() > 0) {
            this.expand();
            this.restrictHeight();   
        } else {
            this.onEmptyResults();
        }
        
        if (!this.loadingChildren) {
            this.selectActive();
        }
        /*
        this.stores[1].loadData([]);
        this.stores[2].loadData([]);
        this.views
        */    
    
        //this.el.focus();
    },
    
    
    // private
    onLoadException : function()
    {
        this.collapse();
        Roo.log(this.store.reader.jsonData);
        if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
            Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
        }
        
        
    },
    // no cleaning of leading spaces on blur here.
    cleanLeadingSpace : function(e) { },
    

    onSelectChange : function (view, sels, opts )
    {
        var ix = view.getSelectedIndexes();
         
        if (opts.list > this.maxColumns - 2) {
            if (view.store.getCount()<  1) {
                this.views[opts.list ].getEl().setStyle({ display :   'none' });

            } else  {
                if (ix.length) {
                    // used to clear ?? but if we are loading unselected 
                    this.setFromData(view.store.getAt(ix[0]).data);
                }
                
            }
            
            return;
        }
        
        if (!ix.length) {
            // this get's fired when trigger opens..
           // this.setFromData({});
            var str = this.stores[opts.list+1];
            str.data.clear(); // removeall wihtout the fire events..
            return;
        }
        
        var rec = view.store.getAt(ix[0]);
         
        this.setFromData(rec.data);
        this.fireEvent('select', this, rec, ix[0]);
        
        var lw = Math.floor(
             (
                (this.listWidth * this.maxColumns || Math.max(this.wrap.getWidth(), this.minListWidth)) - this.list.getFrameWidth('lr')
             ) / this.maxColumns
        );
        this.loadingChildren = true;
        this.stores[opts.list+1].loadDataFromChildren( rec );
        this.loadingChildren = false;
        var dl = this.stores[opts.list+1]. getTotalCount();
        
        this.views[opts.list+1].getEl().setHeight( this.innerLists[0].getHeight());
        
        this.views[opts.list+1].getEl().setStyle({ display : dl ? 'block' : 'none' });
        for (var i = opts.list+2; i < this.views.length;i++) {
            this.views[i].getEl().setStyle({ display : 'none' });
        }
        
        this.innerLists[opts.list+1].setHeight( this.innerLists[0].getHeight());
        this.list.setWidth(lw * (opts.list + (dl ? 2 : 1)));
        
        if (this.isLoading) {
           // this.selectActive(opts.list);
        }
         
    },
    
    
    
    
    onDoubleClick : function()
    {
        this.collapse(); //??
    },
    
     
    
    
    
    // private
    recordToStack : function(store, prop, value, stack)
    {
        var cstore = new Roo.data.SimpleStore({
            //fields : this.store.reader.meta.fields, // we need array reader.. for
            reader : this.store.reader,
            data : [ ]
        });
        var _this = this;
        var record  = false;
        var srec = false;
        if(store.getCount() < 1){
            return false;
        }
        store.each(function(r){
            if(r.data[prop] == value){
                record = r;
            srec = r;
                return false;
            }
            if (r.data.cn && r.data.cn.length) {
                cstore.loadDataFromChildren( r);
                var cret = _this.recordToStack(cstore, prop, value, stack);
                if (cret !== false) {
                    record = cret;
                    srec = r;
                    return false;
                }
            }
             
            return true;
        });
        if (record == false) {
            return false
        }
        stack.unshift(srec);
        return record;
    },
    
    /*
     * find the stack of stores that match our value.
     *
     * 
     */
    
    selectActive : function ()
    {
	// if store is not loaded, then we will need to wait for that to happen first.
        var stack = [];
        this.recordToStack(this.store, this.valueField, this.getValue(), stack);
        for (var i = 0; i < stack.length; i++ ) {
            this.views[i].select(stack[i].store.indexOf(stack[i]), false, false );
        }
	
    }
	
	 
    
    
    
    
});