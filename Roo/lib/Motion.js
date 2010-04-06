/*
 * Portions of this file are based on pieces of Yahoo User Interface Library
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * YUI licensed under the BSD License:
 * http://developer.yahoo.net/yui/license.txt
 * <script type="text/javascript">
 *
 */
    (function() {
        Roo.lib.Motion = function(el, attributes, duration, method) {
            if (el) {
                Roo.lib.Motion.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Roo.extend(Roo.lib.Motion, Roo.lib.ColorAnim);


        var Y = Roo.lib;
        var superclass = Y.Motion.superclass;
        var proto = Y.Motion.prototype;

        proto.toString = function() {
            var el = this.getEl();
            var id = el.id || el.tagName;
            return ("Motion " + id);
        };

        proto.patterns.points = /^points$/i;

        proto.setAttribute = function(attr, val, unit) {
            if (this.patterns.points.test(attr)) {
                unit = unit || 'px';
                superclass.setAttribute.call(this, 'left', val[0], unit);
                superclass.setAttribute.call(this, 'top', val[1], unit);
            } else {
                superclass.setAttribute.call(this, attr, val, unit);
            }
        };

        proto.getAttribute = function(attr) {
            if (this.patterns.points.test(attr)) {
                var val = [
                        superclass.getAttribute.call(this, 'left'),
                        superclass.getAttribute.call(this, 'top')
                        ];
            } else {
                val = superclass.getAttribute.call(this, attr);
            }

            return val;
        };

        proto.doMethod = function(attr, start, end) {
            var val = null;

            if (this.patterns.points.test(attr)) {
                var t = this.method(this.currentFrame, 0, 100, this.totalFrames) / 100;
                val = Y.Bezier.getPosition(this.runtimeAttributes[attr], t);
            } else {
                val = superclass.doMethod.call(this, attr, start, end);
            }
            return val;
        };

        proto.setRuntimeAttribute = function(attr) {
            if (this.patterns.points.test(attr)) {
                var el = this.getEl();
                var attributes = this.attributes;
                var start;
                var control = attributes['points']['control'] || [];
                var end;
                var i, len;

                if (control.length > 0 && !(control[0] instanceof Array)) {
                    control = [control];
                } else {
                    var tmp = [];
                    for (i = 0,len = control.length; i < len; ++i) {
                        tmp[i] = control[i];
                    }
                    control = tmp;
                }

                Roo.fly(el).position();

                if (isset(attributes['points']['from'])) {
                    Roo.lib.Dom.setXY(el, attributes['points']['from']);
                }
                else {
                    Roo.lib.Dom.setXY(el, Roo.lib.Dom.getXY(el));
                }

                start = this.getAttribute('points');


                if (isset(attributes['points']['to'])) {
                    end = translateValues.call(this, attributes['points']['to'], start);

                    var pageXY = Roo.lib.Dom.getXY(this.getEl());
                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = translateValues.call(this, control[i], start);
                    }


                } else if (isset(attributes['points']['by'])) {
                    end = [ start[0] + attributes['points']['by'][0], start[1] + attributes['points']['by'][1] ];

                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                    }
                }

                this.runtimeAttributes[attr] = [start];

                if (control.length > 0) {
                    this.runtimeAttributes[attr] = this.runtimeAttributes[attr].concat(control);
                }

                this.runtimeAttributes[attr][this.runtimeAttributes[attr].length] = end;
            }
            else {
                superclass.setRuntimeAttribute.call(this, attr);
            }
        };

        var translateValues = function(val, start) {
            var pageXY = Roo.lib.Dom.getXY(this.getEl());
            val = [ val[0] - pageXY[0] + start[0], val[1] - pageXY[1] + start[1] ];

            return val;
        };

        var isset = function(prop) {
            return (typeof prop !== 'undefined');
        };
    })();
