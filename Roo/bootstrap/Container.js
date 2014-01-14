/*
 * - LGPL
 *
 * page contgainer.
 * 
 */ 
Roo.bootstrap.Container = function(config){
    Roo.bootstrap.Container.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Container, Roo.bootstrap.Component,  {
     
    jumbotron : false, // doc me
	autoCreate : {
        cls: 'container',
        html : null
    },
    getAutoCreate : function(){
        
        var cfg = Roo.apply({}, Roo.bootstrap.Container.superclass.getAutoCreate.call(this));
        if (this.jumbotron) {
            cfg.cls = 'jumbotron';
        }
        
        cfg.html = this.html || cfg.html;
        return cfg;
    }
   
});

 