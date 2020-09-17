//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard4 = new Roo.XComponent({

 _strings : {
  'e93b3fa481be3932aa08bd68c3deee70' :"example 1",
  'e037df87a91c6e2727f0d9eb15c8127f' :"this is the body text"
 },

  part     :  ["bootstrap", "dashboard4" ],
  order    : '001-dashboard-',
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
   cls : 'skin-blue',
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'Container',
     cls : 'content',
     tag : 'section',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Card',
       header : _this._strings['e93b3fa481be3932aa08bd68c3deee70'] /* example 1 */,
       html : _this._strings['e037df87a91c6e2727f0d9eb15c8127f'] /* this is the body text */,
       style : 'max-width:200px',
       weight : 'primary',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Container',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        }
       ]
      }
     ]
    }
   ]
  };  }
});
