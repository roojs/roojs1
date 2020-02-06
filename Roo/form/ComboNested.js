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
    this.setStore(this.store, true);
    
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
        
        if(this.allowBlank && !this.disableClear){
            this.footer = this.list.createChild({cls:cls+'-ft'});
            this.pageTb = new Roo.Toolbar(this.footer);  
        }
       
        
        if (this.pageTb && this.allowBlank && !this.disableClear) {
            var _this = this;
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
        
        var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);

        var il = this.innerLists[i] = this.list.createChild({cls:cls+'-inner'});
        il.on('mouseover', this.onViewOver, this);
        il.on('mousemove', this.onViewMove, this);
        il.setWidth(lw - this.list.getFrameWidth('lr'));
        
         

        if(!this.tpl){
            this.tpl = '<div class="'+cls+'-item">{' + this.displayField + '}</div>';
        }
        
        
        var store  = this.stores[i] = new Roo.data.SimpleStore({
            fields : [ 'key', 'value' ],
            data : [ ]
        });
                
        
        
        var view = this.views[i] = new Roo.View(il, this.tpl, {
            singleSelect:true,
            store: store,
            selectedClass: this.selectedClass
        });

        view.on('click', this.onViewClick, this);

        store.on('beforeload', this.onBeforeLoad, this);
        store.on('load', this.onLoad, this);
        store.on('loadexception', this.onLoadException, this);

          
        
        
        
    },
    onResize : function()  {},
    
    restrictHeight : function()
    {
        var mh = 0;
        Roo.each(this.innerLists, function(il,i) {
            il.dom.style.height = '';
            var inner = il.dom;
            var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
            il.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
            mh = Math.max(il.getHeight(), mh);
        }, this);
        
        this.list.beginUpdate();
        this.list.setHeight(mh+this.list.getFrameWidth('tb')+this.assetHeight);
        this.list.alignTo(this.el, this.listAlign);
        this.list.endUpdate();
        
    },
    select : function(index, scrollIntoView)
    {
        
        this.selectedIndex = index;
        return;
        this.view.select(index);
        if(scrollIntoView !== false){
            var el = this.view.getNode(index);
            if(el){
                this.innerList.scrollChildIntoView(el, false);
            }
        }
    },
    
    // -- store handlers..
    
    // private
    onLoad : function(a,b,c,d)
    {
        Roo.log("onLoad");
        Roo.log([a,b,c,d]);
        if(!this.hasFocus){
            return;
        }
        
        if(this.store.getCount() > 0) {
            this.expand();
            this.restrictHeight();   
        } else {
            this.onEmptyResults();
        }
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
      /**
     * Changes the data store this view uses and refresh the view.
     * Since we are wrapping the store, we have to emulate the behaviour of the view..
     * 
     * @param {Store} store
     */
    setStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("datachanged",    this.storeRefresh);
            this.store.un("add",            this.storeOnAdd);
            this.store.un("remove",         this.storeOnRemove);
            this.store.un("update",         this.storeOnUpdate);
            this.store.un("clear",          this.storeRefresh);
            this.store.un("beforeload",     this.storeOnBeforeLoad);
            this.store.un("load",           this.storeOnLoad);
            this.store.un("loadexception",  this.storeOnLoad);
        }
        if(store){
          
            store.on("datachanged",     this.storeRefresh, this);
            store.on("add",             this.storeOnAdd, this);
            store.on("remove",          this.storeOnRemove, this);
            store.on("update",          this.storeOnUpdate, this);
            store.on("clear",           this.storeRefresh, this);
            store.on("beforeload",      this.storeOnBeforeLoad, this);
            store.on("load",            this.storeOnLoad, this);
            store.on("loadexception",   this.storeOnLoad, this);
        }
        
        if(store){
            this.storeRefresh();
        }
    },
    
    storeRefresh : function()
    {
        var records = this.store.getRange();
        if(records.length < 1) {
            Roo.each(this.stores, function(st) {
                st.clear();
            });
            return;
        }
        
        for(var i = 0, len = records.length; i < len; i++){
            var data = this.prepareData(records[i].data, i, records[i]);
            this.fireEvent("preparedata", this, data, i, records[i]);
            
            var d = Roo.apply({}, data);
            
            if(this.tickable){
                Roo.apply(d, {'roo-id' : Roo.id()});
                
                var _this = this;
            
                Roo.each(this.parent.item, function(item){
                    if(item[_this.parent.valueField] != data[_this.parent.valueField]){
                        return;
                    }
                    Roo.apply(d, {'roo-data-checked' : 'checked'});
                });
            }
            
            html[html.length] = Roo.util.Format.trim(
                this.dataName ?
                    t.applySubtemplate(this.dataName, d, this.store.meta) :
                    t.apply(d)
            );
        }
        
        
        
        el.update(html.join(""));
        this.nodes = el.dom.childNodes;
        this.updateIndexes(0);
        
        
        
        Roo.each(this.stores, function(st) {
            st.fireEvent('datachanged');
        });
    },
    storeOnAdd: function(ds, records, index)
    {
        //Roo.log(['on Add', ds, records, index] );        
        this.clearSelections();
        if(this.nodes.length == 0){
            this.refresh();
            return;
        }
        var n = this.nodes[index];
        for(var i = 0, len = records.length; i < len; i++){
            var d = this.prepareData(records[i].data, i, records[i]);
            if(n){
                this.tpl.insertBefore(n, d);
            }else{
                
                this.tpl.append(this.el, d);
            }
        }
        this.updateIndexes(index);
    },
    
    storeOnRemove: function() {
        
    },
    storeOnUpdate: function() {
        
    },
    storeOnBeforeLoad: function() {
        
    },
    storeOnLoad: function() {
        
    },
    
    
    
    
    
});