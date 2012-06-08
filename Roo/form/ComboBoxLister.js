//<script type="text/javascript">
/**
 * 
 * A facebook style adder... for lists of email / people etc...
 * 
 * 
 * 
 */


Ext.form.ComboBoxLister = function(config){
    
    Ext.form.ComboBoxLister.superclass.constructor.call(this, config);
    this.items = new Roo.util.MixedCollection(false);
    this.on('select', function(cb, rec, ix) {
        this.addItem(rec.data);
        this.setValue('');
        this.el.dom.value = '';
        //cb.lastData = rec.data;
        // add to list
        
    });
    
}
 
Ext.extend(Ext.form.ComboBoxLister, Ext.form.ComboBox, { 
    lastData : false,
    items  : false,
    nameField : 'name',
    tipField : 'email',
    idField : 'id',
    renderer : false,
    hiddenName : false, // set this if you want a , sperated list of values in it for form posting..
    hiddenListName : false,
    hiddenEl : false,
    boxWidth : 200, // use to set the box around the entry..
    allowBlank: true,
    disableClear: true,
    //validateValue : function() { return true; }, // all values are ok!
    //onAddClick: function() { },
    
    onRender : function(ct, position) 
    {
         
        Ext.form.ComboBoxLister.superclass.onRender.call(this, ct, position); 
        this.wrap.addClass('p-cblist-grp');
        var cbwrap = this.wrap.createChild(
            {tag: 'div', cls: 'p-cblist-cb'},
            this.el.dom
        );  
        if (this.hiddenListName) {
             
            this.hiddenEl = this.wrap.createChild({
                tag: 'input',  type:'hidden' , name: this.hiddenListName, value : ''
            });
         //   this.el.dom.removeAttribute("name");
        }
        
        this.outerWrap = this.wrap;
        this.wrap = cbwrap;
        this.outerWrap.setWidth(this.boxWidth);
        this.outerWrap.dom.removeChild(this.el.dom);
        this.wrap.dom.appendChild(this.el.dom);
        this.outerWrap.dom.removeChild(this.trigger.dom);
        this.wrap.dom.appendChild(this.trigger.dom);
         
        this.trigger.setStyle('position','relative');
        this.trigger.setStyle('left', '0px');
        this.trigger.setStyle('top', '2px');
        this.el.setStyle('vertical-align', 'text-bottom');
        
        //this.trigger.setStyle('vertical-align', 'top');
        if (this.adder) {
            
        
            this.adder = this.outerWrap.createChild(
                {tag: 'img', src: Ext.BLANK_IMAGE_URL, cls: 'x-form-adder', style: 'margin-left:2px'});  
            var _t = this;
            this.adder.on('click', function(e) {
                _t.fireEvent('adderclick', this, e);
            }, _t);
        }
        //var _t = this;
        //this.adder.on('click', this.onAddClick, _t);
        
    },
    
    
    onResize: function(w, h){
        Roo.form.ComboBox.superclass.onResize.apply(this, arguments);
        
        if(typeof w != 'number'){
            // we do not handle it!?!?
            return;
        }
        var tw = this.trigger.getWidth();
        tw += this.addicon ? this.addicon.getWidth() : 0;
        tw += this.editicon ? this.editicon.getWidth() : 0;
        var x = w - tw;
        this.el.setWidth( this.adjustWidth('input', x));
            
        this.trigger.setStyle('left', '0px');
        
        if(this.list && this.listWidth === undefined){
            var lw = Math.max(x + this.trigger.getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
        
    
        
    },
    
    addItem: function(rec)
    {
        if (this.items.indexOfKey(rec[this.idField]) > -1) {
            //console.log("GOT " + rec.data.id);
            return;
        }
        
        var x = new Ext.form.ComboBoxLister.Item({
            //id : rec[this.idField],
            data : rec,
            nameField : this.nameField,
            tipField : this.tipField,
            cb : this
        });
        // use the 
        this.items.add(rec[this.idField],x);
        // add it before the element..
        this.updateHiddenEl();
        x.render(this.outerWrap, this.wrap.dom);
        // add the image handler..
    },
    
    updateHiddenEl : function()
    {
        this.validate();
        if (!this.hiddenEl) {
            return;
        }
        var ar = [];
        var idField = this.idField;
        this.items.each(function(f) {
            ar.push(f.data[idField]);
           
        });
        this.hiddenEl.dom.value = ar.join(',');
        this.validate();
    },
    
    reset : function()
    {
        Roo.form.ComboBoxLister.superclass.reset.call(this); 
        this.items.each(function(f) {
           f.remove(); 
        });
        if (this.hiddenEl) {
            this.hiddenEl.dom.value = '';
        }
        
    },
    getValue: function()
    {
        return this.hiddenEl ? this.hiddenEl.dom.value : '';
    },
    setValue: function(v) // not a valid action - must use addItems..
    {
        if (typeof(v) != 'object') {
            return;
        }
        var _this = this;
        Roo.each(v, function(l) {
            _this.addItem(l);
        });
        
    },
    validateValue : function(value){
        return Roo.form.ComboBoxLister.superclass.validateValue.call(this, this.getValue());
        
    }
    
});

Ext.form.ComboBoxLister.Item = function(config) {
    config.id = Roo.id();
    Roo.form.ComboBoxLister.Item.superclass.constructor.call(this, config);
}
Roo.extend(Roo.form.ComboBoxLister.Item, Roo.BoxComponent, {
    data : {},
    cb: false,
    defaultAutoCreate : {tag: 'div', cls: 'p-cblist-item', cn : [ 
            { tag: 'div' },
            { tag: 'img', width:16, height : 16, src : Roo.BLANK_IMAGE_URL , align: 'center' }
        ]
        
    },
    
 
    onRender : function(ct, position){
        Roo.form.Field.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = this.getAutoCreate();
            this.el = ct.createChild(cfg, position);
        }
        this.el.child('img').dom.setAttribute('src', Roo.BLANK_IMAGE_URL);
        
        this.el.child('div').dom.innerHTML = this.cb.renderer ? 
            this.cb.renderer(this.data) : String.format('{0}',this.data[this.nameField]);
        this.el.child('div').dom.setAttribute('qtip', String.format('{0}',this.data[this.tipField]));
        
        this.el.child('img').on('click', this.remove, this);
        
    },
   
    remove : function()
    {
        
        this.cb.items.remove(this);
        this.el.child('img').un('click', this.remove, this);
        this.el.remove();
        this.cb.updateHiddenEl();
    }
    
    
});