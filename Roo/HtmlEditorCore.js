//<script type="text/javascript">

/*
 * Based  Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * LGPL
 *
 */
 
/**
 * @class Roo.HtmlEditorCore
 * @extends Roo.Component
 * Provides a the editing component for the HTML editors in Roo. (bootstrap and Roo.form)
 *
 * any element that has display set to 'none' can cause problems in Safari and Firefox.<br/><br/>
 */

Roo.HtmlEditorCore = function(config){
    
    
    Roo.HtmlEditorCore.superclass.constructor.call(this, config);
    
    
    this.addEvents({
        /**
         * @event initialize
         * Fires when the editor is fully initialized (including the iframe)
         * @param {Roo.HtmlEditorCore} this
         */
        initialize: true,
        /**
         * @event activate
         * Fires when the editor is first receives the focus. Any insertion must wait
         * until after this event.
         * @param {Roo.HtmlEditorCore} this
         */
        activate: true,
         /**
         * @event beforesync
         * Fires before the textarea is updated with content from the editor iframe. Return false
         * to cancel the sync.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        beforesync: true,
         /**
         * @event beforepush
         * Fires before the iframe editor is updated with content from the textarea. Return false
         * to cancel the push.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        beforepush: true,
         /**
         * @event sync
         * Fires when the textarea is updated with content from the editor iframe.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        sync: true,
         /**
         * @event push
         * Fires when the iframe editor is updated with content from the textarea.
         * @param {Roo.HtmlEditorCore} this
         * @param {String} html
         */
        push: true,
        
        /**
         * @event editorevent
         * Fires when on any editor (mouse up/down cursor movement etc.) - used for toolbar hooks.
         * @param {Roo.HtmlEditorCore} this
         */
        editorevent: true 
        
        
    });
    
    // at this point this.owner is set, so we can start working out the whitelisted / blacklisted elements
    
    // defaults : white / black...
    this.applyBlacklists();
    
    
    
};


