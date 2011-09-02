/*
 * RooJS Library 1.1.1
 * Copyright(c) 2008-2011  Alan Knowles
 *
 * License - LGPL
 */
 

/**
 * @class Roo.form.ComboCheck
 * @extends Roo.form.ComboBox
 * A combobox for multiple select items.
 * @constructor
 * Create a new ComboCheck
 * @param {Object} config Configuration options
 */
Roo.form.ComboCheck = function(config){
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
            throw "Roo.form.ComboCheck : missing value for: " + e;
        }
    });
    
    
};

Roo.extend(Roo.form.ComboCheck, Roo.form.ComboBox, {
     
     
    editable : false,
     
    selectedClass: 'x-menu-item-checked', 
    
    // private
    onRender : function(ct, position){
        var _t = this;
        
        
        
        if(!this.tpl){
            var cls = 'x-combo-list';

            
            this.tpl =  new Roo.Template({
                html :  '<div class="'+cls+'-item x-menu-check-item">' +
                   '<img class="x-menu-item-icon" style="margin: 0px;" src="' + Roo.BLANK_IMAGE_URL + '">' + 
                   '<span>{' + this.displayField + '}</span>' +
                    '</div>' 
                
            });
        }
 
        
        Roo.form.ComboCheck.superclass.onRender.call(this, ct, position);
        this.view.singleSelect = false;
        this.view.multiSelect = true;
        this.view.toggleSelect = true;
        this.pageTb.add(new Roo.Toolbar.Fill(), {
            
            text: 'Done',
            handler: function()
            {
                _t.collapse();
            }
        });
    },
    
    onViewOver : function(e, t){
        // do nothing...
        return;
        
    },
    
    onViewClick : function(doFocus,index){
        return;
        
    },
    select: function () {
        Roo.log("SELECT CALLED");
    },
     
    selectByValue : function(xv, scrollIntoView){
        var ar = this.getValueArray();
        var sels = [];
        
        Roo.each(ar, function(v) {
            if(v === undefined || v === null){
                return;
            }
            var r = this.findRecord(this.valueField, v);
            if(r){
                sels.push(this.store.indexOf(r))
                
            }
        },this);
        this.view.select(sels);
        return false;
    },
    
    
    
    onSelect : function(record, index){
        Roo.log("onselect Called");
       // this is only called by the clear button now..
       this.view.clearSelections();
    },
    getValueArray : function()
    {
        var ar = [] ;
        try {
            var ar = Roo.decode(this.value);
            return  ar instanceof Array ? ar : []; //?? valid?
            
        } catch(e) {
            Roo.log(e + "\nRoo.form.ComboCheck:getValueArray  invalid data:" + this.getValue());
            return [];
        }
         
    },
    expand : function ()
    {
        Roo.form.ComboCheck.superclass.setValue.call(this);
        this.valueBefore = this.value;
        

    },
    
    collapse : function(){
        Roo.form.ComboCheck.superclass.collapse.call(this);
        var sl = this.view.getSelectedIndexes();
        var st = this.store;
        var nv = [];
        var tv = [];
        var r;
        Roo.each(sl, function(i) {
            r = st.getAt(i);
            nv.push(r.get(this.valueField));
        },this);
        this.setValue(Roo.encode(nv))
        if (this.value != this.valueBefore) {

            this.fireEvent('change', this, this.value, this.valueBefore);
        }
        
    },
    
    setValue : function(v){
        // Roo.log(v);
        this.value = v;
        
        var vals = this.getValueArray();
        var tv = [];
        Roo.each(vals, function(k) {
            var r = this.findRecord(this.valueField, k);
            if(r){
                tv.push(r.data[this.displayField]);
            }else if(this.valueNotFoundText !== undefined){
                tv.push( this.valueNotFoundText );
            }
        },this);
       // Roo.log(tv);
        
        Roo.form.ComboBox.superclass.setValue.call(this, tv.join(', '));
        this.hiddenField.value = v;
        this.value = v;
    }
    
});