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
 * @class Roo.form.Form
 * @extends Roo.form.BasicForm
 * Adds the ability to dynamically render forms with JavaScript to {@link Roo.form.BasicForm}.
 * @constructor
 * @param {Object} config Configuration options
 */
Roo.form.Form = function(config){
    var xitems =  [];
    if (config.items) {
        xitems = config.items;
        delete config.items;
    }
   
    
    Roo.form.Form.superclass.constructor.call(this, null, config);
    this.url = this.url || this.action;
    if(!this.root){
        this.root = new Roo.form.Layout(Roo.applyIf({
            id: Roo.id()
        }, config));
    }
    this.active = this.root;
    /**
     * Array of all the buttons that have been added to this form via {@link addButton}
     * @type Array
     */
    this.buttons = [];
    this.allItems = [];
    this.addEvents({
        /**
         * @event clientvalidation
         * If the monitorValid config option is true, this event fires repetitively to notify of valid state
         * @param {Form} this
         * @param {Boolean} valid true if the form has passed client-side validation
         */
        clientvalidation: true,
        /**
         * @event rendered
         * Fires when the form is rendered
         * @param {Roo.form.Form} form
         */
        rendered : true
    });
    
    Roo.each(xitems, this.addxtype, this);
    
    
    
};

Roo.extend(Roo.form.Form, Roo.form.BasicForm, {
    /**
     * @cfg {Number} labelWidth The width of labels. This property cascades to child containers.
     */
    /**
     * @cfg {String} itemCls A css class to apply to the x-form-item of fields. This property cascades to child containers.
     */
    /**
     * @cfg {String} buttonAlign Valid values are "left," "center" and "right" (defaults to "center")
     */
    buttonAlign:'center',

    /**
     * @cfg {Number} minButtonWidth Minimum width of all buttons in pixels (defaults to 75)
     */
    minButtonWidth:75,

    /**
     * @cfg {String} labelAlign Valid values are "left," "top" and "right" (defaults to "left").
     * This property cascades to child containers if not set.
     */
    labelAlign:'left',

    /**
     * @cfg {Boolean} monitorValid If true the form monitors its valid state <b>client-side</b> and
     * fires a looping event with that state. This is required to bind buttons to the valid
     * state using the config value formBind:true on the button.
     */
    monitorValid : false,

    /**
     * @cfg {Number} monitorPoll The milliseconds to poll valid state, ignored if monitorValid is not true (defaults to 200)
     */
    monitorPoll : 200,
    
    /**
     * @cfg {String} progressUrl - Url to return progress data 
     */
    
    progressUrl : false,
  
    /**
     * Opens a new {@link Roo.form.Column} container in the layout stack. If fields are passed after the config, the
     * fields are added and the column is closed. If no fields are passed the column remains open
     * until end() is called.
     * @param {Object} config The config to pass to the column
     * @param {Field} field1 (optional)
     * @param {Field} field2 (optional)
     * @param {Field} etc (optional)
     * @return Column The column container object
     */
    column : function(c){
        var col = new Roo.form.Column(c);
        this.start(col);
        if(arguments.length > 1){ // duplicate code required because of Opera
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return col;
    },

    /**
     * Opens a new {@link Roo.form.FieldSet} container in the layout stack. If fields are passed after the config, the
     * fields are added and the fieldset is closed. If no fields are passed the fieldset remains open
     * until end() is called.
     * @param {Object} config The config to pass to the fieldset
     * @param {Field} field1 (optional)
     * @param {Field} field2 (optional)
     * @param {Field} etc (optional)
     * @return FieldSet The fieldset container object
     */
    fieldset : function(c){
        var fs = new Roo.form.FieldSet(c);
        this.start(fs);
        if(arguments.length > 1){ // duplicate code required because of Opera
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return fs;
    },

    /**
     * Opens a new {@link Roo.form.Layout} container in the layout stack. If fields are passed after the config, the
     * fields are added and the container is closed. If no fields are passed the container remains open
     * until end() is called.
     * @param {Object} config The config to pass to the Layout
     * @param {Field} field1 (optional)
     * @param {Field} field2 (optional)
     * @param {Field} etc (optional)
     * @return Layout The container object
     */
    container : function(c){
        var l = new Roo.form.Layout(c);
        this.start(l);
        if(arguments.length > 1){ // duplicate code required because of Opera
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return l;
    },

    /**
     * Opens the passed container in the layout stack. The container can be any {@link Roo.form.Layout} or subclass.
     * @param {Object} container A Roo.form.Layout or subclass of Layout
     * @return {Form} this
     */
    start : function(c){
        // cascade label info
        Roo.applyIf(c, {'labelAlign': this.active.labelAlign, 'labelWidth': this.active.labelWidth, 'itemCls': this.active.itemCls});
        this.active.stack.push(c);
        c.ownerCt = this.active;
        this.active = c;
        return this;
    },

    /**
     * Closes the current open container
     * @return {Form} this
     */
    end : function(){
        if(this.active == this.root){
            return this;
        }
        this.active = this.active.ownerCt;
        return this;
    },

    /**
     * Add Roo.form components to the current open container (e.g. column, fieldset, etc.).  Fields added via this method
     * can also be passed with an additional property of fieldLabel, which if supplied, will provide the text to display
     * as the label of the field.
     * @param {Field} field1
     * @param {Field} field2 (optional)
     * @param {Field} etc. (optional)
     * @return {Form} this
     */
    add : function(){
        this.active.stack.push.apply(this.active.stack, arguments);
        this.allItems.push.apply(this.allItems,arguments);
        var r = [];
        for(var i = 0, a = arguments, len = a.length; i < len; i++) {
            if(a[i].isFormField){
                r.push(a[i]);
            }
        }
        if(r.length > 0){
            Roo.form.Form.superclass.add.apply(this, r);
        }
        return this;
    },
    

    
    
    
     /**
     * Find any element that has been added to a form, using it's ID or name
     * This can include framesets, columns etc. along with regular fields..
     * @param {String} id - id or name to find.
     
     * @return {Element} e - or false if nothing found.
     */
    findbyId : function(id)
    {
        var ret = false;
        if (!id) {
            return ret;
        }
        Ext.each(this.allItems, function(f){
            if (f.id == id || f.name == id ){
                ret = f;
                return false;
            }
        });
        return ret;
    },

    
    
    /**
     * Render this form into the passed container. This should only be called once!
     * @param {String/HTMLElement/Element} container The element this component should be rendered into
     * @return {Form} this
     */
    render : function(ct){
        ct = Roo.get(ct);
        var o = this.autoCreate || {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id()
        };
        this.initEl(ct.createChild(o));

        this.root.render(this.el);
        
        if (this.progressUrl && !this.findField( 'UPLOAD_IDENTIFIER')) {
            // push a hidden field onto the list of fields..
            this.items.unshift(0, Roo.factory( {
                    xns: Roo.form, 
                    xtype : 'Hidden', 
                    name : 'UPLOAD_IDENTIFIER' 
            }));
        }
             
        this.items.each(function(f){
            f.render('x-form-el-'+f.id);
        });

        if(this.buttons.length > 0){
            // tables are required to maintain order and for correct IE layout
            var tb = this.el.createChild({cls:'x-form-btns-ct', cn: {
                cls:"x-form-btns x-form-btns-"+this.buttonAlign,
                html:'<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
            }}, null, true);
            var tr = tb.getElementsByTagName('tr')[0];
            for(var i = 0, len = this.buttons.length; i < len; i++) {
                var b = this.buttons[i];
                var td = document.createElement('td');
                td.className = 'x-form-btn-td';
                b.render(tr.appendChild(td));
            }
        }
        if(this.monitorValid){ // initialize after render
            this.startMonitoring();
        }
        this.fireEvent('rendered', this);
        return this;
    },

    /**
     * Adds a button to the footer of the form - this <b>must</b> be called before the form is rendered.
     * @param {String/Object} config A string becomes the button text, an object can either be a Button config
     * object or a valid Roo.DomHelper element config
     * @param {Function} handler The function called when the button is clicked
     * @param {Object} scope (optional) The scope of the handler function
     * @return {Roo.Button}
     */
    addButton : function(config, handler, scope){
        var bc = {
            handler: handler,
            scope: scope,
            minWidth: this.minButtonWidth,
            hideParent:true
        };
        if(typeof config == "string"){
            bc.text = config;
        }else{
            Roo.apply(bc, config);
        }
        var btn = new Roo.Button(null, bc);
        this.buttons.push(btn);
        return btn;
    },

     /**
     * Adds a series of form elements (using the xtype property as the factory method.
     * Valid xtypes are:  TextField, TextArea .... Button, Layout, FieldSet, Column, (and 'end' to close a block)
     * @param {Object} config 
     */
    
    addxtype : function()
    {
        var ar = Array.prototype.slice.call(arguments, 0);
        var ret = false;
        for(var i = 0; i < ar.length; i++) {
            if (!ar[i]) {
                continue; // skip -- if this happends something invalid got sent, we 
                // should ignore it, as basically that interface element will not show up
                // and that should be pretty obvious!!
            }
            
            if (Roo.form[ar[i].xtype]) {
                ar[i].form = this;
                var fe = Roo.factory(ar[i], Roo.form);
                if (!ret) {
                    ret = fe;
                }
                fe.form = this;
                if (fe.store) {
                    fe.store.form = this;
                }
                if (fe.isLayout) {  
                         
                    this.start(fe);
                    this.allItems.push(fe);
                    if (fe.items && fe.addxtype) {
                        fe.addxtype.apply(fe, fe.items);
                        delete fe.items;
                    }
                     this.end();
                    continue;
                }
                
                
                 
                this.add(fe);
              //  console.log('adding ' + ar[i].xtype);
            }
            if (ar[i].xtype == 'Button') {  
                //console.log('adding button');
                //console.log(ar[i]);
                this.addButton(ar[i]);
                this.allItems.push(fe);
                continue;
            }
            
            if (ar[i].xtype == 'end') { // so we can add fieldsets... / layout etc.
                alert('end is not supported on xtype any more, use items');
            //    this.end();
            //    //console.log('adding end');
            }
            
        }
        return ret;
    },
    
    /**
     * Starts monitoring of the valid state of this form. Usually this is done by passing the config
     * option "monitorValid"
     */
    startMonitoring : function(){
        if(!this.bound){
            this.bound = true;
            Roo.TaskMgr.start({
                run : this.bindHandler,
                interval : this.monitorPoll || 200,
                scope: this
            });
        }
    },

    /**
     * Stops monitoring of the valid state of this form
     */
    stopMonitoring : function(){
        this.bound = false;
    },

    // private
    bindHandler : function(){
        if(!this.bound){
            return false; // stops binding
        }
        var valid = true;
        this.items.each(function(f){
            if(!f.isValid(true)){
                valid = false;
                return false;
            }
        });
        for(var i = 0, len = this.buttons.length; i < len; i++){
            var btn = this.buttons[i];
            if(btn.formBind === true && btn.disabled === valid){
                btn.setDisabled(!valid);
            }
        }
        this.fireEvent('clientvalidation', this, valid);
    }
    
    
    
    
    
    
    
    
});


// back compat
Roo.Form = Roo.form.Form;
