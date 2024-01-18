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
            xtype: 'NestedLayout',
            xns: Roo.panel,
            region : 'center',
            layout : {
                xtype: 'BorderLayout',
                region : 'center',
                xns: Roo,
                items : [
                    {
                        xtype: 'Calendar',
                        xns: Roo.Panel,
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
                        },
                          store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o){
                                        o.params = o.params || {};
                                        var d = new Date().format('Y-m-d');
                                        if(_this.cal){
                                            d = typeof(_this.cal.activeDate) == 'string' ? _this.cal.activeDate : _this.cal.activeDate.format("Y-m-d");
                                        }
                                        o.params._activeDate = d
                                    }
                                },
                                remoteSort : true,
                                sortInfo : { direction : 'ASC', field: 'start_dt' },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : 'http://roojs.com/admin.php/Roo/mtrack_ticket?_dc=1396967515369&_future_schedule=1&query%5Bviewtype%5D=active&limit=999&sort=summary&dir=ASC'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'data',
                                    totalProperty : 'total',
                                    fields : [{"name":"id","type":"int"},{"name":"title","type":"string"}]
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
