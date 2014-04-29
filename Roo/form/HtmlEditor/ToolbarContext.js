// <script type="text/javascript">
/*
 * Based on
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *  
 
 */

 
/**
 * @class Roo.form.HtmlEditor.ToolbarContext
 * Context Toolbar
 * 
 * Usage:
 *
 new Roo.form.HtmlEditor({
    ....
    toolbars : [
        { xtype: 'ToolbarStandard', styles : {} }
        { xtype: 'ToolbarContext', disable : {} }
    ]
})

     
 * 
 * @config : {Object} disable List of elements to disable.. (not done yet.)
 * @config : {Object} styles  Map of styles available.
 * 
 */

Roo.form.HtmlEditor.ToolbarContext = function(config)
{
    
    Roo.apply(this, config);
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
    this.styles = this.styles || {};
}

 

Roo.form.HtmlEditor.ToolbarContext.types = {
    'IMG' : {
        width : {
            title: "Width",
            width: 40
        },
        height:  {
            title: "Height",
            width: 40
        },
        align: {
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        border: {
            title: "Border",
            width: 40
        },
        alt: {
            title: "Alt",
            width: 120
        },
        src : {
            title: "Src",
            width: 220
        }
        
    },
    'A' : {
        name : {
            title: "Name",
            width: 50
        },
        target:  {
            title: "Target",
            width: 120
        },
        href:  {
            title: "Href",
            width: 220
        } // border?
        
    },
    'TABLE' : {
        rows : {
            title: "Rows",
            width: 20
        },
        cols : {
            title: "Cols",
            width: 20
        },
        width : {
            title: "Width",
            width: 40
        },
        height : {
            title: "Height",
            width: 40
        },
        border : {
            title: "Border",
            width: 20
        }
    },
    'TD' : {
        width : {
            title: "Width",
            width: 40
        },
        height : {
            title: "Height",
            width: 40
        },   
        align: {
            title: "Align",
            opts : [[""],[ "left"],[ "center"],[ "right"],[ "justify"],[ "char"]],
            width: 80
        },
        valign: {
            title: "Valign",
            opts : [[""],[ "top"],[ "middle"],[ "bottom"],[ "baseline"]],
            width: 80
        },
        colspan: {
            title: "Colspan",
            width: 20
            
        },
         'font-family'  : {
            title : "Font",
            style : 'fontFamily',
            displayField: 'display',
            optname : 'font-family',
            width: 140
        }
    },
    'INPUT' : {
        name : {
            title: "name",
            width: 120
        },
        value : {
            title: "Value",
            width: 120
        },
        width : {
            title: "Width",
            width: 40
        }
    },
    'LABEL' : {
        'for' : {
            title: "For",
            width: 120
        }
    },
    'TEXTAREA' : {
          name : {
            title: "name",
            width: 120
        },
        rows : {
            title: "Rows",
            width: 20
        },
        cols : {
            title: "Cols",
            width: 20
        }
    },
    'SELECT' : {
        name : {
            title: "name",
            width: 120
        },
        selectoptions : {
            title: "Options",
            width: 200
        }
    },
    
    // should we really allow this??
    // should this just be 
    'BODY' : {
        title : {
            title: "Title",
            width: 200,
            disabled : true
        }
    },
    'SPAN' : {
        'font-family'  : {
            title : "Font",
            style : 'fontFamily',
            displayField: 'display',
            optname : 'font-family',
            width: 140
        }
    },
    'DIV' : {
        'font-family'  : {
            title : "Font",
            style : 'fontFamily',
            displayField: 'display',
            optname : 'font-family',
            width: 140
        }
    },
     'P' : {
        'font-family'  : {
            title : "Font",
            style : 'fontFamily',
            displayField: 'display',
            optname : 'font-family',
            width: 140
        }
    },
    
    '*' : {
        // empty..
    }

};

// this should be configurable.. - you can either set it up using stores, or modify options somehwere..
Roo.form.HtmlEditor.ToolbarContext.stores = false;

Roo.form.HtmlEditor.ToolbarContext.options = {
        'font-family'  : [ 
                [ 'Helvetica,Arial,sans-serif', 'Helvetica'],
                [ 'Courier New', 'Courier New'],
                [ 'Tahoma', 'Tahoma'],
                [ 'Times New Roman,serif', 'Times'],
                [ 'Verdana','Verdana' ]
        ]
};

// fixme - these need to be configurable..
 

Roo.form.HtmlEditor.ToolbarContext.types


Roo.apply(Roo.form.HtmlEditor.ToolbarContext.prototype,  {
    
    tb: false,
    
    rendered: false,
    
    editor : false,
    /**
     * @cfg {Object} disable  List of toolbar elements to disable
         
     */
    disable : false,
    /**
     * @cfg {Object} styles List of styles 
     *    eg. { '*' : [ 'headline' ] , 'TD' : [ 'underline', 'double-underline' ] } 
     *
     * These must be defined in the page, so they get rendered correctly..
     * .headline { }
     * TD.underline { }
     * 
     */
    styles : false,
    
    options: false,
    
    toolbars : false,
    
    init : function(editor)
    {
        this.editor = editor;
        this.editorcore = editor.editorcore ? editor.editorcore : editor;
        var editorcore = this.editorcore;
        
        var fid = editorcore.frameId;
        var etb = this;
        function btn(id, toggle, handler){
            var xid = fid + '-'+ id ;
            return {
                id : xid,
                cmd : id,
                cls : 'x-btn-icon x-edit-'+id,
                enableToggle:toggle !== false,
                scope: editor, // was editor...
                handler:handler||editor.relayBtnCmd,
                clickEvent:'mousedown',
                tooltip: etb.buttonTips[id] || undefined, ///tips ???
                tabIndex:-1
            };
        }
        // create a new element.
        var wdiv = editor.wrap.createChild({
                tag: 'div'
            }, editor.wrap.dom.firstChild.nextSibling, true);
        
        // can we do this more than once??
        
         // stop form submits
      
 
        // disable everything...
        var ty= Roo.form.HtmlEditor.ToolbarContext.types;
        this.toolbars = {};
           
        for (var i in  ty) {
          
            this.toolbars[i] = this.buildToolbar(ty[i],i);
        }
        this.tb = this.toolbars.BODY;
        this.tb.el.show();
        this.buildFooter();
        this.footer.show();
        editor.on('hide', function( ) { this.footer.hide() }, this);
        editor.on('show', function( ) { this.footer.show() }, this);
        
         
        this.rendered = true;
        
        // the all the btns;
        editor.on('editorevent', this.updateToolbar, this);
        // other toolbars need to implement this..
        //editor.on('editmodechange', this.updateToolbar, this);
    },
    
    
    
    /**
     * Protected method that will not generally be called directly. It triggers
     * a toolbar update by reading the markup state of the current selection in the editor.
     */
    updateToolbar: function(editor,ev,sel){

        //Roo.log(ev);
        // capture mouse up - this is handy for selecting images..
        // perhaps should go somewhere else...
        if(!this.editor.activated){
             this.editor.onFirstFocus();
            return;
        }
        
        // http://developer.yahoo.com/yui/docs/simple-editor.js.html
        // selectNode - might want to handle IE?
        if (ev &&
            (ev.type == 'mouseup' || ev.type == 'click' ) &&
            ev.target && ev.target.tagName == 'IMG') {
            // they have click on an image...
            // let's see if we can change the selection...
            sel = ev.target;
         
              var nodeRange = sel.ownerDocument.createRange();
            try {
                nodeRange.selectNode(sel);
            } catch (e) {
                nodeRange.selectNodeContents(sel);
            }
            //nodeRange.collapse(true);
            var s = editor.win.getSelection();
            s.removeAllRanges();
            s.addRange(nodeRange);
        }  
        
      
        var updateFooter = sel ? false : true;
        
        
        var ans = this.editor.getAllAncestors();
        
        // pick
        var ty= Roo.form.HtmlEditor.ToolbarContext.types;
        
        if (!sel) { 
            sel = ans.length ? (ans[0] ?  ans[0]  : ans[1]) : this.editor.doc.body;
            sel = sel ? sel : this.editor.doc.body;
            sel = sel.tagName.length ? sel : this.editor.doc.body;
            
        }
        // pick a menu that exists..
        var tn = sel.tagName.toUpperCase();
        //sel = typeof(ty[tn]) != 'undefined' ? sel : this.editor.doc.body;
        
        tn = sel.tagName.toUpperCase();
        
        var lastSel = this.tb.selectedNode
        
        this.tb.selectedNode = sel;
        
        // if current menu does not match..
        if ((this.tb.name != tn) || (lastSel != this.tb.selectedNode)) {
                
            this.tb.el.hide();
            ///console.log("show: " + tn);
            this.tb =  typeof(ty[tn]) != 'undefined' ? this.toolbars[tn] : this.toolbars['*'];
            this.tb.el.show();
            // update name
            this.tb.items.first().el.innerHTML = tn + ':&nbsp;';
            
            
            // update attributes
            if (this.tb.fields) {
                this.tb.fields.each(function(e) {
                    if (e.stylename) {
                        e.setValue(sel.style[e.stylename]);
                        return;
                    } 
                   e.setValue(sel.getAttribute(e.attrname));
                });
            }
            
            var hasStyles = false;
            for(var i in this.styles) {
                hasStyles = true;
                break;
            }
            
            // update styles
            if (hasStyles) { 
                var st = this.tb.fields.item(0);
                
                st.store.removeAll();
               
                
                var cn = sel.className.split(/\s+/);
                
                var avs = [];
                if (this.styles['*']) {
                    
                    Roo.each(this.styles['*'], function(v) {
                        avs.push( [ v , cn.indexOf(v) > -1 ? 1 : 0 ] );         
                    });
                }
                if (this.styles[tn]) { 
                    Roo.each(this.styles[tn], function(v) {
                        avs.push( [ v , cn.indexOf(v) > -1 ? 1 : 0 ] );         
                    });
                }
                
                st.store.loadData(avs);
                st.collapse();
                st.setValue(cn);
            }
            // flag our selected Node.
            this.tb.selectedNode = sel;
           
           
            Roo.menu.MenuMgr.hideAll();

        }
        
        if (!updateFooter) {
            //this.footDisp.dom.innerHTML = ''; 
            return;
        }
        // update the footer
        //
        var html = '';
        
        this.footerEls = ans.reverse();
        Roo.each(this.footerEls, function(a,i) {
            if (!a) { return; }
            html += html.length ? ' &gt; '  :  '';
            
            html += '<span class="x-ed-loc-' + i + '">' + a.tagName + '</span>';
            
        });
       
        // 
        var sz = this.footDisp.up('td').getSize();
        this.footDisp.dom.style.width = (sz.width -10) + 'px';
        this.footDisp.dom.style.marginLeft = '5px';
        
        this.footDisp.dom.style.overflow = 'hidden';
        
        this.footDisp.dom.innerHTML = html;
            
        //this.editorsyncValue();
    },
     
    
   
       
    // private
    onDestroy : function(){
        if(this.rendered){
            
            this.tb.items.each(function(item){
                if(item.menu){
                    item.menu.removeAll();
                    if(item.menu.el){
                        item.menu.el.destroy();
                    }
                }
                item.destroy();
            });
             
        }
    },
    onFirstFocus: function() {
        // need to do this for all the toolbars..
        this.tb.items.each(function(item){
           item.enable();
        });
    },
    buildToolbar: function(tlist, nm)
    {
        var editor = this.editor;
         // create a new element.
        var wdiv = editor.wrap.createChild({
                tag: 'div'
            }, editor.wrap.dom.firstChild.nextSibling, true);
        
       
        var tb = new Roo.Toolbar(wdiv);
        // add the name..
        
        tb.add(nm+ ":&nbsp;");
        
        var styles = [];
        for(var i in this.styles) {
            styles.push(i);
        }
        
        // styles...
        if (styles && styles.length) {
            
            // this needs a multi-select checkbox...
            tb.addField( new Roo.form.ComboBox({
                store: new Roo.data.SimpleStore({
                    id : 'val',
                    fields: ['val', 'selected'],
                    data : [] 
                }),
                name : '-roo-edit-className',
                attrname : 'className',
                displayField: 'val',
                typeAhead: false,
                mode: 'local',
                editable : false,
                triggerAction: 'all',
                emptyText:'Select Style',
                selectOnFocus:true,
                width: 130,
                listeners : {
                    'select': function(c, r, i) {
                        // initial support only for on class per el..
                        tb.selectedNode.className =  r ? r.get('val') : '';
                        editor.syncValue();
                    }
                }
    
            }));
        }
        
        var tbc = Roo.form.HtmlEditor.ToolbarContext;
        var tbops = tbc.options;
        
        for (var i in tlist) {
            
            var item = tlist[i];
            tb.add(item.title + ":&nbsp;");
            
            
            //optname == used so you can configure the options available..
            var opts = item.opts ? item.opts : false;
            if (item.optname) {
                opts = tbops[item.optname];
           
            }
            
            if (opts) {
                // opts == pulldown..
                tb.addField( new Roo.form.ComboBox({
                    store:   typeof(tbc.stores[i]) != 'undefined' ?  Roo.factory(tbc.stores[i],Roo.data) : new Roo.data.SimpleStore({
                        id : 'val',
                        fields: ['val', 'display'],
                        data : opts  
                    }),
                    name : '-roo-edit-' + i,
                    attrname : i,
                    stylename : item.style ? item.style : false,
                    displayField: item.displayField ? item.displayField : 'val',
                    valueField :  'val',
                    typeAhead: false,
                    mode: typeof(tbc.stores[i]) != 'undefined'  ? 'remote' : 'local',
                    editable : false,
                    triggerAction: 'all',
                    emptyText:'Select',
                    selectOnFocus:true,
                    width: item.width ? item.width  : 130,
                    listeners : {
                        'select': function(c, r, i) {
                            if (c.stylename) {
                                tb.selectedNode.style[c.stylename] =  r.get('val');
                                return;
                            }
                            tb.selectedNode.setAttribute(c.attrname, r.get('val'));
                        }
                    }

                }));
                continue;
                    
                 
                
                tb.addField( new Roo.form.TextField({
                    name: i,
                    width: 100,
                    //allowBlank:false,
                    value: ''
                }));
                continue;
            }
            tb.addField( new Roo.form.TextField({
                name: '-roo-edit-' + i,
                attrname : i,
                
                width: item.width,
                //allowBlank:true,
                value: '',
                listeners: {
                    'change' : function(f, nv, ov) {
                        tb.selectedNode.setAttribute(f.attrname, nv);
                    }
                }
            }));
             
        }
        tb.addFill();
        var _this = this;
        tb.addButton( {
            text: 'Remove Tag',
    
            listeners : {
                click : function ()
                {
                    // remove
                    // undo does not work.
                     
                    var sn = tb.selectedNode;
                    
                    var pn = sn.parentNode;
                    
                    var stn =  sn.childNodes[0];
                    var en = sn.childNodes[sn.childNodes.length - 1 ];
                    while (sn.childNodes.length) {
                        var node = sn.childNodes[0];
                        sn.removeChild(node);
                        //Roo.log(node);
                        pn.insertBefore(node, sn);
                        
                    }
                    pn.removeChild(sn);
                    var range = editor.createRange();
        
                    range.setStart(stn,0);
                    range.setEnd(en,0); //????
                    //range.selectNode(sel);
                    
                    
                    var selection = editor.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    
                    
                    
                    //_this.updateToolbar(null, null, pn);
                    _this.updateToolbar(null, null, null);
                    _this.footDisp.dom.innerHTML = ''; 
                }
            }
            
                    
                
            
        });
        
        
        tb.el.on('click', function(e){
            e.preventDefault(); // what does this do?
        });
        tb.el.setVisibilityMode( Roo.Element.DISPLAY);
        tb.el.hide();
        tb.name = nm;
        // dont need to disable them... as they will get hidden
        return tb;
         
        
    },
    buildFooter : function()
    {
        
        var fel = this.editor.wrap.createChild();
        this.footer = new Roo.Toolbar(fel);
        // toolbar has scrolly on left / right?
        var footDisp= new Roo.Toolbar.Fill();
        var _t = this;
        this.footer.add(
            {
                text : '&lt;',
                xtype: 'Button',
                handler : function() {
                    _t.footDisp.scrollTo('left',0,true)
                }
            }
        );
        this.footer.add( footDisp );
        this.footer.add( 
            {
                text : '&gt;',
                xtype: 'Button',
                handler : function() {
                    // no animation..
                    _t.footDisp.select('span').last().scrollIntoView(_t.footDisp,true);
                }
            }
        );
        var fel = Roo.get(footDisp.el);
        fel.addClass('x-editor-context');
        this.footDispWrap = fel; 
        this.footDispWrap.overflow  = 'hidden';
        
        this.footDisp = fel.createChild();
        this.footDispWrap.on('click', this.onContextClick, this)
        
        
    },
    onContextClick : function (ev,dom)
    {
        ev.preventDefault();
        var  cn = dom.className;
        //Roo.log(cn);
        if (!cn.match(/x-ed-loc-/)) {
            return;
        }
        var n = cn.split('-').pop();
        var ans = this.footerEls;
        var sel = ans[n];
        
         // pick
        var range = this.editor.createRange();
        
        range.selectNodeContents(sel);
        //range.selectNode(sel);
        
        
        var selection = this.editor.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        
        
        this.updateToolbar(null, null, sel);
        
        
    }
    
    
    
    
    
});





