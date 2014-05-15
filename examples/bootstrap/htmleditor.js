

Roo.example = Roo.example || {};

Roo.example.calendar = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : '#bootstrap',
    name     : "unnamed module",
    disabled : false, 
    permname : '', 
    _tree : function()
    {
        
        this.parent = {
            el : new Roo.bootstrap.Body()
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        //var baseURL = '/web.eventmanager/admin.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype: 'Container',
                    xns: Roo.bootstrap,
                    style :  'margin-top:50px', 
                    items : [
                        {
                            xtype: 'Row',
                            xns: Roo.bootstrap,
                            style :  'margin-top:50px',
                            items : [
                                { 
                                    xtype: 'Calendar',
                                    xns: Roo.bootstrap,
                                    cls : 'col-md-6 col-sm-12',
                                    listeners : {
                                        render : function() {
                                            _this.cal = this;
                                        },
                                        evententer : function(e,el,data) {
                                            _this.popover.show(el)
                                        },
                                        eventleave : function(e,el,data) {
                                            _this.popover.hide();
                                        },
                                        monthchange : function(e,data) {
                                            
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
                                            url : baseURL + '/Roo/Cal_event.php'
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
                            ]
                        }
                    ]
                 },
                  {
                    xtype: 'Popover',
                    xns: Roo.bootstrap,
                    title : "test popover",
                    html : "test content",
                    trigger : false,
                    listeners : {
                        render : function(args) {
                            _this.popover = this;
                        }
                    }
                }
            ]
        };
    }
});