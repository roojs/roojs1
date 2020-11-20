//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard4 = new Roo.XComponent({

 _strings : {
  '098f6bcd4621d373cade4e832627b4f6' :"test",
  'e93b3fa481be3932aa08bd68c3deee70' :"example 1",
  '60ee66eb2cd31823032664c2e9a79fd5' :"body goes here",
  '9cf863d802aca813531ca28b319ead90' :"Add Issue",
  'd9fb0367346d21079a1c52d72da61c9f' :"ticket 1"
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
       xtype : 'Row',
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
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
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
          },
          {
           xtype : 'Button',
           html : _this._strings['9cf863d802aca813531ca28b319ead90'] /* Add Issue */,
           weight : 'primary',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Card',
         cls : 'column col-xs-12 col-12',
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
          },
          {
           xtype : 'Button',
           html : _this._strings['9cf863d802aca813531ca28b319ead90'] /* Add Issue */,
           weight : 'primary',
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
           xtype : 'UploadCropbox',
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
           xtype : 'DocumentManager',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Column',
         xs : 3,
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Card',
           footer : 'test',
           header_image : 'https://www.roojs.com/Roojscom/templates/images/roojsolutions-tr-100.png',
           title : _this._strings['098f6bcd4621d373cade4e832627b4f6'] /* test */,
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
