/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Roo.EventManager
 * Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides 
 * several useful events directly.
 * See {@link Roo.EventObject} for more details on normalized event objects.
 * @static
 */
Roo.EventManager = function(){
    var docReadyEvent, docReadyProcId, docReadyState = false;
    var resizeEvent, resizeTask, textEvent, textSize;
    var E = Roo.lib.Event;
    var D = Roo.lib.Dom;

    
    

    var fireDocReady = function(){
        if(!docReadyState){
            docReadyState = true;
            Roo.isReady = true;
            if(docReadyProcId){
                clearInterval(docReadyProcId);
            }
            if(Roo.isGecko || Roo.isOpera) {
                document.removeEventListener("DOMContentLoaded", fireDocReady, false);
            }
            if(Roo.isIE){
                var defer = document.getElementById("ie-deferred-loader");
                if(defer){
                    defer.onreadystatechange = null;
                    defer.parentNode.removeChild(defer);
                }
            }
            if(docReadyEvent){
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
            }
        }
    };
    
    var initDocReady = function(){
        docReadyEvent = new Roo.util.Event();
        if(Roo.isGecko || Roo.isOpera) {
            document.addEventListener("DOMContentLoaded", fireDocReady, false);
        }else if(Roo.isIE){
            document.write("<s"+'cript id="ie-deferred-loader" defer="defer" src="/'+'/:"></s'+"cript>");
            var defer = document.getElementById("ie-deferred-loader");
            defer.onreadystatechange = function(){
                if(this.readyState == "complete"){
                    fireDocReady();
                }
            };
        }else if(Roo.isSafari){ 
            docReadyProcId = setInterval(function(){
                var rs = document.readyState;
                if(rs == "complete") {
                    fireDocReady();     
                 }
            }, 10);
        }
        // no matter what, make sure it fires on load
        E.on(window, "load", fireDocReady);
    };

    var createBuffered = function(h, o){
        var task = new Roo.util.DelayedTask(h);
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Roo.EventObjectImpl(e);
            task.delay(o.buffer, h, null, [e]);
        };
    };

    var createSingle = function(h, el, ename, fn){
        return function(e){
            Roo.EventManager.removeListener(el, ename, fn);
            h(e);
        };
    };

    var createDelayed = function(h, o){
        return function(e){
            // create new event object impl so new events don't wipe out properties
            e = new Roo.EventObjectImpl(e);
            setTimeout(function(){
                h(e);
            }, o.delay || 10);
        };
    };
    var transitionEndVal = false;
    
    var transitionEnd = function()
    {
        if (transitionEndVal) {
            return transitionEndVal;
        }
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        };
    
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                transitionEndVal = transEndEventNames[name];
                return  transitionEndVal ;
            }
        }
    }
    
  

    var listen = function(element, ename, opt, fn, scope)
    {
        var o = (!opt || typeof opt == "boolean") ? {} : opt;
        fn = fn || o.fn; scope = scope || o.scope;
        var el = Roo.getDom(element);
        
        
        if(!el){
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        
        if (ename == 'transitionend') {
            ename = transitionEnd();
        }
        var h = function(e){
            e = Roo.EventObject.setEvent(e);
            var t;
            if(o.delegate){
                t = e.getTarget(o.delegate, el);
                if(!t){
                    return;
                }
            }else{
                t = e.target;
            }
            if(o.stopEvent === true){
                e.stopEvent();
            }
            if(o.preventDefault === true){
               e.preventDefault();
            }
            if(o.stopPropagation === true){
                e.stopPropagation();
            }

            if(o.normalized === false){
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if(o.delay){
            h = createDelayed(h, o);
        }
        if(o.single){
            h = createSingle(h, el, ename, fn);
        }
        if(o.buffer){
            h = createBuffered(h, o);
        }
        
        fn._handlers = fn._handlers || [];
        
        
        fn._handlers.push([Roo.id(el), ename, h]);
        
        
         
        E.on(el, ename, h); // this adds the actuall listener to the object..
        
        
        if(ename == "mousewheel" && el.addEventListener){ // workaround for jQuery
            el.addEventListener("DOMMouseScroll", h, false);
            E.on(window, 'unload', function(){
                el.removeEventListener("DOMMouseScroll", h, false);
            });
        }
        if(ename == "mousedown" && el == document){ // fix stopped mousedowns on the document
            Roo.EventManager.stoppedMouseDownEvent.addListener(h);
        }
        return h;
    };

    var stopListening = function(el, ename, fn){
        var id = Roo.id(el), hds = fn._handlers, hd = fn;
        if(hds){
            for(var i = 0, len = hds.length; i < len; i++){
                var h = hds[i];
                if(h[0] == id && h[1] == ename){
                    hd = h[2];
                    hds.splice(i, 1);
                    break;
                }
            }
        }
        E.un(el, ename, hd);
        el = Roo.getDom(el);
        if(ename == "mousewheel" && el.addEventListener){
            el.removeEventListener("DOMMouseScroll", hd, false);
        }
        if(ename == "mousedown" && el == document){ // fix stopped mousedowns on the document
            Roo.EventManager.stoppedMouseDownEvent.removeListener(hd);
        }
    };

    var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
    
    var pub = {
        
        
        /** 
         * Fix for doc tools
         * @scope Roo.EventManager
         */
        
        
        /** 
         * This is no longer needed and is deprecated. Places a simple wrapper around an event handler to override the browser event
         * object with a Roo.EventObject
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  override If true, the obj passed in becomes
         *                             the execution scope of the listener
         * @return {Function} The wrapped function
         * @deprecated
         */
        wrap : function(fn, scope, override){
            return function(e){
                Roo.EventObject.setEvent(e);
                fn.call(override ? scope || window : window, Roo.EventObject, scope);
            };
        },
        
        /**
     * Appends an event handler to an element (shorthand for addListener)
     * @param {String/HTMLElement}   element        The html element or id to assign the
     * @param {String}   eventName The type of event to listen for
     * @param {Function} handler The method the event invokes
     * @param {Object}   scope (optional) The scope in which to execute the handler
     * function. The handler function's "this" context.
     * @param {Object}   options (optional) An object containing handler configuration
     * properties. This may contain any of the following properties:<ul>
     * <li>scope {Object} The scope in which to execute the handler function. The handler function's "this" context.</li>
     * <li>delegate {String} A simple selector to filter the target or look for a descendant of the target</li>
     * <li>stopEvent {Boolean} True to stop the event. That is stop propagation, and prevent the default action.</li>
     * <li>preventDefault {Boolean} True to prevent the default action</li>
     * <li>stopPropagation {Boolean} True to prevent event propagation</li>
     * <li>normalized {Boolean} False to pass a browser event to the handler function instead of an Roo.EventObject</li>
     * <li>delay {Number} The number of milliseconds to delay the invocation of the handler after te event fires.</li>
     * <li>single {Boolean} True to add a handler to handle just the next firing of the event, and then remove itself.</li>
     * <li>buffer {Number} Causes the handler to be scheduled to run in an {@link Roo.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    stopEvent : true,
    forumId: 4
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
      * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <p>
     * Code:<pre><code>
el.on({
    'click' : {
        fn: this.onClick
        scope: this,
        delay: 100
    },
    'mouseover' : {
        fn: this.onMouseOver
        scope: this
    },
    'mouseout' : {
        fn: this.onMouseOut
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code>
el.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut
    scope: this
});</code></pre>
     */
        addListener : function(element, eventName, fn, scope, options){
            if(typeof eventName == "object"){
                var o = eventName;
                for(var e in o){
                    if(propRe.test(e)){
                        continue;
                    }
                    if(typeof o[e] == "function"){
                        // shared options
                        listen(element, e, o, o[e], o.scope);
                    }else{
                        // individual options
                        listen(element, e, o[e]);
                    }
                }
                return;
            }
            return listen(element, eventName, options, fn, scope);
        },
        
        /**
         * Removes an event handler
         *
         * @param {String/HTMLElement}   element        The id or html element to remove the 
         *                             event from
         * @param {String}   eventName     The type of event
         * @param {Function} fn
         * @return {Boolean} True if a listener was actually removed
         */
        removeListener : function(element, eventName, fn){
            return stopListening(element, eventName, fn);
        },
        
        /**
         * Fires when the document is ready (before onload and before images are loaded). Can be 
         * accessed shorthanded Roo.onReady().
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An  object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onDocumentReady : function(fn, scope, options){
            if(docReadyState){ // if it already fired
                docReadyEvent.addListener(fn, scope, options);
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
                return;
            }
            if(!docReadyEvent){
                initDocReady();
            }
            docReadyEvent.addListener(fn, scope, options);
        },
        
        /**
         * Fires when the window is resized and provides resize event buffering (50 milliseconds), passes new viewport width and height to handlers.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onWindowResize : function(fn, scope, options)
        {
            if(!resizeEvent){
                resizeEvent = new Roo.util.Event();
                resizeTask = new Roo.util.DelayedTask(function(){
                    resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                });
                E.on(window, "resize", function()
                {
                    if (Roo.isIE) {
                        resizeTask.delay(50);
                    } else {
                        resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                    }
                });
            }
            resizeEvent.addListener(fn, scope, options);
        },

        /**
         * Fires when the user changes the active text size. Handler gets called with 2 params, the old size and the new size.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    An object that becomes the scope of the handler
         * @param {boolean}  options
         */
        onTextResize : function(fn, scope, options){
            if(!textEvent){
                textEvent = new Roo.util.Event();
                var textEl = new Roo.Element(document.createElement('div'));
                textEl.dom.className = 'x-text-resize';
                textEl.dom.innerHTML = 'X';
                textEl.appendTo(document.body);
                textSize = textEl.dom.offsetHeight;
                setInterval(function(){
                    if(textEl.dom.offsetHeight != textSize){
                        textEvent.fire(textSize, textSize = textEl.dom.offsetHeight);
                    }
                }, this.textResizeInterval);
            }
            textEvent.addListener(fn, scope, options);
        },

        /**
         * Removes the passed window resize listener.
         * @param {Function} fn        The method the event invokes
         * @param {Object}   scope    The scope of handler
         */
        removeResizeListener : function(fn, scope){
            if(resizeEvent){
                resizeEvent.removeListener(fn, scope);
            }
        },

        // private
        fireResize : function(){
            if(resizeEvent){
                resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
            }   
        },
        /**
         * Url used for onDocumentReady with using SSL (defaults to Roo.SSL_SECURE_URL)
         */
        ieDeferSrc : false,
        /**
         * The frequency, in milliseconds, to check for text resize events (defaults to 50)
         */
        textResizeInterval : 50
    };
    
    /**
     * Fix for doc tools
     * @scopeAlias pub=Roo.EventManager
     */
    
     /**
     * Appends an event handler to an element (shorthand for addListener)
     * @param {String/HTMLElement}   element        The html element or id to assign the
     * @param {String}   eventName The type of event to listen for
     * @param {Function} handler The method the event invokes
     * @param {Object}   scope (optional) The scope in which to execute the handler
     * function. The handler function's "this" context.
     * @param {Object}   options (optional) An object containing handler configuration
     * properties. This may contain any of the following properties:<ul>
     * <li>scope {Object} The scope in which to execute the handler function. The handler function's "this" context.</li>
     * <li>delegate {String} A simple selector to filter the target or look for a descendant of the target</li>
     * <li>stopEvent {Boolean} True to stop the event. That is stop propagation, and prevent the default action.</li>
     * <li>preventDefault {Boolean} True to prevent the default action</li>
     * <li>stopPropagation {Boolean} True to prevent event propagation</li>
     * <li>normalized {Boolean} False to pass a browser event to the handler function instead of an Roo.EventObject</li>
     * <li>delay {Number} The number of milliseconds to delay the invocation of the handler after te event fires.</li>
     * <li>single {Boolean} True to add a handler to handle just the next firing of the event, and then remove itself.</li>
     * <li>buffer {Number} Causes the handler to be scheduled to run in an {@link Roo.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    stopEvent : true,
    forumId: 4
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
      * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.
     * <p>
     * Code:<pre><code>
el.on({
    'click' : {
        fn: this.onClick
        scope: this,
        delay: 100
    },
    'mouseover' : {
        fn: this.onMouseOver
        scope: this
    },
    'mouseout' : {
        fn: this.onMouseOut
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code>
el.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut
    scope: this
});</code></pre>
     */
    pub.on = pub.addListener;
    pub.un = pub.removeListener;

    pub.stoppedMouseDownEvent = new Roo.util.Event();
    return pub;
}();
/**
  * Fires when the document is ready (before onload and before images are loaded).  Shorthand of {@link Roo.EventManager#onDocumentReady}.
  * @param {Function} fn        The method the event invokes
  * @param {Object}   scope    An  object that becomes the scope of the handler
  * @param {boolean}  override If true, the obj passed in becomes
  *                             the execution scope of the listener
  * @member Roo
  * @method onReady
 */
Roo.onReady = Roo.EventManager.onDocumentReady;

Roo.onReady(function(){
    var bd = Roo.get(document.body);
    if(!bd){ return; }

    var cls = [
            Roo.isIE ? "roo-ie"
            : Roo.isIE11 ? "roo-ie11"
            : Roo.isEdge ? "roo-edge"
            : Roo.isGecko ? "roo-gecko"
            : Roo.isOpera ? "roo-opera"
            : Roo.isSafari ? "roo-safari" : ""];

    if(Roo.isMac){
        cls.push("roo-mac");
    }
    if(Roo.isLinux){
        cls.push("roo-linux");
    }
    if(Roo.isIOS){
        cls.push("roo-ios");
    }
    if(Roo.isTouch){
        cls.push("roo-touch");
    }
    if(Roo.isBorderBox){
        cls.push('roo-border-box');
    }
    if(Roo.isStrict){ // add to the parent to allow for selectors like ".ext-strict .ext-ie"
        
        var p = bd.dom.parentNode;
        if(p){
            p.className += ' roo-strict';
        }
        if (Array.from(document.getElementsByTagName('link')).filter(
                function(e) { return e.href.match(/\/bootstrap.css/); }
        ).length > 0) {
            p.className += ' bootstrap';   
        }
    }
    bd.addClass(cls.join(' '));
});
