//<script type="text/javascript">
// not we use xxx = function() - as this get's loaded by a nested eval..
// 


JSON = new (function(){
    var useHasOwn = {}.hasOwnProperty ? true : false;
    
    // crashes Safari in some instances
    //var validRE = /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
    
    var pad = function(n) {
        return n < 10 ? "0" + n : n;
    };
    
    var m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };

    var encodeString = function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    };
    
    var encodeArray = function(o){
        var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : JSON.encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
    };
    
    var encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };
    
    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = function(o){
        if(typeof o == "undefined" || o === null){
            return "null";
        }else if(o instanceof Array){
            return encodeArray(o);
        }else if(o instanceof Date){
            return encodeDate(o);
        }else if(typeof o == "string"){
            return encodeString(o);
        }else if(typeof o == "number"){
            return isFinite(o) ? String(o) : "null";
        }else if(typeof o == "boolean"){
            return String(o);
        }else {
            var a = ["{"], b, i, v;
            for (i in o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
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
            return a.join("");
        }
    };
    
    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = function(json){
        /**
         * eval:var:json
         */
        return eval("(" + json + ')');
    };
})();



publish  = function(symbolSet) {
	publish.conf = {  // trailing slash expected for dirs
		ext: ".html",
		
		templatesDir: JSDOC.opt.t + "/",
		symbolsDir: "symbols/",
		srcDir: "symbols/src/"
	};
  
	publish.conf.outDir = (JSDOC.opt.d.length > 0 ? JSDOC.opt.d : "/tmp/jsdoc/");
	
    
    
    
	if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
		Link.prototype._makeSrcLink = function(srcFilePath) {
			return "&lt;"+srcFilePath+"&gt;";
		}
	}
	
    println(publish.conf.outDir);
    
    if (!File.exists(publish.conf.outDir))
        File.mkdir(publish.conf.outDir);
    if (!File.exists(publish.conf.outDir+"symbols"))
        File.mkdir(publish.conf.outDir+"symbols");
    if (!File.exists(publish.conf.outDir+"symbols/src"))
        File.mkdir(publish.conf.outDir+"symbols/src");
    
    IO.copyFile (publish.conf.templatesDir+"static/default.css", publish.conf.outDir, "default.css");
    IO.copyFile (publish.conf.templatesDir+"static/doc.js", publish.conf.outDir, "doc.js");
    IO.copyFile (publish.conf.templatesDir+"static/page.js", publish.conf.outDir, "page.js");
  
    
	//IO.mkPath((publish.conf.outDir+"symbols/src").split("/"));
		
	// used to check the details of things being linked to
	Link.symbolSet = symbolSet;

	//try {
		var classTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"class.tmpl");
		var classesTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allclasses.tmpl");
	//}
	//atch(e) {
	//	print(e.message);
	///	quit();
	//}
	
	// filters
    
    classTemplate.symbolSet = symbolSet;
    
    
	function hasNoParent($) {return ($.memberOf == "")}
	function isaFile($) {return ($.is("FILE"))}
	function isaClass($) { return ($.is("CONSTRUCTOR") || $.isNamespace); }
	
	var symbols = symbolSet.toArray();
	
	var files = JSDOC.opt.srcFiles;
 	for (var i = 0, l = files.length; i < l; i++) {
 		var file = files[i];
 		var srcDir = publish.conf.outDir + "symbols/src/";
		makeSrcFile(file, srcDir);
 	}
 	
 	var classes = symbols.filter(isaClass).sort(makeSortby("alias"));
	
	Link.base = "../";
 	publish.classesIndex = classesTemplate.process(classes); // kept in memory
	
    IO.makeDir(publish.conf.outDir+"json");
    
	for (var i = 0, l = classes.length; i < l; i++) {
		var symbol = classes[i];
		var output = "";
        
		output = classTemplate.process(symbol);
		println("write " + publish.conf.outDir+"symbols/" +symbol.alias+publish.conf.ext);
		IO.saveFile(publish.conf.outDir+"symbols/", symbol.alias+publish.conf.ext, output);
        // dump out a 
        IO.saveFile(publish.conf.outDir+"json/",  symbol.alias+'.json' , publish.jsonRender(symbol));
        
        
	}
	
	// regenrate the index with different relative links
	Link.base = "";
	publish.classesIndex = classesTemplate.process(classes);
	
	try {
		var classesindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"index.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var classesIndex = classesindexTemplate.process(classes);
	IO.saveFile(publish.conf.outDir, "index"+publish.conf.ext, classesIndex);
	classesindexTemplate = classesIndex = classes = null;
	
	try {
		var fileindexTemplate = new JSDOC.JsPlate(publish.conf.templatesDir+"allfiles.tmpl");
	}
	catch(e) { print(e.message); quit(); }
	
	var documentedFiles = symbols.filter(isaFile);
	var allFiles = [];
	
	for (var i = 0; i < files.length; i++) {
		allFiles.push(new JSDOC.Symbol(files[i], [], "FILE", new JSDOC.DocComment("/** */")));
	}
	
	for (var i = 0; i < documentedFiles.length; i++) {
		var offset = files.indexOf(documentedFiles[i].alias);
		allFiles[offset] = documentedFiles[i];
	}
		
	allFiles = allFiles.sort(makeSortby("name"));

	var filesIndex = fileindexTemplate.process(allFiles);
	IO.saveFile(publish.conf.outDir, "files"+publish.conf.ext, filesIndex);
	fileindexTemplate = filesIndex = files = null;
}

