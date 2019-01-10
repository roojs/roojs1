

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
                    if (e.cn.length) {
                        this.addTreeItem(Roo.docs.navGroup, e, 'NavSidebarItem');
                    }
                }, this);
                d.forEach(function(e) {
                    if (!e.cn.length) {
                        this.addTreeItem(Roo.docs.navGroup, e, 'NavSidebarItem');
                    }
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
            preventDefault : true,
            cls : type == 'NavSidebarItem' ? 'open' : '',
            listeners : {
                click : (function(mi,ev,c)
                {
                    
                    if (c) { //
                       ev.stopPropagation();
                    } else {
                        c = ev;
                    }
                    
                    Roo.docs.init.loadDoc(c.name);
                    
                }).createDelegate(this,[e], true)
                
            },
            menu : !e.cn.length ? false  : Roo.factory({
                type : 'treeview',
                xns: Roo.bootstrap,
                xtype : 'Menu'
                
            })
        }));
        if (e.cn.length  && type == 'NavSidebarItem') {
            this.topm = node.menu;
        }
        
        
        if (!e.cn.length) {
            return;
        }
        e.cn.forEach(function(ec) {
            var cn = ec.name.split('.').pop();
            Roo.log(cn);
            if (cn == cn.toLowerCase()) {
                this.addTreeItem(node.menu, ec,'MenuItem');
            }
            
        }, this);
        e.cn.forEach(function(ec) {
            var cn = ec.name.split('.').pop();
            if (cn != cn.toLowerCase()) {
                this.addTreeItem(node.menu, ec,'MenuItem');
            }
        }, this);
        
    },
    loadDoc : function(name)
    {
        Roo.Ajax.request({
            url : 'symbols/' + name + '.json',
            method : 'GET',
            success : function(res, o)
            {
                var d = Roo.decode(res.responseText);
                this.fillDoc(d);
                
            },
            scope : this
        });
        
        
    },
    fillDoc : function(d)
    {
        /*{
            "name" : "Roo.bootstrap.Progress",
            "augments" : [
              "Roo.bootstrap.Component",
              "Roo.Component",
              "Roo.util.Observable"
            ],
            "desc" : "Bootstrap Progress class",
            "config" : [
              {
        */
        for (var k in d) {
            if (typeof(Roo.docs['doc_' + k])  !=  null) {
                Roo.docs['doc_' + k].el.dom.innerHTML = d[k];
            }
        }
        Roo.docs.doc_augments.hide();
        Roo.docs.doc_augments_sep.hide();
        if (d.augments.length) {
            
        }
        
        
        
    }
    
    
    
    
};


Roo.onReady(Roo.docs.init.onReady, Roo.docs.init);
    
 