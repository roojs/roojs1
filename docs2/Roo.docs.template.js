

Roo.docs.template  = {

    augments : function(data)
    {
	if (!data.augments.length) {
	    return '';
	}
	var linkSymbol  = this.linkSymbol;
	var output = '<div class="inheritance res-block"> <pre class="res-block-inner">';
    
	var iblock_indent = 0;
	 data.augments.reverse().map(
		function($) {  
		    output += iblock_indent ? ('<img src="../images/default/s.gif" height="1" width="' + 
			    iblock_indent + '"/><img src="../images/default/tree/elbow-end.gif" class="elbow"/>') : '';
		    output += linkSymbol($) + "\n"; 
		    iblock_indent += 20;
		}
	)
	 
	return output +  '<img src="../images/default/s.gif" height="1"  width="' +  iblock_indent +'"/>' +
		'<img class="elbow" src="../images/default/tree/elbow-end.gif"/>'+data.name+

		   '</pre></div>'
       
    },
    
    config : function(dtag)
    {
	   
	var output = '<a name="'+dtag.memberOf+'-cfg-'+dtag.name+'"></a>';
	output += '<div class="fixedFont"><b  class="itemname"> ' + dtag.name + '</b> : ' +
		(dtag.type.length ? this.linkSymbol(dtag.type) : "" ) + '</div>';
		  
	output += '<div class="mdesc"><div class="short">'+this.resolveLinks(this.summarize(dtag.desc))+'</div></div>';
			
	output += '<div class="mdesc"><div class="long">' + this.resolveLinks(dtag.desc)+ ' ' + 
                    (dtag.values ? ("<BR/>Possible Values: " +
				dtag.values.map(function(v) {
				    return v.length ? v : "<B>Empty</B>";
				}).join(", ")) : ''
		    ) + '</div>';
	return output;
    },
    

/*
        method sorting
 	<!-- constructor?? -->
  	{! 
		var ownMethods = [];
	
		if (data.comment.getTag('class').length && 
			!data.isBuiltin() && 
			!data.comment.getTag('singleton').length &&
			!data.comment.getTag('static').length
			) {
			data.isInherited = false;
			ownMethods.push(data);
		}
		
		var msorted = data.methods.sort(makeSortby("name"));
	!}
	<!-- static's first 
	
	
	-->
	{!
		msorted.filter(
				function($){
					
					if (/@hide/.test($.desc)) {
						return false;
					}
					
					if (!$.isEvent && (data.comment.getTag("instanceOf").length || data.comment.getTag("singleton").length)) {
						if ($.isStatic && (data.comment.getTag("instanceOf").length || data.comment.getTag("singleton").length) &&
							($.memberOf != data.alias)) {
								return true;
							}
						$.isInherited = ($.memberOf != data.alias);
						ownMethods.push($);
						return true;
					}
					
					
					if ($.isNamespace || $.isEvent || (($.memberOf != data.alias) && $.isStatic)){
						return true;
					}
					if ($.isStatic) {
						$.isInherited = ($.memberOf != data.alias);
						ownMethods.push($);
					}
					
					return true;
				}
			);
	!}
	<!-- then dynamics first -->
	{!	
		msorted.filter(
				function($){
					if (/@hide/.test($.desc)) {
						return false;
					}
					if (data.comment.getTag("instanceOf").length  || data.comment.getTag("singleton").length) {
						return true;
					}
					if ($.isNamespace || $.isEvent || (($.memberOf != data.alias) && $.isStatic)){
						
						return true;
					}
					if (!$.isStatic) {
						$.isInherited = ($.memberOf != data.alias);
						ownMethods.push($);
					}
					
					return true;
				}
			);
		 
	!}
  */

    
    method : function(member) {
      
        var output = '<a name="' + member.memberOf +'.' + member.name + '"></a>' +
		'<div class="fixedFont"> <span class="attributes">';

        if (member.isConstructor) {
                output += "new <B>" + member.memberOf + (member.memberOf.length ? "." : "") +"</B>";
        } else {
                
	    if (member.isPrivate) output += "&lt;private&gt; ";
	    if (member.isInner) output += "&lt;inner&gt; ";
	    if (member.isStatic || member.singleton.length) { //|| data.comment.getTag("instanceOf").length) {
		    output +=  member.memberOf + ".";	
	    }
        }
        output += '</span><b class="itemname">' + member.name + '</b>';
				
        output += this.makeSignature(member.params);
        if (member.returns.length) {
            output += ': ';
	    for(var i = 0;i< member.returns.length;i++) {
		var item = member.returns[i];
		output += (i > 0 ? ' or ' : '') +
		    this.linkSymbol(item.type);
	    }
        }
			
			
	output += '</div> <div class="mdesc">';
        if (!member.isConstructor) {
            output+= '<div class="short">'+this.resolveLinks(this.summarize(member.desc)) +'</div>';
        } else  {
            //ctor
	    output+= '<div class="short">Create a new '+member.memberOf +'</div>';
        }
	output +='<div class="long">';
        if (!member.isConstructor) {
            output+= this.resolveLinks(member.desc) ;
            if (member.example.length) {
                output +'<pre class="code">'+member.example+'</pre>';
            }
        } else {
            //ctor
            output+= 'Create a new '+member.memberOf;
	    // example and desc.. are normally on the 'top'...
        }
        if (member.params.length) {
        
     
            output+= '<dl class="detailList"> <dt class="heading">Parameters:</dt>';
            for(var  i = 0; i <  member.params.length ; i++) {
                var item = member.params[i];
                    output += '<dt>' +
                       ( item.type.length ?
                            '<span class="fixedFont">' + this.linkSymbol(item.type) + '</span> ' :
                            ""
                        )+  '<b>'+item.name+'</b>';
                    if (item.isOptional) {
                        output+='<i>Optional ';
                        if (item.defaultValue.length) {
                            output+='Default: '+item.defaultValue;
                        }
                        output+='</i>';
                    }
                    output +='</dt><dd>'+this.resolveLinks(item.desc)+'</dd>';
            }
            output+= '</dl>';
        }    
        if (member.deprecated.length) {
            output+= '<dl class="detailList"><dt class="heading">Deprecated:</dt><dt>' +
                        +member.deprecated+'</dt></dl>';
        }
        
        
        if (member.since.length) {
            output+= '<dl class="detailList"><dt class="heading">Since:</dt><dt>' +
                        +member.since+'</dt></dl>';
        }
         /*
                <if test="member.exceptions.length">
                        <dl class="detailList">
                        <dt class="heading">Throws:</dt>
                        <for each="item" in="member.exceptions">
                                <dt>
                                        {+((item.type)?"<span class=\"fixedFont\">{"+(new Link().toSymbol(item.type))+"}</span> " : "")+} <b>{+item.name+}</b>
                                </dt>
                                <dd>{+resolveLinks(item.desc)+}</dd>
                        </for>
                        </dl>
                </if>
                */
        if (member.returns.length) {
            output += '<dl class="detailList"><dt class="heading">Returns:</dt>';
	    for (var i =0; i < member.returns.length; i++) {
		var item = member.returns[i];
		output+= '<dd>' + this.linkSymbol( item.type ) + ' ' + this.resolveLinks(item.desc) + '</dd></dl>';
	    }
                    
        }
        
        /*
                <if test="member.requires.length">
                        <dl class="detailList">
                        <dt class="heading">Requires:</dt>
                        <for each="item" in="member.requires">
                                <dd>{+ resolveLinks(item) +}</dd>
                        </for>
                        </dl>
                </if>
        */
        if (member.see.length) {
            output+= '<dl class="detailList"><dt class="heading">See:</dt><dt>' +
                        '<dd>' + this.linkSymbol( member.see ) +'</dd></dl>';
        }
        output +='</div></div>';
        return output;
    },
    
    
    
    event  : function(member)
    {
     
  
        var output = '<a name="' + member.memberOf +'-event-' + member.name + '"></a>' +
		'<div class="fixedFont"> ';

        
        output += '<b class="itemname">'+member.name+'</b>' +this.makeSignature(member.params) + '</div>';
              
        output += '<div class="mdesc">';
	output += '<div class="short">' +this.resolveLinks(this.summarize(member.desc))+   '</div>';
		   
		    
        output += '<div class="long">' + this.resolveLinks(member.desc);
	
	if (member.example.length) {
	    output +'<pre class="code">'+member.example+'</pre>';
	}
	if (member.params.length) {
        
     
            output+= '<dl class="detailList"> <dt class="heading">Parameters:</dt>';
            for(var  i = 0; i <  member.params.length ; i++) {
                var item = member.params[i];
                    output += '<dt>' +
                       ( item.type.length ?
                            '<span class="fixedFont">' + this.linkSymbol(item.type) + '</span> ' :
                            ""
                        )+  '<b>'+item.name+'</b>';
                    if (item.isOptional) {
                        output+='<i>Optional ';
                        if (item.defaultValue.length) {
                            output+='Default: '+item.defaultValue;
                        }
                        output+='</i>';
                    }
                    output +='</dt><dd>'+this.resolveLinks(item.desc)+'</dd>';
            }
            output+= '</dl>';
        }    		
	  if (member.deprecated.length) {
            output+= '<dl class="detailList"><dt class="heading">Deprecated:</dt><dt>' +
                        +member.deprecated+'</dt></dl>';
        }
        
        
        if (member.since.length) {
            output+= '<dl class="detailList"><dt class="heading">Since:</dt><dt>' +
                        +member.since+'</dt></dl>';
        }
         /*
                <if test="member.exceptions.length">
                        <dl class="detailList">
                        <dt class="heading">Throws:</dt>
                        <for each="item" in="member.exceptions">
                                <dt>
                                        {+((item.type)?"<span class=\"fixedFont\">{"+(new Link().toSymbol(item.type))+"}</span> " : "")+} <b>{+item.name+}</b>
                                </dt>
                                <dd>{+resolveLinks(item.desc)+}</dd>
                        </for>
                        </dl>
                </if>
                */	
	  if (member.returns.length) {
            output += '<dl class="detailList"><dt class="heading">Returns:</dt>';
	    for (var i =0; i < member.returns.length; i++) {
		var item = member.returns[i];
		output+= '<dd>' + this.linkSymbol( item.type ) + ' ' + this.resolveLinks(item.desc) + '</dd></dl>';
	    }
                    
        }
        
        /*
                <if test="member.requires.length">
                        <dl class="detailList">
                        <dt class="heading">Requires:</dt>
                        <for each="item" in="member.requires">
                                <dd>{+ resolveLinks(item) +}</dd>
                        </for>
                        </dl>
                </if>
        */
        if (member.see.length) {
            output+= '<dl class="detailList"><dt class="heading">See:</dt><dt>' +
                        '<dd>' + this.linkSymbol( member.see ) +'</dd></dl>';
        }
        output +='</div></div>';		 
		  
	return output;
    },
    
    
    
    
    
    
    
    
    
    
    makeSignature : function(params)
    {
        
            if (!params.length) return "()";
        var linkSymbol = this.linkSymbol;
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
                        (($.type) ? 
                            linkSymbol(
                                (typeof($.type) == 'object' ) ? 'Function' : $.type
                            ) + " " :  ""
                        )   + 
                        "<B><i>" +$.name + "</i></B>" +
                        ($.defaultValue ? "=" +item.defaultValue : "") +
                        ($.isOptional ? "]" : "");
                    
                     
                }
            ).join(", ")
        +
        ")";
        return signature;
        
    },
    resolveLinks : function(str)
    {
        if (!str || typeof(str) == 'undefined') {
            return '';
        }
        
        // gtk specific. now..
        // @ -> bold.. - they are arguments..
        /*
        str = str.replace(/@([a-z_]+)/gi,
            function(match, symbolName) {
                return '<b>' + symbolName + '</b>';
            }
        );
        // constants.
        str = str.replace(/%([a-z_]+)/gi,
            function(match, symbolName) {
                return '<b>' + symbolName + '</b>';
            }
        );
        
        str = str.replace(/#([a-z_]+)/gi,
            function(match, symbolName) {
                return '<b>' + symbolName + '</b>';
                // this should do a lookup!!!!
                /// it could use data in the signature to find out..
                //return new Link().toSymbol(Template.data.ns + '.' + symbolName);
            }
        );
        */
        str = str.replace(/\n/gi, '<br/>');
        var linkSymbol = this.linkSymbol;
        str = str.replace(/\{@link ([^} ]+) ?\}/gi,
            function(match, symbolName) {
                return linkSymbol(symbolName);
            }
        );
         
        return str;
    },
    summarize : function(desc)
    {
        if (typeof desc != "undefined") {
	    // finds the first fulls stop...
            return desc.match(/([\w\W]+?\.)[^a-z0-9]/i)? RegExp.$1.replace("\n", " ") : desc.split("\n")[0];
        }
        return '';
    },
    linkSymbol : function(str)
    {
        return '<span class=\"fixedFont\"><a href="#' + str + '">' + str + '</a></span>';
    }
}