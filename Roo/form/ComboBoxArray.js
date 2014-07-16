/*
 * Copyright(c) 2010-2012, Roo J Solutions Limited
 *
 * Licence LGPL
 *
 */

/**
 * @class Roo.form.ComboBoxArray
 * @extends Roo.form.TextField
 * A facebook style adder... for lists of email / people / countries  etc...
 * pick multiple items from a combo box, and shows each one.
 *
 *  Fred [x]  Brian [x]  [Pick another |v]
 *
 *
 *  For this to work: it needs various extra information
 *    - normal combo problay has
 *      name, hiddenName
 *    + displayField, valueField
 *
 *    For our purpose...
 *
 *
 *   If we change from 'extends' to wrapping...
 *   
 *  
 *
 
 
 * @constructor
 * Create a new ComboBoxArray.
 * @param {Object} config Configuration options
 */
 

Roo.form.ComboBoxArray = function(config)
{
    this.addEvents({
        /**
         * @event remove
         * Fires when remove the value from the list
	     * @param {Roo.form.ComboBox} combo This combo box
	     */
        'remove' : true
        
        
    });
    
    Roo.form.ComboBoxArray.superclass.constructor.call(this, config);
    
    this.items = new Roo.util.MixedCollection(false);
    
    // construct the child combo...
    
    
    
    
   
    
}

 
Roo.extend(Roo.form.ComboBoxArray, Roo.form.TextField,
{ 
    /**
     * @cfg {Roo.form.Combo} combo The combo box that is wrapped
     */
    
    lastData : false,
    
    // behavies liek a hiddne field
    inputType:      'hidden',
    /**
     * @cfg {Number} width The width of the box that displays the selected element
     */ 
    width:          300,

    
    
    /**
     * @cfg {String} name    The name of the visable items on this form (eg. titles not ids)
     */
    name : false,
    /**
     * @cfg {String} hiddenName    The hidden name of the field, often contains an comma seperated list of names
     */
    hiddenName : false,
    
    
    // private the array of items that are displayed..
    items  : false,
    // private - the hidden field el.
    hiddenEl : false,
    // private - the filed el..
    el : false,
    
    //validateValue : function() { return true; }, // all values are ok!
    //onAddClick: function() { },
    
    onRender : function(ct, position) 
    {
        
        // create the standard hidden element
        //Roo.form.ComboBoxArray.superclass.onRender.call(this, ct, position);
        
        
        // give fake names to child combo;
        this.combo.hiddenName = this.hiddenName ? (this.hiddenName+'-subcombo') : this.hiddenName;
        this.combo.name = this.name? (this.name+'-subcombo') : this.name;
        
        this.combo = Roo.factory(this.combo, Roo.form);
        this.combo.onRender(ct, position);
        if (typeof(this.combo.width) != 'undefined') {
            this.combo.onResize(this.combo.width,0);
        }
        
        this.combo.initEvents();
        
        // assigned so form know we need to do this..
        this.store          = this.combo.store;
        this.valueField     = this.combo.valueField;
        this.displayField   = this.combo.displayField ;
        
        
        this.combo.wrap.addClass('x-cbarray-grp');
        
        var cbwrap = this.combo.wrap.createChild(
            {tag: 'div', cls: 'x-cbarray-cb'},
            this.combo.el.dom
        );
        
             
        this.hiddenEl = this.combo.wrap.createChild({
            tag: 'input',  type:'hidden' , name: this.hiddenName, value : ''
        });
        this.el = this.combo.wrap.createChild({
            tag: 'input',  type:'hidden' , name: this.name, value : ''
        });
         //   this.el.dom.removeAttribute("name");
        
        
        this.outerWrap = this.combo.wrap;
        this.wrap = cbwrap;
        
        this.outerWrap.setWidth(this.width);
        this.outerWrap.dom.removeChild(this.el.dom);
        
        this.wrap.dom.appendChild(this.el.dom);
        this.outerWrap.dom.removeChild(this.combo.trigger.dom);
        this.combo.wrap.dom.appendChild(this.combo.trigger.dom);
        
        this.combo.trigger.setStyle('position','relative');
        this.combo.trigger.setStyle('left', '0px');
        this.combo.trigger.setStyle('top', '2px');
        
        this.combo.el.setStyle('vertical-align', 'text-bottom');
        
        //this.trigger.setStyle('vertical-align', 'top');
        
        // this should use the code from combo really... on('add' ....)
        if (this.adder) {
            
        
            this.adder = this.outerWrap.createChild(
                {tag: 'img', src: Roo.BLANK_IMAGE_URL, cls: 'x-form-adder', style: 'margin-left:2px'});  
            var _t = this;
            this.adder.on('click', function(e) {
                _t.fireEvent('adderclick', this, e);
            }, _t);
        }
        //var _t = this;
        //this.adder.on('click', this.onAddClick, _t);
        
        
        this.combo.on('select', function(cb, rec, ix) {
            this.addItem(rec.data);
            
            cb.setValue('');
            cb.el.dom.value = '';
            //cb.lastData = rec.data;
            // add to list
            
        }, this);
        
        
    },
    
    
    getName: function()
    {
        // returns hidden if it's set..
        if (!this.rendered) {return ''};
        return  this.hiddenName ? this.hiddenName : this.name;
        
    },
    
    
    onResize: function(w, h){
        
        return;
        // not sure if this is needed..
        //this.combo.onResize(w,h);
        
        if(typeof w != 'number'){
            // we do not handle it!?!?
            return;
        }
        var tw = this.combo.trigger.getWidth();
        tw += this.addicon ? this.addicon.getWidth() : 0;
        tw += this.editicon ? this.editicon.getWidth() : 0;
        var x = w - tw;
        this.combo.el.setWidth( this.combo.adjustWidth('input', x));
            
        this.combo.trigger.setStyle('left', '0px');
        
        if(this.list && this.listWidth === undefined){
            var lw = Math.max(x + this.combo.trigger.getWidth(), this.combo.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
        
    
        
    },
    
    addItem: function(rec)
    {
        var valueField = this.combo.valueField;
        var displayField = this.combo.displayField;
        if (this.items.indexOfKey(rec[valueField]) > -1) {
            //console.log("GOT " + rec.data.id);
            return;
        }
        
        var x = new Roo.form.ComboBoxArray.Item({
            //id : rec[this.idField],
            data : rec,
            displayField : displayField ,
            tipField : displayField ,
            cb : this
        });
        // use the 
        this.items.add(rec[valueField],x);
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
        var idField = this.combo.valueField;
        
        this.items.each(function(f) {
            ar.push(f.data[idField]);
           
        });
        this.hiddenEl.dom.value = ar.join(',');
        this.validate();
    },
    
    reset : function()
    {
        //Roo.form.ComboBoxArray.superclass.reset.call(this); 
        this.items.each(function(f) {
           f.remove(); 
        });
        this.el.dom.value = '';
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
         
        this.reset();
        
        
        
        if (this.store.isLocal && (typeof(v) == 'string')) {
            // then we can use the store to find the values..
            // comma seperated at present.. this needs to allow JSON based encoding..
            this.hiddenEl.value  = v;
            var v_ar = [];
            Roo.each(v.split(','), function(k) {
                Roo.log("CHECK " + this.valueField + ',' + k);
                var li = this.store.query(this.valueField, k);
                if (!li.length) {
                    return;
                }
                var add = {};
                add[this.valueField] = k;
                add[this.displayField] = li.item(0).data[this.displayField];
                
                this.addItem(add);
            }, this) 
             
        }
        if (typeof(v) == 'object') {
            // then let's assume it's an array of objects..
            Roo.each(v, function(l) {
                this.addItem(l);
            }, this);
             
        }
        
        
    },
    setFromData: function(v)
    {
        // this recieves an object, if setValues is called.
        this.reset();
        this.el.dom.value = v[this.displayField];
        this.hiddenEl.dom.value = v[this.valueField];
        if (typeof(v[this.valueField]) != 'string' || !v[this.valueField].length) {
            return;
        }
        var kv = v[this.valueField];
        var dv = v[this.displayField];
        kv = typeof(kv) != 'string' ? '' : kv;
        dv = typeof(dv) != 'string' ? '' : dv;
        
        
        var keys = kv.split(',');
        var display = dv.split(',');
        for (var i = 0 ; i < keys.length; i++) {
            
            add = {};
            add[this.valueField] = keys[i];
            add[this.displayField] = display[i];
            this.addItem(add);
        }
      
        
    },
    
    /**
     * Validates the combox array value
     * @return {Boolean} True if the value is valid, else false
     */
    validate : function(){
        if(this.disabled || this.validateValue(this.processValue(this.getValue()))){
            this.clearInvalid();
            return true;
        }
        return false;
    },
    
    validateValue : function(value){
        return Roo.form.ComboBoxArray.superclass.validateValue.call(this, this.getValue());
        
    },
    
    /*@
     * overide
     * 
     */
    isDirty : function() {
        if(this.disabled) {
            return false;
        }
        
        try {
            var d = Roo.decode(String(this.originalValue));
        } catch (e) {
            return String(this.getValue()) !== String(this.originalValue);
        }
        
        var originalValue = [];
        
        for (var i = 0; i < d.length; i++){
            originalValue.push(d[i][this.valueField]);
        }
        
        return String(this.getValue()) !== String(originalValue.join(','));
        
    }
    
});



/**
 * @class Roo.form.ComboBoxArray.Item
 * @extends Roo.BoxComponent
 * A selected item in the list
 *  Fred [x]  Brian [x]  [Pick another |v]
 * 
 * @constructor
 * Create a new item.
 * @param {Object} config Configuration options
 */
 
Roo.form.ComboBoxArray.Item = function(config) {
    config.id = Roo.id();
    Roo.form.ComboBoxArray.Item.superclass.constructor.call(this, config);
}

Roo.extend(Roo.form.ComboBoxArray.Item, Roo.BoxComponent, {
    data : {},
    cb: false,
    displayField : false,
    tipField : false,
    
    
    defaultAutoCreate : {
        tag: 'div',
        cls: 'x-cbarray-item',
        cn : [ 
            { tag: 'div' },
            {
                tag: 'img',
                width:16,
                height : 16,
                src : Roo.BLANK_IMAGE_URL ,
                align: 'center'
            }
        ]
        
    },
    
 
    onRender : function(ct, position)
    {
        Roo.form.Field.superclass.onRender.call(this, ct, position);
        
        if(!this.el){
            var cfg = this.getAutoCreate();
            this.el = ct.createChild(cfg, position);
        }
        
        this.el.child('img').dom.setAttribute('src', Roo.BLANK_IMAGE_URL);
        
        this.el.child('div').dom.innerHTML = this.cb.renderer ? 
            this.cb.renderer(this.data) :
            String.format('{0}',this.data[this.displayField]);
        
            
        this.el.child('div').dom.setAttribute('qtip',
                        String.format('{0}',this.data[this.tipField])
        );
        
        this.el.child('img').on('click', this.remove, this);
        
    },
   
    remove : function()
    {
        Roo.log(this);
        this.cb.items.remove(this);
        this.el.child('img').un('click', this.remove, this);
        this.el.remove();
        this.cb.updateHiddenEl();
        
        Roo.log('remove?????');
        this.cb.fireEvent('remove', this);
    }
});