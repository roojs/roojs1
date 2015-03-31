//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard3 = new Roo.XComponent({

 _strings : {
  '1f9ff97aa2f49a79388004e1e57f2320' :"New Orders ",
  'fc0d5184491559c092364744b2247373' :"first tab",
  '30bd2ce65d1e43e9c498b7d5d49f3b78' :"Dashboard <small>  Example Control panel </small>",
  'b73ce398c39f506af761d2277d853a92' :"160",
  '7ef605fc8dba5425d6965fbd4c8fbe1f' :"150",
  '70ce2e7a27cab2a670ca954f8362e19f' :"tab 2 content",
  'f3ff0ceca73743a13990e970c318fc36' :"<span class=\"glyphicon glyphicon-chevron-left\"></span>",
  '34ae6773410925b4574e656be194f0ad' :"income",
  'e864378363f435160e7c2209cc2949b7' :"<span class=\"glyphicon glyphicon-chevron-right\"></span>",
  '1d17cb9923b99f823da9f5a16dc460e5' :"Department",
  '222a267cc5778206b253be35ee3ddab5' :"Current",
  '75f1bb6830981ca0ce62c3eb434373ba' :"Table tabs",
  'c4f5a294a273c3a1c97642a76f15c5c7' :"tab 1",
  '2d0175894e0fe09186d38fe7a7160294' :"second tab",
  '1b9b097340a24b31632ed601a9107832' :"This is a random string ",
  '9fc10133312e352754f8ca264a3e272d' :"New Orders",
  '9a7b64c98b066602b21f869ae7cd673a' :"test 1",
  '58a00f6a3da23fc3821f24115493b750' :"tab 2",
  '3c8d74bd7be3168fe440d9c85da42be8' :"<b> Alert </b> test alert",
  'd80590035c13589acfbdd2b2dcb60773' :"Aspire"
 },

  part     :  ["bootstrap", "dashboard3" ],
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
           xtype : 'Container',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             xtype : 'Column',
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               _aformat : _this._strings['1b9b097340a24b31632ed601a9107832'],
               bgcolor : '',
               cls : '',
               headline : 160,
               height : 150,
               style : 'col-md-3',
               title : _this._strings['1f9ff97aa2f49a79388004e1e57f2320'],
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               xtype : 'NumberBox'
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             xtype : 'Column',
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'green',
               cls : '',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               xtype : 'NumberBox'
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             xtype : 'Column',
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'yellow',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               xtype : 'NumberBox'
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             xtype : 'Column',
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'red',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               width : '',
               xns : Roo.bootstrap.dash,
               xtype : 'NumberBox'
              }
             ]

            }
           ]

          },
          {
           '|xns' : 'Roo.bootstrap',
           xns : Roo.bootstrap,
           xtype : 'Row',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             alert : 'danger',
             fa : 'ban',
             html : _this._strings['3c8d74bd7be3168fe440d9c85da42be8'],
             xns : Roo.bootstrap,
             xtype : 'Container'
            }
           ]

          },
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
               title : _this._strings['9a7b64c98b066602b21f869ae7cd673a'],
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
                 title : _this._strings['75f1bb6830981ca0ce62c3eb434373ba'],
                 xns : Roo.bootstrap.dash,
                 xtype : 'TabPane',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xns : Roo.bootstrap,
                   xtype : 'Column',
                   items : [
                    {
                     store : {
                      '|xns' : 'Roo.data',
                      data : [
                        [ 'A TEST', '1', '0' ],
                        
                          [ 'B test', '1', '0' ],
                            [ 'C test', '1', '0' ],
                          [ 'D test', '1', '0' ]
                      ],
                      fields : [ 'display_name', 'current', 'aspire' ],
                      isLocal : true,
                      xns : Roo.data,
                      xtype : 'SimpleStore'
                     },
                     '|xns' : 'Roo.bootstrap',
                     CellSelection : true,
                     RowSelection : true,
                     xns : Roo.bootstrap,
                     xtype : 'Table',
                     cm : [
                       {
                        '|xns' : 'Roo.grid',
                        dataIndex : 'display_name',
                        header : _this._strings['1d17cb9923b99f823da9f5a16dc460e5'],
                        xns : Roo.grid,
                        xtype : 'ColumnModel'
                       },
{
                        '|xns' : 'Roo.grid',
                        dataIndex : 'current',
                        header : _this._strings['222a267cc5778206b253be35ee3ddab5'],
                        renderer : function(v) {  
                        
                            var state = v> 0 ?  '-checked' : '';
                        
                            return v*1  > 0 ? 'X' : '-';             
                                        
                         },
                        xns : Roo.grid,
                        xtype : 'ColumnModel'
                       },
{
                        '|xns' : 'Roo.grid',
                        dataIndex : 'aspire',
                        header : _this._strings['d80590035c13589acfbdd2b2dcb60773'],
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                            return v*1  > 0 ? 'X' : '-';             
                         },
                        xns : Roo.grid,
                        xtype : 'ColumnModel'
                       }
                     ],
                     listeners : {
                      cellclick : function (_self, el, rowIndex, columnIndex, e)
                       {
                           
                       
                           var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                           if (cm.dataIndex == 'current') {
                               var rec = _this.listTable.ds.getAt(rowIndex);
                               
                               rec.set('current', rec.data.current * 1 ? '0' : '1');
                       
                               //_this.listTable.ds.fireEvent("datachanged", this);
                               rec.commit();
                               return;
                           }
                             if (cm.dataIndex == 'aspire') {
                               var rec = _this.listTable.ds.getAt(rowIndex);
                               
                               rec.set('aspire', rec.data.aspire * 1 ? '0' : '1');
                       
                               //_this.listTable.ds.fireEvent("datachanged", this);
                               rec.commit();
                               return;
                           }
                       
                            
                       },
                      render : function (_self)
                       {
                            _this.listTable = _self;
                           (function() { _self.store.load({}); }).defer(100)
                       }
                     },
                     items : [

                     ]

                    }
                   ]

                  }
                 ]

                },
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 title : _this._strings['58a00f6a3da23fc3821f24115493b750'],
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

            },
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
               '|xns' : 'Roo.bootstrap',
               cls : 'nav-tabs-custom',
               xns : Roo.bootstrap,
               xtype : 'Container',
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 html : _this._strings['34ae6773410925b4574e656be194f0ad'],
                 style : 'margin: 10,10,0,0',
                 xns : Roo.bootstrap,
                 xtype : 'Header'
                }
               ]

              }
             ]

            }
           ]

          },
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
               title : _this._strings['9a7b64c98b066602b21f869ae7cd673a'],
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
                 title : _this._strings['c4f5a294a273c3a1c97642a76f15c5c7'],
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
                 title : _this._strings['58a00f6a3da23fc3821f24115493b750'],
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

            },
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
               '|xns' : 'Roo.bootstrap',
               cls : 'nav-tabs-custom',
               xns : Roo.bootstrap,
               xtype : 'Container',
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 html : _this._strings['34ae6773410925b4574e656be194f0ad'],
                 style : 'margin: 10,10,0,0',
                 xns : Roo.bootstrap,
                 xtype : 'Header'
                }
               ]

              }
             ]

            }
           ]

          },
          {
           '|xns' : 'Roo.bootstrap',
           xns : Roo.bootstrap,
           xtype : 'Row',
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             carousel : true,
             lg : 12,
             navId : '#sample1',
             xns : Roo.bootstrap,
             xtype : 'TabGroup',
             listeners : {
              render : function (_self)
               {
                   _this.tabgroup = _self;
               }
             },
             items : [
              {
               '|xns' : 'Roo.bootstrap',
               active : true,
               cls : 'item',
               navId : '#sample1',
               tabId : '#second',
               xns : Roo.bootstrap,
               xtype : 'TabPanel',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_second = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 html : _this._strings['fc0d5184491559c092364744b2247373'],
                 level : 3,
                 xns : Roo.bootstrap,
                 xtype : 'Header'
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 style : 'padding-left:50px;padding-right:50px;',
                 well : 'md',
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
                     md : 6,
                     xns : Roo.bootstrap,
                     xtype : 'Column',
                     items : [
                      {
                       '|xns' : 'Roo.bootstrap',
                       allowBlank : true,
                       fieldLabel : 'Some input',
                       labelAlign : 'top',
                       name : 'chosen_title',
                       xns : Roo.bootstrap,
                       xtype : 'Input'
                      }
                     ]

                    }
                   ]

                  }
                 ]

                }
               ]

              },
              {
               '|xns' : 'Roo.bootstrap',
               active : false,
               cls : 'item',
               navId : '#sample1',
               tabId : '#first',
               xns : Roo.bootstrap,
               xtype : 'TabPanel',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_first = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 html : _this._strings['2d0175894e0fe09186d38fe7a7160294'],
                 level : 3,
                 xns : Roo.bootstrap,
                 xtype : 'Header'
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 style : 'padding-left:50px;padding-right:50px;',
                 well : 'md',
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
                     md : 6,
                     xns : Roo.bootstrap,
                     xtype : 'Column',
                     items : [
                      {
                       '|xns' : 'Roo.bootstrap',
                       allowBlank : true,
                       fieldLabel : 'This is a label',
                       labelAlign : 'top',
                       name : 'chosen_title',
                       xns : Roo.bootstrap,
                       xtype : 'Input'
                      }
                     ]

                    }
                   ]

                  }
                 ]

                }
               ]

              },
              {
               '|xns' : 'Roo.bootstrap',
               cls : 'carousel-control left',
               html : _this._strings['f3ff0ceca73743a13990e970c318fc36'],
               preventDefault : true,
               xns : Roo.bootstrap,
               xtype : 'Link',
               listeners : {
                click : function (e)
                 {
                     _this.tabgroup.showPanelPrev();
                 }
               }
              },
              {
               '|xns' : 'Roo.bootstrap',
               cls : 'carousel-control right',
               html : _this._strings['e864378363f435160e7c2209cc2949b7'],
               preventDefault : true,
               xns : Roo.bootstrap,
               xtype : 'Link',
               listeners : {
                click : function (e)
                 {
                       _this.tabgroup.showPanelNext();
                 }
               }
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
