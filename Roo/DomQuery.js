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
 

/*
 * This is code is also distributed under MIT license for use
 * with jQuery and prototype JavaScript libraries.
 */
/**
 * @class Roo.DomQuery
Provides high performance selector/xpath processing by compiling queries into reusable functions. New pseudo classes and matchers can be plugged. It works on HTML and XML documents (if a content node is passed in).
<p>
DomQuery supports most of the <a href="http://www.w3.org/TR/2005/WD-css3-selectors-20051215/">CSS3 selectors spec</a>, along with some custom selectors and basic XPath.</p>

<p>
All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first" would be a perfectly valid selector. Node filters are processed in the order in which they appear, which allows you to optimize your queries for your document structure.
</p>
<h4>Element Selectors:</h4>
<ul class="list">
    <li> <b>*</b> any element</li>
    <li> <b>E</b> an element with the tag E</li>
    <li> <b>E F</b> All descendent elements of E that have the tag F</li>
    <li> <b>E > F</b> or <b>E/F</b> all direct children elements of E that have the tag F</li>
    <li> <b>E + F</b> all elements with the tag F that are immediately preceded by an element with the tag E</li>
    <li> <b>E ~ F</b> all elements with the tag F that are preceded by a sibling element with the tag E</li>
</ul>
<h4>Attribute Selectors:</h4>
<p>The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.</p>
<ul class="list">
    <li> <b>E[foo]</b> has an attribute "foo"</li>
    <li> <b>E[foo=bar]</b> has an attribute "foo" that equals "bar"</li>
    <li> <b>E[foo^=bar]</b> has an attribute "foo" that starts with "bar"</li>
    <li> <b>E[foo$=bar]</b> has an attribute "foo" that ends with "bar"</li>
    <li> <b>E[foo*=bar]</b> has an attribute "foo" that contains the substring "bar"</li>
    <li> <b>E[foo%=2]</b> has an attribute "foo" that is evenly divisible by 2</li>
    <li> <b>E[foo!=bar]</b> has an attribute "foo" that does not equal "bar"</li>
</ul>
<h4>Pseudo Classes:</h4>
<ul class="list">
    <li> <b>E:first-child</b> E is the first child of its parent</li>
    <li> <b>E:last-child</b> E is the last child of its parent</li>
    <li> <b>E:nth-child(<i>n</i>)</b> E is the <i>n</i>th child of its parent (1 based as per the spec)</li>
    <li> <b>E:nth-child(odd)</b> E is an odd child of its parent</li>
    <li> <b>E:nth-child(even)</b> E is an even child of its parent</li>
    <li> <b>E:only-child</b> E is the only child of its parent</li>
    <li> <b>E:checked</b> E is an element that is has a checked attribute that is true (e.g. a radio or checkbox) </li>
    <li> <b>E:first</b> the first E in the resultset</li>
    <li> <b>E:last</b> the last E in the resultset</li>
    <li> <b>E:nth(<i>n</i>)</b> the <i>n</i>th E in the resultset (1 based)</li>
    <li> <b>E:odd</b> shortcut for :nth-child(odd)</li>
    <li> <b>E:even</b> shortcut for :nth-child(even)</li>
    <li> <b>E:contains(foo)</b> E's innerHTML contains the substring "foo"</li>
    <li> <b>E:nodeValue(foo)</b> E contains a textNode with a nodeValue that equals "foo"</li>
    <li> <b>E:not(S)</b> an E element that does not match simple selector S</li>
    <li> <b>E:has(S)</b> an E element that has a descendent that matches simple selector S</li>
    <li> <b>E:next(S)</b> an E element whose next sibling matches simple selector S</li>
    <li> <b>E:prev(S)</b> an E element whose previous sibling matches simple selector S</li>
</ul>
<h4>CSS Value Selectors:</h4>
<ul class="list">
    <li> <b>E{display=none}</b> css value "display" that equals "none"</li>
    <li> <b>E{display^=none}</b> css value "display" that starts with "none"</li>
    <li> <b>E{display$=none}</b> css value "display" that ends with "none"</li>
    <li> <b>E{display*=none}</b> css value "display" that contains the substring "none"</li>
    <li> <b>E{display%=2}</b> css value "display" that is evenly divisible by 2</li>
    <li> <b>E{display!=none}</b> css value "display" that does not equal "none"</li>
</ul>
 * @static
 */
