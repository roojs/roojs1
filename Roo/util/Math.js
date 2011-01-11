//<script type="text/javascript">
/**
//+ based on.. Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/bignumber [rev. #4]
**/
Roo= Roo || {};
   

Roo.Math = function(num, precision, roundType){
	var i;
	if(num instanceof Roo.Math){
		for(i in {precision: 0, roundType: 0, _s: 0, _f: 0}) o[i] = num[i];
		this._d = num._d.slice();
		return;
	}
    
	this.precision = isNaN(precision = Math.abs(precision)) ? Roo.Math.defaultPrecision : precision;
	this.roundType = isNaN(r = Math.abs(roundType)) ? Roo.Math.defaultRoundType : roundType;
    
	this._s = (num += "").charAt(0) == "-";
	this._f = (
            (num = num.replace(/[^\d.]/g, "").split(".", 2))[0] = num[0].replace(/^0+/, "") || "0"
        ).length;
	for(i = (num = this._d = (num.join("") || "0").split("")).length; i; num[--i] = +num[i]);
	this.round();
};

Roo.Math.ROUND_HALF_EVEN = (Roo.Math.ROUND_HALF_DOWN = (Roo.Math.ROUND_HALF_UP =
    (Roo.Math.ROUND_FLOOR = (Roo.Math.ROUND_CEIL = (Roo.Math.ROUND_DOWN 
    = (Roo.Math.ROUND_UP = 0) + 1) + 1) + 1) + 1) + 1) + 1;
    
Roo.Math.defaultPrecision = 40;
Roo.Math.defaultRoundType = Roo.Math.ROUND_HALF_UP;

    
Roo.Math.prototype = {
    _s : 0,
    _f : 0
    roundType : 0,
    precision : 0,
    add : function(num)
    {
		num = new Roo.Math(num, this.precision, this.roundType);
        
        if (this._s != num._s) { //netagive...
            return num._s ^= 1, this.subtract(num);
		}
        
        var o = new Roo.Math(this), 
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
		return r && ++num && a.unshift(r), o._f = num, o.round();
	},
	subtract : function(n){
		if(this._s != (n = new Roo.Math(n))._s)
			return n._s ^= 1, this.add(n);
		var o = new Roo.Math(this), c = o.abs().compare(n.abs()) + 1, a = c ? o : n, b = c ? n : o, la = a._f, lb = b._f, d = la, i, j;
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
	multiply : function(n){
		var o = new Roo.Math(this), r = o._d.length >= (n = new Roo.Math(n))._d.length, a = (r ? o : n)._d,
		b = (r ? n : o)._d, la = a.length, lb = b.length, x = new Roo.Math, i, j, s;
		for(i = lb; i; r && s.unshift(r), x.set(x.add(new Roo.Math(s.join("")))))
			for(s = (new Array(lb - --i)).join("0").split(""), r = 0, j = la; j; r += a[--j] * b[i], s.unshift(r % 10), r = (r / 10) >>> 0);
		return o._s = o._s != n._s, o._f = ((r = la + lb - o._f - n._f) >= (j = (o._d = x._d).length) ? this._zeroes(o._d, r - j + 1, 1).length : j) - r, o.round();
	},
	divide : function(n){
		if((n = new Roo.Math(n)) == "0")
			throw new Error("Division by 0");
		else if(this == "0")
			return new Roo.Math;
		var o = new Roo.Math(this), a = o._d, b = n._d, la = a.length - o._f,
		lb = b.length - n._f, r = new Roo.Math, i = 0, j, s, l, f = 1, c = 0, e = 0;
		r._s = o._s != n._s, r.precision = Math.max(o.precision, n.precision),
		r._f = +r._d.pop(), la != lb && o._zeroes(la > lb ? b : a, Math.abs(la - lb));
		n._f = b.length, b = n, b._s = false, b = b.round();
		for(n = new Roo.Math; a[0] == "0"; a.shift());
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
			for(s = new Roo.Math, j = 0; n.compare(y = s.add(b)) + 1 && ++j; s.set(y));
			n.set(n.subtract(s)), !l && r._f == r._d.length && ++r._f, r._d.push(j);
		}
		while((i < a.length || n != "0") && (r._d.length - r._f) <= r.precision);
		return r.round();
	},
	mod : function(n){
		return this.subtract(this.divide(n).intPart().multiply(n));
	},
	pow : function(n){
		var o = new Roo.Math(this), i;
		if((n = (new Roo.Math(n)).intPart()) == 0) return o.set(1);
		for(i = Math.abs(n); --i; o.set(o.multiply(this)));
		return n < 0 ? o.set((new Roo.Math(1)).divide(o)) : o;
	},
	set : function(n){
		return this.constructor(n), this;
	},
	compare : function(n){
		var a = this, la = this._f, b = new Roo.Math(n), lb = b._f, r = [-1, 1], i, l;
		if(a._s != b._s)
			return a._s ? -1 : 1;
		if(la != lb)
			return r[(la > lb) ^ a._s];
		for(la = (a = a._d).length, lb = (b = b._d).length, i = -1, l = Math.min(la, lb); ++i < l;)
			if(a[i] != b[i])
				return r[(a[i] > b[i]) ^ a._s];
		return la != lb ? r[(la > lb) ^ a._s] : 0;
	},
	negate : function(){
		var n = new Roo.Math(this); return n._s ^= 1, n;
	},
	abs : function(){
		var n = new Roo.Math(this); return n._s = 0, n;
	},
	intPart : function(){
		return new Roo.Math((this._s ? "-" : "") + (this._d.slice(0, this._f).join("") || "0"));
	},
    valueOf : function() {
        return this.toString();
    },
	toString : function(){
		var o = this;
		return (o._s ? "-" : "") + (o._d.slice(0, o._f).join("") || "0") + (o._f != o._d.length ? "." + o._d.slice(o._f).join("") : "");
	},
	_zeroes : function(n, l, t){
		var s = ["push", "unshift"][t || 0];
		for(++l; --l;  n[s](0));
		return n;
	},
	round : function(){
		if("_rounding" in this) return this;
		var Roo.Math = Roo.Math, r = this.roundType, b = this._d, d, p, n, x;
		for(this._rounding = true; this._f > 1 && !b[0]; --this._f, b.shift());
		for(d = this._f, p = this.precision + d, n = b[p]; b.length > d && !b[b.length -1]; b.pop());
		x = (this._s ? "-" : "") + (p - d ? "0." + this._zeroes([], p - d - 1).join("") : "") + 1;
		if(b.length > p){
			n && (r == Roo.Math.DOWN ? false : r == Roo.Math.UP ? true : r == Roo.Math.CEIL ? !this._s
			: r == Roo.Math.FLOOR ? this._s : r == Roo.Math.HALF_UP ? n >= 5 : r == Roo.Math.HALF_DOWN ? n > 5
			: r == Roo.Math.HALF_EVEN ? n >= 5 && b[p - 1] & 1 : false) && this.add(x);
			b.splice(p, b.length - p);
		}
		return delete this._rounding, this;
	}
};