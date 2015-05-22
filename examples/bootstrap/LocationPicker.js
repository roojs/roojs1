

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
                    xtype : 'LocationPicker',
                    xns: Roo.bootstrap,
                    style : 'width:500px; height: 400px; border: 1px solid #000; margin: 50px auto;',
                    listeners : {
                        render : function (_self) {
                            _this.locationpicker = _self;
                        }
                    }
                }
            ]
	}
    }
});