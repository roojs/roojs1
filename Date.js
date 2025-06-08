/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */

/**
 * @class Date
 *
 * The date parsing and format syntax is a subset of
 * <a href="http://www.php.net/date">PHP's date() function</a>, and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * Following is the list of all currently supported formats:
 *<pre>
Sample date:
'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'

Format  Output      Description
------  ----------  --------------------------------------------------------------
  d      10         Day of the month, 2 digits with leading zeros
  D      Wed        A textual representation of a day, three letters
  j      10         Day of the month without leading zeros
  l      Wednesday  A full textual representation of the day of the week
  S      th         English ordinal day of month suffix, 2 chars (use with j)
  w      3          Numeric representation of the day of the week
  z      9          The julian date, or day of the year (0-365)
  W      01         ISO-8601 2-digit week number of year, weeks starting on Monday (00-52)
  F      January    A full textual representation of the month
  m      01         Numeric representation of a month, with leading zeros
  M      Jan        Month name abbreviation, three letters
  n      1          Numeric representation of a month, without leading zeros
  t      31         Number of days in the given month
  L      0          Whether it's a leap year (1 if it is a leap year, else 0)
  Y      2007       A full numeric representation of a year, 4 digits
  y      07         A two digit representation of a year
  a      pm         Lowercase Ante meridiem and Post meridiem
  A      PM         Uppercase Ante meridiem and Post meridiem
  g      3          12-hour format of an hour without leading zeros
  G      15         24-hour format of an hour without leading zeros
  h      03         12-hour format of an hour with leading zeros
  H      15         24-hour format of an hour with leading zeros
  i      05         Minutes with leading zeros
  s      01         Seconds, with leading zeros
  O      -0600      Difference to Greenwich time (GMT) in hours (Allows +08, without minutes)
  P      -06:00     Difference to Greenwich time (GMT) with colon between hours and minutes
  T      CST        Timezone setting of the machine running the code
  Z      -21600     Timezone offset in seconds (negative if west of UTC, positive if east)
</pre>
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 * <pre><code>
var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
document.write(dt.format('Y-m-d'));                         //2007-01-10
document.write(dt.format('F j, Y, g:i a'));                 //January 10, 2007, 3:05 pm
document.write(dt.format('l, \\t\\he dS of F Y h:i:s A'));  //Wednesday, the 10th of January 2007 03:05:01 PM
 </code></pre>
 *
 * Here are some standard date/time patterns that you might find helpful.  They
 * are not part of the source of Date.js, but to use them you can simply copy this
 * block of code into any script that is included after Date.js and they will also become
 * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
 * <pre><code>
Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};
</code></pre>
 *
 * Example usage:
 * <pre><code>
var dt = new Date();
document.write(dt.format(Date.patterns.ShortDate));
 </code></pre>
 */

/*
 * Most of the date-formatting functions below are the excellent work of Baron Schwartz.
 * They generate precompiled functions from date formats instead of parsing and
 * processing the pattern every time you format a date.  These functions are available
 * on every Date object (any javascript function).
 *
 * The original article and download are here:
 * http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
 *
 */
 
 
 // was in core
/**
 Returns the number of milliseconds between this date and date
 @param {Date} date (optional) Defaults to now
 @param {String} interval (optional) Default Date.MILLI, A valid date interval enum value (eg. Date.DAY) 
 @return {Number} The diff in milliseconds or units of interval
 @member Date getElapsed
 */
Date.prototype.getElapsed = function(date, interval)
{
    date = date ||  new Date();
    var ret = Math.abs(date.getTime()-this.getTime());
    switch (interval) {
       
        case  Date.SECOND:
            return Math.floor(ret / (1000));
        case  Date.MINUTE:
            return Math.floor(ret / (1000*60));
        case  Date.HOUR:
            return Math.floor(ret / (1000*60*60));
        case  Date.DAY:
            return Math.floor(ret / (1000*60*60*24));
        case  Date.MONTH: // this does not give exact number...??
            return ((date.format("Y") - this.format("Y")) * 12) + (date.format("m") - this.format("m"));
        case  Date.YEAR: // this does not give exact number...??
            return (date.format("Y") - this.format("Y"));
       
        case  Date.MILLI:
        default:
            return ret;
    }
};
 
