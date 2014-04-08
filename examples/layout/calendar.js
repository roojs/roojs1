//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

calendarpanel = new Roo.XComponent({
    part     :  ["layout","calendarpanel"],
    order    : '001-calendarpanel',
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
            region : 'center',
            layout : {
                xtype: 'BorderLayout',
                region : 'center',
                xns: Roo,
                items : [
                    {
                        xtype: 'CalendarPanel',
                        xns: Roo,
                        region : 'center',
                        listeners : {
                            activate : function (_self)
                            {
                                Roo.log('activate');
                            },
                            render : function (_self)
                            {
                                Roo.log('render');
                            }
                        }
                    }
                         
                ],
                center : {
                    xtype: 'LayoutRegion',
                    xns: Roo
                }
            },
            listeners : {
                'activate' : function() {
                    _this.nest = this;
                    Roo.log('nested activate');
                    this.layout.getRegion('center').showPanel(0);;
                }
            }
        };
    }
});
