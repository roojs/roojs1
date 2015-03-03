//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Dialog');

Dialog.Login = new Roo.XComponent({
  part     :  ["bootstrap", "Login" ],
  order    : '001-Dialog.Login',
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
   xtype : 'Body',
   xns : Roo.bootstrap,
   items : [
    Roo.apply(Hydra.Header._tree(), {
     '|xns' : 'Roo.bootstrap',
     xtype : 'NavHeaderbar',
     xns : Roo.bootstrap
    }),
    {
     '|xns' : 'Roo.bootstrap',
     xtype : 'Container',
     xns : Roo.bootstrap,
     style : 'margin-top:25px',
     items : [
      {
       '|xns' : 'Roo.bootstrap',
       tag : 'ol',
       cls : 'breadcrumb',
       xtype : 'Container',
       xns : Roo.bootstrap,
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         xtype : 'Link',
         xns : Roo.bootstrap,
         html : 'Home',
         href : baseURL
        }
       ]

      },
      {
       '|xns' : 'Roo.bootstrap',
       xtype : 'Row',
       xns : Roo.bootstrap,
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'col-md-8 maincontent',
         xtype : 'Container',
         xns : Roo.bootstrap,
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           tag : 'header',
           cls : 'page-header',
           xtype : 'Container',
           xns : Roo.bootstrap,
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             cls : 'page-title',
             xtype : 'Header',
             xns : Roo.bootstrap,
             level : 1,
             html : 'Sorry an error has occured'
            }
           ]

          },
          {
           '|xns' : 'Roo.bootstrap',
           alert : 'danger',
           fa : 'ban',
           xtype : 'Container',
           xns : Roo.bootstrap,
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             tag : 'p',
             html : error_data.error_message,
             xtype : 'Element',
             xns : Roo.bootstrap
            }
           ]

          }
         ]

        }
       ]

      }
     ]

    },
    Roo.apply(Hydra.Footer._tree(), {
     '|xns' : 'Roo.bootstrap',
     cls : 'top-space',
     xtype : 'Container',
     xns : Roo.bootstrap
    })
   ]

  };  }
});