// was in date file..


// private
Date.parseFunctions = {count:0};
// private
Date.parseRegexes = [];
// private
Date.formatFunctions = {count:0};

// private
Date.formatParsed = {}
Date.prototype.dateFormat = function(format) {
    if (typeof(Date.formatParsed[format])  == 'undefined') {
        
          //  var funcName = "format" + Date.formatFunctions.count++;
          //Date.formatFunctions[format] = funcName;
          //var code = "Date.prototype." + funcName + " = function(){return ";
          // generate an array.. 
          var code = [];
          var special = false;
          var ch = '';
          for (var i = 0; i < format.length; ++i) {
              ch = format.charAt(i);
              if (!special && ch == "\\") {
                  special = true;
              }
              else if (special) {
                  special = false;
                  code.push([String.escape(ch)]);
              }
              else {
                  code.push(ch);
              }
          }
          Date.formatParsed[format] = code;
    }
    var ret = '';
    var ar =  Date.formatParsed[format];
    for(var i =0; i <ar.length; i++) {
        var c = ar[i];
    
      if (typeof(c) != 'string') {
        ret += c[0];
        continue;
      }
      ret += this.formatCodeToValue(c);
    }
    return ret;
 
};
Date.prototype.formatCodeToValue = function(character) {
    switch (character) {
    case "d":
        return String.leftPad(this.getDate(), 2, '0');
    case "D":
        return Date.dayNames[this.getDay()].substring(0, 3);
    case "j":
        return this.getDate();
    case "l":
        return Date.dayNames[this.getDay()];
    case "S":
        return this.getSuffix();
    case "w":
        return this.getDay();
    case "z":
        return this.getDayOfYear();
    case "W":
        return this.getWeekOfYear();
    case "F":
        return Date.monthNames[this.getMonth()];
    case "m":
        return String.leftPad(this.getMonth() + 1, 2, '0');
    case "M":
        return Date.monthNames[this.getMonth()].substring(0, 3);
    case "n":
        return (this.getMonth() + 1);
    case "t":
        return this.getDaysInMonth();
    case "L":
        return (this.isLeapYear() ? 1 : 0);
    case "Y":
        return this.getFullYear();
    case "y":
        return (this.getFullYear()+ "").substring(2, 4) ;
    case "a":
        return (this.getHours() < 12 ? 'am' : 'pm') ;
    case "A":
        return (this.getHours() < 12 ? 'AM' : 'PM') ;
    case "g":
        return ((this.getHours() % 12) ? this.getHours() % 12 : 12);
    case "G":
        return this.getHours();
    case "h":
        return String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0');
    case "H":
        return String.leftPad(this.getHours(), 2, '0');
    case "i":
        return String.leftPad(this.getMinutes(), 2, '0');
    case "s":
        return String.leftPad(this.getSeconds(), 2, '0');
    case "O":
        return this.getGMTOffset();
    case "P":
    	return this.getGMTColonOffset();
    case "T":
        return this.getTimezone();
    case "Z":
        return (this.getTimezoneOffset() * -60);
    default:
        return String.escape(character);
    }
};

/**
 * Formats a date given the supplied format string
 * @param {String} format The format string
 * @return {String} The formatted date
 * @method
 */
Date.prototype.format = Date.prototype.dateFormat;

// private
 



/**
 * Parses the passed string using the specified format. Note that this function expects dates in normal calendar
 * format, meaning that months are 1-based (1 = January) and not zero-based like in JavaScript dates.  Any part of
 * the date format that is not specified will default to the current date value for that part.  Time parts can also
 * be specified, but default to 0.  Keep in mind that the input date string must precisely match the specified format
 * string or the parse operation will fail.
 * Example Usage:
<pre><code>
//dt = Fri May 25 2007 (current date)
var dt = new Date();

//dt = Thu May 25 2006 (today's month/day in 2006)
dt = Date.parseDate("2006", "Y");

//dt = Sun Jan 15 2006 (all date parts specified)
dt = Date.parseDate("2006-1-15", "Y-m-d");

//dt = Sun Jan 15 2006 15:20:01 GMT-0600 (CST)
dt = Date.parseDate("2006-1-15 3:20:01 PM", "Y-m-d h:i:s A" );
</code></pre>
 * @param {String} input The unparsed date as a string
 * @param {String} format The format the date is in
 * @return {Date} The parsed date
 * @static
 */
 

