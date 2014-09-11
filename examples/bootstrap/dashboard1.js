//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

dashboard1 = new Roo.XComponent({
    part     :  ["bootstrap", "dashboard1" ],
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
            cls : 'skin-blue',
            xtype : 'Body',
            xns : Roo.bootstrap,
            items : [
            	Roo.apply(Dashboard.Header1._tree(), {
                    cls : 'header',
                    tag : 'header',
                    xtype : 'Container',
                    xns : Roo.bootstrap
                }),
            	{
                    cls : 'wrapper row-offcanvas row-offcanvas-left',
                    xtype : 'Container',
                    'flexy:include' : 'Sidebar.html',
                    xns : Roo.bootstrap,
                    items : [
                    	Roo.apply(Dashboard.Sidebar2._tree(), {
                            tag : 'aside',
                            cls : 'left-side sidebar-offcanvas',
                            xtype : 'Container',
                            xns : Roo.bootstrap
                        }),
                    	{
                            tag : 'aside',
                            cls : 'right-side',
                            xtype : 'Container',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    tag : 'section',
                                    cls : 'content-header',
                                    xtype : 'Container',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            xtype : 'Header',
                                            xns : Roo.bootstrap,
                                            html : 'General Form Elements  <small> Preview </small>'
                                        }
                                    ]

                                },
                            	{
                                    tag : 'section',
                                    cls : 'content',
                                    xtype : 'Container',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            xtype : 'Row',
                                            xns : Roo.bootstrap,
                                            items : [
                                            	{
                                                    md : 6,
                                                    xtype : 'Column',
                                                    xns : Roo.bootstrap,
                                                    sm : 12,
                                                    items : [
                                                    	{
                                                            cls : 'box box-primary',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Quick Example'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'Enter email',
                                                                                    fieldLabel : 'Email Address',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'Enter password',
                                                                                    inputType : 'password',
                                                                                    fieldLabel : 'Password',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'Enter email',
                                                                                    inputType : 'file',
                                                                                    fieldLabel : 'File Input',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    inputType : 'checkbox',
                                                                                    xns : Roo.bootstrap,
                                                                                    fieldLabel : 'Fixme - checkbox type'
                                                                                },
                                                                            	{
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
                                                            cls : 'box box-success',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Different Height'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'size lg',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'lg'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'size md',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md'
                                                                                },
                                                                            	{
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
                                                            cls : 'box box-danger',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Different Width'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            md : 3,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 3',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
                                                                                            md : 3,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 4',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
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
                                                            cls : 'box box-info',
                                                            xtype : 'Container',
                                                            xns : Roo.bootstrap,
                                                            items : [
                                                            	{
                                                                    cls : 'box-header',
                                                                    xtype : 'Container',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-title',
                                                                            xtype : 'Header',
                                                                            xns : Roo.bootstrap,
                                                                            level : 3,
                                                                            html : 'Input Addon'
                                                                        }
                                                                    ]

                                                                },
                                                            	{
                                                                    xtype : 'Form',
                                                                    labelAlign : 'top',
                                                                    xns : Roo.bootstrap,
                                                                    items : [
                                                                    	{
                                                                            cls : 'box-body',
                                                                            xtype : 'Container',
                                                                            xns : Roo.bootstrap,
                                                                            items : [
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before : @',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '@',
                                                                                    size : 'md'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after: .00',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    after : .00
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

                }
            ]

        };    }
});
