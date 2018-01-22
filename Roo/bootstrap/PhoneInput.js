/*
 * - LGPL
 *
 * element
 * 
 */

/**
 * @class Roo.bootstrap.PhoneInput
 * @extends Roo.bootstrap.TriggerField
 * Bootstrap PhoneInput class
 * 
 * @constructor
 * Create a new PhoneInput
 * @param {Object} config The config object
*/

Roo.bootstrap.PhoneInput = function(config){
    
    Roo.bootstrap.PhoneInput.superclass.constructor.call(this, config);
    
    this.addEvents({
        'touchviewdisplay' : true
    });
    
    this.country = []; //fetch country JSON
};

Roo.extend(Roo.bootstrap.PhoneInput, Roo.bootstrap.TriggerField, {
     
     //setting properties...
     //from combobox...
     listWidth: undefined,
     
     modalTitle : '', 
     
     selectedClass: 'active',
     
     maxHeight: 300,
     
     minListWidth : 70,
     
     validClass : "has-success",
     
     invalidClass: "has-warning",
     
     //new settings
     preferedCountries: undefined, //array
     
     filterCountries: undefined, //array
     
     displayMode: undefined, //string
     
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
             placeholder : this.placeholder || '' //marker
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
         
         if(this.hasFeedback && !this.allowBlank){
             var feedback = {
                 tag: 'span',
                 cls: 'glyphicon form-control-feedback',
                 style: 'right: 0px'  //marker
             };
         }
         
         inputblock = {
             cls : 'input-group',
             cn :  [] 
         };
         
         inputblock.cn.push(input);
         
         if(this.hasFeedback && !this.allowBlank){
             inputblock.cls += ' has-feedback';
             inputblock.cn.push(feedback);
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
         
         var combobox = {
             cls: 'roo-select2-container input-group',
             cn: [
                 box
 //                {
 //                    tag: 'ul',
 //                    cls: 'typeahead typeahead-long dropdown-menu',
 //                    style: 'display:none'
 //                }
             ]
         };
         
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
         
         combobox.cn.unshift({
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
         
         if(this.multiple){
             combobox.cls += ' roo-select2-container-multi';
         }
         
         if (align ==='left' && this.fieldLabel.length) {
             
             cfg.cls += ' roo-form-group-label-left';

             cfg.cn = [
                 {
                     tag : 'i',
                     cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                     tooltip : 'This field is required'
                 },
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
                             {
                                 tag : 'i',
                                 cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                                 tooltip : 'This field is required'
                             }
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
                 {
                    tag : 'i',
                    cls : 'roo-required-indicator left-indicator text-danger fa fa-lg fa-star',
                    tooltip : 'This field is required'
                },
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
                            {
                               tag : 'i',
                               cls : 'roo-required-indicator right-indicator text-danger fa fa-lg fa-star',
                               tooltip : 'This field is required'
                            }
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
             this.fireEvent("afterremove", this)
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