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
   
   
    list : null, // the outermost div..
    innerLists : null, // the
    views : null,
    stores : null,
    // private
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
        for (var i =0 ; i < 3; i++) {
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
                ((this.listWidth * 3 || Math.max(this.wrap.getWidth(), this.minListWidth)) - this.list.getFrameWidth('lr')) / 3
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
                    var dl = typeof(value.data) != 'undefined' ? value.data.total : value.length; ///json is a nested response..
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
        view.on('selectionchange', this.onSelectChange, this, {list : i });
        view.on('dblclick', this.onDoubleClick, this, {list : i });
        //view.on('click', this.onViewClick, this, { list : i });

        store.on('beforeload', this.onBeforeLoad, this);
        store.on('load',  this.onLoad, this, { list  : i});
        store.on('loadexception', this.onLoadException, this);

        // hide the other vies..
        
        
        
    },
    onResize : function()  {},
    
    restrictHeight : function()
    {
        var mh = 0;
        Roo.each(this.innerLists, function(il,i) {
            var el = this.views[i].getEl();
            el.dom.style.height = '';
            var inner = el.dom;
            var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
            // only adjust heights on other ones..
            if (i < 1) {
                
                el.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
                il.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
                mh = Math.max(el.getHeight(), mh);
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
        
        if(!this.hasFocus){
            return;
        }
        
        if(this.store.getCount() > 0) {
            this.expand();
            this.restrictHeight();   
        } else {
            this.onEmptyResults();
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
        
        
    } ,
     
     

    onSelectChange : function (view, sels, opts )
    {
        var ix = view.getSelectedIndexes();
        
        
        if (opts.list > 1) {
             
            this.setFromData(ix.length ? view.store.getAt(ix[0]).data : {});
            return;
        }
        
        if (!ix.length) {
            this.setFromData({});
            this.stores[opts.list+1].loadData( [] );
            return;
        }
        
        var rec = view.store.getAt(ix[0]);
        this.setFromData(rec.data);
        
        var lw = Math.floor(
                ((this.listWidth * 3 || Math.max(this.wrap.getWidth(), this.minListWidth)) - this.list.getFrameWidth('lr')) / 3
        );
        var data =  typeof(rec.data.cn) == 'undefined' ? [] : rec.data.cn;
        var dl = typeof(data.data.cn) != 'undefined' ? data.data.total : data.length; ///json is a nested response..
        this.stores[opts.list+1].loadData( data );
        this.views[opts.list+1].getEl().setHeight( this.innerLists[0].getHeight());
        this.views[opts.list+1].getEl().setStyle({ display : dl ? 'block' : 'none' });
        this.innerLists[opts.list+1].setHeight( this.innerLists[0].getHeight());
        this.list.setWidth(lw * (opts.list + (dl ? 2 : 1))); 
    },
    onDoubleClick : function()
    {
        this.collapse(); //??
    },
    
     
    
    findRecord : function (prop,value)
    {
        return this.findRecordInStore(this.store, prop,value);
    },
    
     // private
    findRecordInStore : function(store, prop, value)
    {
        var cstore = new Roo.data.SimpleStore({
            //fields : this.store.reader.meta.fields, // we need array reader.. for
            reader : this.store.reader,
            data : [ ]
        });
        var _this = this;
        var record  = false;
        if(store.getCount() > 0){
           store.each(function(r){
                if(r.data[prop] == value){
                    record = r;
                    return false;
                }
                if (r.data.cn && r.data.cn.length) {
                    cstore.loadData( r.data.cn);
                    var cret = _this.findRecordInStore(cstore, prop, value);
                    if (cret !== false) {
                        record = cret;
                        return false;
                    }
                }
                
                return true;
            });
        }
        return record;
    }
    
    
    
    
});