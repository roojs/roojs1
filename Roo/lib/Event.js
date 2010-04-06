/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */

Roo.lib.Event = function() {
    var loadComplete = false;
    var listeners = [];
    var unloadListeners = [];
    var retryCount = 0;
    var onAvailStack = [];
    var counter = 0;
    var lastError = null;

    return {
        POLL_RETRYS: 200,
        POLL_INTERVAL: 20,
        EL: 0,
        TYPE: 1,
        FN: 2,
        WFN: 3,
        OBJ: 3,
        ADJ_SCOPE: 4,
        _interval: null,

        startInterval: function() {
            if (!this._interval) {
                var self = this;
                var callback = function() {
                    self._tryPreloadAttach();
                };
                this._interval = setInterval(callback, this.POLL_INTERVAL);

            }
        },

        onAvailable: function(p_id, p_fn, p_obj, p_override) {
            onAvailStack.push({ id:         p_id,
                fn:         p_fn,
                obj:        p_obj,
                override:   p_override,
                checkReady: false    });

            retryCount = this.POLL_RETRYS;
            this.startInterval();
        },


        addListener: function(el, eventName, fn) {
            el = Roo.getDom(el);
            if (!el || !fn) {
                return false;
            }

            if ("unload" == eventName) {
                unloadListeners[unloadListeners.length] =
                [el, eventName, fn];
                return true;
            }

            var wrappedFn = function(e) {
                return fn(Roo.lib.Event.getEvent(e));
            };

            var li = [el, eventName, fn, wrappedFn];

            var index = listeners.length;
            listeners[index] = li;

            this.doAdd(el, eventName, wrappedFn, false);
            return true;

        },


        removeListener: function(el, eventName, fn) {
            var i, len;

            el = Roo.getDom(el);

            if(!fn) {
                return this.purgeElement(el, false, eventName);
            }


            if ("unload" == eventName) {

                for (i = 0,len = unloadListeners.length; i < len; i++) {
                    var li = unloadListeners[i];
                    if (li &&
                        li[0] == el &&
                        li[1] == eventName &&
                        li[2] == fn) {
                        unloadListeners.splice(i, 1);
                        return true;
                    }
                }

                return false;
            }

            var cacheItem = null;


            var index = arguments[3];

            if ("undefined" == typeof index) {
                index = this._getCacheIndex(el, eventName, fn);
            }

            if (index >= 0) {
                cacheItem = listeners[index];
            }

            if (!el || !cacheItem) {
                return false;
            }

            this.doRemove(el, eventName, cacheItem[this.WFN], false);

            delete listeners[index][this.WFN];
            delete listeners[index][this.FN];
            listeners.splice(index, 1);

            return true;

        },


        getTarget: function(ev, resolveTextNode) {
            ev = ev.browserEvent || ev;
            var t = ev.target || ev.srcElement;
            return this.resolveTextNode(t);
        },


        resolveTextNode: function(node) {
            if (Roo.isSafari && node && 3 == node.nodeType) {
                return node.parentNode;
            } else {
                return node;
            }
        },


        getPageX: function(ev) {
            ev = ev.browserEvent || ev;
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;

                if (Roo.isIE) {
                    x += this.getScroll()[1];
                }
            }

            return x;
        },


        getPageY: function(ev) {
            ev = ev.browserEvent || ev;
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;

                if (Roo.isIE) {
                    y += this.getScroll()[0];
                }
            }


            return y;
        },


        getXY: function(ev) {
            ev = ev.browserEvent || ev;
            return [this.getPageX(ev), this.getPageY(ev)];
        },


        getRelatedTarget: function(ev) {
            ev = ev.browserEvent || ev;
            var t = ev.relatedTarget;
            if (!t) {
                if (ev.type == "mouseout") {
                    t = ev.toElement;
                } else if (ev.type == "mouseover") {
                    t = ev.fromElement;
                }
            }

            return this.resolveTextNode(t);
        },


        getTime: function(ev) {
            ev = ev.browserEvent || ev;
            if (!ev.time) {
                var t = new Date().getTime();
                try {
                    ev.time = t;
                } catch(ex) {
                    this.lastError = ex;
                    return t;
                }
            }

            return ev.time;
        },


        stopEvent: function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },


        stopPropagation: function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },


        preventDefault: function(ev) {
            ev = ev.browserEvent || ev;
            if(ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },


        getEvent: function(e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        },


        getCharCode: function(ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },


        _getCacheIndex: function(el, eventName, fn) {
            for (var i = 0,len = listeners.length; i < len; ++i) {
                var li = listeners[i];
                if (li &&
                    li[this.FN] == fn &&
                    li[this.EL] == el &&
                    li[this.TYPE] == eventName) {
                    return i;
                }
            }

            return -1;
        },


        elCache: {},


        getEl: function(id) {
            return document.getElementById(id);
        },


        clearCache: function() {
        },


        _load: function(e) {
            loadComplete = true;
            var EU = Roo.lib.Event;


            if (Roo.isIE) {
                EU.doRemove(window, "load", EU._load);
            }
        },


        _tryPreloadAttach: function() {

            if (this.locked) {
                return false;
            }

            this.locked = true;


            var tryAgain = !loadComplete;
            if (!tryAgain) {
                tryAgain = (retryCount > 0);
            }


            var notAvail = [];
            for (var i = 0,len = onAvailStack.length; i < len; ++i) {
                var item = onAvailStack[i];
                if (item) {
                    var el = this.getEl(item.id);

                    if (el) {
                        if (!item.checkReady ||
                            loadComplete ||
                            el.nextSibling ||
                            (document && document.body)) {

                            var scope = el;
                            if (item.override) {
                                if (item.override === true) {
                                    scope = item.obj;
                                } else {
                                    scope = item.override;
                                }
                            }
                            item.fn.call(scope, item.obj);
                            onAvailStack[i] = null;
                        }
                    } else {
                        notAvail.push(item);
                    }
                }
            }

            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

            if (tryAgain) {

                this.startInterval();
            } else {
                clearInterval(this._interval);
                this._interval = null;
            }

            this.locked = false;

            return true;

        },


        purgeElement: function(el, recurse, eventName) {
            var elListeners = this.getListeners(el, eventName);
            if (elListeners) {
                for (var i = 0,len = elListeners.length; i < len; ++i) {
                    var l = elListeners[i];
                    this.removeListener(el, l.type, l.fn);
                }
            }

            if (recurse && el && el.childNodes) {
                for (i = 0,len = el.childNodes.length; i < len; ++i) {
                    this.purgeElement(el.childNodes[i], recurse, eventName);
                }
            }
        },


        getListeners: function(el, eventName) {
            var results = [], searchLists;
            if (!eventName) {
                searchLists = [listeners, unloadListeners];
            } else if (eventName == "unload") {
                searchLists = [unloadListeners];
            } else {
                searchLists = [listeners];
            }

            for (var j = 0; j < searchLists.length; ++j) {
                var searchList = searchLists[j];
                if (searchList && searchList.length > 0) {
                    for (var i = 0,len = searchList.length; i < len; ++i) {
                        var l = searchList[i];
                        if (l && l[this.EL] === el &&
                            (!eventName || eventName === l[this.TYPE])) {
                            results.push({
                                type:   l[this.TYPE],
                                fn:     l[this.FN],
                                obj:    l[this.OBJ],
                                adjust: l[this.ADJ_SCOPE],
                                index:  i
                            });
                        }
                    }
                }
            }

            return (results.length) ? results : null;
        },


        _unload: function(e) {

            var EU = Roo.lib.Event, i, j, l, len, index;

            for (i = 0,len = unloadListeners.length; i < len; ++i) {
                l = unloadListeners[i];
                if (l) {
                    var scope = window;
                    if (l[EU.ADJ_SCOPE]) {
                        if (l[EU.ADJ_SCOPE] === true) {
                            scope = l[EU.OBJ];
                        } else {
                            scope = l[EU.ADJ_SCOPE];
                        }
                    }
                    l[EU.FN].call(scope, EU.getEvent(e), l[EU.OBJ]);
                    unloadListeners[i] = null;
                    l = null;
                    scope = null;
                }
            }

            unloadListeners = null;

            if (listeners && listeners.length > 0) {
                j = listeners.length;
                while (j) {
                    index = j - 1;
                    l = listeners[index];
                    if (l) {
                        EU.removeListener(l[EU.EL], l[EU.TYPE],
                                l[EU.FN], index);
                    }
                    j = j - 1;
                }
                l = null;

                EU.clearCache();
            }

            EU.doRemove(window, "unload", EU._unload);

        },


        getScroll: function() {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollTop || dd.scrollLeft)) {
                return [dd.scrollTop, dd.scrollLeft];
            } else if (db) {
                return [db.scrollTop, db.scrollLeft];
            } else {
                return [0, 0];
            }
        },


        doAdd: function () {
            if (window.addEventListener) {
                return function(el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }(),


        doRemove: function() {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function() {
                };
            }
        }()
    };
    
}();
(function() {     
   
    var E = Roo.lib.Event;
    E.on = E.addListener;
    E.un = E.removeListener;

    if (document && document.body) {
        E._load();
    } else {
        E.doAdd(window, "load", E._load);
    }
    E.doAdd(window, "unload", E._unload);
    E._tryPreloadAttach();
})();