Roo.extend(Roo.HtmlEditorCore, Roo.Component,  {


     /**
     * @cfg {Roo.form.HtmlEditor|Roo.bootstrap.HtmlEditor} the owner field 
     */
    
    owner : false,
    
     /**
     * @cfg {String} css styling for resizing. (used on bootstrap only)
     */
    resize : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: 500,
     /**
     * @cfg {boolean} autoClean - default true - loading and saving will remove quite a bit of formating,
     *         if you are doing an email editor, this probably needs disabling, it's designed
     */
    autoClean: true,
    
    /**
     * @cfg {boolean} enableBlocks - default true - if the block editor (table and figure should be enabled)
     */
    enableBlocks : true,
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets.
     * 
     */
    stylesheets: false,
     /**
     * @cfg {String} language default en - language of text (usefull for rtl languages)
     * 
     */
    language: 'en',
    
    /**
     * @cfg {boolean} allowComments - default false - allow comments in HTML source
     *          - by default they are stripped - if you are editing email you may need this.
     */
    allowComments: false,
    // id of frame..
    frameId: false,
    
    // private properties
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    sourceEditMode : false,
    onFocus : Roo.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    
    clearUp: true,
    
    // blacklist + whitelisted elements..
    black: false,
    white: false,
     
    bodyCls : '',

    
    undoManager : false,
    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor initializes the iframe with HTML contents. Override this method if you
     * want to change the initialization markup of the iframe (e.g. to add stylesheets).
     */
    getDocMarkup : function(){
        // body styles..
        var st = '';
        
        // inherit styels from page...?? 
        if (this.stylesheets === false) {
            
            Roo.get(document.head).select('style').each(function(node) {
                st += node.dom.outerHTML || new XMLSerializer().serializeToString(node.dom);
            });
            
            Roo.get(document.head).select('link').each(function(node) { 
                st += node.dom.outerHTML || new XMLSerializer().serializeToString(node.dom);
            });
            
        } else if (!this.stylesheets.length) {
                // simple..
                st = '<style type="text/css">' +
                    'body{border:0;margin:0;padding:3px;height:98%;cursor:text;}' +
                   '</style>';
        } else {
            for (var i in this.stylesheets) {
                if (typeof(this.stylesheets[i]) != 'string') {
                    continue;
                }
                st += '<link rel="stylesheet" href="' + this.stylesheets[i] +'" type="text/css">';
            }
            
        }
        
        st +=  '<style type="text/css">' +
            'IMG { cursor: pointer } ' +
        '</style>';
        
        st += '<meta name="google" content="notranslate">';
        
        var cls = 'notranslate roo-htmleditor-body';
        
        if(this.bodyCls.length){
            cls += ' ' + this.bodyCls;
        }
        
        return '<html  class="notranslate" translate="no"><head>' + st  +
            //<style type="text/css">' +
            //'body{border:0;margin:0;padding:3px;height:98%;cursor:text;}' +
            //'</style>' +
            ' </head><body contenteditable="true" data-enable-grammerly="true" class="' +  cls + '"></body></html>';
    },

    // private
    onRender : function(ct, position)
    {
        var _t = this;
        //Roo.HtmlEditorCore.superclass.onRender.call(this, ct, position);
        this.el = this.owner.inputEl ? this.owner.inputEl() : this.owner.el;
        
        
        this.el.dom.style.border = '0 none';
        this.el.dom.setAttribute('tabIndex', -1);
        this.el.addClass('x-hidden hide');
        
        
        
        if(Roo.isIE){ // fix IE 1px bogus margin
            this.el.applyStyles('margin-top:-1px;margin-bottom:-1px;')
        }
       
        
        this.frameId = Roo.id();
        
        var ifcfg = {
            tag: 'iframe',
            cls: 'form-control', // bootstrap..
            id: this.frameId,
            name: this.frameId,
            frameBorder : 'no',
            'src' : Roo.SSL_SECURE_URL ? Roo.SSL_SECURE_URL  :  "javascript:false"
        };
        if (this.resize) {
            ifcfg.style = { resize : this.resize };
        }
        
        var iframe = this.owner.wrap.createChild(ifcfg, this.el); 
        
        
        this.iframe = iframe.dom;

        this.assignDocWin();
        
        this.doc.designMode = 'on';
       
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();

        
        var task = { // must defer to wait for browser to be ready
            run : function(){
                //console.log("run task?" + this.doc.readyState);
                this.assignDocWin();
                if(this.doc.body || this.doc.readyState == 'complete'){
                    try {
                        this.doc.designMode="on";
                        
                    } catch (e) {
                        return;
                    }
                    Roo.TaskMgr.stop(task);
                    this.initEditor.defer(10, this);
                }
            },
            interval : 10,
            duration: 10000,
            scope: this
        };
        Roo.TaskMgr.start(task);

    },

    // private
    onResize : function(w, h)
    {
         Roo.log('resize: ' +w + ',' + h );
        //Roo.HtmlEditorCore.superclass.onResize.apply(this, arguments);
        if(!this.iframe){
            return;
        }
        if(typeof w == 'number'){
            
            this.iframe.style.width = w + 'px';
        }
        if(typeof h == 'number'){
            
            this.iframe.style.height = h + 'px';
            if(this.doc){
                (this.doc.body || this.doc.documentElement).style.height = (h - (this.iframePad*2)) + 'px';
            }
        }
        
    },

    /**
     * Toggles the editor between standard and source edit mode.
     * @param {Boolean} sourceEdit (optional) True for source edit, false for standard
     */
    toggleSourceEdit : function(sourceEditMode){
        
        this.sourceEditMode = sourceEditMode === true;
        
        if(this.sourceEditMode){
 
            Roo.get(this.iframe).addClass(['x-hidden','hide', 'd-none']);     //FIXME - what's the BS styles for these
            
        }else{
            Roo.get(this.iframe).removeClass(['x-hidden','hide', 'd-none']);
            //this.iframe.className = '';
            this.deferFocus();
        }
        //this.setSize(this.owner.wrap.getSize());
        //this.fireEvent('editmodechange', this, this.sourceEditMode);
    },

    
  

    /**
     * Protected method that will not generally be called directly. If you need/want
     * custom HTML cleanup, this is the method you should override.
     * @param {String} html The HTML to be cleaned
     * return {String} The cleaned HTML
     */
    cleanHtml : function(html)
    {
        html = String(html);
        if(html.length > 5){
            if(Roo.isSafari){ // strip safari nonsense
                html = html.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi, '');
            }
        }
        if(html == '&nbsp;'){
            html = '';
        }
        return html;
    },

    /**
     * HTML Editor -> Textarea
     * Protected method that will not generally be called directly. Syncs the contents
     * of the editor iframe with the textarea.
     */
    syncValue : function()
    {
        //Roo.log("HtmlEditorCore:syncValue (EDITOR->TEXT)");
        if(this.initialized){
            
            if (this.undoManager) {
                this.undoManager.addEvent();
            }

            
            var bd = (this.doc.body || this.doc.documentElement);
           
            
            var sel = this.win.getSelection();
            
            var div = document.createElement('div');
            div.innerHTML = bd.innerHTML;
            var gtx = div.getElementsByClassName('gtx-trans-icon'); // google translate - really annoying and difficult to get rid of.
            if (gtx.length > 0) {
                var rm = gtx.item(0).parentNode;
                rm.parentNode.removeChild(rm);
            }
            
           
            if (this.enableBlocks) {
                Array.from(bd.getElementsByTagName('img')).forEach(function(img) {
                    var fig = img.closest('figure');
                    if (fig) {
                        var bf = new Roo.htmleditor.BlockFigure({
                            node : fig
                        });
                        bf.updateElement();
                    }
                    
                });
                new Roo.htmleditor.FilterBlock({ node : div });
            }
            
            var html = div.innerHTML;
            
            //?? tidy?
            if (this.autoClean) {
                new Roo.htmleditor.FilterBlack({ node : div, tag : this.black});
                new Roo.htmleditor.FilterAttributes({
                    node : div,
                    attrib_white : [
                            'href',
                            'src',
                            'name',
                            'align',
                            'colspan',
                            'rowspan',
                            'data-display',
                            'data-caption-display',
                            'data-width',
                            'data-caption',
                            'start' ,
                            'style',
                            // youtube embed.
                            'class',
                            'allowfullscreen',
                            'frameborder',
                            'width',
                            'height',
                            'alt'
                            ],
                    attrib_clean : ['href', 'src' ] 
                });
                new Roo.htmleditor.FilterEmpty({ node : div});
                
                var tidy = new Roo.htmleditor.TidySerializer({
                    inner:  true
                });
                html  = tidy.serialize(div);
                
            }
            
            
            if(Roo.isSafari){
                var bs = bd.getAttribute('style'); // Safari puts text-align styles on the body element!
                var m = bs ? bs.match(/text-align:(.*?);/i) : false;
                if(m && m[1]){
                    html = '<div style="'+m[0]+'">' + html + '</div>';
                }
            }
            html = this.cleanHtml(html);
            // fix up the special chars.. normaly like back quotes in word...
            // however we do not want to do this with chinese..
            html = html.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0080-\uFFFF]/g, function(match) {
                
                var cc = match.charCodeAt();

                // Get the character value, handling surrogate pairs
                if (match.length == 2) {
                    // It's a surrogate pair, calculate the Unicode code point
                    var high = match.charCodeAt(0) - 0xD800;
                    var low  = match.charCodeAt(1) - 0xDC00;
                    cc = (high * 0x400) + low + 0x10000;
                }  else if (
                    (cc >= 0x4E00 && cc < 0xA000 ) ||
                    (cc >= 0x3400 && cc < 0x4E00 ) ||
                    (cc >= 0xf900 && cc < 0xfb00 )
                ) {
                        return match;
                }  
         
                // No, use a numeric entity. Here we brazenly (and possibly mistakenly)
                return "&#" + cc + ";";
                
                
            });
            
            
             
            if(this.owner.fireEvent('beforesync', this, html) !== false){
                this.el.dom.value = html;
                this.owner.fireEvent('sync', this, html);
            }
        }
    },

    /**
     * TEXTAREA -> EDITABLE
     * Protected method that will not generally be called directly. Pushes the value of the textarea
     * into the iframe editor.
     */
    pushValue : function()
    {
        //Roo.log("HtmlEditorCore:pushValue (TEXT->EDITOR)");
        if(this.initialized){
            var v = this.el.dom.value.trim();
            
            
            if(this.owner.fireEvent('beforepush', this, v) !== false){
                var d = (this.doc.body || this.doc.documentElement);
                d.innerHTML = v;
                 
                this.el.dom.value = d.innerHTML;
                this.owner.fireEvent('push', this, v);
            }
            if (this.autoClean) {
                new Roo.htmleditor.FilterParagraph({node : this.doc.body}); // paragraphs
                new Roo.htmleditor.FilterSpan({node : this.doc.body}); // empty spans
            }
            if (this.enableBlocks) {
                Roo.htmleditor.Block.initAll(this.doc.body);
            }
            
            this.updateLanguage();
            
            var lc = this.doc.body.lastChild;
            if (lc && lc.nodeType == 1 && lc.getAttribute("contenteditable") == "false") {
                // add an extra line at the end.
                this.doc.body.appendChild(this.doc.createElement('br'));
            }
            
            
        }
    },

    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    // doc'ed in Field
    focus : function(){
        if(this.win && !this.sourceEditMode){
            this.win.focus();
        }else{
            this.el.focus();
        }
    },
    
    assignDocWin: function()
    {
        var iframe = this.iframe;
        
         if(Roo.isIE){
            this.doc = iframe.contentWindow.document;
            this.win = iframe.contentWindow;
        } else {
//            if (!Roo.get(this.frameId)) {
//                return;
//            }
//            this.doc = (iframe.contentDocument || Roo.get(this.frameId).dom.document);
//            this.win = Roo.get(this.frameId).dom.contentWindow;
            
            if (!Roo.get(this.frameId) && !iframe.contentDocument) {
                return;
            }
            
            this.doc = (iframe.contentDocument || Roo.get(this.frameId).dom.document);
            this.win = (iframe.contentWindow || Roo.get(this.frameId).dom.contentWindow);
        }
    },
    
    // private
    initEditor : function(){
        //console.log("INIT EDITOR");
        this.assignDocWin();
        
        
        
        this.doc.designMode="on";
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();
        
        var dbody = (this.doc.body || this.doc.documentElement);
        //var ss = this.el.getStyles('font-size', 'font-family', 'background-image', 'background-repeat');
        // this copies styles from the containing element into thsi one..
        // not sure why we need all of this..
        //var ss = this.el.getStyles('font-size', 'background-image', 'background-repeat');
        
        //var ss = this.el.getStyles( 'background-image', 'background-repeat');
        //ss['background-attachment'] = 'fixed'; // w3c
        dbody.bgProperties = 'fixed'; // ie
        dbody.setAttribute("translate", "no");
        
        //Roo.DomHelper.applyStyles(dbody, ss);
        Roo.EventManager.on(this.doc, {
             
            'mouseup': this.onEditorEvent,
            'dblclick': this.onEditorEvent,
            'click': this.onEditorEvent,
            'keyup': this.onEditorEvent,
            
            buffer:100,
            scope: this
        });
        Roo.EventManager.on(this.doc, {
            'paste': this.onPasteEvent,
            scope : this
        });
        if(Roo.isGecko){
            Roo.EventManager.on(this.doc, 'keypress', this.mozKeyPress, this);
        }
        //??? needed???
        if(Roo.isIE || Roo.isSafari || Roo.isOpera){
            Roo.EventManager.on(this.doc, 'keydown', this.fixKeys, this);
        }
        this.initialized = true;

        
        // initialize special key events - enter
        new Roo.htmleditor.KeyEnter({core : this});
        
         
        
        this.owner.fireEvent('initialize', this);
        this.pushValue();
    },
    // this is to prevent a href clicks resulting in a redirect?
   
    onPasteEvent : function(e,v)
    {
        this.owner.fireEvent('beforepaste', this);
        
        // I think we better assume paste is going to be a dirty load of rubish from word..
        
        // even pasting into a 'email version' of this widget will have to clean up that mess.
        var cd = (e.browserEvent.clipboardData || window.clipboardData);
        
        // check what type of paste - if it's an image, then handle it differently.
        if (cd.files && cd.files.length > 0 && cd.types.indexOf('text/html') < 0) {
            // pasting images? 
            var urlAPI = (window.createObjectURL && window) || 
                (window.URL && URL.revokeObjectURL && URL) || 
                (window.webkitURL && webkitURL);
            
            var r = new FileReader();
            var t = this;
            r.addEventListener('load',function()
            {
                
                var d = (new DOMParser().parseFromString('<img src="' + r.result+ '">', 'text/html')).body;
                // is insert asycn?
                if (t.enableBlocks) {
                    
                    Array.from(d.getElementsByTagName('img')).forEach(function(img) {
                        if (img.closest('figure')) { // assume!! that it's aready
                            return;
                        }
                        var fig  = new Roo.htmleditor.BlockFigure({
                            image_src  : img.src
                        });
                        fig.updateElement(img); // replace it..
                        
                    });
                }
                t.insertAtCursor(d.innerHTML.replace(/&nbsp;/g,' '));
                t.owner.fireEvent('paste', this);
            });
            r.readAsDataURL(cd.files[0]);
            
            e.preventDefault();
            
            return false;
        }
        if (cd.types.indexOf('text/html') < 0 ) {
            return false;
        }

        var html = cd.getData('text/html'); // clipboard event
        
        //Roo.log(html);
        html = this.cleanWordChars(html);

        
        var d = (new DOMParser().parseFromString(html, 'text/html')).body;
        
        var sn = this.getParentElement();
        // check if d contains a table, and prevent nesting??
        //Roo.log(d.getElementsByTagName('table'));
        //Roo.log(sn);
        //Roo.log(sn.closest('table'));
        if (d.getElementsByTagName('table').length && sn && sn.closest('table')) {
            e.preventDefault();
            this.insertAtCursor("You can not nest tables");
            //Roo.log("prevent?"); // fixme - 
            return false;
        }

        var images = [];
        if (cd.types.indexOf('text/rtf') > -1) {
            var parser = new Roo.rtf.Parser(cd.getData('text/rtf'));
            images = parser.doc ? parser.doc.getElementsByType('pict') : [];
        }

        // Roo.log(images);
        // Roo.log(imgs);
        // fixme..
        images = images.filter(function(g) { return !g.path.match(/^rtf\/(head|pgdsctbl|listtable|footerf)/); }) // ignore headers/footers etc.
                       .map(function(g) { return g.toDataURL(); })
                       .filter(function(g) { return g != 'about:blank'; });
        
        
        
        if (images.length > 0) {
            // replace all v:imagedata - with img.
            var ar = Array.from(d.getElementsByTagName('v:imagedata'));
            Roo.each(ar, function(node) {
                node.parentNode.insertBefore(d.ownerDocument.createElement('img'), node );
                node.parentNode.removeChild(node);
            });
            
            
            Roo.each(d.getElementsByTagName('img'), function(img, i) {
                img.setAttribute('src', images[i]);
            });
        }

        if (this.autoClean) {
            new Roo.htmleditor.FilterWord({ node : d });
            new Roo.htmleditor.FilterStyleToTag({ node : d });
            new Roo.htmleditor.FilterAttributes({
                node : d,
                attrib_white : [
                    'href',
                    'src',
                    'name',
                    'align',
                    'colspan',
                    'rowspan' 
                /*  THESE ARE NOT ALLWOED FOR PASTE
                 *    'data-display',
                    'data-caption-display',
                    'data-width',
                    'data-caption',
                    'start' ,
                    'style',
                    // youtube embed.
                    'class',
                    'allowfullscreen',
                    'frameborder',
                    'width',
                    'height',
                    'alt'
                    */
                    ],
                attrib_clean : ['href', 'src' ] 
            });
            new Roo.htmleditor.FilterBlack({ node : d, tag : this.black});
            // should be fonts..
            new Roo.htmleditor.FilterKeepChildren({node : d, tag : [ 'FONT', ':' ]} );
            new Roo.htmleditor.FilterParagraph({ node : d });
            new Roo.htmleditor.FilterHashLink({node : d});
            new Roo.htmleditor.FilterSpan({ node : d });
            new Roo.htmleditor.FilterLongBr({ node : d });
            new Roo.htmleditor.FilterComment({ node : d });
            new Roo.htmleditor.FilterEmpty({ node : d});
            
            
        }
        if (this.enableBlocks) {
                
            Array.from(d.getElementsByTagName('img')).forEach(function(img) {
                if (img.closest('figure')) { // assume!! that it's aready
                    return;
                }
                var fig  = new Roo.htmleditor.BlockFigure({
                    image_src  : img.src
                });
                fig.updateElement(img); // replace it..
                
            });

            Array.from(d.getElementsByTagName('img')).forEach(function(img) {
                var fig = img.closest('figure');
                if(fig) {
                    var parent = fig.parentNode;

                    if(parent.tagName == 'A') {
                        parent.parentNode.insertBefore(fig, parent);
                        parent.parentNode.removeChild(parent);
                    }
                }
                
            });
        }
        
        
        this.insertAtCursor(d.innerHTML.replace(/&nbsp;/g,' '));
        if (this.enableBlocks) {
            Roo.htmleditor.Block.initAll(this.doc.body);
        }
         
        
        e.preventDefault();
        this.owner.fireEvent('paste', this);
        return false;
        // default behaveiour should be our local cleanup paste? (optional?)
        // for simple editor - we want to hammer the paste and get rid of everything... - so over-rideable..
        //this.owner.fireEvent('paste', e, v);
    },

    // private
    onDestroy : function(){
        
        
        
        if(this.rendered){
            
            //for (var i =0; i < this.toolbars.length;i++) {
            //    // fixme - ask toolbars for heights?
            //    this.toolbars[i].onDestroy();
           // }
            
            //this.wrap.dom.innerHTML = '';
            //this.wrap.remove();
        }
    },

    // private
    onFirstFocus : function(){
        
        this.assignDocWin();
        this.undoManager = new Roo.lib.UndoManager(100,(this.doc.body || this.doc.documentElement));
        
        this.activated = true;
         
    
        if(Roo.isGecko){ // prevent silly gecko errors
            this.win.focus();
            var s = this.win.getSelection();
            if(!s.focusNode || s.focusNode.nodeType != 3){
                var r = s.getRangeAt(0);
                r.selectNodeContents((this.doc.body || this.doc.documentElement));
                r.collapse(true);
                this.deferFocus();
            }
            try{
                this.execCmd('useCSS', true);
                this.execCmd('styleWithCSS', false);
            }catch(e){}
        }
        this.owner.fireEvent('activate', this);
    },

    // private
    adjustFont: function(btn){
        var adjust = btn.cmd == 'increasefontsize' ? 1 : -1;
        //if(Roo.isSafari){ // safari
        //    adjust *= 2;
       // }
        var v = parseInt(this.doc.queryCommandValue('FontSize')|| 3, 10);
        if(Roo.isSafari){ // safari
            var sm = { 10 : 1, 13: 2, 16:3, 18:4, 24: 5, 32:6, 48: 7 };
            v =  (v < 10) ? 10 : v;
            v =  (v > 48) ? 48 : v;
            v = typeof(sm[v]) == 'undefined' ? 1 : sm[v];
            
        }
        
        
        v = Math.max(1, v+adjust);
        
        this.execCmd('FontSize', v  );
    },

    onEditorEvent : function(e)
    {
         
        
        if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 90) {
            return; // we do not handle this.. (undo manager does..)
        }
        // clicking a 'block'?
        
        // in theory this detects if the last element is not a br, then we try and do that.
        // its so clicking in space at bottom triggers adding a br and moving the cursor.
        if (e &&
            e.target.nodeName == 'BODY' &&
            e.type == "mouseup" &&
            this.doc.body.lastChild
           ) {
            var lc = this.doc.body.lastChild;
            // gtx-trans is google translate plugin adding crap.
            while ((lc.nodeType == 3 && lc.nodeValue == '') || lc.id == 'gtx-trans') {
                lc = lc.previousSibling;
            }
            if (lc.nodeType == 1 && lc.nodeName != 'BR') {
            // if last element is <BR> - then dont do anything.
            
                var ns = this.doc.createElement('br');
                this.doc.body.appendChild(ns);
                range = this.doc.createRange();
                range.setStartAfter(ns);
                range.collapse(true);
                var sel = this.win.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
        
        
        
        this.fireEditorEvent(e);
      //  this.updateToolbar();
        this.syncValue(); //we can not sync so often.. sync cleans, so this breaks stuff
    },
    
    fireEditorEvent: function(e)
    {
        this.owner.fireEvent('editorevent', this, e);
    },

    insertTag : function(tg)
    {
        // could be a bit smarter... -> wrap the current selected tRoo..
        if (tg.toLowerCase() == 'span' ||
            tg.toLowerCase() == 'code' ||
            tg.toLowerCase() == 'sup' ||
            tg.toLowerCase() == 'sub' 
            ) {
            
            range = this.createRange(this.getSelection());
            var wrappingNode = this.doc.createElement(tg.toLowerCase());
            wrappingNode.appendChild(range.extractContents());
            range.insertNode(wrappingNode);

            return;
            
            
            
        }
        this.execCmd("formatblock",   tg);
        this.undoManager.addEvent(); 
    },
    
    insertText : function(txt)
    {
        
        
        var range = this.createRange();
        range.deleteContents();
               //alert(Sender.getAttribute('label'));
               
        range.insertNode(this.doc.createTextNode(txt));
        this.undoManager.addEvent();
    } ,
    
     

    /**
     * Executes a Midas editor command on the editor document and performs necessary focus and
     * toolbar updates. <b>This should only be called after the editor is initialized.</b>
     * @param {String} cmd The Midas command
     * @param {String/Boolean} value (optional) The value to pass to the command (defaults to null)
     */
    relayCmd : function(cmd, value)
    {
        
        switch (cmd) {
            case 'justifyleft':
            case 'justifyright':
            case 'justifycenter':
                // if we are in a cell, then we will adjust the
                var n = this.getParentElement();
                var td = n.closest('td');
                if (td) {
                    var bl = Roo.htmleditor.Block.factory(td);
                    bl.textAlign = cmd.replace('justify','');
                    bl.updateElement();
                    this.owner.fireEvent('editorevent', this);
                    return;
                }
                this.execCmd('styleWithCSS', true); // 
                break;
            case 'bold':
            case 'italic':
            case 'underline':                
                // if there is no selection, then we insert, and set the curson inside it..
                this.execCmd('styleWithCSS', false); 
                break;
                
        
            default:
                break;
        }
        
        
        this.win.focus();
        this.execCmd(cmd, value);
        this.owner.fireEvent('editorevent', this);
        //this.updateToolbar();
        this.owner.deferFocus();
    },

    /**
     * Executes a Midas editor command directly on the editor document.
     * For visual commands, you should use {@link #relayCmd} instead.
     * <b>This should only be called after the editor is initialized.</b>
     * @param {String} cmd The Midas command
     * @param {String/Boolean} value (optional) The value to pass to the command (defaults to null)
     */
    execCmd : function(cmd, value){
        this.doc.execCommand(cmd, false, value === undefined ? null : value);
        this.syncValue();
    },
 
 
   
    /**
     * Inserts the passed text at the current cursor position. Note: the editor must be initialized and activated
     * to insert tRoo.
     * @param {String} text | dom node.. 
     */
    insertAtCursor : function(text)
    {
        
        if(!this.activated){
            return;
        }
         
        if(Roo.isGecko || Roo.isOpera || Roo.isSafari){
            this.win.focus();
            
            
            // from jquery ui (MIT licenced)
            var range, node;
            var win = this.win;
            
            if (win.getSelection && win.getSelection().getRangeAt) {
                
                // delete the existing?
                
                this.createRange(this.getSelection()).deleteContents();
                range = win.getSelection().getRangeAt(0);
                node = typeof(text) == 'string' ? range.createContextualFragment(text) : text;
                range.insertNode(node);
                range = range.cloneRange();
                range.collapse(false);
                 
                win.getSelection().removeAllRanges();
                win.getSelection().addRange(range);
                
                
                
            } else if (win.document.selection && win.document.selection.createRange) {
                // no firefox support
                var txt = typeof(text) == 'string' ? text : text.outerHTML;
                win.document.selection.createRange().pasteHTML(txt);
            
            } else {
                // no firefox support
                var txt = typeof(text) == 'string' ? text : text.outerHTML;
                this.execCmd('InsertHTML', txt);
            } 
            this.syncValue();
            
            this.deferFocus();
        }
    },
 // private
    mozKeyPress : function(e){
        if(e.ctrlKey){
            var c = e.getCharCode(), cmd;
          
            if(c > 0){
                c = String.fromCharCode(c).toLowerCase();
                switch(c){
                    case 'b':
                        cmd = 'bold';
                        break;
                    case 'i':
                        cmd = 'italic';
                        break;
                    
                    case 'u':
                        cmd = 'underline';
                        break;
                    
                    //case 'v':
                      //  this.cleanUpPaste.defer(100, this);
                      //  return;
                        
                }
                if(cmd){
                    
                    this.relayCmd(cmd);
                    //this.win.focus();
                    //this.execCmd(cmd);
                    //this.deferFocus();
                    e.preventDefault();
                }
                
            }
        }
    },

    // private
    fixKeys : function(){ // load time branching for fastest keydown performance
        
        
        if(Roo.isIE){
            return function(e){
                var k = e.getKey(), r;
                if(k == e.TAB){
                    e.stopEvent();
                    r = this.doc.selection.createRange();
                    if(r){
                        r.collapse(true);
                        r.pasteHTML('&#160;&#160;&#160;&#160;');
                        this.deferFocus();
                    }
                    return;
                }
                /// this is handled by Roo.htmleditor.KeyEnter
                 /*
                if(k == e.ENTER){
                    r = this.doc.selection.createRange();
                    if(r){
                        var target = r.parentElement();
                        if(!target || target.tagName.toLowerCase() != 'li'){
                            e.stopEvent();
                            r.pasteHTML('<br/>');
                            r.collapse(false);
                            r.select();
                        }
                    }
                }
                */
                //if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                //    this.cleanUpPaste.defer(100, this);
                //    return;
                //}
                
                
            };
        }else if(Roo.isOpera){
            return function(e){
                var k = e.getKey();
                if(k == e.TAB){
                    e.stopEvent();
                    this.win.focus();
                    this.execCmd('InsertHTML','&#160;&#160;&#160;&#160;');
                    this.deferFocus();
                }
               
                //if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                //    this.cleanUpPaste.defer(100, this);
                 //   return;
                //}
                
            };
        }else if(Roo.isSafari){
            return function(e){
                var k = e.getKey();
                
                if(k == e.TAB){
                    e.stopEvent();
                    this.execCmd('InsertText','\t');
                    this.deferFocus();
                    return;
                }
                 this.mozKeyPress(e);
                
               //if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                 //   this.cleanUpPaste.defer(100, this);
                 //   return;
               // }
                
             };
        }
    }(),
    
    getAllAncestors: function()
    {
        var p = this.getSelectedNode();
        var a = [];
        if (!p) {
            a.push(p); // push blank onto stack..
            p = this.getParentElement();
        }
        
        
        while (p && (p.nodeType == 1) && (p.tagName.toLowerCase() != 'body')) {
            a.push(p);
            p = p.parentNode;
        }
        a.push(this.doc.body);
        return a;
    },
    lastSel : false,
    lastSelNode : false,
    
    
    getSelection : function() 
    {
        this.assignDocWin();
        return Roo.lib.Selection.wrap(Roo.isIE ? this.doc.selection : this.win.getSelection(), this.doc);
    },
    /**
     * Select a dom node
     * @param {DomElement} node the node to select
     */
    selectNode : function(node, collapse)
    {
        var nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        if (collapse === true) {
            nodeRange.collapse(true);
        }
        //
        var s = this.win.getSelection();
        s.removeAllRanges();
        s.addRange(nodeRange);
    },
    
    getSelectedNode: function() 
    {
        // this may only work on Gecko!!!
        
        // should we cache this!!!!
        
         
         
        var range = this.createRange(this.getSelection()).cloneRange();
        
        if (Roo.isIE) {
            var parent = range.parentElement();
            while (true) {
                var testRange = range.duplicate();
                testRange.moveToElementText(parent);
                if (testRange.inRange(range)) {
                    break;
                }
                if ((parent.nodeType != 1) || (parent.tagName.toLowerCase() == 'body')) {
                    break;
                }
                parent = parent.parentElement;
            }
            return parent;
        }
        
        // is ancestor a text element.
        var ac =  range.commonAncestorContainer;
        if (ac.nodeType == 3) {
            ac = ac.parentNode;
        }
        
        var ar = ac.childNodes;
         
        var nodes = [];
        var other_nodes = [];
        var has_other_nodes = false;
        for (var i=0;i<ar.length;i++) {
            if ((ar[i].nodeType == 3) && (!ar[i].data.length)) { // empty text ? 
                continue;
            }
            // fullly contained node.
            
            if (this.rangeIntersectsNode(range,ar[i]) && this.rangeCompareNode(range,ar[i]) == 3) {
                nodes.push(ar[i]);
                continue;
            }
            
            // probably selected..
            if ((ar[i].nodeType == 1) && this.rangeIntersectsNode(range,ar[i]) && (this.rangeCompareNode(range,ar[i]) > 0)) {
                other_nodes.push(ar[i]);
                continue;
            }
            // outer..
            if (!this.rangeIntersectsNode(range,ar[i])|| (this.rangeCompareNode(range,ar[i]) == 0))  {
                continue;
            }
            
            
            has_other_nodes = true;
        }
        if (!nodes.length && other_nodes.length) {
            nodes= other_nodes;
        }
        if (has_other_nodes || !nodes.length || (nodes.length > 1)) {
            return false;
        }
        
        return nodes[0];
    },
    
    
    createRange: function(sel)
    {
        // this has strange effects when using with 
        // top toolbar - not sure if it's a great idea.
        //this.editor.contentWindow.focus();
        if (typeof sel != "undefined") {
            try {
                return sel.getRangeAt ? sel.getRangeAt(0) : sel.createRange();
            } catch(e) {
                return this.doc.createRange();
            }
        } else {
            return this.doc.createRange();
        }
    },
    getParentElement: function()
    {
        
        this.assignDocWin();
        var sel = Roo.isIE ? this.doc.selection : this.win.getSelection();
        
        var range = this.createRange(sel);
         
        try {
            var p = range.commonAncestorContainer;
            while (p.nodeType == 3) { // text node
                p = p.parentNode;
            }
            return p;
        } catch (e) {
            return null;
        }
    
    },
    /***
     *
     * Range intersection.. the hard stuff...
     *  '-1' = before
     *  '0' = hits..
     *  '1' = after.
     *         [ -- selected range --- ]
     *   [fail]                        [fail]
     *
     *    basically..
     *      if end is before start or  hits it. fail.
     *      if start is after end or hits it fail.
     *
     *   if either hits (but other is outside. - then it's not 
     *   
     *    
     **/
    
    
    // @see http://www.thismuchiknow.co.uk/?p=64.
    rangeIntersectsNode : function(range, node)
    {
        var nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
    
        var rangeStartRange = range.cloneRange();
        rangeStartRange.collapse(true);
    
        var rangeEndRange = range.cloneRange();
        rangeEndRange.collapse(false);
    
        var nodeStartRange = nodeRange.cloneRange();
        nodeStartRange.collapse(true);
    
        var nodeEndRange = nodeRange.cloneRange();
        nodeEndRange.collapse(false);
    
        return rangeStartRange.compareBoundaryPoints(
                 Range.START_TO_START, nodeEndRange) == -1 &&
               rangeEndRange.compareBoundaryPoints(
                 Range.START_TO_START, nodeStartRange) == 1;
        
         
    },
    rangeCompareNode : function(range, node)
    {
        var nodeRange = node.ownerDocument.createRange();
        try {
            nodeRange.selectNode(node);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        
        
        range.collapse(true);
    
        nodeRange.collapse(true);
     
        var ss = range.compareBoundaryPoints( Range.START_TO_START, nodeRange);
        var ee = range.compareBoundaryPoints(  Range.END_TO_END, nodeRange);
         
        //Roo.log(node.tagName + ': ss='+ss +', ee='+ee)
        
        var nodeIsBefore   =  ss == 1;
        var nodeIsAfter    = ee == -1;
        
        if (nodeIsBefore && nodeIsAfter) {
            return 0; // outer
        }
        if (!nodeIsBefore && nodeIsAfter) {
            return 1; //right trailed.
        }
        
        if (nodeIsBefore && !nodeIsAfter) {
            return 2;  // left trailed.
        }
        // fully contined.
        return 3;
    },
 
    cleanWordChars : function(input) {// change the chars to hex code
        
       var swapCodes  = [ 
            [    8211, "&#8211;" ], 
            [    8212, "&#8212;" ], 
            [    8216,  "'" ],  
            [    8217, "'" ],  
            [    8220, '"' ],  
            [    8221, '"' ],  
            [    8226, "*" ],  
            [    8230, "..." ]
        ]; 
        var output = input;
        Roo.each(swapCodes, function(sw) { 
            var swapper = new RegExp("\\u" + sw[0].toString(16), "g"); // hex codes
            
            output = output.replace(swapper, sw[1]);
        });
        
        return output;
    },
    
     
    
        
    
    cleanUpChild : function (node)
    {
        
        new Roo.htmleditor.FilterComment({node : node});
        new Roo.htmleditor.FilterAttributes({
                node : node,
                attrib_black : this.ablack,
                attrib_clean : this.aclean,
                style_white : this.cwhite,
                style_black : this.cblack
        });
        new Roo.htmleditor.FilterBlack({ node : node, tag : this.black});
        new Roo.htmleditor.FilterKeepChildren({node : node, tag : this.tag_remove} );
         
        
    },
    
    /**
     * Clean up MS wordisms...
     * @deprecated - use filter directly
     */
    cleanWord : function(node)
    {
        new Roo.htmleditor.FilterWord({ node : node ? node : this.doc.body });
        new Roo.htmleditor.FilterKeepChildren({node : node ? node : this.doc.body, tag : [ 'FONT', ':' ]} );
        
    },
   
    
    /**

     * @deprecated - use filters
     */
    cleanTableWidths : function(node)
    {
        new Roo.htmleditor.FilterTableWidth({ node : node ? node : this.doc.body});
        
 
    },
    
     
        
    applyBlacklists : function()
    {
        var w = typeof(this.owner.white) != 'undefined' && this.owner.white ? this.owner.white  : [];
        var b = typeof(this.owner.black) != 'undefined' && this.owner.black ? this.owner.black :  [];
        
        this.aclean = typeof(this.owner.aclean) != 'undefined' && this.owner.aclean ? this.owner.aclean :  Roo.HtmlEditorCore.aclean;
        this.ablack = typeof(this.owner.ablack) != 'undefined' && this.owner.ablack ? this.owner.ablack :  Roo.HtmlEditorCore.ablack;
        this.tag_remove = typeof(this.owner.tag_remove) != 'undefined' && this.owner.tag_remove ? this.owner.tag_remove :  Roo.HtmlEditorCore.tag_remove;
        
        this.white = [];
        this.black = [];
        Roo.each(Roo.HtmlEditorCore.white, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            this.white.push(tag);
            
        }, this);
        
        Roo.each(w, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            if (this.white.indexOf(tag) > -1) {
                return;
            }
            this.white.push(tag);
            
        }, this);
        
        
        Roo.each(Roo.HtmlEditorCore.black, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            this.black.push(tag);
            
        }, this);
        
        Roo.each(b, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            if (this.black.indexOf(tag) > -1) {
                return;
            }
            this.black.push(tag);
            
        }, this);
        
        
        w = typeof(this.owner.cwhite) != 'undefined' && this.owner.cwhite ? this.owner.cwhite  : [];
        b = typeof(this.owner.cblack) != 'undefined' && this.owner.cblack ? this.owner.cblack :  [];
        
        this.cwhite = [];
        this.cblack = [];
        Roo.each(Roo.HtmlEditorCore.cwhite, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            this.cwhite.push(tag);
            
        }, this);
        
        Roo.each(w, function(tag) {
            if (b.indexOf(tag) > -1) {
                return;
            }
            if (this.cwhite.indexOf(tag) > -1) {
                return;
            }
            this.cwhite.push(tag);
            
        }, this);
        
        
        Roo.each(Roo.HtmlEditorCore.cblack, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            this.cblack.push(tag);
            
        }, this);
        
        Roo.each(b, function(tag) {
            if (w.indexOf(tag) > -1) {
                return;
            }
            if (this.cblack.indexOf(tag) > -1) {
                return;
            }
            this.cblack.push(tag);
            
        }, this);
    },
    
    setStylesheets : function(stylesheets)
    {
        if(typeof(stylesheets) == 'string'){
            Roo.get(this.iframe.contentDocument.head).createChild({
                tag : 'link',
                rel : 'stylesheet',
                type : 'text/css',
                href : stylesheets
            });
            
            return;
        }
        var _this = this;
     
        Roo.each(stylesheets, function(s) {
            if(!s.length){
                return;
            }
            
            Roo.get(_this.iframe.contentDocument.head).createChild({
                tag : 'link',
                rel : 'stylesheet',
                type : 'text/css',
                href : s
            });
        });

        
    },
    
    
    updateLanguage : function()
    {
        if (!this.iframe || !this.iframe.contentDocument) {
            return;
        }
        Roo.get(this.iframe.contentDocument.body).attr("lang", this.language);
    },
    
    
    removeStylesheets : function()
    {
        var _this = this;
        
        Roo.each(Roo.get(_this.iframe.contentDocument.head).select('link[rel=stylesheet]', true).elements, function(s){
            s.remove();
        });
    },
    
    setStyle : function(style)
    {
        Roo.get(this.iframe.contentDocument.head).createChild({
            tag : 'style',
            type : 'text/css',
            html : style
        });

        return;
    }
    
    // hide stuff that is not compatible
    /**
     * @event blur
     * @hide
     */
    /**
     * @event change
     * @hide
     */
    /**
     * @event focus
     * @hide
     */
    /**
     * @event specialkey
     * @hide
     */
    /**
     * @cfg {String} fieldClass @hide
     */
    /**
     * @cfg {String} focusClass @hide
     */
    /**
     * @cfg {String} autoCreate @hide
     */
    /**
     * @cfg {String} inputType @hide
     */
    /**
     * @cfg {String} invalidClass @hide
     */
    /**
     * @cfg {String} invalidText @hide
     */
    /**
     * @cfg {String} msgFx @hide
     */
    /**
     * @cfg {String} validateOnBlur @hide
     */
});

