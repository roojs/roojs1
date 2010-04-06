/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
    (function() {
        Roo.lib.Scroll = function(el, attributes, duration, method) {
            if (el) {
                Roo.lib.Scroll.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Roo.extend(Roo.lib.Scroll, Roo.lib.ColorAnim);


        var Y = Roo.lib;
        var superclass = Y.Scroll.superclass;
        var proto = Y.Scroll.prototype;

        proto.toString = function() {
            var el = this.getEl();
            var id = el.id || el.tagName;
            return ("Scroll " + id);
        };

        proto.doMethod = function(attr, start, end) {
            var val = null;

            if (attr == 'scroll') {
                val = [
                        this.method(this.currentFrame, start[0], end[0] - start[0], this.totalFrames),
                        this.method(this.currentFrame, start[1], end[1] - start[1], this.totalFrames)
                        ];

            } else {
                val = superclass.doMethod.call(this, attr, start, end);
            }
            return val;
        };

        proto.getAttribute = function(attr) {
            var val = null;
            var el = this.getEl();

            if (attr == 'scroll') {
                val = [ el.scrollLeft, el.scrollTop ];
            } else {
                val = superclass.getAttribute.call(this, attr);
            }

            return val;
        };

        proto.setAttribute = function(attr, val, unit) {
            var el = this.getEl();

            if (attr == 'scroll') {
                el.scrollLeft = val[0];
                el.scrollTop = val[1];
            } else {
                superclass.setAttribute.call(this, attr, val, unit);
            }
        };
    })();
