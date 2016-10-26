/*
 * - LGPL
 *
 */

/**
 * @class Roo.doc.Section
 * @extends Roo.bootstrap.Component
 * SectionElement class
 * @cfg {String} stype (desc|parameter|return|note|example) section type.
 * 
 * @constructor
 * Create a new Synopsis
 * @param {Object} config The config object
 */

Roo.doc.Section = function(config){
    Roo.doc.Section.superclass.constructor.call(this, config);
};

Roo.extend(Roo.doc.Section, Roo.bootstrap.Component,  {
    
    
    stype:   '',
     
    getAutoCreate : function(){
        
        
        var syn = Roo.factory(this.parent().items[0]);
        
        var cfg ={
            
            cls : 'refsection',
            // id... ?
            cn : [
                {
                    tag: 'h3',
                    cls : 'title',
                    html : Roo.doc.Section.map[this.stype] 
                }
            ]
        };
        if (this.stype == 'parameter') {
            
            // db package uses variable list here... - it results in dd/dl but the layout is messed up..
            
            var ul = {
                tag: 'ul',
                cls: 'itemizedlist roo-params',
                cn : []
            };
            // might not have any..
            var params = syn.items;
            for (var i =0; i < params.length;i++) {
                ul.cn.push( Roo.factory(params[i]).getAutoCreateParamSection() )
            }
            
            
            cfg.cn.push(ul);
        }
        if (this.stype == 'return' && (syn.returndesc.length || syn.returntype.length )) {
            
            cfg.cn.push({
                tag: 'p',
                cls : 'para',
                cn : [
                
                    {
                        tag: 'code',
                        cls: 'parameter',
                        html : syn.returntype
                    },
                    syn.returndesc
                ]
                
            });
        }
	
        return cfg;
    },
    getChildContainer : function(build_call)
    {
         
        if (this.stype == 'parameter') {
            return this.el.select('.roo-params',true).first();
        }
       
        return this.el;
    }
    
    
   
});

 
Roo.doc.Section.map = {
    'desc' : 'Description',
    'parameter' : 'Parameters',
    'return' : 'Return Value',
    'note' : 'Notes',
    'example' : 'Examples',
    'throws' : 'Throws Exception'
}
