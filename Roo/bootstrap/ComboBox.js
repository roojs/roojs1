/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.TriggerField
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @constructor
 * Create a new ComboBox.
 * @param {Object} config Configuration options
 */
Roo.bootstrap.ComboBox = function(config){
    Roo.bootstrap.ComboBox.superclass.constructor.call(this, config);
    this.addEvents({
        /**
         * @event expand
         * Fires when the dropdown list is expanded
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'expand' : true,
        /**
         * @event collapse
         * Fires when the dropdown list is collapsed
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'collapse' : true,
        /**
         * @event beforeselect
         * Fires before a list item is selected. Return false to cancel the selection.
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record} record The data record returned from the underlying store
	     * @param {Number} index The index of the selected item in the dropdown list
	     */
        'beforeselect' : true,
        /**
         * @event select
         * Fires when a list item is selected
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record} record The data record returned from the underlying store (or false on clear)
	     * @param {Number} index The index of the selected item in the dropdown list
	     */
        'select' : true,
        /**
         * @event beforequery
         * Fires before all queries are processed. Return false to cancel the query or set cancel to true.
         * The event object passed has these properties:
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {String} query The query
	     * @param {Boolean} forceAll true to force "all" query
	     * @param {Boolean} cancel true to cancel the query
	     * @param {Object} e The query event object
	     */
        'beforequery': true,
         /**
         * @event add
         * Fires when the 'add' icon is pressed (add a listener to enable add button)
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'add' : true,
        /**
         * @event edit
         * Fires when the 'edit' icon is pressed (add a listener to enable add button)
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     * @param {Roo.data.Record|false} record The data record returned from the underlying store (or false on nothing selected)
	     */
        'edit' : true
        
        
    });
    
    
    this.selectedIndex = -1;
    if(this.mode == 'local'){
        if(config.queryDelay === undefined){
            this.queryDelay = 10;
        }
        if(config.minChars === undefined){
            this.minChars = 0;
        }
    }
};

