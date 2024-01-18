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
Roo.BLANK_IMAGE_URL = '../../images/default/s.gif';

Roo.example = function(){
    var msgCt;

    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Roo.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Roo.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(1).ghost("t", {remove:true});
        },

        init : function(){
            var s = Roo.get('extlib'), t = Roo.get('exttheme');
            if(!s || !t){ // run locally?
                return;
            }
            var lib = Cookies.get('extlib') || 'ext', 
                theme = Cookies.get('exttheme') || 'aero';
            if(lib){
                s.dom.value = lib;
            }
            if(theme){
                t.dom.value = theme;
                Roo.get(document.body).addClass('x-'+theme);
            }
            s.on('change', function(){
                Cookies.set('extlib', s.getValue());
                setTimeout(function(){
                    window.location.reload();
                }, 250);
            });

            t.on('change', function(){
                Cookies.set('exttheme', t.getValue());
                setTimeout(function(){
                    window.location.reload();
                }, 250);
            });
        }
    };
}();

Roo.onReady(Roo.example.init, Roo.example);


// old school cookie functions grabbed off the web
var Cookies = {};
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};

RooDocs= {};
RooDocs.viewSource = {
     show : function(page)
    {
        this.create();
        
        //this.contentPanel.getEl().dom.src = 'about:blank';
        //this.printContentPanel.refresh();
        this.dialog.getLayout().beginUpdate();
        try {
            this.dialog.resizeTo(window.innerWidth - 70,window.innerHeight - 70);
        } catch(e) {
            this.dialog.resizeTo(document.body.offsetWidth - 70,document.body.offsetHeight - 70);
        }
        
        this.dialog.getLayout().endUpdate();
        this.contentPanel.getEl().dom.style.width = this.dialog.getLayout().getRegion("center").box.width -7;
        this.contentPanel.getEl().dom.style.height = this.dialog.getLayout().getRegion("center").box.height -7;
        this.dialog.show();
        var dl =document.location.pathname.split('/');
        dl.pop();
        this.contentPanel.getEl().load( dl.join('/') + page);
        
    },
    
    dialog : false,
    
    create : function()
    {
        if (this.dialog) {
            return;
           }
        var jd = Roo.get(document.body).createChild({tag:'div'});
        this.dialog =  new Roo.LayoutDialog(jd, { 
                autoTabs:true,
                width:500,
                height:300,
                shadow:true,
                title: "Help",
                minWidth:300,
                minHeight:250,
                modal: true,
                fixedcenter: true,
                  draggable: false,
            collapsible: false,
            resizable: false,
                center: {
                    autoScroll:true,
                    titlebar: false,
                    // tabPosition: 'top',
                    fitContainer: true,
                    hideTabs: true,
                    closeOnTab: true,
                    alwaysShowTabs: false
                }
                
        });
        this.dialog.addButton('Close', this.dialog.hide, this.dialog);
        var layout = this.dialog.getLayout();
        layout.beginUpdate();
        //this.view = new Roo.ContentPanel(Roo.id(), { autoCreate:true, title: '', background:true});
        var frm = layout.getEl().createChild({ tag:'div' });
        this.contentPanel = new Roo.panel.Content(frm, {title: 'View Source', 	fitContainer: true, autoScroll: true});
        this.contentPanel.getEl().getUpdateManager().setRenderer(new Roo.UpdateManager.RawRenderer());
        layout.add('center', this.contentPanel);
        layout.endUpdate();
    }
     
    
    
};
Roo.UpdateManager.RawRenderer = function(){};

Roo.UpdateManager.RawRenderer.prototype = {

    render : function(el, response, updateManager, callback){
        el.update('<PRE style="margin:10px;">' + Roo.util.Format.htmlEncode(response.responseText) +'</PRE>', updateManager.loadScripts, callback);
    }
};

