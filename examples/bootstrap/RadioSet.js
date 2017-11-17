//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

RadioSet = new Roo.XComponent({

 _strings : {
  '7fa3b767c460b54a2be4d49030b349c7' :"no",
  '8d80ce38760953b68529d7fc9d8d89b6' :"Radio Field Lable",
  'a6105c0a611b41b08f1209506350279e' :"yes",
  'b7dc22f0e17f4dfca2940eb0bd0cdc54' :"Radio Set Example"
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
             indicatorpos : 'left',
             name : 'radio_name',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'Radio',
               boxLabel : 'Yes',
               value : _this._strings['a6105c0a611b41b08f1209506350279e'] /* yes */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'Radio',
               boxLabel : 'No',
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
             name : 'text_name',
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
