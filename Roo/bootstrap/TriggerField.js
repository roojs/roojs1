/*
 * - LGPL
 *
 * trigger field - base class for combo..
 * 
 */
 
/**
 * @class Roo.bootstrap.TriggerField
 * @extends Roo.bootstrap.Input
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button (looks like a combobox by default).
 * The trigger has no default action, so you must assign a function to implement the trigger click handler by
 * overriding {@link #onTriggerClick}. You can create a TriggerField directly, as it renders exactly like a combobox
 * for which you can provide a custom implementation.  For example:
 * <pre><code>
var trigger = new Roo.bootstrap.TriggerField();
trigger.onTriggerClick = myTriggerFn;
trigger.applyTo('my-field');
</code></pre>
 *
 * However, in general you will most likely want to use TriggerField as the base class for a reusable component.
 * {@link Roo.bootstrap.DateField} and {@link Roo.bootstrap.ComboBox} are perfect examples of this.
 * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always get the
 * class 'x-form-trigger' by default and triggerClass will be <b>appended</b> if specified.
 * @cfg {String} caret (search|calendar) a fontawesome for the trigger icon see http://fortawesome.github.io/Font-Awesome/icons/

 * @constructor
 * Create a new TriggerField.
 * @param {Object} config Configuration options (valid {@Roo.bootstrap.Input} config options will also be applied
 * to the base TextField)
 */
