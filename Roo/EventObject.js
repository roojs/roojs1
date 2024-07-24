
/**
 * @class Roo.EventObject
 * EventObject exposes the Yahoo! UI Event functionality directly on the object
 * passed to your event handler. It exists mostly for convenience. It also fixes the annoying null checks automatically to cleanup your code 
 * Example:
 * <pre><code>
 function handleClick(e){ // e is not a standard event object, it is a Roo.EventObject
    e.preventDefault();
    var target = e.getTarget();
    ...
 }
 var myDiv = Roo.get("myDiv");
 myDiv.on("click", handleClick);
 //or
 Roo.EventManager.on("myDiv", 'click', handleClick);
 Roo.EventManager.addListener("myDiv", 'click', handleClick);
 </code></pre>
 * @static
 */
Roo.EventObject = function(){
    
    var E = Roo.lib.Event;
    
    // safari keypress events for special keys return bad keycodes
    var safariKeys = {
        63234 : 37, // left
        63235 : 39, // right
        63232 : 38, // up
        63233 : 40, // down
        63276 : 33, // page up
        63277 : 34, // page down
        63272 : 46, // delete
        63273 : 36, // home
        63275 : 35  // end
    };

    // normalize button clicks
    var btnMap = Roo.isIE ? {1:0,4:1,2:2} :
                (Roo.isSafari ? {1:0,2:1,3:2} : {0:0,1:1,2:2});

    Roo.EventObjectImpl = function(e){
        if(e){
            this.setEvent(e.browserEvent || e);
        }
    };
    Roo.EventObjectImpl.prototype = {
        /**
         * Used to fix doc tools.
         * @scope Roo.EventObject.prototype
         */
            

        
        
        /** The normal browser event */
        browserEvent : null,
        /** The button pressed in a mouse event */
        button : -1,
        /** True if the shift key was down during the event */
        shiftKey : false,
        /** True if the control key was down during the event */
        ctrlKey : false,
        /** True if the alt key was down during the event */
        altKey : false,

        /** Key constant 
        * @type Number */
        BACKSPACE : 8,
        /** Key constant 
        * @type Number */
        TAB : 9,
        /** Key constant 
        * @type Number */
        RETURN : 13,
        /** Key constant 
        * @type Number */
        ENTER : 13,
        /** Key constant 
        * @type Number */
        SHIFT : 16,
        /** Key constant 
        * @type Number */
        CONTROL : 17,
        /** Key constant 
        * @type Number */
        ESC : 27,
        /** Key constant 
        * @type Number */
        SPACE : 32,
        /** Key constant 
        * @type Number */
        PAGEUP : 33,
        /** Key constant 
        * @type Number */
        PAGEDOWN : 34,
        /** Key constant 
        * @type Number */
        END : 35,
        /** Key constant 
        * @type Number */
        HOME : 36,
        /** Key constant 
        * @type Number */
        LEFT : 37,
        /** Key constant 
        * @type Number */
        UP : 38,
        /** Key constant 
        * @type Number */
        RIGHT : 39,
        /** Key constant 
        * @type Number */
        DOWN : 40,
        /** Key constant 
        * @type Number */
        DELETE : 46,
        /** Key constant 
        * @type Number */
        F5 : 116,

           /** @private */
        setEvent : function(e){
            if(e == this || (e && e.browserEvent)){ // already wrapped
                return e;
            }
            this.browserEvent = e;
            if(e){
                // normalize buttons
                this.button = e.button ? btnMap[e.button] : (e.which ? e.which-1 : -1);
                if(e.type == 'click' && this.button == -1){
                    this.button = 0;
                }
                this.type = e.type;
                this.shiftKey = e.shiftKey;
                // mac metaKey behaves like ctrlKey
                this.ctrlKey = e.ctrlKey || e.metaKey;
                this.altKey = e.altKey;
                // in getKey these will be normalized for the mac
                this.keyCode = e.keyCode;
                // keyup warnings on firefox.
                this.charCode = (e.type == 'keyup' || e.type == 'keydown') ? 0 : e.charCode;
                // cache the target for the delayed and or buffered events
                this.target = E.getTarget(e);
                // same for XY
                this.xy = E.getXY(e);
            }else{
                this.button = -1;
                this.shiftKey = false;
                this.ctrlKey = false;
                this.altKey = false;
                this.keyCode = 0;
                this.charCode =0;
                this.target = null;
                this.xy = [0, 0];
            }
            return this;
        },

        /**
         * Stop the event (preventDefault and stopPropagation)
         */
        stopEvent : function(){
            if(this.browserEvent){
                if(this.browserEvent.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopEvent(this.browserEvent);
            }
        },

        /**
         * Prevents the browsers default handling of the event.
         */
        preventDefault : function(){
            if(this.browserEvent){
                E.preventDefault(this.browserEvent);
            }
        },

        /** @private */
        isNavKeyPress : function(){
            var k = this.keyCode;
            k = Roo.isSafari ? (safariKeys[k] || k) : k;
            return (k >= 33 && k <= 40) || k == this.RETURN || k == this.TAB || k == this.ESC;
        },

        isSpecialKey : function(){
            var k = this.keyCode;
            return (this.type == 'keypress' && this.ctrlKey) || k == 9 || k == 13  || k == 40 || k == 27 ||
            (k == 16) || (k == 17) ||
            (k >= 18 && k <= 20) ||
            (k >= 33 && k <= 35) ||
            (k >= 36 && k <= 39) ||
            (k >= 44 && k <= 45);
        },
        /**
         * Cancels bubbling of the event.
         */
        stopPropagation : function(){
            if(this.browserEvent){
                if(this.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopPropagation(this.browserEvent);
            }
        },

        /**
         * Gets the key code for the event.
         * @return {Number}
         */
        getCharCode : function(){
            return this.charCode || this.keyCode;
        },

        /**
         * Returns a normalized keyCode for the event.
         * @return {Number} The key code
         */
        getKey : function(){
            var k = this.keyCode || this.charCode;
            return Roo.isSafari ? (safariKeys[k] || k) : k;
        },

        /**
         * Gets the x coordinate of the event.
         * @return {Number}
         */
        getPageX : function(){
            return this.xy[0];
        },

        /**
         * Gets the y coordinate of the event.
         * @return {Number}
         */
        getPageY : function(){
            return this.xy[1];
        },

        /**
         * Gets the time of the event.
         * @return {Number}
         */
        getTime : function(){
            if(this.browserEvent){
                return E.getTime(this.browserEvent);
            }
            return null;
        },

        /**
         * Gets the page coordinates of the event.
         * @return {Array} The xy values like [x, y]
         */
        getXY : function(){
            return this.xy;
        },

        /**
         * Gets the target for the event.
         * @param {String} selector (optional) A simple selector to filter the target or look for an ancestor of the target
         * @param {Number/String/HTMLElement/Element} maxDepth (optional) The max depth to
                search as a number or element (defaults to 10 || document.body)
         * @param {Boolean} returnEl (optional) True to return a Roo.Element object instead of DOM node
         * @return {HTMLelement}
         */
        getTarget : function(selector, maxDepth, returnEl){
            return selector ? Roo.fly(this.target).findParent(selector, maxDepth, returnEl) : this.target;
        },
        /**
         * Gets the related target.
         * @return {HTMLElement}
         */
        getRelatedTarget : function(){
            if(this.browserEvent){
                return E.getRelatedTarget(this.browserEvent);
            }
            return null;
        },

        /**
         * Normalizes mouse wheel delta across browsers
         * @return {Number} The delta
         */
        getWheelDelta : function(){
            var e = this.browserEvent;
            var delta = 0;
            if(e.wheelDelta){ /* IE/Opera. */
                delta = e.wheelDelta/120;
            }else if(e.detail){ /* Mozilla case. */
                delta = -e.detail/3;
            }
            return delta;
        },

        /**
         * Returns true if the control, meta, shift or alt key was pressed during this event.
         * @return {Boolean}
         */
        hasModifier : function(){
            return !!((this.ctrlKey || this.altKey) || this.shiftKey);
        },

        /**
         * Returns true if the target of this event equals el or is a child of el
         * @param {String/HTMLElement/Element} el
         * @param {Boolean} related (optional) true to test if the related target is within el instead of the target
         * @return {Boolean}
         */
        within : function(el, related){
            var t = this[related ? "getRelatedTarget" : "getTarget"]();
            return t && Roo.fly(el).contains(t);
        },

        getPoint : function(){
            return new Roo.lib.Point(this.xy[0], this.xy[1]);
        }
    };

    return new Roo.EventObjectImpl();
}();
            
    