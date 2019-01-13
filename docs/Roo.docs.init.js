

Roo.docs.init = {
    
    classes : false, // flat version of list of classes 
    currentClass : '', // currently viewed class name
    
    
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
                this.classes = [];
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
                this.loadIntro();
                
                
            },
            scope : this
        });
        
        
    },
    addTreeItem : function(parent, e, type) {
        
        this.classes[e.name] = e; 
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
    
    loadClass : function(name)
    {
        if(typeof(this.classes[name]) != 'undefined') {
            this.loadDoc(this.classes[name]);
        }
        
        
        
    },
    
    loadSource : function( )
    {
        
       
        Roo.Ajax.request({
            url : 'src/' +this.currentClass.replace(/\./g,'_') + '.js.html',
            method : 'GET',
            success : function(res, o)
            {
                Roo.docs.ViewSource.show({
                        source : res.responseText,
                        fname : this.currentClass.replace(/\./g,'/') + ".js"
                });
                
            },
            scope : this
        });
        
        
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
        this.loadClass(link);
        
    },
      
    loadIntro : function()
    {
      
        
        Roo.Ajax.request({
            url : 'summary.txt',
            method : 'GET',
            success : function(res)
            {
                this.renderIntro(res.responseText);
               
                
            },
            scope : this
        });
        
        
    },
    // render the really simple markdown data
    renderIntro : function(intro)
    {
        var lines = intro.split("\n");
        var tree = { 'name' : 'root', cn : []};
        var state = [ tree ];
        for (var i=0;i< lines.length;i++) {
            var line = lines[i];
            if (!line.length || line.match(/^\s+$/)) {
                continue;
            }
            var sm = line.match(/^(\s+)(.*)/);
            
            var sml = sm ? sm[1].length: 0;
            Roo.log(sml);
            sml = sml / 4; // 4 spaces indent?
            var add = { name : sm ?  sm[2] : line, cn : [] };
            state[sml].cn.push(add);
            state[sml+1] = add;
            
        }
        Roo.log(tree);
        
        for(var i = 0; i < tree.cn.length; i++) {
            // make a container..
            var treei = tree.cn[i];
            var ctree = {
                title : treei.name,
                xtype : 'Container',
                panel : 'info',
                xns : Roo.bootstrap,
                md:3,
                items : []
            };
            for(var ii = 0; ii < treei.cn.length; ii++) {
                var treeii = treei.cm[ii];
                // another container..
               var ctreei = {
                    title : treeii.name,
                    xtype : 'Container',
                    panel : 'primary',
                    xns : Roo.bootstrap,
                    md:3,
                    items : [
                         {
                            xtype : 'Element',
                            tag :'ul',
                           
                            xns : Roo.bootstrap,
                            items : []
                         }
                    ]
                };
                ctree.items[0].push(ctreei);
                for(var iii = 0; iii < treei.cn.length; iii++) {
                    var treeiii = ctreeii[iii];
                    var ll = treeiii.name.match(/^(\w+)\s*(.*)/);
        

                    ctreeii = {
                            xtype : 'Element',
                            tag :'li',
                            xns : Roo.bootstrap,
                            cn : [
                                {
                                   xtype : 'Link',
                                    href : ll ? ll[1] : treeiii.name ,
                                    html : ll ? ll[2] : treeiii.name,
                                    xns : Roo.bootstrap 
                                }
                            ]
                            
                            
                            
                    };
                    ctreei.items[0].cn.push(ctreeii);
                    
                }
        
            }
            
            
            
            
            
            Roo.docs.introBody.addxtypeChild(ctree);
        }
        
        
        
    }
    
    
    
};


Roo.onReady(Roo.docs.init.onReady, Roo.docs.init);
    
 