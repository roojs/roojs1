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
   
   
     
});