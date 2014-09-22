//<script type="text/javascript">
Roo = typeof(Roo) != 'undefined' ? Roo :  { util : { }};

/**
//+ based on.. Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/bignumber [rev. #4]
**/


/**
 * @class Roo.util.Math
 *  based on.. Jonas Raoni Soares Silva
 *  http://jsfromhell.com/classes/bignumber [rev. #4]
 * @constructor
 * @param {Object|Number} number to wrap
 * @param {number} precision to use when doing calculations
 * @param {number} rounding type.
 */

Roo.util.Math = function(num, precision, roundType){
    this.ctor(num,precision, roundType);
};

Roo.util.Math.ROUND_HALF_EVEN = (Roo.util.Math.ROUND_HALF_DOWN = (Roo.util.Math.ROUND_HALF_UP =
    (Roo.util.Math.ROUND_FLOOR = (Roo.util.Math.ROUND_CEIL = (Roo.util.Math.ROUND_DOWN 
    = (Roo.util.Math.ROUND_UP = 0) + 1) + 1) + 1) + 1) + 1) + 1;
    
Roo.util.Math.defaultPrecision = 40;
Roo.util.Math.defaultRoundType = Roo.util.Math.ROUND_HALF_UP;

    
Roo.util.Math.prototype = {
    _s : 0,
    _f : 0,
    roundType : 0,
    precision : 0,
    
    //private
    ctor : function (num, precision, roundType) {
        var i;
        if(num instanceof Roo.util.Math){
            var o = this;
            for(i in {precision: 0, roundType: 0, _s: 0, _f: 0}) o[i] = num[i];
            this._d = num._d.slice();
            return;
        }
        
        this.precision = isNaN(precision = Math.abs(precision)) ? Roo.util.Math.defaultPrecision : precision;
        this.roundType = isNaN(r = Math.abs(roundType)) ? Roo.util.Math.defaultRoundType : roundType;
        
        this._s = (num += "").charAt(0) == "-";
        this._f = (
                (num = num.replace(/[^\d.]/g, "").split(".", 2))[0] = num[0].replace(/^0+/, "") || "0"
            ).length;
        for(i = (num = this._d = (num.join("") || "0").split("")).length; i; num[--i] = +num[i]);
        this.round();
    },
/**
 * Add number
 * @param {Object|Number} value to add
 * @return {Object} The result
 */
    add : function(num)
    {
        num = new Roo.util.Math(num, this.precision, this.roundType);
        
        if (this._s != num._s) { //netagive...
            return num._s ^= 1, this.subtract(num);
        }
        
        var o = new Roo.util.Math(this), 
            a = o._d, 
            b = num._d, 
            la = o._f,
            lb = num._f, 
            num = Math.max(la, lb), 
            i, r;
        
        la != lb && ((lb = la - lb) > 0 ? o._zeroes(b, lb, 1) : o._zeroes(a, -lb, 1));
        i = (la = a.length) == (lb = b.length) ?
                a.length : (
                    (lb = la - lb) > 0 ? o._zeroes(b, lb) : o._zeroes(a, -lb)
                ).length;
                
        for(r = 0; i; 
            r = (a[--i] = a[i] + b[i] + r) / 10 >>> 0, 
            a[i] %= 10
        );
        r && ++num && a.unshift(r);
        o._f = num;
        return o.round();
         
    },
    
/**
 * Subtract number
 * @param {Object|Number} value to subtract
 * @return {Object} The result
 */
    
    subtract : function(n){
        if(this._s != (n = new Roo.util.Math(n, this.precision, this.roundType))._s)
            return n._s ^= 1, this.add(n);
        var o = new Roo.util.Math(this), c = o.abs().compare(n.abs()) + 1, a = c ? o : n, b = c ? n : o, la = a._f, lb = b._f, d = la, i, j;
        a = a._d, b = b._d, la != lb && ((lb = la - lb) > 0 ? o._zeroes(b, lb, 1) : o._zeroes(a, -lb, 1));
        for(i = (la = a.length) == (lb = b.length) ? a.length : ((lb = la - lb) > 0 ? o._zeroes(b, lb) : o._zeroes(a, -lb)).length; i;){
            if(a[--i] < b[i]){
                for(j = i; j && !a[--j]; a[j] = 9);
                --a[j], a[i] += 10;
            }
            b[i] = a[i] - b[i];
        }
        return c || (o._s ^= 1), o._f = d, o._d = b, o.round();
    },
    
    
/**
 * Mulitply number
 * @param {Object|Number} value to mutiply
 * @return {Object} The result
 */    
    multiply : function(n)
    {
        var o = new Roo.util.Math(this), 
            r = o._d.length >= (n = new Roo.util.Math(n, this.precision, this.roundType))._d.length,
            a = (r ? o : n)._d,
            b = (r ? n : o)._d, 
            la = a.length, 
            lb = b.length, 
            x = new Roo.util.Math(0,this.precision, this.roundType), 
            i, j, s;
            
        for(i = lb;   i; 
                r && s.unshift(r), 
                x.set(x.add(new Roo.util.Math(s.join(""), this.precision, this.roundType)))
        ) {
            
            s = (new Array(lb - --i)).join("0").split(""); // pads 000...
            j = la;
            for( r = 0 ; j ; r += a[--j] * b[i], s.unshift(r % 10), r = (r / 10) >>> 0);
            
          //  console.log(s);
        }
        
       // console.log(o);
        
        o._s = o._s != n._s;
        o._f = (
                    (r = la + lb - o._f - n._f) >= (j = (o._d = x._d).length) ? 
                        this._zeroes(o._d, r - j + 1, 1).length : 
                        j
            ) - r; 
            
        return  o.round();
    },
    
    divide : function(n){
        if((n = new Roo.util.Math(n, this.precision, this.roundType)) == "0")
            throw new Error("Division by 0");
        else if(this == "0")
            return new Roo.util.Math(0, this.precision, this.roundType);
        var o = new Roo.util.Math(this), a = o._d, b = n._d, la = a.length - o._f,
        lb = b.length - n._f, r = new Roo.util.Math(0, this.precision, this.roundType), i = 0, j, s, l, f = 1, c = 0, e = 0;
        r._s = o._s != n._s, r.precision = Math.max(o.precision, n.precision),
        r._f = +r._d.pop(), la != lb && o._zeroes(la > lb ? b : a, Math.abs(la - lb));
        n._f = b.length, b = n, b._s = false, b = b.round();
        for(n = new Roo.util.Math(0, this.precision, this.roundType); a[0] == "0"; a.shift());
        out:
        do{
            for(l = c = 0, n == "0" && (n._d = [], n._f = 0); i < a.length && n.compare(b) == -1; ++i){
                (l = i + 1 == a.length, (!f && ++c > 1 || (e = l && n == "0" && a[i] == "0")))
                && (r._f == r._d.length && ++r._f, r._d.push(0));
                (a[i] == "0" && n == "0") || (n._d.push(a[i]), ++n._f);
                if(e)
                    break out;
                if((l && n.compare(b) == -1 && (r._f == r._d.length && ++r._f, 1)) || (l = 0))
                    while(r._d.push(0), n._d.push(0), ++n._f, n.compare(b) == -1);
            }
            if(f = 0, n.compare(b) == -1 && !(l = 0))
                while(l ? r._d.push(0) : l = 1, n._d.push(0), ++n._f, n.compare(b) == -1);
            for(s = new Roo.util.Math(0, this.precision, this.roundType), j = 0; n.compare(y = s.add(b)) + 1 && ++j; s.set(y));
            n.set(n.subtract(s)), !l && r._f == r._d.length && ++r._f, r._d.push(j);
        }
        while((i < a.length || n != "0") && (r._d.length - r._f) <= r.precision);
        return r.round();
    },
        
/**
 * Modulus number
 * @param {Object|Number} value to modulus by
 * @return {Object} The result
 */    
    
    mod : function(n){
        return this.subtract(this.divide(n).intPart().multiply(n));
    },
    
/**
 * To Power number
 * @param {Object|Number} value to power by
 * @return {Object} The result
 */        
    pow : function(n){
        var o = new Roo.util.Math(this), i;
        if((n = (new Roo.util.Math(n, this.precision, this.roundType)).intPart()) == 0) return o.set(1);
        for(i = Math.abs(n); --i; o.set(o.multiply(this)));
        return n < 0 ? o.set((new Roo.util.Math(1, this.precision, this.roundType)).divide(o)) : o;
    },
    /**
 * Set number
 * @param {Object|Number} value to set object to
 * @return {Object} This
 */    
    
    set : function(n)
    {
        this.ctor(n);
        return this;
    },
/**
 * Compare number
 * @param {Object|Number} value to compare to
 * @return {boolean} true if the same
 */        
    
    compare : function(n){
        var a = this, la = this._f, b = new Roo.util.Math(n, this.precision, this.roundType), lb = b._f, r = [-1, 1], i, l;
        if(a._s != b._s)
            return a._s ? -1 : 1;
        if(la != lb)
            return r[(la > lb) ^ a._s];
        for(la = (a = a._d).length, lb = (b = b._d).length, i = -1, l = Math.min(la, lb); ++i < l;)
            if(a[i] != b[i])
                return r[(a[i] > b[i]) ^ a._s];
        return la != lb ? r[(la > lb) ^ a._s] : 0;
    },
/**
 * negate number 
 * @return {Object} the result
 */            
    negate : function(){
        var n = new Roo.util.Math(this); 
        return n._s ^= 1, n;
    },
/**
 * abs number 
 * @return {Object} the result
 */                
    abs : function(){
        var n = new Roo.util.Math(this);
        return n._s = 0, n;
    },
/**
 * integer part of number
 * @return {Object} the result
 */        
    intPart : function(){
        return new Roo.util.Math((this._s ? "-" : "", this.precision, this.roundType) + (this._d.slice(0, this._f).join("") || "0"));
    },
/**
 * value of thenumber
 * @return {String} the result
 */        
    valueOf : function() {
        return this.toString();
    },
/**
 * value of the number
 * @return {String} the result
 */            
    toString : function(){
        var o = this;
        return (o._s ? "-" : "") + (o._d.slice(0, o._f).join("") || "0") + (o._f != o._d.length ? "." + o._d.slice(o._f).join("") : "");
    },
/**
 * value of the number at a fixed precission
 * @return {String} the result
 */                
    toFixed : function(x) {
        var n = new Roo.util.Math(this);
        n.precision = x;
        var ret= n.round().toString();
        var lr =ret.split('.');
        var l = lr.shift();
        if (!x) {
            return l;
        }
        var r = lr.length ? lr[0] : '';
        for (var i = r.length; i < x; i++) {
            r+= '0';
        }
        return l+'.'+r;
        
    },
    //private
    _zeroes : function(n, l, t){
        var s = ["push", "unshift"][t || 0];
        for(++l; --l;  n[s](0));
        return n;
    },
    //private    
    round : function()
    {
        var m = Roo.util.Math;
        
        if (typeof(m._rounding) != 'undefined') return this; // stop recursion..
        m._rounding = true;
        
        var   r = this.roundType,
            b = this._d, 
            d, p, n, x;
        //console.log(b.join(','));    
        while( this._f > 1 && !b[0]) {
            --this._f;
            b.shift();
        }
        //console.log(b.join(','));    
        for(d = this._f, 
            p = this.precision + d, 
            n = b[p];
            
            b.length > d && !b[b.length -1]; // condition... 
         
            b.pop()
        );
            
         x = (this._s ? "-" : "") + (p - d ? "0." + this._zeroes([], p - d - 1).join("") : "") + 1;
        
       
         
        if(b.length > p && typeof(n) != 'undefined') {
        //if(b.length > p && n){
            //console.log("rounding" +n + " Method? " + r);
            if (
                (r == m.ROUND_UP) ||
                (r == m.ROUND_CEIL && !this._s) ||
                (r == m.ROUND_FLOOR &&  this._s) ||
                (r == m.ROUND_HALF_UP &&   n >= 5) ||
                (r == m.ROUND_HALF_DOWN &&  n > 5)  ||
                (r == m.ROUND_HALF_EVEN && n >= 5 && (b[p - 1] & 1))
               ) {
                //console.log("add" +x);
               // this.precision++;
                var ret = this.add(x);
                this._d = ret._d;
                b=ret._d;
                //this.precision--;
            }

            b.splice(p, b.length - p);
        }
        return delete m._rounding, this;
    }
};