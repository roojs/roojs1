//<script type="text/javascript">


Roo.onReady(function(){

    Roo.QuickTips.init();
      MainBody.init();
   
    
    
});
MainBody = {
    layout: false,
    cookie: false,
    init: function() 
    {
        
        this.cookie = new Roo.state.CookieProvider({})
        
        MainBody.layout = new Roo.BorderLayout(document.body, {
            north: {
                split:true,
                initialSize: 30,
                titlebar: false,
                collapsible: false
                
            },
            west: {
                split:true,
                initialSize: 200,
                titlebar: true,
                collapsible: true
                
            },
            center: {
                autoScroll: false,
                titlebar: true,
                resizeTabs:true,
                minTabWidth: 100,
                preferredTabWidth:250
            }
        });
        var layout = MainBody.layout;
        MainBody.layout.beginUpdate();
        var hd = this.layout.getEl().createChild( {
                tag:'div' , 
                style: 'background-colour:#000; font-weight: bold;' + 
                    'font-size:16px;'  +
                    'font-family:Arial,Verdana,\'Bitstream Vera Sans\',Helvetica,sans-serif;', 
                html: '<img src="../images/roojs_logo.jpg" height="25" align="right"/>' + 
                    '<div style="margin-left:10px;margin-top:3px;">Roo Version 1.1.2 - Documentation</div>'
        });
        layout.add('north', new Roo.panel.Content(hd, {fitToFrame:true, closable:false }));
         
        //innerLayout.add('south', new Roo.panel.Content('inner1', "More Information"));
        //innerLayout.add('center', new Roo.panel.Content('inner2')); // right bottom Tree
        
         
        //alert("initing");
       
        ClassTree.init();
        
        //var frame = this.layout.getEl().createChild({ tag:'div' , frameborder: "no"});
        var frame = this.layout.getEl().createChild({ tag:'iframe' , id:'viewFrame', name:'viewFrame',frameborder: "no"});
                   
                   
     
        
        this.preview = new Roo.panel.Content(frame, {title: 
            '&nbsp;<a target="viewFrame" href="/roojs1/buildSDK/indexPage.html">Contents / Examples</a>' + 
            ' | Class Details',
            fitToFrame:true,
            autoScroll: true
        });
        
        //// ---- HANLE CLICKS ON OUR CHILD PAGE???
        /*
        this.preview.getEl().on('click', function(e, target)
        {
            //console.log("click pressed?");
            
            if(target = e.getTarget('a:not(.exi)', 3)) {
                var cls = Roo.fly(target).getAttributeNS('roo', 'cls');
                e.stopEvent();
                if(cls){
                    var member = Roo.fly(target).getAttributeNS('roo', 'member');
                    //this.loadClass(target.href, cls, member);
                    
                    if (/^src\//.test(cls)) {
                        cls = cls.replace(/.js$/, ''); // get rid of .js for source links..
                    }
                    
                    
                    MainBody.loadPage("symbols/"+ cls +".html");
                    return;
                }
                if(target.className == 'inner-link'){ // go to #
                    this.getActiveTab().scrollToSection(target.href.split('#')[1]);
                    return;
                }
                window.open(target.href);
                
                return; // no more...
            }
            if(target = e.getTarget('.micon', 2)){
                
                e.stopEvent();
                var tr = Roo.fly(target.parentNode);
                if(tr.hasClass('expandable')){
                    tr.toggleClass('expanded');
                }
            }
          
        });
        */
         
        window.setInterval(function() {
            // check 
            //console.log("check");
                if (CommentDialog.showCommentId.length) {
                    var id  = '' + CommentDialog.showCommentId;
                    if (Roo.isSafari) {
                        Roo.get(document.getElementsByTagName('iframe')[0]).setVisible(false);
                    }
                   // alert(id);
                    CommentDialog.showCommentId= '';
                    
                    
                    
                    CommentDialog.show(id);
                }
            }, 500); // check every half second..
        
        
        
        
        var cp = this.layout.add('center',   this.preview);
        MainBody.loadPage("/roojs1/buildSDK/indexPage.html");
        
        
        MainBody.layout.endUpdate();
      
        CommentDialog.build();
        
        Roo.get(document.getElementsByTagName('iframe')[0]).setVisibilityMode(Roo.Element.DISPLAY);
        
    },
    
    
    loadPage: function(src) {
        this.preview.el.dom.src = src;

        //this.preview.load(src);
    } 
    
    
}


