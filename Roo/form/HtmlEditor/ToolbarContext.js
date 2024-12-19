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
    'IMG' : [
        {
            name : 'width',
            title: "Width",
            width: 40
        },
        {
            name : 'height',
            title: "Height",
            width: 40
        },
        {
            name : 'align',
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        {
            name : 'border',
            title: "Border",
            width: 40
        },
        {
            name : 'alt',
            title: "Alt",
            width: 120
        },
        {
            name : 'src',
            title: "Src",
            width: 220
        }
        
    ],
    
    'FIGURE' : [
        {
            name : 'align',
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80  
        }
    ],
    'A' : [
        {
            name : 'name',
            title: "Name",
            width: 50
        },
        {
            name : 'target',
            title: "Target",
            width: 120
        },
        {
            name : 'href',
            title: "Href",
            width: 220
        } // border?
        
    ],
    
    'INPUT' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'value',
            title: "Value",
            width: 120
        },
        {
            name : 'width',
            title: "Width",
            width: 40
        }
    ],
    'LABEL' : [
         {
            name : 'for',
            title: "For",
            width: 120
        }
    ],
    'TEXTAREA' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'rows',
            title: "Rows",
            width: 20
        },
        {
            name : 'cols',
            title: "Cols",
            width: 20
        }
    ],
    'SELECT' : [
        {
            name : 'name',
            title: "name",
            width: 120
        },
        {
            name : 'selectoptions',
            title: "Options",
            width: 200
        }
    ],
    
    // should we really allow this??
    // should this just be 
    'BODY' : [
        
        {
            name : 'title',
            title: "Title",
            width: 200,
            disabled : true
        }
    ],
 
    '*' : [
        // empty.
    ]

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
 

//Roo.form.HtmlEditor.ToolbarContext.types


