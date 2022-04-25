
/**
 * @class Roo.form.FieldSet
 * @extends Roo.form.Layout
 * @children Roo.form.Column Roo.form.Row Roo.form.Field Roo.Button Roo.form.TextItem
 * Creates a fieldset container for layout and rendering of fields in an {@link Roo.form.Form}.
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.FieldSet = function(config){
    Roo.form.FieldSet.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.FieldSet, Roo.form.Layout, {
    /**
     * @cfg {String} legend
     * The text to display as the legend for the FieldSet (defaults to '')
     */
    /**
     * @cfg {String/Object} autoCreate
     * A DomHelper element spec used to autocreate the fieldset (defaults to {tag: 'fieldset', cn: {tag:'legend'}})
     */

    // private
    defaultAutoCreate : {tag: 'fieldset', cn: {tag:'legend'}},

    // private
    onRender : function(ct, position){
        Roo.form.FieldSet.superclass.onRender.call(this, ct, position);
        if(this.legend){
            this.setLegend(this.legend);
        }
    },

    // private
    setLegend : function(text){
        if(this.rendered){
            this.el.child('legend').update(text);
        }
    }
});