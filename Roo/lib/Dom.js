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
 * @class Roo.lib.Dom
 * @static
 * 
 * Dom utils (from YIU afaik)
 * 
 **/
Roo.lib.Dom = {
    /**
     * Get the view width
     * @param {Boolean} full True will get the full document, otherwise it's the view width
     * @return {Number} The width
     */
     
    getViewWidth : function(full) {
        return full ? this.getDocumentWidth() : this.getViewportWidth();
    },
    /**
     * Get the view height
     * @param {Boolean} full True will get the full document, otherwise it's the view height
     * @return {Number} The height
     */
    getViewHeight : function(full) {
        return full ? this.getDocumentHeight() : this.getViewportHeight();
    },

    getDocumentHeight: function() {
        var scrollHeight = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return Math.max(scrollHeight, this.getViewportHeight());
    },

    getDocumentWidth: function() {
        var scrollWidth = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return Math.max(scrollWidth, this.getViewportWidth());
    },

    getViewportHeight: function() {
        var height = self.innerHeight;
        var mode = document.compatMode;

        if ((mode || Roo.isIE) && !Roo.isOpera) {
            height = (mode == "CSS1Compat") ?
                     document.documentElement.clientHeight :
                     document.body.clientHeight;
        }

        return height;
    },

    getViewportWidth: function() {
        var width = self.innerWidth;
        var mode = document.compatMode;

        if (mode || Roo.isIE) {
            width = (mode == "CSS1Compat") ?
                    document.documentElement.clientWidth :
                    document.body.clientWidth;
        }
        return width;
    },

    isAncestor : function(p, c) {
        p = Roo.getDom(p);
        c = Roo.getDom(c);
        if (!p || !c) {
            return false;
        }

        if (p.contains && !Roo.isSafari) {
            return p.contains(c);
        } else if (p.compareDocumentPosition) {
            return !!(p.compareDocumentPosition(c) & 16);
        } else {
            var parent = c.parentNode;
            while (parent) {
                if (parent == p) {
                    return true;
                }
                else if (!parent.tagName || parent.tagName.toUpperCase() == "HTML") {
                    return false;
                }
                parent = parent.parentNode;
            }
            return false;
        }
    },

    getRegion : function(el) {
        return Roo.lib.Region.getRegion(el);
    },

    getY : function(el) {
        return this.getXY(el)[1];
    },

    getX : function(el) {
        return this.getXY(el)[0];
    },

    getXY : function(el) {
        var p, pe, b, scroll, bd = document.body;
        el = Roo.getDom(el);
        var fly = Roo.lib.AnimBase.fly;
        if (el.getBoundingClientRect) {
            b = el.getBoundingClientRect();
            scroll = fly(document).getScroll();
            return [b.left + scroll.left, b.top + scroll.top];
        }
        var x = 0, y = 0;

        p = el;

        var hasAbsolute = fly(el).getStyle("position") == "absolute";

        while (p) {

            x += p.offsetLeft;
            y += p.offsetTop;

            if (!hasAbsolute && fly(p).getStyle("position") == "absolute") {
                hasAbsolute = true;
            }

            if (Roo.isGecko) {
                pe = fly(p);

                var bt = parseInt(pe.getStyle("borderTopWidth"), 10) || 0;
                var bl = parseInt(pe.getStyle("borderLeftWidth"), 10) || 0;


                x += bl;
                y += bt;


                if (p != el && pe.getStyle('overflow') != 'visible') {
                    x += bl;
                    y += bt;
                }
            }
            p = p.offsetParent;
        }

        if (Roo.isSafari && hasAbsolute) {
            x -= bd.offsetLeft;
            y -= bd.offsetTop;
        }

        if (Roo.isGecko && !hasAbsolute) {
            var dbd = fly(bd);
            x += parseInt(dbd.getStyle("borderLeftWidth"), 10) || 0;
            y += parseInt(dbd.getStyle("borderTopWidth"), 10) || 0;
        }

        p = el.parentNode;
        while (p && p != bd) {
            if (!Roo.isOpera || (p.tagName != 'TR' && fly(p).getStyle("display") != "inline")) {
                x -= p.scrollLeft;
                y -= p.scrollTop;
            }
            p = p.parentNode;
        }
        return [x, y];
    },
 
  


    setXY : function(el, xy) {
        el = Roo.fly(el, '_setXY');
        Roo.log(el);
        el.position();
        var pts = el.translatePoints(xy);
        if (xy[0] !== false) {
            el.dom.style.left = pts.left + "px";
        }
        if (xy[1] !== false) {
            el.dom.style.top = pts.top + "px";
        }
    },

    setX : function(el, x) {
        this.setXY(el, [x, false]);
    },

    setY : function(el, y) {
        this.setXY(el, [false, y]);
    }
};
