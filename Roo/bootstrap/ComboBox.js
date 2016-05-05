/*
 * - LGPL
 * * 
 */

/**
 * @class Roo.bootstrap.ComboBox
 * @extends Roo.bootstrap.TriggerField
 * A combobox control with support for autocomplete, remote-loading, paging and many other features.
 * @cfg {Boolean} append (true|false) default false
 * @cfg {Boolean} autoFocus (true|false) auto focus the first item, default true
 * @cfg {Boolean} tickable ComboBox with tickable selections (true|false), default false
 * @cfg {Boolean} triggerList trigger show the list or not (true|false) default true
 * @cfg {Boolean} showToggleBtn show toggle button or not (true|false) default true
 * @cfg {String} btnPosition set the position of the trigger button (left | right) default right
 * @cfg {Boolean} animate default true
 * @cfg {Boolean} emptyResultText only for touch device
 * @cfg {String} triggerText multiple combobox trigger button text default 'Select'
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
        'edit' : true,
        /**
         * @event remove
         * Fires when the remove value from the combobox array
	     * @param {Roo.bootstrap.ComboBox} combo This combo box
	     */
        'remove' : true,
        /**
         * @event specialfilter
         * Fires when specialfilter
            * @param {Roo.bootstrap.ComboBox} combo This combo box
            */
        'specialfilter' : true,
        /**
         * @event tick
         * Fires when tick the element
            * @param {Roo.bootstrap.ComboBox} combo This combo box
            */
        'tick' : true,
        /**
         * @event touchviewdisplay
         * Fires when touch view require special display (default is using displayField)
            * @param {Roo.bootstrap.ComboBox} combo This combo box
            * @param {Object} cfg set html .
            */
        'touchviewdisplay' : true
        
    });
    
    this.item = [];
    this.tickItems = [];
    
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
    
    /**
     * @cfg {Boolean} multiple  (true|false) ComboBobArray, default false
     */
    multiple : false,
    
    /**
     * @cfg {String} invalidClass The CSS class to use when marking a field invalid (defaults to "x-form-invalid")
     */
    invalidClass : "has-warning",
    
    /**
     * @cfg {String} validClass The CSS class to use when marking a field valid (defaults to "x-form-invalid")
     */
    validClass : "has-success",
    
    /**
     * @cfg {Boolean} specialFilter (true|false) special filter default false
     */
    specialFilter : false,
    
    /**
     * @cfg {Boolean} mobileTouchView (true|false) show mobile touch view when using a mobile default true
     */
    mobileTouchView : true,
    
    //private
    addicon : false,
    editicon: false,
    
    page: 0,
    hasQuery: false,
    append: false,
    loadNext: false,
    autoFocus : true,
    tickable : false,
    btnPosition : 'right',
    triggerList : true,
    showToggleBtn : true,
    animate : true,
    emptyResultText: 'Empty',
    triggerText : 'Select',
    
    // element that contains real text value.. (when hidden is used..)
    
    getAutoCreate : function()
    {
        var cfg = false;
        
        /*
         * Touch Devices
         */
        
        if(Roo.isTouch && this.mobileTouchView){
            cfg = this.getAutoCreateTouchView();
            return cfg;;
        }
        
        /*
         *  Normal ComboBox
         */
        if(!this.tickable){
            cfg = Roo.bootstrap.ComboBox.superclass.getAutoCreate.call(this);
            return cfg;
        }
        
        /*
         *  ComboBox with tickable selections
         */
             
        var align = this.labelAlign || this.parentLabelAlign();
        
        cfg = {
            cls : 'form-group roo-combobox-tickable' //input-group
        };
        
        var buttons = {
            tag : 'div',
            cls : 'tickable-buttons',
            cn : [
                {
                    tag : 'button',
                    type : 'button',
                    cls : 'btn btn-link btn-edit pull-' + this.btnPosition,
                    html : this.triggerText
                },
                {
                    tag : 'button',
                    type : 'button',
                    name : 'ok',
                    cls : 'btn btn-link btn-ok pull-' + this.btnPosition,
                    html : 'Done'
                },
                {
                    tag : 'button',
                    type : 'button',
                    name : 'cancel',
                    cls : 'btn btn-link btn-cancel pull-' + this.btnPosition,
                    html : 'Cancel'
                }
            ]
        };
        
        if(this.editable){
            buttons.cn.unshift({
                tag: 'input',
                cls: 'select2-search-field-input'
            });
        }
        
        var _this = this;
        
        Roo.each(buttons.cn, function(c){
            if (_this.size) {
                c.cls += ' btn-' + _this.size;
            }

            if (_this.disabled) {
                c.disabled = true;
            }
        });
        
        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                {
                    tag: 'ul',
                    cls: 'select2-choices',
                    cn:[
                        {
                            tag: 'li',
                            cls: 'select2-search-field',
                            cn: [

                                buttons
                            ]
                        }
                    ]
                }
            ]
        };
        
        var combobox = {
            cls: 'select2-container input-group select2-container-multi',
            cn: [
                box
//                {
//                    tag: 'ul',
//                    cls: 'typeahead typeahead-long dropdown-menu',
//                    style: 'display:none; max-height:' + this.maxHeight + 'px;'
//                }
            ]
        };
        
        if(this.hasFeedback && !this.allowBlank){
            
            var feedback = {
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            };

            combobox.cn.push(feedback);
        }
        
        if (align ==='left' && this.fieldLabel.length) {
            
                Roo.log("left and has label");
                cfg.cn = [
                    
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label col-sm-' + this.labelWidth,
                        html : this.fieldLabel
                        
                    },
                    {
                        cls : "col-sm-" + (12 - this.labelWidth), 
                        cn: [
                            combobox
                        ]
                    }
                    
                ];
        } else if ( this.fieldLabel.length) {
                Roo.log(" label");
                 cfg.cn = [
                   
                    {
                        tag: 'label',
                        //cls : 'input-group-addon',
                        html : this.fieldLabel
                        
                    },
                    
                    combobox
                    
                ];

        } else {
            
                Roo.log(" no label && no align");
                cfg = combobox
                     
                
        }
         
        var settings=this;
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
        
    },
    
    _initEventsCalled : false,
    
    // private
    initEvents: function()
    {
        
        if (this._initEventsCalled) { // as we call render... prevent looping...
            return;
        }
        this._initEventsCalled = true;
        
        if (!this.store) {
            throw "can not find store for combo";
        }
        
        this.store = Roo.factory(this.store, Roo.data);
        
        // if we are building from html. then this element is so complex, that we can not really
        // use the rendered HTML.
        // so we have to trash and replace the previous code.
        if (Roo.XComponent.build_from_html) {
            
            // remove this element....
            var e = this.el.dom, k=0;
            while (e ) { e = e.previousSibling;  ++k;}

            this.el.remove();
            
            this.el=false;
            this.rendered = false;
            
            this.render(this.parent().getChildContainer(true), k);
            
            
            
        }
        
        
        /*
         * Touch Devices
         */
        
        if(Roo.isTouch && this.mobileTouchView){
            this.initTouchView();
            return;
        }
        
        if(this.tickable){
            this.initTickableEvents();
            return;
        }
        
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
        
        //this.list = new Roo.Layer({
        //    shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
        //});
        
        var _this = this;
        
        (function(){
            var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
            _this.list.setWidth(lw);
        }).defer(100);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        
        this.list.on('scroll', this.onViewScroll, this);
        
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

        this.view = new Roo.View(this.list, this.tpl, {
            singleSelect:true, store: this.store, selectedClass: this.selectedClass
        });
        //this.view.wrapEl.setDisplayed(false);
        this.view.on('click', this.onViewClick, this);
        
        
        
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
//                this.onViewClick();
                //return true;
                this.collapse();
                
                if(this.fireEvent("specialkey", this, e)){
                    this.onViewClick(false);
                }
                
                return true;
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
            this.inputEl().on('blur', this.doForce, this);
        }
        
        if(this.multiple){
            this.choices = this.el.select('ul.select2-choices', true).first();
            this.searchField = this.el.select('ul li.select2-search-field', true).first();
        }
    },
    
    initTickableEvents: function()
    {   
        this.createList();
        
        if(this.hiddenName){
            
            this.hiddenField = this.el.select('input.form-hidden-field',true).first();
            
            this.hiddenField.dom.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            // prevent input submission
            this.el.dom.removeAttribute('name');
            this.hiddenField.dom.setAttribute('name', this.hiddenName);
             
             
        }
        
//        this.list = this.el.select('ul.dropdown-menu',true).first();
        
        this.choices = this.el.select('ul.select2-choices', true).first();
        this.searchField = this.el.select('ul li.select2-search-field', true).first();
        if(this.triggerList){
            this.searchField.on("click", this.onSearchFieldClick, this, {preventDefault:true});
        }
         
        this.trigger = this.el.select('.tickable-buttons > .btn-edit', true).first();
        this.trigger.on("click", this.onTickableTriggerClick, this, {preventDefault:true});
        
        this.okBtn = this.el.select('.tickable-buttons > .btn-ok', true).first();
        this.cancelBtn = this.el.select('.tickable-buttons > .btn-cancel', true).first();
        
        this.okBtn.on('click', this.onTickableFooterButtonClick, this, this.okBtn);
        this.cancelBtn.on('click', this.onTickableFooterButtonClick, this, this.cancelBtn);
        
        this.trigger.setVisibilityMode(Roo.Element.DISPLAY);
        this.okBtn.setVisibilityMode(Roo.Element.DISPLAY);
        this.cancelBtn.setVisibilityMode(Roo.Element.DISPLAY);
        
        this.okBtn.hide();
        this.cancelBtn.hide();
        
        var _this = this;
        
        (function(){
            var lw = _this.listWidth || Math.max(_this.inputEl().getWidth(), _this.minListWidth);
            _this.list.setWidth(lw);
        }).defer(100);
        
        this.list.on('mouseover', this.onViewOver, this);
        this.list.on('mousemove', this.onViewMove, this);
        
        this.list.on('scroll', this.onViewScroll, this);
        
        if(!this.tpl){
            this.tpl = '<li class="select2-result"><div class="checkbox"><input id="{roo-id}" type="checkbox" {roo-data-checked}><label for="{roo-id}"><b>{' + this.displayField + '}</b></label></li>';
        }

        this.view = new Roo.View(this.list, this.tpl, {
            singleSelect:true, tickable:true, parent:this, store: this.store, selectedClass: this.selectedClass
        });
        
        //this.view.wrapEl.setDisplayed(false);
        this.view.on('click', this.onViewClick, this);
        
        
        
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoadException, this);
        
        if(this.editable){
            this.keyNav = new Roo.KeyNav(this.tickableInputEl(), {
                "up" : function(e){
                    this.inKeyMode = true;
                    this.selectPrev();
                },

                "down" : function(e){
                    this.inKeyMode = true;
                    this.selectNext();
                },

                "enter" : function(e){
                    if(this.fireEvent("specialkey", this, e)){
                        this.onViewClick(false);
                    }
                    
                    return true;
                },

                "esc" : function(e){
                    this.onTickableFooterButtonClick(e, false, false);
                },

                "tab" : function(e){
                    this.fireEvent("specialkey", this, e);
                    
                    this.onTickableFooterButtonClick(e, false, false);
                    
                    return true;
                },

                scope : this,

                doRelay : function(e, fn, key){
                    if(this.scope.isExpanded()){
                       return Roo.KeyNav.prototype.doRelay.apply(this, arguments);
                    }
                    return true;
                },

                forceKeyDown: true
            });
        }
        
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        
        
        this.dqTask = new Roo.util.DelayedTask(this.initQuery, this);
        
        if(this.typeAhead){
            this.taTask = new Roo.util.DelayedTask(this.onTypeAhead, this);
        }
        
        if(this.editable !== false){
            this.tickableInputEl().on("keyup", this.onKeyUp, this);
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
    
    onBeforeLoad : function(combo,opts){
        if(!this.hasFocus){
            return;
        }
         if (!opts.add) {
            this.list.dom.innerHTML = '<li class="loading-indicator">'+(this.loadingText||'loading')+'</li>' ;
         }
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    // private
    onLoad : function(){
        
        this.hasQuery = false;
        
        if(!this.hasFocus){
            return;
        }
        
        if(typeof(this.loading) !== 'undefined' && this.loading !== null){
            this.loading.hide();
        }
             
        if(this.store.getCount() > 0){
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable && !this.tickable){
                    this.inputEl().dom.select();
                }
                
                if(
                    !this.selectByValue(this.value, true) &&
                    this.autoFocus && 
                    (
                        !this.store.lastOptions ||
                        typeof(this.store.lastOptions.add) == 'undefined' || 
                        this.store.lastOptions.add != true
                    )
                ){
                    this.select(0, true);
                }
            }else{
                if(this.autoFocus){
                    this.selectNext();
                }
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
        this.hasQuery = false;
        
        if(typeof(this.loading) !== 'undefined' && this.loading !== null){
            this.loading.hide();
        }
        
        if(this.tickable && this.editable){
            return;
        }
        
        this.collapse();
        // only causes errors at present
        //Roo.log(this.store.reader.jsonData);
        //if (this.store && typeof(this.store.reader.jsonData.errorMsg) != 'undefined') {
            // fixme
            //Roo.MessageBox.alert("Error loading",this.store.reader.jsonData.errorMsg);
        //}
        
        
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
        
        if(this.multiple){
            return (this.hiddenField) ? this.hiddenField.dom.value : this.value;
        }
        
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
        this.lastData = false;
        
        var close = this.closeTriggerEl();
        
        if(close){
            close.hide();
        }
        
    },

    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     */
    setValue : function(v){
        if(this.multiple){
            this.syncValue();
            return;
        }
        
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
        
        var close = this.closeTriggerEl();
        
        if(close){
            (v && (v.length || v * 1 > 0)) ? close.show() : close.hide();
        }
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
        
        if(this.multiple){
            this.addItem(o);
            return;
        }
            
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
        
        var close = this.closeTriggerEl();
        
        if(close){
            (vv.length || vv * 1 > 0) ? close.show() : close.hide();
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
        
        if(this.multiple){
            this.clearItem();
            return;
        }
        
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
    onViewClick : function(view, doFocus, el, e)
    {
        var index = this.view.getSelectedIndexes()[0];
        
        var r = this.store.getAt(index);
        
        if(this.tickable){
            
            if(typeof(e) != 'undefined' && e.getTarget().nodeName.toLowerCase() != 'input'){
                return;
            }
            
            var rm = false;
            var _this = this;
            
            Roo.each(this.tickItems, function(v,k){
                
                if(typeof(v) != 'undefined' && v[_this.valueField] == r.data[_this.valueField]){
                    Roo.log(v);
                    _this.tickItems.splice(k, 1);
                    
                    if(typeof(e) == 'undefined' && view == false){
                        Roo.get(_this.view.getNodes(index, index)[0]).select('input', true).first().dom.checked = false;
                    }
                    
                    rm = true;
                    return;
                }
            });
            
            if(rm){
                return;
            }
            
            if(this.fireEvent('tick', this, r, index, Roo.get(_this.view.getNodes(index, index)[0]).select('input', true).first().dom.checked) !== false){
                this.tickItems.push(r.data);
            }
            
            if(typeof(e) == 'undefined' && view == false){
                Roo.get(_this.view.getNodes(index, index)[0]).select('input', true).first().dom.checked = true;
            }
                    
            return;
        }
        
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
        this.list.alignTo(this.inputEl(), this.listAlign);
        //this.list.endUpdate();
    },

    // private
    onEmptyResults : function(){
        
        if(this.tickable && this.editable){
            this.restrictHeight();
            return;
        }
        
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
            /*
             * el && !this.multiple && !this.tickable // not sure why we disable multiple before..
             */
            if(el){
                this.list.scrollChildIntoView(el, false);
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
        
        var v = this.getRawValue();
        
        if(this.tickable && this.editable){
            v = this.tickableInputEl().getValue();
        }
        
        this.doQuery(v);
    },

    // private
    doForce : function(){
        if(this.inputEl().dom.value.length > 0){
            this.inputEl().dom.value =
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
            
            this.hasQuery = true;
            
            if(this.lastQuery != q || this.alwaysQuery){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        
                        if(this.specialFilter){
                            this.fireEvent('specialfilter', this);
                            this.onLoad();
                            return;
                        }
                        
                        this.store.filter(this.displayField, q);
                    }
                    
                    this.store.fireEvent("datachanged", this.store);
                    
                    this.onLoad();
                    
                    
                }else{
                    
                    this.store.baseParams[this.queryParam] = q;
                    
                    var options = {params : this.getParams(q)};
                    
                    if(this.loadNext){
                        options.add = true;
                        options.params.start = this.page * this.pageSize;
                    }
                    
                    this.store.load(options);
                    
                    /*
                     *  this code will make the page width larger, at the beginning, the list not align correctly, 
                     *  we should expand the list on onLoad
                     *  so command out it
                     */
//                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
        
        this.loadNext = false;
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
        
        if(this.tickable){
            this.hasFocus = false;
            this.okBtn.hide();
            this.cancelBtn.hide();
            this.trigger.show();
            
            if(this.editable){
                this.tickableInputEl().dom.value = '';
                this.tickableInputEl().blur();
            }
            
        }
        
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).un('keydown', this.listKeyPress, this);
        }
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        var in_combo  = e.within(this.el);
        var in_list =  e.within(this.list);
        var is_list = (Roo.get(e.getTarget()).id == this.list.id) ? true : false;
        
        if (in_combo || in_list || is_list) {
            //e.stopPropagation();
            return;
        }
        
        if(this.tickable){
            this.onTickableFooterButtonClick(e, false, false);
        }

        this.collapse();
        
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the 'expand' event on completion.
     */
    expand : function(){
       
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        
        var lw = this.listWidth || Math.max(this.inputEl().getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        
        
         Roo.log('expand');
        
        this.list.show();
        
        this.restrictHeight();
        
        if(this.tickable){
            
            this.tickItems = Roo.apply([], this.item);
            
            this.okBtn.show();
            this.cancelBtn.show();
            this.trigger.hide();
            
            if(this.editable){
                this.tickableInputEl().focus();
            }
            
        }
        
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        if (!this.editable) {
            Roo.get(document).on('keydown', this.listKeyPress, this);
        }
        
        this.fireEvent('expand', this);
    },

    // private
    // Implements the default empty TriggerField.onTriggerClick function
    onTriggerClick : function(e)
    {
        Roo.log('trigger click');
        
        if(this.disabled || !this.triggerList){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        
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
    
    onTickableTriggerClick : function(e)
    {
        if(this.disabled){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        this.hasFocus = true;
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
        } else {
            this.doQuery(this.getRawValue());
        }
    },
    
    onSearchFieldClick : function(e)
    {
        if(this.hasFocus && !this.disabled && e.getTarget().nodeName.toLowerCase() != 'button'){
            this.onTickableFooterButtonClick(e, false, false);
            return;
        }
        
        if(this.hasFocus || this.disabled || e.getTarget().nodeName.toLowerCase() == 'button'){
            return;
        }
        
        this.page = 0;
        this.loadNext = false;
        this.hasFocus = true;
        
        if(this.triggerAction == 'all') {
            this.doQuery(this.allQuery, true);
        } else {
            this.doQuery(this.getRawValue());
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
        var sn = Roo.get(this.view.getSelectedNodes()[0]);
        sn.scrollIntoView(sn.dom.parentNode, false);
    },
    
    onViewScroll : function(e, t){
        
        if(this.view.el.getScroll().top == 0 ||this.view.el.getScroll().top < this.view.el.dom.scrollHeight - this.view.el.dom.clientHeight || !this.hasFocus || !this.append || this.hasQuery){
            return;
        }
        
        this.hasQuery = true;
        
        this.loading = this.list.select('.loading', true).first();
        
        if(this.loading === null){
            this.list.createChild({
                tag: 'div',
                cls: 'loading select2-more-results select2-active',
                html: 'Loading more results...'
            });
            
            this.loading = this.list.select('.loading', true).first();
            
            this.loading.setVisibilityMode(Roo.Element.DISPLAY);
            
            this.loading.hide();
        }
        
        this.loading.show();
        
        var _combo = this;
        
        this.page++;
        this.loadNext = true;
        
        (function() { _combo.doQuery(_combo.allQuery, true); }).defer(500);
        
        return;
    },
    
    addItem : function(o)
    {   
        var dv = ''; // display value
        
        if (this.displayField) {
            dv = !o || typeof(o[this.displayField]) == 'undefined' ? '' : o[this.displayField];
        } else {
            // this is an error condition!!!
            Roo.log('no  displayField value set for '+ (this.name ? this.name : this.id));
        }
        
        if(!dv.length){
            return;
        }
        
        var choice = this.choices.createChild({
            tag: 'li',
            cls: 'select2-search-choice',
            cn: [
                {
                    tag: 'div',
                    html: dv
                },
                {
                    tag: 'a',
                    href: '#',
                    cls: 'select2-search-choice-close',
                    tabindex: '-1'
                }
            ]
            
        }, this.searchField);
        
        var close = choice.select('a.select2-search-choice-close', true).first();
        
        close.on('click', this.onRemoveItem, this, { item : choice, data : o} );
        
        this.item.push(o);
        
        this.lastData = o;
        
        this.syncValue();
        
        this.inputEl().dom.value = '';
        
        this.validate();
    },
    
    onRemoveItem : function(e, _self, o)
    {
        e.preventDefault();
        
        this.lastItem = Roo.apply([], this.item);
        
        var index = this.item.indexOf(o.data) * 1;
        
        if( index < 0){
            Roo.log('not this item?!');
            return;
        }
        
        this.item.splice(index, 1);
        o.item.remove();
        
        this.syncValue();
        
        this.fireEvent('remove', this, e);
        
        this.validate();
        
    },
    
    syncValue : function()
    {
        if(!this.item.length){
            this.clearValue();
            return;
        }
            
        var value = [];
        var _this = this;
        Roo.each(this.item, function(i){
            if(_this.valueField){
                value.push(i[_this.valueField]);
                return;
            }

            value.push(i);
        });

        this.value = value.join(',');

        if(this.hiddenField){
            this.hiddenField.dom.value = this.value;
        }
        
        this.store.fireEvent("datachanged", this.store);
    },
    
    clearItem : function()
    {
        if(!this.multiple){
            return;
        }
        
        this.item = [];
        
        Roo.each(this.choices.select('>li.select2-search-choice', true).elements, function(c){
           c.remove();
        });
        
        this.syncValue();
        
        this.validate();
        
        if(this.tickable && !Roo.isTouch){
            this.view.refresh();
        }
    },
    
    inputEl: function ()
    {
        if(Roo.isTouch && this.mobileTouchView){
            return this.el.select('input.form-control',true).first();
        }
        
        if(this.tickable){
            return this.searchField;
        }
        
        return this.el.select('input.form-control',true).first();
    },
    
    
    onTickableFooterButtonClick : function(e, btn, el)
    {
        e.preventDefault();
        
        this.lastItem = Roo.apply([], this.item);
        
        if(btn && btn.name == 'cancel'){
            this.tickItems = Roo.apply([], this.item);
            this.collapse();
            return;
        }
        
        this.clearItem();
        
        var _this = this;
        
        Roo.each(this.tickItems, function(o){
            _this.addItem(o);
        });
        
        this.collapse();
        
    },
    
    validate : function()
    {
        var v = this.getRawValue();
        
        if(this.multiple){
            v = this.getValue();
        }
        
        if(this.disabled || this.allowBlank || v.length){
            this.markValid();
            return true;
        }
        
        this.markInvalid();
        return false;
    },
    
    tickableInputEl : function()
    {
        if(!this.tickable || !this.editable){
            return this.inputEl();
        }
        
        return this.inputEl().select('.select2-search-field-input', true).first();
    },
    
    
    getAutoCreateTouchView : function()
    {
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group' //input-group
        };
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            cls : 'form-control x-combo-noedit',
            autocomplete: 'new-password',
            placeholder : this.placeholder || '',
            readonly : true
        };
        
        if (this.name) {
            input.name = this.name;
        }
        
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        
        if (this.disabled) {
            input.disabled = true;
        }
        
        var inputblock = {
            cls : '',
            cn : [
                input
            ]
        };
        
        if(this.before){
            inputblock.cls += ' input-group';
            
            inputblock.cn.unshift({
                tag :'span',
                cls : 'input-group-addon',
                html : this.before
            });
        }
        
        if(this.removable && !this.multiple){
            inputblock.cls += ' roo-removable';
            
            inputblock.cn.push({
                tag: 'button',
                html : 'x',
                cls : 'roo-combo-removable-btn close'
            });
        }

        if(this.hasFeedback && !this.allowBlank){
            
            inputblock.cls += ' has-feedback';
            
            inputblock.cn.push({
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            });
            
        }
        
        if (this.after) {
            
            inputblock.cls += (this.before) ? '' : ' input-group';
            
            inputblock.cn.push({
                tag :'span',
                cls : 'input-group-addon',
                html : this.after
            });
        }

        var box = {
            tag: 'div',
            cn: [
                {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                inputblock
            ]
            
        };
        
        if(this.multiple){
            box = {
                tag: 'div',
                cn: [
                    {
                        tag: 'input',
                        type : 'hidden',
                        cls: 'form-hidden-field'
                    },
                    {
                        tag: 'ul',
                        cls: 'select2-choices',
                        cn:[
                            {
                                tag: 'li',
                                cls: 'select2-search-field',
                                cn: [

                                    inputblock
                                ]
                            }
                        ]
                    }
                ]
            }
        };
        
        var combobox = {
            cls: 'select2-container input-group',
            cn: [
                box
            ]
        };
        
        if(this.multiple){
            combobox.cls += ' select2-container-multi';
        }
        
        var align = this.labelAlign || this.parentLabelAlign();
        
        cfg.cn = combobox;
        
        if(this.fieldLabel.length){
            
            var lw = align === 'left' ? ('col-sm' + this.labelWidth) : '';
            var cw = align === 'left' ? ('col-sm' + (12 - this.labelWidth)) : '';
            
            cfg.cn = [
                {
                    tag: 'label',
                    cls : 'control-label ' + lw,
                    html : this.fieldLabel

                },
                {
                    cls : cw, 
                    cn: [
                        combobox
                    ]
                }
            ];
        }
        
        var settings = this;
        
        ['xs','sm','md','lg'].map(function(size){
            if (settings[size]) {
                cfg.cls += ' col-' + size + '-' + settings[size];
            }
        });
        
        return cfg;
    },
    
    initTouchView : function()
    {
        this.renderTouchView();
        
        this.touchViewEl.on('scroll', function(){
            this.el.dom.scrollTop = 0;
        }, this);
        
        this.inputEl().on("click", this.showTouchView, this);
        
        this.touchViewFooterEl.select('.roo-touch-view-cancel', true).first().on('click', this.hideTouchView, this);
        this.touchViewFooterEl.select('.roo-touch-view-ok', true).first().on('click', this.setTouchViewValue, this);
        
        this.maskEl = new Roo.LoadMask(this.touchViewEl, { store : this.store, msgCls: 'roo-el-mask-msg' });
        
        this.store.on('beforeload', this.onTouchViewBeforeLoad, this);
        this.store.on('load', this.onTouchViewLoad, this);
        this.store.on('loadexception', this.onTouchViewLoadException, this);
        
        if(this.hiddenName){
            
            this.hiddenField = this.el.select('input.form-hidden-field',true).first();
            
            this.hiddenField.dom.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';
        
            this.el.dom.removeAttribute('name');
            this.hiddenField.dom.setAttribute('name', this.hiddenName);
        }
        
        if(this.multiple){
            this.choices = this.el.select('ul.select2-choices', true).first();
            this.searchField = this.el.select('ul li.select2-search-field', true).first();
        }
        
        if(this.removable && !this.multiple){
            var close = this.closeTriggerEl();
            if(close){
                close.setVisibilityMode(Roo.Element.DISPLAY).hide();
                close.on('click', this.removeBtnClick, this, close);
            }
        }
        
        this.inputEl().on("focus", function(){}, this);
        
        return;
        
        
    },
    
    renderTouchView : function()
    {
        this.touchViewEl = Roo.get(document.body).createChild(Roo.bootstrap.ComboBox.touchViewTemplate);
        this.touchViewEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.touchViewHeaderEl = this.touchViewEl.select('.modal-header', true).first();
        this.touchViewHeaderEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.touchViewBodyEl = this.touchViewEl.select('.modal-body', true).first();
        this.touchViewBodyEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        this.touchViewBodyEl.setStyle('overflow', 'auto');
        
        this.touchViewListGroup = this.touchViewBodyEl.select('.list-group', true).first();
        this.touchViewListGroup.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
        this.touchViewFooterEl = this.touchViewEl.select('.modal-footer', true).first();
        this.touchViewFooterEl.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
    },
    
    showTouchView : function()
    {
        this.touchViewHeaderEl.hide();

        if(this.fieldLabel.length){
            this.touchViewHeaderEl.dom.innerHTML = this.fieldLabel;
            this.touchViewHeaderEl.show();
        }

        this.touchViewEl.show();

        this.touchViewEl.select('.modal-dialog', true).first().setStyle('margin', '0px');
        this.touchViewEl.select('.modal-dialog > .modal-content', true).first().setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));

        var bodyHeight = Roo.lib.Dom.getViewHeight() - this.touchViewFooterEl.getHeight() + this.touchViewBodyEl.getPadding('tb');

        if(this.fieldLabel.length){
            bodyHeight = bodyHeight - this.touchViewHeaderEl.getHeight();
        }
        
        this.touchViewBodyEl.setHeight(bodyHeight);

        if(this.animate){
            var _this = this;
            (function(){ _this.touchViewEl.addClass('in'); }).defer(50);
        }else{
            this.touchViewEl.addClass('in');
        }

        this.doTouchViewQuery();
        
    },
    
    hideTouchView : function()
    {
        this.touchViewEl.removeClass('in');

        if(this.animate){
            var _this = this;
            (function(){ _this.touchViewEl.setStyle('display', 'none'); }).defer(150);
        }else{
            this.touchViewEl.setStyle('display', 'none');
        }
        
    },
    
    setTouchViewValue : function()
    {
        if(this.multiple){
            this.clearItem();
        
            var _this = this;

            Roo.each(this.tickItems, function(o){
                this.addItem(o);
            }, this);
        }
        
        this.hideTouchView();
    },
    
    doTouchViewQuery : function()
    {
        var qe = {
            query: '',
            forceAll: true,
            combo: this,
            cancel:false
        };
        
        if(this.fireEvent('beforequery', qe) ===false || qe.cancel){
            return false;
        }
        
        if(!this.alwaysQuery || this.mode == 'local'){
            this.onTouchViewLoad();
            return;
        }
        
        this.store.load();
    },
    
    onTouchViewBeforeLoad : function(combo,opts)
    {
        return;
    },

    // private
    onTouchViewLoad : function()
    {
        if(this.store.getCount() < 1){
            this.onTouchViewEmptyResults();
            return;
        }
        
        this.clearTouchView();
        
        var rawValue = this.getRawValue();
        
        var template = (this.multiple) ? Roo.bootstrap.ComboBox.listItemCheckbox : Roo.bootstrap.ComboBox.listItemRadio;
        
        this.tickItems = [];
        
        this.store.data.each(function(d, rowIndex){
            var row = this.touchViewListGroup.createChild(template);
            
            if(this.displayField && typeof(d.data[this.displayField]) != 'undefined'){
                var cfg = {
                    data : d.data,
                    html : d.data[this.displayField]
                };
                
                if(this.fireEvent('touchviewdisplay', this, cfg) !== false){
                    row.select('.roo-combobox-list-group-item-value', true).first().dom.innerHTML = cfg.html;
                }
            }
            
            if(!this.multiple && this.valueField && typeof(d.data[this.valueField]) != 'undefined' && d.data[this.valueField] == this.getValue()){
                row.select('.roo-combobox-list-group-item-box > input', true).first().attr('checked', true);
            }
            
            if(this.multiple && this.valueField && typeof(d.data[this.valueField]) != 'undefined' && this.getValue().indexOf(d.data[this.valueField]) != -1){
                row.select('.roo-combobox-list-group-item-box > input', true).first().attr('checked', true);
                this.tickItems.push(d.data);
            }
            
            row.on('click', this.onTouchViewClick, this, {row : row, rowIndex : rowIndex});
            
        }, this);
        
        var firstChecked = this.touchViewListGroup.select('.list-group-item > .roo-combobox-list-group-item-box > input:checked', true).first();
        
        var bodyHeight = Roo.lib.Dom.getViewHeight() - this.touchViewFooterEl.getHeight() + this.touchViewBodyEl.getPadding('tb');

        if(this.fieldLabel.length){
            bodyHeight = bodyHeight - this.touchViewHeaderEl.getHeight();
        }

        var listHeight = this.touchViewListGroup.getHeight();
        
        var _this = this;
        
        if(firstChecked && listHeight > bodyHeight){
            (function() { firstChecked.findParent('li').scrollIntoView(_this.touchViewListGroup.dom); }).defer(500);
        }
        
    },
    
    onTouchViewLoadException : function()
    {
        this.hideTouchView();
    },
    
    onTouchViewEmptyResults : function()
    {
        this.clearTouchView();
        
        this.touchViewListGroup.createChild(Roo.bootstrap.ComboBox.emptyResult);
        
        this.touchViewListGroup.select('.roo-combobox-touch-view-empty-result', true).first().dom.innerHTML = this.emptyResultText;
        
    },
    
    clearTouchView : function()
    {
        this.touchViewListGroup.dom.innerHTML = '';
    },
    
    onTouchViewClick : function(e, el, o)
    {
        e.preventDefault();
        
        var row = o.row;
        var rowIndex = o.rowIndex;
        
        var r = this.store.getAt(rowIndex);
        
        if(!this.multiple){
            Roo.each(this.touchViewListGroup.select('.list-group-item > .roo-combobox-list-group-item-box > input:checked', true).elements, function(c){
                c.dom.removeAttribute('checked');
            }, this);
            
            row.select('.roo-combobox-list-group-item-box > input', true).first().attr('checked', true);
        
            this.setFromData(r.data);
            
            var close = this.closeTriggerEl();
        
            if(close){
                close.show();
            }

            this.hideTouchView();
            
            this.fireEvent('select', this, r, rowIndex);
            
            return;
        }
        
        if(this.valueField && typeof(r.data[this.valueField]) != 'undefined' && this.getValue().indexOf(r.data[this.valueField]) != -1){
            row.select('.roo-combobox-list-group-item-box > input', true).first().dom.removeAttribute('checked');
            this.tickItems.splice(this.tickItems.indexOf(r.data), 1);
            return;
        }
        
        row.select('.roo-combobox-list-group-item-box > input', true).first().attr('checked', true);
        this.addItem(r.data);
        this.tickItems.push(r.data);
        
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

Roo.apply(Roo.bootstrap.ComboBox,  {
    
    header : {
        tag: 'div',
        cls: 'modal-header',
        cn: [
            {
                tag: 'h4',
                cls: 'modal-title'
            }
        ]
    },
    
    body : {
        tag: 'div',
        cls: 'modal-body',
        cn: [
            {
                tag: 'ul',
                cls: 'list-group'
            }
        ]
    },
    
    listItemRadio : {
        tag: 'li',
        cls: 'list-group-item',
        cn: [
            {
                tag: 'span',
                cls: 'roo-combobox-list-group-item-value'
            },
            {
                tag: 'div',
                cls: 'roo-combobox-list-group-item-box pull-xs-right radio-inline radio radio-info',
                cn: [
                    {
                        tag: 'input',
                        type: 'radio'
                    },
                    {
                        tag: 'label'
                    }
                ]
            }
        ]
    },
    
    listItemCheckbox : {
        tag: 'li',
        cls: 'list-group-item',
        cn: [
            {
                tag: 'span',
                cls: 'roo-combobox-list-group-item-value'
            },
            {
                tag: 'div',
                cls: 'roo-combobox-list-group-item-box pull-xs-right checkbox-inline checkbox checkbox-info',
                cn: [
                    {
                        tag: 'input',
                        type: 'checkbox'
                    },
                    {
                        tag: 'label'
                    }
                ]
            }
        ]
    },
    
    emptyResult : {
        tag: 'div',
        cls: 'alert alert-danger roo-combobox-touch-view-empty-result'
    },
    
    footer : {
        tag: 'div',
        cls: 'modal-footer',
        cn: [
            {
                tag: 'div',
                cls: 'row',
                cn: [
                    {
                        tag: 'div',
                        cls: 'col-xs-6 text-left',
                        cn: {
                            tag: 'button',
                            cls: 'btn btn-danger roo-touch-view-cancel',
                            html: 'Cancel'
                        }
                    },
                    {
                        tag: 'div',
                        cls: 'col-xs-6 text-right',
                        cn: {
                            tag: 'button',
                            cls: 'btn btn-success roo-touch-view-ok',
                            html: 'OK'
                        }
                    }
                ]
            }
        ]
        
    }
});

Roo.apply(Roo.bootstrap.ComboBox,  {
    
    touchViewTemplate : {
        tag: 'div',
        cls: 'modal fade roo-combobox-touch-view',
        cn: [
            {
                tag: 'div',
                cls: 'modal-dialog',
                style : 'position:fixed', // we have to fix position....
                cn: [
                    {
                        tag: 'div',
                        cls: 'modal-content',
                        cn: [
                            Roo.bootstrap.ComboBox.header,
                            Roo.bootstrap.ComboBox.body,
                            Roo.bootstrap.ComboBox.footer
                        ]
                    }
                ]
            }
        ]
    }
});