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
            var st = console.d.style;
            st.position = 'absolute';
            st.top = 0;
            st.right = 0;
            st.width='300px';
            st.border = '1px solid #999';
            st.fontFamily = 'courier,monospace';
            st.background = '#eee';
            st.fontSize = '10px';
            st.padding = '10px';
            
            
            console.hide();
         
            
            var CSS = "\n" + 
                
                '#fauxconsole a{'+
                '    float:right;'+
                '    padding-left:1em;'+
                '    padding-bottom:.5em;'+
                '    text-align:right;'+
                '}'; 
            var htmDiv = document.createElement('div');
            htmDiv.innerHTML = '<p>&nbsp;</p><style>'+CSS+'</style>';
            document.body.appendChild(htmDiv);
          
            
            
        },
        hide:function(){
            console.d.style.display='none';
        },
        show:function(){
            console.d.style.display='block';
        },
        log:function(o){
            if (!console.d) {
                console.init();
            }
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