Roo.bootstrap.TriggerField = function(config){
    this.mimicing = false;
    Roo.bootstrap.TriggerField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.TriggerField, Roo.bootstrap.Input,  {
    /**
     * @cfg {String} triggerClass A CSS class to apply to the trigger
     */
     /**
     * @cfg {Boolean} hideTrigger True to hide the trigger element and display only the base text field (defaults to false)
     */
    hideTrigger:false,

    /**
     * @cfg {Boolean} removable (true|false) special filter default false
     */
    removable : false,
    
    /** @cfg {Boolean} grow @hide */
    /** @cfg {Number} growMin @hide */
    /** @cfg {Number} growMax @hide */

    /**
     * @hide 
     * @method
     */
    autoSize: Roo.emptyFn,
    // private
    monitorTab : true,
    // private
    deferHeight : true,

    
    actionMode : 'wrap',
    
    caret : false,
    
    
    getAutoCreate : function(){
       
        var align = this.labelAlign || this.parentLabelAlign();
        
        var id = Roo.id();
        
        var cfg = {
            cls: 'form-group' //input-group
        };
        
        
        var input =  {
            tag: 'input',
            id : id,
            type : this.inputType,
            cls : 'form-control',
            autocomplete: 'new-password',
            placeholder : this.placeholder || '' 
            
        };
        if (this.name) {
            input.name = this.name;
        }
        if (this.size) {
            input.cls += ' input-' + this.size;
        }
        
        if (this.disabled) {
            input.disabled=true;
        }
        
        var inputblock = input;
        
        if(this.hasFeedback && !this.allowBlank){
            
            var feedback = {
                tag: 'span',
                cls: 'glyphicon form-control-feedback'
            };
            
            if(this.removable && !this.editable && !this.tickable){
                inputblock = {
                    cls : 'has-feedback',
                    cn :  [
                        inputblock,
                        {
                            tag: 'button',
                            html : 'x',
                            cls : 'roo-combo-removable-btn close'
                        },
                        feedback
                    ] 
                };
            } else {
                inputblock = {
                    cls : 'has-feedback',
                    cn :  [
                        inputblock,
                        feedback
                    ] 
                };
            }
              
        } else {
            if(this.removable && !this.editable && !this.tickable){
                inputblock = {
                    cls : 'roo-removable',
                    cn :  [
                        inputblock,
                        {
                            tag: 'button',
                            html : 'x',
                            cls : 'roo-combo-removable-btn close'
                        }
                    ] 
                };
            }
        }
        
        if (this.before || this.after) {
            
            inputblock = {
                cls : 'input-group',
                cn :  [] 
            };
            if (this.before) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.before
                });
            }
            
            inputblock.cn.push(input);
            
            if(this.hasFeedback && !this.allowBlank){
                inputblock.cls += ' has-feedback';
                inputblock.cn.push(feedback);
            }
            
            if (this.after) {
                inputblock.cn.push({
                    tag :'span',
                    cls : 'input-group-addon',
                    html : this.after
                });
            }
            
        };
        
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
            Roo.log('multiple');
            
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
//                {
//                    tag: 'ul',
//                    cls: 'typeahead typeahead-long dropdown-menu',
//                    style: 'display:none'
//                }
            ]
        };
        
        if(!this.multiple && this.showToggleBtn){
            
            var caret = {
                        tag: 'span',
                        cls: 'caret'
             };
            if (this.caret != false) {
                caret = {
                     tag: 'i',
                     cls: 'fa fa-' + this.caret
                };
                
            }
            
            combobox.cn.push({
                tag :'span',
                cls : 'input-group-addon btn dropdown-toggle',
                cn : [
                    caret,
                    {
                        tag: 'span',
                        cls: 'combobox-clear',
                        cn  : [
                            {
                                tag : 'i',
                                cls: 'icon-remove'
                            }
                        ]
                    }
                ]

            })
        }
        
        if(this.multiple){
            combobox.cls += ' select2-container-multi';
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
    
    
    
    // private
    onResize : function(w, h){
//        Roo.bootstrap.TriggerField.superclass.onResize.apply(this, arguments);
//        if(typeof w == 'number'){
//            var x = w - this.trigger.getWidth();
//            this.inputEl().setWidth(this.adjustWidth('input', x));
//            this.trigger.setStyle('left', x+'px');
//        }
    },

    // private
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    // private
    getResizeEl : function(){
        return this.inputEl();
    },

    // private
    getPositionEl : function(){
        return this.inputEl();
    },

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.inputEl(), 'tl-tr', [2, 0]);
    },

    // private
    initEvents : function(){
        
        this.createList();
        
        Roo.bootstrap.TriggerField.superclass.initEvents.call(this);
        //this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        if(!this.multiple && this.showToggleBtn){
            this.trigger = this.el.select('span.dropdown-toggle',true).first();
            if(this.hideTrigger){
                this.trigger.setDisplayed(false);
            }
            this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
        }
        
        if(this.multiple){
            this.inputEl().on("click", this.onTriggerClick, this, {preventDefault:true});
        }
        
        if(this.removable && !this.editable && !this.tickable){
            var close = this.closeTriggerEl();
            
            if(close){
                close.setVisibilityMode(Roo.Element.DISPALY).hide();
                close.on('click', this.removeBtnClick, this, close);
            }
        }
        
        //this.trigger.addClassOnOver('x-form-trigger-over');
        //this.trigger.addClassOnClick('x-form-trigger-click');
        
        //if(!this.width){
        //    this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        //}
    },
    
    closeTriggerEl : function()
    {
        var close = this.el.select('.roo-combo-removable-btn', true).first();
        return close ? close : false;
    },
    
    removeBtnClick : function(e, h, el)
    {
        e.preventDefault();
        
        if(this.fireEvent("remove", this) !== false){
            this.reset();
        }
    },
    
    createList : function()
    {
        this.list = Roo.get(document.body).createChild({
            tag: 'ul',
            cls: 'typeahead typeahead-long dropdown-menu',
            style: 'display:none'
        });
        
        this.list.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';;
        
    },

    // private
    initTrigger : function(){
       
    },

    // private
    onDestroy : function(){
        if(this.trigger){
            this.trigger.removeAllListeners();
          //  this.trigger.remove();
        }
        //if(this.wrap){
        //    this.wrap.remove();
        //}
        Roo.bootstrap.TriggerField.superclass.onDestroy.call(this);
    },

    // private
    onFocus : function(){
        Roo.bootstrap.TriggerField.superclass.onFocus.call(this);
        /*
        if(!this.mimicing){
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Roo.get(Roo.isIE ? document.body : document).on("mousedown", this.mimicBlur, this);
            if(this.monitorTab){
                this.el.on("keydown", this.checkTab, this);
            }
        }
        */
    },

    // private
    checkTab : function(e){
        if(e.getKey() == e.TAB){
            this.triggerBlur();
        }
    },

    // private
    onBlur : function(){
        // do nothing
    },

    // private
    mimicBlur : function(e, t){
        /*
        if(!this.wrap.contains(t) && this.validateBlur()){
            this.triggerBlur();
        }
        */
    },

    // private
    triggerBlur : function(){
        this.mimicing = false;
        Roo.get(Roo.isIE ? document.body : document).un("mousedown", this.mimicBlur);
        if(this.monitorTab){
            this.el.un("keydown", this.checkTab, this);
        }
        //this.wrap.removeClass('x-trigger-wrap-focus');
        Roo.bootstrap.TriggerField.superclass.onBlur.call(this);
    },

    // private
    // This should be overriden by any subclass that needs to check whether or not the field can be blurred.
    validateBlur : function(e, t){
        return true;
    },

    // private
    onDisable : function(){
        this.inputEl().dom.disabled = true;
        //Roo.bootstrap.TriggerField.superclass.onDisable.call(this);
        //if(this.wrap){
        //    this.wrap.addClass('x-item-disabled');
        //}
    },

    // private
    onEnable : function(){
        this.inputEl().dom.disabled = false;
        //Roo.bootstrap.TriggerField.superclass.onEnable.call(this);
        //if(this.wrap){
        //    this.el.removeClass('x-item-disabled');
        //}
    },

    // private
    onShow : function(){
        var ae = this.getActionEl();
        
        if(ae){
            ae.dom.style.display = '';
            ae.dom.style.visibility = 'visible';
        }
    },

    // private
    
    onHide : function(){
        var ae = this.getActionEl();
        ae.dom.style.display = 'none';
    },

    /**
     * The function that should handle the trigger's click event.  This method does nothing by default until overridden
     * by an implementing function.
     * @method
     * @param {EventObject} e
     */
    onTriggerClick : Roo.emptyFn
});
 