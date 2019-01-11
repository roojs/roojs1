

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
        Roo.get(document.body).on('click', this.onClick, this);
      
        
    },
    
    loadTree: function()
    {
        Roo.docs.doc_body_content.hide();
        
        Roo.Ajax.request({
            url : 'tree.json',
            method : 'GET',
            success : function(res, o)
            {
                var d = Roo.decode(res.responseText);
                Roo.log(d);
                // our classes witch children first..
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
                var roo = Roo.docs.navGroup.items[1].menu;
                roo.show(roo.triggerEl, '?', false);
                
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
            showArrow: false,
            xtype : type,
            preventDefault : true,
          //  cls : type == 'NavSidebarItem' ? 'open' : '',
            listeners : {
                click : (function(mi,ev,c)
                {
                    
                    ev.stopPropagation();
                     
                    if (c.cn.length) {
                        Roo.log(ev);
                        if (mi.menu.el.hasClass('show')) {
                            mi.menu.hide();
                        } else {
                            mi.menu.show(mi.menu.triggerEl,'?', false);
                        }
                        
                    }
                    
                    Roo.docs.init.loadDoc(c);
                    
                }).createDelegate(this,[e], true)
                
            },
            fa :  e.cn.length  ? 'chevron-right' : '',
            menu : !e.cn.length ? false  : Roo.factory({
                type : 'treeview',
                xns: Roo.bootstrap,
                xtype : 'Menu',
                listeners : {
                    beforehide : (function(mi,c)
                    {
                        if (c.name.split('.').length < 2) {
                            return false;
                        }
                        return true;
                        
                    }).createDelegate(this,[e], true)
                    
                }
                
            })
        }));
        parent.items.push(node);
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
    loadDoc : function(cls)
    {
        Roo.docs.doc_body_content.hide();
        this.currentClass = cls.name;
        if (!cls.is_class) {
            return;
        }
        Roo.docs.doc_body_content.show();
        Roo.Ajax.request({
            url : 'symbols/' + cls.name + '.json',
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
        document.body.scrollTop  = 0;
        for (var k in d) {
            if (typeof(Roo.docs['doc_' + k])  !=  'undefined') {
                Roo.docs['doc_' + k].el.dom.innerHTML = Roo.docs.template.resolveLinks(d[k]);;
            }
        }
        Roo.docs.doc_extends.hide();
        Roo.docs.doc_extends_sep.hide();
        if (d.augments.length) {
            Roo.docs.doc_extends.show();
            Roo.docs.doc_extends_sep.show();
            Roo.docs.doc_extends.el.dom.innerHTML = d.augments[0];
        }
        Roo.docs.doc_source.el.dom.innerHTML = d.name.replace(/\./g,"/") + ".js";
        
        if (d.augments.length) {
            Roo.docs.augments.show();
            Roo.docs.augments.bodyEl().dom.innerHTML = Roo.docs.template.augments(d);
        } else {
            Roo.docs.augments.hide();
        }
        
        
        
        Roo.docs.configTableContainer.hide();
        Roo.docs.methodsTableContainer.hide();
        Roo.docs.eventsTableContainer.hide();
        if (d.config.length) {
            Roo.docs.configTableContainer.show();
            Roo.docs.configTable.store.load( { params : { data : d.config.sort(Roo.docs.template.makeSortby("name")) }});
        } 
        
        if (d.methods.length) {
            Roo.docs.methodsTable.store.load( { params : { data : Roo.docs.template.methodsSort(d) }});
            Roo.docs.methodsTableContainer.show();
        }
        if (d.events.length) {
            Roo.docs.eventsTable.store.load( { params : { data : d.events.sort(Roo.docs.template.makeSortby("name")) }});
            Roo.docs.eventsTableContainer.show();
        }
        
        
    },
    onClick : function(e)
    {
        if (e.target.nodeName != 'A') {
            return;
        }
        if (!e.target.href.match(/#/)) {
            return;
        }
        e.stopPropagation();
        var link = e.target.href.split('#')[1];
        this.loadDoc(link);
        
    }
    
    
    
    
};


Roo.onReady(Roo.docs.init.onReady, Roo.docs.init);
    
 