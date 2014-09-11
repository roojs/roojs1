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
            	{
                    cls : 'header',
                    tag : 'header',
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            cls : 'logo',
                            xtype : 'Link',
                            xns : Roo.bootstrap,
                            html : 'test'
                        },
                    	{
                            bar : true,
                            position : 'static-top',
                            xtype : 'NavHeaderbar',
                            tag : 'nav',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    cls : 'navbar-btn sidebar-toggle',
                                    xtype : 'Link',
                                    xns : Roo.bootstrap,
                                    html : '<span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span>'
                                },
                            	{
                                    xtype : 'NavGroup',
                                    align : 'right',
                                    xns : Roo.bootstrap,
                                    items : [
                                    	{
                                            menu : {
                                                xtype : 'Menu',
                                                xns : Roo.bootstrap,
                                                items : [
                                                	{
                                                        xtype : 'MenuItem',
                                                        xns : Roo.bootstrap,
                                                        html : 'test'
                                                    }
                                                ]

                                            },
                                            xtype : 'NavItem',
                                            xns : Roo.bootstrap,
                                            html : 'test',
                                            items : [

                                            ]

                                        },
                                    	{
                                            xtype : 'NavItem',
                                            xns : Roo.bootstrap,
                                            html : 'test'
                                        }
                                    ]

                                }
                            ]

                        }
                    ]

                },
            	Roo.apply(Sidebar._tree(), {
                    cls : 'wrapper row-offcanvas row-offcanvas-left',
                    xtype : 'Container',
                    'flexy:include' : 'Sidebar.html',
                    xns : Roo.bootstrap
                })
            ]

        };    }
});
