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
 * @class Roo.Toolbar
 * @children   Roo.Toolbar.Item Roo.form.Field  
 * Basic Toolbar class.
 * @constructor
 * Creates a new Toolbar
 * @param {Object} container The config object
 */ 
Roo.Toolbar = function(container, buttons, config)
{
    /// old consturctor format still supported..
    if(container instanceof Array){ // omit the container for later rendering
        buttons = container;
        config = buttons;
        container = null;
    }
    if (typeof(container) == 'object' && container.xtype) {
        config = container;
        container = config.container;
        buttons = config.buttons || []; // not really - use items!!
    }
    var xitems = [];
    if (config && config.items) {
        xitems = config.items;
        delete config.items;
    }
    Roo.apply(this, config);
    this.buttons = buttons;
    
    if(container){
        this.render(container);
    }
    this.xitems = xitems;
    Roo.each(xitems, function(b) {
        this.add(b);
    }, this);
    
};

Roo.Toolbar.prototype = {
    /**
     * @cfg {Array} items
     * array of button configs or elements to add (will be converted to a MixedCollection)
     */
    items: false,
    /**
     * @cfg {String/HTMLElement/Element} container
     * The id or element that will contain the toolbar
     */
    // private
    render : function(ct){
        this.el = Roo.get(ct);
        if(this.cls){
            this.el.addClass(this.cls);
        }
        // using a table allows for vertical alignment
        // 100% width is needed by Safari...
        this.el.update('<div class="x-toolbar x-small-editor"><table cellspacing="0"><tr></tr></table></div>');
        this.tr = this.el.child("tr", true);
        var autoId = 0;
        this.items = new Roo.util.MixedCollection(false, function(o){
            return o.id || ("item" + (++autoId));
        });
        if(this.buttons){
            this.add.apply(this, this.buttons);
            delete this.buttons;
        }
    },

    /**
     * Adds element(s) to the toolbar -- this function takes a variable number of 
     * arguments of mixed type and adds them to the toolbar.
     * @param {Mixed} arg1 The following types of arguments are all valid:<br />
     * <ul>
     * <li>{@link Roo.Toolbar.Button} config: A valid button config object (equivalent to {@link #addButton})</li>
     * <li>HtmlElement: Any standard HTML element (equivalent to {@link #addElement})</li>
     * <li>Field: Any form field (equivalent to {@link #addField})</li>
     * <li>Item: Any subclass of {@link Roo.Toolbar.Item} (equivalent to {@link #addItem})</li>
     * <li>String: Any generic string (gets wrapped in a {@link Roo.Toolbar.TextItem}, equivalent to {@link #addText}).
     * Note that there are a few special strings that are treated differently as explained nRoo.</li>
     * <li>'separator' or '-': Creates a separator element (equivalent to {@link #addSeparator})</li>
     * <li>' ': Creates a spacer element (equivalent to {@link #addSpacer})</li>
     * <li>'->': Creates a fill element (equivalent to {@link #addFill})</li>
     * </ul>
     * @param {Mixed} arg2
     * @param {Mixed} etc.
     */
    add : function(){
        var a = arguments, l = a.length;
        for(var i = 0; i < l; i++){
            this._add(a[i]);
        }
    },
    // private..
    _add : function(el) {
        
        if (el.xtype) {
            el = Roo.factory(el, typeof(Roo.Toolbar[el.xtype]) == 'undefined' ? Roo.form : Roo.Toolbar);
        }
        
        if (el.applyTo){ // some kind of form field
            return this.addField(el);
        } 
        if (el.render){ // some kind of Toolbar.Item
            return this.addItem(el);
        }
        if (typeof el == "string"){ // string
            if(el == "separator" || el == "-"){
                return this.addSeparator();
            }
            if (el == " "){
                return this.addSpacer();
            }
            if(el == "->"){
                return this.addFill();
            }
            return this.addText(el);
            
        }
        if(el.tagName){ // element
            return this.addElement(el);
        }
        if(typeof el == "object"){ // must be button config?
            return this.addButton(el);
        }
        // and now what?!?!
        return false;
        
    },
    
    /**
     * Add an Xtype element
     * @param {Object} xtype Xtype Object
     * @return {Object} created Object
     */
    addxtype : function(e){
        return this.add(e);  
    },
    
    /**
     * Returns the Element for this toolbar.
     * @return {Roo.Element}
     */
    getEl : function(){
        return this.el;  
    },
    
    /**
     * Adds a separator
     * @return {Roo.Toolbar.Item} The separator item
     */
    addSeparator : function(){
        return this.addItem(new Roo.Toolbar.Separator());
    },

    /**
     * Adds a spacer element
     * @return {Roo.Toolbar.Spacer} The spacer item
     */
    addSpacer : function(){
        return this.addItem(new Roo.Toolbar.Spacer());
    },

    /**
     * Adds a fill element that forces subsequent additions to the right side of the toolbar
     * @return {Roo.Toolbar.Fill} The fill item
     */
    addFill : function(){
        return this.addItem(new Roo.Toolbar.Fill());
    },

    /**
     * Adds any standard HTML element to the toolbar
     * @param {String/HTMLElement/Element} el The element or id of the element to add
     * @return {Roo.Toolbar.Item} The element's item
     */
    addElement : function(el){
        return this.addItem(new Roo.Toolbar.Item(el));
    },
    /**
     * Collection of items on the toolbar.. (only Toolbar Items, so use fields to retrieve fields)
     * @type Roo.util.MixedCollection  
     */
    items : false,
     
    /**
     * Adds any Toolbar.Item or subclass
     * @param {Roo.Toolbar.Item} item
     * @return {Roo.Toolbar.Item} The item
     */
    addItem : function(item){
        var td = this.nextBlock();
        item.render(td);
        this.items.add(item);
        return item;
    },
    
    /**
     * Adds a button (or buttons). See {@link Roo.Toolbar.Button} for more info on the config.
     * @param {Object/Array} config A button config or array of configs
     * @return {Roo.Toolbar.Button/Array}
     */
    addButton : function(config){
        if(config instanceof Array){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!(config instanceof Roo.Toolbar.Button)){
            b = config.split ?
                new Roo.Toolbar.SplitButton(config) :
                new Roo.Toolbar.Button(config);
        }
        var td = this.nextBlock();
        b.render(td);
        this.items.add(b);
        return b;
    },
    
    /**
     * Adds text to the toolbar
     * @param {String} text The text to add
     * @return {Roo.Toolbar.Item} The element's item
     */
    addText : function(text){
        return this.addItem(new Roo.Toolbar.TextItem(text));
    },
    
    /**
     * Inserts any {@link Roo.Toolbar.Item}/{@link Roo.Toolbar.Button} at the specified index.
     * @param {Number} index The index where the item is to be inserted
     * @param {Object/Roo.Toolbar.Item/Roo.Toolbar.Button (may be Array)} item The button, or button config object to be inserted.
     * @return {Roo.Toolbar.Button/Item}
     */
    insertButton : function(index, item){
        if(item instanceof Array){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
               buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof Roo.Toolbar.Button)){
           item = new Roo.Toolbar.Button(item);
        }
        var td = document.createElement("td");
        this.tr.insertBefore(td, this.tr.childNodes[index]);
        item.render(td);
        this.items.insert(index, item);
        return item;
    },
    
    /**
     * Adds a new element to the toolbar from the passed {@link Roo.DomHelper} config.
     * @param {Object} config
     * @return {Roo.Toolbar.Item} The element's item
     */
    addDom : function(config, returnEl){
        var td = this.nextBlock();
        Roo.DomHelper.overwrite(td, config);
        var ti = new Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return ti;
    },

    /**
     * Collection of fields on the toolbar.. usefull for quering (value is false if there are no fields)
     * @type Roo.util.MixedCollection  
     */
    fields : false,
    
    /**
     * Adds a dynamically rendered Roo.form field (TextField, ComboBox, etc).
     * Note: the field should not have been rendered yet. For a field that has already been
     * rendered, use {@link #addElement}.
     * @param {Roo.form.Field} field
     * @return {Roo.ToolbarItem}
     */
     
      
    addField : function(field) {
        if (!this.fields) {
            var autoId = 0;
            this.fields = new Roo.util.MixedCollection(false, function(o){
                return o.id || ("item" + (++autoId));
            });

        }
        
        var td = this.nextBlock();
        field.render(td);
        var ti = new Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        this.fields.add(field);
        return ti;
    },
    /**
     * Hide the toolbar
     * @method hide
     */
     
      
    hide : function()
    {
        this.el.child('div').setVisibilityMode(Roo.Element.DISPLAY);
        this.el.child('div').hide();
    },
    /**
     * Show the toolbar
     * @method show
     */
    show : function()
    {
        this.el.child('div').show();
    },
      
    // private
    nextBlock : function(){
        var td = document.createElement("td");
        this.tr.appendChild(td);
        return td;
    },

    // private
    destroy : function(){
        if(this.items){ // rendered?
            Roo.destroy.apply(Roo, this.items.items);
        }
        if(this.fields){ // rendered?
            Roo.destroy.apply(Roo, this.fields.items);
        }
        Roo.Element.uncache(this.el, this.tr);
    }
};

