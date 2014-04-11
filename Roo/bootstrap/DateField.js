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
    
    headTemplate : function()
    {
        var headTemplate = {
            tag: 'thead',
            cn: [
                {
                    tag: 'tr',
                    cn: [
                        {
                            tag: 'th',
                            cls: 'prev',
                            html: '&lsaquo;'
                        },
                        {
                            tag: 'th',
                            cls: 'switch',
                            colspan: '5'
                        },
                        {
                            tag: 'th',
                            cls: 'next',
                            html: '&rsaquo;'
                        }
                        
                    ]
                }
            ]
        }
        
        return headTemplate;
    },
    
    contTemplate : function()
    {
        var contTemplate = {
            tag: 'tbody',
            cn: [
                {
                    tag: 'tr',
                    cn: [
                        {
                            tag: 'td',
                            colspan: '7'
                        }
                    ]
                }
            ]
        }
        
        return contTemplate;
    },
    
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
        
        return template;
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
        
        this.picker = new Roo.bootstrap.Element(this.template()).appendTo(this.el);
    },
    
    onFocus : function()
    {
        Roo.bootstrap.DateField.superclass.onFocus.call(this);
        Roo.log('onFocus !');
    }
   
});

 

 