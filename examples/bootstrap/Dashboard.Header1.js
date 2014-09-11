//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Dashboard.Header1 = new Roo.XComponent({
    part     :  ["bootstrap", "Header1" ],
    order    : '001-Dashboard.Header-',
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

        };    }
});
