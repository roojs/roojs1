//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

viewpanel = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#view-panel',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'NestedLayoutPanel',
            xns: Roo,
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'GridPanel',
                        xns: Roo,
                        items : [
                            {
                                xtype: 'View',
                                xns: Roo,
                                tpl : {
                                    xtype: 'Template',
                                    xns: Roo
                                },
                                tpl : {
                                    xtype: 'Template',
                                    xns: Roo
                                },
                                store : {
                                    xtype: 'Store',
                                    xns: Roo.data,
                                    proxy : {
                                        xtype: 'HttpProxy',
                                        xns: Roo.data
                                    },
                                    reader : {
                                        xtype: 'JsonReader',
                                        xns: Roo.data
                                    }
                                }
                            }
                        ],
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar
                                }
                            ]
                        }
                    }
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                }
            }
        };
    }
});
