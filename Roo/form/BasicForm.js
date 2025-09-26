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
 * @class Roo.form.BasicForm
 * @extends Roo.util.Observable
 * Supplies the functionality to do "actions" on forms and initialize Roo.form.Field types on existing markup.
 * @constructor
 * @param {String/HTMLElement/Roo.Element} el The form element or its id
 * @param {Object} config Configuration options
 */
Roo.form.BasicForm = function(el, config){
    this.allItems = [];
    this.childForms = [];
    Roo.apply(this, config);
    /*
     * The Roo.form.Field items in this form.
     * @type MixedCollection
     */
     
     
    this.items = new Roo.util.MixedCollection(false, function(o){
        return o.id || (o.id = Roo.id());
    });
    this.addEvents({
        /**
         * @event beforeaction
         * Fires before any action is performed. Return false to cancel the action.
         * @param {Form} this
         * @param {Action} action The action to be performed
         */
        beforeaction: true,
        /**
         * @event actionfailed
         * Fires when an action fails.
         * @param {Form} this
         * @param {Action} action The action that failed
         */
        actionfailed : true,
        /**
         * @event actioncomplete
         * Fires when an action is completed.
         * @param {Form} this
         * @param {Action} action The action that completed
         */
        actioncomplete : true
    });
    if(el){
        this.initEl(el);
    }
    Roo.form.BasicForm.superclass.constructor.call(this);
    
    Roo.form.BasicForm.popover.apply();
};

