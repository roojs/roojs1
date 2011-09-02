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
    })
    
   
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
        
    },
    
    onSelect : function(record, index){
       // this is only called by the clear button now..
       this.view.clearSelections();
    },
    getValueArray : function()
    {
        var ar = [] ;
        try {
            var ret = Roo.decode(thist.getValue());
            ret = typeof(ar) == 'Array' ? ar : []; //?? valid?
            return ret;
        } catch(e) {
            Roo.log("Roo.form.ComboCheck:getValueArray  invalid data:" + this.getValue());
            return [];
        }
         
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
            tv.push(r.get(this.displayField));
        },this);
        
        this.hiddenField.value = Roo.encode(nv);
        
        Roo.form.ComboBox.superclass.setValue.call(this, tv.join(', '));
    },
    
    
});