Date.parseDate = function(input, format) {
    
    var out = {
		y : -1,
		m : -1,
		d : -1,
		h : -1,
		i : -1,
		s : -1,
		o : false,
		z : false
		
	};
	var v;
    var d = new Date();
    out.y = d.getFullYear();
    out.m = d.getMonth();
    out.d = d.getDate();
    if (typeof(input) !== 'string') {
		input = input.toString();
	}
    if (typeof(Date.parseFuncData[format]) == 'undefined') {
			
		
		var regex = "";
		var funcs = [];
		 
		var special = false;
		var ch = '';
		for (var i = 0; i < format.length; ++i) {
			ch = format.charAt(i);
			if (!special && ch == "\\") {
				special = true;
			}
			else if (special) {
				special = false;
				regex += String.escape(ch);
 			}
			else {
        
				var obj = Date.formatCodeToRegex(ch, 0);
  
				regex += obj.s;
				if (obj.f !== false) {
					funcs.push(obj.f);
				}
			}
		}
		Date.parseFuncData[format] = {
			f : funcs ,
			re : new RegExp("^" + regex + "$")
		};
  }
	
	if (!input.match(Date.parseFuncData[format].re)) {
		return null;
	}
	
	input.replace(Date.parseFuncData[format].re, function(   ) {
			
	   var results = arguments;
	   Date.parseFuncData[format].f.forEach(function(v, i) {
		   
		   v(results[i+1], out);
   
	   });

	});
	
	

    if (out.y >= 0 && out.m >= 0 && out.d > 0 && out.h >= 0 && out.i >= 0 && out.s >= 0) {
		v = new Date(out.y, out.m, out.d, out.h, out.i, out.s);
		v.setFullYear(out.y);
	} else if (out.y >= 0 && out.m >= 0 && out.d > 0 && out.h >= 0 && out.i >= 0)  {
		v = new Date(out.y, out.m, out.d, out.h, out.i);
		v.setFullYear(out.y);
	} else if (out.y >= 0 && out.m >= 0 && out.d > 0 && out.h >= 0) {
		v = new Date(out.y, out.m, out.d, out.h);
		v.setFullYear(out.y);
	}else if (out.y >= 0 && out.m >= 0 && out.d > 0) {
		v = new Date(out.y, out.m, out.d);
		v.setFullYear(out.y);
	} else if (out.y >= 0 && out.m >= 0) {
		v = new Date(out.y, out.m);
		v.setFullYear(out.y);
	} else if (out.y >= 0) {
		v = new Date(out.y);
		v.setFullYear(out.y);
	}
	
	if (!v || (out.z === false && out.o === false)) {
	  return v;
	}
	if (out.z !== false) {
		return v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + (out.z*1));
	}
	// out.o
	return v.add(Date.HOUR, (v.getGMTOffset() / 100) + (out.o / -100))  ; // reset to GMT, then add offset

 
};
Date.parseFuncData = {};

