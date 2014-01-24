/*
 * - LGPL
 *
 * column
 * 
 */

/**
 * @class Roo.bootstrap.Column
 * @extends Roo.bootstrap.Component
 * Bootstrap Column class
 * @cfg {number} colspan  Number of columsn to span
 * 
 * @constructor
 * Create a new Column
 * @param {Object} config The config object
 */

Roo.bootstrap.Table = function(config){
    Roo.bootstrap.Table.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.Table, Roo.bootstrap.Component,  {
    
    getAutoCreate : function(){
	
	cfg = {
	    tag: 'table',
            cn: [
                {
                    tag: 'tbody',
                    cls: 'tb'
                }
            ]
	}
	
        return cfg;
    },
    
    getChildContainer: function(){
        console.log(this.el,this.el.select('tbody',true).first());
        return this.el.select('.tb',true).first();
    }
   
});

 

 