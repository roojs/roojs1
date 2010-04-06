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
  

  
Roo.grid.PropertyRecord = Roo.data.Record.create([
    {name:'name',type:'string'},  'value'
]);


Roo.grid.PropertyStore = function(grid, source){
    this.grid = grid;
    this.store = new Roo.data.Store({
        recordType : Roo.grid.PropertyRecord
    });
    this.store.on('update', this.onUpdate,  this);
    if(source){
        this.setSource(source);
    }
    Roo.grid.PropertyStore.superclass.constructor.call(this);
};



Roo.extend(Roo.grid.PropertyStore, Roo.util.Observable, {
    setSource : function(o){
        this.source = o;
        this.store.removeAll();
        var data = [];
        for(var k in o){
            if(this.isEditableValue(o[k])){
                data.push(new Roo.grid.PropertyRecord({name: k, value: o[k]}, k));
            }
        }
        this.store.loadRecords({records: data}, {}, true);
    },

    onUpdate : function(ds, record, type){
        if(type == Roo.data.Record.EDIT){
            var v = record.data['value'];
            var oldValue = record.modified['value'];
            if(this.grid.fireEvent('beforepropertychange', this.source, record.id, v, oldValue) !== false){
                this.source[record.id] = v;
                record.commit();
                this.grid.fireEvent('propertychange', this.source, record.id, v, oldValue);
            }else{
                record.reject();
            }
        }
    },

    getProperty : function(row){
       return this.store.getAt(row);
    },

    isEditableValue: function(val){
        if(val && val instanceof Date){
            return true;
        }else if(typeof val == 'object' || typeof val == 'function'){
            return false;
        }
        return true;
    },

    setValue : function(prop, value){
        this.source[prop] = value;
        this.store.getById(prop).set('value', value);
    },

    getSource : function(){
        return this.source;
    }
});

Roo.grid.PropertyColumnModel = function(grid, store){
    this.grid = grid;
    var g = Roo.grid;
    g.PropertyColumnModel.superclass.constructor.call(this, [
        {header: this.nameText, sortable: true, dataIndex:'name', id: 'name'},
        {header: this.valueText, resizable:false, dataIndex: 'value', id: 'value'}
    ]);
    this.store = store;
    this.bselect = Roo.DomHelper.append(document.body, {
        tag: 'select', style:'display:none', cls: 'x-grid-editor', children: [
            {tag: 'option', value: 'true', html: 'true'},
            {tag: 'option', value: 'false', html: 'false'}
        ]
    });
    Roo.id(this.bselect);
    var f = Roo.form;
    this.editors = {
        'date' : new g.GridEditor(new f.DateField({selectOnFocus:true})),
        'string' : new g.GridEditor(new f.TextField({selectOnFocus:true})),
        'number' : new g.GridEditor(new f.NumberField({selectOnFocus:true, style:'text-align:left;'})),
        'int' : new g.GridEditor(new f.NumberField({selectOnFocus:true, allowDecimals:false, style:'text-align:left;'})),
        'boolean' : new g.GridEditor(new f.Field({el:this.bselect,selectOnFocus:true}))
    };
    this.renderCellDelegate = this.renderCell.createDelegate(this);
    this.renderPropDelegate = this.renderProp.createDelegate(this);
};

Roo.extend(Roo.grid.PropertyColumnModel, Roo.grid.ColumnModel, {
    
    
    nameText : 'Name',
    valueText : 'Value',
    
    dateFormat : 'm/j/Y',
    
    
    renderDate : function(dateVal){
        return dateVal.dateFormat(this.dateFormat);
    },

    renderBool : function(bVal){
        return bVal ? 'true' : 'false';
    },

    isCellEditable : function(colIndex, rowIndex){
        return colIndex == 1;
    },

    getRenderer : function(col){
        return col == 1 ?
            this.renderCellDelegate : this.renderPropDelegate;
    },

    renderProp : function(v){
        return this.getPropertyName(v);
    },

    renderCell : function(val){
        var rv = val;
        if(val instanceof Date){
            rv = this.renderDate(val);
        }else if(typeof val == 'boolean'){
            rv = this.renderBool(val);
        }
        return Roo.util.Format.htmlEncode(rv);
    },

    getPropertyName : function(name){
        var pn = this.grid.propertyNames;
        return pn && pn[name] ? pn[name] : name;
    },

    getCellEditor : function(colIndex, rowIndex){
        var p = this.store.getProperty(rowIndex);
        var n = p.data['name'], val = p.data['value'];
        
        if(typeof(this.grid.customEditors[n]) == 'string'){
            return this.editors[this.grid.customEditors[n]];
        }
        if(typeof(this.grid.customEditors[n]) != 'undefined'){
            return this.grid.customEditors[n];
        }
        if(val instanceof Date){
            return this.editors['date'];
        }else if(typeof val == 'number'){
            return this.editors['number'];
        }else if(typeof val == 'boolean'){
            return this.editors['boolean'];
        }else{
            return this.editors['string'];
        }
    }
});

