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
                                            xtype : 'Row',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    '|xns' : 'Roo.bootstrap',
                                                    md : 6,
                                                    xtype : 'Column',
                                                    xns : Roo.bootstrap,
                                                    sm : 12,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            cls : 'box box-primary',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Quick Example'
                                                                        },
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            xtype : 'Input',
                                                                            placeholder : 'Enter password',
                                                                            inputType : 'password',
                                                                            fieldLabel : 'Password',
                                                                            xns : Roo.bootstrap
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'Enter email',
                                                                                    fieldLabel : 'Email Address',
                                                                                    xns : Roo.bootstrap,
                                                                                    vtype : 'email'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'Enter email',
                                                                                    inputType : 'file',
                                                                                    fieldLabel : 'File Input',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'CheckBox',
                                                                                    boxLabel : 'checkbox',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    weight : 'primary',
                                                                                    xtype : 'Button',
                                                                                    xns : Roo.bootstrap,
                                                                                    html : 'Submit'
                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                }
                                                            ]

                                                        },
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            cls : 'box box-success',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Different Height'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'size lg',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'lg'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'size md',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'size sm',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'sm'
                                                                                }
                                                                            ]

                                                                        }
                                                                    ]

                                                                }
                                                            ]

                                                        },
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            cls : 'box box-danger',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Different Width'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 3,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 3',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 3,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 4',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 5,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 3',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
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
                                                            cls : 'box box-info',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    '|xns' : 'Roo.bootstrap',
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            '|xns' : 'Roo.bootstrap',
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Input Addon'
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
                                            xtype : 'Container',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    '|xns' : 'Roo.bootstrap.dash',
                                                    hideMode : '',
                                                    cls : 'roo-numberbox',
                                                    xtype : 'NumberBox',
                                                    headline : 150,
                                                    xns : Roo.bootstrap.dash,
                                                    title : "New Order",
                                                    style : '',
                                                    md : 3
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
