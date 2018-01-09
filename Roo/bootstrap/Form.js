/*
 * - LGPL
 *
 * form
 *
 */

/**
 * @class Roo.bootstrap.Form
 * @extends Roo.bootstrap.Component
 * Bootstrap Form class
 * @cfg {String} method  GET | POST (default POST)
 * @cfg {String} labelAlign top | left (default top)
 * @cfg {String} align left  | right - for navbars
 * @cfg {Boolean} loadMask load mask when submit (default true)

 *
 * @constructor
 * Create a new Form
 * @param {Object} config The config object
 */


Roo.bootstrap.Form = function(config){
    Roo.bootstrap.Form.superclass.constructor.call(this, config);
    
    Roo.bootstrap.Form.popover.apply();
    
    this.addEvents({
        /**
         * @event clientvalidation
         * If the monitorValid config option is true, this event fires repetitively to notify of valid state
         * @param {Form} this
         * @param {Boolean} valid true if the form has passed client-side validation
         */
        clientvalidation: true,
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

};

Roo.extend(Roo.bootstrap.Form, Roo.bootstrap.Component,  {

     /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */
    method : 'POST',
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
     * @cfg {Number} timeout Timeout for form actions in seconds (default is 30 seconds).
     */
    timeout: 30,
    /**
     * @cfg {Sting} align (left|right) for navbar forms
     */
    align : 'left',

    // private
    activeAction : null,

    /**
     * By default wait messages are displayed with Roo.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     * @type Mixed
     */
    waitMsgTarget : false,

    loadMask : true,
    
    /**
     * @cfg {Boolean} errorMask (true|false) default false
     */
    errorMask : false,

    getAutoCreate : function(){

        var cfg = {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id(),
            cls : ''
        };
        if (this.parent().xtype.match(/^Nav/)) {
            cfg.cls = 'navbar-form navbar-' + this.align;

        }

        if (this.labelAlign == 'left' ) {
            cfg.cls += ' form-horizontal';
        }


        return cfg;
    },
    initEvents : function()
    {
        this.el.on('submit', this.onSubmit, this);
        // this was added as random key presses on the form where triggering form submit.
        this.el.on('keypress', function(e) {
            if (e.getCharCode() != 13) {
                return true;
            }
            // we might need to allow it for textareas.. and some other items.
            // check e.getTarget().

            if(e.getTarget().nodeName.toLowerCase() === 'textarea'){
                return true;
            }

            Roo.log("keypress blocked");

            e.preventDefault();
            return false;
        });
        
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
        var items = this.getItems();
        var valid = true;
        var target = false;
        
        items.each(function(f){
            
            if(f.validate()){
                return;
            }
            valid = false;

            if(!target && f.el.isVisible(true)){
                target = f;
            }
           
        });
        
        if(this.errorMask && !valid){
            Roo.bootstrap.Form.popover.mask(this, target);
        }
        
        return valid;
    },
    
    /**
     * Returns true if any fields in this form have changed since their original load.
     * @return Boolean
     */
    isDirty : function(){
        var dirty = false;
        var items = this.getItems();
        items.each(function(f){
           if(f.isDirty()){
               dirty = true;
               return false;
           }
           return true;
        });
        return dirty;
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

    // private
    beforeAction : function(action){
        var o = action.options;

        if(this.loadMask){
            this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
        }
        // not really supported yet.. ??

        //if(this.waitMsgTarget === true){
        //  this.el.mask(o.waitMsg || "Sending", 'x-mask-loading');
        //}else if(this.waitMsgTarget){
        //    this.waitMsgTarget = Roo.get(this.waitMsgTarget);
        //    this.waitMsgTarget.mask(o.waitMsg || "Sending", 'x-mask-loading');
        //}else {
        //    Roo.MessageBox.wait(o.waitMsg || "Sending", o.waitTitle || this.waitTitle || 'Please Wait...');
       // }

    },

    // private
    afterAction : function(action, success){
        this.activeAction = null;
        var o = action.options;

        //if(this.waitMsgTarget === true){
            this.el.unmask();
        //}else if(this.waitMsgTarget){
        //    this.waitMsgTarget.unmask();
        //}else{
        //    Roo.MessageBox.updateProgress(1);
        //    Roo.MessageBox.hide();
       // }
        //
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
                Roo.log("not supported yet");
                 /*

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
                */


                return;
            }

            Roo.callback(o.failure, o.scope, [this, action]);
            // show an error message if no failed handler is set..
            if (!this.hasListener('actionfailed')) {
                Roo.log("need to add dialog support");
                /*
                Roo.MessageBox.alert("Error",
                    (typeof(action.result) != 'undefined' && typeof(action.result.errorMsg) != 'undefined') ?
                        action.result.errorMsg :
                        "Saving Failed, please check your entries or try again"
                );
                */
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
        var items = this.getItems();
        var field = items.get(id);
        if(!field){
             items.each(function(f){
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){
                    field = f;
                    return false;
                }
                return true;
            });
        }
        return field || null;
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
        //Roo.each(this.childForms || [], function (f) {
        //    f.markInvalid(errors);
        //});

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

                    } else {
                        field.setValue(values[id]);
                    }


                    if(this.trackResetOnLoad){
                        field.originalValue = field.getValue();
                    }
                }
            }
        }

        //Roo.each(this.childForms || [], function (f) {
        //    f.setValues(values);
        //});

        return this;
    },

    /**
     * Returns the fields in this form as an object with key/value pairs. If multiple fields exist with the same name
     * they are returned as an array.
     * @param {Boolean} asString
     * @return {Object}
     */
    getValues : function(asString){
        //if (this.childForms) {
            // copy values from the child forms
        //    Roo.each(this.childForms, function (f) {
        //        this.setValues(f.getValues());
        //    }, this);
        //}



        var fs = Roo.lib.Ajax.serializeForm(this.el.dom);
        if(asString === true){
            return fs;
        }
        return Roo.urlDecode(fs);
    },

    /**
     * Returns the fields in this form as an object with key/value pairs.
     * This differs from getValues as it calls getValue on each child item, rather than using dom data.
     * @return {Object}
     */
    getFieldValues : function(with_hidden)
    {
        var items = this.getItems();
        var ret = {};
        items.each(function(f){
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
            if (f.name !== false && f.name != '' && f.name != f.getName()) {
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
        var items = this.getItems();

        items.each(function(f){
           f.clearInvalid();
        });



        return this;
    },

    /**
     * Resets this form.
     * @return {BasicForm} this
     */
    reset : function(){
        var items = this.getItems();
        items.each(function(f){
            f.reset();
        });

        Roo.each(this.childForms || [], function (f) {
            f.reset();
        });


        return this;
    },
    getItems : function()
    {
        var r=new Roo.util.MixedCollection(false, function(o){
            return o.id || (o.id = Roo.id());
        });
        var iter = function(el) {
            if (el.inputEl) {
                r.add(el);
            }
            if (!el.items) {
                return;
            }
            Roo.each(el.items,function(e) {
                iter(e);
            });


        };

        iter(this);
        return r;




    }

});

Roo.apply(Roo.bootstrap.Form, {
    
    popover : {
        
        padding : 5,
        
        isApplied : false,
        
        isMasked : false,
        
        form : false,
        
        target : false,
        
        toolTip : false,
        
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
            
            this.toolTip = new Roo.bootstrap.Tooltip({
                cls : 'roo-form-error-popover',
                alignment : {
                    'left' : ['r-l', [-2,0], 'right'],
                    'right' : ['l-r', [2,0], 'left'],
                    'bottom' : ['tl-bl', [0,2], 'top'],
                    'top' : [ 'bl-tl', [0,-2], 'bottom']
                }
            });
            
            this.toolTip.render(Roo.get(document.body));

            this.toolTip.el.enableDisplayMode("block");
            
            Roo.get(document.body).on('click', function(){
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
            
            var scrollable = this.target.el.findScrollableParent() || this.target.el.findParent('div.modal', 100, true) || Roo.get(document.body);
            
            var test = Roo.get(document.documentElement) || Roo.get(document.body.parentNode) || Roo.get(document.body);
            
            scrollable = Roo.get(test);
            
            var ot = this.target.el.calcOffsetsTo(scrollable);
            
            var scrollTo = ot[1] - 100;
            
            var maxScroll = Roo.lib.Dom.getDocumentHeight() - Roo.lib.Dom.getViewportHeight();
            
            scrollTo = Math.min(scrollTo, maxScroll);
            
//            Roo.log(Roo.get(document.body).dom);
//            alert(Roo.get(document.body).dom.innerHTML);
            
//            var overflow = scrollable.getStyle('overflow');
//            
//            alert(overflow);
//            
//            scrollable.setStyle('overflow', 'hidden');
//            scrollable.setStyle('overflow-y', 'hidden');
//            scrollable.setStyle('overflow-x', 'hidden');
//            
//            alert(scrollable.getStyle('overflow'));
            
//            alert(scrollable.dom.scrollTop);
//            scrollable.scrollTo('top', scrollTo);
            scrollable.dom.scrollTop = scrollTo;
//            alert(scrollable.dom.scrollTop);
            
//            scrollable.setStyle('overflow', overflow);
            
            var box = this.target.el.getBox();

            var zIndex = Roo.bootstrap.Modal.zIndex++;

            this.maskEl.top.setStyle('position', 'fixed');
            this.maskEl.top.setStyle('z-index', zIndex);
            this.maskEl.top.setSize(Roo.lib.Dom.getDocumentWidth(), box.y - this.padding);
            this.maskEl.top.setXY([0, 0]);
            this.maskEl.top.show();

            this.maskEl.left.setStyle('position', 'fixed');
            this.maskEl.left.setStyle('z-index', zIndex);
            this.maskEl.left.setSize(Roo.lib.Dom.getDocumentWidth() - box.right - this.padding, box.height + this.padding * 2);
            this.maskEl.left.setXY([box.right + this.padding, box.y - this.padding]);
            this.maskEl.left.show();

            this.maskEl.bottom.setStyle('position', 'fixed');
            this.maskEl.bottom.setStyle('z-index', zIndex);
            this.maskEl.bottom.setSize(Roo.lib.Dom.getDocumentWidth(), Roo.lib.Dom.getDocumentHeight() - box.bottom - this.padding);
            this.maskEl.bottom.setXY([0, box.bottom + this.padding]);
            this.maskEl.bottom.show();

            this.maskEl.right.setStyle('position', 'fixed');
            this.maskEl.right.setStyle('z-index', zIndex);
            this.maskEl.right.setSize(box.x - this.padding, box.height + this.padding * 2);
            this.maskEl.right.setXY([0, box.y - this.padding]);
            this.maskEl.right.show();


            this.toolTip.bindEl = this.target.el;

            this.toolTip.el.setStyle('z-index', Roo.bootstrap.Modal.zIndex++);

            var tip = this.target.blankText;

            if(this.target.getValue() !== '' && this.target.regexText.length){
                tip = this.target.regexText;
            }

            this.toolTip.show(tip);

            this.intervalID = window.setInterval(function() {
                Roo.bootstrap.Form.popover.unmask();
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
            
            this.toolTip.hide();
            
            this.toolTip.el.hide();
            
            window.onwheel = function(){ return true;};
            
            if(this.intervalID){
                window.clearInterval(this.intervalID);
                this.intervalID = false;
            }
            
            this.isMasked = false;
            
        }
        
    }
    
});

