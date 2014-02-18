

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
            el : new Roo.bootstrap.Body(),
        }
        this.parent.el.layout = false;
        this.parent.el.render(document.body);
        
        var _this = this;
        var MODULE = this;
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items : [
                 {
                    xtype: 'Calendar',
                    xns: Roo.bootstrap,
                    cls : 'col-md-6',
                    listeners : {
                        render : function() {
                            _this.cal = this;
                        }
                        
                    }
                 }
            ]
        };
    }
});