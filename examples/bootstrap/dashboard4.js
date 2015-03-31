//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard4 = new Roo.XComponent({

 _strings : {
  '9d5ed678fe57bcca610140957afab571' :"B",
  'f623e75af30e62bbd73d6df5b50bb7b5' :"D",
  '30bd2ce65d1e43e9c498b7d5d49f3b78' :"Dashboard <small>  Example Control panel </small>",
  '70ce2e7a27cab2a670ca954f8362e19f' :"tab 2 content",
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

        },
        {
         '|xns' : 'Roo.bootstrap',
         cls : 'content',
         tag : 'section',
         xns : Roo.bootstrap,
         xtype : 'Container',
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           xns : Roo.bootstrap,
           xtype : 'Row',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             lg : 6,
             md : 6,
             sm : 12,
             style : '',
             xns : Roo.bootstrap,
             xtype : 'Column',
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               title : _this._strings['18327168fcb401af02b4615b43d637ad'],
               xns : Roo.bootstrap.dash,
               xtype : 'TabBox',
               listeners : {
                render : function (_self)
                 {
                     _this.testbox = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['7fc56270e7a70fa81a5935b72eacbe29'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xns : Roo.bootstrap,
                   xtype : 'Column'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['9d5ed678fe57bcca610140957afab571'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'],
                   xns : Roo.bootstrap,
                   xtype : 'Column'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['9d5ed678fe57bcca610140957afab571'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'],
                   xns : Roo.bootstrap,
                   xtype : 'Column'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['f623e75af30e62bbd73d6df5b50bb7b5'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'],
                   xns : Roo.bootstrap,
                   xtype : 'Column'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['9d5ed678fe57bcca610140957afab571'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'],
                   xns : Roo.bootstrap,
                   xtype : 'Column'
                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['9d5ed678fe57bcca610140957afab571'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f'],
                   xns : Roo.bootstrap,
                   xtype : 'Column'
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

      }
     ]

    }
   ]

  };  }
});
