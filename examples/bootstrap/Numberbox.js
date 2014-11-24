

Roo.example = Roo.example || {};

Roo.example.NumberBox = new Roo.XComponent({
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
        var baseURL = '/web.eventmanager/demo.local.php';
        
        return {
            xtype: 'Body',
            xns: Roo.bootstrap,
            items :[
		 {
			xtype : 'NumberBox',
			xns: Roo.bootstrap.dash,
            // listeners: {
            //     render: function(){
            //         this.load('bar',[55, 20, 13, 32, 5, 1, 2, 10,5 , 10]);
            //     }
            // }
			
                 }
		]
	}
    }
});
