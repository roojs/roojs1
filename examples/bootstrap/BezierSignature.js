//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

BezierSignature = new Roo.XComponent({



  part     :  ["bootstrap", "BezierSignature" ],
  order    : '001-BezierSignature',
  region   : 'center',
  parent   : false,
  name     : "BezierSignature",
  disabled : false, 
  permname : '', 
  _tree : function(_data)
  {
   var _this = this;
   var MODULE = this;
   return {
   xtype : 'Body',
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'Container',
     listeners : {
      render : function (_self)
       {
           _this.ctn = this;
       }
     },
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'BezierSignature',
       listeners : {
        render : function (_self)
         {
             _this.sign = this;
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap'
      }
     ]
    }
   ]
  };  }
});
