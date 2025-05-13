//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard8 = new Roo.XComponent({

 _strings : {
  '098f6bcd4621d373cade4e832627b4f6' :"test",
  '9c1ab57e621c2bb257798752dbbe6f14' :"view source",
  '292fa2a8793f6a1fce028684a46ff33c' :"Add a new Card",
  'e93b3fa481be3932aa08bd68c3deee70' :"example 1",
  '60ee66eb2cd31823032664c2e9a79fd5' :"body goes here",
  'fb66f41b81f5973740bbfed019aa5d7d' :"Upload Images or Documents",
  'd9fb0367346d21079a1c52d72da61c9f' :"ticket 1"
 },

  part     :  ["bootstrap", "dashboard8" ],
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
       xtype : 'Button',
       html : _this._strings['9c1ab57e621c2bb257798752dbbe6f14'] /* view source */,
       listeners : {
        click : function (btn, e)
         {
             // assumes installed as /roojs1.
           Roo.docs.ViewSource.show({
               src: '/roojs1/examples/bootstrap/dashboard4.js'
           });
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap'
      },
      {
       xtype : 'Row',
       listeners : {
        beforerender : function (self) {
         
         }
       },
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Card',
         cls : 'col-xs-12 column col-12',
         dropable : true,
         drop_group : 'cards',
         footer : 'a footer',
         header : _this._strings['e93b3fa481be3932aa08bd68c3deee70'] /* example 1 */,
         style : 'max-width:300px;margin: 0 12px;',
         weight : 'danger',
         listeners : {
          cardover : function (this, data) {
           
           }
         },
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Form',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Input',
             before : '<i class=\"fa fa-plus\"></i>',
             placeholder : _this._strings['292fa2a8793f6a1fce028684a46ff33c'] /* Add a new Card */,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
          {
           xtype : 'Card',
           collapsable : true,
           dragable : true,
           drag_group : 'cards',
           header : _this._strings['d9fb0367346d21079a1c52d72da61c9f'] /* ticket 1 */,
           html : _this._strings['60ee66eb2cd31823032664c2e9a79fd5'] /* body goes here */,
           margin_bottom : 3,
           weight : 'light',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'Card',
           dragable : true,
           drag_group : 'cards',
           header : _this._strings['d9fb0367346d21079a1c52d72da61c9f'] /* ticket 1 */,
           html : _this._strings['60ee66eb2cd31823032664c2e9a79fd5'] /* body goes here */,
           margin_bottom : 3,
           weight : 'light',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Card',
         cls : 'column col-xs-12 col-12',
         dropable : true,
         drop_group : 'cards',
         footer : 'a footer',
         header : _this._strings['e93b3fa481be3932aa08bd68c3deee70'] /* example 1 */,
         style : 'max-width:300px;margin: 0 12px;',
         weight : 'danger',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Card',
           dragable : true,
           drag_group : 'cards',
           header : _this._strings['d9fb0367346d21079a1c52d72da61c9f'] /* ticket 1 */,
           html : _this._strings['60ee66eb2cd31823032664c2e9a79fd5'] /* body goes here */,
           margin_bottom : 3,
           weight : 'light',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Card',
         title : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'CardUploader',
           html : _this._strings['fb66f41b81f5973740bbfed019aa5d7d'] /* Upload Images or Documents */,
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
