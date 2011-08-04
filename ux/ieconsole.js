/* Faux Console by Chris Heilmann http://wait-till-i.com */ 
if(!window.console){
	var console={
		init:function(){
			console.d=document.createElement('div');
			document.body.appendChild(console.d);
			var a=document.createElement('a');
			a.href='javascript:console.hide()';
            a.innerHTML='close';
            console.d.appendChild(a);
            var a=document.createElement('a');
            a.href='javascript:console.clear();';
            a.innerHTML='clear';
            console.d.appendChild(a);
            var id='fauxconsole';
            if(!document.getElementById(id)){
                console.d.id=id;
            }
            console.hide();
            var st = document.createElement('style');
            st.type="text/css";
            st.media="all";
            st.appendChild(document.createTextNode("\n" + 
                '﻿#fauxconsole{' +
                '    position:absolute;' +
                '    top:0;'+
                '    right:0;'+
                '    width:300px;'+
                '    border:1px solid #999;'+
                '    font-family:courier,monospace;'+
                '    background:#eee;'+
                '    font-size:10px;'+
                '    padding:10px;'+
                '}'+
                'html>body #fauxconsole{'+
                '    position:fixed;'+
                '}'+
                '#fauxconsole a{'+
                '    float:right;'+
                '    padding-left:1em;'+
                '    padding-bottom:.5em;'+
                '    text-align:right;'+
                '}')); 
            
            
            document.body.appendChild(st);
            
            
        },
        hide:function(){
            console.d.style.display='none';
        },
        show:function(){
            console.d.style.display='block';
        },
        log:function(o){
            console.d.innerHTML+='<br/>'+o;
            console.show();
        },
        clear:function(){
            console.d.parentNode.removeChild(console.d);
            console.init();
            console.show();
        },
        /*Simon Willison rules*/
        addLoadEvent:function(func){
            var oldonload=window.onload;
            if(typeof window.onload!='function'){
                window.onload=func;
            }else{
                window.onload=function(){
                    if(oldonload){
                        oldonload();
                    }
                    func();
                };
            }
        }
    };
    console.addLoadEvent(console.init);
}
