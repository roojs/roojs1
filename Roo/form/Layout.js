/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
 
/**
 * @class Roo.form.Layout
 * @extends Roo.Component
 * @children Roo.form.Column Roo.form.Row Roo.form.Field Roo.Button Roo.form.TextItem
 * Creates a container for layout and rendering of fields in an {@link Roo.form.Form}.
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.Layout = function(config){
    var xitems = [];
    if (config.items) {
        xitems = config.items;
        delete config.items;
    }
    Roo.form.Layout.superclass.constructor.call(this, config);
    this.stack = [];
    Roo.each(xitems, this.addxtype, this);
     
};

Roo.extend(Roo.form.Layout, Roo.Component, {
    /**
     * @cfg {String/Object} autoCreate
     * A DomHelper element spec used to autocreate the layout (defaults to {tag: 'div', cls: 'x-form-ct'})
     */
    /**
     * @cfg {String/Object/Function} style
     * A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
     * a function which returns such a specification.
     */
    /**
     * @cfg {String} labelAlign
     * Valid values are "left," "top" and "right" (defaults to "left")
     */
    /**
     * @cfg {Number} labelWidth
     * Fixed width in pixels of all field labels (defaults to undefined)
     */
    /**
     * @cfg {Boolean} clear
     * True to add a clearing element at the end of this layout, equivalent to CSS clear: both (defaults to true)
     */
    clear : true,
    /**
     * @cfg {String} labelSeparator
     * The separator to use after field labels (defaults to ':')
     */
    labelSeparator : ':',
    /**
     * @cfg {Boolean} hideLabels
     * True to suppress the display of field labels in this layout (defaults to false)
     */
    hideLabels : false,

    // private
    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct'},
    
    isLayout : true,
    
    // private
    onRender : function(ct, position){
        if(this.el){ // from markup
            this.el = Roo.get(this.el);
        }else {  // generate
            var cfg = this.getAutoCreate();
            this.el = ct.createChild(cfg, position);
        }
        if(this.style){
            this.el.applyStyles(this.style);
        }
        if(this.labelAlign){
            this.el.addClass('x-form-label-'+this.labelAlign);
        }
        if(this.hideLabels){
            this.labelStyle = "display:none";
            this.elementStyle = "padding-left:0;";
        }else{
            if(typeof this.labelWidth == 'number'){
                this.labelStyle = "width:"+this.labelWidth+"px;";
                this.elementStyle = "padding-left:"+((this.labelWidth+(typeof this.labelPad == 'number' ? this.labelPad : 5))+'px')+";";
            }
            if(this.labelAlign == 'top'){
                this.labelStyle = "width:auto;";
                this.elementStyle = "padding-left:0;";
            }
        }
        var stack = this.stack;
        var slen = stack.length;
        if(slen > 0){
            if(!this.fieldTpl){
                var t = new Roo.Template(
                    '<div class="x-form-item {5}">',
                        '<label for="{0}" style="{2}">{1}{4}</label>',
                        '<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
                        '</div>',
                    '</div><div class="x-form-clear-left"></div>'
                );
                t.disableFormats = true;
                t.compile();
                Roo.form.Layout.prototype.fieldTpl = t;
            }
            for(var i = 0; i < slen; i++) {
                if(stack[i].isFormField){
                    this.renderField(stack[i]);
                }else{
                    this.renderComponent(stack[i]);
                }
            }
        }
        if(this.clear){
            this.el.createChild({cls:'x-form-clear'});
        }
    },

    // private
    renderField : function(f){
        f.fieldEl = Roo.get(this.fieldTpl.append(this.el, [
               f.id, //0
               f.fieldLabel, //1
               f.labelStyle||this.labelStyle||'', //2
               this.elementStyle||'', //3
               typeof f.labelSeparator == 'undefined' ? this.labelSeparator : f.labelSeparator, //4
               f.itemCls||this.itemCls||''  //5
       ], true).getPrevSibling());
    },

    // private
    renderComponent : function(c){
        c.render(c.isLayout ? this.el : this.el.createChild());    
    },
    /**
     * Adds a object form elements (using the xtype property as the factory method.)
     * Valid xtypes are:  TextField, TextArea .... Button, Layout, FieldSet, Column
     * @param {Object} config 
     */
    addxtype : function(o)
    {
        // create the lement.
        o.form = this.form;
        var fe = Roo.factory(o, Roo.form);
        this.form.allItems.push(fe);
        this.stack.push(fe);
        
        if (fe.isFormField) {
            this.form.items.add(fe);
        }
         
        return fe;
    }
});

/**
 * @class Roo.form.Column
 * @extends Roo.form.Layout
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


/**
 * @class Roo.form.Row
 * @extends Roo.form.Layout
 * @children Roo.form.Column Roo.form.Row Roo.form.Field Roo.Button Roo.form.TextItem
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