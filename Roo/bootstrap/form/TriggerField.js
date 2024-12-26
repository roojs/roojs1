/*
 * - LGPL
 *
 * trigger field - base class for combo..
 * 
 */
 
/**
 * @class Roo.bootstrap.form.TriggerField
 * @extends Roo.bootstrap.form.Input
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button (looks like a combobox by default).
 * The trigger has no default action, so you must assign a function to implement the trigger click handler by
 * overriding {@link #onTriggerClick}. You can create a TriggerField directly, as it renders exactly like a combobox
 * for which you can provide a custom implementation.  For example:
 * <pre><code>
var trigger = new Roo.bootstrap.form.TriggerField();
trigger.onTriggerClick = myTriggerFn;
trigger.applyTo('my-field');
</code></pre>
 *
 * However, in general you will most likely want to use TriggerField as the base class for a reusable component.
 * {@link Roo.bootstrap.form.DateField} and {@link Roo.bootstrap.form.ComboBox} are perfect examples of this.
 * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always get the
 * class 'x-form-trigger' by default and triggerClass will be <b>appended</b> if specified.
 * @cfg {String} caret (search|calendar) BS3 only - carat fa name

 * @constructor
 * Create a new TriggerField.
 * @param {Object} config Configuration options (valid {@Roo.bootstrap.form.Input} config options will also be applied
 * to the base TextField)
 */
Roo.bootstrap.form.TriggerField = function(config){
    this.mimicing = false;
    Roo.bootstrap.form.TriggerField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.form.TriggerField, Roo.bootstrap.form.Input,  {
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
            
            if(this.removable && !this.editable  ){
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
            if(this.removable && !this.editable ){
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
                    cls : 'input-group-addon input-group-prepend input-group-text',
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
                    cls : 'input-group-addon input-group-append input-group-text',
                    html : this.after
                });
            }
            
        };
        
      
        
        var ibwrap = inputblock;
        
        if(this.multiple){
            ibwrap = {
                tag: 'ul',
                cls: 'roo-select2-choices',
                cn:[
                    {
                        tag: 'li',
                        cls: 'roo-select2-search-field',
                        cn: [

                            inputblock
                        ]
                    }
                ]
            };
                
        }
        
        var combobox = {
            cls: 'roo-select2-container input-group',
            cn: [
                 {
                    tag: 'input',
                    type : 'hidden',
                    cls: 'form-hidden-field'
                },
                ibwrap
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
                cls : 'input-group-addon input-group-append input-group-text btn dropdown-toggle',
                cn : [
                    Roo.bootstrap.version == 3 ? caret : '',
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
            combobox.cls += ' roo-select2-container-multi';
        }
         var indicator = {
            tag : 'i',
            cls : 'roo-required-indicator ' + (this.indicatorpos == 'right'  ? 'right' : 'left') +'-indicator text-danger fa fa-lg fa-star',
            tooltip : 'This field is required'
        };
      
        if (this.allowBlank) {
            indicator = {
                tag : 'i',
                style : 'display:none'
            };
        }
         
        
        
        if (align ==='left' && this.fieldLabel.length) {
            
            cfg.cls += ' roo-form-group-label-left'  + (Roo.bootstrap.version == 4 ? ' row' : '');

            cfg.cn = [
                indicator,
                {
                    tag: 'label',
                    'for' :  id,
                    cls : 'control-label',
                    html : this.fieldLabel

                },
                {
                    cls : "", 
                    cn: [
                        combobox
                    ]
                }

            ];
            
            var labelCfg = cfg.cn[1];
            var contentCfg = cfg.cn[2];
            
            if(this.indicatorpos == 'right'){
                cfg.cn = [
                    {
                        tag: 'label',
                        'for' :  id,
                        cls : 'control-label',
                        cn : [
                            {
                                tag : 'span',
                                html : this.fieldLabel
                            },
                            indicator
                        ]
                    },
                    {
                        cls : "", 
                        cn: [
                            combobox
                        ]
                    }

                ];
                
                labelCfg = cfg.cn[0];
                contentCfg = cfg.cn[1];
            }
            
            if(this.labelWidth > 12){
                labelCfg.style = "width: " + this.labelWidth + 'px';
            }
            
            if(this.labelWidth < 13 && this.labelmd == 0){
                this.labelmd = this.labelWidth;
            }
            
            if(this.labellg > 0){
                labelCfg.cls += ' col-lg-' + this.labellg;
                contentCfg.cls += ' col-lg-' + (12 - this.labellg);
            }
            
            if(this.labelmd > 0){
                labelCfg.cls += ' col-md-' + this.labelmd;
                contentCfg.cls += ' col-md-' + (12 - this.labelmd);
            }
            
            if(this.labelsm > 0){
                labelCfg.cls += ' col-sm-' + this.labelsm;
                contentCfg.cls += ' col-sm-' + (12 - this.labelsm);
            }
            
            if(this.labelxs > 0){
                labelCfg.cls += ' col-xs-' + this.labelxs;
                contentCfg.cls += ' col-xs-' + (12 - this.labelxs);
            }
            
        } else if ( this.fieldLabel.length) {
//                Roo.log(" label");
            cfg.cn = [
                indicator,
               {
                   tag: 'label',
                   //cls : 'input-group-addon',
                   html : this.fieldLabel

               },

               combobox

            ];
            
            if(this.indicatorpos == 'right'){
                
                cfg.cn = [
                    {
                       tag: 'label',
                       cn : [
                           {
                               tag : 'span',
                               html : this.fieldLabel
                           },
                           indicator
                       ]

                    },
                    combobox

                ];

            }

        } else {
            
//                Roo.log(" no label && no align");
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
//        Roo.bootstrap.form.TriggerField.superclass.onResize.apply(this, arguments);
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
        
        Roo.bootstrap.form.TriggerField.superclass.initEvents.call(this);
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
                close.setVisibilityMode(Roo.Element.DISPLAY).hide();
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
            this.fireEvent("afterremove", this);
        }
    },
    
    createList : function()
    {
        this.list = Roo.get(document.body).createChild({
            tag: Roo.bootstrap.version == 4 ? 'div' : 'ul',
            cls: 'typeahead typeahead-long dropdown-menu shadow',
            style: 'display:none'
        });
        
        this.list.setVisibilityMode(Roo.Element.DISPLAY).originalDisplay = 'block';
        
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
        Roo.bootstrap.form.TriggerField.superclass.onDestroy.call(this);
    },

    // private
    onFocus : function(){
        Roo.bootstrap.form.TriggerField.superclass.onFocus.call(this);
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
        Roo.bootstrap.form.TriggerField.superclass.onBlur.call(this);
    },

    // private
    // This should be overriden by any subclass that needs to check whether or not the field can be blurred.
    validateBlur : function(e, t){
        return true;
    },

    // private
    onDisable : function(){
        this.inputEl().dom.disabled = true;
        //Roo.bootstrap.form.TriggerField.superclass.onDisable.call(this);
        //if(this.wrap){
        //    this.wrap.addClass('x-item-disabled');
        //}
    },

    // private
    onEnable : function(){
        this.inputEl().dom.disabled = false;
        //Roo.bootstrap.form.TriggerField.superclass.onEnable.call(this);
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
 