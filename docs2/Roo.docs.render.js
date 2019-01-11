

Roo.docs.render  = {

/*
        sorting
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
      
          
            <td class="micon"><a class="exi" href="#expand">&nbsp;</a></td>
	   
	   
            <td class="sig">
                <a id="{+member.memberOf+}-method-{+member.name+}"   name=".{+member.name+}"></a>
		<div class="fixedFont">
			<span class="attributes">{!
					if (member.is('CONSTRUCTOR')) {
						output += "new <B>" + member.memberOf + (member.memberOf.length ? "." : "") +"</B>";
					} else {
						
						
						if (member.isPrivate) output += "&lt;private&gt; ";
						if (member.isInner) output += "&lt;inner&gt; ";
						if (member.isStatic || data.comment.getTag("singleton").length || data.comment.getTag("instanceOf").length) {
							output +=  data.alias + ".";	
						}
					}
				!}</span><b class="itemname">{+member.name+}</b>
				
				 {+makeSignature(member.params)+} 
			
				<if test="member.returns.length">
					 : 
					<for each="item" in="member.returns">
						<if test="$item_i > 0"> or </if>
						{+((item.type) ? (new Link().toSymbol(item.type)) : "" )+}
					
					</for>
					
				</if>
			
		</div>
                <div class="mdesc">
		<if test="!member.is('CONSTRUCTOR')">
                   <div class="short">{+resolveLinks(summarize(member.desc))+}</div> 
		 </if>
		 <if test="member.is('CONSTRUCTOR')">
			<div class="short">Create a new {+data.alias +}</div> 
		 </if>
		 
                    <div class="long">
			<if test="!member.is('CONSTRUCTOR')">
				{+resolveLinks(member.desc)+}
		    
				<if test="member.example">
					<pre class="code">{+member.example+}</pre>
				</if>
			</if>
			
			<if test="member.is('CONSTRUCTOR')">
				Create a new {+data.alias +}
			</if>
			<if test="member.params.length">
				<dl class="detailList">
				<dt class="heading">Parameters:</dt>
				<for each="item" in="member.params">
					<dt>
						{+((item.type)?"<span class=\"fixedFont\">"+(new Link().toSymbol(item.type))+"</span> " : "")+} <b>{+item.name+}</b>
						<if test="item.isOptional"><i>Optional
							<if test="item.defaultValue">, 
							Default: {+item.defaultValue+}
						</if></i></if>
					</dt>
					<dd>{+resolveLinks(item.desc)+}</dd>
				</for>
				</dl>
			</if>
			<if test="member.deprecated">
				<dl class="detailList">
				<dt class="heading">Deprecated:</dt>
				<dt>
					{+member.deprecated+}
				</dt>
				</dl>
			</if>
			<if test="member.since.length">
				<dl class="detailList">
				<dt class="heading">Since:</dt>
					<dd>{+ member.since +}</dd>
				</dl>
				</dl>
			</if>
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
			<if test="member.returns.length">
				<dl class="detailList">
				<dt class="heading">Returns:</dt>
				<for each="item" in="member.returns">
					<dd>{+((item.type)?"<span class=\"fixedFont\">"+(new Link().toSymbol(item.type))+"</span> " : "")+} {+resolveLinks(item.desc)+}</dd>
				</for>
				</dl>
			</if>
			<if test="member.requires.length">
				<dl class="detailList">
				<dt class="heading">Requires:</dt>
				<for each="item" in="member.requires">
					<dd>{+ resolveLinks(item) +}</dd>
				</for>
				</dl>
			</if>
			<if test="member.see.length">
				<dl class="detailList">
				<dt class="heading">See:</dt>
				<for each="item" in="member.see">
					<dd>{+ new Link().toSymbol(item) +}</dd>
				</for>
				</dl>
			</if>

		    
		    
		     
                    </div>                    
                </div>

            </td>
            <td class="msource">
		<if test="!member.is('CONSTRUCTOR')">
			{+ (member.memberOf == data.alias) ? member.memberOf :  new Link().toSymbol(member.memberOf) +}
		</if>&nbsp;
            </td>
        </tr>
	</for>
	                                               
    </table>
</if>

}