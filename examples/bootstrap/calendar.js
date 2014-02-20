

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
                                        eventover : function(e,el,data) {
                                            this.popup.show(el)
                                        }
                                        
                                    }
                                 }
                            ]
                        }
                    ]
                 }
            ]
        };
    }
});