/**
 * @class Roo.Toolbar.Item
 * The base class that other classes should extend in order to get some basic common toolbar item functionality.
 * @constructor
 * Creates a new Item
 * @param {HTMLElement} el 
 */
Roo.Toolbar.Item = function(el){
    var cfg = {};
    if (typeof (el.xtype) != 'undefined') {
        cfg = el;
        el = cfg.el;
    }
    
    this.el = Roo.getDom(el);
    this.id = Roo.id(this.el);
    this.hidden = false;
    
    this.addEvents({
         /**
	     * @event render
	     * Fires when the button is rendered
	     * @param {Button} this
	     */
        'render': true
    });
    Roo.Toolbar.Item.superclass.constructor.call(this,cfg);
};
Roo.extend(Roo.Toolbar.Item, Roo.util.Observable, {
//Roo.Toolbar.Item.prototype = {
    
    /**
     * Get this item's HTML Element
     * @return {HTMLElement}
     */
    getEl : function(){
       return this.el;  
    },

    // private
    render : function(td){
        
         this.td = td;
        td.appendChild(this.el);
        
        this.fireEvent('render', this);
    },
    
    /**
     * Removes and destroys this item.
     */
    destroy : function(){
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this item.
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this item.
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },
    
    /**
     * Convenience function for boolean show/hide.
     * @param {Boolean} visible true to show/false to hide
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
    },
    
    /**
     * Try to focus this item.
     */
    focus : function(){
        Roo.fly(this.el).focus();
    },
    
    /**
     * Disables this item.
     */
    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
        this.el.disabled = true;
    },
    
    /**
     * Enables this item.
     */
    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
        this.el.disabled = false;
    }
});


