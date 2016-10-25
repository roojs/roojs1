// Roo/doc/Entry.js
Roo.doc=Roo.doc||{};Roo.doc.Entry=function(A){Roo.doc.Entry.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Entry,Roo.bootstrap.Component,{name:'',purpose:'',getAutoCreate:function(){var A={cls:'refentry',cn:[{tag:'h1',cls:'refname',html:this.name}
,{cls:'refnamediv',html:this.purpose}]};return A;},addxtype:function(A,B){return this.addxtypeChild(A,B);}});
// Roo/doc/Example.js
Roo.doc.Example=function(A){Roo.doc.Example.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Example,Roo.bootstrap.Component,{title:'',lang:'php',code:'',output:'',outputlang:'txt',getAutoCreate:function(){var A=hljs?hljs.highlight(this.lang,this.code).value:String.format('{0}',this.code).replace(/\n/g,'<br/>');
Roo.log("code="+A);var B={cls:'panel panel-info',cn:[{cls:'panel-heading',html:this.title},{cls:'panel-body',cn:[{tag:'pre',cls:'lang-'+this.lang,html:A}]}]};if(this.output){var C=hljs?hljs.highlight(this.outputlang,this.output).value:String.format('{0}',this.output).replace(/\n/g,'<br/>');
B.cn.push({cls:'panel-footer',cn:{tag:'pre',html:C}});}return B;}});
// Roo/doc/Para.js
Roo.doc.Para=function(A){Roo.doc.Para.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Para,Roo.bootstrap.Component,{html:'',getAutoCreate:function(){var A={tag:'p',cls:'para',html:Roo.Markdown.toHtml(this.html)};if(this.parent().is_list){return {tag:'li',cls:listitme,cn:[A]}
;}return A;}});
// Roo/doc/Param.js
Roo.doc.Param=function(A){Roo.doc.Param.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Param,Roo.bootstrap.Component,{is_optional:false,type:'',name:'',defaultvalue:'',desc:'',getAutoCreate:function(){var A=Roo.Markdown.toHtml(this.desc);if(this.parent().stype=='parameter'){return {tag:'li',cn:[{tag:'p',cls:'para',cn:[{tag:'code',html:this.type+' '+this.name}
,A]}]};}if(this.parent().stype=='return'){return {tag:'p',cls:'para',cn:[{tag:'code',html:this.type},A]};}var B={tag:'span',cn:[this.is_optional?'[':'',this.type,' ',{tag:'b',html:this.name},this.defaultvalue==''?'':' = ',this.defaultvalue,this.is_optional?']':'',',']}
;return B;},getAutoCreateParamSection:function(){var A=Roo.Markdown.toHtml(this.desc);return {tag:'li',cn:[{tag:'p',cls:'para',cn:[{tag:'code',html:this.type+' '+this.name},A]}]};}});
// Roo/doc/Section.js
Roo.doc.Section=function(A){Roo.doc.Section.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Section,Roo.bootstrap.Component,{stype:'',getAutoCreate:function(){var A=Roo.factory(this.parent().items[0]);var B={cls:'refsection',cn:[{tag:'h3',cls:'title',html:Roo.doc.Section.map[this.stype]}
]};if(this.stype=='parameter'){var ul={tag:'ul',cls:'itemizedlist roo-params',cn:[]};var C=A.items;for(var i=0;i<C.length;i++){ul.cn.push(Roo.factory(C[i]).getAutoCreateParamSection())}B.cn.push(ul);}if(this.stype=='return'&&A.returndesc.length){B.cn.push({tag:'p',cls:'para',cn:[{tag:'code',cls:'parameter',html:A.returntype}
,A.returndesc]});}return B;},getChildContainer:function(A){if(this.stype=='parameter'){return this.el.select('.roo-params',true).first();}return this.el;}});Roo.doc.Section.map={'desc':'Description','parameter':'Parameters','return':'Return Value','note':'Notes','example':'Examples','throws':'Throws Exception'};

// Roo/doc/Synopsis.js
Roo.doc.Synopsis=function(A){Roo.doc.Synopsis.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Synopsis,Roo.bootstrap.Component,{memberof:'',is_static:false,returntype:'',returndesc:'',name:'',stype:'function',is_constructor:false,getAutoCreate:function(){var A=this.items[0];
var B=(this.is_static?'':'$')+this.memberof+(this.is_static?'::':'->');var nm=this.name;if(this.is_constructor){nm=this.memberof;B='new ';}var C={tag:'h5',cls:'refsynopsisdiv',cn:[{cls:'funcsynopsis',cn:[{tag:'p',cn:{tag:'code',cls:'funcprototype',cn:[this.returntype+' '+B,{tag:'strong',cls:this.stype,html:nm}
,'(',{tag:'span',cls:'roo-params'},')']}}]}]};return C;},getChildContainer:function(A){return this.el.select('.roo-params',true).first();}});
// Roo/doc/NavCategory.js
Roo.doc.NavCategory=function(A){Roo.doc.Para.superclass.constructor.call(this,A);Roo.doc.NavCategory.registry[this.name]=this;};Roo.doc.NavCategory.registry={};Roo.extend(Roo.doc.NavCategory,Roo.bootstrap.Component,{title:'',name:'',getAutoCreate:function(){var A={cn:[{tag:'a',cls:'roo-nav-category',href:'#'+this.name,html:this.title}
,{cls:'container roo-child-ctr'}]};return A;},getChildContainer:function(){return this.el.select('.roo-child-ctr',true).first();}});
