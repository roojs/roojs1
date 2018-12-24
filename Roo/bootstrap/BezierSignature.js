/**
*    This script refer to:
*    Title: Signature Pad
*    Author: szimek
*    Availability: https://github.com/szimek/signature_pad
**/

/**
 * @class Roo.bootstrap.BezierSignature
 * @extends Roo.bootstrap.Component
 * Bootstrap BezierSignature class
 * 
 * @constructor
 * Create a new BezierSignature
 * @param {Object} config The config object
 */

Roo.bootstrap.BezierSignature = function(config){
    Roo.bootstrap.BezierSignature.superclass.constructor.call(this, config);
    
    this.addEvents({
        // raw events
        /**
         * @event click
         * When a Brick is click
         * @param {Roo.bootstrap.Brick} this
         * @param {Roo.EventObject} e
         */
        "click" : true
    });
};

Roo.extend(Roo.bootstrap.BezierSignature, Roo.bootstrap.Component,  {
    
    /**
     * @cfg(float or function) Radius of a single dot.
     */ 
    dotSize: false,
    
    /**
     * @cfg(float) Minimum width of a line. Defaults to 0.5.
     */
    minWidth: 0.5,
    
    /**
     * @cfg(float) Maximum width of a line. Defaults to 2.5.
     */
    maxWidth: 2.5,
    
    /**
     * @cfg(integer) Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.
     */
    throttle: 16,
    
    /**
     * @cfg(integer) Add the next point only if the previous one is farther than x pixels. Defaults to 5.
     */
    minDistance: 5,
    
    /**
     * @cfg(string) Color used to clear the background. Can be any color format accepted by context.fillStyle. Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images.
     */
    backgroundColor: 'rgba(0,0,0,0)',
    
    /**
     * @cfg(string) Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black".
     */
    penColor: 'black',
    
    /**
     * @cfg(float) Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.
     */
    velocityFilterWeight: 0.7,
    
    /**
     * @cfg(function) Callback when stroke begin.
     */
    onBegin: false,
    
    /**
     * @cfg(function) Callback when stroke end.
     */
    onEnd: false,
    
    Point: (function () {
        function Point(x, y, time) {
            this.x = x;
            this.y = y;
            this.time = time || Date.now();
        }
        Point.prototype.distanceTo = function (start) {
            return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
        };
        Point.prototype.equals = function (other) {
            return this.x === other.x && this.y === other.y && this.time === other.time;
        };
        Point.prototype.velocityFrom = function (start) {
            return this.time !== start.time
            ? this.distanceTo(start) / (this.time - start.time)
            : 0;
        };
        return Point;
    }()),
    
    Bezier: (function () {
        function Bezier(startPoint, control2, control1, endPoint, startWidth, endWidth) {
            this.startPoint = startPoint;
            this.control2 = control2;
            this.control1 = control1;
            this.endPoint = endPoint;
            this.startWidth = startWidth;
            this.endWidth = endWidth;
        }
        Bezier.fromPoints = function (points, widths) {
            var c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
            var c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
            return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
        };
        Bezier.calculateControlPoints = function (s1, s2, s3) {
            var dx1 = s1.x - s2.x;
            var dy1 = s1.y - s2.y;
            var dx2 = s2.x - s3.x;
            var dy2 = s2.y - s3.y;
            var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
            var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
            var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            var dxm = m1.x - m2.x;
            var dym = m1.y - m2.y;
            var k = l2 / (l1 + l2);
            var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
            var tx = s2.x - cm.x;
            var ty = s2.y - cm.y;
            return {
                c1: new Point(m1.x + tx, m1.y + ty),
                c2: new Point(m2.x + tx, m2.y + ty)
            };
        };
        Bezier.prototype.length = function () {
            var steps = 10;
            var length = 0;
            var px;
            var py;
            for (var i = 0; i <= steps; i += 1) {
                var t = i / steps;
                var cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
                var cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
                if (i > 0) {
                    var xdiff = cx - px;
                    var ydiff = cy - py;
                    length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                }
                px = cx;
                py = cy;
            }
            return length;
        };
        Bezier.prototype.point = function (t, start, c1, c2, end) {
            return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))
            + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)
            + (3.0 * c2 * (1.0 - t) * t * t)
            + (end * t * t * t);
        };
        return Bezier;
    }()),
    
    getAutoCreate : function()
    {
        var cls = 'roo-signature';
        
        if(this.cls){
            cls += ' ' + this.cls;
        }
        
        var cfg = {
            tag: 'div',
            cls: cls,
            cn: [
                {
                    tag: 'div',
                    cls: 'roo-signature-body',
                    cn: [
                        {
                            tag: 'canvas',
                            cls: 'roo-signature-footer'
                        }
                    ]
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        // assign all object in here...
    },
    
    isValid: function()
    {
        // form cannot detect...
    }
    
});

 

 