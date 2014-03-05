

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
                                        evententer : function(e,el,data) {
                                            _this.popover.show(el)
                                        },
                                        eventleave : function(e,el,data) {
                                            Roo.log('event leave');
                                            _this.popover.hide();
                                        },
                                        monthchange : function(dp,d) {
                                            Roo.log('month change');
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