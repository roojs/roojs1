/*
 * - LGPL
 *
 * row
 * 
 */ 
Roo.bootstrap.Navbar.Button = function(config){
    Roo.bootstrap.Navbar.Button.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Navbar.Button, Roo.bootstrap.Component,  {
    
    href : false,
    html : false,
    
    autoCreate : {
        cls: 'btn',
        tag : 'button',
        html: 'hello'
    },
    
    getAutoCreate : function(){
        
        var cfg = {
            cls: 'btn',
            tag : 'button',
            html: 'hello',
            cn : []
            
        } ;
        cfg.cn.push({
            html : this.html || '',
            //href : this.
             //       )
        });
        cfg.cn.push({
            tag: 'span',
            cls : 'carat'
        });
        
        return cfg;
    }
   
});

 

 