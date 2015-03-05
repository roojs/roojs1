//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Login = new Roo.XComponent({

 _strings : {
  '0c83f57c786a0b4a39efab23731c7ebc' :"email",
  '3c0445c81a81e7508168c61674497f7d' :"Sign me in",
  'b05d72142020283dc6812fd3a9bc691c' :"I forgot my password",
  'b6d4223e60986fa4c9af77ee5f7149c5' :"Sign in",
  '5f4dcc3b5aa765d61d8327deb882cf99' :"password",
  '11268c03b59cc646b0fb7c4cb592130b' :"Register a new menbership"
 },

  part     :  ["bootstrap", "Login" ],
  order    : '001-Login',
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
   cls : 'bg-black',
   style : 'min-height: 100%;',
   xns : Roo.bootstrap,
   xtype : 'Body',
   items : [
    {
     '|xns' : 'Roo.bootstrap',
     cls : 'form-box',
     xns : Roo.bootstrap,
     xtype : 'Container',
     items : [
      {
       '|xns' : 'Roo.bootstrap',
       cls : 'header',
       html : _this._strings['b6d4223e60986fa4c9af77ee5f7149c5'],
       xns : Roo.bootstrap,
       xtype : 'Container'
      },
      {
       '|xns' : 'Roo.bootstrap',
       xns : Roo.bootstrap,
       xtype : 'Form',
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'body bg-gray',
         xns : Roo.bootstrap,
         xtype : 'Container',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           placeholder : _this._strings['0c83f57c786a0b4a39efab23731c7ebc'],
           xns : Roo.bootstrap,
           xtype : 'Input'
          },
          {
           '|xns' : 'Roo.bootstrap',
           inputType : 'password',
           placeholder : _this._strings['5f4dcc3b5aa765d61d8327deb882cf99'],
           xns : Roo.bootstrap,
           xtype : 'Input'
          },
          {
           '|xns' : 'Roo.bootstrap',
           boxLabel : 'Remember me',
           xns : Roo.bootstrap,
           xtype : 'CheckBox'
          }
         ]

        }
       ]

      },
      {
       '|xns' : 'Roo.bootstrap',
       cls : 'footer',
       xns : Roo.bootstrap,
       xtype : 'Container',
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'btn-block',
         html : _this._strings['3c0445c81a81e7508168c61674497f7d'],
         weight : 'primary',
         xns : Roo.bootstrap,
         xtype : 'Button'
        },
        {
         '|xns' : 'Roo.bootstrap',
         tag : 'p',
         xns : Roo.bootstrap,
         xtype : 'Container',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           href : '#',
           html : _this._strings['b05d72142020283dc6812fd3a9bc691c'],
           xns : Roo.bootstrap,
           xtype : 'Link'
          }
         ]

        },
        {
         '|xns' : 'Roo.bootstrap',
         tag : 'p',
         xns : Roo.bootstrap,
         xtype : 'Container',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           cls : 'text-center',
           href : '#',
           html : _this._strings['11268c03b59cc646b0fb7c4cb592130b'],
           xns : Roo.bootstrap,
           xtype : 'Link'
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
