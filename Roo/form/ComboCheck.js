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
     
    //selectedClass: 'x-menu-item-checked', - this is the mouse over class...
    
    // private
    onRender : function(ct, position){
        var _t = this;
        
        
        
        if(!this.tpl){
            var cls = 'x-combo-list';

            
            this.tpl =  new Roo.Template({
                html :  '<div class="'+cls+'-item x-menu-check-item{' + this.valueField + ':this.checked}">' +
                   '<img class="x-menu-item-icon" style="margin: 0px;" src="' + Roo.BLANK_IMAGE_URL + '">' + 
                   '<span>{' + this.displayField + '}</span>' +
                    '</div>',
                checked: function (value, allValues) {
                    var ar = _t.getValueArray();
                    return ar.indexOf(value) > -1 ? ' x-menu-item-checked' : ''
                }
            });
        }
 
        
        Roo.form.ComboCheck.superclass.onRender.call(this, ct, position);
        this.view.singleSelect = false;
        this.view.multiSelect = true;
    },
    
    onViewOver : function(e, t){
        // do nothing...
        return;
        
    },
    
    onViewClick : function(doFocus,index){
       
        if(this.inKeyMode){ // prevent key nav and mouse over conflicts
            return;
        }
        
        if (this.view.isSelected(index)) {
            this.view.unselect(index);
            return;
        }
        this.view.select(index, true);
        
        return;
        var index = this.view.getSelectedIndexes()[0];
        var r = this.store.getAt(index);
        if(r){
            this.onSelect(r, index);
        }
        if(doFocus !== false && !this.blockFocus){
            this.el.focus();
        }
    },
 
    
    onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){
            
            
            this.setFromData(index > -1 ? record.data : false);
            
            
            
            //this.collapse();
            this.fireEvent('select', this, record, index);
        }
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
        
        
    } 
});