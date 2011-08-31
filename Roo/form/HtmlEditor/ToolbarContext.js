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
        new Roo.form.HtmlEditor.ToolbarStandard(),
        new Roo.form.HtmlEditor.ToolbarContext()
        })
    }
     
 * 
 * @config : {Object} disable List of elements to disable.. (not done yet.)
 * 
 * 
 */

Roo.form.HtmlEditor.ToolbarContext = function(config)
{
    
    Roo.apply(this, config);
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
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
            title: "title",
            width: 200,
            disabled : true
        }
    },
    '*' : {
        // empty..
    }
};



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
    
    
    
    toolbars : false,
    
    init : function(editor)
    {
        this.editor = editor;
        
        
        var fid = editor.frameId;
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
    updateToolbar: function(ignore_a,ignore_b,sel){

        
        if(!this.editor.activated){
             this.editor.onFirstFocus();
            return;
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
        
        // if current menu does not match..
        if (this.tb.name != tn) {
                
            this.tb.el.hide();
            ///console.log("show: " + tn);
            this.tb =  typeof(ty[tn]) != 'undefined' ? this.toolbars[tn] : this.toolbars['*'];
            this.tb.el.show();
           
            this.tb.items.first().el.innerHTML = tn + ':&nbsp;';
            if (this.tb.fields) {
                this.tb.fields.each(function(e) {
                   e.setValue(sel.getAttribute(e.name));
                });
            }
            this.tb.selectedNode = sel;
           
           
            Roo.menu.MenuMgr.hideAll();

        }
        
        if (!updateFooter) {
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
        
        // styles...
        if (this.styles) {
            
            // this needs a multi-select checkbox...
            tb.addField( new Roo.form.ComboBox({
                store: new Roo.data.SimpleStore({
                    id : 'val',
                    fields: ['val', 'selected'],
                    data : [] 
                }),
                name : 'className',
                displayField:'val',
                typeAhead: false,
                mode: 'local',
                editable : false,
                triggerAction: 'all',
                emptyText:'Select Class',
                selectOnFocus:true,
                width: 130,
                listeners : {
                    'select': function(c, r, i) {
                        // initial support only for on class per el..
                        tb.selectedNode.className =  r.get('val');
                    }
                }
    
            }));
        }
            
        
        
        for (var i in tlist) {
            
            var item = tlist[i];
            tb.add(item.title + ":&nbsp;");
            
            
            
            
            if (item.opts) {
                // opts == pulldown..
                tb.addField( new Roo.form.ComboBox({
                    store: new Roo.data.SimpleStore({
                        id : 'val',
                        fields: ['val'],
                        data : item.opts  
                    }),
                    name : i,
                    displayField:'val',
                    typeAhead: false,
                    mode: 'local',
                    editable : false,
                    triggerAction: 'all',
                    emptyText:'Select',
                    selectOnFocus:true,
                    width: item.width ? item.width  : 130,
                    listeners : {
                        'select': function(c, r, i) {
                            tb.selectedNode.setAttribute(c.name, r.get('val'));
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
                name: i,
                width: item.width,
                //allowBlank:true,
                value: '',
                listeners: {
                    'change' : function(f, nv, ov) {
                        tb.selectedNode.setAttribute(f.name, nv);
                    }
                }
            }));
             
        }
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
        Roo.log(cn);
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