ClassTree = {
    tree: false,
    
    init : function () 
    {
        if (this.tree) {
            return;
           }
        
        var ct = MainBody.layout.getEl().createChild({tag:'div'});
        var viewEl = ct.createChild({tag:'div'});
        var folders = MainBody.layout.add('west', 
            new Roo.panel.Content(ct, {
                title:'Tree', 
                fitToFrame:true,
                autoScroll:true,
                autoCreate:true,
               // toolbar: tb,
                resizeEl:viewEl
            }));
        this.tree = new Roo.tree.TreePanel(viewEl, {
            animate:true, 
            enableDD:false,
            containerScroll: true,
            ddGroup: 'organizerDD',
            rootVisible:false,
            listeners : {
                
                click : function(node, e) {
                    // do stuff.
                    // load: 
                    //console.log(node.attributes.openUrl);
                    if (!node.attributes.openUrl) {
                        return;
                    }
                    MainBody.loadPage("symbols/"+ node.attributes.openUrl  +".html");
                     
                    //MainBody.layout.getRegion('center').getPanel(0).setTitle(ClassTree.getTitleHtml(file)); // methods
                }
                
                
            }
        });
        new Roo.tree.TreeSorter(this.tree, {folderSort:true});
        var root = new Roo.tree.TreeNode({
            text: '', 
            allowDrag:false,
            allowDrop:false
        });
        this.tree.setRootNode(root);
        // loop through 
        function addNodes(parent, ar, pref) 
        {
            for(var nm in ar) {
                if (nm.substring(0,1) == "_") { // skip desc..
                    continue;
                }
                //console.log("nm : " + nm + " = isNS:"+ar[nm]._isNS + " ? PN:" + nd.getDepth());
                var hasChildNodes = ar[nm]._hasChildren && (ar[nm]._isNS || (parent.getDepth() < 1));
                    
                
                var nd = new Roo.tree.TreeNode( {
                        text:pref +nm, 
                        cls:  'album-node'  ,  
                        allowDrag:false,
                        leaf : !hasChildNodes,
                        openUrl: ar[nm].hasOwnProperty('_full') ? ar[nm]._full : false,
                        isNS : ar[nm]._isNS
                });
                
                // add a duplacate reference - if it's got children and 
                /*
                if (ar[nm]._hasChildren && (!ar[nm]._isNS) {
                    //console.log("Adding node.." + nm);
                    var xn = new Roo.tree.TreeNode( {
                            text:    nm,
                            cls:  'album-node'  ,  
                            allowDrag:false,
                            leaf : true,
                            openUrl: ar[nm].hasOwnProperty('_full') ? ar[nm]._full : false
                            
                            
                    });    
                    parent.appendChild(xn);
                }
                */
                parent.appendChild(nd);
                
                //if (typeof(ar[nm]) == "object") {
                
                if (ar[nm]._hasChildren) {
                    //console.log("nm : " + nm + " = isNS:"+ar[nm]._isNS + " ? PN:" + nd.getDepth());
                    
                    if (hasChildNodes) {
                        // namespace -- make a tre..
                        addNodes(nd, ar[nm],'');
                        
                        
                        
                    } else {
                        addNodes(parent, ar[nm],  pref + nm + '.');
                        
                        
                        
                        
                        
                    }
                    
                }
            }
             
            
        }
        ClassTree.load();
        // class tree comes from outside!!!
        addNodes(root, ClassTree.nodes,'');
        
        this.tree.render();
        
        
        root.eachChild(function(n) { n.expand(); });
        //new Roo.tree.TreeSorter(this.tree);
        ///this.tree.expand();
          
	},
    nodes : { },
    load: function(file)
    {
        
        ClassTree.nodes = { _hasChildren: true, _isNameSpace: true };
           
        Roo.get('classlist').select('li').each( function(n) {
            var dvs = n.select('div');
            
            var cn = {
                name : dvs.item(0).dom.innerHTML,
                desc : '', //dvs.item(1).dom.innerHTML
                isNS : dvs.item(0).getAttributeNS('roo','isns') == "yes"
            }
            //console.log("ADD: " + cn.name);
            var nbits = cn.name.split(".");
            
            // top is where we stick everything in...
            
            var top=  ClassTree.nodes;
            
            for (var  i = 0; i < nbits.length; i++) {
                // is the last one..
                var nm = nbits[i];
                
                if (i == (nbits.length-1)) {
                    if (top.hasOwnProperty(nm)) {
                        top[nm]._full = cn.name;
                        top[nm]._desc = cn.desc;
                        break; // all done..
                    }
                    top._hasChildren =true;
                    top[nm] = {
                      ///  _parent : "Object", // not sure abou this bit!!!
                        _full : cn.name,
                        _desc : cn.name,
                        _hasChildren : false ,
                        _isNS : cn.isNS
                    }
                    break;
                }
                // not the top.
                if (top.hasOwnProperty(nm)) {
                    top = top[nm];
                    continue;
                }
                top[nm] = { _hasChildren : false };
                top = top[nm];
            }
            
            
            
            
        });
       
        //console.log(ClassTree.nodes);
        
        
        
        // load page into right hand panel....
    }
    /*
    getTitleHtml : function (file)
    {
        var bits = file.split(".");
        // what about 'Gtk/G etc.'
        if (bits.length < 2) {
            return file;
        }
        // should not really happen..
        if (!(bits[0] in classtree)) {
            return file;
        }
        if (!(bits[1] in classtree[bits[0]])) {
            return file;
        }
        var parent = classtree[bits[0]][bits[1]]._parent;
        if (bits.length == 3) {
            if (!(bits[2] in classtree[bits[0]][bits[1]])) {
                return file;
            }
            parent = classtree[bits[0]][bits[1]][bits[2]]._parent;
        }
        
        // add parent...
        var ret = "<u onclick=\"ClassTree.load('"+file+"')\">" + file + "</u>&nbsp;&gt;&nbsp;";
        return ret + ClassTree.getTitleHtml(parent);
    }
    */
    
    
}
     
     
     
     
     
     
     

