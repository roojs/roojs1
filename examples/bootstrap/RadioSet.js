//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

RadioSet = new Roo.XComponent({

 _strings : {
  '8d80ce38760953b68529d7fc9d8d89b6' :"Radio Field Lable",
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
             fieldLabel : _this._strings['8d80ce38760953b68529d7fc9d8d89b6'] /* Radio Field Lable */,
             name : 'post_name',
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'RadioItem',
               boxLabel : 'Yes',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'RadioItem',
               boxLabel : 'No',
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
    }
   ]
  };  }
});
