//<script type="text/javascript">
// file to load 

// could probably do this with anon-functions..



// -----------------------------------
// this stuff doesnt work!!!

// -----------------------------------

function RooDebugLoader(fn)
{
    
    // these fire off too fast for the thing to work correctly...
    window.setTimeout(function() {
            //console.log("load" + fn);
            if (typeof(fn) == 'string') {
                RooDebugLoader.realLoad(fn);
                return;
            }
            fn.call();
            
        }, RooDebugLoader.timer);
    RooDebugLoader.timer += 200;
}
    
 RooDebugLoader.realLoad = function (fn)   
    function getpath()
    {
        if (typeof(RooDebugLoader.path) != 'undefined'){
            return RooDebugLoader.path;
        }
        var sts = document.getElementsByTagName('script');
        for (var i =0;i<sts.length;i++) {
            if (/\/roojs-debug.js$/.test(sts[i].getAttribute('src'))) {
                RooDebugLoader.path = sts[i].getAttribute('src').replace(/\/roojs-debug.js$/,'')
                return RooDebugLoader.path;
            }
        }
        alert("can not find path to roojs-debug.js");
        throw "oops";
        
        
    }
    
    var html_doc = document.getElementsByTagName('head')[0];
    
    if (/\.js$/.test(fn)) {
            
        
        var js = document.createElement('script');
        js.setAttribute('language', 'javascript');
        js.setAttribute('type', 'text/javascript');
        //js.setAttribute('src', getpath() + '/' + fn +'?_ts='+Math.random());
        js.setAttribute('src', getpath() + '/' + fn);
        html_doc.appendChild(js);
        return
    }
    if (/\.css$/.test(fn)) {
            
        //<link rel="stylesheet" type="text/css" href="App_Themes/HCCCommonStyle.css" />
        var js = document.createElement('link');
        js.setAttribute('rel', 'stylesheet');
        js.setAttribute('type', 'text/css');
        
        js.setAttribute('href', getpath() + '/' + fn);
        html_doc.appendChild(js);
    }
}
RooDebugLoader.timer = 200;
RooDebugLoader.loaded = false;
RooDebugLoader.onload = function()
{
    if (RooDebugLoader.loaded) {
        return false;
    }
    if (!document || !document.getElementsByTagName('script').length) {
        window.setTimeout(RooDebugLoader.onload, 100);
    }
    RooDebugLoader.loaded = true;
    RooDebugLoader.loader();
}
//RooDebugLoader.onload();
window.setTimeout(RooDebugLoader.onload, 100);

RooDebugLoader.loader = function () {
    
RooDebugLoader('css/reset-min.css');
RooDebugLoader('css/core.css');
RooDebugLoader('css/basic-dialog.css');
RooDebugLoader('css/button.css');
RooDebugLoader('css/inline-editor.css');
RooDebugLoader('css/layout.css');
RooDebugLoader('css/qtips.css');
RooDebugLoader('css/resizable.css')
RooDebugLoader('css/tabs.css');
RooDebugLoader('css/toolbar.css');
RooDebugLoader('css/tree.css');
RooDebugLoader('css/ytheme-gray.css');




