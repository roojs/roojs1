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
    
//    headTemplate : '<thead>'+
//                                '<tr>'+
//                                        '<th class="prev">&lsaquo;</th>'+
//                                        '<th colspan="5" class="switch"></th>'+
//                                        '<th class="next">&rsaquo;</th>'+
//                                '</tr>'+
//                        '</thead>',
//    
//    contTemplate : '<tbody><tr><td colspan="7"></td></tr></tbody>',
//    
//    template : '<div class="datepicker dropdown-menu">'+
//                        '<div class="datepicker-days">'+
//                                '<table class=" table-condensed">'+
//                                        this.headTemplate+
//                                        '<tbody></tbody>'+
//                                '</table>'+
//                        '</div>'+
//                        '<div class="datepicker-months">'+
//                                '<table class="table-condensed">'+
//                                        this.headTemplate+
//                                        this.contTemplate+
//                                '</table>'+
//                        '</div>'+
//                        '<div class="datepicker-years">'+
//                                '<table class="table-condensed">'+
//                                        this.headTemplate+
//                                        this.contTemplate+
//                                '</table>'+
//                        '</div>'+
//                '</div>',
            
    template : function()
    {
        var template = {
            tag: 'div',
            cls: 'datepicker dropdown-menu',
            cn: [
                {
                    tag: 'div',
                    cls: 'datepicker-days',
                    cn: [
                        {
                            tag: 'table',
                            cls: 'table-condensed',
                            cn:[
                                this.headTemplate(),
                                {
                                    tag: 'tbody'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    cls: 'datepicker-months',
                    cn: [
                        {
                            tag: 'table',
                            cls: 'table-condensed',
                            cn:[
                                this.headTemplate(),
                                this.contTemplate()
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    cls: 'datepicker-years',
                    cn: [
                        {
                            tag: 'table',
                            cls: 'table-condensed',
                            cn:[
                                this.headTemplate(),
                                this.contTemplate()
                            ]
                        }
                    ]
                }
            ]
        }
    },
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
        
        this.picker = new Roo.this.template.appendTo(this.el);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        Roo.log('onFocus !');
    }
   
});

 

 