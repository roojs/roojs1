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
                    xtype : 'Container',
                    tag : 'header',
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
                                                                                    after : 0
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before $, after: .00',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '$',
                                                                                    size : 'md',
                                                                                    after : 0
                                                                                },
                                                                            	{
                                                                                    xtype : 'Header',
                                                                                    xns : Roo.bootstrap,
                                                                                    level : 4,
                                                                                    html : 'With Icons'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before : &lt;i class=&quot;fa fa-envelope&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '<i class=\"fa fa-envelope\"></i>',
                                                                                    size : 'md'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after : &lt;i class=&quot;fa fa-after&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    after : '<i class=\"fa fa-check\"></i>'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after : &lt;i class=&quot;fa fa-ambulance&quot;&gt;&lt;/i&gt; before : &lt;i class=&quot;fa fa-dollar&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '<i class=\"fa fa-dollar\"></i>',
                                                                                    size : 'md',
                                                                                    after : '<i class=\"fa fa-ambulance\"></i>'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Header',
                                                                                    level : 4,
                                                                                    xns : Roo.bootstrap,
                                                                                    html : 'With checkbox and radio'
                                                                                },
                                                                            	{
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            md : 6,
                                                                                            xtype : 'Input',
                                                                                            placeholder : '?',
                                                                                            xns : Roo.bootstrap,
                                                                                            before : 'fixme',
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
                                                                                            md : 6,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 4',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    xtype : 'Header',
                                                                                    xns : Roo.bootstrap,
                                                                                    level : 4,
                                                                                    html : 'With buttons'
                                                                                },
                                                                            	{
                                                                                    before : {
                                                                                        menu : {
                                                                                            xtype : 'Menu',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    xtype : 'MenuItem',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    html : 'http://',
                                                                                                    listeners : {
                                                                                                    	click : function (e)
                                                                                                    	   {
                                                                                                    	       _this.httpButton.setText("http://");
                                                                                                    	   }
                                                                                                    }
                                                                                                },
                                                                                            	{
                                                                                                    xtype : 'MenuItem',
                                                                                                    xns : Roo.bootstrap,
                                                                                                    html : 'https://',
                                                                                                    listeners : {
                                                                                                    	click : function (e)
                                                                                                    	   {
                                                                                                    	       _this.httpButton.setText("https://");
                                                                                                    	   }
                                                                                                    }
                                                                                                }
                                                                                            ]

                                                                                        },
                                                                                        weight : 'primary',
                                                                                        xtype : 'Button',
                                                                                        xns : Roo.bootstrap,
                                                                                        html : 'http://',
                                                                                        listeners : {
                                                                                        	render : function (_self)
                                                                                        	   {
                                                                                        	       _this.httpButton = _self;
                                                                                        	   }
                                                                                        },
                                                                                        items : [

                                                                                        ]

                                                                                    },
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before :  - an object...    ',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    items : [

                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    after : {
                                                                                        weight : 'success',
                                                                                        xtype : 'Button',
                                                                                        xns : Roo.bootstrap,
                                                                                        html : 'Go'
                                                                                    },
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after - a button',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    items : [

                                                                                    ]

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
                                                                            html : 'General Elements'
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