publish.jsonRender = function(data)
{
    // what we need to output to be usefull...
    // a) props..
    var cfgProperties = [];
	if (!data.comment.getTag('singleton').length) {
		cfgProperties = data.configToArray();
		cfgProperties = cfgProperties.sort(makeSortby("name"));
		
	}
    var props = []; 
    //println(cfgProperties.toSource());
    var p ='';
    for(var i =0; i < cfgProperties.length;i++) {
        p = cfgProperties[i];
        props.push( {
            name : p.name,
            type : p.type,
            desc : p.desc,
            memberOf : p.memberOf == data.alias ? '' : p.memberOf
        });
    }
    
     
    var ownEvents = data.methods.filter( function(e){
            return e.isEvent && !e.comment.getTag('hide').length;
        }).sort(makeSortby("name"));
		 
    
    var events = [];
    var m;
	for(var i =0; i < ownEvents.length;i++) {
        m = ownEvents[i];
        events.push( {
            name : m.name.substring(1),
            sig : makeFuncSkel(m.params),
            type : 'function',
            desc : m.desc
        });
    }
    //println(props.toSource());
    // we need to output:
    //classname => {
    //    propname => 
    //        type=>
    //        desc=>
    //    }

    var ret = {
        props : props,
        events: events
    };
    return JSON.encode(ret);
	
    
    // b) methods
    // c) events
    
    
}



/** Just the first sentence. */
summarize = function(desc) {
	if (typeof desc != "undefined")
		return desc.match(/([\w\W]+?\.)[^a-z0-9]/i)? RegExp.$1 : desc;
}

/** make a symbol sorter by some attribute */
makeSortby = function(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute]; //.toLowerCase();
			b = b[attribute];//.toLowerCase();
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}
/*
function include(path) {
	var path = publish.conf.templatesDir+path;
	return IO.readFile(path);
}
*/

function makeSrcFile(path, srcDir, name) {
	if (JSDOC.opt.s) return;
	
	if (!name) {
		name = path.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
		name = name.replace(/\:/g, "_");
	}
	
	var src = {path: path, name:name, charset: IO.encoding, hilited: ""};
	
	if (JSDOC.hasOwnProperty('PluginManager')) {
		JSDOC.PluginManager.run("onPublishSrc", src);
	}

	if (src.hilited) {
		IO.saveFile(srcDir, name+publish.conf.ext, src.hilited);
	}
}

makeSignature= function(params) {
	if (!params) return "()";
	var signature = "("	+
        params.filter(
            function($) {
                return $.name.indexOf(".") == -1; // don't show config params in signature
            }
        ).map(
            function($) {
                $.defaultValue = typeof($.defaultValue) == 'undefined' ? false : $.defaultValue;
                
                return "" +
                    ($.isOptional ? "[" : "") +
                    (($.type) ? (new Link().toSymbol($.type)) + " " : "") + 
                    "<B><i>" +$.name + "</i></B>" +
                    ($.defaultValue ? "=" +item.defaultValue : "") +
                    ($.isOptional ? "]" : "");
                
                 
            }
        ).join(", ")
	+
	")";
	return signature;
}

makeFuncSkel =  function(params) {
	if (!params) return "function ()\n{\n\n}";
	return "function ("	+
        params.filter(
            function($) {
                return $.name.indexOf(".") == -1; // don't show config params in signature
            }
        ).map( function($) { return $.name == 'this' ? '_self' : $.name; } ).join(", ")
	+
	")\n{\n\n}";
	
}

/** Find symbol {@link ...} strings in text and turn into html links */
resolveLinks = function (str, from) {
    if (typeof(str) == 'undefined') {
        return '';
    }
	str = str.replace(/\{@link ([^} ]+) ?\}/gi,
		function(match, symbolName) {
			return new Link().toSymbol(symbolName);
		}
	);
	
    str = str.replace(/\{([a-z\.\/]+)\}/gi,
		function(match, symbolName) {
            //println("got match " + symbolName);
            bits = symbolName.split('/');
            var mret = '';
            for(var i = 0; i < bits.length; i++) {
                
                mret += (mret.length ? '&nbsp;|&nbsp;' : '') + new Link().toSymbol(bits[i]);
            }
            
            return mret; //new Link().toSymbol(symbolName);
		}
	);
    
    // look for aaaa.\S+  ??? this might work???
    /*
    str = str.replace(/\([a-z]+\.\S+)/gi,
		function(match, symbolName) {
            return new Link().toSymbol(symbolName);
		}
	);
    */
    
	return str;
}