Date.formatCodeToRegex = function(character) {
    switch (character) {
    case "D":
        return {
	    f : function(result, out) {},
        s:"(Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};
    case "j":
        return {
          f : function(result, out) {
            out.d = parseInt(result, 10);
          },
          s:"(\\d{1,2})"}; // day of month without leading zeroes,
    case "d":
        return {
			f : function(result, out) {
				out.d = parseInt(result, 10);
			},
            s:"(\\d{2})"}; // day of month with leading zeroes
    case "l":
        return {
			f : function(result, out) {},
            s:"(" + Date.dayNames.join("|") + ")"};
    case "S":
        return {
			f : function(result, out) {},
            s:"(st|nd|rd|th)"};
    case "w":
        return {
			f : false,             
            s:"\\d"};
    case "z":
        return { 
			f : function(result, out) {},
            s:"(\\d{1,3})"};
    case "W":
        return {
			f : function(result, out) {},
            s:"(\\d{2})"};
    case "F":
        return {
			f : function(result, out) {
				out.m = parseInt(Date.monthNumbers[result].substring(0, 3), 10);
			},
            s:"(" + Date.monthNames.join("|") + ")"};
    case "M":
        return {
            f : function(result, out) {
				out.m = parseInt(Date.monthNumbers[result], 10);
			},
            s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};
    case "n":
        return {
			f : function(result, out) {
				out.m = parseInt(Date.monthNumbers[result], 10);
			},
            s:"(\\d{1,2})"}; // Numeric representation of a month, without leading zeros
    case "m":
        return {
			f : function(result, out) {
				out.m = Math.max(0,parseInt(result, 10) - 1);
			},
            s:"(\\d{2})"}; // Numeric representation of a month, with leading zeros
    case "t":
        return {
			f : false,
            s:"\\d{1,2}"};
    case "L":
        return {
			f : function(result, out) {},
            s:"(1|0)"};
    case "Y":
        return {
			f : function(result, out) {
				out.y =  parseInt(result, 10);
			},
            s:"(\\d{4})"};
    case "y":
        return {
			f : function(result, out) {
				var ty = parseInt(result, 10);
                out.y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;
			},
            s:"(\\d{1,2})"};
    case "a":
        return {
			f : function(result, out) {
				if (result == 'am') {
					if (out.h == 12) { h = 0; }
                } else {
					if (out.h < 12) { out.h += 12; }
				}
			},	
            s:"(am|pm)"};
    case "A":
        return {
			f : function(result, out) {
				if (result == 'AM') {
					if (out.h == 12) { h = 0; }
                } else {
					if (out.h < 12) { out.h += 12; }
				}
			},	
            s:"(AM|PM)"};
    case "g":
    case "G":
        return {
			f : function(result, out) {
				out.h = parseInt(result,10);
			},	
			s:"(\\d{1,2})"}; // 12/24-hr format  format of an hour without leading zeroes
    case "h":
    case "H":
        return {
			f : function(result, out) {
				out.h = parseInt(result,10);
			},
            s:"(\\d{2})"}; //  12/24-hr format  format of an hour with leading zeroes
    case "i":
        return {
			f : function(result, out) {
				out.i = parseInt(result,10);
			},	
            s:"(\\d{2})"};
    case "s":
        return {
			f : function(result, out) {
				out.s = parseInt(result,10);
			},	
            s:"(\\d{2})"};
    case "O": 
        return {
			f : function(result, out) {
				out.o = result;
                var sn = out.o.substring(0,1);
                var hr = out.o.substring(1,3)*1 + Math.floor(out.o.substring(3,5) / 60); // get hours (performs minutes-to-hour conversion also)
                var mn = out.o.substring(3,5) % 60; // get minutes
                out.o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? // -12hrs <= GMT offset <= 14hrs
                    (sn + String.leftPad(hr, 2, 0) + String.leftPad(mn, 2, 0)) : null;
			},	
			
            s:"([+\-]\\d{2,4})"
		};
    
    
    case "P":   //xx:yy
    	return {
			f : function(result, out) { 
				out.o = result;
				var sn = out.o.substring(0,1);
				var hr = out.o.substring(1,3)*1 + Math.floor(out.o.substring(4,6) / 60);
				var mn = out.o.substring(4,6) % 60;
       
				out.o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))?
    	                (sn + String.leftPad(hr, 2, 0) + String.leftPad(mn, 2, 0)) : null;
			},
            s:"([+\-]\\d{2}:\\d{2})"
		};
    
	case "T": // note it's just ignored..
        return {
			f : function(result, out) {},
            s:"([A-Z]{1,4})"}; // timezone abbrev. may be between 1 - 4 chars
    case "Z":
        return {
			f : function(result, out) {
				out.z = result; // -43200 <= UTC offset <= 50400
                out.z = (-43200 <= out.z*1 && out.z*1 <= 50400)? out.z : null;
			},
            s:"([+\-]?\\d{1,5})"
		}; // leading '+' sign is optional for UTC offset
    default:
        return {
			f : false,
            s: String.escape(character)
		};
    }
};
/**
 * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
 * @return {String} The abbreviated timezone name (e.g. 'CST')
 */
