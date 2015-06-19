// <script type="text/javascript">
/*
 * Based on
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *  
 
 */

/**
 * @class Roo.form.HtmlEditorToolbar1
 * Basic Toolbar
 * 
 * Usage:
 *
 new Roo.form.HtmlEditor({
    ....
    toolbars : [
        new Roo.form.HtmlEditorToolbar1({
            disable : { fonts: 1 , format: 1, ..., ... , ...],
            btns : [ .... ]
        })
    }
     
 * 
 * @cfg {Object} disable List of elements to disable..
 * @cfg {Array} btns List of additional buttons.
 * 
 * 
 * NEEDS Extra CSS? 
 * .x-html-editor-tb .x-edit-none .x-btn-text { background: none; }
 */
 
Roo.form.HtmlEditor.ToolbarStandard = function(config)
{
    
    Roo.apply(this, config);
    
    // default disabled, based on 'good practice'..
    this.disable = this.disable || {};
    Roo.applyIf(this.disable, {
        fontSize : true,
        colors : true,
        specialElements : true
    });
    
    
    //Roo.form.HtmlEditorToolbar1.superclass.constructor.call(this, editor.wrap.dom.firstChild, [], config);
    // dont call parent... till later.
}

Roo.apply(Roo.form.HtmlEditor.ToolbarStandard.prototype,  {
    
    tb: false,
    
    rendered: false,
    
    editor : false,
    editorcore : false,
    /**
     * @cfg {Object} disable  List of toolbar elements to disable
         
     */
    disable : false,
    
    
     /**
     * @cfg {String} createLinkText The default text for the create link prompt
     */
    createLinkText : 'Please enter the URL for the link:',
    /**
     * @cfg {String} defaultLinkValue The default value for the create link prompt (defaults to http:/ /)
     */
    defaultLinkValue : 'http:/'+'/',
   
    
      /**
     * @cfg {Array} fontFamilies An array of available font families
     */
    fontFamilies : [
        'Arial',
        'Courier New',
        'Tahoma',
        'Times New Roman',
        'Verdana'
    ],
    
    specialChars : [
           "&#169;",
          "&#174;",     
          "&#8482;",    
          "&#163;" ,    
         // "&#8212;",    
          "&#8230;",    
          "&#247;" ,    
        //  "&#225;" ,     ?? a acute?
           "&#8364;"    , //Euro
       //   "&#8220;"    ,
        //  "&#8221;"    ,
        //  "&#8226;"    ,
          "&#176;"  //   , // degrees

         // "&#233;"     , // e ecute
         // "&#250;"     , // u ecute?
    ],
    
    specialElements : [
        {
            text: "Insert Table",
            xtype: 'MenuItem',
            xns : Roo.Menu,
            ihtml :  '<table><tr><td>Cell</td></tr></table>' 
                
        },
        {    
            text: "Insert Image",
            xtype: 'MenuItem',
            xns : Roo.Menu,
            ihtml : '<img src="about:blank"/>'
            
        }
        
         
    ],
    
    
    inputElements : [ 
            "form", "input:text", "input:hidden", "input:checkbox", "input:radio", "input:password", 
            "input:submit", "input:button", "select", "textarea", "label" ],
    formats : [
        ["p"] ,  
        ["h1"],["h2"],["h3"],["h4"],["h5"],["h6"], 
        ["pre"],[ "code"], 
        ["abbr"],[ "acronym"],[ "address"],[ "cite"],[ "samp"],[ "var"],
        ['div'],['span']
    ],
    
    cleanStyles : [
        "font-size"
    ],
     /**
     * @cfg {String} defaultFont default font to use.
     */
    defaultFont: 'tahoma',
   
    fontSelect : false,
    
    
    formatCombo : false,
    
    init : function(editor)
    {
        this.editor = editor;
        this.editorcore = editor.editorcore ? editor.editorcore : editor;
        var editorcore = this.editorcore;
        
        var _t = this;
        
        var fid = editorcore.frameId;
        var etb = this;
        function btn(id, toggle, handler){
            var xid = fid + '-'+ id ;
            return {
                id : xid,
                cmd : id,
                cls : 'x-btn-icon x-edit-'+id,
                enableToggle:toggle !== false,
                scope: _t, // was editor...
                handler:handler||_t.relayBtnCmd,
                clickEvent:'mousedown',
                tooltip: etb.buttonTips[id] || undefined, ///tips ???
                tabIndex:-1
            };
        }
        
        
        
        var tb = new Roo.Toolbar(editor.wrap.dom.firstChild);
        this.tb = tb;
         // stop form submits
        tb.el.on('click', function(e){
            e.preventDefault(); // what does this do?
        });

        if(!this.disable.font) { // && !Roo.isSafari){
            /* why no safari for fonts 
            editor.fontSelect = tb.el.createChild({
                tag:'select',
                tabIndex: -1,
                cls:'x-font-select',
                html: this.createFontOptions()
            });
            
            editor.fontSelect.on('change', function(){
                var font = editor.fontSelect.dom.value;
                editor.relayCmd('fontname', font);
                editor.deferFocus();
            }, editor);
            
            tb.add(
                editor.fontSelect.dom,
                '-'
            );
            */
            
        };
        if(!this.disable.formats){
            this.formatCombo = new Roo.form.ComboBox({
                store: new Roo.data.SimpleStore({
                    id : 'tag',
                    fields: ['tag'],
                    data : this.formats // from states.js
                }),
                blockFocus : true,
                name : '',
                //autoCreate : {tag: "div",  size: "20"},
                displayField:'tag',
                typeAhead: false,
                mode: 'local',
                editable : false,
                triggerAction: 'all',
                emptyText:'Add tag',
                selectOnFocus:true,
                width:135,
                listeners : {
                    'select': function(c, r, i) {
                        editorcore.insertTag(r.get('tag'));
                        editor.focus();
                    }
                }

            });
            tb.addField(this.formatCombo);
            
        }
        
        if(!this.disable.format){
            tb.add(
                btn('bold'),
                btn('italic'),
                btn('underline')
            );
        };
        if(!this.disable.fontSize){
            tb.add(
                '-',
                
                
                btn('increasefontsize', false, editorcore.adjustFont),
                btn('decreasefontsize', false, editorcore.adjustFont)
            );
        };
        
        
        if(!this.disable.colors){
            tb.add(
                '-', {
                    id:editorcore.frameId +'-forecolor',
                    cls:'x-btn-icon x-edit-forecolor',
                    clickEvent:'mousedown',
                    tooltip: this.buttonTips['forecolor'] || undefined,
                    tabIndex:-1,
                    menu : new Roo.menu.ColorMenu({
                        allowReselect: true,
                        focus: Roo.emptyFn,
                        value:'000000',
                        plain:true,
                        selectHandler: function(cp, color){
                            editorcore.execCmd('forecolor', Roo.isSafari || Roo.isIE ? '#'+color : color);
                            editor.deferFocus();
                        },
                        scope: editorcore,
                        clickEvent:'mousedown'
                    })
                }, {
                    id:editorcore.frameId +'backcolor',
                    cls:'x-btn-icon x-edit-backcolor',
                    clickEvent:'mousedown',
                    tooltip: this.buttonTips['backcolor'] || undefined,
                    tabIndex:-1,
                    menu : new Roo.menu.ColorMenu({
                        focus: Roo.emptyFn,
                        value:'FFFFFF',
                        plain:true,
                        allowReselect: true,
                        selectHandler: function(cp, color){
                            if(Roo.isGecko){
                                editorcore.execCmd('useCSS', false);
                                editorcore.execCmd('hilitecolor', color);
                                editorcore.execCmd('useCSS', true);
                                editor.deferFocus();
                            }else{
                                editorcore.execCmd(Roo.isOpera ? 'hilitecolor' : 'backcolor', 
                                    Roo.isSafari || Roo.isIE ? '#'+color : color);
                                editor.deferFocus();
                            }
                        },
                        scope:editorcore,
                        clickEvent:'mousedown'
                    })
                }
            );
        };
        // now add all the items...
        

        if(!this.disable.alignments){
            tb.add(
                '-',
                btn('justifyleft'),
                btn('justifycenter'),
                btn('justifyright')
            );
        };

        //if(!Roo.isSafari){
            if(!this.disable.links){
                tb.add(
                    '-',
                    btn('createlink', false, this.createLink)    /// MOVE TO HERE?!!?!?!?!
                );
            };

            if(!this.disable.lists){
                tb.add(
                    '-',
                    btn('insertorderedlist'),
                    btn('insertunorderedlist')
                );
            }
            if(!this.disable.sourceEdit){
                tb.add(
                    '-',
                    btn('sourceedit', true, function(btn){
                        Roo.log(this);
                        this.toggleSourceEdit(btn.pressed);
                    })
                );
            }
        //}
        
        var smenu = { };
        // special menu.. - needs to be tidied up..
        if (!this.disable.special) {
            smenu = {
                text: "&#169;",
                cls: 'x-edit-none',
                
                menu : {
                    items : []
                }
            };
            for (var i =0; i < this.specialChars.length; i++) {
                smenu.menu.items.push({
                    
                    html: this.specialChars[i],
                    handler: function(a,b) {
                        editorcore.insertAtCursor(String.fromCharCode(a.html.replace('&#','').replace(';', '')));
                        //editor.insertAtCursor(a.html);
                        
                    },
                    tabIndex:-1
                });
            }
            
            
            tb.add(smenu);
            
            
        }
        
        var cmenu = { };
        if (!this.disable.cleanStyles) {
            cmenu = {
                cls: 'x-btn-icon x-btn-clear',
                
                menu : {
                    items : []
                }
            };
            for (var i =0; i < this.cleanStyles.length; i++) {
                cmenu.menu.items.push({
                    actiontype : this.cleanStyles[i],
                    html: 'Remove ' + this.cleanStyles[i],
                    handler: function(a,b) {
                        Roo.log(a);
                        Roo.log(b);
                        var c = Roo.get(editorcore.doc.body);
                        c.select('[style]').each(function(s) {
                            s.dom.style.removeProperty(a.actiontype);
                        });
                        editorcore.syncValue();
                    },
                    tabIndex:-1
                });
            }
            cmenu.menu.items.push({
                actiontype : 'word',
                html: 'Remove MS Word Formating',
                handler: function(a,b) {
                    editorcore.cleanWord();
                    editorcore.syncValue();
                },
                tabIndex:-1
            });
            
            cmenu.menu.items.push({
                actiontype : 'all',
                html: 'Remove All Styles',
                handler: function(a,b) {
                    
                    var c = Roo.get(editorcore.doc.body);
                    c.select('[style]').each(function(s) {
                        s.dom.removeAttribute('style');
                    });
                    editorcore.syncValue();
                },
                tabIndex:-1
            });
             cmenu.menu.items.push({
                actiontype : 'word',
                html: 'Tidy HTML Source',
                handler: function(a,b) {
                    editorcore.doc.body.innerHTML = editorcore.domToHTML();
                    editorcore.syncValue();
                },
                tabIndex:-1
            });
            
            
            tb.add(cmenu);
        }
         
        if (!this.disable.specialElements) {
            var semenu = {
                text: "Other;",
                cls: 'x-edit-none',
                menu : {
                    items : []
                }
            };
            for (var i =0; i < this.specialElements.length; i++) {
                semenu.menu.items.push(
                    Roo.apply({ 
                        handler: function(a,b) {
                            editor.insertAtCursor(this.ihtml);
                        }
                    }, this.specialElements[i])
                );
                    
            }
            
            tb.add(semenu);
            
            
        }
         
        
        if (this.btns) {
            for(var i =0; i< this.btns.length;i++) {
                var b = Roo.factory(this.btns[i],Roo.form);
                b.cls =  'x-edit-none';
                
                if(typeof(this.btns[i].cls) != 'undefined' && this.btns[i].cls.indexOf('x-init-enable') !== -1){
                    b.cls += ' x-init-enable';
                }
                
                b.scope = editorcore;
                tb.add(b);
            }
        
        }
        
        
        
        // disable everything...
        
        this.tb.items.each(function(item){
            if((typeof(item.cls) != 'undefined' && item.cls.indexOf('x-init-enable') !== -1)){
                Roo.log('itme!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
                Roo.log(item);
            }
           if(
                item.id != editorcore.frameId+ '-sourceedit' || 
                (typeof(item.cls) != 'undefined' && item.cls.indexOf('x-init-enable') === -1)
            ){
                
                item.disable();
            }
        });
        this.rendered = true;
        
        // the all the btns;
        editor.on('editorevent', this.updateToolbar, this);
        // other toolbars need to implement this..
        //editor.on('editmodechange', this.updateToolbar, this);
    },
    
    
    relayBtnCmd : function(btn) {
        this.editorcore.relayCmd(btn.cmd);
    },
    // private used internally
    createLink : function(){
        Roo.log("create link?");
        var url = prompt(this.createLinkText, this.defaultLinkValue);
        if(url && url != 'http:/'+'/'){
            this.editorcore.relayCmd('createlink', url);
        }
    },

    
    /**
     * Protected method that will not generally be called directly. It triggers
     * a toolbar update by reading the markup state of the current selection in the editor.
     */
    updateToolbar: function(){

        if(!this.editorcore.activated){
            this.editor.onFirstFocus();
            return;
        }

        var btns = this.tb.items.map, 
            doc = this.editorcore.doc,
            frameId = this.editorcore.frameId;

        if(!this.disable.font && !Roo.isSafari){
            /*
            var name = (doc.queryCommandValue('FontName')||this.editor.defaultFont).toLowerCase();
            if(name != this.fontSelect.dom.value){
                this.fontSelect.dom.value = name;
            }
            */
        }
        if(!this.disable.format){
            btns[frameId + '-bold'].toggle(doc.queryCommandState('bold'));
            btns[frameId + '-italic'].toggle(doc.queryCommandState('italic'));
            btns[frameId + '-underline'].toggle(doc.queryCommandState('underline'));
        }
        if(!this.disable.alignments){
            btns[frameId + '-justifyleft'].toggle(doc.queryCommandState('justifyleft'));
            btns[frameId + '-justifycenter'].toggle(doc.queryCommandState('justifycenter'));
            btns[frameId + '-justifyright'].toggle(doc.queryCommandState('justifyright'));
        }
        if(!Roo.isSafari && !this.disable.lists){
            btns[frameId + '-insertorderedlist'].toggle(doc.queryCommandState('insertorderedlist'));
            btns[frameId + '-insertunorderedlist'].toggle(doc.queryCommandState('insertunorderedlist'));
        }
        
        var ans = this.editorcore.getAllAncestors();
        if (this.formatCombo) {
            
            
            var store = this.formatCombo.store;
            this.formatCombo.setValue("");
            for (var i =0; i < ans.length;i++) {
                if (ans[i] && store.query('tag',ans[i].tagName.toLowerCase(), false).length) {
                    // select it..
                    this.formatCombo.setValue(ans[i].tagName.toLowerCase());
                    break;
                }
            }
        }
        
        
        
        // hides menus... - so this cant be on a menu...
        Roo.menu.MenuMgr.hideAll();

        //this.editorsyncValue();
    },
   
    
    createFontOptions : function(){
        var buf = [], fs = this.fontFamilies, ff, lc;
        
        
        
        for(var i = 0, len = fs.length; i< len; i++){
            ff = fs[i];
            lc = ff.toLowerCase();
            buf.push(
                '<option value="',lc,'" style="font-family:',ff,';"',
                    (this.defaultFont == lc ? ' selected="true">' : '>'),
                    ff,
                '</option>'
            );
        }
        return buf.join('');
    },
    
    toggleSourceEdit : function(sourceEditMode){
        
        Roo.log("toolbar toogle");
        if(sourceEditMode === undefined){
            sourceEditMode = !this.sourceEditMode;
        }
        this.sourceEditMode = sourceEditMode === true;
        var btn = this.tb.items.get(this.editorcore.frameId +'-sourceedit');
        // just toggle the button?
        if(btn.pressed !== this.sourceEditMode){
            btn.toggle(this.sourceEditMode);
            return;
        }
        
        if(sourceEditMode){
            Roo.log("disabling buttons");
            this.tb.items.each(function(item){
                if(item.cmd != 'sourceedit'){
                    item.disable();
                }
            });
          
        }else{
            Roo.log("enabling buttons");
            if(this.editorcore.initialized){
                this.tb.items.each(function(item){
                    item.enable();
                });
            }
            
        }
        Roo.log("calling toggole on editor");
        // tell the editor that it's been pressed..
        this.editor.toggleSourceEdit(sourceEditMode);
       
    },
     /**
     * Object collection of toolbar tooltips for the buttons in the editor. The key
     * is the command id associated with that button and the value is a valid QuickTips object.
     * For example:
<pre><code>
{
    bold : {
        title: 'Bold (Ctrl+B)',
        text: 'Make the selected text bold.',
        cls: 'x-html-editor-tip'
    },
    italic : {
        title: 'Italic (Ctrl+I)',
        text: 'Make the selected text italic.',
        cls: 'x-html-editor-tip'
    },
    ...
</code></pre>
    * @type Object
     */
    buttonTips : {
        bold : {
            title: 'Bold (Ctrl+B)',
            text: 'Make the selected text bold.',
            cls: 'x-html-editor-tip'
        },
        italic : {
            title: 'Italic (Ctrl+I)',
            text: 'Make the selected text italic.',
            cls: 'x-html-editor-tip'
        },
        underline : {
            title: 'Underline (Ctrl+U)',
            text: 'Underline the selected text.',
            cls: 'x-html-editor-tip'
        },
        increasefontsize : {
            title: 'Grow Text',
            text: 'Increase the font size.',
            cls: 'x-html-editor-tip'
        },
        decreasefontsize : {
            title: 'Shrink Text',
            text: 'Decrease the font size.',
            cls: 'x-html-editor-tip'
        },
        backcolor : {
            title: 'Text Highlight Color',
            text: 'Change the background color of the selected text.',
            cls: 'x-html-editor-tip'
        },
        forecolor : {
            title: 'Font Color',
            text: 'Change the color of the selected text.',
            cls: 'x-html-editor-tip'
        },
        justifyleft : {
            title: 'Align Text Left',
            text: 'Align text to the left.',
            cls: 'x-html-editor-tip'
        },
        justifycenter : {
            title: 'Center Text',
            text: 'Center text in the editor.',
            cls: 'x-html-editor-tip'
        },
        justifyright : {
            title: 'Align Text Right',
            text: 'Align text to the right.',
            cls: 'x-html-editor-tip'
        },
        insertunorderedlist : {
            title: 'Bullet List',
            text: 'Start a bulleted list.',
            cls: 'x-html-editor-tip'
        },
        insertorderedlist : {
            title: 'Numbered List',
            text: 'Start a numbered list.',
            cls: 'x-html-editor-tip'
        },
        createlink : {
            title: 'Hyperlink',
            text: 'Make the selected text a hyperlink.',
            cls: 'x-html-editor-tip'
        },
        sourceedit : {
            title: 'Source Edit',
            text: 'Switch to source editing mode.',
            cls: 'x-html-editor-tip'
        }
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
        this.tb.items.each(function(item){
           item.enable();
        });
    }
});




