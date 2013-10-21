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
            region : 'center',
            layout : {
                xtype: 'BorderLayout',
                xns: Roo,
                items : [
                    {
                        xtype: 'ContentPanel',
                        xns: Roo,
                        listeners : {
                            activate : function (_self)
                            {
                                Roo.log(_self);
                                
                                if(_self.active && _self.view){
                                    _this.view = this.view;
                                }
                            },
                            render : function (_self)
                            {
                                _this.bodypanel = _self;
                                
                                
                            }
                        },
                        region : 'center',
                        autoCreate : true,
                         : {
                            xtype: 'View',
                            xns: Roo,
                            emptyText : "no data",
                            text : "loading",
                            footer : {
                                xtype: 'PagingToolbar',
                                xns: Roo,
                                pageSize : 20
                            },
                            tpl : {
                                xtype: 'Template',
                                xns: Roo,
                                html : '<b>test</b>'
                            },
                            store : {
                                xtype: 'Store',
                                xns: Roo.data,
                                listeners : {
                                    beforeload : function (_self, o)
                                    {
                                        o.params = o.params || {};
                                        o.params.test = 1;
                                    }
                                },
                                proxy : {
                                    xtype: 'HttpProxy',
                                    xns: Roo.data,
                                    method : 'GET',
                                    url : 'get-images.php'
                                },
                                reader : {
                                    xtype: 'JsonReader',
                                    xns: Roo.data,
                                    id : 'id',
                                    root : 'images',
                                    fields : [
                                        {name: 'name', type: 'string'},
                                        {name: 'size', type: 'string'},
                                        {name: 'lastmod', type: 'string'},
                                        {name: 'url', type: 'string'}
                                    ]
                                }
                            }
                        },
                        toolbar : {
                            xtype: 'Toolbar',
                            xns: Roo,
                            items : [
                                {
                                    xtype: 'Button',
                                    xns: Roo.Toolbar,
                                    text : "ADDDDDDDDDDD"
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
