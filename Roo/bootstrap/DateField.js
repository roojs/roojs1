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
    
    var DPGlobal = {
//		modes: [
//			{
//				clsName: 'days',
//				navFnc: 'Month',
//				navStep: 1
//			},
//			{
//				clsName: 'months',
//				navFnc: 'FullYear',
//				navStep: 1
//			},
//			{
//				clsName: 'years',
//				navFnc: 'FullYear',
//				navStep: 10
//		}],
//		dates:{
//			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
//			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
//			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//		},
//		isLeapYear: function (year) {
//			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
//		},
//		getDaysInMonth: function (year, month) {
//			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
//		},
//		parseFormat: function(format){
//			var separator = format.match(/[.\/\-\s].*?/),
//				parts = format.split(/\W+/);
//			if (!separator || !parts || parts.length === 0){
//				throw new Error("Invalid date format.");
//			}
//			return {separator: separator, parts: parts};
//		},
//		parseDate: function(date, format) {
//			var parts = date.split(format.separator),
//				date = new Date(),
//				val;
//			date.setHours(0);
//			date.setMinutes(0);
//			date.setSeconds(0);
//			date.setMilliseconds(0);
//			if (parts.length === format.parts.length) {
//				var year = date.getFullYear(), day = date.getDate(), month = date.getMonth();
//				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
//					val = parseInt(parts[i], 10)||1;
//					switch(format.parts[i]) {
//						case 'dd':
//						case 'd':
//							day = val;
//							date.setDate(val);
//							break;
//						case 'mm':
//						case 'm':
//							month = val - 1;
//							date.setMonth(val - 1);
//							break;
//						case 'yy':
//							year = 2000 + val;
//							date.setFullYear(2000 + val);
//							break;
//						case 'yyyy':
//							year = val;
//							date.setFullYear(val);
//							break;
//					}
//				}
//				date = new Date(year, month, day, 0 ,0 ,0);
//			}
//			return date;
//		},
//		formatDate: function(date, format){
//			var val = {
//				d: date.getDate(),
//				m: date.getMonth() + 1,
//				yy: date.getFullYear().toString().substring(2),
//				yyyy: date.getFullYear()
//			};
//			val.dd = (val.d < 10 ? '0' : '') + val.d;
//			val.mm = (val.m < 10 ? '0' : '') + val.m;
//			var date = [];
//			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
//				date.push(val[format.parts[i]]);
//			}
//			return date.join(format.separator);
//		},
		headTemplate: '<thead>'+
                                    '<tr>'+
                                            '<th class="prev">&lsaquo;</th>'+
                                            '<th colspan="5" class="switch"></th>'+
                                            '<th class="next">&rsaquo;</th>'+
                                    '</tr>'+
                            '</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
    
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
    
    onFocus : function()
    {
        Roo.bootstrap.TriggerField.superclass.onFocus.call(this);
        Roo.log('onFocus !');
    }
   
});

 

 