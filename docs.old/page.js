//<script type="text/javascript">
/* -- IE kludge as usual! */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}



RooDocsPage = {
    
    isIE: function() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("msie") > -1;
        
    },
    
    
    onload : function()
    {
        //console.log("loading");
        
        this.addEvent(document,'click', function(e) {
            var ev = e || window.event;
            var t = ev.target || ev.srcElement;
            //console.log(t);
            return RooDocsPage.clicked(t);
            
        });
        
        
        
    },
    addEvent: function(el, eventName, fn)
    {
        
        if (window.addEventListener) {
            capture = false;
            el.addEventListener(eventName, fn, (capture));
            return;
        } 
        if (window.attachEvent) {
            el.attachEvent("on" + eventName, fn);
            return;
         
        }
    },
    clicked : function(t)
    {
        
        
        var classAr = t.className.split(' ');
        //console.log(classAr)
        if ((t.nodeName == 'a') && (classAr.indexOf('exi') < 0) && (classAr.indexOf('micon') < 0)) {
            // link clicked...
            return false;
            /*
            var cls  = this.getAttributeNS(t,'roo', 'cls');
            if (cls) {
                
                var member = this.getAttributeNS(t,'roo', 'member');
                //this.loadClass(target.href, cls, member);
                
                if (/^src\//.test(cls)) {
                    cls = cls.replace(/.js$/, ''); // get rid of .js for source links..
                }
                
                
                document.location = "symbols/"+ cls +".html";
                return;
            }
            */
        }
            
           
        
        
        if (classAr.indexOf('exi') > -1 || classAr.indexOf('micon') > -1) {
            
            var tr = t;
            //console.log(tr.parentNode);
            while (tr.parentNode) {
                ///console.log(tr.nodeName);
                if (tr.nodeName.toUpperCase() =='TR') {
                    break;
                }
                tr = tr.parentNode;
            }
            if (tr.nodeName.toUpperCase() != 'TR') { // no tr!
                return false;
            }
            //console.log(tr.className)
            if (tr.className.match(/expandable/)) {
                
                if (!/expanded/.test(tr.className)) {
                    
                    tr.className += " expanded";
                    
                    this.loadComments(tr);
                    
                  //  console.log("ADDED:"+ tr.className);
                } else {
                    tr.className = tr.className.replace(/ expanded/,'');
                    //console.log("REMOVED:"+ tr.className);
                }
            }
            return true;
            
            
            
        }
        return false;
    },
    
    getAttributeNS : function(d,ns,name) {
        if (this.isIE()) {
            // ie uses attribute stuff...
            var type = typeof d[ns+":"+name];
            if(type != 'undefined' && type != 'unknown'){
                return d[ns+":"+name];
            }
            return d[name];
            
        } 
        return d.getAttributeNS(ns, name) || d.getAttribute(ns+":"+name) || d.getAttribute(name) || d[name];
    },
    loadComments: function(tr)
    {
        // first look for  'a' tag with id -
        var a_s = tr.getElementsByTagName('a');
        
        if (a_s.length < 2) return; 
        var id = a_s[1].getAttribute('id');
        
        
        
        // then see if we have a comment-{id}
        
        if (document.getElementById('comments-' + id)) {
            // we already have it... assume it's loaded and does not need refeshing...
            return;
        }
        
        // then if not create it....
        var div_s = tr.getElementsByTagName('div');
        var pdiv = false;
        for (var i=0;i<div_s.length;i++) {
            
            if (div_s[i].className != "long") {
                continue
            }
            pdiv = div_s[i].parentNode; // parent of the <div class="long"
            
        }
        if (!pdiv) { // we dont have a parent to add it to...
            return; 
        }
        
        var cdiv = document.createElement("div");
        cdiv.className = "comments";
        var cb = document.createElement("b");
        cb.appendChild(document.createTextNode("Element Comment / Notes"));
        cdiv.appendChild(cb);
        cdiv.appendChild(document.createTextNode(" => "));
        var cu = document.createElement("u");
        cu.appendChild(document.createTextNode("[Add Your comment/notes about this element]"));
        
        cu.setAttribute("onclick", "parent.CommentDialog.showCommentId = '" +   id  + "';");
        cdiv.appendChild(cu);
        cdiv.appendChild(document.createElement("br"));
        var ciframe = document.createElement("iframe");
        ciframe.setAttribute('height', '50');
        ciframe.setAttribute('frameborder', '50');
        ciframe.setAttribute('src', '/blog.php/GtkDjsComments/' + id + '.html');
        ciframe.setAttribute('style', 'border: medium none ; width: 100%;');
        ciframe.setAttribute('id', 'comments-' + id);
        cdiv.appendChild(ciframe);
        pdiv.appendChild(cdiv);
        
    }
    
    
}


 /*
this.preview.getEl().on('click', function(e, target)
        {
            //console.log("click pressed?");
            
            if(target = e.getTarget('a:not(.exi)', 3)) {
                var cls = Ext.fly(target).getAttributeNS('roo', 'cls');
                e.stopEvent();
                if(cls){
                    var member = Ext.fly(target).getAttributeNS('roo', 'member');
                    //this.loadClass(target.href, cls, member);
                    
                    if (/^src\//.test(cls)) {
                        cls = cls.replace(/.js$/, ''); // get rid of .js for source links..
                    }
                    
                    
                    MainBody.loadPage("symbols/"+ cls +".html");
                    return;
                }
                if(target.className == 'inner-link'){ // go to #
                    this.getActiveTab().scrollToSection(target.href.split('#')[1]);
                    return;
                }
                window.open(target.href);
                
                return; // no more...
            }
            if(target = e.getTarget('.micon', 2)){
                
                e.stopEvent();
                var tr = Ext.fly(target.parentNode);
                if(tr.hasClass('expandable')){
                    tr.toggleClass('expanded');
                }
            }
          
        });
*/