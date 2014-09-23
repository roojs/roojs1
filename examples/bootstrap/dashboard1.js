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
                                            html : 'General Form Elements  <small> Preview </small>'
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
                                                                                    placeholder : 'before : @',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '@',
                                                                                    size : 'md'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after: .00',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    after : 0
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before $, after: .00',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '$',
                                                                                    size : 'md',
                                                                                    after : 0
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Header',
                                                                                    level : 4,
                                                                                    xns : Roo.bootstrap,
                                                                                    html : 'With Icons'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before : &lt;i class=&quot;fa fa-envelope&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '<i class=\"fa fa-envelope\"></i>',
                                                                                    size : 'md'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after : &lt;i class=&quot;fa fa-after&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    after : '<i class=\"fa fa-check\"></i>'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'after : &lt;i class=&quot;fa fa-ambulance&quot;&gt;&lt;/i&gt; before : &lt;i class=&quot;fa fa-dollar&quot;&gt;&lt;/i&gt;',
                                                                                    xns : Roo.bootstrap,
                                                                                    before : '<i class=\"fa fa-dollar\"></i>',
                                                                                    size : 'md',
                                                                                    after : '<i class=\"fa fa-ambulance\"></i>'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Header',
                                                                                    xns : Roo.bootstrap,
                                                                                    level : 4,
                                                                                    html : 'With checkbox and radio'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Row',
                                                                                    xns : Roo.bootstrap,
                                                                                    items : [
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Input',
                                                                                            placeholder : '?',
                                                                                            xns : Roo.bootstrap,
                                                                                            before : 'fixme',
                                                                                            size : 'md'
                                                                                        },
                                                                                    	{
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            md : 6,
                                                                                            xtype : 'Input',
                                                                                            placeholder : 'md 4',
                                                                                            xns : Roo.bootstrap,
                                                                                            size : 'md'
                                                                                        }
                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Header',
                                                                                    level : 4,
                                                                                    xns : Roo.bootstrap,
                                                                                    html : 'With buttons'
                                                                                },
                                                                            	{
                                                                                    before : {
                                                                                        menu : {
                                                                                            '|xns' : 'Roo.bootstrap',
                                                                                            xtype : 'Menu',
                                                                                            xns : Roo.bootstrap,
                                                                                            items : [
                                                                                            	{
                                                                                                    '|xns' : 'Roo.bootstrap',
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
                                                                                                    '|xns' : 'Roo.bootstrap',
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
                                                                                        '|xns' : 'Roo.bootstrap',
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
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'before :  - an object...    ',
                                                                                    xns : Roo.bootstrap,
                                                                                    size : 'md',
                                                                                    items : [

                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    after : {
                                                                                        '|xns' : 'Roo.bootstrap',
                                                                                        weight : 'success',
                                                                                        xtype : 'Button',
                                                                                        xns : Roo.bootstrap,
                                                                                        html : 'Go'
                                                                                    },
                                                                                    '|xns' : 'Roo.bootstrap',
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
                                                    '|xns' : 'Roo.bootstrap',
                                                    md : 6,
                                                    xtype : 'Column',
                                                    xns : Roo.bootstrap,
                                                    sm : 12,
                                                    items : [
                                                    	{
                                                            '|xns' : 'Roo.bootstrap',
                                                            cls : 'box box-warning',
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
                                                                            html : 'General Elements'
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
                                                                                    placeholder : 'Enter ...',
                                                                                    fieldLabel : 'Text',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'disabled = true',
                                                                                    disabled : true,
                                                                                    fieldLabel : 'Text',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'TextArea',
                                                                                    fieldLabel : 'Textarea',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'TextArea',
                                                                                    placeholder : 'disabled=true',
                                                                                    disabled : true,
                                                                                    xns : Roo.bootstrap,
                                                                                    fieldLabel : 'Textarea'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    cls : 'has-success',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'cls = has-success',
                                                                                    fieldLabel : 'Input with Success',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    cls : 'has-warning',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'cls = has-warning',
                                                                                    fieldLabel : 'Input with Warning',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    cls : 'has-error',
                                                                                    xtype : 'Input',
                                                                                    placeholder : 'cls = has-error',
                                                                                    fieldLabel : 'Input with Error',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'CheckBox',
                                                                                    boxLabel : 'Checkbox 1',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    checked : true,
                                                                                    weight : 'primary',
                                                                                    xtype : 'CheckBox',
                                                                                    boxLabel : 'Checkbox weight=primary',
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    xtype : 'CheckBox',
                                                                                    boxLabel : 'Checkbox Disabled',
                                                                                    disabled : true,
                                                                                    xns : Roo.bootstrap
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    name : 'radio',
                                                                                    xtype : 'Radio',
                                                                                    boxLabel : 'Radio 1',
                                                                                    xns : Roo.bootstrap,
                                                                                    value : 1
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    name : 'radio',
                                                                                    xtype : 'Radio',
                                                                                    boxLabel : 'Radio (weight=danger)',
                                                                                    xns : Roo.bootstrap,
                                                                                    value : 2,
                                                                                    weight : 'danger'
                                                                                },
                                                                            	{
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    name : 'radio',
                                                                                    xtype : 'Radio',
                                                                                    boxLabel : 'Radio Disabled',
                                                                                    disabled : true,
                                                                                    xns : Roo.bootstrap,
                                                                                    value : 3
                                                                                },
                                                                            	{
                                                                                    store : {
                                                                                        '|xns' : 'Roo.data',
                                                                                        fields : [ 'item' ],
                                                                                        data : [ [ 'option a'] ,[ 'option b'] ],
                                                                                        xtype : 'SimpleStore',
                                                                                        xns : Roo.data
                                                                                    },
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    mode : 'local',
                                                                                    name : 'combotest',
                                                                                    valueField : 'item',
                                                                                    xtype : 'ComboBox',
                                                                                    triggerAction : 'all',
                                                                                    editable : false,
                                                                                    fieldLabel : 'ComboBox',
                                                                                    xns : Roo.bootstrap,
                                                                                    tpl : '<li class=\"select2-result\"><b>{item}</b></div>',
                                                                                    displayField : 'item',
                                                                                    items : [

                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    store : {
                                                                                        '|xns' : 'Roo.data',
                                                                                        fields : [ 'item' ],
                                                                                        data : [ [ 'option a'] ,[ 'option b'] ],
                                                                                        xtype : 'SimpleStore',
                                                                                        xns : Roo.data
                                                                                    },
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    mode : 'local',
                                                                                    name : 'combotest',
                                                                                    valueField : 'item',
                                                                                    xtype : 'ComboBox',
                                                                                    triggerAction : 'all',
                                                                                    editable : false,
                                                                                    disabled : true,
                                                                                    fieldLabel : 'ComboBox disabled',
                                                                                    xns : Roo.bootstrap,
                                                                                    tpl : '<li class=\"select2-result\"><b>{item}</b></div>',
                                                                                    displayField : 'item',
                                                                                    items : [

                                                                                    ]

                                                                                },
                                                                            	{
                                                                                    store : {
                                                                                        '|xns' : 'Roo.data',
                                                                                        fields : [ 'item' ],
                                                                                        data : [ [ 'option a'] ,[ 'option b'] ],
                                                                                        xtype : 'SimpleStore',
                                                                                        xns : Roo.data
                                                                                    },
                                                                                    '|xns' : 'Roo.bootstrap',
                                                                                    mode : 'local',
                                                                                    name : 'combotest',
                                                                                    valueField : 'item',
                                                                                    xtype : 'ComboBox',
                                                                                    triggerAction : 'all',
                                                                                    editable : false,
                                                                                    fieldLabel : 'Multiple selection',
                                                                                    xns : Roo.bootstrap,
                                                                                    tpl : '<li class=\"select2-result\"><b>{item}</b></div>',
                                                                                    multiple : true,
                                                                                    displayField : 'item',
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