CommentDialog = {
    
    dialog : false,
    form: false,
    ids: false,
    showCommentId: '', /// id of comment to show as scoping on konq/safari is borked
    show: function (cls) {
        this.build();
        this.ids = cls;
        this.form.reset();
        this.form.setValues( {
                "comment[title]" : "General Comment",
                "comment[wikifile]" : cls
                });
        this.form.setValues( MainBody.cookie.state );
        
        this.dialog.show();
        if (this.form.getValues()["comment[author]"].length) {
            CommentDialog.form.items.items[4].focus();
        } else {
            CommentDialog.form.items.items[0].focus();
        }
        
    },
    build: function ()
    {
        
        if (this.dialog) {
            return;
        }
  
        this.dialog = new Roo.LayoutDialog(Roo.id(), { 
                autoCreate: true,
                modal:true,
                title: "Add Comment",
                //autoTabs:true,
                titlebar: true,
                
                modal:true,
                width:550,
                height:450,
                shadow:true,
                 
                
                center:{
                    autoScroll:false 
                 
                } 
               
        });
             
        this.dialog.addKeyListener(27, this.hide, this);
        this.dialog.addButton('Cancel', this.hide, this);
        this.dialog.addButton('Submit', this.submit, this);
    
        var layout = this.dialog.getLayout();
        var cd = this;
        // create the dialog....
        this.form = new Roo.form.Form({
            labelWidth: 160,
            
            listeners : {
                actionfailed : function(f, act) {
                    cd.dialog.el.unmask();    
                    Roo.MessageBox.alert("Error", "Saving failed = fix errors and try again");
                    // we dont do loads....
                    
                              
                },
                actioncomplete: function(f, act) {
                     
                    cd.dialog.el.unmask();    
                    cd.hide();
                    cd.form.reset();
                    //hopefully this hsould work!
                    var p = parent;
                    while (p.parent != p) {
                        p = p.parent;
                    }
                    console.log("trying : " + "comments-" + cd.ids);
                    p.frames[0].document.getElementById("comments-" + cd.ids).contentDocument.location.reload();
             
                    // unmask?? 
                }
            }
            
            
             
        });
            // simple array store
        var ctypes = new Roo.data.SimpleStore({
            fields: ['value'],
            data : [
                [ "General Comment" ],
                [ "Example Code" ],
                [ "Introduction" ],
                [ "Bug" ]
            ]
        });
        
       this.form.add( 
             
          
                new Roo.form.TextField({
                    fieldLabel: 'Your Name',
                    name: 'comment[author]',
                    width: 300,
                    allowBlank:false,
                    autoCreate: {tag: "input", type: "text", size: "20", autocomplete: "on"} 
                }),
                new Roo.form.TextField({
                    fieldLabel: 'Your Email address',
                    name: 'comment[email]',
                    width: 300,
                    allowBlank:false,
                    vtype: "email",
                    autoCreate: {tag: "input", type: "text", size: "20", autocomplete: "on"} 
                    
                }),
                new Roo.form.TextField({
                    fieldLabel: 'Your Web site (optional)',
                    name: 'comment[url]',
                    width: 300,
                    allowBlank:true,
                    vtype: "url"
                }),
                new Roo.form.ComboBox({
                    fieldLabel: 'Type of Comment',
                    name: 'comment[title]',
                    editable: false,
                    forceSelection: true,
                    store: ctypes,
                    displayField:'value',
                    typeAhead: false,
                    mode: 'local',
                    triggerAction: 'all',
                    defaultValue: "General Comment",
                    allowBlank:false,
                    selectOnFocus:true
                    
                }),
                new Roo.form.TextArea({
                    fieldLabel: 'Comment',
                    name: 'comment[body]',
                    width:300,
                    growMin:200,
                    grow: true,
                    allowBlank:false
                }),
                new Roo.form.Hidden({
                    name: 'comment[wikifile]',
                    value : ''
                }),
                new Roo.form.Hidden({
                    name: 'jsonRequest',
                    value : 'yes'
                })
                
                
        );
        
        
        var ef = layout.getEl().createChild({tag: 'div', style: 'margin: 5px'});
        ef.dom.style.margin = 10;
        ef.dom.style.position = "fixed";
             
            //console.log("form container");
            //console.log(ef);
            
            
        
        var vp = layout.add('center', new Roo.panel.Content(ef, {
            autoCreate : true,
            fitToFrame:true
        }));
        
        this.form.render(ef.dom);
       
       
        
    
    },
    submit: function()
    {
        
        
        var cd = typeof(CommentDialog) == "undefined" ? parent.CommentDialog : CommentDialog;
        if (!cd.form.isValid()) {
            Roo.MessageBox.alert("Error", "Please Fill in all the details");
            return;
        }
        var p = cd.form.getValues();
        
        var mb = typeof(MainBody) == "undefined" ? parent.MainBody : MainBody;
        
        mb.cookie.set("comment[author]", p["comment[author]"]);
        mb.cookie.set("comment[email]", p["comment[email]"]);
        mb.cookie.set("comment[url]", p["comment[url]"]);
        cd.dialog.el.mask("Saving Data");    
        
        
        cd.form.doAction('submit', {
                url: '/blog.php/GtkDjsComments/' + cd.ids + '.html',
                method: 'POST'
        });
        
        
         
        
    },
    hide : function()
    {
        
        if (Roo.isSafari) {
            Roo.get(document.getElementsByTagName('iframe')[0]).setVisible(true);  
        }
        this.dialog.hide();
    }
        
        
       
    
}

     
     
     
     
     