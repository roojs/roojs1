

Roo.docs.init = {
    
    onReady : function()
    {
       
        //if (typeof(pagedata) == 'undefined') {
        //    Site.onReady.defer(100, Roo.docs.init);
        //    return;
        //}
        //Roo.debug = 1;
        
        Roo.XComponent.hideProgress = true;
        Roo.XComponent.build();
        
        
        
        
        Roo.XComponent.on('buildcomplete', function() {
            
            //Roo.XComponent.modules[0].el.fireEvent('render');
             this.loadTree();
        }, this);
        
      
        
    },
    
    loadTree: function()
    {
        Roo.Ajax.request({
            url : 'tree.json',
            method : 'GET',
            success : function(res, o)
            {
                var d = Roo.decode(res.responseText);
                Roo.log(d);
                d.forEach(function(e) {
                    this.addTreeItem(Roo.docs.SidebarNav.navGroup, e, 'NavSidebarItem');
                }, this);
                
            },
            scope : this
        });
        
        
    },
    addTreeItem : function(parent, e, type) {
        // add a node..
        var node = parent.addxtypeChild(Roo.factory({
            html: e.name.split('.').pop(),
            id : e.name,
            xns : Roo.bootstrap,
            xtype : type,
            menu : !e.cn.length ? false  : Roo.factory({
                type : 'treeview',
                xns: Roo.bootstrap,
                xtype : 'Menu'
            })
        }));
        
        if (!e.cn.length) {
            return;
        }
        e.cn.forEach(function(ec) {
            this.addTreeItem(node.menu, ec,'MenuItem');
        }, this);
        
    }
    
    
};


Roo.onReady(Roo.docs.init.onReady, Roo.docs.init);
    
 