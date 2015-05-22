

Roo.example = Roo.example || {};

Roo.example.locationpicker = new Roo.XComponent({
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
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items :
            [
                {
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    cls : 'col-md-12',
                    items : [
                        {
                            xtype : 'LocationPicker',
                            xns: Roo.bootstrap,
                            style : 'width:500px; height: 400px; border: 1px solid #000;margin:50px auto;',
                            latitude : 46.15242437752303,
                            longitude : 2.7470703125,
                            radius : 300,
                            listeners : {
                                render : function (_self) {
                                    _this.picker = _self;
                                },
                                positionchanged : function (_self, location) {
                                    
//                                    var position = this.getCurrentPosition();
//                                  
                                    Roo.log(_this.latitude);
//                                    _this.latitude.setValue(0);
//                                    _this.longitude.setValue(0);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    cls : 'col-md-12',
                    style : 'margin:auto;',
                    items : [
                        {
                            xtype : 'Column',
                            xns: Roo.bootstrap,
                            md : 3,
                            cls : 'col-md-offset-3',
                            items : [
                                {
                                    xtype : 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Latitude',
                                    labelAlign : 'top',
                                    listeners : {
                                        render : function (_self) {
                                            _this.latitude = _self;
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype : 'Column',
                            xns: Roo.bootstrap,
                            md : 3,
                            items : [
                                {
                                    xtype : 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Longitude',
                                    labelAlign : 'top',
                                    listeners : {
                                        render : function (_self) {
                                            _this.longitude = _self;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
	}
    }
});