Roo.extend(Roo.form.BasicForm, Roo.util.Observable, {
    /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */
    /**
     * @cfg {DataReader} reader
     * An Roo.data.DataReader (e.g. {@link Roo.data.XmlReader}) to be used to read data when executing "load" actions.
     * This is optional as there is built-in support for processing JSON.
     */
    /**
     * @cfg {DataReader} errorReader
     * An Roo.data.DataReader (e.g. {@link Roo.data.XmlReader}) to be used to read data when reading validation errors on "submit" actions.
     * This is completely optional as there is built-in support for processing JSON.
     */
    /**
     * @cfg {String} url
     * The URL to use for form actions if one isn't supplied in the action options.
     */
    /**
     * @cfg {Boolean} fileUpload
     * Set to true if this form is a file upload.
     */
     
    /**
     * @cfg {Object} baseParams
     * Parameters to pass with all requests. e.g. baseParams: {id: '123', foo: 'bar'}.
     */
     /**
     
    /**
     * @cfg {Number} timeout Timeout for form actions in seconds (default is 30 seconds).
     */
    timeout: 30,

    // private
    activeAction : null,

    /**
     * @cfg {Boolean} trackResetOnLoad If set to true, form.reset() resets to the last loaded
     * or setValues() data instead of when the form was first created.
     */
    trackResetOnLoad : false,
    
    
    /**
     * childForms - used for multi-tab forms
     * @type {Array}
     */
    childForms : false,
    
    /**
     * allItems - full list of fields.
     * @type {Array}
     */
    allItems : false,
    
    /**
     * By default wait messages are displayed with Roo.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     * @type Mixed
     */
    waitMsgTarget : false,
    
    /**
     * @type Boolean
     */
    disableMask : false,
    
    /**
     * @cfg {Boolean} errorMask Should the form be masked (and the active element highlighted on error - default false
     */
    errorMask : false,
    
    /**
     * @cfg {Number} maskOffset space around form element to mask if there is an error Default 100
     */
    maskOffset : 100,

    // private
    initEl : function(el){
        this.el = Roo.get(el);
        this.id = this.el.id || Roo.id();
        this.el.on('submit', this.onSubmit, this);
        this.el.addClass('x-form');
    },

    // private
    onSubmit : function(e){
        e.stopEvent();
    },

    /**
     * Returns true if client-side validation on the form is successful.
     * @return Boolean
     */
    isValid : function(){
        var valid = true;
        var target = false;
        this.items.each(function(f){
            if(f.validate()){
                return;
            }
            
            valid = false;
                
            if(!target && f.el.isVisible(true)){
                target = f;
            }
        });
        
        if(this.errorMask && !valid){
            Roo.form.BasicForm.popover.mask(this, target);
        }
        
        return valid;
    },
    /**
     * Returns array of invalid form fields.
     * @return Array
     */
    
    invalidFields : function()
    {
        var ret = [];
        this.items.each(function(f){
            if(f.validate()){
                return;
            }
            ret.push(f);
            
        });
        
        return ret;
    },
    
    
    /**
     * DEPRICATED Returns true if any fields in this form have changed since their original load. 
     * @return Boolean
     */
    isDirty : function(){
        var dirty = false;
        this.items.each(function(f){
           if(f.isDirty()){
               dirty = true;
               return false;
           }
        });
        return dirty;
    },
    
    /**
     * Returns true if any fields in this form have changed since their original load. (New version)
     * @return Boolean
     */
    
    hasChanged : function()
    {
        var dirty = false;
        this.items.each(function(f){
           if(f.hasChanged()){
               dirty = true;
               return false;
           }
        });
        return dirty;
        
    },
    /**
     * Resets all hasChanged to 'false' -
     * The old 'isDirty' used 'original value..' however this breaks reset() and a few other things.
     * So hasChanged storage is only to be used for this purpose
     * @return Boolean
     */
    resetHasChanged : function()
    {
        this.items.each(function(f){
           f.resetHasChanged();
        });
        
    },
    
    
    /**
     * Performs a predefined action (submit or load) or custom actions you define on this form.
     * @param {String} actionName The name of the action type
     * @param {Object} options (optional) The options to pass to the action.  All of the config options listed
     * below are supported by both the submit and load actions unless otherwise noted (custom actions could also
     * accept other config options):
     * <pre>
Property          Type             Description
----------------  ---------------  ----------------------------------------------------------------------------------
url               String           The url for the action (defaults to the form's url)
method            String           The form method to use (defaults to the form's method, or POST if not defined)
params            String/Object    The params to pass (defaults to the form's baseParams, or none if not defined)
clientValidation  Boolean          Applies to submit only.  Pass true to call form.isValid() prior to posting to
                                   validate the form on the client (defaults to false)
     * </pre>
     * @return {BasicForm} this
     */
    doAction : function(action, options){
        if(typeof action == 'string'){
            action = new Roo.form.Action.ACTION_TYPES[action](this, options);
        }
        if(this.fireEvent('beforeaction', this, action) !== false){
            this.beforeAction(action);
            action.run.defer(100, action);
        }
        return this;
    },

    /**
     * Shortcut to do a submit action.
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details)
     * @return {BasicForm} this
     */
    submit : function(options){
        this.doAction('submit', options);
        return this;
    },

    /**
     * Shortcut to do a load action.
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details)
     * @return {BasicForm} this
     */
    load : function(options){
        this.doAction('load', options);
        return this;
    },

    /**
     * Persists the values in this form into the passed Roo.data.Record object in a beginEdit/endEdit block.
     * @param {Record} record The record to edit
     * @return {BasicForm} this
     */
    updateRecord : function(record){
        record.beginEdit();
        var fs = record.fields;
        fs.each(function(f){
            var field = this.findField(f.name);
            if(field){
                record.set(f.name, field.getValue());
            }
        }, this);
        record.endEdit();
        return this;
    },

    /**
     * Loads an Roo.data.Record into this form.
     * @param {Record} record The record to load
     * @return {BasicForm} this
     */
    loadRecord : function(record){
        this.setValues(record.data);
        return this;
    },

    // private
    beforeAction : function(action){
        var o = action.options;
        
        if(!this.disableMask) {
            if(this.waitMsgTarget === true){
                this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
            }else if(this.waitMsgTarget){
                this.waitMsgTarget = Roo.get(this.waitMsgTarget);
                this.waitMsgTarget.mask(o.waitMsg || "Sending", 'x-mask-loading');
            }else {
                Roo.MessageBox.wait(o.waitMsg || "Sending", o.waitTitle || this.waitTitle || 'Please Wait...');
            }
        }
        
         
    },

    // private
    afterAction : function(action, success){
        this.activeAction = null;
        var o = action.options;
        
        if(!this.disableMask) {
            if(this.waitMsgTarget === true){
                this.el.unmask();
            }else if(this.waitMsgTarget){
                this.waitMsgTarget.unmask();
            }else{
                Roo.MessageBox.updateProgress(1);
                Roo.MessageBox.hide();
            }
        }
        
        if(success){
            if(o.reset){
                this.reset();
            }
            Roo.callback(o.success, o.scope, [this, action]);
            this.fireEvent('actioncomplete', this, action);
            
        }else{
            
            // failure condition..
            // we have a scenario where updates need confirming.
            // eg. if a locking scenario exists..
            // we look for { errors : { needs_confirm : true }} in the response.
            if (
                (typeof(action.result) != 'undefined')  &&
                (typeof(action.result.errors) != 'undefined')  &&
                (typeof(action.result.errors.needs_confirm) != 'undefined')
           ){
                var _t = this;
                Roo.MessageBox.confirm(
                    "Change requires confirmation",
                    action.result.errorMsg,
                    function(r) {
                        if (r != 'yes') {
                            return;
                        }
                        _t.doAction('submit', { params :  { _submit_confirmed : 1 } }  );
                    }
                    
                );
                
                
                
                return;
            }
            
            Roo.callback(o.failure, o.scope, [this, action]);
            // show an error message if no failed handler is set..
            if (!this.hasListener('actionfailed')) {
                Roo.MessageBox.alert("Error",
                    (typeof(action.result) != 'undefined' && typeof(action.result.errorMsg) != 'undefined') ?
                        action.result.errorMsg :
                        "Saving Failed, please check your entries or try again"
                );
            }
            
            this.fireEvent('actionfailed', this, action);
        }
        
    },

    /**
     * Find a Roo.form.Field in this form by id, dataIndex, name or hiddenName
     * @param {String} id The value to search for
     * @return Field
     */
    findField : function(id){
        var field = this.items.get(id);
        if(!field){
            this.items.each(function(f){
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){
                    field = f;
                    return false;
                }
            });
        }
        return field || null;
    },

    /**
     * Add a secondary form to this one, 
     * Used to provide tabbed forms. One form is primary, with hidden values 
     * which mirror the elements from the other forms.
     * 
     * @param {Roo.form.Form} form to add.
     * 
     */
    addForm : function(form)
    {
       
        if (this.childForms.indexOf(form) > -1) {
            // already added..
            return;
        }
        this.childForms.push(form);
        var n = '';
        Roo.each(form.allItems, function (fe) {
            
            n = typeof(fe.getName) == 'undefined' ? fe.name : fe.getName();
            if (this.findField(n)) { // already added..
                return;
            }
            var add = new Roo.form.Hidden({
                name : n
            });
            add.render(this.el);
            
            this.add( add );
        }, this);
        
    },
    /**
     * Mark fields in this form invalid in bulk.
     * @param {Array/Object} errors Either an array in the form [{id:'fieldId', msg:'The message'},...] or an object hash of {id: msg, id2: msg2}
     * @return {BasicForm} this
     */
    markInvalid : function(errors){
        if(errors instanceof Array){
            for(var i = 0, len = errors.length; i < len; i++){
                var fieldError = errors[i];
                var f = this.findField(fieldError.id);
                if(f){
                    f.markInvalid(fieldError.msg);
                }
            }
        }else{
            var field, id;
            for(id in errors){
                if(typeof errors[id] != 'function' && (field = this.findField(id))){
                    field.markInvalid(errors[id]);
                }
            }
        }
        Roo.each(this.childForms || [], function (f) {
            f.markInvalid(errors);
        });
        
        return this;
    },

    /**
     * Set values for fields in this form in bulk.
     * @param {Array/Object} values Either an array in the form [{id:'fieldId', value:'foo'},...] or an object hash of {id: value, id2: value2}
     * @return {BasicForm} this
     */
    setValues : function(values){
        if(values instanceof Array){ // array of objects
            for(var i = 0, len = values.length; i < len; i++){
                var v = values[i];
                var f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else{ // object hash
            var field, id;
            for(id in values){
                if(typeof values[id] != 'function' && (field = this.findField(id))){
                    
                    
                    
                    
                    if (field.setFromData && 
                        field.valueField && 
                        field.displayField &&
                        // combos' with local stores can 
                        // be queried via setValue()
                        // to set their value..
                        (field.store && !field.store.isLocal)
                        ) {
                        // it's a combo
                        var sd = { };
                        sd[field.valueField] = typeof(values[field.hiddenName]) == 'undefined' ? '' : values[field.hiddenName];
                        sd[field.displayField] = typeof(values[field.name]) == 'undefined' ? '' : values[field.name];
                        field.setFromData(sd);
                        
                    } else if (field.inputType && field.inputType == 'radio') {
                        
                        field.setValue(values[id]);
                    } else {
                        field.setValue(values[id]);
                    }
                    
                    
                    if(this.trackResetOnLoad){
                        field.originalValue = field.getValue();
                    }
                }
            }
        }
        this.resetHasChanged();
        
        
        Roo.each(this.childForms || [], function (f) {
            f.setValues(values);
            f.resetHasChanged();
        });
                
        return this;
    },
 
    /**
     * Returns the fields in this form as an object with key/value pairs. If multiple fields exist with the same name
     * they are returned as an array.
     * @param {Boolean} asString (def)
     * @return {Object}
     */
    getValues : function(asString)
    {
        if (this.childForms) {
            // copy values from the child forms
            Roo.each(this.childForms, function (f) {
                this.setValues(f.getFieldValues()); // get the full set of data, as we might be copying comboboxes from external into this one.
            }, this);
        }
        
        // use formdata
        if (typeof(FormData) != 'undefined' && asString !== true) {
            // this relies on a 'recent' version of chrome apparently...
            try {
                var fd = (new FormData(this.el.dom)).entries();
                var ret = {};
                var ent = fd.next();
                while (!ent.done) {
                    ret[ent.value[0]] = ent.value[1]; // not sure how this will handle duplicates..
                    ent = fd.next();
                };
                return ret;
            } catch(e) {
                
            }
            
        }
        
        
        var fs = Roo.lib.Ajax.serializeForm(this.el.dom);
        if(asString === true){
            return fs;
        }
        return Roo.urlDecode(fs);
    },
    
    /**
     * Returns the fields in this form as an object with key/value pairs. 
     * This differs from getValues as it calls getValue on each child item, rather than using dom data.
     * Normally this will not return readOnly data 
     * @param {Boolean} with_readonly return readonly field data.
     * @return {Object}
     */
    getFieldValues : function(with_readonly)
    {
        if (this.childForms) {
            // copy values from the child forms
            // should this call getFieldValues - probably not as we do not currently copy
            // hidden fields when we generate..
            Roo.each(this.childForms, function (f) {
                this.setValues(f.getFieldValues());
            }, this);
        }
        
        var ret = {};
        this.items.each(function(f){
            
            if (f.readOnly && with_readonly !== true) {
                return; // skip read only values. - this is in theory to stop 'old' values being copied over new ones
                        // if a subform contains a copy of them.
                        // if you have subforms with the same editable data, you will need to copy the data back
                        // and forth.
            }
            
            if (!f.getName()) {
                return;
            }
            var v = f.getValue();
            if (f.inputType =='radio') {
                if (typeof(ret[f.getName()]) == 'undefined') {
                    ret[f.getName()] = ''; // empty..
                }
                
                if (!f.el.dom.checked) {
                    return;
                    
                }
                v = f.el.dom.value;
                
            }
            
            // not sure if this supported any more..
            if ((typeof(v) == 'object') && f.getRawValue) {
                v = f.getRawValue() ; // dates..
            }
            // combo boxes where name != hiddenName...
            if (f.name != f.getName()) {
                ret[f.name] = f.getRawValue();
            }
            ret[f.getName()] = v;
        });
        
        return ret;
    },

    /**
     * Clears all invalid messages in this form.
     * @return {BasicForm} this
     */
    clearInvalid : function(){
        this.items.each(function(f){
           f.clearInvalid();
        });
        
        Roo.each(this.childForms || [], function (f) {
            f.clearInvalid();
        });
        
        
        return this;
    },

    /**
     * Resets this form.
     * @return {BasicForm} this
     */
    reset : function(){
        this.items.each(function(f){
            f.reset();
        });
        
        Roo.each(this.childForms || [], function (f) {
            f.reset();
        });
        this.resetHasChanged();

        Roo.log("SET FUID");
        this.findField('FORM_UID').setValue(Math.random().toString(36).substring(2, 15));
        
        return this;
    },

    /**
     * Add Roo.form components to this form.
     * @param {Field} field1
     * @param {Field} field2 (optional)
     * @param {Field} etc (optional)
     * @return {BasicForm} this
     */
    add : function(){
        this.items.addAll(Array.prototype.slice.call(arguments, 0));
        return this;
    },


    /**
     * Removes a field from the items collection (does NOT remove its markup).
     * @param {Field} field
     * @return {BasicForm} this
     */
    remove : function(field){
        this.items.remove(field);
        return this;
    },

    /**
     * Looks at the fields in this form, checks them for an id attribute,
     * and calls applyTo on the existing dom element with that id.
     * @return {BasicForm} this
     */
    render : function(){
        this.items.each(function(f){
            if(f.isFormField && !f.rendered && document.getElementById(f.id)){ // if the element exists
                f.applyTo(f.id);
            }
        });
        return this;
    },

    /**
     * Calls {@link Ext#apply} for all fields in this form with the passed object.
     * @param {Object} values
     * @return {BasicForm} this
     */
    applyToFields : function(o){
        this.items.each(function(f){
           Roo.apply(f, o);
        });
        return this;
    },

    /**
     * Calls {@link Ext#applyIf} for all field in this form with the passed object.
     * @param {Object} values
     * @return {BasicForm} this
     */
    applyIfToFields : function(o){
        this.items.each(function(f){
           Roo.applyIf(f, o);
        });
        return this;
    }
});

// back compat
Roo.BasicForm = Roo.form.BasicForm;

Roo.apply(Roo.form.BasicForm, {
    
    popover : {
        
        padding : 5,
        
        isApplied : false,
        
        isMasked : false,
        
        form : false,
        
        target : false,
        
        intervalID : false,
        
        maskEl : false,
        
        apply : function()
        {
            if(this.isApplied){
                return;
            }
            
            this.maskEl = {
                top : Roo.DomHelper.append(Roo.get(document.body), { tag: "div", cls:"x-dlg-mask roo-form-top-mask" }, true),
                left : Roo.DomHelper.append(Roo.get(document.body), { tag: "div", cls:"x-dlg-mask roo-form-left-mask" }, true),
                bottom : Roo.DomHelper.append(Roo.get(document.body), { tag: "div", cls:"x-dlg-mask roo-form-bottom-mask" }, true),
                right : Roo.DomHelper.append(Roo.get(document.body), { tag: "div", cls:"x-dlg-mask roo-form-right-mask" }, true)
            };
            
            this.maskEl.top.enableDisplayMode("block");
            this.maskEl.left.enableDisplayMode("block");
            this.maskEl.bottom.enableDisplayMode("block");
            this.maskEl.right.enableDisplayMode("block");
            
            Roo.get(document.body).on('click', function(){
                this.unmask();
            }, this);
            
            Roo.get(document.body).on('touchstart', function(){
                this.unmask();
            }, this);
            
            this.isApplied = true
        },
        
        mask : function(form, target)
        {
            this.form = form;
            
            this.target = target;
            
            if(!this.form.errorMask || !target.el){
                return;
            }
            
            var scrollable = this.target.el.findScrollableParent() || this.target.el.findParent('div.x-layout-active-content', 100, true) || Roo.get(document.body);
            
            var ot = this.target.el.calcOffsetsTo(scrollable);
            
            var scrollTo = ot[1] - this.form.maskOffset;
            
            scrollTo = Math.min(scrollTo, scrollable.dom.scrollHeight);
            
            scrollable.scrollTo('top', scrollTo);
            
            var el = this.target.wrap || this.target.el;
            
            var box = el.getBox();
            
            this.maskEl.top.setStyle('position', 'absolute');
            this.maskEl.top.setStyle('z-index', 10000);
            this.maskEl.top.setSize(Roo.lib.Dom.getDocumentWidth(), box.y - this.padding);
            this.maskEl.top.setLeft(0);
            this.maskEl.top.setTop(0);
            this.maskEl.top.show();
            
            this.maskEl.left.setStyle('position', 'absolute');
            this.maskEl.left.setStyle('z-index', 10000);
            this.maskEl.left.setSize(box.x - this.padding, box.height + this.padding * 2);
            this.maskEl.left.setLeft(0);
            this.maskEl.left.setTop(box.y - this.padding);
            this.maskEl.left.show();

            this.maskEl.bottom.setStyle('position', 'absolute');
            this.maskEl.bottom.setStyle('z-index', 10000);
            this.maskEl.bottom.setSize(Roo.lib.Dom.getDocumentWidth(), Roo.lib.Dom.getDocumentHeight() - box.bottom - this.padding);
            this.maskEl.bottom.setLeft(0);
            this.maskEl.bottom.setTop(box.bottom + this.padding);
            this.maskEl.bottom.show();

            this.maskEl.right.setStyle('position', 'absolute');
            this.maskEl.right.setStyle('z-index', 10000);
            this.maskEl.right.setSize(Roo.lib.Dom.getDocumentWidth() - box.right - this.padding, box.height + this.padding * 2);
            this.maskEl.right.setLeft(box.right + this.padding);
            this.maskEl.right.setTop(box.y - this.padding);
            this.maskEl.right.show();

            this.intervalID = window.setInterval(function() {
                Roo.form.BasicForm.popover.unmask();
            }, 10000);

            window.onwheel = function(){ return false;};
            
            (function(){ this.isMasked = true; }).defer(500, this);
            
        },
        
        unmask : function()
        {
            if(!this.isApplied || !this.isMasked || !this.form || !this.target || !this.form.errorMask){
                return;
            }
            
            this.maskEl.top.setStyle('position', 'absolute');
            this.maskEl.top.setSize(0, 0).setXY([0, 0]);
            this.maskEl.top.hide();

            this.maskEl.left.setStyle('position', 'absolute');
            this.maskEl.left.setSize(0, 0).setXY([0, 0]);
            this.maskEl.left.hide();

            this.maskEl.bottom.setStyle('position', 'absolute');
            this.maskEl.bottom.setSize(0, 0).setXY([0, 0]);
            this.maskEl.bottom.hide();

            this.maskEl.right.setStyle('position', 'absolute');
            this.maskEl.right.setSize(0, 0).setXY([0, 0]);
            this.maskEl.right.hide();
            
            window.onwheel = function(){ return true;};
            
            if(this.intervalID){
                window.clearInterval(this.intervalID);
                this.intervalID = false;
            }
            
            this.isMasked = false;
            
        }
        
    }
    
});