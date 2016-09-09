// Roo/doc/Entry.js
Roo.doc=Roo.doc||{};Roo.doc.Entry=function(A){Roo.doc.Entry.superclass.constructor.call(this,A);var B=Roo.get(document.body);B.attr({leftmargin:0,marginwidth:0,topmargin:0,marginheight:0,offset:0});this.onRender(B);this.el=B;};Roo.doc.Entry._calls=0;Roo.extend(Roo.doc.Entry,Roo.bootstrap.Component,{name:'',purpose:'',getAutoCreate:function(){var A={cls:'refentry',cn:[{tag:'h1',cls:'refname',html:this.name}
,{cls:'refnamediv',html:this.purpose}]};return A;},addxtype:function(A,B){return this.addxtypeChild(A,B);},onRender:function(ct,A){Roo.doc.Entry._calls++;if(Roo.doc.Entry._calls>1||!ct){return;}Roo.bootstrap.Component.prototype.onRender.call(this,ct,A);}}
);
// Roo/doc/Example.js
Roo.doc.Example=function(A){Roo.doc.Example.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Example,Roo.bootstrap.Component,{lang:'php',code:'',getAutoCreate:function(){var A={cls:this.lang,cn:[{tag:'code',html:String.format('{0}',this.code).replace(/\n/g,'<br/>')}
]};return A;}});
// Roo/doc/Para.js
Roo.doc.Para=function(A){Roo.doc.Para.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Para,Roo.bootstrap.Component,{html:'',getAutoCreate:function(){var A={tag:'p',cls:'para',html:this.html};if(this.parent().is_list){return {tag:'li',cls:listitme,cn:[A]}
;}return A;}});
// Roo/doc/Param.js
Roo.doc.Param=function(A){Roo.doc.Param.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Param,Roo.bootstrap.Component,{is_optional:false,type:'',name:'',defaultvalue:'',desc:'',getAutoCreate:function(){if(this.parent().stype=='parameter'){return {tag:'li',cn:[{tag:'p',cls:'para',cn:[{tag:'code',html:this.type+' '+this.name}
,this.desc]}]};}if(this.parent().stype=='return'){return {tag:'p',cls:'para',cn:[{tag:'code',html:this.type},this.desc]};}var A={tag:'span',cn:[this.is_optional?'[':'',this.type,' ',{tag:'b',html:this.name},this.defaultvalue==''?'':' = ',this.defaultvalue,this.is_optional?']':'',',']}
;return A;},getAutoCreateParamSection:function(){return {tag:'li',cn:[{tag:'p',cls:'para',cn:[{tag:'code',html:this.type+' '+this.name},this.desc]}]};}});
// Roo/doc/Section.js
Roo.doc.Section=function(A){Roo.doc.Section.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Section,Roo.bootstrap.Component,{stype:'',getAutoCreate:function(){var A={cls:'refsection',cn:[{tag:'h1',cls:'title',html:Roo.doc.Section.map[this.stype]}]}
;if(this.stype=='parameter'){var ul={tag:'ul',cls:'itemizedlist roo-params',cn:[]};var B=this.parent().items[0].items;for(var i=0;i<B.length;i++){ul.cn.push(Roo.factory(B[i]).getAutoCreateParamSection())}A.cn.push(ul);}return A;},getChildContainer:function(A){if(this.stype=='parameter'){return this.el.select('.roo-params',true).first();
}return this.el;}});Roo.doc.Section.map={'desc':'Description','parameter':'Parameters','return':'Return Value','note':'Notes','example':'Examples'};
// Roo/doc/Synopsis.js
Roo.doc.Synopsis=function(A){Roo.doc.Synopsis.superclass.constructor.call(this,A);};Roo.extend(Roo.doc.Synopsis,Roo.bootstrap.Component,{returntype:'',name:'',stype:'function',getAutoCreate:function(){var A={tag:'h5',cls:'refsynopsisdiv',cn:[{cls:'funcsynopsis',cn:[{tag:'p',cn:{tag:'code',cls:'funcprototype',cn:[this.returntype+' ',{tag:'strong',cls:this.stype,html:this.name}
,'(',{tag:'span',cls:'roo-params'},')']}}]}]};return A;},getChildContainer:function(A){return this.el.select('.roo-params',true).first();}});
