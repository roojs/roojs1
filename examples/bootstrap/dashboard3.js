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
                    tag : 'header',
                    xtype : 'Container',
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
                                                    xtype : 'Column',
                                                    lg : 3,
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
                                                    xtype : 'Column',
                                                    lg : 3,
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
                                                    xtype : 'Column',
                                                    lg : 3,
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
                                                    lg : 3,
                                                    xtype : 'Column',
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
                                                    xtype : 'Column',
                                                    lg : 6,
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
                                                            	   
                                                            	   }
                                                            },
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap.dash',
                                                                    xtype : 'TabPane',
                                                                    xns : Roo.bootstrap.dash
                                                                }
                                                            ]

                                                        }
                                                    ]

                                                },
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
