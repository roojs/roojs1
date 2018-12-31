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
        "resize" : true
    });
};

Roo.extend(Roo.bootstrap.BezierSignature, Roo.bootstrap.Component,  {
    
    curve_data: [],
    
    is_empty: true,
    
    mouse_btn_down: true,
    
    /**
     * @cfg(int) canvas height
     */
    canvas_height: '200px',
    
    /**
     * @cfg(float or function) Radius of a single dot.
     */ 
    dot_size: false,
    
    /**
     * @cfg(float) Minimum width of a line. Defaults to 0.5.
     */
    min_width: 0.5,
    
    /**
     * @cfg(float) Maximum width of a line. Defaults to 2.5.
     */
    max_width: 2.5,
    
    /**
     * @cfg(integer) Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.
     */
    throttle: 16,
    
    /**
     * @cfg(integer) Add the next point only if the previous one is farther than x pixels. Defaults to 5.
     */
    min_distance: 5,
    
    /**
     * @cfg(string) Color used to clear the background. Can be any color format accepted by context.fillStyle. Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images.
     */
    bg_color: 'rgba(0, 0, 0, 0)',
    
    /**
     * @cfg(string) Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black".
     */
    dot_color: 'black',
    
    /**
     * @cfg(float) Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.
     */
    velocity_filter_weight: 0.7,
    
    /**
     * @cfg(function) Callback when stroke begin.
     */
    onBegin: false,
    
    /**
     * @cfg(function) Callback when stroke end.
     */
    onEnd: false,
    
    getAutoCreate : function()
    {
        var cls = 'roo-signature column';
        
        if(this.cls){
            cls += ' ' + this.cls;
        }
        
        var col_sizes = [
            'lg',
            'md',
            'sm',
            'xs'
        ];
        
        for(var i = 0; i < col_sizes.length; i++) {
            if(this[col_sizes[i]]) {
                cls += " col-"+col_sizes[i]+"-"+this[col_sizes[i]];
            }
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
                            cls: 'roo-signature-body-canvas',
                            height: this.canvas_height,
                            width: this.canvas_width
                        }
                    ]
                }
            ]
        };
        
        return cfg;
    },
    
    initEvents: function() 
    {
        Roo.bootstrap.BezierSignature.superclass.initEvents.call(this);
        
        var canvas = this.canvasEl();
        
        // mouse && touch event swapping...
        canvas.dom.style.touchAction = 'none';
        canvas.dom.style.msTouchAction = 'none';
        
        this.mouse_btn_down = false;
        canvas.on('mousedown', this._handleMouseDown, this);
        canvas.on('mousemove', this._handleMouseMove, this);
        Roo.select('html').first().on('mouseup', this._handleMouseUp, this);
        
        if (window.PointerEvent) {
            canvas.on('pointerdown', this._handleMouseDown, this);
            canvas.on('pointermove', this._handleMouseMove, this);
            Roo.select('html').first().on('pointerup', this._handleMouseUp, this);
        }
        
        if ('ontouchstart' in window) {
            canvas.on('touchstart', this._handleTouchStart, this);
            canvas.on('touchmove', this._handleTouchMove, this);
            canvas.on('touchend', this._handleTouchEnd, this);
        }
        
        Roo.EventManager.onWindowResize(this.resize, this, true);
        
        this.clear();
        
        this.resize();
    },
    
    resize: function(){
        
        var canvas = this.canvasEl().dom;
        var ctx = this.canvasElCtx();
        var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // setting canvas width will clean img data
        canvas.width = 0;
        
        var style = window.getComputedStyle ? 
            getComputedStyle(this.el.dom, null) : this.el.dom.currentStyle;
            
        var padding_left = parseInt(style.paddingLeft) || 0;
        var padding_right = parseInt(style.paddingRight) || 0;
        
        canvas.width = this.el.dom.clientWidth - padding_left - padding_right;
        
        ctx.putImageData(img_data, 0, 0);
    },
    
    _handleMouseDown: function(e)
    {
        if (e.browserEvent.which === 1) {
            this.mouse_btn_down = true;
            this.strokeBegin(e);
        }
    },
    
    _handleMouseMove: function (e)
    {
        if (this.mouse_btn_down) {
            this.strokeMoveUpdate(e);
        }
    },
    
    _handleMouseUp: function (e)
    {
        if (e.browserEvent.which === 1 && this.mouse_btn_down) {
            this.mouse_btn_down = false;
            this.strokeEnd(e);
        }
    },
    
    _handleTouchStart: function (e) {
        
        e.preventDefault();
        if (e.browserEvent.targetTouches.length === 1) {
            // var touch = e.browserEvent.changedTouches[0];
            // this.strokeBegin(touch);
            
             this.strokeBegin(e); // assume e catching the correct xy...
        }
    },
    
    _handleTouchMove: function (e) {
        e.preventDefault();
        // var touch = event.targetTouches[0];
        // _this._strokeMoveUpdate(touch);
        this.strokeMoveUpdate(e);
    },
    
    _handleTouchEnd: function (e) {
        var wasCanvasTouched = e.target === this.canvasEl().dom;
        if (wasCanvasTouched) {
            e.preventDefault();
            // var touch = event.changedTouches[0];
            // _this._strokeEnd(touch);
            this.strokeEnd(e);
        }
    },
    
    reset: function () {
        this._lastPoints = [];
        this._lastVelocity = 0;
        this._lastWidth = (this.min_width + this.max_width) / 2;
        this.canvasElCtx().fillStyle = this.dot_color;
    },
    
    strokeMoveUpdate: function(e)
    {
        this.strokeUpdate(e);
        
        if (this.throttle) {
            this.throttle(this.strokeUpdate, this.throttle);
        }
        else {
            this.strokeUpdate(e);
        }
    },
    
    strokeBegin: function(e)
    {
        var newPointGroup = {
            color: this.dot_color,
            points: []
        };
        
        if (typeof this.onBegin === 'function') {
            this.onBegin(e);
        }
        
        this.curve_data.push(newPointGroup);
        this.reset();
        this.strokeUpdate(e);
    },
    
    strokeUpdate: function(e)
    {
        var rect = this.canvasEl().dom.getBoundingClientRect();
        var point = new this.Point(e.xy[0] - rect.left, e.xy[1] - rect.top, new Date().getTime());
        var lastPointGroup = this.curve_data[this.curve_data.length - 1];
        var lastPoints = lastPointGroup.points;
        var lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
        var isLastPointTooClose = lastPoint
            ? point.distanceTo(lastPoint) <= this.min_distance
            : false;
        var color = lastPointGroup.color;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            var curve = this.addPoint(point);
            if (!lastPoint) {
                this.drawDot({color: color, point: point});
            }
            else if (curve) {
                this.drawCurve({color: color, curve: curve});
            }
            lastPoints.push({
                time: point.time,
                x: point.x,
                y: point.y
            });
        }
    },
    
    strokeEnd: function(e)
    {
        this.strokeUpdate(e);
        if (typeof this.onEnd === 'function') {
            this.onEnd(e);
        }
    },
    
    addPoint:  function (point) {
        var _lastPoints = this._lastPoints;
        _lastPoints.push(point);
        if (_lastPoints.length > 2) {
            if (_lastPoints.length === 3) {
                _lastPoints.unshift(_lastPoints[0]);
            }
            var widths = this.calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
            var curve = this.Bezier.fromPoints(_lastPoints, widths, this);
            _lastPoints.shift();
            return curve;
        }
        return null;
    },
    
    calculateCurveWidths: function (startPoint, endPoint) {
        var velocity = this.velocity_filter_weight * endPoint.velocityFrom(startPoint) +
            (1 - this.velocity_filter_weight) * this._lastVelocity;

        var newWidth = Math.max(this.max_width / (velocity + 1), this.min_width);
        var widths = {
            end: newWidth,
            start: this._lastWidth
        };
        
        this._lastVelocity = velocity;
        this._lastWidth = newWidth;
        return widths;
    },
    
    drawDot: function (_a) {
        var color = _a.color, point = _a.point;
        var ctx = this.canvasElCtx();
        var width = typeof this.dot_size === 'function' ? this.dot_size() : this.dot_size;
        ctx.beginPath();
        this.drawCurveSegment(point.x, point.y, width);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    },
    
    drawCurve: function (_a) {
        var color = _a.color, curve = _a.curve;
        var ctx = this.canvasElCtx();
        var widthDelta = curve.endWidth - curve.startWidth;
        var drawSteps = Math.floor(curve.length()) * 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        for (var i = 0; i < drawSteps; i += 1) {
        var t = i / drawSteps;
        var tt = t * t;
        var ttt = tt * t;
        var u = 1 - t;
        var uu = u * u;
        var uuu = uu * u;
        var x = uuu * curve.startPoint.x;
        x += 3 * uu * t * curve.control1.x;
        x += 3 * u * tt * curve.control2.x;
        x += ttt * curve.endPoint.x;
        var y = uuu * curve.startPoint.y;
        y += 3 * uu * t * curve.control1.y;
        y += 3 * u * tt * curve.control2.y;
        y += ttt * curve.endPoint.y;
        var width = curve.startWidth + ttt * widthDelta;
        this.drawCurveSegment(x, y, width);
        }
        ctx.closePath();
        ctx.fill();
    },
    
    drawCurveSegment: function (x, y, width) {
        var ctx = this.canvasElCtx();
        ctx.moveTo(x, y);
        ctx.arc(x, y, width, 0, 2 * Math.PI, false);
        this.is_empty = false;
    },
    
    clear: function()
    {
        var ctx = this.canvasElCtx();
        var canvas = this.canvasEl().dom;
        ctx.fillStyle = this.bg_color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.curve_data = [];
        this.reset();
        this.is_empty = true;
    },
    
    canvasEl: function()
    {
        return this.el.select('canvas',true).first();
    },
    
    canvasElCtx: function()
    {
        return this.el.select('canvas',true).first().dom.getContext('2d');
    },
    
    getImage: function(type)
    {
        if(this.is_empty) {
            return false;
        }
        
        // encryption ?
        return this.canvasEl().dom.toDataURL('image/'+type, 1);
    },
    
    drawFromImage: function(img_src)
    {
        var img = new Image();
        
        img.src = img_src;
        
        this.canvasElCtx().drawImage(img, 0, 0);
    },
    
    // Bezier Point Constructor
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
    
    
    // Bezier Constructor
    Bezier: (function () {
        function Bezier(startPoint, control2, control1, endPoint, startWidth, endWidth) {
            this.startPoint = startPoint;
            this.control2 = control2;
            this.control1 = control1;
            this.endPoint = endPoint;
            this.startWidth = startWidth;
            this.endWidth = endWidth;
        }
        Bezier.fromPoints = function (points, widths, scope) {
            var c2 = this.calculateControlPoints(points[0], points[1], points[2], scope).c2;
            var c3 = this.calculateControlPoints(points[1], points[2], points[3], scope).c1;
            return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
        };
        Bezier.calculateControlPoints = function (s1, s2, s3, scope) {
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
                c1: new scope.Point(m1.x + tx, m1.y + ty),
                c2: new scope.Point(m2.x + tx, m2.y + ty)
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
    
    throttle: function(fn, wait) {
      if (wait === void 0) { wait = 250; }
      var previous = 0;
      var timeout = null;
      var result;
      var storedContext;
      var storedArgs;
      var later = function () {
          previous = Date.now();
          timeout = null;
          result = fn.apply(storedContext, storedArgs);
          if (!timeout) {
              storedContext = null;
              storedArgs = [];
          }
      };
      return function wrapper() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var now = Date.now();
          var remaining = wait - (now - previous);
          storedContext = this;
          storedArgs = args;
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
              }
              previous = now;
              result = fn.apply(storedContext, storedArgs);
              if (!timeout) {
                  storedContext = null;
                  storedArgs = [];
              }
          }
          else if (!timeout) {
              timeout = window.setTimeout(later, remaining);
          }
          return result;
      };
  }
  
});

 

 