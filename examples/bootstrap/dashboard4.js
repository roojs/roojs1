//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard4 = new Roo.XComponent({

 _strings : {
  '9d5ed678fe57bcca610140957afab571' :"B",
  '9db5682a4d778ca2cb79580bdb67083f' :"Some text",
  '0d61f8370cad1d412f80b84d143e1257' :"C",
  'f623e75af30e62bbd73d6df5b50bb7b5' :"D",
  '3a3ea00cfc35332cedf6e5e9a32e94da' :"E",
  '70ce2e7a27cab2a670ca954f8362e19f' :"tab 2 content",
  '800618943025315f869e4e1f09471012' :"F",
  '18327168fcb401af02b4615b43d637ad' :"Pick from list",
  '7fc56270e7a70fa81a5935b72eacbe29' :"A"
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
         xtype : 'Column',
         lg : 6,
         md : 6,
         sm : 12,
         style : '',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'TabBox',
           title : _this._strings['18327168fcb401af02b4615b43d637ad'] /* Pick from list */,
           listeners : {
            render : function (_self)
             {
                 _this.testbox = _self;
             }
           },
           xns : Roo.bootstrap.dash,
           '|xns' : 'Roo.bootstrap.dash',
           items  : [
            {
             xtype : 'TabPane',
             title : _this._strings['7fc56270e7a70fa81a5935b72eacbe29'] /* A */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Button',
                 html : _this._strings['9db5682a4d778ca2cb79580bdb67083f'] /* Some text */,
                 size : 'sm',
                 weight : 'warning',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                },
                {
                 xtype : 'Button',
                 html : _this._strings['9db5682a4d778ca2cb79580bdb67083f'] /* Some text */,
                 size : 'sm',
                 weight : 'warning',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              }
             ]
            },
            {
             xtype : 'TabPane',
             title : _this._strings['9d5ed678fe57bcca610140957afab571'] /* B */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'] /* tab 2 content */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            },
            {
             xtype : 'TabPane',
             title : _this._strings['0d61f8370cad1d412f80b84d143e1257'] /* C */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'] /* tab 2 content */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            },
            {
             xtype : 'TabPane',
             title : _this._strings['f623e75af30e62bbd73d6df5b50bb7b5'] /* D */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'] /* tab 2 content */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            },
            {
             xtype : 'TabPane',
             title : _this._strings['3a3ea00cfc35332cedf6e5e9a32e94da'] /* E */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'] /* tab 2 content */,
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              }
             ]
            },
            {
             xtype : 'TabPane',
             title : _this._strings['800618943025315f869e4e1f09471012'] /* F */,
             xns : Roo.bootstrap.dash,
             '|xns' : 'Roo.bootstrap.dash',
             items  : [
              {
               xtype : 'Column',
               html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'] /* tab 2 content */,
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
      }
     ]
    }
   ]
  };  }
});
