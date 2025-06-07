//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard3 = new Roo.XComponent({

 _strings : {
  '9fc10133312e352754f8ca264a3e272d' :"New Orders ",
  'fc0d5184491559c092364744b2247373' :"first tab",
  '78f4244575c39e08c1563d108f8f7899' :"This is a label",
  'b73ce398c39f506af761d2277d853a92' :"160",
  '30bd2ce65d1e43e9c498b7d5d49f3b78' :"Dashboard <small>  Example Control panel </small>",
  '7ef605fc8dba5425d6965fbd4c8fbe1f' :"150",
  '70ce2e7a27cab2a670ca954f8362e19f' :"tab 2 content",
  'bc1a2f172d753a691c9e7aa08f86b1ea' :"Some input",
  'f3ff0ceca73743a13990e970c318fc36' :"<span class=\"glyphicon glyphicon-chevron-left\"></span>",
  '34ae6773410925b4574e656be194f0ad' :"income",
  'e864378363f435160e7c2209cc2949b7' :"<span class=\"glyphicon glyphicon-chevron-right\"></span>",
  '1d17cb9923b99f823da9f5a16dc460e5' :"Department",
  '222a267cc5778206b253be35ee3ddab5' :"Current",
  '75f1bb6830981ca0ce62c3eb434373ba' :"Table tabs",
  'c4f5a294a273c3a1c97642a76f15c5c7' :"tab 1",
  '2d0175894e0fe09186d38fe7a7160294' :"second tab",
  '81fbfa9def2364dc881d1eebe4e4d58d' :"This is a random string ",
  '9fc10133312e352754f8ca264a3e272d' :"New Orders",
  '9a7b64c98b066602b21f869ae7cd673a' :"test 1",
  '58a00f6a3da23fc3821f24115493b750' :"tab 2",
  'e4145fbe01b875ac1b0d4ff09f5361e8' :"New Ordersv",
  '3c8d74bd7be3168fe440d9c85da42be8' :"<b> Alert </b> test alert",
  'd80590035c13589acfbdd2b2dcb60773' :"Aspire"
 },
 _named_strings : {
  'chosen_title_fieldLabel' : '78f4244575c39e08c1563d108f8f7899' /* This is a label */ 
 },

  part     :  ["bootstrap", "dashboard3" ],
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
    Roo.apply(Dashboard.Header1._tree(), {
     xtype : 'Container',
     cls : 'header',
     tag : 'header',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap'
    }),
    {
     xtype : 'Container',
     cls : 'wrapper row-offcanvas row-offcanvas-left',
     'flexy:include' : 'Sidebar.html',
     xns : Roo.bootstrap,
     '|xns' : 'Roo.bootstrap',
     items  : [
      Roo.apply(Dashboard.Sidebar2._tree(), {
       xtype : 'Container',
       cls : 'left-side sidebar-offcanvas',
       tag : 'aside',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap'
      }),
      {
       xtype : 'Container',
       cls : 'right-side',
       tag : 'aside',
       xns : Roo.bootstrap,
       '|xns' : 'Roo.bootstrap',
       items  : [
        {
         xtype : 'Container',
         cls : 'content-header',
         tag : 'section',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Header',
           html : _this._strings['30bd2ce65d1e43e9c498b7d5d49f3b78'] /* Dashboard <small>  Example Control panel </small> */,
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap'
          }
         ]
        },
        {
         xtype : 'Container',
         cls : 'content',
         tag : 'section',
         xns : Roo.bootstrap,
         '|xns' : 'Roo.bootstrap',
         items  : [
          {
           xtype : 'Container',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Column',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'NumberBox',
               _aformat : _this._strings['81fbfa9def2364dc881d1eebe4e4d58d'] /* This is a random string  */,
               bgcolor : '',
               cls : '',
               headline : 160,
               height : 150,
               style : 'col-md-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'] /* New Orders  */,
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               '|xns' : 'Roo.bootstrap.dash'
              }
             ]
            },
            {
             xtype : 'Column',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'NumberBox',
               bgcolor : 'green',
               cls : '',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'] /* New Orders */,
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               '|xns' : 'Roo.bootstrap.dash'
              }
             ]
            },
            {
             xtype : 'Column',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'NumberBox',
               bgcolor : 'yellow',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['e4145fbe01b875ac1b0d4ff09f5361e8'] /* New Ordersv */,
               width : 'col-md-5',
               xns : Roo.bootstrap.dash,
               '|xns' : 'Roo.bootstrap.dash'
              }
             ]
            },
            {
             xtype : 'Column',
             lg : 3,
             md : 3,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'NumberBox',
               bgcolor : 'red',
               headline : 150,
               height : 150,
               style : 'col-lg-3',
               title : _this._strings['9fc10133312e352754f8ca264a3e272d'] /* New Orders */,
               width : '',
               xns : Roo.bootstrap.dash,
               '|xns' : 'Roo.bootstrap.dash'
              }
             ]
            }
           ]
          },
          {
           xtype : 'Row',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'Container',
             alert : 'danger',
             fa : 'ban',
             html : _this._strings['3c8d74bd7be3168fe440d9c85da42be8'] /* <b> Alert </b> test alert */,
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap'
            }
           ]
          },
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
               title : _this._strings['9a7b64c98b066602b21f869ae7cd673a'] /* test 1 */,
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
                 title : _this._strings['75f1bb6830981ca0ce62c3eb434373ba'] /* Table tabs */,
                 xns : Roo.bootstrap.dash,
                 '|xns' : 'Roo.bootstrap.dash',
                 items  : [
                  {
                   xtype : 'Column',
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap',
                   items  : [
                    {
                     xtype : 'Table',
                     CellSelection : true,
                     RowSelection : true,
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
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap',
                     store : {
                      xtype : 'SimpleStore',
                      data : [
                        [ 'A TEST', '1', '0' ],
                        
                          [ 'B test', '1', '0' ],
                            [ 'C test', '1', '0' ],
                          [ 'D test', '1', '0' ]
                      ],
                      fields : [ 'display_name', 'current', 'aspire' ],
                      isLocal : true,
                      xns : Roo.data,
                      '|xns' : 'Roo.data'
                     },
                     cm : [
                      {
                       xtype : 'ColumnModel',
                       dataIndex : 'display_name',
                       header : _this._strings['1d17cb9923b99f823da9f5a16dc460e5'] /* Department */,
                       xns : Roo.grid,
                       '|xns' : 'Roo.grid'
                      },
                      {
                       xtype : 'ColumnModel',
                       dataIndex : 'current',
                       header : _this._strings['222a267cc5778206b253be35ee3ddab5'] /* Current */,
                       renderer : function(v) {  
                       
                           var state = v> 0 ?  '-checked' : '';
                       
                           return v*1  > 0 ? 'X' : '-';             
                                       
                        },
                       xns : Roo.grid,
                       '|xns' : 'Roo.grid'
                      },
                      {
                       xtype : 'ColumnModel',
                       dataIndex : 'aspire',
                       header : _this._strings['d80590035c13589acfbdd2b2dcb60773'] /* Aspire */,
                       renderer : function(v) {  
                           var state = v> 0 ?  '-checked' : '';
                           return v*1  > 0 ? 'X' : '-';             
                        },
                       xns : Roo.grid,
                       '|xns' : 'Roo.grid'
                      }
                     ]
                    }
                   ]
                  }
                 ]
                },
                {
                 xtype : 'TabPane',
                 title : _this._strings['58a00f6a3da23fc3821f24115493b750'] /* tab 2 */,
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
            },
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
               xtype : 'Container',
               cls : 'nav-tabs-custom',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Header',
                 html : _this._strings['34ae6773410925b4574e656be194f0ad'] /* income */,
                 style : 'margin: 10,10,0,0',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              }
             ]
            }
           ]
          },
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
               title : _this._strings['9a7b64c98b066602b21f869ae7cd673a'] /* test 1 */,
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
                 title : _this._strings['c4f5a294a273c3a1c97642a76f15c5c7'] /* tab 1 */,
                 xns : Roo.bootstrap.dash,
                 '|xns' : 'Roo.bootstrap.dash',
                 items  : [
                  {
                   xtype : 'Column',
                   xns : Roo.bootstrap,
                   '|xns' : 'Roo.bootstrap'
                  }
                 ]
                },
                {
                 xtype : 'TabPane',
                 title : _this._strings['58a00f6a3da23fc3821f24115493b750'] /* tab 2 */,
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
            },
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
               xtype : 'Container',
               cls : 'nav-tabs-custom',
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Header',
                 html : _this._strings['34ae6773410925b4574e656be194f0ad'] /* income */,
                 style : 'margin: 10,10,0,0',
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                }
               ]
              }
             ]
            }
           ]
          },
          {
           xtype : 'Row',
           xns : Roo.bootstrap,
           '|xns' : 'Roo.bootstrap',
           items  : [
            {
             xtype : 'TabGroup',
             carousel : true,
             lg : 12,
             navId : '#sample1',
             listeners : {
              render : function (_self)
               {
                   _this.tabgroup = _self;
               }
             },
             xns : Roo.bootstrap,
             '|xns' : 'Roo.bootstrap',
             items  : [
              {
               xtype : 'TabPanel',
               active : true,
               cls : 'item',
               navId : '#sample1',
               tabId : '#second',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_second = _self;
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Header',
                 html : _this._strings['fc0d5184491559c092364744b2247373'] /* first tab */,
                 level : 3,
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                },
                {
                 xtype : 'Container',
                 style : 'padding-left:50px;padding-right:50px;',
                 well : 'md',
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
                     md : 6,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap',
                     items  : [
                      {
                       xtype : 'Input',
                       allowBlank : true,
                       fieldLabel : _this._strings['bc1a2f172d753a691c9e7aa08f86b1ea'] /* Some input */,
                       labelAlign : 'top',
                       name : 'chosen_title',
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
              },
              {
               xtype : 'TabPanel',
               active : false,
               cls : 'item',
               navId : '#sample1',
               tabId : '#first',
               listeners : {
                render : function (_self)
                 {
                 _this.tab_first = _self;
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap',
               items  : [
                {
                 xtype : 'Header',
                 html : _this._strings['2d0175894e0fe09186d38fe7a7160294'] /* second tab */,
                 level : 3,
                 xns : Roo.bootstrap,
                 '|xns' : 'Roo.bootstrap'
                },
                {
                 xtype : 'Container',
                 style : 'padding-left:50px;padding-right:50px;',
                 well : 'md',
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
                     md : 6,
                     xns : Roo.bootstrap,
                     '|xns' : 'Roo.bootstrap',
                     items  : [
                      {
                       xtype : 'Input',
                       allowBlank : true,
                       fieldLabel : _this._strings['78f4244575c39e08c1563d108f8f7899'] /* This is a label */,
                       labelAlign : 'top',
                       name : 'chosen_title',
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
              },
              {
               xtype : 'Link',
               cls : 'carousel-control left',
               html : _this._strings['f3ff0ceca73743a13990e970c318fc36'] /* <span class="glyphicon glyphicon-chevron-left"></span> */,
               preventDefault : true,
               listeners : {
                click : function (e)
                 {
                     _this.tabgroup.showPanelPrev();
                 }
               },
               xns : Roo.bootstrap,
               '|xns' : 'Roo.bootstrap'
              },
              {
               xtype : 'Link',
               cls : 'carousel-control right',
               html : _this._strings['e864378363f435160e7c2209cc2949b7'] /* <span class="glyphicon glyphicon-chevron-right"></span> */,
               preventDefault : true,
               listeners : {
                click : function (e)
                 {
                       _this.tabgroup.showPanelNext();
                 }
               },
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
