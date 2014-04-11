/*
 * - LGPL
 *
 * DateField
 * 
 */

/**
 * @class Roo.bootstrap.DateField
 * @extends Roo.bootstrap.Input
 * Bootstrap DateField class
 * 
 * @constructor
 * Create a new DateField
 * @param {Object} config The config object
 */

Roo.bootstrap.DateField = function(config){
    Roo.bootstrap.DateField.superclass.constructor.call(this, config);
};

Roo.extend(Roo.bootstrap.DateField, Roo.bootstrap.Input,  {
    
    headTemplate : '<thead>'+
                                '<tr>'+
                                        '<th class="prev">&lsaquo;</th>'+
                                        '<th colspan="5" class="switch"></th>'+
                                        '<th class="next">&rsaquo;</th>'+
                                '</tr>'+
                        '</thead>',
    
    contTemplate : '<tbody><tr><td colspan="7"></td></tr></tbody>',
    
    template : '<div class="datepicker dropdown-menu">'+
                        '<div class="datepicker-days">'+
                                '<table class=" table-condensed">'+
                                        this.headTemplate+
                                        '<tbody></tbody>'+
                                '</table>'+
                        '</div>'+
                        '<div class="datepicker-months">'+
                                '<table class="table-condensed">'+
                                        this.headTemplate+
                                        this.contTemplate+
                                '</table>'+
                        '</div>'+
                        '<div class="datepicker-years">'+
                                '<table class="table-condensed">'+
                                        this.headTemplate+
                                        this.contTemplate+
                                '</table>'+
                        '</div>'+
                '</div>',
//    getAutoCreate : function(){
//        var cfg = {
//            tag: 'div',
//            cls: 'input-append date',
//            cn: [
//                {
//                    tag: 'input',
//                    cls: 'span2 form-control'
//                },
//                {
//                        tag: 'span',
//                        cls: 'add-on',
//                        html: '<i class="icon-th"></i>'
//                    }
//            ]
//            
//        };
//        
//        return cfg;
//    }
    
    onRender: function(ct, position)
    {
        Roo.bootstrap.DateField.superclass.onRender.call(this, ct, position);
        
        this.picker = this.template.appendTo(this.el);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        Roo.log('onFocus !');
    }
   
});

 

 