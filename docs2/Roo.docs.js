//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo');

Roo.docs = new Roo.XComponent({

 _strings : {
  '098f6bcd4621d373cade4e832627b4f6' :"test"
 },

  part     :  ["docs2", "docs" ],
  order    : '001-Roo.docs',
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
   cls : 'doc-body',
   listeners : {
    render : function (_self)
     {
           
        
         
     }
   },
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    Roo.apply(Roo.docs.MobileSidebarMenu._tree(), {
     xtype : 'NavHeaderbar',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    }),
    Roo.apply(Roo.docs.SidebarNav._tree(), {
     xtype : 'NavSidebar',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    }),
    {
     xtype : 'Container',
     cls : 'general-content-body',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Row',
       style : 'margin: 0px;',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Column',
         md : 6,
         style : 'padding-left: 0px;',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Header',
           html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
           level : 2,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'Element',
           html : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
           tag : 'div',
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
  };  }
});
