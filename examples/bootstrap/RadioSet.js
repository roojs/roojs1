//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

RadioSet = new Roo.XComponent({

 _strings : {
  'ce8ae9da5b7cd6c3df2929543a9af92d' :"Email",
  'bafd7322c6e97d25b6299b5d6fe8920b' :"No",
  '7fa3b767c460b54a2be4d49030b349c7' :"no",
  'e3917ff2d3b3a88eab391651215d6445' :"Radio Field Lable Left",
  '9dffbf69ffba8bc38bc4e01abf4b1675' :"Text",
  '8d80ce38760953b68529d7fc9d8d89b6' :"Radio Field Lable",
  '015ae6f41d4b86ad13ac0fde840d2280' :"Text Input",
  '93cba07454f06a4a960172bbd6e2a435' :"Yes",
  'a6105c0a611b41b08f1209506350279e' :"yes",
  'ad3d06d03d94223fa652babc913de686' :"Validate",
  'b7dc22f0e17f4dfca2940eb0bd0cdc54' :"Radio Set Example",
  'd41d8cd98f00b204e9800998ecf8427e' :" "
 },
 _named_strings : {
  'text_name_fieldLabel' : '015ae6f41d4b86ad13ac0fde840d2280' /* Text Input */ ,
  'left_radio_fieldLabel' : 'e3917ff2d3b3a88eab391651215d6445' /* Radio Field Lable Left */ ,
  'text_name_placeholder' : '9dffbf69ffba8bc38bc4e01abf4b1675' /* Text */ ,
  'email_name_placeholder' : 'ce8ae9da5b7cd6c3df2929543a9af92d' /* Email */ ,
  'top_radio_fieldLabel' : '8d80ce38760953b68529d7fc9d8d89b6' /* Radio Field Lable */ ,
  'test1_boxLabel' : 'd41d8cd98f00b204e9800998ecf8427e' /*   */ 
 },

  part     :  ["bootstrap", "RadioSet" ],
  order    : '001-RadioSet',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Body',
   cls : 'bg-black',
   style : 'min-height: 100%;',
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'Container',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Form',
       errorMask : true,
       listeners : {
        render : function (_self)
         {
             _this.form = this;
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Header',
             html : _this._strings['b7dc22f0e17f4dfca2940eb0bd0cdc54'] /* Radio Set Example */,
             level : 1,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'RadioSet',
             allowBlank : false,
             fieldLabel : _this._strings['8d80ce38760953b68529d7fc9d8d89b6'] /* Radio Field Lable */,
             indicatorpos : 'right',
             labelAlign : 'top',
             name : 'top_radio',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Radio',
               boxLabel : _this._strings['93cba07454f06a4a960172bbd6e2a435'] /* Yes */,
               value : _this._strings['a6105c0a611b41b08f1209506350279e'] /* yes */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'Radio',
               boxLabel : _this._strings['bafd7322c6e97d25b6299b5d6fe8920b'] /* No */,
               value : _this._strings['7fa3b767c460b54a2be4d49030b349c7'] /* no */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           style : 'margin-top: 15px;',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'RadioSet',
             allowBlank : false,
             fieldLabel : _this._strings['e3917ff2d3b3a88eab391651215d6445'] /* Radio Field Lable Left */,
             indicatorpos : 'right',
             labelAlign : 'left',
             name : 'left_radio',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Radio',
               boxLabel : _this._strings['93cba07454f06a4a960172bbd6e2a435'] /* Yes */,
               value : _this._strings['a6105c0a611b41b08f1209506350279e'] /* yes */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'Radio',
               boxLabel : _this._strings['bafd7322c6e97d25b6299b5d6fe8920b'] /* No */,
               value : _this._strings['7fa3b767c460b54a2be4d49030b349c7'] /* no */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           style : 'margin-top: 15px;',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Input',
             allowBlank : false,
             fieldLabel : _this._strings['015ae6f41d4b86ad13ac0fde840d2280'] /* Text Input */,
             name : 'text_name',
             placeholder : _this._strings['9dffbf69ffba8bc38bc4e01abf4b1675'] /* Text */,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Input',
             allowBlank : false,
             name : 'email_name',
             placeholder : _this._strings['ce8ae9da5b7cd6c3df2929543a9af92d'] /* Email */,
             regexText : 'This field should be an e-mail address in the format \"user@domain.com\"',
             vtype : 'email',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'TextArea',
             allowBlank : false,
             name : 'text_area',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'CheckBox',
             boxLabel : _this._strings['d41d8cd98f00b204e9800998ecf8427e'] /*   */,
             name : 'test1',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        },
        {
         xtype : 'Row',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Column',
           style : 'margin-top: 15px;',
           xs : 12,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Button',
             html : _this._strings['ad3d06d03d94223fa652babc913de686'] /* Validate */,
             weight : 'primary',
             listeners : {
              click : function (_self, e)
               {
                   _this.form.isValid();
               }
             },
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  };  }
});
