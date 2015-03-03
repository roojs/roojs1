//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard3 = new Roo.XComponent({

 _strings : {
  '1f9ff97aa2f49a79388004e1e57f2320' :"New Orders ",
  'fc0d5184491559c092364744b2247373' :"first tab",
  'b73ce398c39f506af761d2277d853a92' :"160",
  '7ef605fc8dba5425d6965fbd4c8fbe1f' :"150",
  '70ce2e7a27cab2a670ca954f8362e19f' :"tab 2 content",
  'f3ff0ceca73743a13990e970c318fc36' :"<span class=\"glyphicon glyphicon-chevron-left\"></span>",
  '34ae6773410925b4574e656be194f0ad' :"income",
  'e864378363f435160e7c2209cc2949b7' :"<span class=\"glyphicon glyphicon-chevron-right\"></span>",
  '1d17cb9923b99f823da9f5a16dc460e5' :"Department",
  '222a267cc5778206b253be35ee3ddab5' :"Current",
  '2fce962271c2edac1c38f8b9c0c763cd' :"Dashboard  <small>  Example Control panel </small>",
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
   xtype : 'Body',
   xns : Roo.bootstrap,
   items : [
    Roo.apply(Dashboard.Header1._tree(), {
     '|xns' : 'Roo.bootstrap',
     cls : 'header',
     xtype : 'Container',
     tag : 'header',
     xns : Roo.bootstrap
    }),
    {
     '|xns' : 'Roo.bootstrap',
     cls : 'wrapper row-offcanvas row-offcanvas-left',
     xtype : 'Container',
     'flexy:include' : 'Sidebar.html',
     xns : Roo.bootstrap,
     items : [
      Roo.apply(Dashboard.Sidebar2._tree(), {
       '|xns' : 'Roo.bootstrap',
       tag : 'aside',
       cls : 'left-side sidebar-offcanvas',
       xtype : 'Container',
       xns : Roo.bootstrap
      }),
      {
       '|xns' : 'Roo.bootstrap',
       tag : 'aside',
       cls : 'right-side',
       xtype : 'Container',
       xns : Roo.bootstrap,
       items : [
        {
         '|xns' : 'Roo.bootstrap',
         tag : 'section',
         cls : 'content-header',
         xtype : 'Container',
         xns : Roo.bootstrap,
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           xtype : 'Header',
           xns : Roo.bootstrap,
           html : _this._strings['2fce962271c2edac1c38f8b9c0c763cd']
          }
         ]

        },
        {
         '|xns' : 'Roo.bootstrap',
         tag : 'section',
         cls : 'content',
         xtype : 'Container',
         xns : Roo.bootstrap,
         items : [
          {
           '|xns' : 'Roo.bootstrap',
           xtype : 'Container',
           xns : Roo.bootstrap,
           items : [
            {
             '|xns' : 'Roo.bootstrap',
             md : 3,
             lg : 3,
             xtype : 'Column',
             xns : Roo.bootstrap,
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : '',
               cls : '',
               xtype : 'NumberBox',
               headline : 160,
               xns : Roo.bootstrap.dash,
               width : 'col-md-5',
               title : _this._strings['1f9ff97aa2f49a79388004e1e57f2320'],
               style : 'col-md-3',
               height : 150,
               _aformat : _this._strings['1b9b097340a24b31632ed601a9107832']
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             md : 3,
             lg : 3,
             xtype : 'Column',
             xns : Roo.bootstrap,
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'green',
               cls : '',
               xtype : 'NumberBox',
               headline : 150,
               xns : Roo.bootstrap.dash,
               width : 'col-md-5',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               style : 'col-lg-3',
               height : 150
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             md : 3,
             lg : 3,
             xtype : 'Column',
             xns : Roo.bootstrap,
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'yellow',
               xtype : 'NumberBox',
               headline : 150,
               xns : Roo.bootstrap.dash,
               width : 'col-md-5',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               style : 'col-lg-3',
               height : 150
              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             md : 3,
             xtype : 'Column',
             lg : 3,
             xns : Roo.bootstrap,
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               bgcolor : 'red',
               xtype : 'NumberBox',
               headline : 150,
               xns : Roo.bootstrap.dash,
               width : '',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'],
               style : 'col-lg-3',
               height : 150
              }
             ]

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
             alert : 'danger',
             fa : 'ban',
             xtype : 'Container',
             xns : Roo.bootstrap,
             html : _this._strings['3c8d74bd7be3168fe440d9c85da42be8']
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
             md : 6,
             lg : 6,
             xtype : 'Column',
             xns : Roo.bootstrap,
             style : '',
             sm : 12,
             items : [
              {
               '|xns' : 'Roo.bootstrap.dash',
               xtype : 'TabBox',
               xns : Roo.bootstrap.dash,
               title : _this._strings['9a7b64c98b066602b21f869ae7cd673a'],
               listeners : {
                render : function (_self)
                 {
                     _this.testbox = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap.dash',
                 xtype : 'TabPane',
                 xns : Roo.bootstrap.dash,
                 title : _this._strings['c4f5a294a273c3a1c97642a76f15c5c7'],
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xtype : 'Column',
                   xns : Roo.bootstrap,
                   items : [
                    {
                     store : {
                      '|xns' : 'Roo.data',
                      isLocal : true,
                      fields : [ 'display_name', 'current', 'aspire' ],
                      data : [
                        [ 'A TEST', '1', '0' ],
                        
                          [ 'B test', '1', '0' ],
                            [ 'C test', '1', '0' ],
                          [ 'D test', '1', '0' ]
                      ],
                      xtype : 'SimpleStore',
                      xns : Roo.data
                     },
                     '|xns' : 'Roo.bootstrap',
                     xtype : 'Table',
                     CellSelection : true,
                     xns : Roo.bootstrap,
                     RowSelection : true,
                     cm : [
                       {
                        '|xns' : 'Roo.grid',
                        header : _this._strings['1d17cb9923b99f823da9f5a16dc460e5'],
                        dataIndex : 'display_name',
                        xtype : 'ColumnModel',
                        xns : Roo.grid
                       },
{
                        '|xns' : 'Roo.grid',
                        header : _this._strings['222a267cc5778206b253be35ee3ddab5'],
                        dataIndex : 'current',
                        xtype : 'ColumnModel',
                        xns : Roo.grid,
                        renderer : function(v) {  
                        
                            var state = v> 0 ?  '-checked' : '';
                        
                            return v*1  > 0 ? 'X' : '-';             
                                        
                         }
                       },
{
                        '|xns' : 'Roo.grid',
                        header : _this._strings['d80590035c13589acfbdd2b2dcb60773'],
                        dataIndex : 'aspire',
                        xtype : 'ColumnModel',
                        xns : Roo.grid,
                        renderer : function(v) {  
                            var state = v> 0 ?  '-checked' : '';
                            return v*1  > 0 ? 'X' : '-';             
                         }
                       }
                     ],
                     listeners : {
                      render : function (_self)
                       {
                            _this.listTable = _self;
                           (function() { _self.store.load({}); }).defer(100)
                       },
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
                 xtype : 'TabPane',
                 xns : Roo.bootstrap.dash,
                 title : _this._strings['58a00f6a3da23fc3821f24115493b750'],
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xtype : 'Column',
                   xns : Roo.bootstrap,
                   html : _this._strings['70ce2e7a27cab2a670ca954f8362e19f']
                  }
                 ]

                }
               ]

              }
             ]

            },
            {
             '|xns' : 'Roo.bootstrap',
             md : 6,
             xtype : 'Column',
             lg : 6,
             xns : Roo.bootstrap,
             style : '',
             sm : 12,
             items : [
              {
               '|xns' : 'Roo.bootstrap',
               cls : 'nav-tabs-custom',
               xtype : 'Container',
               xns : Roo.bootstrap,
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 xtype : 'Header',
                 xns : Roo.bootstrap,
                 html : _this._strings['34ae6773410925b4574e656be194f0ad'],
                 style : 'margin: 10,10,0,0'
                }
               ]

              }
             ]

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
             lg : 12,
             xtype : 'TabGroup',
             carousel : true,
             xns : Roo.bootstrap,
             navId : '#sample1',
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
               xtype : 'TabPanel',
               xns : Roo.bootstrap,
               tabId : '#second',
               navId : '#sample1',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_second = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 xtype : 'Header',
                 level : 3,
                 xns : Roo.bootstrap,
                 html : _this._strings['fc0d5184491559c092364744b2247373']
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 xtype : 'Container',
                 xns : Roo.bootstrap,
                 well : 'md',
                 style : 'padding-left:50px;padding-right:50px;',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xtype : 'Row',
                   xns : Roo.bootstrap,
                   items : [
                    {
                     '|xns' : 'Roo.bootstrap',
                     md : 6,
                     xtype : 'Column',
                     xns : Roo.bootstrap,
                     items : [
                      {
                       '|xns' : 'Roo.bootstrap',
                       labelAlign : 'top',
                       fieldLabel : 'Some input',
                       xtype : 'Input',
                       allowBlank : true,
                       xns : Roo.bootstrap,
                       name : 'chosen_title'
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
               xtype : 'TabPanel',
               xns : Roo.bootstrap,
               tabId : '#first',
               navId : '#sample1',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_first = _self;
                 }
               },
               items : [
                {
                 '|xns' : 'Roo.bootstrap',
                 xtype : 'Header',
                 xns : Roo.bootstrap,
                 level : 3,
                 html : _this._strings['2d0175894e0fe09186d38fe7a7160294']
                },
                {
                 '|xns' : 'Roo.bootstrap',
                 xtype : 'Container',
                 xns : Roo.bootstrap,
                 well : 'md',
                 style : 'padding-left:50px;padding-right:50px;',
                 items : [
                  {
                   '|xns' : 'Roo.bootstrap',
                   xtype : 'Row',
                   xns : Roo.bootstrap,
                   items : [
                    {
                     '|xns' : 'Roo.bootstrap',
                     md : 6,
                     xtype : 'Column',
                     xns : Roo.bootstrap,
                     items : [
                      {
                       '|xns' : 'Roo.bootstrap',
                       labelAlign : 'top',
                       fieldLabel : 'This is a label',
                       xtype : 'Input',
                       allowBlank : true,
                       xns : Roo.bootstrap,
                       name : 'chosen_title'
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
               preventDefault : true,
               xtype : 'Link',
               xns : Roo.bootstrap,
               html : _this._strings['f3ff0ceca73743a13990e970c318fc36'],
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
               preventDefault : true,
               xtype : 'Link',
               xns : Roo.bootstrap,
               html : _this._strings['e864378363f435160e7c2209cc2949b7'],
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
