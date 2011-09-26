//<script type="text/javascript">
/**
 * @class Roo.form.GridField
 * @extends Roo.form.Field
 * Embed a grid (or editable grid into a form)
 * STATUS ALPHA
 * 
 * This embeds a grid in a form, the value of the field should be the json encoded array of rows
 * it needs 
 * xgrid.store = Roo.data.Store
 * xgrid.store.proxy = Roo.data.MemoryProxy (data = [] )
 * xgrid.store.reader = Roo.data.JsonReader 
 * 
 * 
 * @constructor
 * Creates a new GridField
 * @param {Object} config Configuration options
 */
Roo.form.GridField = function(config){
    Roo.form.GridField.superclass.constructor.call(this, config);
     
};

Roo.extend(Roo.form.GridField, Roo.form.Field,  {
    /**
     * @cfg {Number} width  - used to restrict width of grid..
     */
    width : 100,
    /**
     * @cfg {Number} height - used to restrict height of grid..
     */
    height : 50,
     /**
     * @cfg {Object} xgrid (xtype'd description of grid) { xtype : 'Grid', dataSource: .... }
         * 
         *}
     */
    xgrid : false, 
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "checkbox", autocomplete: "off"})
     */
   // defaultAutoCreate : { tag: 'div' },
    defaultAutoCreate : { tag: 'input', type: 'hidden', autocomplete: 'off'},
    /**
     * @cfg {String} addTitle Text to include for adding a title.
     */
    addTitle : false,
    //
    onResize : function(){
        Roo.form.Field.superclass.onResize.apply(this, arguments);
    },

    initEvents : function(){
        // Roo.form.Checkbox.superclass.initEvents.call(this);
        // has no events...
       
    },


    getResizeEl : function(){
        return this.wrap;
    },

    getPositionEl : function(){
        return this.wrap;
    },

    // private
    onRender : function(ct, position){
        
        this.style = this.style || 'overflow: hidden; border:1px solid #c3daf9;';
        var style = this.style;
        delete this.style;
        
        Roo.form.GridField.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls: ''}); // not sure why ive done thsi...
        this.viewEl = this.wrap.createChild({ tag: 'div' });
        if (style) {
            this.viewEl.applyStyles(style);
        }
        if (this.width) {
            this.viewEl.setWidth(this.width);
        }
        if (this.height) {
            this.viewEl.setHeight(this.height);
        }
        //if(this.inputValue !== undefined){
        //this.setValue(this.value);
        
        
        this.grid = new Roo.grid[this.xgrid.xtype](this.viewEl, this.xgrid);
        
        
        this.grid.render();
        this.grid.getDataSource().on('remove', this.refreshValue, this);
        this.grid.getDataSource().on('update', this.refreshValue, this);
        this.grid.on('afteredit', this.refreshValue, this);
 
    },
     
    
    /**
     * Sets the value of the item. 
     * @param {String} either an object  or a string..
     */
    setValue : function(v){
        //this.value = v;
        v = v || []; // empty set..
        // this does not seem smart - it really only affects memoryproxy grids..
        if (this.grid && this.grid.getDataSource() && typeof(v) != 'undefined') {
            var ds = this.grid.getDataSource();
            // assumes a json reader..
            var data = {}
            data[ds.reader.meta.root ] =  typeof(v) == 'string' ? Roo.decode(v) : v;
            ds.loadData( data);
        }
        // clear selection so it does not get stale.
        if (this.grid.sm)) { 
            this.grid.sm.clearSelections();
        }
        
        Roo.form.GridField.superclass.setValue.call(this, v);
        this.refreshValue();
        // should load data in the grid really....
    },
    
    // private
    refreshValue: function() {
         var val = [];
        this.grid.getDataSource().each(function(r) {
            val.push(r.data);
        });
        this.el.dom.value = Roo.encode(val);
    }
    
     
    
    
});