Roo.extend(Roo.bootstrap.ComboBox, Roo.bootstrap.TriggerField, {
     
    /**
     * @cfg {Boolean} lazyRender True to prevent the ComboBox from rendering until requested (should always be used when
     * rendering into an Roo.Editor, defaults to false)
     */
    /**
     * @cfg {Boolean/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to:
     * {tag: "input", type: "text", size: "24", autocomplete: "off"})
     */
    /**
     * @cfg {Roo.data.Store} store The data store to which this combo is bound (defaults to undefined)
     */
    /**
     * @cfg {String} title If supplied, a header element is created containing this text and added into the top of
     * the dropdown list (defaults to undefined, with no header element)
     */

     /**
     * @cfg {String/Roo.Template} tpl The template to use to render the output
     */
     
     /**
     * @cfg {Number} listWidth The width in pixels of the dropdown list (defaults to the width of the ComboBox field)
     */
    listWidth: undefined,
    /**
     * @cfg {String} displayField The underlying data field name to bind to this CombBox (defaults to undefined if
     * mode = 'remote' or 'text' if mode = 'local')
     */
    displayField: undefined,
    /**
     * @cfg {String} valueField The underlying data value name to bind to this CombBox (defaults to undefined if
     * mode = 'remote' or 'value' if mode = 'local'). 
     * Note: use of a valueField requires the user make a selection
     * in order for a value to be mapped.
     */
    valueField: undefined,
    
    
    /**
     * @cfg {String} hiddenName If specified, a hidden form field with this name is dynamically generated to store the
     * field's data value (defaults to the underlying DOM element's name)
     */
    hiddenName: undefined,
    /**
     * @cfg {String} listClass CSS class to apply to the dropdown list element (defaults to '')
     */
    listClass: '',
    /**
     * @cfg {String} selectedClass CSS class to apply to the selected item in the dropdown list (defaults to 'x-combo-selected')
     */
    selectedClass: 'active',
    
    /**
     * @cfg {Boolean/String} shadow True or "sides" for the default effect, "frame" for 4-way shadow, and "drop" for bottom-right
     */
    shadow:'sides',
    /**
     * @cfg {String} listAlign A valid anchor position value. See {@link Roo.Element#alignTo} for details on supported
     * anchor positions (defaults to 'tl-bl')
     */
    listAlign: 'tl-bl?',
    /**
     * @cfg {Number} maxHeight The maximum height in pixels of the dropdown list before scrollbars are shown (defaults to 300)
     */
    maxHeight: 300,
    /**
     * @cfg {String} triggerAction The action to execute when the trigger field is activated.  Use 'all' to run the
     * query specified by the allQuery config option (defaults to 'query')
     */
    triggerAction: 'query',
    /**
     * @cfg {Number} minChars The minimum number of characters the user must type before autocomplete and typeahead activate
     * (defaults to 4, does not apply if editable = false)
     */
    minChars : 4,
    /**
     * @cfg {Boolean} typeAhead True to populate and autoselect the remainder of the text being typed after a configurable
     * delay (typeAheadDelay) if it matches a known value (defaults to false)
     */
    typeAhead: false,
    /**
     * @cfg {Number} queryDelay The length of time in milliseconds to delay between the start of typing and sending the
     * query to filter the dropdown list (defaults to 500 if mode = 'remote' or 10 if mode = 'local')
     */
    queryDelay: 500,
    /**
     * @cfg {Number} pageSize If greater than 0, a paging toolbar is displayed in the footer of the dropdown list and the
     * filter queries will execute with page start and limit parameters.  Only applies when mode = 'remote' (defaults to 0)
     */
    pageSize: 0,
    /**
     * @cfg {Boolean} selectOnFocus True to select any existing text in the field immediately on focus.  Only applies
     * when editable = true (defaults to false)
     */
    selectOnFocus:false,
    /**
     * @cfg {String} queryParam Name of the query as it will be passed on the querystring (defaults to 'query')
     */
    queryParam: 'query',
    /**
     * @cfg {String} loadingText The text to display in the dropdown list while data is loading.  Only applies
     * when mode = 'remote' (defaults to 'Loading...')
     */
    loadingText: 'Loading...',
    /**
     * @cfg {Boolean} resizable True to add a resize handle to the bottom of the dropdown list (defaults to false)
     */
    resizable: false,
    /**
     * @cfg {Number} handleHeight The height in pixels of the dropdown list resize handle if resizable = true (defaults to 8)
     */
    handleHeight : 8,
    /**
     * @cfg {Boolean} editable False to prevent the user from typing text directly into the field, just like a
     * traditional select (defaults to true)
     */
    editable: true,
    /**
     * @cfg {String} allQuery The text query to send to the server to return all records for the list with no filtering (defaults to '')
     */
    allQuery: '',
    /**
     * @cfg {String} mode Set to 'local' if the ComboBox loads local data (defaults to 'remote' which loads from the server)
     */
    mode: 'remote',
    /**
     * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will be ignored if
     * listWidth has a higher value)
     */
    minListWidth : 70,
    /**
     * @cfg {Boolean} forceSelection True to restrict the selected value to one of the values in the list, false to
     * allow the user to set arbitrary text into the field (defaults to false)
     */
    forceSelection:false,
    /**
     * @cfg {Number} typeAheadDelay The length of time in milliseconds to wait until the typeahead text is displayed
     * if typeAhead = true (defaults to 250)
     */
    typeAheadDelay : 250,
    /**
     * @cfg {String} valueNotFoundText When using a name/value combo, if the value passed to setValue is not found in
     * the store, valueNotFoundText will be displayed as the field text if defined (defaults to undefined)
     */
    valueNotFoundText : undefined,
    /**
     * @cfg {Boolean} blockFocus Prevents all focus calls, so it can work with things like HTML edtor bar
     */
    blockFocus : false,
    
    /**
     * @cfg {Boolean} disableClear Disable showing of clear button.
     */
    disableClear : false,
    /**
     * @cfg {Boolean} alwaysQuery  Disable caching of results, and always send query
     */
    alwaysQuery : false,
    
    //private
    addicon : false,
    editicon: false,
    
    // element that contains real text value.. (when hidden is used..)
     
    // private
    initEvents: function(){
        
        if (!this.store) {
            throw "can not find store for combo";
        }
        this.store = Roo.factory(this.store, Roo.data);
        
        
        
        Roo.bootstrap.ComboBox.superclass.initEvents.call(this);
        
        
        if(this.hiddenName){
            
            this.hiddenField = this.el.select('input.form-hidden-field',true).first();
            
            this.hiddenField.dom.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
            this.hiddenField.dom.setAttribute('name', this.hiddenName);
             
             
        }
        //if(Roo.isGecko){
        //    this.el.dom.setAttribute('autocomplete', 'off');
        //}

        var cls = 'x-combo-list';
        this.list = this.el.select('ul',true).first();

        //this.list = new Roo.Layer({
        //    shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        //});
        
        var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        
        /*
        this.list.swallowEvent('mousewheel');
        this.assetHeight = 0;

        if(this.title){
            this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
            this.assetHeight += this.header.getHeight();
        }

        this.innerList = this.list.createChild({cls:cls+'-inner'});
        this.innerList.on('mouseover', this.onViewOver, this);
        this.innerList.on('mousemove', this.onViewMove, this);
        this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        
        if(this.allowBlank && !this.pageSize && !this.disableClear){
            this.footer = this.list.createChild({cls:cls+'-ft'});
            this.pageTb = new Roo.Toolbar(this.footer);
           
        }
        if(this.pageSize){
            this.footer = this.list.createChild({cls:cls+'-ft'});
            this.pageTb = new Roo.PagingToolbar(this.footer, this.store,
                    {pageSize: this.pageSize});
            
        }
        
        if (this.pageTb && this.allowBlank && !this.disableClear) {
            var _this = this;
            this.pageTb.add(new Roo.Toolbar.Fill(), {
                cls: 'x-btn-icon x-btn-clear',
                text: '&#160;',
                handler: function()
                {
                    _this.collapse();
                    _this.clearValue();
                    _this.onSelect(false, -1);
                }
            });
        }
        if (this.footer) {
            this.assetHeight += this.footer.getHeight();
        }
        */
            
        if(!this.tpl){
            this.tpl = '<li><a href="#">{' + this.displayField + '}</a></li>';
        }

        this.view = new Roo.View(this.el.select('ul',true).first(), this.tpl, {
            singleSelect:true, store: this.store, selectedClass: this.selectedClass
        });
        //this.view.wrapEl.setDisplayed(false);
        this.view.on('click', this.onViewClick, this);
        this.view.on('scroll', this.onViewScroll, this);
        
        
        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        /*
        if(this.resizable){
            this.resizer = new Roo.Resizable(this.list,  {
               pinned:true, handles:'se'
            });
            this.resizer.on('resize', function(r, w, h){
                this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                this.listWidth = w;
                this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                this.restrictHeight();
            }, this);
            this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
        }
        */
        if(!this.editable){
            this.editable = true;
            this.setEditable(false);
        }
        
        /*
        
        if (typeof(this.events.add.listeners) != 'undefined') {
            
            this.addicon = this.wrap.createChild(
                {tag: 'img', src: Roo.BLANK_IMAGE_URL, cls: 'x-form-combo-add' });  
       
            this.addicon.on('click', function(e) {
                this.fireEvent('add', this);
            }, this);
        }
        if (typeof(this.events.edit.listeners) != 'undefined') {
            
            this.editicon = this.wrap.createChild(
                {tag: 'img', src: Roo.BLANK_IMAGE_URL, cls: 'x-form-combo-edit' });  
            if (this.addicon) {
                this.editicon.setStyle('margin-left', '40px');
            }
            this.editicon.on('click', function(e) {
                
                // we fire even  if inothing is selected..
                this.fireEvent('edit', this, this.lastData );
                
            }, this);
        }
        */
        
 
        this.keyNav = new Roo.KeyNav(this.inputEl(), {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
                //return true;
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
                return true;
            },

            scope : this,

            doRelay : function(foo, bar, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                   return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return true;
            },

            forceKeyDown: true
        });
        
        
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        
        
        this.dqTask = new Roo.util.DelayedTask(this.initQuery, this);
        
        if(this.typeAhead){
            this.taTask = new Roo.util.DelayedTask(this.onTypeAhead, this);
        }
        if(this.editable !== false){
            this.inputEl().on("keyup", this.onKeyUp, this);
        }
        if(this.forceSelection){
            this.on('blur', this.doForce, this);
        }
    },

    onDestroy : function(){
        if(this.view){
            this.view.setStore(null);
            this.view.el.removeAllListeners();
            this.view.el.remove();
            this.view.purgeListeners();
        }
        if(this.list){
            this.list.dom.innerHTML  = '';
        }
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.onLoadException, this);
        }
        Roo.bootstrap.ComboBox.superclass.onDestroy.call(this);
    },

    // private
    fireKey : function(e){
        if(e.isNavKeyPress() && !this.list.isVisible()){
            this.fireEvent("specialkey", this, e);
        }
    },

    // private
    onResize: function(w, h){
//        Roo.bootstrap.ComboBox.superclass.onResize.apply(this, arguments);
//        
//        if(typeof w != 'number'){
//            // we do not handle it!?!?
//            return;
//        }
//        var tw = this.trigger.getWidth();
//       // tw += this.addicon ? this.addicon.getWidth() : 0;
//       // tw += this.editicon ? this.editicon.getWidth() : 0;
//        var x = w - tw;
//        this.inputEl().setWidth( this.adjustWidth('input', x));
//            
//        //this.trigger.setStyle('left', x+'px');
//        
//        if(this.list && this.listWidth === undefined){
//            var lw = Math.max(x + this.trigger.getWidth(), this.minListWidth);
//            this.list.setWidth(lw);
//            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
//        }
        
    
        
    },

    /**
     * Allow or prevent the user from directly editing the field text.  If false is passed,
     * the user will only be able to select from the items defined in the dropdown list.  This method
     * is the runtime equivalent of setting the 'editable' config option at config time.
     * @param {Boolean} value True to allow the user to directly edit the field text
     */
    setEditable : function(value){
        if(value == this.editable){
            return;
        }
        this.editable = value;
        if(!value){
            this.inputEl().dom.setAttribute('readOnly', true);
            this.inputEl().on('mousedown', this.onTriggerClick,  this);
            this.inputEl().addClass('x-combo-noedit');
        }else{
            this.inputEl().dom.setAttribute('readOnly', false);
            this.inputEl().un('mousedown', this.onTriggerClick,  this);
            this.inputEl().removeClass('x-combo-noedit');
        }
    },

    // private
    onBeforeLoad : function(){
        if(!this.hasFocus){
            return;
        }
        //this.innerList.update(this.loadingText ?
        //       '<div class="loading-indicator">'+this.loadingText+'</div>' : '');
        this.list.dom.innerHTML = '<li class="loading-indicator">'+(this.loadingText||'loading')+'</li>' ;
        
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    // private
    onLoad : function(){
        if(!this.hasFocus){
            return;
        }
        if(this.store.getCount() > 0){
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable){
                    this.inputEl().dom.select();
                }
                if(!this.selectByValue(this.value, true)){
                    this.select(0, true);
                }
            }else{
                this.selectNext();
                if(this.typeAhead && this.lastKey != Roo.EventObject.BACKSPACE && this.lastKey != Roo.EventObject.DELETE){
                    this.taTask.delay(this.typeAheadDelay);
                }
            }
        }else{
            this.onEmptyResults();
        }
        //this.el.focus();
    },
    // private
    onLoadException : function()
    {
        this.collapse();
        Roo.log(this.store.reader.jsonData);
        if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
            // fixme
            //Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
        }
        
        
    },
    // private
    onTypeAhead : function(){
        if(this.store.getCount() > 0){
            var r = this.store.getAt(0);
            var newValue = r.data[this.displayField];
            var len = newValue.length;
            var selStart = this.getRawValue().length;
            
            if(selStart != len){
                this.setRawValue(newValue);
                this.selectText(selStart, newValue.length);
            }
        }
    },

    // private
    onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){
            this.setFromData(index > -1 ? record.data : false);
            this.collapse();
            this.fireEvent('select', this, record, index);
        }
    },

    /**
     * Returns the currently selected field value or empty string if no value is set.
     * @return {String} value The selected value
     */
    getValue : function(){
        if(this.valueField){
            return typeof this.value != 'undefined' ? this.value : '';
        }else{
            return Roo.bootstrap.ComboBox.superclass.getValue.call(this);
        }
    },

    /**
     * Clears any text/value currently set in the field
     */
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.dom.value = '';
        }
        this.value = '';
        this.setRawValue('');
        this.lastSelectionText = '';
        
    },

    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     */
    setValue : function(v){
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(this.valueNotFoundText !== undefined){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.dom.value = v;
        }
        Roo.bootstrap.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
    },
    /**
     * @property {Object} the last set data for the element
     */
    
    lastData : false,
    /**
     * Sets the value of the field based on a object which is related to the record format for the store.
     * @param {Object} value the value to set as. or false on reset?
     */
    setFromData : function(o){
        var dv = ''; // display value
        var vv = ''; // value value..
        this.lastData = o;
        if (this.displayField) {
            dv = !o || typeof(o[this.displayField]) == 'undefined' ? '' : o[this.displayField];
        } else {
            // this is an error condition!!!
            Roo.log('no  displayField value set for '+ (this.name ? this.name : this.id));
        }
        
        if(this.valueField){
            vv = !o || typeof(o[this.valueField]) == 'undefined' ? dv : o[this.valueField];
        }
        if(this.hiddenField){
            this.hiddenField.dom.value = vv;
            
            this.lastSelectionText = dv;
            Roo.bootstrap.ComboBox.superclass.setValue.call(this, dv);
            this.value = vv;
            return;
        }
        // no hidden field.. - we store the value in 'value', but still display
        // display field!!!!
        this.lastSelectionText = dv;
        Roo.bootstrap.ComboBox.superclass.setValue.call(this, dv);
        this.value = vv;
        
        
    },
    // private
    reset : function(){
        // overridden so that last data is reset..
        this.setValue(this.originalValue);
        this.clearInvalid();
        this.lastData = false;
        if (this.view) {
            this.view.clearSelections();
        }
    },
    // private
    findRecord : function(prop, value){
        var record;
        if(this.store.getCount() > 0){
            this.store.each(function(r){
                if(r.data[prop] == value){
                    record = r;
                    return false;
                }
                return true;
            });
        }
        return record;
    },
    
    getName: function()
    {
        // returns hidden if it's set..
        if (!this.rendered) {return ''};
        return !this.hiddenName && this.inputEl().dom.name  ? this.inputEl().dom.name : (this.hiddenName || '');
        
    },
    // private
    onViewMove : function(e, t){
        this.inKeyMode = false;
    },

    // private
    onViewOver : function(e, t){
        Roo.log('on VIew over');
        if(this.inKeyMode){ // prevent key nav and mouse over conflicts
            return;
        }
        var item = this.view.findItemFromChild(t);
        if(item){
            var index = this.view.indexOf(item);
            this.select(index, false);
        }
    },

    // private
    onViewClick : function(doFocus)
    {
        Roo.log('on view click');
        var index = this.view.getSelectedIndexes()[0];
        var r = this.store.getAt(index);
        if(r){
            this.onSelect(r, index);
        }
        if(doFocus !== false && !this.blockFocus){
            this.inputEl().focus();
        }
    },

    // private
    restrictHeight : function(){
        //this.innerList.dom.style.height = '';
        //var inner = this.innerList.dom;
        //var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
        //this.innerList.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
        //this.list.beginUpdate();
        //this.list.setHeight(this.innerList.getHeight()+this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight);
        this.list.alignTo(this.inputEl(), this.listAlign);
        //this.list.endUpdate();
    },

    // private
    onEmptyResults : function(){
        this.collapse();
    },

    /**
     * Returns true if the dropdown list is expanded, else false.
     */
    isExpanded : function(){
        return this.list.isVisible();
    },

    /**
     * Select an item in the dropdown list by its data value. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {String} value The data value of the item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     * @return {Boolean} True if the value matched an item in the list, else false
     */
    selectByValue : function(v, scrollIntoView){
        if(v !== undefined && v !== null){
            var r = this.findRecord(this.valueField || this.displayField, v);
            if(r){
                this.select(this.store.indexOf(r), scrollIntoView);
                return true;
            }
        }
        return false;
    },

    /**
     * Select an item in the dropdown list by its numeric index in the list. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {Number} index The zero-based index of the list item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     */
    select : function(index, scrollIntoView){
        this.selectedIndex = index;
        this.view.select(index);
        if(scrollIntoView !== false){
            var el = this.view.getNode(index);
            if(el){
                //this.innerList.scrollChildIntoView(el, false);
                
            }
        }
    },

    // private
    selectNext : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex < ct-1){
                this.select(this.selectedIndex+1);
            }
        }
    },

    // private
    selectPrev : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex != 0){
                this.select(this.selectedIndex-1);
            }
        }
    },

    // private
    onKeyUp : function(e){
        if(this.editable !== false && !e.isSpecialKey()){
            this.lastKey = e.getKey();
            this.dqTask.delay(this.queryDelay);
        }
    },

    // private
    validateBlur : function(){
        return !this.list || !this.list.isVisible();   
    },

    // private
    initQuery : function(){
        this.doQuery(this.getRawValue());
    },

    // private
    doForce : function(){
        if(this.el.dom.value.length > 0){
            this.el.dom.value =
                this.lastSelectionText === undefined ? '' : this.lastSelectionText;
             
        }
    },

    /**
     * Execute a query to filter the dropdown list.  Fires the beforequery event prior to performing the
     * query allowing the query action to be canceled if needed.
     * @param {String} query The SQL query to execute
     * @param {Boolean} forceAll True to force the query to execute even if there are currently fewer characters
     * in the field than the minimum specified by the minChars config option.  It also clears any filter previously
     * saved in the current store (defaults to false)
     */
    doQuery : function(q, forceAll){
        if(q === undefined || q === null){
            q = '';
        }
        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return false;
        }
        q = qe.query;
        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            if(this.lastQuery != q || this.alwaysQuery){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        this.store.filter(this.displayField, q);
                    }
                    this.onLoad();
                }else{
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
    },

    // private
    getParams : function(q){
        var p = {};
        //p[this.queryParam] = q;
        if(this.pageSize){
            p.start = 0;
            p.limit = this.pageSize;
        }
        return p;
    },

    /**
     * Hides the dropdown list if it is currently expanded. Fires the 'collapse' event on completion.
     */
    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).un('keydown', this.listKeyPress, this);
        }
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        if(!e.within(this.el) && !e.within(this.el)){
            this.collapse();
        }
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
        Roo.log('expand');
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        this.list.alignTo(this.inputEl(), this.listAlign);
        this.list.show();
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).on('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('expand', this);
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function()
    {
        Roo.log('trigger click');
        
        if(this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            if (!this.blockFocus) {
                this.inputEl().focus();
            }
            
        }else {
            this.hasFocus = true;
            if(this.triggerAction == 'all') {
                this.doQuery(this.allQuery, true);
            } else {
                this.doQuery(this.getRawValue());
            }
            if (!this.blockFocus) {
                this.inputEl().focus();
            }
        }
    },
    listKeyPress : function(e)
    {
        //Roo.log('listkeypress');
        // scroll to first matching element based on key pres..
        if (e.isSpecialKey()) {
            return false;
        }
        var k = String.fromCharCode(e.getKey()).toUpperCase();
        //Roo.log(k);
        var match  = false;
        var csel = this.view.getSelectedNodes();
        var cselitem = false;
        if (csel.length) {
            var ix = this.view.indexOf(csel[0]);
            cselitem  = this.store.getAt(ix);
            if (!cselitem.get(this.displayField) || cselitem.get(this.displayField).substring(0,1).toUpperCase() != k) {
                cselitem = false;
            }
            
        }
        
        this.store.each(function(v) { 
            if (cselitem) {
                // start at existing selection.
                if (cselitem.id == v.id) {
                    cselitem = false;
                }
                return true;
            }
                
            if (v.get(this.displayField) && v.get(this.displayField).substring(0,1).toUpperCase() == k) {
                match = this.store.indexOf(v);
                return false;
            }
            return true;
        }, this);
        
        if (match === false) {
            return true; // no more action?
        }
        // scroll to?
        this.view.select(match);
        var sn = Roo.get(this.view.getSelectedNodes()[0])
        //sn.scrollIntoView(sn.dom.parentNode, false);
    },
    
    onViewScroll : function()
    {
        Roo.log('on View Scroll');
    }

    /** 
    * @cfg {Boolean} grow 
    * @hide 
    */
    /** 
    * @cfg {Number} growMin 
    * @hide 
    */
    /** 
    * @cfg {Number} growMax 
    * @hide 
    */
    /**
     * @hide
     * @method autoSize
     */
});
