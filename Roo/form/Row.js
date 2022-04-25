
/**
 * @class Roo.form.Row
 * @extends Roo.form.Layout
 * @children Roo.form.Column Roo.form.Row Roo.form.Field Roo.Button Roo.form.TextItem Roo.form.FieldSet
 * Creates a row container for layout and rendering of fields in an {@link Roo.form.Form}.
 * @constructor
 * @param {Object} config Configuration options
 */

 
Roo.form.Row = function(config){
    Roo.form.Row.superclass.constructor.call(this, config);
};
 
Roo.extend(Roo.form.Row, Roo.form.Layout, {
      /**
     * @cfg {Number/String} width
     * The fixed width of the column in pixels or CSS value (defaults to "auto")
     */
    /**
     * @cfg {Number/String} height
     * The fixed height of the column in pixels or CSS value (defaults to "auto")
     */
    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct x-form-row'},
    
    padWidth : 20,
    // private
    onRender : function(ct, position){
        //console.log('row render');
        if(!this.rowTpl){
            var t = new Roo.Template(
                '<div class="x-form-item {5}" style="float:left;width:{6}px">',
                    '<label for="{0}" style="{2}">{1}{4}</label>',
                    '<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
                    '</div>',
                '</div>'
            );
            t.disableFormats = true;
            t.compile();
            Roo.form.Layout.prototype.rowTpl = t;
        }
        this.fieldTpl = this.rowTpl;
        
        //console.log('lw' + this.labelWidth +', la:' + this.labelAlign);
        var labelWidth = 100;
        
        if ((this.labelAlign != 'top')) {
            if (typeof this.labelWidth == 'number') {
                labelWidth = this.labelWidth
            }
            this.padWidth =  20 + labelWidth;
            
        }
        
        Roo.form.Column.superclass.onRender.call(this, ct, position);
        if(this.width){
            this.el.setWidth(this.width);
        }
        if(this.height){
            this.el.setHeight(this.height);
        }
    },
    
    // private
    renderField : function(f){
        f.fieldEl = this.fieldTpl.append(this.el, [
               f.id, f.fieldLabel,
               f.labelStyle||this.labelStyle||'',
               this.elementStyle||'',
               typeof f.labelSeparator == 'undefined' ? this.labelSeparator : f.labelSeparator,
               f.itemCls||this.itemCls||'',
               f.width ? f.width + this.padWidth : 160 + this.padWidth
       ],true);
    }
});
 