/**
 * @class Roo.Toolbar.Separator
 * @extends Roo.Toolbar.Item
 * A simple toolbar separator class
 * @constructor
 * Creates a new Separator
 */
Roo.Toolbar.Separator = function(cfg){
    
    var s = document.createElement("span");
    s.className = "ytb-sep";
    if (cfg) {
        cfg.el = s;
    }
    
    Roo.Toolbar.Separator.superclass.constructor.call(this, cfg || s);
};
Roo.extend(Roo.Toolbar.Separator, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});

/**
 * @class Roo.Toolbar.Spacer
 * @extends Roo.Toolbar.Item
 * A simple element that adds extra horizontal space to a toolbar.
 * @constructor
 * Creates a new Spacer
 */
Roo.Toolbar.Spacer = function(cfg){
    var s = document.createElement("div");
    s.className = "ytb-spacer";
    if (cfg) {
        cfg.el = s;
    }
    Roo.Toolbar.Spacer.superclass.constructor.call(this, cfg || s);
};
Roo.extend(Roo.Toolbar.Spacer, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});

/**
 * @class Roo.Toolbar.Fill
 * @extends Roo.Toolbar.Spacer
 * A simple element that adds a greedy (100% width) horizontal space to a toolbar.
 * @constructor
 * Creates a new Spacer
 */
Roo.Toolbar.Fill = Roo.extend(Roo.Toolbar.Spacer, {
    // private
    render : function(td){
        td.style.width = '100%';
        Roo.Toolbar.Fill.superclass.render.call(this, td);
    }
});

/**
 * @class Roo.Toolbar.TextItem
 * @extends Roo.Toolbar.Item
 * A simple class that renders text directly into a toolbar.
 * @constructor
 * Creates a new TextItem
 * @cfg {string} text 
 */
Roo.Toolbar.TextItem = function(cfg){
    var  text = cfg || "";
    if (typeof(cfg) == 'object') {
        text = cfg.text || "";
    }  else {
        cfg = null;
    }
    var s = document.createElement("span");
    s.className = "ytb-text";
    s.innerHTML = text;
    if (cfg) {
        cfg.el  = s;
    }
    
    Roo.Toolbar.TextItem.superclass.constructor.call(this, cfg ||  s);
};
Roo.extend(Roo.Toolbar.TextItem, Roo.Toolbar.Item, {
    
     
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn,
     /**
     * Shows this button
     */
    show: function(){
        this.hidden = false;
        this.el.style.display = "";
    },
    
    /**
     * Hides this button
     */
    hide: function(){
        this.hidden = true;
        this.el.style.display = "none";
    }
    
});

/**
 * @class Roo.Toolbar.Button
 * @extends Roo.Button
 * A button that renders into a toolbar.
 * @constructor
 * Creates a new Button
 * @param {Object} config A standard {@link Roo.Button} config object
 */
Roo.Toolbar.Button = function(config){
    Roo.Toolbar.Button.superclass.constructor.call(this, null, config);
};
Roo.extend(Roo.Toolbar.Button, Roo.Button,
{
    
    
    render : function(td){
        this.td = td;
        Roo.Toolbar.Button.superclass.render.call(this, td);
    },
    
    /**
     * Removes and destroys this button
     */
    destroy : function(){
        Roo.Toolbar.Button.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },

    /**
     * Disables this item
     */
    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
    },

    /**
     * Enables this item
     */
    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
    }
});
// backwards compat
Roo.ToolbarButton = Roo.Toolbar.Button;

/**
 * @class Roo.Toolbar.SplitButton
 * @extends Roo.SplitButton
 * A menu button that renders into a toolbar.
 * @constructor
 * Creates a new SplitButton
 * @param {Object} config A standard {@link Roo.SplitButton} config object
 */
Roo.Toolbar.SplitButton = function(config){
    Roo.Toolbar.SplitButton.superclass.constructor.call(this, null, config);
};
Roo.extend(Roo.Toolbar.SplitButton, Roo.SplitButton, {
    render : function(td){
        this.td = td;
        Roo.Toolbar.SplitButton.superclass.render.call(this, td);
    },
    
    /**
     * Removes and destroys this button
     */
    destroy : function(){
        Roo.Toolbar.SplitButton.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    /**
     * Shows this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    /**
     * Hides this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    }
});

// backwards compat
Roo.Toolbar.MenuButton = Roo.Toolbar.SplitButton;