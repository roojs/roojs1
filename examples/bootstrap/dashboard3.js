//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard3 = new Roo.XComponent({
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
                                            html : 'Dashboard  <small> Control panel </small>'
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
                                                            headline : 150,
                                                            xns : Roo.bootstrap.dash,
                                                            width : 'col-md-5',
                                                            title : "New Orders",
                                                            style : 'col-md-3',
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
                                                            bgcolor : 'green',
                                                            cls : '',
                                                            xtype : 'NumberBox',
                                                            headline : 150,
                                                            xns : Roo.bootstrap.dash,
                                                            width : 'col-md-5',
                                                            title : "New Orders",
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
                                                            title : "New Orders",
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
                                                            title : "New Orders",
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
                                                            title : "test 1",
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
                                                                    title : "tab 1",
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
                                                                                    	        header : 'Department',
                                                                                    	        dataIndex : 'display_name',
                                                                                    	        xtype : 'ColumnModel',
                                                                                    	        xns : Roo.grid
                                                                                    	    },
{
                                                                                    	        '|xns' : 'Roo.grid',
                                                                                    	        header : 'Current',
                                                                                    	        dataIndex : 'current',
                                                                                    	        xtype : 'ColumnModel',
                                                                                    	        xns : Roo.grid,
                                                                                    	        renderer : function(v) {  
                                                                                    	        
                                                                                    	            var state = v> 0 ?  '-checked' : '';
                                                                                    	        
                                                                                    	            return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                    	                        
                                                                                    	         }
                                                                                    	    },
{
                                                                                    	        '|xns' : 'Roo.grid',
                                                                                    	        header : 'Aspire',
                                                                                    	        dataIndex : 'aspire',
                                                                                    	        xtype : 'ColumnModel',
                                                                                    	        xns : Roo.grid,
                                                                                    	        renderer : function(v) {  
                                                                                    	            var state = v> 0 ?  '-checked' : '';
                                                                                    	        
                                                                                    	            return '<img class="x-grid-check-icon' + state + '" src="/web.Hydra/roojs1/images/gray/s.gif"/>';
                                                                                    	                        
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
                                                                                    	       
                                                                                    	       var ce = this.colModel.getCellEditor(columnIndex,rowIndex);
                                                                                    	       var cm = this.colModel.getColumnById(this.colModel.getColumnId(columnIndex));
                                                                                    	       /*if (ce.field.value == 0) {
                                                                                    	           cm.renderer(1);
                                                                                    	           return;
                                                                                    	       }*/
                                                                                    	       
                                                                                    	       var rec = _this.listTable.ds.getAt(rowIndex);
                                                                                    	           
                                                                                    	           rec.set('current', rec.data.current ? 0 : 1);
                                                                                    	           cm.renderer(1);
                                                                                    	           //_this.listTable.ds.fireEvent("datachanged", this);
                                                                                    	           rec.commit();
                                                                                    	        
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
                                                                    title : "tab 2",
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Column',
                                                                            xns : Roo.bootstrap,
                                                                            html : 'tab 2 content'
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
                                                                    html : 'income',
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
                                                    lg : 6,
                                                    xtype : 'Column',
                                                    xns : Roo.bootstrap,
                                                    height : 500
                                                },
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    lg : 6,
                                                    xtype : 'Column',
                                                    xns : Roo.bootstrap,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap.dash',
                                                            xtype : 'TabBox',
                                                            xns : Roo.bootstrap.dash,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap.dash',
                                                                    xtype : 'TabPane',
                                                                    xns : Roo.bootstrap.dash
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

        };    }
});