Roo.apply(Roo.form.HtmlEditor.ToolbarContext.prototype,  {
    
    tb: false,
    
    rendered: false,
    
    editor : false,
    editorcore : false,
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
                scope: editorcore, // was editor...
                handler:handler||editorcore.relayBtnCmd,
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
        // block toolbars are built in updateToolbar when needed.
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
     *
     * Note you can force an update by calling on('editorevent', scope, false)
     */
    updateToolbar: function(editor ,ev, sel)
    {
        
        if (ev) {
            ev.stopEvent(); // se if we can stop this looping with mutiple events.
        }
        
        //Roo.log(ev);
        // capture mouse up - this is handy for selecting images..
        // perhaps should go somewhere else...
        if(!this.editorcore.activated){
             this.editor.onFirstFocus();
            return;
        }
        //Roo.log(ev ? ev.target : 'NOTARGET');
        
        
        // http://developer.yahoo.com/yui/docs/simple-editor.js.html
        // selectNode - might want to handle IE?
        
        
        
        if (ev &&
            (ev.type == 'mouseup' || ev.type == 'click' ) &&
            ev.target && ev.target.tagName != 'BODY' ) { // && ev.target.tagName == 'IMG') {
            // they have click on an image...
            // let's see if we can change the selection...
            sel = ev.target;
            
            // this triggers looping?
            //this.editorcore.selectNode(sel);
             
        }
        
        // this forces an id..
        Array.from(this.editorcore.doc.body.querySelectorAll('.roo-ed-selection')).forEach(function(e) {
             e.classList.remove('roo-ed-selection');
        });
        //Roo.select('.roo-ed-selection', false, this.editorcore.doc).removeClass('roo-ed-selection');
        //Roo.get(node).addClass('roo-ed-selection');
      
        //var updateFooter = sel ? false : true; 
        
        
        var ans = this.editorcore.getAllAncestors();
        
        // pick
        var ty = Roo.form.HtmlEditor.ToolbarContext.types;
        
        if (!sel) { 
            sel = ans.length ? (ans[0] ?  ans[0]  : ans[1]) : this.editorcore.doc.body;
            sel = sel ? sel : this.editorcore.doc.body;
            sel = sel.tagName.length ? sel : this.editorcore.doc.body;
            
        }
        
        var tn = sel.tagName.toUpperCase();
        var lastSel = this.tb.selectedNode;
        this.tb.selectedNode = sel;
        var left_label = tn;
        
        // ok see if we are editing a block?
        
        var db = false;
        // you are not actually selecting the block.
        if (sel && sel.hasAttribute('data-block')) {
            db = sel;
        } else if (sel && sel.closest('[data-block]')) {
            
            db = sel.closest('[data-block]');
            //var cepar = sel.closest('[contenteditable=true]');
            //if (db && cepar && cepar.tagName != 'BODY') {
            //   db = false; // we are inside an editable block.. = not sure how we are going to handle nested blocks!?
            //}   
        }
        
        
        var block = false;
        //if (db && !sel.hasAttribute('contenteditable') && sel.getAttribute('contenteditable') != 'true' ) {
        if (db && this.editorcore.enableBlocks) {
            block = Roo.htmleditor.Block.factory(db);
            
            
            if (block) {
                 db.className = (
                        db.classList.length > 0  ? db.className + ' ' : ''
                    )  + 'roo-ed-selection';
                 
                 // since we removed it earlier... its not there..
                tn = 'BLOCK.' + db.getAttribute('data-block');
                
                //this.editorcore.selectNode(db);
                if (typeof(this.toolbars[tn]) == 'undefined') {
                   this.toolbars[tn] = this.buildToolbar( false  ,tn ,block.friendly_name, block);
                }
                this.toolbars[tn].selectedNode = db;
                left_label = block.friendly_name;
                ans = this.editorcore.getAllAncestors();
            }
            
                
            
        }
        
        
        if (this.tb.name == tn && lastSel == this.tb.selectedNode && ev !== false) {
            return; // no change?
        }
        
        
          
        this.tb.el.hide();
        ///console.log("show: " + tn);
        this.tb =  typeof(this.toolbars[tn]) != 'undefined' ? this.toolbars[tn] : this.toolbars['*'];
        
        this.tb.el.show();
        // update name
        this.tb.items.first().el.innerHTML = left_label + ':&nbsp;';
        
        Roo.log('UPDATE TOOLBAR');
        Roo.log(block);
        Roo.log(this.tb);
        
        // update attributes
        if (block && this.tb.fields) {
             
            this.tb.fields.each(function(e) {
                e.setValue(block[e.name]);
            });
            
            
        } else  if (this.tb.fields && this.tb.selectedNode) {
            this.tb.fields.each( function(e) {
                if (e.stylename) {
                    e.setValue(this.tb.selectedNode.style[e.stylename]);
                    return;
                } 
                e.setValue(this.tb.selectedNode.getAttribute(e.attrname));
            }, this);
            this.updateToolbarStyles(this.tb.selectedNode);  
        }
        
        
       
        Roo.menu.MenuMgr.hideAll();

        
        
    
        // update the footer
        //
        this.updateFooter(ans);
             
    },
    
    updateToolbarStyles : function(sel)
    {
        var hasStyles = false;
        for(var i in this.styles) {
            hasStyles = true;
            break;
        }
        
        // update styles
        if (hasStyles && this.tb.hasStyles) { 
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
    },
    
     
    updateFooter : function(ans)
    {
        var html = '';
        if (ans === false) {
            this.footDisp.dom.innerHTML = '';
            return;
        }
        
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
    buildToolbar: function(tlist, nm, friendly_name, block)
    {
        var editor = this.editor;
        var editorcore = this.editorcore;
         // create a new element.
        var wdiv = editor.wrap.createChild({
                tag: 'div'
            }, editor.wrap.dom.firstChild.nextSibling, true);
        
       
        var tb = new Roo.Toolbar(wdiv);
        ///this.tb = tb; // << this sets the active toolbar..
        if (tlist === false && block) {
            tlist = block.contextMenu(this);
        }
        
        tb.hasStyles = false;
        tb.name = nm;
        
        tb.add((typeof(friendly_name) == 'undefined' ? nm : friendly_name) + ":&nbsp;");
        
        var styles = Array.from(this.styles);
        
        
        // styles...
        if (styles && styles.length) {
            tb.hasStyles = true;
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
                        editorcore.syncValue();
                    }
                }
    
            }));
        }
        
        var tbc = Roo.form.HtmlEditor.ToolbarContext;
        
        
        for (var i = 0; i < tlist.length; i++) {
            
            // newer versions will use xtype cfg to create menus.
            if (typeof(tlist[i].xtype) != 'undefined') {
                
                tb[typeof(tlist[i].name)== 'undefined' ? 'add' : 'addField'](Roo.factory(tlist[i]));
                
                
                continue;
            }
            
            var item = tlist[i];
            tb.add(item.title + ":&nbsp;");
            
            
            //optname == used so you can configure the options available..
            var opts = item.opts ? item.opts : false;
            if (item.optname) { // use the b
                opts = Roo.form.HtmlEditor.ToolbarContext.options[item.optname];
           
            }
            
            if (opts) {
                // opts == pulldown..
                tb.addField( new Roo.form.ComboBox({
                    store:   typeof(tbc.stores[i]) != 'undefined' ?  Roo.factory(tbc.stores[i],Roo.data) : new Roo.data.SimpleStore({
                        id : 'val',
                        fields: ['val', 'display'],
                        data : opts  
                    }),
                    name : '-roo-edit-' + tlist[i].name,
                    
                    attrname : tlist[i].name,
                    stylename : item.style ? item.style : false,
                    
                    displayField: item.displayField ? item.displayField : 'val',
                    valueField :  'val',
                    typeAhead: false,
                    mode: typeof(tbc.stores[tlist[i].name]) != 'undefined'  ? 'remote' : 'local',
                    editable : false,
                    triggerAction: 'all',
                    emptyText:'Select',
                    selectOnFocus:true,
                    width: item.width ? item.width  : 130,
                    listeners : {
                        'select': function(c, r, i) {
                             
                            
                            if (c.stylename) {
                                tb.selectedNode.style[c.stylename] =  r.get('val');
                                editorcore.syncValue();
                                return;
                            }
                            if (r === false) {
                                tb.selectedNode.removeAttribute(c.attrname);
                                editorcore.syncValue();
                                return;
                            }
                            tb.selectedNode.setAttribute(c.attrname, r.get('val'));
                            editorcore.syncValue();
                        }
                    }

                }));
                continue;
                    
                 
                /*
                tb.addField( new Roo.form.TextField({
                    name: i,
                    width: 100,
                    //allowBlank:false,
                    value: ''
                }));
                continue;
                */
            }
            tb.addField( new Roo.form.TextField({
                name: '-roo-edit-' + tlist[i].name,
                attrname : tlist[i].name,
                
                width: item.width,
                //allowBlank:true,
                value: '',
                listeners: {
                    'change' : function(f, nv, ov) {
                        
                         
                        tb.selectedNode.setAttribute(f.attrname, nv);
                        editorcore.syncValue();
                    }
                }
            }));
             
        }
        
        var _this = this;
        var show_delete = !block || block.deleteTitle !== false;
        if(nm == 'BODY'){
            show_delete = false;
            tb.addSeparator();
        
            tb.addButton( {
                text: 'Stylesheets',

                listeners : {
                    click : function ()
                    {
                        _this.editor.fireEvent('stylesheetsclick', _this.editor);
                    }
                }
            });
        }
        
        tb.addFill();
        if (show_delete) {
            tb.addButton({
                text: block && block.deleteTitle ? block.deleteTitle  : 'Remove Block or Formating', // remove the tag, and puts the children outside...
        
                listeners : {
                    click : function ()
                    {
                        var sn = tb.selectedNode;
                        if (block) {
                            sn = Roo.htmleditor.Block.factory(tb.selectedNode).removeNode();
                            
                        }
                        if (!sn) {
                            return;
                        }
                        var stn =  sn.childNodes[0] || sn.nextSibling || sn.previousSibling || sn.parentNode;
                        if (sn.hasAttribute('data-block')) {
                            stn =  sn.nextSibling || sn.previousSibling || sn.parentNode;
                            sn.parentNode.removeChild(sn);
                            
                        } else if (sn && sn.tagName != 'BODY') {
                            // remove and keep parents.
                            a = new Roo.htmleditor.FilterKeepChildren({tag : false});
                            a.replaceTag(sn);
                        }
                        
                        
                        var range = editorcore.createRange();
            
                        range.setStart(stn,0);
                        range.setEnd(stn,0); 
                        var selection = editorcore.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                        
                        
                        //_this.updateToolbar(null, null, pn);
                        _this.updateToolbar(null, null, null);
                        _this.updateFooter(false);
                        
                    }
                }
                
                        
                    
                
            });
        }    
        
        tb.el.on('click', function(e){
            e.preventDefault(); // what does this do?
        });
        tb.el.setVisibilityMode( Roo.Element.DISPLAY);
        tb.el.hide();
        
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
    // when the footer contect changes
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
        
        this.editorcore.selectNode(sel);
        
        
        this.updateToolbar(null, null, sel);
        
        
    }
    
    
    
    
    
});





