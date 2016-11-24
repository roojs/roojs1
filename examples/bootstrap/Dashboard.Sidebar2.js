//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Dashboard');

Dashboard.Sidebar2 = new Roo.XComponent({

 _strings : {
  '180ad460b6c01d52766cac486d5272c0' :"test aaa",
  '098f6bcd4621d373cade4e832627b4f6' :"test"
 },

  part     :  ["bootstrap", "Sidebar2" ],
  order    : '001-Dashboard.Sidebar-',
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
   xtype : 'Container',
   cls : 'left-side sidebar-offcanvas',
   tag : 'aside',
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'NavSidebar',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'NavGroup',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'NavSidebarItem',
         href : '#',
         html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
         icon : 'fa fa-bar-chart-o',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         menu : {
          xtype : 'Menu',
          type : 'treeview',
          xns : Roo.bootstrap,
          '|xns' : 'Roo.bootstrap',
          items  : [
           {
            xtype : 'MenuItem',
            html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'MenuItem',
            html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           },
           {
            xtype : 'MenuItem',
            html : _this._strings['180ad460b6c01d52766cac486d5272c0'] /* test aaa */,
            listeners : {
             click : function (_self, e)
              {
                  Roo.log("last one clicked");
              }
            },
            xns : Roo.bootstrap,
            '|xns' : 'Roo.bootstrap'
           }
          ]
         }
        },
        {
         xtype : 'NavSidebarItem',
         badge : 'new',
         badgecls : 'bg-red',
         href : '#',
         html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
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
