//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

RadioSet = new Roo.XComponent({

 _strings : {
  '0c83f57c786a0b4a39efab23731c7ebc' :"email",
  '3c0445c81a81e7508168c61674497f7d' :"Sign me in",
  'b05d72142020283dc6812fd3a9bc691c' :"I forgot my password",
  'b6d4223e60986fa4c9af77ee5f7149c5' :"Sign in",
  '5f4dcc3b5aa765d61d8327deb882cf99' :"password",
  '11268c03b59cc646b0fb7c4cb592130b' :"Register a new menbership"
 },

  part     :  ["bootstrap", "RadioSet" ],
  order    : '001-RadioSet',
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
   cls : 'bg-black',
   style : 'min-height: 100%;',
   xns : Roo.bootstrap,
   '|xns' : 'Roo.bootstrap',
   items  : [
    {
     xtype : 'Container',
     cls : 'form-box',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      {
       xtype : 'Container',
       cls : 'header',
       html : _this._strings['b6d4223e60986fa4c9af77ee5f7149c5'] /* Sign in */,
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap'
      },
      {
       xtype : 'Form',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Container',
         cls : 'body bg-gray',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Input',
           placeholder : _this._strings['0c83f57c786a0b4a39efab23731c7ebc'] /* email */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'Input',
           inputType : 'password',
           placeholder : _this._strings['5f4dcc3b5aa765d61d8327deb882cf99'] /* password */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          },
          {
           xtype : 'CheckBox',
           boxLabel : 'Remember me',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        }
       ]
      },
      {
       xtype : 'Container',
       cls : 'footer',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Button',
         cls : 'btn-block',
         html : _this._strings['3c0445c81a81e7508168c61674497f7d'] /* Sign me in */,
         weight : 'primary',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap'
        },
        {
         xtype : 'Container',
         tag : 'p',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Link',
           href : '#',
           html : _this._strings['b05d72142020283dc6812fd3a9bc691c'] /* I forgot my password */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Container',
         tag : 'p',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Link',
           cls : 'text-center',
           href : '#',
           html : _this._strings['11268c03b59cc646b0fb7c4cb592130b'] /* Register a new menbership */,
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
