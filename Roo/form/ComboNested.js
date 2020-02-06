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
        il.on('mouseover', this.onViewOver, this, { list:  i });
        il.on('mousemove', this.onViewMove, this, { list:  i });
        il.setWidth(lw - this.list.getFrameWidth('lr'));
        
         

        if(!this.tpl){
            this.tpl = '<div class="'+cls+'-item">{' + this.displayField + '}</div>';
        }
        
        var store  = this.store;
        if (i > 0) {
            store  = new Roo.data.SimpleStore({
                fields : [ 'key', 'value' ],
                data : [ ]
            });
        }
        this.stores[i]  = store;
                
        
        
        var view = this.views[i] = new Roo.View(il, this.tpl, {
            singleSelect:true,
            store: store,
            selectedClass: this.selectedClass
        });

        //view.on('click', this.onViewClick, this, { list : i });

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
        
        
    } ,
     
    onViewOver : function(e, t, opts)
    {
        var item = this.views[opts.list].findItemFromChild(t);
        if(item){
            var index = this.views[opts.list].indexOf(item);
            this.select(index, false);
        }
    },
    
    onViewClick : function(e, item, el, ev doFocus, opts)
    {
        Roo.log(arguments);
        var index = this.views[opts.list].getSelectedIndexes()[0];
        var r = this.stores[opts.list].getAt(index);
        if(r){
            this.onSelect(r, index);
        }
        if(doFocus !== false && !this.blockFocus){
            this.el.focus();
        }
    },

});