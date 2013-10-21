//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

viewpanel = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '#view-panel',
    parent   : false,
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
                        xtype: 'ViewPanel',
                        xns: Roo
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