Roo.DomQuery = function(){
    var cache = {}, simpleCache = {}, valueCache = {};
    var nonSpace = /\S/;
    var trimRe = /^\s+|\s+$/g;
    var tplRe = /\{(\d+)\}/g;
    var modeRe = /^(\s?[\/>+~]\s?|\s|$)/;
    var tagTokenRe = /^(#)?([\w-\*]+)/;
    var nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/;

    function child(p, index){
        var i = 0;
        var n = p.firstChild;
        while(n){
            if(n.nodeType == 1){
               if(++i == index){
                   return n;
               }
            }
            n = n.nextSibling;
        }
        return null;
    };

    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    };

    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };

    function children(d){
        var n = d.firstChild, ni = -1;
 	    while(n){
 	        var nx = n.nextSibling;
 	        if(n.nodeType == 3 && !nonSpace.test(n.nodeValue)){
 	            d.removeChild(n);
 	        }else{
 	            n.nodeIndex = ++ni;
 	        }
 	        n = nx;
 	    }
 	    return this;
 	};

    

    
     

    function concat(a, b){
        if(b.slice){
            return a.concat(b);
        }
        for(var i = 0, l = b.length; i < l; i++){
            a[a.length] = b[i];
        }
        return a;
    }

   
   

    


    // This is for IE MSXML which does not support expandos.
    // IE runs the same speed using setAttribute, however FF slows way down
    // and Safari completely fails so they need to continue to use expandos.
    var isIE = window.ActiveXObject ? true : false;

    // this eval is stop the compressor from
    // renaming the variable to something shorter
    
    /** eval:var:batch */
    var batch = 30803; 

    var key = 30803;

    function nodupIEXml(cs){
        var d = ++key;
        cs[0].setAttribute("_nodup", d);
        var r = [cs[0]];
        for(var i = 1, len = cs.length; i < len; i++){
            var c = cs[i];
            if(!c.getAttribute("_nodup") != d){
                c.setAttribute("_nodup", d);
                r[r.length] = c;
            }
        }
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].removeAttribute("_nodup");
        }
        return r;
    }

   
    function quickDiffIEXml(c1, c2){
        var d = ++key;
        for(var i = 0, len = c1.length; i < len; i++){
            c1[i].setAttribute("_qdiff", d);
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i].getAttribute("_qdiff") != d){
                r[r.length] = c2[i];
            }
        }
        for(var i = 0, len = c1.length; i < len; i++){
           c1[i].removeAttribute("_qdiff");
        }
        return r;
    }

    function quickDiff(c1, c2){
        var len1 = c1.length;
        if(!len1){
            return c2;
        }
        if(isIE && c1[0].selectSingleNode){
            return quickDiffIEXml(c1, c2);
        }
        var d = ++key;
        for(var i = 0; i < len1; i++){
            c1[i]._qdiff = d;
        }
        var r = [];
        for(var i = 0, len = c2.length; i < len; i++){
            if(c2[i]._qdiff != d){
                r[r.length] = c2[i];
            }
        }
        return r;
    }
	
	function quickId(ns, mode, root, id)
	{
		if(ns == root){
		   var d = root.ownerDocument || root;
		   return d.getElementById(id);
		}
		ns =  getNodes(ns, mode, "*");
		return Roo.DomQuery.byId(ns, null, id);
	}
	function getNodes(ns, mode, tagName)
	{
		var result = [], ri = -1, cs;
		if(!ns){
			return result;
		}
		tagName = tagName || "*";
		if(typeof ns.getElementsByTagName != "undefined"){
			ns = [ns];
		}
		if(!mode){
			for(var i = 0, ni; ni = ns[i]; i++){
				cs = ni.getElementsByTagName(tagName);
				for(var j = 0, ci; ci = cs[j]; j++){
					result[++ri] = ci;
				}
			}
		}else if(mode == "/" || mode == ">"){
			var utag = tagName.toUpperCase();
			for(var i = 0, ni, cn; ni = ns[i]; i++){
				cn = ni.children || ni.childNodes;
				for(var j = 0, cj; cj = cn[j]; j++){
					if(cj.nodeName == utag || cj.nodeName == tagName  || tagName == '*'){
						result[++ri] = cj;
					}
				}
			}
		}else if(mode == "+"){
			var utag = tagName.toUpperCase();
			for(var i = 0, n; n = ns[i]; i++){
				while((n = n.nextSibling) && n.nodeType != 1);
				if(n && (n.nodeName == utag || n.nodeName == tagName || tagName == '*')){
					result[++ri] = n;
				}
			}
		}else if(mode == "~"){
			for(var i = 0, n; n = ns[i]; i++){
				while((n = n.nextSibling) && (n.nodeType != 1 || (tagName == '*' || n.tagName.toLowerCase()!=tagName)));
				if(n){
					result[++ri] = n;
				}
			}
		}
		return result;
	}
	function byId (cs, attr, id)
	{
		if(cs.tagName || cs == document){
			cs = [cs];
		}
		if(!id){
			return cs;
		}
		var r = [], ri = -1;
		for(var i = 0,ci; ci = cs[i]; i++){
			if(ci && ci.id == id){
				r[++ri] = ci;
				return r;
			}
		}
		return r;
	}
	
	
	function byTag(cs, tagName)
	{
		if(cs.tagName || cs == document){
			cs = [cs];
		}
		if(!tagName){
			return cs;
		}
		var r = [], ri = -1;
		tagName = tagName.toLowerCase();
		for(var i = 0, ci; ci = cs[i]; i++){
			if(ci.nodeType == 1 && ci.tagName.toLowerCase()==tagName){
				r[++ri] = ci;
			}
		}
		return r;
	}

	
	
	function byClassName(c, a, v)
	{
		if(!v){
			return c;
		}
		var r = [], ri = -1, cn;
		for(var i = 0, ci; ci = c[i]; i++){
		
		
			if((' '+
		( (ci instanceof SVGElement) ? ci.className.baseVal : ci.className)
		 +' ').indexOf(v) != -1){
				r[++ri] = ci;
			}
		}
		return r;
	}
	function byAttribute(cs, attr, value, op, custom)
	{
		var r = [], ri = -1, st = custom=="{";
		var f = Roo.DomQuery.operators[op];
		for(var i = 0, ci; ci = cs[i]; i++){
			var a;
			if(st){
				a = Roo.DomQuery.getStyle(ci, attr);
			}
			else if(attr == "class" || attr == "className"){
				a = (ci instanceof SVGElement) ? ci.className.baseVal : ci.className;
			}else if(attr == "for"){
				a = ci.htmlFor;
			}else if(attr == "href"){
				a = ci.getAttribute("href", 2);
			}else{
				a = ci.getAttribute(attr);
			}
			if((f && f(a, value)) || (!f && a)){
				r[++ri] = ci;
			}
		}
		return r;
	}
	
	
	function nodup(cs)
	{
		if(!cs){
			return [];
		}
		var len = cs.length, c, i, r = cs, cj, ri = -1;
		if(!len || typeof cs.nodeType != "undefined" || len == 1){
			return cs;
		}
		if(isIE && typeof cs[0].selectSingleNode != "undefined"){
			return nodupIEXml(cs);
		}
		var d = ++key;
		cs[0]._nodup = d;
		for(i = 1; c = cs[i]; i++){
			if(c._nodup != d){
				c._nodup = d;
			}else{
				r = [];
				for(var j = 0; j < i; j++){
					r[++ri] = cs[j];
				}
				for(j = i+1; cj = cs[j]; j++){
					if(cj._nodup != d){
						cj._nodup = d;
						r[++ri] = cj;
					}
				}
				return r;
			}
		}
		return r;
	}
	
	// enable a generic call to all of the above functions.
	
	var cmdcall = {
		quickId : function(n, root, mode, arg) {
			return quickId(n, mode, root, arg);
		},
		getNodes: function(n, root, mode, arg) {
			return getNodes(n, mode, arg)
		},
		byId: function(n, root, mode, arg) {
			return byId(n, null, arg);
		},
		byTag: function(n, root, mode, arg) {
			return byTag(n, arg);
		},
		byClassName: function(n, root, mode, arg) {
			return  byClassName(n, null, " " + arg[1] + " ");
		},
		byPseudo: function(n, root, mode, arg) {
			return byPseudo(n, arg[1], arg[2]);
		},
		byAttribute: function(n, root, mode, arg) {
           return byAttribute(n, arg[2], arg[4], arg[3], arg[1]);
		},
        byIdAr: function(n, root, mode, arg) {
            return byId(n, null, arg[1]);
        }
 	};
   
	function byPseudo (cs, name, value)
	{
		return Roo.DomQuery.pseudos[name](cs, value);
	}
	
    function runFn(root, cmds)
	{
		 
		var mode;
		++Roo.DomQuery.batch;
		var n = root || document;
		for(var i = 0; i < cmds.length;i++) {
			var cmd = cmds[i];
			if (typeof(cmd) == "string") {
				mode = cmd;
				continue;
			}
			if (cmd == "attrValue") {
				return {
					firstChild:{
						nodeValue: Roo.DomQuery.attrValue(n, cmd[1][1])
					}
				};
			}
			n = cmdcall[cmd[0]](n, root,  mode,  cmd[1]);
		}
		return  nodup(n);
		
	}
	
	 

    return {
        getStyle : function(el, name){
            return Roo.fly(el).getStyle(name);
        },
		
		
		
		
        /**
         * Compiles a selector/xpath query into a reusable function. The returned function
         * takes one parameter "root" (optional), which is the context node from where the query should start.
         * @param {String} selector The selector/xpath query
         * @param {String} type (optional) Either "select" (the default) or "simple" for a simple selector match
         * @return {Function}
         */
        compile : function(path, type)
		{
            type = type || "select";
        
			var cmdar = [];
            var q = path, mode, lq;
            var tk = Roo.DomQuery.matchers;
            var tklen = tk.length;
            var mm;

            // accept leading mode switch
            var lmode = q.match(modeRe);
            if(lmode && lmode[1]){
                cmdar.push(lmode[1].replace(trimRe, ""));
                q = q.replace(lmode[1], "");
            }
            // strip leading slashes
            while(path.substr(0, 1)=="/"){
                path = path.substr(1);
            }

            while(q && lq != q){
                lq = q;
                var tm = q.match(tagTokenRe);
                if(type == "select"){
                    if(tm){
                        if(tm[1] == "#"){
                			cmdar.push([ "quickId" , tm[2] ]);
                        }else{
                			cmdar.push([ "getNodes" , tm[2] ]);
                        }
                        q = q.replace(tm[0], "");
                    }else if(q.substr(0, 1) != '@'){
                		cmdar.push([ "getNodes" , "*" ]);
                    }
                }else{
                    if(tm){
                        if(tm[1] == "#"){
                			cmdar.push([ "byId" , tm[2] ]);
                        }else{
                			cmdar.push([ "byTag", tm[2] ]);
                        }
                        q = q.replace(tm[0], "");
                    }
                }
                while(!(mm = q.match(modeRe))){
                    var matched = false;
                    for(var j = 0; j < tklen; j++){
                        var t = tk[j];
                        var m = q.match(t.re);
                        if(m){
                			cmdar.push([ t.method, m]);
				            q = q.replace(m[0], "");
                            matched = true;
                            break;
                        }
                    }
                    // prevent infinite loop on bad selector
                    if(!matched){
                        throw 'Error parsing selector, parsing failed at "' + q + '"';
                    }
                }
                if(mm[1]){
                	cmdar.push(mm[1].replace(trimRe, ""));
                    q = q.replace(mm[1], "");
                }
            }
 			return runFn.createDelegate(null, [ cmdar ], true);
			
        },

        /**
         * Selects a group of elements.
         * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Array}
         */
        select : function(path, root, type){
            if(!root || root == document){
                root = document;
            }
            if(typeof root == "string"){
                root = document.getElementById(root);
            }
            var paths = path.split(",");
            var results = [];
            for(var i = 0, len = paths.length; i < len; i++){
                var p = paths[i].replace(trimRe, "");
                if(!cache[p]){
                    cache[p] = Roo.DomQuery.compile(p);
                    if(!cache[p]){
                        throw p + " is not a valid selector";
                    }
                }
                var result = cache[p](root);
                if(result && result != document){
                    results = results.concat(result);
                }
            }
            if(paths.length > 1){
                return  nodup(results);
            }
            return results;
        },

        /**
         * Selects a single element.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @return {Element}
         */
        selectNode : function(path, root){
            return Roo.DomQuery.select(path, root)[0];
        },

        /**
         * Selects the value of a node, optionally replacing null with the defaultValue.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {String} defaultValue
         */
        selectValue : function(path, root, defaultValue){
            path = path.replace(trimRe, "");
            if(!valueCache[path]){
                valueCache[path] = Roo.DomQuery.compile(path, "select");
            }
            var n = valueCache[path](root);
            n = n[0] ? n[0] : n;
            var v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null||v === undefined||v==='') ? defaultValue : v);
        },

        /**
         * Selects the value of a node, parsing integers and floats.
         * @param {String} selector The selector/xpath query
         * @param {Node} root (optional) The start of the query (defaults to document).
         * @param {Number} defaultValue
         * @return {Number}
         */
        selectNumber : function(path, root, defaultValue){
            var v = Roo.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v);
        },

        /**
         * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String/HTMLElement/Array} el An element id, element or array of elements
         * @param {String} selector The simple selector to test
         * @return {Boolean}
         */
        is : function(el, ss){
            if(typeof el == "string"){
                el = document.getElementById(el);
            }
            var isArray = (el instanceof Array);
            var result = Roo.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0);
        },

        /**
         * Filters an array of elements to only include matches of a simple selector (e.g. div.some-class or span:first-child)
         * @param {Array} el An array of elements to filter
         * @param {String} selector The simple selector to test
         * @param {Boolean} nonMatches If true, it returns the elements that DON'T match
         * the selector instead of the ones that match
         * @return {Array}
         */
        filter : function(els, ss, nonMatches){
            ss = ss.replace(trimRe, "");
            if(!simpleCache[ss]){
                simpleCache[ss] = Roo.DomQuery.compile(ss, "simple");
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result;
        },

        /**
         * Collection of matching regular expressions and code snippets.
         */
        matchers : [
			{
                re: /^\.([\w-]+)/,
 				method : 'byClassName'
            }, {
                re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
 				method : 'byPseudo'
            },{
                re: /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
 				method: 'byAttribute'
            }, {
                re: /^#([\w-]+)/,
              //  select: 'n = Roo.DomQuery.byId(n, null, "{1}");',
				method: 'byIdAr'
            },{
                re: /^@([\w-]+)/,
                //select: 'return {firstChild:{nodeValue:Roo.DomQuery.attrValue(n, "{1}")}};',
				method : 'attrValue'
            }
        ],

        /**
         * Collection of operator comparison functions. The default operators are =, !=, ^=, $=, *=, %=, |= and ~=.
         * New operators can be added as long as the match the format <i>c</i>= where <i>c</i> is any character other than space, &gt; &lt;.
         */
        operators : {
            "=" : function(a, v){
                return a == v;
            },
            "!=" : function(a, v){
                return a != v;
            },
            "^=" : function(a, v){
                return a && a.substr(0, v.length) == v;
            },
            "$=" : function(a, v){
                return a && a.substr(a.length-v.length) == v;
            },
            "*=" : function(a, v){
                return a && a.indexOf(v) !== -1;
            },
            "%=" : function(a, v){
                return (a % v) == 0;
            },
            "|=" : function(a, v){
                return a && (a == v || a.substr(0, v.length+1) == v+'-');
            },
            "~=" : function(a, v){
                return a && (' '+a+' ').indexOf(' '+v+' ') != -1;
            }
        },

        /**
         * Collection of "pseudo class" processors. Each processor is passed the current nodeset (array)
         * and the argument (if any) supplied in the selector.
         */
        pseudos : {
            "first-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.previousSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "last-child" : function(c){
                var r = [], ri = -1, n;
                for(var i = 0, ci; ci = n = c[i]; i++){
                    while((n = n.nextSibling) && n.nodeType != 1);
                    if(!n){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nth-child" : function(c, a) {
                var r = [], ri = -1;
                var m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a);
                var f = (m[1] || 1) - 0, l = m[2] - 0;
                for(var i = 0, n; n = c[i]; i++){
                    var pn = n.parentNode;
                    if (batch != pn._batch) {
                        var j = 0;
                        for(var cn = pn.firstChild; cn; cn = cn.nextSibling){
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
                    } else if ((n.nodeIndex + l) % f == 0){
                        r[++ri] = n;
                    }
                }

                return r;
            },

            "only-child" : function(c){
                var r = [], ri = -1;;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(!prev(ci) && !next(ci)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "empty" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var cns = ci.childNodes, j = 0, cn, empty = true;
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
                return r;
            },

            "contains" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if((ci.textContent||ci.innerText||'').indexOf(v) != -1){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "nodeValue" : function(c, v){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.firstChild && ci.firstChild.nodeValue == v){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "checked" : function(c){
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(ci.checked == true){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "not" : function(c, ss){
                return Roo.DomQuery.filter(c, ss, true);
            },

            "odd" : function(c){
                return this["nth-child"](c, "odd");
            },

            "even" : function(c){
                return this["nth-child"](c, "even");
            },

            "nth" : function(c, a){
                return c[a-1] || [];
            },

            "first" : function(c){
                return c[0] || [];
            },

            "last" : function(c){
                return c[c.length-1] || [];
            },

            "has" : function(c, ss){
                var s = Roo.DomQuery.select;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    if(s(ss, ci).length > 0){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "next" : function(c, ss){
                var is = Roo.DomQuery.is;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = next(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            },

            "prev" : function(c, ss){
                var is = Roo.DomQuery.is;
                var r = [], ri = -1;
                for(var i = 0, ci; ci = c[i]; i++){
                    var n = prev(ci);
                    if(n && is(n, ss)){
                        r[++ri] = ci;
                    }
                }
                return r;
            }
        },
		
		
		
		
		
		
		attrValue : function (n, attr)
		{
			if(!n.tagName && typeof n.length != "undefined"){
				n = n[0];
			}
			if(!n){
				return null;
			}
			if(attr == "for"){
				return n.htmlFor;
			}
			if(attr == "class" || attr == "className"){
			return (n instanceof SVGElement) ? n.className.baseVal : n.className;
			}
			return n.getAttribute(attr) || n[attr];
	
		}


    };
}();

/**
 * Selects an array of DOM nodes by CSS/XPath selector. Shorthand of {@link Roo.DomQuery#select}
 * @param {String} path The selector/xpath query
 * @param {Node} root (optional) The start of the query (defaults to document).
 * @return {Array}
 * @member Roo
 * @method query
 */
Roo.query = Roo.DomQuery.select;