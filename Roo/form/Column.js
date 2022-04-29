
/**
 * @class Roo.form.Column
 * @extends Roo.form.Layout
 * @children Roo.form.Row Roo.form.Field Roo.Button Roo.form.TextItem Roo.form.FieldSet
 * Creates a column container for layout and rendering of fields in an {@link Roo.form.Form}.
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.Column = function(config){
    Roo.form.Column.superclass.constructor.call(this, config);
};

Roo.extend(Roo.form.Column, Roo.form.Layout, {
    /**
     * @cfg {Number/String} width
     * The fixed width of the column in pixels or CSS value (defaults to "auto")
     */
    /**
     * @cfg {String/Object} autoCreate
     * A DomHelper element spec used to autocreate the column (defaults to {tag: 'div', cls: 'x-form-ct x-form-column'})
     */

    // private
    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct x-form-column'},

    // private
    onRender : function(ct, position){
        Roo.form.Column.superclass.onRender.call(this, ct, position);
        if(this.width){
            this.el.setWidth(this.width);
        }
    }
});
