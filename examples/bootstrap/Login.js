//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Login = new Roo.XComponent({
    part     :  ["bootstrap", "Login" ],
    order    : '001-Login',
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
            cls : 'bg-black',
            xtype : 'Body',
            xns : Roo.bootstrap,
            style : 'min-height: 100%;',
            items : [
            	{
                    cls : 'form-box',
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            cls : 'header',
                            xtype : 'Element',
                            xns : Roo.bootstrap,
                            html : 'Sign in'
                        },
                    	{
                            xtype : 'Form',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    cls : 'body bg-gray',
                                    xtype : 'Container',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            xtype : 'Input',
                                            placeholder : 'email',
                                            xns : Roo.bootstrap
                                        },
                                    	{
                                            xtype : 'Input',
                                            placeholder : 'password',
                                            inputType : 'password',
                                            xns : Roo.bootstrap
                                        },
                                    	{
                                            xtype : 'CheckBox',
                                            boxLabel : 'Remember me',
                                            xns : Roo.bootstrap
                                        }
                                    ]

                                }
                            ]

                        },
                    	{
                            cls : 'footer',
                            xtype : 'Container',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    cls : 'btn-block',
                                    weight : 'primary',
                                    xtype : 'Button',
                                    xns : Roo.bootstrap,
                                    html : 'Sign me in'
                                },
                            	{
                                    xtype : 'Container',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            href : '#',
                                            xtype : 'Link',
                                            xns : Roo.bootstrap,
                                            html : 'I forgot my password'
                                        }
                                    ]

                                },
                            	{
                                    cls : 'text-center',
                                    href : '#',
                                    xtype : 'Link',
                                    xns : Roo.bootstrap,
                                    html : 'Register a new menbership'
                                }
                            ]

                        }
                    ]

                }
            ]

        };    }
});
