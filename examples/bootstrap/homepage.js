//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

homepage = new Roo.XComponent({
    part     :  ["bootstrap", "homepage" ],
    order    : '001-homepage',
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
            cls : 'home',
            xtype : 'Body',
            xns : Roo.bootstrap,
            items : [
            	{
                    '|xns' : 'Roo.bootstrap',
                    cls : 'headroom animated',
                    position : 'fixed-top',
                    xtype : 'NavHeaderbar',
                    inverse : true,
                    brand : 'Hydra',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            '|xns' : 'Roo.bootstrap',
                            type : 'nav',
                            xtype : 'NavGroup',
                            align : 'right',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'NavItem',
                                    xns : Roo.bootstrap,
                                    html : 'Home'
                                },
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'NavItem',
                                    xns : Roo.bootstrap,
                                    html : 'About'
                                },
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'NavItem',
                                    xns : Roo.bootstrap,
                                    html : 'More Pages'
                                },
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    xtype : 'NavItem',
                                    xns : Roo.bootstrap,
                                    html : 'Contact'
                                },
                            	{
                                    '|xns' : 'Roo.bootstrap',
                                    cls : 'btn',
                                    xtype : 'NavItem',
                                    xns : Roo.bootstrap,
                                    html : 'Sign in / Sign up'
                                }
                            ]

                        }
                    ]

                },
            	{
                    '|xns' : 'Roo.bootstrap',
                    tag : 'header',
                    cls : 'pr-head',
                    xtype : 'Element',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            '|xns' : 'Roo.bootstrap',
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
                                            cls : 'lead',
                                            xtype : 'Header',
                                            xns : Roo.bootstrap,
                                            html : 'The HR Platform'
                                        },
                                    	{
                                            '|xns' : 'Roo.bootstrap',
                                            tag : 'p',
                                            cls : 'tagline',
                                            xtype : 'Element',
                                            xns : Roo.bootstrap,
                                            html : 'some tag line'
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
