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
 * @class Roo.util.CSS
 * Utility class for manipulating CSS rules
 * @static

 */
Roo.util.CSS = function(){
	var rules = null;
   	var doc = document;

    var camelRe = /(-[a-z])/gi;
    var camelFn = function(m, a){ return a.charAt(1).toUpperCase(); };

   return {
   /**
    * Very simple dynamic creation of stylesheets from a text blob of rules.  The text will wrapped in a style
    * tag and appended to the HEAD of the document.
    * @param {String|Object} cssText The text containing the css rules
    * @param {String} id An id to add to the stylesheet for later removal
    * @return {StyleSheet}
    */
    createStyleSheet : function(cssText, id){
        var ss;
        var head = doc.getElementsByTagName("head")[0];
        var nrules = doc.createElement("style");
        nrules.setAttribute("type", "text/css");
        if(id){
            nrules.setAttribute("id", id);
        }
        if (typeof(cssText) != 'string') {
            // support object maps..
            // not sure if this a good idea.. 
            // perhaps it should be merged with the general css handling
            // and handle js style props.
            var cssTextNew = [];
            for(var n in cssText) {
                var citems = [];
                for(var k in cssText[n]) {
                    citems.push( k + ' : ' +cssText[n][k] + ';' );
                }
                cssTextNew.push( n + ' { ' + citems.join(' ') + '} ');
                
            }
            cssText = cssTextNew.join("\n");
            
        }
       
       
       if(Roo.isIE){
           head.appendChild(nrules);
           ss = nrules.styleSheet;
           ss.cssText = cssText;
       }else{
           try{
                nrules.appendChild(doc.createTextNode(cssText));
           }catch(e){
               nrules.cssText = cssText; 
           }
           head.appendChild(nrules);
           ss = nrules.styleSheet ? nrules.styleSheet : (nrules.sheet || doc.styleSheets[doc.styleSheets.length-1]);
       }
       this.cacheStyleSheet(ss);
       return ss;
   },

   /**
    * Removes a style or link tag by id
    * @param {String} id The id of the tag
    */
   removeStyleSheet : function(id){
       var existing = doc.getElementById(id);
       if(existing){
           existing.parentNode.removeChild(existing);
       }
   },

   /**
    * Dynamically swaps an existing stylesheet reference for a new one
    * @param {String} id The id of an existing link tag to remove
    * @param {String} url The href of the new stylesheet to include
    */
   swapStyleSheet : function(id, url){
       this.removeStyleSheet(id);
       var ss = doc.createElement("link");
       ss.setAttribute("rel", "stylesheet");
       ss.setAttribute("type", "text/css");
       ss.setAttribute("id", id);
       ss.setAttribute("href", url);
       doc.getElementsByTagName("head")[0].appendChild(ss);
   },
   
   /**
    * Refresh the rule cache if you have dynamically added stylesheets
    * @return {Object} An object (hash) of rules indexed by selector
    */
   refreshCache : function(){
       return this.getRules(true);
   },

   // private
   cacheStyleSheet : function(stylesheet){
       if(!rules){
           rules = {};
       }
       try{// try catch for cross domain access issue
           var ssRules = stylesheet.cssRules || stylesheet.rules;
           for(var j = ssRules.length-1; j >= 0; --j){
               rules[ssRules[j].selectorText] = ssRules[j];
           }
       }catch(e){}
   },
   
   /**
    * Gets all css rules for the document
    * @param {Boolean} refreshCache true to refresh the internal cache
    * @return {Object} An object (hash) of rules indexed by selector
    */
   getRules : function(refreshCache){
   		if(rules == null || refreshCache){
   			rules = {};
   			var ds = doc.styleSheets;
   			for(var i =0, len = ds.length; i < len; i++){
   			    try{
    		        this.cacheStyleSheet(ds[i]);
    		    }catch(e){} 
	        }
   		}
   		return rules;
   	},
   	
   	/**
    * Gets an an individual CSS rule by selector(s)
    * @param {String/Array} selector The CSS selector or an array of selectors to try. The first selector that is found is returned.
    * @param {Boolean} refreshCache true to refresh the internal cache if you have recently updated any rules or added styles dynamically
    * @return {CSSRule} The CSS rule or null if one is not found
    */
   getRule : function(selector, refreshCache){
   		var rs = this.getRules(refreshCache);
   		if(!(selector instanceof Array)){
   		    return rs[selector];
   		}
   		for(var i = 0; i < selector.length; i++){
			if(rs[selector[i]]){
				return rs[selector[i]];
			}
		}
		return null;
   	},
   	
   	
   	/**
    * Updates a rule property
    * @param {String/Array} selector If it's an array it tries each selector until it finds one. Stops immediately once one is found.
    * @param {String} property The css property
    * @param {String} value The new value for the property
    * @return {Boolean} true If a rule was found and updated
    */
   updateRule : function(selector, property, value){
   		if(!(selector instanceof Array)){
   			var rule = this.getRule(selector);
   			if(rule){
   				rule.style[property.replace(camelRe, camelFn)] = value;
   				return true;
   			}
   		}else{
   			for(var i = 0; i < selector.length; i++){
   				if(this.updateRule(selector[i], property, value)){
   					return true;
   				}
   			}
   		}
   		return false;
   	}
   };	
}();