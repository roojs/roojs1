//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Roo');

Roo.docs = new Roo.XComponent({



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
    Roo.apply(Roo.doc.MobileSidebarMenu._tree(), {
     xtype : 'NavHeaderbar',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    }),
    Roo.apply(Roo.doc.SidebarNav._tree(), {
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
           html : pagedata.page.title,
           level : 2,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'Element',
           html : pagedata.page.body,
           tag : 'div',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        }
       ]
      }
     ]
    },
    Roo.apply(Roo.docs.MobileFooter._tree(), {
     xtype : 'Container',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    })
   ]
  };  }
});