Date.prototype.getTimezone = function() {
    return this.toString().replace(/^.*? ([A-Z]{1,4})[\-+][0-9]{4} .*$/, "$1");
};

/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
 * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600')
 */
Date.prototype.getGMTOffset = function() {
    return (this.getTimezoneOffset() > 0 ? "-" : "+")
        + String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset() / 60)), 2, "0")
        + String.leftPad(this.getTimezoneOffset() % 60, 2, "0");
};

/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'P').
 * @return {String} 2-characters representing hours and 2-characters representing minutes
 * seperated by a colon and prefixed with + or - (e.g. '-06:00')
 */
Date.prototype.getGMTColonOffset = function() {
	return (this.getTimezoneOffset() > 0 ? "-" : "+")
		+ String.leftPad(Math.abs(Math.floor(this.getTimezoneOffset() / 60)), 2, "0")
		+ ":"
		+ String.leftPad(this.getTimezoneOffset() %60, 2, "0");
}

/**
 * Get the numeric day number of the year, adjusted for leap year.
 * @return {Number} 0 through 364 (365 in leap years)
 */
Date.prototype.getDayOfYear = function() {
    var num = 0;
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    for (var i = 0; i < this.getMonth(); ++i) {
        num += Date.daysInMonth[i];
    }
    return num + this.getDate() - 1;
};

/**
 * Get the string representation of the numeric week number of the year
 * (equivalent to the format specifier 'W').
 * @return {String} '00' through '52'
 */
Date.prototype.getWeekOfYear = function() {
    // Skip to Thursday of this week
    var now = this.getDayOfYear() + (4 - this.getDay());
    // Find the first Thursday of the year
    var jan1 = new Date(this.getFullYear(), 0, 1);
    var then = (7 - jan1.getDay() + 4);
    return String.leftPad(((now - then) / 7) + 1, 2, "0");
};

/**
 * Whether or not the current date is in a leap year.
 * @return {Boolean} True if the current date is in a leap year, else false
 */
Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
};

/**
 * Get the first day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 * Example:
 *<pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getFirstDayOfMonth()]); //output: 'Monday'
</code></pre>
 * @return {Number} The day number (0-6)
 */
Date.prototype.getFirstDayOfMonth = function() {
    var day = (this.getDay() - (this.getDate() - 1)) % 7;
    return (day < 0) ? (day + 7) : day;
};

/**
 * Get the last day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 * Example:
 *<pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getLastDayOfMonth()]); //output: 'Wednesday'
</code></pre>
 * @return {Number} The day number (0-6)
 */
Date.prototype.getLastDayOfMonth = function() {
    var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
    return (day < 0) ? (day + 7) : day;
};


/**
 * Get the first date of this date's month
 * @return {Date}
 */
Date.prototype.getFirstDateOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), 1);
};

/**
 * Get the last date of this date's month
 * @return {Date}
 */
Date.prototype.getLastDateOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
};
/**
 * Get the number of days in the current month, adjusted for leap year.
 * @return {Number} The number of days in the month
 */
Date.prototype.getDaysInMonth = function() {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return Date.daysInMonth[this.getMonth()];
};

/**
 * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
 * @return {String} 'st, 'nd', 'rd' or 'th'
 */
Date.prototype.getSuffix = function() {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
};

// private
Date.daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

/**
 * An array of textual month names.
 * Override these values for international dates, for example...
 * Date.monthNames = ['JanInYourLang', 'FebInYourLang', ...];
 * @type Array
 * @static
 */
Date.monthNames =
   ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

/**
 * An array of textual day names.
 * Override these values for international dates, for example...
 * Date.dayNames = ['SundayInYourLang', 'MondayInYourLang', ...];
 * @type Array
 * @static
 */
Date.dayNames =
   ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];

// private
Date.y2kYear = 50;
// private
Date.monthNumbers = {
    Jan:0,
    Feb:1,
    Mar:2,
    Apr:3,
    May:4,
    Jun:5,
    Jul:6,
    Aug:7,
    Sep:8,
    Oct:9,
    Nov:10,
    Dec:11};

