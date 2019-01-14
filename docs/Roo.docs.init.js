

Roo.docs.init = {
    
    classes : false, // flat version of list of classes 
    currentClass : '', // currently viewed class name
    
    hash : '',
    
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
        
        
        window.onhashchange = function() { Roo.docs.init.onHashChange(); }
        
        
       
        
        //Roo.get(document.body).on('click', this.onClick, this);
      
        
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
                //Roo.log(d);
                this.classes = {};
                // our classes witch children first..
                d.forEach(function(e) {
                    if (e.cn.length) {
                        this.addTreeItem(Roo.docs.navGroup, e, 'NavSidebarItem', true);
                        
                    }
                }, this);
                
                d.forEach(function(e) {
                    if (!e.cn.length) {
                        this.addTreeItem(Roo.docs.navGroup, e, 'NavSidebarItem' ,true);
                    }
                }, this);
                
                d.forEach(function(e) {
                    if (e.cn.length) {
                        this.addTreeItem(Roo.docs.mobileNavGroup, e, 'NavSidebarItem', false);
                        
                    }
                }, this);
                
                d.forEach(function(e) {
                    if (!e.cn.length) {
                        this.addTreeItem(Roo.docs.mobileNavGroup, e, 'NavSidebarItem', false);
                    }
                }, this);
                
                var roo = Roo.docs.navGroup.items[1].menu;
                roo.show(roo.triggerEl, '?', false);
                if (location.hash.length) {
                    this.loadHash();
                    return;
                }
                
                this.loadIntro();
                
                
            },
            scope : this
        });
        
        
    },
    
    hideChildren : function(c)
    {
        if (c.node.menu) {
            c.node.menu.hide();
        }
        for (var i =0; i < c.cn.length; i++) {
            this.hideChildren(c.cn[i]);
        }
        
    },
    
    
    addTreeItem : function(parent, e, type , parent_e) {
        
        this.classes[e.name] = e; 
        // add a node..
        var node = parent.addxtypeChild(Roo.factory({
            html: e.name.split('.').pop(),
           // id : e.name,
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
                        //Roo.log(ev);
                        if (mi.menu.el.hasClass('show')) {
                            this.hideChildren(c); //mi.menu.hide();
                            // collapse children..
                            
                            
                            
                        } else {
                            mi.menu.show(mi.menu.triggerEl,'?', false);
                        }
                        
                    }
                    location.hash = '#' + c.name;
                    //Roo.docs.init.loadDoc(c);
                    
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
        
        // mobile nodes..?
        
       
        
        
        
        
        if (parent_e !== false) {
            e.node = node;
            e.parent_menu = parent;
            e.parent = parent_e == true ? null : parent_e;
        }
        
        parent.items.push(node);
        if (e.cn.length  && type == 'NavSidebarItem') {
            this.topm = node.menu;
        }
        
        
        if (!e.cn.length) {
            return;
        }
        e.cn.forEach(function(ec) {
            var cn = ec.name.split('.').pop();
            //Roo.log(cn);
            if (cn == cn.toLowerCase()) {
                this.addTreeItem(node.menu, ec,'MenuItem', parent_e !== false ? e : false);
            }
            
        }, this);
        e.cn.forEach(function(ec) {
            var cn = ec.name.split('.').pop();
            if (cn != cn.toLowerCase()) {
                this.addTreeItem(node.menu, ec,'MenuItem', parent_e !== false ? e : false);
            }
        }, this);
        
    },
    
    loadClass : function(name)
    {
        if(typeof(this.classes[name]) != 'undefined' && this.classes[name].is_class ) {
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
        Roo.docs.mobileNavGroup.hide()
        Roo.docs.doc_body_content.hide();
        this.currentClass = cls.name;
        if (!cls ) {
            Roo.docs.introBody.show();
            return;
        }
        
        // expand parents..
        
        var m = cls.parent_menu;
        m.show(m.triggerEl,'?', false);
        var mp = cls;
        while ((mp = mp.parent)) {
            m = mp.parent_menu;
            m.show(m.triggerEl,'?', false);
        }
        cls.node.el.scrollIntoView(Roo.docs.sidebar.el,false);
        Roo.docs.sidebar.el.select('.active').removeClass('active');
        cls.node.el.addClass('active');
        
        Roo.docs.introBody.hide();
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
    
    onHashChange : function()
    {
        if (this.hash == location.hash) {
            return;
        }
        this.loadHash();
        
    },
    loadHash : function()
    {
        if (location.hash.length < 2) {
            this.loadDoc(false);
        }
        this.loadClass(location.hash.substring(1));
        this.hash = location.hash;
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
        
        Roo.docs.doc_body_content.hide();

        
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
            //Roo.log(sml);
            sml = sml / 4; // 4 spaces indent?
            var add = { name : sm ?  sm[2] : line, cn : [] };
            state[sml].cn.push(add);
            state[sml+1] = add;
            
        }
        //Roo.log(tree);
        
        for(var i = 0; i < tree.cn.length; i++) {
            // make a container..
            var treei = tree.cn[i];
            var ctree = {
                
                xtype : 'Column',
                xns : Roo.bootstrap,
                md:4,
                sm : 6,
                items : [ {
                    header : treei.name,
                    xtype : 'Container',
                    panel : 'info',
                    xns : Roo.bootstrap,
                    items : []
                }]
            };
            for(var ii = 0; ii < treei.cn.length; ii++) {
                var treeii = treei.cn[ii];
                // another container..
               var ctreei = {
                    header : treeii.name,
                    xtype : 'Container',
                    panel : 'primary',
                    xns : Roo.bootstrap,
                  
                    items : [
                         {
                            xtype : 'Element',
                            tag :'ul',
                           
                            xns : Roo.bootstrap,
                            items : []
                         }
                    ]
                };
                ctree.items[0].items.push(ctreei);
                var footer = '';
                for(var iii = 0; iii < treeii.cn.length; iii++) {
                    var treeiii = treeii.cn[iii];
                    var ll = treeiii.name.match(/^(\S+)\s*(.*)$/);
                    //Roo.log(treeiii.name);
                    if (treeiii.name == 'Examples') {
                        for (var j =0;j< treeiii.cn.length; j++) {
                            var exs = treeiii.cn[j].name.match(/^\[([^\]]+)\](.*)$/);
                            footer += '<li><a target="_blank" href="../' + exs[1] + '">'+exs[2] + '</a></li>';
                        }
                        continue;
                        
                        
                    }
        
        

                    ctreeii = {
                            xtype : 'Element',
                            tag :'li',
                            xns : Roo.bootstrap,
                            items : [
                                {
                                   xtype : 'Link',
                                    href : '#' + ( ll ? ll[1] : treeiii.name ) ,
                                    html : ll ? ll[1] : treeiii.name,
                                    
                                    xns : Roo.bootstrap 
                                },
                                {
                                   xtype : 'Element',
                                    tag : 'span',
                                    html : ll && ll[2].length ? ' - ' + ll[2] : '',
                                    xns : Roo.bootstrap 
                                }
                            ]
                            
                            
                            
                    };
                    ctreei.items.push(ctreeii);
                    
                }
                if (footer.length) {
                    //Roo.log("footer:"+  footer);
                    ctreei.footer = '<h5>Examples:</h5><ul>'+footer +'</ul>';
                }
        
            }
            
            
            
            
            
            Roo.docs.introBody.addxtypeChild(ctree);
        }
        
        
        
    }
    
    
    
};


Roo.onReady(Roo.docs.init.onReady, Roo.docs.init);
    
 