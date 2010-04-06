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
 * @class Roo.state.CookieProvider
 * @extends Roo.state.Provider
 * The default Provider implementation which saves state via cookies.
 * <br />Usage:
 <pre><code>
   var cp = new Roo.state.CookieProvider({
       path: "/cgi-bin/",
       expires: new Date(new Date().getTime()+(1000*60*60*24*30)); //30 days
       domain: "roojs.com"
   })
   Roo.state.Manager.setProvider(cp);
 </code></pre>
 * @cfg {String} path The path for which the cookie is active (defaults to root '/' which makes it active for all pages in the site)
 * @cfg {Date} expires The cookie expiration date (defaults to 7 days from now)
 * @cfg {String} domain The domain to save the cookie for.  Note that you cannot specify a different domain than
 * your page is on, but you can specify a sub-domain, or simply the domain itself like 'roojs.com' to include
 * all sub-domains if you need to access cookies across different sub-domains (defaults to null which uses the same
 * domain the page is running on including the 'www' like 'www.roojs.com')
 * @cfg {Boolean} secure True if the site is using SSL (defaults to false)
 * @constructor
 * Create a new CookieProvider
 * @param {Object} config The configuration object
 */
Roo.state.CookieProvider = function(config){
    Roo.state.CookieProvider.superclass.constructor.call(this);
    this.path = "/";
    this.expires = new Date(new Date().getTime()+(1000*60*60*24*7)); //7 days
    this.domain = null;
    this.secure = false;
    Roo.apply(this, config);
    this.state = this.readCookies();
};

Roo.extend(Roo.state.CookieProvider, Roo.state.Provider, {
    // private
    set : function(name, value){
        if(typeof value == "undefined" || value === null){
            this.clear(name);
            return;
        }
        this.setCookie(name, value);
        Roo.state.CookieProvider.superclass.set.call(this, name, value);
    },

    // private
    clear : function(name){
        this.clearCookie(name);
        Roo.state.CookieProvider.superclass.clear.call(this, name);
    },

    // private
    readCookies : function(){
        var cookies = {};
        var c = document.cookie + ";";
        var re = /\s?(.*?)=(.*?);/g;
    	var matches;
    	while((matches = re.exec(c)) != null){
            var name = matches[1];
            var value = matches[2];
            if(name && name.substring(0,3) == "ys-"){
                cookies[name.substr(3)] = this.decodeValue(value);
            }
        }
        return cookies;
    },

    // private
    setCookie : function(name, value){
        document.cookie = "ys-"+ name + "=" + this.encodeValue(value) +
           ((this.expires == null) ? "" : ("; expires=" + this.expires.toGMTString())) +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    },

    // private
    clearCookie : function(name){
        document.cookie = "ys-" + name + "=null; expires=Thu, 01-Jan-70 00:00:01 GMT" +
           ((this.path == null) ? "" : ("; path=" + this.path)) +
           ((this.domain == null) ? "" : ("; domain=" + this.domain)) +
           ((this.secure == true) ? "; secure" : "");
    }
});