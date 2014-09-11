//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Dashboard.Sidebar2 = new Roo.XComponent({
    part     :  ["bootstrap", "Sidebar2" ],
    order    : '001-Dashboard.Sidebar-',
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
            tag : 'aside',
            cls : 'left-side sidebar-offcanvas',
            xtype : 'Container',
            xns : Roo.bootstrap,
            items : [
            	{
                    xtype : 'NavSidebar',
                    xns : Roo.bootstrap,
                    items : [
                    	{
                            xtype : 'NavGroup',
                            xns : Roo.bootstrap,
                            items : [
                            	{
                                    menu : {
                                        type : 'treeview',
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
                                    href : '#',
                                    xtype : 'NavSidebarItem',
                                    xns : Roo.bootstrap,
                                    icon : 'fa fa-bar-chart-o',
                                    html : 'test',
                                    items : [

                                    ]

                                },
                            	{
                                    href : '#',
                                    xtype : 'NavSidebarItem',
                                    xns : Roo.bootstrap,
                                    html : 'test',
                                    badge : 'new',
                                    badgecls : 'bg-red'
                                }
                            ]

                        }
                    ]

                }
            ]

        };    }
});