Roo.HtmlEditorCore.white = [
        'AREA', 'BR', 'IMG', 'INPUT', 'HR', 'WBR',
        
       'ADDRESS', 'BLOCKQUOTE', 'CENTER', 'DD',      'DIR',       'DIV', 
       'DL',      'DT',         'H1',     'H2',      'H3',        'H4', 
       'H5',      'H6',         'HR',     'ISINDEX', 'LISTING',   'MARQUEE', 
       'MENU',    'MULTICOL',   'OL',     'P',       'PLAINTEXT', 'PRE', 
       'TABLE',   'UL',         'XMP', 
       
       'CAPTION', 'COL', 'COLGROUP', 'TBODY', 'TD', 'TFOOT', 'TH', 
      'THEAD',   'TR', 
     
      'DIR', 'MENU', 'OL', 'UL', 'DL',
       
      'EMBED',  'OBJECT'
];


Roo.HtmlEditorCore.black = [
    //    'embed',  'object', // enable - backend responsiblity to clean thiese
        'APPLET', // 
        'BASE',   'BASEFONT', 'BGSOUND', 'BLINK',  'BODY', 
        'FRAME',  'FRAMESET', 'HEAD',    'HTML',   'ILAYER', 
        'IFRAME', 'LAYER',  'LINK',     'META',    'OBJECT',   
        'SCRIPT', 'STYLE' ,'TITLE',  'XML',
        //'FONT' // CLEAN LATER..
        'COLGROUP', 'COL'   // messy tables.
        
        
];
Roo.HtmlEditorCore.clean = [ // ?? needed???
     'SCRIPT', 'STYLE', 'TITLE', 'XML'
];
Roo.HtmlEditorCore.tag_remove = [
    'FONT', 'TBODY'  
];
// attributes..

Roo.HtmlEditorCore.ablack = [
    'on'
];
    
Roo.HtmlEditorCore.aclean = [ 
    'action', 'background', 'codebase', 'dynsrc', 'href', 'lowsrc' 
];

// protocols..
Roo.HtmlEditorCore.pwhite= [
        'http',  'https',  'mailto'
];

// white listed style attributes.
Roo.HtmlEditorCore.cwhite= [
      //  'text-align', /// default is to allow most things..
      
         
//        'font-size'//??
];

// black listed style attributes.
Roo.HtmlEditorCore.cblack= [
      //  'font-size' -- this can be set by the project 
];




    
