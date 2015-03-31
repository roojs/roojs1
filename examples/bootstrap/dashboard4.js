//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard4 = new Roo.XComponent({

 _strings : {
  '30bd2ce65d1e43e9c498b7d5d49f3b78' :"Dashboard <small>  Example Control panel </small>"
 },

  part     :  ["bootstrap", "dashboard4" ],
  order    : '001-dashboard-',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   '|xns' : 'Roo.bootstrap',
   cls : 'skin-blue',
   xns : Roo.bootstrap,
   xtype : 'Body',
   items : [
    Roo.apply(Dashboard.Header1._tree(), {
     '|xns' : 'Roo.bootstrap',
     cls : 'header',
     tag : 'header',
     xns : Roo.bootstrap,
     xtype : 'Container'
    }),
    {
     '|xns' : 'Roo.bootstrap',
     cls : 'wrapper row-offcanvas row-offcanvas-left',
     'flexy:include' : 'Sidebar.html',
     xns : Roo.bootstrap,
     xtype : 'Container',
     items : [
      Roo.apply(Dashboard.Sidebar2._tree(), {
       '|xns' : 'Roo.bootstrap',
       cls : 'left-side sidebar-offcanvas',
       tag : 'aside',
       xns : Roo.bootstrap,
       xtype : 'Container'
      }),
      {
       '|xns' : 'Roo.bootstrap',
       cls : 'right-side',
       tag : 'aside',
       xns : Roo.bootstrap,
       xtype : 'Container',
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'content-header',
         tag : 'section',
         xns : Roo.bootstrap,
         xtype : 'Container',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           html : _this._strings['30bd2ce65d1e43e9c498b7d5d49f3b78'],
           xns : Roo.bootstrap,
           xtype : 'Header'
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
