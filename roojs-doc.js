// Roo/doc/Entry.js
Roo.doc=Roo.doc||{};Roo.mailer.Body=function(A){Roo.mailer.Body.superclass.constructor.call(this,A);var B=Roo.get(document.body);B.attr({leftmargin:0,marginwidth:0,topmargin:0,marginheight:0,offset:0});Roo.mailer.Body._calls++;if(Roo.mailer.Body._calls>1){throw "test";
}this.onRender(B);this.onRender=function(){};};Roo.mailer.Body._calls=0;Roo.extend(Roo.mailer.Body,Roo.bootstrap.Component,{name:'',purpose:'',getAutoCreate:function(){var A={cls:'refentry',cn:[{tag:'h1',cls:'refname',html:this.name},{cls:'refnamediv',html:this.purpose}
]};return A;},addxtype:function(A,B){return this.addxtypeChild(A,B);}});
// Roo/doc/Example.js
Roo.mailer.Example=function(A){Roo.mailer.Example.superclass.constructor.call(this,A);};Roo.extend(Roo.mailer.Example,Roo.bootstrap.Component,{lang:'php',code:'',getAutoCreate:function(){var A={cls:this.lang,cn:[{tag:'code',html:String.format('{0}',this.code).replace(/\n/g,'<br/>')}
]};return A;}});
// Roo/doc/Para.js
Roo.mailer.Para=function(A){Roo.mailer.Para.superclass.constructor.call(this,A);};Roo.extend(Roo.mailer.Para,Roo.bootstrap.Component,{html:'',getAutoCreate:function(){var A={tag:'p',cls:'para',html:this.html};if(this.parent().is_list){return {tag:'li',cls:listitme,cn:[A]}
;}return A;}});
// Roo/doc/Param.js
Roo.mailer.Param=function(A){Roo.mailer.Param.superclass.constructor.call(this,A);};Roo.extend(Roo.mailer.Param,Roo.bootstrap.Component,{is_optional:false,type:'',name:'',defaultvalue:'',desc:'',getAutoCreate:function(){if(this.parent().stype=='parameter'){return {tag:'li',cn:[{tag:'p',cls:'para',cn:[{tag:'code',html:this.type+' '+this.name}
,this.desc]}]};}if(this.parent().stype=='return'){return {tag:'p',cls:'para',cn:[{tag:'code',html:this.type},this.desc]};}var A={tag:'span',cn:[is_optional?'[':'',this.type,' ',this.name,this.defaultvalue==''?'':' = ',this.defaultvalue,',']};return A;}});

// Roo/doc/Section.js
Roo.mailer.Section=function(A){Roo.mailer.Section.superclass.constructor.call(this,A);};Roo.extend(Roo.mailer.Section,Roo.bootstrap.Component,{stype:'',getAutoCreate:function(){var A={cls:'refsection',cn:[{tag:'h1',cls:'title',html:this.stype.charAt(0).toUpperCase()+this.stype.slice(1)}
]};if(this.stype=='parameter'){A.cn.push({tag:'ul',cls:'itemizedlist roo-params'});}return A;},getChildContainer:function(A){if(this.stype=='parameter'){return this.el.select('.roo-params',true).first();}return this.el;}});
// Roo/doc/Synopsis.js
Roo.mailer.Synopsis=function(A){Roo.mailer.Synopsis.superclass.constructor.call(this,A);};Roo.extend(Roo.mailer.Synopsis,Roo.bootstrap.Component,{returntype:'',name:'',stype:'function',getAutoCreate:function(){var A={tag:'h2',cls:'refsynopsisdiv',cn:[{cls:'funcsynopsis',cn:[{tag:'p',cn:{tag:'code',cls:'funcprototype',cn:[this.returntype+' ',{tag:'strong',cls:this.stype,html:this.name}
,'(',{tag:'span',cls:'roo-params'}]}}]}]};return A;},getChildContainer:function(A){return this.el.select('.roo-params',true).first();}});
