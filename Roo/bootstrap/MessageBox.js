/*
 * - LGPL
 *
 * messagebox - can be used as a replace
 * 
 */
/**
 * @class Roo.MessageBox
 * Utility class for generating different styles of message boxes.  The alias Roo.Msg can also be used.
 * Example usage:
 *<pre><code>
// Basic alert:
Roo.Msg.alert('Status', 'Changes saved successfully.');

// Prompt for user data:
Roo.Msg.prompt('Name', 'Please enter your name:', function(btn, text){
    if (btn == 'ok'){
        // process text value...
    }
});

// Show a dialog using config options:
Roo.Msg.show({
   title:'Save Changes?',
   msg: 'Your are closing a tab that has unsaved changes. Would you like to save your changes?',
   buttons: Roo.Msg.YESNOCANCEL,
   fn: processResult,
   animEl: 'elId'
});
</code></pre>
 * @singleton
 */
Roo.bootstrap.MessageBox = function(){
    var dlg, opt, mask, waitTimer;
    var bodyEl, msgEl, textboxEl, textareaEl, progressEl, pp;
    var buttons, activeTextEl, bwidth;

    // private
    var handleButton = function(button){
        dlg.hide();
        Roo.callback(opt.fn, opt.scope||window, [button, activeTextEl.dom.value], 1);
    };

    // private
    var handleHide = function(){
        if(opt && opt.cls){
            dlg.el.removeClass(opt.cls);
        }
        //if(waitTimer){
        //    Roo.TaskMgr.stop(waitTimer);
        //    waitTimer = null;
        //}
    };

    // private
    var updateButtons = function(b){
        var width = 0;
        if(!b){
            buttons["ok"].hide();
            buttons["cancel"].hide();
            buttons["yes"].hide();
            buttons["no"].hide();
            //dlg.footer.dom.style.display = 'none';
            return width;
        }
        dlg.footer.dom.style.display = '';
        for(var k in buttons){
            if(typeof buttons[k] != "function"){
                if(b[k]){
                    buttons[k].show();
                    buttons[k].setText(typeof b[k] == "string" ? b[k] : Roo.bootstrap.MessageBox.buttonText[k]);
                    width += buttons[k].el.getWidth()+15;
                }else{
                    buttons[k].hide();
                }
            }
        }
        return width;
    };

    // private
    var handleEsc = function(d, k, e){
        if(opt && opt.closable !== false){
            dlg.hide();
        }
        if(e){
            e.stopEvent();
        }
    };

    return {
        /**
         * Returns a reference to the underlying {@link Roo.BasicDialog} element
         * @return {Roo.BasicDialog} The BasicDialog element
         */
        getDialog : function(){
           if(!dlg){
                dlg = new Roo.bootstrap.Modal("x-msg-box", {
                    //draggable: true,
                    //resizable:false,
                    //constraintoviewport:false,
                    //fixedcenter:true,
                    //collapsible : false,
                    //shim:true,
                    //modal: true,
                    width:400,
                    height:100,
                    //buttonAlign:"center",
                    closeClick : function(){
                        if(opt && opt.buttons && opt.buttons.no && !opt.buttons.cancel){
                            handleButton("no");
                        }else{
                            handleButton("cancel");
                        }
                    }
                });
                dlg.on("hide", handleHide);
                mask = dlg.mask;
                //dlg.addKeyListener(27, handleEsc);
                buttons = {};
                var bt = this.buttonText;
                buttons["ok"] = dlg.addButton(bt["ok"], handleButton.createCallback("ok"));
                buttons["yes"] = dlg.addButton(bt["yes"], handleButton.createCallback("yes"));
                buttons["no"] = dlg.addButton(bt["no"], handleButton.createCallback("no"));
                buttons["cancel"] = dlg.addButton(bt["cancel"], handleButton.createCallback("cancel"));
                bodyEl = dlg.body.createChild({

                    html:'<span class="roo-mb-text"></span><br /><input type="text" class="roo-mb-input" />' +
                        '<textarea class="roo-mb-textarea"></textarea>' +
                        '<div class="roo-mb-progress-wrap"><div class="roo-mb-progress"><div class="roo-mb-progress-bar">&#160;</div></div></div>'
                });
                msgEl = bodyEl.dom.firstChild;
                textboxEl = Roo.get(bodyEl.dom.childNodes[2]);
                textboxEl.enableDisplayMode();
                textboxEl.addKeyListener([10,13], function(){
                    if(dlg.isVisible() && opt && opt.buttons){
                        if(opt.buttons.ok){
                            handleButton("ok");
                        }else if(opt.buttons.yes){
                            handleButton("yes");
                        }
                    }
                });
                textareaEl = Roo.get(bodyEl.dom.childNodes[3]);
                textareaEl.enableDisplayMode();
                progressEl = Roo.get(bodyEl.dom.childNodes[4]);
                progressEl.enableDisplayMode();
                var pf = progressEl.dom.firstChild;
                if (pf) {
                    pp = Roo.get(pf.firstChild);
                    pp.setHeight(pf.offsetHeight);
                }
                
            }
            return dlg;
        },

        /**
         * Updates the message box body text
         * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
         * the XHTML-compliant non-breaking space character '&amp;#160;')
         * @return {Roo.MessageBox} This message box
         */
        updateText : function(text){
            if(!dlg.isVisible() && !opt.width){
                dlg.resizeTo(this.maxWidth, 100); // resize first so content is never clipped from previous shows
            }
            msgEl.innerHTML = text || '&#160;';
      
            var cw =  Math.max(msgEl.offsetWidth, msgEl.parentNode.scrollWidth);
            //Roo.log("guesed size: " + JSON.stringify([cw,msgEl.offsetWidth, msgEl.parentNode.scrollWidth]));
            var w = Math.max(
                    Math.min(opt.width || cw , this.maxWidth), 
                    Math.max(opt.minWidth || this.minWidth, bwidth)
            );
            if(opt.prompt){
                activeTextEl.setWidth(w);
            }
            if(dlg.isVisible()){
                dlg.fixedcenter = false;
            }
            // to big, make it scroll. = But as usual stupid IE does not support
            // !important..
            
            if ( bodyEl.getHeight() > (Roo.lib.Dom.getViewHeight() - 100)) {
                bodyEl.setHeight ( Roo.lib.Dom.getViewHeight() - 100 );
                bodyEl.dom.style.overflowY = 'auto' + ( Roo.isIE ? '' : ' !important');
            } else {
                bodyEl.dom.style.height = '';
                bodyEl.dom.style.overflowY = '';
            }
            if (cw > w) {
                bodyEl.dom.style.get = 'auto' + ( Roo.isIE ? '' : ' !important');
            } else {
                bodyEl.dom.style.overflowX = '';
            }
            
            dlg.setContentSize(w, bodyEl.getHeight());
            if(dlg.isVisible()){
                dlg.fixedcenter = true;
            }
            return this;
        },

        /**
         * Updates a progress-style message box's text and progress bar.  Only relevant on message boxes
         * initiated via {@link Roo.MessageBox#progress} or by calling {@link Roo.MessageBox#show} with progress: true.
         * @param {Number} value Any number between 0 and 1 (e.g., .5)
         * @param {String} text (optional) If defined, the message box's body text is replaced with the specified string (defaults to undefined)
         * @return {Roo.MessageBox} This message box
         */
        updateProgress : function(value, text){
            if(text){
                this.updateText(text);
            }
            if (pp) { // weird bug on my firefox - for some reason this is not defined
                pp.setWidth(Math.floor(value*progressEl.dom.firstChild.offsetWidth));
            }
            return this;
        },        

        /**
         * Returns true if the message box is currently displayed
         * @return {Boolean} True if the message box is visible, else false
         */
        isVisible : function(){
            return dlg && dlg.isVisible();  
        },

        /**
         * Hides the message box if it is displayed
         */
        hide : function(){
            if(this.isVisible()){
                dlg.hide();
            }  
        },

        /**
         * Displays a new message box, or reinitializes an existing message box, based on the config options
         * passed in. All functions (e.g. prompt, alert, etc) on MessageBox call this function internally.
         * The following config object properties are supported:
         * <pre>
Property    Type             Description
----------  ---------------  ------------------------------------------------------------------------------------
animEl            String/Element   An id or Element from which the message box should animate as it opens and
                                   closes (defaults to undefined)
buttons           Object/Boolean   A button config object (e.g., Roo.MessageBox.OKCANCEL or {ok:'Foo',
                                   cancel:'Bar'}), or false to not show any buttons (defaults to false)
closable          Boolean          False to hide the top-right close button (defaults to true).  Note that
                                   progress and wait dialogs will ignore this property and always hide the
                                   close button as they can only be closed programmatically.
cls               String           A custom CSS class to apply to the message box element
defaultTextHeight Number           The default height in pixels of the message box's multiline textarea if
                                   displayed (defaults to 75)
fn                Function         A callback function to execute after closing the dialog.  The arguments to the
                                   function will be btn (the name of the button that was clicked, if applicable,
                                   e.g. "ok"), and text (the value of the active text field, if applicable).
                                   Progress and wait dialogs will ignore this option since they do not respond to
                                   user actions and can only be closed programmatically, so any required function
                                   should be called by the same code after it closes the dialog.
icon              String           A CSS class that provides a background image to be used as an icon for
                                   the dialog (e.g., Roo.MessageBox.WARNING or 'custom-class', defaults to '')
maxWidth          Number           The maximum width in pixels of the message box (defaults to 600)
minWidth          Number           The minimum width in pixels of the message box (defaults to 100)
modal             Boolean          False to allow user interaction with the page while the message box is
                                   displayed (defaults to true)
msg               String           A string that will replace the existing message box body text (defaults
                                   to the XHTML-compliant non-breaking space character '&#160;')
multiline         Boolean          True to prompt the user to enter multi-line text (defaults to false)
progress          Boolean          True to display a progress bar (defaults to false)
progressText      String           The text to display inside the progress bar if progress = true (defaults to '')
prompt            Boolean          True to prompt the user to enter single-line text (defaults to false)
proxyDrag         Boolean          True to display a lightweight proxy while dragging (defaults to false)
title             String           The title text
value             String           The string value to set into the active textbox element if displayed
wait              Boolean          True to display a progress bar (defaults to false)
width             Number           The width of the dialog in pixels
</pre>
         *
         * Example usage:
         * <pre><code>
Roo.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Roo.MessageBox.OKCANCEL,
   multiline: true,
   fn: saveAddress,
   animEl: 'addAddressBtn'
});
</code></pre>
         * @param {Object} config Configuration options
         * @return {Roo.MessageBox} This message box
         */
        show : function(options)
        {
            
            // this causes nightmares if you show one dialog after another
            // especially on callbacks..
             
            if(this.isVisible()){
                
                this.hide();
                Roo.log("[Roo.Messagebox] Show called while message displayed:" );
                Roo.log("Old Dialog Message:" +  msgEl.innerHTML );
                Roo.log("New Dialog Message:" +  options.msg )
                //this.alert("ERROR", "Multiple dialogs where displayed at the same time");
                //throw "Roo.MessageBox ERROR : Multiple dialogs where displayed at the same time";
                
            }
            var d = this.getDialog();
            opt = options;
            d.setTitle(opt.title || "&#160;");
            d.close.setDisplayed(opt.closable !== false);
            activeTextEl = textboxEl;
            opt.prompt = opt.prompt || (opt.multiline ? true : false);
            if(opt.prompt){
                if(opt.multiline){
                    textboxEl.hide();
                    textareaEl.show();
                    textareaEl.setHeight(typeof opt.multiline == "number" ?
                        opt.multiline : this.defaultTextHeight);
                    activeTextEl = textareaEl;
                }else{
                    textboxEl.show();
                    textareaEl.hide();
                }
            }else{
                textboxEl.hide();
                textareaEl.hide();
            }
            progressEl.setDisplayed(opt.progress === true);
            this.updateProgress(0);
            activeTextEl.dom.value = opt.value || "";
            if(opt.prompt){
                dlg.setDefaultButton(activeTextEl);
            }else{
                var bs = opt.buttons;
                var db = null;
                if(bs && bs.ok){
                    db = buttons["ok"];
                }else if(bs && bs.yes){
                    db = buttons["yes"];
                }
                dlg.setDefaultButton(db);
            }
            bwidth = updateButtons(opt.buttons);
            this.updateText(opt.msg);
            if(opt.cls){
                d.el.addClass(opt.cls);
            }
            d.proxyDrag = opt.proxyDrag === true;
            d.modal = opt.modal !== false;
            d.mask = opt.modal !== false ? mask : false;
            if(!d.isVisible()){
                // force it to the end of the z-index stack so it gets a cursor in FF
                document.body.appendChild(dlg.el.dom);
                d.animateTarget = null;
                d.show(options.animEl);
            }
            return this;
        },

        /**
         * Displays a message box with a progress bar.  This message box has no buttons and is not closeable by
         * the user.  You are responsible for updating the progress bar as needed via {@link Roo.MessageBox#updateProgress}
         * and closing the message box when the process is complete.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @return {Roo.MessageBox} This message box
         */
        progress : function(title, msg){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                modal : true
            });
            return this;
        },

        /**
         * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript Window.alert).
         * If a callback function is passed it will be called after the user clicks the button, and the
         * id of the button that was clicked will be passed as the only parameter to the callback
         * (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        alert : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OK,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with an infinitely auto-updating progress bar.  This can be used to block user
         * interaction while waiting for a long-running process to complete that does not have defined intervals.
         * You are responsible for closing the message box when the process is complete.
         * @param {String} msg The message box body text
         * @param {String} title (optional) The title bar text
         * @return {Roo.MessageBox} This message box
         */
        wait : function(msg, title){
            this.show({
                title : title,
                msg : msg,
                buttons: false,
                closable:false,
                progress:true,
                modal:true,
                width:300,
                wait:true
            });
            waitTimer = Roo.TaskMgr.start({
                run: function(i){
                    Roo.MessageBox.updateProgress(((((i+20)%20)+1)*5)*.01);
                },
                interval: 1000
            });
            return this;
        },

        /**
         * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's Window.confirm).
         * If a callback function is passed it will be called after the user clicks either button, and the id of the
         * button that was clicked will be passed as the only parameter to the callback (could also be the top-right close button).
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @return {Roo.MessageBox} This message box
         */
        confirm : function(title, msg, fn, scope){
            this.show({
                title : title,
                msg : msg,
                buttons: this.YESNO,
                fn: fn,
                scope : scope,
                modal : true
            });
            return this;
        },

        /**
         * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to
         * JavaScript's Window.prompt).  The prompt can be a single-line or multi-line textbox.  If a callback function
         * is passed it will be called after the user clicks either button, and the id of the button that was clicked
         * (could also be the top-right close button) and the text that was entered will be passed as the two
         * parameters to the callback.
         * @param {String} title The title bar text
         * @param {String} msg The message box body text
         * @param {Function} fn (optional) The callback function invoked after the message box is closed
         * @param {Object} scope (optional) The scope of the callback function
         * @param {Boolean/Number} multiline (optional) True to create a multiline textbox using the defaultTextHeight
         * property, or the height in pixels to create the textbox (defaults to false / single-line)
         * @return {Roo.MessageBox} This message box
         */
        prompt : function(title, msg, fn, scope, multiline){
            this.show({
                title : title,
                msg : msg,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth:250,
                scope : scope,
                prompt:true,
                multiline: multiline,
                modal : true
            });
            return this;
        },

        /**
         * Button config that displays a single OK button
         * @type Object
         */
        OK : {ok:true},
        /**
         * Button config that displays Yes and No buttons
         * @type Object
         */
        YESNO : {yes:true, no:true},
        /**
         * Button config that displays OK and Cancel buttons
         * @type Object
         */
        OKCANCEL : {ok:true, cancel:true},
        /**
         * Button config that displays Yes, No and Cancel buttons
         * @type Object
         */
        YESNOCANCEL : {yes:true, no:true, cancel:true},

        /**
         * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
         * @type Number
         */
        defaultTextHeight : 75,
        /**
         * The maximum width in pixels of the message box (defaults to 600)
         * @type Number
         */
        maxWidth : 600,
        /**
         * The minimum width in pixels of the message box (defaults to 100)
         * @type Number
         */
        minWidth : 100,
        /**
         * The minimum width in pixels of the message box if it is a progress-style dialog.  This is useful
         * for setting a different minimum width than text-only dialogs may need (defaults to 250)
         * @type Number
         */
        minProgressWidth : 250,
        /**
         * An object containing the default button text strings that can be overriden for localized language support.
         * Supported properties are: ok, cancel, yes and no.
         * Customize the default text like so: Roo.MessageBox.buttonText.yes = "S?";
         * @type Object
         */
        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        }
    };
}();

/**
 * Shorthand for {@link Roo.MessageBox}
 */
Roo.MessageBox = Roo.MessageBox || Roo.bootstrap.MessageBox 
Roo.Msg = Roo.Msg || Roo.MessageBox;
