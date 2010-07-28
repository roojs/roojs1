

 





window["undefined"] = window["undefined"];



var  Roo = {}; 



 
Roo.apply = function(o, c, A){
    if(A){
        
        Roo.apply(o, A);
    }
    if(o && c && typeof  c == 'object'){
        for(var  p  in  c){
            o[p] = c[p];
        }
    }
    return  o;
};


(function(){
    var  B = 0;
    var  ua = navigator.userAgent.toLowerCase();

    var  C = document.compatMode == "CSS1Compat",
        D = ua.indexOf("opera") > -1,
        E = (/webkit|khtml/).test(ua),
        F = ua.indexOf("msie") > -1,
        G = ua.indexOf("msie 7") > -1,
        H = !E && ua.indexOf("gecko") > -1,
        I = F && !C,
        J = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
        K = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
        L = (ua.indexOf("linux") != -1),
        M = window.location.href.toLowerCase().indexOf("https") === 0;

    
	if(F && !G){
        try{
            document.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }


    Roo.apply(Roo, {
        

        isStrict : C,
        

        isSecure : M,
        

        isReady : false,
        

        
        debug: false,

        

        enableGarbageCollector : true,

        

        enableListenerCollection:false,

        

        SSL_SECURE_URL : "javascript:false",

        

        BLANK_IMAGE_URL : "http:/"+"/localhost/s.gif",

        emptyFn : function(){},

        

        applyIf : function(o, c){
            if(o && c){
                for(var  p  in  c){
                    if(typeof  o[p] == "undefined"){ o[p] = c[p]; }
                }
            }
            return  o;
        },

        

        addBehaviors : function(o){
            if(!Roo.isReady){
                Roo.onReady(function(){
                    Roo.addBehaviors(o);
                });
                return;
            }
            var  N = {}; 
            for(var  b  in  o){
                var  parts = b.split('@');
                if(parts[1]){ 
                    var  s = parts[0];
                    if(!N[s]){
                        N[s] = Roo.select(s);
                    }

                    N[s].on(parts[1], o[b]);
                }
            }

            N = null;
        },

        

        id : function(el, O){
            O = O || "roo-gen";
            el = Roo.getDom(el);
            var  id = O + (++B);
            return  el ? (el.id ? el.id : (el.id = id)) : id;
        },
         
       
        

        extend : function(){
            
            var  io = function(o){
                for(var  m  in  o){
                    this[m] = o[m];
                }
            };
            return  function(sb, sp, P){
                if(typeof  sp == 'object'){ 
                    P = sp;
                    sp = sb;
                    sb = function(){sp.apply(this, arguments);};
                }
                var  F = function(){}, sbp, spp = sp.prototype;
                F.prototype = spp;
                sbp = sb.prototype = new  F();
                sbp.constructor=sb;
                sb.superclass=spp;
                
                if(spp.constructor == Object.prototype.constructor){
                    spp.constructor=sp;
                   
                }

                
                sb.override = function(o){
                    Roo.override(sb, o);
                };
                sbp.override = io;
                Roo.override(sb, P);
                return  sb;
            };
        }(),

        

        override : function(P, Q){
            if(Q){
                var  p = P.prototype;
                for(var  method  in  Q){
                    p[method] = Q[method];
                }
            }
        },
        

        namespace : function(){
            var  a=arguments, o=null, i, j, d, rt;
            for (i=0; i<a.length; ++i) {
                d=a[i].split(".");
                rt = d[0];
                

                eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
                for (j=1; j<d.length; ++j) {
                    o[d[j]]=o[d[j]] || {};
                    o=o[d[j]];
                }
            }
        },
        

         
        factory : function(c, ns)
        {
            
            if (!c.xtype   || (!ns && !c.xns) ||  (c.xns === false)) { 
                return  c;
            }

            ns = c.xns ? c.xns : ns; 
            if (c.constructor == ns[c.xtype]) {
                return  c;
            }
            if (ns[c.xtype]) {
                if (Roo.debug) Roo.log("Roo.Factory(" + c.xtype + ")");
                var  ret = new  ns[c.xtype](c);
                ret.xns = false;
                return  ret;
            }

            c.xns = false; 
            return  c;
        },
         

        log : function(s)
        {
            if ((typeof(console) == 'undefined') || (typeof(console.log) == 'undefined')) {
                return; 
            }

            console.log(s);
            
        },
        

        urlEncode : function(o){
            if(!o){
                return  "";
            }
            var  R = [];
            for(var  key  in  o){
                var  ov = o[key], k = encodeURIComponent(key);
                var  type = typeof  ov;
                if(type == 'undefined'){
                    R.push(k, "=&");
                }else  if(type != "function" && type != "object"){
                    R.push(k, "=", encodeURIComponent(ov), "&");
                }else  if(ov  instanceof  Array){
                    if (ov.length) {
	                    for(var  i = 0, len = ov.length; i < len; i++) {
	                        R.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
	                    }
	                } else  {
	                    R.push(k, "=&");
	                }
                }
            }

            R.pop();
            return  R.join("");
        },

        

        urlDecode : function(S, T){
            if(!S || !S.length){
                return  {};
            }
            var  U = {};
            var  V = S.split('&');
            var  W, X, Y;
            for(var  i = 0, len = V.length; i < len; i++){
                W = V[i].split('=');
                X = decodeURIComponent(W[0]);
                Y = decodeURIComponent(W[1]);
                if(T !== true){
                    if(typeof  U[X] == "undefined"){
                        U[X] = Y;
                    }else  if(typeof  U[X] == "string"){
                        U[X] = [U[X]];
                        U[X].push(Y);
                    }else {
                        U[X].push(Y);
                    }
                }else {
                    U[X] = Y;
                }
            }
            return  U;
        },

        

        each : function(Z, fn, f){
            if(typeof  Z.length == "undefined" || typeof  Z == "string"){
                Z = [Z];
            }
            for(var  i = 0, len = Z.length; i < len; i++){
                if(fn.call(f || Z[i], Z[i], i, Z) === false){ return  i; };
            }
        },

        
        combine : function(){
            var  as = arguments, l = as.length, r = [];
            for(var  i = 0; i < l; i++){
                var  a = as[i];
                if(a  instanceof  Array){
                    r = r.concat(a);
                }else  if(a.length !== undefined && !a.substr){
                    r = r.concat(Array.prototype.slice.call(a, 0));
                }else {
                    r.push(a);
                }
            }
            return  r;
        },

        

        escapeRe : function(s) {
            return  s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },

        
        callback : function(cb, g, h, n){
            if(typeof  cb == "function"){
                if(n){
                    cb.defer(n, g, h || []);
                }else {
                    cb.apply(g, h || []);
                }
            }
        },

        

        getDom : function(el){
            if(!el){
                return  null;
            }
            return  el.dom ? el.dom : (typeof  el == 'string' ? document.getElementById(el) : el);
        },

        

        getCmp : function(id){
            return  Roo.ComponentMgr.get(id);
        },
         
        num : function(v, q){
            if(typeof  v != 'number'){
                return  q;
            }
            return  v;
        },

        destroy : function(){
            for(var  i = 0, a = arguments, len = a.length; i < len; i++) {
                var  as = a[i];
                if(as){
                    if(as.dom){
                        as.removeAllListeners();
                        as.remove();
                        continue;
                    }
                    if(typeof  as.purgeListeners == 'function'){
                        as.purgeListeners();
                    }
                    if(typeof  as.destroy == 'function'){
                        as.destroy();
                    }
                }
            }
        },

        
        

        type : function(o){
            if(o === undefined || o === null){
                return  false;
            }
            if(o.htmlElement){
                return  'element';
            }
            var  t = typeof  o;
            if(t == 'object' && o.nodeName) {
                switch(o.nodeType) {
                    case  1: return  'element';
                    case  3: return  (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
                }
            }
            if(t == 'object' || t == 'function') {
                switch(o.constructor) {
                    case  Array: return  'array';
                    case  RegExp: return  'regexp';
                }
                if(typeof  o.length == 'number' && typeof  o.item == 'function') {
                    return  'nodelist';
                }
            }
            return  t;
        },

        

        isEmpty : function(v, u){
            return  v === null || v === undefined || (!u ? v === '' : false);
        },
        
        

        isOpera : D,
        

        isSafari : E,
        

        isIE : F,
        

        isIE7 : G,
        

        isGecko : H,
        

        isBorderBox : I,
        

        isWindows : J,
        

        isLinux : L,
        

        isMac : K,

        

        useShims : ((F && !G) || (H && K))
    });


})();

Roo.namespace("Roo", "Roo.util", "Roo.grid", "Roo.dd", "Roo.tree", "Roo.data",
                "Roo.form", "Roo.menu", "Roo.state", "Roo.lib", "Roo.layout", "Roo.app", "Roo.ux");




(function() {    
    
    if(Roo.isIE) {
        function  A() {
            var  p = Function.prototype;
            delete  p.createSequence;
            delete  p.defer;
            delete  p.createDelegate;
            delete  p.createCallback;
            delete  p.createInterceptor;

            window.detachEvent("onunload", A);
        }

        window.attachEvent("onunload", A);
    }
})();




Roo.apply(Function.prototype, {
     

    createCallback : function(
){
        
        var  B = arguments;
        var  C = this;
        return  function() {
            return  C.apply(window, B);
        };
    },

    

    createDelegate : function(D, E, F){
        var  G = this;
        return  function() {
            var  H = E || arguments;
            if(F === true){
                H = Array.prototype.slice.call(arguments, 0);
                H = H.concat(E);
            }else  if(typeof  F == "number"){
                H = Array.prototype.slice.call(arguments, 0); 
                var  applyArgs = [F, 0].concat(E); 
                Array.prototype.splice.apply(H, applyArgs); 
            }
            return  G.apply(D || window, H);
        };
    },

    

    defer : function(H, I, J, K){
        var  fn = this.createDelegate(I, J, K);
        if(H){
            return  setTimeout(fn, H);
        }

        fn();
        return  0;
    },
    

    createSequence : function(L, M){
        if(typeof  L != "function"){
            return  this;
        }
        var  N = this;
        return  function() {
            var  O = N.apply(this || window, arguments);
            L.apply(M || this || window, arguments);
            return  O;
        };
    },

    

    createInterceptor : function(O, P){
        if(typeof  O != "function"){
            return  this;
        }
        var  Q = this;
        return  function() {
            O.target = this;
            O.method = Q;
            if(O.apply(P || this || window, arguments) === false){
                return;
            }
            return  Q.apply(this || window, arguments);
        };
    }
});




Roo.applyIf(String, {
    
    

    
    

    escape : function(A) {
        return  A.replace(/('|\\)/g, "\\$1");
    },

    

    leftPad : function (B, C, ch) {
        var  D = new  String(B);
        if(ch === null || ch === undefined || ch === '') {
            ch = " ";
        }
        while (D.length < C) {
            D = ch + D;
        }
        return  D;
    },

    

    format : function(E){
        var  F = Array.prototype.slice.call(arguments, 1);
        return  E.replace(/\{(\d+)\}/g, function(m, i){
            return  Roo.util.Format.htmlEncode(F[i]);
        });
    }
});



 
String.prototype.toggle = function(G, H){
    return  this == G ? H : G;
};



 

Roo.applyIf(Number.prototype, {
    

    constrain : function(A, B){
        return  Math.min(Math.max(this, A), B);
    }
});


 

Roo.applyIf(Array.prototype, {
    

    indexOf : function(o){
       for (var  i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) return  i;
       }
 	   return  -1;
    },

    

    remove : function(o){
       var  A = this.indexOf(o);
       if(A != -1){
           this.splice(A, 1);
       }
    },
    

    map : function(B )
    {
        var  C = this.length >>> 0;
        if (typeof  B != "function")
            throw  new  TypeError();

        var  D = new  Array(C);
        var  E = arguments[1];
        for (var  i = 0; i < C; i++)
        {
            if (i  in  this)
                D[i] = B.call(E, this[i], i, this);
        }

        return  D;
    }
    
});


 








 
 
 


Date.prototype.getElapsed = function(A) {
	return  Math.abs((A || new  Date()).getTime()-this.getTime());
};




Date.parseFunctions = {count:0};

Date.parseRegexes = [];

Date.formatFunctions = {count:0};


Date.prototype.dateFormat = function(B) {
    if (Date.formatFunctions[B] == null) {
        Date.createNewFormat(B);
    }
    var  C = Date.formatFunctions[B];
    return  this[C]();
};




Date.prototype.format = Date.prototype.dateFormat;


Date.createNewFormat = function(D) {
    var  E = "format" + Date.formatFunctions.count++;
    Date.formatFunctions[D] = E;
    var  F = "Date.prototype." + E + " = function(){return ";
    var  G = false;
    var  ch = '';
    for (var  i = 0; i < D.length; ++i) {
        ch = D.charAt(i);
        if (!G && ch == "\\") {
            G = true;
        }
        else  if (G) {
            G = false;
            F += "'" + String.escape(ch) + "' + ";
        }
        else  {
            F += Date.getFormatCode(ch);
        }
    }
    

    eval(F.substring(0, F.length - 3) + ";}");
};


Date.getFormatCode = function(H) {
    switch (H) {
    case  "d":
        return  "String.leftPad(this.getDate(), 2, '0') + ";
    case  "D":
        return  "Date.dayNames[this.getDay()].substring(0, 3) + ";
    case  "j":
        return  "this.getDate() + ";
    case  "l":
        return  "Date.dayNames[this.getDay()] + ";
    case  "S":
        return  "this.getSuffix() + ";
    case  "w":
        return  "this.getDay() + ";
    case  "z":
        return  "this.getDayOfYear() + ";
    case  "W":
        return  "this.getWeekOfYear() + ";
    case  "F":
        return  "Date.monthNames[this.getMonth()] + ";
    case  "m":
        return  "String.leftPad(this.getMonth() + 1, 2, '0') + ";
    case  "M":
        return  "Date.monthNames[this.getMonth()].substring(0, 3) + ";
    case  "n":
        return  "(this.getMonth() + 1) + ";
    case  "t":
        return  "this.getDaysInMonth() + ";
    case  "L":
        return  "(this.isLeapYear() ? 1 : 0) + ";
    case  "Y":
        return  "this.getFullYear() + ";
    case  "y":
        return  "('' + this.getFullYear()).substring(2, 4) + ";
    case  "a":
        return  "(this.getHours() < 12 ? 'am' : 'pm') + ";
    case  "A":
        return  "(this.getHours() < 12 ? 'AM' : 'PM') + ";
    case  "g":
        return  "((this.getHours() % 12) ? this.getHours() % 12 : 12) + ";
    case  "G":
        return  "this.getHours() + ";
    case  "h":
        return  "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0') + ";
    case  "H":
        return  "String.leftPad(this.getHours(), 2, '0') + ";
    case  "i":
        return  "String.leftPad(this.getMinutes(), 2, '0') + ";
    case  "s":
        return  "String.leftPad(this.getSeconds(), 2, '0') + ";
    case  "O":
        return  "this.getGMTOffset() + ";
    case  "T":
        return  "this.getTimezone() + ";
    case  "Z":
        return  "(this.getTimezoneOffset() * -60) + ";
    default:
        return  "'" + String.escape(H) + "' + ";
    }
};



Date.parseDate = function(I, J) {
    if (Date.parseFunctions[J] == null) {
        Date.createParser(J);
    }
    var  K = Date.parseFunctions[J];
    return  Date[K](I);
};


Date.createParser = function(L) {
    var  M = "parse" + Date.parseFunctions.count++;
    var  N = Date.parseRegexes.length;
    var  O = 1;
    Date.parseFunctions[L] = M;

    var  P = "Date." + M + " = function(input){\n"
        + "var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, o, z, v;\n"
        + "var d = new Date();\n"
        + "y = d.getFullYear();\n"
        + "m = d.getMonth();\n"
        + "d = d.getDate();\n"
        + "var results = input.match(Date.parseRegexes[" + N + "]);\n"
        + "if (results && results.length > 0) {";
    var  Q = "";

    var  R = false;
    var  ch = '';
    for (var  i = 0; i < L.length; ++i) {
        ch = L.charAt(i);
        if (!R && ch == "\\") {
            R = true;
        }
        else  if (R) {
            R = false;
            Q += String.escape(ch);
        }
        else  {
            var  obj = Date.formatCodeToRegex(ch, O);
            O += obj.g;
            Q += obj.s;
            if (obj.g && obj.c) {
                P += obj.c;
            }
        }
    }


    P += "if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n"
        + "{v = new Date(y, m, d, h, i, s);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n"
        + "{v = new Date(y, m, d, h, i);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0 && h >= 0)\n"
        + "{v = new Date(y, m, d, h);}\n"
        + "else if (y >= 0 && m >= 0 && d > 0)\n"
        + "{v = new Date(y, m, d);}\n"
        + "else if (y >= 0 && m >= 0)\n"
        + "{v = new Date(y, m);}\n"
        + "else if (y >= 0)\n"
        + "{v = new Date(y);}\n"
        + "}return (v && (z || o))?\n" 
        + "    ((z)? v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + (z*1)) :\n" 
        + "        v.add(Date.HOUR, (v.getGMTOffset() / 100) + (o / -100))) : v\n" 
        + ";}";

    Date.parseRegexes[N] = new  RegExp("^" + Q + "$");
    

    eval(P);
};


Date.formatCodeToRegex = function(S, T) {
    switch (S) {
    case  "D":
        return  {g:0,
        c:null,
        s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};
    case  "j":
        return  {g:1,
            c:"d = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{1,2})"}; 
    case  "d":
        return  {g:1,
            c:"d = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{2})"}; 
    case  "l":
        return  {g:0,
            c:null,
            s:"(?:" + Date.dayNames.join("|") + ")"};
    case  "S":
        return  {g:0,
            c:null,
            s:"(?:st|nd|rd|th)"};
    case  "w":
        return  {g:0,
            c:null,
            s:"\\d"};
    case  "z":
        return  {g:0,
            c:null,
            s:"(?:\\d{1,3})"};
    case  "W":
        return  {g:0,
            c:null,
            s:"(?:\\d{2})"};
    case  "F":
        return  {g:1,
            c:"m = parseInt(Date.monthNumbers[results[" + T + "].substring(0, 3)], 10);\n",
            s:"(" + Date.monthNames.join("|") + ")"};
    case  "M":
        return  {g:1,
            c:"m = parseInt(Date.monthNumbers[results[" + T + "]], 10);\n",
            s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};
    case  "n":
        return  {g:1,
            c:"m = parseInt(results[" + T + "], 10) - 1;\n",
            s:"(\\d{1,2})"}; 
    case  "m":
        return  {g:1,
            c:"m = parseInt(results[" + T + "], 10) - 1;\n",
            s:"(\\d{2})"}; 
    case  "t":
        return  {g:0,
            c:null,
            s:"\\d{1,2}"};
    case  "L":
        return  {g:0,
            c:null,
            s:"(?:1|0)"};
    case  "Y":
        return  {g:1,
            c:"y = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{4})"};
    case  "y":
        return  {g:1,
            c:"var ty = parseInt(results[" + T + "], 10);\n"
                + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
            s:"(\\d{1,2})"};
    case  "a":
        return  {g:1,
            c:"if (results[" + T + "] == 'am') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
            s:"(am|pm)"};
    case  "A":
        return  {g:1,
            c:"if (results[" + T + "] == 'AM') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
            s:"(AM|PM)"};
    case  "g":
    case  "G":
        return  {g:1,
            c:"h = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{1,2})"}; 
    case  "h":
    case  "H":
        return  {g:1,
            c:"h = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{2})"}; 
    case  "i":
        return  {g:1,
            c:"i = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{2})"};
    case  "s":
        return  {g:1,
            c:"s = parseInt(results[" + T + "], 10);\n",
            s:"(\\d{2})"};
    case  "O":
        return  {g:1,
            c:[
                "o = results[", T, "];\n",
                "var sn = o.substring(0,1);\n", 
                "var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);\n", 
                "var mn = o.substring(3,5) % 60;\n", 
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?\n", 
                "    (sn + String.leftPad(hr, 2, 0) + String.leftPad(mn, 2, 0)) : null;\n"
            ].join(""),
            s:"([+\-]\\d{4})"};
    case  "T":
        return  {g:0,
            c:null,
            s:"[A-Z]{1,4}"}; 
    case  "Z":
        return  {g:1,
            c:"z = results[" + T + "];\n" 
                  + "z = (-43200 <= z*1 && z*1 <= 50400)? z : null;\n",
            s:"([+\-]?\\d{1,5})"}; 
    default:
        return  {g:0,
            c:null,
            s:String.escape(S)};
    }
};



Date.prototype.getTimezone = function() {
    return  this.toString().replace(/^.*? ([A-Z]{1,4})[\-+][0-9]{4} .*$/, "$1");
};



Date.prototype.getGMTOffset = function() {
    return  (this.getTimezoneOffset() > 0 ? "-" : "+")
        + String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset() / 60)), 2, "0")
        + String.leftPad(this.getTimezoneOffset() % 60, 2, "0");
};



Date.prototype.getDayOfYear = function() {
    var  U = 0;
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    for (var  i = 0; i < this.getMonth(); ++i) {
        U += Date.daysInMonth[i];
    }
    return  U + this.getDate() - 1;
};



Date.prototype.getWeekOfYear = function() {
    
    var  V = this.getDayOfYear() + (4 - this.getDay());
    
    var  W = new  Date(this.getFullYear(), 0, 1);
    var  X = (7 - W.getDay() + 4);
    return  String.leftPad(((V - X) / 7) + 1, 2, "0");
};



Date.prototype.isLeapYear = function() {
    var  Y = this.getFullYear();
    return  ((Y & 3) == 0 && (Y % 100 || (Y % 400 == 0 && Y)));
};



Date.prototype.getFirstDayOfMonth = function() {
    var  Z = (this.getDay() - (this.getDate() - 1)) % 7;
    return  (Z < 0) ? (Z + 7) : Z;
};



Date.prototype.getLastDayOfMonth = function() {
    var  a = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
    return  (a < 0) ? (a + 7) : a;
};




Date.prototype.getFirstDateOfMonth = function() {
    return  new  Date(this.getFullYear(), this.getMonth(), 1);
};



Date.prototype.getLastDateOfMonth = function() {
    return  new  Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
};


Date.prototype.getDaysInMonth = function() {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return  Date.daysInMonth[this.getMonth()];
};



Date.prototype.getSuffix = function() {
    switch (this.getDate()) {
        case  1:
        case  21:
        case  31:
            return  "st";
        case  2:
        case  22:
            return  "nd";
        case  3:
        case  23:
            return  "rd";
        default:
            return  "th";
    }
};


Date.daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];



Date.monthNames =
   ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];



Date.dayNames =
   ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];


Date.y2kYear = 50;

Date.monthNumbers = {
    Jan:0,
    Feb:1,
    Mar:2,
    Apr:3,
    May:4,
    Jun:5,
    Jul:6,
    Aug:7,
    Sep:8,
    Oct:9,
    Nov:10,
    Dec:11};



Date.prototype.clone = function() {
	return  new  Date(this.getTime());
};



Date.prototype.clearTime = function(b){
    if(b){
        return  this.clone().clearTime();
    }

    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return  this;
};



if(Roo.isSafari){
    Date.brokenSetMonth = Date.prototype.setMonth;
	Date.prototype.setMonth = function(c){
		if(c <= -1){
			var  n = Math.ceil(-c);
			var  back_year = Math.ceil(n/12);
			var  month = (n % 12) ? 12 - n % 12 : 0 ;
			this.setFullYear(this.getFullYear() - back_year);
			return  Date.brokenSetMonth.call(this, month);
		} else  {
			return  Date.brokenSetMonth.apply(this, arguments);
		}
	};
}




Date.MILLI = "ms";


Date.SECOND = "s";


Date.MINUTE = "mi";


Date.HOUR = "h";


Date.DAY = "d";


Date.MONTH = "mo";


Date.YEAR = "y";



Date.prototype.add = function(e, f){
  var  d = this.clone();
  if (!e || f === 0) return  d;
  switch(e.toLowerCase()){
    case  Date.MILLI:
      d.setMilliseconds(this.getMilliseconds() + f);
      break;
    case  Date.SECOND:
      d.setSeconds(this.getSeconds() + f);
      break;
    case  Date.MINUTE:
      d.setMinutes(this.getMinutes() + f);
      break;
    case  Date.HOUR:
      d.setHours(this.getHours() + f);
      break;
    case  Date.DAY:
      d.setDate(this.getDate() + f);
      break;
    case  Date.MONTH:
      var  a = this.getDate();
      if(a > 28){
          a = Math.min(a, this.getFirstDateOfMonth().add('mo', f).getLastDateOfMonth().getDate());
      }

      d.setDate(a);
      d.setMonth(this.getMonth() + f);
      break;
    case  Date.YEAR:
      d.setFullYear(this.getFullYear() + f);
      break;
  }
  return  d;
};



Roo.lib.Dom = {
    getViewWidth : function(A) {
        return  A ? this.getDocumentWidth() : this.getViewportWidth();
    },

    getViewHeight : function(B) {
        return  B ? this.getDocumentHeight() : this.getViewportHeight();
    },

    getDocumentHeight: function() {
        var  C = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return  Math.max(C, this.getViewportHeight());
    },

    getDocumentWidth: function() {
        var  D = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return  Math.max(D, this.getViewportWidth());
    },

    getViewportHeight: function() {
        var  E = self.innerHeight;
        var  F = document.compatMode;

        if ((F || Roo.isIE) && !Roo.isOpera) {
            E = (F == "CSS1Compat") ?
                     document.documentElement.clientHeight :
                     document.body.clientHeight;
        }

        return  E;
    },

    getViewportWidth: function() {
        var  G = self.innerWidth;
        var  H = document.compatMode;

        if (H || Roo.isIE) {
            G = (H == "CSS1Compat") ?
                    document.documentElement.clientWidth :
                    document.body.clientWidth;
        }
        return  G;
    },

    isAncestor : function(p, c) {
        p = Roo.getDom(p);
        c = Roo.getDom(c);
        if (!p || !c) {
            return  false;
        }

        if (p.contains && !Roo.isSafari) {
            return  p.contains(c);
        } else  if (p.compareDocumentPosition) {
            return  !!(p.compareDocumentPosition(c) & 16);
        } else  {
            var  parent = c.parentNode;
            while (parent) {
                if (parent == p) {
                    return  true;
                }
                else  if (!parent.tagName || parent.tagName.toUpperCase() == "HTML") {
                    return  false;
                }

                parent = parent.parentNode;
            }
            return  false;
        }
    },

    getRegion : function(el) {
        return  Roo.lib.Region.getRegion(el);
    },

    getY : function(el) {
        return  this.getXY(el)[1];
    },

    getX : function(el) {
        return  this.getXY(el)[0];
    },

    getXY : function(el) {
        var  p, pe, b, I, bd = document.body;
        el = Roo.getDom(el);
        var  J = Roo.lib.AnimBase.fly;
        if (el.getBoundingClientRect) {
            b = el.getBoundingClientRect();
            I = J(document).getScroll();
            return  [b.left + I.left, b.top + I.top];
        }
        var  x = 0, y = 0;

        p = el;

        var  K = J(el).getStyle("position") == "absolute";

        while (p) {

            x += p.offsetLeft;
            y += p.offsetTop;

            if (!K && J(p).getStyle("position") == "absolute") {
                K = true;
            }

            if (Roo.isGecko) {
                pe = J(p);

                var  bt = parseInt(pe.getStyle("borderTopWidth"), 10) || 0;
                var  bl = parseInt(pe.getStyle("borderLeftWidth"), 10) || 0;


                x += bl;
                y += bt;


                if (p != el && pe.getStyle('overflow') != 'visible') {
                    x += bl;
                    y += bt;
                }
            }

            p = p.offsetParent;
        }

        if (Roo.isSafari && K) {
            x -= bd.offsetLeft;
            y -= bd.offsetTop;
        }

        if (Roo.isGecko && !K) {
            var  dbd = J(bd);
            x += parseInt(dbd.getStyle("borderLeftWidth"), 10) || 0;
            y += parseInt(dbd.getStyle("borderTopWidth"), 10) || 0;
        }


        p = el.parentNode;
        while (p && p != bd) {
            if (!Roo.isOpera || (p.tagName != 'TR' && J(p).getStyle("display") != "inline")) {
                x -= p.scrollLeft;
                y -= p.scrollTop;
            }

            p = p.parentNode;
        }
        return  [x, y];
    },
 
  


    setXY : function(el, xy) {
        el = Roo.fly(el, '_setXY');
        el.position();
        var  L = el.translatePoints(xy);
        if (xy[0] !== false) {
            el.dom.style.left = L.left + "px";
        }
        if (xy[1] !== false) {
            el.dom.style.top = L.top + "px";
        }
    },

    setX : function(el, x) {
        this.setXY(el, [x, false]);
    },

    setY : function(el, y) {
        this.setXY(el, [false, y]);
    }
};




Roo.lib.Event = function() {
    var  A = false;
    var  B = [];
    var  C = [];
    var  D = 0;
    var  E = [];
    var  F = 0;
    var  G = null;

    return  {
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
                var  self = this;
                var  callback = function() {
                    self._tryPreloadAttach();
                };
                this._interval = setInterval(callback, this.POLL_INTERVAL);

            }
        },

        onAvailable: function(h, k, m, n) {
            E.push({ id:         h,
                fn:         k,
                obj:        m,
                override:   n,
                checkReady: false    });

            D = this.POLL_RETRYS;
            this.startInterval();
        },


        addListener: function(el, o, fn) {
            el = Roo.getDom(el);
            if (!el || !fn) {
                return  false;
            }

            if ("unload" == o) {
                C[C.length] =
                [el, o, fn];
                return  true;
            }

            var  p = function(e) {
                return  fn(Roo.lib.Event.getEvent(e));
            };

            var  li = [el, o, fn, p];

            var  q = B.length;
            B[q] = li;

            this.doAdd(el, o, p, false);
            return  true;

        },


        removeListener: function(el, r, fn) {
            var  i, s;

            el = Roo.getDom(el);

            if(!fn) {
                return  this.purgeElement(el, false, r);
            }


            if ("unload" == r) {

                for (i = 0,s = C.length; i < s; i++) {
                    var  li = C[i];
                    if (li &&
                        li[0] == el &&
                        li[1] == r &&
                        li[2] == fn) {
                        C.splice(i, 1);
                        return  true;
                    }
                }

                return  false;
            }

            var  u = null;


            var  v = arguments[3];

            if ("undefined" == typeof  v) {
                v = this._getCacheIndex(el, r, fn);
            }

            if (v >= 0) {
                u = B[v];
            }

            if (!el || !u) {
                return  false;
            }


            this.doRemove(el, r, u[this.WFN], false);

            delete  B[v][this.WFN];
            delete  B[v][this.FN];
            B.splice(v, 1);

            return  true;

        },


        getTarget: function(ev, w) {
            ev = ev.browserEvent || ev;
            var  t = ev.target || ev.srcElement;
            return  this.resolveTextNode(t);
        },


        resolveTextNode: function(z) {
            if (Roo.isSafari && z && 3 == z.nodeType) {
                return  z.parentNode;
            } else  {
                return  z;
            }
        },


        getPageX: function(ev) {
            ev = ev.browserEvent || ev;
            var  x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;

                if (Roo.isIE) {
                    x += this.getScroll()[1];
                }
            }

            return  x;
        },


        getPageY: function(ev) {
            ev = ev.browserEvent || ev;
            var  y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;

                if (Roo.isIE) {
                    y += this.getScroll()[0];
                }
            }


            return  y;
        },


        getXY: function(ev) {
            ev = ev.browserEvent || ev;
            return  [this.getPageX(ev), this.getPageY(ev)];
        },


        getRelatedTarget: function(ev) {
            ev = ev.browserEvent || ev;
            var  t = ev.relatedTarget;
            if (!t) {
                if (ev.type == "mouseout") {
                    t = ev.toElement;
                } else  if (ev.type == "mouseover") {
                    t = ev.fromElement;
                }
            }

            return  this.resolveTextNode(t);
        },


        getTime: function(ev) {
            ev = ev.browserEvent || ev;
            if (!ev.time) {
                var  t = new  Date().getTime();
                try {
                    ev.time = t;
                } catch(ex) {
                    this.lastError = ex;
                    return  t;
                }
            }

            return  ev.time;
        },


        stopEvent: function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },


        stopPropagation: function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else  {
                ev.cancelBubble = true;
            }
        },


        preventDefault: function(ev) {
            ev = ev.browserEvent || ev;
            if(ev.preventDefault) {
                ev.preventDefault();
            } else  {
                ev.returnValue = false;
            }
        },


        getEvent: function(e) {
            var  ev = e || window.event;
            if (!ev) {
                var  c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }

                    c = c.caller;
                }
            }
            return  ev;
        },


        getCharCode: function(ev) {
            ev = ev.browserEvent || ev;
            return  ev.charCode || ev.keyCode || 0;
        },


        _getCacheIndex: function(el, AA, fn) {
            for (var  i = 0,s = B.length; i < s; ++i) {
                var  li = B[i];
                if (li &&
                    li[this.FN] == fn &&
                    li[this.EL] == el &&
                    li[this.TYPE] == AA) {
                    return  i;
                }
            }

            return  -1;
        },


        elCache: {},


        getEl: function(id) {
            return  document.getElementById(id);
        },


        clearCache: function() {
        },


        _load: function(e) {
            A = true;
            var  EU = Roo.lib.Event;


            if (Roo.isIE) {
                EU.doRemove(window, "load", EU._load);
            }
        },


        _tryPreloadAttach: function() {

            if (this.locked) {
                return  false;
            }


            this.locked = true;


            var  AB = !A;
            if (!AB) {
                AB = (D > 0);
            }


            var  AC = [];
            for (var  i = 0,s = E.length; i < s; ++i) {
                var  item = E[i];
                if (item) {
                    var  el = this.getEl(item.id);

                    if (el) {
                        if (!item.checkReady ||
                            A ||
                            el.nextSibling ||
                            (document && document.body)) {

                            var  scope = el;
                            if (item.override) {
                                if (item.override === true) {
                                    scope = item.obj;
                                } else  {
                                    scope = item.override;
                                }
                            }

                            item.fn.call(scope, item.obj);
                            E[i] = null;
                        }
                    } else  {
                        AC.push(item);
                    }
                }
            }


            D = (AC.length === 0) ? 0 : D - 1;

            if (AB) {

                this.startInterval();
            } else  {
                clearInterval(this._interval);
                this._interval = null;
            }


            this.locked = false;

            return  true;

        },


        purgeElement: function(el, AD, AE) {
            var  AF = this.getListeners(el, AE);
            if (AF) {
                for (var  i = 0,s = AF.length; i < s; ++i) {
                    var  l = AF[i];
                    this.removeListener(el, l.type, l.fn);
                }
            }

            if (AD && el && el.childNodes) {
                for (i = 0,s = el.childNodes.length; i < s; ++i) {
                    this.purgeElement(el.childNodes[i], AD, AE);
                }
            }
        },


        getListeners: function(el, AG) {
            var  AH = [], AI;
            if (!AG) {
                AI = [B, C];
            } else  if (AG == "unload") {
                AI = [C];
            } else  {
                AI = [B];
            }

            for (var  j = 0; j < AI.length; ++j) {
                var  searchList = AI[j];
                if (searchList && searchList.length > 0) {
                    for (var  i = 0,s = searchList.length; i < s; ++i) {
                        var  l = searchList[i];
                        if (l && l[this.EL] === el &&
                            (!AG || AG === l[this.TYPE])) {
                            AH.push({
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

            return  (AH.length) ? AH : null;
        },


        _unload: function(e) {

            var  EU = Roo.lib.Event, i, j, l, AJ, AK;

            for (i = 0,AJ = C.length; i < AJ; ++i) {
                l = C[i];
                if (l) {
                    var  scope = window;
                    if (l[EU.ADJ_SCOPE]) {
                        if (l[EU.ADJ_SCOPE] === true) {
                            scope = l[EU.OBJ];
                        } else  {
                            scope = l[EU.ADJ_SCOPE];
                        }
                    }

                    l[EU.FN].call(scope, EU.getEvent(e), l[EU.OBJ]);
                    C[i] = null;
                    l = null;
                    scope = null;
                }
            }


            C = null;

            if (B && B.length > 0) {
                j = B.length;
                while (j) {
                    AK = j - 1;
                    l = B[AK];
                    if (l) {
                        EU.removeListener(l[EU.EL], l[EU.TYPE],
                                l[EU.FN], AK);
                    }

                    j = j - 1;
                }

                l = null;

                EU.clearCache();
            }


            EU.doRemove(window, "unload", EU._unload);

        },


        getScroll: function() {
            var  dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollTop || dd.scrollLeft)) {
                return  [dd.scrollTop, dd.scrollLeft];
            } else  if (db) {
                return  [db.scrollTop, db.scrollLeft];
            } else  {
                return  [0, 0];
            }
        },


        doAdd: function () {
            if (window.addEventListener) {
                return  function(el, AL, fn, AM) {
                    el.addEventListener(AL, fn, (AM));
                };
            } else  if (window.attachEvent) {
                return  function(el, AL, fn, AM) {
                    el.attachEvent("on" + AL, fn);
                };
            } else  {
                return  function() {
                };
            }
        }(),


        doRemove: function() {
            if (window.removeEventListener) {
                return  function (el, AL, fn, AM) {
                    el.removeEventListener(AL, fn, (AM));
                };
            } else  if (window.detachEvent) {
                return  function (el, AL, fn) {
                    el.detachEvent("on" + AL, fn);
                };
            } else  {
                return  function() {
                };
            }
        }()
    };
    
}();
(function() {     
   
    var  E = Roo.lib.Event;
    E.on = E.addListener;
    E.un = E.removeListener;

    if (document && document.body) {
        E._load();
    } else  {
        E.doAdd(window, "load", E._load);
    }

    E.doAdd(window, "unload", E._unload);
    E._tryPreloadAttach();
})();





(function() {
    
    Roo.lib.Ajax = {
        request : function(A, B, cb, C, D) {
            if(D){
                var  hs = D.headers;
                if(hs){
                    for(var  h  in  hs){
                        if(hs.hasOwnProperty(h)){
                            this.initHeader(h, hs[h], false);
                        }
                    }
                }
                if(D.xmlData){
                    this.initHeader('Content-Type', 'text/xml', false);
                    A = 'POST';
                    C = D.xmlData;
                }
            }

            return  this.asyncRequest(A, B, cb, C);
        },

        serializeForm : function(E) {
            if(typeof  E == 'string') {
                E = (document.getElementById(E) || document.forms[E]);
            }

            var  el, F, G, H, I = '', J = false;
            for (var  i = 0; i < E.elements.length; i++) {
                el = E.elements[i];
                H = E.elements[i].disabled;
                F = E.elements[i].name;
                G = E.elements[i].value;

                if (!H && F){
                    switch (el.type)
                            {
                        case  'select-one':
                        case  'select-multiple':
                            for (var  j = 0; j < el.options.length; j++) {
                                if (el.options[j].selected) {
                                    if (Roo.isIE) {
                                        I += encodeURIComponent(F) + '=' + encodeURIComponent(el.options[j].attributes['value'].specified ? el.options[j].value : el.options[j].text) + '&';
                                    }
                                    else  {
                                        I += encodeURIComponent(F) + '=' + encodeURIComponent(el.options[j].hasAttribute('value') ? el.options[j].value : el.options[j].text) + '&';
                                    }
                                }
                            }
                            break;
                        case  'radio':
                        case  'checkbox':
                            if (el.checked) {
                                I += encodeURIComponent(F) + '=' + encodeURIComponent(G) + '&';
                            }
                            break;
                        case  'file':

                        case  undefined:

                        case  'reset':

                        case  'button':

                            break;
                        case  'submit':
                            if(J == false) {
                                I += encodeURIComponent(F) + '=' + encodeURIComponent(G) + '&';
                                J = true;
                            }
                            break;
                        default:
                            I += encodeURIComponent(F) + '=' + encodeURIComponent(G) + '&';
                            break;
                    }
                }
            }

            I = I.substr(0, I.length - 1);
            return  I;
        },

        headers:{},

        hasHeaders:false,

        useDefaultHeader:true,

        defaultPostHeader:'application/x-www-form-urlencoded',

        useDefaultXhrHeader:true,

        defaultXhrHeader:'XMLHttpRequest',

        hasDefaultHeaders:true,

        defaultHeaders:{},

        poll:{},

        timeout:{},

        pollInterval:50,

        transactionId:0,

        setProgId:function(id)
        {
            this.activeX.unshift(id);
        },

        setDefaultPostHeader:function(b)
        {
            this.useDefaultHeader = b;
        },

        setDefaultXhrHeader:function(b)
        {
            this.useDefaultXhrHeader = b;
        },

        setPollingInterval:function(i)
        {
            if (typeof  i == 'number' && isFinite(i)) {
                this.pollInterval = i;
            }
        },

        createXhrObject:function(K)
        {
            var  L,M;
            try
            {

                M = new  XMLHttpRequest();

                L = { conn:M, tId:K };
            }
            catch(e)
            {
                for (var  i = 0; i < this.activeX.length; ++i) {
                    try
                    {

                        http = new  ActiveXObject(this.activeX[i]);

                        obj = { conn:http, tId:transactionId };
                        break;
                    }
                    catch(e) {
                    }
                }
            }
            finally
            {
                return  L;
            }
        },

        getConnectionObject:function()
        {
            var  o;
            var  N = this.transactionId;

            try
            {
                o = this.createXhrObject(N);
                if (o) {
                    this.transactionId++;
                }
            }
            catch(e) {
            }
            finally
            {
                return  o;
            }
        },

        asyncRequest:function(O, P, Q, R)
        {
            var  o = this.getConnectionObject();

            if (!o) {
                return  null;
            }
            else  {
                o.conn.open(O, P, true);

                if (this.useDefaultXhrHeader) {
                    if (!this.defaultHeaders['X-Requested-With']) {
                        this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
                    }
                }

                if(R && this.useDefaultHeader){
                    this.initHeader('Content-Type', this.defaultPostHeader);
                }

                 if (this.hasDefaultHeaders || this.hasHeaders) {
                    this.setHeader(o);
                }


                this.handleReadyState(o, Q);
                o.conn.send(R || null);

                return  o;
            }
        },

        handleReadyState:function(o, S)
        {
            var  T = this;

            if (S && S.timeout) {
                this.timeout[o.tId] = window.setTimeout(function() {
                    T.abort(o, S, true);
                }, S.timeout);
            }


            this.poll[o.tId] = window.setInterval(
                    function() {
                        if (o.conn && o.conn.readyState == 4) {
                            window.clearInterval(T.poll[o.tId]);
                            delete  T.poll[o.tId];

                            if(S && S.timeout) {
                                window.clearTimeout(T.timeout[o.tId]);
                                delete  T.timeout[o.tId];
                            }


                            T.handleTransactionResponse(o, S);
                        }
                    }
                    , this.pollInterval);
        },

        handleTransactionResponse:function(o, U, V)
        {

            if (!U) {
                this.releaseObject(o);
                return;
            }

            var  W, X;

            try
            {
                if (o.conn.status !== undefined && o.conn.status != 0) {
                    W = o.conn.status;
                }
                else  {
                    W = 13030;
                }
            }
            catch(e) {


                httpStatus = 13030;
            }

            if (W >= 200 && W < 300) {
                X = this.createResponseObject(o, U.argument);
                if (U.success) {
                    if (!U.scope) {
                        U.success(X);
                    }
                    else  {


                        U.success.apply(U.scope, [X]);
                    }
                }
            }
            else  {
                switch (W) {

                    case  12002:
                    case  12029:
                    case  12030:
                    case  12031:
                    case  12152:
                    case  13030:
                        X = this.createExceptionObject(o.tId, U.argument, (V ? V : false));
                        if (U.failure) {
                            if (!U.scope) {
                                U.failure(X);
                            }
                            else  {
                                U.failure.apply(U.scope, [X]);
                            }
                        }
                        break;
                    default:
                        X = this.createResponseObject(o, U.argument);
                        if (U.failure) {
                            if (!U.scope) {
                                U.failure(X);
                            }
                            else  {
                                U.failure.apply(U.scope, [X]);
                            }
                        }
                }
            }


            this.releaseObject(o);
            X = null;
        },

        createResponseObject:function(o, Y)
        {
            var  Z = {};
            var  a = {};

            try
            {
                var  headerStr = o.conn.getAllResponseHeaders();
                var  header = headerStr.split('\n');
                for (var  i = 0; i < header.length; i++) {
                    var  delimitPos = header[i].indexOf(':');
                    if (delimitPos != -1) {
                        a[header[i].substring(0, delimitPos)] = header[i].substring(delimitPos + 2);
                    }
                }
            }
            catch(e) {
            }


            Z.tId = o.tId;
            Z.status = o.conn.status;
            Z.statusText = o.conn.statusText;
            Z.getResponseHeader = a;
            Z.getAllResponseHeaders = headerStr;
            Z.responseText = o.conn.responseText;
            Z.responseXML = o.conn.responseXML;

            if (typeof  Y !== undefined) {
                Z.argument = Y;
            }

            return  Z;
        },

        createExceptionObject:function(c, d, f)
        {
            var  g = 0;
            var  k = 'communication failure';
            var  l = -1;
            var  m = 'transaction aborted';

            var  n = {};

            n.tId = c;
            if (f) {
                n.status = l;
                n.statusText = m;
            }
            else  {
                n.status = g;
                n.statusText = k;
            }

            if (d) {
                n.argument = d;
            }

            return  n;
        },

        initHeader:function(p, q, r)
        {
            var  s = (r) ? this.defaultHeaders : this.headers;

            if (s[p] === undefined) {
                s[p] = q;
            }
            else  {


                s[p] = q + "," + s[p];
            }

            if (r) {
                this.hasDefaultHeaders = true;
            }
            else  {
                this.hasHeaders = true;
            }
        },


        setHeader:function(o)
        {
            if (this.hasDefaultHeaders) {
                for (var  prop  in  this.defaultHeaders) {
                    if (this.defaultHeaders.hasOwnProperty(prop)) {
                        o.conn.setRequestHeader(prop, this.defaultHeaders[prop]);
                    }
                }
            }

            if (this.hasHeaders) {
                for (var  prop  in  this.headers) {
                    if (this.headers.hasOwnProperty(prop)) {
                        o.conn.setRequestHeader(prop, this.headers[prop]);
                    }
                }

                this.headers = {};
                this.hasHeaders = false;
            }
        },

        resetDefaultHeaders:function() {
            delete  this.defaultHeaders;
            this.defaultHeaders = {};
            this.hasDefaultHeaders = false;
        },

        abort:function(o, t, u)
        {
            if(this.isCallInProgress(o)) {
                o.conn.abort();
                window.clearInterval(this.poll[o.tId]);
                delete  this.poll[o.tId];
                if (u) {
                    delete  this.timeout[o.tId];
                }


                this.handleTransactionResponse(o, t, true);

                return  true;
            }
            else  {
                return  false;
            }
        },


        isCallInProgress:function(o)
        {
            if (o && o.conn) {
                return  o.conn.readyState != 4 && o.conn.readyState != 0;
            }
            else  {

                return  false;
            }
        },


        releaseObject:function(o)
        {

            o.conn = null;

            o = null;
        },

        activeX:[
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
        ]


    };
})();



Roo.lib.Region = function(t, r, b, l) {
    this.top = t;
    this[1] = t;
    this.right = r;
    this.bottom = b;
    this.left = l;
    this[0] = l;
};


Roo.lib.Region.prototype = {
    contains : function(A) {
        return  ( A.left >= this.left &&
                 A.right <= this.right &&
                 A.top >= this.top &&
                 A.bottom <= this.bottom    );

    },

    getArea : function() {
        return  ( (this.bottom - this.top) * (this.right - this.left) );
    },

    intersect : function(B) {
        var  t = Math.max(this.top, B.top);
        var  r = Math.min(this.right, B.right);
        var  b = Math.min(this.bottom, B.bottom);
        var  l = Math.max(this.left, B.left);

        if (b >= t && r >= l) {
            return  new  Roo.lib.Region(t, r, b, l);
        } else  {
            return  null;
        }
    },
    union : function(C) {
        var  t = Math.min(this.top, C.top);
        var  r = Math.max(this.right, C.right);
        var  b = Math.max(this.bottom, C.bottom);
        var  l = Math.min(this.left, C.left);

        return  new  Roo.lib.Region(t, r, b, l);
    },

    adjust : function(t, l, b, r) {
        this.top += t;
        this.left += l;
        this.right += r;
        this.bottom += b;
        return  this;
    }
};

Roo.lib.Region.getRegion = function(el) {
    var  p = Roo.lib.Dom.getXY(el);

    var  t = p[1];
    var  r = p[0] + el.offsetWidth;
    var  b = p[1] + el.offsetHeight;
    var  l = p[0];

    return  new  Roo.lib.Region(t, r, b, l);
};






Roo.lib.Point = function(x, y) {
    if (x  instanceof  Array) {
        y = x[1];
        x = x[0];
    }

    this.x = this.right = this.left = this[0] = x;
    this.y = this.top = this.bottom = this[1] = y;
};

Roo.lib.Point.prototype = new  Roo.lib.Region();



 
(function() {   

    Roo.lib.Anim = {
        scroll : function(el, A, B, C, cb, D) {
            this.run(el, A, B, C, cb, D, Roo.lib.Scroll);
        },

        motion : function(el, E, F, G, cb, H) {
            this.run(el, E, F, G, cb, H, Roo.lib.Motion);
        },

        color : function(el, I, J, K, cb, L) {
            this.run(el, I, J, K, cb, L, Roo.lib.ColorAnim);
        },

        run : function(el, M, N, O, cb, P, Q) {
            Q = Q || Roo.lib.AnimBase;
            if (typeof  O == "string") {
                O = Roo.lib.Easing[O];
            }
            var  R = new  Q(el, M, N, O);
            R.animateX(function() {
                Roo.callback(cb, P);
            });
            return  R;
        }
    };
})();



(function() {    
    var  A;
    
    function  B(el) {
        if (!A) {
            A = new  Roo.Element.Flyweight();
        }

        A.dom = el;
        return  A;
    }


    
    
   
    
    Roo.lib.AnimBase = function(el, C, D, E) {
        if (el) {
            this.init(el, C, D, E);
        }
    };

    Roo.lib.AnimBase.fly = B;
    
    
    
    Roo.lib.AnimBase.prototype = {

        toString: function() {
            var  el = this.getEl();
            var  id = el.id || el.tagName;
            return  ("Anim " + id);
        },

        patterns: {
            noNegatives:        /width|height|opacity|padding/i,
            offsetAttribute:  /^((width|height)|(top|left))$/,
            defaultUnit:        /width|height|top$|bottom$|left$|right$/i,
            offsetUnit:         /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i
        },


        doMethod: function(C, D, E) {
            return  this.method(this.currentFrame, D, E - D, this.totalFrames);
        },


        setAttribute: function(F, G, H) {
            if (this.patterns.noNegatives.test(F)) {
                G = (G > 0) ? G : 0;
            }


            Roo.fly(this.getEl(), '_anim').setStyle(F, G + H);
        },


        getAttribute: function(I) {
            var  el = this.getEl();
            var  J = B(el).getStyle(I);

            if (J !== 'auto' && !this.patterns.offsetUnit.test(J)) {
                return  parseFloat(J);
            }

            var  a = this.patterns.offsetAttribute.exec(I) || [];
            var  K = !!( a[3] );
            var  L = !!( a[2] );


            if (L || (B(el).getStyle('position') == 'absolute' && K)) {
                J = el['offset' + a[0].charAt(0).toUpperCase() + a[0].substr(1)];
            } else  {
                J = 0;
            }

            return  J;
        },


        getDefaultUnit: function(M) {
            if (this.patterns.defaultUnit.test(M)) {
                return  'px';
            }

            return  '';
        },

        animateX : function(N, O) {
            var  f = function() {
                this.onComplete.removeListener(f);
                if (typeof  N == "function") {
                    N.call(O || this, this);
                }
            };
            this.onComplete.addListener(f, this);
            this.animate();
        },


        setRuntimeAttribute: function(P) {
            var  Q;
            var  R;
            var  S = this.attributes;

            this.runtimeAttributes[P] = {};

            var  T = function(U) {
                return  (typeof  U !== 'undefined');
            };

            if (!T(S[P]['to']) && !T(S[P]['by'])) {
                return  false;
            }


            Q = ( T(S[P]['from']) ) ? S[P]['from'] : this.getAttribute(P);


            if (T(S[P]['to'])) {
                R = S[P]['to'];
            } else  if (T(S[P]['by'])) {
                if (Q.constructor == Array) {
                    R = [];
                    for (var  i = 0, len = Q.length; i < len; ++i) {
                        R[i] = Q[i] + S[P]['by'][i];
                    }
                } else  {
                    R = Q + S[P]['by'];
                }
            }


            this.runtimeAttributes[P].start = Q;
            this.runtimeAttributes[P].end = R;


            this.runtimeAttributes[P].unit = ( T(S[P].unit) ) ? S[P]['unit'] : this.getDefaultUnit(P);
        },


        init: function(el, U, V, W) {

            var  X = false;


            var  Y = null;


            var  Z = 0;


            el = Roo.getDom(el);


            this.attributes = U || {};


            this.duration = V || 1;


            this.method = W || Roo.lib.Easing.easeNone;


            this.useSeconds = true;


            this.currentFrame = 0;


            this.totalFrames = Roo.lib.AnimMgr.fps;


            this.getEl = function() {
                return  el;
            };


            this.isAnimated = function() {
                return  X;
            };


            this.getStartTime = function() {
                return  Y;
            };

            this.runtimeAttributes = {};


            this.animate = function() {
                if (this.isAnimated()) {
                    return  false;
                }


                this.currentFrame = 0;

                this.totalFrames = ( this.useSeconds ) ? Math.ceil(Roo.lib.AnimMgr.fps * this.duration) : this.duration;

                Roo.lib.AnimMgr.registerElement(this);
            };


            this.stop = function(e) {
                if (e) {
                    this.currentFrame = this.totalFrames;
                    this._onTween.fire();
                }

                Roo.lib.AnimMgr.stop(this);
            };

            var  b = function() {
                this.onStart.fire();

                this.runtimeAttributes = {};
                for (var  P  in  this.attributes) {
                    this.setRuntimeAttribute(P);
                }


                X = true;
                Z = 0;
                Y = new  Date();
            };


            var  c = function() {
                var  e = {
                    duration: new  Date() - this.getStartTime(),
                    currentFrame: this.currentFrame
                };

                e.toString = function() {
                    return  (
                            'duration: ' + e.duration +
                            ', currentFrame: ' + e.currentFrame
                            );
                };

                this.onTween.fire(e);

                var  g = this.runtimeAttributes;

                for (var  P  in  g) {
                    this.setAttribute(P, this.doMethod(P, g[P].start, g[P].end), g[P].unit);
                }


                Z += 1;
            };

            var  d = function() {
                var  e = (new  Date() - Y) / 1000 ;

                var  g = {
                    duration: e,
                    frames: Z,
                    fps: Z / e
                };

                g.toString = function() {
                    return  (
                            'duration: ' + g.duration +
                            ', frames: ' + g.frames +
                            ', fps: ' + g.fps
                            );
                };

                X = false;
                Z = 0;
                this.onComplete.fire(g);
            };


            this._onStart = new  Roo.util.Event(this);
            this.onStart = new  Roo.util.Event(this);
            this.onTween = new  Roo.util.Event(this);
            this._onTween = new  Roo.util.Event(this);
            this.onComplete = new  Roo.util.Event(this);
            this._onComplete = new  Roo.util.Event(this);
            this._onStart.addListener(b);
            this._onTween.addListener(c);
            this._onComplete.addListener(d);
        }
    };
})();




Roo.lib.AnimMgr = new  function() {

        var  A = null;


        var  B = [];


        var  C = 0;


        this.fps = 1000;


        this.delay = 1;


        this.registerElement = function(F) {
            B[B.length] = F;
            C += 1;
            F._onStart.fire();
            this.start();
        };


        this.unRegister = function(F, G) {
            F._onComplete.fire();
            G = G || D(F);
            if (G != -1) {
                B.splice(G, 1);
            }


            C -= 1;
            if (C <= 0) {
                this.stop();
            }
        };


        this.start = function() {
            if (A === null) {
                A = setInterval(this.run, this.delay);
            }
        };


        this.stop = function(F) {
            if (!F) {
                clearInterval(A);

                for (var  i = 0, len = B.length; i < len; ++i) {
                    if (B[0].isAnimated()) {
                        this.unRegister(B[0], 0);
                    }
                }


                B = [];
                A = null;
                C = 0;
            }
            else  {
                this.unRegister(F);
            }
        };


        this.run = function() {
            for (var  i = 0, len = B.length; i < len; ++i) {
                var  tween = B[i];
                if (!tween || !tween.isAnimated()) {
                    continue;
                }

                if (tween.currentFrame < tween.totalFrames || tween.totalFrames === null)
                {
                    tween.currentFrame += 1;

                    if (tween.useSeconds) {
                        E(tween);
                    }

                    tween._onTween.fire();
                }
                else  {
                    Roo.lib.AnimMgr.stop(tween, i);
                }
            }
        };

        var  D = function(F) {
            for (var  i = 0, len = B.length; i < len; ++i) {
                if (B[i] == F) {
                    return  i;
                }
            }
            return  -1;
        };


        var  E = function(F) {
            var  G = F.totalFrames;
            var  H = F.currentFrame;
            var  I = (F.currentFrame * F.duration * 1000 / F.totalFrames);
            var  J = (new  Date() - F.getStartTime());
            var  K = 0;

            if (J < F.duration * 1000) {
                K = Math.round((J / I - 1) * F.currentFrame);
            } else  {
                K = G - (H + 1);
            }
            if (K > 0 && isFinite(K)) {
                if (F.currentFrame + K >= G) {
                    K = G - (H + 1);
                }


                F.currentFrame += K;
            }
        };
    };


Roo.lib.Bezier = new  function() {

        this.getPosition = function(A, t) {
            var  n = A.length;
            var  B = [];

            for (var  i = 0; i < n; ++i) {
                B[i] = [A[i][0], A[i][1]];
            }

            for (var  j = 1; j < n; ++j) {
                for (i = 0; i < n - j; ++i) {
                    B[i][0] = (1 - t) * B[i][0] + t * B[parseInt(i + 1, 10)][0];
                    B[i][1] = (1 - t) * B[i][1] + t * B[parseInt(i + 1, 10)][1];
                }
            }

            return  [ B[0][0], B[0][1] ];

        };
    };


(function() {

    Roo.lib.ColorAnim = function(el, D, E, F) {
        Roo.lib.ColorAnim.superclass.constructor.call(this, el, D, E, F);
    };

    Roo.extend(Roo.lib.ColorAnim, Roo.lib.AnimBase);

    var  A = Roo.lib.AnimBase.fly;
    var  Y = Roo.lib;
    var  B = Y.ColorAnim.superclass;
    var  C = Y.ColorAnim.prototype;

    C.toString = function() {
        var  el = this.getEl();
        var  id = el.id || el.tagName;
        return  ("ColorAnim " + id);
    };

    C.patterns.color = /color$/i;
    C.patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
    C.patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
    C.patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
    C.patterns.transparent = /^transparent|rgba\(0, 0, 0, 0\)$/;


    C.parseColor = function(s) {
        if (s.length == 3) {
            return  s;
        }

        var  c = this.patterns.hex.exec(s);
        if (c && c.length == 4) {
            return  [ parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16) ];
        }


        c = this.patterns.rgb.exec(s);
        if (c && c.length == 4) {
            return  [ parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10) ];
        }


        c = this.patterns.hex3.exec(s);
        if (c && c.length == 4) {
            return  [ parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16) ];
        }

        return  null;
    };
    
    C.getAttribute = function(D) {
        var  el = this.getEl();
        if (this.patterns.color.test(D)) {
            var  val = A(el).getStyle(D);

            if (this.patterns.transparent.test(val)) {
                var  parent = el.parentNode;
                val = A(parent).getStyle(D);

                while (parent && this.patterns.transparent.test(val)) {
                    parent = parent.parentNode;
                    val = A(parent).getStyle(D);
                    if (parent.tagName.toUpperCase() == 'HTML') {
                        val = '#fff';
                    }
                }
            }
        } else  {
            val = B.getAttribute.call(this, D);
        }

        return  val;
    };
    C.getAttribute = function(D) {
        var  el = this.getEl();
        if (this.patterns.color.test(D)) {
            var  val = A(el).getStyle(D);

            if (this.patterns.transparent.test(val)) {
                var  parent = el.parentNode;
                val = A(parent).getStyle(D);

                while (parent && this.patterns.transparent.test(val)) {
                    parent = parent.parentNode;
                    val = A(parent).getStyle(D);
                    if (parent.tagName.toUpperCase() == 'HTML') {
                        val = '#fff';
                    }
                }
            }
        } else  {
            val = B.getAttribute.call(this, D);
        }

        return  val;
    };

    C.doMethod = function(D, E, F) {
        var  G;

        if (this.patterns.color.test(D)) {
            G = [];
            for (var  i = 0, len = E.length; i < len; ++i) {
                G[i] = B.doMethod.call(this, D, E[i], F[i]);
            }


            G = 'rgb(' + Math.floor(G[0]) + ',' + Math.floor(G[1]) + ',' + Math.floor(G[2]) + ')';
        }
        else  {
            G = B.doMethod.call(this, D, E, F);
        }

        return  G;
    };

    C.setRuntimeAttribute = function(D) {
        B.setRuntimeAttribute.call(this, D);

        if (this.patterns.color.test(D)) {
            var  attributes = this.attributes;
            var  start = this.parseColor(this.runtimeAttributes[D].start);
            var  end = this.parseColor(this.runtimeAttributes[D].end);

            if (typeof  attributes[D]['to'] === 'undefined' && typeof  attributes[D]['by'] !== 'undefined') {
                end = this.parseColor(attributes[D].by);

                for (var  i = 0, len = start.length; i < len; ++i) {
                    end[i] = start[i] + end[i];
                }
            }


            this.runtimeAttributes[D].start = start;
            this.runtimeAttributes[D].end = end;
        }
    };
})();




Roo.lib.Easing = {


    easeNone: function (t, b, c, d) {
        return  c * t / d + b;
    },


    easeIn: function (t, b, c, d) {
        return  c * (t /= d) * t + b;
    },


    easeOut: function (t, b, c, d) {
        return  -c * (t /= d) * (t - 2) + b;
    },


    easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return  c / 2 * t * t + b;
        }

        return  -c / 2 * ((--t) * (t - 2) - 1) + b;
    },


    easeInStrong: function (t, b, c, d) {
        return  c * (t /= d) * t * t * t + b;
    },


    easeOutStrong: function (t, b, c, d) {
        return  -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },


    easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return  c / 2 * t * t * t * t + b;
        }

        return  -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },



    elasticIn: function (t, b, c, d, a, p) {
        if (t == 0) {
            return  b;
        }
        if ((t /= d) == 1) {
            return  b + c;
        }
        if (!p) {
            p = d * .3;
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var  s = p / 4;
        }
        else  {
            var  s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return  -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },


    elasticOut: function (t, b, c, d, a, p) {
        if (t == 0) {
            return  b;
        }
        if ((t /= d) == 1) {
            return  b + c;
        }
        if (!p) {
            p = d * .3;
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var  s = p / 4;
        }
        else  {
            var  s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return  a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },


    elasticBoth: function (t, b, c, d, a, p) {
        if (t == 0) {
            return  b;
        }

        if ((t /= d / 2) == 2) {
            return  b + c;
        }

        if (!p) {
            p = d * (.3 * 1.5);
        }

        if (!a || a < Math.abs(c)) {
            a = c;
            var  s = p / 4;
        }
        else  {
            var  s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        if (t < 1) {
            return  -.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                          Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return  a * Math.pow(2, -10 * (t -= 1)) *
               Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },



    backIn: function (t, b, c, d, s) {
        if (typeof  s == 'undefined') {
            s = 1.70158;
        }
        return  c * (t /= d) * t * ((s + 1) * t - s) + b;
    },


    backOut: function (t, b, c, d, s) {
        if (typeof  s == 'undefined') {
            s = 1.70158;
        }
        return  c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },


    backBoth: function (t, b, c, d, s) {
        if (typeof  s == 'undefined') {
            s = 1.70158;
        }

        if ((t /= d / 2 ) < 1) {
            return  c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return  c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },


    bounceIn: function (t, b, c, d) {
        return  c - Roo.lib.Easing.bounceOut(d - t, 0, c, d) + b;
    },


    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return  c * (7.5625 * t * t) + b;
        } else  if (t < (2 / 2.75)) {
            return  c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else  if (t < (2.5 / 2.75)) {
            return  c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        return  c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    },


    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return  Roo.lib.Easing.bounceIn(t * 2, 0, c, d) * .5 + b;
        }
        return  Roo.lib.Easing.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};


    (function() {
        Roo.lib.Motion = function(el, E, F, G) {
            if (el) {
                Roo.lib.Motion.superclass.constructor.call(this, el, E, F, G);
            }
        };

        Roo.extend(Roo.lib.Motion, Roo.lib.ColorAnim);


        var  Y = Roo.lib;
        var  A = Y.Motion.superclass;
        var  B = Y.Motion.prototype;

        B.toString = function() {
            var  el = this.getEl();
            var  id = el.id || el.tagName;
            return  ("Motion " + id);
        };

        B.patterns.points = /^points$/i;

        B.setAttribute = function(E, F, G) {
            if (this.patterns.points.test(E)) {
                G = G || 'px';
                A.setAttribute.call(this, 'left', F[0], G);
                A.setAttribute.call(this, 'top', F[1], G);
            } else  {
                A.setAttribute.call(this, E, F, G);
            }
        };

        B.getAttribute = function(E) {
            if (this.patterns.points.test(E)) {
                var  val = [
                        A.getAttribute.call(this, 'left'),
                        A.getAttribute.call(this, 'top')
                        ];
            } else  {
                val = A.getAttribute.call(this, E);
            }

            return  val;
        };

        B.doMethod = function(E, F, G) {
            var  H = null;

            if (this.patterns.points.test(E)) {
                var  t = this.method(this.currentFrame, 0, 100, this.totalFrames) / 100;
                H = Y.Bezier.getPosition(this.runtimeAttributes[E], t);
            } else  {
                H = A.doMethod.call(this, E, F, G);
            }
            return  H;
        };

        B.setRuntimeAttribute = function(E) {
            if (this.patterns.points.test(E)) {
                var  el = this.getEl();
                var  attributes = this.attributes;
                var  start;
                var  control = attributes['points']['control'] || [];
                var  end;
                var  i, len;

                if (control.length > 0 && !(control[0]  instanceof  Array)) {
                    control = [control];
                } else  {
                    var  tmp = [];
                    for (i = 0,len = control.length; i < len; ++i) {
                        tmp[i] = control[i];
                    }

                    control = tmp;
                }


                Roo.fly(el).position();

                if (D(attributes['points']['from'])) {
                    Roo.lib.Dom.setXY(el, attributes['points']['from']);
                }
                else  {
                    Roo.lib.Dom.setXY(el, Roo.lib.Dom.getXY(el));
                }


                start = this.getAttribute('points');


                if (D(attributes['points']['to'])) {
                    end = C.call(this, attributes['points']['to'], start);

                    var  pageXY = Roo.lib.Dom.getXY(this.getEl());
                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = C.call(this, control[i], start);
                    }


                } else  if (D(attributes['points']['by'])) {
                    end = [ start[0] + attributes['points']['by'][0], start[1] + attributes['points']['by'][1] ];

                    for (i = 0,len = control.length; i < len; ++i) {
                        control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                    }
                }


                this.runtimeAttributes[E] = [start];

                if (control.length > 0) {
                    this.runtimeAttributes[E] = this.runtimeAttributes[E].concat(control);
                }


                this.runtimeAttributes[E][this.runtimeAttributes[E].length] = end;
            }
            else  {
                A.setRuntimeAttribute.call(this, E);
            }
        };

        var  C = function(E, F) {
            var  G = Roo.lib.Dom.getXY(this.getEl());
            E = [ E[0] - G[0] + F[0], E[1] - G[1] + F[1] ];

            return  E;
        };

        var  D = function(E) {
            return  (typeof  E !== 'undefined');
        };
    })();



    (function() {
        Roo.lib.Scroll = function(el, C, D, E) {
            if (el) {
                Roo.lib.Scroll.superclass.constructor.call(this, el, C, D, E);
            }
        };

        Roo.extend(Roo.lib.Scroll, Roo.lib.ColorAnim);


        var  Y = Roo.lib;
        var  A = Y.Scroll.superclass;
        var  B = Y.Scroll.prototype;

        B.toString = function() {
            var  el = this.getEl();
            var  id = el.id || el.tagName;
            return  ("Scroll " + id);
        };

        B.doMethod = function(C, D, E) {
            var  F = null;

            if (C == 'scroll') {
                F = [
                        this.method(this.currentFrame, D[0], E[0] - D[0], this.totalFrames),
                        this.method(this.currentFrame, D[1], E[1] - D[1], this.totalFrames)
                        ];

            } else  {
                F = A.doMethod.call(this, C, D, E);
            }
            return  F;
        };

        B.getAttribute = function(C) {
            var  D = null;
            var  el = this.getEl();

            if (C == 'scroll') {
                D = [ el.scrollLeft, el.scrollTop ];
            } else  {
                D = A.getAttribute.call(this, C);
            }

            return  D;
        };

        B.setAttribute = function(C, D, E) {
            var  el = this.getEl();

            if (C == 'scroll') {
                el.scrollLeft = D[0];
                el.scrollTop = D[1];
            } else  {
                A.setAttribute.call(this, C, D, E);
            }
        };
    })();



 



Roo.DomHelper = function(){
    var  A = null;
    var  B = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i;
    var  C = /^table|tbody|tr|td$/i;
    var  D = {};
    
    

    var  E = function(o){
        if(typeof  o == 'string'){
            return  o;
        }
        var  b = "";
        if(!o.tag){
            o.tag = "div";
        }

        b += "<" + o.tag;
        for(var  attr  in  o){
            if(attr == "tag" || attr == "children" || attr == "cn" || attr == "html" || typeof  o[attr] == "function") continue;
            if(attr == "style"){
                var  s = o["style"];
                if(typeof  s == "function"){
                    s = s.call();
                }
                if(typeof  s == "string"){
                    b += ' style="' + s + '"';
                }else  if(typeof  s == "object"){
                    b += ' style="';
                    for(var  key  in  s){
                        if(typeof  s[key] != "function"){
                            b += key + ":" + s[key] + ";";
                        }
                    }

                    b += '"';
                }
            }else {
                if(attr == "cls"){
                    b += ' class="' + o["cls"] + '"';
                }else  if(attr == "htmlFor"){
                    b += ' for="' + o["htmlFor"] + '"';
                }else {
                    b += " " + attr + '="' + o[attr] + '"';
                }
            }
        }
        if(B.test(o.tag)){
            b += "/>";
        }else {
            b += ">";
            var  cn = o.children || o.cn;
            if(cn){
                
                if((cn  instanceof  Array) || (Roo.isSafari && typeof(cn.join) == "function")){
                    for(var  i = 0, len = cn.length; i < len; i++) {
                        b += E(cn[i], b);
                    }
                }else {
                    b += E(cn, b);
                }
            }
            if(o.html){
                b += o.html;
            }

            b += "</" + o.tag + ">";
        }
        return  b;
    };

    
    

    var  F = function(o, M){
         
        
        var  ns = false;
        if (o.ns && o.ns != 'html') {
               
            if (o.xmlns && typeof(D[o.ns]) == 'undefined') {
                D[o.ns] = o.xmlns;
                ns = o.xmlns;
            }
            if (typeof(D[o.ns]) == 'undefined') {
                console.log("Trying to create namespace element " + o.ns + ", however no xmlns was sent to builder previously");
            }

            ns = D[o.ns];
        }
        
        
        if (typeof(o) == 'string') {
            return  M.appendChild(document.createTextNode(o));
        }

        o.tag = o.tag || div;
        if (o.ns && Roo.isIE) {
            ns = false;
            o.tag = o.ns + ':' + o.tag;
            
        }
        var  el = ns ? document.createElementNS( ns, o.tag||'div') :  document.createElement(o.tag||'div');
        var  N = el.setAttribute ? true : false; 
        for(var  attr  in  o){
            
            if(attr == "tag" || attr == "ns" ||attr == "xmlns" ||attr == "children" || attr == "cn" || attr == "html" || 
                    attr == "style" || typeof  o[attr] == "function") continue;
                    
            if(attr=="cls" && Roo.isIE){
                el.className = o["cls"];
            }else {
                if(N) el.setAttribute(attr=="cls" ? 'class' : attr, o[attr]);
                else  el[attr] = o[attr];
            }
        }

        Roo.DomHelper.applyStyles(el, o.style);
        var  cn = o.children || o.cn;
        if(cn){
            
             if((cn  instanceof  Array) || (Roo.isSafari && typeof(cn.join) == "function")){
                for(var  i = 0, len = cn.length; i < len; i++) {
                    F(cn[i], el);
                }
            }else {
                F(cn, el);
            }
        }
        if(o.html){
            el.innerHTML = o.html;
        }
        if(M){
           M.appendChild(el);
        }
        return  el;
    };

    var  G = function(M, s, h, e){
        A.innerHTML = [s, h, e].join('');
        var  i = -1, el = A;
        while(++i < M){
            el = el.firstChild;
        }
        return  el;
    };

    
    var  ts = '<table>',
        te = '</table>',
        H = ts+'<tbody>',
        I = '</tbody>'+te,
        J = H + '<tr>',
        K = '</tr>'+I;

    

    var  L = function(M, N, el, O){
        if(!A){
            A = document.createElement('div');
        }
        var  P;
        var  Q = null;
        if(M == 'td'){
            if(N == 'afterbegin' || N == 'beforeend'){ 
                return;
            }
            if(N == 'beforebegin'){
                Q = el;
                el = el.parentNode;
            } else {
                Q = el.nextSibling;
                el = el.parentNode;
            }

            P = G(4, J, O, K);
        }
        else  if(M == 'tr'){
            if(N == 'beforebegin'){
                Q = el;
                el = el.parentNode;
                P = G(3, H, O, I);
            } else  if(N == 'afterend'){
                Q = el.nextSibling;
                el = el.parentNode;
                P = G(3, H, O, I);
            } else { 
                if(N == 'afterbegin'){
                    Q = el.firstChild;
                }

                P = G(4, J, O, K);
            }
        } else  if(M == 'tbody'){
            if(N == 'beforebegin'){
                Q = el;
                el = el.parentNode;
                P = G(2, ts, O, te);
            } else  if(N == 'afterend'){
                Q = el.nextSibling;
                el = el.parentNode;
                P = G(2, ts, O, te);
            } else {
                if(N == 'afterbegin'){
                    Q = el.firstChild;
                }

                P = G(3, H, O, I);
            }
        } else { 
            if(N == 'beforebegin' || N == 'afterend'){ 
                return;
            }
            if(N == 'afterbegin'){
                Q = el.firstChild;
            }

            P = G(2, ts, O, te);
        }

        el.insertBefore(P, Q);
        return  P;
    };

    return  {
    

    useDom : false,

    

    markup : function(o){
        return  E(o);
    },

    

    applyStyles : function(el, c){
        if(c){
           el = Roo.fly(el);
           if(typeof  c == "string"){
               var  re = /\s?([a-z\-]*)\:\s?([^;]*);?/gi;
               var  matches;
               while ((matches = re.exec(c)) != null){
                   el.setStyle(matches[1], matches[2]);
               }
           }else  if (typeof  c == "object"){
               for (var  style  in  c){
                  el.setStyle(style, c[style]);
               }
           }else  if (typeof  c == "function"){
                Roo.DomHelper.applyStyles(el, c.call());
           }
        }
    },

    

    insertHtml : function(d, el, e){
        d = d.toLowerCase();
        if(el.insertAdjacentHTML){
            if(C.test(el.tagName)){
                var  rs;
                if(rs = L(el.tagName.toLowerCase(), d, el, e)){
                    return  rs;
                }
            }
            switch(d){
                case  "beforebegin":
                    el.insertAdjacentHTML('BeforeBegin', e);
                    return  el.previousSibling;
                case  "afterbegin":
                    el.insertAdjacentHTML('AfterBegin', e);
                    return  el.firstChild;
                case  "beforeend":
                    el.insertAdjacentHTML('BeforeEnd', e);
                    return  el.lastChild;
                case  "afterend":
                    el.insertAdjacentHTML('AfterEnd', e);
                    return  el.nextSibling;
            }
            throw  'Illegal insertion point -> "' + d + '"';
        }
        var  f = el.ownerDocument.createRange();
        var  g;
        switch(d){
             case  "beforebegin":
                f.setStartBefore(el);
                g = f.createContextualFragment(e);
                el.parentNode.insertBefore(g, el);
                return  el.previousSibling;
             case  "afterbegin":
                if(el.firstChild){
                    f.setStartBefore(el.firstChild);
                    g = f.createContextualFragment(e);
                    el.insertBefore(g, el.firstChild);
                    return  el.firstChild;
                }else {
                    el.innerHTML = e;
                    return  el.firstChild;
                }
            case  "beforeend":
                if(el.lastChild){
                    f.setStartAfter(el.lastChild);
                    g = f.createContextualFragment(e);
                    el.appendChild(g);
                    return  el.lastChild;
                }else {
                    el.innerHTML = e;
                    return  el.lastChild;
                }
            case  "afterend":
                f.setStartAfter(el);
                g = f.createContextualFragment(e);
                el.parentNode.insertBefore(g, el.nextSibling);
                return  el.nextSibling;
            }
            throw  'Illegal insertion point -> "' + d + '"';
    },

    

    insertBefore : function(el, o, h){
        return  this.doInsert(el, o, h, "beforeBegin");
    },

    

    insertAfter : function(el, o, j){
        return  this.doInsert(el, o, j, "afterEnd", "nextSibling");
    },

    

    insertFirst : function(el, o, k){
        return  this.doInsert(el, o, k, "afterBegin");
    },

    
    doInsert : function(el, o, l, m, n){
        el = Roo.getDom(el);
        var  p;
        if(this.useDom || o.ns){
            p = F(o, null);
            el.parentNode.insertBefore(p, n ? el[n] : el);
        }else {
            var  e = E(o);
            p = this.insertHtml(m, el, e);
        }
        return  l ? Roo.get(p, true) : p;
    },

    

    append : function(el, o, q){
        el = Roo.getDom(el);
        var  r;
        if(this.useDom || o.ns){
            r = F(o, null);
            el.appendChild(r);
        }else {
            var  e = E(o);
            r = this.insertHtml("beforeEnd", el, e);
        }
        return  q ? Roo.get(r, true) : r;
    },

    

    overwrite : function(el, o, t){
        el = Roo.getDom(el);
        if (o.ns) {
          
            while (el.childNodes.length) {
                el.removeChild(el.firstChild);
            }

            F(o, el);
        } else  {
            el.innerHTML = E(o);   
        }
        
        return  t ? Roo.get(el.firstChild, true) : el.firstChild;
    },

    

    createTemplate : function(o){
        var  u = E(o);
        return  new  Roo.Template(u);
    }
    };
}();



 


Roo.Template = function(A){
    
    if(A  instanceof  Array){
        A = A.join("");
    }else  if(arguments.length > 1){
        A = Array.prototype.join.call(arguments, "");
    }
    
    
    if (typeof(A) == 'object') {
        Roo.apply(this,A)
    } else  {
        
        this.html = A;
    }
    
    
};
Roo.Template.prototype = {
    
    

    html : '',
    

    applyTemplate : function(values){
        try {
            
            if(this.compiled){
                return  this.compiled(values);
            }
            var  useF = this.disableFormats !== true;
            var  fm = Roo.util.Format, tpl = this;
            var  fn = function(m, E, F, G){
                if(F && useF){
                    if(F.substr(0, 5) == "this."){
                        return  tpl.call(F.substr(5), values[E], values);
                    }else {
                        if(G){
                            
                            
                            
                            var  re = /^\s*['"](.*)["']\s*$/;
                            G = G.split(',');
                            for(var  i = 0, len = G.length; i < len; i++){
                                G[i] = G[i].replace(re, "$1");
                            }

                            G = [values[E]].concat(G);
                        }else {
                            G = [values[E]];
                        }
                        return  fm[F].apply(fm, G);
                    }
                }else {
                    return  values[E] !== undefined ? values[E] : "";
                }
            };
            return  this.html.replace(this.re, fn);
        } catch (e) {
            Roo.log(e);
            throw  e;
        }
         
    },
    
    

    set : function(B, C){
        this.html = B;
        this.compiled = null;
        if(C){
            this.compile();
        }
        return  this;
    },
    
    

    disableFormats : false,
    
    

    re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    
    

    compile : function(){
        var  fm = Roo.util.Format;
        var  D = this.disableFormats !== true;
        var  E = Roo.isGecko ? "+" : ",";
        var  fn = function(m, G, H, I){
            if(H && D){
                I = I ? ',' + I : "";
                if(H.substr(0, 5) != "this."){
                    H = "fm." + H + '(';
                }else {
                    H = 'this.call("'+ H.substr(5) + '", ';
                    I = ", values";
                }
            }else {
                I= ''; H = "(values['" + G + "'] == undefined ? '' : ";
            }
            return  "'"+ E + H + "values['" + G + "']" + I + ")"+E+"'";
        };
        var  F;
        
        if(Roo.isGecko){
            F = "this.compiled = function(values){ return '" +
                   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
                    "';};";
        }else {
            F = ["this.compiled = function(values){ return ['"];
            F.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn));
            F.push("'].join('');};");
            F = F.join('');
        }
        

        eval(F);
        return  this;
    },
    
    
    call : function(G, H, I){
        return  this[G](H, I);
    },
    
    

    insertFirst: function(el, J, K){
        return  this.doInsert('afterBegin', el, J, K);
    },

    

    insertBefore: function(el, L, M){
        return  this.doInsert('beforeBegin', el, L, M);
    },

    

    insertAfter : function(el, N, O){
        return  this.doInsert('afterEnd', el, N, O);
    },
    
    

    append : function(el, P, Q){
        return  this.doInsert('beforeEnd', el, P, Q);
    },

    doInsert : function(R, el, S, T){
        el = Roo.getDom(el);
        var  U = Roo.DomHelper.insertHtml(R, el, this.applyTemplate(S));
        return  T ? Roo.get(U, true) : U;
    },

    

    overwrite : function(el, V, W){
        el = Roo.getDom(el);
        el.innerHTML = this.applyTemplate(V);
        return  W ? Roo.get(el.firstChild, true) : el.firstChild;
    }
};


Roo.Template.prototype.apply = Roo.Template.prototype.applyTemplate;


Roo.DomHelper.Template = Roo.Template;



Roo.Template.from = function(el){
    el = Roo.getDom(el);
    return  new  Roo.Template(el.value || el.innerHTML);
};


 





Roo.DomQuery = function(){
    var  A = {}, simpleCache = {}, valueCache = {};
    var  B = /\S/;
    var  C = /^\s+|\s+$/g;
    var  D = /\{(\d+)\}/g;
    var  E = /^(\s?[\/>+~]\s?|\s|$)/;
    var  F = /^(#)?([\w-\*]+)/;
    var  G = /(\d*)n\+?(\d*)/, H = /\D/;

    function  I(p, T){
        var  i = 0;
        var  n = p.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == T){
                   return  n;
               }
            }

            n = n.nextSibling;
        }
        return  null;
    };

    function  J(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return  n;
    };

    function  K(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return  n;
    };

    function  L(d){
        var  n = d.firstChild, ni = -1;
 	    while(n){
 	        var  nx = n.nextSibling;
 	        if(n.nodeType == 3 && !B.test(n.nodeValue)){
 	            d.removeChild(n);
 	        }else {
 	            n.nodeIndex = ++ni;
 	        }

 	        n = nx;
 	    }
 	    return  this;
 	};

    function  byClassName(c, a, v){
        if(!v){
            return  c;
        }
        var  r = [], ri = -1, cn;
        for(var  i = 0, ci; ci = c[i]; i++){
            if((' '+ci.className+' ').indexOf(v) != -1){
                r[++ri] = ci;
            }
        }
        return  r;
    };

    function  attrValue(n, T){
        if(!n.tagName && typeof  n.length != "undefined"){
            n = n[0];
        }
        if(!n){
            return  null;
        }
        if(T == "for"){
            return  n.htmlFor;
        }
        if(T == "class" || T == "className"){
            return  n.className;
        }
        return  n.getAttribute(T) || n[T];

    };

    function  getNodes(ns, T, U){
        var  V = [], ri = -1, cs;
        if(!ns){
            return  V;
        }

        U = U || "*";
        if(typeof  ns.getElementsByTagName != "undefined"){
            ns = [ns];
        }
        if(!T){
            for(var  i = 0, ni; ni = ns[i]; i++){
                cs = ni.getElementsByTagName(U);
                for(var  j = 0, ci; ci = cs[j]; j++){
                    V[++ri] = ci;
                }
            }
        }else  if(T == "/" || T == ">"){
            var  utag = U.toUpperCase();
            for(var  i = 0, ni, cn; ni = ns[i]; i++){
                cn = ni.children || ni.childNodes;
                for(var  j = 0, cj; cj = cn[j]; j++){
                    if(cj.nodeName == utag || cj.nodeName == U  || U == '*'){
                        V[++ri] = cj;
                    }
                }
            }
        }else  if(T == "+"){
            var  utag = U.toUpperCase();
            for(var  i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && n.nodeType != 1);
                if(n && (n.nodeName == utag || n.nodeName == U || U == '*')){
                    V[++ri] = n;
                }
            }
        }else  if(T == "~"){
            for(var  i = 0, n; n = ns[i]; i++){
                while((n = n.nextSibling) && (n.nodeType != 1 || (U == '*' || n.tagName.toLowerCase()!=U)));
                if(n){
                    V[++ri] = n;
                }
            }
        }
        return  V;
    };

    function  M(a, b){
        if(b.slice){
            return  a.concat(b);
        }
        for(var  i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return  a;
    }

    function  byTag(cs, T){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!T){
            return  cs;
        }
        var  r = [], ri = -1;
        T = T.toLowerCase();
        for(var  i = 0, ci; ci = cs[i]; i++){
            if(ci.nodeType == 1 && ci.tagName.toLowerCase()==T){
                r[++ri] = ci;
            }
        }
        return  r;
    };

    function  N(cs, T, id){
        if(cs.tagName || cs == document){
            cs = [cs];
        }
        if(!id){
            return  cs;
        }
        var  r = [], ri = -1;
        for(var  i = 0,ci; ci = cs[i]; i++){
            if(ci && ci.id == id){
                r[++ri] = ci;
                return  r;
            }
        }
        return  r;
    };

    function  byAttribute(cs, T, U, op, V){
        var  r = [], ri = -1, st = V=="{";
        var  f = Roo.DomQuery.operators[op];
        for(var  i = 0, ci; ci = cs[i]; i++){
            var  a;
            if(st){
                a = Roo.DomQuery.getStyle(ci, T);
            }
            else  if(T == "class" || T == "className"){
                a = ci.className;
            }else  if(T == "for"){
                a = ci.htmlFor;
            }else  if(T == "href"){
                a = ci.getAttribute("href", 2);
            }else {
                a = ci.getAttribute(T);
            }
            if((f && f(a, U)) || (!f && a)){
                r[++ri] = ci;
            }
        }
        return  r;
    };

    function  byPseudo(cs, T, U){
        return  Roo.DomQuery.pseudos[T](cs, U);
    };

    
    
    
    var  O = window.ActiveXObject ? true : false;

    
    
    
    

    var  batch = 30803; 

    var  P = 30803;

    function  Q(cs){
        var  d = ++P;
        cs[0].setAttribute("_nodup", d);
        var  r = [cs[0]];
        for(var  i = 1, len = cs.length; i < len; i++){
            var  c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var  i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return  r;
    }

    function  nodup(cs){
        if(!cs){
            return  [];
        }
        var  T = cs.length, c, i, r = cs, cj, ri = -1;
        if(!T || typeof  cs.nodeType != "undefined" || T == 1){
            return  cs;
        }
        if(O && typeof  cs[0].selectSingleNode != "undefined"){
            return  Q(cs);
        }
        var  d = ++P;
        cs[0]._nodup = d;
        for(i = 1; c = cs[i]; i++){
            if(c._nodup != d){
                c._nodup = d;
            }else {
                r = [];
                for(var  j = 0; j < i; j++){
                    r[++ri] = cs[j];
                }
                for(j = i+1; cj = cs[j]; j++){
                    if(cj._nodup != d){
                        cj._nodup = d;
                        r[++ri] = cj;
                    }
                }
                return  r;
            }
        }
        return  r;
    }

    function  R(c1, c2){
        var  d = ++P;
        for(var  i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }
        var  r = [];
        for(var  i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var  i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return  r;
    }

    function  S(c1, c2){
        var  T = c1.length;
        if(!T){
            return  c2;
        }
        if(O && c1[0].selectSingleNode){
            return  R(c1, c2);
        }
        var  d = ++P;
        for(var  i = 0; i < T; i++){
            c1[i]._qdiff = d;
        }
        var  r = [];
        for(var  i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return  r;
    }

    function  quickId(ns, T, U, id){
        if(ns == U){
           var  d = U.ownerDocument || U;
           return  d.getElementById(id);
        }

        ns = getNodes(ns, T, "*");
        return  N(ns, null, id);
    }

    return  {
        getStyle : function(el, AA){
            return  Roo.fly(el).getStyle(AA);
        },
        

        compile : function(AB, AC){
            AC = AC || "select";
            
            var  fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"];
            var  q = AB, mode, lq;
            var  tk = Roo.DomQuery.matchers;
            var  AD = tk.length;
            var  mm;

            
            var  AE = q.match(E);
            if(AE && AE[1]){
                fn[fn.length] = 'mode="'+AE[1].replace(C, "")+'";';
                q = q.replace(AE[1], "");
            }
            
            while(AB.substr(0, 1)=="/"){
                AB = AB.substr(1);
            }

            while(q && lq != q){
                lq = q;
                var  tm = q.match(F);
                if(AC == "select"){
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = quickId(n, mode, root, "'+tm[2]+'");';
                        }else {
                            fn[fn.length] = 'n = getNodes(n, mode, "'+tm[2]+'");';
                        }

                        q = q.replace(tm[0], "");
                    }else  if(q.substr(0, 1) != '@'){
                        fn[fn.length] = 'n = getNodes(n, mode, "*");';
                    }
                }else {
                    if(tm){
                        if(tm[1] == "#"){
                            fn[fn.length] = 'n = byId(n, null, "'+tm[2]+'");';
                        }else {
                            fn[fn.length] = 'n = byTag(n, "'+tm[2]+'");';
                        }

                        q = q.replace(tm[0], "");
                    }
                }
                while(!(mm = q.match(E))){
                    var  matched = false;
                    for(var  j = 0; j < AD; j++){
                        var  t = tk[j];
                        var  m = q.match(t.re);
                        if(m){
                            fn[fn.length] = t.select.replace(D, function(x, i){
                                                    return  m[i];
                                                });
                            q = q.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    
                    if(!matched){
                        throw  'Error parsing selector, parsing failed at "' + q + '"';
                    }
                }
                if(mm[1]){
                    fn[fn.length] = 'mode="'+mm[1].replace(C, "")+'";';
                    q = q.replace(mm[1], "");
                }
            }

            fn[fn.length] = "return nodup(n);\n}";
            
             
 
            eval(fn.join(""));
            return  f;
        },

        

        select : function(AF, AG, AH){
            if(!AG || AG == document){
                AG = document;
            }
            if(typeof  AG == "string"){
                AG = document.getElementById(AG);
            }
            var  AI = AF.split(",");
            var  AJ = [];
            for(var  i = 0, len = AI.length; i < len; i++){
                var  p = AI[i].replace(C, "");
                if(!A[p]){
                    A[p] = Roo.DomQuery.compile(p);
                    if(!A[p]){
                        throw  p + " is not a valid selector";
                    }
                }
                var  z = A[p](AG);
                if(z && z != document){
                    AJ = AJ.concat(z);
                }
            }
            if(AI.length > 1){
                return  nodup(AJ);
            }
            return  AJ;
        },

        

        selectNode : function(AK, AL){
            return  Roo.DomQuery.select(AK, AL)[0];
        },

        

        selectValue : function(AM, AN, AO){
            AM = AM.replace(C, "");
            if(!valueCache[AM]){
                valueCache[AM] = Roo.DomQuery.compile(AM, "select");
            }
            var  n = valueCache[AM](AN);
            n = n[0] ? n[0] : n;
            var  v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return  ((v === null||v === undefined||v==='') ? AO : v);
        },

        

        selectNumber : function(AP, AQ, AR){
            var  v = Roo.DomQuery.selectValue(AP, AQ, AR || 0);
            return  parseFloat(v);
        },

        

        is : function(el, ss){
            if(typeof  el == "string"){
                el = document.getElementById(el);
            }
            var  AS = (el  instanceof  Array);
            var  AT = Roo.DomQuery.filter(AS ? el : [el], ss);
            return  AS ? (AT.length == el.length) : (AT.length > 0);
        },

        

        filter : function(AU, ss, AV){
            ss = ss.replace(C, "");
            if(!simpleCache[ss]){
                simpleCache[ss] = Roo.DomQuery.compile(ss, "simple");
            }
            var  AW = simpleCache[ss](AU);
            return  AV ? S(AW, AU) : AW;
        },

        

        matchers : [{
                re: /^\.([\w-]+)/,
                select: 'n = byClassName(n, null, " {1} ");'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
                select: 'n = byPseudo(n, "{1}", "{2}");'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
                select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
            }, {
                re: /^#([\w-]+)/,
                select: 'n = byId(n, null, "{1}");'
            },{
                re: /^@([\w-]+)/,
                select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
            }
        ],

        

        operators : {
            "=" : function(a, v){
                return  a == v;
            },
            "!=" : function(a, v){
                return  a != v;
            },
            "^=" : function(a, v){
                return  a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return  a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return  a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return  (a % v) == 0;
            },
            "|=" : function(a, v){
                return  a && (a == v || a.substr(0, v.length+1) == v+'-');
            },
            "~=" : function(a, v){
                return  a && (' '+a+' ').indexOf(' '+v+' ') != -1;
            }
        },

        

        pseudos : {
            "first-child" : function(c){
                var  r = [], ri = -1, n;
                for(var  i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "last-child" : function(c){
                var  r = [], ri = -1, n;
                for(var  i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "nth-child" : function(c, a) {
                var  r = [], ri = -1;
                var  m = G.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !H.test(a) && "n+" + a || a);
                var  f = (m[1] || 1) - 0, l = m[2] - 0;
                for(var  i = 0, n; n = c[i]; i++){
                    var  pn = n.parentNode;
                    if (batch != pn._batch) {
                        var  j = 0;
                        for(var  cn = pn.firstChild; cn; cn = cn.nextSibling){
                            if(cn.nodeType == 1){
                               cn.nodeIndex = ++j;
                            }
                        }

                        pn._batch = batch;
                    }
                    if (f == 1) {
                        if (l == 0 || n.nodeIndex == l){
                            r[++ri] = n;
                        }
                    } else  if ((n.nodeIndex + l) % f == 0){
                        r[++ri] = n;
                    }
                }

                return  r;
            },

            "only-child" : function(c){
                var  r = [], ri = -1;;
                for(var  i = 0, ci; ci = c[i]; i++){
                    if(!K(ci) && !J(ci)){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "empty" : function(c){
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    var  cns = ci.childNodes, j = 0, cn, empty = true;
                    while(cn = cns[j]){
                        ++j;
                        if(cn.nodeType == 1 || cn.nodeType == 3){
                            empty = false;
                            break;
                        }
                    }
                    if(empty){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "contains" : function(c, v){
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "nodeValue" : function(c, v){
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "checked" : function(c){
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "not" : function(c, ss){
                return  Roo.DomQuery.filter(c, ss, true);
            },

            "odd" : function(c){
                return  this["nth-child"](c, "odd");
            },

            "even" : function(c){
                return  this["nth-child"](c, "even");
            },

            "nth" : function(c, a){
                return  c[a-1] || [];
            },

            "first" : function(c){
                return  c[0] || [];
            },

            "last" : function(c){
                return  c[c.length-1] || [];
            },

            "has" : function(c, ss){
                var  s = Roo.DomQuery.select;
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "next" : function(c, ss){
                var  is = Roo.DomQuery.is;
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    var  n = J(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return  r;
            },

            "prev" : function(c, ss){
                var  is = Roo.DomQuery.is;
                var  r = [], ri = -1;
                for(var  i = 0, ci; ci = c[i]; i++){
                    var  n = K(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return  r;
            }
        }
    };
}();



Roo.query = Roo.DomQuery.select;







Roo.util.Observable = function(A){
    
    A = A|| {};
    this.addEvents(A.events || {});
    if (A.events) {
        delete  A.events; 
    }

     
    Roo.apply(this, A);
    
    if(this.listeners){
        this.on(this.listeners);
        delete  this.listeners;
    }
};
Roo.util.Observable.prototype = {
    

    
    
    

    fireEvent : function(){
        var  ce = this.events[arguments[0].toLowerCase()];
        if(typeof  ce == "object"){
            return  ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
        }else {
            return  true;
        }
    },

    
    filterOptRe : /^(?:scope|delay|buffer|single)$/,

    

    addListener : function(B, fn, C, o){
        if(typeof  B == "object"){
            o = B;
            for(var  e  in  o){
                if(this.filterOptRe.test(e)){
                    continue;
                }
                if(typeof  o[e] == "function"){
                    
                    this.addListener(e, o[e], o.scope,  o);
                }else {
                    
                    this.addListener(e, o[e].fn, o[e].scope, o[e]);
                }
            }
            return;
        }

        o = (!o || typeof  o == "boolean") ? {} : o;
        B = B.toLowerCase();
        var  ce = this.events[B] || true;
        if(typeof  ce == "boolean"){
            ce = new  Roo.util.Event(this, B);
            this.events[B] = ce;
        }

        ce.addListener(fn, C, o);
    },

    

    removeListener : function(D, fn, E){
        var  ce = this.events[D.toLowerCase()];
        if(typeof  ce == "object"){
            ce.removeListener(fn, E);
        }
    },

    

    purgeListeners : function(){
        for(var  evt  in  this.events){
            if(typeof  this.events[evt] == "object"){
                 this.events[evt].clearListeners();
            }
        }
    },

    relayEvents : function(o, F){
        var  G = function(H){
            return  function(){
                return  this.fireEvent.apply(this, Roo.combine(H, Array.prototype.slice.call(arguments, 0)));
            };
        };
        for(var  i = 0, len = F.length; i < len; i++){
            var  ename = F[i];
            if(!this.events[ename]){ this.events[ename] = true; };
            o.on(ename, G(ename), this);
        }
    },

    

    addEvents : function(o){
        if(!this.events){
            this.events = {};
        }

        Roo.applyIf(this.events, o);
    },

    

    hasListener : function(H){
        var  e = this.events[H];
        return  typeof  e == "object" && e.listeners.length > 0;
    }
};


Roo.util.Observable.prototype.on = Roo.util.Observable.prototype.addListener;


Roo.util.Observable.prototype.un = Roo.util.Observable.prototype.removeListener;



Roo.util.Observable.capture = function(o, fn, I){
    o.fireEvent = o.fireEvent.createInterceptor(fn, I);
};



Roo.util.Observable.releaseCapture = function(o){
    o.fireEvent = Roo.util.Observable.prototype.fireEvent;
};

(function(){

    var  J = function(h, o, M){
        var  N = new  Roo.util.DelayedTask();
        return  function(){
            N.delay(o.buffer, h, M, Array.prototype.slice.call(arguments, 0));
        };
    };

    var  K = function(h, e, fn, M){
        return  function(){
            e.removeListener(fn, M);
            return  h.apply(M, arguments);
        };
    };

    var  L = function(h, o, M){
        return  function(){
            var  N = Array.prototype.slice.call(arguments, 0);
            setTimeout(function(){
                h.apply(M, N);
            }, o.delay || 10);
        };
    };

    Roo.util.Event = function(M, N){
        this.name = N;
        this.obj = M;
        this.listeners = [];
    };

    Roo.util.Event.prototype = {
        addListener : function(fn, M, N){
            var  o = N || {};
            M = M || this.obj;
            if(!this.isListening(fn, M)){
                var  l = {fn: fn, scope: M, options: o};
                var  h = fn;
                if(o.delay){
                    h = L(h, o, M);
                }
                if(o.single){
                    h = K(h, this, fn, M);
                }
                if(o.buffer){
                    h = J(h, o, M);
                }

                l.fireFn = h;
                if(!this.firing){ 
                    this.listeners.push(l);
                }else {
                    this.listeners = this.listeners.slice(0);
                    this.listeners.push(l);
                }
            }
        },

        findListener : function(fn, O){
            O = O || this.obj;
            var  ls = this.listeners;
            for(var  i = 0, len = ls.length; i < len; i++){
                var  l = ls[i];
                if(l.fn == fn && l.scope == O){
                    return  i;
                }
            }
            return  -1;
        },

        isListening : function(fn, P){
            return  this.findListener(fn, P) != -1;
        },

        removeListener : function(fn, Q){
            var  R;
            if((R = this.findListener(fn, Q)) != -1){
                if(!this.firing){
                    this.listeners.splice(R, 1);
                }else {
                    this.listeners = this.listeners.slice(0);
                    this.listeners.splice(R, 1);
                }
                return  true;
            }
            return  false;
        },

        clearListeners : function(){
            this.listeners = [];
        },

        fire : function(){
            var  ls = this.listeners, S, T = ls.length;
            if(T > 0){
                this.firing = true;
                var  args = Array.prototype.slice.call(arguments, 0);
                for(var  i = 0; i < T; i++){
                    var  l = ls[i];
                    if(l.fireFn.apply(l.scope||this.obj||window, arguments) === false){
                        this.firing = false;
                        return  false;
                    }
                }

                this.firing = false;
            }
            return  true;
        }
    };
})();





Roo.EventManager = function(){
    var  A, B, C = false;
    var  F, G, H, I;
    var  E = Roo.lib.Event;
    var  D = Roo.lib.Dom;


    var  J = function(){
        if(!C){
            C = true;
            Roo.isReady = true;
            if(B){
                clearInterval(B);
            }
            if(Roo.isGecko || Roo.isOpera) {
                document.removeEventListener("DOMContentLoaded", J, false);
            }
            if(Roo.isIE){
                var  defer = document.getElementById("ie-deferred-loader");
                if(defer){
                    defer.onreadystatechange = null;
                    defer.parentNode.removeChild(defer);
                }
            }
            if(A){
                A.fire();
                A.clearListeners();
            }
        }
    };
    
    var  K = function(){
        A = new  Roo.util.Event();
        if(Roo.isGecko || Roo.isOpera) {
            document.addEventListener("DOMContentLoaded", J, false);
        }else  if(Roo.isIE){
            document.write("<s"+'cript id="ie-deferred-loader" defer="defer" src="/'+'/:"></s'+"cript>");
            var  defer = document.getElementById("ie-deferred-loader");
            defer.onreadystatechange = function(){
                if(this.readyState == "complete"){
                    J();
                }
            };
        }else  if(Roo.isSafari){ 
            B = setInterval(function(){
                var  rs = document.readyState;
                if(rs == "complete") {
                    J();     
                 }
            }, 10);
        }

        
        E.on(window, "load", J);
    };

    var  L = function(h, o){
        var  S = new  Roo.util.DelayedTask(h);
        return  function(e){
            
            e = new  Roo.EventObjectImpl(e);
            S.delay(o.buffer, h, null, [e]);
        };
    };

    var  M = function(h, el, S, fn){
        return  function(e){
            Roo.EventManager.removeListener(el, S, fn);
            h(e);
        };
    };

    var  N = function(h, o){
        return  function(e){
            
            e = new  Roo.EventObjectImpl(e);
            setTimeout(function(){
                h(e);
            }, o.delay || 10);
        };
    };

    var  O = function(S, T, U, fn, V){
        var  o = (!U || typeof  U == "boolean") ? {} : U;
        fn = fn || o.fn; V = V || o.scope;
        var  el = Roo.getDom(S);
        if(!el){
            throw  "Error listening for \"" + T + '\". Element "' + S + '" doesn\'t exist.';
        }
        var  h = function(e){
            e = Roo.EventObject.setEvent(e);
            var  t;
            if(o.delegate){
                t = e.getTarget(o.delegate, el);
                if(!t){
                    return;
                }
            }else {
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


            fn.call(V || el, e, t, o);
        };
        if(o.delay){
            h = N(h, o);
        }
        if(o.single){
            h = M(h, el, T, fn);
        }
        if(o.buffer){
            h = L(h, o);
        }

        fn._handlers = fn._handlers || [];
        fn._handlers.push([Roo.id(el), T, h]);

        E.on(el, T, h);
        if(T == "mousewheel" && el.addEventListener){ 
            el.addEventListener("DOMMouseScroll", h, false);
            E.on(window, 'unload', function(){
                el.removeEventListener("DOMMouseScroll", h, false);
            });
        }
        if(T == "mousedown" && el == document){ 
            Roo.EventManager.stoppedMouseDownEvent.addListener(h);
        }
        return  h;
    };

    var  P = function(el, S, fn){
        var  id = Roo.id(el), T = fn._handlers, hd = fn;
        if(T){
            for(var  i = 0, len = T.length; i < len; i++){
                var  h = T[i];
                if(h[0] == id && h[1] == S){
                    hd = h[2];
                    T.splice(i, 1);
                    break;
                }
            }
        }

        E.un(el, S, hd);
        el = Roo.getDom(el);
        if(S == "mousewheel" && el.addEventListener){
            el.removeEventListener("DOMMouseScroll", hd, false);
        }
        if(S == "mousedown" && el == document){ 
            Roo.EventManager.stoppedMouseDownEvent.removeListener(hd);
        }
    };

    var  Q = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
    
    var  R = {
        
        
        

        
        
        

        wrap : function(fn, S, T){
            return  function(e){
                Roo.EventObject.setEvent(e);
                fn.call(T ? S || window : window, Roo.EventObject, S);
            };
        },
        
        

        addListener : function(U, V, fn, W, X){
            if(typeof  V == "object"){
                var  o = V;
                for(var  e  in  o){
                    if(Q.test(e)){
                        continue;
                    }
                    if(typeof  o[e] == "function"){
                        
                        O(U, e, o, o[e], o.scope);
                    }else {
                        
                        O(U, e, o[e]);
                    }
                }
                return;
            }
            return  O(U, V, X, fn, W);
        },
        
        

        removeListener : function(Y, Z, fn){
            return  P(Y, Z, fn);
        },
        
        

        onDocumentReady : function(fn, a, b){
            if(C){ 
                A.addListener(fn, a, b);
                A.fire();
                A.clearListeners();
                return;
            }
            if(!A){
                K();
            }

            A.addListener(fn, a, b);
        },
        
        

        onWindowResize : function(fn, c, d){
            if(!F){
                F = new  Roo.util.Event();
                G = new  Roo.util.DelayedTask(function(){
                    F.fire(D.getViewWidth(), D.getViewHeight());
                });
                E.on(window, "resize", function(){
                    if(Roo.isIE){
                        G.delay(50);
                    }else {
                        F.fire(D.getViewWidth(), D.getViewHeight());
                    }
                });
            }

            F.addListener(fn, c, d);
        },

        

        onTextResize : function(fn, f, g){
            if(!H){
                H = new  Roo.util.Event();
                var  textEl = new  Roo.Element(document.createElement('div'));
                textEl.dom.className = 'x-text-resize';
                textEl.dom.innerHTML = 'X';
                textEl.appendTo(document.body);
                I = textEl.dom.offsetHeight;
                setInterval(function(){
                    if(textEl.dom.offsetHeight != I){
                        H.fire(I, I = textEl.dom.offsetHeight);
                    }
                }, this.textResizeInterval);
            }

            H.addListener(fn, f, g);
        },

        

        removeResizeListener : function(fn, j){
            if(F){
                F.removeListener(fn, j);
            }
        },

        
        fireResize : function(){
            if(F){
                F.fire(D.getViewWidth(), D.getViewHeight());
            }   
        },
        

        ieDeferSrc : false,
        

        textResizeInterval : 50
    };
    
    

    
     

    R.on = R.addListener;
    R.un = R.removeListener;

    R.stoppedMouseDownEvent = new  Roo.util.Event();
    return  R;
}();


Roo.onReady = Roo.EventManager.onDocumentReady;

Roo.onReady(function(){
    var  bd = Roo.get(document.body);
    if(!bd){ return; }

    var  S = [
            Roo.isIE ? "roo-ie"
            : Roo.isGecko ? "roo-gecko"
            : Roo.isOpera ? "roo-opera"
            : Roo.isSafari ? "roo-safari" : ""];

    if(Roo.isMac){
        S.push("roo-mac");
    }
    if(Roo.isLinux){
        S.push("roo-linux");
    }
    if(Roo.isBorderBox){
        S.push('roo-border-box');
    }
    if(Roo.isStrict){ 
        var  p = bd.dom.parentNode;
        if(p){
            p.className += ' roo-strict';
        }
    }

    bd.addClass(S.join(' '));
});



Roo.EventObject = function(){
    
    var  E = Roo.lib.Event;
    
    
    var  T = {
        63234 : 37, 
        63235 : 39, 
        63232 : 38, 
        63233 : 40, 
        63276 : 33, 
        63277 : 34, 
        63272 : 46, 
        63273 : 36, 
        63275 : 35  
    };

    
    var  U = Roo.isIE ? {1:0,4:1,2:2} :
                (Roo.isSafari ? {1:0,2:1,3:2} : {0:0,1:1,2:2});

    Roo.EventObjectImpl = function(e){
        if(e){
            this.setEvent(e.browserEvent || e);
        }
    };
    Roo.EventObjectImpl.prototype = {
        

            

        
        
        

        browserEvent : null,
        

        button : -1,
        

        shiftKey : false,
        

        ctrlKey : false,
        

        altKey : false,

        

        BACKSPACE : 8,
        

        TAB : 9,
        

        RETURN  : 13,
        

        ENTER : 13,
        

        SHIFT : 16,
        

        CONTROL : 17,
        

        ESC : 27,
        

        SPACE : 32,
        

        PAGEUP : 33,
        

        PAGEDOWN : 34,
        

        END : 35,
        

        HOME : 36,
        

        LEFT : 37,
        

        UP : 38,
        

        RIGHT : 39,
        

        DOWN : 40,
        

        DELETE  : 46,
        

        F5 : 116,

           

        setEvent : function(e){
            if(e == this || (e && e.browserEvent)){ 
                return  e;
            }

            this.browserEvent = e;
            if(e){
                
                this.button = e.button ? U[e.button] : (e.which ? e.which-1 : -1);
                if(e.type == 'click' && this.button == -1){
                    this.button = 0;
                }

                this.type = e.type;
                this.shiftKey = e.shiftKey;
                
                this.ctrlKey = e.ctrlKey || e.metaKey;
                this.altKey = e.altKey;
                
                this.keyCode = e.keyCode;
                
                this.charCode = (e.type == 'keyup' || e.type == 'keydown') ? 0 : e.charCode;
                
                this.target = E.getTarget(e);
                
                this.xy = E.getXY(e);
            }else {
                this.button = -1;
                this.shiftKey = false;
                this.ctrlKey = false;
                this.altKey = false;
                this.keyCode = 0;
                this.charCode =0;
                this.target = null;
                this.xy = [0, 0];
            }
            return  this;
        },

        

        stopEvent : function(){
            if(this.browserEvent){
                if(this.browserEvent.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }

                E.stopEvent(this.browserEvent);
            }
        },

        

        preventDefault : function(){
            if(this.browserEvent){
                E.preventDefault(this.browserEvent);
            }
        },

        

        isNavKeyPress : function(){
            var  k = this.keyCode;
            k = Roo.isSafari ? (T[k] || k) : k;
            return  (k >= 33 && k <= 40) || k == this.RETURN  || k == this.TAB || k == this.ESC;
        },

        isSpecialKey : function(){
            var  k = this.keyCode;
            return  (this.type == 'keypress' && this.ctrlKey) || k == 9 || k == 13  || k == 40 || k == 27 ||
            (k == 16) || (k == 17) ||
            (k >= 18 && k <= 20) ||
            (k >= 33 && k <= 35) ||
            (k >= 36 && k <= 39) ||
            (k >= 44 && k <= 45);
        },
        

        stopPropagation : function(){
            if(this.browserEvent){
                if(this.type == 'mousedown'){
                    Roo.EventManager.stoppedMouseDownEvent.fire(this);
                }

                E.stopPropagation(this.browserEvent);
            }
        },

        

        getCharCode : function(){
            return  this.charCode || this.keyCode;
        },

        

        getKey : function(){
            var  k = this.keyCode || this.charCode;
            return  Roo.isSafari ? (T[k] || k) : k;
        },

        

        getPageX : function(){
            return  this.xy[0];
        },

        

        getPageY : function(){
            return  this.xy[1];
        },

        

        getTime : function(){
            if(this.browserEvent){
                return  E.getTime(this.browserEvent);
            }
            return  null;
        },

        

        getXY : function(){
            return  this.xy;
        },

        

        getTarget : function(V, W, X){
            return  V ? Roo.fly(this.target).findParent(V, W, X) : this.target;
        },
        

        getRelatedTarget : function(){
            if(this.browserEvent){
                return  E.getRelatedTarget(this.browserEvent);
            }
            return  null;
        },

        

        getWheelDelta : function(){
            var  e = this.browserEvent;
            var  Y = 0;
            if(e.wheelDelta){ 

                Y = e.wheelDelta/120;
            }else  if(e.detail){ 

                Y = -e.detail/3;
            }
            return  Y;
        },

        

        hasModifier : function(){
            return  !!((this.ctrlKey || this.altKey) || this.shiftKey);
        },

        

        within : function(el, Z){
            var  t = this[Z ? "getRelatedTarget" : "getTarget"]();
            return  t && Roo.fly(el).contains(t);
        },

        getPoint : function(){
            return  new  Roo.lib.Point(this.xy[0], this.xy[1]);
        }
    };

    return  new  Roo.EventObjectImpl();
}();
            
    



 

 
(function(){
    var  D = Roo.lib.Dom;
    var  E = Roo.lib.Event;
    var  A = Roo.lib.Anim;

    
    var  B = {};
    var  C = /(-[a-z])/gi;
    var  F = function(m, a){ return  a.charAt(1).toUpperCase(); };
    var  G = document.defaultView;



    Roo.Element = function(J, K){
        var  L = typeof  J == "string" ?
                document.getElementById(J) : J;
        if(!L){ 
            return  null;
        }
        var  id = L.id;
        if(K !== true && id && Roo.Element.cache[id]){ 
            return  Roo.Element.cache[id];
        }


        

        this.dom = L;

        

        this.id = id || Roo.id(L);
    };

    var  El = Roo.Element;

    El.prototype = {
        

        originalDisplay : "",

        visibilityMode : 1,
        

        defaultUnit : "px",
        

        setVisibilityMode : function(J){
            this.visibilityMode = J;
            return  this;
        },
        

        enableDisplayMode : function(K){
            this.setVisibilityMode(El.DISPLAY);
            if(typeof  K != "undefined") this.originalDisplay = K;
            return  this;
        },

        

        findParent : function(L, M, N){
            var  p = this.dom, b = document.body, O = 0, dq = Roo.DomQuery, P;
            M = M || 50;
            if(typeof  M != "number"){
                P = Roo.getDom(M);
                M = 10;
            }
            while(p && p.nodeType == 1 && O < M && p != b && p != P){
                if(dq.is(p, L)){
                    return  N ? Roo.get(p) : p;
                }

                O++;
                p = p.parentNode;
            }
            return  null;
        },


        

        findParentNode : function(Q, R, S){
            var  p = Roo.fly(this.dom.parentNode, '_internal');
            return  p ? p.findParent(Q, R, S) : null;
        },

        

        up : function(T, U){
            return  this.findParentNode(T, U, true);
        },



        

        is : function(V){
            return  Roo.DomQuery.is(this.dom, V);
        },

        

        animate : function(W, X, Y, Z, c){
            this.anim(W, {duration: X, callback: Y, easing: Z}, c);
            return  this;
        },

        

        anim : function(e, g, h, j, k, cb){
            h = h || 'run';
            g = g || {};
            var  l = Roo.lib.Anim[h](
                this.dom, e,
                (g.duration || j) || .35,
                (g.easing || k) || 'easeOut',
                function(){
                    Roo.callback(cb, this);
                    Roo.callback(g.callback, g.scope || this, [this, g]);
                },
                this
            );
            g.anim = l;
            return  l;
        },

        
        preanim : function(a, i){
            return  !a[i] ? false : (typeof  a[i] == "object" ? a[i]: {duration: a[i+1], callback: a[i+2], easing: a[i+3]});
        },

        

        clean : function(o){
            if(this.isCleaned && o !== true){
                return  this;
            }
            var  ns = /\S/;
            var  d = this.dom, n = d.firstChild, ni = -1;
            while(n){
                var  nx = n.nextSibling;
                if(n.nodeType == 3 && !ns.test(n.nodeValue)){
                    d.removeChild(n);
                }else {
                    n.nodeIndex = ++ni;
                }

                n = nx;
            }

            this.isCleaned = true;
            return  this;
        },

        
        calcOffsetsTo : function(el){
            el = Roo.get(el);
            var  d = el.dom;
            var  q = false;
            if(el.getStyle('position') == 'static'){
                el.position('relative');
                q = true;
            }
            var  x = 0, y =0;
            var  op = this.dom;
            while(op && op != d && op.tagName != 'HTML'){
                x+= op.offsetLeft;
                y+= op.offsetTop;
                op = op.offsetParent;
            }
            if(q){
                el.position('static');
            }
            return  [x, y];
        },

        

        scrollIntoView : function(u, v){
            var  c = Roo.getDom(u) || document.body;
            var  el = this.dom;

            var  o = this.calcOffsetsTo(c),
                l = o[0],
                t = o[1],
                b = t+el.offsetHeight,
                r = l+el.offsetWidth;

            var  ch = c.clientHeight;
            var  ct = parseInt(c.scrollTop, 10);
            var  cl = parseInt(c.scrollLeft, 10);
            var  cb = ct + ch;
            var  cr = cl + c.clientWidth;

            if(t < ct){
                c.scrollTop = t;
            }else  if(b > cb){
                c.scrollTop = b-ch;
            }

            if(v !== false){
                if(l < cl){
                    c.scrollLeft = l;
                }else  if(r > cr){
                    c.scrollLeft = r-c.clientWidth;
                }
            }
            return  this;
        },

        
        scrollChildIntoView : function(w, z){
            Roo.fly(w, '_scrollChildIntoView').scrollIntoView(this, z);
        },

        

        autoHeight : function(AA, AB, AC, AD){
            var  AE = this.getHeight();
            this.clip();
            this.setHeight(1); 
            setTimeout(function(){
                var  AG = parseInt(this.dom.scrollHeight, 10); 
                if(!AA){
                    this.setHeight(AG);
                    this.unclip();
                    if(typeof  AC == "function"){
                        AC();
                    }
                }else {
                    this.setHeight(AE); 
                    this.setHeight(AG, AA, AB, function(){
                        this.unclip();
                        if(typeof  AC == "function") AC();
                    }.createDelegate(this), AD);
                }
            }.createDelegate(this), 0);
            return  this;
        },

        

        contains : function(el){
            if(!el){return  false;}
            return  D.isAncestor(this.dom, el.dom ? el.dom : el);
        },

        

        isVisible : function(AF) {
            var  AG = !(this.getStyle("visibility") == "hidden" || this.getStyle("display") == "none");
            if(AF !== true || !AG){
                return  AG;
            }
            var  p = this.dom.parentNode;
            while(p && p.tagName.toLowerCase() != "body"){
                if(!Roo.fly(p, '_isVisible').isVisible()){
                    return  false;
                }

                p = p.parentNode;
            }
            return  true;
        },

        

        select : function(AH, AI){
            return  El.select(AH, AI, this.dom);
        },

        

        query : function(AJ, AK){
            return  Roo.DomQuery.select(AJ, this.dom);
        },

        

        child : function(AL, AM){
            var  n = Roo.DomQuery.selectNode(AL, this.dom);
            return  AM ? n : Roo.get(n);
        },

        

        down : function(AN, AO){
            var  n = Roo.DomQuery.selectNode(" > " + AN, this.dom);
            return  AO ? n : Roo.get(n);
        },

        

        initDD : function(AP, AQ, AR){
            var  dd = new  Roo.dd.DD(Roo.id(this.dom), AP, AQ);
            return  Roo.apply(dd, AR);
        },

        

        initDDProxy : function(AS, AT, AU){
            var  dd = new  Roo.dd.DDProxy(Roo.id(this.dom), AS, AT);
            return  Roo.apply(dd, AU);
        },

        

        initDDTarget : function(AV, AW, AX){
            var  dd = new  Roo.dd.DDTarget(Roo.id(this.dom), AV, AW);
            return  Roo.apply(dd, AX);
        },

        

         setVisible : function(AY, AZ){
            if(!AZ || !A){
                if(this.visibilityMode == El.DISPLAY){
                    this.setDisplayed(AY);
                }else {
                    this.fixDisplay();
                    this.dom.style.visibility = AY ? "visible" : "hidden";
                }
            }else {
                
                var  dom = this.dom;
                var  J = this.visibilityMode;
                if(AY){
                    this.setOpacity(.01);
                    this.setVisible(true);
                }

                this.anim({opacity: { to: (AY?1:0) }},
                      this.preanim(arguments, 1),
                      null, .35, 'easeIn', function(){
                         if(!AY){
                             if(J == El.DISPLAY){
                                 dom.style.display = "none";
                             }else {
                                 dom.style.visibility = "hidden";
                             }

                             Roo.get(dom).setOpacity(1);
                         }
                     });
            }
            return  this;
        },

        

        isDisplayed : function() {
            return  this.getStyle("display") != "none";
        },

        

        toggle : function(Aa){
            this.setVisible(!this.isVisible(), this.preanim(arguments, 0));
            return  this;
        },

        

        setDisplayed : function(Ab) {
            if(typeof  Ab == "boolean"){
               Ab = Ab ? this.originalDisplay : "none";
            }

            this.setStyle("display", Ab);
            return  this;
        },

        

        focus : function() {
            try{
                this.dom.focus();
            }catch(e){}
            return  this;
        },

        

        blur : function() {
            try{
                this.dom.blur();
            }catch(e){}
            return  this;
        },

        

        addClass : function(Ac){
            if(Ac  instanceof  Array){
                for(var  i = 0, len = Ac.length; i < len; i++) {
                    this.addClass(Ac[i]);
                }
            }else {
                if(Ac && !this.hasClass(Ac)){
                    this.dom.className = this.dom.className + " " + Ac;
                }
            }
            return  this;
        },

        

        radioClass : function(Ad){
            var  Ae = this.dom.parentNode.childNodes;
            for(var  i = 0; i < Ae.length; i++) {
                var  s = Ae[i];
                if(s.nodeType == 1){
                    Roo.get(s).removeClass(Ad);
                }
            }

            this.addClass(Ad);
            return  this;
        },

        

        removeClass : function(Af){
            if(!Af || !this.dom.className){
                return  this;
            }
            if(Af  instanceof  Array){
                for(var  i = 0, len = Af.length; i < len; i++) {
                    this.removeClass(Af[i]);
                }
            }else {
                if(this.hasClass(Af)){
                    var  re = this.classReCache[Af];
                    if (!re) {
                       re = new  RegExp('(?:^|\\s+)' + Af + '(?:\\s+|$)', "g");
                       this.classReCache[Af] = re;
                    }

                    this.dom.className =
                        this.dom.className.replace(re, " ");
                }
            }
            return  this;
        },

        
        classReCache: {},

        

        toggleClass : function(Ag){
            if(this.hasClass(Ag)){
                this.removeClass(Ag);
            }else {
                this.addClass(Ag);
            }
            return  this;
        },

        

        hasClass : function(Ah){
            return  Ah && (' '+this.dom.className+' ').indexOf(' '+Ah+' ') != -1;
        },

        

        replaceClass : function(Ai, Aj){
            this.removeClass(Ai);
            this.addClass(Aj);
            return  this;
        },

        

        getStyles : function(){
            var  a = arguments, Ak = a.length, r = {};
            for(var  i = 0; i < Ak; i++){
                r[a[i]] = this.getStyle(a[i]);
            }
            return  r;
        },

        

        getStyle : function(){
            return  G && G.getComputedStyle ?
                function(Al){
                    var  el = this.dom, v, cs, Am;
                    if(Al == 'float'){
                        Al = "cssFloat";
                    }
                    if(el.style && (v = el.style[Al])){
                        return  v;
                    }
                    if(cs = G.getComputedStyle(el, "")){
                        if(!(Am = B[Al])){
                            Am = B[Al] = Al.replace(C, F);
                        }
                        return  cs[Am];
                    }
                    return  null;
                } :
                function(Al){
                    var  el = this.dom, v, cs, Am;
                    if(Al == 'opacity'){
                        if(typeof  el.style.filter == 'string'){
                            var  m = el.style.filter.match(/alpha\(opacity=(.*)\)/i);
                            if(m){
                                var  fv = parseFloat(m[1]);
                                if(!isNaN(fv)){
                                    return  fv ? fv / 100 : 0;
                                }
                            }
                        }
                        return  1;
                    }else  if(Al == 'float'){
                        Al = "styleFloat";
                    }
                    if(!(Am = B[Al])){
                        Am = B[Al] = Al.replace(C, F);
                    }
                    if(v = el.style[Am]){
                        return  v;
                    }
                    if(cs = el.currentStyle){
                        return  cs[Am];
                    }
                    return  null;
                };
        }(),

        

        setStyle : function(Al, Am){
            if(typeof  Al == "string"){
                
                if (Al == 'float') {
                    this.setStyle(Roo.isIE ? 'styleFloat'  : 'cssFloat', Am);
                    return  this;
                }
                
                var  camel;
                if(!(camel = B[Al])){
                    camel = B[Al] = Al.replace(C, F);
                }
                
                if(camel == 'opacity') {
                    this.setOpacity(Am);
                }else {
                    this.dom.style[camel] = Am;
                }
            }else {
                for(var  style  in  Al){
                    if(typeof  Al[style] != "function"){
                       this.setStyle(style, Al[style]);
                    }
                }
            }
            return  this;
        },

        

        applyStyles : function(An){
            Roo.DomHelper.applyStyles(this.dom, An);
            return  this;
        },

        

        getX : function(){
            return  D.getX(this.dom);
        },

        

        getY : function(){
            return  D.getY(this.dom);
        },

        

        getXY : function(){
            return  D.getXY(this.dom);
        },

        

        setX : function(x, Ao){
            if(!Ao || !A){
                D.setX(this.dom, x);
            }else {
                this.setXY([x, this.getY()], this.preanim(arguments, 1));
            }
            return  this;
        },

        

        setY : function(y, Ap){
            if(!Ap || !A){
                D.setY(this.dom, y);
            }else {
                this.setXY([this.getX(), y], this.preanim(arguments, 1));
            }
            return  this;
        },

        

        setLeft : function(Aq){
            this.setStyle("left", this.addUnits(Aq));
            return  this;
        },

        

        setTop : function(Ar){
            this.setStyle("top", this.addUnits(Ar));
            return  this;
        },

        

        setRight : function(As){
            this.setStyle("right", this.addUnits(As));
            return  this;
        },

        

        setBottom : function(At){
            this.setStyle("bottom", this.addUnits(At));
            return  this;
        },

        

        setXY : function(Au, Av){
            if(!Av || !A){
                D.setXY(this.dom, Au);
            }else {
                this.anim({points: {to: Au}}, this.preanim(arguments, 1), 'motion');
            }
            return  this;
        },

        

        setLocation : function(x, y, Aw){
            this.setXY([x, y], this.preanim(arguments, 2));
            return  this;
        },

        

        moveTo : function(x, y, Ax){
            this.setXY([x, y], this.preanim(arguments, 2));
            return  this;
        },

        

        getRegion : function(){
            return  D.getRegion(this.dom);
        },

        

        getHeight : function(Ay){
            var  h = this.dom.offsetHeight || 0;
            return  Ay !== true ? h : h-this.getBorderWidth("tb")-this.getPadding("tb");
        },

        

        getWidth : function(Az){
            var  w = this.dom.offsetWidth || 0;
            return  Az !== true ? w : w-this.getBorderWidth("lr")-this.getPadding("lr");
        },

        

        getComputedHeight : function(){
            var  h = Math.max(this.dom.offsetHeight, this.dom.clientHeight);
            if(!h){
                h = parseInt(this.getStyle('height'), 10) || 0;
                if(!this.isBorderBox()){
                    h += this.getFrameWidth('tb');
                }
            }
            return  h;
        },

        

        getComputedWidth : function(){
            var  w = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
            if(!w){
                w = parseInt(this.getStyle('width'), 10) || 0;
                if(!this.isBorderBox()){
                    w += this.getFrameWidth('lr');
                }
            }
            return  w;
        },

        

        getSize : function(A0){
            return  {width: this.getWidth(A0), height: this.getHeight(A0)};
        },

        

        getViewSize : function(){
            var  d = this.dom, A1 = document, aw = 0, ah = 0;
            if(d == A1 || d == A1.body){
                return  {width : D.getViewWidth(), height: D.getViewHeight()};
            }else {
                return  {
                    width : d.clientWidth,
                    height: d.clientHeight
                };
            }
        },

        

        getValue : function(A2){
            return  A2 ? parseInt(this.dom.value, 10) : this.dom.value;
        },

        
        adjustWidth : function(A3){
            if(typeof  A3 == "number"){
                if(this.autoBoxAdjust && !this.isBorderBox()){
                   A3 -= (this.getBorderWidth("lr") + this.getPadding("lr"));
                }
                if(A3 < 0){
                    A3 = 0;
                }
            }
            return  A3;
        },

        
        adjustHeight : function(A4){
            if(typeof  A4 == "number"){
               if(this.autoBoxAdjust && !this.isBorderBox()){
                   A4 -= (this.getBorderWidth("tb") + this.getPadding("tb"));
               }
               if(A4 < 0){
                   A4 = 0;
               }
            }
            return  A4;
        },

        

        setWidth : function(A5, A6){
            A5 = this.adjustWidth(A5);
            if(!A6 || !A){
                this.dom.style.width = this.addUnits(A5);
            }else {
                this.anim({width: {to: A5}}, this.preanim(arguments, 1));
            }
            return  this;
        },

        

         setHeight : function(A7, A8){
            A7 = this.adjustHeight(A7);
            if(!A8 || !A){
                this.dom.style.height = this.addUnits(A7);
            }else {
                this.anim({height: {to: A7}}, this.preanim(arguments, 1));
            }
            return  this;
        },

        

         setSize : function(A9, BA, BB){
            if(typeof  A9 == "object"){ 
                BA = A9.height; A9 = A9.width;
            }

            A9 = this.adjustWidth(A9); BA = this.adjustHeight(BA);
            if(!BB || !A){
                this.dom.style.width = this.addUnits(A9);
                this.dom.style.height = this.addUnits(BA);
            }else {
                this.anim({width: {to: A9}, height: {to: BA}}, this.preanim(arguments, 2));
            }
            return  this;
        },

        

        setBounds : function(x, y, BC, BD, BE){
            if(!BE || !A){
                this.setSize(BC, BD);
                this.setLocation(x, y);
            }else {
                BC = this.adjustWidth(BC); BD = this.adjustHeight(BD);
                this.anim({points: {to: [x, y]}, width: {to: BC}, height: {to: BD}},
                              this.preanim(arguments, 4), 'motion');
            }
            return  this;
        },

        

        setRegion : function(BF, BG){
            this.setBounds(BF.left, BF.top, BF.right-BF.left, BF.bottom-BF.top, this.preanim(arguments, 1));
            return  this;
        },

        

        addListener : function(BH, fn, BI, BJ){
            Roo.EventManager.on(this.dom,  BH, fn, BI || this, BJ);
        },

        

        removeListener : function(BK, fn){
            Roo.EventManager.removeListener(this.dom,  BK, fn);
            return  this;
        },

        

        removeAllListeners : function(){
            E.purgeElement(this.dom);
            return  this;
        },

        relayEvent : function(BL, BM){
            this.on(BL, function(e){
                BM.fireEvent(BL, e);
            });
        },

        

         setOpacity : function(BN, BO){
            if(!BO || !A){
                var  s = this.dom.style;
                if(Roo.isIE){
                    s.zoom = 1;
                    s.filter = (s.filter || '').replace(/alpha\([^\)]*\)/gi,"") +
                               (BN == 1 ? "" : "alpha(opacity=" + BN * 100 + ")");
                }else {
                    s.opacity = BN;
                }
            }else {
                this.anim({opacity: {to: BN}}, this.preanim(arguments, 1), null, .35, 'easeIn');
            }
            return  this;
        },

        

        getLeft : function(BP){
            if(!BP){
                return  this.getX();
            }else {
                return  parseInt(this.getStyle("left"), 10) || 0;
            }
        },

        

        getRight : function(BQ){
            if(!BQ){
                return  this.getX() + this.getWidth();
            }else {
                return  (this.getLeft(true) + this.getWidth()) || 0;
            }
        },

        

        getTop : function(BR) {
            if(!BR){
                return  this.getY();
            }else {
                return  parseInt(this.getStyle("top"), 10) || 0;
            }
        },

        

        getBottom : function(BS){
            if(!BS){
                return  this.getY() + this.getHeight();
            }else {
                return  (this.getTop(true) + this.getHeight()) || 0;
            }
        },

        

        position : function(BT, BU, x, y){
            if(!BT){
               if(this.getStyle('position') == 'static'){
                   this.setStyle('position', 'relative');
               }
            }else {
                this.setStyle("position", BT);
            }
            if(BU){
                this.setStyle("z-index", BU);
            }
            if(x !== undefined && y !== undefined){
                this.setXY([x, y]);
            }else  if(x !== undefined){
                this.setX(x);
            }else  if(y !== undefined){
                this.setY(y);
            }
        },

        

        clearPositioning : function(BV){
            BV = BV ||'';
            this.setStyle({
                "left": BV,
                "right": BV,
                "top": BV,
                "bottom": BV,
                "z-index": "",
                "position" : "static"
            });
            return  this;
        },

        

        getPositioning : function(){
            var  l = this.getStyle("left");
            var  t = this.getStyle("top");
            return  {
                "position" : this.getStyle("position"),
                "left" : l,
                "right" : l ? "" : this.getStyle("right"),
                "top" : t,
                "bottom" : t ? "" : this.getStyle("bottom"),
                "z-index" : this.getStyle("z-index")
            };
        },

        

        getBorderWidth : function(BW){
            return  this.addStyles(BW, El.borders);
        },

        

        getPadding : function(BX){
            return  this.addStyles(BX, El.paddings);
        },

        

        setPositioning : function(pc){
            this.applyStyles(pc);
            if(pc.right == "auto"){
                this.dom.style.right = "";
            }
            if(pc.bottom == "auto"){
                this.dom.style.bottom = "";
            }
            return  this;
        },

        
        fixDisplay : function(){
            if(this.getStyle("display") == "none"){
                this.setStyle("visibility", "hidden");
                this.setStyle("display", this.originalDisplay); 
                if(this.getStyle("display") == "none"){ 
                    this.setStyle("display", "block");
                }
            }
        },

        

         setLeftTop : function(BY, BZ){
            this.dom.style.left = this.addUnits(BY);
            this.dom.style.top = this.addUnits(BZ);
            return  this;
        },

        

         move : function(Ba, Bb, Bc){
            var  xy = this.getXY();
            Ba = Ba.toLowerCase();
            switch(Ba){
                case  "l":
                case  "left":
                    this.moveTo(xy[0]-Bb, xy[1], this.preanim(arguments, 2));
                    break;
               case  "r":
               case  "right":
                    this.moveTo(xy[0]+Bb, xy[1], this.preanim(arguments, 2));
                    break;
               case  "t":
               case  "top":
               case  "up":
                    this.moveTo(xy[0], xy[1]-Bb, this.preanim(arguments, 2));
                    break;
               case  "b":
               case  "bottom":
               case  "down":
                    this.moveTo(xy[0], xy[1]+Bb, this.preanim(arguments, 2));
                    break;
            }
            return  this;
        },

        

        clip : function(){
            if(!this.isClipped){
               this.isClipped = true;
               this.originalClip = {
                   "o": this.getStyle("overflow"),
                   "x": this.getStyle("overflow-x"),
                   "y": this.getStyle("overflow-y")
               };
               this.setStyle("overflow", "hidden");
               this.setStyle("overflow-x", "hidden");
               this.setStyle("overflow-y", "hidden");
            }
            return  this;
        },

        

        unclip : function(){
            if(this.isClipped){
                this.isClipped = false;
                var  o = this.originalClip;
                if(o.o){this.setStyle("overflow", o.o);}
                if(o.x){this.setStyle("overflow-x", o.x);}
                if(o.y){this.setStyle("overflow-y", o.y);}
            }
            return  this;
        },


        

        getAnchorXY : function(Bd, Be, s){
            
            

            var  w, h, vp = false;
            if(!s){
                var  d = this.dom;
                if(d == document.body || d == document){
                    vp = true;
                    w = D.getViewWidth(); h = D.getViewHeight();
                }else {
                    w = this.getWidth(); h = this.getHeight();
                }
            }else {
                w = s.width;  h = s.height;
            }
            var  x = 0, y = 0, r = Math.round;
            switch((Bd || "tl").toLowerCase()){
                case  "c":
                    x = r(w*.5);
                    y = r(h*.5);
                break;
                case  "t":
                    x = r(w*.5);
                    y = 0;
                break;
                case  "l":
                    x = 0;
                    y = r(h*.5);
                break;
                case  "r":
                    x = w;
                    y = r(h*.5);
                break;
                case  "b":
                    x = r(w*.5);
                    y = h;
                break;
                case  "tl":
                    x = 0;
                    y = 0;
                break;
                case  "bl":
                    x = 0;
                    y = h;
                break;
                case  "br":
                    x = w;
                    y = h;
                break;
                case  "tr":
                    x = w;
                    y = 0;
                break;
            }
            if(Be === true){
                return  [x, y];
            }
            if(vp){
                var  sc = this.getScroll();
                return  [x + sc.left, y + sc.top];
            }
            
            var  o = this.getXY();
            return  [x+o[0], y+o[1]];
        },

        

        getAlignToXY : function(el, p, o){
            el = Roo.get(el);
            var  d = this.dom;
            if(!el.dom){
                throw  "Element.alignTo with an element that doesn't exist";
            }
            var  c = false; 
            var  p1 = "", p2 = "";
            o = o || [0,0];

            if(!p){
                p = "tl-bl";
            }else  if(p == "?"){
                p = "tl-bl?";
            }else  if(p.indexOf("-") == -1){
                p = "tl-" + p;
            }

            p = p.toLowerCase();
            var  m = p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
            if(!m){
               throw  "Element.alignTo with an invalid alignment " + p;
            }

            p1 = m[1]; p2 = m[2]; c = !!m[3];

            
            
            var  a1 = this.getAnchorXY(p1, true);
            var  a2 = el.getAnchorXY(p2, false);
            var  x = a2[0] - a1[0] + o[0];
            var  y = a2[1] - a1[1] + o[1];
            if(c){
                
                var  w = this.getWidth(), h = this.getHeight(), r = el.getRegion();
                
                var  dw = D.getViewWidth()-5, dh = D.getViewHeight()-5;

                
                
                
                var  p1y = p1.charAt(0), p1x = p1.charAt(p1.length-1);
               var  p2y = p2.charAt(0), p2x = p2.charAt(p2.length-1);
               var  swapY = ((p1y=="t" && p2y=="b") || (p1y=="b" && p2y=="t"));
               var  swapX = ((p1x=="r" && p2x=="l") || (p1x=="l" && p2x=="r"));

               var  A1 = document;
               var  scrollX = (A1.documentElement.scrollLeft || A1.body.scrollLeft || 0)+5;
               var  scrollY = (A1.documentElement.scrollTop || A1.body.scrollTop || 0)+5;

               if((x+w) > dw + scrollX){
                    x = swapX ? r.left-w : dw+scrollX-w;
                }
               if(x < scrollX){
                   x = swapX ? r.right : scrollX;
               }
               if((y+h) > dh + scrollY){
                    y = swapY ? r.top-h : dh+scrollY-h;
                }
               if (y < scrollY){
                   y = swapY ? r.bottom : scrollY;
               }
            }
            return  [x,y];
        },

        
        getConstrainToXY : function(){
            var  os = {top:0, left:0, bottom:0, right: 0};

            return  function(el, Bf, Bg, Bh){
                el = Roo.get(el);
                Bg = Bg ? Roo.applyIf(Bg, os) : os;

                var  vw, vh, vx = 0, vy = 0;
                if(el.dom == document.body || el.dom == document){
                    vw = Roo.lib.Dom.getViewWidth();
                    vh = Roo.lib.Dom.getViewHeight();
                }else {
                    vw = el.dom.clientWidth;
                    vh = el.dom.clientHeight;
                    if(!Bf){
                        var  vxy = el.getXY();
                        vx = vxy[0];
                        vy = vxy[1];
                    }
                }

                var  s = el.getScroll();

                vx += Bg.left + s.left;
                vy += Bg.top + s.top;

                vw -= Bg.right;
                vh -= Bg.bottom;

                var  vr = vx+vw;
                var  vb = vy+vh;

                var  xy = Bh || (!Bf ? this.getXY() : [this.getLeft(true), this.getTop(true)]);
                var  x = xy[0], y = xy[1];
                var  w = this.dom.offsetWidth, h = this.dom.offsetHeight;

                
                var  Bi = false;

                
                if((x + w) > vr){
                    x = vr - w;
                    Bi = true;
                }
                if((y + h) > vb){
                    y = vb - h;
                    Bi = true;
                }
                
                if(x < vx){
                    x = vx;
                    Bi = true;
                }
                if(y < vy){
                    y = vy;
                    Bi = true;
                }
                return  Bi ? [x, y] : false;
            };
        }(),

        
        adjustForConstraints : function(xy, Bf, Bg){
            return  this.getConstrainToXY(Bf || document, false, Bg, xy) ||  xy;
        },

        

        alignTo : function(Bh, Bi, Bj, Bk){
            var  xy = this.getAlignToXY(Bh, Bi, Bj);
            this.setXY(xy, this.preanim(arguments, 3));
            return  this;
        },

        

        anchorTo : function(el, Bl, Bm, Bn, Bo, Bp){
            var  Bq = function(){
                this.alignTo(el, Bl, Bm, Bn);
                Roo.callback(Bp, this);
            };
            Roo.EventManager.onWindowResize(Bq, this);
            var  tm = typeof  Bo;
            if(tm != 'undefined'){
                Roo.EventManager.on(window, 'scroll', Bq, this,
                    {buffer: tm == 'number' ? Bo : 50});
            }

            Bq.call(this); 
            return  this;
        },
        

        clearOpacity : function(){
            if (window.ActiveXObject) {
                if(typeof  this.dom.style.filter == 'string' && (/alpha/i).test(this.dom.style.filter)){
                    this.dom.style.filter = "";
                }
            } else  {
                this.dom.style.opacity = "";
                this.dom.style["-moz-opacity"] = "";
                this.dom.style["-khtml-opacity"] = "";
            }
            return  this;
        },

        

        hide : function(Br){
            this.setVisible(false, this.preanim(arguments, 0));
            return  this;
        },

        

        show : function(Bs){
            this.setVisible(true, this.preanim(arguments, 0));
            return  this;
        },

        

        addUnits : function(Bt){
            return  Roo.Element.addUnits(Bt, this.defaultUnit);
        },

        

        beginMeasure : function(){
            var  el = this.dom;
            if(el.offsetWidth || el.offsetHeight){
                return  this; 
            }
            var  Bu = [];
            var  p = this.dom, b = document.body; 
            while((!el.offsetWidth && !el.offsetHeight) && p && p.tagName && p != b){
                var  pe = Roo.get(p);
                if(pe.getStyle('display') == 'none'){
                    Bu.push({el: p, visibility: pe.getStyle("visibility")});
                    p.style.visibility = "hidden";
                    p.style.display = "block";
                }

                p = p.parentNode;
            }

            this._measureChanged = Bu;
            return  this;

        },

        

        endMeasure : function(){
            var  Bv = this._measureChanged;
            if(Bv){
                for(var  i = 0, Ak = Bv.length; i < Ak; i++) {
                    var  r = Bv[i];
                    r.el.style.visibility = r.visibility;
                    r.el.style.display = "none";
                }

                this._measureChanged = null;
            }
            return  this;
        },

        

        update : function(Bw, Bx, By){
            if(typeof  Bw == "undefined"){
                Bw = "";
            }
            if(Bx !== true){
                this.dom.innerHTML = Bw;
                if(typeof  By == "function"){
                    By();
                }
                return  this;
            }
            var  id = Roo.id();
            var  Bz = this.dom;

            Bw += '<span id="' + id + '"></span>';

            E.onAvailable(id, function(){
                var  hd = document.getElementsByTagName("head")[0];
                var  re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;
                var  B0 = /\ssrc=([\'\"])(.*?)\1/i;
                var  B1 = /\stype=([\'\"])(.*?)\1/i;

                var  B2;
                while(B2 = re.exec(Bw)){
                    var  attrs = B2[1];
                    var  srcMatch = attrs ? attrs.match(B0) : false;
                    if(srcMatch && srcMatch[2]){
                       var  s = document.createElement("script");
                       s.src = srcMatch[2];
                       var  typeMatch = attrs.match(B1);
                       if(typeMatch && typeMatch[2]){
                           s.type = typeMatch[2];
                       }

                       hd.appendChild(s);
                    }else  if(B2[2] && B2[2].length > 0){
                        if(window.execScript) {
                           window.execScript(B2[2]);
                        } else  {
                            

                           window.eval(B2[2]);
                        }
                    }
                }
                var  el = document.getElementById(id);
                if(el){el.parentNode.removeChild(el);}
                if(typeof  By == "function"){
                    By();
                }
            });
            Bz.innerHTML = Bw.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
            return  this;
        },

        

        load : function(){
            var  um = this.getUpdateManager();
            um.update.apply(um, arguments);
            return  this;
        },

        

        getUpdateManager : function(){
            if(!this.updateManager){
                this.updateManager = new  Roo.UpdateManager(this);
            }
            return  this.updateManager;
        },

        

        unselectable : function(){
            this.dom.unselectable = "on";
            this.swallowEvent("selectstart", true);
            this.applyStyles("-moz-user-select:none;-khtml-user-select:none;");
            this.addClass("x-unselectable");
            return  this;
        },

        

        getCenterXY : function(){
            return  this.getAlignToXY(document, 'c-c');
        },

        

        center : function(B0){
            this.alignTo(B0 || document, 'c-c');
            return  this;
        },

        

        isBorderBox : function(){
            return  I[this.dom.tagName.toLowerCase()] || Roo.isBorderBox;
        },

        

        getBox : function(B1, B2){
            var  xy;
            if(!B2){
                xy = this.getXY();
            }else {
                var  BY = parseInt(this.getStyle("left"), 10) || 0;
                var  BZ = parseInt(this.getStyle("top"), 10) || 0;
                xy = [BY, BZ];
            }
            var  el = this.dom, w = el.offsetWidth, h = el.offsetHeight, bx;
            if(!B1){
                bx = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: w, height: h};
            }else {
                var  l = this.getBorderWidth("l")+this.getPadding("l");
                var  r = this.getBorderWidth("r")+this.getPadding("r");
                var  t = this.getBorderWidth("t")+this.getPadding("t");
                var  b = this.getBorderWidth("b")+this.getPadding("b");
                bx = {x: xy[0]+l, y: xy[1]+t, 0: xy[0]+l, 1: xy[1]+t, width: w-(l+r), height: h-(t+b)};
            }

            bx.right = bx.x + bx.width;
            bx.bottom = bx.y + bx.height;
            return  bx;
        },

        

        getFrameWidth : function(B3, B4){
            return  B4 && Roo.isBorderBox ? 0 : (this.getPadding(B3) + this.getBorderWidth(B3));
        },

        

        setBox : function(B5, B6, B7){
            var  w = B5.width, h = B5.height;
            if((B6 && !this.autoBoxAdjust) && !this.isBorderBox()){
               w -= (this.getBorderWidth("lr") + this.getPadding("lr"));
               h -= (this.getBorderWidth("tb") + this.getPadding("tb"));
            }

            this.setBounds(B5.x, B5.y, w, h, this.preanim(arguments, 2));
            return  this;
        },

        

         repaint : function(){
            var  B8 = this.dom;
            this.addClass("x-repaint");
            setTimeout(function(){
                Roo.get(B8).removeClass("x-repaint");
            }, 1);
            return  this;
        },

        

        getMargins : function(B9){
            if(!B9){
                return  {
                    top: parseInt(this.getStyle("margin-top"), 10) || 0,
                    left: parseInt(this.getStyle("margin-left"), 10) || 0,
                    bottom: parseInt(this.getStyle("margin-bottom"), 10) || 0,
                    right: parseInt(this.getStyle("margin-right"), 10) || 0
                };
            }else {
                return  this.addStyles(B9, El.margins);
             }
        },

        
        addStyles : function(CA, CB){
            var  CC = 0, v, w;
            for(var  i = 0, Ak = CA.length; i < Ak; i++){
                v = this.getStyle(CB[CA.charAt(i)]);
                if(v){
                     w = parseInt(v, 10);
                     if(w){ CC += w; }
                }
            }
            return  CC;
        },

        

        createProxy : function(CD, CE, CF){
            if(CE){
                CE = Roo.getDom(CE);
            }else {
                CE = document.body;
            }

            CD = typeof  CD == "object" ?
                CD : {tag : "div", cls: CD};
            var  CG = Roo.DomHelper.append(CE, CD, true);
            if(CF){
               CG.setBox(this.getBox());
            }
            return  CG;
        },

        

        mask : function(CH, CI){
            if(this.getStyle("position") == "static"){
                this.setStyle("position", "relative");
            }
            if(!this._mask){
                this._mask = Roo.DomHelper.append(this.dom, {cls:"roo-el-mask"}, true);
            }

            this.addClass("x-masked");
            this._mask.setDisplayed(true);
            if(typeof  CH == 'string'){
                if(!this._maskMsg){
                    this._maskMsg = Roo.DomHelper.append(this.dom, {cls:"roo-el-mask-msg", cn:{tag:'div'}}, true);
                }
                var  mm = this._maskMsg;
                mm.dom.className = CI ? "roo-el-mask-msg " + CI : "roo-el-mask-msg";
                mm.dom.firstChild.innerHTML = CH;
                mm.setDisplayed(true);
                mm.center(this);
            }
            if(Roo.isIE && !(Roo.isIE7 && Roo.isStrict) && this.getStyle('height') == 'auto'){ 
                this._mask.setHeight(this.getHeight());
            }
            return  this._mask;
        },

        

        unmask : function(CJ){
            if(this._mask){
                if(CJ === true){
                    this._mask.remove();
                    delete  this._mask;
                    if(this._maskMsg){
                        this._maskMsg.remove();
                        delete  this._maskMsg;
                    }
                }else {
                    this._mask.setDisplayed(false);
                    if(this._maskMsg){
                        this._maskMsg.setDisplayed(false);
                    }
                }
            }

            this.removeClass("x-masked");
        },

        

        isMasked : function(){
            return  this._mask && this._mask.isVisible();
        },

        

        createShim : function(){
            var  el = document.createElement('iframe');
            el.frameBorder = 'no';
            el.className = 'roo-shim';
            if(Roo.isIE && Roo.isSecure){
                el.src = Roo.SSL_SECURE_URL;
            }
            var  CK = Roo.get(this.dom.parentNode.insertBefore(el, this.dom));
            CK.autoBoxAdjust = false;
            return  CK;
        },

        

        remove : function(){
            if(this.dom.parentNode){
                this.dom.parentNode.removeChild(this.dom);
            }
            delete  El.cache[this.dom.id];
        },

        

        addClassOnOver : function(CL, CM){
            this.on("mouseover", function(){
                Roo.fly(this, '_internal').addClass(CL);
            }, this.dom);
            var  CN = function(e){
                if(CM !== true || !e.within(this, true)){
                    Roo.fly(this, '_internal').removeClass(CL);
                }
            };
            this.on("mouseout", CN, this.dom);
            return  this;
        },

        

        addClassOnFocus : function(CO){
            this.on("focus", function(){
                Roo.fly(this, '_internal').addClass(CO);
            }, this.dom);
            this.on("blur", function(){
                Roo.fly(this, '_internal').removeClass(CO);
            }, this.dom);
            return  this;
        },
        

        addClassOnClick : function(CP){
            var  CQ = this.dom;
            this.on("mousedown", function(){
                Roo.fly(CQ, '_internal').addClass(CP);
                var  d = Roo.get(document);
                var  fn = function(){
                    Roo.fly(CQ, '_internal').removeClass(CP);
                    d.removeListener("mouseup", fn);
                };
                d.on("mouseup", fn);
            });
            return  this;
        },

        

        swallowEvent : function(CR, CS){
            var  fn = function(e){
                e.stopPropagation();
                if(CS){
                    e.preventDefault();
                }
            };
            if(CR  instanceof  Array){
                for(var  i = 0, Ak = CR.length; i < Ak; i++){
                     this.on(CR[i], fn);
                }
                return  this;
            }

            this.on(CR, fn);
            return  this;
        },

        

      fitToParentDelegate : Roo.emptyFn, 

        

        fitToParent : function(CT, CU) {
          Roo.EventManager.removeResizeListener(this.fitToParentDelegate); 
          this.fitToParentDelegate = Roo.emptyFn; 
          if (CT === true && !this.dom.parentNode) { 
            return;
          }
          var  p = Roo.get(CU || this.dom.parentNode);
          this.setSize(p.getComputedWidth() - p.getFrameWidth('lr'), p.getComputedHeight() - p.getFrameWidth('tb'));
          if (CT === true) {
            this.fitToParentDelegate = this.fitToParent.createDelegate(this, [true, CU]);
            Roo.EventManager.onWindowResize(this.fitToParentDelegate);
          }
          return  this;
        },

        

        getNextSibling : function(){
            var  n = this.dom.nextSibling;
            while(n && n.nodeType != 1){
                n = n.nextSibling;
            }
            return  n;
        },

        

        getPrevSibling : function(){
            var  n = this.dom.previousSibling;
            while(n && n.nodeType != 1){
                n = n.previousSibling;
            }
            return  n;
        },


        

        appendChild: function(el){
            el = Roo.get(el);
            el.appendTo(this);
            return  this;
        },

        

        createChild: function(CV, CW, CX){
            CV = CV || {tag:'div'};
            if(CW){
                return  Roo.DomHelper.insertBefore(CW, CV, CX !== true);
            }
            return  Roo.DomHelper[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, CV,  CX !== true);
        },

        

        appendTo: function(el){
            el = Roo.getDom(el);
            el.appendChild(this.dom);
            return  this;
        },

        

        insertBefore: function(el){
            el = Roo.getDom(el);
            el.parentNode.insertBefore(this.dom, el);
            return  this;
        },

        

        insertAfter: function(el){
            el = Roo.getDom(el);
            el.parentNode.insertBefore(this.dom, el.nextSibling);
            return  this;
        },

        

        insertFirst: function(el, CY){
            el = el || {};
            if(typeof  el == 'object' && !el.nodeType){ 
                return  this.createChild(el, this.dom.firstChild, CY);
            }else {
                el = Roo.getDom(el);
                this.dom.insertBefore(el, this.dom.firstChild);
                return  !CY ? Roo.get(el) : el;
            }
        },

        

        insertSibling: function(el, CZ, Ca){
            CZ = CZ ? CZ.toLowerCase() : 'before';
            el = el || {};
            var  rt, Cb = CZ == 'before' ? this.dom : this.dom.nextSibling;

            if(typeof  el == 'object' && !el.nodeType){ 
                if(CZ == 'after' && !this.dom.nextSibling){
                    rt = Roo.DomHelper.append(this.dom.parentNode, el, !Ca);
                }else {
                    rt = Roo.DomHelper[CZ == 'after' ? 'insertAfter' : 'insertBefore'](this.dom, el, !Ca);
                }

            }else {
                rt = this.dom.parentNode.insertBefore(Roo.getDom(el),
                            CZ == 'before' ? this.dom : this.dom.nextSibling);
                if(!Ca){
                    rt = Roo.get(rt);
                }
            }
            return  rt;
        },

        

        wrap: function(Cc, Cd){
            if(!Cc){
                Cc = {tag: "div"};
            }
            var  Ce = Roo.DomHelper.insertBefore(this.dom, Cc, !Cd);
            Ce.dom ? Ce.dom.appendChild(this.dom) : Ce.appendChild(this.dom);
            return  Ce;
        },

        

        replace: function(el){
            el = Roo.get(el);
            this.insertBefore(el);
            el.remove();
            return  this;
        },

        

        insertHtml : function(Cf, Cg, Ch){
            var  el = Roo.DomHelper.insertHtml(Cf, this.dom, Cg);
            return  Ch ? Roo.get(el) : el;
        },

        

        set : function(o, Ci){
            var  el = this.dom;
            Ci = typeof  Ci == 'undefined' ? (el.setAttribute ? true : false) : Ci;
            for(var  attr  in  o){
                if(attr == "style" || typeof  o[attr] == "function") continue;
                if(attr=="cls"){
                    el.className = o["cls"];
                }else {
                    if(Ci) el.setAttribute(attr, o[attr]);
                    else  el[attr] = o[attr];
                }
            }
            if(o.style){
                Roo.DomHelper.applyStyles(el, o.style);
            }
            return  this;
        },

        

        addKeyListener : function(Cj, fn, Ck){
            var  Cl;
            if(typeof  Cj != "object" || Cj  instanceof  Array){
                Cl = {
                    key: Cj,
                    fn: fn,
                    scope: Ck
                };
            }else {
                Cl = {
                    key : Cj.key,
                    shift : Cj.shift,
                    ctrl : Cj.ctrl,
                    alt : Cj.alt,
                    fn: fn,
                    scope: Ck
                };
            }
            return  new  Roo.KeyMap(this, Cl);
        },

        

        addKeyMap : function(Cm){
            return  new  Roo.KeyMap(this, Cm);
        },

        

         isScrollable : function(){
            var  Cn = this.dom;
            return  Cn.scrollHeight > Cn.clientHeight || Cn.scrollWidth > Cn.clientWidth;
        },

        


        scrollTo : function(Co, Cp, Cq){
            var  Cr = Co.toLowerCase() == "left" ? "scrollLeft" : "scrollTop";
            if(!Cq || !A){
                this.dom[Cr] = Cp;
            }else {
                var  to = Cr == "scrollLeft" ? [Cp, this.dom.scrollTop] : [this.dom.scrollLeft, Cp];
                this.anim({scroll: {"to": to}}, this.preanim(arguments, 2), 'scroll');
            }
            return  this;
        },

        

         scroll : function(Cs, Ct, Cu){
             if(!this.isScrollable()){
                 return;
             }
             var  el = this.dom;
             var  l = el.scrollLeft, t = el.scrollTop;
             var  w = el.scrollWidth, h = el.scrollHeight;
             var  cw = el.clientWidth, ch = el.clientHeight;
             Cs = Cs.toLowerCase();
             var  Cv = false;
             var  a = this.preanim(arguments, 2);
             switch(Cs){
                 case  "l":
                 case  "left":
                     if(w - l > cw){
                         var  v = Math.min(l + Ct, w-cw);
                         this.scrollTo("left", v, a);
                         Cv = true;
                     }
                     break;
                case  "r":
                case  "right":
                     if(l > 0){
                         var  v = Math.max(l - Ct, 0);
                         this.scrollTo("left", v, a);
                         Cv = true;
                     }
                     break;
                case  "t":
                case  "top":
                case  "up":
                     if(t > 0){
                         var  v = Math.max(t - Ct, 0);
                         this.scrollTo("top", v, a);
                         Cv = true;
                     }
                     break;
                case  "b":
                case  "bottom":
                case  "down":
                     if(h - t > ch){
                         var  v = Math.min(t + Ct, h-ch);
                         this.scrollTo("top", v, a);
                         Cv = true;
                     }
                     break;
             }
             return  Cv;
        },

        

        translatePoints : function(x, y){
            if(typeof  x == 'object' || x  instanceof  Array){
                y = x[1]; x = x[0];
            }
            var  p = this.getStyle('position');
            var  o = this.getXY();

            var  l = parseInt(this.getStyle('left'), 10);
            var  t = parseInt(this.getStyle('top'), 10);

            if(isNaN(l)){
                l = (p == "relative") ? 0 : this.dom.offsetLeft;
            }
            if(isNaN(t)){
                t = (p == "relative") ? 0 : this.dom.offsetTop;
            }

            return  {left: (x - o[0] + l), top: (y - o[1] + t)};
        },

        

        getScroll : function(){
            var  d = this.dom, Cw = document;
            if(d == Cw || d == Cw.body){
                var  l = window.pageXOffset || Cw.documentElement.scrollLeft || Cw.body.scrollLeft || 0;
                var  t = window.pageYOffset || Cw.documentElement.scrollTop || Cw.body.scrollTop || 0;
                return  {left: l, top: t};
            }else {
                return  {left: d.scrollLeft, top: d.scrollTop};
            }
        },

        

        getColor : function(Cx, Cy, Cz){
            var  v = this.getStyle(Cx);
            if(!v || v == "transparent" || v == "inherit") {
                return  Cy;
            }
            var  C0 = typeof  Cz == "undefined" ? "#" : Cz;
            if(v.substr(0, 4) == "rgb("){
                var  rvs = v.slice(4, v.length -1).split(",");
                for(var  i = 0; i < 3; i++){
                    var  h = parseInt(rvs[i]).toString(16);
                    if(h < 16){
                        h = "0" + h;
                    }

                    C0 += h;
                }
            } else  {
                if(v.substr(0, 1) == "#"){
                    if(v.length == 4) {
                        for(var  i = 1; i < 4; i++){
                            var  c = v.charAt(i);
                            C0 +=  c + c;
                        }
                    }else  if(v.length == 7){
                        C0 += v.substr(1);
                    }
                }
            }
            return (C0.length > 5 ? C0.toLowerCase() : Cy);
        },

        

        boxWrap : function(C1){
            C1 = C1 || 'x-box';
            var  el = Roo.get(this.insertHtml('beforeBegin', String.format('<div class="{0}">'+El.boxMarkup+'</div>', C1)));
            el.child('.'+C1+'-mc').dom.appendChild(this.dom);
            return  el;
        },

        

        getAttributeNS : Roo.isIE ? function(ns, C2){
            var  d = this.dom;
            var  C3 = typeof  d[ns+":"+C2];
            if(C3 != 'undefined' && C3 != 'unknown'){
                return  d[ns+":"+C2];
            }
            return  d[C2];
        } : function(ns, C4){
            var  d = this.dom;
            return  d.getAttributeNS(ns, C4) || d.getAttribute(ns+":"+C4) || d.getAttribute(C4) || d[C4];
        }
    };

    var  ep = El.prototype;

    

    ep.on = ep.addListener;
        
    ep.mon = ep.addListener;

    

    ep.un = ep.removeListener;

    

    ep.autoBoxAdjust = true;

    
    El.unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i;

    
    El.addUnits = function(v, J){
        if(v === "" || v == "auto"){
            return  v;
        }
        if(v === undefined){
            return  '';
        }
        if(typeof  v == "number" || !El.unitPattern.test(v)){
            return  v + (J || 'px');
        }
        return  v;
    };

    
    El.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
    

    El.VISIBILITY = 1;
    

    El.DISPLAY = 2;

    El.borders = {l: "border-left-width", r: "border-right-width", t: "border-top-width", b: "border-bottom-width"};
    El.paddings = {l: "padding-left", r: "padding-right", t: "padding-top", b: "padding-bottom"};
    El.margins = {l: "margin-left", r: "margin-right", t: "margin-top", b: "margin-bottom"};



    

    El.cache = {};

    var  H;

    

    El.get = function(el){
        var  ex, J, id;
        if(!el){ return  null; }
        if(typeof  el == "string"){ 
            if(!(J = document.getElementById(el))){
                return  null;
            }
            if(ex = El.cache[el]){
                ex.dom = J;
            }else {
                ex = El.cache[el] = new  El(J);
            }
            return  ex;
        }else  if(el.tagName){ 
            if(!(id = el.id)){
                id = Roo.id(el);
            }
            if(ex = El.cache[id]){
                ex.dom = el;
            }else {
                ex = El.cache[id] = new  El(el);
            }
            return  ex;
        }else  if(el  instanceof  El){
            if(el != H){
                el.dom = document.getElementById(el.id) || el.dom; 
                                                              
                El.cache[el.id] = el; 
            }
            return  el;
        }else  if(el.isComposite){
            return  el;
        }else  if(el  instanceof  Array){
            return  El.select(el);
        }else  if(el == document){
            
            if(!H){
                var  f = function(){};
                f.prototype = El.prototype;
                H = new  f();
                H.dom = document;
            }
            return  H;
        }
        return  null;
    };

    
    El.uncache = function(el){
        for(var  i = 0, a = arguments, len = a.length; i < len; i++) {
            if(a[i]){
                delete  El.cache[a[i].id || a[i]];
            }
        }
    };

    
    
    
    El.garbageCollect = function(){
        if(!Roo.enableGarbageCollector){
            clearInterval(El.collectorThread);
            return;
        }
        for(var  eid  in  El.cache){
            var  el = El.cache[eid], d = el.dom;
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            if(!d || !d.parentNode || (!d.offsetParent && !document.getElementById(eid))){
                delete  El.cache[eid];
                if(d && Roo.enableListenerCollection){
                    E.purgeElement(d);
                }
            }
        }
    }

    El.collectorThreadId = setInterval(El.garbageCollect, 30000);


    
    El.Flyweight = function(J){
        this.dom = J;
    };
    El.Flyweight.prototype = El.prototype;

    El._flyweights = {};
    

    El.fly = function(el, J){
        J = J || '_global';
        el = Roo.getDom(el);
        if(!el){
            return  null;
        }
        if(!El._flyweights[J]){
            El._flyweights[J] = new  El.Flyweight();
        }

        El._flyweights[J].dom = el;
        return  El._flyweights[J];
    };

    

    Roo.get = El.get;
    

    Roo.fly = El.fly;

    
    var  I = Roo.isStrict ? {
        select:1
    } : {
        input:1, select:1, textarea:1
    };
    if(Roo.isIE || Roo.isGecko){
        I['button'] = 1;
    }



    Roo.EventManager.on(window, 'unload', function(){
        delete  El.cache;
        delete  El._flyweights;
    });
})();




if(Roo.DomQuery){
    Roo.Element.selectorFunction = Roo.DomQuery.select;
}


Roo.Element.select = function(J, K, L){
    var  M;
    if(typeof  J == "string"){
        M = Roo.Element.selectorFunction(J, L);
    }else  if(J.length !== undefined){
        M = J;
    }else {
        throw  "Invalid selector";
    }
    if(K === true){
        return  new  Roo.CompositeElement(M);
    }else {
        return  new  Roo.CompositeElementLite(M);
    }
};


Roo.select = Roo.Element.select;





















Roo.enableFx = true;



Roo.Fx = {
	

    slideIn : function(A, o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){

            A = A || "t";

            
            this.fixDisplay();

            
            var  r = this.getFxRestore();
            var  b = this.getBox();
            
            this.setSize(b);

            
            var  B = this.fxWrap(r.pos, o, "hidden");

            var  st = this.dom.style;
            st.visibility = "visible";
            st.position = "absolute";

            
            var  C = function(){
                el.fxUnwrap(B, r.pos, o);
                st.width = r.width;
                st.height = r.height;
                el.afterFx(o);
            };
            
            var  a, pt = {to: [b.x, b.y]}, bw = {to: b.width}, bh = {to: b.height};

            switch(A.toLowerCase()){
                case  "t":
                    B.setSize(b.width, 0);
                    st.left = st.bottom = "0";
                    a = {height: bh};
                break;
                case  "l":
                    B.setSize(0, b.height);
                    st.right = st.top = "0";
                    a = {width: bw};
                break;
                case  "r":
                    B.setSize(0, b.height);
                    B.setX(b.right);
                    st.left = st.top = "0";
                    a = {width: bw, points: pt};
                break;
                case  "b":
                    B.setSize(b.width, 0);
                    B.setY(b.bottom);
                    st.left = st.top = "0";
                    a = {height: bh, points: pt};
                break;
                case  "tl":
                    B.setSize(0, 0);
                    st.right = st.bottom = "0";
                    a = {width: bw, height: bh};
                break;
                case  "bl":
                    B.setSize(0, 0);
                    B.setY(b.y+b.height);
                    st.right = st.top = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
                case  "br":
                    B.setSize(0, 0);
                    B.setXY([b.right, b.bottom]);
                    st.left = st.top = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
                case  "tr":
                    B.setSize(0, 0);
                    B.setX(b.x+b.width);
                    st.left = st.bottom = "0";
                    a = {width: bw, height: bh, points: pt};
                break;
            }

            this.dom.style.visibility = "visible";
            B.show();

            arguments.callee.anim = B.fxanim(a,
                o,
                'motion',
                .5,
                'easeOut', C);
        });
        return  this;
    },
    
	

    slideOut : function(B, o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){

            B = B || "t";

            
            var  r = this.getFxRestore();
            
            var  b = this.getBox();
            
            this.setSize(b);

            
            var  C = this.fxWrap(r.pos, o, "visible");

            var  st = this.dom.style;
            st.visibility = "visible";
            st.position = "absolute";

            C.setSize(b);

            var  D = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else {
                    el.hide();
                }


                el.fxUnwrap(C, r.pos, o);

                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            var  a, E = {to: 0};
            switch(B.toLowerCase()){
                case  "t":
                    st.left = st.bottom = "0";
                    a = {height: E};
                break;
                case  "l":
                    st.right = st.top = "0";
                    a = {width: E};
                break;
                case  "r":
                    st.left = st.top = "0";
                    a = {width: E, points: {to:[b.right, b.y]}};
                break;
                case  "b":
                    st.left = st.top = "0";
                    a = {height: E, points: {to:[b.x, b.bottom]}};
                break;
                case  "tl":
                    st.right = st.bottom = "0";
                    a = {width: E, height: E};
                break;
                case  "bl":
                    st.right = st.top = "0";
                    a = {width: E, height: E, points: {to:[b.x, b.bottom]}};
                break;
                case  "br":
                    st.left = st.top = "0";
                    a = {width: E, height: E, points: {to:[b.x+b.width, b.bottom]}};
                break;
                case  "tr":
                    st.left = st.bottom = "0";
                    a = {width: E, height: E, points: {to:[b.right, b.y]}};
                break;
            }


            arguments.callee.anim = C.fxanim(a,
                o,
                'motion',
                .5,
                "easeOut", D);
        });
        return  this;
    },

	

    puff : function(o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            this.clearOpacity();
            this.show();

            
            var  r = this.getFxRestore();
            var  st = this.dom.style;

            var  C = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else {
                    el.hide();
                }


                el.clearOpacity();

                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;
                st.fontSize = '';
                el.afterFx(o);
            };

            var  D = this.getWidth();
            var  E = this.getHeight();

            arguments.callee.anim = this.fxanim({
                    width : {to: this.adjustWidth(D * 2)},
                    height : {to: this.adjustHeight(E * 2)},
                    points : {by: [-(D * .5), -(E * .5)]},
                    opacity : {to: 0},
                    fontSize: {to:200, unit: "%"}
                },
                o,
                'motion',
                .5,
                "easeOut", C);
        });
        return  this;
    },

	

    switchOff : function(o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            this.clearOpacity();
            this.clip();

            
            var  r = this.getFxRestore();
            var  st = this.dom.style;

            var  C = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else {
                    el.hide();
                }


                el.clearOpacity();
                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            this.fxanim({opacity:{to:0.3}}, null, null, .1, null, function(){
                this.clearOpacity();
                (function(){
                    this.fxanim({
                        height:{to:1},
                        points:{by:[0, this.getHeight() * .5]}
                    }, o, 'motion', 0.3, 'easeIn', C);
                }).defer(100, this);
            });
        });
        return  this;
    },

    
	
    highlight : function(C, o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            C = C || "ffff9c";
            attr = o.attr || "backgroundColor";

            this.clearOpacity();
            this.show();

            var  D = this.getColor(attr);
            var  E = this.dom.style[attr];
            endColor = (o.endColor || D) || "ffffff";

            var  F = function(){
                el.dom.style[attr] = E;
                el.afterFx(o);
            };

            var  a = {};
            a[attr] = {from: C, to: endColor};
            arguments.callee.anim = this.fxanim(a,
                o,
                'color',
                1,
                'easeIn', F);
        });
        return  this;
    },

   

    frame : function(D, E, o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            D = D || "#C3DAF9";
            if(D.length == 6){
                D = "#" + D;
            }

            E = E || 1;
            duration = o.duration || 1;
            this.show();

            var  b = this.getBox();
            var  F = function(){
                var  G = this.createProxy({

                     style:{
                        visbility:"hidden",
                        position:"absolute",
                        "z-index":"35000", 
                        border:"0px solid " + D
                     }
                  });
                var  H = Roo.isBorderBox ? 2 : 1;
                G.animate({
                    top:{from:b.y, to:b.y - 20},
                    left:{from:b.x, to:b.x - 20},
                    borderWidth:{from:0, to:10},
                    opacity:{from:1, to:0},
                    height:{from:b.height, to:(b.height + (20*H))},
                    width:{from:b.width, to:(b.width + (20*H))}
                }, duration, function(){
                    G.remove();
                });
                if(--E > 0){
                     F.defer((duration/2)*1000, this);
                }else {
                    el.afterFx(o);
                }
            };
            F.call(this);
        });
        return  this;
    },

   

    pause : function(F){
        var  el = this.getFxEl();
        var  o = {};

        el.queueFx(o, function(){
            setTimeout(function(){
                el.afterFx(o);
            }, F * 1000);
        });
        return  this;
    },

   

    fadeIn : function(o){
        var  el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            this.setOpacity(0);
            this.fixDisplay();
            this.dom.style.visibility = 'visible';
            var  to = o.endOpacity || 1;
            arguments.callee.anim = this.fxanim({opacity:{to:to}},
                o, null, .5, "easeOut", function(){
                if(to == 1){
                    this.clearOpacity();
                }

                el.afterFx(o);
            });
        });
        return  this;
    },

   

    fadeOut : function(o){
        var  el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            arguments.callee.anim = this.fxanim({opacity:{to:o.endOpacity || 0}},
                o, null, .5, "easeOut", function(){
                if(this.visibilityMode == Roo.Element.DISPLAY || o.useDisplay){
                     this.dom.style.display = "none";
                }else {
                     this.dom.style.visibility = "hidden";
                }

                this.clearOpacity();
                el.afterFx(o);
            });
        });
        return  this;
    },

   

    scale : function(w, h, o){
        this.shift(Roo.apply({}, o, {
            width: w,
            height: h
        }));
        return  this;
    },

   

    shift : function(o){
        var  el = this.getFxEl();
        o = o || {};
        el.queueFx(o, function(){
            var  a = {}, w = o.width, h = o.height, x = o.x, y = o.y,  op = o.opacity;
            if(w !== undefined){
                a.width = {to: this.adjustWidth(w)};
            }
            if(h !== undefined){
                a.height = {to: this.adjustHeight(h)};
            }
            if(x !== undefined || y !== undefined){
                a.points = {to: [
                    x !== undefined ? x : this.getX(),
                    y !== undefined ? y : this.getY()
                ]};
            }
            if(op !== undefined){
                a.opacity = {to: op};
            }
            if(o.xy !== undefined){
                a.points = {to: o.xy};
            }

            arguments.callee.anim = this.fxanim(a,
                o, 'motion', .35, "easeOut", function(){
                el.afterFx(o);
            });
        });
        return  this;
    },

	

    ghost : function(G, o){
        var  el = this.getFxEl();
        o = o || {};

        el.queueFx(o, function(){
            G = G || "b";

            
            var  r = this.getFxRestore();
            var  w = this.getWidth(),
                h = this.getHeight();

            var  st = this.dom.style;

            var  H = function(){
                if(o.useDisplay){
                    el.setDisplayed(false);
                }else {
                    el.hide();
                }


                el.clearOpacity();
                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;

                el.afterFx(o);
            };

            var  a = {opacity: {to: 0}, points: {}}, pt = a.points;
            switch(G.toLowerCase()){
                case  "t":
                    pt.by = [0, -h];
                break;
                case  "l":
                    pt.by = [-w, 0];
                break;
                case  "r":
                    pt.by = [w, 0];
                break;
                case  "b":
                    pt.by = [0, h];
                break;
                case  "tl":
                    pt.by = [-w, -h];
                break;
                case  "bl":
                    pt.by = [-w, h];
                break;
                case  "br":
                    pt.by = [w, h];
                break;
                case  "tr":
                    pt.by = [w, -h];
                break;
            }


            arguments.callee.anim = this.fxanim(a,
                o,
                'motion',
                .5,
                "easeOut", H);
        });
        return  this;
    },

	

    syncFx : function(){
        this.fxDefaults = Roo.apply(this.fxDefaults || {}, {
            block : false,
            concurrent : true,
            stopFx : false
        });
        return  this;
    },

	

    sequenceFx : function(){
        this.fxDefaults = Roo.apply(this.fxDefaults || {}, {
            block : false,
            concurrent : false,
            stopFx : false
        });
        return  this;
    },

	

    nextFx : function(){
        var  ef = this.fxQueue[0];
        if(ef){
            ef.call(this);
        }
    },

	

    hasActiveFx : function(){
        return  this.fxQueue && this.fxQueue[0];
    },

	

    stopFx : function(){
        if(this.hasActiveFx()){
            var  cur = this.fxQueue[0];
            if(cur && cur.anim && cur.anim.isAnimated()){
                this.fxQueue = [cur]; 
                cur.anim.stop(true);
            }
        }
        return  this;
    },

	

    beforeFx : function(o){
        if(this.hasActiveFx() && !o.concurrent){
           if(o.stopFx){
               this.stopFx();
               return  true;
           }
           return  false;
        }
        return  true;
    },

	

    hasFxBlock : function(){
        var  q = this.fxQueue;
        return  q && q[0] && q[0].block;
    },

	

    queueFx : function(o, fn){
        if(!this.fxQueue){
            this.fxQueue = [];
        }
        if(!this.hasFxBlock()){
            Roo.applyIf(o, this.fxDefaults);
            if(!o.concurrent){
                var  run = this.beforeFx(o);
                fn.block = o.block;
                this.fxQueue.push(fn);
                if(run){
                    this.nextFx();
                }
            }else {
                fn.call(this);
            }
        }
        return  this;
    },

	

    fxWrap : function(H, o, I){
        var  J;
        if(!o.wrap || !(J = Roo.get(o.wrap))){
            var  wrapXY;
            if(o.fixPosition){
                wrapXY = this.getXY();
            }
            var  div = document.createElement("div");
            div.style.visibility = I;
            J = Roo.get(this.dom.parentNode.insertBefore(div, this.dom));
            J.setPositioning(H);
            if(J.getStyle("position") == "static"){
                J.position("relative");
            }

            this.clearPositioning('auto');
            J.clip();
            J.dom.appendChild(this.dom);
            if(wrapXY){
                J.setXY(wrapXY);
            }
        }
        return  J;
    },

	

    fxUnwrap : function(K, L, o){
        this.clearPositioning();
        this.setPositioning(L);
        if(!o.wrap){
            K.dom.parentNode.insertBefore(this.dom, K.dom);
            K.remove();
        }
    },

	

    getFxRestore : function(){
        var  st = this.dom.style;
        return  {pos: this.getPositioning(), width: st.width, height : st.height};
    },

	

    afterFx : function(o){
        if(o.afterStyle){
            this.applyStyles(o.afterStyle);
        }
        if(o.afterCls){
            this.addClass(o.afterCls);
        }
        if(o.remove === true){
            this.remove();
        }

        Roo.callback(o.callback, o.scope, [this]);
        if(!o.concurrent){
            this.fxQueue.shift();
            this.nextFx();
        }
    },

	

    getFxEl : function(){ 
        return  Roo.get(this.dom);
    },

	

    fxanim : function(M, N, O, P, Q, cb){
        O = O || 'run';
        N = N || {};
        var  R = Roo.lib.Anim[O](
            this.dom, M,
            (N.duration || P) || .35,
            (N.easing || Q) || 'easeOut',
            function(){
                Roo.callback(cb, this);
            },
            this
        );
        N.anim = R;
        return  R;
    }
};


Roo.Fx.resize = Roo.Fx.scale;



Roo.apply(Roo.Element.prototype, Roo.Fx);






Roo.CompositeElement = function(A){
    this.elements = [];
    this.addElements(A);
};
Roo.CompositeElement.prototype = {
    isComposite: true,
    addElements : function(B){
        if(!B) return  this;
        if(typeof  B == "string"){
            B = Roo.Element.selectorFunction(B);
        }
        var  C = this.elements;
        var  D = C.length-1;
        for(var  i = 0, len = B.length; i < len; i++) {
        	C[++D] = Roo.get(B[i]);
        }
        return  this;
    },

    

    fill : function(E){
        this.elements = [];
        this.add(E);
        return  this;
    },

    

    filter : function(F){
        var  G = [];
        this.each(function(el){
            if(el.is(F)){
                G[G.length] = el.dom;
            }
        });
        this.fill(G);
        return  this;
    },

    invoke : function(fn, H){
        var  I = this.elements;
        for(var  i = 0, len = I.length; i < len; i++) {
        	Roo.Element.prototype[fn].apply(I[i], H);
        }
        return  this;
    },
    

    add : function(J){
        if(typeof  J == "string"){
            this.addElements(Roo.Element.selectorFunction(J));
        }else  if(J.length !== undefined){
            this.addElements(J);
        }else {
            this.addElements([J]);
        }
        return  this;
    },
    

    each : function(fn, K){
        var  L = this.elements;
        for(var  i = 0, len = L.length; i < len; i++){
            if(fn.call(K || L[i], L[i], this, i) === false) {
                break;
            }
        }
        return  this;
    },

    

    item : function(M){
        return  this.elements[M] || null;
    },

    

    first : function(){
        return  this.item(0);
    },

    

    last : function(){
        return  this.item(this.elements.length-1);
    },

    

    getCount : function(){
        return  this.elements.length;
    },

    

    contains : function(el){
        return  this.indexOf(el) !== -1;
    },

    

    indexOf : function(el){
        return  this.elements.indexOf(Roo.get(el));
    },


    

    removeElement : function(el, N){
        if(el  instanceof  Array){
            for(var  i = 0, len = el.length; i < len; i++){
                this.removeElement(el[i]);
            }
            return  this;
        }
        var  O = typeof  el == 'number' ? el : this.indexOf(el);
        if(O !== -1){
            if(N){
                var  d = this.elements[O];
                if(d.dom){
                    d.remove();
                }else {
                    d.parentNode.removeChild(d);
                }
            }

            this.elements.splice(O, 1);
        }
        return  this;
    },

    

    replaceElement : function(el, P, Q){
        var  R = typeof  el == 'number' ? el : this.indexOf(el);
        if(R !== -1){
            if(Q){
                this.elements[R].replaceWith(P);
            }else {
                this.elements.splice(R, 1, Roo.get(P))
            }
        }
        return  this;
    },

    

    clear : function(){
        this.elements = [];
    }
};
(function(){
    Roo.CompositeElement.createCall = function(S, T){
        if(!S[T]){
            S[T] = function(){
                return  this.invoke(T, arguments);
            };
        }
    };
    for(var  fnName  in  Roo.Element.prototype){
        if(typeof  Roo.Element.prototype[fnName] == "function"){
            Roo.CompositeElement.createCall(Roo.CompositeElement.prototype, fnName);
        }
    };
})();






Roo.CompositeElementLite = function(A){
    Roo.CompositeElementLite.superclass.constructor.call(this, A);
    this.el = new  Roo.Element.Flyweight();
};
Roo.extend(Roo.CompositeElementLite, Roo.CompositeElement, {
    addElements : function(B){
        if(B){
            if(B  instanceof  Array){
                this.elements = this.elements.concat(B);
            }else {
                var  yels = this.elements;
                var  index = yels.length-1;
                for(var  i = 0, len = B.length; i < len; i++) {
                    yels[++index] = B[i];
                }
            }
        }
        return  this;
    },
    invoke : function(fn, C){
        var  D = this.elements;
        var  el = this.el;
        for(var  i = 0, len = D.length; i < len; i++) {
            el.dom = D[i];
        	Roo.Element.prototype[fn].apply(el, C);
        }
        return  this;
    },
    

    item : function(E){
        if(!this.elements[E]){
            return  null;
        }

        this.el.dom = this.elements[E];
        return  this.el;
    },

    
    addListener : function(F, G, H, I){
        var  J = this.elements;
        for(var  i = 0, len = J.length; i < len; i++) {
            Roo.EventManager.on(J[i], F, G, H || J[i], I);
        }
        return  this;
    },

    

    each : function(fn, K){
        var  L = this.elements;
        var  el = this.el;
        for(var  i = 0, len = L.length; i < len; i++){
            el.dom = L[i];
        	if(fn.call(K || el, el, this, i) === false){
                break;
            }
        }
        return  this;
    },

    indexOf : function(el){
        return  this.elements.indexOf(Roo.getDom(el));
    },

    replaceElement : function(el, M, N){
        var  O = typeof  el == 'number' ? el : this.indexOf(el);
        if(O !== -1){
            M = Roo.getDom(M);
            if(N){
                var  d = this.elements[O];
                d.parentNode.insertBefore(M, d);
                d.parentNode.removeChild(d);
            }

            this.elements.splice(O, 1, M);
        }
        return  this;
    }
});
Roo.CompositeElementLite.prototype.on = Roo.CompositeElementLite.prototype.addListener;





 



Roo.data.Connection = function(A){
    Roo.apply(this, A);
    this.addEvents({
        

        "beforerequest" : true,
        

        "requestcomplete" : true,
        

        "requestexception" : true
    });
    Roo.data.Connection.superclass.constructor.call(this);
};

Roo.extend(Roo.data.Connection, Roo.util.Observable, {
    

    

    

    

    

    timeout : 30000,
    

    autoAbort:false,

    

    disableCaching: true,

    

    request : function(o){
        if(this.fireEvent("beforerequest", this, o) !== false){
            var  p = o.params;

            if(typeof  p == "function"){
                p = p.call(o.scope||window, o);
            }
            if(typeof  p == "object"){
                p = Roo.urlEncode(o.params);
            }
            if(this.extraParams){
                var  extras = Roo.urlEncode(this.extraParams);
                p = p ? (p + '&' + extras) : extras;
            }

            var  url = o.url || this.url;
            if(typeof  url == 'function'){
                url = url.call(o.scope||window, o);
            }

            if(o.form){
                var  form = Roo.getDom(o.form);
                url = url || form.action;

                var  enctype = form.getAttribute("enctype");
                if(o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')){
                    return  this.doFormUpload(o, p, url);
                }
                var  f = Roo.lib.Ajax.serializeForm(form);
                p = p ? (p + '&' + f) : f;
            }

            var  hs = o.headers;
            if(this.defaultHeaders){
                hs = Roo.apply(hs || {}, this.defaultHeaders);
                if(!o.headers){
                    o.headers = hs;
                }
            }

            var  cb = {
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {options: o},
                timeout : this.timeout
            };

            var  method = o.method||this.method||(p ? "POST" : "GET");

            if(method == 'GET' && (this.disableCaching && o.disableCaching !== false) || o.disableCaching === true){
                url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc=' + (new  Date().getTime());
            }

            if(typeof  o.autoAbort == 'boolean'){ 
                if(o.autoAbort){
                    this.abort();
                }
            }else  if(this.autoAbort !== false){
                this.abort();
            }

            if((method == 'GET' && p) || o.xmlData){
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
                p = '';
            }

            this.transId = Roo.lib.Ajax.request(method, url, cb, p, o);
            return  this.transId;
        }else {
            Roo.callback(o.callback, o.scope, [o, null, null]);
            return  null;
        }
    },

    

    isLoading : function(B){
        if(B){
            return  Roo.lib.Ajax.isCallInProgress(B);
        }else {
            return  this.transId ? true : false;
        }
    },

    

    abort : function(C){
        if(C || this.isLoading()){
            Roo.lib.Ajax.abort(C || this.transId);
        }
    },

    
    handleResponse : function(D){
        this.transId = false;
        var  E = D.argument.options;
        D.argument = E ? E.argument : null;
        this.fireEvent("requestcomplete", this, D, E);
        Roo.callback(E.success, E.scope, [D, E]);
        Roo.callback(E.callback, E.scope, [E, true, D]);
    },

    
    handleFailure : function(F, e){
        this.transId = false;
        var  G = F.argument.options;
        F.argument = G ? G.argument : null;
        this.fireEvent("requestexception", this, F, G, e);
        Roo.callback(G.failure, G.scope, [F, G]);
        Roo.callback(G.callback, G.scope, [G, false, F]);
    },

    
    doFormUpload : function(o, ps, H){
        var  id = Roo.id();
        var  I = document.createElement('iframe');
        I.id = id;
        I.name = id;
        I.className = 'x-hidden';
        if(Roo.isIE){
            I.src = Roo.SSL_SECURE_URL;
        }

        document.body.appendChild(I);

        if(Roo.isIE){
           document.frames[id].name = id;
        }

        var  J = Roo.getDom(o.form);
        J.target = id;
        J.method = 'POST';
        J.enctype = J.encoding = 'multipart/form-data';
        if(H){
            J.action = H;
        }

        var  K, hd;
        if(ps){ 
            K = [];
            ps = Roo.urlDecode(ps, false);
            for(var  k  in  ps){
                if(ps.hasOwnProperty(k)){
                    hd = document.createElement('input');
                    hd.type = 'hidden';
                    hd.name = k;
                    hd.value = ps[k];
                    J.appendChild(hd);
                    K.push(hd);
                }
            }
        }

        function  cb(){
            var  r = {  
                responseText : '',
                responseXML : null
            };

            r.argument = o ? o.argument : null;

            try { 
                var  doc;
                if(Roo.isIE){
                    doc = I.contentWindow.document;
                }else  {
                    doc = (I.contentDocument || window.frames[id].document);
                }
                if(doc && doc.body){
                    r.responseText = doc.body.innerHTML;
                }
                if(doc && doc.XMLDocument){
                    r.responseXML = doc.XMLDocument;
                }else  {
                    r.responseXML = doc;
                }
            }
            catch(e) {
                
            }


            Roo.EventManager.removeListener(I, 'load', cb, this);

            this.fireEvent("requestcomplete", this, r, o);
            Roo.callback(o.success, o.scope, [r, o]);
            Roo.callback(o.callback, o.scope, [o, true, r]);

            setTimeout(function(){document.body.removeChild(I);}, 100);
        }


        Roo.EventManager.on(I, 'load', cb, this);
        J.submit();

        if(K){ 
            for(var  i = 0, len = K.length; i < len; i++){
                J.removeChild(K[i]);
            }
        }
    }
});



Roo.Ajax = new  Roo.data.Connection({
    
   

    

    

    

    

    


    


    

    

    

    

    

    


    

    autoAbort : false,

    

    serializeForm : function(L){
        return  Roo.lib.Ajax.serializeForm(L);
    }
});


 


Roo.Ajax = new  Roo.data.Connection({
    
    
    

    
   

    

    

    

    

    


    


    

    

    

    

    

    


    

    autoAbort : false,

    

    serializeForm : function(A){
        return  Roo.lib.Ajax.serializeForm(A);
    }
});



 


Roo.UpdateManager = function(el, A){
    el = Roo.get(el);
    if(!A && el.updateManager){
        return  el.updateManager;
    }

    

    this.el = el;
    

    this.defaultUrl = null;

    this.addEvents({
        

        "beforeupdate": true,
        

        "update": true,
        

        "failure": true
    });
    var  d = Roo.UpdateManager.defaults;
    

    this.sslBlankUrl = d.sslBlankUrl;
    

    this.disableCaching = d.disableCaching;
    

    this.indicatorText = d.indicatorText;
    

    this.showLoadIndicator = d.showLoadIndicator;
    

    this.timeout = d.timeout;

    

    this.loadScripts = d.loadScripts;

    

    this.transaction = null;

    

    this.autoRefreshProcId = null;
    

    this.refreshDelegate = this.refresh.createDelegate(this);
    

    this.updateDelegate = this.update.createDelegate(this);
    

    this.formUpdateDelegate = this.formUpdate.createDelegate(this);
    

    this.successDelegate = this.processSuccess.createDelegate(this);
    

    this.failureDelegate = this.processFailure.createDelegate(this);

    if(!this.renderer){
     

    this.renderer = new  Roo.UpdateManager.BasicRenderer();
    }

    
    Roo.UpdateManager.superclass.constructor.call(this);
};

Roo.extend(Roo.UpdateManager, Roo.util.Observable, {
    

    getEl : function(){
        return  this.el;
    },
    

    update : function(B, C, D, E){
        if(this.fireEvent("beforeupdate", this.el, B, C) !== false){
            var  method = this.method, cfg;
            if(typeof  B == "object"){ 
                cfg = B;
                B = cfg.url;
                C = C || cfg.params;
                D = D || cfg.callback;
                E = E || cfg.discardUrl;
                if(D && cfg.scope){
                    D = D.createDelegate(cfg.scope);
                }
                if(typeof  cfg.method != "undefined"){method = cfg.method;};
                if(typeof  cfg.nocache != "undefined"){this.disableCaching = cfg.nocache;};
                if(typeof  cfg.text != "undefined"){this.indicatorText = '<div class="loading-indicator">'+cfg.text+"</div>";};
                if(typeof  cfg.scripts != "undefined"){this.loadScripts = cfg.scripts;};
                if(typeof  cfg.timeout != "undefined"){this.timeout = cfg.timeout;};
            }

            this.showLoading();
            if(!E){
                this.defaultUrl = B;
            }
            if(typeof  B == "function"){
                B = B.call(this);
            }


            method = method || (C ? "POST" : "GET");
            if(method == "GET"){
                B = this.prepareUrl(B);
            }

            var  o = Roo.apply(cfg ||{}, {
                url : B,
                params: C,
                success: this.successDelegate,
                failure: this.failureDelegate,
                callback: undefined,
                timeout: (this.timeout*1000),
                argument: {"url": B, "form": null, "callback": D, "params": C}
            });

            this.transaction = Roo.Ajax.request(o);
        }
    },

    

    formUpdate : function(F, G, H, I){
        if(this.fireEvent("beforeupdate", this.el, F, G) !== false){
            if(typeof  G == "function"){
                G = G.call(this);
            }

            F = Roo.getDom(F);
            this.transaction = Roo.Ajax.request({
                form: F,
                url:G,
                success: this.successDelegate,
                failure: this.failureDelegate,
                timeout: (this.timeout*1000),
                argument: {"url": G, "form": F, "callback": I, "reset": H}
            });
            this.showLoading.defer(1, this);
        }
    },

    

    refresh : function(J){
        if(this.defaultUrl == null){
            return;
        }

        this.update(this.defaultUrl, null, J, true);
    },

    

    startAutoRefresh : function(K, L, M, N, O){
        if(O){
            this.update(L || this.defaultUrl, M, N, true);
        }
        if(this.autoRefreshProcId){
            clearInterval(this.autoRefreshProcId);
        }

        this.autoRefreshProcId = setInterval(this.update.createDelegate(this, [L || this.defaultUrl, M, N, true]), K*1000);
    },

    

     stopAutoRefresh : function(){
        if(this.autoRefreshProcId){
            clearInterval(this.autoRefreshProcId);
            delete  this.autoRefreshProcId;
        }
    },

    isAutoRefreshing : function(){
       return  this.autoRefreshProcId ? true : false;
    },
    

    showLoading : function(){
        if(this.showLoadIndicator){
            this.el.update(this.indicatorText);
        }
    },

    

    prepareUrl : function(P){
        if(this.disableCaching){
            var  append = "_dc=" + (new  Date().getTime());
            if(P.indexOf("?") !== -1){
                P += "&" + append;
            }else {
                P += "?" + append;
            }
        }
        return  P;
    },

    

    processSuccess : function(Q){
        this.transaction = null;
        if(Q.argument.form && Q.argument.reset){
            try{ 
                Q.argument.form.reset();
            }catch(e){}
        }
        if(this.loadScripts){
            this.renderer.render(this.el, Q, this,
                this.updateComplete.createDelegate(this, [Q]));
        }else {
            this.renderer.render(this.el, Q, this);
            this.updateComplete(Q);
        }
    },

    updateComplete : function(R){
        this.fireEvent("update", this.el, R);
        if(typeof  R.argument.callback == "function"){
            R.argument.callback(this.el, true, R);
        }
    },

    

    processFailure : function(S){
        this.transaction = null;
        this.fireEvent("failure", this.el, S);
        if(typeof  S.argument.callback == "function"){
            S.argument.callback(this.el, false, S);
        }
    },

    

    setRenderer : function(T){
        this.renderer = T;
    },

    getRenderer : function(){
       return  this.renderer;
    },

    

    setDefaultUrl : function(U){
        this.defaultUrl = U;
    },

    

    abort : function(){
        if(this.transaction){
            Roo.Ajax.abort(this.transaction);
        }
    },

    

    isUpdating : function(){
        if(this.transaction){
            return  Roo.Ajax.isLoading(this.transaction);
        }
        return  false;
    }
});



   Roo.UpdateManager.defaults = {
       

         timeout : 30,

         

        loadScripts : false,

        

        sslBlankUrl : (Roo.SSL_SECURE_URL || "javascript:false"),
        

        disableCaching : false,
        

        showLoadIndicator : true,
        

        indicatorText : '<div class="loading-indicator">Loading...</div>'
   };



Roo.UpdateManager.updateElement = function(el, V, W, X){
    var  um = Roo.get(el, true).getUpdateManager();
    Roo.apply(um, X);
    um.update(V, W, X ? X.callback : null);
};

Roo.UpdateManager.update = Roo.UpdateManager.updateElement;


Roo.UpdateManager.BasicRenderer = function(){};

Roo.UpdateManager.BasicRenderer.prototype = {
    

     render : function(el, Y, Z, a){
        el.update(Y.responseText, Z.loadScripts, a);
    }
};






Roo.util.DelayedTask = function(fn, A, B){
    var  id = null, d, t;

    var  C = function(){
        var  D = new  Date().getTime();
        if(D - t >= d){
            clearInterval(id);
            id = null;
            fn.apply(A, B || []);
        }
    };
    

    this.delay = function(D, E, F, G){
        if(id && D != d){
            this.cancel();
        }

        d = D;
        t = new  Date().getTime();
        fn = E || fn;
        A = F || A;
        B = G || B;
        if(!id){
            id = setInterval(C, d);
        }
    };

    

    this.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};


 
 
Roo.util.TaskRunner = function(A){
    A = A || 10;
    var  B = [], C = [];
    var  id = 0;
    var  D = false;

    var  E = function(){
        D = false;
        clearInterval(id);
        id = 0;
    };

    var  F = function(){
        if(!D){
            D = true;
            id = setInterval(H, A);
        }
    };

    var  G = function(I){
        C.push(I);
        if(I.onStop){
            I.onStop();
        }
    };

    var  H = function(){
        if(C.length > 0){
            for(var  i = 0, len = C.length; i < len; i++){
                B.remove(C[i]);
            }

            C = [];
            if(B.length < 1){
                E();
                return;
            }
        }
        var  I = new  Date().getTime();
        for(var  i = 0, len = B.length; i < len; ++i){
            var  t = B[i];
            var  itime = I - t.taskRunTime;
            if(t.interval <= itime){
                var  rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
                t.taskRunTime = I;
                if(rt === false || t.taskRunCount === t.repeat){
                    G(t);
                    return;
                }
            }
            if(t.duration && t.duration <= (I - t.taskStartTime)){
                G(t);
            }
        }
    };

    

    this.start = function(I){
        B.push(I);
        I.taskStartTime = new  Date().getTime();
        I.taskRunTime = 0;
        I.taskRunCount = 0;
        F();
        return  I;
    };

    this.stop = function(I){
        G(I);
        return  I;
    };

    this.stopAll = function(){
        E();
        for(var  i = 0, len = B.length; i < len; i++){
            if(B[i].onStop){
                B[i].onStop();
            }
        }

        B = [];
        C = [];
    };
};

Roo.TaskMgr = new  Roo.util.TaskRunner();



 


Roo.util.MixedCollection = function(A, B){
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents({
        

        "clear" : true,
        

        "add" : true,
        

        "replace" : true,
        

        "remove" : true,
        "sort" : true
    });
    this.allowFunctions = A === true;
    if(B){
        this.getKey = B;
    }

    Roo.util.MixedCollection.superclass.constructor.call(this);
};

Roo.extend(Roo.util.MixedCollection, Roo.util.Observable, {
    allowFunctions : false,
    


    add : function(C, o){
        if(arguments.length == 1){
            o = arguments[0];
            C = this.getKey(o);
        }
        if(typeof  C == "undefined" || C === null){
            this.length++;
            this.items.push(o);
            this.keys.push(null);
        }else {
            var  old = this.map[C];
            if(old){
                return  this.replace(C, o);
            }

            this.length++;
            this.items.push(o);
            this.map[C] = o;
            this.keys.push(C);
        }

        this.fireEvent("add", this.length-1, o, C);
        return  o;
    },
   


    getKey : function(o){
         return  o.id; 
    },
   


    replace : function(D, o){
        if(arguments.length == 1){
            o = arguments[0];
            D = this.getKey(o);
        }
        var  E = this.item(D);
        if(typeof  D == "undefined" || D === null || typeof  E == "undefined"){
             return  this.add(D, o);
        }
        var  F = this.indexOfKey(D);
        this.items[F] = o;
        this.map[D] = o;
        this.fireEvent("replace", D, E, o);
        return  o;
    },
   


    addAll : function(G){
        if(arguments.length > 1 || G  instanceof  Array){
            var  args = arguments.length > 1 ? arguments : G;
            for(var  i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else {
            for(var  D  in  G){
                if(this.allowFunctions || typeof  G[D] != "function"){
                    this.add(D, G[D]);
                }
            }
        }
    },
   


    each : function(fn, H){
        var  I = [].concat(this.items); 
        for(var  i = 0, len = I.length; i < len; i++){
            if(fn.call(H || I[i], I[i], i, len) === false){
                break;
            }
        }
    },
   


    eachKey : function(fn, J){
        for(var  i = 0, len = this.keys.length; i < len; i++){
            fn.call(J || window, this.keys[i], this.items[i], i, len);
        }
    },
   


    find : function(fn, K){
        for(var  i = 0, len = this.items.length; i < len; i++){
            if(fn.call(K || window, this.items[i], this.keys[i])){
                return  this.items[i];
            }
        }
        return  null;
    },
   


    insert : function(L, M, o){
        if(arguments.length == 2){
            o = arguments[1];
            M = this.getKey(o);
        }
        if(L >= this.length){
            return  this.add(M, o);
        }

        this.length++;
        this.items.splice(L, 0, o);
        if(typeof  M != "undefined" && M != null){
            this.map[M] = o;
        }

        this.keys.splice(L, 0, M);
        this.fireEvent("add", L, o, M);
        return  o;
    },
   


    remove : function(o){
        return  this.removeAt(this.indexOf(o));
    },
   


    removeAt : function(N){
        if(N < this.length && N >= 0){
            this.length--;
            var  o = this.items[N];
            this.items.splice(N, 1);
            var  M = this.keys[N];
            if(typeof  M != "undefined"){
                delete  this.map[M];
            }

            this.keys.splice(N, 1);
            this.fireEvent("remove", o, M);
        }
    },
   


    removeKey : function(O){
        return  this.removeAt(this.indexOfKey(O));
    },
   


    getCount : function(){
        return  this.length; 
    },
   


    indexOf : function(o){
        if(!this.items.indexOf){
            for(var  i = 0, len = this.items.length; i < len; i++){
                if(this.items[i] == o) return  i;
            }
            return  -1;
        }else {
            return  this.items.indexOf(o);
        }
    },
   


    indexOfKey : function(P){
        if(!this.keys.indexOf){
            for(var  i = 0, len = this.keys.length; i < len; i++){
                if(this.keys[i] == P) return  i;
            }
            return  -1;
        }else {
            return  this.keys.indexOf(P);
        }
    },
   


    item : function(Q){
        var  R = typeof  this.map[Q] != "undefined" ? this.map[Q] : this.items[Q];
        return  typeof  R != 'function' || this.allowFunctions ? R : null; 
    },
    


    itemAt : function(S){
        return  this.items[S];
    },
    


    key : function(T){
        return  this.map[T];
    },
   


    contains : function(o){
        return  this.indexOf(o) != -1;
    },
   


    containsKey : function(U){
        return  typeof  this.map[U] != "undefined";
    },
   


    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent("clear");
    },
   


    first : function(){
        return  this.items[0]; 
    },
   


    last : function(){
        return  this.items[this.length-1];   
    },
    
    _sort : function(V, W, fn){
        var  X = String(W).toUpperCase() == "DESC" ? -1 : 1;
        fn = fn || function(a, b){
            return  a-b;
        };
        var  c = [], k = this.keys, Y = this.items;
        for(var  i = 0, len = Y.length; i < len; i++){
            c[c.length] = {key: k[i], value: Y[i], index: i};
        }

        c.sort(function(a, b){
            var  v = fn(a[V], b[V]) * X;
            if(v == 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return  v;
        });
        for(var  i = 0, len = c.length; i < len; i++){
            Y[i] = c[i].value;
            k[i] = c[i].key;
        }

        this.fireEvent("sort", this);
    },
    
    

    sort : function(Z, fn){
        this._sort("value", Z, fn);
    },
    
    

    keySort : function(a, fn){
        this._sort("key", a, fn || function(a, b){
            return  String(a).toUpperCase()-String(b).toUpperCase();
        });
    },
    
    

    getRange : function(b, d){
        var  e = this.items;
        if(e.length < 1){
            return  [];
        }

        b = b || 0;
        d = Math.min(typeof  d == "undefined" ? this.length-1 : d, this.length-1);
        var  r = [];
        if(b <= d){
            for(var  i = b; i <= d; i++) {
        	    r[r.length] = e[i];
            }
        }else {
            for(var  i = b; i >= d; i--) {
        	    r[r.length] = e[i];
            }
        }
        return  r;
    },
        
    

    filter : function(f, g){
        if(!g.exec){ 
            g = String(g);
            if(g.length == 0){
                return  this.clone();
            }

            g = new  RegExp("^" + Roo.escapeRe(g), "i");
        }
        return  this.filterBy(function(o){
            return  o && g.test(o[f]);
        });
	},
    
    

    filterBy : function(fn, h){
        var  r = new  Roo.util.MixedCollection();
        r.getKey = this.getKey;
        var  k = this.keys, it = this.items;
        for(var  i = 0, len = it.length; i < len; i++){
            if(fn.call(h||this, it[i], k[i])){
				r.add(k[i], it[i]);
			}
        }
        return  r;
    },
    
    

    clone : function(){
        var  r = new  Roo.util.MixedCollection();
        var  k = this.keys, it = this.items;
        for(var  i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }

        r.getKey = this.getKey;
        return  r;
    }
});


Roo.util.MixedCollection.prototype.get = Roo.util.MixedCollection.prototype.item;




Roo.util.JSON = new  (function(){
    var  useHasOwn = {}.hasOwnProperty ? true : false;
    
    
    
    
    var  pad = function(n) {
        return  n < 10 ? "0" + n : n;
    };
    
    var  m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };

    var  encodeString = function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return  '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var  c = m[b];
                if(c){
                    return  c;
                }

                c = b.charCodeAt();
                return  "\\u00" +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return  '"' + s + '"';
    };
    
    var  encodeArray = function(o){
        var  a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof  v) {
                    case  "undefined":
                    case  "function":
                    case  "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }

                        a.push(v === null ? "null" : Roo.util.JSON.encode(v));
                        b = true;
                }
            }

            a.push("]");
            return  a.join("");
    };
    
    var  encodeDate = function(o){
        return  '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };
    
    

    this.encode = function(o){
        if(typeof  o == "undefined" || o === null){
            return  "null";
        }else  if(o  instanceof  Array){
            return  encodeArray(o);
        }else  if(o  instanceof  Date){
            return  encodeDate(o);
        }else  if(typeof  o == "string"){
            return  encodeString(o);
        }else  if(typeof  o == "number"){
            return  isFinite(o) ? String(o) : "null";
        }else  if(typeof  o == "boolean"){
            return  String(o);
        }else  {
            var  a = ["{"], b, i, v;
            for (i  in  o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof  v) {
                    case  "undefined":
                    case  "function":
                    case  "unknown":
                        break;
                    default:
                        if(b){
                            a.push(',');
                        }

                        a.push(this.encode(i), ":",
                                v === null ? "null" : this.encode(v));
                        b = true;
                    }
                }
            }

            a.push("}");
            return  a.join("");
        }
    };
    
    

    this.decode = function(json){
        

        return  eval("(" + json + ')');
    };
})();


Roo.encode = Roo.util.JSON.encode;


Roo.decode = Roo.util.JSON.decode;



 


Roo.util.Format = function(){
    var  A = /^\s+|\s+$/g;
    return  {
        

        ellipsis : function(R, S){
            if(R && R.length > S){
                return  R.substr(0, S-3)+"...";
            }
            return  R;
        },

        

        undef : function(T){
            return  typeof  T != "undefined" ? T : "";
        },

        

        htmlEncode : function(U){
            return  !U ? U : String(U).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        

        htmlDecode : function(V){
            return  !V ? V : String(V).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
        },

        

        trim : function(W){
            return  String(W).replace(A, "");
        },

        

        substr : function(X, Y, Z){
            return  String(X).substr(Y, Z);
        },

        

        lowercase : function(a){
            return  String(a).toLowerCase();
        },

        

        uppercase : function(b){
            return  String(b).toUpperCase();
        },

        

        capitalize : function(c){
            return  !c ? c : c.charAt(0).toUpperCase() + c.substr(1).toLowerCase();
        },

        
        call : function(value, fn){
            if(arguments.length > 2){
                var  args = Array.prototype.slice.call(arguments, 2);
                args.unshift(value);
                 
                return  
  eval(fn).apply(window, args);
            }else {
                

                return  
 eval(fn).call(window, value);
            }
        },

        

        usMoney : function(v){
            v = (Math.round((v-0)*100))/100;
            v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
            v = String(v);
            var  ps = v.split('.');
            var  d = ps[0];
            var  e = ps[1] ? '.'+ ps[1] : '.00';
            var  r = /(\d+)(\d{3})/;
            while (r.test(d)) {
                d = d.replace(r, '$1' + ',' + '$2');
            }
            return  "$" + d + e ;
        },

        

        date : function(v, f){
            if(!v){
                return  "";
            }
            if(!(v  instanceof  Date)){
                v = new  Date(Date.parse(v));
            }
            return  v.dateFormat(f || "m/d/Y");
        },

        

        dateRenderer : function(g){
            return  function(v){
                return  Roo.util.Format.date(v, g);  
            };
        },

        
        stripTagsRE : /<\/?[^>]+>/gi,
        
        

        stripTags : function(v){
            return  !v ? v : String(v).replace(this.stripTagsRE, "");
        }
    };
}();




 



Roo.MasterTemplate = function(){
    Roo.MasterTemplate.superclass.constructor.apply(this, arguments);
    this.originalHtml = this.html;
    var  st = {};
    var  m, re = this.subTemplateRe;
    re.lastIndex = 0;
    var  A = 0;
    while(m = re.exec(this.html)){
        var  name = m[1], content = m[2];
        st[A] = {
            name: name,
            index: A,
            buffer: [],
            tpl : new  Roo.Template(content)
        };
        if(name){
            st[name] = st[A];
        }

        st[A].tpl.compile();
        st[A].tpl.call = this.call.createDelegate(this);
        A++;
    }

    this.subCount = A;
    this.subs = st;
};
Roo.extend(Roo.MasterTemplate, Roo.Template, {
    

    subTemplateRe : /<tpl(?:\sname="([\w-]+)")?>((?:.|\n)*?)<\/tpl>/gi,

    

     add : function(B, C){
        if(arguments.length == 1){
            C = arguments[0];
            B = 0;
        }
        var  s = this.subs[B];
        s.buffer[s.buffer.length] = s.tpl.apply(C);
        return  this;
    },

    

    fill : function(D, E, F){
        var  a = arguments;
        if(a.length == 1 || (a.length == 2 && typeof  a[1] == "boolean")){
            E = a[0];
            D = 0;
            F = a[1];
        }
        if(F){
            this.reset();
        }
        for(var  i = 0, len = E.length; i < len; i++){
            this.add(D, E[i]);
        }
        return  this;
    },

    

     reset : function(){
        var  s = this.subs;
        for(var  i = 0; i < this.subCount; i++){
            s[i].buffer = [];
        }
        return  this;
    },

    applyTemplate : function(G){
        var  s = this.subs;
        var  H = -1;
        this.html = this.originalHtml.replace(this.subTemplateRe, function(m, I){
            return  s[++H].buffer.join("");
        });
        return  Roo.MasterTemplate.superclass.applyTemplate.call(this, G);
    },

    apply : function(){
        return  this.applyTemplate.apply(this, arguments);
    },

    compile : function(){return  this;}
});



Roo.MasterTemplate.prototype.addAll = Roo.MasterTemplate.prototype.fill;
 

Roo.MasterTemplate.from = function(el, I){
    el = Roo.getDom(el);
    return  new  Roo.MasterTemplate(el.value || el.innerHTML, I || '');
};



 


Roo.util.CSS = function(){
	var  A = null;
   	var  B = document;

    var  C = /(-[a-z])/gi;
    var  D = function(m, a){ return  a.charAt(1).toUpperCase(); };

   return  {
   

   createStyleSheet : function(P, id){
       var  ss;
       var  Q = B.getElementsByTagName("head")[0];
       var  R = B.createElement("style");
       R.setAttribute("type", "text/css");
       if(id){
           R.setAttribute("id", id);
       }
       if(Roo.isIE){
           Q.appendChild(R);
           ss = R.styleSheet;
           ss.cssText = P;
       }else {
           try{
                R.appendChild(B.createTextNode(P));
           }catch(e){
               R.cssText = P; 
           }

           Q.appendChild(R);
           ss = R.styleSheet ? R.styleSheet : (R.sheet || B.styleSheets[B.styleSheets.length-1]);
       }

       this.cacheStyleSheet(ss);
       return  ss;
   },

   

   removeStyleSheet : function(id){
       var  S = B.getElementById(id);
       if(S){
           S.parentNode.removeChild(S);
       }
   },

   

   swapStyleSheet : function(id, T){
       this.removeStyleSheet(id);
       var  ss = B.createElement("link");
       ss.setAttribute("rel", "stylesheet");
       ss.setAttribute("type", "text/css");
       ss.setAttribute("id", id);
       ss.setAttribute("href", T);
       B.getElementsByTagName("head")[0].appendChild(ss);
   },
   
   

   refreshCache : function(){
       return  this.getRules(true);
   },

   
   cacheStyleSheet : function(ss){
       if(!R){
           R = {};
       }
       try{
           var  ssRules = ss.cssRules || ss.rules;
           for(var  j = ssRules.length-1; j >= 0; --j){
               R[ssRules[j].selectorText] = ssRules[j];
           }
       }catch(e){}
   },
   
   

   getRules : function(U){
   		if(R == null || U){
   			R = {};
   			var  ds = B.styleSheets;
   			for(var  i =0, len = ds.length; i < len; i++){
   			    try{
    		        this.cacheStyleSheet(ds[i]);
    		    }catch(e){} 
	        }
   		}
   		return  R;
   	},
   	
   	

   getRule : function(V, W){
   		var  rs = this.getRules(W);
   		if(!(V  instanceof  Array)){
   		    return  rs[V];
   		}
   		for(var  i = 0; i < V.length; i++){
			if(rs[V[i]]){
				return  rs[V[i]];
			}
		}
		return  null;
   	},
   	
   	
   	

   updateRule : function(X, Y, Z){
   		if(!(X  instanceof  Array)){
   			var  rule = this.getRule(X);
   			if(rule){
   				rule.style[Y.replace(C, D)] = Z;
   				return  true;
   			}
   		}else {
   			for(var  i = 0; i < X.length; i++){
   				if(this.updateRule(X[i], Y, Z)){
   					return  true;
   				}
   			}
   		}
   		return  false;
   	}
   };	
}();



 



Roo.util.ClickRepeater = function(el, A)
{
    this.el = Roo.get(el);
    this.el.unselectable();

    Roo.apply(this, A);

    this.addEvents({
    

        "mousedown" : true,
    

        "click" : true,
    

        "mouseup" : true
    });

    this.el.on("mousedown", this.handleMouseDown, this);
    if(this.preventDefault || this.stopDefault){
        this.el.on("click", function(e){
            if(this.preventDefault){
                e.preventDefault();
            }
            if(this.stopDefault){
                e.stopEvent();
            }
        }, this);
    }

    
    if(this.handler){
        this.on("click", this.handler,  this.scope || this);
    }


    Roo.util.ClickRepeater.superclass.constructor.call(this);
};

Roo.extend(Roo.util.ClickRepeater, Roo.util.Observable, {
    interval : 20,
    delay: 250,
    preventDefault : true,
    stopDefault : false,
    timer : 0,

    
    handleMouseDown : function(){
        clearTimeout(this.timer);
        this.el.blur();
        if(this.pressClass){
            this.el.addClass(this.pressClass);
        }

        this.mousedownTime = new  Date();

        Roo.get(document).on("mouseup", this.handleMouseUp, this);
        this.el.on("mouseout", this.handleMouseOut, this);

        this.fireEvent("mousedown", this);
        this.fireEvent("click", this);
        
        this.timer = this.click.defer(this.delay || this.interval, this);
    },

    
    click : function(){
        this.fireEvent("click", this);
        this.timer = this.click.defer(this.getInterval(), this);
    },

    
    getInterval: function(){
        if(!this.accelerate){
            return  this.interval;
        }
        var  B = this.mousedownTime.getElapsed();
        if(B < 500){
            return  400;
        }else  if(B < 1700){
            return  320;
        }else  if(B < 2600){
            return  250;
        }else  if(B < 3500){
            return  180;
        }else  if(B < 4400){
            return  140;
        }else  if(B < 5300){
            return  80;
        }else  if(B < 6200){
            return  50;
        }else {
            return  10;
        }
    },

    
    handleMouseOut : function(){
        clearTimeout(this.timer);
        if(this.pressClass){
            this.el.removeClass(this.pressClass);
        }

        this.el.on("mouseover", this.handleMouseReturn, this);
    },

    
    handleMouseReturn : function(){
        this.el.un("mouseover", this.handleMouseReturn);
        if(this.pressClass){
            this.el.addClass(this.pressClass);
        }

        this.click();
    },

    
    handleMouseUp : function(){
        clearTimeout(this.timer);
        this.el.un("mouseover", this.handleMouseReturn);
        this.el.un("mouseout", this.handleMouseOut);
        Roo.get(document).un("mouseup", this.handleMouseUp);
        this.el.removeClass(this.pressClass);
        this.fireEvent("mouseup", this);
    }
});



 


Roo.KeyNav = function(el, A){
    this.el = Roo.get(el);
    Roo.apply(this, A);
    if(!this.disabled){
        this.disabled = true;
        this.enable();
    }
};

Roo.KeyNav.prototype = {
    

    disabled : false,
    

    defaultEventAction: "stopEvent",
    

    forceKeyDown : false,

    
    prepareEvent : function(e){
        var  k = e.getKey();
        var  h = this.keyToHandler[k];
        
        
        
        if(Roo.isSafari && h && k >= 37 && k <= 40){
            e.stopEvent();
        }
    },

    
    relay : function(e){
        var  k = e.getKey();
        var  h = this.keyToHandler[k];
        if(h && this[h]){
            if(this.doRelay(e, this[h], h) !== true){
                e[this.defaultEventAction]();
            }
        }
    },

    
    doRelay : function(e, h, B){
        return  h.call(this.scope || this, e);
    },

    
    enter : false,
    left : false,
    right : false,
    up : false,
    down : false,
    tab : false,
    esc : false,
    pageUp : false,
    pageDown : false,
    del : false,
    home : false,
    end : false,

    
    keyToHandler : {
        37 : "left",
        39 : "right",
        38 : "up",
        40 : "down",
        33 : "pageUp",
        34 : "pageDown",
        46 : "del",
        36 : "home",
        35 : "end",
        13 : "enter",
        27 : "esc",
        9  : "tab"
    },

	

	enable: function(){
		if(this.disabled){
            
            
            if(this.forceKeyDown || Roo.isIE || Roo.isAir){
                this.el.on("keydown", this.relay,  this);
            }else {
                this.el.on("keydown", this.prepareEvent,  this);
                this.el.on("keypress", this.relay,  this);
            }

		    this.disabled = false;
		}
	},

	

	disable: function(){
		if(!this.disabled){
		    if(this.forceKeyDown || Roo.isIE || Roo.isAir){
                this.el.un("keydown", this.relay);
            }else {
                this.el.un("keydown", this.prepareEvent);
                this.el.un("keypress", this.relay);
            }

		    this.disabled = true;
		}
	}
};



 


Roo.KeyMap = function(el, A, B){
    this.el  = Roo.get(el);
    this.eventName = B || "keydown";
    this.bindings = [];
    if(A){
        this.addBinding(A);
    }

    this.enable();
};

Roo.KeyMap.prototype = {
    

    stopEvent : false,

    

	addBinding : function(C){
        if(C  instanceof  Array){
            for(var  i = 0, len = C.length; i < len; i++){
                this.addBinding(C[i]);
            }
            return;
        }
        var  D = C.key,
            E = C.shift, 
            F = C.ctrl, 
            G = C.alt,
            fn = C.fn,
            H = C.scope;
        if(typeof  D == "string"){
            var  ks = [];
            var  keyString = D.toUpperCase();
            for(var  j = 0, len = keyString.length; j < len; j++){
                ks.push(keyString.charCodeAt(j));
            }

            D = ks;
        }
        var  I = D  instanceof  Array;
        var  J = function(e){
            if((!E || e.shiftKey) && (!F || e.ctrlKey) &&  (!G || e.altKey)){
                var  k = e.getKey();
                if(I){
                    for(var  i = 0, len = D.length; i < len; i++){
                        if(D[i] == k){
                          if(this.stopEvent){
                              e.stopEvent();
                          }

                          fn.call(H || window, k, e);
                          return;
                        }
                    }
                }else {
                    if(k == D){
                        if(this.stopEvent){
                           e.stopEvent();
                        }

                        fn.call(H || window, k, e);
                    }
                }
            }
        };
        this.bindings.push(J);  
	},

    

    on : function(K, fn, L){
        var  M, N, O, P;
        if(typeof  K == "object" && !(K  instanceof  Array)){
            M = K.key;
            N = K.shift;
            O = K.ctrl;
            P = K.alt;
        }else {
            M = K;
        }

        this.addBinding({
            key: M,
            shift: N,
            ctrl: O,
            alt: P,
            fn: fn,
            scope: L
        })
    },

    
    handleKeyDown : function(e){
	    if(this.enabled){ 
    	    var  b = this.bindings;
    	    for(var  i = 0, len = b.length; i < len; i++){
    	        b[i].call(this, e);
    	    }
	    }
	},
	
	

	isEnabled : function(){
	    return  this.enabled;  
	},
	
	

	enable: function(){
		if(!this.enabled){
		    this.el.on(this.eventName, this.handleKeyDown, this);
		    this.enabled = true;
		}
	},

	

	disable: function(){
		if(this.enabled){
		    this.el.removeListener(this.eventName, this.handleKeyDown, this);
		    this.enabled = false;
		}
	}
};



 


Roo.util.TextMetrics = function(){
    var  A;
    return  {
        

        measure : function(el, E, F){
            if(!A){
                A = Roo.util.TextMetrics.Instance(el, F);
            }

            A.bind(el);
            A.setFixedWidth(F || 'auto');
            return  A.getSize(E);
        },

        

        createInstance : function(el, G){
            return  Roo.util.TextMetrics.Instance(el, G);
        }
    };
}();

 

Roo.util.TextMetrics.Instance = function(B, C){
    var  ml = new  Roo.Element(document.createElement('div'));
    document.body.appendChild(ml.dom);
    ml.position('absolute');
    ml.setLeftTop(-1000, -1000);
    ml.hide();

    if(C){
        ml.setWidth(C);
    }
     
    var  D = {
        

        getSize : function(E){
            ml.update(E);
            var  s = ml.getSize();
            ml.update('');
            return  s;
        },

        

        bind : function(el){
            ml.setStyle(
                Roo.fly(el).getStyles('font-size','font-style', 'font-weight', 'font-family','line-height')
            );
        },

        

        setFixedWidth : function(F){
            ml.setWidth(F);
        },

        

        getWidth : function(G){
            ml.dom.style.width = 'auto';
            return  this.getSize(G).width;
        },

        

        getHeight : function(H){
            return  this.getSize(H).height;
        }
    };

    D.bind(B);

    return  D;
};


Roo.Element.measureText = Roo.util.TextMetrics.measure;





Roo.state.Provider = function(){
    

    this.addEvents({
        "statechange": true
    });
    this.state = {};
    Roo.state.Provider.superclass.constructor.call(this);
};
Roo.extend(Roo.state.Provider, Roo.util.Observable, {
    

    get : function(A, B){
        return  typeof  this.state[A] == "undefined" ?
            B : this.state[A];
    },
    
    

    clear : function(C){
        delete  this.state[C];
        this.fireEvent("statechange", this, C, null);
    },
    
    

    set : function(D, E){
        this.state[D] = E;
        this.fireEvent("statechange", this, D, E);
    },
    
    

    decodeValue : function(F){
        var  re = /^(a|n|d|b|s|o)\:(.*)$/;
        var  G = re.exec(unescape(F));
        if(!G || !G[1]) return; 
        var  H = G[1];
        var  v = G[2];
        switch(H){
            case  "n":
                return  parseFloat(v);
            case  "d":
                return  new  Date(Date.parse(v));
            case  "b":
                return  (v == "1");
            case  "a":
                var  all = [];
                var  values = v.split("^");
                for(var  i = 0, len = values.length; i < len; i++){
                    all.push(this.decodeValue(values[i]));
                }
                return  all;
           case  "o":
                var  all = {};
                var  values = v.split("^");
                for(var  i = 0, len = values.length; i < len; i++){
                    var  kv = values[i].split("=");
                    all[kv[0]] = this.decodeValue(kv[1]);
                }
                return  all;
           default:
                return  v;
        }
    },
    
    

    encodeValue : function(v){
        var  I;
        if(typeof  v == "number"){
            I = "n:" + v;
        }else  if(typeof  v == "boolean"){
            I = "b:" + (v ? "1" : "0");
        }else  if(v  instanceof  Date){
            I = "d:" + v.toGMTString();
        }else  if(v  instanceof  Array){
            var  flat = "";
            for(var  i = 0, len = v.length; i < len; i++){
                flat += this.encodeValue(v[i]);
                if(i != len-1) flat += "^";
            }

            I = "a:" + flat;
        }else  if(typeof  v == "object"){
            var  flat = "";
            for(var  key  in  v){
                if(typeof  v[key] != "function"){
                    flat += key + "=" + this.encodeValue(v[key]) + "^";
                }
            }

            I = "o:" + flat.substring(0, flat.length-1);
        }else {
            I = "s:" + v;
        }
        return  escape(I);        
    }
});






Roo.state.Manager = function(){
    var  A = new  Roo.state.Provider();
    
    return  {
        

        setProvider : function(H){
            A = H;
        },
        
        

        get : function(I, J){
            return  A.get(I, J);
        },
        
        

         set : function(K, L){
            A.set(K, L);
        },
        
        

        clear : function(M){
            A.clear(M);
        },
        
        

        getProvider : function(){
            return  A;
        }
    };
}();





Roo.state.CookieProvider = function(A){
    Roo.state.CookieProvider.superclass.constructor.call(this);
    this.path = "/";
    this.expires = new  Date(new  Date().getTime()+(1000*60*60*24*7)); 
    this.domain = null;
    this.secure = false;
    Roo.apply(this, A);
    this.state = this.readCookies();
};

Roo.extend(Roo.state.CookieProvider, Roo.state.Provider, {
    
    set : function(B, C){
        if(typeof  C == "undefined" || C === null){
            this.clear(B);
            return;
        }

        this.setCookie(B, C);
        Roo.state.CookieProvider.superclass.set.call(this, B, C);
    },

    
    clear : function(D){
        this.clearCookie(D);
        Roo.state.CookieProvider.superclass.clear.call(this, D);
    },

    
    readCookies : function(){
        var  E = {};
        var  c = document.cookie + ";";
        var  re = /\s?(.*?)=(.*?);/g;
    	var  F;
    	while((F = re.exec(c)) != null){
            var  D = F[1];
            var  C = F[2];
            if(D && D.substring(0,3) == "ys-"){
                E[D.substr(3)] = this.decodeValue(C);
            }
        }
        return  E;
    },

    
    setCookie : function(G, H){
        document.cookie = "ys-"+ G + "=" + this.encodeValue(H) +
           ((this.expires == null) ? "" : ("; expires=" + this.expires.toGMTString())) +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    },

    
    clearCookie : function(I){
        document.cookie = "ys-" + I + "=null; expires=Thu, 01-Jan-70 00:00:01 GMT" +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    }
});








(function() {

var  A=Roo.EventManager;
var  B=Roo.lib.Dom;



Roo.dd.DragDrop = function(id, C, D) {
    if (id) {
        this.init(id, C, D);
    }
};

Roo.dd.DragDrop.prototype = {

    

    id: null,

    

    config: null,

    

    dragElId: null,

    

    handleElId: null,

    

    invalidHandleTypes: null,

    

    invalidHandleIds: null,

    

    invalidHandleClasses: null,

    

    startPageX: 0,

    

    startPageY: 0,

    

    groups: null,

    

    locked: false,

    

    lock: function() { this.locked = true; },

    

    unlock: function() { this.locked = false; },

    

    isTarget: true,

    

    padding: null,

    

    _domRef: null,

    

    __ygDragDrop: true,

    

    constrainX: false,

    

    constrainY: false,

    

    minX: 0,

    

    maxX: 0,

    

    minY: 0,

    

    maxY: 0,

    

    maintainOffset: false,

    

    xTicks: null,

    

    yTicks: null,

    

    primaryButtonOnly: true,

    

    available: false,

    

    hasOuterHandles: false,

    

    b4StartDrag: function(x, y) { },

    

    startDrag: function(x, y) { 
 },

    

    b4Drag: function(e) { },

    

    onDrag: function(e) { 
 },

    

    onDragEnter: function(e, id) { 
 },

    

    b4DragOver: function(e) { },

    

    onDragOver: function(e, id) { 
 },

    

    b4DragOut: function(e) { },

    

    onDragOut: function(e, id) { 
 },

    

    b4DragDrop: function(e) { },

    

    onDragDrop: function(e, id) { 
 },

    

    onInvalidDrop: function(e) { 
 },

    

    b4EndDrag: function(e) { },

    

    endDrag: function(e) { 
 },

    

    b4MouseDown: function(e) {  },

    

    onMouseDown: function(e) { 
 },

    

    onMouseUp: function(e) { 
 },

    

    onAvailable: function () {
    },

    

    defaultPadding : {left:0, right:0, top:0, bottom:0},

    

    constrainTo : function(C, D, E){
        if(typeof  D == "number"){
            D = {left: D, right:D, top:D, bottom:D};
        }

        D = D || this.defaultPadding;
        var  b = Roo.get(this.getEl()).getBox();
        var  ce = Roo.get(C);
        var  s = ce.getScroll();
        var  c, cd = ce.dom;
        if(cd == document.body){
            c = { x: s.left, y: s.top, width: Roo.lib.Dom.getViewWidth(), height: Roo.lib.Dom.getViewHeight()};
        }else {
            xy = ce.getXY();
            c = {x : xy[0]+s.left, y: xy[1]+s.top, width: cd.clientWidth, height: cd.clientHeight};
        }


        var  F = b.y - c.y;
        var  G = b.x - c.x;

        this.resetConstraints();
        this.setXConstraint(G - (D.left||0), 
                c.width - G - b.width - (D.right||0) 
        );
        this.setYConstraint(F - (D.top||0), 
                c.height - F - b.height - (D.bottom||0) 
        );
    },

    

    getEl: function() {
        if (!this._domRef) {
            this._domRef = Roo.getDom(this.id);
        }

        return  this._domRef;
    },

    

    getDragEl: function() {
        return  Roo.getDom(this.dragElId);
    },

    

    init: function(id, H, I) {
        this.initTarget(id, H, I);
        A.on(this.id, "mousedown", this.handleMouseDown, this);
        
    },

    

    initTarget: function(id, J, K) {

        
        this.config = K || {};

        
        this.DDM = Roo.dd.DDM;
        
        this.groups = {};

        
        
        if (typeof  id !== "string") {
            id = Roo.id(id);
        }


        
        this.id = id;

        
        this.addToGroup((J) ? J : "default");

        
        
        this.handleElId = id;

        
        this.setDragElId(id);

        
        this.invalidHandleTypes = { A: "A" };
        this.invalidHandleIds = {};
        this.invalidHandleClasses = [];

        this.applyConfig();

        this.handleOnAvailable();
    },

    

    applyConfig: function() {

        
        
        this.padding           = this.config.padding || [0, 0, 0, 0];
        this.isTarget          = (this.config.isTarget !== false);
        this.maintainOffset    = (this.config.maintainOffset);
        this.primaryButtonOnly = (this.config.primaryButtonOnly !== false);

    },

    

    handleOnAvailable: function() {
        this.available = true;
        this.resetConstraints();
        this.onAvailable();
    },

     

    setPadding: function(L, M, N, O) {
        
        if (!M && 0 !== M) {
            this.padding = [L, L, L, L];
        } else  if (!N && 0 !== N) {
            this.padding = [L, M, L, M];
        } else  {
            this.padding = [L, M, N, O];
        }
    },

    

    setInitPosition: function(P, Q) {
        var  el = this.getEl();

        if (!this.DDM.verifyEl(el)) {
            return;
        }

        var  dx = P || 0;
        var  dy = Q || 0;

        var  p = B.getXY( el );

        this.initPageX = p[0] - dx;
        this.initPageY = p[1] - dy;

        this.lastPageX = p[0];
        this.lastPageY = p[1];


        this.setStartPosition(p);
    },

    

    setStartPosition: function(R) {
        var  p = R || B.getXY( this.getEl() );
        this.deltaSetXY = null;

        this.startPageX = p[0];
        this.startPageY = p[1];
    },

    

    addToGroup: function(S) {
        this.groups[S] = true;
        this.DDM.regDragDrop(this, S);
    },

    

    removeFromGroup: function(T) {
        if (this.groups[T]) {
            delete  this.groups[T];
        }


        this.DDM.removeDDFromGroup(this, T);
    },

    

    setDragElId: function(id) {
        this.dragElId = id;
    },

    

    setHandleElId: function(id) {
        if (typeof  id !== "string") {
            id = Roo.id(id);
        }

        this.handleElId = id;
        this.DDM.regHandle(this.id, id);
    },

    

    setOuterHandleElId: function(id) {
        if (typeof  id !== "string") {
            id = Roo.id(id);
        }

        A.on(id, "mousedown",
                this.handleMouseDown, this);
        this.setHandleElId(id);

        this.hasOuterHandles = true;
    },

    

    unreg: function() {
        A.un(this.id, "mousedown",
                this.handleMouseDown);
        this._domRef = null;
        this.DDM._remove(this);
    },

    destroy : function(){
        this.unreg();
    },

    

    isLocked: function() {
        return  (this.DDM.isLocked() || this.locked);
    },

    

    handleMouseDown: function(e, U){
        if (this.primaryButtonOnly && e.button != 0) {
            return;
        }

        if (this.isLocked()) {
            return;
        }


        this.DDM.refreshCache(this.groups);

        var  pt = new  Roo.lib.Point(Roo.lib.Event.getPageX(e), Roo.lib.Event.getPageY(e));
        if (!this.hasOuterHandles && !this.DDM.isOverTarget(pt, this) )  {
        } else  {
            if (this.clickValidator(e)) {

                
                this.setStartPosition();


                this.b4MouseDown(e);
                this.onMouseDown(e);

                this.DDM.handleMouseDown(e, this);

                this.DDM.stopEvent(e);
            } else  {


            }
        }
    },

    clickValidator: function(e) {
        var  V = e.getTarget();
        return  ( this.isValidHandleChild(V) &&
                    (this.id == this.handleElId ||
                        this.DDM.handleWasClicked(V, this.id)) );
    },

    

    addInvalidHandleType: function(W) {
        var  X = W.toUpperCase();
        this.invalidHandleTypes[X] = X;
    },

    

    addInvalidHandleId: function(id) {
        if (typeof  id !== "string") {
            id = Roo.id(id);
        }

        this.invalidHandleIds[id] = id;
    },

    

    addInvalidHandleClass: function(Y) {
        this.invalidHandleClasses.push(Y);
    },

    

    removeInvalidHandleType: function(Z) {
        var  a = Z.toUpperCase();
        
        delete  this.invalidHandleTypes[a];
    },

    

    removeInvalidHandleId: function(id) {
        if (typeof  id !== "string") {
            id = Roo.id(id);
        }
        delete  this.invalidHandleIds[id];
    },

    

    removeInvalidHandleClass: function(d) {
        for (var  i=0, len=this.invalidHandleClasses.length; i<len; ++i) {
            if (this.invalidHandleClasses[i] == d) {
                delete  this.invalidHandleClasses[i];
            }
        }
    },

    

    isValidHandleChild: function(f) {

        var  g = true;
        
        var  h;
        try {
            h = f.nodeName.toUpperCase();
        } catch(e) {
            nodeName = node.nodeName;
        }

        g = g && !this.invalidHandleTypes[h];
        g = g && !this.invalidHandleIds[f.id];

        for (var  i=0, len=this.invalidHandleClasses.length; g && i<len; ++i) {
            g = !B.hasClass(f, this.invalidHandleClasses[i]);
        }


        return  g;

    },

    

    setXTicks: function(j, k) {
        this.xTicks = [];
        this.xTickSize = k;

        var  l = {};

        for (var  i = this.initPageX; i >= this.minX; i = i - k) {
            if (!l[i]) {
                this.xTicks[this.xTicks.length] = i;
                l[i] = true;
            }
        }

        for (i = this.initPageX; i <= this.maxX; i = i + k) {
            if (!l[i]) {
                this.xTicks[this.xTicks.length] = i;
                l[i] = true;
            }
        }


        this.xTicks.sort(this.DDM.numericSort) ;
    },

    

    setYTicks: function(m, n) {
        this.yTicks = [];
        this.yTickSize = n;

        var  o = {};

        for (var  i = this.initPageY; i >= this.minY; i = i - n) {
            if (!o[i]) {
                this.yTicks[this.yTicks.length] = i;
                o[i] = true;
            }
        }

        for (i = this.initPageY; i <= this.maxY; i = i + n) {
            if (!o[i]) {
                this.yTicks[this.yTicks.length] = i;
                o[i] = true;
            }
        }


        this.yTicks.sort(this.DDM.numericSort) ;
    },

    

    setXConstraint: function(q, r, t) {
        this.leftConstraint = q;
        this.rightConstraint = r;

        this.minX = this.initPageX - q;
        this.maxX = this.initPageX + r;
        if (t) { this.setXTicks(this.initPageX, t); }


        this.constrainX = true;
    },

    

    clearConstraints: function() {
        this.constrainX = false;
        this.constrainY = false;
        this.clearTicks();
    },

    

    clearTicks: function() {
        this.xTicks = null;
        this.yTicks = null;
        this.xTickSize = 0;
        this.yTickSize = 0;
    },

    

    setYConstraint: function(u, v, w) {
        this.topConstraint = u;
        this.bottomConstraint = v;

        this.minY = this.initPageY - u;
        this.maxY = this.initPageY + v;
        if (w) { this.setYTicks(this.initPageY, w); }


        this.constrainY = true;

    },

    

    resetConstraints: function() {


        
        if (this.initPageX || this.initPageX === 0) {
            
            var  dx = (this.maintainOffset) ? this.lastPageX - this.initPageX : 0;
            var  dy = (this.maintainOffset) ? this.lastPageY - this.initPageY : 0;

            this.setInitPosition(dx, dy);

        
        } else  {
            this.setInitPosition();
        }

        if (this.constrainX) {
            this.setXConstraint( this.leftConstraint,
                                 this.rightConstraint,
                                 this.xTickSize        );
        }

        if (this.constrainY) {
            this.setYConstraint( this.topConstraint,
                                 this.bottomConstraint,
                                 this.yTickSize         );
        }
    },

    

    getTick: function(z, AA) {

        if (!AA) {
            
            
            return  z;
        } else  if (AA[0] >= z) {
            
            
            return  AA[0];
        } else  {
            for (var  i=0, len=AA.length; i<len; ++i) {
                var  next = i + 1;
                if (AA[next] && AA[next] >= z) {
                    var  diff1 = z - AA[i];
                    var  diff2 = AA[next] - z;
                    return  (diff2 > diff1) ? AA[i] : AA[next];
                }
            }

            
            
            return  AA[AA.length - 1];
        }
    },

    

    toString: function() {
        return  ("DragDrop " + this.id);
    }

};

})();










if (!Roo.dd.DragDropMgr) {



Roo.dd.DragDropMgr = function() {

    var  A = Roo.EventManager;

    return  {

        

        ids: {},

        

        handleIds: {},

        

        dragCurrent: null,

        

        dragOvers: {},

        

        deltaX: 0,

        

        deltaY: 0,

        

        preventDefault: true,

        

        stopPropagation: true,

        

        initalized: false,

        

        locked: false,

        

        init: function() {
            this.initialized = true;
        },

        

        POINT: 0,

        

        INTERSECT: 1,

        

        mode: 0,

        

        _execOnAll: function(AG, AH) {
            for (var  i  in  this.ids) {
                for (var  j  in  this.ids[i]) {
                    var  h = this.ids[i][j];
                    if (! this.isTypeOfDD(h)) {
                        continue;
                    }

                    h[AG].apply(h, AH);
                }
            }
        },

        

        _onLoad: function() {

            this.init();


            A.on(document, "mouseup",   this.handleMouseUp, this, true);
            A.on(document, "mousemove", this.handleMouseMove, this, true);
            A.on(window,   "unload",    this._onUnload, this, true);
            A.on(window,   "resize",    this._onResize, this, true);
            

        },

        

        _onResize: function(e) {
            this._execOnAll("resetConstraints", []);
        },

        

        lock: function() { this.locked = true; },

        

        unlock: function() { this.locked = false; },

        

        isLocked: function() { return  this.locked; },

        

        locationCache: {},

        

        useCache: true,

        

        clickPixelThresh: 3,

        

        clickTimeThresh: 350,

        

        dragThreshMet: false,

        

        clickTimeout: null,

        

        startX: 0,

        

        startY: 0,

        

        regDragDrop: function(AI, AJ) {
            if (!this.initialized) { this.init(); }

            if (!this.ids[AJ]) {
                this.ids[AJ] = {};
            }

            this.ids[AJ][AI.id] = AI;
        },

        

        removeDDFromGroup: function(AK, AL) {
            if (!this.ids[AL]) {
                this.ids[AL] = {};
            }

            var  AM = this.ids[AL];
            if (AM && AM[AK.id]) {
                delete  AM[AK.id];
            }
        },

        

        _remove: function(AN) {
            for (var  g  in  AN.groups) {
                if (g && this.ids[g][AN.id]) {
                    delete  this.ids[g][AN.id];
                }
            }
            delete  this.handleIds[AN.id];
        },

        

        regHandle: function(AO, AP) {
            if (!this.handleIds[AO]) {
                this.handleIds[AO] = {};
            }

            this.handleIds[AO][AP] = AP;
        },

        

        isDragDrop: function(id) {
            return  ( this.getDDById(id) ) ? true : false;
        },

        

        getRelated: function(AQ, AR) {
            var  AS = [];
            for (var  i  in  AQ.groups) {
                for (j  in  this.ids[i]) {
                    var  dd = this.ids[i][j];
                    if (! this.isTypeOfDD(dd)) {
                        continue;
                    }
                    if (!AR || dd.isTarget) {
                        AS[AS.length] = dd;
                    }
                }
            }

            return  AS;
        },

        

        isLegalTarget: function (AT, AU) {
            var  AV = this.getRelated(AT, true);
            for (var  i=0, d=AV.length;i<d;++i) {
                if (AV[i].id == AU.id) {
                    return  true;
                }
            }

            return  false;
        },

        

        isTypeOfDD: function (AW) {
            return  (AW && AW.__ygDragDrop);
        },

        

        isHandle: function(AX, AY) {
            return  ( this.handleIds[AX] &&
                            this.handleIds[AX][AY] );
        },

        

        getDDById: function(id) {
            for (var  i  in  this.ids) {
                if (this.ids[i][id]) {
                    return  this.ids[i][id];
                }
            }
            return  null;
        },

        

        handleMouseDown: function(e, AZ) {
            if(Roo.QuickTips){
                Roo.QuickTips.disable();
            }

            this.currentTarget = e.getTarget();

            this.dragCurrent = AZ;

            var  el = AZ.getEl();

            
            this.startX = e.getPageX();
            this.startY = e.getPageY();

            this.deltaX = this.startX - el.offsetLeft;
            this.deltaY = this.startY - el.offsetTop;

            this.dragThreshMet = false;

            this.clickTimeout = setTimeout(
                    function() {
                        var  Aa = Roo.dd.DDM;
                        Aa.startDrag(Aa.startX, Aa.startY);
                    },
                    this.clickTimeThresh );
        },

        

        startDrag: function(x, y) {
            clearTimeout(this.clickTimeout);
            if (this.dragCurrent) {
                this.dragCurrent.b4StartDrag(x, y);
                this.dragCurrent.startDrag(x, y);
            }

            this.dragThreshMet = true;
        },

        

        handleMouseUp: function(e) {

            if(Roo.QuickTips){
                Roo.QuickTips.enable();
            }
            if (! this.dragCurrent) {
                return;
            }


            clearTimeout(this.clickTimeout);

            if (this.dragThreshMet) {
                this.fireEvents(e, true);
            } else  {
            }


            this.stopDrag(e);

            this.stopEvent(e);
        },

        

        stopEvent: function(e){
            if(this.stopPropagation) {
                e.stopPropagation();
            }

            if (this.preventDefault) {
                e.preventDefault();
            }
        },

        

        stopDrag: function(e) {
            
            if (this.dragCurrent) {
                if (this.dragThreshMet) {
                    this.dragCurrent.b4EndDrag(e);
                    this.dragCurrent.endDrag(e);
                }


                this.dragCurrent.onMouseUp(e);
            }


            this.dragCurrent = null;
            this.dragOvers = {};
        },

        

        handleMouseMove: function(e) {
            if (! this.dragCurrent) {
                return  true;
            }

            

            
            if (Roo.isIE && (e.button !== 0 && e.button !== 1 && e.button !== 2)) {
                this.stopEvent(e);
                return  this.handleMouseUp(e);
            }

            if (!this.dragThreshMet) {
                var  diffX = Math.abs(this.startX - e.getPageX());
                var  diffY = Math.abs(this.startY - e.getPageY());
                if (diffX > this.clickPixelThresh ||
                            diffY > this.clickPixelThresh) {
                    this.startDrag(this.startX, this.startY);
                }
            }

            if (this.dragThreshMet) {
                this.dragCurrent.b4Drag(e);
                this.dragCurrent.onDrag(e);
                if(!this.dragCurrent.moveOnly){
                    this.fireEvents(e, false);
                }
            }


            this.stopEvent(e);

            return  true;
        },

        

        fireEvents: function(e, Aa) {
            var  dc = this.dragCurrent;

            
            
            if (!dc || dc.isLocked()) {
                return;
            }

            var  pt = e.getPoint();

            
            var  Ab = [];

            var  Ac   = [];
            var  Ad  = [];
            var  Ae  = [];
            var  Af = [];

            
            
            for (var  i  in  this.dragOvers) {

                var  ddo = this.dragOvers[i];

                if (! this.isTypeOfDD(ddo)) {
                    continue;
                }

                if (! this.isOverTarget(pt, ddo, this.mode)) {
                    Ac.push( ddo );
                }


                Ab[i] = true;
                delete  this.dragOvers[i];
            }

            for (var  AL  in  dc.groups) {

                if ("string" != typeof  AL) {
                    continue;
                }

                for (i  in  this.ids[AL]) {
                    var  AZ = this.ids[AL][i];
                    if (! this.isTypeOfDD(AZ)) {
                        continue;
                    }

                    if (AZ.isTarget && !AZ.isLocked() && AZ != dc) {
                        if (this.isOverTarget(pt, AZ, this.mode)) {
                            
                            if (Aa) {
                                Ae.push( AZ );
                            
                            } else  {

                                
                                if (!Ab[AZ.id]) {
                                    Af.push( AZ );
                                
                                } else  {
                                    Ad.push( AZ );
                                }


                                this.dragOvers[AZ.id] = AZ;
                            }
                        }
                    }
                }
            }

            if (this.mode) {
                if (Ac.length) {
                    dc.b4DragOut(e, Ac);
                    dc.onDragOut(e, Ac);
                }

                if (Af.length) {
                    dc.onDragEnter(e, Af);
                }

                if (Ad.length) {
                    dc.b4DragOver(e, Ad);
                    dc.onDragOver(e, Ad);
                }

                if (Ae.length) {
                    dc.b4DragDrop(e, Ae);
                    dc.onDragDrop(e, Ae);
                }

            } else  {
                
                var  d = 0;
                for (i=0, d=Ac.length; i<d; ++i) {
                    dc.b4DragOut(e, Ac[i].id);
                    dc.onDragOut(e, Ac[i].id);
                }

                
                for (i=0,d=Af.length; i<d; ++i) {
                    
                    dc.onDragEnter(e, Af[i].id);
                }

                
                for (i=0,d=Ad.length; i<d; ++i) {
                    dc.b4DragOver(e, Ad[i].id);
                    dc.onDragOver(e, Ad[i].id);
                }

                
                for (i=0, d=Ae.length; i<d; ++i) {
                    dc.b4DragDrop(e, Ae[i].id);
                    dc.onDragDrop(e, Ae[i].id);
                }

            }

            
            if (Aa && !Ae.length) {
                dc.onInvalidDrop(e);
            }

        },

        

        getBestMatch: function(Ag) {
            var  Ah = null;
            
            
               
            
            

            var  Ai = Ag.length;

            if (Ai == 1) {
                Ah = Ag[0];
            } else  {
                
                for (var  i=0; i<Ai; ++i) {
                    var  dd = Ag[i];
                    
                    
                    
                    if (dd.cursorIsOver) {
                        Ah = dd;
                        break;
                    
                    } else  {
                        if (!Ah ||
                            Ah.overlap.getArea() < dd.overlap.getArea()) {
                            Ah = dd;
                        }
                    }
                }
            }

            return  Ah;
        },

        

        refreshCache: function(Aj) {
            for (var  AL  in  Aj) {
                if ("string" != typeof  AL) {
                    continue;
                }
                for (var  i  in  this.ids[AL]) {
                    var  AZ = this.ids[AL][i];

                    if (this.isTypeOfDD(AZ)) {
                    
                        var  o = this.getLocation(AZ);
                        if (o) {
                            this.locationCache[AZ.id] = o;
                        } else  {
                            delete  this.locationCache[AZ.id];
                            
                            
                            
                        }
                    }
                }
            }
        },

        

        verifyEl: function(el) {
            if (el) {
                var  parent;
                if(Roo.isIE){
                    try{
                        parent = el.offsetParent;
                    }catch(e){}
                }else {
                    parent = el.offsetParent;
                }
                if (parent) {
                    return  true;
                }
            }

            return  false;
        },

        

        getLocation: function(Ak) {
            if (! this.isTypeOfDD(Ak)) {
                return  null;
            }

            var  el = Ak.getEl(), Al, x1, x2, y1, y2, t, r, b, l;

            try {
                Al= Roo.lib.Dom.getXY(el);
            } catch (e) { }

            if (!Al) {
                return  null;
            }


            x1 = Al[0];
            x2 = x1 + el.offsetWidth;
            y1 = Al[1];
            y2 = y1 + el.offsetHeight;

            t = y1 - Ak.padding[0];
            r = x2 + Ak.padding[1];
            b = y2 + Ak.padding[2];
            l = x1 - Ak.padding[3];

            return  new  Roo.lib.Region( t, r, b, l );
        },

        

        isOverTarget: function(pt, Am, An) {
            
            var  Ao = this.locationCache[Am.id];
            if (!Ao || !this.useCache) {
                Ao = this.getLocation(Am);
                this.locationCache[Am.id] = Ao;

            }

            if (!Ao) {
                return  false;
            }


            Am.cursorIsOver = Ao.contains( pt );

            
            
            
            
            
            var  dc = this.dragCurrent;
            if (!dc || !dc.getTargetCoord ||
                    (!An && !dc.constrainX && !dc.constrainY)) {
                return  Am.cursorIsOver;
            }


            Am.overlap = null;

            
            
            
            
            var  Ap = dc.getTargetCoord(pt.x, pt.y);

            var  el = dc.getDragEl();
            var  Aq = new  Roo.lib.Region( Ap.y,
                                                   Ap.x + el.offsetWidth,
                                                   Ap.y + el.offsetHeight,
                                                   Ap.x );

            var  Ar = Aq.intersect(Ao);

            if (Ar) {
                Am.overlap = Ar;
                return  (An) ? true : Am.cursorIsOver;
            } else  {
                return  false;
            }
        },

        

        _onUnload: function(e, me) {
            Roo.dd.DragDropMgr.unregAll();
        },

        

        unregAll: function() {

            if (this.dragCurrent) {
                this.stopDrag();
                this.dragCurrent = null;
            }


            this._execOnAll("unreg", []);

            for (i  in  this.elementCache) {
                delete  this.elementCache[i];
            }


            this.elementCache = {};
            this.ids = {};
        },

        

        elementCache: {},

        

        getElWrapper: function(id) {
            var  As = this.elementCache[id];
            if (!As || !As.el) {
                As = this.elementCache[id] =
                    new  this.ElementWrapper(Roo.getDom(id));
            }
            return  As;
        },

        

        getElement: function(id) {
            return  Roo.getDom(id);
        },

        

        getCss: function(id) {
            var  el = Roo.getDom(id);
            return  (el) ? el.style : null;
        },

        

        ElementWrapper: function(el) {
                

                this.el = el || null;
                

                this.id = this.el && el.id;
                

                this.css = this.el && el.style;
            },

        

        getPosX: function(el) {
            return  Roo.lib.Dom.getX(el);
        },

        

        getPosY: function(el) {
            return  Roo.lib.Dom.getY(el);
        },

        

        swapNode: function(n1, n2) {
            if (n1.swapNode) {
                n1.swapNode(n2);
            } else  {
                var  p = n2.parentNode;
                var  s = n2.nextSibling;

                if (s == n1) {
                    p.insertBefore(n1, n2);
                } else  if (n2 == n1.nextSibling) {
                    p.insertBefore(n2, n1);
                } else  {
                    n1.parentNode.replaceChild(n2, n1);
                    p.insertBefore(n1, s);
                }
            }
        },

        

        getScroll: function () {
            var  t, l, At=document.documentElement, db=document.body;
            if (At && (At.scrollTop || At.scrollLeft)) {
                t = At.scrollTop;
                l = At.scrollLeft;
            } else  if (db) {
                t = db.scrollTop;
                l = db.scrollLeft;
            } else  {

            }
            return  { top: t, left: l };
        },

        

        getStyle: function(el, Au) {
            return  Roo.fly(el).getStyle(Au);
        },

        

        getScrollTop: function () { return  this.getScroll().top; },

        

        getScrollLeft: function () { return  this.getScroll().left; },

        

        moveToEl: function (Av, Aw) {
            var  Ax = Roo.lib.Dom.getXY(Aw);
            Roo.lib.Dom.setXY(Av, Ax);
        },

        

        numericSort: function(a, b) { return  (a - b); },

        

        _timeoutCount: 0,

        

        _addListeners: function() {
            var  Ay = Roo.dd.DDM;
            if ( Roo.lib.Event && document ) {
                Ay._onLoad();
            } else  {
                if (Ay._timeoutCount > 2000) {
                } else  {
                    setTimeout(Ay._addListeners, 10);
                    if (document && document.body) {
                        Ay._timeoutCount += 1;
                    }
                }
            }
        },

        

        handleWasClicked: function(Az, id) {
            if (this.isHandle(id, Az.id)) {
                return  true;
            } else  {
                
                var  p = Az.parentNode;

                while (p) {
                    if (this.isHandle(id, p.id)) {
                        return  true;
                    } else  {
                        p = p.parentNode;
                    }
                }
            }

            return  false;
        }

    };

}();


Roo.dd.DDM = Roo.dd.DragDropMgr;
Roo.dd.DDM._addListeners();

}





Roo.dd.DD = function(id, A, B) {
    if (id) {
        this.init(id, A, B);
    }
};

Roo.extend(Roo.dd.DD, Roo.dd.DragDrop, {

    

    scroll: true,

    

    autoOffset: function(C, D) {
        var  x = C - this.startPageX;
        var  y = D - this.startPageY;
        this.setDelta(x, y);
    },

    

    setDelta: function(E, F) {
        this.deltaX = E;
        this.deltaY = F;
    },

    

    setDragElPos: function(G, H) {
        
        

        var  el = this.getDragEl();
        this.alignElWithMouse(el, G, H);
    },

    

    alignElWithMouse: function(el, I, J) {
        var  K = this.getTargetCoord(I, J);
        var  L = el.dom ? el : Roo.fly(el);
        if (!this.deltaSetXY) {
            var  aCoord = [K.x, K.y];
            L.setXY(aCoord);
            var  newLeft = L.getLeft(true);
            var  newTop  = L.getTop(true);
            this.deltaSetXY = [ newLeft - K.x, newTop - K.y ];
        } else  {
            L.setLeftTop(K.x + this.deltaSetXY[0], K.y + this.deltaSetXY[1]);
        }


        this.cachePosition(K.x, K.y);
        this.autoScroll(K.x, K.y, el.offsetHeight, el.offsetWidth);
        return  K;
    },

    

    cachePosition: function(M, N) {
        if (M) {
            this.lastPageX = M;
            this.lastPageY = N;
        } else  {
            var  aCoord = Roo.lib.Dom.getXY(this.getEl());
            this.lastPageX = aCoord[0];
            this.lastPageY = aCoord[1];
        }
    },

    

    autoScroll: function(x, y, h, w) {

        if (this.scroll) {
            
            var  clientH = Roo.lib.Dom.getViewWidth();

            
            var  clientW = Roo.lib.Dom.getViewHeight();

            
            var  st = this.DDM.getScrollTop();

            
            var  sl = this.DDM.getScrollLeft();

            
            var  bot = h + y;

            
            var  right = w + x;

            
            
            
            var  toBot = (clientH + st - y - this.deltaY);

            
            var  toRight = (clientW + sl - x - this.deltaX);


            
            
            var  thresh = 40;

            
            
            
            var  scrAmt = (document.all) ? 80 : 30;

            
            
            if ( bot > clientH && toBot < thresh ) {
                window.scrollTo(sl, st + scrAmt);
            }

            
            
            if ( y < st && st > 0 && y - st < thresh ) {
                window.scrollTo(sl, st - scrAmt);
            }

            
            
            if ( right > clientW && toRight < thresh ) {
                window.scrollTo(sl + scrAmt, st);
            }

            
            
            if ( x < sl && sl > 0 && x - sl < thresh ) {
                window.scrollTo(sl - scrAmt, st);
            }
        }
    },

    

    getTargetCoord: function(O, P) {


        var  x = O - this.deltaX;
        var  y = P - this.deltaY;

        if (this.constrainX) {
            if (x < this.minX) { x = this.minX; }
            if (x > this.maxX) { x = this.maxX; }
        }

        if (this.constrainY) {
            if (y < this.minY) { y = this.minY; }
            if (y > this.maxY) { y = this.maxY; }
        }


        x = this.getTick(x, this.xTicks);
        y = this.getTick(y, this.yTicks);


        return  {x:x, y:y};
    },

    

    applyConfig: function() {
        Roo.dd.DD.superclass.applyConfig.call(this);
        this.scroll = (this.config.scroll !== false);
    },

    

    b4MouseDown: function(e) {
        
        this.autoOffset(e.getPageX(),
                            e.getPageY());
    },

    

    b4Drag: function(e) {
        this.setDragElPos(e.getPageX(),
                            e.getPageY());
    },

    toString: function() {
        return  ("DD " + this.id);
    }

    
    
    
    


});





Roo.dd.DDProxy = function(id, A, B) {
    if (id) {
        this.init(id, A, B);
        this.initFrame();
    }
};



Roo.dd.DDProxy.dragElId = "ygddfdiv";

Roo.extend(Roo.dd.DDProxy, Roo.dd.DD, {

    

    resizeFrame: true,

    

    centerFrame: false,

    

    createFrame: function() {
        var  C = this;
        var  D = document.body;

        if (!D || !D.firstChild) {
            setTimeout( function() { C.createFrame(); }, 50 );
            return;
        }

        var  E = this.getDragEl();

        if (!E) {
            E    = document.createElement("div");
            E.id = this.dragElId;
            var  s  = E.style;

            s.position   = "absolute";
            s.visibility = "hidden";
            s.cursor     = "move";
            s.border     = "2px solid #aaa";
            s.zIndex     = 999;

            
            
            
            D.insertBefore(E, D.firstChild);
        }
    },

    

    initFrame: function() {
        this.createFrame();
    },

    applyConfig: function() {
        Roo.dd.DDProxy.superclass.applyConfig.call(this);

        this.resizeFrame = (this.config.resizeFrame !== false);
        this.centerFrame = (this.config.centerFrame);
        this.setDragElId(this.config.dragElId || Roo.dd.DDProxy.dragElId);
    },

    

    showFrame: function(F, G) {
        var  el = this.getEl();
        var  H = this.getDragEl();
        var  s = H.style;

        this._resizeProxy();

        if (this.centerFrame) {
            this.setDelta( Math.round(parseInt(s.width,  10)/2),
                           Math.round(parseInt(s.height, 10)/2) );
        }


        this.setDragElPos(F, G);

        Roo.fly(H).show();
    },

    

    _resizeProxy: function() {
        if (this.resizeFrame) {
            var  el = this.getEl();
            Roo.fly(this.getDragEl()).setSize(el.offsetWidth, el.offsetHeight);
        }
    },

    
    b4MouseDown: function(e) {
        var  x = e.getPageX();
        var  y = e.getPageY();
        this.autoOffset(x, y);
        this.setDragElPos(x, y);
    },

    
    b4StartDrag: function(x, y) {
        
        this.showFrame(x, y);
    },

    
    b4EndDrag: function(e) {
        Roo.fly(this.getDragEl()).hide();
    },

    
    
    
    endDrag: function(e) {

        var  I = this.getEl();
        var  J = this.getDragEl();

        
        J.style.visibility = "";

        this.beforeMove();
        
        
        I.style.visibility = "hidden";
        Roo.dd.DDM.moveToEl(I, J);
        J.style.visibility = "hidden";
        I.style.visibility = "";

        this.afterDrag();
    },

    beforeMove : function(){

    },

    afterDrag : function(){

    },

    toString: function() {
        return  ("DDProxy " + this.id);
    }

});




 

Roo.dd.DDTarget = function(id, A, B) {
    if (id) {
        this.initTarget(id, A, B);
    }
};


Roo.extend(Roo.dd.DDTarget, Roo.dd.DragDrop, {
    toString: function() {
        return  ("DDTarget " + this.id);
    }
});



 



Roo.dd.ScrollManager = function(){
    var  A = Roo.dd.DragDropMgr;
    var  B = {};
    var  C = null;
    var  D = {};
    
    var  E = function(e){
        C = null;
        H();
    };
    
    var  F = function(){
        if(A.dragCurrent){
             A.refreshCache(A.dragCurrent.groups);
        }
    };
    
    var  G = function(){
        if(A.dragCurrent){
            var  dds = Roo.dd.ScrollManager;
            if(!dds.animate){
                if(D.el.scroll(D.dir, dds.increment)){
                    F();
                }
            }else {
                D.el.scroll(D.dir, dds.increment, true, dds.animDuration, F);
            }
        }
    };
    
    var  H = function(){
        if(D.id){
            clearInterval(D.id);
        }

        D.id = 0;
        D.el = null;
        D.dir = "";
    };
    
    var  I = function(el, K){
        H();
        D.el = el;
        D.dir = K;
        D.id = setInterval(G, Roo.dd.ScrollManager.frequency);
    };
    
    var  J = function(e, K){
        if(K || !A.dragCurrent){ return; }
        var  L = Roo.dd.ScrollManager;
        if(!C || C != A.dragCurrent){
            C = A.dragCurrent;
            
            L.refreshCache();
        }
        
        var  xy = Roo.lib.Event.getXY(e);
        var  pt = new  Roo.lib.Point(xy[0], xy[1]);
        for(var  id  in  B){
            var  el = B[id], r = el._region;
            if(r && r.contains(pt) && el.isScrollable()){
                if(r.bottom - pt.y <= L.thresh){
                    if(D.el != el){
                        I(el, "down");
                    }
                    return;
                }else  if(r.right - pt.x <= L.thresh){
                    if(D.el != el){
                        I(el, "left");
                    }
                    return;
                }else  if(pt.y - r.top <= L.thresh){
                    if(D.el != el){
                        I(el, "up");
                    }
                    return;
                }else  if(pt.x - r.left <= L.thresh){
                    if(D.el != el){
                        I(el, "right");
                    }
                    return;
                }
            }
        }

        H();
    };
    
    A.fireEvents = A.fireEvents.createSequence(J, A);
    A.stopDrag = A.stopDrag.createSequence(E, A);
    
    return  {
        

        register : function(el){
            if(el  instanceof  Array){
                for(var  i = 0, len = el.length; i < len; i++) {
                	this.register(el[i]);
                }
            }else {
                el = Roo.get(el);
                B[el.id] = el;
            }
        },
        
        

        unregister : function(el){
            if(el  instanceof  Array){
                for(var  i = 0, len = el.length; i < len; i++) {
                	this.unregister(el[i]);
                }
            }else {
                el = Roo.get(el);
                delete  B[el.id];
            }
        },
        
        

        thresh : 25,
        
        

        increment : 100,
        
        

        frequency : 500,
        
        

        animate: true,
        
        

        animDuration: .4,
        
        

        refreshCache : function(){
            for(var  id  in  B){
                if(typeof  B[id] == 'object'){ 
                    B[id]._region = B[id].getRegion();
                }
            }
        }
    };
}();


 



Roo.dd.Registry = function(){
    var  A = {}; 
    var  B = {}; 
    var  C = 0;

    var  D = function(el, E){
        if(typeof  el == "string"){
            return  el;
        }
        var  id = el.id;
        if(!id && E !== false){
            id = "roodd-" + (++C);
            el.id = id;
        }
        return  id;
    };
    
    return  {
    

        register : function(el, G){
            G = G || {};
            if(typeof  el == "string"){
                el = document.getElementById(el);
            }

            G.ddel = el;
            A[D(el)] = G;
            if(G.isHandle !== false){
                B[G.ddel.id] = G;
            }
            if(G.handles){
                var  hs = G.handles;
                for(var  i = 0, len = hs.length; i < len; i++){
                	B[D(hs[i])] = G;
                }
            }
        },

    

        unregister : function(el){
            var  id = D(el, false);
            var  H = A[id];
            if(H){
                delete  A[id];
                if(H.handles){
                    var  hs = H.handles;
                    for(var  i = 0, len = hs.length; i < len; i++){
                    	delete  B[D(hs[i], false)];
                    }
                }
            }
        },

    

        getHandle : function(id){
            if(typeof  id != "string"){ 
                id = id.id;
            }
            return  B[id];
        },

    

        getHandleFromEvent : function(e){
            var  t = Roo.lib.Event.getTarget(e);
            return  t ? B[t.id] : null;
        },

    

        getTarget : function(id){
            if(typeof  id != "string"){ 
                id = id.id;
            }
            return  A[id];
        },

    

        getTargetFromEvent : function(e){
            var  t = Roo.lib.Event.getTarget(e);
            return  t ? A[t.id] || B[t.id] : null;
        }
    };
}();


 



Roo.dd.StatusProxy = function(A){
    Roo.apply(this, A);
    this.id = this.id || Roo.id();
    this.el = new  Roo.Layer({
        dh: {
            id: this.id, tag: "div", cls: "x-dd-drag-proxy "+this.dropNotAllowed, children: [
                {tag: "div", cls: "x-dd-drop-icon"},
                {tag: "div", cls: "x-dd-drag-ghost"}
            ]
        }, 
        shadow: !A || A.shadow !== false
    });
    this.ghost = Roo.get(this.el.dom.childNodes[1]);
    this.dropStatus = this.dropNotAllowed;
};

Roo.dd.StatusProxy.prototype = {
    

    dropAllowed : "x-dd-drop-ok",
    

    dropNotAllowed : "x-dd-drop-nodrop",

    

    setStatus : function(B){
        B = B || this.dropNotAllowed;
        if(this.dropStatus != B){
            this.el.replaceClass(this.dropStatus, B);
            this.dropStatus = B;
        }
    },

    

    reset : function(C){
        this.el.dom.className = "x-dd-drag-proxy " + this.dropNotAllowed;
        this.dropStatus = this.dropNotAllowed;
        if(C){
            this.ghost.update("");
        }
    },

    

    update : function(D){
        if(typeof  D == "string"){
            this.ghost.update(D);
        }else {
            this.ghost.update("");
            D.style.margin = "0";
            this.ghost.dom.appendChild(D);
        }
        
        var  el = this.ghost.dom.firstChild;
		if(el){
			Roo.fly(el).setStyle('float', 'none');
		}
    },
    
    

    getEl : function(){
        return  this.el;
    },

    

    getGhost : function(){
        return  this.ghost;
    },

    

    hide : function(E){
        this.el.hide();
        if(E){
            this.reset(true);
        }
    },

    

    stop : function(){
        if(this.anim && this.anim.isAnimated && this.anim.isAnimated()){
            this.anim.stop();
        }
    },

    

    show : function(){
        this.el.show();
    },

    

    sync : function(){
        this.el.sync();
    },

    

    repair : function(xy, F, G){
        this.callback = F;
        this.scope = G;
        if(xy && this.animRepair !== false){
            this.el.addClass("x-dd-drag-repair");
            this.el.hideUnders(true);
            this.anim = this.el.shift({
                duration: this.repairDuration || .5,
                easing: 'easeOut',
                xy: xy,
                stopFx: true,
                callback: this.afterRepair,
                scope: this
            });
        }else {
            this.afterRepair();
        }
    },

    
    afterRepair : function(){
        this.hide(true);
        if(typeof  this.callback == "function"){
            this.callback.call(this.scope || this);
        }

        this.callback = null;
        this.scope = null;
    }
};





Roo.dd.DragSource = function(el, A){
    this.el = Roo.get(el);
    this.dragData = {};
    
    Roo.apply(this, A);
    
    if(!this.proxy){
        this.proxy = new  Roo.dd.StatusProxy();
    }


    Roo.dd.DragSource.superclass.constructor.call(this, this.el.dom, this.ddGroup || this.group,
          {dragElId : this.proxy.id, resizeFrame: false, isTarget: false, scroll: this.scroll === true});
    
    this.dragging = false;
};

Roo.extend(Roo.dd.DragSource, Roo.dd.DDProxy, {
    

    dropAllowed : "x-dd-drop-ok",
    

    dropNotAllowed : "x-dd-drop-nodrop",

    

    getDragData : function(e){
        return  this.dragData;
    },

    
    onDragEnter : function(e, id){
        var  B = Roo.dd.DragDropMgr.getDDById(id);
        this.cachedTarget = B;
        if(this.beforeDragEnter(B, e, id) !== false){
            if(B.isNotifyTarget){
                var  status = B.notifyEnter(this, e, this.dragData);
                this.proxy.setStatus(status);
            }else {
                this.proxy.setStatus(this.dropAllowed);
            }
            
            if(this.afterDragEnter){
                

                this.afterDragEnter(B, e, id);
            }
        }
    },

    

    beforeDragEnter : function(C, e, id){
        return  true;
    },

    
    alignElWithMouse: function() {
        Roo.dd.DragSource.superclass.alignElWithMouse.apply(this, arguments);
        this.proxy.sync();
    },

    
    onDragOver : function(e, id){
        var  D = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragOver(D, e, id) !== false){
            if(D.isNotifyTarget){
                var  status = D.notifyOver(this, e, this.dragData);
                this.proxy.setStatus(status);
            }

            if(this.afterDragOver){
                

                this.afterDragOver(D, e, id);
            }
        }
    },

    

    beforeDragOver : function(E, e, id){
        return  true;
    },

    
    onDragOut : function(e, id){
        var  F = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragOut(F, e, id) !== false){
            if(F.isNotifyTarget){
                F.notifyOut(this, e, this.dragData);
            }

            this.proxy.reset();
            if(this.afterDragOut){
                

                this.afterDragOut(F, e, id);
            }
        }

        this.cachedTarget = null;
    },

    

    beforeDragOut : function(G, e, id){
        return  true;
    },
    
    
    onDragDrop : function(e, id){
        var  H = this.cachedTarget || Roo.dd.DragDropMgr.getDDById(id);
        if(this.beforeDragDrop(H, e, id) !== false){
            if(H.isNotifyTarget){
                if(H.notifyDrop(this, e, this.dragData)){ 
                    this.onValidDrop(H, e, id);
                }else {
                    this.onInvalidDrop(H, e, id);
                }
            }else {
                this.onValidDrop(H, e, id);
            }
            
            if(this.afterDragDrop){
                

                this.afterDragDrop(H, e, id);
            }
        }
        delete  this.cachedTarget;
    },

    

    beforeDragDrop : function(I, e, id){
        return  true;
    },

    
    onValidDrop : function(J, e, id){
        this.hideProxy();
        if(this.afterValidDrop){
            

            this.afterValidDrop(J, e, id);
        }
    },

    
    getRepairXY : function(e, K){
        return  this.el.getXY();  
    },

    
    onInvalidDrop : function(L, e, id){
        this.beforeInvalidDrop(L, e, id);
        if(this.cachedTarget){
            if(this.cachedTarget.isNotifyTarget){
                this.cachedTarget.notifyOut(this, e, this.dragData);
            }

            this.cacheTarget = null;
        }

        this.proxy.repair(this.getRepairXY(e, this.dragData), this.afterRepair, this);

        if(this.afterInvalidDrop){
            

            this.afterInvalidDrop(e, id);
        }
    },

    
    afterRepair : function(){
        if(Roo.enableFx){
            this.el.highlight(this.hlColor || "c3daf9");
        }

        this.dragging = false;
    },

    

    beforeInvalidDrop : function(M, e, id){
        return  true;
    },

    
    handleMouseDown : function(e){
        if(this.dragging) {
            return;
        }
        var  N = this.getDragData(e);
        if(N && this.onBeforeDrag(N, e) !== false){
            this.dragData = N;
            this.proxy.stop();
            Roo.dd.DragSource.superclass.handleMouseDown.apply(this, arguments);
        } 
    },

    

    onBeforeDrag : function(O, e){
        return  true;
    },

    

    onStartDrag : Roo.emptyFn,

    
    startDrag : function(x, y){
        this.proxy.reset();
        this.dragging = true;
        this.proxy.update("");
        this.onInitDrag(x, y);
        this.proxy.show();
    },

    
    onInitDrag : function(x, y){
        var  P = this.el.dom.cloneNode(true);
        P.id = Roo.id(); 
        this.proxy.update(P);
        this.onStartDrag(x, y);
        return  true;
    },

    

    getProxy : function(){
        return  this.proxy;  
    },

    

    hideProxy : function(){
        this.proxy.hide();  
        this.proxy.reset(true);
        this.dragging = false;
    },

    
    triggerCacheRefresh : function(){
        Roo.dd.DDM.refreshCache(this.groups);
    },

    
    b4EndDrag: function(e) {
    },

    
    endDrag : function(e){
        this.onEndDrag(this.dragData, e);
    },

    
    onEndDrag : function(Q, e){
    },
    
    
    autoOffset : function(x, y) {
        this.setDelta(-12, -20);
    }    
});






Roo.dd.DropTarget = function(el, A){
    this.el = Roo.get(el);
    
    Roo.apply(this, A);
    
    if(this.containerScroll){
        Roo.dd.ScrollManager.register(this.el);
    }

    
    Roo.dd.DropTarget.superclass.constructor.call(this, this.el.dom, this.ddGroup || this.group, 
          {isTarget: true});

};

Roo.extend(Roo.dd.DropTarget, Roo.dd.DDTarget, {
    

    

    dropAllowed : "x-dd-drop-ok",
    

    dropNotAllowed : "x-dd-drop-nodrop",

    
    isTarget : true,

    
    isNotifyTarget : true,

    

    notifyEnter : function(dd, e, B){
        if(this.overClass){
            this.el.addClass(this.overClass);
        }
        return  this.dropAllowed;
    },

    

    notifyOver : function(dd, e, C){
        return  this.dropAllowed;
    },

    

    notifyOut : function(dd, e, D){
        if(this.overClass){
            this.el.removeClass(this.overClass);
        }
    },

    

    notifyDrop : function(dd, e, E){
        return  false;
    }
});






Roo.dd.DragZone = function(el, A){
    Roo.dd.DragZone.superclass.constructor.call(this, el, A);
    if(this.containerScroll){
        Roo.dd.ScrollManager.register(this.el);
    }
};

Roo.extend(Roo.dd.DragZone, Roo.dd.DragSource, {
    

    


    

    getDragData : function(e){
        return  Roo.dd.Registry.getHandleFromEvent(e);
    },
    
    

    onInitDrag : function(x, y){
        this.proxy.update(this.dragData.ddel.cloneNode(true));
        this.onStartDrag(x, y);
        return  true;
    },
    
    

    afterRepair : function(){
        if(Roo.enableFx){
            Roo.Element.fly(this.dragData.ddel).highlight(this.hlColor || "c3daf9");
        }

        this.dragging = false;
    },

    

    getRepairXY : function(e){
        return  Roo.Element.fly(this.dragData.ddel).getXY();  
    }
});




Roo.dd.DropZone = function(el, A){
    Roo.dd.DropZone.superclass.constructor.call(this, el, A);
};

Roo.extend(Roo.dd.DropZone, Roo.dd.DropTarget, {
    

    getTargetFromEvent : function(e){
        return  Roo.dd.Registry.getTargetFromEvent(e);
    },

    

    onNodeEnter : function(n, dd, e, B){
        
    },

    

    onNodeOver : function(n, dd, e, C){
        return  this.dropAllowed;
    },

    

    onNodeOut : function(n, dd, e, D){
        
    },

    

    onNodeDrop : function(n, dd, e, E){
        return  false;
    },

    

    onContainerOver : function(dd, e, F){
        return  this.dropNotAllowed;
    },

    

    onContainerDrop : function(dd, e, G){
        return  false;
    },

    

    notifyEnter : function(dd, e, H){
        return  this.dropNotAllowed;
    },

    

    notifyOver : function(dd, e, I){
        var  n = this.getTargetFromEvent(e);
        if(!n){ 
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, I);
                this.lastOverNode = null;
            }
            return  this.onContainerOver(dd, e, I);
        }
        if(this.lastOverNode != n){
            if(this.lastOverNode){
                this.onNodeOut(this.lastOverNode, dd, e, I);
            }

            this.onNodeEnter(n, dd, e, I);
            this.lastOverNode = n;
        }
        return  this.onNodeOver(n, dd, e, I);
    },

    

    notifyOut : function(dd, e, J){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, J);
            this.lastOverNode = null;
        }
    },

    

    notifyDrop : function(dd, e, K){
        if(this.lastOverNode){
            this.onNodeOut(this.lastOverNode, dd, e, K);
            this.lastOverNode = null;
        }
        var  n = this.getTargetFromEvent(e);
        return  n ?
            this.onNodeDrop(n, dd, e, K) :
            this.onContainerDrop(dd, e, K);
    },

    
    triggerCacheRefresh : function(){
        Roo.dd.DDM.refreshCache(this.groups);
    }  
});






Roo.data.SortTypes = {
    

    none : function(s){
        return  s;
    },
    
    

    stripTagsRE : /<\/?[^>]+>/gi,
    
    

    asText : function(s){
        return  String(s).replace(this.stripTagsRE, "");
    },
    
    

    asUCText : function(s){
        return  String(s).toUpperCase().replace(this.stripTagsRE, "");
    },
    
    

    asUCString : function(s) {
    	return  String(s).toUpperCase();
    },
    
    

    asDate : function(s) {
        if(!s){
            return  0;
        }
        if(s  instanceof  Date){
            return  s.getTime();
        }
    	return  Date.parse(String(s));
    },
    
    

    asFloat : function(s) {
    	var  A = parseFloat(String(s).replace(/,/g, ""));
        if(isNaN(A)) A = 0;
    	return  A;
    },
    
    

    asInt : function(s) {
        var  B = parseInt(String(s).replace(/,/g, ""));
        if(isNaN(B)) B = 0;
    	return  B;
    }
};





Roo.data.Record = function(A, id){
    this.id = (id || id === 0) ? id : ++Roo.data.Record.AUTO_ID;
    this.data = A;
};



Roo.data.Record.create = function(o){
    var  f = function(){
        f.superclass.constructor.apply(this, arguments);
    };
    Roo.extend(f, Roo.data.Record);
    var  p = f.prototype;
    p.fields = new  Roo.util.MixedCollection(false, function(B){
        return  B.name;
    });
    for(var  i = 0, len = o.length; i < len; i++){
        p.fields.add(new  Roo.data.Field(o[i]));
    }

    f.getField = function(B){
        return  p.fields.get(B);  
    };
    return  f;
};

Roo.data.Record.AUTO_ID = 1000;
Roo.data.Record.EDIT = 'edit';
Roo.data.Record.REJECT = 'reject';
Roo.data.Record.COMMIT = 'commit';

Roo.data.Record.prototype = {
    

    dirty : false,
    editing : false,
    error: null,
    modified: null,

    
    join : function(B){
        this.store = B;
    },

    

    set : function(C, D){
        if(this.data[C] == D){
            return;
        }

        this.dirty = true;
        if(!this.modified){
            this.modified = {};
        }
        if(typeof  this.modified[C] == 'undefined'){
            this.modified[C] = this.data[C];
        }

        this.data[C] = D;
        if(!this.editing){
            this.store.afterEdit(this);
        }       
    },

    

    get : function(E){
        return  this.data[E]; 
    },

    
    beginEdit : function(){
        this.editing = true;
        this.modified = {}; 
    },

    
    cancelEdit : function(){
        this.editing = false;
        delete  this.modified;
    },

    
    endEdit : function(){
        this.editing = false;
        if(this.dirty && this.store){
            this.store.afterEdit(this);
        }
    },

    

    reject : function(){
        var  m = this.modified;
        for(var  n  in  m){
            if(typeof  m[n] != "function"){
                this.data[n] = m[n];
            }
        }

        this.dirty = false;
        delete  this.modified;
        this.editing = false;
        if(this.store){
            this.store.afterReject(this);
        }
    },

    

    commit : function(){
        this.dirty = false;
        delete  this.modified;
        this.editing = false;
        if(this.store){
            this.store.afterCommit(this);
        }
    },

    
    hasError : function(){
        return  this.error != null;
    },

    
    clearError : function(){
        this.error = null;
    },

    

    copy : function(F) {
        return  new  this.constructor(Roo.apply({}, this.data), F || this.id);
    }
};







Roo.data.Store = function(A){
    this.data = new  Roo.util.MixedCollection(false);
    this.data.getKey = function(o){
        return  o.id;
    };
    this.baseParams = {};
    
    this.paramNames = {
        "start" : "start",
        "limit" : "limit",
        "sort" : "sort",
        "dir" : "dir"
    };

    if(A && A.data){
        this.inlineData = A.data;
        delete  A.data;
    }


    Roo.apply(this, A);
    
    if(this.reader){ 
        this.reader = Roo.factory(this.reader, Roo.data);
        this.reader.xmodule = this.xmodule || false;
        if(!this.recordType){
            this.recordType = this.reader.recordType;
        }
        if(this.reader.onMetaChange){
            this.reader.onMetaChange = this.onMetaChange.createDelegate(this);
        }
    }

    if(this.recordType){
        this.fields = this.recordType.prototype.fields;
    }

    this.modified = [];

    this.addEvents({
        

        datachanged : true,
        

        metachange : true,
        

        add : true,
        

        remove : true,
        

        update : true,
        

        clear : true,
        

        beforeload : true,
        

        load : true,
        

        loadexception : true
    });
    
    if(this.proxy){
        this.proxy = Roo.factory(this.proxy, Roo.data);
        this.proxy.xmodule = this.xmodule || false;
        this.relayEvents(this.proxy,  ["loadexception"]);
    }

    this.sortToggle = {};

    Roo.data.Store.superclass.constructor.call(this);

    if(this.inlineData){
        this.loadData(this.inlineData);
        delete  this.inlineData;
    }
};
Roo.extend(Roo.data.Store, Roo.util.Observable, {
     

    
    

    

    

    

    

    

    remoteSort : false,

    

    pruneModifiedRecords : false,

    
    lastOptions : null,

    

    add : function(B){
        B = [].concat(B);
        for(var  i = 0, len = B.length; i < len; i++){
            B[i].join(this);
        }
        var  C = this.data.length;
        this.data.addAll(B);
        this.fireEvent("add", this, B, C);
    },

    

    remove : function(D){
        var  E = this.data.indexOf(D);
        this.data.removeAt(E);
        if(this.pruneModifiedRecords){
            this.modified.remove(D);
        }

        this.fireEvent("remove", this, D, E);
    },

    

    removeAll : function(){
        this.data.clear();
        if(this.pruneModifiedRecords){
            this.modified = [];
        }

        this.fireEvent("clear", this);
    },

    

    insert : function(F, G){
        G = [].concat(G);
        for(var  i = 0, len = G.length; i < len; i++){
            this.data.insert(F, G[i]);
            G[i].join(this);
        }

        this.fireEvent("add", this, G, F);
    },

    

    indexOf : function(H){
        return  this.data.indexOf(H);
    },

    

    indexOfId : function(id){
        return  this.data.indexOfKey(id);
    },

    

    getById : function(id){
        return  this.data.key(id);
    },

    

    getAt : function(I){
        return  this.data.itemAt(I);
    },

    

    getRange : function(J, K){
        return  this.data.getRange(J, K);
    },

    
    storeOptions : function(o){
        o = Roo.apply({}, o);
        delete  o.callback;
        delete  o.scope;
        this.lastOptions = o;
    },

    

    load : function(L){
        L = L || {};
        if(this.fireEvent("beforeload", this, L) !== false){
            this.storeOptions(L);
            var  p = Roo.apply(L.params || {}, this.baseParams);
            if(this.sortInfo && this.remoteSort){
                var  pn = this.paramNames;
                p[pn["sort"]] = this.sortInfo.field;
                p[pn["dir"]] = this.sortInfo.direction;
            }

            this.proxy.load(p, this.reader, this.loadRecords, this, L);
        }
    },

    

    reload : function(M){
        this.load(Roo.applyIf(M||{}, this.lastOptions));
    },

    
    
    loadRecords : function(o, N, O){
        if(!o || O === false){
            if(O !== false){
                this.fireEvent("load", this, [], N);
            }
            if(N.callback){
                N.callback.call(N.scope || this, [], N, false);
            }
            return;
        }
        
        if (o.success === false) {
            this.fireEvent("loadexception", this, o, N, this.reader.jsonData);
            return;
        }
        var  r = o.records, t = o.totalRecords || r.length;
        if(!N || N.add !== true){
            if(this.pruneModifiedRecords){
                this.modified = [];
            }
            for(var  i = 0, len = r.length; i < len; i++){
                r[i].join(this);
            }
            if(this.snapshot){
                this.data = this.snapshot;
                delete  this.snapshot;
            }

            this.data.clear();
            this.data.addAll(r);
            this.totalLength = t;
            this.applySort();
            this.fireEvent("datachanged", this);
        }else {
            this.totalLength = Math.max(t, this.data.length+r.length);
            this.add(r);
        }

        this.fireEvent("load", this, r, N);
        if(N.callback){
            N.callback.call(N.scope || this, r, N, true);
        }
    },

    

    loadData : function(o, P){
        var  r = this.reader.readRecords(o);
        this.loadRecords(r, {add: P}, true);
    },

    

    getCount : function(){
        return  this.data.length || 0;
    },

    

    getTotalCount : function(){
        return  this.totalLength || 0;
    },

    

    getSortState : function(){
        return  this.sortInfo;
    },

    
    applySort : function(){
        if(this.sortInfo && !this.remoteSort){
            var  s = this.sortInfo, f = s.field;
            var  st = this.fields.get(f).sortType;
            var  fn = function(r1, r2){
                var  v1 = st(r1.data[f]), v2 = st(r2.data[f]);
                return  v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            };
            this.data.sort(s.direction, fn);
            if(this.snapshot && this.snapshot != this.data){
                this.snapshot.sort(s.direction, fn);
            }
        }
    },

    

    setDefaultSort : function(Q, R){
        this.sortInfo = {field: Q, direction: R ? R.toUpperCase() : "ASC"};
    },

    

    sort : function(S, T){
        var  f = this.fields.get(S);
        if(!T){
            if(this.sortInfo && this.sortInfo.field == f.name){ 
                T = (this.sortToggle[f.name] || "ASC").toggle("ASC", "DESC");
            }else {
                T = f.sortDir;
            }
        }

        this.sortToggle[f.name] = T;
        this.sortInfo = {field: f.name, direction: T};
        if(!this.remoteSort){
            this.applySort();
            this.fireEvent("datachanged", this);
        }else {
            this.load(this.lastOptions);
        }
    },

    

    each : function(fn, U){
        this.data.each(fn, U);
    },

    

    getModifiedRecords : function(){
        return  this.modified;
    },

    
    createFilterFn : function(V, W, X){
        if(!W.exec){ 
            W = String(W);
            if(W.length == 0){
                return  false;
            }

            W = new  RegExp((X === true ? '' : '^') + Roo.escapeRe(W), "i");
        }
        return  function(r){
            return  W.test(r.data[V]);
        };
    },

    

    sum : function(Y, Z, a){
        var  rs = this.data.items, v = 0;
        Z = Z || 0;
        a = (a || a === 0) ? a : rs.length-1;

        for(var  i = Z; i <= a; i++){
            v += (rs[i].data[Y] || 0);
        }
        return  v;
    },

    

    filter : function(b, c, d){
        var  fn = this.createFilterFn(b, c, d);
        return  fn ? this.filterBy(fn) : this.clearFilter();
    },

    

    filterBy : function(fn, e){
        this.snapshot = this.snapshot || this.data;
        this.data = this.queryBy(fn, e||this);
        this.fireEvent("datachanged", this);
    },

    

    query : function(g, h, j){
        var  fn = this.createFilterFn(g, h, j);
        return  fn ? this.queryBy(fn) : this.data.clone();
    },

    

    queryBy : function(fn, k){
        var  l = this.snapshot || this.data;
        return  l.filterBy(fn, k||this);
    },

    

    collect : function(m, n, q){
        var  d = (q === true && this.snapshot) ?
                this.snapshot.items : this.data.items;
        var  v, sv, r = [], l = {};
        for(var  i = 0, len = d.length; i < len; i++){
            v = d[i].data[m];
            sv = String(v);
            if((n || !Roo.isEmpty(v)) && !l[sv]){
                l[sv] = true;
                r[r.length] = v;
            }
        }
        return  r;
    },

    

    clearFilter : function(u){
        if(this.snapshot && this.snapshot != this.data){
            this.data = this.snapshot;
            delete  this.snapshot;
            if(u !== true){
                this.fireEvent("datachanged", this);
            }
        }
    },

    
    afterEdit : function(w){
        if(this.modified.indexOf(w) == -1){
            this.modified.push(w);
        }

        this.fireEvent("update", this, w, Roo.data.Record.EDIT);
    },

    
    afterReject : function(x){
        this.modified.remove(x);
        this.fireEvent("update", this, x, Roo.data.Record.REJECT);
    },

    
    afterCommit : function(y){
        this.modified.remove(y);
        this.fireEvent("update", this, y, Roo.data.Record.COMMIT);
    },

    

    commitChanges : function(){
        var  m = this.modified.slice(0);
        this.modified = [];
        for(var  i = 0, len = m.length; i < len; i++){
            m[i].commit();
        }
    },

    

    rejectChanges : function(){
        var  m = this.modified.slice(0);
        this.modified = [];
        for(var  i = 0, len = m.length; i < len; i++){
            m[i].reject();
        }
    },

    onMetaChange : function(z, AA, o){
        this.recordType = AA;
        this.fields = AA.prototype.fields;
        delete  this.snapshot;
        this.sortInfo = z.sortInfo;
        this.modified = [];
        this.fireEvent('metachange', this, this.reader.meta);
    }
});





Roo.data.SimpleStore = function(A){
    Roo.data.SimpleStore.superclass.constructor.call(this, {
        isLocal : true,
        reader: new  Roo.data.ArrayReader({
                id: A.id
            },
            Roo.data.Record.create(A.fields)
        ),
        proxy : new  Roo.data.MemoryProxy(A.data)
    });
    this.load();
};
Roo.extend(Roo.data.SimpleStore, Roo.data.Store);





Roo.data.JsonStore = function(c){
    Roo.data.JsonStore.superclass.constructor.call(this, Roo.apply(c, {
        proxy: !c.data ? new  Roo.data.HttpProxy({url: c.url}) : undefined,
        reader: new  Roo.data.JsonReader(c, c.fields)
    }));
};
Roo.extend(Roo.data.JsonStore, Roo.data.Store);



 
Roo.data.Field = function(A){
    if(typeof  A == "string"){
        A = {name: A};
    }

    Roo.apply(this, A);
    
    if(!this.type){
        this.type = "auto";
    }
    
    var  st = Roo.data.SortTypes;
    
    if(typeof  this.sortType == "string"){
        this.sortType = st[this.sortType];
    }
    
    
    if(!this.sortType){
        switch(this.type){
            case  "string":
                this.sortType = st.asUCString;
                break;
            case  "date":
                this.sortType = st.asDate;
                break;
            default:
                this.sortType = st.none;
        }
    }

    
    var  B = /[\$,%]/g;

    
    
    if(!this.convert){
        var  cv, dateFormat = this.dateFormat;
        switch(this.type){
            case  "":
            case  "auto":
            case  undefined:
                cv = function(v){ return  v; };
                break;
            case  "string":
                cv = function(v){ return  (v === undefined || v === null) ? '' : String(v); };
                break;
            case  "int":
                cv = function(v){
                    return  v !== undefined && v !== null && v !== '' ?
                           parseInt(String(v).replace(B, ""), 10) : '';
                    };
                break;
            case  "float":
                cv = function(v){
                    return  v !== undefined && v !== null && v !== '' ?
                           parseFloat(String(v).replace(B, ""), 10) : ''; 
                    };
                break;
            case  "bool":
            case  "boolean":
                cv = function(v){ return  v === true || v === "true" || v == 1; };
                break;
            case  "date":
                cv = function(v){
                    if(!v){
                        return  '';
                    }
                    if(v  instanceof  Date){
                        return  v;
                    }
                    if(dateFormat){
                        if(dateFormat == "timestamp"){
                            return  new  Date(v*1000);
                        }
                        return  Date.parseDate(v, dateFormat);
                    }
                    var  C = Date.parse(v);
                    return  C ? new  Date(C) : null;
                };
             break;
            
        }

        this.convert = cv;
    }
};

Roo.data.Field.prototype = {
    dateFormat: null,
    defaultValue: "",
    mapping: null,
    sortType : null,
    sortDir : "ASC"
};


 






Roo.data.DataReader = function(A, B){
    
    this.meta = A;
    
    this.recordType = B  instanceof  Array ? 
        Roo.data.Record.create(B) : B;
};

Roo.data.DataReader.prototype = {
     

    newRow :  function(d) {
        var  da =  {};
        this.recordType.prototype.fields.each(function(c) {
            switch( c.type) {
                case  'int' : da[c.name] = 0; break;
                case  'date' : da[c.name] = new  Date(); break;
                case  'float' : da[c.name] = 0.0; break;
                case  'boolean' : da[c.name] = false; break;
                default : da[c.name] = ""; break;
            }
            
        });
        return  new  this.recordType(Roo.apply(da, d));
    }
    
};





Roo.data.DataProxy = function(){
    this.addEvents({
        

        beforeload : true,
        

        load : true,
        

        loadexception : true
    });
    Roo.data.DataProxy.superclass.constructor.call(this);
};

Roo.extend(Roo.data.DataProxy, Roo.util.Observable);

    






Roo.data.MemoryProxy = function(A){
    if (A.data) {
        A = A.data;
    }

    Roo.data.MemoryProxy.superclass.constructor.call(this);
    this.data = A;
};

Roo.extend(Roo.data.MemoryProxy, Roo.data.DataProxy, {
    

    load : function(B, C, D, E, F){
        B = B || {};
        var  G;
        try {
            G = C.readRecords(this.data);
        }catch(e){
            this.fireEvent("loadexception", this, arg, null, e);
            callback.call(scope, null, arg, false);
            return;
        }

        D.call(E, G, F, true);
    },
    
    
    update : function(H, I){
        
    }
});




Roo.data.HttpProxy = function(A){
    Roo.data.HttpProxy.superclass.constructor.call(this);
    
    this.conn = A;
    this.useAjax = !A || !A.events;
  
};

Roo.extend(Roo.data.HttpProxy, Roo.data.DataProxy, {
    
    
    

    

    

    

    

     

  

    

    

    getConnection : function(){
        return  this.useAjax ? Roo.Ajax : this.conn;
    },

    

    load : function(B, C, D, E, F){
        if(this.fireEvent("beforeload", this, B) !== false){
            var   o = {
                params : B || {},
                request: {
                    callback : D,
                    scope : E,
                    arg : F
                },
                reader: C,
                callback : this.loadResponse,
                scope: this
            };
            if(this.useAjax){
                Roo.applyIf(o, this.conn);
                if(this.activeRequest){
                    Roo.Ajax.abort(this.activeRequest);
                }

                this.activeRequest = Roo.Ajax.request(o);
            }else {
                this.conn.request(o);
            }
        }else {
            D.call(E||this, null, F, false);
        }
    },

    
    loadResponse : function(o, G, H){
        delete  this.activeRequest;
        if(!G){
            this.fireEvent("loadexception", this, o, H);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }
        var  I;
        try {
            I = o.reader.read(H);
        }catch(e){
            this.fireEvent("loadexception", this, o, response, e);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }

        
        this.fireEvent("load", this, o, o.request.arg);
        o.request.callback.call(o.request.scope, I, o.request.arg, true);
    },

    
    update : function(J){

    },

    
    updateResponse : function(K){

    }
});





Roo.data.ScriptTagProxy = function(A){
    Roo.data.ScriptTagProxy.superclass.constructor.call(this);
    Roo.apply(this, A);
    this.head = document.getElementsByTagName("head")[0];
};

Roo.data.ScriptTagProxy.TRANS_ID = 1000;

Roo.extend(Roo.data.ScriptTagProxy, Roo.data.DataProxy, {
    

    

    timeout : 30000,
    

    callbackParam : "callback",
    

    nocache : true,

    

    load : function(B, C, D, E, F){
        if(this.fireEvent("beforeload", this, B) !== false){

            var  p = Roo.urlEncode(Roo.apply(B, this.extraParams));

            var  url = this.url;
            url += (url.indexOf("?") != -1 ? "&" : "?") + p;
            if(this.nocache){
                url += "&_dc=" + (new  Date().getTime());
            }
            var  transId = ++Roo.data.ScriptTagProxy.TRANS_ID;
            var  trans = {
                id : transId,
                cb : "stcCallback"+transId,
                scriptId : "stcScript"+transId,
                params : B,
                arg : F,
                url : url,
                callback : D,
                scope : E,
                reader : C
            };
            var  conn = this;

            window[trans.cb] = function(o){
                conn.handleResponse(o, trans);
            };

            url += String.format("&{0}={1}", this.callbackParam, trans.cb);

            if(this.autoAbort !== false){
                this.abort();
            }


            trans.timeoutId = this.handleFailure.defer(this.timeout, this, [trans]);

            var  script = document.createElement("script");
            script.setAttribute("src", url);
            script.setAttribute("type", "text/javascript");
            script.setAttribute("id", trans.scriptId);
            this.head.appendChild(script);

            this.trans = trans;
        }else {
            D.call(E||this, null, F, false);
        }
    },

    
    isLoading : function(){
        return  this.trans ? true : false;
    },

    

    abort : function(){
        if(this.isLoading()){
            this.destroyTrans(this.trans);
        }
    },

    
    destroyTrans : function(G, H){
        this.head.removeChild(document.getElementById(G.scriptId));
        clearTimeout(G.timeoutId);
        if(H){
            window[G.cb] = undefined;
            try{
                delete  window[G.cb];
            }catch(e){}
        }else {
            
            window[G.cb] = function(){
                window[G.cb] = undefined;
                try{
                    delete  window[G.cb];
                }catch(e){}
            };
        }
    },

    
    handleResponse : function(o, I){
        this.trans = false;
        this.destroyTrans(I, true);
        var  J;
        try {
            J = I.reader.readRecords(o);
        }catch(e){
            this.fireEvent("loadexception", this, o, trans.arg, e);
            trans.callback.call(trans.scope||window, null, trans.arg, false);
            return;
        }

        this.fireEvent("load", this, o, I.arg);
        I.callback.call(I.scope||window, J, I.arg, true);
    },

    
    handleFailure : function(K){
        this.trans = false;
        this.destroyTrans(K, false);
        this.fireEvent("loadexception", this, null, K.arg);
        K.callback.call(K.scope||window, null, K.arg, false);
    }
});





Roo.data.JsonReader = function(meta, recordType){
    
    meta = meta || {};
    
    Roo.applyIf(meta, {
        totalProperty: 'total',
        successProperty : 'success',
        root : 'data',
        id : 'id'
    });
    
    Roo.data.JsonReader.superclass.constructor.call(this, meta, recordType||meta.fields);
};
Roo.extend(Roo.data.JsonReader, Roo.data.DataReader, {
    

    read : function(response){
        var  json = response.responseText;
        

        var  o = eval("("+json+")");
        if(!o) {
            throw  {message: "JsonReader.read: Json object not found"};
        }
        
        if(o.metaData){
            delete  this.ef;
            this.meta = o.metaData;
            this.recordType = Roo.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        return  this.readRecords(o);
    },

    
    onMetaChange : function(meta, recordType, o){

    },

    

    simpleAccess: function(obj, subsc) {
    	return  obj[subsc];
    },

	

    getJsonAccessor: function(){
        var  re = /[\[\.]/;
        return  function(expr) {
            try {
                return (re.test(expr))
                    ? new  Function("obj", "return obj." + expr)
                    : function(obj){
                        return  obj[expr];
                    };
            } catch(e){}
            return  Roo.emptyFn;
        };
    }(),

    

    readRecords : function(o){
        

        this.jsonData = o;
        var  s = this.meta, Record = this.recordType,
            f = Record.prototype.fields, fi = f.items, fl = f.length;


        if (!this.ef) {
            if(s.totalProperty) {
	            this.getTotal = this.getJsonAccessor(s.totalProperty);
	        }
	        if(s.successProperty) {
	            this.getSuccess = this.getJsonAccessor(s.successProperty);
	        }

	        this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return  p;};
	        if (s.id) {
	        	var  g = this.getJsonAccessor(s.id);
	        	this.getId = function(rec) {
	        		var  r = g(rec);
		        	return  (r === undefined || r === "") ? null : r;
	        	};
	        } else  {
	        	this.getId = function(){return  null;};
	        }

            this.ef = [];
            for(var  i = 0; i < fl; i++){
                f = fi[i];
                var  map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
                this.ef[i] = this.getJsonAccessor(map);
            }
        }

    	var  root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
    	if(s.totalProperty){
            var  v = parseInt(this.getTotal(o), 10);
            if(!isNaN(v)){
                totalRecords = v;
            }
        }
        if(s.successProperty){
            var  v = this.getSuccess(o);
            if(v === false || v === 'false'){
                success = false;
            }
        }
        var  records = [];
	    for(var  i = 0; i < c; i++){
		    var  n = root[i];
	        var  values = {};
	        var  id = this.getId(n);
	        for(var  j = 0; j < fl; j++){
	            f = fi[j];
                var  v = this.ef[j](n);
                values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue);
	        }
	        var  record = new  Record(values, id);
	        record.json = n;
	        records[i] = record;
	    }
	    return  {
	        success : success,
	        records : records,
	        totalRecords : totalRecords
	    };
    }
});





Roo.data.XmlReader = function(A, B){
    A = A || {};
    Roo.data.XmlReader.superclass.constructor.call(this, A, B||A.fields);
};
Roo.extend(Roo.data.XmlReader, Roo.data.DataReader, {
    

    read : function(C){
        var  D = C.responseXML;
        if(!D) {
            throw  {message: "XmlReader.read: XML Document not available"};
        }
        return  this.readRecords(D);
    },

    

    readRecords : function(E){
        

        this.xmlData = E;
        var  F = E.documentElement || E;
    	var  q = Roo.DomQuery;
    	var  G = this.recordType, H = G.prototype.fields;
    	var  I = this.meta.id;
    	var  J = 0, K = true;
    	if(this.meta.totalRecords){
    	    J = q.selectNumber(this.meta.totalRecords, F, 0);
    	}
        
        if(this.meta.success){
            var  sv = q.selectValue(this.meta.success, F, true);
            K = sv !== false && sv !== 'false';
    	}
    	var  L = [];
    	var  ns = q.select(this.meta.record, F);
        for(var  i = 0, len = ns.length; i < len; i++) {
	        var  n = ns[i];
	        var  values = {};
	        var  id = I ? q.selectValue(I, n) : undefined;
	        for(var  j = 0, jlen = H.length; j < jlen; j++){
	            var  f = H.items[j];
                var  v = q.selectValue(f.mapping || f.name, n, f.defaultValue);
	            v = f.convert(v);
	            values[f.name] = v;
	        }
	        var  record = new  G(values, id);
	        record.node = n;
	        L[L.length] = record;
	    }

	    return  {
	        success : K,
	        records : L,
	        totalRecords : J || L.length
	    };
    }
});





Roo.data.ArrayReader = function(A, B){
    Roo.data.ArrayReader.superclass.constructor.call(this, A, B);
};

Roo.extend(Roo.data.ArrayReader, Roo.data.JsonReader, {
    

    readRecords : function(o){
        var  C = this.meta ? this.meta.id : null;
    	var  D = this.recordType, E = D.prototype.fields;
    	var  F = [];
    	var  G = o;
	    for(var  i = 0; i < G.length; i++){
		    var  n = G[i];
	        var  values = {};
	        var  id = ((C || C === 0) && n[C] !== undefined && n[C] !== "" ? n[C] : null);
	        for(var  j = 0, jlen = E.length; j < jlen; j++){
                var  f = E.items[j];
                var  k = f.mapping !== undefined && f.mapping !== null ? f.mapping : j;
                var  v = n[k] !== undefined ? n[k] : f.defaultValue;
                v = f.convert(v);
                values[f.name] = v;
            }
	        var  record = new  D(values, id);
	        record.json = n;
	        F[F.length] = record;
	    }
	    return  {
	        records : F,
	        totalRecords : F.length
	    };
    }
});






Roo.data.Tree = function(A){
   this.nodeHash = {};
   

   this.root = null;
   if(A){
       this.setRootNode(A);
   }

   this.addEvents({
       

       "append" : true,
       

       "remove" : true,
       

       "move" : true,
       

       "insert" : true,
       

       "beforeappend" : true,
       

       "beforeremove" : true,
       

       "beforemove" : true,
       

       "beforeinsert" : true
   });

    Roo.data.Tree.superclass.constructor.call(this);
};

Roo.extend(Roo.data.Tree, Roo.util.Observable, {
    pathSeparator: "/",

    proxyNodeEvent : function(){
        return  this.fireEvent.apply(this, arguments);
    },

    

    getRootNode : function(){
        return  this.root;
    },

    

    setRootNode : function(B){
        this.root = B;
        B.ownerTree = this;
        B.isRoot = true;
        this.registerNode(B);
        return  B;
    },

    

    getNodeById : function(id){
        return  this.nodeHash[id];
    },

    registerNode : function(C){
        this.nodeHash[C.id] = C;
    },

    unregisterNode : function(D){
        delete  this.nodeHash[D.id];
    },

    toString : function(){
        return  "[Tree"+(this.id?" "+this.id:"")+"]";
    }
});



Roo.data.Node = function(E){
    

    this.attributes = E || {};
    this.leaf = this.attributes.leaf;
    

    this.id = this.attributes.id;
    if(!this.id){
        this.id = Roo.id(null, "ynode-");
        this.attributes.id = this.id;
    }

    

    this.childNodes = [];
    if(!this.childNodes.indexOf){ 
        this.childNodes.indexOf = function(o){
            for(var  i = 0, len = this.length; i < len; i++){
                if(this[i] == o) return  i;
            }
            return  -1;
        };
    }

    

    this.parentNode = null;
    

    this.firstChild = null;
    

    this.lastChild = null;
    

    this.previousSibling = null;
    

    this.nextSibling = null;

    this.addEvents({
       

       "append" : true,
       

       "remove" : true,
       

       "move" : true,
       

       "insert" : true,
       

       "beforeappend" : true,
       

       "beforeremove" : true,
       

       "beforemove" : true,
       

       "beforeinsert" : true
   });
    this.listeners = this.attributes.listeners;
    Roo.data.Node.superclass.constructor.call(this);
};

Roo.extend(Roo.data.Node, Roo.util.Observable, {
    fireEvent : function(F){
        
        if(Roo.data.Node.superclass.fireEvent.apply(this, arguments) === false){
            return  false;
        }
        
        var  ot = this.getOwnerTree();
        if(ot){
            if(ot.proxyNodeEvent.apply(ot, arguments) === false){
                return  false;
            }
        }
        return  true;
    },

    

    isLeaf : function(){
        return  this.leaf === true;
    },

    
    setFirstChild : function(G){
        this.firstChild = G;
    },

    
    setLastChild : function(H){
        this.lastChild = H;
    },


    

    isLast : function(){
       return  (!this.parentNode ? true : this.parentNode.lastChild == this);
    },

    

    isFirst : function(){
       return  (!this.parentNode ? true : this.parentNode.firstChild == this);
    },

    hasChildNodes : function(){
        return  !this.isLeaf() && this.childNodes.length > 0;
    },

    

    appendChild : function(I){
        var  J = false;
        if(I  instanceof  Array){
            J = I;
        }else  if(arguments.length > 1){
            J = arguments;
        }
        
        if(J){
            for(var  i = 0, len = J.length; i < len; i++) {
            	this.appendChild(J[i]);
            }
        }else {
            if(this.fireEvent("beforeappend", this.ownerTree, this, I) === false){
                return  false;
            }
            var  index = this.childNodes.length;
            var  oldParent = I.parentNode;
            
            if(oldParent){
                if(I.fireEvent("beforemove", I.getOwnerTree(), I, oldParent, this, index) === false){
                    return  false;
                }

                oldParent.removeChild(I);
            }

            index = this.childNodes.length;
            if(index == 0){
                this.setFirstChild(I);
            }

            this.childNodes.push(I);
            I.parentNode = this;
            var  ps = this.childNodes[index-1];
            if(ps){
                I.previousSibling = ps;
                ps.nextSibling = I;
            }else {
                I.previousSibling = null;
            }

            I.nextSibling = null;
            this.setLastChild(I);
            I.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, I, index);
            if(oldParent){
                I.fireEvent("move", this.ownerTree, I, oldParent, this, index);
            }
            return  I;
        }
    },

    

    removeChild : function(K){
        var  L = this.childNodes.indexOf(K);
        if(L == -1){
            return  false;
        }
        if(this.fireEvent("beforeremove", this.ownerTree, this, K) === false){
            return  false;
        }


        
        this.childNodes.splice(L, 1);

        
        if(K.previousSibling){
            K.previousSibling.nextSibling = K.nextSibling;
        }
        if(K.nextSibling){
            K.nextSibling.previousSibling = K.previousSibling;
        }

        
        if(this.firstChild == K){
            this.setFirstChild(K.nextSibling);
        }
        if(this.lastChild == K){
            this.setLastChild(K.previousSibling);
        }


        K.setOwnerTree(null);
        
        K.parentNode = null;
        K.previousSibling = null;
        K.nextSibling = null;
        this.fireEvent("remove", this.ownerTree, this, K);
        return  K;
    },

    

    insertBefore : function(M, N){
        if(!N){ 
            return  this.appendChild(M);
        }
        
        if(M == N){
            return  false;
        }

        if(this.fireEvent("beforeinsert", this.ownerTree, this, M, N) === false){
            return  false;
        }
        var  O = this.childNodes.indexOf(N);
        var  P = M.parentNode;
        var  Q = O;

        
        if(P == this && this.childNodes.indexOf(M) < O){
            Q--;
        }

        
        if(P){
            if(M.fireEvent("beforemove", M.getOwnerTree(), M, P, this, O, N) === false){
                return  false;
            }

            P.removeChild(M);
        }
        if(Q == 0){
            this.setFirstChild(M);
        }

        this.childNodes.splice(Q, 0, M);
        M.parentNode = this;
        var  ps = this.childNodes[Q-1];
        if(ps){
            M.previousSibling = ps;
            ps.nextSibling = M;
        }else {
            M.previousSibling = null;
        }

        M.nextSibling = N;
        N.previousSibling = M;
        M.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, M, N);
        if(P){
            M.fireEvent("move", this.ownerTree, M, P, this, Q, N);
        }
        return  M;
    },

    

    item : function(R){
        return  this.childNodes[R];
    },

    

    replaceChild : function(S, T){
        this.insertBefore(S, T);
        this.removeChild(T);
        return  T;
    },

    

    indexOf : function(U){
        return  this.childNodes.indexOf(U);
    },

    

    getOwnerTree : function(){
        
        if(!this.ownerTree){
            var  p = this;
            while(p){
                if(p.ownerTree){
                    this.ownerTree = p.ownerTree;
                    break;
                }

                p = p.parentNode;
            }
        }
        return  this.ownerTree;
    },

    

    getDepth : function(){
        var  V = 0;
        var  p = this;
        while(p.parentNode){
            ++V;
            p = p.parentNode;
        }
        return  V;
    },

    
    setOwnerTree : function(W){
        
        if(W != this.ownerTree){
            if(this.ownerTree){
                this.ownerTree.unregisterNode(this);
            }

            this.ownerTree = W;
            var  cs = this.childNodes;
            for(var  i = 0, len = cs.length; i < len; i++) {
            	cs[i].setOwnerTree(W);
            }
            if(W){
                W.registerNode(this);
            }
        }
    },

    

    getPath : function(X){
        X = X || "id";
        var  p = this.parentNode;
        var  b = [this.attributes[X]];
        while(p){
            b.unshift(p.attributes[X]);
            p = p.parentNode;
        }
        var  Y = this.getOwnerTree().pathSeparator;
        return  Y + b.join(Y);
    },

    

    bubble : function(fn, Z, a){
        var  p = this;
        while(p){
            if(fn.call(Z || p, a || p) === false){
                break;
            }

            p = p.parentNode;
        }
    },

    

    cascade : function(fn, c, d){
        if(fn.call(c || this, d || this) !== false){
            var  cs = this.childNodes;
            for(var  i = 0, len = cs.length; i < len; i++) {
            	cs[i].cascade(fn, c, d);
            }
        }
    },

    

    eachChild : function(fn, e, f){
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++) {
        	if(fn.call(e || this, f || cs[i]) === false){
        	    break;
        	}
        }
    },

    

    findChild : function(g, h){
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++) {
        	if(cs[i].attributes[g] == h){
        	    return  cs[i];
        	}
        }
        return  null;
    },

    

    findChildBy : function(fn, j){
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++) {
        	if(fn.call(j||cs[i], cs[i]) === true){
        	    return  cs[i];
        	}
        }
        return  null;
    },

    

    sort : function(fn, k){
        var  cs = this.childNodes;
        var  l = cs.length;
        if(l > 0){
            var  sortFn = k ? function(){fn.apply(k, arguments);} : fn;
            cs.sort(sortFn);
            for(var  i = 0; i < l; i++){
                var  n = cs[i];
                n.previousSibling = cs[i-1];
                n.nextSibling = cs[i+1];
                if(i == 0){
                    this.setFirstChild(n);
                }
                if(i == l-1){
                    this.setLastChild(n);
                }
            }
        }
    },

    

    contains : function(m){
        return  m.isAncestor(this);
    },

    

    isAncestor : function(o){
        var  p = this.parentNode;
        while(p){
            if(p == o){
                return  true;
            }

            p = p.parentNode;
        }
        return  false;
    },

    toString : function(){
        return  "[Node"+(this.id?" "+this.id:"")+"]";
    }
});


 



Roo.ComponentMgr = function(){
    var  A = new  Roo.util.MixedCollection();

    return  {
        

        register : function(c){
            A.add(c);
        },

        

        unregister : function(c){
            A.remove(c);
        },

        

        get : function(id){
            return  A.get(id);
        },

        

        onAvailable : function(id, fn, C){
            A.on("add", function(D, o){
                if(o.id == id){
                    fn.call(C || o, o);
                    A.un("add", fn, C);
                }
            });
        }
    };
}();


 


Roo.Component = function(A){
    A = A || {};
    if(A.tagName || A.dom || typeof  A == "string"){ 
        A = {el: A, id: A.id || A};
    }

    this.initialConfig = A;

    Roo.apply(this, A);
    this.addEvents({
        

        disable : true,
        

        enable : true,
        

        beforeshow : true,
        

        show : true,
        

        beforehide : true,
        

        hide : true,
        

        beforerender : true,
        

        render : true,
        

        beforedestroy : true,
        

        destroy : true
    });
    if(!this.id){
        this.id = "ext-comp-" + (++Roo.Component.AUTO_ID);
    }

    Roo.ComponentMgr.register(this);
    Roo.Component.superclass.constructor.call(this);
    this.initComponent();
    if(this.renderTo){ 
        this.render(this.renderTo);
        delete  this.renderTo;
    }
};


Roo.Component.AUTO_ID = 1000;

Roo.extend(Roo.Component, Roo.util.Observable, {
    

    hidden : false,
    

    disabled : false,
    

    rendered : false,
    
    

    disabledClass : "x-item-disabled",
	

    allowDomMove : true,
    

    hideMode: 'display',

    
    ctype : "Roo.Component",

    

    actionMode : "el",

    
    getActionEl : function(){
        return  this[this.actionMode];
    },

    initComponent : Roo.emptyFn,
    

    render : function(B, C){
        if(!this.rendered && this.fireEvent("beforerender", this) !== false){
            if(!B && this.el){
                this.el = Roo.get(this.el);
                B = this.el.dom.parentNode;
                this.allowDomMove = false;
            }

            this.container = Roo.get(B);
            this.rendered = true;
            if(C !== undefined){
                if(typeof  C == 'number'){
                    C = this.container.dom.childNodes[C];
                }else {
                    C = Roo.getDom(C);
                }
            }

            this.onRender(this.container, C || null);
            if(this.cls){
                this.el.addClass(this.cls);
                delete  this.cls;
            }
            if(this.style){
                this.el.applyStyles(this.style);
                delete  this.style;
            }

            this.fireEvent("render", this);
            this.afterRender(this.container);
            if(this.hidden){
                this.hide();
            }
            if(this.disabled){
                this.disable();
            }
        }
        return  this;
    },

    
    
    onRender : function(ct, D){
        if(this.el){
            this.el = Roo.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, D);
            }
        }
    },

    
    getAutoCreate : function(){
        var  E = typeof  this.autoCreate == "object" ?
                      this.autoCreate : Roo.apply({}, this.defaultAutoCreate);
        if(this.id && !E.id){
            E.id = this.id;
        }
        return  E;
    },

    
    afterRender : Roo.emptyFn,

    

    destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.purgeListeners();
            this.beforeDestroy();
            if(this.rendered){
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container"){
                    this.container.remove();
                }
            }

            this.onDestroy();
            Roo.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
        }
    },

	
    beforeDestroy : function(){

    },

	
	onDestroy : function(){

    },

    

    getEl : function(){
        return  this.el;
    },

    

    getId : function(){
        return  this.id;
    },

    

    focus : function(F){
        if(this.rendered){
            this.el.focus();
            if(F === true){
                this.el.dom.select();
            }
        }
        return  this;
    },

    
    blur : function(){
        if(this.rendered){
            this.el.blur();
        }
        return  this;
    },

    

    disable : function(){
        if(this.rendered){
            this.onDisable();
        }

        this.disabled = true;
        this.fireEvent("disable", this);
        return  this;
    },

	
    onDisable : function(){
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
    },

    

    enable : function(){
        if(this.rendered){
            this.onEnable();
        }

        this.disabled = false;
        this.fireEvent("enable", this);
        return  this;
    },

	
    onEnable : function(){
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
    },

    

    setDisabled : function(G){
        this[G ? "disable" : "enable"]();
    },

    

    show: function(){
        if(this.fireEvent("beforeshow", this) !== false){
            this.hidden = false;
            if(this.rendered){
                this.onShow();
            }

            this.fireEvent("show", this);
        }
        return  this;
    },

    
    onShow : function(){
        var  ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "visible";
        }else  if(this.hideMode == 'offsets'){
            ae.removeClass('x-hidden');
        }else {
            ae.dom.style.display = "";
        }
    },

    

    hide: function(){
        if(this.fireEvent("beforehide", this) !== false){
            this.hidden = true;
            if(this.rendered){
                this.onHide();
            }

            this.fireEvent("hide", this);
        }
        return  this;
    },

    
    onHide : function(){
        var  ae = this.getActionEl();
        if(this.hideMode == 'visibility'){
            ae.dom.style.visibility = "hidden";
        }else  if(this.hideMode == 'offsets'){
            ae.addClass('x-hidden');
        }else {
            ae.dom.style.display = "none";
        }
    },

    

    setVisible: function(H){
        if(H) {
            this.show();
        }else {
            this.hide();
        }
        return  this;
    },

    

    isVisible : function(){
        return  this.getActionEl().isVisible();
    },

    cloneConfig : function(I){
        I = I || {};
        var  id = I.id || Roo.id();
        var  J = Roo.applyIf(I, this.initialConfig);
        J.id = id; 
        return  new  this.constructor(J);
    }
});


 (function(){ 



Roo.Layer = function(C, D){
    C = C || {};
    var  dh = Roo.DomHelper;
    var  cp = C.parentEl, E = cp ? Roo.getDom(cp) : document.body;
    if(D){
        this.dom = Roo.getDom(D);
    }
    if(!this.dom){
        var  o = C.dh || {tag: "div", cls: "x-layer"};
        this.dom = dh.append(E, o);
    }
    if(C.cls){
        this.addClass(C.cls);
    }

    this.constrain = C.constrain !== false;
    this.visibilityMode = Roo.Element.VISIBILITY;
    if(C.id){
        this.id = this.dom.id = C.id;
    }else {
        this.id = Roo.id(this.dom);
    }

    this.zindex = C.zindex || this.getZIndex();
    this.position("absolute", this.zindex);
    if(C.shadow){
        this.shadowOffset = C.shadowOffset || 4;
        this.shadow = new  Roo.Shadow({
            offset : this.shadowOffset,
            mode : C.shadow
        });
    }else {
        this.shadowOffset = 0;
    }

    this.useShim = C.shim !== false && Roo.useShims;
    this.useDisplay = C.useDisplay;
    this.hide();
};

var  A = Roo.Element.prototype;


var  B = [];

Roo.extend(Roo.Layer, Roo.Element, {

    getZIndex : function(){
        return  this.zindex || parseInt(this.getStyle("z-index"), 10) || 11000;
    },

    getShim : function(){
        if(!this.useShim){
            return  null;
        }
        if(this.shim){
            return  this.shim;
        }
        var  C = B.shift();
        if(!C){
            C = this.createShim();
            C.enableDisplayMode('block');
            C.dom.style.display = 'none';
            C.dom.style.visibility = 'visible';
        }
        var  pn = this.dom.parentNode;
        if(C.dom.parentNode != pn){
            pn.insertBefore(C.dom, this.dom);
        }

        C.setStyle('z-index', this.getZIndex()-2);
        this.shim = C;
        return  C;
    },

    hideShim : function(){
        if(this.shim){
            this.shim.setDisplayed(false);
            B.push(this.shim);
            delete  this.shim;
        }
    },

    disableShadow : function(){
        if(this.shadow){
            this.shadowDisabled = true;
            this.shadow.hide();
            this.lastShadowOffset = this.shadowOffset;
            this.shadowOffset = 0;
        }
    },

    enableShadow : function(D){
        if(this.shadow){
            this.shadowDisabled = false;
            this.shadowOffset = this.lastShadowOffset;
            delete  this.lastShadowOffset;
            if(D){
                this.sync(true);
            }
        }
    },

    
    
    
    sync : function(E){
        var  sw = this.shadow;
        if(!this.updating && this.isVisible() && (sw || this.useShim)){
            var  sh = this.getShim();

            var  w = this.getWidth(),
                h = this.getHeight();

            var  l = this.getLeft(true),
                t = this.getTop(true);

            if(sw && !this.shadowDisabled){
                if(E && !sw.isVisible()){
                    sw.show(this);
                }else {
                    sw.realign(l, t, w, h);
                }
                if(sh){
                    if(E){
                       sh.show();
                    }
                    
                    var  a = sw.adjusts, s = sh.dom.style;
                    s.left = (Math.min(l, l+a.l))+"px";
                    s.top = (Math.min(t, t+a.t))+"px";
                    s.width = (w+a.w)+"px";
                    s.height = (h+a.h)+"px";
                }
            }else  if(sh){
                if(E){
                   sh.show();
                }

                sh.setSize(w, h);
                sh.setLeftTop(l, t);
            }
            
        }
    },

    
    destroy : function(){
        this.hideShim();
        if(this.shadow){
            this.shadow.hide();
        }

        this.removeAllListeners();
        var  pn = this.dom.parentNode;
        if(pn){
            pn.removeChild(this.dom);
        }

        Roo.Element.uncache(this.id);
    },

    remove : function(){
        this.destroy();
    },

    
    beginUpdate : function(){
        this.updating = true;
    },

    
    endUpdate : function(){
        this.updating = false;
        this.sync(true);
    },

    
    hideUnders : function(F){
        if(this.shadow){
            this.shadow.hide();
        }

        this.hideShim();
    },

    
    constrainXY : function(){
        if(this.constrain){
            var  vw = Roo.lib.Dom.getViewWidth(),
                vh = Roo.lib.Dom.getViewHeight();
            var  s = Roo.get(document).getScroll();

            var  xy = this.getXY();
            var  x = xy[0], y = xy[1];   
            var  w = this.dom.offsetWidth+this.shadowOffset, h = this.dom.offsetHeight+this.shadowOffset;
            
            var  moved = false;
            
            if((x + w) > vw+s.left){
                x = vw - w - this.shadowOffset;
                moved = true;
            }
            if((y + h) > vh+s.top){
                y = vh - h - this.shadowOffset;
                moved = true;
            }
            
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                if(this.avoidY){
                    var  ay = this.avoidY;
                    if(y <= ay && (y+h) >= ay){
                        y = ay-h-5;   
                    }
                }

                xy = [x, y];
                this.storeXY(xy);
                A.setXY.call(this, xy);
                this.sync();
            }
        }
    },

    isVisible : function(){
        return  this.visible;    
    },

    
    showAction : function(){
        this.visible = true; 
        if(this.useDisplay === true){
            this.setDisplayed("");
        }else  if(this.lastXY){
            A.setXY.call(this, this.lastXY);
        }else  if(this.lastLT){
            A.setLeftTop.call(this, this.lastLT[0], this.lastLT[1]);
        }
    },

    
    hideAction : function(){
        this.visible = false;
        if(this.useDisplay === true){
            this.setDisplayed(false);
        }else {
            this.setLeftTop(-10000,-10000);
        }
    },

    
    setVisible : function(v, a, d, c, e){
        if(v){
            this.showAction();
        }
        if(a && v){
            var  cb = function(){
                this.sync(true);
                if(c){
                    c();
                }
            }.createDelegate(this);
            A.setVisible.call(this, true, true, d, cb, e);
        }else {
            if(!v){
                this.hideUnders(true);
            }
            var  cb = c;
            if(a){
                cb = function(){
                    this.hideAction();
                    if(c){
                        c();
                    }
                }.createDelegate(this);
            }

            A.setVisible.call(this, v, a, d, cb, e);
            if(v){
                this.sync(true);
            }else  if(!a){
                this.hideAction();
            }
        }
    },

    storeXY : function(xy){
        delete  this.lastLT;
        this.lastXY = xy;
    },

    storeLeftTop : function(G, H){
        delete  this.lastXY;
        this.lastLT = [G, H];
    },

    
    beforeFx : function(){
        this.beforeAction();
        return  Roo.Layer.superclass.beforeFx.apply(this, arguments);
    },

    
    afterFx : function(){
        Roo.Layer.superclass.afterFx.apply(this, arguments);
        this.sync(this.isVisible());
    },

    
    beforeAction : function(){
        if(!this.updating && this.shadow){
            this.shadow.hide();
        }
    },

    
    setLeft : function(I){
        this.storeLeftTop(I, this.getTop(true));
        A.setLeft.apply(this, arguments);
        this.sync();
    },

    setTop : function(J){
        this.storeLeftTop(this.getLeft(true), J);
        A.setTop.apply(this, arguments);
        this.sync();
    },

    setLeftTop : function(K, L){
        this.storeLeftTop(K, L);
        A.setLeftTop.apply(this, arguments);
        this.sync();
    },

    setXY : function(xy, a, d, c, e){
        this.fixDisplay();
        this.beforeAction();
        this.storeXY(xy);
        var  cb = this.createCB(c);
        A.setXY.call(this, xy, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    
    createCB : function(c){
        var  el = this;
        return  function(){
            el.constrainXY();
            el.sync(true);
            if(c){
                c();
            }
        };
    },

    
    setX : function(x, a, d, c, e){
        this.setXY([x, this.getY()], a, d, c, e);
    },

    
    setY : function(y, a, d, c, e){
        this.setXY([this.getX(), y], a, d, c, e);
    },

    
    setSize : function(w, h, a, d, c, e){
        this.beforeAction();
        var  cb = this.createCB(c);
        A.setSize.call(this, w, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    
    setWidth : function(w, a, d, c, e){
        this.beforeAction();
        var  cb = this.createCB(c);
        A.setWidth.call(this, w, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    
    setHeight : function(h, a, d, c, e){
        this.beforeAction();
        var  cb = this.createCB(c);
        A.setHeight.call(this, h, a, d, cb, e);
        if(!a){
            cb();
        }
    },

    
    setBounds : function(x, y, w, h, a, d, c, e){
        this.beforeAction();
        var  cb = this.createCB(c);
        if(!a){
            this.storeXY([x, y]);
            A.setXY.call(this, [x, y]);
            A.setSize.call(this, w, h, a, d, cb, e);
            cb();
        }else {
            A.setBounds.call(this, x, y, w, h, a, d, cb, e);
        }
        return  this;
    },
    
    

    setZIndex : function(M){
        this.zindex = M;
        this.setStyle("z-index", M + 2);
        if(this.shadow){
            this.shadow.setZIndex(M + 1);
        }
        if(this.shim){
            this.shim.setStyle("z-index", M);
        }
    }
});
})();






Roo.Shadow = function(A){
    Roo.apply(this, A);
    if(typeof  this.mode != "string"){
        this.mode = this.defaultMode;
    }
    var  o = this.offset, a = {h: 0};
    var  B = Math.floor(this.offset/2);
    switch(this.mode.toLowerCase()){ 
        case  "drop":
            a.w = 0;
            a.l = a.t = o;
            a.t -= 1;
            if(Roo.isIE){
                a.l -= this.offset + B;
                a.t -= this.offset + B;
                a.w -= B;
                a.h -= B;
                a.t += 1;
            }
        break;
        case  "sides":
            a.w = (o*2);
            a.l = -o;
            a.t = o-1;
            if(Roo.isIE){
                a.l -= (this.offset - B);
                a.t -= this.offset + B;
                a.l += 1;
                a.w -= (this.offset - B)*2;
                a.w -= B + 1;
                a.h -= 1;
            }
        break;
        case  "frame":
            a.w = a.h = (o*2);
            a.l = a.t = -o;
            a.t += 1;
            a.h -= 2;
            if(Roo.isIE){
                a.l -= (this.offset - B);
                a.t -= (this.offset - B);
                a.l += 1;
                a.w -= (this.offset + B + 1);
                a.h -= (this.offset + B);
                a.h += 1;
            }
        break;
    };

    this.adjusts = a;
};

Roo.Shadow.prototype = {
    

    

    offset: 4,

    
    defaultMode: "drop",

    

    show : function(C){
        C = Roo.get(C);
        if(!this.el){
            this.el = Roo.Shadow.Pool.pull();
            if(this.el.dom.nextSibling != C.dom){
                this.el.insertBefore(C);
            }
        }

        this.el.setStyle("z-index", this.zIndex || parseInt(C.getStyle("z-index"), 10)-1);
        if(Roo.isIE){
            this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")";
        }

        this.realign(
            C.getLeft(true),
            C.getTop(true),
            C.getWidth(),
            C.getHeight()
        );
        this.el.dom.style.display = "block";
    },

    

    isVisible : function(){
        return  this.el ? true : false;  
    },

    

    realign : function(l, t, w, h){
        if(!this.el){
            return;
        }
        var  a = this.adjusts, d = this.el.dom, s = d.style;
        var  D = 0;
        s.left = (l+a.l)+"px";
        s.top = (t+a.t)+"px";
        var  sw = (w+a.w), sh = (h+a.h), E = sw +"px", F = sh + "px";
        if(s.width != E || s.height != F){
            s.width = E;
            s.height = F;
            if(!Roo.isIE){
                var  cn = d.childNodes;
                var  sww = Math.max(0, (sw-12))+"px";
                cn[0].childNodes[1].style.width = sww;
                cn[1].childNodes[1].style.width = sww;
                cn[2].childNodes[1].style.width = sww;
                cn[1].style.height = Math.max(0, (sh-12))+"px";
            }
        }
    },

    

    hide : function(){
        if(this.el){
            this.el.dom.style.display = "none";
            Roo.Shadow.Pool.push(this.el);
            delete  this.el;
        }
    },

    

    setZIndex : function(z){
        this.zIndex = z;
        if(this.el){
            this.el.setStyle("z-index", z);
        }
    }
};


Roo.Shadow.Pool = function(){
    var  p = [];
    var  G = Roo.isIE ?
                 '<div class="x-ie-shadow"></div>' :
                 '<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
    return  {
        pull : function(){
            var  sh = p.shift();
            if(!sh){
                sh = Roo.get(Roo.DomHelper.insertHtml("beforeBegin", document.body.firstChild, G));
                sh.autoBoxAdjust = false;
            }
            return  sh;
        },

        push : function(sh){
            p.push(sh);
        }
    };
}();





Roo.BoxComponent = function(A){
    Roo.Component.call(this, A);
    this.addEvents({
        

        resize : true,
        

        move : true
    });
};

Roo.extend(Roo.BoxComponent, Roo.Component, {
    
    boxReady : false,
    
    deferHeight: false,
    

     

     
    

    setSize : function(w, h){
        
        if(typeof  w == 'object'){
            h = w.height;
            w = w.width;
        }
        
        if(!this.boxReady){
            this.width = w;
            this.height = h;
            return  this;
        }

        
        if(this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return  this;
        }

        this.lastSize = {width: w, height: h};

        var  B = this.adjustSize(w, h);
        var  aw = B.width, ah = B.height;
        if(aw !== undefined || ah !== undefined){ 
            var  rz = this.getResizeEl();
            if(!this.deferHeight && aw !== undefined && ah !== undefined){
                rz.setSize(aw, ah);
            }else  if(!this.deferHeight && ah !== undefined){
                rz.setHeight(ah);
            }else  if(aw !== undefined){
                rz.setWidth(aw);
            }

            this.onResize(aw, ah, w, h);
            this.fireEvent('resize', this, aw, ah, w, h);
        }
        return  this;
    },

    

    getSize : function(){
        return  this.el.getSize();
    },

    

    getPosition : function(C){
        if(C === true){
            return  [this.el.getLeft(true), this.el.getTop(true)];
        }
        return  this.xy || this.el.getXY();
    },

    

    getBox : function(D){
        var  s = this.el.getSize();
        if(D){
            s.x = this.el.getLeft(true);
            s.y = this.el.getTop(true);
        }else {
            var  xy = this.xy || this.el.getXY();
            s.x = xy[0];
            s.y = xy[1];
        }
        return  s;
    },

    

    updateBox : function(E){
        this.setSize(E.width, E.height);
        this.setPagePosition(E.x, E.y);
        return  this;
    },

    
    getResizeEl : function(){
        return  this.resizeEl || this.el;
    },

    
    getPositionEl : function(){
        return  this.positionEl || this.el;
    },

    

    setPosition : function(x, y){
        this.x = x;
        this.y = y;
        if(!this.boxReady){
            return  this;
        }
        var  F = this.adjustPosition(x, y);
        var  ax = F.x, ay = F.y;

        var  el = this.getPositionEl();
        if(ax !== undefined || ay !== undefined){
            if(ax !== undefined && ay !== undefined){
                el.setLeftTop(ax, ay);
            }else  if(ax !== undefined){
                el.setLeft(ax);
            }else  if(ay !== undefined){
                el.setTop(ay);
            }

            this.onPosition(ax, ay);
            this.fireEvent('move', this, ax, ay);
        }
        return  this;
    },

    

    setPagePosition : function(x, y){
        this.pageX = x;
        this.pageY = y;
        if(!this.boxReady){
            return;
        }
        if(x === undefined || y === undefined){ 
            return;
        }
        var  p = this.el.translatePoints(x, y);
        this.setPosition(p.left, p.top);
        return  this;
    },

    
    onRender : function(ct, G){
        Roo.BoxComponent.superclass.onRender.call(this, ct, G);
        if(this.resizeEl){
            this.resizeEl = Roo.get(this.resizeEl);
        }
        if(this.positionEl){
            this.positionEl = Roo.get(this.positionEl);
        }
    },

    
    afterRender : function(){
        Roo.BoxComponent.superclass.afterRender.call(this);
        this.boxReady = true;
        this.setSize(this.width, this.height);
        if(this.x || this.y){
            this.setPosition(this.x, this.y);
        }
        if(this.pageX || this.pageY){
            this.setPagePosition(this.pageX, this.pageY);
        }
    },

    

    syncSize : function(){
        delete  this.lastSize;
        this.setSize(this.el.getWidth(), this.el.getHeight());
        return  this;
    },

    

    onResize : function(H, I, J, K){

    },

    

    onPosition : function(x, y){

    },

    
    adjustSize : function(w, h){
        if(this.autoWidth){
            w = 'auto';
        }
        if(this.autoHeight){
            h = 'auto';
        }
        return  {width : w, height: h};
    },

    
    adjustPosition : function(x, y){
        return  {x : x, y: y};
    }
});






Roo.SplitBar = function(A, B, C, D, E){
    
    

    this.el = Roo.get(A, true);
    this.el.dom.unselectable = "on";
    

    this.resizingEl = Roo.get(B, true);

    

    this.orientation = C || Roo.SplitBar.HORIZONTAL;
    
    

    this.minSize = 0;
    
    

    this.maxSize = 2000;
    
    

    this.animate = false;
    
    

    this.useShim = false;
    
    

    this.shim = null;
    
    if(!E){
        

        this.proxy = Roo.SplitBar.createProxy(this.orientation);
    }else {
        this.proxy = Roo.get(E).dom;
    }

    

    this.dd = new  Roo.dd.DDProxy(this.el.dom.id, "XSplitBars", {dragElId : this.proxy.id});
    
    

    this.dd.b4StartDrag = this.onStartProxyDrag.createDelegate(this);
    
    

    this.dd.endDrag = this.onEndProxyDrag.createDelegate(this);
    
    

    this.dragSpecs = {};
    
    

    this.adapter = new  Roo.SplitBar.BasicLayoutAdapter();
    this.adapter.init(this);
    
    if(this.orientation == Roo.SplitBar.HORIZONTAL){
        

        this.placement = D || (this.el.getX() > this.resizingEl.getX() ? Roo.SplitBar.LEFT : Roo.SplitBar.RIGHT);
        this.el.addClass("x-splitbar-h");
    }else {
        

        this.placement = D || (this.el.getY() > this.resizingEl.getY() ? Roo.SplitBar.TOP : Roo.SplitBar.BOTTOM);
        this.el.addClass("x-splitbar-v");
    }

    
    this.addEvents({
        

        "resize" : true,
        

        "moved" : true,
        

        "beforeresize" : true,

        "beforeapply" : true
    });

    Roo.util.Observable.call(this);
};

Roo.extend(Roo.SplitBar, Roo.util.Observable, {
    onStartProxyDrag : function(x, y){
        this.fireEvent("beforeresize", this);
        if(!this.overlay){
            var  o = Roo.DomHelper.insertFirst(document.body,  {cls: "x-drag-overlay", html: "&#160;"}, true);
            o.unselectable();
            o.enableDisplayMode("block");
            
            Roo.SplitBar.prototype.overlay = o;
        }

        this.overlay.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        this.overlay.show();
        Roo.get(this.proxy).setDisplayed("block");
        var  F = this.adapter.getElementSize(this);
        this.activeMinSize = this.getMinimumSize();;
        this.activeMaxSize = this.getMaximumSize();;
        var  c1 = F - this.activeMinSize;
        var  c2 = Math.max(this.activeMaxSize - F, 0);
        if(this.orientation == Roo.SplitBar.HORIZONTAL){
            this.dd.resetConstraints();
            this.dd.setXConstraint(
                this.placement == Roo.SplitBar.LEFT ? c1 : c2, 
                this.placement == Roo.SplitBar.LEFT ? c2 : c1
            );
            this.dd.setYConstraint(0, 0);
        }else {
            this.dd.resetConstraints();
            this.dd.setXConstraint(0, 0);
            this.dd.setYConstraint(
                this.placement == Roo.SplitBar.TOP ? c1 : c2, 
                this.placement == Roo.SplitBar.TOP ? c2 : c1
            );
         }

        this.dragSpecs.startSize = F;
        this.dragSpecs.startPoint = [x, y];
        Roo.dd.DDProxy.prototype.b4StartDrag.call(this.dd, x, y);
    },
    
    

    onEndProxyDrag : function(e){
        Roo.get(this.proxy).setDisplayed(false);
        var  G = Roo.lib.Event.getXY(e);
        if(this.overlay){
            this.overlay.hide();
        }
        var  H;
        if(this.orientation == Roo.SplitBar.HORIZONTAL){
            H = this.dragSpecs.startSize + 
                (this.placement == Roo.SplitBar.LEFT ?
                    G[0] - this.dragSpecs.startPoint[0] :
                    this.dragSpecs.startPoint[0] - G[0]
                );
        }else {
            H = this.dragSpecs.startSize + 
                (this.placement == Roo.SplitBar.TOP ?
                    G[1] - this.dragSpecs.startPoint[1] :
                    this.dragSpecs.startPoint[1] - G[1]
                );
        }

        H = Math.min(Math.max(H, this.activeMinSize), this.activeMaxSize);
        if(H != this.dragSpecs.startSize){
            if(this.fireEvent('beforeapply', this, H) !== false){
                this.adapter.setElementSize(this, H);
                this.fireEvent("moved", this, H);
                this.fireEvent("resize", this, H);
            }
        }
    },
    
    

    getAdapter : function(){
        return  this.adapter;
    },
    
    

    setAdapter : function(I){
        this.adapter = I;
        this.adapter.init(this);
    },
    
    

    getMinimumSize : function(){
        return  this.minSize;
    },
    
    

    setMinimumSize : function(J){
        this.minSize = J;
    },
    
    

    getMaximumSize : function(){
        return  this.maxSize;
    },
    
    

    setMaximumSize : function(K){
        this.maxSize = K;
    },
    
    

    setCurrentSize : function(L){
        var  M = this.animate;
        this.animate = false;
        this.adapter.setElementSize(this, L);
        this.animate = M;
    },
    
    

    destroy : function(N){
        if(this.shim){
            this.shim.remove();
        }

        this.dd.unreg();
        this.proxy.parentNode.removeChild(this.proxy);
        if(N){
            this.el.remove();
        }
    }
});



Roo.SplitBar.createProxy = function(O){
    var  P = new  Roo.Element(document.createElement("div"));
    P.unselectable();
    var  Q = 'x-splitbar-proxy';
    P.addClass(Q + ' ' + (O == Roo.SplitBar.HORIZONTAL ? Q +'-h' : Q + '-v'));
    document.body.appendChild(P.dom);
    return  P.dom;
};



Roo.SplitBar.BasicLayoutAdapter = function(){
};

Roo.SplitBar.BasicLayoutAdapter.prototype = {
    
    init : function(s){
    
    },
    

     getElementSize : function(s){
        if(s.orientation == Roo.SplitBar.HORIZONTAL){
            return  s.resizingEl.getWidth();
        }else {
            return  s.resizingEl.getHeight();
        }
    },
    
    

    setElementSize : function(s, R, S){
        if(s.orientation == Roo.SplitBar.HORIZONTAL){
            if(!s.animate){
                s.resizingEl.setWidth(R);
                if(S){
                    S(s, R);
                }
            }else {
                s.resizingEl.setWidth(R, true, .1, S, 'easeOut');
            }
        }else {
            
            if(!s.animate){
                s.resizingEl.setHeight(R);
                if(S){
                    S(s, R);
                }
            }else {
                s.resizingEl.setHeight(R, true, .1, S, 'easeOut');
            }
        }
    }
};



Roo.SplitBar.AbsoluteLayoutAdapter = function(T){
    this.basic = new  Roo.SplitBar.BasicLayoutAdapter();
    this.container = Roo.get(T);
};

Roo.SplitBar.AbsoluteLayoutAdapter.prototype = {
    init : function(s){
        this.basic.init(s);
    },
    
    getElementSize : function(s){
        return  this.basic.getElementSize(s);
    },
    
    setElementSize : function(s, U, V){
        this.basic.setElementSize(s, U, this.moveSplitter.createDelegate(this, [s]));
    },
    
    moveSplitter : function(s){
        var  W = Roo.SplitBar;
        switch(s.placement){
            case  W.LEFT:
                s.el.setX(s.resizingEl.getRight());
                break;
            case  W.RIGHT:
                s.el.setStyle("right", (this.container.getWidth() - s.resizingEl.getLeft()) + "px");
                break;
            case  W.TOP:
                s.el.setY(s.resizingEl.getBottom());
                break;
            case  W.BOTTOM:
                s.el.setY(s.resizingEl.getTop() - s.el.getHeight());
                break;
        }
    }
};



Roo.SplitBar.VERTICAL = 1;



Roo.SplitBar.HORIZONTAL = 2;



Roo.SplitBar.LEFT = 1;



Roo.SplitBar.RIGHT = 2;



Roo.SplitBar.TOP = 3;



Roo.SplitBar.BOTTOM = 4;






Roo.View = function(A, B, C){
    
    if (typeof(B) == 'undefined') {
        
        Roo.apply(this, A);
        this.el  = Roo.get(this.el);
    } else  {
        
        this.el  = Roo.get(A);
        this.tpl = B;
        Roo.apply(this, C);
    }
     
    
    if(typeof(this.tpl) == "string"){
        this.tpl = new  Roo.Template(this.tpl);
    } else  {
        
        this.tpl = new  Roo.Factory(this.tpl, Roo);
    }

    
    
    this.tpl.compile();
   

     
    

    this.addEvents({
    

        "beforeclick" : true,
    

        "click" : true,
    

        "dblclick" : true,
    

        "contextmenu" : true,
    

        "selectionchange" : true,

    

        "beforeselect" : true
    });

    this.el.on({
        "click": this.onClick,
        "dblclick": this.onDblClick,
        "contextmenu": this.onContextMenu,
        scope:this
    });

    this.selections = [];
    this.nodes = [];
    this.cmp = new  Roo.CompositeElementLite([]);
    if(this.store){
        this.store = Roo.factory(this.store, Roo.data);
        this.setStore(this.store, true);
    }

    Roo.View.superclass.constructor.call(this);
};

Roo.extend(Roo.View, Roo.util.Observable, {
    
     

    store : false,
    
    

    el : '',
    
    

    tpl : false,
    
    

    selectedClass : "x-view-selected",
     

    emptyText : "",
    

    getEl : function(){
        return  this.el;
    },

    

    refresh : function(){
        var  t = this.tpl;
        this.clearSelections();
        this.el.update("");
        var  D = [];
        var  E = this.store.getRange();
        if(E.length < 1){
            this.el.update(this.emptyText);
            return;
        }
        for(var  i = 0, len = E.length; i < len; i++){
            var  data = this.prepareData(E[i].data, i, E[i]);
            D[D.length] = t.apply(data);
        }

        this.el.update(D.join(""));
        this.nodes = this.el.dom.childNodes;
        this.updateIndexes(0);
    },

    

    prepareData : function(F){
        return  F;
    },

    onUpdate : function(ds, G){
        this.clearSelections();
        var  H = this.store.indexOf(G);
        var  n = this.nodes[H];
        this.tpl.insertBefore(n, this.prepareData(G.data));
        n.parentNode.removeChild(n);
        this.updateIndexes(H, H);
    },

    onAdd : function(ds, I, J){
        this.clearSelections();
        if(this.nodes.length == 0){
            this.refresh();
            return;
        }
        var  n = this.nodes[J];
        for(var  i = 0, len = I.length; i < len; i++){
            var  d = this.prepareData(I[i].data);
            if(n){
                this.tpl.insertBefore(n, d);
            }else {
                this.tpl.append(this.el, d);
            }
        }

        this.updateIndexes(J);
    },

    onRemove : function(ds, K, L){
        this.clearSelections();
        this.el.dom.removeChild(this.nodes[L]);
        this.updateIndexes(L);
    },

    

    refreshNode : function(M){
        this.onUpdate(this.store, this.store.getAt(M));
    },

    updateIndexes : function(N, O){
        var  ns = this.nodes;
        N = N || 0;
        O = O || ns.length - 1;
        for(var  i = N; i <= O; i++){
            ns[i].nodeIndex = i;
        }
    },

    

    setStore : function(P, Q){
        if(!Q && this.store){
            this.store.un("datachanged", this.refresh);
            this.store.un("add", this.onAdd);
            this.store.un("remove", this.onRemove);
            this.store.un("update", this.onUpdate);
            this.store.un("clear", this.refresh);
        }
        if(P){
          
            P.on("datachanged", this.refresh, this);
            P.on("add", this.onAdd, this);
            P.on("remove", this.onRemove, this);
            P.on("update", this.onUpdate, this);
            P.on("clear", this.refresh, this);
        }
        
        if(P){
            this.refresh();
        }
    },

    

    findItemFromChild : function(R){
        var  el = this.el.dom;
        if(!R || R.parentNode == el){
		    return  R;
	    }
	    var  p = R.parentNode;
	    while(p && p != el){
            if(p.parentNode == el){
            	return  p;
            }

            p = p.parentNode;
        }
	    return  null;
    },

    

    onClick : function(e){
        var  S = this.findItemFromChild(e.getTarget());
        if(S){
            var  M = this.indexOf(S);
            if(this.onItemClick(S, M, e) !== false){
                this.fireEvent("click", this, M, S, e);
            }
        }else {
            this.clearSelections();
        }
    },

    

    onContextMenu : function(e){
        var  T = this.findItemFromChild(e.getTarget());
        if(T){
            this.fireEvent("contextmenu", this, this.indexOf(T), T, e);
        }
    },

    

    onDblClick : function(e){
        var  U = this.findItemFromChild(e.getTarget());
        if(U){
            this.fireEvent("dblclick", this, this.indexOf(U), U, e);
        }
    },

    onItemClick : function(V, W, e){
        if(this.fireEvent("beforeclick", this, W, V, e) === false){
            return  false;
        }
        if(this.multiSelect || this.singleSelect){
            if(this.multiSelect && e.shiftKey && this.lastSelection){
                this.select(this.getNodes(this.indexOf(this.lastSelection), W), false);
            }else {
                this.select(V, this.multiSelect && e.ctrlKey);
                this.lastSelection = V;
            }

            e.preventDefault();
        }
        return  true;
    },

    

    getSelectionCount : function(){
        return  this.selections.length;
    },

    

    getSelectedNodes : function(){
        return  this.selections;
    },

    

    getSelectedIndexes : function(){
        var  X = [], s = this.selections;
        for(var  i = 0, len = s.length; i < len; i++){
            X.push(s[i].nodeIndex);
        }
        return  X;
    },

    

    clearSelections : function(Y){
        if(this.nodes && (this.multiSelect || this.singleSelect) && this.selections.length > 0){
            this.cmp.elements = this.selections;
            this.cmp.removeClass(this.selectedClass);
            this.selections = [];
            if(!Y){
                this.fireEvent("selectionchange", this, this.selections);
            }
        }
    },

    

    isSelected : function(Z){
        var  s = this.selections;
        if(s.length < 1){
            return  false;
        }

        Z = this.getNode(Z);
        return  s.indexOf(Z) !== -1;
    },

    

    select : function(a, b, c){
        if(a  instanceof  Array){
            if(!b){
                this.clearSelections(true);
            }
            for(var  i = 0, len = a.length; i < len; i++){
                this.select(a[i], true, true);
            }
        } else {
            var  Z = this.getNode(a);
            if(Z && !this.isSelected(Z)){
                if(!b){
                    this.clearSelections(true);
                }
                if(this.fireEvent("beforeselect", this, Z, this.selections) !== false){
                    Roo.fly(Z).addClass(this.selectedClass);
                    this.selections.push(Z);
                    if(!c){
                        this.fireEvent("selectionchange", this, this.selections);
                    }
                }
            }
        }
    },

    

    getNode : function(f){
        if(typeof  f == "string"){
            return  document.getElementById(f);
        }else  if(typeof  f == "number"){
            return  this.nodes[f];
        }
        return  f;
    },

    

    getNodes : function(g, h){
        var  ns = this.nodes;
        g = g || 0;
        h = typeof  h == "undefined" ? ns.length - 1 : h;
        var  j = [];
        if(g <= h){
            for(var  i = g; i <= h; i++){
                j.push(ns[i]);
            }
        } else {
            for(var  i = g; i >= h; i--){
                j.push(ns[i]);
            }
        }
        return  j;
    },

    

    indexOf : function(k){
        k = this.getNode(k);
        if(typeof  k.nodeIndex == "number"){
            return  k.nodeIndex;
        }
        var  ns = this.nodes;
        for(var  i = 0, len = ns.length; i < len; i++){
            if(ns[i] == k){
                return  i;
            }
        }
        return  -1;
    }
});






Roo.JsonView = function(A, B, C){
    
    
    Roo.JsonView.superclass.constructor.call(this, A, B, C);

    var  um = this.el.getUpdateManager();
    um.setRenderer(this);
    um.on("update", this.onLoad, this);
    um.on("failure", this.onLoadException, this);

    

    

    

    this.addEvents({
        'beforerender' : true,
        'load' : true,
        'loadexception' : true
    });
};
Roo.extend(Roo.JsonView, Roo.View, {
    

    jsonRoot : "",

    

    refresh : function(){
        this.clearSelections();
        this.el.update("");
        var  D = [];
        var  o = this.jsonData;
        if(o && o.length > 0){
            for(var  i = 0, len = o.length; i < len; i++){
                var  data = this.prepareData(o[i], i, o);
                D[D.length] = this.tpl.apply(data);
            }
        }else {
            D.push(this.emptyText);
        }

        this.el.update(D.join(""));
        this.nodes = this.el.dom.childNodes;
        this.updateIndexes(0);
    },

    

    load : function(){
        var  um = this.el.getUpdateManager();
        um.update.apply(um, arguments);
    },

    render : function(el, E){
        this.clearSelections();
        this.el.update("");
        var  o;
        try{
            o = Roo.util.JSON.decode(E.responseText);
            if(this.jsonRoot){
                
                o = 
 eval("o." + this.jsonRoot);
            }
        } catch(e){
        }

        

        this.jsonData = o;
        this.beforeRender();
        this.refresh();
    },



    getCount : function(){
        return  this.jsonData ? this.jsonData.length : 0;
    },



    getNodeData : function(F){
        if(F  instanceof  Array){
            var  data = [];
            for(var  i = 0, len = F.length; i < len; i++){
                data.push(this.getNodeData(F[i]));
            }
            return  data;
        }
        return  this.jsonData[this.indexOf(F)] || null;
    },

    beforeRender : function(){
        this.snapshot = this.jsonData;
        if(this.sortInfo){
            this.sort.apply(this, this.sortInfo);
        }

        this.fireEvent("beforerender", this, this.jsonData);
    },

    onLoad : function(el, o){
        this.fireEvent("load", this, this.jsonData, o);
    },

    onLoadException : function(el, o){
        this.fireEvent("loadexception", this, o);
    },



    filter : function(G, H){
        if(this.jsonData){
            var  data = [];
            var  ss = this.snapshot;
            if(typeof  H == "string"){
                var  vlen = H.length;
                if(vlen == 0){
                    this.clearFilter();
                    return;
                }

                H = H.toLowerCase();
                for(var  i = 0, len = ss.length; i < len; i++){
                    var  o = ss[i];
                    if(o[G].substr(0, vlen).toLowerCase() == H){
                        data.push(o);
                    }
                }
            } else  if(H.exec){ 
                for(var  i = 0, len = ss.length; i < len; i++){
                    var  o = ss[i];
                    if(H.test(o[G])){
                        data.push(o);
                    }
                }
            } else {
                return;
            }

            this.jsonData = data;
            this.refresh();
        }
    },



    filterBy : function(fn, I){
        if(this.jsonData){
            var  data = [];
            var  ss = this.snapshot;
            for(var  i = 0, len = ss.length; i < len; i++){
                var  o = ss[i];
                if(fn.call(I || this, o)){
                    data.push(o);
                }
            }

            this.jsonData = data;
            this.refresh();
        }
    },



    clearFilter : function(){
        if(this.snapshot && this.jsonData != this.snapshot){
            this.jsonData = this.snapshot;
            this.refresh();
        }
    },




    sort : function(J, K, L){
        this.sortInfo = Array.prototype.slice.call(arguments, 0);
        if(this.jsonData){
            var  p = J;
            var  dsc = K && K.toLowerCase() == "desc";
            var  f = function(o1, o2){
                var  v1 = L ? L(o1[p]) : o1[p];
                var  v2 = L ? L(o2[p]) : o2[p];
                ;
                if(v1 < v2){
                    return  dsc ? +1 : -1;
                } else  if(v1 > v2){
                    return  dsc ? -1 : +1;
                } else {
                    return  0;
                }
            };
            this.jsonData.sort(f);
            this.refresh();
            if(this.jsonData != this.snapshot){
                this.snapshot.sort(f);
            }
        }
    }
});


 



Roo.ColorPalette = function(A){
    Roo.ColorPalette.superclass.constructor.call(this, A);
    this.addEvents({
        

        select: true
    });

    if(this.handler){
        this.on("select", this.handler, this.scope, true);
    }
};
Roo.extend(Roo.ColorPalette, Roo.Component, {
    

    itemCls : "x-color-palette",
    

    value : null,
    clickEvent:'click',
    
    ctype: "Roo.ColorPalette",

    

    allowReselect : false,

    

    colors : [
        "000000", "993300", "333300", "003300", "003366", "000080", "333399", "333333",
        "800000", "FF6600", "808000", "008000", "008080", "0000FF", "666699", "808080",
        "FF0000", "FF9900", "99CC00", "339966", "33CCCC", "3366FF", "800080", "969696",
        "FF00FF", "FFCC00", "FFFF00", "00FF00", "00FFFF", "00CCFF", "993366", "C0C0C0",
        "FF99CC", "FFCC99", "FFFF99", "CCFFCC", "CCFFFF", "99CCFF", "CC99FF", "FFFFFF"
    ],

    
    onRender : function(B, C){
        var  t = new  Roo.MasterTemplate(
            '<tpl><a href="#" class="color-{0}" hidefocus="on"><em><span style="background:#{0}" unselectable="on">&#160;</span></em></a></tpl>'
        );
        var  c = this.colors;
        for(var  i = 0, len = c.length; i < len; i++){
            t.add([c[i]]);
        }
        var  el = document.createElement("div");
        el.className = this.itemCls;
        t.overwrite(el);
        B.dom.insertBefore(el, C);
        this.el = Roo.get(el);
        this.el.on(this.clickEvent, this.handleClick,  this, {delegate: "a"});
        if(this.clickEvent != 'click'){
            this.el.on('click', Roo.emptyFn,  this, {delegate: "a", preventDefault:true});
        }
    },

    
    afterRender : function(){
        Roo.ColorPalette.superclass.afterRender.call(this);
        if(this.value){
            var  s = this.value;
            this.value = null;
            this.select(s);
        }
    },

    
    handleClick : function(e, t){
        e.preventDefault();
        if(!this.disabled){
            var  c = t.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
            this.select(c.toUpperCase());
        }
    },

    

    select : function(D){
        D = D.replace("#", "");
        if(D != this.value || this.allowReselect){
            var  el = this.el;
            if(this.value){
                el.child("a.color-"+this.value).removeClass("x-color-palette-sel");
            }

            el.child("a.color-"+D).addClass("x-color-palette-sel");
            this.value = D;
            this.fireEvent("select", this, D);
        }
    }
});


 


Roo.DatePicker = function(A){
    Roo.DatePicker.superclass.constructor.call(this, A);

    this.value = A && A.value ?
                 A.value.clearTime() : new  Date().clearTime();

    this.addEvents({
        

        select: true
    });

    if(this.handler){
        this.on("select", this.handler,  this.scope || this);
    }
    
    if(!this.disabledDatesRE && this.disabledDates){
        var  dd = this.disabledDates;
        var  re = "(?:";
        for(var  i = 0; i < dd.length; i++){
            re += dd[i];
            if(i != dd.length-1) re += "|";
        }

        this.disabledDatesRE = new  RegExp(re + ")");
    }
};

Roo.extend(Roo.DatePicker, Roo.Component, {
    

    todayText : "Today",
    

    okText : "&#160;OK&#160;", 
    

    cancelText : "Cancel",
    

    todayTip : "{0} (Spacebar)",
    

    minDate : null,
    

    maxDate : null,
    

    minText : "This date is before the minimum date",
    

    maxText : "This date is after the maximum date",
    

    format : "m/d/y",
    

    disabledDays : null,
    

    disabledDaysText : "",
    

    disabledDatesRE : null,
    

    disabledDatesText : "",
    

    constrainToViewport : true,
    

    monthNames : Date.monthNames,
    

    dayNames : Date.dayNames,
    

    nextText: 'Next Month (Control+Right)',
    

    prevText: 'Previous Month (Control+Left)',
    

    monthYearText: 'Choose a month (Control+Up/Down to move years)',
    

    startDay : 0,
    

    
    showClear: false,
    
    

    setValue : function(B){
        var  C = this.value;
        this.value = B.clearTime(true);
        if(this.el){
            this.update(this.value);
        }
    },

    

    getValue : function(){
        return  this.value;
    },

    
    focus : function(){
        if(this.el){
            this.update(this.activeDate);
        }
    },

    
    onRender : function(D, E){
        var  m = [
             '<table cellspacing="0">',
                '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var  dn = this.dayNames;
        for(var  i = 0; i < 7; i++){
            var  d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }

            m.push("<th><span>", dn[d].substr(0,1), "</span></th>");
        }

        m[m.length] = "</tr></thead><tbody><tr>";
        for(var  i = 0; i < 42; i++) {
            if(i % 7 == 0 && i != 0){
                m[m.length] = "</tr><tr>";
            }

            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }

        m[m.length] = '</tr></tbody></table></td></tr><tr>'+
            '<td colspan="3" class="x-date-bottom" align="center"></td></tr></table><div class="x-date-mp"></div>';

        var  el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");

        D.dom.insertBefore(el, E);

        this.el = Roo.get(el);
        this.eventEl = Roo.get(el.firstChild);

        new  Roo.util.ClickRepeater(this.el.child("td.x-date-left a"), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        new  Roo.util.ClickRepeater(this.el.child("td.x-date-right a"), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        
        var  kn = new  Roo.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return  true;
            },

            scope : this
        });

        this.eventEl.on("click", this.handleDateClick,  this, {delegate: "a.x-date-date"});

        this.eventEl.addKeyListener(Roo.EventObject.SPACE, this.selectToday,  this);

        this.el.unselectable();
        
        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new  Roo.Button(this.el.child("td.x-date-middle", true), {
            text: "&#160;",
            tooltip: this.monthYearText
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");


        var  F = (new  Date()).dateFormat(this.format);
        
        var  G = new  Roo.Toolbar(this.el.child("td.x-date-bottom", true));
        G.add({
            text: String.format(this.todayText, F),
            tooltip: String.format(this.todayTip, F),
            handler: this.selectToday,
            scope: this
        });
        
        
            
        
        if (this.showClear) {
            
            G.add( new  Roo.Toolbar.Fill());
            G.add({
                text: '&#160;',
                cls: 'x-btn-icon x-btn-clear',
                handler: function() {
                    
                    this.fireEvent("select", this, '');
                },
                scope: this
            });
        }
        
        
        if(Roo.isIE){
            this.el.repaint();
        }

        this.update(this.value);
    },

    createMonthPicker : function(){
        if(!this.monthPicker.dom.firstChild){
            var  buf = ['<table border="0" cellspacing="0">'];
            for(var  i = 0; i < 6; i++){
                buf.push(
                    '<tr><td class="x-date-mp-month"><a href="#">', this.monthNames[i].substr(0, 3), '</a></td>',
                    '<td class="x-date-mp-month x-date-mp-sep"><a href="#">', this.monthNames[i+6].substr(0, 3), '</a></td>',
                    i == 0 ?
                    '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>' :
                    '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>'
                );
            }

            buf.push(
                '<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',
                    this.okText,
                    '</button><button type="button" class="x-date-mp-cancel">',
                    this.cancelText,
                    '</button></td></tr>',
                '</table>'
            );
            this.monthPicker.update(buf.join(''));
            this.monthPicker.on('click', this.onMonthClick, this);
            this.monthPicker.on('dblclick', this.onMonthDblClick, this);

            this.mpMonths = this.monthPicker.select('td.x-date-mp-month');
            this.mpYears = this.monthPicker.select('td.x-date-mp-year');

            this.mpMonths.each(function(m, a, i){
                i += 1;
                if((i%2) == 0){
                    m.dom.xmonth = 5 + Math.round(i * .5);
                }else {
                    m.dom.xmonth = Math.round((i-1) * .5);
                }
            });
        }
    },

    showMonthPicker : function(){
        this.createMonthPicker();
        var  H = this.el.getSize();
        this.monthPicker.setSize(H);
        this.monthPicker.child('table').setSize(H);

        this.mpSelMonth = (this.activeDate || this.value).getMonth();
        this.updateMPMonth(this.mpSelMonth);
        this.mpSelYear = (this.activeDate || this.value).getFullYear();
        this.updateMPYear(this.mpSelYear);

        this.monthPicker.slideIn('t', {duration:.2});
    },

    updateMPYear : function(y){
        this.mpyear = y;
        var  ys = this.mpYears.elements;
        for(var  i = 1; i <= 10; i++){
            var  td = ys[i-1], y2;
            if((i%2) == 0){
                y2 = y + Math.round(i * .5);
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }else {
                y2 = y - (5-Math.round(i * .5));
                td.firstChild.innerHTML = y2;
                td.xyear = y2;
            }

            this.mpYears.item(i-1)[y2 == this.mpSelYear ? 'addClass' : 'removeClass']('x-date-mp-sel');
        }
    },

    updateMPMonth : function(sm){
        this.mpMonths.each(function(m, a, i){
            m[m.dom.xmonth == sm ? 'addClass' : 'removeClass']('x-date-mp-sel');
        });
    },

    selectMPMonth: function(m){
        
    },

    onMonthClick : function(e, t){
        e.stopEvent();
        var  el = new  Roo.Element(t), pn;
        if(el.is('button.x-date-mp-cancel')){
            this.hideMonthPicker();
        }
        else  if(el.is('button.x-date-mp-ok')){
            this.update(new  Date(this.mpSelYear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
        else  if(pn = el.up('td.x-date-mp-month', 2)){
            this.mpMonths.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.mpSelMonth = pn.dom.xmonth;
        }
        else  if(pn = el.up('td.x-date-mp-year', 2)){
            this.mpYears.removeClass('x-date-mp-sel');
            pn.addClass('x-date-mp-sel');
            this.mpSelYear = pn.dom.xyear;
        }
        else  if(el.is('a.x-date-mp-prev')){
            this.updateMPYear(this.mpyear-10);
        }
        else  if(el.is('a.x-date-mp-next')){
            this.updateMPYear(this.mpyear+10);
        }
    },

    onMonthDblClick : function(e, t){
        e.stopEvent();
        var  el = new  Roo.Element(t), pn;
        if(pn = el.up('td.x-date-mp-month', 2)){
            this.update(new  Date(this.mpSelYear, pn.dom.xmonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
        else  if(pn = el.up('td.x-date-mp-year', 2)){
            this.update(new  Date(pn.dom.xyear, this.mpSelMonth, (this.activeDate || this.value).getDate()));
            this.hideMonthPicker();
        }
    },

    hideMonthPicker : function(I){
        if(this.monthPicker){
            if(I === true){
                this.monthPicker.hide();
            }else {
                this.monthPicker.slideOut('t', {duration:.2});
            }
        }
    },

    
    showPrevMonth : function(e){
        this.update(this.activeDate.add("mo", -1));
    },

    
    showNextMonth : function(e){
        this.update(this.activeDate.add("mo", 1));
    },

    
    showPrevYear : function(){
        this.update(this.activeDate.add("y", -1));
    },

    
    showNextYear : function(){
        this.update(this.activeDate.add("y", 1));
    },

    
    handleMouseWheel : function(e){
        var  J = e.getWheelDelta();
        if(J > 0){
            this.showPrevMonth();
            e.stopEvent();
        } else  if(J < 0){
            this.showNextMonth();
            e.stopEvent();
        }
    },

    
    handleDateClick : function(e, t){
        e.stopEvent();
        if(t.dateValue && !Roo.fly(t.parentNode).hasClass("x-date-disabled")){
            this.setValue(new  Date(t.dateValue));
            this.fireEvent("select", this, this.value);
        }
    },

    
    selectToday : function(){
        this.setValue(new  Date().clearTime());
        this.fireEvent("select", this, this.value);
    },

    
    update : function(K){
        var  vd = this.activeDate;
        this.activeDate = K;
        if(vd && this.el){
            var  t = K.getTime();
            if(vd.getMonth() == K.getMonth() && vd.getFullYear() == K.getFullYear()){
                this.cells.removeClass("x-date-selected");
                this.cells.each(function(c){
                   if(c.dom.firstChild.dateValue == t){
                       c.addClass("x-date-selected");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return  false;
                   }
                });
                return;
            }
        }
        var  L = K.getDaysInMonth();
        var  M = K.getFirstDateOfMonth();
        var  N = M.getDay()-this.startDay;

        if(N <= this.startDay){
            N += 7;
        }

        var  pm = K.add("mo", -1);
        var  O = pm.getDaysInMonth()-N;

        var  P = this.cells.elements;
        var  Q = this.textNodes;
        L += N;

        
        var  R = 86400000;
        var  d = (new  Date(pm.getFullYear(), pm.getMonth(), O)).clearTime();
        var  S = new  Date().clearTime().getTime();
        var  T = K.clearTime().getTime();
        var  U = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var  V = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var  W = this.disabledDatesRE;
        var  X = this.disabledDatesText;
        var  Y = this.disabledDays ? this.disabledDays.join("") : false;
        var  Z = this.disabledDaysText;
        var  a = this.format;

        var  b = function(f, g){
            g.title = "";
            var  t = d.getTime();
            g.firstChild.dateValue = t;
            if(t == S){
                g.className += " x-date-today";
                g.title = f.todayText;
            }
            if(t == T){
                g.className += " x-date-selected";
                setTimeout(function(){
                    try{g.firstChild.focus();}catch(e){}
                }, 50);
            }
            
            if(t < U) {
                g.className = " x-date-disabled";
                g.title = f.minText;
                return;
            }
            if(t > V) {
                g.className = " x-date-disabled";
                g.title = f.maxText;
                return;
            }
            if(Y){
                if(Y.indexOf(d.getDay()) != -1){
                    g.title = Z;
                    g.className = " x-date-disabled";
                }
            }
            if(W && a){
                var  fvalue = d.dateFormat(a);
                if(W.test(fvalue)){
                    g.title = X.replace("%0", fvalue);
                    g.className = " x-date-disabled";
                }
            }
        };

        var  i = 0;
        for(; i < N; i++) {
            Q[i].innerHTML = (++O);
            d.setDate(d.getDate()+1);
            P[i].className = "x-date-prevday";
            b(this, P[i]);
        }
        for(; i < L; i++){
            intDay = i - N + 1;
            Q[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            P[i].className = "x-date-active";
            b(this, P[i]);
        }
        var  c = 0;
        for(; i < 42; i++) {
             Q[i].innerHTML = (++c);
             d.setDate(d.getDate()+1);
             P[i].className = "x-date-nextday";
             b(this, P[i]);
        }


        this.mbtn.setText(this.monthNames[K.getMonth()] + " " + K.getFullYear());

        if(!this.internalRender){
            var  main = this.el.dom.firstChild;
            var  w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Roo.fly(main).setWidth(w);
            this.internalRender = true;
            
            
            
            if(Roo.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [K]);
            }
        }
    }
});




Roo.TabPanel = function(A, B){
    

    this.el = Roo.get(A, true);
    if(B){
        if(typeof  B == "boolean"){
            this.tabPosition = B ? "bottom" : "top";
        }else {
            Roo.apply(this, B);
        }
    }
    if(this.tabPosition == "bottom"){
        this.bodyEl = Roo.get(this.createBody(this.el.dom));
        this.el.addClass("x-tabs-bottom");
    }

    this.stripWrap = Roo.get(this.createStrip(this.el.dom), true);
    this.stripEl = Roo.get(this.createStripList(this.stripWrap.dom), true);
    this.stripBody = Roo.get(this.stripWrap.dom.firstChild.firstChild, true);
    if(Roo.isIE){
        Roo.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x", "hidden");
    }
    if(this.tabPosition != "bottom"){
    

      this.bodyEl = Roo.get(this.createBody(this.el.dom));
      this.el.addClass("x-tabs-top");
    }

    this.items = [];

    this.bodyEl.setStyle("position", "relative");

    this.active = null;
    this.activateDelegate = this.activate.createDelegate(this);

    this.addEvents({
        

        "tabchange": true,
        

        "beforetabchange" : true
    });

    Roo.EventManager.onWindowResize(this.onResize, this);
    this.cpad = this.el.getPadding("lr");
    this.hiddenCount = 0;

    Roo.TabPanel.superclass.constructor.call(this);
};

Roo.extend(Roo.TabPanel, Roo.util.Observable, {
	

    tabPosition : "top",
	

    currentTabWidth : 0,
	

    minTabWidth : 40,
	

    maxTabWidth : 250,
	

    preferredTabWidth : 175,
	

    resizeTabs : false,
	

    monitorResize : true,

    

    addTab : function(id, C, D, E){
        var  F = new  Roo.TabPanelItem(this, id, C, E);
        this.addTabItem(F);
        if(D){
            F.setContent(D);
        }
        return  F;
    },

    

    getTab : function(id){
        return  this.items[id];
    },

    

    hideTab : function(id){
        var  t = this.items[id];
        if(!t.isHidden()){
           t.setHidden(true);
           this.hiddenCount++;
           this.autoSizeTabs();
        }
    },

    

    unhideTab : function(id){
        var  t = this.items[id];
        if(t.isHidden()){
           t.setHidden(false);
           this.hiddenCount--;
           this.autoSizeTabs();
        }
    },

    

    addTabItem : function(G){
        this.items[G.id] = G;
        this.items.push(G);
        if(this.resizeTabs){
           G.setWidth(this.currentTabWidth || this.preferredTabWidth);
           this.autoSizeTabs();
        }else {
            G.autoSize();
        }
    },

    

    removeTab : function(id){
        var  H = this.items;
        var  I = H[id];
        if(!I) return;
        var  J = H.indexOf(I);
        if(this.active == I && H.length > 1){
            var  newTab = this.getNextAvailable(J);
            if(newTab)newTab.activate();
        }

        this.stripEl.dom.removeChild(I.pnode.dom);
        if(I.bodyEl.dom.parentNode == this.bodyEl.dom){ 
            this.bodyEl.dom.removeChild(I.bodyEl.dom);
        }

        H.splice(J, 1);
        delete  this.items[I.id];
        I.fireEvent("close", I);
        I.purgeListeners();
        this.autoSizeTabs();
    },

    getNextAvailable : function(K){
        var  L = this.items;
        var  M = K;
        
        
        while(M < L.length){
            var  G = L[++M];
            if(G && !G.isHidden()){
                return  G;
            }
        }

        
        M = K;
        while(M >= 0){
            var  G = L[--M];
            if(G && !G.isHidden()){
                return  G;
            }
        }
        return  null;
    },

    

    disableTab : function(id){
        var  N = this.items[id];
        if(N && this.active != N){
            N.disable();
        }
    },

    

    enableTab : function(id){
        var  O = this.items[id];
        O.enable();
    },

    

    activate : function(id){
        var  P = this.items[id];
        if(!P){
            return  null;
        }
        if(P == this.active || P.disabled){
            return  P;
        }
        var  e = {};
        this.fireEvent("beforetabchange", this, e, P);
        if(e.cancel !== true && !P.disabled){
            if(this.active){
                this.active.hide();
            }

            this.active = this.items[id];
            this.active.show();
            this.fireEvent("tabchange", this, this.active);
        }
        return  P;
    },

    

    getActiveTab : function(){
        return  this.active;
    },

    

    syncHeight : function(Q){
        var  R = (Q || this.el.getHeight())-this.el.getBorderWidth("tb")-this.el.getPadding("tb");
        var  bm = this.bodyEl.getMargins();
        var  S = R-(this.stripWrap.getHeight()||0)-(bm.top+bm.bottom);
        this.bodyEl.setHeight(S);
        return  S;
    },

    onResize : function(){
        if(this.monitorResize){
            this.autoSizeTabs();
        }
    },

    

    beginUpdate : function(){
        this.updating = true;
    },

    

    endUpdate : function(){
        this.updating = false;
        this.autoSizeTabs();
    },

    

    autoSizeTabs : function(){
        var  T = this.items.length;
        var  U = T - this.hiddenCount;
        if(!this.resizeTabs || T < 1 || U < 1 || this.updating) return;
        var  w = Math.max(this.el.getWidth() - this.cpad, 10);
        var  V = Math.floor(w / U);
        var  b = this.stripBody;
        if(b.getWidth() > w){
            var  tabs = this.items;
            this.setTabWidth(Math.max(V, this.minTabWidth)-2);
            if(V < this.minTabWidth){
                

            }
        }else {
            if(this.currentTabWidth < this.preferredTabWidth){
                this.setTabWidth(Math.min(V, this.preferredTabWidth)-2);
            }
        }
    },

    

     getCount : function(){
         return  this.items.length;
     },

    

    setTabWidth : function(W){
        this.currentTabWidth = W;
        for(var  i = 0, len = this.items.length; i < len; i++) {
        	if(!this.items[i].isHidden())this.items[i].setWidth(W);
        }
    },

    

    destroy : function(X){
        Roo.EventManager.removeResizeListener(this.onResize, this);
        for(var  i = 0, len = this.items.length; i < len; i++){
            this.items[i].purgeListeners();
        }
        if(X === true){
            this.el.update("");
            this.el.remove();
        }
    }
});



Roo.TabPanelItem = function(Y, id, Z, a){
    

    this.tabPanel = Y;
    

    this.id = id;
    

    this.disabled = false;
    

    this.text = Z;
    

    this.loaded = false;
    this.closable = a;

    

    this.bodyEl = Roo.get(Y.createItemBody(Y.bodyEl.dom, id));
    this.bodyEl.setVisibilityMode(Roo.Element.VISIBILITY);
    this.bodyEl.setStyle("display", "block");
    this.bodyEl.setStyle("zoom", "1");
    this.hideAction();

    var  d = Y.createStripElements(Y.stripEl.dom, Z, a);
    

    this.el = Roo.get(d.el, true);
    this.inner = Roo.get(d.inner, true);
    this.textEl = Roo.get(this.el.dom.firstChild.firstChild.firstChild, true);
    this.pnode = Roo.get(d.el.parentNode, true);
    this.el.on("mousedown", this.onTabMouseDown, this);
    this.el.on("click", this.onTabClick, this);
    

    if(a){
        var  c = Roo.get(d.close, true);
        c.dom.title = this.closeText;
        c.addClassOnOver("close-over");
        c.on("click", this.closeClick, this);
     }


    this.addEvents({
         

        "activate": true,
        

        "beforeclose": true,
        

         "close": true,
        

         "deactivate" : true
    });
    this.hidden = false;

    Roo.TabPanelItem.superclass.constructor.call(this);
};

Roo.extend(Roo.TabPanelItem, Roo.util.Observable, {
    purgeListeners : function(){
       Roo.util.Observable.prototype.purgeListeners.call(this);
       this.el.removeAllListeners();
    },
    

    show : function(){
        this.pnode.addClass("on");
        this.showAction();
        if(Roo.isOpera){
            this.tabPanel.stripWrap.repaint();
        }

        this.fireEvent("activate", this.tabPanel, this);
    },

    

    isActive : function(){
        return  this.tabPanel.getActiveTab() == this;
    },

    

    hide : function(){
        this.pnode.removeClass("on");
        this.hideAction();
        this.fireEvent("deactivate", this.tabPanel, this);
    },

    hideAction : function(){
        this.bodyEl.hide();
        this.bodyEl.setStyle("position", "absolute");
        this.bodyEl.setLeft("-20000px");
        this.bodyEl.setTop("-20000px");
    },

    showAction : function(){
        this.bodyEl.setStyle("position", "relative");
        this.bodyEl.setTop("");
        this.bodyEl.setLeft("");
        this.bodyEl.show();
    },

    

    setTooltip : function(f){
        if(Roo.QuickTips && Roo.QuickTips.isEnabled()){
            this.textEl.dom.qtip = f;
            this.textEl.dom.removeAttribute('title');
        }else {
            this.textEl.dom.title = f;
        }
    },

    onTabClick : function(e){
        e.preventDefault();
        this.tabPanel.activate(this.id);
    },

    onTabMouseDown : function(e){
        e.preventDefault();
        this.tabPanel.activate(this.id);
    },

    getWidth : function(){
        return  this.inner.getWidth();
    },

    setWidth : function(g){
        var  h = g - this.pnode.getPadding("lr");
        this.inner.setWidth(h);
        this.textEl.setWidth(h-this.inner.getPadding("lr"));
        this.pnode.setWidth(g);
    },

    

    setHidden : function(j){
        this.hidden = j;
        this.pnode.setStyle("display", j ? "none" : "");
    },

    

    isHidden : function(){
        return  this.hidden;
    },

    

    getText : function(){
        return  this.text;
    },

    autoSize : function(){
        
        this.textEl.setWidth(1);
        this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));
        
    },

    

    setText : function(k){
        this.text = k;
        this.textEl.update(k);
        this.setTooltip(k);
        if(!this.tabPanel.resizeTabs){
            this.autoSize();
        }
    },
    

    activate : function(){
        this.tabPanel.activate(this.id);
    },

    

    disable : function(){
        if(this.tabPanel.active != this){
            this.disabled = true;
            this.pnode.addClass("disabled");
        }
    },

    

    enable : function(){
        this.disabled = false;
        this.pnode.removeClass("disabled");
    },

    

    setContent : function(l, m){
        this.bodyEl.update(l, m);
    },

    

    getUpdateManager : function(){
        return  this.bodyEl.getUpdateManager();
    },

    

    setUrl : function(n, o, p){
        if(this.refreshDelegate){
            this.un('activate', this.refreshDelegate);
        }

        this.refreshDelegate = this._handleRefresh.createDelegate(this, [n, o, p]);
        this.on("activate", this.refreshDelegate);
        return  this.bodyEl.getUpdateManager();
    },

    

    _handleRefresh : function(q, r, s){
        if(!s || !this.loaded){
            var  updater = this.bodyEl.getUpdateManager();
            updater.update(q, r, this._setLoaded.createDelegate(this));
        }
    },

    

    refresh : function(){
        if(this.refreshDelegate){
           this.loaded = false;
           this.refreshDelegate();
        }
    },

    

    _setLoaded : function(){
        this.loaded = true;
    },

    

    closeClick : function(e){
        var  o = {};
        e.stopEvent();
        this.fireEvent("beforeclose", this, o);
        if(o.cancel !== true){
            this.tabPanel.removeTab(this.id);
        }
    },
    

    closeText : "Close this tab"
});



Roo.TabPanel.prototype.createStrip = function(u){
    var  v = document.createElement("div");
    v.className = "x-tabs-wrap";
    u.appendChild(v);
    return  v;
};


Roo.TabPanel.prototype.createStripList = function(x){
    
    x.innerHTML = '<div class="x-tabs-strip-wrap"><table class="x-tabs-strip" cellspacing="0" cellpadding="0" border="0"><tbody><tr></tr></tbody></table></div>';
    return  x.firstChild.firstChild.firstChild.firstChild;
};


Roo.TabPanel.prototype.createBody = function(y){
    var  z = document.createElement("div");
    Roo.id(z, "tab-body");
    Roo.fly(z).addClass("x-tabs-body");
    y.appendChild(z);
    return  z;
};


Roo.TabPanel.prototype.createItemBody = function(AA, id){
    var  AB = Roo.getDom(id);
    if(!AB){
        AB = document.createElement("div");
        AB.id = id;
    }

    Roo.fly(AB).addClass("x-tabs-item-body");
    AA.insertBefore(AB, AA.firstChild);
    return  AB;
};


Roo.TabPanel.prototype.createStripElements = function(AC, AD, AE){
    var  td = document.createElement("td");
    AC.appendChild(td);
    if(AE){
        td.className = "x-tabs-closable";
        if(!this.closeTpl){
            this.closeTpl = new  Roo.Template(
               '<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">' +
               '<span unselectable="on"' + (this.disableTooltips ? '' : ' title="{text}"') +' class="x-tabs-text">{text}</span>' +
               '<div unselectable="on" class="close-icon">&#160;</div></em></span></a>'
            );
        }
        var  el = this.closeTpl.overwrite(td, {"text": AD});
        var  close = el.getElementsByTagName("div")[0];
        var  inner = el.getElementsByTagName("em")[0];
        return  {"el": el, "close": close, "inner": inner};
    } else  {
        if(!this.tabTpl){
            this.tabTpl = new  Roo.Template(
               '<a href="#" class="x-tabs-right"><span class="x-tabs-left"><em class="x-tabs-inner">' +
               '<span unselectable="on"' + (this.disableTooltips ? '' : ' title="{text}"') +' class="x-tabs-text">{text}</span></em></span></a>'
            );
        }
        var  el = this.tabTpl.overwrite(td, {"text": AD});
        var  inner = el.getElementsByTagName("em")[0];
        return  {"el": el, "inner": inner};
    }
};





Roo.Button = function(A, B)
{
    if (!B) {
        B = A;
        A = B.renderTo || false;
    }

    
    Roo.apply(this, B);
    this.addEvents({
        

	    "click" : true,
        

	    "toggle" : true,
        

        'mouseover' : true,
        

        'mouseout': true,
         

        'render': true
    });
    if(this.menu){
        this.menu = Roo.menu.MenuMgr.get(this.menu);
    }
    if(A){
        this.render(A);
    }

    
    Roo.util.Observable.call(this);
};

Roo.extend(Roo.Button, Roo.util.Observable, {
    

    
    

    hidden : false,
    

    disabled : false,
    

    pressed : false,

    

    tabIndex : undefined,

    

    enableToggle: false,
    

    menu : undefined,
    

    menuAlign : "tl-bl?",

    

    iconCls : undefined,
    

    type : 'button',

    
    menuClassTarget: 'tr',

    

    clickEvent : 'click',

    

    handleMouseEvents : true,

    

    tooltipType : 'qtip',

    

    
    


    
    render : function(C){
        var  D;
        if(this.hideParent){
            this.parentEl = Roo.get(C);
        }
        if(!this.dhconfig){
            if(!this.template){
                if(!Roo.Button.buttonTemplate){
                    
                    Roo.Button.buttonTemplate = new  Roo.Template(
                        '<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>',
                        '<td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><em unselectable="on"><button class="x-btn-text" type="{1}">{0}</button></em></td><td class="x-btn-right"><i>&#160;</i></td>',
                        "</tr></tbody></table>");
                }

                this.template = Roo.Button.buttonTemplate;
            }

            D = this.template.append(C, [this.text || '&#160;', this.type], true);
            var  btnEl = D.child("button:first");
            btnEl.on('focus', this.onFocus, this);
            btnEl.on('blur', this.onBlur, this);
            if(this.cls){
                D.addClass(this.cls);
            }
            if(this.icon){
                btnEl.setStyle('background-image', 'url(' +this.icon +')');
            }
            if(this.iconCls){
                btnEl.addClass(this.iconCls);
                if(!this.cls){
                    D.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
                }
            }
            if(this.tabIndex !== undefined){
                btnEl.dom.tabIndex = this.tabIndex;
            }
            if(this.tooltip){
                if(typeof  this.tooltip == 'object'){
                    Roo.QuickTips.tips(Roo.apply({
                          target: btnEl.id
                    }, this.tooltip));
                } else  {
                    btnEl.dom[this.tooltipType] = this.tooltip;
                }
            }
        }else {
            D = Roo.DomHelper.append(Roo.get(C).dom, this.dhconfig, true);
        }

        this.el = D;
        if(this.id){
            this.el.dom.id = this.el.id = this.id;
        }
        if(this.menu){
            this.el.child(this.menuClassTarget).addClass("x-btn-with-menu");
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }

        D.addClass("x-btn");
        if(Roo.isIE && !Roo.isIE7){
            this.autoWidth.defer(1, this);
        }else {
            this.autoWidth();
        }
        if(this.handleMouseEvents){
            D.on("mouseover", this.onMouseOver, this);
            D.on("mouseout", this.onMouseOut, this);
            D.on("mousedown", this.onMouseDown, this);
        }

        D.on(this.clickEvent, this.onClick, this);
        
        if(this.hidden){
            this.hide();
        }
        if(this.disabled){
            this.disable();
        }

        Roo.ButtonToggleMgr.register(this);
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(this.repeat){
            var  repeater = new  Roo.util.ClickRepeater(D,
                typeof  this.repeat == "object" ? this.repeat : {}
            );
            repeater.on("click", this.onClick,  this);
        }

        this.fireEvent('render', this);
        
    },
    

    getEl : function(){
        return  this.el;  
    },
    
    

    destroy : function(){
        Roo.ButtonToggleMgr.unregister(this);
        this.el.removeAllListeners();
        this.purgeListeners();
        this.el.remove();
    },

    
    autoWidth : function(){
        if(this.el){
            this.el.setWidth("auto");
            if(Roo.isIE7 && Roo.isStrict){
                var  ib = this.el.child('button');
                if(ib && ib.getWidth() > 20){
                    ib.clip();
                    ib.setWidth(Roo.util.TextMetrics.measure(ib, this.text).width+ib.getFrameWidth('lr'));
                }
            }
            if(this.minWidth){
                if(this.hidden){
                    this.el.beginMeasure();
                }
                if(this.el.getWidth() < this.minWidth){
                    this.el.setWidth(this.minWidth);
                }
                if(this.hidden){
                    this.el.endMeasure();
                }
            }
        }
    },

    

    setHandler : function(E, F){
        this.handler = E;
        this.scope = F;  
    },
    
    

    setText : function(G){
        this.text = G;
        if(this.el){
            this.el.child("td.x-btn-center button.x-btn-text").update(G);
        }

        this.autoWidth();
    },
    
    

    getText : function(){
        return  this.text;  
    },
    
    

    show: function(){
        this.hidden = false;
        if(this.el){
            this[this.hideParent? 'parentEl' : 'el'].setStyle("display", "");
        }
    },
    
    

    hide: function(){
        this.hidden = true;
        if(this.el){
            this[this.hideParent? 'parentEl' : 'el'].setStyle("display", "none");
        }
    },
    
    

    setVisible: function(H){
        if(H) {
            this.show();
        }else {
            this.hide();
        }
    },
    
    

    toggle : function(I){
        I = I === undefined ? !this.pressed : I;
        if(I != this.pressed){
            if(I){
                this.el.addClass("x-btn-pressed");
                this.pressed = true;
                this.fireEvent("toggle", this, true);
            }else {
                this.el.removeClass("x-btn-pressed");
                this.pressed = false;
                this.fireEvent("toggle", this, false);
            }
            if(this.toggleHandler){
                this.toggleHandler.call(this.scope || this, this, I);
            }
        }
    },
    
    

    focus : function(){
        this.el.child('button:first').focus();
    },
    
    

    disable : function(){
        if(this.el){
            this.el.addClass("x-btn-disabled");
        }

        this.disabled = true;
    },
    
    

    enable : function(){
        if(this.el){
            this.el.removeClass("x-btn-disabled");
        }

        this.disabled = false;
    },

    

    setDisabled : function(v){
        this[v !== true ? "enable" : "disable"]();
    },

    
    onClick : function(e){
        if(e){
            e.preventDefault();
        }
        if(e.button != 0){
            return;
        }
        if(!this.disabled){
            if(this.enableToggle){
                this.toggle();
            }
            if(this.menu && !this.menu.isVisible()){
                this.menu.show(this.el, this.menuAlign);
            }

            this.fireEvent("click", this, e);
            if(this.handler){
                this.el.removeClass("x-btn-over");
                this.handler.call(this.scope || this, this, e);
            }
        }
    },
    
    onMouseOver : function(e){
        if(!this.disabled){
            this.el.addClass("x-btn-over");
            this.fireEvent('mouseover', this, e);
        }
    },
    
    onMouseOut : function(e){
        if(!e.within(this.el,  true)){
            this.el.removeClass("x-btn-over");
            this.fireEvent('mouseout', this, e);
        }
    },
    
    onFocus : function(e){
        if(!this.disabled){
            this.el.addClass("x-btn-focus");
        }
    },
    
    onBlur : function(e){
        this.el.removeClass("x-btn-focus");
    },
    
    onMouseDown : function(e){
        if(!this.disabled && e.button == 0){
            this.el.addClass("x-btn-click");
            Roo.get(document).on('mouseup', this.onMouseUp, this);
        }
    },
    
    onMouseUp : function(e){
        if(e.button == 0){
            this.el.removeClass("x-btn-click");
            Roo.get(document).un('mouseup', this.onMouseUp, this);
        }
    },
    
    onMenuShow : function(e){
        this.el.addClass("x-btn-menu-active");
    },
    
    onMenuHide : function(e){
        this.el.removeClass("x-btn-menu-active");
    }   
});


Roo.ButtonToggleMgr = function(){
   var  J = {};
   
   function  K(L, M){
       if(M){
           var  g = J[L.toggleGroup];
           for(var  i = 0, l = g.length; i < l; i++){
               if(g[i] != L){
                   g[i].toggle(false);
               }
           }
       }
   }
   
   return  {
       register : function(N){
           if(!N.toggleGroup){
               return;
           }
           var  g = J[N.toggleGroup];
           if(!g){
               g = J[N.toggleGroup] = [];
           }

           g.push(N);
           N.on("toggle", K);
       },
       
       unregister : function(O){
           if(!O.toggleGroup){
               return;
           }
           var  g = J[O.toggleGroup];
           if(g){
               g.remove(O);
               O.un("toggle", K);
           }
       }
   };
}();


 


Roo.SplitButton = function(A, B){
    Roo.SplitButton.superclass.constructor.call(this, A, B);
    

    this.addEvents({"arrowclick":true});
};

Roo.extend(Roo.SplitButton, Roo.Button, {
    render : function(C){
        
        var  D = new  Roo.Template(
            '<table cellspacing="0" class="x-btn-menu-wrap x-btn"><tr><td>',
            '<table cellspacing="0" class="x-btn-wrap x-btn-menu-text-wrap"><tbody>',
            '<tr><td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><button class="x-btn-text" type="{1}">{0}</button></td></tr>',
            "</tbody></table></td><td>",
            '<table cellspacing="0" class="x-btn-wrap x-btn-menu-arrow-wrap"><tbody>',
            '<tr><td class="x-btn-center"><button class="x-btn-menu-arrow-el" type="button">&#160;</button></td><td class="x-btn-right"><i>&#160;</i></td></tr>',
            "</tbody></table></td></tr></table>"
        );
        var  E = D.append(C, [this.text, this.type], true);
        var  F = E.child("button");
        if(this.cls){
            E.addClass(this.cls);
        }
        if(this.icon){
            F.setStyle('background-image', 'url(' +this.icon +')');
        }
        if(this.iconCls){
            F.addClass(this.iconCls);
            if(!this.cls){
                E.addClass(this.text ? 'x-btn-text-icon' : 'x-btn-icon');
            }
        }

        this.el = E;
        if(this.handleMouseEvents){
            E.on("mouseover", this.onMouseOver, this);
            E.on("mouseout", this.onMouseOut, this);
            E.on("mousedown", this.onMouseDown, this);
            E.on("mouseup", this.onMouseUp, this);
        }

        E.on(this.clickEvent, this.onClick, this);
        if(this.tooltip){
            if(typeof  this.tooltip == 'object'){
                Roo.QuickTips.tips(Roo.apply({
                      target: F.id
                }, this.tooltip));
            } else  {
                F.dom[this.tooltipType] = this.tooltip;
            }
        }
        if(this.arrowTooltip){
            E.child("button:nth(2)").dom[this.tooltipType] = this.arrowTooltip;
        }
        if(this.hidden){
            this.hide();
        }
        if(this.disabled){
            this.disable();
        }
        if(this.pressed){
            this.el.addClass("x-btn-pressed");
        }
        if(Roo.isIE && !Roo.isIE7){
            this.autoWidth.defer(1, this);
        }else {
            this.autoWidth();
        }
        if(this.menu){
            this.menu.on("show", this.onMenuShow, this);
            this.menu.on("hide", this.onMenuHide, this);
        }

        this.fireEvent('render', this);
    },

    
    autoWidth : function(){
        if(this.el){
            var  tbl = this.el.child("table:first");
            var  tbl2 = this.el.child("table:last");
            this.el.setWidth("auto");
            tbl.setWidth("auto");
            if(Roo.isIE7 && Roo.isStrict){
                var  ib = this.el.child('button:first');
                if(ib && ib.getWidth() > 20){
                    ib.clip();
                    ib.setWidth(Roo.util.TextMetrics.measure(ib, this.text).width+ib.getFrameWidth('lr'));
                }
            }
            if(this.minWidth){
                if(this.hidden){
                    this.el.beginMeasure();
                }
                if((tbl.getWidth()+tbl2.getWidth()) < this.minWidth){
                    tbl.setWidth(this.minWidth-tbl2.getWidth());
                }
                if(this.hidden){
                    this.el.endMeasure();
                }
            }

            this.el.setWidth(tbl.getWidth()+tbl2.getWidth());
        } 
    },
    

    setHandler : function(G, H){
        this.handler = G;
        this.scope = H;  
    },
    
    

    setArrowHandler : function(I, J){
        this.arrowHandler = I;
        this.scope = J;  
    },
    
    

    focus : function(){
        if(this.el){
            this.el.child("button:first").focus();
        }
    },

    
    onClick : function(e){
        e.preventDefault();
        if(!this.disabled){
            if(e.getTarget(".x-btn-menu-arrow-wrap")){
                if(this.menu && !this.menu.isVisible()){
                    this.menu.show(this.el, this.menuAlign);
                }

                this.fireEvent("arrowclick", this, e);
                if(this.arrowHandler){
                    this.arrowHandler.call(this.scope || this, this, e);
                }
            }else {
                this.fireEvent("click", this, e);
                if(this.handler){
                    this.handler.call(this.scope || this, this, e);
                }
            }
        }
    },
    
    onMouseDown : function(e){
        if(!this.disabled){
            Roo.fly(e.getTarget("table")).addClass("x-btn-click");
        }
    },
    
    onMouseUp : function(e){
        Roo.fly(e.getTarget("table")).removeClass("x-btn-click");
    }   
});



Roo.MenuButton = Roo.SplitButton;




 
Roo.Toolbar = function(A, B, C)
{
    
    if(A  instanceof  Array){ 
        B = A;
        C = B;
        A = null;
    }
    if (typeof(A) == 'object' && A.xtype) {
        C = A;
        A = C.container;
        B = C.buttons; 
    }
    var  D = [];
    if (C && C.items) {
        D = C.items;
        delete  C.items;
    }

    Roo.apply(this, C);
    this.buttons = B;
    
    if(A){
        this.render(A);
    }

    Roo.each(D, function(b) {
        this.add(b);
    }, this);
    
};

Roo.Toolbar.prototype = {
    

    
    

    
    render : function(ct){
        this.el = Roo.get(ct);
        if(this.cls){
            this.el.addClass(this.cls);
        }

        
        
        this.el.update('<div class="x-toolbar x-small-editor"><table cellspacing="0"><tr></tr></table></div>');
        this.tr = this.el.child("tr", true);
        var  E = 0;
        this.items = new  Roo.util.MixedCollection(false, function(o){
            return  o.id || ("item" + (++E));
        });
        if(this.buttons){
            this.add.apply(this, this.buttons);
            delete  this.buttons;
        }
    },

    

    add : function(){
        var  a = arguments, l = a.length;
        for(var  i = 0; i < l; i++){
            this._add(a[i]);
        }
    },
    
    _add : function(el) {
        
        if (el.xtype) {
            el = Roo.factory(el, typeof(Roo.Toolbar[el.xtype]) == 'undefined' ? Roo.form : Roo.Toolbar);
        }
        
        if (el.applyTo){ 
            return  this.addField(el);
        } 
        if (el.render){ 
            return  this.addItem(el);
        }
        if (typeof  el == "string"){ 
            if(el == "separator" || el == "-"){
                return  this.addSeparator();
            }
            if (el == " "){
                return  this.addSpacer();
            }
            if(el == "->"){
                return  this.addFill();
            }
            return  this.addText(el);
            
        }
        if(el.tagName){ 
            return  this.addElement(el);
        }
        if(typeof  el == "object"){ 
            return  this.addButton(el);
        }
        
        return  false;
        
    },
    
    

    addxtype : function(e){
        return  this.add(e);  
    },
    
    

    getEl : function(){
        return  this.el;  
    },
    
    

    addSeparator : function(){
        return  this.addItem(new  Roo.Toolbar.Separator());
    },

    

    addSpacer : function(){
        return  this.addItem(new  Roo.Toolbar.Spacer());
    },

    

    addFill : function(){
        return  this.addItem(new  Roo.Toolbar.Fill());
    },

    

    addElement : function(el){
        return  this.addItem(new  Roo.Toolbar.Item(el));
    },
    

    items : false,
     
    

    addItem : function(F){
        var  td = this.nextBlock();
        F.render(td);
        this.items.add(F);
        return  F;
    },
    
    

    addButton : function(G){
        if(G  instanceof  Array){
            var  B = [];
            for(var  i = 0, len = G.length; i < len; i++) {
                B.push(this.addButton(G[i]));
            }
            return  B;
        }
        var  b = G;
        if(!(G  instanceof  Roo.Toolbar.Button)){
            b = G.split ?
                new  Roo.Toolbar.SplitButton(G) :
                new  Roo.Toolbar.Button(G);
        }
        var  td = this.nextBlock();
        b.render(td);
        this.items.add(b);
        return  b;
    },
    
    

    addText : function(H){
        return  this.addItem(new  Roo.Toolbar.TextItem(H));
    },
    
    

    insertButton : function(I, J){
        if(J  instanceof  Array){
            var  B = [];
            for(var  i = 0, len = J.length; i < len; i++) {
               B.push(this.insertButton(I + i, J[i]));
            }
            return  B;
        }
        if (!(J  instanceof  Roo.Toolbar.Button)){
           J = new  Roo.Toolbar.Button(J);
        }
        var  td = document.createElement("td");
        this.tr.insertBefore(td, this.tr.childNodes[I]);
        J.render(td);
        this.items.insert(I, J);
        return  J;
    },
    
    

    addDom : function(K, L){
        var  td = this.nextBlock();
        Roo.DomHelper.overwrite(td, K);
        var  ti = new  Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return  ti;
    },

    

    fields : false,
    
    

     
      
    addField : function(M) {
        if (!this.fields) {
            var  E = 0;
            this.fields = new  Roo.util.MixedCollection(false, function(o){
                return  o.id || ("item" + (++E));
            });

        }
        
        var  td = this.nextBlock();
        M.render(td);
        var  ti = new  Roo.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        this.fields.add(M);
        return  ti;
    },
    

     
      
    hide : function()
    {
        this.el.child('div').setVisibilityMode(Roo.Element.DISPLAY);
        this.el.child('div').hide();
    },
    

    show : function()
    {
        this.el.child('div').show();
    },
      
    
    nextBlock : function(){
        var  td = document.createElement("td");
        this.tr.appendChild(td);
        return  td;
    },

    
    destroy : function(){
        if(this.items){ 
            Roo.destroy.apply(Roo, this.items.items);
        }
        if(this.fields){ 
            Roo.destroy.apply(Roo, this.fields.items);
        }

        Roo.Element.uncache(this.el, this.tr);
    }
};



Roo.Toolbar.Item = function(el){
    this.el = Roo.getDom(el);
    this.id = Roo.id(this.el);
    this.hidden = false;
};

Roo.Toolbar.Item.prototype = {
    
    

    getEl : function(){
       return  this.el;  
    },

    
    render : function(td){
        this.td = td;
        td.appendChild(this.el);
    },
    
    

    destroy : function(){
        this.td.parentNode.removeChild(this.td);
    },
    
    

    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    

    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },
    
    

    setVisible: function(N){
        if(N) {
            this.show();
        }else {
            this.hide();
        }
    },
    
    

    focus : function(){
        Roo.fly(this.el).focus();
    },
    
    

    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
        this.el.disabled = true;
    },
    
    

    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
        this.el.disabled = false;
    }
};




Roo.Toolbar.Separator = function(){
    var  s = document.createElement("span");
    s.className = "ytb-sep";
    Roo.Toolbar.Separator.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.Separator, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});



Roo.Toolbar.Spacer = function(){
    var  s = document.createElement("div");
    s.className = "ytb-spacer";
    Roo.Toolbar.Spacer.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.Spacer, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});



Roo.Toolbar.Fill = Roo.extend(Roo.Toolbar.Spacer, {
    
    render : function(td){
        td.style.width = '100%';
        Roo.Toolbar.Fill.superclass.render.call(this, td);
    }
});



Roo.Toolbar.TextItem = function(O){
    if (typeof(O) == 'object') {
        O = O.text;
    }
    var  s = document.createElement("span");
    s.className = "ytb-text";
    s.innerHTML = O;
    Roo.Toolbar.TextItem.superclass.constructor.call(this, s);
};
Roo.extend(Roo.Toolbar.TextItem, Roo.Toolbar.Item, {
    enable:Roo.emptyFn,
    disable:Roo.emptyFn,
    focus:Roo.emptyFn
});



Roo.Toolbar.Button = function(P){
    Roo.Toolbar.Button.superclass.constructor.call(this, null, P);
};
Roo.extend(Roo.Toolbar.Button, Roo.Button, {
    render : function(td){
        this.td = td;
        Roo.Toolbar.Button.superclass.render.call(this, td);
    },
    
    

    destroy : function(){
        Roo.Toolbar.Button.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    

    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    

    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },

    

    disable : function(){
        Roo.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
    },

    

    enable : function(){
        Roo.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
    }
});

Roo.ToolbarButton = Roo.Toolbar.Button;



Roo.Toolbar.SplitButton = function(Q){
    Roo.Toolbar.SplitButton.superclass.constructor.call(this, null, Q);
};
Roo.extend(Roo.Toolbar.SplitButton, Roo.SplitButton, {
    render : function(td){
        this.td = td;
        Roo.Toolbar.SplitButton.superclass.render.call(this, td);
    },
    
    

    destroy : function(){
        Roo.Toolbar.SplitButton.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },
    
    

    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },
    
    

    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    }
});


Roo.Toolbar.MenuButton = Roo.Toolbar.SplitButton;


 


Roo.PagingToolbar = function(el, ds, A)
{
    
    if (typeof(el) == 'object' && el.xtype) {
        
        A = el;
        ds = el.dataSource;
        el = A.container;
    }

    
    
    Roo.PagingToolbar.superclass.constructor.call(this, el, null, A);
    this.ds = ds;
    this.cursor = 0;
    this.renderButtons(this.el);
    this.bind(ds);
};

Roo.extend(Roo.PagingToolbar, Roo.Toolbar, {
    

    

    

    

    pageSize: 20,
    

    displayMsg : 'Displaying {0} - {1} of {2}',
    

    emptyMsg : 'No data to display',
    

    beforePageText : "Page",
    

    afterPageText : "of {0}",
    

    firstText : "First Page",
    

    prevText : "Previous Page",
    

    nextText : "Next Page",
    

    lastText : "Last Page",
    

    refreshText : "Refresh",

    
    renderButtons : function(el){
        Roo.PagingToolbar.superclass.render.call(this, el);
        this.first = this.addButton({
            tooltip: this.firstText,
            cls: "x-btn-icon x-grid-page-first",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["first"])
        });
        this.prev = this.addButton({
            tooltip: this.prevText,
            cls: "x-btn-icon x-grid-page-prev",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["prev"])
        });
        this.addSeparator();
        this.add(this.beforePageText);
        this.field = Roo.get(this.addDom({
           tag: "input",
           type: "text",
           size: "3",
           value: "1",
           cls: "x-grid-page-number"
        }).el);
        this.field.on("keydown", this.onPagingKeydown, this);
        this.field.on("focus", function(){this.dom.select();});
        this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
        this.field.setHeight(18);
        this.addSeparator();
        this.next = this.addButton({
            tooltip: this.nextText,
            cls: "x-btn-icon x-grid-page-next",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["next"])
        });
        this.last = this.addButton({
            tooltip: this.lastText,
            cls: "x-btn-icon x-grid-page-last",
            disabled: true,
            handler: this.onClick.createDelegate(this, ["last"])
        });
        this.addSeparator();
        this.loading = this.addButton({
            tooltip: this.refreshText,
            cls: "x-btn-icon x-grid-loading",
            handler: this.onClick.createDelegate(this, ["refresh"])
        });

        if(this.displayInfo){
            this.displayEl = Roo.fly(this.el.dom.firstChild).createChild({cls:'x-paging-info'});
        }
    },

    
    updateInfo : function(){
        if(this.displayEl){
            var  count = this.ds.getCount();
            var  msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.ds.getTotalCount()    
                );
            this.displayEl.update(msg);
        }
    },

    
    onLoad : function(ds, r, o){
       this.cursor = o.params ? o.params.start : 0;
       var  d = this.getPageData(), ap = d.activePage, ps = d.pages;

       this.afterTextEl.el.innerHTML = String.format(this.afterPageText, d.pages);
       this.field.dom.value = ap;
       this.first.setDisabled(ap == 1);
       this.prev.setDisabled(ap == 1);
       this.next.setDisabled(ap == ps);
       this.last.setDisabled(ap == ps);
       this.loading.enable();
       this.updateInfo();
    },

    
    getPageData : function(){
        var  B = this.ds.getTotalCount();
        return  {
            total : B,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  B < this.pageSize ? 1 : Math.ceil(B/this.pageSize)
        };
    },

    
    onLoadError : function(){
        this.loading.enable();
    },

    
    onPagingKeydown : function(e){
        var  k = e.getKey();
        var  d = this.getPageData();
        if(k == e.RETURN ){
            var  v = this.field.dom.value, pageNum;
            if(!v || isNaN(pageNum = parseInt(v, 10))){
                this.field.dom.value = d.activePage;
                return;
            }

            pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
            e.stopEvent();
        }
        else  if(k == e.HOME || (k == e.UP && e.ctrlKey) || (k == e.PAGEUP && e.ctrlKey) || (k == e.RIGHT && e.ctrlKey) || k == e.END || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey))
        {
          var  pageNum = (k == e.HOME || (k == e.DOWN && e.ctrlKey) || (k == e.LEFT && e.ctrlKey) || (k == e.PAGEDOWN && e.ctrlKey)) ? 1 : d.pages;
          this.field.dom.value = pageNum;
          this.ds.load({params:{start: (pageNum - 1) * this.pageSize, limit: this.pageSize}});
          e.stopEvent();
        }
        else  if(k == e.UP || k == e.RIGHT || k == e.PAGEUP || k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
        {
          var  v = this.field.dom.value, pageNum; 
          var  increment = (e.shiftKey) ? 10 : 1;
          if(k == e.DOWN || k == e.LEFT || k == e.PAGEDOWN)
            increment *= -1;
          if(!v || isNaN(pageNum = parseInt(v, 10))) {
            this.field.dom.value = d.activePage;
            return;
          }
          else  if(parseInt(v, 10) + increment >= 1 & parseInt(v, 10) + increment <= d.pages)
          {
            this.field.dom.value = parseInt(v, 10) + increment;
            pageNum = Math.min(Math.max(1, pageNum + increment), d.pages) - 1;
            this.ds.load({params:{start: pageNum * this.pageSize, limit: this.pageSize}});
          }

          e.stopEvent();
        }
    },

    
    beforeLoad : function(){
        if(this.loading){
            this.loading.disable();
        }
    },

    
    onClick : function(C){
        var  ds = this.ds;
        switch(C){
            case  "first":
                ds.load({params:{start: 0, limit: this.pageSize}});
            break;
            case  "prev":
                ds.load({params:{start: Math.max(0, this.cursor-this.pageSize), limit: this.pageSize}});
            break;
            case  "next":
                ds.load({params:{start: this.cursor+this.pageSize, limit: this.pageSize}});
            break;
            case  "last":
                var  B = ds.getTotalCount();
                var  extra = B % this.pageSize;
                var  lastStart = extra ? (B - extra) : B-this.pageSize;
                ds.load({params:{start: lastStart, limit: this.pageSize}});
            break;
            case  "refresh":
                ds.load({params:{start: this.cursor, limit: this.pageSize}});
            break;
        }
    },

    

    unbind : function(ds){
        ds.un("beforeload", this.beforeLoad, this);
        ds.un("load", this.onLoad, this);
        ds.un("loadexception", this.onLoadError, this);
        ds.un("remove", this.updateInfo, this);
        ds.un("add", this.updateInfo, this);
        this.ds = undefined;
    },

    

    bind : function(ds){
        ds.on("beforeload", this.beforeLoad, this);
        ds.on("load", this.onLoad, this);
        ds.on("loadexception", this.onLoadError, this);
        ds.on("remove", this.updateInfo, this);
        ds.on("add", this.updateInfo, this);
        this.ds = ds;
    }
});





Roo.Resizable = function(el, A){
    this.el = Roo.get(el);

    if(A && A.wrap){
        A.resizeChild = this.el;
        this.el = this.el.wrap(typeof  A.wrap == "object" ? A.wrap : {cls:"xresizable-wrap"});
        this.el.id = this.el.dom.id = A.resizeChild.id + "-rzwrap";
        this.el.setStyle("overflow", "hidden");
        this.el.setPositioning(A.resizeChild.getPositioning());
        A.resizeChild.clearPositioning();
        if(!A.width || !A.height){
            var  csize = A.resizeChild.getSize();
            this.el.setSize(csize.width, csize.height);
        }
        if(A.pinned && !A.adjustments){
            A.adjustments = "auto";
        }
    }


    this.proxy = this.el.createProxy({tag: "div", cls: "x-resizable-proxy", id: this.el.id + "-rzproxy"});
    this.proxy.unselectable();
    this.proxy.enableDisplayMode('block');

    Roo.apply(this, A);

    if(this.pinned){
        this.disableTrackOver = true;
        this.el.addClass("x-resizable-pinned");
    }
    
    var  B = this.el.getStyle("position");
    if(B != "absolute" && B != "fixed"){
        this.el.setStyle("position", "relative");
    }
    if(!this.handles){ 
        this.handles = 's,e,se';
        if(this.multiDirectional){
            this.handles += ',n,w';
        }
    }
    if(this.handles == "all"){
        this.handles = "n s e w ne nw se sw";
    }
    var  hs = this.handles.split(/\s*?[,;]\s*?| /);
    var  ps = Roo.Resizable.positions;
    for(var  i = 0, len = hs.length; i < len; i++){
        if(hs[i] && ps[hs[i]]){
            var  pos = ps[hs[i]];
            this[pos] = new  Roo.Resizable.Handle(this, pos, this.disableTrackOver, this.transparent);
        }
    }

    
    this.corner = this.southeast;

    if(this.handles.indexOf("n") != -1 || this.handles.indexOf("w") != -1){
        this.updateBox = true;
    }


    this.activeHandle = null;

    if(this.resizeChild){
        if(typeof  this.resizeChild == "boolean"){
            this.resizeChild = Roo.get(this.el.dom.firstChild, true);
        }else {
            this.resizeChild = Roo.get(this.resizeChild, true);
        }
    }

    if(this.adjustments == "auto"){
        var  rc = this.resizeChild;
        var  hw = this.west, he = this.east, hn = this.north, hs = this.south;
        if(rc && (hw || hn)){
            rc.position("relative");
            rc.setLeft(hw ? hw.el.getWidth() : 0);
            rc.setTop(hn ? hn.el.getHeight() : 0);
        }

        this.adjustments = [
            (he ? -he.el.getWidth() : 0) + (hw ? -hw.el.getWidth() : 0),
            (hn ? -hn.el.getHeight() : 0) + (hs ? -hs.el.getHeight() : 0) -1
        ];
    }

    if(this.draggable){
        this.dd = this.dynamic ?
            this.el.initDD(null) : this.el.initDDProxy(null, {dragElId: this.proxy.id});
        this.dd.setHandleElId(this.resizeChild ? this.resizeChild.id : this.el.id);
    }


    
    this.addEvents({
        

        "beforeresize" : true,
        

        "resize" : true
    });

    if(this.width !== null && this.height !== null){
        this.resizeTo(this.width, this.height);
    }else {
        this.updateChildSize();
    }
    if(Roo.isIE){
        this.el.dom.style.zoom = 1;
    }

    Roo.Resizable.superclass.constructor.call(this);
};

Roo.extend(Roo.Resizable, Roo.util.Observable, {
        resizeChild : false,
        adjustments : [0, 0],
        minWidth : 5,
        minHeight : 5,
        maxWidth : 10000,
        maxHeight : 10000,
        enabled : true,
        animate : false,
        duration : .35,
        dynamic : false,
        handles : false,
        multiDirectional : false,
        disableTrackOver : false,
        easing : 'easeOutStrong',
        widthIncrement : 0,
        heightIncrement : 0,
        pinned : false,
        width : null,
        height : null,
        preserveRatio : false,
        transparent: false,
        minX: 0,
        minY: 0,
        draggable: false,

        

        constrainTo: undefined,
        

        resizeRegion: undefined,


    

    resizeTo : function(C, D){
        this.el.setSize(C, D);
        this.updateChildSize();
        this.fireEvent("resize", this, C, D, null);
    },

    
    startSizing : function(e, E){
        this.fireEvent("beforeresize", this, e);
        if(this.enabled){ 

            if(!this.overlay){
                this.overlay = this.el.createProxy({tag: "div", cls: "x-resizable-overlay", html: "&#160;"});
                this.overlay.unselectable();
                this.overlay.enableDisplayMode("block");
                this.overlay.on("mousemove", this.onMouseMove, this);
                this.overlay.on("mouseup", this.onMouseUp, this);
            }

            this.overlay.setStyle("cursor", E.el.getStyle("cursor"));

            this.resizing = true;
            this.startBox = this.el.getBox();
            this.startPoint = e.getXY();
            this.offsets = [(this.startBox.x + this.startBox.width) - this.startPoint[0],
                            (this.startBox.y + this.startBox.height) - this.startPoint[1]];

            this.overlay.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
            this.overlay.show();

            if(this.constrainTo) {
                var  ct = Roo.get(this.constrainTo);
                this.resizeRegion = ct.getRegion().adjust(
                    ct.getFrameWidth('t'),
                    ct.getFrameWidth('l'),
                    -ct.getFrameWidth('b'),
                    -ct.getFrameWidth('r')
                );
            }


            this.proxy.setStyle('visibility', 'hidden'); 
            this.proxy.show();
            this.proxy.setBox(this.startBox);
            if(!this.dynamic){
                this.proxy.setStyle('visibility', 'visible');
            }
        }
    },

    
    onMouseDown : function(F, e){
        if(this.enabled){
            e.stopEvent();
            this.activeHandle = F;
            this.startSizing(e, F);
        }
    },

    
    onMouseUp : function(e){
        var  G = this.resizeElement();
        this.resizing = false;
        this.handleOut();
        this.overlay.hide();
        this.proxy.hide();
        this.fireEvent("resize", this, G.width, G.height, e);
    },

    
    updateChildSize : function(){
        if(this.resizeChild){
            var  el = this.el;
            var  child = this.resizeChild;
            var  adj = this.adjustments;
            if(el.dom.offsetWidth){
                var  b = el.getSize(true);
                child.setSize(b.width+adj[0], b.height+adj[1]);
            }
            
            
            
            
            if(Roo.isIE){
                setTimeout(function(){
                    if(el.dom.offsetWidth){
                        var  b = el.getSize(true);
                        child.setSize(b.width+adj[0], b.height+adj[1]);
                    }
                }, 10);
            }
        }
    },

    
    snap : function(H, I, J){
        if(!I || !H) return  H;
        var  K = H;
        var  m = H % I;
        if(m > 0){
            if(m > (I/2)){
                K = H + (I-m);
            }else {
                K = H - m;
            }
        }
        return  Math.max(J, K);
    },

    
    resizeElement : function(){
        var  L = this.proxy.getBox();
        if(this.updateBox){
            this.el.setBox(L, false, this.animate, this.duration, null, this.easing);
        }else {
            this.el.setSize(L.width, L.height, this.animate, this.duration, null, this.easing);
        }

        this.updateChildSize();
        if(!this.dynamic){
            this.proxy.hide();
        }
        return  L;
    },

    
    constrain : function(v, M, m, mx){
        if(v - M < m){
            M = v - m;
        }else  if(v - M > mx){
            M = mx - v;
        }
        return  M;
    },

    
    onMouseMove : function(e){
        if(this.enabled){
            try{

            if(this.resizeRegion && !this.resizeRegion.contains(e.getPoint())) {
            	return;
            }

            
            var  curSize = this.curSize || this.startBox;
            var  x = this.startBox.x, y = this.startBox.y;
            var  ox = x, oy = y;
            var  w = curSize.width, h = curSize.height;
            var  ow = w, oh = h;
            var  mw = this.minWidth, mh = this.minHeight;
            var  mxw = this.maxWidth, mxh = this.maxHeight;
            var  wi = this.widthIncrement;
            var  hi = this.heightIncrement;

            var  eventXY = e.getXY();
            var  diffX = -(this.startPoint[0] - Math.max(this.minX, eventXY[0]));
            var  diffY = -(this.startPoint[1] - Math.max(this.minY, eventXY[1]));

            var  pos = this.activeHandle.position;

            switch(pos){
                case  "east":
                    w += diffX;
                    w = Math.min(Math.max(mw, w), mxw);
                    break;
                case  "south":
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case  "southeast":
                    w += diffX;
                    h += diffY;
                    w = Math.min(Math.max(mw, w), mxw);
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case  "north":
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case  "west":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    x += diffX;
                    w -= diffX;
                    break;
                case  "northeast":
                    w += diffX;
                    w = Math.min(Math.max(mw, w), mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case  "northwest":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    x += diffX;
                    w -= diffX;
                    break;
               case  "southwest":
                    diffX = this.constrain(w, diffX, mw, mxw);
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    x += diffX;
                    w -= diffX;
                    break;
            }

            var  sw = this.snap(w, wi, mw);
            var  sh = this.snap(h, hi, mh);
            if(sw != w || sh != h){
                switch(pos){
                    case  "northeast":
                        y -= sh - h;
                    break;
                    case  "north":
                        y -= sh - h;
                        break;
                    case  "southwest":
                        x -= sw - w;
                    break;
                    case  "west":
                        x -= sw - w;
                        break;
                    case  "northwest":
                        x -= sw - w;
                        y -= sh - h;
                    break;
                }

                w = sw;
                h = sh;
            }

            if(this.preserveRatio){
                switch(pos){
                    case  "southeast":
                    case  "east":
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                       break;
                    case  "south":
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        break;
                    case  "northeast":
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                    break;
                    case  "north":
                        var  tw = w;
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        x += (tw - w) / 2;
                        break;
                    case  "southwest":
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        var  tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                        break;
                    case  "west":
                        var  th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        y += (th - h) / 2;
                        var  tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                       break;
                    case  "northwest":
                        var  tw = w;
                        var  th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                        y += th - h;
                         x += tw - w;
                       break;

                }
            }

            this.proxy.setBounds(x, y, w, h);
            if(this.dynamic){
                this.resizeElement();
            }
            }catch(e){}
        }
    },

    
    handleOver : function(){
        if(this.enabled){
            this.el.addClass("x-resizable-over");
        }
    },

    
    handleOut : function(){
        if(!this.resizing){
            this.el.removeClass("x-resizable-over");
        }
    },

    

    getEl : function(){
        return  this.el;
    },

    

    getResizeChild : function(){
        return  this.resizeChild;
    },

    

    destroy : function(N){
        this.proxy.remove();
        if(this.overlay){
            this.overlay.removeAllListeners();
            this.overlay.remove();
        }
        var  ps = Roo.Resizable.positions;
        for(var  k  in  ps){
            if(typeof  ps[k] != "function" && this[ps[k]]){
                var  h = this[ps[k]];
                h.el.removeAllListeners();
                h.el.remove();
            }
        }
        if(N){
            this.el.update("");
            this.el.remove();
        }
    }
});



Roo.Resizable.positions = {
    n: "north", s: "south", e: "east", w: "west", se: "southeast", sw: "southwest", nw: "northwest", ne: "northeast"
};


Roo.Resizable.Handle = function(rz, O, P, Q){
    if(!this.tpl){
        
        var  tpl = Roo.DomHelper.createTemplate(
            {tag: "div", cls: "x-resizable-handle x-resizable-handle-{0}"}
        );
        tpl.compile();
        Roo.Resizable.Handle.prototype.tpl = tpl;
    }

    this.position = O;
    this.rz = rz;
    this.el = this.tpl.append(rz.el.dom, [this.position], true);
    this.el.unselectable();
    if(Q){
        this.el.setOpacity(0);
    }

    this.el.on("mousedown", this.onMouseDown, this);
    if(!P){
        this.el.on("mouseover", this.onMouseOver, this);
        this.el.on("mouseout", this.onMouseOut, this);
    }
};


Roo.Resizable.Handle.prototype = {
    afterResize : function(rz){
        
    },
    
    onMouseDown : function(e){
        this.rz.onMouseDown(this, e);
    },
    
    onMouseOver : function(e){
        this.rz.handleOver(this, e);
    },
    
    onMouseOut : function(e){
        this.rz.handleOut(this, e);
    }
};





Roo.Editor = function(A, B){
    Roo.Editor.superclass.constructor.call(this, B);
    this.field = A;
    this.addEvents({
        

        "beforestartedit" : true,
        

        "startedit" : true,
        

        "beforecomplete" : true,
        

        "complete" : true,
        

        "specialkey" : true
    });
};

Roo.extend(Roo.Editor, Roo.Component, {
    

    

    

    

    

    value : "",
    

    alignment: "c-c?",
    

    shadow : "frame",
    

    constrain : false,
    

    completeOnEnter : false,
    

    cancelOnEsc : false,
    

    updateEl : false,

    
    onRender : function(ct, C){
        this.el = new  Roo.Layer({
            shadow: this.shadow,
            cls: "x-editor",
            parentEl : ct,
            shim : this.shim,
            shadowOffset:4,
            id: this.id,
            constrain: this.constrain
        });
        this.el.setStyle("overflow", Roo.isGecko ? "auto" : "hidden");
        if(this.field.msgTarget != 'title'){
            this.field.msgTarget = 'qtip';
        }

        this.field.render(this.el);
        if(Roo.isGecko){
            this.field.el.dom.setAttribute('autocomplete', 'off');
        }

        this.field.on("specialkey", this.onSpecialKey, this);
        if(this.swallowKeys){
            this.field.el.swallowEvent(['keydown','keypress']);
        }

        this.field.show();
        this.field.on("blur", this.onBlur, this);
        if(this.field.grow){
            this.field.on("autosize", this.el.sync,  this.el, {delay:1});
        }
    },

    onSpecialKey : function(D, e){
        if(this.completeOnEnter && e.getKey() == e.ENTER){
            e.stopEvent();
            this.completeEdit();
        }else  if(this.cancelOnEsc && e.getKey() == e.ESC){
            this.cancelEdit();
        }else {
            this.fireEvent('specialkey', D, e);
        }
    },

    

    startEdit : function(el, E){
        if(this.editing){
            this.completeEdit();
        }

        this.boundEl = Roo.get(el);
        var  v = E !== undefined ? E : this.boundEl.dom.innerHTML;
        if(!this.rendered){
            this.render(this.parentEl || document.body);
        }
        if(this.fireEvent("beforestartedit", this, this.boundEl, v) === false){
            return;
        }

        this.startValue = v;
        this.field.setValue(v);
        if(this.autoSize){
            var  sz = this.boundEl.getSize();
            switch(this.autoSize){
                case  "width":
                this.setSize(sz.width,  "");
                break;
                case  "height":
                this.setSize("",  sz.height);
                break;
                default:
                this.setSize(sz.width,  sz.height);
            }
        }

        this.el.alignTo(this.boundEl, this.alignment);
        this.editing = true;
        if(Roo.QuickTips){
            Roo.QuickTips.disable();
        }

        this.show();
    },

    

    setSize : function(w, h){
        this.field.setSize(w, h);
        if(this.el){
            this.el.sync();
        }
    },

    

    realign : function(){
        this.el.alignTo(this.boundEl, this.alignment);
    },

    

    completeEdit : function(F){
        if(!this.editing){
            return;
        }
        var  v = this.getValue();
        if(this.revertInvalid !== false && !this.field.isValid()){
            v = this.startValue;
            this.cancelEdit(true);
        }
        if(String(v) === String(this.startValue) && this.ignoreNoChange){
            this.editing = false;
            this.hide();
            return;
        }
        if(this.fireEvent("beforecomplete", this, v, this.startValue) !== false){
            this.editing = false;
            if(this.updateEl && this.boundEl){
                this.boundEl.update(v);
            }
            if(F !== true){
                this.hide();
            }

            this.fireEvent("complete", this, v, this.startValue);
        }
    },

    
    onShow : function(){
        this.el.show();
        if(this.hideEl !== false){
            this.boundEl.hide();
        }

        this.field.show();
        if(Roo.isIE && !this.fixIEFocus){ 
            this.fixIEFocus = true;
            this.deferredFocus.defer(50, this);
        }else {
            this.field.focus();
        }

        this.fireEvent("startedit", this.boundEl, this.startValue);
    },

    deferredFocus : function(){
        if(this.editing){
            this.field.focus();
        }
    },

    

    cancelEdit : function(G){
        if(this.editing){
            this.setValue(this.startValue);
            if(G !== true){
                this.hide();
            }
        }
    },

    
    onBlur : function(){
        if(this.allowBlur !== true && this.editing){
            this.completeEdit();
        }
    },

    
    onHide : function(){
        if(this.editing){
            this.completeEdit();
            return;
        }

        this.field.blur();
        if(this.field.collapse){
            this.field.collapse();
        }

        this.el.hide();
        if(this.hideEl !== false){
            this.boundEl.show();
        }
        if(Roo.QuickTips){
            Roo.QuickTips.enable();
        }
    },

    

    setValue : function(v){
        this.field.setValue(v);
    },

    

    getValue : function(){
        return  this.field.getValue();
    }
});


 


Roo.BasicDialog = function(el, A){
    this.el = Roo.get(el);
    var  dh = Roo.DomHelper;
    if(!this.el && A && A.autoCreate){
        if(typeof  A.autoCreate == "object"){
            if(!A.autoCreate.id){
                A.autoCreate.id = el;
            }

            this.el = dh.append(document.body,
                        A.autoCreate, true);
        }else {
            this.el = dh.append(document.body,
                        {tag: "div", id: el, style:'visibility:hidden;'}, true);
        }
    }

    el = this.el;
    el.setDisplayed(true);
    el.hide = this.hideAction;
    this.id = el.id;
    el.addClass("x-dlg");

    Roo.apply(this, A);

    this.proxy = el.createProxy("x-dlg-proxy");
    this.proxy.hide = this.hideAction;
    this.proxy.setOpacity(.5);
    this.proxy.hide();

    if(A.width){
        el.setWidth(A.width);
    }
    if(A.height){
        el.setHeight(A.height);
    }

    this.size = el.getSize();
    if(typeof  A.x != "undefined" && typeof  A.y != "undefined"){
        this.xy = [A.x,A.y];
    }else {
        this.xy = el.getCenterXY(true);
    }

    

    this.header = el.child("> .x-dlg-hd");
    

    this.body = el.child("> .x-dlg-bd");
    

    this.footer = el.child("> .x-dlg-ft");

    if(!this.header){
        this.header = el.createChild({tag: "div", cls:"x-dlg-hd", html: "&#160;"}, this.body ? this.body.dom : null);
    }
    if(!this.body){
        this.body = el.createChild({tag: "div", cls:"x-dlg-bd"});
    }


    this.header.unselectable();
    if(this.title){
        this.header.update(this.title);
    }

    
    this.focusEl = el.createChild({tag: "a", href:"#", cls:"x-dlg-focus", tabIndex:"-1"});
    this.focusEl.swallowEvent("click", true);

    this.header.wrap({cls:"x-dlg-hd-right"}).wrap({cls:"x-dlg-hd-left"}, true);

    
    this.bwrap = this.body.wrap({tag: "div", cls:"x-dlg-dlg-body"});
    if(this.footer){
        this.bwrap.dom.appendChild(this.footer.dom);
    }


    this.bg = this.el.createChild({
        tag: "div", cls:"x-dlg-bg",
        html: '<div class="x-dlg-bg-left"><div class="x-dlg-bg-right"><div class="x-dlg-bg-center">&#160;</div></div></div>'
    });
    this.centerBg = this.bg.child("div.x-dlg-bg-center");


    if(this.autoScroll !== false && !this.autoTabs){
        this.body.setStyle("overflow", "auto");
    }


    this.toolbox = this.el.createChild({cls: "x-dlg-toolbox"});

    if(this.closable !== false){
        this.el.addClass("x-dlg-closable");
        this.close = this.toolbox.createChild({cls:"x-dlg-close"});
        this.close.on("click", this.closeClick, this);
        this.close.addClassOnOver("x-dlg-close-over");
    }
    if(this.collapsible !== false){
        this.collapseBtn = this.toolbox.createChild({cls:"x-dlg-collapse"});
        this.collapseBtn.on("click", this.collapseClick, this);
        this.collapseBtn.addClassOnOver("x-dlg-collapse-over");
        this.header.on("dblclick", this.collapseClick, this);
    }
    if(this.resizable !== false){
        this.el.addClass("x-dlg-resizable");
        this.resizer = new  Roo.Resizable(el, {
            minWidth: this.minWidth || 80,
            minHeight:this.minHeight || 80,
            handles: this.resizeHandles || "all",
            pinned: true
        });
        this.resizer.on("beforeresize", this.beforeResize, this);
        this.resizer.on("resize", this.onResize, this);
    }
    if(this.draggable !== false){
        el.addClass("x-dlg-draggable");
        if (!this.proxyDrag) {
            var  dd = new  Roo.dd.DD(el.dom.id, "WindowDrag");
        }
        else  {
            var  dd = new  Roo.dd.DDProxy(el.dom.id, "WindowDrag", {dragElId: this.proxy.id});
        }

        dd.setHandleElId(this.header.id);
        dd.endDrag = this.endMove.createDelegate(this);
        dd.startDrag = this.startMove.createDelegate(this);
        dd.onDrag = this.onDrag.createDelegate(this);
        dd.scroll = false;
        this.dd = dd;
    }
    if(this.modal){
        this.mask = dh.append(document.body, {tag: "div", cls:"x-dlg-mask"}, true);
        this.mask.enableDisplayMode("block");
        this.mask.hide();
        this.el.addClass("x-dlg-modal");
    }
    if(this.shadow){
        this.shadow = new  Roo.Shadow({
            mode : typeof  this.shadow == "string" ? this.shadow : "sides",
            offset : this.shadowOffset
        });
    }else {
        this.shadowOffset = 0;
    }
    if(Roo.useShims && this.shim !== false){
        this.shim = this.el.createShim();
        this.shim.hide = this.hideAction;
        this.shim.hide();
    }else {
        this.shim = false;
    }
    if(this.autoTabs){
        this.initTabs();
    }
    if (this.buttons) { 
        var  bts= this.buttons;
        this.buttons = [];
        Roo.each(bts, function(b) {
            this.addButton(b);
        }, this);
    }

    
    
    this.addEvents({
        

        "keydown" : true,
        

        "move" : true,
        

        "resize" : true,
        

        "beforehide" : true,
        

        "hide" : true,
        

        "beforeshow" : true,
        

        "show" : true
    });
    el.on("keydown", this.onKeyDown, this);
    el.on("mousedown", this.toFront, this);
    Roo.EventManager.onWindowResize(this.adjustViewport, this, true);
    this.el.hide();
    Roo.DialogManager.register(this);
    Roo.BasicDialog.superclass.constructor.call(this);
};

Roo.extend(Roo.BasicDialog, Roo.util.Observable, {
    shadowOffset: Roo.isIE ? 6 : 5,
    minHeight: 80,
    minWidth: 200,
    minButtonWidth: 75,
    defaultButton: null,
    buttonAlign: "right",
    tabTag: 'div',
    firstShow: true,

    

    setTitle : function(B){
        this.header.update(B);
        return  this;
    },

    
    closeClick : function(){
        this.hide();
    },

    
    collapseClick : function(){
        this[this.collapsed ? "expand" : "collapse"]();
    },

    

    collapse : function(){
        if(!this.collapsed){
            this.collapsed = true;
            this.el.addClass("x-dlg-collapsed");
            this.restoreHeight = this.el.getHeight();
            this.resizeTo(this.el.getWidth(), this.header.getHeight());
        }
    },

    

    expand : function(){
        if(this.collapsed){
            this.collapsed = false;
            this.el.removeClass("x-dlg-collapsed");
            this.resizeTo(this.el.getWidth(), this.restoreHeight);
        }
    },

    

    initTabs : function(){
        var  C = this.getTabs();
        while(C.getTab(0)){
            C.removeTab(0);
        }

        this.el.select(this.tabTag+'.x-dlg-tab').each(function(el){
            var  D = el.dom;
            C.addTab(Roo.id(D), D.title);
            D.title = "";
        });
        C.activate(0);
        return  C;
    },

    
    beforeResize : function(){
        this.resizer.minHeight = Math.max(this.minHeight, this.getHeaderFooterHeight(true)+40);
    },

    
    onResize : function(){
        this.refreshSize();
        this.syncBodyHeight();
        this.adjustAssets();
        this.focus();
        this.fireEvent("resize", this, this.size.width, this.size.height);
    },

    
    onKeyDown : function(e){
        if(this.isVisible()){
            this.fireEvent("keydown", this, e);
        }
    },

    

    resizeTo : function(D, E){
        this.el.setSize(D, E);
        this.size = {width: D, height: E};
        this.syncBodyHeight();
        if(this.fixedcenter){
            this.center();
        }
        if(this.isVisible()){
            this.constrainXY();
            this.adjustAssets();
        }

        this.fireEvent("resize", this, D, E);
        return  this;
    },


    

    setContentSize : function(w, h){
        h += this.getHeaderFooterHeight() + this.body.getMargins("tb");
        w += this.body.getMargins("lr") + this.bwrap.getMargins("lr") + this.centerBg.getPadding("lr");
        
            h +=  this.body.getPadding("tb") + this.bwrap.getBorderWidth("tb") + this.body.getBorderWidth("tb") + this.el.getBorderWidth("tb");
            w += this.body.getPadding("lr") + this.bwrap.getBorderWidth("lr") + this.body.getBorderWidth("lr") + this.bwrap.getPadding("lr") + this.el.getBorderWidth("lr");
        
        if(this.tabs){
            h += this.tabs.stripWrap.getHeight() + this.tabs.bodyEl.getMargins("tb") + this.tabs.bodyEl.getPadding("tb");
            w += this.tabs.bodyEl.getMargins("lr") + this.tabs.bodyEl.getPadding("lr");
        }

        this.resizeTo(w, h);
        return  this;
    },

    

    addKeyListener : function(F, fn, G){
        var  H, I, J, K;
        if(typeof  F == "object" && !(F  instanceof  Array)){
            H = F["key"];
            I = F["shift"];
            J = F["ctrl"];
            K = F["alt"];
        }else {
            H = F;
        }
        var  L = function(M, e){
            if((!I || e.shiftKey) && (!J || e.ctrlKey) &&  (!K || e.altKey)){
                var  k = e.getKey();
                if(H  instanceof  Array){
                    for(var  i = 0, len = H.length; i < len; i++){
                        if(H[i] == k){
                          fn.call(G || window, M, k, e);
                          return;
                        }
                    }
                }else {
                    if(k == H){
                        fn.call(G || window, M, k, e);
                    }
                }
            }
        };
        this.on("keydown", L);
        return  this;
    },

    

    getTabs : function(){
        if(!this.tabs){
            this.el.addClass("x-dlg-auto-tabs");
            this.body.addClass(this.tabPosition == "bottom" ? "x-tabs-bottom" : "x-tabs-top");
            this.tabs = new  Roo.TabPanel(this.body.dom, this.tabPosition == "bottom");
        }
        return  this.tabs;
    },

    

    addButton : function(M, N, O){
        var  dh = Roo.DomHelper;
        if(!this.footer){
            this.footer = dh.append(this.bwrap, {tag: "div", cls:"x-dlg-ft"}, true);
        }
        if(!this.btnContainer){
            var  tb = this.footer.createChild({

                cls:"x-dlg-btns x-dlg-btns-"+this.buttonAlign,
                html:'<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
            }, null, true);
            this.btnContainer = tb.firstChild.firstChild.firstChild;
        }
        var  P = {
            handler: N,
            scope: O,
            minWidth: this.minButtonWidth,
            hideParent:true
        };
        if(typeof  M == "string"){
            P.text = M;
        }else {
            if(M.tag){
                P.dhconfig = M;
            }else {
                Roo.apply(P, M);
            }
        }
        var  fc = false;
        if ((typeof(P.position) != 'undefined') && P.position < this.btnContainer.childNodes.length-1) {
            P.position = Math.max(0, P.position);
            fc = this.btnContainer.childNodes[P.position];
        }
         
        var  Q = new  Roo.Button(
            fc ? 
                this.btnContainer.insertBefore(document.createElement("td"),fc)
                : this.btnContainer.appendChild(document.createElement("td")),
            
            P
        );
        this.syncBodyHeight();
        if(!this.buttons){
            

            this.buttons = [];
        }

        this.buttons.push(Q);
        return  Q;
    },

    

    setDefaultButton : function(R){
        this.defaultButton = R;
        return  this;
    },

    
    getHeaderFooterHeight : function(S){
        var  T = 0;
        if(this.header){
           T += this.header.getHeight();
        }
        if(this.footer){
           var  fm = this.footer.getMargins();
            T += (this.footer.getHeight()+fm.top+fm.bottom);
        }

        T += this.bwrap.getPadding("tb")+this.bwrap.getBorderWidth("tb");
        T += this.centerBg.getPadding("tb");
        return  T;
    },

    
    syncBodyHeight : function(){
        var  bd = this.body, cb = this.centerBg, bw = this.bwrap;
        var  U = this.size.height - this.getHeaderFooterHeight(false);
        bd.setHeight(U-bd.getMargins("tb"));
        var  hh = this.header.getHeight();
        var  h = this.size.height-hh;
        cb.setHeight(h);
        bw.setLeftTop(cb.getPadding("l"), hh+cb.getPadding("t"));
        bw.setHeight(h-cb.getPadding("tb"));
        bw.setWidth(this.el.getWidth(true)-cb.getPadding("lr"));
        bd.setWidth(bw.getWidth(true));
        if(this.tabs){
            this.tabs.syncHeight();
            if(Roo.isIE){
                this.tabs.el.repaint();
            }
        }
    },

    

    restoreState : function(){
        var  V = Roo.state.Manager.get(this.stateId || (this.el.id + "-state"));
        if(V && V.width){
            this.xy = [V.x, V.y];
            this.resizeTo(V.width, V.height);
        }
        return  this;
    },

    
    beforeShow : function(){
        this.expand();
        if(this.fixedcenter){
            this.xy = this.el.getCenterXY(true);
        }
        if(this.modal){
            Roo.get(document.body).addClass("x-body-masked");
            this.mask.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
            this.mask.show();
        }

        this.constrainXY();
    },

    
    animShow : function(){
        var  b = Roo.get(this.animateTarget, true).getBox();
        this.proxy.setSize(b.width, b.height);
        this.proxy.setLocation(b.x, b.y);
        this.proxy.show();
        this.proxy.setBounds(this.xy[0], this.xy[1], this.size.width, this.size.height,
                    true, .35, this.showEl.createDelegate(this));
    },

    

    show : function(W){
        if (this.fireEvent("beforeshow", this) === false){
            return;
        }
        if(this.syncHeightBeforeShow){
            this.syncBodyHeight();
        }else  if(this.firstShow){
            this.firstShow = false;
            this.syncBodyHeight(); 
        }

        this.animateTarget = W || this.animateTarget;
        if(!this.el.isVisible()){
            this.beforeShow();
            if(this.animateTarget){
                this.animShow();
            }else {
                this.showEl();
            }
        }
        return  this;
    },

    
    showEl : function(){
        this.proxy.hide();
        this.el.setXY(this.xy);
        this.el.show();
        this.adjustAssets(true);
        this.toFront();
        this.focus();
        
        if(Roo.isIE){
            this.el.repaint();
        }

        this.fireEvent("show", this);
    },

    

    focus : function(){
        if(this.defaultButton){
            this.defaultButton.focus();
        }else {
            this.focusEl.focus();
        }
    },

    
    constrainXY : function(){
        if(this.constraintoviewport !== false){
            if(!this.viewSize){
                if(this.container){
                    var  s = this.container.getSize();
                    this.viewSize = [s.width, s.height];
                }else {
                    this.viewSize = [Roo.lib.Dom.getViewWidth(),Roo.lib.Dom.getViewHeight()];
                }
            }
            var  s = Roo.get(this.container||document).getScroll();

            var  x = this.xy[0], y = this.xy[1];
            var  w = this.size.width, h = this.size.height;
            var  vw = this.viewSize[0], vh = this.viewSize[1];
            
            var  moved = false;
            
            if(x + w > vw+s.left){
                x = vw - w;
                moved = true;
            }
            if(y + h > vh+s.top){
                y = vh - h;
                moved = true;
            }
            
            if(x < s.left){
                x = s.left;
                moved = true;
            }
            if(y < s.top){
                y = s.top;
                moved = true;
            }
            if(moved){
                
                this.xy = [x, y];
                if(this.isVisible()){
                    this.el.setLocation(x, y);
                    this.adjustAssets();
                }
            }
        }
    },

    
    onDrag : function(){
        if(!this.proxyDrag){
            this.xy = this.el.getXY();
            this.adjustAssets();
        }
    },

    
    adjustAssets : function(X){
        var  x = this.xy[0], y = this.xy[1];
        var  w = this.size.width, h = this.size.height;
        if(X === true){
            if(this.shadow){
                this.shadow.show(this.el);
            }
            if(this.shim){
                this.shim.show();
            }
        }
        if(this.shadow && this.shadow.isVisible()){
            this.shadow.show(this.el);
        }
        if(this.shim && this.shim.isVisible()){
            this.shim.setBounds(x, y, w, h);
        }
    },

    
    adjustViewport : function(w, h){
        if(!w || !h){
            w = Roo.lib.Dom.getViewWidth();
            h = Roo.lib.Dom.getViewHeight();
        }

        
        this.viewSize = [w, h];
        if(this.modal && this.mask.isVisible()){
            this.mask.setSize(w, h); 
            this.mask.setSize(Roo.lib.Dom.getViewWidth(true), Roo.lib.Dom.getViewHeight(true));
        }
        if(this.isVisible()){
            this.constrainXY();
        }
    },

    

    destroy : function(Y){
        if(this.isVisible()){
            this.animateTarget = null;
            this.hide();
        }

        Roo.EventManager.removeResizeListener(this.adjustViewport, this);
        if(this.tabs){
            this.tabs.destroy(Y);
        }

        Roo.destroy(
             this.shim,
             this.proxy,
             this.resizer,
             this.close,
             this.mask
        );
        if(this.dd){
            this.dd.unreg();
        }
        if(this.buttons){
           for(var  i = 0, len = this.buttons.length; i < len; i++){
               this.buttons[i].destroy();
           }
        }

        this.el.removeAllListeners();
        if(Y === true){
            this.el.update("");
            this.el.remove();
        }

        Roo.DialogManager.unregister(this);
    },

    
    startMove : function(){
        if(this.proxyDrag){
            this.proxy.show();
        }
        if(this.constraintoviewport !== false){
            this.dd.constrainTo(document.body, {right: this.shadowOffset, bottom: this.shadowOffset});
        }
    },

    
    endMove : function(){
        if(!this.proxyDrag){
            Roo.dd.DD.prototype.endDrag.apply(this.dd, arguments);
        }else {
            Roo.dd.DDProxy.prototype.endDrag.apply(this.dd, arguments);
            this.proxy.hide();
        }

        this.refreshSize();
        this.adjustAssets();
        this.focus();
        this.fireEvent("move", this, this.xy[0], this.xy[1]);
    },

    

    toFront : function(){
        Roo.DialogManager.bringToFront(this);
        return  this;
    },

    

    toBack : function(){
        Roo.DialogManager.sendToBack(this);
        return  this;
    },

    

    center : function(){
        var  xy = this.el.getCenterXY(true);
        this.moveTo(xy[0], xy[1]);
        return  this;
    },

    

    moveTo : function(x, y){
        this.xy = [x,y];
        if(this.isVisible()){
            this.el.setXY(this.xy);
            this.adjustAssets();
        }
        return  this;
    },

    

    alignTo : function(Z, a, c){
        this.xy = this.el.getAlignToXY(Z, a, c);
        if(this.isVisible()){
            this.el.setXY(this.xy);
            this.adjustAssets();
        }
        return  this;
    },

    

    anchorTo : function(el, d, f, g){
        var  j = function(){
            this.alignTo(el, d, f);
        };
        Roo.EventManager.onWindowResize(j, this);
        var  tm = typeof  g;
        if(tm != 'undefined'){
            Roo.EventManager.on(window, 'scroll', j, this,
                {buffer: tm == 'number' ? g : 50});
        }

        j.call(this);
        return  this;
    },

    

    isVisible : function(){
        return  this.el.isVisible();
    },

    
    animHide : function(l){
        var  b = Roo.get(this.animateTarget).getBox();
        this.proxy.show();
        this.proxy.setBounds(this.xy[0], this.xy[1], this.size.width, this.size.height);
        this.el.hide();
        this.proxy.setBounds(b.x, b.y, b.width, b.height, true, .35,
                    this.hideEl.createDelegate(this, [l]));
    },

    

    hide : function(m){
        if (this.fireEvent("beforehide", this) === false){
            return;
        }
        if(this.shadow){
            this.shadow.hide();
        }
        if(this.shim) {
          this.shim.hide();
        }
        if(this.animateTarget){
           this.animHide(m);
        }else {
            this.el.hide();
            this.hideEl(m);
        }
        return  this;
    },

    
    hideEl : function(n){
        this.proxy.hide();
        if(this.modal){
            this.mask.hide();
            Roo.get(document.body).removeClass("x-body-masked");
        }

        this.fireEvent("hide", this);
        if(typeof  n == "function"){
            n();
        }
    },

    
    hideAction : function(){
        this.setLeft("-10000px");
        this.setTop("-10000px");
        this.setStyle("visibility", "hidden");
    },

    
    refreshSize : function(){
        this.size = this.el.getSize();
        this.xy = this.el.getXY();
        Roo.state.Manager.set(this.stateId || this.el.id + "-state", this.el.getBox());
    },

    
    
    setZIndex : function(o){
        if(this.modal){
            this.mask.setStyle("z-index", o);
        }
        if(this.shim){
            this.shim.setStyle("z-index", ++o);
        }
        if(this.shadow){
            this.shadow.setZIndex(++o);
        }

        this.el.setStyle("z-index", ++o);
        if(this.proxy){
            this.proxy.setStyle("z-index", ++o);
        }
        if(this.resizer){
            this.resizer.proxy.setStyle("z-index", ++o);
        }


        this.lastZIndex = o;
    },

    

    getEl : function(){
        return  this.el;
    }
});



Roo.DialogManager = function(){
    var  p = {};
    var  q = [];
    var  r = null;

    
    var  t = function(d1, d2){
        return  (!d1._lastAccess || d1._lastAccess < d2._lastAccess) ? -1 : 1;
    };

    
    var  u = function(){
        q.sort(t);
        var  v = Roo.DialogManager.zseed;
        for(var  i = 0, len = q.length; i < len; i++){
            var  dlg = q[i];
            if(dlg){
                dlg.setZIndex(v + (i*10));
            }
        }
    };

    return  {
        

        zseed : 9000,

        
        register : function(AD){
            p[AD.id] = AD;
            q.push(AD);
        },

        
        unregister : function(AE){
            delete  p[AE.id];
            var  i=0;
            var  AF=0;
            if(!q.indexOf){
                for(  i = 0, AF = q.length; i < AF; i++){
                    if(q[i] == AE){
                        q.splice(i, 1);
                        return;
                    }
                }
            }else {
                 i = q.indexOf(AE);
                if(i != -1){
                    q.splice(i, 1);
                }
            }
        },

        

        get : function(id){
            return  typeof  id == "object" ? id : p[id];
        },

        

        bringToFront : function(AG){
            AG = this.get(AG);
            if(AG != r){
                r = AG;
                AG._lastAccess = new  Date().getTime();
                u();
            }
            return  AG;
        },

        

        sendToBack : function(AH){
            AH = this.get(AH);
            AH._lastAccess = -(new  Date().getTime());
            u();
            return  AH;
        },

        

        hideAll : function(){
            for(var  id  in  p){
                if(p[id] && typeof  p[id] != "function" && p[id].isVisible()){
                    p[id].hide();
                }
            }
        }
    };
}();



Roo.LayoutDialog = function(el, v){
    
    var  z=  v;
    if (typeof(v) == 'undefined') {
        z = Roo.apply({}, el);
        el = Roo.get( document.documentElement || document.body).createChild();
        
    }

    
    
    z.autoTabs = false;
    Roo.LayoutDialog.superclass.constructor.call(this, el, z);
    this.body.setStyle({overflow:"hidden", position:"relative"});
    this.layout = new  Roo.BorderLayout(this.body.dom, z);
    this.layout.monitorWindowResize = false;
    this.el.addClass("x-dlg-auto-layout");
    
    this.center = Roo.BasicDialog.prototype.center;
    this.on("show", this.layout.layout, this.layout, true);
    if (z.items) {
        var  xitems = z.items;
        delete  z.items;
        Roo.each(xitems, this.addxtype, this);
    }
    
    
};
Roo.extend(Roo.LayoutDialog, Roo.BasicDialog, {
    

    endUpdate : function(){
        this.layout.endUpdate();
    },

    

    beginUpdate : function(){
        this.layout.beginUpdate();
    },

    

    getLayout : function(){
        return  this.layout;
    },

    showEl : function(){
        Roo.LayoutDialog.superclass.showEl.apply(this, arguments);
        if(Roo.isIE7){
            this.layout.layout();
        }
    },

    
    
    syncBodyHeight : function(){
        Roo.LayoutDialog.superclass.syncBodyHeight.call(this);
        if(this.layout){this.layout.layout();}
    },
    
      

    
    addxtype : function(c) {
        return  this.layout.addxtype(c);
    }
});


 


Roo.MessageBox = function(){
    var  A, B, C, D;
    var  E, F, G, H, I, pp;
    var  J, K, L;

    
    var  M = function(Q){
        A.hide();
        Roo.callback(B.fn, B.scope||window, [Q, K.dom.value], 1);
    };

    
    var  N = function(){
        if(B && B.cls){
            A.el.removeClass(B.cls);
        }
        if(D){
            Roo.TaskMgr.stop(D);
            D = null;
        }
    };

    
    var  O = function(b){
        var  Q = 0;
        if(!b){
            J["ok"].hide();
            J["cancel"].hide();
            J["yes"].hide();
            J["no"].hide();
            A.footer.dom.style.display = 'none';
            return  Q;
        }

        A.footer.dom.style.display = '';
        for(var  k  in  J){
            if(typeof  J[k] != "function"){
                if(b[k]){
                    J[k].show();
                    J[k].setText(typeof  b[k] == "string" ? b[k] : Roo.MessageBox.buttonText[k]);
                    Q += J[k].el.getWidth()+15;
                }else {
                    J[k].hide();
                }
            }
        }
        return  Q;
    };

    
    var  P = function(d, k, e){
        if(B && B.closable !== false){
            A.hide();
        }
        if(e){
            e.stopEvent();
        }
    };

    return  {
        

        getDialog : function(){
           if(!A){
                A = new  Roo.BasicDialog("x-msg-box", {
                    autoCreate : true,
                    shadow: true,
                    draggable: true,
                    resizable:false,
                    constraintoviewport:false,
                    fixedcenter:true,
                    collapsible : false,
                    shim:true,
                    modal: true,
                    width:400, height:100,
                    buttonAlign:"center",
                    closeClick : function(){
                        if(B && B.buttons && B.buttons.no && !B.buttons.cancel){
                            M("no");
                        }else {
                            M("cancel");
                        }
                    }
                });
                A.on("hide", N);
                C = A.mask;
                A.addKeyListener(27, P);
                J = {};
                var  bt = this.buttonText;
                J["ok"] = A.addButton(bt["ok"], M.createCallback("ok"));
                J["yes"] = A.addButton(bt["yes"], M.createCallback("yes"));
                J["no"] = A.addButton(bt["no"], M.createCallback("no"));
                J["cancel"] = A.addButton(bt["cancel"], M.createCallback("cancel"));
                E = A.body.createChild({

                    html:'<span class="roo-mb-text"></span><br /><input type="text" class="roo-mb-input" /><textarea class="roo-mb-textarea"></textarea><div class="roo-mb-progress-wrap"><div class="roo-mb-progress"><div class="roo-mb-progress-bar">&#160;</div></div></div>'
                });
                F = E.dom.firstChild;
                G = Roo.get(E.dom.childNodes[2]);
                G.enableDisplayMode();
                G.addKeyListener([10,13], function(){
                    if(A.isVisible() && B && B.buttons){
                        if(B.buttons.ok){
                            M("ok");
                        }else  if(B.buttons.yes){
                            M("yes");
                        }
                    }
                });
                H = Roo.get(E.dom.childNodes[3]);
                H.enableDisplayMode();
                I = Roo.get(E.dom.childNodes[4]);
                I.enableDisplayMode();
                var  pf = I.dom.firstChild;
                if (pf) {
                    pp = Roo.get(pf.firstChild);
                    pp.setHeight(pf.offsetHeight);
                }
                
            }
            return  A;
        },

        

        updateText : function(j){
            if(!A.isVisible() && !B.width){
                A.resizeTo(this.maxWidth, 100); 
            }

            F.innerHTML = j || '&#160;';
            var  w = Math.max(Math.min(B.width || F.offsetWidth, this.maxWidth), 
                        Math.max(B.minWidth || this.minWidth, L));
            if(B.prompt){
                K.setWidth(w);
            }
            if(A.isVisible()){
                A.fixedcenter = false;
            }

            A.setContentSize(w, E.getHeight());
            if(A.isVisible()){
                A.fixedcenter = true;
            }
            return  this;
        },

        

        updateProgress : function(l, m){
            if(m){
                this.updateText(m);
            }
            if (pp) { 
                pp.setWidth(Math.floor(l*I.dom.firstChild.offsetWidth));
            }
            return  this;
        },        

        

        isVisible : function(){
            return  A && A.isVisible();  
        },

        

        hide : function(){
            if(this.isVisible()){
                A.hide();
            }  
        },

        

        show : function(n){
            if(this.isVisible()){
                this.hide();
            }
            var  d = this.getDialog();
            B = n;
            d.setTitle(B.title || "&#160;");
            d.close.setDisplayed(B.closable !== false);
            K = G;
            B.prompt = B.prompt || (B.multiline ? true : false);
            if(B.prompt){
                if(B.multiline){
                    G.hide();
                    H.show();
                    H.setHeight(typeof  B.multiline == "number" ?
                        B.multiline : this.defaultTextHeight);
                    K = H;
                }else {
                    G.show();
                    H.hide();
                }
            }else {
                G.hide();
                H.hide();
            }

            I.setDisplayed(B.progress === true);
            this.updateProgress(0);
            K.dom.value = B.value || "";
            if(B.prompt){
                A.setDefaultButton(K);
            }else {
                var  bs = B.buttons;
                var  db = null;
                if(bs && bs.ok){
                    db = J["ok"];
                }else  if(bs && bs.yes){
                    db = J["yes"];
                }

                A.setDefaultButton(db);
            }

            L = O(B.buttons);
            this.updateText(B.msg);
            if(B.cls){
                d.el.addClass(B.cls);
            }

            d.proxyDrag = B.proxyDrag === true;
            d.modal = B.modal !== false;
            d.mask = B.modal !== false ? C : false;
            if(!d.isVisible()){
                
                document.body.appendChild(A.el.dom);
                d.animateTarget = null;
                d.show(n.animEl);
            }
            return  this;
        },

        

        progress : function(o, p){
            this.show({
                title : o,
                msg : p,
                buttons: false,
                progress:true,
                closable:false,
                minWidth: this.minProgressWidth,
                modal : true
            });
            return  this;
        },

        

        alert : function(q, r, fn, s){
            this.show({
                title : q,
                msg : r,
                buttons: this.OK,
                fn: fn,
                scope : s,
                modal : true
            });
            return  this;
        },

        

        wait : function(t, u){
            this.show({
                title : u,
                msg : t,
                buttons: false,
                closable:false,
                progress:true,
                modal:true,
                width:300,
                wait:true
            });
            D = Roo.TaskMgr.start({
                run: function(i){
                    Roo.MessageBox.updateProgress(((((i+20)%20)+1)*5)*.01);
                },
                interval: 1000
            });
            return  this;
        },

        

        confirm : function(v, x, fn, y){
            this.show({
                title : v,
                msg : x,
                buttons: this.YESNO,
                fn: fn,
                scope : y,
                modal : true
            });
            return  this;
        },

        

        prompt : function(z, AA, fn, AB, AC){
            this.show({
                title : z,
                msg : AA,
                buttons: this.OKCANCEL,
                fn: fn,
                minWidth:250,
                scope : AB,
                prompt:true,
                multiline: AC,
                modal : true
            });
            return  this;
        },

        

        OK : {ok:true},
        

        YESNO : {yes:true, no:true},
        

        OKCANCEL : {ok:true, cancel:true},
        

        YESNOCANCEL : {yes:true, no:true, cancel:true},

        

        defaultTextHeight : 75,
        

        maxWidth : 600,
        

        minWidth : 100,
        

        minProgressWidth : 250,
        

        buttonText : {
            ok : "OK",
            cancel : "Cancel",
            yes : "Yes",
            no : "No"
        }
    };
}();



Roo.Msg = Roo.MessageBox;




Roo.QuickTips = function(){
    var  el, A, B, C, tm, D, E, F = {}, esc, removeCls = null, bdLeft, bdRight;
    var  ce, bd, xy, dd;
    var  G = false, H = true, I = false;
    var  J = 1, K = 1, L = 1, M = [];
    
    var  N = function(e){
        if(H){
            return;
        }
        var  t = e.getTarget();
        if(!t || t.nodeType !== 1 || t == document || t == document.body){
            return;
        }
        if(ce && t == ce.el){
            clearTimeout(K);
            return;
        }
        if(t && F[t.id]){
            F[t.id].el = t;
            J = S.defer(tm.showDelay, tm, [F[t.id]]);
            return;
        }
        var  W, et = Roo.fly(t);
        var  ns = D.namespace;
        if(tm.interceptTitles && t.title){
            W = t.title;
            t.qtip = W;
            t.removeAttribute("title");
            e.preventDefault();
        }else {
            W = t.qtip || et.getAttributeNS(ns, D.attribute);
        }
        if(W){
            J = S.defer(tm.showDelay, tm, [{
                el: t, 
                text: W, 
                width: et.getAttributeNS(ns, D.width),
                autoHide: et.getAttributeNS(ns, D.hide) != "user",
                title: et.getAttributeNS(ns, D.title),
           	    cls: et.getAttributeNS(ns, D.cls)
            }]);
        }
    };
    
    var  O = function(e){
        clearTimeout(J);
        var  t = e.getTarget();
        if(t && ce && ce.el == t && (tm.autoHide && ce.autoHide !== false)){
            K = setTimeout(U, tm.hideDelay);
        }
    };
    
    var  P = function(e){
        if(H){
            return;
        }

        xy = e.getXY();
        xy[1] += 18;
        if(tm.trackMouse && ce){
            el.setXY(xy);
        }
    };
    
    var  Q = function(e){
        clearTimeout(J);
        clearTimeout(K);
        if(!e.within(el)){
            if(tm.hideOnClick){
                U();
                tm.disable();
                tm.enable.defer(100, tm);
            }
        }
    };
    
    var  R = function(){
        return  2;
    };

    var  S = function(o){
        if(H){
            return;
        }

        clearTimeout(L);
        ce = o;
        if(removeCls){ 
            el.removeClass(removeCls);
            removeCls = null;
        }
        if(ce.cls){
            el.addClass(ce.cls);
            removeCls = ce.cls;
        }
        if(ce.title){
            C.update(ce.title);
            C.show();
        }else {
            C.update('');
            C.hide();
        }

        el.dom.style.width  = tm.maxWidth+'px';
        
        B.update(o.text);
        var  p = R(), w = ce.width;
        if(!w){
            var  td = B.dom;
            var  aw = Math.max(td.offsetWidth, td.clientWidth, td.scrollWidth);
            if(aw > tm.maxWidth){
                w = tm.maxWidth;
            }else  if(aw < tm.minWidth){
                w = tm.minWidth;
            }else {
                w = aw;
            }
        }

        
        el.setWidth(parseInt(w, 10) + p);
        if(ce.autoHide === false){
            E.setDisplayed(true);
            if(dd){
                dd.unlock();
            }
        }else {
            E.setDisplayed(false);
            if(dd){
                dd.lock();
            }
        }
        if(xy){
            el.avoidY = xy[1]-18;
            el.setXY(xy);
        }
        if(tm.animate){
            el.setOpacity(.1);
            el.setStyle("visibility", "visible");
            el.fadeIn({callback: T});
        }else {
            T();
        }
    };
    
    var  T = function(){
        if(ce){
            el.show();
            esc.enable();
            if(tm.autoDismiss && ce.autoHide !== false){
                L = setTimeout(U, tm.autoDismissDelay);
            }
        }
    };
    
    var  U = function(W){
        clearTimeout(L);
        clearTimeout(K);
        ce = null;
        if(el.isVisible()){
            esc.disable();
            if(W !== true && tm.animate){
                el.fadeOut({callback: V});
            }else {
                V();
            } 
        }
    };
    
    var  V = function(){
        el.hide();
        if(removeCls){
            el.removeClass(removeCls);
            removeCls = null;
        }
    };
    
    return  {
        

       minWidth : 40,
        

       maxWidth : 300,
        

       interceptTitles : false,
        

       trackMouse : false,
        

       hideOnClick : true,
        

       showDelay : 500,
        

       hideDelay : 200,
        

       autoHide : true,
        

       autoDismiss : true,
        

       autoDismissDelay : 5000,
       

       animate : false,

       

        title: '',
       

        text : '',
       

        cls : '',
       

        width : null,

    

       init : function(){
          tm = Roo.QuickTips;
          D = tm.tagConfig;
          if(!I){
              if(!Roo.isReady){ 
                  Roo.onReady(Roo.QuickTips.init, Roo.QuickTips);
                  return;
              }

              el = new  Roo.Layer({cls:"x-tip", shadow:"drop", shim: true, constrain:true, shadowOffset:4});
              el.fxDefaults = {stopFx: true};
              
              
              el.update('<div class="x-tip-bd"><div class="x-tip-close"></div><h3></h3><div class="x-tip-bd-inner"></div><div class="x-clear"></div></div>');              
              C = el.child('h3');
              C.enableDisplayMode("block");
              A = el.child('div.x-tip-bd');
              B = el.child('div.x-tip-bd-inner');
              
              
              E = el.child('div.x-tip-close');
              E.enableDisplayMode("block");
              E.on("click", U);
              var  d = Roo.get(document);
              d.on("mousedown", Q);
              d.on("mouseover", N);
              d.on("mouseout", O);
              d.on("mousemove", P);
              esc = d.addKeyListener(27, U);
              esc.disable();
              if(Roo.dd.DD){
                  dd = el.initDD("default", null, {
                      onDrag : function(){
                          el.sync();  
                      }
                  });
                  dd.setHandleElId(C.id);
                  dd.lock();
              }

              I = true;
          }

          this.enable(); 
       },

    

       register : function(X){
           var  cs = X  instanceof  Array ? X : arguments;
           for(var  i = 0, len = cs.length; i < len; i++) {
               var  c = cs[i];
               var  target = c.target;
               if(target){
                   if(target  instanceof  Array){
                       for(var  j = 0, jlen = target.length; j < jlen; j++){
                           F[target[j]] = c;
                       }
                   }else {
                       F[typeof  target == 'string' ? target : Roo.id(target)] = c;
                   }
               }
           }
       },

    

       unregister : function(el){
           delete  F[Roo.id(el)];
       },

    

       enable : function(){
           if(I && H){
               M.pop();
               if(M.length < 1){
                   H = false;
               }
           }
       },

    

       disable : function(){
          H = true;
          clearTimeout(J);
          clearTimeout(K);
          clearTimeout(L);
          if(ce){
              U(true);
          }

          M.push(1);
       },

    

       isEnabled : function(){
            return  !H;
       },

        
       tagConfig : {
           namespace : "ext",
           attribute : "qtip",
           width : "width",
           target : "target",
           title : "qtitle",
           hide : "hide",
           cls : "qclass"
       }
   };
}();


Roo.QuickTips.tips = Roo.QuickTips.register;


 



Roo.tree.TreePanel = function(el, A){
    var  B = false;
    var  C = false;
    if (A.root) {
        B = A.root;
        delete  A.root;
    }
    if (A.loader) {
        C = A.loader;
        delete  A.loader;
    }

    
    Roo.apply(this, A);
    Roo.tree.TreePanel.superclass.constructor.call(this);
    this.el = Roo.get(el);
    this.el.addClass('x-tree');
    
    if (B) {
        this.setRootNode( Roo.factory(B, Roo.tree));
    }
    if (C) {
        this.loader = Roo.factory(C, Roo.tree);
    }

   

   this.id = this.el.id;
   this.addEvents({
        

        "beforeload" : true,
        

        "load" : true,
        

        "textchange" : true,
        

        "beforeexpand" : true,
        

        "beforecollapse" : true,
        

        "expand" : true,
        

        "disabledchange" : true,
        

        "collapse" : true,
        

        "beforeclick":true,
        

        "checkchange":true,
        

        "click":true,
        

        "dblclick":true,
        

        "contextmenu":true,
        

        "beforechildrenrendered":true,
       
 
	    "startdrag" : true,
	    

	    "enddrag" : true,
	    

	    "dragdrop" : true,
	    

	    "beforenodedrop" : true,
	    

	    "nodedrop" : true,
	     

	    "nodedragover" : true
        
   });
   if(this.singleExpand){
       this.on("beforeexpand", this.restrictExpand, this);
   }
};
Roo.extend(Roo.tree.TreePanel, Roo.data.Tree, {
    rootVisible : true,
    animate: Roo.enableFx,
    lines : true,
    enableDD : false,
    hlDrop : Roo.enableFx,
  
    renderer: false,
    
    rendererTip: false,
    
    restrictExpand : function(D){
        var  p = D.parentNode;
        if(p){
            if(p.expandedChild && p.expandedChild.parentNode == p){
                p.expandedChild.collapse();
            }

            p.expandedChild = D;
        }
    },

    
    setRootNode : function(E){
        Roo.tree.TreePanel.superclass.setRootNode.call(this, E);
        if(!this.rootVisible){
            E.ui = new  Roo.tree.RootTreeNodeUI(E);
        }
        return  E;
    },

    

    getEl : function(){
        return  this.el;
    },

    

    getLoader : function(){
        return  this.loader;
    },

    

    expandAll : function(){
        this.root.expand(true);
    },

    

    collapseAll : function(){
        this.root.collapse(true);
    },

    

    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new  Roo.tree.DefaultSelectionModel();
        }
        return  this.selModel;
    },

    

    getChecked : function(a, F){
        F = F || this.root;
        var  r = [];
        var  f = function(){
            if(this.attributes.checked){
                r.push(!a ? this : (a == 'id' ? this.id : this.attributes[a]));
            }
        }

        F.cascade(f);
        return  r;
    },

    

    expandPath : function(G, H, I){
        H = H || "id";
        var  J = G.split(this.pathSeparator);
        var  K = this.root;
        if(K.attributes[H] != J[1]){ 
            if(I){
                I(false, null);
            }
            return;
        }
        var  L = 1;
        var  f = function(){
            if(++L == J.length){
                if(I){
                    I(true, K);
                }
                return;
            }
            var  c = K.findChild(H, J[L]);
            if(!c){
                if(I){
                    I(false, K);
                }
                return;
            }

            K = c;
            c.expand(false, false, f);
        };
        K.expand(false, false, f);
    },

    

    selectPath : function(M, N, O){
        N = N || "id";
        var  P = M.split(this.pathSeparator);
        var  v = P.pop();
        if(P.length > 0){
            var  f = function(Q, R){
                if(Q && R){
                    var  n = R.findChild(N, v);
                    if(n){
                        n.select();
                        if(O){
                            O(true, n);
                        }
                    }else  if(O){
                        O(false, n);
                    }
                }else {
                    if(O){
                        O(false, n);
                    }
                }
            };
            this.expandPath(P.join(this.pathSeparator), N, f);
        }else {
            this.root.select();
            if(O){
                O(true, this.root);
            }
        }
    },

    getTreeEl : function(){
        return  this.el;
    },

    

    render : function(){
        if (this.innerCt) {
            return  this; 
        }

        
        this.innerCt = this.el.createChild({tag:"ul",
               cls:"x-tree-root-ct " +
               (this.lines ? "x-tree-lines" : "x-tree-no-lines")});

        if(this.containerScroll){
            Roo.dd.ScrollManager.register(this.el);
        }
        if((this.enableDD || this.enableDrop) && !this.dropZone){
           

             this.dropZone = new  Roo.tree.TreeDropZone(this, this.dropConfig || {
               ddGroup: this.ddGroup || "TreeDD", appendOnly: this.ddAppendOnly === true
           });
        }
        if((this.enableDD || this.enableDrag) && !this.dragZone){
           

            this.dragZone = new  Roo.tree.TreeDragZone(this, this.dragConfig || {
               ddGroup: this.ddGroup || "TreeDD",
               scroll: this.ddScroll
           });
        }

        this.getSelectionModel().init(this);
        if (!this.root) {
            console.log("ROOT not set in tree");
            return;
        }

        this.root.render();
        if(!this.rootVisible){
            this.root.renderChildren();
        }
        return  this;
    }
});


 



Roo.tree.DefaultSelectionModel = function(){
   this.selNode = null;
   
   this.addEvents({
       

       "selectionchange" : true,

       

       "beforeselect" : true
   });
};

Roo.extend(Roo.tree.DefaultSelectionModel, Roo.util.Observable, {
    init : function(A){
        this.tree = A;
        A.getTreeEl().on("keydown", this.onKeyDown, this);
        A.on("click", this.onNodeClick, this);
    },
    
    onNodeClick : function(B, e){
        if (e.ctrlKey && this.selNode == B)  {
            this.unselect(B);
            return;
        }

        this.select(B);
    },
    
    

    select : function(C){
        var  D = this.selNode;
        if(D != C && this.fireEvent('beforeselect', this, C, D) !== false){
            if(D){
                D.ui.onSelectedChange(false);
            }

            this.selNode = C;
            C.ui.onSelectedChange(true);
            this.fireEvent("selectionchange", this, C, D);
        }
        return  C;
    },
    
    

    unselect : function(E){
        if(this.selNode == E){
            this.clearSelections();
        }    
    },
    
    

    clearSelections : function(){
        var  n = this.selNode;
        if(n){
            n.ui.onSelectedChange(false);
            this.selNode = null;
            this.fireEvent("selectionchange", this, null);
        }
        return  n;
    },
    
    

    getSelectedNode : function(){
        return  this.selNode;    
    },
    
    

    isSelected : function(F){
        return  this.selNode == F;  
    },

    

    selectPrevious : function(){
        var  s = this.selNode || this.lastSelNode;
        if(!s){
            return  null;
        }
        var  ps = s.previousSibling;
        if(ps){
            if(!ps.isExpanded() || ps.childNodes.length < 1){
                return  this.select(ps);
            } else {
                var  lc = ps.lastChild;
                while(lc && lc.isExpanded() && lc.childNodes.length > 0){
                    lc = lc.lastChild;
                }
                return  this.select(lc);
            }
        } else  if(s.parentNode && (this.tree.rootVisible || !s.parentNode.isRoot)){
            return  this.select(s.parentNode);
        }
        return  null;
    },

    

    selectNext : function(){
        var  s = this.selNode || this.lastSelNode;
        if(!s){
            return  null;
        }
        if(s.firstChild && s.isExpanded()){
             return  this.select(s.firstChild);
         }else  if(s.nextSibling){
             return  this.select(s.nextSibling);
         }else  if(s.parentNode){
            var  newS = null;
            s.parentNode.bubble(function(){
                if(this.nextSibling){
                    newS = this.getOwnerTree().selModel.select(this.nextSibling);
                    return  false;
                }
            });
            return  newS;
         }
        return  null;
    },

    onKeyDown : function(e){
        var  s = this.selNode || this.lastSelNode;
        
        var  sm = this;
        if(!s){
            return;
        }
        var  k = e.getKey();
        switch(k){
             case  e.DOWN:
                 e.stopEvent();
                 this.selectNext();
             break;
             case  e.UP:
                 e.stopEvent();
                 this.selectPrevious();
             break;
             case  e.RIGHT:
                 e.preventDefault();
                 if(s.hasChildNodes()){
                     if(!s.isExpanded()){
                         s.expand();
                     }else  if(s.firstChild){
                         this.select(s.firstChild, e);
                     }
                 }
             break;
             case  e.LEFT:
                 e.preventDefault();
                 if(s.hasChildNodes() && s.isExpanded()){
                     s.collapse();
                 }else  if(s.parentNode && (this.tree.rootVisible || s.parentNode != this.tree.getRootNode())){
                     this.select(s.parentNode, e);
                 }
             break;
        };
    }
});



Roo.tree.MultiSelectionModel = function(){
   this.selNodes = [];
   this.selMap = {};
   this.addEvents({
       

       "selectionchange" : true
   });
};

Roo.extend(Roo.tree.MultiSelectionModel, Roo.util.Observable, {
    init : function(G){
        this.tree = G;
        G.getTreeEl().on("keydown", this.onKeyDown, this);
        G.on("click", this.onNodeClick, this);
    },
    
    onNodeClick : function(H, e){
        this.select(H, e, e.ctrlKey);
    },
    
    

    select : function(I, e, J){
        if(J !== true){
            this.clearSelections(true);
        }
        if(this.isSelected(I)){
            this.lastSelNode = I;
            return  I;
        }

        this.selNodes.push(I);
        this.selMap[I.id] = I;
        this.lastSelNode = I;
        I.ui.onSelectedChange(true);
        this.fireEvent("selectionchange", this, this.selNodes);
        return  I;
    },
    
    

    unselect : function(K){
        if(this.selMap[K.id]){
            K.ui.onSelectedChange(false);
            var  sn = this.selNodes;
            var  index = -1;
            if(sn.indexOf){
                index = sn.indexOf(K);
            }else {
                for(var  i = 0, len = sn.length; i < len; i++){
                    if(sn[i] == K){
                        index = i;
                        break;
                    }
                }
            }
            if(index != -1){
                this.selNodes.splice(index, 1);
            }
            delete  this.selMap[K.id];
            this.fireEvent("selectionchange", this, this.selNodes);
        }
    },
    
    

    clearSelections : function(L){
        var  sn = this.selNodes;
        if(sn.length > 0){
            for(var  i = 0, len = sn.length; i < len; i++){
                sn[i].ui.onSelectedChange(false);
            }

            this.selNodes = [];
            this.selMap = {};
            if(L !== true){
                this.fireEvent("selectionchange", this, this.selNodes);
            }
        }
    },
    
    

    isSelected : function(M){
        return  this.selMap[M.id] ? true : false;  
    },
    
    

    getSelectedNodes : function(){
        return  this.selNodes;    
    },

    onKeyDown : Roo.tree.DefaultSelectionModel.prototype.onKeyDown,

    selectNext : Roo.tree.DefaultSelectionModel.prototype.selectNext,

    selectPrevious : Roo.tree.DefaultSelectionModel.prototype.selectPrevious
});


 


Roo.tree.TreeNode = function(A){
    A = A || {};
    if(typeof  A == "string"){
        A = {text: A};
    }

    this.childrenRendered = false;
    this.rendered = false;
    Roo.tree.TreeNode.superclass.constructor.call(this, A);
    this.expanded = A.expanded === true;
    this.isTarget = A.isTarget !== false;
    this.draggable = A.draggable !== false && A.allowDrag !== false;
    this.allowChildren = A.allowChildren !== false && A.allowDrop !== false;

    

    this.text = A.text;
    

    this.disabled = A.disabled === true;

    this.addEvents({
        

        "textchange" : true,
        

        "beforeexpand" : true,
        

        "beforecollapse" : true,
        

        "expand" : true,
        

        "disabledchange" : true,
        

        "collapse" : true,
        

        "beforeclick":true,
        

        "checkchange":true,
        

        "click":true,
        

        "dblclick":true,
        

        "contextmenu":true,
        

        "beforechildrenrendered":true
    });

    var  B = this.attributes.uiProvider || Roo.tree.TreeNodeUI;

    

    this.ui = new  B(this);
};
Roo.extend(Roo.tree.TreeNode, Roo.data.Node, {
    preventHScroll: true,
    

    isExpanded : function(){
        return  this.expanded;
    },

    

    getUI : function(){
        return  this.ui;
    },

    
    setFirstChild : function(C){
        var  of = this.firstChild;
        Roo.tree.TreeNode.superclass.setFirstChild.call(this, C);
        if(this.childrenRendered && of && C != of){
            of.renderIndent(true, true);
        }
        if(this.rendered){
            this.renderIndent(true, true);
        }
    },

    
    setLastChild : function(D){
        var  ol = this.lastChild;
        Roo.tree.TreeNode.superclass.setLastChild.call(this, D);
        if(this.childrenRendered && ol && D != ol){
            ol.renderIndent(true, true);
        }
        if(this.rendered){
            this.renderIndent(true, true);
        }
    },

    
    
    appendChild : function(){
        var  E = Roo.tree.TreeNode.superclass.appendChild.apply(this, arguments);
        if(E && this.childrenRendered){
            E.render();
        }

        this.ui.updateExpandIcon();
        return  E;
    },

    
    removeChild : function(F){
        this.ownerTree.getSelectionModel().unselect(F);
        Roo.tree.TreeNode.superclass.removeChild.apply(this, arguments);
        
        if(this.childrenRendered){
            F.ui.remove();
        }
        if(this.childNodes.length < 1){
            this.collapse(false, false);
        }else {
            this.ui.updateExpandIcon();
        }
        if(!this.firstChild) {
            this.childrenRendered = false;
        }
        return  F;
    },

    
    insertBefore : function(G, H){
        var  I = Roo.tree.TreeNode.superclass.insertBefore.apply(this, arguments);
        if(I && H && this.childrenRendered){
            G.render();
        }

        this.ui.updateExpandIcon();
        return  I;
    },

    

    setText : function(J){
        var  K = this.text;
        this.text = J;
        this.attributes.text = J;
        if(this.rendered){ 
            this.ui.onTextChange(this, J, K);
        }

        this.fireEvent("textchange", this, J, K);
    },

    

    select : function(){
        this.getOwnerTree().getSelectionModel().select(this);
    },

    

    unselect : function(){
        this.getOwnerTree().getSelectionModel().unselect(this);
    },

    

    isSelected : function(){
        return  this.getOwnerTree().getSelectionModel().isSelected(this);
    },

    

    expand : function(L, M, N){
        if(!this.expanded){
            if(this.fireEvent("beforeexpand", this, L, M) === false){
                return;
            }
            if(!this.childrenRendered){
                this.renderChildren();
            }

            this.expanded = true;
            if(!this.isHiddenRoot() && (this.getOwnerTree().animate && M !== false) || M){
                this.ui.animExpand(function(){
                    this.fireEvent("expand", this);
                    if(typeof  N == "function"){
                        N(this);
                    }
                    if(L === true){
                        this.expandChildNodes(true);
                    }
                }.createDelegate(this));
                return;
            }else {
                this.ui.expand();
                this.fireEvent("expand", this);
                if(typeof  N == "function"){
                    N(this);
                }
            }
        }else {
           if(typeof  N == "function"){
               N(this);
           }
        }
        if(L === true){
            this.expandChildNodes(true);
        }
    },

    isHiddenRoot : function(){
        return  this.isRoot && !this.getOwnerTree().rootVisible;
    },

    

    collapse : function(O, P){
        if(this.expanded && !this.isHiddenRoot()){
            if(this.fireEvent("beforecollapse", this, O, P) === false){
                return;
            }

            this.expanded = false;
            if((this.getOwnerTree().animate && P !== false) || P){
                this.ui.animCollapse(function(){
                    this.fireEvent("collapse", this);
                    if(O === true){
                        this.collapseChildNodes(true);
                    }
                }.createDelegate(this));
                return;
            }else {
                this.ui.collapse();
                this.fireEvent("collapse", this);
            }
        }
        if(O === true){
            var  cs = this.childNodes;
            for(var  i = 0, len = cs.length; i < len; i++) {
            	cs[i].collapse(true, false);
            }
        }
    },

    
    delayedExpand : function(Q){
        if(!this.expandProcId){
            this.expandProcId = this.expand.defer(Q, this);
        }
    },

    
    cancelExpand : function(){
        if(this.expandProcId){
            clearTimeout(this.expandProcId);
        }

        this.expandProcId = false;
    },

    

    toggle : function(){
        if(this.expanded){
            this.collapse();
        }else {
            this.expand();
        }
    },

    

    ensureVisible : function(R){
        var  S = this.getOwnerTree();
        S.expandPath(this.parentNode.getPath(), false, function(){
            S.getTreeEl().scrollChildIntoView(this.ui.anchor);
            Roo.callback(R);
        }.createDelegate(this));
    },

    

    expandChildNodes : function(T){
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++) {
        	cs[i].expand(T);
        }
    },

    

    collapseChildNodes : function(U){
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++) {
        	cs[i].collapse(U);
        }
    },

    

    disable : function(){
        this.disabled = true;
        this.unselect();
        if(this.rendered && this.ui.onDisableChange){ 
            this.ui.onDisableChange(this, true);
        }

        this.fireEvent("disabledchange", this, true);
    },

    

    enable : function(){
        this.disabled = false;
        if(this.rendered && this.ui.onDisableChange){ 
            this.ui.onDisableChange(this, false);
        }

        this.fireEvent("disabledchange", this, false);
    },

    
    renderChildren : function(V){
        if(V !== false){
            this.fireEvent("beforechildrenrendered", this);
        }
        var  cs = this.childNodes;
        for(var  i = 0, len = cs.length; i < len; i++){
            cs[i].render(true);
        }

        this.childrenRendered = true;
    },

    
    sort : function(fn, W){
        Roo.tree.TreeNode.superclass.sort.apply(this, arguments);
        if(this.childrenRendered){
            var  cs = this.childNodes;
            for(var  i = 0, len = cs.length; i < len; i++){
                cs[i].render(true);
            }
        }
    },

    
    render : function(X){
        this.ui.render(X);
        if(!this.rendered){
            this.rendered = true;
            if(this.expanded){
                this.expanded = false;
                this.expand(false, false);
            }
        }
    },

    
    renderIndent : function(Y, Z){
        if(Z){
            this.ui.childIndent = null;
        }

        this.ui.renderIndent();
        if(Y === true && this.childrenRendered){
            var  cs = this.childNodes;
            for(var  i = 0, len = cs.length; i < len; i++){
                cs[i].renderIndent(true, Z);
            }
        }
    }
});


 


 Roo.tree.AsyncTreeNode = function(A){
    this.loaded = false;
    this.loading = false;
    Roo.tree.AsyncTreeNode.superclass.constructor.apply(this, arguments);
    

    this.addEvents({'beforeload':true, 'load': true});
    

    

};
Roo.extend(Roo.tree.AsyncTreeNode, Roo.tree.TreeNode, {
    expand : function(B, C, D){
        if(this.loading){ 
            var  timer;
            var  f = function(){
                if(!this.loading){ 
                    clearInterval(timer);
                    this.expand(B, C, D);
                }
            }.createDelegate(this);
            timer = setInterval(f, 200);
            return;
        }
        if(!this.loaded){
            if(this.fireEvent("beforeload", this) === false){
                return;
            }

            this.loading = true;
            this.ui.beforeLoad(this);
            var  loader = this.loader || this.attributes.loader || this.getOwnerTree().getLoader();
            if(loader){
                loader.load(this, this.loadComplete.createDelegate(this, [B, C, D]));
                return;
            }
        }

        Roo.tree.AsyncTreeNode.superclass.expand.call(this, B, C, D);
    },
    
    

    isLoading : function(){
        return  this.loading;  
    },
    
    loadComplete : function(E, F, G){
        this.loading = false;
        this.loaded = true;
        this.ui.afterLoad(this);
        this.fireEvent("load", this);
        this.expand(E, F, G);
    },
    
    

    isLoaded : function(){
        return  this.loaded;
    },
    
    hasChildNodes : function(){
        if(!this.isLeaf() && !this.loaded){
            return  true;
        }else {
            return  Roo.tree.AsyncTreeNode.superclass.hasChildNodes.call(this);
        }
    },

    

    reload : function(H){
        this.collapse(false, false);
        while(this.firstChild){
            this.removeChild(this.firstChild);
        }

        this.childrenRendered = false;
        this.loaded = false;
        if(this.isHiddenRoot()){
            this.expanded = false;
        }

        this.expand(false, false, H);
    }
});


 


Roo.tree.TreeNodeUI = function(A){
    this.node = A;
    this.rendered = false;
    this.animating = false;
    this.emptyIcon = Roo.BLANK_IMAGE_URL;
};

Roo.tree.TreeNodeUI.prototype = {
    removeChild : function(B){
        if(this.rendered){
            this.ctNode.removeChild(B.ui.getEl());
        }
    },

    beforeLoad : function(){
         this.addClass("x-tree-node-loading");
    },

    afterLoad : function(){
         this.removeClass("x-tree-node-loading");
    },

    onTextChange : function(C, D, E){
        if(this.rendered){
            this.textNode.innerHTML = D;
        }
    },

    onDisableChange : function(F, G){
        this.disabled = G;
        if(G){
            this.addClass("x-tree-node-disabled");
        }else {
            this.removeClass("x-tree-node-disabled");
        }
    },

    onSelectedChange : function(H){
        if(H){
            this.focus();
            this.addClass("x-tree-selected");
        }else {
            
            this.removeClass("x-tree-selected");
        }
    },

    onMove : function(I, J, K, L, M, N){
        this.childIndent = null;
        if(this.rendered){
            var  targetNode = L.ui.getContainer();
            if(!targetNode){
                this.holder = document.createElement("div");
                this.holder.appendChild(this.wrap);
                return;
            }
            var  insertBefore = N ? N.ui.getEl() : null;
            if(insertBefore){
                targetNode.insertBefore(this.wrap, insertBefore);
            }else {
                targetNode.appendChild(this.wrap);
            }

            this.node.renderIndent(true);
        }
    },

    addClass : function(O){
        if(this.elNode){
            Roo.fly(this.elNode).addClass(O);
        }
    },

    removeClass : function(P){
        if(this.elNode){
            Roo.fly(this.elNode).removeClass(P);
        }
    },

    remove : function(){
        if(this.rendered){
            this.holder = document.createElement("div");
            this.holder.appendChild(this.wrap);
        }
    },

    fireEvent : function(){
        return  this.node.fireEvent.apply(this.node, arguments);
    },

    initEvents : function(){
        this.node.on("move", this.onMove, this);
        var  E = Roo.EventManager;
        var  a = this.anchor;

        var  el = Roo.fly(a, '_treeui');

        if(Roo.isOpera){ 
            el.setStyle("text-decoration", "none");
        }


        el.on("click", this.onClick, this);
        el.on("dblclick", this.onDblClick, this);

        if(this.checkbox){
            Roo.EventManager.on(this.checkbox,
                    Roo.isIE ? 'click' : 'change', this.onCheckChange, this);
        }


        el.on("contextmenu", this.onContextMenu, this);

        var  Q = Roo.fly(this.iconNode);
        Q.on("click", this.onClick, this);
        Q.on("dblclick", this.onDblClick, this);
        Q.on("contextmenu", this.onContextMenu, this);
        E.on(this.ecNode, "click", this.ecClick, this, true);

        if(this.node.disabled){
            this.addClass("x-tree-node-disabled");
        }
        if(this.node.hidden){
            this.addClass("x-tree-node-disabled");
        }
        var  ot = this.node.getOwnerTree();
        var  dd = ot.enableDD || ot.enableDrag || ot.enableDrop;
        if(dd && (!this.node.isRoot || ot.rootVisible)){
            Roo.dd.Registry.register(this.elNode, {
                node: this.node,
                handles: this.getDDHandles(),
                isHandle: false
            });
        }
    },

    getDDHandles : function(){
        return  [this.iconNode, this.textNode];
    },

    hide : function(){
        if(this.rendered){
            this.wrap.style.display = "none";
        }
    },

    show : function(){
        if(this.rendered){
            this.wrap.style.display = "";
        }
    },

    onContextMenu : function(e){
        if (this.node.hasListener("contextmenu") || this.node.getOwnerTree().hasListener("contextmenu")) {
            e.preventDefault();
            this.focus();
            this.fireEvent("contextmenu", this.node, e);
        }
    },

    onClick : function(e){
        if(this.dropping){
            e.stopEvent();
            return;
        }
        if(this.fireEvent("beforeclick", this.node, e) !== false){
            if(!this.disabled && this.node.attributes.href){
                this.fireEvent("click", this.node, e);
                return;
            }

            e.preventDefault();
            if(this.disabled){
                return;
            }

            if(this.node.attributes.singleClickExpand && !this.animating && this.node.hasChildNodes()){
                this.node.toggle();
            }


            this.fireEvent("click", this.node, e);
        }else {
            e.stopEvent();
        }
    },

    onDblClick : function(e){
        e.preventDefault();
        if(this.disabled){
            return;
        }
        if(this.checkbox){
            this.toggleCheck();
        }
        if(!this.animating && this.node.hasChildNodes()){
            this.node.toggle();
        }

        this.fireEvent("dblclick", this.node, e);
    },

    onCheckChange : function(){
        var  R = this.checkbox.checked;
        this.node.attributes.checked = R;
        this.fireEvent('checkchange', this.node, R);
    },

    ecClick : function(e){
        if(!this.animating && this.node.hasChildNodes()){
            this.node.toggle();
        }
    },

    startDrop : function(){
        this.dropping = true;
    },

    
    endDrop : function(){
       setTimeout(function(){
           this.dropping = false;
       }.createDelegate(this), 50);
    },

    expand : function(){
        this.updateExpandIcon();
        this.ctNode.style.display = "";
    },

    focus : function(){
        if(!this.node.preventHScroll){
            try{this.anchor.focus();
            }catch(e){}
        }else  if(!Roo.isIE){
            try{
                var  noscroll = this.node.getOwnerTree().getTreeEl().dom;
                var  l = noscroll.scrollLeft;
                this.anchor.focus();
                noscroll.scrollLeft = l;
            }catch(e){}
        }
    },

    toggleCheck : function(S){
        var  cb = this.checkbox;
        if(cb){
            cb.checked = (S === undefined ? !cb.checked : S);
        }
    },

    blur : function(){
        try{
            this.anchor.blur();
        }catch(e){}
    },

    animExpand : function(T){
        var  ct = Roo.get(this.ctNode);
        ct.stopFx();
        if(!this.node.hasChildNodes()){
            this.updateExpandIcon();
            this.ctNode.style.display = "";
            Roo.callback(T);
            return;
        }

        this.animating = true;
        this.updateExpandIcon();

        ct.slideIn('t', {
           callback : function(){
               this.animating = false;
               Roo.callback(T);
            },
            scope: this,
            duration: this.node.ownerTree.duration || .25
        });
    },

    highlight : function(){
        var  U = this.node.getOwnerTree();
        Roo.fly(this.wrap).highlight(
            U.hlColor || "C3DAF9",
            {endColor: U.hlBaseColor}
        );
    },

    collapse : function(){
        this.updateExpandIcon();
        this.ctNode.style.display = "none";
    },

    animCollapse : function(V){
        var  ct = Roo.get(this.ctNode);
        ct.enableDisplayMode('block');
        ct.stopFx();

        this.animating = true;
        this.updateExpandIcon();

        ct.slideOut('t', {
            callback : function(){
               this.animating = false;
               Roo.callback(V);
            },
            scope: this,
            duration: this.node.ownerTree.duration || .25
        });
    },

    getContainer : function(){
        return  this.ctNode;
    },

    getEl : function(){
        return  this.wrap;
    },

    appendDDGhost : function(W){
        W.appendChild(this.elNode.cloneNode(true));
    },

    getDDRepairXY : function(){
        return  Roo.lib.Dom.getXY(this.iconNode);
    },

    onRender : function(){
        this.render();
    },

    render : function(X){
        var  n = this.node, a = n.attributes;
        var  Y = n.parentNode ?
              n.parentNode.ui.getContainer() : n.ownerTree.innerCt.dom;

        if(!this.rendered){
            this.rendered = true;

            this.renderElements(n, a, Y, X);

            if(a.qtip){
               if(this.textNode.setAttributeNS){
                   this.textNode.setAttributeNS("ext", "qtip", a.qtip);
                   if(a.qtipTitle){
                       this.textNode.setAttributeNS("ext", "qtitle", a.qtipTitle);
                   }
               }else {
                   this.textNode.setAttribute("ext:qtip", a.qtip);
                   if(a.qtipTitle){
                       this.textNode.setAttribute("ext:qtitle", a.qtipTitle);
                   }
               }
            }else  if(a.qtipCfg){
                a.qtipCfg.target = Roo.id(this.textNode);
                Roo.QuickTips.register(a.qtipCfg);
            }

            this.initEvents();
            if(!this.node.expanded){
                this.updateExpandIcon();
            }
        }else {
            if(X === true) {
                Y.appendChild(this.wrap);
            }
        }
    },

    renderElements : function(n, a, Z, b){
        
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
        var  t = n.getOwnerTree();
        var  c = t.renderer ? t.renderer(n.attributes) : Roo.util.Format.htmlEncode(n.text);
        var  d = t.rendererTip ? t.rendererTip(n.attributes) : c;
        var  cb = typeof  a.checked == 'boolean';
        var  f = a.href ? a.href : Roo.isGecko ? "" : "#";
        var  g = ['<li class="x-tree-node"><div class="x-tree-node-el ', a.cls,'">',
            '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
            '<img src="', this.emptyIcon, '" class="x-tree-ec-icon" />',
            '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on" />',
            cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : ' />')) : '',
            '<a hidefocus="on" href="',f,'" tabIndex="1" ',
             a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", 
                '><span unselectable="on" qtip="' , d ,'">',c,"</span></a></div>",
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>"];

        if(b !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Roo.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), g.join(""));
        }else {
            this.wrap = Roo.DomHelper.insertHtml("beforeEnd", Z, g.join(""));
        }


        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var  cs = this.elNode.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var  h = 3;
        if(cb){
            this.checkbox = cs[3];
            h++;
        }

        this.anchor = cs[h];
        this.textNode = cs[h].firstChild;
    },

    getAnchor : function(){
        return  this.anchor;
    },

    getTextEl : function(){
        return  this.textNode;
    },

    getIconEl : function(){
        return  this.iconNode;
    },

    isChecked : function(){
        return  this.checkbox ? this.checkbox.checked : false;
    },

    updateExpandIcon : function(){
        if(this.rendered){
            var  n = this.node, c1, c2;
            var  P = n.isLast() ? "x-tree-elbow-end" : "x-tree-elbow";
            var  hasChild = n.hasChildNodes();
            if(hasChild){
                if(n.expanded){
                    P += "-minus";
                    c1 = "x-tree-node-collapsed";
                    c2 = "x-tree-node-expanded";
                }else {
                    P += "-plus";
                    c1 = "x-tree-node-expanded";
                    c2 = "x-tree-node-collapsed";
                }
                if(this.wasLeaf){
                    this.removeClass("x-tree-node-leaf");
                    this.wasLeaf = false;
                }
                if(this.c1 != c1 || this.c2 != c2){
                    Roo.fly(this.elNode).replaceClass(c1, c2);
                    this.c1 = c1; this.c2 = c2;
                }
            }else {
                if(!this.wasLeaf){
                    Roo.fly(this.elNode).replaceClass("x-tree-node-expanded", "x-tree-node-leaf");
                    delete  this.c1;
                    delete  this.c2;
                    this.wasLeaf = true;
                }
            }
            var  ecc = "x-tree-ec-icon "+P;
            if(this.ecc != ecc){
                this.ecNode.className = ecc;
                this.ecc = ecc;
            }
        }
    },

    getChildIndent : function(){
        if(!this.childIndent){
            var  g = [];
            var  p = this.node;
            while(p){
                if(!p.isRoot || (p.isRoot && p.ownerTree.rootVisible)){
                    if(!p.isLast()) {
                        g.unshift('<img src="'+this.emptyIcon+'" class="x-tree-elbow-line" />');
                    } else  {
                        g.unshift('<img src="'+this.emptyIcon+'" class="x-tree-icon" />');
                    }
                }

                p = p.parentNode;
            }

            this.childIndent = g.join("");
        }
        return  this.childIndent;
    },

    renderIndent : function(){
        if(this.rendered){
            var  indent = "";
            var  p = this.node.parentNode;
            if(p){
                indent = p.ui.getChildIndent();
            }
            if(this.indentMarkup != indent){ 
                this.indentNode.innerHTML = indent;
                this.indentMarkup = indent;
            }

            this.updateExpandIcon();
        }
    }
};

Roo.tree.RootTreeNodeUI = function(){
    Roo.tree.RootTreeNodeUI.superclass.constructor.apply(this, arguments);
};
Roo.extend(Roo.tree.RootTreeNodeUI, Roo.tree.TreeNodeUI, {
    render : function(){
        if(!this.rendered){
            var  Z = this.node.ownerTree.innerCt.dom;
            this.node.expanded = true;
            Z.innerHTML = '<div class="x-tree-root-node"></div>';
            this.wrap = this.ctNode = Z.firstChild;
        }
    },
    collapse : function(){
    },
    expand : function(){
    }
});




Roo.tree.TreeLoader = function(A){
    this.baseParams = {};
    this.requestMethod = "POST";
    Roo.apply(this, A);

    this.addEvents({
    
        

        beforeload : true,
        

        load : true,
        

        loadexception : true,
        

        create : true
    });

    Roo.tree.TreeLoader.superclass.constructor.call(this);
};

Roo.extend(Roo.tree.TreeLoader, Roo.util.Observable, {
    

    

    

    

    uiProviders : {},

    

    clearOnLoad : true,

    

    
    root : false,
     

    
    
    queryParam: false,
    
    

    load : function(B, C){
        if(this.clearOnLoad){
            while(B.firstChild){
                B.removeChild(B.firstChild);
            }
        }
        if(B.attributes.children){ 
            var  cs = B.attributes.children;
            for(var  i = 0, len = cs.length; i < len; i++){
                B.appendChild(this.createNode(cs[i]));
            }
            if(typeof  C == "function"){
                C();
            }
        }else  if(this.dataUrl){
            this.requestData(B, C);
        }
    },

    getParams: function(D){
        var  E = [], bp = this.baseParams;
        for(var  key  in  bp){
            if(typeof  bp[key] != "function"){
                E.push(encodeURIComponent(key), "=", encodeURIComponent(bp[key]), "&");
            }
        }
        var  n = this.queryParam === false ? 'node' : this.queryParam;
        E.push(n + "=", encodeURIComponent(D.id));
        return  E.join("");
    },

    requestData : function(F, G){
        if(this.fireEvent("beforeload", this, F, G) !== false){
            this.transId = Roo.Ajax.request({
                method:this.requestMethod,
                url: this.dataUrl||this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {callback: G, node: F},
                params: this.getParams(F)
            });
        }else {
            
            
            if(typeof  G == "function"){
                G();
            }
        }
    },

    isLoading : function(){
        return  this.transId ? true : false;
    },

    abort : function(){
        if(this.isLoading()){
            Roo.Ajax.abort(this.transId);
        }
    },

    
    createNode : function(attr){
        
        if(this.baseAttrs){
            Roo.applyIf(attr, this.baseAttrs);
        }
        if(this.applyLoader !== false){
            attr.loader = this;
        }
        
        
        if(typeof(attr.uiProvider) == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || 
                
 eval(attr.uiProvider);
        }
        if(typeof(this.uiProviders['default']) != 'undefined') {
            attr.uiProvider = this.uiProviders['default'];
        }

        
        this.fireEvent('create', this, attr);
        
        attr.leaf  = typeof(attr.leaf) == 'string' ? attr.leaf * 1 : attr.leaf;
        return (attr.leaf ?
                        new  Roo.tree.TreeNode(attr) :
                        new  Roo.tree.AsyncTreeNode(attr));
    },

    processResponse : function(H, I, J){
        var  K = H.responseText;
        try {
            
            var  o = 
 eval("("+K+")");
            if (this.root !== false) {
                o = o[this.root];
            }
            
            for(var  i = 0, len = o.length; i < len; i++){
                var  n = this.createNode(o[i]);
                if(n){
                    I.appendChild(n);
                }
            }
            if(typeof  J == "function"){
                J(this, I);
            }
        }catch(e){
            this.handleFailure(response);
        }
    },

    handleResponse : function(L){
        this.transId = false;
        var  a = L.argument;
        this.processResponse(L, a.node, a.callback);
        this.fireEvent("load", this, a.node, L);
    },

    handleFailure : function(M){
        this.transId = false;
        var  a = M.argument;
        this.fireEvent("loadexception", this, a.node, M);
        if(typeof  a.callback == "function"){
            a.callback(this, a.node);
        }
    }
});





Roo.tree.TreeFilter = function(A, B){
    this.tree = A;
    this.filtered = {};
    Roo.apply(this, B);
};

Roo.tree.TreeFilter.prototype = {
    clearBlank:false,
    reverse:false,
    autoClear:false,
    remove:false,

     

    filter : function(C, D, E){
        D = D || "text";
        var  f;
        if(typeof  C == "string"){
            var  vlen = C.length;
            
            if(vlen == 0 && this.clearBlank){
                this.clear();
                return;
            }

            C = C.toLowerCase();
            f = function(n){
                return  n.attributes[D].substr(0, vlen).toLowerCase() == C;
            };
        }else  if(C.exec){ 
            f = function(n){
                return  C.test(n.attributes[D]);
            };
        }else {
            throw  'Illegal filter type, must be string or regex';
        }

        this.filterBy(f, null, E);
	},

    

    filterBy : function(fn, F, G){
        G = G || this.tree.root;
        if(this.autoClear){
            this.clear();
        }
        var  af = this.filtered, rv = this.reverse;
        var  f = function(n){
            if(n == G){
                return  true;
            }
            if(af[n.id]){
                return  false;
            }
            var  m = fn.call(F || n, n);
            if(!m || rv){
                af[n.id] = n;
                n.ui.hide();
                return  false;
            }
            return  true;
        };
        G.cascade(f);
        if(this.remove){
           for(var  id  in  af){
               if(typeof  id != "function"){
                   var  n = af[id];
                   if(n && n.parentNode){
                       n.parentNode.removeChild(n);
                   }
               }
           }
        }
    },

    

    clear : function(){
        var  t = this.tree;
        var  af = this.filtered;
        for(var  id  in  af){
            if(typeof  id != "function"){
                var  n = af[id];
                if(n){
                    n.ui.show();
                }
            }
        }

        this.filtered = {};
    }
};



 



Roo.tree.TreeSorter = function(A, B){
    Roo.apply(this, B);
    A.on("beforechildrenrendered", this.doSort, this);
    A.on("append", this.updateSort, this);
    A.on("insert", this.updateSort, this);
    
    var  C = this.dir && this.dir.toLowerCase() == "desc";
    var  p = this.property || "text";
    var  D = this.sortType;
    var  fs = this.folderSort;
    var  cs = this.caseSensitive === true;
    var  E = this.leafAttr || 'leaf';

    this.sortFn = function(n1, n2){
        if(fs){
            if(n1.attributes[E] && !n2.attributes[E]){
                return  1;
            }
            if(!n1.attributes[E] && n2.attributes[E]){
                return  -1;
            }
        }
    	var  v1 = D ? D(n1) : (cs ? n1.attributes[p] : n1.attributes[p].toUpperCase());
    	var  v2 = D ? D(n2) : (cs ? n2.attributes[p] : n2.attributes[p].toUpperCase());
    	if(v1 < v2){
			return  C ? +1 : -1;
		}else  if(v1 > v2){
			return  C ? -1 : +1;
        }else {
	    	return  0;
        }
    };
};

Roo.tree.TreeSorter.prototype = {
    doSort : function(F){
        F.sort(this.sortFn);
    },
    
    compareNodes : function(n1, n2){
        return  (n1.text.toUpperCase() > n2.text.toUpperCase() ? 1 : -1);
    },
    
    updateSort : function(G, H){
        if(H.childrenRendered){
            this.doSort.defer(1, this, [H]);
        }
    }
};



if(Roo.dd.DropZone){
    
Roo.tree.TreeDropZone = function(A, B){
    this.allowParentInsert = false;
    this.allowContainerDrop = false;
    this.appendOnly = false;
    Roo.tree.TreeDropZone.superclass.constructor.call(this, A.innerCt, B);
    this.tree = A;
    this.lastInsertClass = "x-tree-no-status";
    this.dragOverData = {};
};

Roo.extend(Roo.tree.TreeDropZone, Roo.dd.DropZone, {
    ddGroup : "TreeDD",
    
    expandDelay : 1000,
    
    expandNode : function(C){
        if(C.hasChildNodes() && !C.isExpanded()){
            C.expand(false, null, this.triggerCacheRefresh.createDelegate(this));
        }
    },
    
    queueExpand : function(D){
        this.expandProcId = this.expandNode.defer(this.expandDelay, this, [D]);
    },
    
    cancelExpand : function(){
        if(this.expandProcId){
            clearTimeout(this.expandProcId);
            this.expandProcId = false;
        }
    },
    
    isValidDropPoint : function(n, pt, dd, e, E){
        if(!n || !E){ return  false; }
        var  F = n.node;
        var  G = E.node;
        
        if(!(F && F.isTarget && pt)){
            return  false;
        }
        if(pt == "append" && F.allowChildren === false){
            return  false;
        }
        if((pt == "above" || pt == "below") && (F.parentNode && F.parentNode.allowChildren === false)){
            return  false;
        }
        if(G && (F == G || G.contains(F))){
            return  false;
        }
        
        var  H = this.dragOverData;
        H.tree = this.tree;
        H.target = F;
        H.data = E;
        H.point = pt;
        H.source = dd;
        H.rawEvent = e;
        H.dropNode = G;
        H.cancel = false;  
        var  I = this.tree.fireEvent("nodedragover", H);
        return  H.cancel === false && I !== false;
    },
    
    getDropPoint : function(e, n, dd){
        var  tn = n.node;
        if(tn.isRoot){
            return  tn.allowChildren !== false ? "append" : false; 
        }
        var  J = n.ddel;
        var  t = Roo.lib.Dom.getY(J), b = t + J.offsetHeight;
        var  y = Roo.lib.Event.getPageY(e);
        var  K = tn.allowChildren === false || tn.isLeaf();
        if(this.appendOnly || tn.parentNode.allowChildren === false){
            return  K ? false : "append";
        }
        var  L = false;
        if(!this.allowParentInsert){
            L = tn.hasChildNodes() && tn.isExpanded();
        }
        var  q = (b - t) / (K ? 2 : 3);
        if(y >= t && y < (t + q)){
            return  "above";
        }else  if(!L && (K || y >= b-q && y <= b)){
            return  "below";
        }else {
            return  "append";
        }
    },
    
    onNodeEnter : function(n, dd, e, M){
        this.cancelExpand();
    },
    
    onNodeOver : function(n, dd, e, N){
        var  pt = this.getDropPoint(e, n, dd);
        var  O = n.node;
        
        
        if(!this.expandProcId && pt == "append" && O.hasChildNodes() && !n.node.isExpanded()){
            this.queueExpand(O);
        }else  if(pt != "append"){
            this.cancelExpand();
        }
        
        
        var  P = this.dropNotAllowed;
        if(this.isValidDropPoint(n, pt, dd, e, N)){
           if(pt){
               var  el = n.ddel;
               var  cls;
               if(pt == "above"){
                   P = n.node.isFirst() ? "x-tree-drop-ok-above" : "x-tree-drop-ok-between";
                   cls = "x-tree-drag-insert-above";
               }else  if(pt == "below"){
                   P = n.node.isLast() ? "x-tree-drop-ok-below" : "x-tree-drop-ok-between";
                   cls = "x-tree-drag-insert-below";
               }else {
                   P = "x-tree-drop-ok-append";
                   cls = "x-tree-drag-append";
               }
               if(this.lastInsertClass != cls){
                   Roo.fly(el).replaceClass(this.lastInsertClass, cls);
                   this.lastInsertClass = cls;
               }
           }
       }
       return  P;
    },
    
    onNodeOut : function(n, dd, e, Q){
        this.cancelExpand();
        this.removeDropIndicators(n);
    },
    
    onNodeDrop : function(n, dd, e, R){
        var  S = this.getDropPoint(e, n, dd);
        var  T = n.node;
        T.ui.startDrop();
        if(!this.isValidDropPoint(n, S, dd, e, R)){
            T.ui.endDrop();
            return  false;
        }
        
        var  U = R.node || (dd.getTreeNode ? dd.getTreeNode(R, T, S, e) : null);
        var  V = {
            tree : this.tree,
            target: T,
            data: R,
            point: S,
            source: dd,
            rawEvent: e,
            dropNode: U,
            cancel: !U   
        };
        var  W = this.tree.fireEvent("beforenodedrop", V);
        if(W === false || V.cancel === true || !V.dropNode){
            T.ui.endDrop();
            return  false;
        }

        
        T = V.target;
        if(S == "append" && !T.isExpanded()){
            T.expand(false, null, function(){
                this.completeDrop(V);
            }.createDelegate(this));
        }else {
            this.completeDrop(V);
        }
        return  true;
    },
    
    completeDrop : function(de){
        var  ns = de.dropNode, p = de.point, t = de.target;
        if(!(ns  instanceof  Array)){
            ns = [ns];
        }
        var  n;
        for(var  i = 0, len = ns.length; i < len; i++){
            n = ns[i];
            if(p == "above"){
                t.parentNode.insertBefore(n, t);
            }else  if(p == "below"){
                t.parentNode.insertBefore(n, t.nextSibling);
            }else {
                t.appendChild(n);
            }
        }

        n.ui.focus();
        if(this.tree.hlDrop){
            n.ui.highlight();
        }

        t.ui.endDrop();
        this.tree.fireEvent("nodedrop", de);
    },
    
    afterNodeMoved : function(dd, X, e, Y, Z){
        if(this.tree.hlDrop){
            Z.ui.focus();
            Z.ui.highlight();
        }

        this.tree.fireEvent("nodedrop", this.tree, Y, X, dd, e);
    },
    
    getTree : function(){
        return  this.tree;
    },
    
    removeDropIndicators : function(n){
        if(n && n.ddel){
            var  el = n.ddel;
            Roo.fly(el).removeClass([
                    "x-tree-drag-insert-above",
                    "x-tree-drag-insert-below",
                    "x-tree-drag-append"]);
            this.lastInsertClass = "_noclass";
        }
    },
    
    beforeDragDrop : function(a, e, id){
        this.cancelExpand();
        return  true;
    },
    
    afterRepair : function(c){
        if(c && Roo.enableFx){
            c.node.ui.highlight();
        }

        this.hideProxy();
    }    
});

}


 

if(Roo.dd.DragZone){
Roo.tree.TreeDragZone = function(A, B){
    Roo.tree.TreeDragZone.superclass.constructor.call(this, A.getTreeEl(), B);
    this.tree = A;
};

Roo.extend(Roo.tree.TreeDragZone, Roo.dd.DragZone, {
    ddGroup : "TreeDD",
    
    onBeforeDrag : function(C, e){
        var  n = C.node;
        return  n && n.draggable && !n.disabled;
    },
    
    onInitDrag : function(e){
        var  D = this.dragData;
        this.tree.getSelectionModel().select(D.node);
        this.proxy.update("");
        D.node.ui.appendDDGhost(this.proxy.ghost.dom);
        this.tree.fireEvent("startdrag", this.tree, D.node, e);
    },
    
    getRepairXY : function(e, E){
        return  E.node.ui.getDDRepairXY();
    },
    
    onEndDrag : function(F, e){
        this.tree.fireEvent("enddrag", this.tree, F.node, e);
    },
    
    onValidDrop : function(dd, e, id){
        this.tree.fireEvent("dragdrop", this.tree, this.dragData.node, dd, e);
        this.hideProxy();
    },
    
    beforeInvalidDrop : function(e, id){
        
        var  sm = this.tree.getSelectionModel();
        sm.clearSelections();
        sm.select(this.dragData.node);
    }
});
}




Roo.tree.TreeEditor = function(A, B){
    B = B || {};
    var  C = B.events ? B : new  Roo.form.TextField(B);
    Roo.tree.TreeEditor.superclass.constructor.call(this, C);

    this.tree = A;

    A.on('beforeclick', this.beforeNodeClick, this);
    A.getTreeEl().on('mousedown', this.hide, this);
    this.on('complete', this.updateNode, this);
    this.on('beforestartedit', this.fitToTree, this);
    this.on('startedit', this.bindScroll, this, {delay:10});
    this.on('specialkey', this.onSpecialKey, this);
};

Roo.extend(Roo.tree.TreeEditor, Roo.Editor, {
    

    alignment: "l-l",
    
    autoSize: false,
    

    hideEl : false,
    

    cls: "x-small-editor x-tree-editor",
    

    shim:false,
    
    shadow:"frame",
    

    maxWidth: 250,

    editDelay : 350,

    
    fitToTree : function(ed, el){
        var  td = this.tree.getTreeEl().dom, nd = el.dom;
        if(td.scrollLeft >  nd.offsetLeft){ 
            td.scrollLeft = nd.offsetLeft;
        }
        var  w = Math.min(
                this.maxWidth,
                (td.clientWidth > 20 ? td.clientWidth : td.offsetWidth) - Math.max(0, nd.offsetLeft-td.scrollLeft) - 
5);
        this.setSize(w, '');
    },

    
    triggerEdit : function(D){
        this.completeEdit();
        this.editNode = D;
        this.startEdit(D.ui.textNode, D.text);
    },

    
    bindScroll : function(){
        this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
    },

    
    beforeNodeClick : function(E, e){
        var  F = (this.lastClick ? this.lastClick.getElapsed() : 0);
        this.lastClick = new  Date();
        if(F > this.editDelay && this.tree.getSelectionModel().isSelected(E)){
            e.stopEvent();
            this.triggerEdit(E);
            return  false;
        }
    },

    
    updateNode : function(ed, G){
        this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
        this.editNode.setText(G);
    },

    
    onHide : function(){
        Roo.tree.TreeEditor.superclass.onHide.call(this);
        if(this.editNode){
            this.editNode.ui.focus();
        }
    },

    
    onSpecialKey : function(H, e){
        var  k = e.getKey();
        if(k == e.ESC){
            e.stopEvent();
            this.cancelEdit();
        }else  if(k == e.ENTER && !e.hasModifier()){
            e.stopEvent();
            this.completeEdit();
        }
    }
});



 



Roo.tree.ColumnNodeUI = Roo.extend(Roo.tree.TreeNodeUI, {
    
    
    renderElements : function(n, a, A, B){
        
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var  t = n.getOwnerTree();
        var  C = Pman.Tab.Document_TypesTree.tree.el.id;
        
        var  D = t.columns;
        var  bw = t.borderWidth;
        var  c = D[0];
        var  E = a.href ? a.href : Roo.isGecko ? "" : "#";
         var  cb = typeof  a.checked == "boolean";
        var  tx = String.format('{0}',n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]));
        var  F = 'x-t-' + C + '-c0';
        var  G = [
            '<li class="x-tree-node">',
            
                
                '<div class="x-tree-node-el ', a.cls,'">',
                    
                    '<div class="x-tree-col ', F, '" style="width:', c.width-bw, 'px;">',
                
                
                        '<span class="x-tree-node-indent">',this.indentMarkup,'</span>',
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon  " />',
                        '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',
                           (a.icon ? ' x-tree-node-inline-icon' : ''),
                           (a.iconCls ? ' '+a.iconCls : ''),
                           '" unselectable="on" />',
                        (cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + 
                             (a.checked ? 'checked="checked" />' : ' />')) : ''),
                             
                        '<a class="x-tree-node-anchor" hidefocus="on" href="',E,'" tabIndex="1" ',
                            (a.hrefTarget ? ' target="' +a.hrefTarget + '"' : ''), '>',
                            '<span unselectable="on" qtip="' + tx + '">',
                             tx,
                             '</span></a>' ,
                    '</div>',
                     '<a class="x-tree-node-anchor" hidefocus="on" href="',E,'" tabIndex="1" ',
                            (a.hrefTarget ? ' target="' +a.hrefTarget + '"' : ''), '>',
                 ];
        
        for(var  i = 1, len = D.length; i < len; i++){
            c = D[i];
            F = 'x-t-' + C + '-c' +i;
            tx = String.format('{0}', (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]));
            G.push('<div class="x-tree-col ', F, ' ' ,(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;">',
                        '<div class="x-tree-col-text" qtip="' + tx +'">',tx,"</div>",
                      "</div>");
         }

         
         G.push(
            '</a>',
            '<div class="x-clear"></div></div>',
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>");
        
        if(B !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Roo.DomHelper.insertHtml("beforeBegin",
                                n.nextSibling.ui.getEl(), G.join(""));
        }else {
            this.wrap = Roo.DomHelper.insertHtml("beforeEnd", A, G.join(""));
        }
        var  el = this.wrap.firstChild;
        this.elRow = el;
        this.elNode = el.firstChild;
        this.ranchor = el.childNodes[1];
        this.ctNode = this.wrap.childNodes[1];
        var  cs = el.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var  H = 3;
        if(cb){
            this.checkbox = cs[3];
            H++;
        }

        this.anchor = cs[H];
        
        this.textNode = cs[H].firstChild;
        
        
        
        
        
       
    },
    initEvents : function(){
        Roo.tree.ColumnNodeUI.superclass.initEvents.call(this);
        
            
        var  a = this.ranchor;

        var  el = Roo.get(a);

        if(Roo.isOpera){ 
            el.setStyle("text-decoration", "none");
        }


        el.on("click", this.onClick, this);
        el.on("dblclick", this.onDblClick, this);
        el.on("contextmenu", this.onContextMenu, this);
        
    },
    
    

    addClass : function(I){
        if(this.elRow){
            Roo.fly(this.elRow).addClass(I);
        }
        
    },
    
    
    removeClass : function(J){
        if(this.elRow){
            Roo.fly(this.elRow).removeClass(J);
        }
    }

    
    
});




 



Roo.tree.ColumnTree =  function(el, A)
{
   Roo.tree.ColumnTree.superclass.constructor.call(this, el , A);
   this.addEvents({
        

       "resize" : true
    });
    this.on('resize', this.onResize, this);
};

Roo.extend(Roo.tree.ColumnTree, Roo.tree.TreePanel, {
    
    
    
    borderWidth: Roo.isBorderBox ? 0 : 2, 
    headEls : false,
    
    render : function(){
        
       
        Roo.tree.ColumnTree.superclass.render.apply(this);
        
        this.el.addClass('x-column-tree');
        
        this.headers = this.el.createChild(
            {cls:'x-tree-headers'},this.innerCt.dom);
   
        var  B = this.columns, c;
        var  C = 0;
        this.headEls = [];
        var   D = B.length;
        for(var  i = 0; i < D; i++){
             c = B[i];
             C += c.width;
            this.headEls.push(this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;'
             }));
        }

        this.headers.createChild({cls:'x-clear'});
        
        this.headers.setWidth(C);
        
        this.innerCt.setStyle({ overflow: 'auto' });
        this.onResize(this.width, this.height);
             
        
    },
    onResize : function(w,h)
    {
        this.height = h;
        this.width = w;
        
        this.innerCt.setWidth(this.width);
        this.innerCt.setHeight(this.height-20);
        
        
        var  E = this.columns, c;
        var  F = 0;
        var  G = false;
        var  H = E.length;
        for(var  i = 0; i < H; i++){
            c = E[i];
            if (this.autoExpandColumn !== false && c.dataIndex == this.autoExpandColumn) {
                
                G  = this.headEls[i];
                continue;
            }

            F += c.width;
            
        }
        if (G) {
            G.setWidth(  ((w - F)-this.borderWidth - 20));
        }

        this.headers.setWidth(w-20);

        
        
        
    }
});



 


Roo.menu.Menu = function(A){
    Roo.apply(this, A);
    this.id = this.id || Roo.id();
    this.addEvents({
        

        beforeshow : true,
        

        beforehide : true,
        

        show : true,
        

        hide : true,
        

        click : true,
        

        mouseover : true,
        

        mouseout : true,
        

        itemclick: true
    });
    if (this.registerMenu) {
        Roo.menu.MenuMgr.register(this);
    }
    
    var  B = this.items;
    this.items = new  Roo.util.MixedCollection();
    if(B){
        this.add.apply(this, B);
    }
};

Roo.extend(Roo.menu.Menu, Roo.util.Observable, {
    

    minWidth : 120,
    

    shadow : "sides",
    

    subMenuAlign : "tl-tr?",
    

    defaultAlign : "tl-bl?",
    

    allowOtherMenus : false,
    

    registerMenu : true,

    hidden:true,

    
    render : function(){
        if(this.el){
            return;
        }
        var  el = this.el = new  Roo.Layer({
            cls: "x-menu",
            shadow:this.shadow,
            constrain: false,
            parentEl: this.parentEl || document.body,
            zindex:15000
        });

        this.keyNav = new  Roo.menu.MenuNav(this);

        if(this.plain){
            el.addClass("x-menu-plain");
        }
        if(this.cls){
            el.addClass(this.cls);
        }

        
        this.focusEl = el.createChild({
            tag: "a", cls: "x-menu-focus", href: "#", onclick: "return false;", tabIndex:"-1"
        });
        var  ul = el.createChild({tag: "ul", cls: "x-menu-list"});
        ul.on("click", this.onClick, this);
        ul.on("mouseover", this.onMouseOver, this);
        ul.on("mouseout", this.onMouseOut, this);
        this.items.each(function(C){
            var  li = document.createElement("li");
            li.className = "x-menu-list-item";
            ul.dom.appendChild(li);
            C.render(li, this);
        }, this);
        this.ul = ul;
        this.autoWidth();
    },

    
    autoWidth : function(){
        var  el = this.el, ul = this.ul;
        if(!el){
            return;
        }
        var  w = this.width;
        if(w){
            el.setWidth(w);
        }else  if(Roo.isIE){
            el.setWidth(this.minWidth);
            var  t = el.dom.offsetWidth; 
            el.setWidth(ul.getWidth()+el.getFrameWidth("lr"));
        }
    },

    
    delayAutoWidth : function(){
        if(this.rendered){
            if(!this.awTask){
                this.awTask = new  Roo.util.DelayedTask(this.autoWidth, this);
            }

            this.awTask.delay(20);
        }
    },

    
    findTargetItem : function(e){
        var  t = e.getTarget(".x-menu-list-item", this.ul,  true);
        if(t && t.menuItemId){
            return  this.items.get(t.menuItemId);
        }
    },

    
    onClick : function(e){
        var  t;
        if(t = this.findTargetItem(e)){
            t.onClick(e);
            this.fireEvent("click", this, t, e);
        }
    },

    
    setActiveItem : function(C, D){
        if(C != this.activeItem){
            if(this.activeItem){
                this.activeItem.deactivate();
            }

            this.activeItem = C;
            C.activate(D);
        }else  if(D){
            C.expandMenu();
        }
    },

    
    tryActivate : function(E, F){
        var  G = this.items;
        for(var  i = E, len = G.length; i >= 0 && i < len; i+= F){
            var  C = G.get(i);
            if(!C.disabled && C.canActivate){
                this.setActiveItem(C, false);
                return  C;
            }
        }
        return  false;
    },

    
    onMouseOver : function(e){
        var  t;
        if(t = this.findTargetItem(e)){
            if(t.canActivate && !t.disabled){
                this.setActiveItem(t, true);
            }
        }

        this.fireEvent("mouseover", this, e, t);
    },

    
    onMouseOut : function(e){
        var  t;
        if(t = this.findTargetItem(e)){
            if(t == this.activeItem && t.shouldDeactivate(e)){
                this.activeItem.deactivate();
                delete  this.activeItem;
            }
        }

        this.fireEvent("mouseout", this, e, t);
    },

    

    isVisible : function(){
        return  this.el && !this.hidden;
    },

    

    show : function(el, H, I){
        this.parentMenu = I;
        if(!this.el){
            this.render();
        }

        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, H || this.defaultAlign), I, false);
    },

    

    showAt : function(xy, J, 
_e){
        this.parentMenu = J;
        if(!this.el){
            this.render();
        }
        if(_e !== false){
            this.fireEvent("beforeshow", this);
            xy = this.el.adjustForConstraints(xy);
        }

        this.el.setXY(xy);
        this.el.show();
        this.hidden = false;
        this.focus();
        this.fireEvent("show", this);
    },

    focus : function(){
        if(!this.hidden){
            this.doFocus.defer(50, this);
        }
    },

    doFocus : function(){
        if(!this.hidden){
            this.focusEl.focus();
        }
    },

    

    hide : function(K){
        if(this.el && this.isVisible()){
            this.fireEvent("beforehide", this);
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }

            this.el.hide();
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(K === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    },

    

    add : function(){
        var  a = arguments, l = a.length, L;
        for(var  i = 0; i < l; i++){
            var  el = a[i];
            if(el.render){ 
                L = this.addItem(el);
            }else  if(typeof  el == "string"){ 
                if(el == "separator" || el == "-"){
                    L = this.addSeparator();
                }else {
                    L = this.addText(el);
                }
            }else  if(el.tagName || el.el){ 
                L = this.addElement(el);
            }else  if(typeof  el == "object"){ 
                L = this.addMenuItem(el);
            }
        }
        return  L;
    },

    

    getEl : function(){
        if(!this.el){
            this.render();
        }
        return  this.el;
    },

    

    addSeparator : function(){
        return  this.addItem(new  Roo.menu.Separator());
    },

    

    addElement : function(el){
        return  this.addItem(new  Roo.menu.BaseItem(el));
    },

    

    addItem : function(M){
        this.items.add(M);
        if(this.ul){
            var  li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.ul.dom.appendChild(li);
            M.render(li, this);
            this.delayAutoWidth();
        }
        return  M;
    },

    

    addMenuItem : function(N){
        if(!(N  instanceof  Roo.menu.Item)){
            if(typeof  N.checked == "boolean"){ 
                N = new  Roo.menu.CheckItem(N);
            }else {
                N = new  Roo.menu.Item(N);
            }
        }
        return  this.addItem(N);
    },

    

    addText : function(O){
        return  this.addItem(new  Roo.menu.TextItem(O));
    },

    

    insert : function(P, Q){
        this.items.insert(P, Q);
        if(this.ul){
            var  li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.ul.dom.insertBefore(li, this.ul.dom.childNodes[P]);
            Q.render(li, this);
            this.delayAutoWidth();
        }
        return  Q;
    },

    

    remove : function(R){
        this.items.removeKey(R.id);
        R.destroy();
    },

    

    removeAll : function(){
        var  f;
        while(f = this.items.first()){
            this.remove(f);
        }
    }
});


Roo.menu.MenuNav = function(S){
    Roo.menu.MenuNav.superclass.constructor.call(this, S.el);
    this.scope = this.menu = S;
};

Roo.extend(Roo.menu.MenuNav, Roo.KeyNav, {
    doRelay : function(e, h){
        var  k = e.getKey();
        if(!this.menu.activeItem && e.isNavKeyPress() && k != e.SPACE && k != e.RETURN ){
            this.menu.tryActivate(0, 1);
            return  false;
        }
        return  h.call(this.scope || this, e, this.menu);
    },

    up : function(e, m){
        if(!m.tryActivate(m.items.indexOf(m.activeItem)-1, -1)){
            m.tryActivate(m.items.length-1, -1);
        }
    },

    down : function(e, m){
        if(!m.tryActivate(m.items.indexOf(m.activeItem)+1, 1)){
            m.tryActivate(0, 1);
        }
    },

    right : function(e, m){
        if(m.activeItem){
            m.activeItem.expandMenu(true);
        }
    },

    left : function(e, m){
        m.hide();
        if(m.parentMenu && m.parentMenu.activeItem){
            m.parentMenu.activeItem.activate();
        }
    },

    enter : function(e, m){
        if(m.activeItem){
            e.stopPropagation();
            m.activeItem.onClick(e);
            m.fireEvent("click", this, m.activeItem);
            return  true;
        }
    }
});


 


Roo.menu.MenuMgr = function(){
   var  A, B, C = {}, attached = false, lastShow = new  Date();

   
   function  D(){
       A = {};
       B = new  Roo.util.MixedCollection();
       Roo.get(document).addKeyListener(27, function(){
           if(B.length > 0){
               E();
           }
       });
   }

   
   function  E(){
       if(B && B.length > 0){
           var  c = B.clone();
           c.each(function(m){
               m.hide();
           });
       }
   }

   
   function  F(m){
       B.remove(m);
       if(B.length < 1){
           Roo.get(document).un("mousedown", J);
           attached = false;
       }
   }

   
   function  G(m){
       var  L = B.last();
       lastShow = new  Date();
       B.add(m);
       if(!attached){
           Roo.get(document).on("mousedown", J);
           attached = true;
       }
       if(m.parentMenu){
          m.getEl().setZIndex(parseInt(m.parentMenu.getEl().getStyle("z-index"), 10) + 3);
          m.parentMenu.activeChild = m;
       }else  if(L && L.isVisible()){
          m.getEl().setZIndex(parseInt(L.getEl().getStyle("z-index"), 10) + 3);
       }
   }

   
   function  H(m){
       if(m.activeChild){
           m.activeChild.hide();
       }
       if(m.autoHideTimer){
           clearTimeout(m.autoHideTimer);
           delete  m.autoHideTimer;
       }
   }

   
   function  I(m){
       var  pm = m.parentMenu;
       if(!pm && !m.allowOtherMenus){
           E();
       }else  if(pm && pm.activeChild && B != m){
           pm.activeChild.hide();
       }
   }

   
   function  J(e){
       if(lastShow.getElapsed() > 50 && B.length > 0 && !e.getTarget(".x-menu")){
           E();
       }
   }

   
   function  K(mi, L){
       if(L){
           var  g = C[mi.group];
           for(var  i = 0, l = g.length; i < l; i++){
               if(g[i] != mi){
                   g[i].setChecked(false);
               }
           }
       }
   }

   return  {

       

       hideAll : function(){
            E();  
       },

       
       register : function(Q){
           if(!A){
               D();
           }

           A[Q.id] = Q;
           Q.on("beforehide", H);
           Q.on("hide", F);
           Q.on("beforeshow", I);
           Q.on("show", G);
           var  g = Q.group;
           if(g && Q.events["checkchange"]){
               if(!C[g]){
                   C[g] = [];
               }

               C[g].push(Q);
               Q.on("checkchange", onCheck);
           }
       },

        

       get : function(R){
           if(typeof  R == "string"){ 
               return  A[R];
           }else  if(R.events){  
               return  R;
           }else  if(typeof  R.length == 'number'){ 
               return  new  Roo.menu.Menu({items:R});
           }else { 
               return  new  Roo.menu.Menu(R);
           }
       },

       
       unregister : function(S){
           delete  A[S.id];
           S.un("beforehide", H);
           S.un("hide", F);
           S.un("beforeshow", I);
           S.un("show", G);
           var  g = S.group;
           if(g && S.events["checkchange"]){
               C[g].remove(S);
               S.un("checkchange", onCheck);
           }
       },

       
       registerCheckable : function(T){
           var  g = T.group;
           if(g){
               if(!C[g]){
                   C[g] = [];
               }

               C[g].push(T);
               T.on("beforecheckchange", K);
           }
       },

       
       unregisterCheckable : function(U){
           var  g = U.group;
           if(g){
               C[g].remove(U);
               U.un("beforecheckchange", K);
           }
       }
   };
}();


 



Roo.menu.BaseItem = function(A){
    Roo.menu.BaseItem.superclass.constructor.call(this, A);

    this.addEvents({
        

        click: true,
        

        activate : true,
        

        deactivate : true
    });

    if(this.handler){
        this.on("click", this.handler, this.scope, true);
    }
};

Roo.extend(Roo.menu.BaseItem, Roo.Component, {
    

    

    canActivate : false,
    

    activeClass : "x-menu-item-active",
    

    hideOnClick : true,
    

    hideDelay : 100,

    
    ctype: "Roo.menu.BaseItem",

    
    actionMode : "container",

    
    render : function(B, C){
        this.parentMenu = C;
        Roo.menu.BaseItem.superclass.render.call(this, B);
        this.container.menuItemId = this.id;
    },

    
    onRender : function(D, E){
        this.el = Roo.get(this.el);
        D.dom.appendChild(this.el.dom);
    },

    
    onClick : function(e){
        if(!this.disabled && this.fireEvent("click", this, e) !== false
                && this.parentMenu.fireEvent("itemclick", this, e) !== false){
            this.handleClick(e);
        }else {
            e.stopEvent();
        }
    },

    
    activate : function(){
        if(this.disabled){
            return  false;
        }
        var  li = this.container;
        li.addClass(this.activeClass);
        this.region = li.getRegion().adjust(2, 2, -2, -2);
        this.fireEvent("activate", this);
        return  true;
    },

    
    deactivate : function(){
        this.container.removeClass(this.activeClass);
        this.fireEvent("deactivate", this);
    },

    
    shouldDeactivate : function(e){
        return  !this.region || !this.region.contains(e.getPoint());
    },

    
    handleClick : function(e){
        if(this.hideOnClick){
            this.parentMenu.hide.defer(this.hideDelay, this.parentMenu, [true]);
        }
    },

    
    expandMenu : function(F){
        
    },

    
    hideMenu : function(){
        
    }
});


 


Roo.menu.Adapter = function(A, B){
    Roo.menu.Adapter.superclass.constructor.call(this, B);
    this.component = A;
};
Roo.extend(Roo.menu.Adapter, Roo.menu.BaseItem, {
    
    canActivate : true,

    
    onRender : function(C, D){
        this.component.render(C);
        this.el = this.component.getEl();
    },

    
    activate : function(){
        if(this.disabled){
            return  false;
        }

        this.component.focus();
        this.fireEvent("activate", this);
        return  true;
    },

    
    deactivate : function(){
        this.fireEvent("deactivate", this);
    },

    
    disable : function(){
        this.component.disable();
        Roo.menu.Adapter.superclass.disable.call(this);
    },

    
    enable : function(){
        this.component.enable();
        Roo.menu.Adapter.superclass.enable.call(this);
    }
});





Roo.menu.TextItem = function(A){
    this.text = A;
    Roo.menu.TextItem.superclass.constructor.call(this);
};

Roo.extend(Roo.menu.TextItem, Roo.menu.BaseItem, {
    

    hideOnClick : false,
    

    itemCls : "x-menu-text",

    
    onRender : function(){
        var  s = document.createElement("span");
        s.className = this.itemCls;
        s.innerHTML = this.text;
        this.el = s;
        Roo.menu.TextItem.superclass.onRender.apply(this, arguments);
    }
});





Roo.menu.Separator = function(A){
    Roo.menu.Separator.superclass.constructor.call(this, A);
};

Roo.extend(Roo.menu.Separator, Roo.menu.BaseItem, {
    

    itemCls : "x-menu-sep",
    

    hideOnClick : false,

    
    onRender : function(li){
        var  s = document.createElement("span");
        s.className = this.itemCls;
        s.innerHTML = "&#160;";
        this.el = s;
        li.addClass("x-menu-sep-li");
        Roo.menu.Separator.superclass.onRender.apply(this, arguments);
    }
});




Roo.menu.Item = function(A){
    Roo.menu.Item.superclass.constructor.call(this, A);
    if(this.menu){
        this.menu = Roo.menu.MenuMgr.get(this.menu);
    }
};
Roo.extend(Roo.menu.Item, Roo.menu.BaseItem, {
    

    

    itemCls : "x-menu-item",
    

    canActivate : true,
    

    showDelay: 200,
    
    hideDelay: 200,

    
    ctype: "Roo.menu.Item",
    
    
    onRender : function(B, C){
        var  el = document.createElement("a");
        el.hideFocus = true;
        el.unselectable = "on";
        el.href = this.href || "#";
        if(this.hrefTarget){
            el.target = this.hrefTarget;
        }

        el.className = this.itemCls + (this.menu ?  " x-menu-item-arrow" : "") + (this.cls ?  " " + this.cls : "");
        el.innerHTML = String.format(
                '<img src="{0}" class="x-menu-item-icon {2}" />{1}',
                this.icon || Roo.BLANK_IMAGE_URL, this.text, this.iconCls || '');
        this.el = el;
        Roo.menu.Item.superclass.onRender.call(this, B, C);
    },

    

    setText : function(D){
        this.text = D;
        if(this.rendered){
            this.el.update(String.format(
                '<img src="{0}" class="x-menu-item-icon {2}">{1}',
                this.icon || Roo.BLANK_IMAGE_URL, this.text, this.iconCls || ''));
            this.parentMenu.autoWidth();
        }
    },

    
    handleClick : function(e){
        if(!this.href){ 
            e.stopEvent();
        }

        Roo.menu.Item.superclass.handleClick.apply(this, arguments);
    },

    
    activate : function(E){
        if(Roo.menu.Item.superclass.activate.apply(this, arguments)){
            this.focus();
            if(E){
                this.expandMenu();
            }
        }
        return  true;
    },

    
    shouldDeactivate : function(e){
        if(Roo.menu.Item.superclass.shouldDeactivate.call(this, e)){
            if(this.menu && this.menu.isVisible()){
                return  !this.menu.getEl().getRegion().contains(e.getPoint());
            }
            return  true;
        }
        return  false;
    },

    
    deactivate : function(){
        Roo.menu.Item.superclass.deactivate.apply(this, arguments);
        this.hideMenu();
    },

    
    expandMenu : function(F){
        if(!this.disabled && this.menu){
            clearTimeout(this.hideTimer);
            delete  this.hideTimer;
            if(!this.menu.isVisible() && !this.showTimer){
                this.showTimer = this.deferExpand.defer(this.showDelay, this, [F]);
            }else  if (this.menu.isVisible() && F){
                this.menu.tryActivate(0, 1);
            }
        }
    },

    
    deferExpand : function(G){
        delete  this.showTimer;
        this.menu.show(this.container, this.parentMenu.subMenuAlign || "tl-tr?", this.parentMenu);
        if(G){
            this.menu.tryActivate(0, 1);
        }
    },

    
    hideMenu : function(){
        clearTimeout(this.showTimer);
        delete  this.showTimer;
        if(!this.hideTimer && this.menu && this.menu.isVisible()){
            this.hideTimer = this.deferHide.defer(this.hideDelay, this);
        }
    },

    
    deferHide : function(){
        delete  this.hideTimer;
        this.menu.hide();
    }
});


 


Roo.menu.CheckItem = function(A){
    Roo.menu.CheckItem.superclass.constructor.call(this, A);
    this.addEvents({
        

        "beforecheckchange" : true,
        

        "checkchange" : true
    });
    if(this.checkHandler){
        this.on('checkchange', this.checkHandler, this.scope);
    }
};
Roo.extend(Roo.menu.CheckItem, Roo.menu.Item, {
    

    

    itemCls : "x-menu-item x-menu-check-item",
    

    groupClass : "x-menu-group-item",

    

    checked: false,

    
    ctype: "Roo.menu.CheckItem",

    
    onRender : function(c){
        Roo.menu.CheckItem.superclass.onRender.apply(this, arguments);
        if(this.group){
            this.el.addClass(this.groupClass);
        }

        Roo.menu.MenuMgr.registerCheckable(this);
        if(this.checked){
            this.checked = false;
            this.setChecked(true, true);
        }
    },

    
    destroy : function(){
        if(this.rendered){
            Roo.menu.MenuMgr.unregisterCheckable(this);
        }

        Roo.menu.CheckItem.superclass.destroy.apply(this, arguments);
    },

    

    setChecked : function(B, C){
        if(this.checked != B && this.fireEvent("beforecheckchange", this, B) !== false){
            if(this.container){
                this.container[B ? "addClass" : "removeClass"]("x-menu-item-checked");
            }

            this.checked = B;
            if(C !== true){
                this.fireEvent("checkchange", this, B);
            }
        }
    },

    
    handleClick : function(e){
       if(!this.disabled && !(this.checked && this.group)){
           this.setChecked(!this.checked);
       }

       Roo.menu.CheckItem.superclass.handleClick.apply(this, arguments);
    }
});


 


Roo.menu.DateItem = function(A){
    Roo.menu.DateItem.superclass.constructor.call(this, new  Roo.DatePicker(A), A);
    

    this.picker = this.component;
    this.addEvents({select: true});
    
    this.picker.on("render", function(B){
        B.getEl().swallowEvent("click");
        B.container.addClass("x-menu-date-item");
    });

    this.picker.on("select", this.onSelect, this);
};

Roo.extend(Roo.menu.DateItem, Roo.menu.Adapter, {
    
    onSelect : function(B, C){
        this.fireEvent("select", this, C, B);
        Roo.menu.DateItem.superclass.handleClick.call(this);
    }
});


 


Roo.menu.ColorItem = function(A){
    Roo.menu.ColorItem.superclass.constructor.call(this, new  Roo.ColorPalette(A), A);
    

    this.palette = this.component;
    this.relayEvents(this.palette, ["select"]);
    if(this.selectHandler){
        this.on('select', this.selectHandler, this.scope);
    }
};
Roo.extend(Roo.menu.ColorItem, Roo.menu.Adapter);


 



Roo.menu.DateMenu = function(A){
    Roo.menu.DateMenu.superclass.constructor.call(this, A);
    this.plain = true;
    var  di = new  Roo.menu.DateItem(A);
    this.add(di);
    

    this.picker = di.picker;
    

    this.relayEvents(di, ["select"]);

    this.on('beforeshow', function(){
        if(this.picker){
            this.picker.hideMonthPicker(true);
        }
    }, this);
};
Roo.extend(Roo.menu.DateMenu, Roo.menu.Menu, {
    cls:'x-date-menu'
});


 



Roo.menu.ColorMenu = function(A){
    Roo.menu.ColorMenu.superclass.constructor.call(this, A);
    this.plain = true;
    var  ci = new  Roo.menu.ColorItem(A);
    this.add(ci);
    

    this.palette = ci.palette;
    

    this.relayEvents(ci, ["select"]);
};
Roo.extend(Roo.menu.ColorMenu, Roo.menu.Menu);


 


Roo.form.Field = function(A){
    Roo.form.Field.superclass.constructor.call(this, A);
};

Roo.extend(Roo.form.Field, Roo.BoxComponent,  {
    

       

     
    

    invalidClass : "x-form-invalid",
    

    invalidText : "The value in this field is invalid",
    

    focusClass : "x-form-focus",
    

    validationEvent : "keyup",
    

    validateOnBlur : true,
    

    validationDelay : 250,
    

    defaultAutoCreate : {tag: "input", type: "text", size: "20", autocomplete: "off"},
    

    fieldClass : "x-form-field",
    

    msgTarget : 'qtip',
    

    msgFx : 'normal',

    

    readOnly : false,

    

    disabled : false,

    

    inputType : undefined,
    
    

	tabIndex : undefined,
	
    
    isFormField : true,

    
    hasFocus : false,
    

    

    value : undefined,

    

    


	
	initComponent : function(){
        Roo.form.Field.superclass.initComponent.call(this);
        this.addEvents({
            

            focus : true,
            

            blur : true,
            

            specialkey : true,
            

            change : true,
            

            invalid : true,
            

            valid : true
        });
    },

    

    getName: function(){
         return  this.rendered && this.el.dom.name ? this.el.dom.name : (this.hiddenName || '');
    },

    
    onRender : function(ct, B){
        Roo.form.Field.superclass.onRender.call(this, ct, B);
        if(!this.el){
            var  cfg = this.getAutoCreate();
            if(!cfg.name){
                cfg.name = this.name || this.id;
            }
            if(this.inputType){
                cfg.type = this.inputType;
            }

            this.el = ct.createChild(cfg, B);
        }
        var  C = this.el.dom.type;
        if(C){
            if(C == 'password'){
                C = 'text';
            }

            this.el.addClass('x-form-'+C);
        }
        if(this.readOnly){
            this.el.dom.readOnly = true;
        }
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }


        this.el.addClass([this.fieldClass, this.cls]);
        this.initValue();
    },

    

    applyTo : function(D){
        this.allowDomMove = false;
        this.el = Roo.get(D);
        this.render(this.el.dom.parentNode);
        return  this;
    },

    
    initValue : function(){
        if(this.value !== undefined){
            this.setValue(this.value);
        }else  if(this.el.dom.value.length > 0){
            this.setValue(this.el.dom.value);
        }
    },

    

    isDirty : function() {
        if(this.disabled) {
            return  false;
        }
        return  String(this.getValue()) !== String(this.originalValue);
    },

    
    afterRender : function(){
        Roo.form.Field.superclass.afterRender.call(this);
        this.initEvents();
    },

    
    fireKey : function(e){
        if(e.isNavKeyPress()){
            this.fireEvent("specialkey", this, e);
        }
    },

    

    reset : function(){
        this.setValue(this.originalValue);
        this.clearInvalid();
    },

    
    initEvents : function(){
        this.el.on(Roo.isIE ? "keydown" : "keypress", this.fireKey,  this);
        this.el.on("focus", this.onFocus,  this);
        this.el.on("blur", this.onBlur,  this);

        
        this.originalValue = this.getValue();
    },

    
    onFocus : function(){
        if(!Roo.isOpera && this.focusClass){ 
            this.el.addClass(this.focusClass);
        }
        if(!this.hasFocus){
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this);
        }
    },

    beforeBlur : Roo.emptyFn,

    
    onBlur : function(){
        this.beforeBlur();
        if(!Roo.isOpera && this.focusClass){ 
            this.el.removeClass(this.focusClass);
        }

        this.hasFocus = false;
        if(this.validationEvent !== false && this.validateOnBlur && this.validationEvent != "blur"){
            this.validate();
        }
        var  v = this.getValue();
        if(String(v) !== String(this.startValue)){
            this.fireEvent('change', this, v, this.startValue);
        }

        this.fireEvent("blur", this);
    },

    

    isValid : function(E){
        if(this.disabled){
            return  true;
        }
        var  F = this.preventMark;
        this.preventMark = E === true;
        var  v = this.validateValue(this.processValue(this.getRawValue()));
        this.preventMark = F;
        return  v;
    },

    

    validate : function(){
        if(this.disabled || this.validateValue(this.processValue(this.getRawValue()))){
            this.clearInvalid();
            return  true;
        }
        return  false;
    },

    processValue : function(G){
        return  G;
    },

    
    
    validateValue : function(H){
        return  true;
    },

    

    markInvalid : function(I){
        if(!this.rendered || this.preventMark){ 
            return;
        }

        this.el.addClass(this.invalidClass);
        I = I || this.invalidText;
        switch(this.msgTarget){
            case  'qtip':
                this.el.dom.qtip = I;
                this.el.dom.qclass = 'x-form-invalid-tip';
                if(Roo.QuickTips){ 
                    Roo.QuickTips.enable();
                }
                break;
            case  'title':
                this.el.dom.title = I;
                break;
            case  'under':
                if(!this.errorEl){
                    var  elp = this.el.findParent('.x-form-element', 5, true);
                    this.errorEl = elp.createChild({cls:'x-form-invalid-msg'});
                    this.errorEl.setWidth(elp.getWidth(true)-20);
                }

                this.errorEl.update(I);
                Roo.form.Field.msgFx[this.msgFx].show(this.errorEl, this);
                break;
            case  'side':
                if(!this.errorIcon){
                    var  elp = this.el.findParent('.x-form-element', 5, true);
                    this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
                }

                this.alignErrorIcon();
                this.errorIcon.dom.qtip = I;
                this.errorIcon.dom.qclass = 'x-form-invalid-tip';
                this.errorIcon.show();
                this.on('resize', this.alignErrorIcon, this);
                break;
            default:
                var  t = Roo.getDom(this.msgTarget);
                t.innerHTML = I;
                t.style.display = this.msgDisplay;
                break;
        }

        this.fireEvent('invalid', this, I);
    },

    
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.el, 'tl-tr', [2, 0]);
    },

    

    clearInvalid : function(){
        if(!this.rendered || this.preventMark){ 
            return;
        }

        this.el.removeClass(this.invalidClass);
        switch(this.msgTarget){
            case  'qtip':
                this.el.dom.qtip = '';
                break;
            case  'title':
                this.el.dom.title = '';
                break;
            case  'under':
                if(this.errorEl){
                    Roo.form.Field.msgFx[this.msgFx].hide(this.errorEl, this);
                }
                break;
            case  'side':
                if(this.errorIcon){
                    this.errorIcon.dom.qtip = '';
                    this.errorIcon.hide();
                    this.un('resize', this.alignErrorIcon, this);
                }
                break;
            default:
                var  t = Roo.getDom(this.msgTarget);
                t.innerHTML = '';
                t.style.display = 'none';
                break;
        }

        this.fireEvent('valid', this);
    },

    

    getRawValue : function(){
        var  v = this.el.getValue();
        if(v === this.emptyText){
            v = '';
        }
        return  v;
    },

    

    getValue : function(){
        var  v = this.el.getValue();
        if(v === this.emptyText || v === undefined){
            v = '';
        }
        return  v;
    },

    

    setRawValue : function(v){
        return  this.el.dom.value = (v === null || v === undefined ? '' : v);
    },

    

    setValue : function(v){
        this.value = v;
        if(this.rendered){
            this.el.dom.value = (v === null || v === undefined ? '' : v);
            this.validate();
        }
    },

    adjustSize : function(w, h){
        var  s = Roo.form.Field.superclass.adjustSize.call(this, w, h);
        s.width = this.adjustWidth(this.el.dom.tagName, s.width);
        return  s;
    },

    adjustWidth : function(J, w){
        J = J.toLowerCase();
        if(typeof  w == 'number' && Roo.isStrict && !Roo.isSafari){
            if(Roo.isIE && (J == 'input' || J == 'textarea')){
                if(J == 'input'){
                    return  w + 2;
                }
                if(J = 'textarea'){
                    return  w-2;
                }
            }else  if(Roo.isOpera){
                if(J == 'input'){
                    return  w + 2;
                }
                if(J = 'textarea'){
                    return  w-2;
                }
            }
        }
        return  w;
    }
});



Roo.form.Field.msgFx = {
    normal : {
        show: function(K, f){
            K.setDisplayed('block');
        },

        hide : function(L, f){
            L.setDisplayed(false).update('');
        }
    },

    slide : {
        show: function(M, f){
            M.slideIn('t', {stopFx:true});
        },

        hide : function(N, f){
            N.slideOut('t', {stopFx:true,useDisplay:true});
        }
    },

    slideRight : {
        show: function(O, f){
            O.fixDisplay();
            O.alignTo(f.el, 'tl-tr');
            O.slideIn('l', {stopFx:true});
        },

        hide : function(P, f){
            P.slideOut('l', {stopFx:true,useDisplay:true});
        }
    }
};


 



Roo.form.TextField = function(A){
    Roo.form.TextField.superclass.constructor.call(this, A);
    this.addEvents({
        

        autosize : true
    });
};

Roo.extend(Roo.form.TextField, Roo.form.Field,  {
    

    grow : false,
    

    growMin : 30,
    

    growMax : 800,
    

    vtype : null,
    

    maskRe : null,
    

    disableKeyFilter : false,
    

    allowBlank : true,
    

    minLength : 0,
    

    maxLength : Number.MAX_VALUE,
    

    minLengthText : "The minimum length for this field is {0}",
    

    maxLengthText : "The maximum length for this field is {0}",
    

    selectOnFocus : false,
    

    blankText : "This field is required",
    

    validator : null,
    

    regex : null,
    

    regexText : "",
    

    emptyText : null,
    

    emptyClass : 'x-form-empty-field',

    
    initEvents : function(){
        Roo.form.TextField.superclass.initEvents.call(this);
        if(this.validationEvent == 'keyup'){
            this.validationTask = new  Roo.util.DelayedTask(this.validate, this);
            this.el.on('keyup', this.filterValidation, this);
        }
        else  if(this.validationEvent !== false){
            this.el.on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        if(this.selectOnFocus || this.emptyText){
            this.on("focus", this.preFocus, this);
            if(this.emptyText){
                this.on('blur', this.postBlur, this);
                this.applyEmptyText();
            }
        }
        if(this.maskRe || (this.vtype && this.disableKeyFilter !== true && (this.maskRe = Roo.form.VTypes[this.vtype+'Mask']))){
            this.el.on("keypress", this.filterKeys, this);
        }
        if(this.grow){
            this.el.on("keyup", this.onKeyUp,  this, {buffer:50});
            this.el.on("click", this.autoSize,  this);
        }
    },

    processValue : function(B){
        if(this.stripCharsRe){
            var  newValue = B.replace(this.stripCharsRe, '');
            if(newValue !== B){
                this.setRawValue(newValue);
                return  newValue;
            }
        }
        return  B;
    },

    filterValidation : function(e){
        if(!e.isNavKeyPress()){
            this.validationTask.delay(this.validationDelay);
        }
    },

    
    onKeyUp : function(e){
        if(!e.isNavKeyPress()){
            this.autoSize();
        }
    },

    

    reset : function(){
        Roo.form.TextField.superclass.reset.call(this);
        this.applyEmptyText();
    },

    applyEmptyText : function(){
        if(this.rendered && this.emptyText && this.getRawValue().length < 1){
            this.setRawValue(this.emptyText);
            this.el.addClass(this.emptyClass);
        }
    },

    
    preFocus : function(){
        if(this.emptyText){
            if(this.el.dom.value == this.emptyText){
                this.setRawValue('');
            }

            this.el.removeClass(this.emptyClass);
        }
        if(this.selectOnFocus){
            this.el.dom.select();
        }
    },

    
    postBlur : function(){
        this.applyEmptyText();
    },

    
    filterKeys : function(e){
        var  k = e.getKey();
        if(!Roo.isIE && (e.isNavKeyPress() || k == e.BACKSPACE || (k == e.DELETE  && e.button == -1))){
            return;
        }
        var  c = e.getCharCode(), cc = String.fromCharCode(c);
        if(Roo.isIE && (e.isSpecialKey() || !cc)){
            return;
        }
        if(!this.maskRe.test(cc)){
            e.stopEvent();
        }
    },

    setValue : function(v){
        if(this.emptyText && this.el && v !== undefined && v !== null && v !== ''){
            this.el.removeClass(this.emptyClass);
        }

        Roo.form.TextField.superclass.setValue.apply(this, arguments);
        this.applyEmptyText();
        this.autoSize();
    },

    

    validateValue : function(C){
        if(C.length < 1 || C === this.emptyText){ 
             if(this.allowBlank){
                this.clearInvalid();
                return  true;
             }else {
                this.markInvalid(this.blankText);
                return  false;
             }
        }
        if(C.length < this.minLength){
            this.markInvalid(String.format(this.minLengthText, this.minLength));
            return  false;
        }
        if(C.length > this.maxLength){
            this.markInvalid(String.format(this.maxLengthText, this.maxLength));
            return  false;
        }
        if(this.vtype){
            var  vt = Roo.form.VTypes;
            if(!vt[this.vtype](C, this)){
                this.markInvalid(this.vtypeText || vt[this.vtype +'Text']);
                return  false;
            }
        }
        if(typeof  this.validator == "function"){
            var  msg = this.validator(C);
            if(msg !== true){
                this.markInvalid(msg);
                return  false;
            }
        }
        if(this.regex && !this.regex.test(C)){
            this.markInvalid(this.regexText);
            return  false;
        }
        return  true;
    },

    

    selectText : function(D, E){
        var  v = this.getRawValue();
        if(v.length > 0){
            D = D === undefined ? 0 : D;
            E = E === undefined ? v.length : E;
            var  d = this.el.dom;
            if(d.setSelectionRange){
                d.setSelectionRange(D, E);
            }else  if(d.createTextRange){
                var  range = d.createTextRange();
                range.moveStart("character", D);
                range.moveEnd("character", v.length-E);
                range.select();
            }
        }
    },

    

    autoSize : function(){
        if(!this.grow || !this.rendered){
            return;
        }
        if(!this.metrics){
            this.metrics = Roo.util.TextMetrics.createInstance(this.el);
        }
        var  el = this.el;
        var  v = el.dom.value;
        var  d = document.createElement('div');
        d.appendChild(document.createTextNode(v));
        v = d.innerHTML;
        d = null;
        v += "&#160;";
        var  w = Math.min(this.growMax, Math.max(this.metrics.getWidth(v) + 
 10, this.growMin));
        this.el.setWidth(w);
        this.fireEvent("autosize", this, w);
    }
});


 






Roo.form.Hidden = function(A){
    Roo.form.Hidden.superclass.constructor.call(this, A);
};
  
Roo.extend(Roo.form.Hidden, Roo.form.TextField, {
    fieldLabel:      '',
    inputType:      'hidden',
    width:          50,
    allowBlank:     true,
    labelSeparator: '',
    hidden:         true,
    itemCls :       'x-form-item-display-none'


});





 


Roo.form.TriggerField = function(A){
    this.mimicing = false;
    Roo.form.TriggerField.superclass.constructor.call(this, A);
};

Roo.extend(Roo.form.TriggerField, Roo.form.TextField,  {
    

    

    defaultAutoCreate : {tag: "input", type: "text", size: "16", autocomplete: "off"},
    

    hideTrigger:false,

    

    

    


    

    autoSize: Roo.emptyFn,
    
    monitorTab : true,
    
    deferHeight : true,

    
    actionMode : 'wrap',
    
    onResize : function(w, h){
        Roo.form.TriggerField.superclass.onResize.apply(this, arguments);
        if(typeof  w == 'number'){
            this.el.setWidth(this.adjustWidth('input', w - this.trigger.getWidth()));
        }
    },

    
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    
    getResizeEl : function(){
        return  this.wrap;
    },

    
    getPositionEl : function(){
        return  this.wrap;
    },

    
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    },

    
    onRender : function(ct, B){
        Roo.form.TriggerField.superclass.onRender.call(this, ct, B);
        this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        this.trigger = this.wrap.createChild(this.triggerConfig ||
                {tag: "img", src: Roo.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.triggerClass});
        if(this.hideTrigger){
            this.trigger.setDisplayed(false);
        }

        this.initTrigger();
        if(!this.width){
            this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        }
    },

    
    initTrigger : function(){
        this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    
    onDestroy : function(){
        if(this.trigger){
            this.trigger.removeAllListeners();
            this.trigger.remove();
        }
        if(this.wrap){
            this.wrap.remove();
        }

        Roo.form.TriggerField.superclass.onDestroy.call(this);
    },

    
    onFocus : function(){
        Roo.form.TriggerField.superclass.onFocus.call(this);
        if(!this.mimicing){
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Roo.get(Roo.isIE ? document.body : document).on("mousedown", this.mimicBlur, this);
            if(this.monitorTab){
                this.el.on("keydown", this.checkTab, this);
            }
        }
    },

    
    checkTab : function(e){
        if(e.getKey() == e.TAB){
            this.triggerBlur();
        }
    },

    
    onBlur : function(){
        
    },

    
    mimicBlur : function(e, t){
        if(!this.wrap.contains(t) && this.validateBlur()){
            this.triggerBlur();
        }
    },

    
    triggerBlur : function(){
        this.mimicing = false;
        Roo.get(Roo.isIE ? document.body : document).un("mousedown", this.mimicBlur);
        if(this.monitorTab){
            this.el.un("keydown", this.checkTab, this);
        }

        this.wrap.removeClass('x-trigger-wrap-focus');
        Roo.form.TriggerField.superclass.onBlur.call(this);
    },

    
    
    validateBlur : function(e, t){
        return  true;
    },

    
    onDisable : function(){
        Roo.form.TriggerField.superclass.onDisable.call(this);
        if(this.wrap){
            this.wrap.addClass('x-item-disabled');
        }
    },

    
    onEnable : function(){
        Roo.form.TriggerField.superclass.onEnable.call(this);
        if(this.wrap){
            this.wrap.removeClass('x-item-disabled');
        }
    },

    
    onShow : function(){
        var  ae = this.getActionEl();
        
        if(ae){
            ae.dom.style.display = '';
            ae.dom.style.visibility = 'visible';
        }
    },

    
    
    onHide : function(){
        var  ae = this.getActionEl();
        ae.dom.style.display = 'none';
    },

    

    onTriggerClick : Roo.emptyFn
});




Roo.form.TwinTriggerField = Roo.extend(Roo.form.TriggerField, {
    initComponent : function(){
        Roo.form.TwinTriggerField.superclass.initComponent.call(this);

        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Roo.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
            {tag: "img", src: Roo.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
        ]};
    },

    getTrigger : function(C){
        return  this.triggers[C];
    },

    initTrigger : function(){
        var  ts = this.trigger.select('.x-form-trigger', true);
        this.wrap.setStyle('overflow', 'hidden');
        var  D = this;
        ts.each(function(t, E, F){
            t.hide = function(){
                var  w = D.wrap.getWidth();
                this.dom.style.display = 'none';
                D.el.setWidth(w-D.trigger.getWidth());
            };
            t.show = function(){
                var  w = D.wrap.getWidth();
                this.dom.style.display = '';
                D.el.setWidth(w-D.trigger.getWidth());
            };
            var  G = 'Trigger'+(F+1);

            if(this['hide'+G]){
                t.dom.style.display = 'none';
            }

            t.on("click", this['on'+G+'Click'], this, {preventDefault:true});
            t.addClassOnOver('x-form-trigger-over');
            t.addClassOnClick('x-form-trigger-click');
        }, this);
        this.triggers = ts.elements;
    },

    onTrigger1Click : Roo.emptyFn,
    onTrigger2Click : Roo.emptyFn
});


 


Roo.form.TextArea = function(A){
    Roo.form.TextArea.superclass.constructor.call(this, A);
    
    
    
    if(this.minHeight !== undefined){
        this.growMin = this.minHeight;
    }
    if(this.maxHeight !== undefined){
        this.growMax = this.maxHeight;
    }
};

Roo.extend(Roo.form.TextArea, Roo.form.TextField,  {
    

    growMin : 60,
    

    growMax: 1000,
    

    preventScrollbars: false,
    


    
    onRender : function(ct, B){
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                style:"width:300px;height:60px;",
                autocomplete: "off"
            };
        }

        Roo.form.TextArea.superclass.onRender.call(this, ct, B);
        if(this.grow){
            this.textSizeEl = Roo.DomHelper.append(document.body, {
                tag: "pre", cls: "x-form-grow-sizer"
            });
            if(this.preventScrollbars){
                this.el.setStyle("overflow", "hidden");
            }

            this.el.setHeight(this.growMin);
        }
    },

    onDestroy : function(){
        if(this.textSizeEl){
            this.textSizeEl.parentNode.removeChild(this.textSizeEl);
        }

        Roo.form.TextArea.superclass.onDestroy.call(this);
    },

    
    onKeyUp : function(e){
        if(!e.isNavKeyPress() || e.getKey() == e.ENTER){
            this.autoSize();
        }
    },

    

    autoSize : function(){
        if(!this.grow || !this.textSizeEl){
            return;
        }
        var  el = this.el;
        var  v = el.dom.value;
        var  ts = this.textSizeEl;

        ts.innerHTML = '';
        ts.appendChild(document.createTextNode(v));
        v = ts.innerHTML;

        Roo.fly(ts).setWidth(this.el.getWidth());
        if(v.length < 1){
            v = "&#160;&#160;";
        }else {
            if(Roo.isIE){
                v = v.replace(/\n/g, '<p>&#160;</p>');
            }

            v += "&#160;\n&#160;";
        }

        ts.innerHTML = v;
        var  h = Math.min(this.growMax, Math.max(ts.offsetHeight, this.growMin));
        if(h != this.lastHeight){
            this.lastHeight = h;
            this.el.setHeight(h);
            this.fireEvent("autosize", this, h);
        }
    }
});


 



Roo.form.NumberField = function(A){
    Roo.form.NumberField.superclass.constructor.call(this, A);
};

Roo.extend(Roo.form.NumberField, Roo.form.TextField,  {
    

    fieldClass: "x-form-field x-form-num-field",
    

    allowDecimals : true,
    

    decimalSeparator : ".",
    

    decimalPrecision : 2,
    

    allowNegative : true,
    

    minValue : Number.NEGATIVE_INFINITY,
    

    maxValue : Number.MAX_VALUE,
    

    minText : "The minimum value for this field is {0}",
    

    maxText : "The maximum value for this field is {0}",
    

    nanText : "{0} is not a valid number",

    
    initEvents : function(){
        Roo.form.NumberField.superclass.initEvents.call(this);
        var  B = "0123456789";
        if(this.allowDecimals){
            B += this.decimalSeparator;
        }
        if(this.allowNegative){
            B += "-";
        }

        this.stripCharsRe = new  RegExp('[^'+B+']', 'gi');
        var  C = function(e){
            var  k = e.getKey();
            if(!Roo.isIE && (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE )){
                return;
            }
            var  c = e.getCharCode();
            if(B.indexOf(String.fromCharCode(c)) === -1){
                e.stopEvent();
            }
        };
        this.el.on("keypress", C, this);
    },

    
    validateValue : function(D){
        if(!Roo.form.NumberField.superclass.validateValue.call(this, D)){
            return  false;
        }
        if(D.length < 1){ 
             return  true;
        }
        var  E = this.parseValue(D);
        if(isNaN(E)){
            this.markInvalid(String.format(this.nanText, D));
            return  false;
        }
        if(E < this.minValue){
            this.markInvalid(String.format(this.minText, this.minValue));
            return  false;
        }
        if(E > this.maxValue){
            this.markInvalid(String.format(this.maxText, this.maxValue));
            return  false;
        }
        return  true;
    },

    getValue : function(){
        return  this.fixPrecision(this.parseValue(Roo.form.NumberField.superclass.getValue.call(this)));
    },

    
    parseValue : function(F){
        F = parseFloat(String(F).replace(this.decimalSeparator, "."));
        return  isNaN(F) ? '' : F;
    },

    
    fixPrecision : function(G){
        var  H = isNaN(G);
        if(!this.allowDecimals || this.decimalPrecision == -1 || H || !G){
            return  H ? '' : G;
        }
        return  parseFloat(G).toFixed(this.decimalPrecision);
    },

    setValue : function(v){
        Roo.form.NumberField.superclass.setValue.call(this, String(v).replace(".", this.decimalSeparator));
    },

    
    decimalPrecisionFcn : function(v){
        return  Math.floor(v);
    },

    beforeBlur : function(){
        var  v = this.parseValue(this.getRawValue());
        if(v){
            this.setValue(this.fixPrecision(v));
        }
    }
});


 


Roo.form.DateField = function(A){
    Roo.form.DateField.superclass.constructor.call(this, A);
    
      this.addEvents({
         
        

        'select' : true
         
    });
    
    
    if(typeof  this.minValue == "string") this.minValue = this.parseDate(this.minValue);
    if(typeof  this.maxValue == "string") this.maxValue = this.parseDate(this.maxValue);
    this.ddMatch = null;
    if(this.disabledDates){
        var  dd = this.disabledDates;
        var  re = "(?:";
        for(var  i = 0; i < dd.length; i++){
            re += dd[i];
            if(i != dd.length-1) re += "|";
        }

        this.ddMatch = new  RegExp(re + ")");
    }
};

Roo.extend(Roo.form.DateField, Roo.form.TriggerField,  {
    

    format : "m/d/y",
    

    altFormats : "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d",
    

    disabledDays : null,
    

    disabledDaysText : "Disabled",
    

    disabledDates : null,
    

    disabledDatesText : "Disabled",
    

    minValue : null,
    

    maxValue : null,
    

    minText : "The date in this field must be equal to or after {0}",
    

    maxText : "The date in this field must be equal to or before {0}",
    

    invalidText : "{0} is not a valid date - it must be in the format {1}",
    

    triggerClass : 'x-form-date-trigger',
    

    
 
    useIso : false,
    
 
    
    defaultAutoCreate : {tag: "input", type: "text", size: "10", autocomplete: "off"},
    
    
    hiddenField: false,
    
    onRender : function(ct, B)
    {
        Roo.form.DateField.superclass.onRender.call(this, ct, B);
        if (this.useIso) {
            this.el.dom.removeAttribute('name'); 
            this.hiddenField = this.el.insertSibling({ tag:'input', type:'hidden', name: this.name },
                    'before', true);
            this.hiddenField.value = this.formatDate(this.value, 'Y-m-d');
            
            this.hiddenName = this.name;
        }
            
            
    },
    
    
    validateValue : function(C)
    {
        C = this.formatDate(C);
        if(!Roo.form.DateField.superclass.validateValue.call(this, C)){
            return  false;
        }
        if(C.length < 1){ 
             return  true;
        }
        var  D = C;
        C = this.parseDate(C);
        if(!C){
            this.markInvalid(String.format(this.invalidText, D, this.format));
            return  false;
        }
        var  E = C.getTime();
        if(this.minValue && E < this.minValue.getTime()){
            this.markInvalid(String.format(this.minText, this.formatDate(this.minValue)));
            return  false;
        }
        if(this.maxValue && E > this.maxValue.getTime()){
            this.markInvalid(String.format(this.maxText, this.formatDate(this.maxValue)));
            return  false;
        }
        if(this.disabledDays){
            var  day = C.getDay();
            for(var  i = 0; i < this.disabledDays.length; i++) {
            	if(day === this.disabledDays[i]){
            	    this.markInvalid(this.disabledDaysText);
                    return  false;
            	}
            }
        }
        var  F = this.formatDate(C);
        if(this.ddMatch && this.ddMatch.test(F)){
            this.markInvalid(String.format(this.disabledDatesText, F));
            return  false;
        }
        return  true;
    },

    
    
    validateBlur : function(){
        return  !this.menu || !this.menu.isVisible();
    },

    

    getValue : function(){
        
        return   this.hiddenField ? this.hiddenField.value : this.parseDate(Roo.form.DateField.superclass.getValue.call(this)) || "";
    },

    

    setValue : function(G){
        if (this.hiddenField) {
            this.hiddenField.value = this.formatDate(this.parseDate(G), 'Y-m-d');
        }

        Roo.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseDate(G)));
    },

    
    parseDate : function(H){
        if(!H || H  instanceof  Date){
            return  H;
        }
        var  v = Date.parseDate(H, this.format);
        if(!v && this.altFormats){
            if(!this.altFormatsArray){
                this.altFormatsArray = this.altFormats.split("|");
            }
            for(var  i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
                v = Date.parseDate(H, this.altFormatsArray[i]);
            }
        }
        return  v;
    },

    
    formatDate : function(I, J){
        return  (!I || !(I  instanceof  Date)) ?
               I : I.dateFormat(J || this.format);
    },

    
    menuListeners : {
        select: function(m, d){
            this.setValue(d);
            this.fireEvent('select', this, d);
        },
        show : function(){ 
            this.onFocus();
        },
        hide : function(){
            this.focus.defer(10, this);
            var  ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    },

    
    
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new  Roo.menu.DateMenu();
        }

        Roo.apply(this.menu.picker,  {
            showClear: this.allowBlank,
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.ddMatch,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.on(Roo.apply({}, this.menuListeners, {
            scope:this
        }));
        this.menu.picker.setValue(this.getValue() || new  Date());
        this.menu.show(this.el, "tl-bl?");
    },

    beforeBlur : function(){
        var  v = this.parseDate(this.getRawValue());
        if(v){
            this.setValue(v);
        }
    }

    

    

    

    

});


 



Roo.form.ComboBox = function(A){
    Roo.form.ComboBox.superclass.constructor.call(this, A);
    this.addEvents({
        

        'expand' : true,
        

        'collapse' : true,
        

        'beforeselect' : true,
        

        'select' : true,
        

        'beforequery': true
    });
    if(this.transform){
        this.allowDomMove = false;
        var  s = Roo.getDom(this.transform);
        if(!this.hiddenName){
            this.hiddenName = s.name;
        }
        if(!this.store){
            this.mode = 'local';
            var  d = [], opts = s.options;
            for(var  i = 0, len = opts.length;i < len; i++){
                var  o = opts[i];
                var  value = (Roo.isIE ? o.getAttributeNode('value').specified : o.hasAttribute('value')) ? o.value : o.text;
                if(o.selected) {
                    this.value = value;
                }

                d.push([value, o.text]);
            }

            this.store = new  Roo.data.SimpleStore({
                'id': 0,
                fields: ['value', 'text'],
                data : d
            });
            this.valueField = 'value';
            this.displayField = 'text';
        }

        s.name = Roo.id(); 
        if(!this.lazyRender){
            this.target = true;
            this.el = Roo.DomHelper.insertBefore(s, this.autoCreate || this.defaultAutoCreate);
            s.parentNode.removeChild(s); 
            this.render(this.el.parentNode);
        }else {
            s.parentNode.removeChild(s); 
        }

    }
    if (this.store) {
        this.store = Roo.factory(this.store, Roo.data);
    }

    
    this.selectedIndex = -1;
    if(this.mode == 'local'){
        if(A.queryDelay === undefined){
            this.queryDelay = 10;
        }
        if(A.minChars === undefined){
            this.minChars = 0;
        }
    }
};

Roo.extend(Roo.form.ComboBox, Roo.form.TriggerField, {
    

    

    

    

    


     

     
    
    defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
    

    listWidth: undefined,
    

    displayField: undefined,
    

    valueField: undefined,
    

    hiddenName: undefined,
    

    listClass: '',
    

    selectedClass: 'x-combo-selected',
    

    triggerClass : 'x-form-arrow-trigger',
    

    shadow:'sides',
    

    listAlign: 'tl-bl?',
    

    maxHeight: 300,
    

    triggerAction: 'query',
    

    minChars : 4,
    

    typeAhead: false,
    

    queryDelay: 500,
    

    pageSize: 0,
    

    selectOnFocus:false,
    

    queryParam: 'query',
    

    loadingText: 'Loading...',
    

    resizable: false,
    

    handleHeight : 8,
    

    editable: true,
    

    allQuery: '',
    

    mode: 'remote',
    

    minListWidth : 70,
    

    forceSelection:false,
    

    typeAheadDelay : 250,
    

    valueNotFoundText : undefined,
    

    blockFocus : false,
    
    

    disableClear : false,
    
    
    onRender : function(ct, B){
        Roo.form.ComboBox.superclass.onRender.call(this, ct, B);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id:  (this.hiddenId||this.hiddenName)},
                    'before', true);
            this.hiddenField.value =
                this.hiddenValue !== undefined ? this.hiddenValue :
                this.value !== undefined ? this.value : '';

            
            this.el.dom.removeAttribute('name');
        }
        if(Roo.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        var  C = 'x-combo-list';

        this.list = new  Roo.Layer({
            shadow: this.shadow, cls: [C, this.listClass].join(' '), constrain:false
        });

        var  lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
        this.list.setWidth(lw);
        this.list.swallowEvent('mousewheel');
        this.assetHeight = 0;

        if(this.title){
            this.header = this.list.createChild({cls:C+'-hd', html: this.title});
            this.assetHeight += this.header.getHeight();
        }


        this.innerList = this.list.createChild({cls:C+'-inner'});
        this.innerList.on('mouseover', this.onViewOver, this);
        this.innerList.on('mousemove', this.onViewMove, this);
        this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        
        if(this.allowBlank && !this.pageSize && !this.disableClear){
            this.footer = this.list.createChild({cls:C+'-ft'});
            this.pageTb = new  Roo.Toolbar(this.footer);
           
        }
        if(this.pageSize){
            this.footer = this.list.createChild({cls:C+'-ft'});
            this.pageTb = new  Roo.PagingToolbar(this.footer, this.store,
                    {pageSize: this.pageSize});
            
        }
        
        if (this.pageTb && this.allowBlank && !this.disableClear) {
            var  _this = this;
            this.pageTb.add(new  Roo.Toolbar.Fill(), {
                cls: 'x-btn-icon x-btn-clear',
                text: '&#160;',
                handler: function()
                {
                    _this.collapse();
                    _this.clearValue();
                    _this.onSelect(false, -1);
                }
            });
        }
        if (this.footer) {
            this.assetHeight += this.footer.getHeight();
        }
        

        if(!this.tpl){
            this.tpl = '<div class="'+C+'-item">{' + this.displayField + '}</div>';
        }


        this.view = new  Roo.View(this.innerList, this.tpl, {
            singleSelect:true, store: this.store, selectedClass: this.selectedClass
        });

        this.view.on('click', this.onViewClick, this);

        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.collapse, this);

        if(this.resizable){
            this.resizer = new  Roo.Resizable(this.list,  {
               pinned:true, handles:'se'
            });
            this.resizer.on('resize', function(r, w, h){
                this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                this.listWidth = w;
                this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                this.restrictHeight();
            }, this);
            this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
        }
        if(!this.editable){
            this.editable = true;
            this.setEditable(false);
        }
    },

    
    initEvents : function(){
        Roo.form.ComboBox.superclass.initEvents.call(this);

        this.keyNav = new  Roo.KeyNav(this.el, {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTriggerClick();
                }else {
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
                
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                this.onViewClick(false);
                return  true;
            },

            scope : this,

            doRelay : function(D, E, F){
                if(F == 'down' || this.scope.isExpanded()){
                   return  Roo.KeyNav.prototype.doRelay.apply(this, arguments);
                }
                return  true;
            },

            forceKeyDown: true
        });
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        this.dqTask = new  Roo.util.DelayedTask(this.initQuery, this);
        if(this.typeAhead){
            this.taTask = new  Roo.util.DelayedTask(this.onTypeAhead, this);
        }
        if(this.editable !== false){
            this.el.on("keyup", this.onKeyUp, this);
        }
        if(this.forceSelection){
            this.on('blur', this.doForce, this);
        }
    },

    onDestroy : function(){
        if(this.view){
            this.view.setStore(null);
            this.view.el.removeAllListeners();
            this.view.el.remove();
            this.view.purgeListeners();
        }
        if(this.list){
            this.list.destroy();
        }
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.collapse, this);
        }

        Roo.form.ComboBox.superclass.onDestroy.call(this);
    },

    
    fireKey : function(e){
        if(e.isNavKeyPress() && !this.list.isVisible()){
            this.fireEvent("specialkey", this, e);
        }
    },

    
    onResize: function(w, h){
        Roo.form.ComboBox.superclass.onResize.apply(this, arguments);
        if(this.list && this.listWidth === undefined){
            var  lw = Math.max(w, this.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
    },

    

    setEditable : function(D){
        if(D == this.editable){
            return;
        }

        this.editable = D;
        if(!D){
            this.el.dom.setAttribute('readOnly', true);
            this.el.on('mousedown', this.onTriggerClick,  this);
            this.el.addClass('x-combo-noedit');
        }else {
            this.el.dom.setAttribute('readOnly', false);
            this.el.un('mousedown', this.onTriggerClick,  this);
            this.el.removeClass('x-combo-noedit');
        }
    },

    
    onBeforeLoad : function(){
        if(!this.hasFocus){
            return;
        }

        this.innerList.update(this.loadingText ?
               '<div class="loading-indicator">'+this.loadingText+'</div>' : '');
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    
    onLoad : function(){
        if(!this.hasFocus){
            return;
        }
        if(this.store.getCount() > 0){
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable){
                    this.el.dom.select();
                }
                if(!this.selectByValue(this.value, true)){
                    this.select(0, true);
                }
            }else {
                this.selectNext();
                if(this.typeAhead && this.lastKey != Roo.EventObject.BACKSPACE && this.lastKey != Roo.EventObject.DELETE ){
                    this.taTask.delay(this.typeAheadDelay);
                }
            }
        }else {
            this.onEmptyResults();
        }
        
    },

    
    onTypeAhead : function(){
        if(this.store.getCount() > 0){
            var  r = this.store.getAt(0);
            var  newValue = r.data[this.displayField];
            var  len = newValue.length;
            var  selStart = this.getRawValue().length;
            if(selStart != len){
                this.setRawValue(newValue);
                this.selectText(selStart, newValue.length);
            }
        }
    },

    
    onSelect : function(E, F){
        if(this.fireEvent('beforeselect', this, E, F) !== false){
            this.setFromData(F > -1 ? E.data : false);
            this.collapse();
            this.fireEvent('select', this, E, F);
        }
    },

    

    getValue : function(){
        if(this.valueField){
            return  typeof  this.value != 'undefined' ? this.value : '';
        }else {
            return  Roo.form.ComboBox.superclass.getValue.call(this);
        }
    },

    

    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.value = '';
        }

        this.value = '';
        this.setRawValue('');
        this.lastSelectionText = '';
        this.applyEmptyText();
    },

    

    setValue : function(v){
        var  G = v;
        if(this.valueField){
            var  r = this.findRecord(this.valueField, v);
            if(r){
                G = r.data[this.displayField];
            }else  if(this.valueNotFoundText !== undefined){
                G = this.valueNotFoundText;
            }
        }

        this.lastSelectionText = G;
        if(this.hiddenField){
            this.hiddenField.value = v;
        }

        Roo.form.ComboBox.superclass.setValue.call(this, G);
        this.value = v;
    },
    

    
    lastData : false,
    

    setFromData : function(o){
        var  dv = ''; 
        var  vv = ''; 
        this.lastData = o;
        if (this.displayField) {
            dv = !o || typeof(o[this.displayField]) == 'undefined' ? '' : o[this.displayField];
        } else  {
            
            console.log('no value field set for '+ this.name);
        }
        
        if(this.valueField){
            vv = !o || typeof(o[this.valueField]) == 'undefined' ? dv : o[this.valueField];
        }
        if(this.hiddenField){
            this.hiddenField.value = vv;
            
            this.lastSelectionText = dv;
            Roo.form.ComboBox.superclass.setValue.call(this, dv);
            this.value = vv;
            return;
        }

        
        
        this.lastSelectionText = dv;
        Roo.form.ComboBox.superclass.setValue.call(this, dv);
        this.value = vv;
        
        
    },
    
    reset : function(){
        
        this.setValue(this.originalValue);
        this.clearInvalid();
        this.lastData = false;
    },
    
    findRecord : function(H, I){
        var  J;
        if(this.store.getCount() > 0){
            this.store.each(function(r){
                if(r.data[H] == I){
                    J = r;
                    return  false;
                }
            });
        }
        return  J;
    },

    
    onViewMove : function(e, t){
        this.inKeyMode = false;
    },

    
    onViewOver : function(e, t){
        if(this.inKeyMode){ 
            return;
        }
        var  K = this.view.findItemFromChild(t);
        if(K){
            var  F = this.view.indexOf(K);
            this.select(F, false);
        }
    },

    
    onViewClick : function(L){
        var  M = this.view.getSelectedIndexes()[0];
        var  r = this.store.getAt(M);
        if(r){
            this.onSelect(r, M);
        }
        if(L !== false && !this.blockFocus){
            this.el.focus();
        }
    },

    
    restrictHeight : function(){
        this.innerList.dom.style.height = '';
        var  N = this.innerList.dom;
        var  h = Math.max(N.clientHeight, N.offsetHeight, N.scrollHeight);
        this.innerList.setHeight(h < this.maxHeight ? 'auto' : this.maxHeight);
        this.list.beginUpdate();
        this.list.setHeight(this.innerList.getHeight()+this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight);
        this.list.alignTo(this.el, this.listAlign);
        this.list.endUpdate();
    },

    
    onEmptyResults : function(){
        this.collapse();
    },

    

    isExpanded : function(){
        return  this.list.isVisible();
    },

    

    selectByValue : function(v, O){
        if(v !== undefined && v !== null){
            var  r = this.findRecord(this.valueField || this.displayField, v);
            if(r){
                this.select(this.store.indexOf(r), O);
                return  true;
            }
        }
        return  false;
    },

    

    select : function(P, Q){
        this.selectedIndex = P;
        this.view.select(P);
        if(Q !== false){
            var  el = this.view.getNode(P);
            if(el){
                this.innerList.scrollChildIntoView(el, false);
            }
        }
    },

    
    selectNext : function(){
        var  ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else  if(this.selectedIndex < ct-1){
                this.select(this.selectedIndex+1);
            }
        }
    },

    
    selectPrev : function(){
        var  ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else  if(this.selectedIndex != 0){
                this.select(this.selectedIndex-1);
            }
        }
    },

    
    onKeyUp : function(e){
        if(this.editable !== false && !e.isSpecialKey()){
            this.lastKey = e.getKey();
            this.dqTask.delay(this.queryDelay);
        }
    },

    
    validateBlur : function(){
        return  !this.list || !this.list.isVisible();   
    },

    
    initQuery : function(){
        this.doQuery(this.getRawValue());
    },

    
    doForce : function(){
        if(this.el.dom.value.length > 0){
            this.el.dom.value =
                this.lastSelectionText === undefined ? '' : this.lastSelectionText;
            this.applyEmptyText();
        }
    },

    

    doQuery : function(q, R){
        if(q === undefined || q === null){
            q = '';
        }
        var  qe = {
            query: q,
            forceAll: R,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return  false;
        }

        q = qe.query;
        R = qe.forceAll;
        if(R === true || (q.length >= this.minChars)){
            if(this.lastQuery != q){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(R){
                        this.store.clearFilter();
                    }else {
                        this.store.filter(this.displayField, q);
                    }

                    this.onLoad();
                }else {
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else {
                this.selectedIndex = -1;
                this.onLoad();   
            }
        }
    },

    
    getParams : function(q){
        var  p = {};
        
        if(this.pageSize){
            p.start = 0;
            p.limit = this.pageSize;
        }
        return  p;
    },

    

    collapse : function(){
        if(!this.isExpanded()){
            return;
        }

        this.list.hide();
        Roo.get(document).un('mousedown', this.collapseIf, this);
        Roo.get(document).un('mousewheel', this.collapseIf, this);
        this.fireEvent('collapse', this);
    },

    
    collapseIf : function(e){
        if(!e.within(this.wrap) && !e.within(this.list)){
            this.collapse();
        }
    },

    

    expand : function(){
        if(this.isExpanded() || !this.hasFocus){
            return;
        }

        this.list.alignTo(this.el, this.listAlign);
        this.list.show();
        Roo.get(document).on('mousedown', this.collapseIf, this);
        Roo.get(document).on('mousewheel', this.collapseIf, this);
        this.fireEvent('expand', this);
    },

    
    
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            if (!this.blockFocus) {
                this.el.focus();
            }
            
        }else  {
            this.hasFocus = true;
            if(this.triggerAction == 'all') {
                this.doQuery(this.allQuery, true);
            } else  {
                this.doQuery(this.getRawValue());
            }
            if (!this.blockFocus) {
                this.el.focus();
            }
        }
    }

    

    

    

    

});




Roo.form.Checkbox = function(A){
    Roo.form.Checkbox.superclass.constructor.call(this, A);
    this.addEvents({
        

        check : true
    });
};

Roo.extend(Roo.form.Checkbox, Roo.form.Field,  {
    

    focusClass : undefined,
    

    fieldClass: "x-form-field",
    

    checked: false,
    

    defaultAutoCreate : { tag: "input", type: 'hidden', autocomplete: "off"},
    

    boxLabel : "",
    
  
    inputValue : '1',
    

     valueOff: '0', 

    actionMode : 'viewEl', 
    
    
    itemCls : 'x-menu-check-item x-form-item',
    groupClass : 'x-menu-group-item',
    inputType : 'hidden',
    
    
    inSetChecked: false, 
    
    inputElement: false, 
    basedOn: false, 
    
    isFormField: true, 

    onResize : function(){
        Roo.form.Checkbox.superclass.onResize.apply(this, arguments);
        if(!this.boxLabel){
            this.el.alignTo(this.wrap, 'c-c');
        }
    },

    initEvents : function(){
        Roo.form.Checkbox.superclass.initEvents.call(this);
        this.el.on("click", this.onClick,  this);
        this.el.on("change", this.onClick,  this);
    },


    getResizeEl : function(){
        return  this.wrap;
    },

    getPositionEl : function(){
        return  this.wrap;
    },

    
    onRender : function(ct, B){
        Roo.form.Checkbox.superclass.onRender.call(this, ct, B);
        

        
        this.wrap = this.el.wrap({cls: 'x-menu-check-item '});
        var  C = this.wrap.createChild({ 
            tag: 'img', cls: 'x-menu-item-icon', style: 'margin: 0px;' ,src : Roo.BLANK_IMAGE_URL });
        this.viewEl = C;   
        this.wrap.on('click', this.onClick,  this); 
        
        this.el.on('DOMAttrModified', this.setFromHidden,  this); 
        this.el.on('propertychange', this.setFromHidden,  this);  
        
        
        
        if(this.boxLabel){
            this.wrap.createChild({tag: 'label', htmlFor: this.el.id, cls: 'x-form-cb-label', html: this.boxLabel});
        
        }

        
            this.setChecked(this.checked);
        
            
        

    },

    
    initValue : Roo.emptyFn,

    

    getValue : function(){
        if(this.el){
            return  String(this.el.dom.value) == String(this.inputValue ) ? this.inputValue : this.valueOff;
        }
        return  this.valueOff;
        
    },

	
    onClick : function(){ 
        this.setChecked(!this.checked);

        
        
       
    },

    

    setValue : function(v,D){
        
        
        
        
        
        this.setChecked(v === this.inputValue);
        
    },
    
    setChecked : function(E,F)
    {
        if (this.inSetChecked) {
            this.checked = E;
            return;
        }
        
    
        if(this.wrap){
            this.wrap[E ? 'addClass' : 'removeClass']('x-menu-item-checked');
        }

        this.checked = E;
        if(F !== true){
            this.fireEvent('checkchange', this, E);
        }

        this.inSetChecked = true;
        this.el.dom.value = E ? this.inputValue : this.valueOff;
        this.inSetChecked = false;
        
    },
    
    setFromHidden: function()
    {
        if(!this.el){
            return;
        }

        
        
        this.setValue(this.el.dom.value);
    },
    
    onDestroy : function()
    {
        if(this.viewEl){
            Roo.get(this.viewEl).remove();
        }

         
        Roo.form.Checkbox.superclass.onDestroy.call(this);
    }

});


 


Roo.form.Radio = function(){
    Roo.form.Radio.superclass.constructor.apply(this, arguments);
};
Roo.extend(Roo.form.Radio, Roo.form.Checkbox, {
    inputType: 'radio',

    

    getGroupValue : function(){
        return  this.el.up('form').child('input[name='+this.el.dom.name+']:checked', true).value;
    }
});




 
 

 



Roo.form.HtmlEditor = Roo.extend(Roo.form.Field, {
      

    toolbars : false,
    

    createLinkText : 'Please enter the URL for the link:',
    

    defaultLinkValue : 'http:/'+'/',
   
    
    
    frameId: false,
    
    
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    sourceEditMode : false,
    onFocus : Roo.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    defaultAutoCreate : {
        tag: "textarea",
        style:"width:500px;height:300px;",
        autocomplete: "off"
    },

    
    initComponent : function(){
        this.addEvents({
            

            initialize: true,
            

            activate: true,
             

            beforesync: true,
             

            beforepush: true,
             

            sync: true,
             

            push: true,
             

            editmodechange: true,
            

            editorevent: true
        })
    },

    

    createToolbar : function(A){
        if (!A.toolbars || !A.toolbars.length) {
            A.toolbars = [ new  Roo.form.HtmlEditor.ToolbarStandard() ]; 
        }
        
        for (var  i =0 ; i < A.toolbars.length;i++) {
            A.toolbars[i].init(A);
        }
         
        
    },

    

    getDocMarkup : function(){
        return  '<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>';
    },

    
    onRender : function(ct, B){
        Roo.form.HtmlEditor.superclass.onRender.call(this, ct, B);
        this.el.dom.style.border = '0 none';
        this.el.dom.setAttribute('tabIndex', -1);
        this.el.addClass('x-hidden');
        if(Roo.isIE){ 
            this.el.applyStyles('margin-top:-1px;margin-bottom:-1px;')
        }

        this.wrap = this.el.wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });

        this.frameId = Roo.id();
        this.createToolbar(this);
        
        
        
        
      
        
        var  C = this.wrap.createChild({
            tag: 'iframe',
            id: this.frameId,
            name: this.frameId,
            frameBorder : 'no',
            'src' : Roo.SSL_SECURE_URL ? Roo.SSL_SECURE_URL  :  "javascript:false"
        });
        
       
        

        this.iframe = C.dom;

         this.assignDocWin();
        
        this.doc.designMode = 'on';
       
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();

        
        var  D = { 
            run : function(){
                
                this.assignDocWin();
                if(this.doc.body || this.doc.readyState == 'complete'){
                    try {
                        
                       
                        this.doc.designMode="on";
                    } catch (e) {
                        return;
                    }

                    Roo.TaskMgr.stop(D);
                    this.initEditor.defer(10, this);
                }
            },
            interval : 10,
            duration:10000,
            scope: this
        };
        Roo.TaskMgr.start(D);

        if(!this.width){
            this.setSize(this.el.getSize());
        }
    },

    
    onResize : function(w, h){
        Roo.form.HtmlEditor.superclass.onResize.apply(this, arguments);
        if(this.el && this.iframe){
            if(typeof  w == 'number'){
                var  aw = w - this.wrap.getFrameWidth('lr');
                this.el.setWidth(this.adjustWidth('textarea', aw));
                this.iframe.style.width = aw + 'px';
            }
            if(typeof  h == 'number'){
                var  tbh = 0;
                for (var  i =0; i < this.toolbars.length;i++) {
                    
                    tbh += this.toolbars[i].tb.el.getHeight();
                }
                
                
                
                
                var  ah = h - this.wrap.getFrameWidth('tb') - tbh;
                this.el.setHeight(this.adjustWidth('textarea', ah));
                this.iframe.style.height = ah + 'px';
                if(this.doc){
                    (this.doc.body || this.doc.documentElement).style.height = (ah - (this.iframePad*2)) + 'px';
                }
            }
        }
    },

    

    toggleSourceEdit : function(E){
        
        this.sourceEditMode = E === true;
        
        if(this.sourceEditMode){
          
            this.syncValue();
            this.iframe.className = 'x-hidden';
            this.el.removeClass('x-hidden');
            this.el.dom.removeAttribute('tabIndex');
            this.el.focus();
        }else {
             
            this.pushValue();
            this.iframe.className = '';
            this.el.addClass('x-hidden');
            this.el.dom.setAttribute('tabIndex', -1);
            this.deferFocus();
        }

        this.setSize(this.wrap.getSize());
        this.fireEvent('editmodechange', this, this.sourceEditMode);
    },

    
    createLink : function(){
        var  F = prompt(this.createLinkText, this.defaultLinkValue);
        if(F && F != 'http:/'+'/'){
            this.relayCmd('createlink', F);
        }
    },

    
    adjustSize : Roo.BoxComponent.prototype.adjustSize,

    
    getResizeEl : function(){
        return  this.wrap;
    },

    
    getPositionEl : function(){
        return  this.wrap;
    },

    
    initEvents : function(){
        this.originalValue = this.getValue();
    },

    

    markInvalid : Roo.emptyFn,
    

    clearInvalid : Roo.emptyFn,

    setValue : function(v){
        Roo.form.HtmlEditor.superclass.setValue.call(this, v);
        this.pushValue();
    },

    

    cleanHtml : function(G){
        G = String(G);
        if(G.length > 5){
            if(Roo.isSafari){ 
                G = G.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi, '');
            }
        }
        if(G == '&nbsp;'){
            G = '';
        }
        return  G;
    },

    

    syncValue : function(){
        if(this.initialized){
            var  bd = (this.doc.body || this.doc.documentElement);
            var  G = bd.innerHTML;
            if(Roo.isSafari){
                var  bs = bd.getAttribute('style'); 
                var  m = bs.match(/text-align:(.*?);/i);
                if(m && m[1]){
                    G = '<div style="'+m[0]+'">' + G + '</div>';
                }
            }

            G = this.cleanHtml(G);
            if(this.fireEvent('beforesync', this, G) !== false){
                this.el.dom.value = G;
                this.fireEvent('sync', this, G);
            }
        }
    },

    

    pushValue : function(){
        if(this.initialized){
            var  v = this.el.dom.value;
            if(v.length < 1){
                v = '&#160;';
            }
            if(this.fireEvent('beforepush', this, v) !== false){
                (this.doc.body || this.doc.documentElement).innerHTML = v;
                this.fireEvent('push', this, v);
            }
        }
    },

    
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    
    focus : function(){
        if(this.win && !this.sourceEditMode){
            this.win.focus();
        }else {
            this.el.focus();
        }
    },
    
    assignDocWin: function()
    {
        var  H = this.iframe;
        
         if(Roo.isIE){
            this.doc = H.contentWindow.document;
            this.win = H.contentWindow;
        } else  {
            this.doc = (H.contentDocument || Roo.get(this.frameId).dom.document);
            this.win = Roo.get(this.frameId).dom.contentWindow;
        }
    },
    
    
    initEditor : function(){
        
        this.assignDocWin();
        
        
        
        this.doc.designMode="on";
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();
        
        var  I = (this.doc.body || this.doc.documentElement);
        
        
        
        var  ss = this.el.getStyles('font-size', 'background-image', 'background-repeat');
        ss['background-attachment'] = 'fixed'; 
        I.bgProperties = 'fixed'; 
        Roo.DomHelper.applyStyles(I, ss);
        Roo.EventManager.on(this.doc, {
            'mousedown': this.onEditorEvent,
            'dblclick': this.onEditorEvent,
            'click': this.onEditorEvent,
            'keyup': this.onEditorEvent,
            buffer:100,
            scope: this
        });
        if(Roo.isGecko){
            Roo.EventManager.on(this.doc, 'keypress', this.applyCommand, this);
        }
        if(Roo.isIE || Roo.isSafari || Roo.isOpera){
            Roo.EventManager.on(this.doc, 'keydown', this.fixKeys, this);
        }

        this.initialized = true;

        this.fireEvent('initialize', this);
        this.pushValue();
    },

    
    onDestroy : function(){
        
        
        
        if(this.rendered){
            
            for (var  i =0; i < this.toolbars.length;i++) {
                
                this.toolbars[i].onDestroy();
            }

            
            this.wrap.dom.innerHTML = '';
            this.wrap.remove();
        }
    },

    
    onFirstFocus : function(){
        
        this.assignDocWin();
        
        
        this.activated = true;
        for (var  i =0; i < this.toolbars.length;i++) {
            this.toolbars[i].onFirstFocus();
        }
       
        if(Roo.isGecko){ 
            this.win.focus();
            var  s = this.win.getSelection();
            if(!s.focusNode || s.focusNode.nodeType != 3){
                var  r = s.getRangeAt(0);
                r.selectNodeContents((this.doc.body || this.doc.documentElement));
                r.collapse(true);
                this.deferFocus();
            }
            try{
                this.execCmd('useCSS', true);
                this.execCmd('styleWithCSS', false);
            }catch(e){}
        }

        this.fireEvent('activate', this);
    },

    
    adjustFont: function(J){
        var  K = J.cmd == 'increasefontsize' ? 1 : -1;
        
        
       
        var  v = parseInt(this.doc.queryCommandValue('FontSize')|| 3, 10);
        if(Roo.isSafari){ 
            var  sm = { 10 : 1, 13: 2, 16:3, 18:4, 24: 5, 32:6, 48: 7 };
            v =  (v < 10) ? 10 : v;
            v =  (v > 48) ? 48 : v;
            v = typeof(sm[v]) == 'undefined' ? 1 : sm[v];
            
        }

        
        
        v = Math.max(1, v+K);
        
        this.execCmd('FontSize', v  );
    },

    onEditorEvent : function(e){
        this.fireEvent('editorevent', this, e);
      
        this.syncValue();
    },

    insertTag : function(tg)
    {
        
        
        this.execCmd("formatblock",   tg);
        
    },
    
    insertText : function(L)
    {
        
        
        range = this.createRange();
        range.deleteContents();
               
               
        range.insertNode(this.doc.createTextNode(L));
    } ,
    
    
    relayBtnCmd : function(M){
        this.relayCmd(M.cmd);
    },

    

    relayCmd : function(N, O){
        this.win.focus();
        this.execCmd(N, O);
        this.fireEvent('editorevent', this);
        
        this.deferFocus();
    },

    

    execCmd : function(P, Q){
        this.doc.execCommand(P, false, Q === undefined ? null : Q);
        this.syncValue();
    },

    
    applyCommand : function(e){
        if(e.ctrlKey){
            var  c = e.getCharCode(), P;
            if(c > 0){
                c = String.fromCharCode(c);
                switch(c){
                    case  'b':
                        P = 'bold';
                    break;
                    case  'i':
                        P = 'italic';
                    break;
                    case  'u':
                        P = 'underline';
                    break;
                }
                if(P){
                    this.win.focus();
                    this.execCmd(P);
                    this.deferFocus();
                    e.preventDefault();
                }
            }
        }
    },

    

    insertAtCursor : function(R){
        if(!this.activated){
            return;
        }
        if(Roo.isIE){
            this.win.focus();
            var  r = this.doc.selection.createRange();
            if(r){
                r.collapse(true);
                r.pasteHTML(R);
                this.syncValue();
                this.deferFocus();
            }
        }else  if(Roo.isGecko || Roo.isOpera){
            this.win.focus();
            this.execCmd('InsertHTML', R);
            this.deferFocus();
        }else  if(Roo.isSafari){
            this.execCmd('InsertText', R);
            this.deferFocus();
        }
    },

    
    fixKeys : function(){ 
        if(Roo.isIE){
            return  function(e){
                var  k = e.getKey(), r;
                if(k == e.TAB){
                    e.stopEvent();
                    r = this.doc.selection.createRange();
                    if(r){
                        r.collapse(true);
                        r.pasteHTML('&#160;&#160;&#160;&#160;');
                        this.deferFocus();
                    }
                }else  if(k == e.ENTER){
                    r = this.doc.selection.createRange();
                    if(r){
                        var  target = r.parentElement();
                        if(!target || target.tagName.toLowerCase() != 'li'){
                            e.stopEvent();
                            r.pasteHTML('<br />');
                            r.collapse(false);
                            r.select();
                        }
                    }
                }
            };
        }else  if(Roo.isOpera){
            return  function(e){
                var  k = e.getKey();
                if(k == e.TAB){
                    e.stopEvent();
                    this.win.focus();
                    this.execCmd('InsertHTML','&#160;&#160;&#160;&#160;');
                    this.deferFocus();
                }
            };
        }else  if(Roo.isSafari){
            return  function(e){
                var  k = e.getKey();
                if(k == e.TAB){
                    e.stopEvent();
                    this.execCmd('InsertText','\t');
                    this.deferFocus();
                }
             };
        }
    }(),
    
    getAllAncestors: function()
    {
        var  p = this.getSelectedNode();
        var  a = [];
        if (!p) {
            a.push(p); 
            p = this.getParentElement();
        }
        
        
        while (p && (p.nodeType == 1) && (p.tagName.toLowerCase() != 'body')) {
            a.push(p);
            p = p.parentNode;
        }

        a.push(this.doc.body);
        return  a;
    },
    lastSel : false,
    lastSelNode : false,
    
    
    getSelection : function() 
    {
        this.assignDocWin();
        return  Roo.isIE ? this.doc.selection : this.win.getSelection();
    },
    
    getSelectedNode: function() 
    {
        
        
        
        
        
        
         
        var  S = this.createRange(this.getSelection());
        
        if (Roo.isIE) {
            var  parent = S.parentElement();
            while (true) {
                var  testRange = S.duplicate();
                testRange.moveToElementText(parent);
                if (testRange.inRange(S)) {
                    break;
                }
                if ((parent.nodeType != 1) || (parent.tagName.toLowerCase() == 'body')) {
                    break;
                }

                parent = parent.parentElement;
            }
            return  parent;
        }
        
        
        var  ar = S.endContainer.childNodes;
        if (!ar.length) {
            ar = S.commonAncestorContainer.childNodes;
            
        }
        var  T = [];
        var  U = [];
        var  V = false;
        for (var  i=0;i<ar.length;i++) {
            if ((ar[i].nodeType == 3) && (!ar[i].data.length)) { 
                continue;
            }
            
            
            if (this.rangeIntersectsNode(S,ar[i]) && this.rangeCompareNode(S,ar[i]) == 3) {
                T.push(ar[i]);
                continue;
            }
            
            
            if ((ar[i].nodeType == 1) && this.rangeIntersectsNode(S,ar[i]) && (this.rangeCompareNode(S,ar[i]) > 0)) {
                U.push(ar[i]);
                continue;
            }
            if (!this.rangeIntersectsNode(S,ar[i])|| (this.rangeCompareNode(S,ar[i]) == 0))  {
                continue;
            }

            
            
            V = true;
        }
        if (!T.length && U.length) {
            T= U;
        }
        if (V || !T.length || (T.length > 1)) {
            return  false;
        }
        
        return  T[0];
    },
    createRange: function(W)
    {
        
        
        
        if (typeof  W != "undefined") {
            try {
                return  W.getRangeAt ? W.getRangeAt(0) : W.createRange();
            } catch(e) {
                return  this.doc.createRange();
            }
        } else  {
            return  this.doc.createRange();
        }
    },
    getParentElement: function()
    {
        
        this.assignDocWin();
        var  X = Roo.isIE ? this.doc.selection : this.win.getSelection();
        
        var  Y = this.createRange(X);
         
        try {
            var  p = Y.commonAncestorContainer;
            while (p.nodeType == 3) { 
                p = p.parentNode;
            }
            return  p;
        } catch (e) {
            return  null;
        }
    
    },
    
    
    
    
    rangeIntersectsNode : function(Z, b)
    {
        var  d = b.ownerDocument.createRange();
        try {
            d.selectNode(b);
        }
        catch (e) {
            nodeRange.selectNodeContents(node);
        }

        return  Z.compareBoundaryPoints(Range.END_TO_START, d) == -1 &&
                 Z.compareBoundaryPoints(Range.START_TO_END, d) == 1;
    },
    rangeCompareNode : function(f, g) {
        var  j = g.ownerDocument.createRange();
        try {
            j.selectNode(g);
        } catch (e) {
            nodeRange.selectNodeContents(node);
        }
        var  k = f.compareBoundaryPoints(Range.START_TO_START, j) == 1;
        var  l = f.compareBoundaryPoints(Range.END_TO_END, j) == -1;

        if (k && !l)
            return  0;
        if (!k && l)
            return  1;
        if (k && l)
            return  2;

        return  3;
    }

    
    
    
    

    

    

    

    

    

    

    

    

    

    

    

});






 
Roo.form.HtmlEditor.ToolbarStandard = function(A)
{
    
    Roo.apply(this, A);
    
    
}


Roo.apply(Roo.form.HtmlEditor.ToolbarStandard.prototype,  {
    
    tb: false,
    
    rendered: false,
    
    editor : false,
    

    disable : false,
      

    fontFamilies : [
        'Arial',
        'Courier New',
        'Tahoma',
        'Times New Roman',
        'Verdana'
    ],
    
    specialChars : [
           "&#169;",
          "&#174;",     
          "&#8482;",    
          "&#163;" ,    
         
          "&#8230;",    
          "&#247;" ,    
        
           "&#8364;"    , 
       
        
        
          "&#176;"  

         
         
    ],
    inputElements : [ 
            "form", "input:text", "input:hidden", "input:checkbox", "input:radio", "input:password", 
            "input:submit", "input:button", "select", "textarea", "label" ],
    formats : [
        ["p"] ,  
        ["h1"],["h2"],["h3"],["h4"],["h5"],["h6"], 
        ["pre"],[ "code"], 
        ["abbr"],[ "acronym"],[ "address"],[ "cite"],[ "samp"],[ "var"]
    ],
     

    defaultFont: 'tahoma',
   
    fontSelect : false,
    
    
    formatCombo : false,
    
    init : function(B)
    {
        this.editor = B;
        
        
        var  C = B.frameId;
        var  D = this;
        function  E(id, G, H){
            var  I = C + '-'+ id ;
            return  {
                id : I,
                cmd : id,
                cls : 'x-btn-icon x-edit-'+id,
                enableToggle:G !== false,
                scope: B, 
                handler:H||B.relayBtnCmd,
                clickEvent:'mousedown',
                tooltip: D.buttonTips[id] || undefined, 
                tabIndex:-1
            };
        }
        
        
        
        var  tb = new  Roo.Toolbar(B.wrap.dom.firstChild);
        this.tb = tb;
         
        tb.el.on('click', function(e){
            e.preventDefault(); 
        });

        if(!this.disable.font && !Roo.isSafari){
            

        };
        if(!this.disable.formats){
            this.formatCombo = new  Roo.form.ComboBox({
                store: new  Roo.data.SimpleStore({
                    id : 'tag',
                    fields: ['tag'],
                    data : this.formats 
                }),
                blockFocus : true,
                
                displayField:'tag',
                typeAhead: false,
                mode: 'local',
                editable : false,
                triggerAction: 'all',
                emptyText:'Add tag',
                selectOnFocus:true,
                width:135,
                listeners : {
                    'select': function(c, r, i) {
                        B.insertTag(r.get('tag'));
                        B.focus();
                    }
                }

            });
            tb.addField(this.formatCombo);
            
        }
        
        if(!this.disable.format){
            tb.add(
                E('bold'),
                E('italic'),
                E('underline')
            );
        };
        if(!this.disable.fontSize){
            tb.add(
                '-',
                
                
                E('increasefontsize', false, B.adjustFont),
                E('decreasefontsize', false, B.adjustFont)
            );
        };
        
        
        if(this.disable.colors){
            tb.add(
                '-', {
                    id:B.frameId +'-forecolor',
                    cls:'x-btn-icon x-edit-forecolor',
                    clickEvent:'mousedown',
                    tooltip: this.buttonTips['forecolor'] || undefined,
                    tabIndex:-1,
                    menu : new  Roo.menu.ColorMenu({
                        allowReselect: true,
                        focus: Roo.emptyFn,
                        value:'000000',
                        plain:true,
                        selectHandler: function(cp, G){
                            B.execCmd('forecolor', Roo.isSafari || Roo.isIE ? '#'+G : G);
                            B.deferFocus();
                        },
                        scope: B,
                        clickEvent:'mousedown'
                    })
                }, {
                    id:B.frameId +'backcolor',
                    cls:'x-btn-icon x-edit-backcolor',
                    clickEvent:'mousedown',
                    tooltip: this.buttonTips['backcolor'] || undefined,
                    tabIndex:-1,
                    menu : new  Roo.menu.ColorMenu({
                        focus: Roo.emptyFn,
                        value:'FFFFFF',
                        plain:true,
                        allowReselect: true,
                        selectHandler: function(cp, H){
                            if(Roo.isGecko){
                                B.execCmd('useCSS', false);
                                B.execCmd('hilitecolor', H);
                                B.execCmd('useCSS', true);
                                B.deferFocus();
                            }else {
                                B.execCmd(Roo.isOpera ? 'hilitecolor' : 'backcolor', 
                                    Roo.isSafari || Roo.isIE ? '#'+H : H);
                                B.deferFocus();
                            }
                        },
                        scope:B,
                        clickEvent:'mousedown'
                    })
                }
            );
        };
        
        

        if(!this.disable.alignments){
            tb.add(
                '-',
                E('justifyleft'),
                E('justifycenter'),
                E('justifyright')
            );
        };

        
            if(!this.disable.links){
                tb.add(
                    '-',
                    E('createlink', false, B.createLink)    
                );
            };

            if(!this.disable.lists){
                tb.add(
                    '-',
                    E('insertorderedlist'),
                    E('insertunorderedlist')
                );
            }
            if(!this.disable.sourceEdit){
                tb.add(
                    '-',
                    E('sourceedit', true, function(G){
                        this.toggleSourceEdit(G.pressed);
                    })
                );
            }
        
        
        var  F = { };
        
        if (!this.disable.special) {
            F = {
                text: "&#169;",
                cls: 'x-edit-none',
                menu : {
                    items : []
                   }
            };
            for (var  i =0; i < this.specialChars.length; i++) {
                F.menu.items.push({
                    
                    text: this.specialChars[i],
                    handler: function(a,b) {
                        B.insertAtCursor(String.fromCharCode(a.text.replace('&#','').replace(';', '')));
                    },
                    tabIndex:-1
                });
            }

            
            
            tb.add(F);
            
            
        }
        if (this.btns) {
            for(var  i =0; i< this.btns.length;i++) {
                var  b = this.btns[i];
                b.cls =  'x-edit-none';
                b.scope = B;
                tb.add(b);
            }
        
        }

        
        
        
        
        
        this.tb.items.each(function(G){
           if(G.id != B.frameId+ '-sourceedit'){
                G.disable();
            }
        });
        this.rendered = true;
        
        
        B.on('editorevent', this.updateToolbar, this);
        
        
    },
    
    
    
    

    updateToolbar: function(){

        if(!this.editor.activated){
            this.editor.onFirstFocus();
            return;
        }

        var  G = this.tb.items.map, 
            H = this.editor.doc,
            I = this.editor.frameId;

        if(!this.disable.font && !Roo.isSafari){
            

        }
        if(!this.disable.format){
            G[I + '-bold'].toggle(H.queryCommandState('bold'));
            G[I + '-italic'].toggle(H.queryCommandState('italic'));
            G[I + '-underline'].toggle(H.queryCommandState('underline'));
        }
        if(!this.disable.alignments){
            G[I + '-justifyleft'].toggle(H.queryCommandState('justifyleft'));
            G[I + '-justifycenter'].toggle(H.queryCommandState('justifycenter'));
            G[I + '-justifyright'].toggle(H.queryCommandState('justifyright'));
        }
        if(!Roo.isSafari && !this.disable.lists){
            G[I + '-insertorderedlist'].toggle(H.queryCommandState('insertorderedlist'));
            G[I + '-insertunorderedlist'].toggle(H.queryCommandState('insertunorderedlist'));
        }
        
        var  J = this.editor.getAllAncestors();
        if (this.formatCombo) {
            
            
            var  store = this.formatCombo.store;
            this.formatCombo.setValue("");
            for (var  i =0; i < J.length;i++) {
                if (J[i] && store.query('tag',J[i].tagName.toLowerCase(), true).length) {
                    
                    this.formatCombo.setValue(J[i].tagName.toLowerCase());
                    break;
                }
            }
        }

        
        
        
        
        Roo.menu.MenuMgr.hideAll();

        
    },
   
    
    createFontOptions : function(){
        var  K = [], fs = this.fontFamilies, ff, lc;
        for(var  i = 0, len = fs.length; i< len; i++){
            ff = fs[i];
            lc = ff.toLowerCase();
            K.push(
                '<option value="',lc,'" style="font-family:',ff,';"',
                    (this.defaultFont == lc ? ' selected="true">' : '>'),
                    ff,
                '</option>'
            );
        }
        return  K.join('');
    },
    
    toggleSourceEdit : function(L){
        if(L === undefined){
            L = !this.sourceEditMode;
        }

        this.sourceEditMode = L === true;
        var  M = this.tb.items.get(this.editor.frameId +'-sourceedit');
        
        if(M.pressed !== this.editor.sourceEditMode){
            M.toggle(this.editor.sourceEditMode);
            return;
        }
        
        if(this.sourceEditMode){
            this.tb.items.each(function(N){
                if(N.cmd != 'sourceedit'){
                    N.disable();
                }
            });
          
        }else {
            if(this.initialized){
                this.tb.items.each(function(O){
                    O.enable();
                });
            }
            
        }

        
        this.editor.toggleSourceEdit(L);
       
    },
     

    buttonTips : {
        bold : {
            title: 'Bold (Ctrl+B)',
            text: 'Make the selected text bold.',
            cls: 'x-html-editor-tip'
        },
        italic : {
            title: 'Italic (Ctrl+I)',
            text: 'Make the selected text italic.',
            cls: 'x-html-editor-tip'
        },
        underline : {
            title: 'Underline (Ctrl+U)',
            text: 'Underline the selected text.',
            cls: 'x-html-editor-tip'
        },
        increasefontsize : {
            title: 'Grow Text',
            text: 'Increase the font size.',
            cls: 'x-html-editor-tip'
        },
        decreasefontsize : {
            title: 'Shrink Text',
            text: 'Decrease the font size.',
            cls: 'x-html-editor-tip'
        },
        backcolor : {
            title: 'Text Highlight Color',
            text: 'Change the background color of the selected text.',
            cls: 'x-html-editor-tip'
        },
        forecolor : {
            title: 'Font Color',
            text: 'Change the color of the selected text.',
            cls: 'x-html-editor-tip'
        },
        justifyleft : {
            title: 'Align Text Left',
            text: 'Align text to the left.',
            cls: 'x-html-editor-tip'
        },
        justifycenter : {
            title: 'Center Text',
            text: 'Center text in the editor.',
            cls: 'x-html-editor-tip'
        },
        justifyright : {
            title: 'Align Text Right',
            text: 'Align text to the right.',
            cls: 'x-html-editor-tip'
        },
        insertunorderedlist : {
            title: 'Bullet List',
            text: 'Start a bulleted list.',
            cls: 'x-html-editor-tip'
        },
        insertorderedlist : {
            title: 'Numbered List',
            text: 'Start a numbered list.',
            cls: 'x-html-editor-tip'
        },
        createlink : {
            title: 'Hyperlink',
            text: 'Make the selected text a hyperlink.',
            cls: 'x-html-editor-tip'
        },
        sourceedit : {
            title: 'Source Edit',
            text: 'Switch to source editing mode.',
            cls: 'x-html-editor-tip'
        }
    },
    
    onDestroy : function(){
        if(this.rendered){
            
            this.tb.items.each(function(N){
                if(N.menu){
                    N.menu.removeAll();
                    if(N.menu.el){
                        N.menu.el.destroy();
                    }
                }

                N.destroy();
            });
             
        }
    },
    onFirstFocus: function() {
        this.tb.items.each(function(N){
           N.enable();
        });
    }
});









 



Roo.form.HtmlEditor.ToolbarContext = function(A)
{
    
    Roo.apply(this, A);
    
    
}

Roo.form.HtmlEditor.ToolbarContext.types = {
    'IMG' : {
        width : {
            title: "Width",
            width: 40
        },
        height:  {
            title: "Height",
            width: 40
        },
        align: {
            title: "Align",
            opts : [ [""],[ "left"],[ "right"],[ "center"],[ "top"]],
            width : 80
            
        },
        border: {
            title: "Border",
            width: 40
        },
        alt: {
            title: "Alt",
            width: 120
        },
        src : {
            title: "Src",
            width: 220
        }
        
    },
    'A' : {
        name : {
            title: "Name",
            width: 50
        },
        href:  {
            title: "Href",
            width: 220
        } 
        
    },
    'TABLE' : {
        rows : {
            title: "Rows",
            width: 20
        },
        cols : {
            title: "Cols",
            width: 20
        },
        width : {
            title: "Width",
            width: 40
        },
        height : {
            title: "Height",
            width: 40
        },
        border : {
            title: "Border",
            width: 20
        }
    },
    'TD' : {
        width : {
            title: "Width",
            width: 40
        },
        height : {
            title: "Height",
            width: 40
        },   
        align: {
            title: "Align",
            opts : [[""],[ "left"],[ "center"],[ "right"],[ "justify"],[ "char"]],
            width: 40
        },
        valign: {
            title: "Valign",
            opts : [[""],[ "top"],[ "middle"],[ "bottom"],[ "baseline"]],
            width: 40
        },
        colspan: {
            title: "Colspan",
            width: 20
            
        }
    },
    'INPUT' : {
        name : {
            title: "name",
            width: 120
        },
        value : {
            title: "Value",
            width: 120
        },
        width : {
            title: "Width",
            width: 40
        }
    },
    'LABEL' : {
        'for' : {
            title: "For",
            width: 120
        }
    },
    'TEXTAREA' : {
          name : {
            title: "name",
            width: 120
        },
        rows : {
            title: "Rows",
            width: 20
        },
        cols : {
            title: "Cols",
            width: 20
        }
    },
    'SELECT' : {
        name : {
            title: "name",
            width: 120
        },
        selectoptions : {
            title: "Options",
            width: 200
        }
    },
    'BODY' : {
        title : {
            title: "title",
            width: 120,
            disabled : true
        }
    }
};



Roo.apply(Roo.form.HtmlEditor.ToolbarContext.prototype,  {
    
    tb: false,
    
    rendered: false,
    
    editor : false,
    

    disable : false,
    
    
    
    toolbars : false,
    
    init : function(B)
    {
        this.editor = B;
        
        
        var  C = B.frameId;
        var  D = this;
        function  E(id, G, H){
            var  I = C + '-'+ id ;
            return  {
                id : I,
                cmd : id,
                cls : 'x-btn-icon x-edit-'+id,
                enableToggle:G !== false,
                scope: B, 
                handler:H||B.relayBtnCmd,
                clickEvent:'mousedown',
                tooltip: D.buttonTips[id] || undefined, 
                tabIndex:-1
            };
        }
        
        var  F = B.wrap.createChild({
                tag: 'div'
            }, B.wrap.dom.firstChild.nextSibling, true);
        
        
        
         
      
 
        
        var  ty= Roo.form.HtmlEditor.ToolbarContext.types;
        this.toolbars = {};
           
        for (var  i  in   ty) {
            this.toolbars[i] = this.buildToolbar(ty[i],i);
        }

        this.tb = this.toolbars.BODY;
        this.tb.el.show();
        
         
        this.rendered = true;
        
        
        B.on('editorevent', this.updateToolbar, this);
        
        
    },
    
    
    
    

    updateToolbar: function(){

        if(!this.editor.activated){
            this.editor.onFirstFocus();
            return;
        }

        
        var  G = this.editor.getAllAncestors();
        
        
        var  ty= Roo.form.HtmlEditor.ToolbarContext.types;
        var  H = G.length ? (G[0] ?  G[0]  : G[1]) : this.editor.doc.body;
        H = H ? H : this.editor.doc.body;
        H = H.tagName.length ? H : this.editor.doc.body;
        var  tn = H.tagName.toUpperCase();
        H = typeof(ty[tn]) != 'undefined' ? H : this.editor.doc.body;
        tn = H.tagName.toUpperCase();
        if (this.tb.name  == tn) {
            return; 
        }

        this.tb.el.hide();
        
        this.tb =  this.toolbars[tn];
        this.tb.el.show();
        this.tb.fields.each(function(e) {
            e.setValue(H.getAttribute(e.name));
        });
        this.tb.selectedNode = H;
        
        
        Roo.menu.MenuMgr.hideAll();

        
    },
   
       
    
    onDestroy : function(){
        if(this.rendered){
            
            this.tb.items.each(function(I){
                if(I.menu){
                    I.menu.removeAll();
                    if(I.menu.el){
                        I.menu.el.destroy();
                    }
                }

                I.destroy();
            });
             
        }
    },
    onFirstFocus: function() {
        
        this.tb.items.each(function(I){
           I.enable();
        });
    },
    buildToolbar: function(I, nm)
    {
        var  J = this.editor;
         
        var  K = J.wrap.createChild({
                tag: 'div'
            }, J.wrap.dom.firstChild.nextSibling, true);
        
       
        var  tb = new  Roo.Toolbar(K);
        tb.add(nm+ ":&nbsp;");
        for (var  i  in  I) {
            var  item = I[i];
            tb.add(item.title + ":&nbsp;");
            if (item.opts) {
                
                
              
                tb.addField( new  Roo.form.ComboBox({
                    store: new  Roo.data.SimpleStore({
                        id : 'val',
                        fields: ['val'],
                        data : item.opts 
                    }),
                    name : i,
                    displayField:'val',
                    typeAhead: false,
                    mode: 'local',
                    editable : false,
                    triggerAction: 'all',
                    emptyText:'Select',
                    selectOnFocus:true,
                    width: item.width ? item.width  : 130,
                    listeners : {
                        'select': function(c, r, i) {
                            tb.selectedNode.setAttribute(c.name, r.get('val'));
                        }
                    }

                }));
                continue;
                    
                
                
                
                
                tb.addField( new  Roo.form.TextField({
                    name: i,
                    width: 100,
                    
                    value: ''
                }));
                continue;
            }

            tb.addField( new  Roo.form.TextField({
                name: i,
                width: item.width,
                
                value: '',
                listeners: {
                    'change' : function(f, nv, ov) {
                        tb.selectedNode.setAttribute(f.name, nv);
                    }
                }
            }));
             
        }

        tb.el.on('click', function(e){
            e.preventDefault(); 
        });
        tb.el.setVisibilityMode( Roo.Element.DISPLAY);
        tb.el.hide();
        tb.name = nm;
        
        return  tb;
         
        
    }
    
    
    
    
});








 


Roo.form.BasicForm = function(el, A){
    this.allItems = [];
    this.childForms = [];
    Roo.apply(this, A);
    

     
     
    this.items = new  Roo.util.MixedCollection(false, function(o){
        return  o.id || (o.id = Roo.id());
    });
    this.addEvents({
        

        beforeaction: true,
        

        actionfailed : true,
        

        actioncomplete : true
    });
    if(el){
        this.initEl(el);
    }

    Roo.form.BasicForm.superclass.constructor.call(this);
};

Roo.extend(Roo.form.BasicForm, Roo.util.Observable, {
    

    

    

    

    

    

    

    timeout: 30,

    
    activeAction : null,

    

    trackResetOnLoad : false,
    
    
    

    childForms : false,
    
    

    allItems : false,
    
    

    waitMsgTarget : undefined,

    
    initEl : function(el){
        this.el = Roo.get(el);
        this.id = this.el.id || Roo.id();
        this.el.on('submit', this.onSubmit, this);
        this.el.addClass('x-form');
    },

    
    onSubmit : function(e){
        e.stopEvent();
    },

    

    isValid : function(){
        var  B = true;
        this.items.each(function(f){
           if(!f.validate()){
               B = false;
           }
        });
        return  B;
    },

    

    isDirty : function(){
        var  C = false;
        this.items.each(function(f){
           if(f.isDirty()){
               C = true;
               return  false;
           }
        });
        return  C;
    },

    

    doAction : function(D, E){
        if(typeof  D == 'string'){
            D = new  Roo.form.Action.ACTION_TYPES[D](this, E);
        }
        if(this.fireEvent('beforeaction', this, D) !== false){
            this.beforeAction(D);
            D.run.defer(100, D);
        }
        return  this;
    },

    

    submit : function(F){
        this.doAction('submit', F);
        return  this;
    },

    

    load : function(G){
        this.doAction('load', G);
        return  this;
    },

    

    updateRecord : function(H){
        H.beginEdit();
        var  fs = H.fields;
        fs.each(function(f){
            var  I = this.findField(f.name);
            if(I){
                H.set(f.name, I.getValue());
            }
        }, this);
        H.endEdit();
        return  this;
    },

    

    loadRecord : function(I){
        this.setValues(I.data);
        return  this;
    },

    
    beforeAction : function(J){
        var  o = J.options;
        if(o.waitMsg){
            if(this.waitMsgTarget === true){
                this.el.mask(o.waitMsg, 'x-mask-loading');
            }else  if(this.waitMsgTarget){
                this.waitMsgTarget = Roo.get(this.waitMsgTarget);
                this.waitMsgTarget.mask(o.waitMsg, 'x-mask-loading');
            }else {
                Roo.MessageBox.wait(o.waitMsg, o.waitTitle || this.waitTitle || 'Please Wait...');
            }
        }
    },

    
    afterAction : function(K, L){
        this.activeAction = null;
        var  o = K.options;
        if(o.waitMsg){
            if(this.waitMsgTarget === true){
                this.el.unmask();
            }else  if(this.waitMsgTarget){
                this.waitMsgTarget.unmask();
            }else {
                Roo.MessageBox.updateProgress(1);
                Roo.MessageBox.hide();
            }
        }
        if(L){
            if(o.reset){
                this.reset();
            }

            Roo.callback(o.success, o.scope, [this, K]);
            this.fireEvent('actioncomplete', this, K);
        }else {
            Roo.callback(o.failure, o.scope, [this, K]);
            this.fireEvent('actionfailed', this, K);
        }
    },

    

    findField : function(id){
        var  M = this.items.get(id);
        if(!M){
            this.items.each(function(f){
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){
                    M = f;
                    return  false;
                }
            });
        }
        return  M || null;
    },

    

    addForm : function(N){
       
        this.childForms.push(N);
        Roo.each(N.allItems, function (fe) {
            
            if (this.findField(fe.name)) { 
                return;
            }

            this.add( new  Roo.form.Hidden({
                name : fe.name
            }));
        }, this);
        
    },
    

    markInvalid : function(O){
        if(O  instanceof  Array){
            for(var  i = 0, len = O.length; i < len; i++){
                var  fieldError = O[i];
                var  f = this.findField(fieldError.id);
                if(f){
                    f.markInvalid(fieldError.msg);
                }
            }
        }else {
            var  M, id;
            for(id  in  O){
                if(typeof  O[id] != 'function' && (M = this.findField(id))){
                    M.markInvalid(O[id]);
                }
            }
        }

        Roo.each(this.childForms || [], function (f) {
            f.markInvalid(O);
        });
        
        return  this;
    },

    

    setValues : function(P){
        if(P  instanceof  Array){ 
            for(var  i = 0, len = P.length; i < len; i++){
                var  v = P[i];
                var  f = this.findField(v.id);
                if(f){
                    f.setValue(v.value);
                    if(this.trackResetOnLoad){
                        f.originalValue = f.getValue();
                    }
                }
            }
        }else { 
            var  M, id;
            for(id  in  P){
                if(typeof  P[id] != 'function' && (M = this.findField(id))){
                    
                    if (M.setFromData && 
                        M.valueField && 
                        M.displayField &&
                        
                        
                        
                        (M.store && !M.store.isLocal)
                        ) {
                        
                        var  sd = { };
                        sd[M.valueField] = typeof(P[M.hiddenName]) == 'undefined' ? '' : P[M.hiddenName];
                        sd[M.displayField] = typeof(P[M.name]) == 'undefined' ? '' : P[M.name];
                        M.setFromData(sd);
                        
                    } else  {
                        M.setValue(P[id]);
                    }
                    
                    
                    if(this.trackResetOnLoad){
                        M.originalValue = M.getValue();
                    }
                }
            }
        }

         
        Roo.each(this.childForms || [], function (f) {
            f.setValues(P);
        });
                
        return  this;
    },

    

    getValues : function(Q){
        if (this.childForms) {
            
            Roo.each(this.childForms, function (f) {
                if (f.allFields) {
                    Roo.each(f.allFields, function (e) {
                        if (e.name && e.getValue && this.findField(e.name)) {
                            this.findField(e.name).setValue(e.getValue());
                        }
                    });
                }
            }, this);
        }
        
        
        
        var  fs = Roo.lib.Ajax.serializeForm(this.el.dom);
        if(Q === true){
            return  fs;
        }
        return  Roo.urlDecode(fs);
    },

    

    clearInvalid : function(){
        this.items.each(function(f){
           f.clearInvalid();
        });
        
        Roo.each(this.childForms || [], function (f) {
            f.clearInvalid();
        });
        
        
        return  this;
    },

    

    reset : function(){
        this.items.each(function(f){
            f.reset();
        });
        
        Roo.each(this.childForms || [], function (f) {
            f.reset();
        });
       
        
        return  this;
    },

    

    add : function(){
        this.items.addAll(Array.prototype.slice.call(arguments, 0));
        return  this;
    },


    

    remove : function(R){
        this.items.remove(R);
        return  this;
    },

    

    render : function(){
        this.items.each(function(f){
            if(f.isFormField && !f.rendered && document.getElementById(f.id)){ 
                f.applyTo(f.id);
            }
        });
        return  this;
    },

    

    applyToFields : function(o){
        this.items.each(function(f){
           Roo.apply(f, o);
        });
        return  this;
    },

    

    applyIfToFields : function(o){
        this.items.each(function(f){
           Roo.applyIf(f, o);
        });
        return  this;
    }
});


Roo.BasicForm = Roo.form.BasicForm;





Roo.form.Form = function(A){
    var  B =  [];
    if (A.items) {
        B = A.items;
        delete  A.items;
    }

   
    
    Roo.form.Form.superclass.constructor.call(this, null, A);
    this.url = this.url || this.action;
    if(!this.root){
        this.root = new  Roo.form.Layout(Roo.applyIf({
            id: Roo.id()
        }, A));
    }

    this.active = this.root;
    

    this.buttons = [];
    this.allItems = [];
    this.addEvents({
        

        clientvalidation: true,
        

        rendered : true
    });
    
    Roo.each(B, this.addxtype, this);
    
    
    
};

Roo.extend(Roo.form.Form, Roo.form.BasicForm, {
    

    

    

    buttonAlign:'center',

    

    minButtonWidth:75,

    

    labelAlign:'left',

    

    monitorValid : false,

    

    monitorPoll : 200,

  
    

    column : function(c){
        var  C = new  Roo.form.Column(c);
        this.start(C);
        if(arguments.length > 1){ 
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return  C;
    },

    

    fieldset : function(c){
        var  fs = new  Roo.form.FieldSet(c);
        this.start(fs);
        if(arguments.length > 1){ 
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return  fs;
    },

    

    container : function(c){
        var  l = new  Roo.form.Layout(c);
        this.start(l);
        if(arguments.length > 1){ 
            this.add.apply(this, Array.prototype.slice.call(arguments, 1));
            this.end();
        }
        return  l;
    },

    

    start : function(c){
        
        Roo.applyIf(c, {'labelAlign': this.active.labelAlign, 'labelWidth': this.active.labelWidth, 'itemCls': this.active.itemCls});
        this.active.stack.push(c);
        c.ownerCt = this.active;
        this.active = c;
        return  this;
    },

    

    end : function(){
        if(this.active == this.root){
            return  this;
        }

        this.active = this.active.ownerCt;
        return  this;
    },

    

    add : function(){
        this.active.stack.push.apply(this.active.stack, arguments);
        this.allItems.push.apply(this.allItems,arguments);
        var  r = [];
        for(var  i = 0, a = arguments, len = a.length; i < len; i++) {
            if(a[i].isFormField){
                r.push(a[i]);
            }
        }
        if(r.length > 0){
            Roo.form.Form.superclass.add.apply(this, r);
        }
        return  this;
    },
    

    
    
    
     

    findbyId : function(id)
    {
        var  D = false;
        if (!id) {
            return  D;
        }

        Ext.each(this.allItems, function(f){
            if (f.id == id || f.name == id ){
                D = f;
                return  false;
            }
        });
        return  D;
    },

    
    
    

    render : function(ct){
        ct = Roo.get(ct);
        var  o = this.autoCreate || {
            tag: 'form',
            method : this.method || 'POST',
            id : this.id || Roo.id()
        };
        this.initEl(ct.createChild(o));

        this.root.render(this.el);

        this.items.each(function(f){
            f.render('x-form-el-'+f.id);
        });

        if(this.buttons.length > 0){
            
            var  tb = this.el.createChild({cls:'x-form-btns-ct', cn: {
                cls:"x-form-btns x-form-btns-"+this.buttonAlign,
                html:'<table cellspacing="0"><tbody><tr></tr></tbody></table><div class="x-clear"></div>'
            }}, null, true);
            var  tr = tb.getElementsByTagName('tr')[0];
            for(var  i = 0, len = this.buttons.length; i < len; i++) {
                var  b = this.buttons[i];
                var  td = document.createElement('td');
                td.className = 'x-form-btn-td';
                b.render(tr.appendChild(td));
            }
        }
        if(this.monitorValid){ 
            this.startMonitoring();
        }

        this.fireEvent('rendered', this);
        return  this;
    },

    

    addButton : function(E, F, G){
        var  bc = {
            handler: F,
            scope: G,
            minWidth: this.minButtonWidth,
            hideParent:true
        };
        if(typeof  E == "string"){
            bc.text = E;
        }else {
            Roo.apply(bc, E);
        }
        var  H = new  Roo.Button(null, bc);
        this.buttons.push(H);
        return  H;
    },

     

    
    addxtype : function()
    {
        var  ar = Array.prototype.slice.call(arguments, 0);
        var  I = false;
        for(var  i = 0; i < ar.length; i++) {
            if (!ar[i]) {
                continue; 
                
                
            }
            
            if (Roo.form[ar[i].xtype]) {
                ar[i].form = this;
                var  fe = Roo.factory(ar[i], Roo.form);
                if (!I) {
                    I = fe;
                }

                fe.form = this;
                if (fe.store) {
                    fe.store.form = this;
                }
                if (fe.isLayout) {  
                         
                    this.start(fe);
                    this.allItems.push(fe);
                    if (fe.items && fe.addxtype) {
                        fe.addxtype.apply(fe, fe.items);
                        delete  fe.items;
                    }

                     this.end();
                    continue;
                }

                
                
                 
                this.add(fe);
              
            }
            if (ar[i].xtype == 'Button') {  
                
                
                this.addButton(ar[i]);
                this.allItems.push(fe);
                continue;
            }
            
            if (ar[i].xtype == 'end') { 
                alert('end is not supported on xtype any more, use items');
            
            
            }
            
        }
        return  I;
    },
    
    

    startMonitoring : function(){
        if(!this.bound){
            this.bound = true;
            Roo.TaskMgr.start({
                run : this.bindHandler,
                interval : this.monitorPoll || 200,
                scope: this
            });
        }
    },

    

    stopMonitoring : function(){
        this.bound = false;
    },

    
    bindHandler : function(){
        if(!this.bound){
            return  false; 
        }
        var  J = true;
        this.items.each(function(f){
            if(!f.isValid(true)){
                J = false;
                return  false;
            }
        });
        for(var  i = 0, len = this.buttons.length; i < len; i++){
            var  H = this.buttons[i];
            if(H.formBind === true && H.disabled === J){
                H.setDisabled(!J);
            }
        }

        this.fireEvent('clientvalidation', this, J);
    }
    
    
    
    
    
    
    
    
});



Roo.Form = Roo.form.Form;



 
 

 
 

Roo.form.Action = function(A, B){
    this.form = A;
    this.options = B || {};
};


Roo.form.Action.CLIENT_INVALID = 'client';


 Roo.form.Action.SERVER_INVALID = 'server';
 

Roo.form.Action.CONNECT_FAILURE = 'connect';


Roo.form.Action.LOAD_FAILURE = 'load';

Roo.form.Action.prototype = {
    type : 'default',
    failureType : undefined,
    response : undefined,
    result : undefined,

    
    run : function(C){

    },

    
    success : function(D){

    },

    
    handleResponse : function(E){

    },

    
    failure : function(F){
        this.response = F;
        this.failureType = Roo.form.Action.CONNECT_FAILURE;
        this.form.afterAction(this, false);
    },

    processResponse : function(G){
        this.response = G;
        if(!G.responseText){
            return  true;
        }

        this.result = this.handleResponse(G);
        return  this.result;
    },

    
    getUrl : function(H){
        var  I = this.options.url || this.form.url || this.form.el.dom.action;
        if(H){
            var  p = this.getParams();
            if(p){
                I += (I.indexOf('?') != -1 ? '&' : '?') + p;
            }
        }
        return  I;
    },

    getMethod : function(){
        return  (this.options.method || this.form.method || this.form.el.dom.method || 'POST').toUpperCase();
    },

    getParams : function(){
        var  bp = this.form.baseParams;
        var  p = this.options.params;
        if(p){
            if(typeof  p == "object"){
                p = Roo.urlEncode(Roo.applyIf(p, bp));
            }else  if(typeof  p == 'string' && bp){
                p += '&' + Roo.urlEncode(bp);
            }
        }else  if(bp){
            p = Roo.urlEncode(bp);
        }
        return  p;
    },

    createCallback : function(){
        return  {
            success: this.success,
            failure: this.failure,
            scope: this,
            timeout: (this.form.timeout*1000),
            upload: this.form.fileUpload ? this.success : undefined
        };
    }
};

Roo.form.Action.Submit = function(J, K){
    Roo.form.Action.Submit.superclass.constructor.call(this, J, K);
};

Roo.extend(Roo.form.Action.Submit, Roo.form.Action, {
    type : 'submit',

    run : function(){
        var  o = this.options;
        var  L = this.getMethod();
        var  M = L == 'POST';
        if(o.clientValidation === false || this.form.isValid()){
            Roo.Ajax.request(Roo.apply(this.createCallback(), {
                form:this.form.el.dom,
                url:this.getUrl(!M),
                method: L,
                params:M ? this.getParams() : null,
                isUpload: this.form.fileUpload
            }));

        }else  if (o.clientValidation !== false){ 
            this.failureType = Roo.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    success : function(N){
        var  O = this.processResponse(N);
        if(O === true || O.success){
            this.form.afterAction(this, true);
            return;
        }
        if(O.errors){
            this.form.markInvalid(O.errors);
            this.failureType = Roo.form.Action.SERVER_INVALID;
        }

        this.form.afterAction(this, false);
    },

    handleResponse : function(P){
        if(this.form.errorReader){
            var  rs = this.form.errorReader.read(P);
            var  errors = [];
            if(rs.records){
                for(var  i = 0, len = rs.records.length; i < len; i++) {
                    var  r = rs.records[i];
                    errors[i] = r.data;
                }
            }
            if(errors.length < 1){
                errors = null;
            }
            return  {
                success : rs.success,
                errors : errors
            };
        }
        var  Q = false;
        try {
            Q = Roo.decode(P.responseText);
        } catch (e) {
            ret = {
                success: false,
                errorMsg: "Failed to read server message: " + response.responseText,
                errors : []
            };
        }
        return  Q;
        
    }
});


Roo.form.Action.Load = function(R, S){
    Roo.form.Action.Load.superclass.constructor.call(this, R, S);
    this.reader = this.form.reader;
};

Roo.extend(Roo.form.Action.Load, Roo.form.Action, {
    type : 'load',

    run : function(){
        Roo.Ajax.request(Roo.apply(
                this.createCallback(), {
                    method:this.getMethod(),
                    url:this.getUrl(false),
                    params:this.getParams()
        }));
    },

    success : function(T){
        var  U = this.processResponse(T);
        if(U === true || !U.success || !U.data){
            this.failureType = Roo.form.Action.LOAD_FAILURE;
            this.form.afterAction(this, false);
            return;
        }

        this.form.clearInvalid();
        this.form.setValues(U.data);
        this.form.afterAction(this, true);
    },

    handleResponse : function(V){
        if(this.form.reader){
            var  rs = this.form.reader.read(V);
            var  data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return  {
                success : rs.success,
                data : data
            };
        }
        return  Roo.decode(V.responseText);
    }
});

Roo.form.Action.ACTION_TYPES = {
    'load' : Roo.form.Action.Load,
    'submit' : Roo.form.Action.Submit
};


 


Roo.form.Layout = function(A){
    var  B = [];
    if (A.items) {
        B = A.items;
        delete  A.items;
    }

    Roo.form.Layout.superclass.constructor.call(this, A);
    this.stack = [];
    Roo.each(B, this.addxtype, this);
     
};

Roo.extend(Roo.form.Layout, Roo.Component, {
    

    

    

    

    

    clear : true,
    

    labelSeparator : ':',
    

    hideLabels : false,

    
    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct'},
    
    isLayout : true,
    
    
    onRender : function(ct, C){
        if(this.el){ 
            this.el = Roo.get(this.el);
        }else  {  
            var  cfg = this.getAutoCreate();
            this.el = ct.createChild(cfg, C);
        }
        if(this.style){
            this.el.applyStyles(this.style);
        }
        if(this.labelAlign){
            this.el.addClass('x-form-label-'+this.labelAlign);
        }
        if(this.hideLabels){
            this.labelStyle = "display:none";
            this.elementStyle = "padding-left:0;";
        }else {
            if(typeof  this.labelWidth == 'number'){
                this.labelStyle = "width:"+this.labelWidth+"px;";
                this.elementStyle = "padding-left:"+((this.labelWidth+(typeof  this.labelPad == 'number' ? this.labelPad : 5))+'px')+";";
            }
            if(this.labelAlign == 'top'){
                this.labelStyle = "width:auto;";
                this.elementStyle = "padding-left:0;";
            }
        }
        var  D = this.stack;
        var  E = D.length;
        if(E > 0){
            if(!this.fieldTpl){
                var  t = new  Roo.Template(
                    '<div class="x-form-item {5}">',
                        '<label for="{0}" style="{2}">{1}{4}</label>',
                        '<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
                        '</div>',
                    '</div><div class="x-form-clear-left"></div>'
                );
                t.disableFormats = true;
                t.compile();
                Roo.form.Layout.prototype.fieldTpl = t;
            }
            for(var  i = 0; i < E; i++) {
                if(D[i].isFormField){
                    this.renderField(D[i]);
                }else {
                    this.renderComponent(D[i]);
                }
            }
        }
        if(this.clear){
            this.el.createChild({cls:'x-form-clear'});
        }
    },

    
    renderField : function(f){
        f.fieldEl = Roo.get(this.fieldTpl.append(this.el, [
               f.id, 
               f.fieldLabel, 
               f.labelStyle||this.labelStyle||'', 
               this.elementStyle||'', 
               typeof  f.labelSeparator == 'undefined' ? this.labelSeparator : f.labelSeparator, 
               f.itemCls||this.itemCls||''  
       ], true).getPrevSibling());
    },

    
    renderComponent : function(c){
        c.render(c.isLayout ? this.el : this.el.createChild());    
    },
    

    addxtype : function(o)
    {
        
        o.form = this.form;
        var  fe = Roo.factory(o, Roo.form);
        this.form.allItems.push(fe);
        this.stack.push(fe);
        
        if (fe.isFormField) {
            this.form.items.add(fe);
        }
         
        return  fe;
    }
});



Roo.form.Column = function(F){
    Roo.form.Column.superclass.constructor.call(this, F);
};

Roo.extend(Roo.form.Column, Roo.form.Layout, {
    

    


    
    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct x-form-column'},

    
    onRender : function(ct, G){
        Roo.form.Column.superclass.onRender.call(this, ct, G);
        if(this.width){
            this.el.setWidth(this.width);
        }
    }
});





 
Roo.form.Row = function(H){
    Roo.form.Row.superclass.constructor.call(this, H);
};
 
Roo.extend(Roo.form.Row, Roo.form.Layout, {
      

    

    defaultAutoCreate : {tag: 'div', cls: 'x-form-ct x-form-row'},
    
    padWidth : 20,
    
    onRender : function(ct, I){
        
        if(!this.rowTpl){
            var  t = new  Roo.Template(
                '<div class="x-form-item {5}" style="float:left;width:{6}px">',
                    '<label for="{0}" style="{2}">{1}{4}</label>',
                    '<div class="x-form-element" id="x-form-el-{0}" style="{3}">',
                    '</div>',
                '</div>'
            );
            t.disableFormats = true;
            t.compile();
            Roo.form.Layout.prototype.rowTpl = t;
        }

        this.fieldTpl = this.rowTpl;
        
        
        var  J = 100;
        
        if ((this.labelAlign != 'top')) {
            if (typeof  this.labelWidth == 'number') {
                J = this.labelWidth
            }

            this.padWidth =  20 + J;
            
        }

        
        Roo.form.Column.superclass.onRender.call(this, ct, I);
        if(this.width){
            this.el.setWidth(this.width);
        }
        if(this.height){
            this.el.setHeight(this.height);
        }
    },
    
    
    renderField : function(f){
        f.fieldEl = this.fieldTpl.append(this.el, [
               f.id, f.fieldLabel,
               f.labelStyle||this.labelStyle||'',
               this.elementStyle||'',
               typeof  f.labelSeparator == 'undefined' ? this.labelSeparator : f.labelSeparator,
               f.itemCls||this.itemCls||'',
               f.width ? f.width + this.padWidth : 160 + this.padWidth
       ],true);
    }
});
 



Roo.form.FieldSet = function(K){
    Roo.form.FieldSet.superclass.constructor.call(this, K);
};

Roo.extend(Roo.form.FieldSet, Roo.form.Layout, {
    

    


    
    defaultAutoCreate : {tag: 'fieldset', cn: {tag:'legend'}},

    
    onRender : function(ct, L){
        Roo.form.FieldSet.superclass.onRender.call(this, ct, L);
        if(this.legend){
            this.setLegend(this.legend);
        }
    },

    
    setLegend : function(M){
        if(this.rendered){
            this.el.child('legend').update(M);
        }
    }
});




Roo.form.VTypes = function(){
    
    var  A = /^[a-zA-Z_]+$/;
    var  B = /^[a-zA-Z0-9_]+$/;
    var  C = /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/;
    var  D = /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;

    
    return  {
        

        'email' : function(v){
            return  C.test(v);
        },
        

        'emailText' : 'This field should be an e-mail address in the format "user@domain.com"',
        

        'emailMask' : /[a-z0-9_\.\-@]/i,

        

        'url' : function(v){
            return  D.test(v);
        },
        

        'urlText' : 'This field should be a URL in the format "http:/'+'/www.domain.com"',
        
        

        'alpha' : function(v){
            return  A.test(v);
        },
        

        'alphaText' : 'This field should only contain letters and _',
        

        'alphaMask' : /[a-z_]/i,

        

        'alphanum' : function(v){
            return  B.test(v);
        },
        

        'alphanumText' : 'This field should only contain letters, numbers and _',
        

        'alphanumMask' : /[a-z0-9_]/i
    };
}();




Roo.form.FCKeditor = function(A){
    Roo.form.FCKeditor.superclass.constructor.call(this, A);
    this.addEvents({
         

        editorinit : true
    });
    
    
};
Roo.form.FCKeditor.editors = { };
Roo.extend(Roo.form.FCKeditor, Roo.form.TextArea,
{
    
    
    
    
    

    fckconfig : false,
    
    

    toolbarSet : 'Basic',
    
 
    basePath : '/fckeditor/',
    
    
    frame : false,
    
    value : '',
    
   
    onRender : function(ct, B)
    {
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                style:"width:300px;height:60px;",
                autocomplete: "off"
            };
        }

        Roo.form.FCKeditor.superclass.onRender.call(this, ct, B);
        

        
        Roo.form.FCKeditor.editors[this.getId()] = this;
         

        this.replaceTextarea() ;
        
    },
    
    getEditor : function() {
        return  this.fckEditor;
    },
    

    
    
    setValue : function(C)
    {
        
        
        if(typeof(C) == 'undefined') { 
            return;
        }

        Roo.form.FCKeditor.superclass.setValue.apply(this,[C]);
        
        
        
            
        
        
        
        if(!this.getEditor()) {
            return;
        }

        
        this.getEditor().SetData(C);
        
        

    },

    

    getValue : function()
    {
        
        if (this.frame && this.frame.dom.style.display == 'none') {
            return  Roo.form.FCKeditor.superclass.getValue.call(this);
        }
        
        if(!this.el || !this.getEditor()) {
           
           
            return  this.value;
        }
       
        
        var  D=this.getEditor().GetData();
        Roo.form.FCKeditor.superclass.setValue.apply(this,[D]);
        return  Roo.form.FCKeditor.superclass.getValue.call(this);
        

    },

    

    getRawValue : function()
    {
        if (this.frame && this.frame.dom.style.display == 'none') {
            return  Roo.form.FCKeditor.superclass.getRawValue.call(this);
        }
        
        if(!this.el || !this.getEditor()) {
            
            return  this.value;
            return;
        }
        
        
        
        var  E=this.getEditor().GetData();
        Roo.form.FCKeditor.superclass.setRawValue.apply(this,[E]);
        return  Roo.form.FCKeditor.superclass.getRawValue.call(this);
         
    },
    
    setSize : function(w,h) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        Roo.form.FCKeditor.superclass.setSize.apply(this, [w, h]);
        
        this.frame.dom.setAttribute('width', w);
        this.frame.dom.setAttribute('height', h);
        this.frame.setSize(w,h);
        
    },
    
    toggleSourceEdit : function(F) {
        
      
         
        this.el.dom.style.display = F ? '' : 'none';
        this.frame.dom.style.display = F ?  'none' : '';
        
    },
    
    
    focus: function(G)
    {
        if (this.frame.dom.style.display == 'none') {
            return  Roo.form.FCKeditor.superclass.focus.call(this);
        }
        if(!this.el || !this.getEditor()) {
            this.focus.defer(100,this, [G]); 
            return;
        }
        
        
        
        
        var  H = this.getEditor().EditorDocument.getElementsByTagName(G);
        this.getEditor().Focus();
        if (H.length) {
            if (!this.getEditor().Selection.GetSelection()) {
                this.focus.defer(100,this, [G]); 
                return;
            }
            
            
            var  r = this.getEditor().EditorDocument.createRange();
            r.setStart(H[0],0);
            r.setEnd(H[0],0);
            this.getEditor().Selection.GetSelection().removeAllRanges();
            this.getEditor().Selection.GetSelection().addRange(r);
            this.getEditor().Focus();
        }
        
    },
    
    
    
    replaceTextarea : function()
    {
        if ( document.getElementById( this.getId() + '___Frame' ) )
            return ;
        
        
            
        var  I = document.getElementById( this.getId() );
        
        var  J = document.getElementsByName( this.getId() ) ;
         
        I.style.display = 'none' ;

        if ( I.tabIndex ) {            
            this.TabIndex = I.tabIndex ;
        }

        
        this._insertHtmlBefore( this._getConfigHtml(), I ) ;
        this._insertHtmlBefore( this._getIFrameHtml(), I ) ;
        this.frame = Roo.get(this.getId() + '___Frame')
    },
    
    _getConfigHtml : function()
    {
        var  K = '' ;

        for ( var  o  in  this.fckconfig ) {
            K += K.length > 0  ? '&amp;' : '';
            K += encodeURIComponent( o ) + '=' + encodeURIComponent( this.fckconfig[o] ) ;
        }

        return  '<input type="hidden" id="' + this.getId() + '___Config" value="' + K + '" style="display:none" />' ;
    },
    
    
    _getIFrameHtml : function()
    {
        var  L = 'fckeditor.html' ;
        


        var  M = this.basePath + 'editor/' + L + '?InstanceName=' + encodeURIComponent( this.getId() ) ;
        M += this.toolbarSet ? ( '&amp;Toolbar=' + this.toolbarSet)  : '';
        
        
        var  N = '<iframe id="' + this.getId() +
            '___Frame" src="' + M +
            '" width="' + this.width +
            '" height="' + this.height + '"' +
            (this.tabIndex ?  ' tabindex="' + this.tabIndex + '"' :'' ) +
            ' frameborder="0" scrolling="no"></iframe>' ;

        return  N ;
    },
    
    _insertHtmlBefore : function( O, P )
    {
        if ( P.insertAdjacentHTML )	{
            
            P.insertAdjacentHTML( 'beforeBegin', O ) ;
        } else  { 
            var  oRange = document.createRange() ;
            oRange.setStartBefore( P ) ;
            var  oFragment = oRange.createContextualFragment( O );
            P.parentNode.insertBefore( oFragment, P ) ;
        }
    }
    
    
  
    
    
    
    

});



function  Q(R){
    var  f = Roo.form.FCKeditor.editors[R.Name];
    f.fckEditor = R;
    
    f.fireEvent('editorinit', f, R);
} 
  

 



















Roo.form.GridField = function(A){
    Roo.form.GridField.superclass.constructor.call(this, A);
     
};

Roo.extend(Roo.form.GridField, Roo.form.Field,  {
    

    width : 100,
    

    height : 50,
     

    xgrid : false, 
    

   
    defaultAutoCreate : { tag: 'input', type: 'hidden', autocomplete: 'off'},
    

    addTitle : false,
    
    onResize : function(){
        Roo.form.Field.superclass.onResize.apply(this, arguments);
    },

    initEvents : function(){
        
        
       
    },


    getResizeEl : function(){
        return  this.wrap;
    },

    getPositionEl : function(){
        return  this.wrap;
    },

    
    onRender : function(ct, B){
        
        this.style = this.style || 'overflow: hidden; border:1px solid #c3daf9;';
        var  C = this.style;
        delete  this.style;
        
        Roo.form.DisplayImage.superclass.onRender.call(this, ct, B);
        this.wrap = this.el.wrap({cls: ''}); 
        this.viewEl = this.wrap.createChild({ tag: 'div' });
        if (C) {
            this.viewEl.applyStyles(C);
        }
        if (this.width) {
            this.viewEl.setWidth(this.width);
        }
        if (this.height) {
            this.viewEl.setHeight(this.height);
        }

        
        
        
        
        this.grid = new  Roo.grid[this.xgrid.xtype](this.viewEl, this.xgrid);
        
        
        this.grid.render();
        this.grid.getDataSource().on('remove', this.refreshValue, this);
        this.grid.getDataSource().on('update', this.refreshValue, this);
        this.grid.on('afteredit', this.refreshValue, this);
 
    },
     
    
    

    setValue : function(v){
        
        v = v || []; 
        
        if (this.grid && this.grid.getDataSource() && typeof(v) != 'undefined') {
            var  ds = this.grid.getDataSource();
            
            var  data = {}

            data[ds.reader.meta.root ] =  typeof(v) == 'string' ? Roo.decode(v) : v;
            ds.loadData( data);
        }

        Roo.form.GridField.superclass.setValue.call(this, v);
        this.refreshValue();
        
    },
    
    
    refreshValue: function() {
         var  D = [];
        this.grid.getDataSource().each(function(r) {
            D.push(r.data);
        });
        this.el.dom.value = Roo.encode(D);
    }
    
     
    
    
});

 



 
Roo.DDView = function(A, B, C) {
    Roo.DDView.superclass.constructor.apply(this, arguments);
    this.getEl().setStyle("outline", "0px none");
    this.getEl().unselectable();
    if (this.dragGroup) {
		this.setDraggable(this.dragGroup.split(","));
    }
    if (this.dropGroup) {
		this.setDroppable(this.dropGroup.split(","));
    }
    if (this.deletable) {
    	this.setDeletable();
    }

    this.isDirtyFlag = false;
	this.addEvents({
		"drop" : true
	});
};

Roo.extend(Roo.DDView, Roo.View, {









	isFormField: true,

	reset: Roo.emptyFn,
	
	clearInvalid: Roo.form.Field.prototype.clearInvalid,

	validate: function() {
		return  true;
	},
	
	destroy: function() {
		this.purgeListeners();
		this.getEl.removeAllListeners();
		this.getEl().remove();
		if (this.dragZone) {
			if (this.dragZone.destroy) {
				this.dragZone.destroy();
			}
		}
		if (this.dropZone) {
			if (this.dropZone.destroy) {
				this.dropZone.destroy();
			}
		}
	},



	getName: function() {
		return  this.name;
	},



	setValue: function(v) {
		if (!this.store) {
			throw  "DDView.setValue(). DDView must be constructed with a valid Store";
		}
		var  D = {};
		D[this.store.reader.meta.root] = v ? [].concat(v) : [];
		this.store.proxy = new  Roo.data.MemoryProxy(D);
		this.store.load();
	},



	getValue: function() {
		var  E = '(';
		this.store.each(function(F) {
			E += F.id + ',';
		});
		return  E.substr(0, E.length - 1) + ')';
	},
	
	getIds: function() {
		var  i = 0, F = new  Array(this.store.getCount());
		this.store.each(function(G) {
			F[i++] = G.id;
		});
		return  F;
	},
	
	isDirty: function() {
		return  this.isDirtyFlag;
	},



    getTargetFromEvent : function(e) {
		var  G = e.getTarget();
		while ((G !== null) && (G.parentNode != this.el.dom)) {
    		G = G.parentNode;
		}
		if (!G) {
			G = this.el.dom.lastChild || this.el.dom;
		}
		return  G;
    },



    getDragData : function(e) {
        var  H = this.findItemFromChild(e.getTarget());
		if(H) {
			this.handleSelection(e);
			var  selNodes = this.getSelectedNodes();
            var  dragData = {
                source: this,
                copy: this.copy || (this.allowCopy && e.ctrlKey),
                nodes: selNodes,
                records: []
			};
			var  selectedIndices = this.getSelectedIndexes();
			for (var  i = 0; i < selectedIndices.length; i++) {
				dragData.records.push(this.store.getAt(selectedIndices[i]));
			}
			if (selNodes.length == 1) {
				dragData.ddel = H.cloneNode(true);	
			} else  {
				var  div = document.createElement('div'); 
				div.className = 'multi-proxy';
				for (var  i = 0, len = selNodes.length; i < len; i++) {
					div.appendChild(selNodes[i].cloneNode(true));
				}

				dragData.ddel = div;
			}
            
            
			return  dragData;
		}
        
		return  false;
    },
    


    setDraggable: function(I) {
    	if (I  instanceof  Array) {
    		Roo.each(I, this.setDraggable, this);
    		return;
    	}
    	if (this.dragZone) {
    		this.dragZone.addToGroup(I);
    	} else  {
			this.dragZone = new  Roo.dd.DragZone(this.getEl(), {
				containerScroll: true,
				ddGroup: I 

			});

			if (!this.multiSelect) { this.singleSelect = true; }



			this.dragZone.getDragData = this.getDragData.createDelegate(this);
		}
    },



    setDroppable: function(J) {
    	if (J  instanceof  Array) {
    		Roo.each(J, this.setDroppable, this);
    		return;
    	}
    	if (this.dropZone) {
    		this.dropZone.addToGroup(J);
    	} else  {
			this.dropZone = new  Roo.dd.DropZone(this.getEl(), {
				containerScroll: true,
				ddGroup: J
			});


			this.dropZone.getTargetFromEvent = this.getTargetFromEvent.createDelegate(this);
			this.dropZone.onNodeEnter = this.onNodeEnter.createDelegate(this);
			this.dropZone.onNodeOver = this.onNodeOver.createDelegate(this);
			this.dropZone.onNodeOut = this.onNodeOut.createDelegate(this);
			this.dropZone.onNodeDrop = this.onNodeDrop.createDelegate(this);
		}
    },



    getDropPoint : function(e, n, dd){
    	if (n == this.el.dom) { return  "above"; }
		var  t = Roo.lib.Dom.getY(n), b = t + n.offsetHeight;
		var  c = t + (b - t) / 2;
		var  y = Roo.lib.Event.getPageY(e);
		if(y <= c) {
			return  "above";
		}else {
			return  "below";
		}
    },

    onNodeEnter : function(n, dd, e, K){
		return  false;
    },
    
    onNodeOver : function(n, dd, e, L){
		var  pt = this.getDropPoint(e, n, dd);
		
		var  M = this.dropNotAllowed;
		if (pt) {
			var  targetElClass;
			if (pt == "above"){
				M = n.previousSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-above";
				targetElClass = "x-view-drag-insert-above";
			} else  {
				M = n.nextSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-below";
				targetElClass = "x-view-drag-insert-below";
			}
			if (this.lastInsertClass != targetElClass){
				Roo.fly(n).replaceClass(this.lastInsertClass, targetElClass);
				this.lastInsertClass = targetElClass;
			}
		}
		return  M;
	},

    onNodeOut : function(n, dd, e, N){
		this.removeDropIndicators(n);
    },

    onNodeDrop : function(n, dd, e, O){
    	if (this.fireEvent("drop", this, n, dd, e, O) === false) {
    		return  false;
    	}
    	var  pt = this.getDropPoint(e, n, dd);
		var  P = (n == this.el.dom) ? this.nodes.length : n.nodeIndex;
		if (pt == "below") { P++; }
		for (var  i = 0; i < O.records.length; i++) {
			var  r = O.records[i];
			var  dup = this.store.getById(r.id);
			if (dup && (dd != this.dragZone)) {
				Roo.fly(this.getNode(this.store.indexOf(dup))).frame("red", 1);
			} else  {
				if (O.copy) {
					this.store.insert(P++, r.copy());
				} else  {
					O.source.isDirtyFlag = true;
					r.store.remove(r);
					this.store.insert(P++, r);
				}

				this.isDirtyFlag = true;
			}
		}

		this.dragZone.cachedTarget = null;
		return  true;
    },

    removeDropIndicators : function(n){
		if(n){
			Roo.fly(n).removeClass([
				"x-view-drag-insert-above",
				"x-view-drag-insert-below"]);
			this.lastInsertClass = "_noclass";
		}
    },



	setDeletable: function(Q) {
		if (!this.singleSelect && !this.multiSelect) {
			this.singleSelect = true;
		}
		var  c = this.getContextMenu();
		this.contextMenu.on("itemclick", function(R) {
			switch (R.id) {
				case  "delete":
					this.remove(this.getSelectedIndexes());
					break;
			}
		}, this);
		this.contextMenu.add({
			icon: Q,
			id: "delete",
			text: 'Delete'
		});
	},
	


	getContextMenu: function() {
		if (!this.contextMenu) {

			this.contextMenu = new  Roo.menu.Menu({
				id: this.id + "-contextmenu"
			});
			this.el.on("contextmenu", this.showContextMenu, this);
		}
		return  this.contextMenu;
	},
	
	disableContextMenu: function() {
		if (this.contextMenu) {
			this.el.un("contextmenu", this.showContextMenu, this);
		}
	},

	showContextMenu: function(e, R) {
        R = this.findItemFromChild(e.getTarget());
		if (R) {
			e.stopEvent();
			this.select(this.getNode(R), this.multiSelect && e.ctrlKey, true);
			this.contextMenu.showAt(e.getXY());
	    }
    },



    remove: function(S) {
		S = [].concat(S);
		for (var  i = 0; i < S.length; i++) {
			var  rec = this.store.getAt(S[i]);
			this.store.remove(rec);
		}
    },



    onDblClick : function(e){
        var  T = this.findItemFromChild(e.getTarget());
        if(T){
            if (this.fireEvent("dblclick", this, this.indexOf(T), T, e) === false) {
            	return  false;
            }
            if (this.dragGroup) {
	            var  targets = Roo.dd.DragDropMgr.getRelated(this.dragZone, true);
	            while (targets.indexOf(this.dropZone) > -1) {
		            targets.remove(this.dropZone);
				}
	            if (targets.length == 1) {
					this.dragZone.cachedTarget = null;
	            	var  el = Roo.get(targets[0].getEl());
	            	var  box = el.getBox(true);
	            	targets[0].onNodeDrop(el.dom, {
	            		target: el.dom,
	            		xy: [box.x, box.y + box.height - 1]
	            	}, null, this.getDragData(e));
	            }
	        }
        }
    },
    
    handleSelection: function(e) {
		this.dragZone.cachedTarget = null;
        var  U = this.findItemFromChild(e.getTarget());
        if (!U) {
        	this.clearSelections(true);
        	return;
        }
		if (U && (this.multiSelect || this.singleSelect)){
			if(this.multiSelect && e.shiftKey && (!e.ctrlKey) && this.lastSelection){
				this.select(this.getNodes(this.indexOf(this.lastSelection), U.nodeIndex), false);
			}else  if (this.isSelected(this.getNode(U)) && e.ctrlKey){
				this.unselect(U);
			} else  {
				this.select(U, this.multiSelect && e.ctrlKey);
				this.lastSelection = U;
			}
		}
    },

    onItemClick : function(V, W, e){
		if(this.fireEvent("beforeclick", this, W, V, e) === false){
			return  false;
		}
		return  true;
    },

    unselect : function(X, Y){
		var  Z = this.getNode(X);
		if(Z && this.isSelected(Z)){
			if(this.fireEvent("beforeselect", this, Z, this.selections) !== false){
				Roo.fly(Z).removeClass(this.selectedClass);
				this.selections.remove(Z);
				if(!Y){
					this.fireEvent("selectionchange", this, this.selections);
				}
			}
		}
    }
});



 


Roo.LayoutManager = function(A, B){
    Roo.LayoutManager.superclass.constructor.call(this);
    this.el = Roo.get(A);
    
    if(this.el.dom == document.body && Roo.isIE && !B.allowScroll){
        document.body.scroll = "no";
    }else  if(this.el.dom != document.body && this.el.getStyle('position') == 'static'){
        this.el.position('relative');
    }

    this.id = this.el.id;
    this.el.addClass("x-layout-container");
    

    this.monitorWindowResize = true;
    this.regions = {};
    this.addEvents({
        

        "layout" : true,
        

        "regionresized" : true,
        

        "regioncollapsed" : true,
        

        "regionexpanded" : true
    });
    this.updating = false;
    Roo.EventManager.onWindowResize(this.onWindowResize, this, true);
};

Roo.extend(Roo.LayoutManager, Roo.util.Observable, {
    

    isUpdating : function(){
        return  this.updating; 
    },
    
    

    beginUpdate : function(){
        this.updating = true;    
    },
    
    

    endUpdate : function(C){
        this.updating = false;
        if(!C){
            this.layout();
        }    
    },
    
    layout: function(){
        
    },
    
    onRegionResized : function(D, E){
        this.fireEvent("regionresized", D, E);
        this.layout();
    },
    
    onRegionCollapsed : function(F){
        this.fireEvent("regioncollapsed", F);
    },
    
    onRegionExpanded : function(G){
        this.fireEvent("regionexpanded", G);
    },
        
    

    getViewSize : function(){
        var  H;
        if(this.el.dom != document.body){
            H = this.el.getSize();
        }else {
            H = {width: Roo.lib.Dom.getViewWidth(), height: Roo.lib.Dom.getViewHeight()};
        }

        H.width -= this.el.getBorderWidth("lr")-this.el.getPadding("lr");
        H.height -= this.el.getBorderWidth("tb")-this.el.getPadding("tb");
        return  H;
    },
    
    

    getEl : function(){
        return  this.el;
    },
    
    

    getRegion : function(I){
        return  this.regions[I.toLowerCase()];
    },
    
    onWindowResize : function(){
        if(this.monitorWindowResize){
            this.layout();
        }
    }
});




Roo.BorderLayout = function(A, B){
    B = B || {};
    Roo.BorderLayout.superclass.constructor.call(this, A, B);
    this.factory = B.factory || Roo.BorderLayout.RegionFactory;
    for(var  i = 0, len = this.factory.validRegions.length; i < len; i++) {
    	var  target = this.factory.validRegions[i];
    	if(B[target]){
    	    this.addRegion(target, B[target]);
    	}
    }
};

Roo.extend(Roo.BorderLayout, Roo.LayoutManager, {
    

    addRegion : function(C, D){
        if(!this.regions[C]){
            var  r = this.factory.create(C, this, D);
    	    this.bindRegion(C, r);
        }
        return  this.regions[C];
    },

    
    bindRegion : function(E, r){
        this.regions[E] = r;
        r.on("visibilitychange", this.layout, this);
        r.on("paneladded", this.layout, this);
        r.on("panelremoved", this.layout, this);
        r.on("invalidated", this.layout, this);
        r.on("resized", this.onRegionResized, this);
        r.on("collapsed", this.onRegionCollapsed, this);
        r.on("expanded", this.onRegionExpanded, this);
    },

    

    layout : function(){
        if(this.updating) return;
        var  F = this.getViewSize();
        var  w = F.width;
        var  h = F.height;
        var  G = w;
        var  H = h;
        var  I = 0;
        var  J = 0;
        

        var  rs = this.regions;
        var  K = rs["north"];
        var  L = rs["south"]; 
        var  M = rs["west"];
        var  N = rs["east"];
        var  O = rs["center"];
        
            
        
        if(K && K.isVisible()){
            var  b = K.getBox();
            var  m = K.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            b.y = m.top;
            I = b.height + b.y + m.bottom;
            H -= I;
            K.updateBox(this.safeBox(b));
        }
        if(L && L.isVisible()){
            var  b = L.getBox();
            var  m = L.getMargins();
            b.width = w - (m.left+m.right);
            b.x = m.left;
            var  totalHeight = (b.height + m.top + m.bottom);
            b.y = h - totalHeight + m.top;
            H -= totalHeight;
            L.updateBox(this.safeBox(b));
        }
        if(M && M.isVisible()){
            var  b = M.getBox();
            var  m = M.getMargins();
            b.height = H - (m.top+m.bottom);
            b.x = m.left;
            b.y = I + m.top;
            var  totalWidth = (b.width + m.left + m.right);
            J += totalWidth;
            G -= totalWidth;
            M.updateBox(this.safeBox(b));
        }
        if(N && N.isVisible()){
            var  b = N.getBox();
            var  m = N.getMargins();
            b.height = H - (m.top+m.bottom);
            var  totalWidth = (b.width + m.left + m.right);
            b.x = w - totalWidth + m.left;
            b.y = I + m.top;
            G -= totalWidth;
            N.updateBox(this.safeBox(b));
        }
        if(O){
            var  m = O.getMargins();
            var  centerBox = {
                x: J + m.left,
                y: I + m.top,
                width: G - (m.left+m.right),
                height: H - (m.top+m.bottom)
            };
            
                
            
            O.updateBox(this.safeBox(centerBox));
        }

        this.el.repaint();
        this.fireEvent("layout", this);
    },

    
    safeBox : function(P){
        P.width = Math.max(0, P.width);
        P.height = Math.max(0, P.height);
        return  P;
    },

    

    add : function(Q, R){
         
        Q = Q.toLowerCase();
        return  this.regions[Q].add(R);
    },

    

    remove : function(S, T){
        S = S.toLowerCase();
        return  this.regions[S].remove(T);
    },

    

    findPanel : function(U){
        var  rs = this.regions;
        for(var  S  in  rs){
            if(typeof  rs[S] != "function"){
                var  p = rs[S].getPanel(U);
                if(p){
                    return  p;
                }
            }
        }
        return  null;
    },

    

    showPanel : function(V) {
      var  rs = this.regions;
      for(var  S  in  rs){
         var  r = rs[S];
         if(typeof  r != "function"){
            if(r.hasPanel(V)){
               return  r.showPanel(V);
            }
         }
      }
      return  null;
   },

   

    restoreState : function(W){
        if(!W){
            W = Roo.state.Manager;
        }
        var  sm = new  Roo.LayoutStateManager();
        sm.init(this, W);
    },

    

    batchAdd : function(X){
        this.beginUpdate();
        for(var  rname  in  X){
            var  lr = this.regions[rname];
            if(lr){
                this.addTypedPanels(lr, X[rname]);
            }
        }

        this.endUpdate();
    },

    
    addTypedPanels : function(lr, ps){
        if(typeof  ps == 'string'){
            lr.add(new  Roo.ContentPanel(ps));
        }
        else  if(ps  instanceof  Array){
            for(var  i =0, len = ps.length; i < len; i++){
                this.addTypedPanels(lr, ps[i]);
            }
        }
        else  if(!ps.events){ 
            var  el = ps.el;
            delete  ps.el; 
            lr.add(new  Roo.ContentPanel(el || Roo.id(), ps));
        }
        else  {  
            lr.add(ps);
        }
    },
    

    addxtype : function(Y)
    {
        
        
       
        
        if (!Y.xtype.match(/Panel$/)) {
            return  false;
        }
        var  Z = false;
        var  a = Y.region;
        delete  Y.region;
        
          
        var  c = [];
        if (Y.items) {
            c = Y.items;
            delete  Y.items;
        }
        
        
        switch(Y.xtype) 
        {
            case  'ContentPanel':  
                if(Y.autoCreate) {
                    Z = new  Roo[Y.xtype](Y); 
                } else  {
                    var  el = this.el.createChild();
                    Z = new  Roo[Y.xtype](el, Y); 
                }

                
                this.add(a, Z);
                break;
            
            
            case  'TreePanel': 
                Y.el = this.el.createChild();
                Z = new  Roo[Y.xtype](Y); 
                this.add(a, Z);
                break;
            
            case  'NestedLayoutPanel': 
                
                var  el = this.el.createChild();
                var  clayout = Y.layout;
                delete  Y.layout;
                clayout.items   = clayout.items  || [];
                
                c = clayout.items;
                 
                
                if (a == 'center' && this.active && this.getRegion('center').panels.length < 1) {
                    Y.background = false;
                }
                var  layout = new  Roo.BorderLayout(el, clayout);
                
                Z = new  Roo[Y.xtype](layout, Y); 
                
                this.add(a, Z);
                
                break;
                
            case  'GridPanel': 
            
                
                
                
                var  el = this.el.createChild();
                
                
                var  grid = new  Roo.grid[Y.grid.xtype](el, Y.grid);
                delete  Y.grid;
                if (a == 'center' && this.active ) {
                    Y.background = false;
                }

                Z = new  Roo[Y.xtype](grid, Y); 
                
                this.add(a, Z);
                if (Y.background) {
                    Z.on('activate', function(gp) {
                        if (!gp.grid.rendered) {
                            gp.grid.render();
                        }
                    });
                } else  {
                    grid.render();
                }
                break;
           
               
                
                
            default: 
                alert("Can not add '" + Y.xtype + "' to BorderLayout");
                return;
             
            
        }

        this.beginUpdate();
        
        Roo.each(c, function(i)  {
            Z.addxtype(i);
        });
        this.endUpdate();
        return  Z;
        
    }
});



Roo.BorderLayout.create = function(d, e){
    var  f = new  Roo.BorderLayout(e || document.body, d);
    f.beginUpdate();
    var  g = Roo.BorderLayout.RegionFactory.validRegions;
    for(var  j = 0, jlen = g.length; j < jlen; j++){
        var  lr = g[j];
        if(f.regions[lr] && d[lr].panels){
            var  r = f.regions[lr];
            var  ps = d[lr].panels;
            f.addTypedPanels(r, ps);
        }
    }

    f.endUpdate();
    return  f;
};


Roo.BorderLayout.RegionFactory = {
    
    validRegions : ["north","south","east","west","center"],

    
    create : function(k, l, n){
        k = k.toLowerCase();
        if(n.lightweight || n.basic){
            return  new  Roo.BasicLayoutRegion(l, n, k);
        }
        switch(k){
            case  "north":
                return  new  Roo.NorthLayoutRegion(l, n);
            case  "south":
                return  new  Roo.SouthLayoutRegion(l, n);
            case  "east":
                return  new  Roo.EastLayoutRegion(l, n);
            case  "west":
                return  new  Roo.WestLayoutRegion(l, n);
            case  "center":
                return  new  Roo.CenterLayoutRegion(l, n);
        }
        throw  'Layout region "'+k+'" not supported.';
    }
};


 


Roo.BasicLayoutRegion = function(A, B, C, D){
    this.mgr = A;
    this.position  = C;
    this.events = {
        

        
        

        "beforeremove" : true,
        

        "invalidated" : true,
        

        "visibilitychange" : true,
        

        "paneladded" : true,
        

        "panelremoved" : true,
        

        "collapsed" : true,
        

        "expanded" : true,
        

        "slideshow" : true,
        

        "slidehide" : true,
        

        "panelactivated" : true,
        

        "resized" : true
    };
    

    this.panels = new  Roo.util.MixedCollection();
    this.panels.getKey = this.getPanelId.createDelegate(this);
    this.box = null;
    this.activePanel = null;
    
    
    if (B.listeners || B.events) {
        Roo.BasicLayoutRegion.superclass.constructor.call(this, {
            listeners : B.listeners || {},
            events : B.events || {}
        });
    }
    
    if(D !== true){
        this.applyConfig(B);
    }
};

Roo.extend(Roo.BasicLayoutRegion, Roo.util.Observable, {
    getPanelId : function(p){
        return  p.getId();
    },
    
    applyConfig : function(E){
        this.margins = E.margins || this.margins || {top: 0, left: 0, right:0, bottom: 0};
        this.config = E;
        
    },
    
    

    resizeTo : function(F){
        var  el = this.el ? this.el :
                 (this.activePanel ? this.activePanel.getEl() : null);
        if(el){
            switch(this.position){
                case  "east":
                case  "west":
                    el.setWidth(F);
                    this.fireEvent("resized", this, F);
                break;
                case  "north":
                case  "south":
                    el.setHeight(F);
                    this.fireEvent("resized", this, F);
                break;                
            }
        }
    },
    
    getBox : function(){
        return  this.activePanel ? this.activePanel.getEl().getBox(false, true) : null;
    },
    
    getMargins : function(){
        return  this.margins;
    },
    
    updateBox : function(G){
        this.box = G;
        var  el = this.activePanel.getEl();
        el.dom.style.left = G.x + "px";
        el.dom.style.top = G.y + "px";
        this.activePanel.setSize(G.width, G.height);
    },
    
    

    getEl : function(){
        return  this.activePanel;
    },
    
    

    isVisible : function(){
        return  this.activePanel ? true : false;
    },
    
    setActivePanel : function(H){
        H = this.getPanel(H);
        if(this.activePanel && this.activePanel != H){
            this.activePanel.setActiveState(false);
            this.activePanel.getEl().setLeftTop(-10000,-10000);
        }

        this.activePanel = H;
        H.setActiveState(true);
        if(this.box){
            H.setSize(this.box.width, this.box.height);
        }

        this.fireEvent("panelactivated", this, H);
        this.fireEvent("invalidated");
    },
    
    

    showPanel : function(I){
        if(I = this.getPanel(I)){
            this.setActivePanel(I);
        }
        return  I;
    },
    
    

    getActivePanel : function(){
        return  this.activePanel;
    },
    
    

    add : function(J){
        if(arguments.length > 1){
            for(var  i = 0, len = arguments.length; i < len; i++) {
            	this.add(arguments[i]);
            }
            return  null;
        }
        if(this.hasPanel(J)){
            this.showPanel(J);
            return  J;
        }
        var  el = J.getEl();
        if(el.dom.parentNode != this.mgr.el.dom){
            this.mgr.el.dom.appendChild(el.dom);
        }
        if(J.setRegion){
            J.setRegion(this);
        }

        this.panels.add(J);
        el.setStyle("position", "absolute");
        if(!J.background){
            this.setActivePanel(J);
            if(this.config.initialSize && this.panels.getCount()==1){
                this.resizeTo(this.config.initialSize);
            }
        }

        this.fireEvent("paneladded", this, J);
        return  J;
    },
    
    

    hasPanel : function(K){
        if(typeof  K == "object"){ 
            K = K.getId();
        }
        return  this.getPanel(K) ? true : false;
    },
    
    

    remove : function(L, M){
        L = this.getPanel(L);
        if(!L){
            return  null;
        }
        var  e = {};
        this.fireEvent("beforeremove", this, L, e);
        if(e.cancel === true){
            return  null;
        }
        var  N = L.getId();
        this.panels.removeKey(N);
        return  L;
    },
    
    

    getPanel : function(id){
        if(typeof  id == "object"){ 
            return  id;
        }
        return  this.panels.get(id);
    },
    
    

    getPosition: function(){
        return  this.position;    
    }
});


 


Roo.LayoutRegion = function(A, B, C){
    Roo.LayoutRegion.superclass.constructor.call(this, A, B, C, true);
    var  dh = Roo.DomHelper;
    

    this.el = dh.append(A.el.dom, {tag: "div", cls: "x-layout-panel x-layout-panel-" + this.position}, true);
    


    this.titleEl = dh.append(this.el.dom, {tag: "div", unselectable: "on", cls: "x-unselectable x-layout-panel-hd x-layout-title-"+this.position, children:[
        {tag: "span", cls: "x-unselectable x-layout-panel-hd-text", unselectable: "on", html: "&#160;"},
        {tag: "div", cls: "x-unselectable x-layout-panel-hd-tools", unselectable: "on"}
    ]}, true);
    this.titleEl.enableDisplayMode();
    

    this.titleTextEl = this.titleEl.dom.firstChild;
    this.tools = Roo.get(this.titleEl.dom.childNodes[1], true);
    this.closeBtn = this.createTool(this.tools.dom, "x-layout-close");
    this.closeBtn.enableDisplayMode();
    this.closeBtn.on("click", this.closeClicked, this);
    this.closeBtn.hide();

    this.createBody(B);
    this.visible = true;
    this.collapsed = false;

    if(B.hideWhenEmpty){
        this.hide();
        this.on("paneladded", this.validateVisibility, this);
        this.on("panelremoved", this.validateVisibility, this);
    }

    this.applyConfig(B);
};

Roo.extend(Roo.LayoutRegion, Roo.BasicLayoutRegion, {

    createBody : function(){
        

        this.bodyEl = this.el.createChild({tag: "div", cls: "x-layout-panel-body"});
    },

    applyConfig : function(c){
        if(c.collapsible && this.position != "center" && !this.collapsedEl){
            var  dh = Roo.DomHelper;
            if(c.titlebar !== false){
                this.collapseBtn = this.createTool(this.tools.dom, "x-layout-collapse-"+this.position);
                this.collapseBtn.on("click", this.collapse, this);
                this.collapseBtn.enableDisplayMode();

                if(c.showPin === true || this.showPin){
                    this.stickBtn = this.createTool(this.tools.dom, "x-layout-stick");
                    this.stickBtn.enableDisplayMode();
                    this.stickBtn.on("click", this.expand, this);
                    this.stickBtn.hide();
                }
            }

            

            this.collapsedEl = dh.append(this.mgr.el.dom, {cls: "x-layout-collapsed x-layout-collapsed-"+this.position, children:[
                {cls: "x-layout-collapsed-tools", children:[{cls: "x-layout-ctools-inner"}]}
            ]}, true);
            if(c.floatable !== false){
               this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
               this.collapsedEl.on("click", this.collapseClick, this);
            }

            if(c.collapsedTitle && (this.position == "north" || this.position== "south")) {
                this.collapsedTitleTextEl = dh.append(this.collapsedEl.dom, {tag: "div", cls: "x-unselectable x-layout-panel-hd-text",
                   id: "message", unselectable: "on", style:{"float":"left"}});
               this.collapsedTitleTextEl.innerHTML = c.collapsedTitle;
             }

            this.expandBtn = this.createTool(this.collapsedEl.dom.firstChild.firstChild, "x-layout-expand-"+this.position);
            this.expandBtn.on("click", this.expand, this);
        }
        if(this.collapseBtn){
            this.collapseBtn.setVisible(c.collapsible == true);
        }

        this.cmargins = c.cmargins || this.cmargins ||
                         (this.position == "west" || this.position == "east" ?
                             {top: 0, left: 2, right:2, bottom: 0} :
                             {top: 2, left: 0, right:0, bottom: 2});
        this.margins = c.margins || this.margins || {top: 0, left: 0, right:0, bottom: 0};
        this.bottomTabs = c.tabPosition != "top";
        this.autoScroll = c.autoScroll || false;
        if(this.autoScroll){
            this.bodyEl.setStyle("overflow", "auto");
        }else {
            this.bodyEl.setStyle("overflow", "hidden");
        }
        
            if((!c.titlebar && !c.title) || c.titlebar === false){
                this.titleEl.hide();
            }else {
                this.titleEl.show();
                if(c.title){
                    this.titleTextEl.innerHTML = c.title;
                }
            }

        
        this.duration = c.duration || .30;
        this.slideDuration = c.slideDuration || .45;
        this.config = c;
        if(c.collapsed){
            this.collapse(true);
        }
        if(c.hidden){
            this.hide();
        }
    },
    

    isVisible : function(){
        return  this.visible;
    },

    

    setCollapsedTitle : function(D){
        D = D || "&#160;";
        if(this.collapsedTitleTextEl){
            this.collapsedTitleTextEl.innerHTML = D;
        }
    },

    getBox : function(){
        var  b;
        if(!this.collapsed){
            b = this.el.getBox(false, true);
        }else {
            b = this.collapsedEl.getBox(false, true);
        }
        return  b;
    },

    getMargins : function(){
        return  this.collapsed ? this.cmargins : this.margins;
    },

    highlight : function(){
        this.el.addClass("x-layout-panel-dragover");
    },

    unhighlight : function(){
        this.el.removeClass("x-layout-panel-dragover");
    },

    updateBox : function(E){
        this.box = E;
        if(!this.collapsed){
            this.el.dom.style.left = E.x + "px";
            this.el.dom.style.top = E.y + "px";
            this.updateBody(E.width, E.height);
        }else {
            this.collapsedEl.dom.style.left = E.x + "px";
            this.collapsedEl.dom.style.top = E.y + "px";
            this.collapsedEl.setSize(E.width, E.height);
        }
        if(this.tabs){
            this.tabs.autoSizeTabs();
        }
    },

    updateBody : function(w, h){
        if(w !== null){
            this.el.setWidth(w);
            w -= this.el.getBorderWidth("rl");
            if(this.config.adjustments){
                w += this.config.adjustments[0];
            }
        }
        if(h !== null){
            this.el.setHeight(h);
            h = this.titleEl && this.titleEl.isDisplayed() ? h - (this.titleEl.getHeight()||0) : h;
            h -= this.el.getBorderWidth("tb");
            if(this.config.adjustments){
                h += this.config.adjustments[1];
            }

            this.bodyEl.setHeight(h);
            if(this.tabs){
                h = this.tabs.syncHeight(h);
            }
        }
        if(this.panelSize){
            w = w !== null ? w : this.panelSize.width;
            h = h !== null ? h : this.panelSize.height;
        }
        if(this.activePanel){
            var  el = this.activePanel.getEl();
            w = w !== null ? w : el.getWidth();
            h = h !== null ? h : el.getHeight();
            this.panelSize = {width: w, height: h};
            this.activePanel.setSize(w, h);
        }
        if(Roo.isIE && this.tabs){
            this.tabs.el.repaint();
        }
    },

    

    getEl : function(){
        return  this.el;
    },

    

    hide : function(){
        if(!this.collapsed){
            this.el.dom.style.left = "-2000px";
            this.el.hide();
        }else {
            this.collapsedEl.dom.style.left = "-2000px";
            this.collapsedEl.hide();
        }

        this.visible = false;
        this.fireEvent("visibilitychange", this, false);
    },

    

    show : function(){
        if(!this.collapsed){
            this.el.show();
        }else {
            this.collapsedEl.show();
        }

        this.visible = true;
        this.fireEvent("visibilitychange", this, true);
    },

    closeClicked : function(){
        if(this.activePanel){
            this.remove(this.activePanel);
        }
    },

    collapseClick : function(e){
        if(this.isSlid){
           e.stopPropagation();
           this.slideIn();
        }else {
           e.stopPropagation();
           this.slideOut();
        }
    },

    

    collapse : function(F){
        if(this.collapsed) return;
        this.collapsed = true;
        if(this.split){
            this.split.el.hide();
        }
        if(this.config.animate && F !== true){
            this.fireEvent("invalidated", this);
            this.animateCollapse();
        }else {
            this.el.setLocation(-20000,-20000);
            this.el.hide();
            this.collapsedEl.show();
            this.fireEvent("collapsed", this);
            this.fireEvent("invalidated", this);
        }
    },

    animateCollapse : function(){
        
    },

    

    expand : function(e, G){
        if(e) e.stopPropagation();
        if(!this.collapsed || this.el.hasActiveFx()) return;
        if(this.isSlid){
            this.afterSlideIn();
            G = true;
        }

        this.collapsed = false;
        if(this.config.animate && G !== true){
            this.animateExpand();
        }else {
            this.el.show();
            if(this.split){
                this.split.el.show();
            }

            this.collapsedEl.setLocation(-2000,-2000);
            this.collapsedEl.hide();
            this.fireEvent("invalidated", this);
            this.fireEvent("expanded", this);
        }
    },

    animateExpand : function(){
        
    },

    initTabs : function(){
        this.bodyEl.setStyle("overflow", "hidden");
        var  ts = new  Roo.TabPanel(this.bodyEl.dom, {
            tabPosition: this.bottomTabs ? 'bottom' : 'top',
            disableTooltips: this.config.disableTabTips
        });
        if(this.config.hideTabs){
            ts.stripWrap.setDisplayed(false);
        }

        this.tabs = ts;
        ts.resizeTabs = this.config.resizeTabs === true;
        ts.minTabWidth = this.config.minTabWidth || 40;
        ts.maxTabWidth = this.config.maxTabWidth || 250;
        ts.preferredTabWidth = this.config.preferredTabWidth || 150;
        ts.monitorResize = false;
        ts.bodyEl.setStyle("overflow", this.config.autoScroll ? "auto" : "hidden");
        ts.bodyEl.addClass('x-layout-tabs-body');
        this.panels.each(this.initPanelAsTab, this);
    },

    initPanelAsTab : function(H){
        var  ti = this.tabs.addTab(H.getEl().id, H.getTitle(), null,
                    this.config.closeOnTab && H.isClosable());
        if(H.tabTip !== undefined){
            ti.setTooltip(H.tabTip);
        }

        ti.on("activate", function(){
              this.setActivePanel(H);
        }, this);
        if(this.config.closeOnTab){
            ti.on("beforeclose", function(t, e){
                e.cancel = true;
                this.remove(H);
            }, this);
        }
        return  ti;
    },

    updatePanelTitle : function(I, J){
        if(this.activePanel == I){
            this.updateTitle(J);
        }
        if(this.tabs){
            var  ti = this.tabs.getTab(I.getEl().id);
            ti.setText(J);
            if(I.tabTip !== undefined){
                ti.setTooltip(I.tabTip);
            }
        }
    },

    updateTitle : function(K){
        if(this.titleTextEl && !this.config.title){
            this.titleTextEl.innerHTML = (typeof  K != "undefined" && K.length > 0 ? K : "&#160;");
        }
    },

    setActivePanel : function(L){
        L = this.getPanel(L);
        if(this.activePanel && this.activePanel != L){
            this.activePanel.setActiveState(false);
        }

        this.activePanel = L;
        L.setActiveState(true);
        if(this.panelSize){
            L.setSize(this.panelSize.width, this.panelSize.height);
        }
        if(this.closeBtn){
            this.closeBtn.setVisible(!this.config.closeOnTab && !this.isSlid && L.isClosable());
        }

        this.updateTitle(L.getTitle());
        if(this.tabs){
            this.fireEvent("invalidated", this);
        }

        this.fireEvent("panelactivated", this, L);
    },

    

    showPanel : function(M){
        if(M = this.getPanel(M)){
            if(this.tabs){
                var  tab = this.tabs.getTab(M.getEl().id);
                if(tab.isHidden()){
                    this.tabs.unhideTab(tab.id);
                }

                tab.activate();
            }else {
                this.setActivePanel(M);
            }
        }
        return  M;
    },

    

    getActivePanel : function(){
        return  this.activePanel;
    },

    validateVisibility : function(){
        if(this.panels.getCount() < 1){
            this.updateTitle("&#160;");
            this.closeBtn.hide();
            this.hide();
        }else {
            if(!this.isVisible()){
                this.show();
            }
        }
    },

    

    add : function(N){
        if(arguments.length > 1){
            for(var  i = 0, len = arguments.length; i < len; i++) {
                this.add(arguments[i]);
            }
            return  null;
        }
        if(this.hasPanel(N)){
            this.showPanel(N);
            return  N;
        }

        N.setRegion(this);
        this.panels.add(N);
        if(this.panels.getCount() == 1 && !this.config.alwaysShowTabs){
            this.bodyEl.dom.appendChild(N.getEl().dom);
            if(N.background !== true){
                this.setActivePanel(N);
            }

            this.fireEvent("paneladded", this, N);
            return  N;
        }
        if(!this.tabs){
            this.initTabs();
        }else {
            this.initPanelAsTab(N);
        }
        if(N.background !== true){
            this.tabs.activate(N.getEl().id);
        }

        this.fireEvent("paneladded", this, N);
        return  N;
    },

    

    hidePanel : function(O){
        if(this.tabs && (O = this.getPanel(O))){
            this.tabs.hideTab(O.getEl().id);
        }
    },

    

    unhidePanel : function(P){
        if(this.tabs && (P = this.getPanel(P))){
            this.tabs.unhideTab(P.getEl().id);
        }
    },

    clearPanels : function(){
        while(this.panels.getCount() > 0){
             this.remove(this.panels.first());
        }
    },

    

    remove : function(Q, R){
        Q = this.getPanel(Q);
        if(!Q){
            return  null;
        }
        var  e = {};
        this.fireEvent("beforeremove", this, Q, e);
        if(e.cancel === true){
            return  null;
        }

        R = (typeof  R != "undefined" ? R : (this.config.preservePanels === true || Q.preserve === true));
        var  S = Q.getId();
        this.panels.removeKey(S);
        if(R){
            document.body.appendChild(Q.getEl().dom);
        }
        if(this.tabs){
            this.tabs.removeTab(Q.getEl().id);
        }else  if (!R){
            this.bodyEl.dom.removeChild(Q.getEl().dom);
        }
        if(this.panels.getCount() == 1 && this.tabs && !this.config.alwaysShowTabs){
            var  p = this.panels.first();
            var  tempEl = document.createElement("div"); 
            tempEl.appendChild(p.getEl().dom);
            this.bodyEl.update("");
            this.bodyEl.dom.appendChild(p.getEl().dom);
            tempEl = null;
            this.updateTitle(p.getTitle());
            this.tabs = null;
            this.bodyEl.setStyle("overflow", this.config.autoScroll ? "auto" : "hidden");
            this.setActivePanel(p);
        }

        Q.setRegion(null);
        if(this.activePanel == Q){
            this.activePanel = null;
        }
        if(this.config.autoDestroy !== false && R !== true){
            try{Q.destroy();}catch(e){}
        }

        this.fireEvent("panelremoved", this, Q);
        return  Q;
    },

    

    getTabs : function(){
        return  this.tabs;
    },

    createTool : function(T, U){
        var  V = Roo.DomHelper.append(T, {tag: "div", cls: "x-layout-tools-button",
            children: [{tag: "div", cls: "x-layout-tools-button-inner " + U, html: "&#160;"}]}, true);
        V.addClassOnOver("x-layout-tools-button-over");
        return  V;
    }
});


 




Roo.SplitLayoutRegion = function(A, B, C, D){
    this.cursor = D;
    Roo.SplitLayoutRegion.superclass.constructor.call(this, A, B, C);
};

Roo.extend(Roo.SplitLayoutRegion, Roo.LayoutRegion, {
    splitTip : "Drag to resize.",
    collapsibleSplitTip : "Drag to resize. Double click to hide.",
    useSplitTips : false,

    applyConfig : function(E){
        Roo.SplitLayoutRegion.superclass.applyConfig.call(this, E);
        if(E.split){
            if(!this.split){
                var  splitEl = Roo.DomHelper.append(this.mgr.el.dom, 
                        {tag: "div", id: this.el.id + "-split", cls: "x-layout-split x-layout-split-"+this.position, html: "&#160;"});
                

                this.split = new  Roo.SplitBar(splitEl, this.el, this.orientation);
                this.split.on("moved", this.onSplitMove, this);
                this.split.useShim = E.useShim === true;
                this.split.getMaximumSize = this[this.position == 'north' || this.position == 'south' ? 'getVMaxSize' : 'getHMaxSize'].createDelegate(this);
                if(this.useSplitTips){
                    this.split.el.dom.title = E.collapsible ? this.collapsibleSplitTip : this.splitTip;
                }
                if(E.collapsible){
                    this.split.el.on("dblclick", this.collapse,  this);
                }
            }
            if(typeof  E.minSize != "undefined"){
                this.split.minSize = E.minSize;
            }
            if(typeof  E.maxSize != "undefined"){
                this.split.maxSize = E.maxSize;
            }
            if(E.hideWhenEmpty || E.hidden || E.collapsed){
                this.hideSplitter();
            }
        }
    },

    getHMaxSize : function(){
         var  F = this.config.maxSize || 10000;
         var  G = this.mgr.getRegion("center");
         return  Math.min(F, (this.el.getWidth()+G.getEl().getWidth())-G.getMinWidth());
    },

    getVMaxSize : function(){
         var  H = this.config.maxSize || 10000;
         var  I = this.mgr.getRegion("center");
         return  Math.min(H, (this.el.getHeight()+I.getEl().getHeight())-I.getMinHeight());
    },

    onSplitMove : function(J, K){
        this.fireEvent("resized", this, K);
    },
    
    

    getSplitBar : function(){
        return  this.split;
    },
    
    hide : function(){
        this.hideSplitter();
        Roo.SplitLayoutRegion.superclass.hide.call(this);
    },

    hideSplitter : function(){
        if(this.split){
            this.split.el.setLocation(-2000,-2000);
            this.split.el.hide();
        }
    },

    show : function(){
        if(this.split){
            this.split.el.show();
        }

        Roo.SplitLayoutRegion.superclass.show.call(this);
    },
    
    beforeSlide: function(){
        if(Roo.isGecko){
            this.bodyEl.clip();
            if(this.tabs) this.tabs.bodyEl.clip();
            if(this.activePanel){
                this.activePanel.getEl().clip();
                
                if(this.activePanel.beforeSlide){
                    this.activePanel.beforeSlide();
                }
            }
        }
    },
    
    afterSlide : function(){
        if(Roo.isGecko){
            this.bodyEl.unclip();
            if(this.tabs) this.tabs.bodyEl.unclip();
            if(this.activePanel){
                this.activePanel.getEl().unclip();
                if(this.activePanel.afterSlide){
                    this.activePanel.afterSlide();
                }
            }
        }
    },

    initAutoHide : function(){
        if(this.autoHide !== false){
            if(!this.autoHideHd){
                var  st = new  Roo.util.DelayedTask(this.slideIn, this);
                this.autoHideHd = {
                    "mouseout": function(e){
                        if(!e.within(this.el, true)){
                            st.delay(500);
                        }
                    },
                    "mouseover" : function(e){
                        st.cancel();
                    },
                    scope : this
                };
            }

            this.el.on(this.autoHideHd);
        }
    },

    clearAutoHide : function(){
        if(this.autoHide !== false){
            this.el.un("mouseout", this.autoHideHd.mouseout);
            this.el.un("mouseover", this.autoHideHd.mouseover);
        }
    },

    clearMonitor : function(){
        Roo.get(document).un("click", this.slideInIf, this);
    },

    
    slideOut : function(){
        if(this.isSlid || this.el.hasActiveFx()){
            return;
        }

        this.isSlid = true;
        if(this.collapseBtn){
            this.collapseBtn.hide();
        }

        this.closeBtnState = this.closeBtn.getStyle('display');
        this.closeBtn.hide();
        if(this.stickBtn){
            this.stickBtn.show();
        }

        this.el.show();
        this.el.alignTo(this.collapsedEl, this.getCollapseAnchor());
        this.beforeSlide();
        this.el.setStyle("z-index", 10001);
        this.el.slideIn(this.getSlideAnchor(), {
            callback: function(){
                this.afterSlide();
                this.initAutoHide();
                Roo.get(document).on("click", this.slideInIf, this);
                this.fireEvent("slideshow", this);
            },
            scope: this,
            block: true
        });
    },

    afterSlideIn : function(){
        this.clearAutoHide();
        this.isSlid = false;
        this.clearMonitor();
        this.el.setStyle("z-index", "");
        if(this.collapseBtn){
            this.collapseBtn.show();
        }

        this.closeBtn.setStyle('display', this.closeBtnState);
        if(this.stickBtn){
            this.stickBtn.hide();
        }

        this.fireEvent("slidehide", this);
    },

    slideIn : function(cb){
        if(!this.isSlid || this.el.hasActiveFx()){
            Roo.callback(cb);
            return;
        }

        this.isSlid = false;
        this.beforeSlide();
        this.el.slideOut(this.getSlideAnchor(), {
            callback: function(){
                this.el.setLeftTop(-10000, -10000);
                this.afterSlide();
                this.afterSlideIn();
                Roo.callback(cb);
            },
            scope: this,
            block: true
        });
    },
    
    slideInIf : function(e){
        if(!e.within(this.el)){
            this.slideIn();
        }
    },

    animateCollapse : function(){
        this.beforeSlide();
        this.el.setStyle("z-index", 20000);
        var  L = this.getSlideAnchor();
        this.el.slideOut(L, {
            callback : function(){
                this.el.setStyle("z-index", "");
                this.collapsedEl.slideIn(L, {duration:.3});
                this.afterSlide();
                this.el.setLocation(-10000,-10000);
                this.el.hide();
                this.fireEvent("collapsed", this);
            },
            scope: this,
            block: true
        });
    },

    animateExpand : function(){
        this.beforeSlide();
        this.el.alignTo(this.collapsedEl, this.getCollapseAnchor(), this.getExpandAdj());
        this.el.setStyle("z-index", 20000);
        this.collapsedEl.hide({
            duration:.1
        });
        this.el.slideIn(this.getSlideAnchor(), {
            callback : function(){
                this.el.setStyle("z-index", "");
                this.afterSlide();
                if(this.split){
                    this.split.el.show();
                }

                this.fireEvent("invalidated", this);
                this.fireEvent("expanded", this);
            },
            scope: this,
            block: true
        });
    },

    anchors : {
        "west" : "left",
        "east" : "right",
        "north" : "top",
        "south" : "bottom"
    },

    sanchors : {
        "west" : "l",
        "east" : "r",
        "north" : "t",
        "south" : "b"
    },

    canchors : {
        "west" : "tl-tr",
        "east" : "tr-tl",
        "north" : "tl-bl",
        "south" : "bl-tl"
    },

    getAnchor : function(){
        return  this.anchors[this.position];
    },

    getCollapseAnchor : function(){
        return  this.canchors[this.position];
    },

    getSlideAnchor : function(){
        return  this.sanchors[this.position];
    },

    getAlignAdj : function(){
        var  cm = this.cmargins;
        switch(this.position){
            case  "west":
                return  [0, 0];
            break;
            case  "east":
                return  [0, 0];
            break;
            case  "north":
                return  [0, 0];
            break;
            case  "south":
                return  [0, 0];
            break;
        }
    },

    getExpandAdj : function(){
        var  c = this.collapsedEl, cm = this.cmargins;
        switch(this.position){
            case  "west":
                return  [-(cm.right+c.getWidth()+cm.left), 0];
            break;
            case  "east":
                return  [cm.right+c.getWidth()+cm.left, 0];
            break;
            case  "north":
                return  [0, -(cm.top+cm.bottom+c.getHeight())];
            break;
            case  "south":
                return  [0, cm.top+cm.bottom+c.getHeight()];
            break;
        }
    }
});




Roo.CenterLayoutRegion = function(A, B){
    Roo.LayoutRegion.call(this, A, B, "center");
    this.visible = true;
    this.minWidth = B.minWidth || 20;
    this.minHeight = B.minHeight || 20;
};

Roo.extend(Roo.CenterLayoutRegion, Roo.LayoutRegion, {
    hide : function(){
        
    },
    
    show : function(){
        
    },
    
    getMinWidth: function(){
        return  this.minWidth;
    },
    
    getMinHeight: function(){
        return  this.minHeight;
    }
});


Roo.NorthLayoutRegion = function(C, D){
    Roo.LayoutRegion.call(this, C, D, "north", "n-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.TOP;
        this.split.orientation = Roo.SplitBar.VERTICAL;
        this.split.el.addClass("x-layout-split-v");
    }
    var  E = D.initialSize || D.height;
    if(typeof  E != "undefined"){
        this.el.setHeight(E);
    }
};
Roo.extend(Roo.NorthLayoutRegion, Roo.SplitLayoutRegion, {
    orientation: Roo.SplitBar.VERTICAL,
    getBox : function(){
        if(this.collapsed){
            return  this.collapsedEl.getBox();
        }
        var  F = this.el.getBox();
        if(this.split){
            F.height += this.split.el.getHeight();
        }
        return  F;
    },
    
    updateBox : function(G){
        if(this.split && !this.collapsed){
            G.height -= this.split.el.getHeight();
            this.split.el.setLeft(G.x);
            this.split.el.setTop(G.y+G.height);
            this.split.el.setWidth(G.width);
        }
        if(this.collapsed){
            this.updateBody(G.width, null);
        }

        Roo.LayoutRegion.prototype.updateBox.call(this, G);
    }
});

Roo.SouthLayoutRegion = function(H, I){
    Roo.SplitLayoutRegion.call(this, H, I, "south", "s-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.BOTTOM;
        this.split.orientation = Roo.SplitBar.VERTICAL;
        this.split.el.addClass("x-layout-split-v");
    }
    var  J = I.initialSize || I.height;
    if(typeof  J != "undefined"){
        this.el.setHeight(J);
    }
};
Roo.extend(Roo.SouthLayoutRegion, Roo.SplitLayoutRegion, {
    orientation: Roo.SplitBar.VERTICAL,
    getBox : function(){
        if(this.collapsed){
            return  this.collapsedEl.getBox();
        }
        var  K = this.el.getBox();
        if(this.split){
            var  sh = this.split.el.getHeight();
            K.height += sh;
            K.y -= sh;
        }
        return  K;
    },
    
    updateBox : function(L){
        if(this.split && !this.collapsed){
            var  sh = this.split.el.getHeight();
            L.height -= sh;
            L.y += sh;
            this.split.el.setLeft(L.x);
            this.split.el.setTop(L.y-sh);
            this.split.el.setWidth(L.width);
        }
        if(this.collapsed){
            this.updateBody(L.width, null);
        }

        Roo.LayoutRegion.prototype.updateBox.call(this, L);
    }
});

Roo.EastLayoutRegion = function(M, N){
    Roo.SplitLayoutRegion.call(this, M, N, "east", "e-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.RIGHT;
        this.split.orientation = Roo.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var  O = N.initialSize || N.width;
    if(typeof  O != "undefined"){
        this.el.setWidth(O);
    }
};
Roo.extend(Roo.EastLayoutRegion, Roo.SplitLayoutRegion, {
    orientation: Roo.SplitBar.HORIZONTAL,
    getBox : function(){
        if(this.collapsed){
            return  this.collapsedEl.getBox();
        }
        var  P = this.el.getBox();
        if(this.split){
            var  sw = this.split.el.getWidth();
            P.width += sw;
            P.x -= sw;
        }
        return  P;
    },

    updateBox : function(Q){
        if(this.split && !this.collapsed){
            var  sw = this.split.el.getWidth();
            Q.width -= sw;
            this.split.el.setLeft(Q.x);
            this.split.el.setTop(Q.y);
            this.split.el.setHeight(Q.height);
            Q.x += sw;
        }
        if(this.collapsed){
            this.updateBody(null, Q.height);
        }

        Roo.LayoutRegion.prototype.updateBox.call(this, Q);
    }
});

Roo.WestLayoutRegion = function(R, S){
    Roo.SplitLayoutRegion.call(this, R, S, "west", "w-resize");
    if(this.split){
        this.split.placement = Roo.SplitBar.LEFT;
        this.split.orientation = Roo.SplitBar.HORIZONTAL;
        this.split.el.addClass("x-layout-split-h");
    }
    var  T = S.initialSize || S.width;
    if(typeof  T != "undefined"){
        this.el.setWidth(T);
    }
};
Roo.extend(Roo.WestLayoutRegion, Roo.SplitLayoutRegion, {
    orientation: Roo.SplitBar.HORIZONTAL,
    getBox : function(){
        if(this.collapsed){
            return  this.collapsedEl.getBox();
        }
        var  U = this.el.getBox();
        if(this.split){
            U.width += this.split.el.getWidth();
        }
        return  U;
    },
    
    updateBox : function(V){
        if(this.split && !this.collapsed){
            var  sw = this.split.el.getWidth();
            V.width -= sw;
            this.split.el.setLeft(V.x+V.width);
            this.split.el.setTop(V.y);
            this.split.el.setHeight(V.height);
        }
        if(this.collapsed){
            this.updateBody(null, V.height);
        }

        Roo.LayoutRegion.prototype.updateBox.call(this, V);
    }
});



 
 


Roo.LayoutStateManager = function(A){
     
     this.state = {
        north: {},
        south: {},
        east: {},
        west: {}       
    };
};

Roo.LayoutStateManager.prototype = {
    init : function(B, C){
        this.provider = C;
        var  D = C.get(B.id+"-layout-state");
        if(D){
            var  wasUpdating = B.isUpdating();
            if(!wasUpdating){
                B.beginUpdate();
            }
            for(var  key  in  D){
                if(typeof  D[key] != "function"){
                    var  rstate = D[key];
                    var  r = B.getRegion(key);
                    if(r && rstate){
                        if(rstate.size){
                            r.resizeTo(rstate.size);
                        }
                        if(rstate.collapsed == true){
                            r.collapse(true);
                        }else {
                            r.expand(null, true);
                        }
                    }
                }
            }
            if(!wasUpdating){
                B.endUpdate();
            }

            this.state = D; 
        }

        this.layout = B;
        B.on("regionresized", this.onRegionResized, this);
        B.on("regioncollapsed", this.onRegionCollapsed, this);
        B.on("regionexpanded", this.onRegionExpanded, this);
    },
    
    storeState : function(){
        this.provider.set(this.layout.id+"-layout-state", this.state);
    },
    
    onRegionResized : function(E, F){
        this.state[E.getPosition()].size = F;
        this.storeState();
    },
    
    onRegionCollapsed : function(G){
        this.state[G.getPosition()].collapsed = true;
        this.storeState();
    },
    
    onRegionExpanded : function(H){
        this.state[H.getPosition()].collapsed = false;
        this.storeState();
    }
};




Roo.ContentPanel = function(el, A, B){
    
     
    

    if(el.autoCreate){ 
        A = el;
        el = Roo.id();
    }

    this.el = Roo.get(el);
    if(!this.el && A && A.autoCreate){
        if(typeof  A.autoCreate == "object"){
            if(!A.autoCreate.id){
                A.autoCreate.id = A.id||el;
            }

            this.el = Roo.DomHelper.append(document.body,
                        A.autoCreate, true);
        }else {
            this.el = Roo.DomHelper.append(document.body,
                        {tag: "div", cls: "x-layout-inactive-content", id: A.id||el}, true);
        }
    }

    this.closable = false;
    this.loaded = false;
    this.active = false;
    if(typeof  A == "string"){
        this.title = A;
    }else {
        Roo.apply(this, A);
    }
    
    if (this.toolbar && !this.toolbar.el && this.toolbar.xtype) {
        this.wrapEl = this.el.wrap();    
        this.toolbar = new  Roo.Toolbar(this.el.insertSibling(false, 'before'), [] , this.toolbar);
        
    }
    
    
    
    if(this.resizeEl){
        this.resizeEl = Roo.get(this.resizeEl, true);
    }else {
        this.resizeEl = this.el;
    }

    this.addEvents({
        

        "activate" : true,
        

        "deactivate" : true,

        

        "resize" : true
    });
    if(this.autoScroll){
        this.resizeEl.setStyle("overflow", "auto");
    }

    B = B || this.content;
    if(B){
        this.setContent(B);
    }
    if(A && A.url){
        this.setUrl(this.url, this.params, this.loadOnce);
    }

    
    
    
    Roo.ContentPanel.superclass.constructor.call(this);
};

Roo.extend(Roo.ContentPanel, Roo.util.Observable, {
    tabTip:'',
    setRegion : function(C){
        this.region = C;
        if(C){
           this.el.replaceClass("x-layout-inactive-content", "x-layout-active-content");
        }else {
           this.el.replaceClass("x-layout-active-content", "x-layout-inactive-content");
        } 
    },
    
    

    getToolbar : function(){
        return  this.toolbar;
    },
    
    setActiveState : function(D){
        this.active = D;
        if(!D){
            this.fireEvent("deactivate", this);
        }else {
            this.fireEvent("activate", this);
        }
    },
    

    setContent : function(E, F){
        this.el.update(E, F);
    },

    ignoreResize : function(w, h){
        if(this.lastSize && this.lastSize.width == w && this.lastSize.height == h){
            return  true;
        }else {
            this.lastSize = {width: w, height: h};
            return  false;
        }
    },
    

    getUpdateManager : function(){
        return  this.el.getUpdateManager();
    },
     

    load : function(){
        var  um = this.el.getUpdateManager();
        um.update.apply(um, arguments);
        return  this;
    },


    

    setUrl : function(G, H, I){
        if(this.refreshDelegate){
            this.removeListener("activate", this.refreshDelegate);
        }

        this.refreshDelegate = this._handleRefresh.createDelegate(this, [G, H, I]);
        this.on("activate", this.refreshDelegate);
        return  this.el.getUpdateManager();
    },
    
    _handleRefresh : function(J, K, L){
        if(!L || !this.loaded){
            var  updater = this.el.getUpdateManager();
            updater.update(J, K, this._setLoaded.createDelegate(this));
        }
    },
    
    _setLoaded : function(){
        this.loaded = true;
    }, 
    
    

    getId : function(){
        return  this.el.id;
    },
    
    

    getEl : function(){
        return  this.wrapEl || this.el;
    },
    
    adjustForComponents : function(M, N){
        if(this.resizeEl != this.el){
            M -= this.el.getFrameWidth('lr');
            N -= this.el.getFrameWidth('tb');
        }
        if(this.toolbar){
            var  te = this.toolbar.getEl();
            N -= te.getHeight();
            te.setWidth(M);
        }
        if(this.adjustments){
            M += this.adjustments[0];
            N += this.adjustments[1];
        }
        return  {"width": M, "height": N};
    },
    
    setSize : function(O, P){
        if(this.fitToFrame && !this.ignoreResize(O, P)){
            if(this.fitContainer && this.resizeEl != this.el){
                this.el.setSize(O, P);
            }
            var  size = this.adjustForComponents(O, P);
            this.resizeEl.setSize(this.autoWidth ? "auto" : size.width, this.autoHeight ? "auto" : size.height);
            this.fireEvent('resize', this, size.width, size.height);
        }
    },
    
    

    getTitle : function(){
        return  this.title;
    },
    
    

    setTitle : function(Q){
        this.title = Q;
        if(this.region){
            this.region.updatePanelTitle(this, Q);
        }
    },
    
    

    isClosable : function(){
        return  this.closable;
    },
    
    beforeSlide : function(){
        this.el.clip();
        this.resizeEl.clip();
    },
    
    afterSlide : function(){
        this.el.unclip();
        this.resizeEl.unclip();
    },
    
    

    refresh : function(){
        if(this.refreshDelegate){
           this.loaded = false;
           this.refreshDelegate();
        }
    },
    
    

    destroy : function(){
        this.el.removeAllListeners();
        var  R = document.createElement("span");
        R.appendChild(this.el.dom);
        R.innerHTML = "";
        this.el.remove();
        this.el = null;
    },
    
      

    
    addxtype : function(S) {
        
        if (S.xtype.match(/^Form$/)) {
            var  el = this.el.createChild();

            this.form = new   Roo.form.Form(S);
            
            
            if ( this.form.allItems.length) this.form.render(el.dom);
            return  this.form;
        }
        if (['View', 'JsonView'].indexOf(S.xtype) > -1) {
            
            S.el = this.el.appendChild(document.createElement("div"));
            
            var  ret = new  Roo[S.xtype](S);
            ret.render(false, ''); 
            return  ret;
            
        }
        return  false;
        
    }
});



Roo.GridPanel = function(T, U){
    
  
    this.wrapper = Roo.DomHelper.append(document.body, 
        {tag: "div", cls: "x-layout-grid-wrapper x-layout-inactive-content"}, true);
        
    this.wrapper.dom.appendChild(T.getGridEl().dom);
    
    Roo.GridPanel.superclass.constructor.call(this, this.wrapper, U);
    
    if(this.toolbar){
        this.toolbar.el.insertBefore(this.wrapper.dom.firstChild);
    }
    
    if (this.footer && !this.footer.el && this.footer.xtype) {
        
        this.footer.container = this.grid.getView().getFooterPanel(true);
        this.footer.dataSource = this.grid.dataSource;
        this.footer = Roo.factory(this.footer, Roo);
        
    }

    
    T.monitorWindowResize = false; 
    T.autoHeight = false;
    T.autoWidth = false;
    this.grid = T;
    this.grid.getGridEl().replaceClass("x-layout-inactive-content", "x-layout-component-panel");
};

Roo.extend(Roo.GridPanel, Roo.ContentPanel, {
    getId : function(){
        return  this.grid.id;
    },
    
    

    getGrid : function(){
        return  this.grid;    
    },
    
    setSize : function(V, W){
        if(!this.ignoreResize(V, W)){
            var  T = this.grid;
            var  size = this.adjustForComponents(V, W);
            T.getGridEl().setSize(size.width, size.height);
            T.autoSize();
        }
    },
    
    beforeSlide : function(){
        this.grid.getView().scroller.clip();
    },
    
    afterSlide : function(){
        this.grid.getView().scroller.unclip();
    },
    
    destroy : function(){
        this.grid.destroy();
        delete  this.grid;
        Roo.GridPanel.superclass.destroy.call(this); 
    }
});




Roo.NestedLayoutPanel = function(X, Y)
{
    
    

    
    Roo.NestedLayoutPanel.superclass.constructor.call(this, X.getEl(), Y);
    
    X.monitorWindowResize = false; 
    this.layout = X;
    this.layout.getEl().addClass("x-layout-nested-layout");
    
    
    
};

Roo.extend(Roo.NestedLayoutPanel, Roo.ContentPanel, {

    setSize : function(Z, a){
        if(!this.ignoreResize(Z, a)){
            var  size = this.adjustForComponents(Z, a);
            var  el = this.layout.getEl();
            el.setSize(size.width, size.height);
            var  touch = el.dom.offsetWidth;
            this.layout.layout();
            
            if(Roo.isIE && !this.initialized){
                this.initialized = true;
                this.layout.layout();
            }
        }
    },
    
    
    
    setActiveState : function(b){
        this.active = b;
        if(!b){
            this.fireEvent("deactivate", this);
            return;
        }

        
        this.fireEvent("activate", this);
        
        if (!this.layout) {
            return; 
        }
        var  c = false;
        for (var  r  in  this.layout.regions) {
            c = this.layout.getRegion(r);
            if (c.getActivePanel()) {
                
                c.setActivePanel(c.getActivePanel());
                continue;
            }
            if (!c.panels.length) {
                continue;
            }

            c.showPanel(c.getPanel(0));
        }
        
        
        
        
    },
    
    

    getLayout : function(){
        return  this.layout;
    },
    
     

    addxtype : function(d) {
        return  this.layout.addxtype(d);
    
    }
});

Roo.ScrollPanel = function(el, e, f){
    e = e || {};
    e.fitToFrame = true;
    Roo.ScrollPanel.superclass.constructor.call(this, el, e, f);
    
    this.el.dom.style.overflow = "hidden";
    var  g = this.el.wrap({cls: "x-scroller x-layout-inactive-content"});
    this.el.removeClass("x-layout-inactive-content");
    this.el.on("mousewheel", this.onWheel, this);

    var  up = g.createChild({cls: "x-scroller-up", html: "&#160;"}, this.el.dom);
    var  i = g.createChild({cls: "x-scroller-down", html: "&#160;"});
    up.unselectable(); i.unselectable();
    up.on("click", this.scrollUp, this);
    i.on("click", this.scrollDown, this);
    up.addClassOnOver("x-scroller-btn-over");
    i.addClassOnOver("x-scroller-btn-over");
    up.addClassOnClick("x-scroller-btn-click");
    i.addClassOnClick("x-scroller-btn-click");
    this.adjustments = [0, -(up.getHeight() + i.getHeight())];

    this.resizeEl = this.el;
    this.el = g; this.up = up; this.down = i;
};

Roo.extend(Roo.ScrollPanel, Roo.ContentPanel, {
    increment : 100,
    wheelIncrement : 5,
    scrollUp : function(){
        this.resizeEl.scroll("up", this.increment, {callback: this.afterScroll, scope: this});
    },

    scrollDown : function(){
        this.resizeEl.scroll("down", this.increment, {callback: this.afterScroll, scope: this});
    },

    afterScroll : function(){
        var  el = this.resizeEl;
        var  t = el.dom.scrollTop, h = el.dom.scrollHeight, ch = el.dom.clientHeight;
        this.up[t == 0 ? "addClass" : "removeClass"]("x-scroller-btn-disabled");
        this.down[h - t <= ch ? "addClass" : "removeClass"]("x-scroller-btn-disabled");
    },

    setSize : function(){
        Roo.ScrollPanel.superclass.setSize.apply(this, arguments);
        this.afterScroll();
    },

    onWheel : function(e){
        var  d = e.getWheelDelta();
        this.resizeEl.dom.scrollTop -= (d*this.wheelIncrement);
        this.afterScroll();
        e.stopEvent();
    },

    setContent : function(j, k){
        this.resizeEl.update(j, k);
    }

});











Roo.TreePanel = function(l){
    var  el = l.el;
    var  m = l.tree;
    delete  l.tree; 
    delete  l.el; 
    Roo.TreePanel.superclass.constructor.call(this, el, l);
    var  n = el.createChild();
    this.tree = new  Roo.tree.TreePanel(n , m);
    
    this.on('activate', function()
    {
        if (this.tree.rendered) {
            return;
        }

        
        this.tree.render();
    });
    
    this.on('resize',  function (cp, w, h) {
            this.tree.innerCt.setWidth(w);
            this.tree.innerCt.setHeight(h);
            this.tree.innerCt.setStyle('overflow-y', 'auto');
    });

        
    
};

Roo.extend(Roo.TreePanel, Roo.ContentPanel);














 



Roo.ReaderLayout = function(A, B){
    var  c = A || {size:{}};
    Roo.ReaderLayout.superclass.constructor.call(this, B || document.body, {
        north: c.north !== false ? Roo.apply({
            split:false,
            initialSize: 32,
            titlebar: false
        }, c.north) : false,
        west: c.west !== false ? Roo.apply({
            split:true,
            initialSize: 200,
            minSize: 175,
            maxSize: 400,
            titlebar: true,
            collapsible: true,
            animate: true,
            margins:{left:5,right:0,bottom:5,top:5},
            cmargins:{left:5,right:5,bottom:5,top:5}
        }, c.west) : false,
        east: c.east !== false ? Roo.apply({
            split:true,
            initialSize: 200,
            minSize: 175,
            maxSize: 400,
            titlebar: true,
            collapsible: true,
            animate: true,
            margins:{left:0,right:5,bottom:5,top:5},
            cmargins:{left:5,right:5,bottom:5,top:5}
        }, c.east) : false,
        center: Roo.apply({
            tabPosition: 'top',
            autoScroll:false,
            closeOnTab: true,
            titlebar:false,
            margins:{left:c.west!==false ? 0 : 5,right:c.east!==false ? 0 : 5,bottom:5,top:2}
        }, c.center)
    });

    this.el.addClass('x-reader');

    this.beginUpdate();

    var  C = new  Roo.BorderLayout(Roo.get(document.body).createChild(), {
        south: c.preview !== false ? Roo.apply({
            split:true,
            initialSize: 200,
            minSize: 100,
            autoScroll:true,
            collapsible:true,
            titlebar: true,
            cmargins:{top:5,left:0, right:0, bottom:0}
        }, c.preview) : false,
        center: Roo.apply({
            autoScroll:false,
            titlebar:false,
            minHeight:200
        }, c.listView)
    });
    this.add('center', new  Roo.NestedLayoutPanel(C,
            Roo.apply({title: c.mainTitle || '',tabTip:''},c.innerPanelCfg)));

    this.endUpdate();

    this.regions.preview = C.getRegion('south');
    this.regions.listView = C.getRegion('center');
};

Roo.extend(Roo.ReaderLayout, Roo.BorderLayout);


 


Roo.grid.Grid = function(A, B){
	
	this.container = Roo.get(A);
	this.container.update("");
	this.container.setStyle("overflow", "hidden");
    this.container.addClass('x-grid-container');

    this.id = this.container.id;

    Roo.apply(this, B);
    
    if(this.ds){
        this.dataSource = this.ds;
        delete  this.ds;
    }
    if(this.cm){
        this.colModel = this.cm;
        delete  this.cm;
    }
    if(this.sm){
        this.selModel = this.sm;
        delete  this.sm;
    }

    if (this.selModel) {
        this.selModel = Roo.factory(this.selModel, Roo.grid);
        this.sm = this.selModel;
        this.sm.xmodule = this.xmodule || false;
    }
    if (typeof(this.colModel.config) == 'undefined') {
        this.colModel = new  Roo.grid.ColumnModel(this.colModel);
        this.cm = this.colModel;
        this.cm.xmodule = this.xmodule || false;
    }
    if (this.dataSource) {
        this.dataSource= Roo.factory(this.dataSource, Roo.data);
        this.ds = this.dataSource;
        this.ds.xmodule = this.xmodule || false;
        
    }
    
    
    
    if(this.width){
        this.container.setWidth(this.width);
    }

    if(this.height){
        this.container.setHeight(this.height);
    }

    

	this.addEvents({
	    
	    

	    "click" : true,
	    

	    "dblclick" : true,
	    

	    "contextmenu" : true,
	    

	    "mousedown" : true,
	    

	    "mouseup" : true,
	    

	    "mouseover" : true,
	    

	    "mouseout" : true,
	    

	    "keypress" : true,
	    

	    "keydown" : true,

	    

	    

	    "cellclick" : true,
	    

	    "celldblclick" : true,
	    

	    "rowclick" : true,
	    

	    "rowdblclick" : true,
	    

	    "headerclick" : true,
	    

	    "headerdblclick" : true,
	    

	    "rowcontextmenu" : true,
	    

         "cellcontextmenu" : true,
	    

	    "headercontextmenu" : true,
	    

	    "bodyscroll" : true,
	    

	    "columnresize" : true,
	    

	    "columnmove" : true,
	    

	    "startdrag" : true,
	    

	    "enddrag" : true,
	    

	    "dragdrop" : true,
	    

	    "dragover" : true,
	    

	    "dragenter" : true,
	    

	    "dragout" : true,
        

        render : true
    });

    Roo.grid.Grid.superclass.constructor.call(this);
};
Roo.extend(Roo.grid.Grid, Roo.util.Observable, {
    

	minColumnWidth : 25,

    

	autoSizeColumns : false,

	

	autoSizeHeaders : true,

	

	monitorWindowResize : true,

	

	maxRowsToMeasure : 0,

	

	trackMouseOver : true,

	

	enableDragDrop : false,

	

	enableColumnMove : true,

	

	enableColumnHide : true,

	

	enableRowHeightSync : false,

	

	stripeRows : true,

	

	autoHeight : false,

    

    autoExpandColumn : false,

    

    autoExpandMin : 50,

    

    autoExpandMax : 1000,

    

	view : null,

	

	loadMask : false,

    
    rendered : false,

    

    

    

    render : function(){
        var  c = this.container;
        
        if((!c.dom.offsetHeight || c.dom.offsetHeight < 20) || c.getStyle("height") == "auto"){
    	    this.autoHeight = true;
    	}
    	var  C = this.getView();
        C.init(this);

        c.on("click", this.onClick, this);
        c.on("dblclick", this.onDblClick, this);
        c.on("contextmenu", this.onContextMenu, this);
        c.on("keydown", this.onKeyDown, this);

        this.relayEvents(c, ["mousedown","mouseup","mouseover","mouseout","keypress"]);

        this.getSelectionModel().init(this);

        C.render();

        if(this.loadMask){
            this.loadMask = new  Roo.LoadMask(this.container,
                    Roo.apply({store:this.dataSource}, this.loadMask));
        }
        
        
        if (this.toolbar && this.toolbar.xtype) {
            this.toolbar.container = this.getView().getHeaderPanel(true);
            this.toolbar = new  Ext.Toolbar(this.toolbar);
        }
        if (this.footer && this.footer.xtype) {
            this.footer.dataSource = this.getDataSource();
            this.footer.container = this.getView().getFooterPanel(true);
            this.footer = Roo.factory(this.footer, Roo);
        }

        this.rendered = true;
        this.fireEvent('render', this);
        return  this;
    },

	

    reconfigure : function(D, E){
        if(this.loadMask){
            this.loadMask.destroy();
            this.loadMask = new  Roo.LoadMask(this.container,
                    Roo.apply({store:D}, this.loadMask));
        }

        this.view.bind(D, E);
        this.dataSource = D;
        this.colModel = E;
        this.view.refresh(true);
    },

    
    onKeyDown : function(e){
        this.fireEvent("keydown", e);
    },

    

    destroy : function(F, G){
        if(this.loadMask){
            this.loadMask.destroy();
        }
        var  c = this.container;
        c.removeAllListeners();
        this.view.destroy();
        this.colModel.purgeListeners();
        if(!G){
            this.purgeListeners();
        }

        c.update("");
        if(F === true){
            c.remove();
        }
    },

    
    processEvent : function(H, e){
        this.fireEvent(H, e);
        var  t = e.getTarget();
        var  v = this.view;
        var  I = v.findHeaderIndex(t);
        if(I !== false){
            this.fireEvent("header" + H, this, I, e);
        }else {
            var  row = v.findRowIndex(t);
            var  cell = v.findCellIndex(t);
            if(row !== false){
                this.fireEvent("row" + H, this, row, e);
                if(cell !== false){
                    this.fireEvent("cell" + H, this, row, cell, e);
                }
            }
        }
    },

    
    onClick : function(e){
        this.processEvent("click", e);
    },

    
    onContextMenu : function(e, t){
        this.processEvent("contextmenu", e);
    },

    
    onDblClick : function(e){
        this.processEvent("dblclick", e);
    },

    
    walkCells : function(J, K, L, fn, M){
        var  cm = this.colModel, N = cm.getColumnCount();
        var  ds = this.dataSource, O = ds.getCount(), P = true;
        if(L < 0){
            if(K < 0){
                J--;
                P = false;
            }
            while(J >= 0){
                if(!P){
                    K = N-1;
                }

                P = false;
                while(K >= 0){
                    if(fn.call(M || this, J, K, cm) === true){
                        return  [J, K];
                    }

                    K--;
                }

                J--;
            }
        } else  {
            if(K >= N){
                J++;
                P = false;
            }
            while(J < O){
                if(!P){
                    K = 0;
                }

                P = false;
                while(K < N){
                    if(fn.call(M || this, J, K, cm) === true){
                        return  [J, K];
                    }

                    K++;
                }

                J++;
            }
        }
        return  null;
    },

    
    getSelections : function(){
        return  this.selModel.getSelections();
    },

    

    autoSize : function(){
        if(this.rendered){
            this.view.layout();
            if(this.view.adjustForScroll){
                this.view.adjustForScroll();
            }
        }
    },

    

    getGridEl : function(){
        return  this.container;
    },

    
    stopEditing : function(){},

    

    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new  Roo.grid.RowSelectionModel();
        }
        return  this.selModel;
    },

    

    getDataSource : function(){
        return  this.dataSource;
    },

    

    getColumnModel : function(){
        return  this.colModel;
    },

    

    getView : function(){
        if(!this.view){
            this.view = new  Roo.grid.GridView(this.viewConfig);
        }
        return  this.view;
    },
    

    getDragDropText : function(){
        var  Q = this.selModel.getCount();
        return  String.format(this.ddText, Q, Q == 1 ? '' : 's');
    }
});


Roo.grid.Grid.prototype.ddText = "{0} selected row{1}";


 
Roo.grid.AbstractGridView = function(){
	this.grid = null;
	
	this.events = {
	    "beforerowremoved" : true,
	    "beforerowsinserted" : true,
	    "beforerefresh" : true,
	    "rowremoved" : true,
	    "rowsinserted" : true,
	    "rowupdated" : true,
	    "refresh" : true
	};
    Roo.grid.AbstractGridView.superclass.constructor.call(this);
};

Roo.extend(Roo.grid.AbstractGridView, Roo.util.Observable, {
    rowClass : "x-grid-row",
    cellClass : "x-grid-cell",
    tdClass : "x-grid-td",
    hdClass : "x-grid-hd",
    splitClass : "x-grid-hd-split",
    
	init: function(A){
        this.grid = A;
		var  B = this.grid.getGridEl().id;
        this.colSelector = "#" + B + " ." + this.cellClass + "-";
        this.tdSelector = "#" + B + " ." + this.tdClass + "-";
        this.hdSelector = "#" + B + " ." + this.hdClass + "-";
        this.splitSelector = "#" + B + " ." + this.splitClass + "-";
	},
	
	getColumnRenderers : function(){
    	var  C = [];
    	var  cm = this.grid.colModel;
        var  D = cm.getColumnCount();
        for(var  i = 0; i < D; i++){
            C[i] = cm.getRenderer(i);
        }
        return  C;
    },
    
    getColumnIds : function(){
    	var  E = [];
    	var  cm = this.grid.colModel;
        var  F = cm.getColumnCount();
        for(var  i = 0; i < F; i++){
            E[i] = cm.getColumnId(i);
        }
        return  E;
    },
    
    getDataIndexes : function(){
    	if(!this.indexMap){
            this.indexMap = this.buildIndexMap();
        }
        return  this.indexMap.colToData;
    },
    
    getColumnIndexByDataIndex : function(G){
        if(!this.indexMap){
            this.indexMap = this.buildIndexMap();
        }
    	return  this.indexMap.dataToCol[G];
    },
    
    

    setCSSStyle : function(H, I, J){
        var  K = "#" + this.grid.id + " .x-grid-col-" + H;
        Roo.util.CSS.updateRule(K, I, J);
    },
    
    generateRules : function(cm){
        var  L = [], M = this.grid.id + '-cssrules';
        Roo.util.CSS.removeStyleSheet(M);
        for(var  i = 0, len = cm.getColumnCount(); i < len; i++){
            var  B = cm.getColumnId(i);
            L.push(this.colSelector, B, " {\n", cm.config[i].css, "}\n",
                         this.tdSelector, B, " {\n}\n",
                         this.hdSelector, B, " {\n}\n",
                         this.splitSelector, B, " {\n}\n");
        }
        return  Roo.util.CSS.createStyleSheet(L.join(""), M);
    }
});





Roo.grid.HeaderDragZone = function(A, hd, B){
    this.grid = A;
    this.view = A.getView();
    this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
    Roo.grid.HeaderDragZone.superclass.constructor.call(this, hd);
    if(B){
        this.setHandleElId(Roo.id(hd));
        this.setOuterHandleElId(Roo.id(B));
    }

    this.scroll = false;
};
Roo.extend(Roo.grid.HeaderDragZone, Roo.dd.DragZone, {
    maxDragWidth: 120,
    getDragData : function(e){
        var  t = Roo.lib.Event.getTarget(e);
        var  h = this.view.findHeaderCell(t);
        if(h){
            return  {ddel: h.firstChild, header:h};
        }
        return  false;
    },

    onInitDrag : function(e){
        this.view.headersDisabled = true;
        var  C = this.dragData.ddel.cloneNode(true);
        C.id = Roo.id();
        C.style.width = Math.min(this.dragData.header.offsetWidth,this.maxDragWidth) + "px";
        this.proxy.update(C);
        return  true;
    },

    afterValidDrop : function(){
        var  v = this.view;
        setTimeout(function(){
            v.headersDisabled = false;
        }, 50);
    },

    afterInvalidDrop : function(){
        var  v = this.view;
        setTimeout(function(){
            v.headersDisabled = false;
        }, 50);
    }
});





Roo.grid.HeaderDropZone = function(A, hd, B){
    this.grid = A;
    this.view = A.getView();
    
    this.proxyTop = Roo.DomHelper.append(document.body, {
        cls:"col-move-top", html:"&#160;"
    }, true);
    this.proxyBottom = Roo.DomHelper.append(document.body, {
        cls:"col-move-bottom", html:"&#160;"
    }, true);
    this.proxyTop.hide = this.proxyBottom.hide = function(){
        this.setLeftTop(-100,-100);
        this.setStyle("visibility", "hidden");
    };
    this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
    
    
    Roo.grid.HeaderDropZone.superclass.constructor.call(this, A.getGridEl().dom);
};
Roo.extend(Roo.grid.HeaderDropZone, Roo.dd.DropZone, {
    proxyOffsets : [-4, -9],
    fly: Roo.Element.fly,

    getTargetFromEvent : function(e){
        var  t = Roo.lib.Event.getTarget(e);
        var  C = this.view.findCellIndex(t);
        if(C !== false){
            return  this.view.getHeaderCell(C);
        }
    },

    nextVisible : function(h){
        var  v = this.view, cm = this.grid.colModel;
        h = h.nextSibling;
        while(h){
            if(!cm.isHidden(v.getCellIndex(h))){
                return  h;
            }

            h = h.nextSibling;
        }
        return  null;
    },

    prevVisible : function(h){
        var  v = this.view, cm = this.grid.colModel;
        h = h.prevSibling;
        while(h){
            if(!cm.isHidden(v.getCellIndex(h))){
                return  h;
            }

            h = h.prevSibling;
        }
        return  null;
    },

    positionIndicator : function(h, n, e){
        var  x = Roo.lib.Event.getPageX(e);
        var  r = Roo.lib.Dom.getRegion(n.firstChild);
        var  px, pt, py = r.top + this.proxyOffsets[1];
        if((r.right - x) <= (r.right-r.left)/2){
            px = r.right+this.view.borderWidth;
            pt = "after";
        }else {
            px = r.left;
            pt = "before";
        }
        var  D = this.view.getCellIndex(h);
        var  E = this.view.getCellIndex(n);

        if(this.grid.colModel.isFixed(E)){
            return  false;
        }

        var  F = this.grid.colModel.isLocked(E);

        if(pt == "after"){
            E++;
        }
        if(D < E){
            E--;
        }
        if(D == E && (F == this.grid.colModel.isLocked(D))){
            return  false;
        }

        px +=  this.proxyOffsets[0];
        this.proxyTop.setLeftTop(px, py);
        this.proxyTop.show();
        if(!this.bottomOffset){
            this.bottomOffset = this.view.mainHd.getHeight();
        }

        this.proxyBottom.setLeftTop(px, py+this.proxyTop.dom.offsetHeight+this.bottomOffset);
        this.proxyBottom.show();
        return  pt;
    },

    onNodeEnter : function(n, dd, e, G){
        if(G.header != n){
            this.positionIndicator(G.header, n, e);
        }
    },

    onNodeOver : function(n, dd, e, H){
        var  I = false;
        if(H.header != n){
            I = this.positionIndicator(H.header, n, e);
        }
        if(!I){
            this.proxyTop.hide();
            this.proxyBottom.hide();
        }
        return  I ? this.dropAllowed : this.dropNotAllowed;
    },

    onNodeOut : function(n, dd, e, J){
        this.proxyTop.hide();
        this.proxyBottom.hide();
    },

    onNodeDrop : function(n, dd, e, K){
        var  h = K.header;
        if(h != n){
            var  cm = this.grid.colModel;
            var  x = Roo.lib.Event.getPageX(e);
            var  r = Roo.lib.Dom.getRegion(n.firstChild);
            var  pt = (r.right - x) <= ((r.right-r.left)/2) ? "after" : "before";
            var  D = this.view.getCellIndex(h);
            var  E = this.view.getCellIndex(n);
            var  F = cm.isLocked(E);
            if(pt == "after"){
                E++;
            }
            if(D < E){
                E--;
            }
            if(D == E && (F == cm.isLocked(D))){
                return  false;
            }

            cm.setLocked(D, F, true);
            cm.moveColumn(D, E);
            this.grid.fireEvent("columnmove", D, E);
            return  true;
        }
        return  false;
    }
});



  


Roo.grid.GridView = function(A){
    Roo.grid.GridView.superclass.constructor.call(this);
    this.el = null;

    Roo.apply(this, A);
};

Roo.extend(Roo.grid.GridView, Roo.grid.AbstractGridView, {

    

    rowClass : "x-grid-row",

    cellClass : "x-grid-col",

    tdClass : "x-grid-td",

    hdClass : "x-grid-hd",

    splitClass : "x-grid-split",

    sortClasses : ["sort-asc", "sort-desc"],

    enableMoveAnim : false,

    hlColor: "C3DAF9",

    dh : Roo.DomHelper,

    fly : Roo.Element.fly,

    css : Roo.util.CSS,

    borderWidth: 1,

    splitOffset: 3,

    scrollIncrement : 22,

    cellRE: /(?:.*?)x-grid-(?:hd|cell|csplit)-(?:[\d]+)-([\d]+)(?:.*?)/,

    findRE: /\s?(?:x-grid-hd|x-grid-col|x-grid-csplit)\s/,

    bind : function(ds, cm){
        if(this.ds){
            this.ds.un("load", this.onLoad, this);
            this.ds.un("datachanged", this.onDataChange, this);
            this.ds.un("add", this.onAdd, this);
            this.ds.un("remove", this.onRemove, this);
            this.ds.un("update", this.onUpdate, this);
            this.ds.un("clear", this.onClear, this);
        }
        if(ds){
            ds.on("load", this.onLoad, this);
            ds.on("datachanged", this.onDataChange, this);
            ds.on("add", this.onAdd, this);
            ds.on("remove", this.onRemove, this);
            ds.on("update", this.onUpdate, this);
            ds.on("clear", this.onClear, this);
        }

        this.ds = ds;

        if(this.cm){
            this.cm.un("widthchange", this.onColWidthChange, this);
            this.cm.un("headerchange", this.onHeaderChange, this);
            this.cm.un("hiddenchange", this.onHiddenChange, this);
            this.cm.un("columnmoved", this.onColumnMove, this);
            this.cm.un("columnlockchange", this.onColumnLock, this);
        }
        if(cm){
            this.generateRules(cm);
            cm.on("widthchange", this.onColWidthChange, this);
            cm.on("headerchange", this.onHeaderChange, this);
            cm.on("hiddenchange", this.onHiddenChange, this);
            cm.on("columnmoved", this.onColumnMove, this);
            cm.on("columnlockchange", this.onColumnLock, this);
        }

        this.cm = cm;
    },

    init: function(B){
		Roo.grid.GridView.superclass.init.call(this, B);

		this.bind(B.dataSource, B.colModel);

	    B.on("headerclick", this.handleHeaderClick, this);

        if(B.trackMouseOver){
            B.on("mouseover", this.onRowOver, this);
	        B.on("mouseout", this.onRowOut, this);
	    }

	    B.cancelTextSelection = function(){};
		this.gridId = B.id;

		var  C = this.templates || {};

		if(!C.master){
		    C.master = new  Roo.Template(
		       '<div class="x-grid" hidefocus="true">',
		          '<div class="x-grid-topbar"></div>',
		          '<div class="x-grid-scroller"><div></div></div>',
		          '<div class="x-grid-locked">',
		              '<div class="x-grid-header">{lockedHeader}</div>',
		              '<div class="x-grid-body">{lockedBody}</div>',
		          "</div>",
		          '<div class="x-grid-viewport">',
		              '<div class="x-grid-header">{header}</div>',
		              '<div class="x-grid-body">{body}</div>',
		          "</div>",
		          '<div class="x-grid-bottombar"></div>',
		          '<a href="#" class="x-grid-focus" tabIndex="-1"></a>',
		          '<div class="x-grid-resize-proxy">&#160;</div>',
		       "</div>"
		    );
		    C.master.disableformats = true;
		}

		if(!C.header){
		    C.header = new  Roo.Template(
		       '<table border="0" cellspacing="0" cellpadding="0">',
		       '<tbody><tr class="x-grid-hd-row">{cells}</tr></tbody>',
		       "</table>{splits}"
		    );
		    C.header.disableformats = true;
		}

		C.header.compile();

		if(!C.hcell){
		    C.hcell = new  Roo.Template(
		        '<td class="x-grid-hd x-grid-td-{id} {cellId}"><div title="{title}" class="x-grid-hd-inner x-grid-hd-{id}">',
		        '<div class="x-grid-hd-text" unselectable="on">{value}<img class="x-grid-sort-icon" src="', Roo.BLANK_IMAGE_URL, '" /></div>',
		        "</div></td>"
		     );
		     C.hcell.disableFormats = true;
		}

		C.hcell.compile();

		if(!C.hsplit){
		    C.hsplit = new  Roo.Template('<div class="x-grid-split {splitId} x-grid-split-{id}" style="{style}" unselectable="on">&#160;</div>');
		    C.hsplit.disableFormats = true;
		}

		C.hsplit.compile();

		if(!C.body){
		    C.body = new  Roo.Template(
		       '<table border="0" cellspacing="0" cellpadding="0">',
		       "<tbody>{rows}</tbody>",
		       "</table>"
		    );
		    C.body.disableFormats = true;
		}

		C.body.compile();

		if(!C.row){
		    C.row = new  Roo.Template('<tr class="x-grid-row {alt}">{cells}</tr>');
		    C.row.disableFormats = true;
		}

		C.row.compile();

		if(!C.cell){
		    C.cell = new  Roo.Template(
		        '<td class="x-grid-col x-grid-td-{id} {cellId} {css}" tabIndex="0">',
		        '<div class="x-grid-col-{id} x-grid-cell-inner"><div class="x-grid-cell-text" unselectable="on" {attr}>{value}</div></div>',
		        "</td>"
		    );
            C.cell.disableFormats = true;
        }

		C.cell.compile();

		this.templates = C;
	},

	
    onColWidthChange : function(){
        this.updateColumns.apply(this, arguments);
    },
    onHeaderChange : function(){
        this.updateHeaders.apply(this, arguments);
    }, 
    onHiddenChange : function(){
        this.handleHiddenChange.apply(this, arguments);
    },
    onColumnMove : function(){
        this.handleColumnMove.apply(this, arguments);
    },
    onColumnLock : function(){
        this.handleLockChange.apply(this, arguments);
    },

    onDataChange : function(){
        this.refresh();
        this.updateHeaderSortState();
    },

	onClear : function(){
        this.refresh();
    },

	onUpdate : function(ds, D){
        this.refreshRow(D);
    },

    refreshRow : function(E){
        var  ds = this.ds, F;
        if(typeof  E == 'number'){
            F = E;
            E = ds.getAt(F);
        }else {
            F = ds.indexOf(E);
        }

        this.insertRows(ds, F, F, true);
        this.onRemove(ds, E, F+1, true);
        this.syncRowHeights(F, F);
        this.layout();
        this.fireEvent("rowupdated", this, F, E);
    },

    onAdd : function(ds, G, H){
        this.insertRows(ds, H, H + (G.length-1));
    },

    onRemove : function(ds, I, J, K){
        if(K !== true){
            this.fireEvent("beforerowremoved", this, J, I);
        }
        var  bt = this.getBodyTable(), lt = this.getLockedTable();
        if(bt.rows[J]){
            bt.firstChild.removeChild(bt.rows[J]);
        }
        if(lt.rows[J]){
            lt.firstChild.removeChild(lt.rows[J]);
        }
        if(K !== true){
            this.stripeRows(J);
            this.syncRowHeights(J, J);
            this.layout();
            this.fireEvent("rowremoved", this, J, I);
        }
    },

    onLoad : function(){
        this.scrollToTop();
    },

    

    scrollToTop : function(){
        if(this.scroller){
            this.scroller.dom.scrollTop = 0;
            this.syncScroll();
        }
    },

    

    getHeaderPanel : function(L){
        if(L){
            this.headerPanel.show();
        }
        return  this.headerPanel;
	},

	

    getFooterPanel : function(M){
        if(M){
            this.footerPanel.show();
        }
        return  this.footerPanel;
	},

	initElements : function(){
	    var  E = Roo.Element;
	    var  el = this.grid.getGridEl().dom.firstChild;
	    var  cs = el.childNodes;

	    this.el = new  E(el);
	    this.headerPanel = new  E(el.firstChild);
	    this.headerPanel.enableDisplayMode("block");

        this.scroller = new  E(cs[1]);
	    this.scrollSizer = new  E(this.scroller.dom.firstChild);

	    this.lockedWrap = new  E(cs[2]);
	    this.lockedHd = new  E(this.lockedWrap.dom.firstChild);
	    this.lockedBody = new  E(this.lockedWrap.dom.childNodes[1]);

	    this.mainWrap = new  E(cs[3]);
	    this.mainHd = new  E(this.mainWrap.dom.firstChild);
	    this.mainBody = new  E(this.mainWrap.dom.childNodes[1]);

	    this.footerPanel = new  E(cs[4]);
	    this.footerPanel.enableDisplayMode("block");

        this.focusEl = new  E(cs[5]);
        this.focusEl.swallowEvent("click", true);
        this.resizeProxy = new  E(cs[6]);

	    this.headerSelector = String.format(
	       '#{0} td.x-grid-hd, #{1} td.x-grid-hd',
	       this.lockedHd.id, this.mainHd.id
	    );

	    this.splitterSelector = String.format(
	       '#{0} div.x-grid-split, #{1} div.x-grid-split',
	       this.idToCssName(this.lockedHd.id), this.idToCssName(this.mainHd.id)
	    );
    },
    idToCssName : function(s)
    {
        return  s.replace(/[^a-z0-9]+/ig, '-');
    },

	getHeaderCell : function(N){
	    return  Roo.DomQuery.select(this.headerSelector)[N];
	},

	getHeaderCellMeasure : function(O){
	    return  this.getHeaderCell(O).firstChild;
	},

	getHeaderCellText : function(P){
	    return  this.getHeaderCell(P).firstChild.firstChild;
	},

	getLockedTable : function(){
	    return  this.lockedBody.dom.firstChild;
	},

	getBodyTable : function(){
	    return  this.mainBody.dom.firstChild;
	},

	getLockedRow : function(Q){
	    return  this.getLockedTable().rows[Q];
	},

	getRow : function(R){
	    return  this.getBodyTable().rows[R];
	},

	getRowComposite : function(S){
	    if(!this.rowEl){
	        this.rowEl = new  Roo.CompositeElementLite();
	    }
        var  T = [], U, V;
        if(U = this.getLockedRow(S)){
            T.push(U);
        }
        if(V = this.getRow(S)){
            T.push(V);
        }

        this.rowEl.elements = T;
	    return  this.rowEl;
	},

	getCell : function(W, X){
	    var  Y = this.cm.getLockedCount();
	    var  Z;
	    if(X < Y){
	        Z = this.lockedBody.dom.firstChild;
	    }else {
	        Z = this.mainBody.dom.firstChild;
	        X -= Y;
	    }
        return  Z.rows[W].childNodes[X];
	},

	getCellText : function(a, b){
	    return  this.getCell(a, b).firstChild.firstChild;
	},

	getCellBox : function(c){
	    var  b = this.fly(c).getBox();
        if(Roo.isOpera){ 
            b.y = c.offsetTop + this.mainBody.getY();
        }
        return  b;
    },

    getCellIndex : function(d){
        var  id = String(d.className).match(this.cellRE);
        if(id){
            return  parseInt(id[1], 10);
        }
        return  0;
    },

    findHeaderIndex : function(n){
        var  r = Roo.fly(n).findParent("td." + this.hdClass, 6);
        return  r ? this.getCellIndex(r) : false;
    },

    findHeaderCell : function(n){
        var  r = Roo.fly(n).findParent("td." + this.hdClass, 6);
        return  r ? r : false;
    },

    findRowIndex : function(n){
        if(!n){
            return  false;
        }
        var  r = Roo.fly(n).findParent("tr." + this.rowClass, 6);
        return  r ? r.rowIndex : false;
    },

    findCellIndex : function(e){
        var  f = this.el.dom;
        while(e && e != f){
            if(this.findRE.test(e.className)){
                return  this.getCellIndex(e);
            }

            e = e.parentNode;
        }
        return  false;
    },

    getColumnId : function(g){
	    return  this.cm.getColumnId(g);
	},

	getSplitters : function(){
	    if(this.splitterSelector){
	       return  Roo.DomQuery.select(this.splitterSelector);
	    }else {
	        return  null;
	    }
	},

	getSplitter : function(k){
	    return  this.getSplitters()[k];
	},

    onRowOver : function(e, t){
        var  o;
        if((o = this.findRowIndex(t)) !== false){
            this.getRowComposite(o).addClass("x-grid-row-over");
        }
    },

    onRowOut : function(e, t){
        var  p;
        if((p = this.findRowIndex(t)) !== false && p !== this.findRowIndex(e.getRelatedTarget())){
            this.getRowComposite(p).removeClass("x-grid-row-over");
        }
    },

    renderHeaders : function(){
	    var  cm = this.cm;
        var  ct = this.templates.hcell, ht = this.templates.header, st = this.templates.hsplit;
        var  cb = [], lb = [], sb = [], q = [], p = {};
        for(var  i = 0, len = cm.getColumnCount(); i < len; i++){
            p.cellId = "x-grid-hd-0-" + i;
            p.splitId = "x-grid-csplit-0-" + i;
            p.id = cm.getColumnId(i);
            p.title = cm.getColumnTooltip(i) || "";
            p.value = cm.getColumnHeader(i) || "";
            p.style = (this.grid.enableColumnResize === false || !cm.isResizable(i) || cm.isFixed(i)) ? 'cursor:default' : '';
            if(!cm.isLocked(i)){
                cb[cb.length] = ct.apply(p);
                sb[sb.length] = st.apply(p);
            }else {
                lb[lb.length] = ct.apply(p);
                q[q.length] = st.apply(p);
            }
        }
        return  [ht.apply({cells: lb.join(""), splits:q.join("")}),
                ht.apply({cells: cb.join(""), splits:sb.join("")})];
	},

	updateHeaders : function(){
        var  u = this.renderHeaders();
        this.lockedHd.update(u[0]);
        this.mainHd.update(u[1]);
    },

    

    focusRow : function(v){
        var  x = this.scroller.dom.scrollLeft;
        this.focusCell(v, 0, false);
        this.scroller.dom.scrollLeft = x;
    },

    

    focusCell : function(y, z, AA){
        var  el = this.ensureVisible(y, z, AA);
        this.focusEl.alignTo(el, "tl-tl");
        if(Roo.isGecko){
            this.focusEl.focus();
        }else {
            this.focusEl.focus.defer(1, this.focusEl);
        }
    },

    

    ensureVisible : function(AB, AC, AD){
        if(typeof  AB != "number"){
            AB = AB.rowIndex;
        }
        if(AB < 0 && AB >= this.ds.getCount()){
            return;
        }

        AC = (AC !== undefined ? AC : 0);
        var  cm = this.grid.colModel;
        while(cm.isHidden(AC)){
            AC++;
        }

        var  el = this.getCell(AB, AC);
        if(!el){
            return;
        }
        var  c = this.scroller.dom;

        var  AE = parseInt(el.offsetTop, 10);
        var  AF = parseInt(el.offsetLeft, 10);
        var  AG = AE + el.offsetHeight;
        var  AH = AF + el.offsetWidth;

        var  ch = c.clientHeight - this.mainHd.dom.offsetHeight;
        var  AI = parseInt(c.scrollTop, 10);
        var  AJ = parseInt(c.scrollLeft, 10);
        var  AK = AI + ch;
        var  AL = AJ + c.clientWidth;

        if(AE < AI){
        	c.scrollTop = AE;
        }else  if(AG > AK){
            c.scrollTop = AG-ch;
        }

        if(AD !== false){
            if(AF < AJ){
                c.scrollLeft = AF;
            }else  if(AH > AL){
                c.scrollLeft = AH-c.clientWidth;
            }
        }
        return  el;
    },

    updateColumns : function(){
        this.grid.stopEditing();
        var  cm = this.grid.colModel, AM = this.getColumnIds();
        
        var  AN = 0;
        for(var  i = 0, len = cm.getColumnCount(); i < len; i++){
            
            var  w = cm.getColumnWidth(i);
            this.css.updateRule(this.colSelector+this.idToCssName(AM[i]), "width", (w - this.borderWidth) + "px");
            this.css.updateRule(this.hdSelector+this.idToCssName(AM[i]), "width", (w - this.borderWidth) + "px");
        }

        this.updateSplitters();
    },

    generateRules : function(cm){
        var  AO = [], AP = this.idToCssName(this.grid.id)+ '-cssrules';
        Roo.util.CSS.removeStyleSheet(AP);
        for(var  i = 0, len = cm.getColumnCount(); i < len; i++){
            var  cid = cm.getColumnId(i);
            var  align = '';
            if(cm.config[i].align){
                align = 'text-align:'+cm.config[i].align+';';
            }
            var  hidden = '';
            if(cm.isHidden(i)){
                hidden = 'display:none;';
            }
            var  width = "width:" + (cm.getColumnWidth(i) - this.borderWidth) + "px;";
            AO.push(
                    this.colSelector, cid, " {\n", cm.config[i].css, align, width, "\n}\n",
                    this.hdSelector, cid, " {\n", align, width, "}\n",
                    this.tdSelector, cid, " {\n",hidden,"\n}\n",
                    this.splitSelector, cid, " {\n", hidden , "\n}\n");
        }
        return  Roo.util.CSS.createStyleSheet(AO.join(""), AP);
    },

    updateSplitters : function(){
        var  cm = this.cm, s = this.getSplitters();
        if(s){ 
            var  AN = 0, Y = true;
            for(var  i = 0, len = cm.getColumnCount(); i < len; i++){
                if(cm.isHidden(i)) continue;
                var  w = cm.getColumnWidth(i);
                if(!cm.isLocked(i) && Y){
                    AN = 0;
                    Y = false;
                }

                AN += w;
                s[i].style.left = (AN-this.splitOffset) + "px";
            }
        }
    },

    handleHiddenChange : function(AQ, AR, AS){
        if(AS){
            this.hideColumn(AR);
        }else {
            this.unhideColumn(AR);
        }
    },

    hideColumn : function(AT){
        var  AU = this.getColumnId(AT);
        this.css.updateRule(this.tdSelector+this.idToCssName(AU), "display", "none");
        this.css.updateRule(this.splitSelector+this.idToCssName(AU), "display", "none");
        if(Roo.isSafari){
            this.updateHeaders();
        }

        this.updateSplitters();
        this.layout();
    },

    unhideColumn : function(AV){
        var  AW = this.getColumnId(AV);
        this.css.updateRule(this.tdSelector+this.idToCssName(AW), "display", "");
        this.css.updateRule(this.splitSelector+this.idToCssName(AW), "display", "");

        if(Roo.isSafari){
            this.updateHeaders();
        }

        this.updateSplitters();
        this.layout();
    },

    insertRows : function(dm, AX, AY, AZ){
        if(AX == 0 && AY == dm.getCount()-1){
            this.refresh();
        }else {
            if(!AZ){
                this.fireEvent("beforerowsinserted", this, AX, AY);
            }
            var  s = this.getScrollState();
            var  markup = this.renderRows(AX, AY);
            this.bufferRows(markup[0], this.getLockedTable(), AX);
            this.bufferRows(markup[1], this.getBodyTable(), AX);
            this.restoreScroll(s);
            if(!AZ){
                this.fireEvent("rowsinserted", this, AX, AY);
                this.syncRowHeights(AX, AY);
                this.stripeRows(AX);
                this.layout();
            }
        }
    },

    bufferRows : function(Aa, Ab, Ac){
        var  Ad = null, Ae = Ab.rows, Af = Ab.tBodies[0];
        if(Ac < Ae.length){
            Ad = Ae[Ac];
        }
        var  b = document.createElement("div");
        b.innerHTML = "<table><tbody>"+Aa+"</tbody></table>";
        var  Ag = b.firstChild.rows;
        for(var  i = 0, len = Ag.length; i < len; i++){
            if(Ad){
                Af.insertBefore(Ag[0], Ad);
            }else {
                Af.appendChild(Ag[0]);
            }
        }

        b.innerHTML = "";
        b = null;
    },

    deleteRows : function(dm, Ah, Ai){
        if(dm.getRowCount()<1){
            this.fireEvent("beforerefresh", this);
            this.mainBody.update("");
            this.lockedBody.update("");
            this.fireEvent("refresh", this);
        }else {
            this.fireEvent("beforerowsdeleted", this, Ah, Ai);
            var  bt = this.getBodyTable();
            var  Af = bt.firstChild;
            var  Ag = bt.rows;
            for(var  a = Ah; a <= Ai; a++){
                Af.removeChild(Ag[Ah]);
            }

            this.stripeRows(Ah);
            this.fireEvent("rowsdeleted", this, Ah, Ai);
        }
    },

    updateRows : function(Aj, Ak, Al){
        var  s = this.getScrollState();
        this.refresh();
        this.restoreScroll(s);
    },

    handleSort : function(Am, An, Ao, Ap){
        if(!Ap){
           this.refresh();
        }

        this.updateHeaderSortState();
    },

    getScrollState : function(){
        var  sb = this.scroller.dom;
        return  {left: sb.scrollLeft, top: sb.scrollTop};
    },

    stripeRows : function(Aq){
        if(!this.grid.stripeRows || this.ds.getCount() < 1){
            return;
        }

        Aq = Aq || 0;
        var  Ar = this.getBodyTable().rows;
        var  As = this.getLockedTable().rows;
        var  At = ' x-grid-row-alt ';
        for(var  i = Aq, len = Ar.length; i < len; i++){
            var  AB = Ar[i], U = As[i];
            var  isAlt = ((i+1) % 2 == 0);
            var  hasAlt = (' '+AB.className + ' ').indexOf(At) != -1;
            if(isAlt == hasAlt){
                continue;
            }
            if(isAlt){
                AB.className += " x-grid-row-alt";
            }else {
                AB.className = AB.className.replace("x-grid-row-alt", "");
            }
            if(U){
                U.className = AB.className;
            }
        }
    },

    restoreScroll : function(Au){
        var  sb = this.scroller.dom;
        sb.scrollLeft = Au.left;
        sb.scrollTop = Au.top;
        this.syncScroll();
    },

    syncScroll : function(){
        var  sb = this.scroller.dom;
        var  sh = this.mainHd.dom;
        var  bs = this.mainBody.dom;
        var  lv = this.lockedBody.dom;
        sh.scrollLeft = bs.scrollLeft = sb.scrollLeft;
        lv.scrollTop = bs.scrollTop = sb.scrollTop;
    },

    handleScroll : function(e){
        this.syncScroll();
        var  sb = this.scroller.dom;
        this.grid.fireEvent("bodyscroll", sb.scrollLeft, sb.scrollTop);
        e.stopEvent();
    },

    handleWheel : function(e){
        var  d = e.getWheelDelta();
        this.scroller.dom.scrollTop -= d*22;
        
        this.lockedBody.dom.scrollTop = this.mainBody.dom.scrollTop = this.scroller.dom.scrollTop;
        e.stopEvent();
    },

    renderRows : function(Av, Aw){
        
        var  g = this.grid, cm = g.colModel, ds = g.dataSource, Ax = g.stripeRows;
        var  Ay = cm.getColumnCount();

        if(ds.getCount() < 1){
            return  ["", ""];
        }

        
        var  cs = [];
        for(var  i = 0; i < Ay; i++){
            var  name = cm.getDataIndex(i);
            cs[i] = {
                name : typeof  name == 'undefined' ? ds.fields.get(i).name : name,
                renderer : cm.getRenderer(i),
                id : cm.getColumnId(i),
                locked : cm.isLocked(i)
            };
        }


        Av = Av || 0;
        Aw = typeof  Aw == "undefined"? ds.getCount()-1 : Aw;

        
        var  rs = ds.getRange(Av, Aw);

        return  this.doRender(cs, rs, ds, Av, Ay, Ax);
    },

    
    
    
    doRender : Roo.isGecko ?
            function(cs, rs, ds, Az, A0, A1){
                var  ts = this.templates, ct = ts.cell, rt = ts.row;
                
                var  A2 = "", A3 = "", cb, A4, c, p = {}, rp = {}, r, a;
                for(var  j = 0, len = rs.length; j < len; j++){
                    r = rs[j]; cb = ""; A4 = ""; a = (j+Az);
                    for(var  i = 0; i < A0; i++){
                        c = cs[i];
                        p.cellId = "x-grid-cell-" + a + "-" + i;
                        p.id = c.id;
                        p.css = p.attr = "";
                        p.value = c.renderer(r.data[c.name], p, r, a, i, ds);
                        if(p.value == undefined || p.value === "") p.value = "&#160;";
                        if(r.dirty && typeof  r.modified[c.name] !== 'undefined'){
                            p.css += p.css ? ' x-grid-dirty-cell' : 'x-grid-dirty-cell';
                        }
                        var  Aa = ct.apply(p);
                        if(!c.locked){
                            cb+= Aa;
                        }else {
                            A4+= Aa;
                        }
                    }
                    var  alt = [];
                    if(A1 && ((a+1) % 2 == 0)){
                        alt[0] = "x-grid-row-alt";
                    }
                    if(r.dirty){
                        alt[1] = " x-grid-dirty-row";
                    }

                    rp.cells = A4;
                    if(this.getRowClass){
                        alt[2] = this.getRowClass(r, a);
                    }

                    rp.alt = alt.join(" ");
                    A3+= rt.apply(rp);
                    rp.cells = cb;
                    A2+=  rt.apply(rp);
                }
                return  [A3, A2];
            } :
            function(cs, rs, ds, A5, A6, A7){
                var  ts = this.templates, ct = ts.cell, rt = ts.row;
                
                var  A8 = [], A9 = [], cb, BA, c, p = {}, rp = {}, r, a;
                for(var  j = 0, len = rs.length; j < len; j++){
                    r = rs[j]; cb = []; BA = []; a = (j+A5);
                    for(var  i = 0; i < A6; i++){
                        c = cs[i];
                        p.cellId = "x-grid-cell-" + a + "-" + i;
                        p.id = c.id;
                        p.css = p.attr = "";
                        p.value = c.renderer(r.data[c.name], p, r, a, i, ds);
                        if(p.value == undefined || p.value === "") p.value = "&#160;";
                        if(r.dirty && typeof  r.modified[c.name] !== 'undefined'){
                            p.css += p.css ? ' x-grid-dirty-cell' : 'x-grid-dirty-cell';
                        }
                        var  Aa = ct.apply(p);
                        if(!c.locked){
                            cb[cb.length] = Aa;
                        }else {
                            BA[BA.length] = Aa;
                        }
                    }
                    var  alt = [];
                    if(A7 && ((a+1) % 2 == 0)){
                        alt[0] = "x-grid-row-alt";
                    }
                    if(r.dirty){
                        alt[1] = " x-grid-dirty-row";
                    }

                    rp.cells = BA;
                    if(this.getRowClass){
                        alt[2] = this.getRowClass(r, a);
                    }

                    rp.alt = alt.join(" ");
                    rp.cells = BA.join("");
                    A9[A9.length] = rt.apply(rp);
                    rp.cells = cb.join("");
                    A8[A8.length] =  rt.apply(rp);
                }
                return  [A9.join(""), A8.join("")];
            },

    renderBody : function(){
        var  BB = this.renderRows();
        var  bt = this.templates.body;
        return  [bt.apply({rows: BB[0]}), bt.apply({rows: BB[1]})];
    },

    

    refresh : function(BC){
        this.fireEvent("beforerefresh", this);
        this.grid.stopEditing();
        var  BD = this.renderBody();
        this.lockedBody.update(BD[0]);
        this.mainBody.update(BD[1]);
        if(BC === true){
            this.updateHeaders();
            this.updateColumns();
            this.updateSplitters();
            this.updateHeaderSortState();
        }

        this.syncRowHeights();
        this.layout();
        this.fireEvent("refresh", this);
    },

    handleColumnMove : function(cm, BE, BF){
        this.indexMap = null;
        var  s = this.getScrollState();
        this.refresh(true);
        this.restoreScroll(s);
        this.afterMove(BF);
    },

    afterMove : function(BG){
        if(this.enableMoveAnim && Roo.enableFx){
            this.fly(this.getHeaderCell(BG).firstChild).highlight(this.hlColor);
        }
    },

    updateCell : function(dm, BH, BI){
        var  BJ = this.getColumnIndexByDataIndex(BI);
        if(typeof  BJ == "undefined"){ 
            return;
        }
        var  cm = this.grid.colModel;
        var  BK = this.getCell(BH, BJ);
        var  BL = this.getCellText(BH, BJ);

        var  p = {
            cellId : "x-grid-cell-" + BH + "-" + BJ,
            id : cm.getColumnId(BJ),
            css: BJ == cm.getColumnCount()-1 ? "x-grid-col-last" : ""
        };
        var  BM = cm.getRenderer(BJ);
        var  BN = BM(dm.getValueAt(BH, BI), p, BH, BJ, dm);
        if(typeof  BN == "undefined" || BN === "") BN = "&#160;";
        BL.innerHTML = BN;
        BK.className = this.cellClass + " " + this.idToCssName(p.cellId) + " " + p.css;
        this.syncRowHeights(BH, BH);
    },

    calcColumnWidth : function(BO, BP){
        var  BQ = 0;
        if(this.grid.autoSizeHeaders){
            var  h = this.getHeaderCellMeasure(BO);
            BQ = Math.max(BQ, h.scrollWidth);
        }
        var  tb, BR;
        if(this.cm.isLocked(BO)){
            tb = this.getLockedTable();
            BR = BO;
        }else {
            tb = this.getBodyTable();
            BR = BO - this.cm.getLockedCount();
        }
        if(tb && tb.rows){
            var  Ar = tb.rows;
            var  stopIndex = Math.min(BP || Ar.length, Ar.length);
            for(var  i = 0; i < stopIndex; i++){
                var  BK = Ar[i].childNodes[BR].firstChild;
                BQ = Math.max(BQ, BK.scrollWidth);
            }
        }
        return  BQ + 
 5;
    },
    

     autoSizeColumn : function(BS, BT, BU){
         if(this.cm.isHidden(BS)){
             return; 
         }
        if(BT){
            var  AW = this.cm.getColumnId(BS);
            this.css.updateRule(this.colSelector +this.idToCssName( AW), "width", this.grid.minColumnWidth + "px");
           if(this.grid.autoSizeHeaders){
               this.css.updateRule(this.hdSelector + this.idToCssName(AW), "width", this.grid.minColumnWidth + "px");
           }
        }
        var  BV = this.calcColumnWidth(BS);
        this.cm.setColumnWidth(BS,
            Math.max(this.grid.minColumnWidth, BV), BU);
        if(!BU){
            this.grid.fireEvent("columnresize", BS, BV);
        }
    },

    

     autoSizeColumns : function(){
        var  cm = this.grid.colModel;
        var  BW = cm.getColumnCount();
        for(var  i = 0; i < BW; i++){
            this.autoSizeColumn(i, true, true);
        }
        if(cm.getTotalWidth() < this.scroller.dom.clientWidth){
            this.fitColumns();
        }else {
            this.updateColumns();
            this.layout();
        }
    },

    

    fitColumns : function(BX){
        var  cm = this.grid.colModel;
        var  BY = cm.getColumnCount();
        var  BZ = [];
        var  Ba = 0;
        var  i, w;
        for (i = 0; i < BY; i++){
            if(!cm.isHidden(i) && !cm.isFixed(i)){
                w = cm.getColumnWidth(i);
                BZ.push(i);
                BZ.push(w);
                Ba += w;
            }
        }
        var  Bb = Math.min(this.scroller.dom.clientWidth, this.el.getWidth());
        if(BX){
            Bb -= 17;
        }
        var  Bc = (Bb - cm.getTotalWidth())/Ba;
        while (BZ.length){
            w = BZ.pop();
            i = BZ.pop();
            cm.setColumnWidth(i, Math.floor(w + w*Bc), true);
        }

        this.updateColumns();
        this.layout();
    },

    onRowSelect : function(Bd){
        var  Be = this.getRowComposite(Bd);
        Be.addClass("x-grid-row-selected");
    },

    onRowDeselect : function(Bf){
        var  Bg = this.getRowComposite(Bf);
        Bg.removeClass("x-grid-row-selected");
    },

    onCellSelect : function(Bh, Bi){
        var  Bj = this.getCell(Bh, Bi);
        if(Bj){
            Roo.fly(Bj).addClass("x-grid-cell-selected");
        }
    },

    onCellDeselect : function(Bk, Bl){
        var  Bm = this.getCell(Bk, Bl);
        if(Bm){
            Roo.fly(Bm).removeClass("x-grid-cell-selected");
        }
    },

    updateHeaderSortState : function(){
        var  Bn = this.ds.getSortState();
        if(!Bn){
            return;
        }

        this.sortState = Bn;
        var  Bo = this.cm.findColumnIndex(Bn.field);
        if(Bo != -1){
            var  Ao = Bn.direction;
            var  sc = this.sortClasses;
            var  hds = this.el.select(this.headerSelector).removeClass(sc);
            hds.item(Bo).addClass(sc[Ao == "DESC" ? 1 : 0]);
        }
    },

    handleHeaderClick : function(g, Bp){
        if(this.headersDisabled){
            return;
        }
        var  dm = g.dataSource, cm = g.colModel;
	    if(!cm.isSortable(Bp)){
            return;
        }

	    g.stopEditing();
        dm.sort(cm.getDataIndex(Bp));
    },


    destroy : function(){
        if(this.colMenu){
            this.colMenu.removeAll();
            Roo.menu.MenuMgr.unregister(this.colMenu);
            this.colMenu.getEl().remove();
            delete  this.colMenu;
        }
        if(this.hmenu){
            this.hmenu.removeAll();
            Roo.menu.MenuMgr.unregister(this.hmenu);
            this.hmenu.getEl().remove();
            delete  this.hmenu;
        }
        if(this.grid.enableColumnMove){
            var  dds = Roo.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            if(dds){
                for(var  dd  in  dds){
                    if(!dds[dd].config.isTarget && dds[dd].dragElId){
                        var  elid = dds[dd].dragElId;
                        dds[dd].unreg();
                        Roo.get(elid).remove();
                    } else  if(dds[dd].config.isTarget){
                        dds[dd].proxyTop.remove();
                        dds[dd].proxyBottom.remove();
                        dds[dd].unreg();
                    }
                    if(Roo.dd.DDM.locationCache[dd]){
                        delete  Roo.dd.DDM.locationCache[dd];
                    }
                }
                delete  Roo.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            }
        }

        Roo.util.CSS.removeStyleSheet(this.idToCssName(this.grid.id) + '-cssrules');
        this.bind(null, null);
        Roo.EventManager.removeResizeListener(this.onWindowResize, this);
    },

    handleLockChange : function(){
        this.refresh(true);
    },

    onDenyColumnLock : function(){

    },

    onDenyColumnHide : function(){

    },

    handleHdMenuClick : function(Bq){
        var  Br = this.hdCtxIndex;
        var  cm = this.cm, ds = this.ds;
        switch(Bq.id){
            case  "asc":
                ds.sort(cm.getDataIndex(Br), "ASC");
                break;
            case  "desc":
                ds.sort(cm.getDataIndex(Br), "DESC");
                break;
            case  "lock":
                var  lc = cm.getLockedCount();
                if(cm.getColumnCount(true) <= lc+1){
                    this.onDenyColumnLock();
                    return;
                }
                if(lc != Br){
                    cm.setLocked(Br, true, true);
                    cm.moveColumn(Br, lc);
                    this.grid.fireEvent("columnmove", Br, lc);
                }else {
                    cm.setLocked(Br, true);
                }
            break;
            case  "unlock":
                var  lc = cm.getLockedCount();
                if((lc-1) != Br){
                    cm.setLocked(Br, false, true);
                    cm.moveColumn(Br, lc-1);
                    this.grid.fireEvent("columnmove", Br, lc-1);
                }else {
                    cm.setLocked(Br, false);
                }
            break;
            default:
                Br = cm.getIndexById(Bq.id.substr(4));
                if(Br != -1){
                    if(Bq.checked && cm.getColumnCount(true) <= 1){
                        this.onDenyColumnHide();
                        return  false;
                    }

                    cm.setHidden(Br, Bq.checked);
                }
        }
        return  true;
    },

    beforeColMenuShow : function(){
        var  cm = this.cm,  Bs = cm.getColumnCount();
        this.colMenu.removeAll();
        for(var  i = 0; i < Bs; i++){
            this.colMenu.add(new  Roo.menu.CheckItem({
                id: "col-"+cm.getColumnId(i),
                text: cm.getColumnHeader(i),
                checked: !cm.isHidden(i),
                hideOnClick:false
            }));
        }
    },

    handleHdCtx : function(g, Bt, e){
        e.stopEvent();
        var  hd = this.getHeaderCell(Bt);
        this.hdCtxIndex = Bt;
        var  ms = this.hmenu.items, cm = this.cm;
        ms.get("asc").setDisabled(!cm.isSortable(Bt));
        ms.get("desc").setDisabled(!cm.isSortable(Bt));
        if(this.grid.enableColLock !== false){
            ms.get("lock").setDisabled(cm.isLocked(Bt));
            ms.get("unlock").setDisabled(!cm.isLocked(Bt));
        }

        this.hmenu.show(hd, "tl-bl");
    },

    handleHdOver : function(e){
        var  hd = this.findHeaderCell(e.getTarget());
        if(hd && !this.headersDisabled){
            if(this.grid.colModel.isSortable(this.getCellIndex(hd))){
               this.fly(hd).addClass("x-grid-hd-over");
            }
        }
    },

    handleHdOut : function(e){
        var  hd = this.findHeaderCell(e.getTarget());
        if(hd){
            this.fly(hd).removeClass("x-grid-hd-over");
        }
    },

    handleSplitDblClick : function(e, t){
        var  i = this.getCellIndex(t);
        if(this.grid.enableColumnResize !== false && this.cm.isResizable(i) && !this.cm.isFixed(i)){
            this.autoSizeColumn(i, true);
            this.layout();
        }
    },

    render : function(){

        var  cm = this.cm;
        var  Bu = cm.getColumnCount();

        if(this.grid.monitorWindowResize === true){
            Roo.EventManager.onWindowResize(this.onWindowResize, this, true);
        }
        var  Bv = this.renderHeaders();
        var  Bw = this.templates.body.apply({rows:""});
        var  Bx = this.templates.master.apply({
            lockedBody: Bw,
            body: Bw,
            lockedHeader: Bv[0],
            header: Bv[1]
        });

        

        this.grid.getGridEl().dom.innerHTML = Bx;

        this.initElements();

        this.scroller.on("scroll", this.handleScroll, this);
        this.lockedBody.on("mousewheel", this.handleWheel, this);
        this.mainBody.on("mousewheel", this.handleWheel, this);

        this.mainHd.on("mouseover", this.handleHdOver, this);
        this.mainHd.on("mouseout", this.handleHdOut, this);
        this.mainHd.on("dblclick", this.handleSplitDblClick, this,
                {delegate: "."+this.splitClass});

        this.lockedHd.on("mouseover", this.handleHdOver, this);
        this.lockedHd.on("mouseout", this.handleHdOut, this);
        this.lockedHd.on("dblclick", this.handleSplitDblClick, this,
                {delegate: "."+this.splitClass});

        if(this.grid.enableColumnResize !== false && Roo.grid.SplitDragZone){
            new  Roo.grid.SplitDragZone(this.grid, this.lockedHd.dom, this.mainHd.dom);
        }


        this.updateSplitters();

        if(this.grid.enableColumnMove && Roo.grid.HeaderDragZone){
            new  Roo.grid.HeaderDragZone(this.grid, this.lockedHd.dom, this.mainHd.dom);
            new  Roo.grid.HeaderDropZone(this.grid, this.lockedHd.dom, this.mainHd.dom);
        }

        if(this.grid.enableCtxMenu !== false && Roo.menu.Menu){
            this.hmenu = new  Roo.menu.Menu({id: this.grid.id + "-hctx"});
            this.hmenu.add(
                {id:"asc", text: this.sortAscText, cls: "xg-hmenu-sort-asc"},
                {id:"desc", text: this.sortDescText, cls: "xg-hmenu-sort-desc"}
            );
            if(this.grid.enableColLock !== false){
                this.hmenu.add('-',
                    {id:"lock", text: this.lockText, cls: "xg-hmenu-lock"},
                    {id:"unlock", text: this.unlockText, cls: "xg-hmenu-unlock"}
                );
            }
            if(this.grid.enableColumnHide !== false){

                this.colMenu = new  Roo.menu.Menu({id:this.grid.id + "-hcols-menu"});
                this.colMenu.on("beforeshow", this.beforeColMenuShow, this);
                this.colMenu.on("itemclick", this.handleHdMenuClick, this);

                this.hmenu.add('-',
                    {id:"columns", text: this.columnsText, menu: this.colMenu}
                );
            }

            this.hmenu.on("itemclick", this.handleHdMenuClick, this);

            this.grid.on("headercontextmenu", this.handleHdCtx, this);
        }

        if((this.grid.enableDragDrop || this.grid.enableDrag) && Roo.grid.GridDragZone){
            this.dd = new  Roo.grid.GridDragZone(this.grid, {
                ddGroup : this.grid.ddGroup || 'GridDD'
            });
        }


        

        
        this.updateHeaderSortState();

        this.beforeInitialResize();
        this.layout(true);

        
        this.renderPhase2.defer(1, this);
    },

    renderPhase2 : function(){
        
        this.refresh();
        if(this.grid.autoSizeColumns){
            this.autoSizeColumns();
        }
    },

    beforeInitialResize : function(){

    },

    onColumnSplitterMoved : function(i, w){
        this.userResized = true;
        var  cm = this.grid.colModel;
        cm.setColumnWidth(i, w, true);
        var  By = cm.getColumnId(i);
        this.css.updateRule(this.colSelector + this.idToCssName(By), "width", (w-this.borderWidth) + "px");
        this.css.updateRule(this.hdSelector + this.idToCssName(By), "width", (w-this.borderWidth) + "px");
        this.updateSplitters();
        this.layout();
        this.grid.fireEvent("columnresize", i, w);
    },

    syncRowHeights : function(Bz, B0){
        if(this.grid.enableRowHeightSync === true && this.cm.getLockedCount() > 0){
            Bz = Bz || 0;
            var  mrows = this.getBodyTable().rows;
            var  As = this.getLockedTable().rows;
            var  len = mrows.length-1;
            B0 = Math.min(B0 || len, len);
            for(var  i = Bz; i <= B0; i++){
                var  m = mrows[i], l = As[i];
                var  h = Math.max(m.offsetHeight, l.offsetHeight);
                m.style.height = l.style.height = h + "px";
            }
        }
    },

    layout : function(B1, B2){
        var  g = this.grid;
        var  B3 = g.autoHeight;
        var  B4 = 16;
        var  c = g.getGridEl(), cm = this.cm,
                B5 = g.autoExpandColumn,
                gv = this;
        

        if(!c.dom.offsetWidth){ 
            if(B1){
                this.lockedWrap.show();
                this.mainWrap.show();
            }
            return;
        }

        var  B6 = this.cm.isLocked(0);

        var  B7 = this.headerPanel.getHeight();
        var  B8 = this.footerPanel.getHeight();

        if(B3){
            var  ch = this.getBodyTable().offsetHeight + B7 + B8 + this.mainHd.getHeight();
            var  newHeight = ch + c.getBorderWidth("tb");
            if(g.maxHeight){
                newHeight = Math.min(g.maxHeight, newHeight);
            }

            c.setHeight(newHeight);
        }

        if(g.autoWidth){
            c.setWidth(cm.getTotalWidth()+c.getBorderWidth('lr'));
        }

        var  s = this.scroller;

        var  B9 = c.getSize(true);

        this.el.setSize(B9.width, B9.height);

        this.headerPanel.setWidth(B9.width);
        this.footerPanel.setWidth(B9.width);

        var  CA = this.mainHd.getHeight();
        var  vw = B9.width;
        var  vh = B9.height - (B7 + B8);

        s.setSize(vw, vh);

        var  bt = this.getBodyTable();
        var  CB = B6 ?
                      Math.max(this.getLockedTable().offsetWidth, this.lockedHd.dom.firstChild.offsetWidth) : 0;

        var  CC = bt.offsetHeight;
        var  CD = CB + bt.offsetWidth;
        var  CE = false, CF = false;

        this.scrollSizer.setSize(CD, CC+CA);

        var  lw = this.lockedWrap, mw = this.mainWrap;
        var  lb = this.lockedBody, mb = this.mainBody;

        setTimeout(function(){
            var  t = s.dom.offsetTop;
            var  w = s.dom.clientWidth,
                h = s.dom.clientHeight;

            lw.setTop(t);
            lw.setSize(CB, h);

            mw.setLeftTop(CB, t);
            mw.setSize(w-CB, h);

            lb.setHeight(h-CA);
            mb.setHeight(h-CA);

            if(B2 !== true && !gv.userResized && B5){
                
                
                var  ci = cm.getIndexById(B5);
                if (ci < 0) {
                    ci = cm.findColumnIndex(B5);
                }

                ci = Math.max(0, ci); 
                var  expandId = cm.getColumnId(ci);
                var   tw = cm.getTotalWidth(false);
                var  currentWidth = cm.getColumnWidth(ci);
                var  cw = Math.min(Math.max(((w-tw)+currentWidth-2)-
(w <= s.dom.offsetWidth ? 0 : 18), g.autoExpandMin), g.autoExpandMax);
                if(currentWidth != cw){
                    cm.setColumnWidth(ci, cw, true);
                    gv.css.updateRule(gv.colSelector+gv.idToCssName(expandId), "width", (cw - gv.borderWidth) + "px");
                    gv.css.updateRule(gv.hdSelector+gv.idToCssName(expandId), "width", (cw - gv.borderWidth) + "px");
                    gv.updateSplitters();
                    gv.layout(false, true);
                }
            }

            if(B1){
                lw.show();
                mw.show();
            }
            
        }, 10);
    },

    onWindowResize : function(){
        if(!this.grid.monitorWindowResize || this.grid.autoHeight){
            return;
        }

        this.layout();
    },

    appendFooter : function(CG){
        return  null;
    },

    sortAscText : "Sort Ascending",
    sortDescText : "Sort Descending",
    lockText : "Lock Column",
    unlockText : "Unlock Column",
    columnsText : "Columns"
});


Roo.grid.GridView.ColumnDragZone = function(CH, hd){
    Roo.grid.GridView.ColumnDragZone.superclass.constructor.call(this, CH, hd, null);
    this.proxy.el.addClass('x-grid3-col-dd');
};

Roo.extend(Roo.grid.GridView.ColumnDragZone, Roo.grid.HeaderDragZone, {
    handleMouseDown : function(e){

    },

    callHandleMouseDown : function(e){
        Roo.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this, e);
    }
});



 


Roo.grid.SplitDragZone = function(A, hd, B){
    this.grid = A;
    this.view = A.getView();
    this.proxy = this.view.resizeProxy;
    Roo.grid.SplitDragZone.superclass.constructor.call(this, hd,
        "gridSplitters" + this.grid.getGridEl().id, {
        dragElId : Roo.id(this.proxy.dom), resizeFrame:false
    });
    this.setHandleElId(Roo.id(hd));
    this.setOuterHandleElId(Roo.id(B));
    this.scroll = false;
};
Roo.extend(Roo.grid.SplitDragZone, Roo.dd.DDProxy, {
    fly: Roo.Element.fly,

    b4StartDrag : function(x, y){
        this.view.headersDisabled = true;
        this.proxy.setHeight(this.view.mainWrap.getHeight());
        var  w = this.cm.getColumnWidth(this.cellIndex);
        var  C = Math.max(w-this.grid.minColumnWidth, 0);
        this.resetConstraints();
        this.setXConstraint(C, 1000);
        this.setYConstraint(0, 0);
        this.minX = x - C;
        this.maxX = x + 1000;
        this.startPos = x;
        Roo.dd.DDProxy.prototype.b4StartDrag.call(this, x, y);
    },


    handleMouseDown : function(e){
        ev = Roo.EventObject.setEvent(e);
        var  t = this.fly(ev.getTarget());
        if(t.hasClass("x-grid-split")){
            this.cellIndex = this.view.getCellIndex(t.dom);
            this.split = t.dom;
            this.cm = this.grid.colModel;
            if(this.cm.isResizable(this.cellIndex) && !this.cm.isFixed(this.cellIndex)){
                Roo.grid.SplitDragZone.superclass.handleMouseDown.apply(this, arguments);
            }
        }
    },

    endDrag : function(e){
        this.view.headersDisabled = false;
        var  D = Math.max(this.minX, Roo.lib.Event.getPageX(e));
        var  E = D - this.startPos;
        this.view.onColumnSplitterMoved(this.cellIndex, this.cm.getColumnWidth(this.cellIndex)+E);
    },

    autoOffset : function(){
        this.setDelta(0,0);
    }
});


 


Roo.grid.GridDragZone = function(A, B){
    this.view = A.getView();
    Roo.grid.GridDragZone.superclass.constructor.call(this, this.view.mainBody.dom, B);
    if(this.view.lockedBody){
        this.setHandleElId(Roo.id(this.view.mainBody.dom));
        this.setOuterHandleElId(Roo.id(this.view.lockedBody.dom));
    }

    this.scroll = false;
    this.grid = A;
    this.ddel = document.createElement('div');
    this.ddel.className = 'x-grid-dd-wrap';
};

Roo.extend(Roo.grid.GridDragZone, Roo.dd.DragZone, {
    ddGroup : "GridDD",

    getDragData : function(e){
        var  t = Roo.lib.Event.getTarget(e);
        var  C = this.view.findRowIndex(t);
        if(C !== false){
            var  sm = this.grid.selModel;
            
              
            
            if (e.hasModifier()){
                sm.handleMouseDown(e, t); 
            }
            return  {grid: this.grid, ddel: this.ddel, rowIndex: C, selections:sm.getSelections()};
        }
        return  false;
    },

    onInitDrag : function(e){
        var  D = this.dragData;
        this.ddel.innerHTML = this.grid.getDragDropText();
        this.proxy.update(this.ddel);
        
    },

    afterRepair : function(){
        this.dragging = false;
    },

    getRepairXY : function(e, E){
        return  false;
    },

    onEndDrag : function(F, e){
        
    },

    onValidDrop : function(dd, e, id){
        
        this.hideProxy();
    },

    beforeInvalidDrop : function(e, id){

    }
});


 



Roo.grid.ColumnModel = function(A){
	

    this.config = A;
    this.lookup = {};

    
    
    
    for(var  i = 0, len = A.length; i < len; i++){
        var  c = A[i];
        if(typeof  c.dataIndex == "undefined"){
            c.dataIndex = i;
        }
        if(typeof  c.renderer == "string"){
            c.renderer = Roo.util.Format[c.renderer];
        }
        if(typeof  c.id == "undefined"){
            c.id = Roo.id();
        }
        if(c.editor && c.editor.xtype){
            c.editor  = Roo.factory(c.editor, Roo.grid);
        }
        if(c.editor && c.editor.isFormField){
            c.editor = new  Roo.grid.GridEditor(c.editor);
        }

        this.lookup[c.id] = c;
    }


    

    this.defaultWidth = 100;

    

    this.defaultSortable = false;

    this.addEvents({
        

	    "widthchange": true,
        

	    "headerchange": true,
        

	    "hiddenchange": true,
	    

        "columnmoved" : true,
        

        "columnlockchange" : true
    });
    Roo.grid.ColumnModel.superclass.constructor.call(this);
};
Roo.extend(Roo.grid.ColumnModel, Roo.util.Observable, {
    

    

    

    

    

    

    

    

    

       

    


    

    getColumnId : function(B){
        return  this.config[B].id;
    },

    

    getColumnById : function(id){
        return  this.lookup[id];
    },

    

    getIndexById : function(id){
        for(var  i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].id == id){
                return  i;
            }
        }
        return  -1;
    },
    

    
    findColumnIndex : function(C){
        for(var  i = 0, len = this.config.length; i < len; i++){
            if(this.config[i].dataIndex == C){
                return  i;
            }
        }
        return  -1;
    },
    
    
    moveColumn : function(D, E){
        var  c = this.config[D];
        this.config.splice(D, 1);
        this.config.splice(E, 0, c);
        this.dataMap = null;
        this.fireEvent("columnmoved", this, D, E);
    },

    isLocked : function(F){
        return  this.config[F].locked === true;
    },

    setLocked : function(G, H, I){
        if(this.isLocked(G) == H){
            return;
        }

        this.config[G].locked = H;
        if(!I){
            this.fireEvent("columnlockchange", this, G, H);
        }
    },

    getTotalLockedWidth : function(){
        var  J = 0;
        for(var  i = 0; i < this.config.length; i++){
            if(this.isLocked(i) && !this.isHidden(i)){
                this.totalWidth += this.getColumnWidth(i);
            }
        }
        return  J;
    },

    getLockedCount : function(){
        for(var  i = 0, len = this.config.length; i < len; i++){
            if(!this.isLocked(i)){
                return  i;
            }
        }
    },

    

    getColumnCount : function(K){
        if(K === true){
            var  c = 0;
            for(var  i = 0, len = this.config.length; i < len; i++){
                if(!this.isHidden(i)){
                    c++;
                }
            }
            return  c;
        }
        return  this.config.length;
    },

    

    getColumnsBy : function(fn, L){
        var  r = [];
        for(var  i = 0, len = this.config.length; i < len; i++){
            var  c = this.config[i];
            if(fn.call(L||this, c, i) === true){
                r[r.length] = c;
            }
        }
        return  r;
    },

    

    isSortable : function(M){
        if(typeof  this.config[M].sortable == "undefined"){
            return  this.defaultSortable;
        }
        return  this.config[M].sortable;
    },

    

    getRenderer : function(N){
        if(!this.config[N].renderer){
            return  Roo.grid.ColumnModel.defaultRenderer;
        }
        return  this.config[N].renderer;
    },

    

    setRenderer : function(O, fn){
        this.config[O].renderer = fn;
    },

    

    getColumnWidth : function(P){
        return  this.config[P].width || this.defaultWidth;
    },

    

    setColumnWidth : function(Q, R, S){
        this.config[Q].width = R;
        this.totalWidth = null;
        if(!S){
             this.fireEvent("widthchange", this, Q, R);
        }
    },

    

    getTotalWidth : function(T){
        if(!this.totalWidth){
            this.totalWidth = 0;
            for(var  i = 0, len = this.config.length; i < len; i++){
                if(T || !this.isHidden(i)){
                    this.totalWidth += this.getColumnWidth(i);
                }
            }
        }
        return  this.totalWidth;
    },

    

    getColumnHeader : function(U){
        return  this.config[U].header;
    },

    

    setColumnHeader : function(V, W){
        this.config[V].header = W;
        this.fireEvent("headerchange", this, V, W);
    },

    

    getColumnTooltip : function(X){
            return  this.config[X].tooltip;
    },
    

    setColumnTooltip : function(Y, Z){
            this.config[Y].tooltip = Z;
    },

    

    getDataIndex : function(a){
        return  this.config[a].dataIndex;
    },

    

    setDataIndex : function(b, d){
        this.config[b].dataIndex = d;
    },

    
    
    

    isCellEditable : function(e, f){
        return  (this.config[e].editable || (typeof  this.config[e].editable == "undefined" && this.config[e].editor)) ? true : false;
    },

    

    getCellEditor : function(g, h){
        return  this.config[g].editor;
    },

    

    setEditable : function(j, k){
        this.config[j].editable = k;
    },


    

    isHidden : function(l){
        return  this.config[l].hidden;
    },


    

    isFixed : function(m){
        return  this.config[m].fixed;
    },

    

    isResizable : function(n){
        return  n >= 0 && this.config[n].resizable !== false && this.config[n].fixed !== true;
    },
    

    setHidden : function(o, p){
        this.config[o].hidden = p;
        this.totalWidth = null;
        this.fireEvent("hiddenchange", this, o, p);
    },

    

    setEditor : function(q, s){
        this.config[q].editor = s;
    }
});

Roo.grid.ColumnModel.defaultRenderer = function(t){
	if(typeof  t == "string" && t.length < 1){
	    return  "&#160;";
	}
	return  t;
};


Roo.grid.DefaultColumnModel = Roo.grid.ColumnModel;






Roo.grid.AbstractSelectionModel = function(){
    this.locked = false;
    Roo.grid.AbstractSelectionModel.superclass.constructor.call(this);
};

Roo.extend(Roo.grid.AbstractSelectionModel, Roo.util.Observable,  {
    

    init : function(A){
        this.grid = A;
        this.initEvents();
    },

    

    lock : function(){
        this.locked = true;
    },

    

    unlock : function(){
        this.locked = false;
    },

    

    isLocked : function(){
        return  this.locked;
    }
});




Roo.grid.RowSelectionModel = function(A){
    Roo.apply(this, A);
    this.selections = new  Roo.util.MixedCollection(false, function(o){
        return  o.id;
    });

    this.last = false;
    this.lastActive = false;

    this.addEvents({
        

	    "selectionchange" : true,
        

	    "afterselectionchange" : true,
        

	    "beforerowselect" : true,
        

	    "rowselect" : true,
        

        "rowdeselect" : true
    });
    Roo.grid.RowSelectionModel.superclass.constructor.call(this);
    this.locked = false;
};

Roo.extend(Roo.grid.RowSelectionModel, Roo.grid.AbstractSelectionModel,  {
    

    singleSelect : false,

    
    initEvents : function(){

        if(!this.grid.enableDragDrop && !this.grid.enableDrag){
            this.grid.on("mousedown", this.handleMouseDown, this);
        }else { 
            this.grid.on("rowclick", this.handleDragableRowClick, this);
        }


        this.rowNav = new  Roo.KeyNav(this.grid.getGridEl(), {
            "up" : function(e){
                if(!e.shiftKey){
                    this.selectPrevious(e.shiftKey);
                }else  if(this.last !== false && this.lastActive !== false){
                    var  last = this.last;
                    this.selectRange(this.last,  this.lastActive-1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else {
                    this.selectFirstRow();
                }

                this.fireEvent("afterselectionchange", this);
            },
            "down" : function(e){
                if(!e.shiftKey){
                    this.selectNext(e.shiftKey);
                }else  if(this.last !== false && this.lastActive !== false){
                    var  last = this.last;
                    this.selectRange(this.last,  this.lastActive+1);
                    this.grid.getView().focusRow(this.lastActive);
                    if(last !== false){
                        this.last = last;
                    }
                }else {
                    this.selectFirstRow();
                }

                this.fireEvent("afterselectionchange", this);
            },
            scope: this
        });

        var  B = this.grid.view;
        B.on("refresh", this.onRefresh, this);
        B.on("rowupdated", this.onRowUpdated, this);
        B.on("rowremoved", this.onRemove, this);
    },

    
    onRefresh : function(){
        var  ds = this.grid.dataSource, i, v = this.grid.view;
        var  s = this.selections;
        s.each(function(r){
            if((i = ds.indexOfId(r.id)) != -1){
                v.onRowSelect(i);
            }else {
                s.remove(r);
            }
        });
    },

    
    onRemove : function(v, C, r){
        this.selections.remove(r);
    },

    
    onRowUpdated : function(v, D, r){
        if(this.isSelected(r)){
            v.onRowSelect(D);
        }
    },

    

    selectRecords : function(E, F){
        if(!F){
            this.clearSelections();
        }
        var  ds = this.grid.dataSource;
        for(var  i = 0, len = E.length; i < len; i++){
            this.selectRow(ds.indexOf(E[i]), true);
        }
    },

    

    getCount : function(){
        return  this.selections.length;
    },

    

    selectFirstRow : function(){
        this.selectRow(0);
    },

    

    selectLastRow : function(G){
        this.selectRow(this.grid.dataSource.getCount() - 1, G);
    },

    

    selectNext : function(H){
        if(this.last !== false && (this.last+1) < this.grid.dataSource.getCount()){
            this.selectRow(this.last+1, H);
            this.grid.getView().focusRow(this.last);
        }
    },

    

    selectPrevious : function(I){
        if(this.last){
            this.selectRow(this.last-1, I);
            this.grid.getView().focusRow(this.last);
        }
    },

    

    getSelections : function(){
        return  [].concat(this.selections.items);
    },

    

    getSelected : function(){
        return  this.selections.itemAt(0);
    },


    

    clearSelections : function(J){
        if(this.locked) return;
        if(J !== true){
            var  ds = this.grid.dataSource;
            var  s = this.selections;
            s.each(function(r){
                this.deselectRow(ds.indexOfId(r.id));
            }, this);
            s.clear();
        }else {
            this.selections.clear();
        }

        this.last = false;
    },


    

    selectAll : function(){
        if(this.locked) return;
        this.selections.clear();
        for(var  i = 0, len = this.grid.dataSource.getCount(); i < len; i++){
            this.selectRow(i, true);
        }
    },

    

    hasSelection : function(){
        return  this.selections.length > 0;
    },

    

    isSelected : function(K){
        var  r = typeof  K == "number" ? this.grid.dataSource.getAt(K) : K;
        return  (r && this.selections.key(r.id) ? true : false);
    },

    

    isIdSelected : function(id){
        return  (this.selections.key(id) ? true : false);
    },

    
    handleMouseDown : function(e, t){
        var  L = this.grid.getView(), M;
        if(this.isLocked() || (M = L.findRowIndex(t)) === false){
            return;
        };
        if(e.shiftKey && this.last !== false){
            var  last = this.last;
            this.selectRange(last, M, e.ctrlKey);
            this.last = last; 
            L.focusRow(M);
        }else {
            var  isSelected = this.isSelected(M);
            if(e.button !== 0 && isSelected){
                L.focusRow(M);
            }else  if(e.ctrlKey && isSelected){
                this.deselectRow(M);
            }else  if(!isSelected){
                this.selectRow(M, e.button === 0 && (e.ctrlKey || e.shiftKey));
                L.focusRow(M);
            }
        }

        this.fireEvent("afterselectionchange", this);
    },
    
    handleDragableRowClick :  function(N, O, e) 
    {
        if(e.button === 0 && !e.shiftKey && !e.ctrlKey) {
            this.selectRow(O, false);
            N.view.focusRow(O);
             this.fireEvent("afterselectionchange", this);
        }
    },
    
    

    selectRows : function(P, Q){
        if(!Q){
            this.clearSelections();
        }
        for(var  i = 0, len = P.length; i < len; i++){
            this.selectRow(P[i], true);
        }
    },

    

    selectRange : function(R, S, T){
        if(this.locked) return;
        if(!T){
            this.clearSelections();
        }
        if(R <= S){
            for(var  i = R; i <= S; i++){
                this.selectRow(i, true);
            }
        }else {
            for(var  i = R; i >= S; i--){
                this.selectRow(i, true);
            }
        }
    },

    

    deselectRange : function(U, V, W){
        if(this.locked) return;
        for(var  i = U; i <= V; i++){
            this.deselectRow(i, W);
        }
    },

    

    selectRow : function(X, Y, Z){
        if(this.locked || (X < 0 || X >= this.grid.dataSource.getCount())) return;
        if(this.fireEvent("beforerowselect", this, X, Y) !== false){
            if(!Y || this.singleSelect){
                this.clearSelections();
            }
            var  r = this.grid.dataSource.getAt(X);
            this.selections.add(r);
            this.last = this.lastActive = X;
            if(!Z){
                this.grid.getView().onRowSelect(X);
            }

            this.fireEvent("rowselect", this, X, r);
            this.fireEvent("selectionchange", this);
        }
    },

    

    deselectRow : function(a, b){
        if(this.locked) return;
        if(this.last == a){
            this.last = false;
        }
        if(this.lastActive == a){
            this.lastActive = false;
        }
        var  r = this.grid.dataSource.getAt(a);
        this.selections.remove(r);
        if(!b){
            this.grid.getView().onRowDeselect(a);
        }

        this.fireEvent("rowdeselect", this, a);
        this.fireEvent("selectionchange", this);
    },

    
    restoreLast : function(){
        if(this._last){
            this.last = this._last;
        }
    },

    
    acceptsNav : function(c, d, cm){
        return  !cm.isHidden(d) && cm.isCellEditable(d, c);
    },

    
    onEditorKey : function(f, e){
        var  k = e.getKey(), h, g = this.grid, ed = g.activeEditor;
        if(k == e.TAB){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                h = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else {
                h = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }
        }else  if(k == e.ENTER && !e.ctrlKey){
            e.stopEvent();
            ed.completeEdit();
            if(e.shiftKey){
                h = g.walkCells(ed.row-1, ed.col, -1, this.acceptsNav, this);
            }else {
                h = g.walkCells(ed.row+1, ed.col, 1, this.acceptsNav, this);
            }
        }else  if(k == e.ESC){
            ed.cancelEdit();
        }
        if(h){
            g.startEditing(h[0], h[1]);
        }
    }
});




Roo.grid.CellSelectionModel = function(A){
    Roo.apply(this, A);

    this.selection = null;

    this.addEvents({
        

	    "beforecellselect" : true,
        

	    "cellselect" : true,
        

	    "selectionchange" : true
    });
    Roo.grid.CellSelectionModel.superclass.constructor.call(this);
};

Roo.extend(Roo.grid.CellSelectionModel, Roo.grid.AbstractSelectionModel,  {

    

    initEvents : function(){
        this.grid.on("mousedown", this.handleMouseDown, this);
        this.grid.getGridEl().on(Roo.isIE ? "keydown" : "keypress", this.handleKeyDown, this);
        var  B = this.grid.view;
        B.on("refresh", this.onViewChange, this);
        B.on("rowupdated", this.onRowUpdated, this);
        B.on("beforerowremoved", this.clearSelections, this);
        B.on("beforerowsinserted", this.clearSelections, this);
        if(this.grid.isEditor){
            this.grid.on("beforeedit", this.beforeEdit,  this);
        }
    },

	
    beforeEdit : function(e){
        this.select(e.row, e.column, false, true, e.record);
    },

	
    onRowUpdated : function(v, C, r){
        if(this.selection && this.selection.record == r){
            v.onCellSelect(C, this.selection.cell[1]);
        }
    },

	
    onViewChange : function(){
        this.clearSelections(true);
    },

	

    getSelectedCell : function(){
        return  this.selection ? this.selection.cell : null;
    },

    

    clearSelections : function(D){
        var  s = this.selection;
        if(s){
            if(D !== true){
                this.grid.view.onCellDeselect(s.cell[0], s.cell[1]);
            }

            this.selection = null;
            this.fireEvent("selectionchange", this, null);
        }
    },

    

    hasSelection : function(){
        return  this.selection ? true : false;
    },

    

    handleMouseDown : function(e, t){
        var  v = this.grid.getView();
        if(this.isLocked()){
            return;
        };
        var  E = v.findRowIndex(t);
        var  F = v.findCellIndex(t);
        if(E !== false && F !== false){
            this.select(E, F);
        }
    },

    

    select : function(G, H, I, J, 
 r){
        if(this.fireEvent("beforecellselect", this, G, H) !== false){
            this.clearSelections();
            r = r || this.grid.dataSource.getAt(G);
            this.selection = {
                record : r,
                cell : [G, H]
            };
            if(!I){
                var  v = this.grid.getView();
                v.onCellSelect(G, H);
                if(J !== true){
                    v.focusCell(G, H);
                }
            }

            this.fireEvent("cellselect", this, G, H);
            this.fireEvent("selectionchange", this, this.selection);
        }
    },

	
    isSelectable : function(K, L, cm){
        return  !cm.isHidden(L);
    },

    

    handleKeyDown : function(e){
        if(!e.isNavKeyPress()){
            return;
        }
        var  g = this.grid, s = this.selection;
        if(!s){
            e.stopEvent();
            var  F = g.walkCells(0, 0, 1, this.isSelectable,  this);
            if(F){
                this.select(F[0], F[1]);
            }
            return;
        }
        var  sm = this;
        var  M = function(O, P, Q){
            return  g.walkCells(O, P, Q, sm.isSelectable,  sm);
        };
        var  k = e.getKey(), r = s.cell[0], c = s.cell[1];
        var  N;

        switch(k){
             case  e.TAB:
                 if(e.shiftKey){
                     N = M(r, c-1, -1);
                 }else {
                     N = M(r, c+1, 1);
                 }
             break;
             case  e.DOWN:
                 N = M(r+1, c, 1);
             break;
             case  e.UP:
                 N = M(r-1, c, -1);
             break;
             case  e.RIGHT:
                 N = M(r, c+1, 1);
             break;
             case  e.LEFT:
                 N = M(r, c-1, -1);
             break;
             case  e.ENTER:
                 if(g.isEditor && !g.editing){
                    g.startEditing(r, c);
                    e.stopEvent();
                    return;
                }
             break;
        };
        if(N){
            this.select(N[0], N[1]);
            e.stopEvent();
        }
    },

    acceptsNav : function(O, P, cm){
        return  !cm.isHidden(P) && cm.isCellEditable(P, O);
    },

    onEditorKey : function(Q, e){
        var  k = e.getKey(), R, g = this.grid, ed = g.activeEditor;
        if(k == e.TAB){
            if(e.shiftKey){
                R = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else {
                R = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }

            e.stopEvent();
        }else  if(k == e.ENTER && !e.ctrlKey){
            ed.completeEdit();
            e.stopEvent();
        }else  if(k == e.ESC){
            ed.cancelEdit();
        }
        if(R){
            g.startEditing(R[0], R[1]);
        }
    }
});


 


Roo.grid.EditorGrid = function(A, B){
    Roo.grid.EditorGrid.superclass.constructor.call(this, A, B);
    this.getGridEl().addClass("xedit-grid");

    if(!this.selModel){
        this.selModel = new  Roo.grid.CellSelectionModel();
    }


    this.activeEditor = null;

	this.addEvents({
	    

	    "beforeedit" : true,
	    

	    "afteredit" : true,
	    

	    "validateedit" : true
	});
    this.on("bodyscroll", this.stopEditing,  this);
    this.on(this.clicksToEdit == 1 ? "cellclick" : "celldblclick", this.onCellDblClick,  this);
};

Roo.extend(Roo.grid.EditorGrid, Roo.grid.Grid, {
    

    clicksToEdit: 2,

    
    isEditor : true,
    
    trackMouseOver: false, 

    onCellDblClick : function(g, C, D){
        this.startEditing(C, D);
    },

    onEditComplete : function(ed, E, F){
        this.editing = false;
        this.activeEditor = null;
        ed.un("specialkey", this.selModel.onEditorKey, this.selModel);
        var  r = ed.record;
        var  G = this.colModel.getDataIndex(ed.col);
        var  e = {
            grid: this,
            record: r,
            field: G,
            originalValue: F,
            value: E,
            row: ed.row,
            column: ed.col,
            cancel:false,
            editor: ed
        };
        if(String(E) !== String(F)){
            
            if(this.fireEvent("validateedit", e) !== false && !e.cancel){
                r.set(G, e.value);
                delete  e.cancel; 
                this.fireEvent("afteredit", e);
            }
        } else  {
            this.fireEvent("afteredit", e); 
        }

        this.view.focusCell(ed.row, ed.col);
    },

    

    startEditing : function(H, I){
        this.stopEditing();
        if(this.colModel.isCellEditable(I, H)){
            this.view.ensureVisible(H, I, true);
            var  r = this.dataSource.getAt(H);
            var  G = this.colModel.getDataIndex(I);
            var  e = {
                grid: this,
                record: r,
                field: G,
                value: r.data[G],
                row: H,
                column: I,
                cancel:false
            };
            if(this.fireEvent("beforeedit", e) !== false && !e.cancel){
                this.editing = true;
                var  ed = this.colModel.getCellEditor(I, H);
                
                if (!ed) {
                    return;
                }
                if(!ed.rendered){
                    ed.render(ed.parentEl || document.body);
                }

                ed.field.reset();
                (function(){ 
                    ed.row = H;
                    ed.col = I;
                    ed.record = r;
                    ed.on("complete", this.onEditComplete, this, {single: true});
                    ed.on("specialkey", this.selModel.onEditorKey, this.selModel);
                    this.activeEditor = ed;
                    var  v = r.data[G];
                    ed.startEdit(this.view.getCell(H, I), v);
                }).defer(50, this);
            }
        }
    },
        
    

    stopEditing : function(){
        if(this.activeEditor){
            this.activeEditor.completeEdit();
        }

        this.activeEditor = null;
    }
});








Roo.grid.GridEditor = function(A, B){
    if (!B && A.field) {
        B = A;
        A = Roo.factory(B.field, Roo.form);
    }

    Roo.grid.GridEditor.superclass.constructor.call(this, A, B);
    A.monitorTab = false;
};

Roo.extend(Roo.grid.GridEditor, Roo.Editor, {
    
    

    
    alignment: "tl-tl",
    autoSize: "width",
    hideEl : false,
    cls: "x-small-editor x-grid-editor",
    shim:false,
    shadow:"frame"
});


  

  
Roo.grid.PropertyRecord = Roo.data.Record.create([
    {name:'name',type:'string'},  'value'
]);


Roo.grid.PropertyStore = function(A, B){
    this.grid = A;
    this.store = new  Roo.data.Store({
        recordType : Roo.grid.PropertyRecord
    });
    this.store.on('update', this.onUpdate,  this);
    if(B){
        this.setSource(B);
    }

    Roo.grid.PropertyStore.superclass.constructor.call(this);
};



Roo.extend(Roo.grid.PropertyStore, Roo.util.Observable, {
    setSource : function(o){
        this.source = o;
        this.store.removeAll();
        var  C = [];
        for(var  k  in  o){
            if(this.isEditableValue(o[k])){
                C.push(new  Roo.grid.PropertyRecord({name: k, value: o[k]}, k));
            }
        }

        this.store.loadRecords({records: C}, {}, true);
    },

    onUpdate : function(ds, D, E){
        if(E == Roo.data.Record.EDIT){
            var  v = D.data['value'];
            var  oldValue = D.modified['value'];
            if(this.grid.fireEvent('beforepropertychange', this.source, D.id, v, oldValue) !== false){
                this.source[D.id] = v;
                D.commit();
                this.grid.fireEvent('propertychange', this.source, D.id, v, oldValue);
            }else {
                D.reject();
            }
        }
    },

    getProperty : function(F){
       return  this.store.getAt(F);
    },

    isEditableValue: function(G){
        if(G && G  instanceof  Date){
            return  true;
        }else  if(typeof  G == 'object' || typeof  G == 'function'){
            return  false;
        }
        return  true;
    },

    setValue : function(H, I){
        this.source[H] = I;
        this.store.getById(H).set('value', I);
    },

    getSource : function(){
        return  this.source;
    }
});

Roo.grid.PropertyColumnModel = function(J, K){
    this.grid = J;
    var  g = Roo.grid;
    g.PropertyColumnModel.superclass.constructor.call(this, [
        {header: this.nameText, sortable: true, dataIndex:'name', id: 'name'},
        {header: this.valueText, resizable:false, dataIndex: 'value', id: 'value'}
    ]);
    this.store = K;
    this.bselect = Roo.DomHelper.append(document.body, {
        tag: 'select', style:'display:none', cls: 'x-grid-editor', children: [
            {tag: 'option', value: 'true', html: 'true'},
            {tag: 'option', value: 'false', html: 'false'}
        ]
    });
    Roo.id(this.bselect);
    var  f = Roo.form;
    this.editors = {
        'date' : new  g.GridEditor(new  f.DateField({selectOnFocus:true})),
        'string' : new  g.GridEditor(new  f.TextField({selectOnFocus:true})),
        'number' : new  g.GridEditor(new  f.NumberField({selectOnFocus:true, style:'text-align:left;'})),
        'int' : new  g.GridEditor(new  f.NumberField({selectOnFocus:true, allowDecimals:false, style:'text-align:left;'})),
        'boolean' : new  g.GridEditor(new  f.Field({el:this.bselect,selectOnFocus:true}))
    };
    this.renderCellDelegate = this.renderCell.createDelegate(this);
    this.renderPropDelegate = this.renderProp.createDelegate(this);
};

Roo.extend(Roo.grid.PropertyColumnModel, Roo.grid.ColumnModel, {
    
    
    nameText : 'Name',
    valueText : 'Value',
    
    dateFormat : 'm/j/Y',
    
    
    renderDate : function(L){
        return  L.dateFormat(this.dateFormat);
    },

    renderBool : function(M){
        return  M ? 'true' : 'false';
    },

    isCellEditable : function(N, O){
        return  N == 1;
    },

    getRenderer : function(P){
        return  P == 1 ?
            this.renderCellDelegate : this.renderPropDelegate;
    },

    renderProp : function(v){
        return  this.getPropertyName(v);
    },

    renderCell : function(Q){
        var  rv = Q;
        if(Q  instanceof  Date){
            rv = this.renderDate(Q);
        }else  if(typeof  Q == 'boolean'){
            rv = this.renderBool(Q);
        }
        return  Roo.util.Format.htmlEncode(rv);
    },

    getPropertyName : function(R){
        var  pn = this.grid.propertyNames;
        return  pn && pn[R] ? pn[R] : R;
    },

    getCellEditor : function(S, T){
        var  p = this.store.getProperty(T);
        var  n = p.data['name'], U = p.data['value'];
        
        if(typeof(this.grid.customEditors[n]) == 'string'){
            return  this.editors[this.grid.customEditors[n]];
        }
        if(typeof(this.grid.customEditors[n]) != 'undefined'){
            return  this.grid.customEditors[n];
        }
        if(U  instanceof  Date){
            return  this.editors['date'];
        }else  if(typeof  U == 'number'){
            return  this.editors['number'];
        }else  if(typeof  U == 'boolean'){
            return  this.editors['boolean'];
        }else {
            return  this.editors['string'];
        }
    }
});



Roo.grid.PropertyGrid = function(V, W){
    W = W || {};
    var  X = new  Roo.grid.PropertyStore(this);
    this.store = X;
    var  cm = new  Roo.grid.PropertyColumnModel(this, X);
    X.store.sort('name', 'ASC');
    Roo.grid.PropertyGrid.superclass.constructor.call(this, V, Roo.apply({
        ds: X.store,
        cm: cm,
        enableColLock:false,
        enableColumnMove:false,
        stripeRows:false,
        trackMouseOver: false,
        clicksToEdit:1
    }, W));
    this.getGridEl().addClass('x-props-grid');
    this.lastEditRow = null;
    this.on('columnresize', this.onColumnResize, this);
    this.addEvents({
         

        "beforepropertychange": true,
        

        "propertychange": true
    });
    this.customEditors = this.customEditors || {};
};
Roo.extend(Roo.grid.PropertyGrid, Roo.grid.EditorGrid, {
    
     

    
      

    
    render : function(){
        Roo.grid.PropertyGrid.superclass.render.call(this);
        this.autoSize.defer(100, this);
    },

    autoSize : function(){
        Roo.grid.PropertyGrid.superclass.autoSize.call(this);
        if(this.view){
            this.view.fitColumns();
        }
    },

    onColumnResize : function(){
        this.colModel.setColumnWidth(1, this.container.getWidth(true)-this.colModel.getColumnWidth(0));
        this.autoSize();
    },
    

    setSource : function(Y){
        this.store.setSource(Y);
        
    },
    

    getSource : function(){
        return  this.store.getSource();
    }
});


 


Roo.LoadMask = function(el, A){
    this.el = Roo.get(el);
    Roo.apply(this, A);
    if(this.store){
        this.store.on('beforeload', this.onBeforeLoad, this);
        this.store.on('load', this.onLoad, this);
        this.store.on('loadexception', this.onLoad, this);
        this.removeMask = false;
    }else {
        var  um = this.el.getUpdateManager();
        um.showLoadIndicator = false; 
        um.on('beforeupdate', this.onBeforeLoad, this);
        um.on('update', this.onLoad, this);
        um.on('failure', this.onLoad, this);
        this.removeMask = true;
    }
};

Roo.LoadMask.prototype = {
    

    

    msg : 'Loading...',
    

    msgCls : 'x-mask-loading',

    

    disabled: false,

    

    disable : function(){
       this.disabled = true;
    },

    

    enable : function(){
        this.disabled = false;
    },

    
    onLoad : function(){
        this.el.unmask(this.removeMask);
    },

    
    onBeforeLoad : function(){
        if(!this.disabled){
            this.el.mask(this.msg, this.msgCls);
        }
    },

    
    destroy : function(){
        if(this.store){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.onLoad, this);
        }else {
            var  um = this.el.getUpdateManager();
            um.un('beforeupdate', this.onBeforeLoad, this);
            um.un('update', this.onLoad, this);
            um.un('failure', this.onLoad, this);
        }
    }
};


Roo.XTemplate = function(){
    Roo.XTemplate.superclass.constructor.apply(this, arguments);
    var  s = this.html;

    s = ['<tpl>', s, '</tpl>'].join('');

    var  re = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/;

    var  A = /^<tpl\b[^>]*?for="(.*?)"/;
    var  B = /^<tpl\b[^>]*?if="(.*?)"/;
    var  C = /^<tpl\b[^>]*?exec="(.*?)"/;
    var  m, id = 0;
    var  D = [];

    while(m = s.match(re)){
       var  m2 = m[0].match(A);
       var  m3 = m[0].match(B);
       var  m4 = m[0].match(C);
       var  exp = null, fn = null, exec = null;
       var  name = m2 && m2[1] ? m2[1] : '';
       if(m3){
           exp = m3 && m3[1] ? m3[1] : null;
           if(exp){
               fn = new  Function('values', 'parent', 'with(values){ return '+(Roo.util.Format.htmlDecode(exp))+'; }');
           }
       }
       if(m4){
           exp = m4 && m4[1] ? m4[1] : null;
           if(exp){
               exec = new  Function('values', 'parent', 'with(values){ '+(Roo.util.Format.htmlDecode(exp))+'; }');
           }
       }
       if(name){
           switch(name){
               case  '.': name = new  Function('values', 'parent', 'with(values){ return values; }'); break;
               case  '..': name = new  Function('values', 'parent', 'with(values){ return parent; }'); break;
               default: name = new  Function('values', 'parent', 'with(values){ return '+name+'; }');
           }
       }

       D.push({
            id: id,
            target: name,
            exec: exec,
            test: fn,
            body: m[1]||''
        });
       s = s.replace(m[0], '{xtpl'+ id + '}');
       ++id;
    }
    for(var  i = D.length-1; i >= 0; --i){
        this.compileTpl(D[i]);
    }

    this.master = D[D.length-1];
    this.tpls = D;
};
Roo.extend(Roo.XTemplate, Roo.Template, {

    re : /\{([\w-\.]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,

    applySubTemplate : function(id, E, F){
        var  t = this.tpls[id];
        if(t.test && !t.test.call(this, E, F)){
            return  '';
        }
        if(t.exec && t.exec.call(this, E, F)){
            return  '';
        }
        var  vs = t.target ? t.target.call(this, E, F) : E;
        F = t.target ? E : F;
        if(t.target && vs  instanceof  Array){
            var  buf = [];
            for(var  i = 0, len = vs.length; i < len; i++){
                buf[buf.length] = t.compiled.call(this, vs[i], F);
            }
            return  buf.join('');
        }
        return  t.compiled.call(this, vs, F);
    },

    compileTpl : function(G){
        var  fm = Roo.util.Format;
        var  H = this.disableFormats !== true;
        var  I = Roo.isGecko ? "+" : ",";
        var  fn = function(m, K, L, M){
            if(K.substr(0, 4) == 'xtpl'){
                return  "'"+ I +'this.applySubTemplate('+K.substr(4)+', values, parent)'+I+"'";
            }
            var  v;
            if(K.indexOf('.') != -1){
                v = K;
            }else {
                v = "values['" + K + "']";
            }
            if(L && H){
                M = M ? ',' + M : "";
                if(L.substr(0, 5) != "this."){
                    L = "fm." + L + '(';
                }else {
                    L = 'this.call("'+ L.substr(5) + '", ';
                    M = ", values";
                }
            }else {
                M= ''; L = "("+v+" === undefined ? '' : ";
            }
            return  "'"+ I + L + v + M + ")"+I+"'";
        };
        var  J;
        
        if(Roo.isGecko){
            J = "tpl.compiled = function(values, parent){ return '" +
                   G.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
                    "';};";
        }else {
            J = ["tpl.compiled = function(values, parent){ return ['"];
            J.push(G.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn));
            J.push("'].join('');};");
            J = J.join('');
        }
        

        eval(J);
        return  this;
    },

    applyTemplate : function(K){
        return  this.master.compiled.call(this, K, {});
        var  s = this.subs;
    },

    apply : function(){
        return  this.applyTemplate.apply(this, arguments);
    },

    compile : function(){return  this;}
});

Roo.XTemplate.from = function(el){
    el = Roo.getDom(el);
    return  new  Roo.XTemplate(el.value || el.innerHTML);
};


 


Roo.XComponent = function(A) {
    Roo.apply(this, A);
    this.addEvents({ 
        

        'built' : true,
        

        'buildcomplete' : true,
        
    });
    
    Roo.XComponent.register(this);
    this.modules = false;
    this.el = false; 
    
    
}

Roo.extend(Roo.XComponent, Roo.util.Observable, {
    

    el  : false,
    
    

    panel : false,
    
    

    layout : false,
    
     

    disabled : false,
    
    

    parent: false,
    
    

    
    order : false,
    

    name : false,
    

    items : false,
     
     
    
});

Roo.apply(Roo.XComponent, {
    
    

    buildCompleted : false,
     
    

     
    topModule  : false,
      
    

    
    modules : [],
      
    
    

    register : function(B) {
        this.modules.push(B);
         
    },
    

    
    toObject : function(C)
    {
        if (!C || typeof(C) == 'object') {
            return  C;
        }
        var  ar = C.split('.');
        var  rt, o;
        rt = ar.shift();
            

        eval('if (typeof ' + rt + ' == "undefined"){ o = false;} o = ' + rt + ';');
        if (o === false) {
            throw  "Module not found : " + C;
        }

        Roo.each(ar, function(e) {
            if (typeof(o[e]) == 'undefined') {
                throw  "Module not found : " + C;
            }

            o = o[e];
        });
        return  o;
        
    },
    
    
    

    preBuild : function ()
    {
        
        Roo.each(this.modules , function (D)
        {
            D.parent = this.toObject(D.parent);
            
            if (!D.parent) {
                this.topModule = D;
                return;
            }
            
            if (!D.parent.modules) {
                D.parent.modules = new  Roo.util.MixedCollection(false, 
                    function(o) { return  o.order + '' }
                );
            }

            
            D.parent.modules.add(D);
        }, this);
    },
    
     
 
    
    buildOrder : function()
    {
        var  D = this;
        var  E = function(a,b) {   
            return  String(a).toUpperCase() > String(b).toUpperCase() ? 1 : -1;
        };
        
        if (!this.topModule || !this.topModule.modules) {
            throw  "No top level modules to build";
        }
       
        
        var  F = [ this.topModule ];
        
        
        
        var  G = function(m) {
           
            
            F.push(m);
            if (m.modules) {
                m.modules.keySort('ASC',  E );
                m.modules.each(G);
            }
            
            if (m.finalize) {
                m.finalize.name = m.name + " (clean up) ";
                F.push(m.finalize);
            }
            
        }

        this.topModule.modules.keySort('ASC',  E );
        this.topModule.modules.each(G);
        return  F;
    },
    
     
 
   
    build : function() 
    {
        
        this.preBuild();
        var  H = this.buildOrder();
      
        
        
        
        if (!H.length) { 
            throw  "NO modules!!!";
        }

        
        
        
        
        Roo.MessageBox.show({ title: 'loading' });
        Roo.MessageBox.show({
           title: "Please wait...",
           msg: "Building Interface...",
           width:450,
           progress:true,
           closable:false,
           modal: false
          
        });
        var  I = H.length;
        
        var  J = this;
        var  K = function() {
            if (!H.length) {
                console.log('hide?');
                Roo.MessageBox.hide();
                J.topModule.fireEvent('buildcomplete', J.topModule);
                return;    
            }
            
            var  m = H.shift();
            console.log(m);
            if (typeof(m) == 'function') { 
                m.call(this);
                return  K.defer(10, J);
            } 
            
            Roo.MessageBox.updateProgress(
                (I  - H.length)/I,  "Building Interface " + (I  - H.length) + 
                    " of " + I + 
                    (m.name ? (' - ' + m.name) : '')
                    );
            
         
            
            var  L = (typeof(m.disabled) == 'function') ?
                m.disabled.call(m.module.disabled) : m.disabled;    
            
            
            if (L) {
                return  K(); 
            }
            
            if (!m.parent) {
                
                var  layoutbase = new  Ext.BorderLayout(document.body, {
               
                    center: {
                         titlebar: false,
                         autoScroll:false,
                         closeOnTab: true,
                         tabPosition: 'top',
                         
                         alwaysShowTabs: true,
                         minTabWidth: 140
                    }
                });
                var  M = m.tree();
                M.region = 'center';
                m.el = layoutbase.addxtype(M);
                m.panel = m.el;
                m.layout = m.panel.layout;    
                return  K.defer(10, J);
            }
            
            var  M = m.tree();
            M.region = M.region || m.region;
            m.el = m.parent.el.addxtype(M);
            m.fireEvent('built', m);
            m.panel = m.el;
            m.layout = m.panel.layout;    
            K.defer(10, J); 
            
        }

        K.defer(1, J);
     
        
        
    }
     
   
    
    
});
 





 
Roo.Login = function(A)
{
    this.addEvents({
        'refreshed' : true,
    });
    
    Roo.apply(this,A);
    
    Roo.onReady(function() {
        this.onLoad();
    }, this);
    
    
   
    Roo.Login.superclass.constructor.call(this, this);
    
    
    
}



Roo.extend(Roo.Login, Roo.LayoutDialog, {
    
    

    
    method : 'POST',
    

    url : '',
    
    

    user : false,
    

    checkFails : 0,
      

    intervalID : 0,
    
    
    onLoad : function() 
    {
        
         
        if (Roo.get('loading')) { 
            Roo.get('loading').remove();
        }

        
        
       
        this.check({
            success:  function(B, C)  {  
            
                var  D = this.processResponse(B);
                this.checkFails =0;
                if (!D.success) { 
                    this.checkFails = 5;
                    
                    return  this.failure(B,C);
                }
                
                if (!D.data.id) { 
                    return  this.show();
                }

                
                              
                        
                this.fillAuth(D.data);   
                this.checkFails =0;
                Roo.XComponent.build();
            },
            failure : this.show
        });
        
    }, 
    
    
    check: function(B) 
    {
        if (B.again) { 
            this.checkFails++;
        } else  {
            this.checkFails = 0;
        }
        var  C = this;
        if (this.sending) {
            if ( this.checkFails > 4) {
                Roo.MessageBox.alert("Error",  
                    "Error getting authentication status. - try reloading, or wait a while", function() {
                        C.sending = false;
                    }); 
                return;
            }

            B.again = true;
            C.check.defer(10000, C, [ B ]); 
            return;
        }

        this.sending = true;
        
        Roo.Ajax.request({  
            url: this.url,
            params: {
                getAuthUser: true
            },  
            method: this.method,
            success:  B.success || this.success,
            failure : B.failure || this.failure,
            scope : this,
            callCfg : B
              
        });  
    }, 
    
    
    logout: function()
    {
        window.onbeforeunload = function() { }; 
        this.user = false;
        var  D = this;
        
        Roo.Ajax.request({  
            url: this.url,
            params: {
                logout: 1
            },  
            method: 'GET',
            failure : function() {
                Roo.MessageBox.alert("Error", "Error logging out. - continuing anyway.", function() {
                    document.location = document.location.toString() + '?ts=' + Math.random();
                });
                
            },
            success : function() {
                D.user = false;
                this.checkFails =0;
                
                document.location = document.location.toString() + '?ts=' + Math.random();
            }
              
              
        }); 
    },
    
    processResponse : function (E)
    {
        var  F = '';
        try {
            F = Roo.decode(E.responseText);
            
            if (typeof(F) != 'object') {
                F = { success : false, errorMsg : F, errors : true };
            }
            if (typeof(F.success) == 'undefined') {
                F.success = false;
            }
            
        } catch(e) {
            res = { success : false,  errorMsg : response.responseText, errors : true };
        }
        return  F;
    },
    
    success : function(G, H)  
    {  
        this.sending = false;
        var  I = this.processResponse(G);
        if (!I.success) {
            return  this.failure(G, H);
        }
        if (!I.data || !I.data.id) {
            return  this.failure(G,H);
        }

        
        this.fillAuth(I.data);
        
        this.checkFails =0;
        
    },
    
    
    failure : function (J, K) 
    {
        this.authUser = -1;
        this.sending = false;
        var  L = this.processResponse(J);
        
        if ( this.checkFails > 2) {
        
            Roo.MessageBox.alert("Error", L.errorMsg ? L.errorMsg : 
                "Error getting authentication status. - try reloading"); 
            return;
        }

        K.callCfg.again = true;
        this.check.defer(1000, this, [ K.callCfg ]);
        return;  
    },
    
    
    
    fillAuth: function(au) {
        this.startAuthCheck();
        this.authUserId = au.id;
        this.authUser = au;
        this.lastChecked = new  Date();
        this.fireEvent('refreshed', au);
        
        
        au.lang = au.lang || 'en';
        
        Roo.state.Manager.set( this.realm + 'lang' , au.lang);
        this.switchLang(au.lang );
        
     
        
        if (this.authUserId  < 0) {
            Roo.MessageBox.alert("Warning", 
                "This is an open system - please set up a admin user with a password.");  
        }
         
        
        
             
    },
    
    startAuthCheck : function() 
    {
        if (this.intervalID) { 
            return  false;
        }
        var  M = this;
        this.intervalID =  window.setInterval(function() {
              M.check(false);
            }, 120000); 
        
        
    },
         
    
    switchLang : function (N) 
    {
        _T = typeof(_T) == 'undefined' ? false : _T;
          if (!_T || !N.length) {
            return;
        }
        
        if (!_T && N != 'en') {
            Roo.MessageBox.alert("Sorry", "Language not available yet (" + N +')');
            return;
        }
        
        if (typeof(_T.en) == 'undefined') {
            _T.en = {};
            Roo.apply(_T.en, _T);
        }
        
        if (typeof(_T[N]) == 'undefined') {
            Roo.MessageBox.alert("Sorry", "Language not available yet (" + N +')');
            return;
        }

        
        
        Roo.apply(_T, _T[N]);
        
        var  O = this;
        

        
        
    },
    
    
    title: "Login",
    modal: true,
    width:  350,
    
    height: 180,
    shadow: true,
    minWidth:200,
    minHeight:180,
    
    closable: false,
    draggable: false,
    collapsible: false,
    resizable: false,
    center: {  
        autoScroll:false,
        titlebar: false,
       
        hideTabs: true,
        closeOnTab: true,
        alwaysShowTabs: false
    } ,
    listeners : {
        
        show  : function(P)
        {
            
            this.form = this.layout.getRegion('center').activePanel.form;
            this.form.dialog = P;
            this.buttons[0].form = this.form;
            this.buttons[0].dialog = P
            this.buttons[1].form = this.form;
            this.buttons[1].dialog = P;
           
           
            
            
           
             
             
           
            
            
            
            
            if (this.disabled) {
                this.hide();
                return;
            }
            
            if (this.user.id < 0) { 
                return;
            }
            
            if (this.intervalID) {
                
                window.clearInterval(this.intervalID);
                this.intervalID = false;
            }
            
            
            if (Roo.get('loading')) {
                Roo.get('loading').remove();
            }
            if (Roo.get('loading-mask')) {
                Roo.get('loading-mask').hide();
            }

            
            
            this.form.reset();
            
            
            this.el.unmask(); 
            
            
            this.form.setValues({
                'username' : Roo.state.Manager.get(this.realm + '.username', ''),
                'lang' : Roo.state.Manager.get(this.realm + '.lang', 'en')
            });
            
            this.switchLang(Roo.state.Manager.get(this.realm + '.lang', 'en'));
            if (this.form.findField('username').getValue().length > 0 ){
                this.form.findField('password').focus();
            } else  {
               this.form.findField('username').focus();
            }
    
        }
    },
    items : [
         {
       
            xtype : 'ContentPanel',
            xns : Roo,
            region: 'center',
            fitToFrame : true,
            
            items : [
    
                {
               
                    xtype : 'Form',
                    xns : Roo.form,
                    labelWidth: 100,
                    style : 'margin: 10px;',
                    
                    listeners : {
                        actionfailed : function(f, Q) {
                            
                                
                            
                            
                            
                            this.dialog.el.unmask();
                            Roo.MessageBox.alert("Error", Q.result.errorMsg ? Q.result.errorMsg : 
                                        "Login failed - communication error - try again.");
                                      
                        },
                        actioncomplete: function(re, R) {
                             
                            Roo.state.Manager.set(
                                this.dialog.realm + '.username',  
                                    this.findField('username').getValue()
                            );
                            Roo.state.Manager.set(
                                this.dialog.realm + '.lang',  
                                this.findField('lang').getValue() 
                            );
                            
                            this.dialog.fillAuth(R.result.data);
                              
                            this.dialog.hide();
                            
                            if (Roo.get('loading-mask')) {
                                Roo.get('loading-mask').show();
                            }

                            Roo.XComponent.build();
                            
                             
                            
                        }
                    },
                    items : [
                        {
                            xtype : 'TextField',
                            xns : Roo.form,
                            fieldLabel: "Email Address",
                            name: 'username',
                            width:200,
                            autoCreate : {tag: "input", type: "text", size: "20"}
                        },
                        {
                            xtype : 'TextField',
                            xns : Roo.form,
                            fieldLabel: "Password",
                            inputType: 'password',
                            name: 'password',
                            width:200,
                            autoCreate : {tag: "input", type: "text", size: "20"},
                            listeners : {
                                specialkey : function(e,ev) {
                                    if (ev.keyCode == 13) {
                                        this.form.dialog.el.mask("Logging in");
                                        this.form.doAction('submit', {
                                            url: this.form.dialog.url,
                                            method: this.form.dialog.method,
                                        });
                                    }
                                }
                            }  
                        },
                        {
                            xtype : 'ComboBox',
                            xns : Roo.form,
                            fieldLabel: "Language",
                            name : 'langdisp',
                            store: {
                                xtype : 'SimpleStore',
                                fields: ['lang', 'ldisp'],
                                data : [
                                    [ 'en', 'English' ],
                                    [ 'zh_HK' , '\u7E41\u4E2D' ],
                                    [ 'zh_CN', '\u7C21\u4E2D' ]
                                ]
                            },
                            
                            valueField : 'lang',
                            hiddenName:  'lang',
                            width: 200,
                            displayField:'ldisp',
                            typeAhead: false,
                            editable: false,
                            mode: 'local',
                            triggerAction: 'all',
                            emptyText:'Select a Language...',
                            selectOnFocus:true,
                            listeners : {
                                select :  function(cb, S, ix) {
                                    this.form.switchLang(S.data.lang);
                                }
                            }
                        
                        }
                    ]
                }
                  
                
            ]
        }
    ],
    buttons : [
        {
            xtype : 'Button',
            xns : 'Roo',
            text : "Forgot Password",
            listeners : {
                click : function() {
                    
                    var  n = this.form.findField('username').getValue();
                    if (!n.length) {
                        Roo.MessageBox.alert("Error", "Fill in your email address");
                        return;
                    }

                    Roo.Ajax.request({
                        url: this.dialog.url,
                        params: {
                            passwordRequest: n
                        },
                        method: this.dialog.method,
                        success:  function(T, U)  {  
                        
                            var  V = this.dialog.processResponse(T);
                            if (!V.success) { 
                               Roo.MessageBox.alert("Error" ,
                                    V.errorMsg ? V.errorMsg  : "Problem Requesting Password Reset");
                               return;
                            }

                            Roo.MessageBox.alert("Notice" ,
                                "Please check you email for the Password Reset message");
                        },
                        failure : function() {
                            Roo.MessageBox.alert("Error" , "Problem Requesting Password Reset");
                        }
                        
                    });
                }
            }
        },
        {
            xtype : 'Button',
            xns : 'Roo',
            text : "Login",
            listeners : {
                
                click : function () {
                        
                    this.dialog.el.mask("Logging in");
                    this.form.doAction('submit', {
                            url: this.dialog.url,
                            method: this.dialog.method
                    });
                }
            }
        }
    ]
  
  
})
 


   