/**
 * @class Roo.grid.PropertyGrid
 * @extends Roo.grid.EditorGrid
 * This class represents the  interface of a component based property grid control.
 * <br><br>Usage:<pre><code>
 var grid = new Roo.grid.PropertyGrid("my-container-id", {
      
 });
 // set any options
 grid.render();
 * </code></pre>
  
 * @constructor
 * @param {String/HTMLElement/Roo.Element} container The element into which this grid will be rendered -
 * The container MUST have some type of size defined for the grid to fill. The container will be
 * automatically set to position relative if it isn't already.
 * @param {Object} config A config object that sets properties on this grid.
 */
Roo.grid.PropertyGrid = function(container, config){
    config = config || {};
    var store = new Roo.grid.PropertyStore(this);
    this.store = store;
    var cm = new Roo.grid.PropertyColumnModel(this, store);
    store.store.sort('name', 'ASC');
    Roo.grid.PropertyGrid.superclass.constructor.call(this, container, Roo.apply({
        ds: store.store,
        cm: cm,
        enableColLock:false,
        enableColumnMove:false,
        stripeRows:false,
        trackMouseOver: false,
        clicksToEdit:1
    }, config));
    this.getGridEl().addClass('x-props-grid');
    this.lastEditRow = null;
    this.on('columnresize', this.onColumnResize, this);
    this.addEvents({
         /**
	     * @event beforepropertychange
	     * Fires before a property changes (return false to stop?)
	     * @param {Roo.grid.PropertyGrid} grid property grid? (check could be store)
	     * @param {String} id Record Id
	     * @param {String} newval New Value
         * @param {String} oldval Old Value
	     */
        "beforepropertychange": true,
        /**
	     * @event propertychange
	     * Fires after a property changes
	     * @param {Roo.grid.PropertyGrid} grid property grid? (check could be store)
	     * @param {String} id Record Id
	     * @param {String} newval New Value
         * @param {String} oldval Old Value
	     */
        "propertychange": true
    });
    this.customEditors = this.customEditors || {};
};
Roo.extend(Roo.grid.PropertyGrid, Roo.grid.EditorGrid, {
    
     /**
     * @cfg {Object} customEditors map of colnames=> custom editors.
     * the custom editor can be one of the standard ones (date|string|number|int|boolean), or a
     * grid editor eg. Roo.grid.GridEditor(new Roo.form.TextArea({selectOnFocus:true})),
     * false disables editing of the field.
	 */
    
      /**
     * @cfg {Object} propertyNames map of property Names to their displayed value
	 */
    
    render : function(){
        Roo.grid.PropertyGrid.superclass.render.call(this);
        this.autoSize.defer(100, this);
    },

    autoSize : function(){
        Roo.grid.PropertyGrid.superclass.autoSize.call(this);
        if(this.view){
            this.view.fitColumns();
        }
    },

    onColumnResize : function(){
        this.colModel.setColumnWidth(1, this.container.getWidth(true)-this.colModel.getColumnWidth(0));
        this.autoSize();
    },
    /**
     * Sets the data for the Grid
     * accepts a Key => Value object of all the elements avaiable.
     * @param {Object} data  to appear in grid.
     */
    setSource : function(source){
        this.store.setSource(source);
        //this.autoSize();
    },
    /**
     * Gets all the data from the grid.
     * @return {Object} data  data stored in grid
     */
    getSource : function(){
        return this.store.getSource();
    }
});