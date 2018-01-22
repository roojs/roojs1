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
        
        var test = Roo.bootstrap.PhoneInput.List;
        
        // test.slice(index, 1)
        // test.unshift(us)
        
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
         
         var inputblock = input;
         
         if(this.hasFeedback && !this.allowBlank){
             var feedback = {
                 tag: 'span',
                 cls: 'glyphicon form-control-feedback',
                 style: 'right: 0px'  //marker
             };
         }
         
         inputblock = {
             cn :  [] 
         };
         
         inputblock.cn.push(input);
         
         if(this.hasFeedback && !this.allowBlank){
             inputblock.cls += 'has-feedback';
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
         
         var flag = {
             tag: 'span',
             html: 'flag',
             cls: 'roo-selected-region',
             cn: [] //flag position ... (iti-flag-us)
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
         
         var combobox = {
             cls: 'roo-select2-container input-group',
             cn: []
         };
         
         combobox.cn.push({
             tag :'span',
             cls : 'input-group-addon btn dropdown-toggle',
             cn : [
                 flag,
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
         });
         
         combobox.cn.push(box);
         
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
                 cfg = combobox
         }
         
         var settings=this;
         ['xs','sm','md','lg'].map(function(size){
             if (settings[size]) {
                 cfg.cls += ' col-' + size + '-' + settings[size];
             }
         });
         
         return cfg;
     }
 });
 
 Roo.apply(Roo.bootstrap.PhoneInput, {
     
     /**
      * iso2 and abbr for all countries
      * @type Object
      */
     List : [
         {
             test: 'test'
         }
     ]
 });