/**
 * Creates and returns a new Date instance with the exact same date value as the called instance.
 * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
 * variable will also be changed.  When the intention is to create a new variable that will not
 * modify the original instance, you should create a clone.
 *
 * Example of correctly cloning a date:
 * <pre><code>
//wrong way:
var orig = new Date('10/1/2006');
var copy = orig;
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 05 2006'!

//correct way:
var orig = new Date('10/1/2006');
var copy = orig.clone();
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 01 2006'
</code></pre>
 * @return {Date} The new Date instance
 */
Date.prototype.clone = function() {
	return new Date(this.getTime());
};

/**
 * Clears any time information from this date
 @param {Boolean} clone true to create a clone of this date, clear the time and return it
 @return {Date} this or the clone
 */
Date.prototype.clearTime = function(clone){
    if(clone){
        return this.clone().clearTime();
    }
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};

// private
// safari setMonth is broken -- check that this is only donw once...
if(Roo.isSafari && typeof(Date.brokenSetMonth) == 'undefined'){
    Date.brokenSetMonth = Date.prototype.setMonth;
	Date.prototype.setMonth = function(num){
		if(num <= -1){
			var n = Math.ceil(-num);
			var back_year = Math.ceil(n/12);
			var month = (n % 12) ? 12 - n % 12 : 0 ;
			this.setFullYear(this.getFullYear() - back_year);
			return Date.brokenSetMonth.call(this, month);
		} else {
			return Date.brokenSetMonth.apply(this, arguments);
		}
	};
}

/** Date interval constant 
* @static 
* @type String */
Date.MILLI = "ms";
/** Date interval constant 
* @static 
* @type String */
Date.SECOND = "s";
/** Date interval constant 
* @static 
* @type String */
Date.MINUTE = "mi";
/** Date interval constant 
* @static 
* @type String */
Date.HOUR = "h";
/** Date interval constant 
* @static 
* @type String */
Date.DAY = "d";
/** Date interval constant 
* @static 
* @type String */
Date.MONTH = "mo";
/** Date interval constant 
* @static 
* @type String */
Date.YEAR = "y";

/**
 * Provides a convenient method of performing basic date arithmetic.  This method
 * does not modify the Date instance being called - it creates and returns
 * a new Date instance containing the resulting date value.
 *
 * Examples:
 * <pre><code>
//Basic usage:
var dt = new Date('10/29/2006').add(Date.DAY, 5);
document.write(dt); //returns 'Fri Oct 06 2006 00:00:00'

//Negative values will subtract correctly:
var dt2 = new Date('10/1/2006').add(Date.DAY, -5);
document.write(dt2); //returns 'Tue Sep 26 2006 00:00:00'

//You can even chain several calls together in one line!
var dt3 = new Date('10/1/2006').add(Date.DAY, 5).add(Date.HOUR, 8).add(Date.MINUTE, -30);
document.write(dt3); //returns 'Fri Oct 06 2006 07:30:00'
 </code></pre>
 *
 * @param {String} interval   A valid date interval enum value
 * @param {Number} value      The amount to add to the current date
 * @return {Date} The new Date instance
 */
Date.prototype.add = function(interval, value){
  var d = this.clone();
  if (!interval || value === 0) { return d; }
  switch(interval.toLowerCase()){
    case Date.MILLI:
      d.setMilliseconds(this.getMilliseconds() + value);
      break;
    case Date.SECOND:
      d.setSeconds(this.getSeconds() + value);
      break;
    case Date.MINUTE:
      d.setMinutes(this.getMinutes() + value);
      break;
    case Date.HOUR:
      d.setHours(this.getHours() + value);
      break;
    case Date.DAY:
      d.setDate(this.getDate() + value);
      break;
    case Date.MONTH:
      var day = this.getDate();
      if(day > 28){
          day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
      }
      d.setDate(day);
      d.setMonth(this.getMonth() + value);
      break;
    case Date.YEAR:
      d.setFullYear(this.getFullYear() + value);
      break;
  }
  return d;
};
