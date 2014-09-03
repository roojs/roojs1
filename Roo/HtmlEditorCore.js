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
     
};


Roo.extend(Roo.HtmlEditorCore, Roo.Component,  {


     /**
     * @cfg {Roo.form.HtmlEditor|Roo.bootstrap.HtmlEditor} the owner field 
     */
    
    owner : false,
    
     /**
     * @cfg {String} resizable  's' or 'se' or 'e' - wrapps the element in a
     *                        Roo.resizable.
     */
    resizable : false,
     /**
     * @cfg {Number} height (in pixels)
     */   
    height: 300,
   /**
     * @cfg {Number} width (in pixels)
     */   
    width: 500,
    
    /**
     * @cfg {Array} stylesheets url of stylesheets. set to [] to disable stylesheets.
     * 
     */
    stylesheets: false,
    
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
    
     
    

    /**
     * Protected method that will not generally be called directly. It
     * is called when the editor initializes the iframe with HTML contents. Override this method if you
     * want to change the initialization markup of the iframe (e.g. to add stylesheets).
     */
    getDocMarkup : function(){
        // body styles..
        var st = '';
        Roo.log(this.stylesheets);
        
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
            Roo.each(this.stylesheets, function(s) {
                st += '<link rel="stylesheet" type="text/css" href="' + s +'" />'
            });
            
        }
        
        st +=  '<style type="text/css">' +
            'IMG { cursor: pointer } ' +
        '</style>';

        
        return '<html><head>' + st  +
            //<style type="text/css">' +
            //'body{border:0;margin:0;padding:3px;height:98%;cursor:text;}' +
            //'</style>' +
            ' </head><body class="roo-htmleditor-body"></body></html>';
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
        
         
        
        var iframe = this.owner.wrap.createChild({
            tag: 'iframe',
            cls: 'form-control', // bootstrap..
            id: this.frameId,
            name: this.frameId,
            frameBorder : 'no',
            'src' : Roo.SSL_SECURE_URL ? Roo.SSL_SECURE_URL  :  "javascript:false"
        }, this.el
        );
        
        
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
 
            Roo.get(this.iframe).addClass(['x-hidden','hide']);     //FIXME - what's the BS styles for these
            
        }else{
            Roo.get(this.iframe).removeClass(['x-hidden','hide']);
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
    cleanHtml : function(html){
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
    syncValue : function(){
        if(this.initialized){
            var bd = (this.doc.body || this.doc.documentElement);
            //this.cleanUpPaste(); -- this is done else where and causes havoc..
            var html = bd.innerHTML;
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
            html = html.replace(/([\x80-\uffff])/g, function (a, b) {
                var cc = b.charCodeAt();
                if (
                    (cc >= 0x4E00 && cc < 0xA000 ) ||
                    (cc >= 0x3400 && cc < 0x4E00 ) ||
                    (cc >= 0xf900 && cc < 0xfb00 )
                ) {
                        return b;
                }
                return "&#"+cc+";" 
            });
            if(this.owner.fireEvent('beforesync', this, html) !== false){
                this.el.dom.value = html;
                this.owner.fireEvent('sync', this, html);
            }
        }
    },

    /**
     * Protected method that will not generally be called directly. Pushes the value of the textarea
     * into the iframe editor.
     */
    pushValue : function(){
        if(this.initialized){
            var v = this.el.dom.value.trim();
            
//            if(v.length < 1){
//                v = '&#160;';
//            }
            
            if(this.owner.fireEvent('beforepush', this, v) !== false){
                var d = (this.doc.body || this.doc.documentElement);
                d.innerHTML = v;
                this.cleanUpPaste();
                this.el.dom.value = d.innerHTML;
                this.owner.fireEvent('push', this, v);
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
            if (!Roo.get(this.frameId)) {
                return;
            }
            this.doc = (iframe.contentDocument || Roo.get(this.frameId).dom.document);
            this.win = Roo.get(this.frameId).dom.contentWindow;
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
        var ss = this.el.getStyles('font-size', 'background-image', 'background-repeat');
        ss['background-attachment'] = 'fixed'; // w3c
        dbody.bgProperties = 'fixed'; // ie
        Roo.DomHelper.applyStyles(dbody, ss);
        Roo.EventManager.on(this.doc, {
            //'mousedown': this.onEditorEvent,
            'mouseup': this.onEditorEvent,
            'dblclick': this.onEditorEvent,
            'click': this.onEditorEvent,
            'keyup': this.onEditorEvent,
            buffer:100,
            scope: this
        });
        if(Roo.isGecko){
            Roo.EventManager.on(this.doc, 'keypress', this.mozKeyPress, this);
        }
        if(Roo.isIE || Roo.isSafari || Roo.isOpera){
            Roo.EventManager.on(this.doc, 'keydown', this.fixKeys, this);
        }
        this.initialized = true;

        this.owner.fireEvent('initialize', this);
        this.pushValue();
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

    onEditorEvent : function(e){
        this.owner.fireEvent('editorevent', this, e);
      //  this.updateToolbar();
        this.syncValue(); //we can not sync so often.. sync cleans, so this breaks stuff
    },

    insertTag : function(tg)
    {
        // could be a bit smarter... -> wrap the current selected tRoo..
        if (tg.toLowerCase() == 'span' || tg.toLowerCase() == 'code') {
            
            range = this.createRange(this.getSelection());
            var wrappingNode = this.doc.createElement(tg.toLowerCase());
            wrappingNode.appendChild(range.extractContents());
            range.insertNode(wrappingNode);

            return;
            
            
            
        }
        this.execCmd("formatblock",   tg);
        
    },
    
    insertText : function(txt)
    {
        
        
        var range = this.createRange();
        range.deleteContents();
               //alert(Sender.getAttribute('label'));
               
        range.insertNode(this.doc.createTextNode(txt));
    } ,
    
     

    /**
     * Executes a Midas editor command on the editor document and performs necessary focus and
     * toolbar updates. <b>This should only be called after the editor is initialized.</b>
     * @param {String} cmd The Midas command
     * @param {String/Boolean} value (optional) The value to pass to the command (defaults to null)
     */
    relayCmd : function(cmd, value){
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
        /*
        if(Roo.isIE){
            this.win.focus();
            var r = this.doc.selection.createRange();
            if(r){
                r.collapse(true);
                r.pasteHTML(text);
                this.syncValue();
                this.deferFocus();
            
            }
            return;
        }
        */
        if(Roo.isGecko || Roo.isOpera || Roo.isSafari){
            this.win.focus();
            
            
            // from jquery ui (MIT licenced)
            var range, node;
            var win = this.win;
            
            if (win.getSelection && win.getSelection().getRangeAt) {
                range = win.getSelection().getRangeAt(0);
                node = typeof(text) == 'string' ? range.createContextualFragment(text) : text;
                range.insertNode(node);
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
                    
                    case 'v':
                        this.cleanUpPaste.defer(100, this);
                        return;
                        
                }
                if(cmd){
                    this.win.focus();
                    this.execCmd(cmd);
                    this.deferFocus();
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
                
                if(k == e.ENTER){
                    r = this.doc.selection.createRange();
                    if(r){
                        var target = r.parentElement();
                        if(!target || target.tagName.toLowerCase() != 'li'){
                            e.stopEvent();
                            r.pasteHTML('<br />');
                            r.collapse(false);
                            r.select();
                        }
                    }
                }
                if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
                
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
                if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
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
               if (String.fromCharCode(k).toLowerCase() == 'v') { // paste
                    this.cleanUpPaste.defer(100, this);
                    return;
                }
                
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
        return Roo.isIE ? this.doc.selection : this.win.getSelection();
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
        
        if (nodeIsBefore && nodeIsAfter)
            return 0; // outer
        if (!nodeIsBefore && nodeIsAfter)
            return 1; //right trailed.
        
        if (nodeIsBefore && !nodeIsAfter)
            return 2;  // left trailed.
        // fully contined.
        return 3;
    },

    // private? - in a new class?
    cleanUpPaste :  function()
    {
        // cleans up the whole document..
        Roo.log('cleanuppaste');
        
        this.cleanUpChildren(this.doc.body);
        var clean = this.cleanWordChars(this.doc.body.innerHTML);
        if (clean != this.doc.body.innerHTML) {
            this.doc.body.innerHTML = clean;
        }
        
    },
    
    cleanWordChars : function(input) {// change the chars to hex code
        var he = Roo.HtmlEditorCore;
        
        var output = input;
        Roo.each(he.swapCodes, function(sw) { 
            var swapper = new RegExp("\\u" + sw[0].toString(16), "g"); // hex codes
            
            output = output.replace(swapper, sw[1]);
        });
        
        return output;
    },
    
    
    cleanUpChildren : function (n)
    {
        if (!n.childNodes.length) {
            return;
        }
        for (var i = n.childNodes.length-1; i > -1 ; i--) {
           this.cleanUpChild(n.childNodes[i]);
        }
    },
    
    
        
    
    cleanUpChild : function (node)
    {
        var ed = this;
        //console.log(node);
        if (node.nodeName == "#text") {
            // clean up silly Windows -- stuff?
            return; 
        }
        if (node.nodeName == "#comment") {
            node.parentNode.removeChild(node);
            // clean up silly Windows -- stuff?
            return; 
        }
        
        if (Roo.HtmlEditorCore.black.indexOf(node.tagName.toLowerCase()) > -1 && this.clearUp) {
            // remove node.
            node.parentNode.removeChild(node);
            return;
            
        }
        
        var remove_keep_children= Roo.HtmlEditorCore.remove.indexOf(node.tagName.toLowerCase()) > -1;
        
        // remove <a name=....> as rendering on yahoo mailer is borked with this.
        // this will have to be flaged elsewhere - perhaps ablack=name... on the mailer..
        
        //if (node.tagName.toLowerCase() == 'a' && !node.hasAttribute('href')) {
        //    remove_keep_children = true;
        //}
        
        if (remove_keep_children) {
            this.cleanUpChildren(node);
            // inserts everything just before this node...
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
            }
            node.parentNode.removeChild(node);
            return;
        }
        
        if (!node.attributes || !node.attributes.length) {
            this.cleanUpChildren(node);
            return;
        }
        
        function cleanAttr(n,v)
        {
            
            if (v.match(/^\./) || v.match(/^\//)) {
                return;
            }
            if (v.match(/^(http|https):\/\//) || v.match(/^mailto:/)) {
                return;
            }
            if (v.match(/^#/)) {
                return;
            }
//            Roo.log("(REMOVE TAG)"+ node.tagName +'.' + n + '=' + v);
            node.removeAttribute(n);
            
        }
        
        function cleanStyle(n,v)
        {
            if (v.match(/expression/)) { //XSS?? should we even bother..
                node.removeAttribute(n);
                return;
            }
            var cwhite = typeof(ed.cwhite) == 'undefined' ? Roo.HtmlEditorCore.cwhite : ed.cwhite;
            var cblack = typeof(ed.cblack) == 'undefined' ? Roo.HtmlEditorCore.cblack : ed.cblack;
            
            
            var parts = v.split(/;/);
            var clean = [];
            
            Roo.each(parts, function(p) {
                p = p.replace(/^\s+/g,'').replace(/\s+$/g,'');
                if (!p.length) {
                    return true;
                }
                var l = p.split(':').shift().replace(/\s+/g,'');
                l = l.replace(/^\s+/g,'').replace(/\s+$/g,'');
                
                if ( cblack.indexOf(l) > -1) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                //Roo.log()
                // only allow 'c whitelisted system attributes'
                if ( cwhite.length &&  cwhite.indexOf(l) < 0) {
//                    Roo.log('(REMOVE CSS)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    //node.removeAttribute(n);
                    return true;
                }
                
                
                 
                
                clean.push(p);
                return true;
            });
            if (clean.length) { 
                node.setAttribute(n, clean.join(';'));
            } else {
                node.removeAttribute(n);
            }
            
        }
        
        
        for (var i = node.attributes.length-1; i > -1 ; i--) {
            var a = node.attributes[i];
            //console.log(a);
            
            if (a.name.toLowerCase().substr(0,2)=='on')  {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.HtmlEditorCore.ablack.indexOf(a.name.toLowerCase()) > -1) {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.HtmlEditorCore.aclean.indexOf(a.name.toLowerCase()) > -1) {
                cleanAttr(a.name,a.value); // fixme..
                continue;
            }
            if (a.name == 'style') {
                cleanStyle(a.name,a.value);
                continue;
            }
            /// clean up MS crap..
            // tecnically this should be a list of valid class'es..
            
            
            if (a.name == 'class') {
                if (a.value.match(/^Mso/)) {
                    node.className = '';
                }
                
                if (a.value.match(/body/)) {
                    node.className = '';
                }
                continue;
            }
            
            // style cleanup!?
            // class cleanup?
            
        }
        
        
        this.cleanUpChildren(node);
        
        
    },
    /**
     * Clean up MS wordisms...
     */
    cleanWord : function(node)
    {
        var _t = this;
        var cleanWordChildren = function()
        {
            if (!node.childNodes.length) {
                return;
            }
            for (var i = node.childNodes.length-1; i > -1 ; i--) {
               _t.cleanWord(node.childNodes[i]);
            }
        }
        
        
        if (!node) {
            this.cleanWord(this.doc.body);
            return;
        }
        if (node.nodeName == "#text") {
            // clean up silly Windows -- stuff?
            return; 
        }
        if (node.nodeName == "#comment") {
            node.parentNode.removeChild(node);
            // clean up silly Windows -- stuff?
            return; 
        }
        
        if (node.tagName.toLowerCase().match(/^(style|script|applet|embed|noframes|noscript)$/)) {
            node.parentNode.removeChild(node);
            return;
        }
        
        // remove - but keep children..
        if (node.tagName.toLowerCase().match(/^(meta|link|span|\\?xml:|st1:|o:|font)/)) {
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
            }
            node.parentNode.removeChild(node);
            cleanWordChildren();
            return;
        }
        // clean styles
        if (node.className.length) {
            
            var cn = node.className.split(/\W+/);
            var cna = [];
            Roo.each(cn, function(cls) {
                if (cls.match(/Mso[a-zA-Z]+/)) {
                    return;
                }
                cna.push(cn);
            });
            node.className = cna.length ? cna.join(' ') : '';
            if (!cna.length) {
                node.removeAttribute("class");
            }
        }
        
        if (node.hasAttribute("lang")) {
            node.removeAttribute("lang");
        }
        
        if (node.hasAttribute("style")) {
            
            var styles = node.getAttribute("style").split(";");
            var nstyle = [];
            Roo.each(styles, function(s) {
                if (!s.match(/:/)) {
                    return;
                }
                var kv = s.split(":");
                if (kv[0].match(/^(mso-|line|font|background|margin|padding)/)) {
                    return;
                }
                // what ever is left... we allow.
                nstyle.push(s);
            });
            node.setAttribute("style", nstyle.length ? nstyle.join(';') : '');
            if (!nstyle.length) {
                node.removeAttribute('style');
            }
        }
        
        cleanWordChildren();
        
        
    },
    domToHTML : function(currentElement, depth) {
        
            depth = depth || 0;
        
            if (!currentElement) {
                return this.domToHTML(this.doc.body);
            }
            
            //Roo.log(currentElement);
            var j;
            var allText = false;
            var nodeName = currentElement.nodeName;
            var tagName = Roo.util.Format.htmlEncode(currentElement.tagName);
            
            if  (nodeName == '#text') {
                return currentElement.nodeValue;
            }
             
            
            
            if(nodeName == 'BR'){
                return '<BR/>';
            }
            var ret = '';
            if (nodeName != 'BODY') {
                 
                var i = 0;
                // Prints the node tagName, such as <A>, <IMG>, etc
                if (tagName) {
                    var attr = [];
                    for(i = 0; i < currentElement.attributes.length;i++) {
                        // quoting?
                        var aname = currentElement.attributes.item(i).name;
                        attr.push(aname + '="' + Roo.util.Format.htmlEncode(currentElement.attributes.item(i).value) + '"' );
                    }
                    
                    ret = "<"+currentElement.tagName+ ( attr.length ? (' ' + attr.join(' ') ) : '') + ">";
                } 
                else {
                    
                    // eack
                }
            } else {
                tagName = false;
            }
            if (['IMG', 'BR', 'HR', 'INPUT'].indexOf(tagName) > -1) {
                return ret;
            }
            
            
            // Traverse the tree
            i = 0;
            var currentElementChild = currentElement.childNodes.item(i);
            var allText = true;
            var innerHTML  = '';
            while (currentElementChild) {
                // Formatting code (indent the tree so it looks nice on the screen)
                
                if  (currentElementChild.nodeName == '#text') {
                    innerHTML  += Roo.util.Format.htmlEncode(currentElementChild.nodeValue);
                    i++;
                    currentElementChild = currentElement.childNodes.item(i);
                    continue;
                }   
                allText = false;
                innerHTML  += "\n" + (new Array( depth + 1 )).join( "  "  );
                    
                // Recursively traverse the tree structure of the child node
                innerHTML   += this.domToHTML(currentElementChild, depth+1);
                i++;
                currentElementChild=currentElement.childNodes.item(i);
            }
            
            ret += innerHTML;
            
            if (!allText) {
                    // The remaining code is mostly for formatting the tree
                ret+= "\n" + (new Array( depth  )).join( "  "  );
            }
            
            
            if (tagName) {
                ret+= "</"+tagName+">";
            }
            return ret;
            
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
        'area', 'br', 'img', 'input', 'hr', 'wbr',
        
       'address', 'blockquote', 'center', 'dd',      'dir',       'div', 
       'dl',      'dt',         'h1',     'h2',      'h3',        'h4', 
       'h5',      'h6',         'hr',     'isindex', 'listing',   'marquee', 
       'menu',    'multicol',   'ol',     'p',       'plaintext', 'pre', 
       'table',   'ul',         'xmp', 
       
       'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 
      'thead',   'tr', 
     
      'dir', 'menu', 'ol', 'ul', 'dl',
       
      'embed',  'object'
];


Roo.HtmlEditorCore.black = [
    //    'embed',  'object', // enable - backend responsiblity to clean thiese
        'applet', // 
        'base',   'basefont', 'bgsound', 'blink',  'body', 
        'frame',  'frameset', 'head',    'html',   'ilayer', 
        'iframe', 'layer',  'link',     'meta',    'object',   
        'script', 'style' ,'title',  'xml' // clean later..
];
Roo.HtmlEditorCore.clean = [
    'script', 'style', 'title', 'xml'
];
Roo.HtmlEditorCore.remove = [
    'font'
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


Roo.HtmlEditorCore.swapCodes   =[ 
    [    8211, "--" ], 
    [    8212, "--" ], 
    [    8216,  "'" ],  
    [    8217, "'" ],  
    [    8220, '"' ],  
    [    8221, '"' ],  
    [    8226, "*" ],  
    [    8230, "..." ]
]; 

    