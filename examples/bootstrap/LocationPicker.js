

Roo.example = Roo.example || {};

Roo.example.locationpicker = new Roo.XComponent({
    part     :  ["layout","viewpanel"],
    order    : '001-viewpanel',
    region   : '',
    parent   : false,
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
                    items : [
                        {
                            xtype : 'Column',
                            xns: Roo.bootstrap,
                            md : 6,
                            cls : 'col-md-offset-3',
                            style : 'margin-top: 50px',
                            items : [
                                {
                                    xtype : 'Header',
                                    xns: Roo.bootstrap,
                                    level : 1,
                                    html : "This requires an API now"
                                }
                            ]
                        }
                    ]
                },
		{
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                        {
                            xtype : 'Column',
                            xns: Roo.bootstrap,
                            md : 6,
                            cls : 'col-md-offset-3',
                            style : 'margin-top: 50px',
                            items : [
                                {
                                    xtype : 'Input',
                                    xns: Roo.bootstrap,
                                    fieldLabel : 'Location',
                                    listeners : {
                                        render : function (_self) {
                                            _this.location = _self;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                        {
                            xtype : 'LocationPicker',
                            xns: Roo.bootstrap,
                            style : 'width:500px; height: 400px; border: 1px solid #000;margin:50px auto;',
                            latitude : 22.276022,
                            longitude : 114.1751471,
                            markerTitle : 'Drag Me',
                            listeners : {
                                render : function (_self) {
                                    _this.picker = _self;
                                    
                                    this.gMapContext.autocomplete = new google.maps.places.Autocomplete(_this.location.inputEl().dom);
                                    
                                    google.maps.event.addListener(this.gMapContext.autocomplete, "place_changed", function() {
                                        var place = _this.picker.gMapContext.autocomplete.getPlace();
                                        if (!place.geometry) {
                                            Roo.log('location not found');
                                            return;
                                        }
                                        _this.picker.setPosition(place.geometry.location);
                                    });
                                    
                                },
                                positionchanged : function (_self, location) {
                                    if(_this.latitude){
                                        _this.latitude.setValue(location.lat());
                                    }
                                    
                                    if(_this.longitude){
                                        _this.longitude.setValue(location.lng());
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'Container',
                    xns : Roo.bootstrap,
                    items : [
                        {
                            xtype : 'Column',
                            xns: Roo.bootstrap,
                            md : 6,
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
                            md : 6,
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