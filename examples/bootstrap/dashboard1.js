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
                        })
                    ]

                }
            ]

        };    }
});
