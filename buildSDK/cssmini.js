//<script type="text/javascript">
/**
 * YUI Compressor
 * Author: Julien Lecomte <jlecomte@yahoo-inc.com>
 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 *     http://developer.yahoo.net/yui/license.txt
 *
 * This code is a port of Isaac Schlueter's cssmin utility.
 *
 * Usage: seed buildSDK/cssmini.js
 */ 



File = imports.File.File;
GLib = imports.gi.GLib;  
// let's see if this works..
// should be run from top level..
var pa = GLib.get_current_dir();


print(pa);
//println(pack(File.read(pa+'/css/basic-dialog.css')));

var lines = File.read(pa + '/css/roojs-debug.css').split(/\n/);
//@import url("reset-min.css");
var out = '';
lines.forEach(function(l) {
    if (!l.match(/^@import/)) {
        return;
    }
    l = l.replace(/^[^"]+"([^"]+)".*/, '$1');
    print("pack " + l);
    //out+=pack(File.read(pa+'/css/' + l)).replace(/\}/g, "}\n")+"\n";
    out+=pack(File.read(pa+'/css/' + l)) + "\n";
});

File.write(pa+'/css/roojs.css', out); 
    
     
print("written css/roojs.css");
// and the themese...
//ytheme-aero.css
//ytheme-gray.css
//ytheme-vista.css

  
  
  
  
  
        // string manip!?
function pack(istr) {
    
        
        function removeComments(str)
        {
            var r = ''; //ret
            var si =0;
            var  iemac = false;
            
            while ((si = str.indexOf("/*")) > -1) {
                ei = str.indexOf("*/");
                 
                
                if (ei >= si + 2) {
                    if (str.charAt(ei-1) == '\\') {   // eg. /* \*/
                        si = ei+2;
                        iemac = true;
                        // Looks like a comment to hide rules from IE Mac.
                        // Leave this comment, and the following one, alone...
                        // shunt:
                        
                        r += str.substring(0, ei) ;
                        str = str.substring(ei);
                        continue;
                    }
                    if (iemac) {
                        si = ei + 2;
                        iemac = false;    
                        r += str.substring(0, ei) ;
                        str = str.substring(ei+2);
                        continue;
                    }
                    
                    r += str.substring(0, si) ;
                    str = str.substring(ei+2);
                    continue;
                }
                // did not find end..
                r += str.substring(0, 2);
                str = str.substring(2);
                    
                    
            }
                r += str;
            return r;
        }
        
        istr = removeComments(istr);
        //println("after comments remove: " + istr);
        
        // Normalize all whitespace strings to single spaces. Easier to work with that way.
        istr = istr.replace(/\s+/g, ' ');

        // Make a pseudo class for the Box Model Hack ????
        //css = css.replaceAll("\"\\\\\"}\\\\\"\"", "___PSEUDOCLASSBMH___");
        istr = istr.replace(/"\\"\}\\"/g, "___PSEUDOCLASSBMH___");

        // Remove the spaces before the things that should not have spaces before them.
        // But, be careful not to turn "p :link {...}" into "p:link{...}"
        // Swap out any pseudo-class colons with the token, and then swap back.
        
        istr = istr.replace(/(^|\})(([^\{:])+:)+([^\{]*\{)/g, function(m) {
            return m.replace(/:/g, "___PSEUDOCLASSCOLON___");
        });
        
        
        istr = istr.replace(/\s+([!{};:>+\(\)\],])/g, "$1");
        istr = istr.replace(/___PSEUDOCLASSCOLON___/g, ":");

        // Remove the spaces after the things that should not have spaces after them.
        istr = istr.replace(/([!{}:;>+\(\[,])\s+/g, "$1");

        // Add the semicolon where it's missing.
        istr = istr.replace(/([^;\}])\}/g, "$1;}");

        // Replace 0(px,em,%) with 0.
        istr = istr.replace(/([\s:])(0)(px|em|%|in|cm|mm|pc|pt|ex)/g, "$1$2");

        // Replace 0 0 0 0; with 0. (by this time, we have reduced spaces etc..
        istr = istr.replace(/:0 0 0 0;/g, ":0;");
        istr = istr.replace(/:0 0 0;/g, ":0;");
        istr = istr.replace(/:0 0;/g, ":0;");
        // Replace background-position:0; with background-position:0 0;
        istr = istr.replace(/background-position:0;/g, "background-position:0 0;");

        // Replace 0.6 to .6, but only when preceded by : or a white-space
        istr = istr.replace(/(:|\s)0+\.(\d+)/g, "$1.$2");

        // Shorten colors from rgb(51,102,153) to #336699
        // This makes it more likely that it'll get further compressed in the next step.
        
        istr = istr.replace(/rgb\s*\(\s*([0-9,\s]+)\s*\)/g, function(m, c)
            {
                var rgb = c.split(',');
                var hx = '';
                for (var  i = 0; i < rgb.length; i++) {
                    var val = parseInt(rgb[i]);
                    if (val < 16) {
                        hx+="0";
                    }
                    hx+=val.toString(16);
                    
                }
                return '#' + hx;
            });
        
         

        // Shorten colors from #AABBCC to #ABC. Note that we want to make sure
        // the color is not preceded by either ", " or =. Indeed, the property
        //     filter: chroma(color="#FFFFFF");
        // would become
        //     filter: chroma(color="#FFF");
        // which makes the filter break in IE.
        
        istr = istr.replace(/([^"'=\s])(\s*)#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g, 
                function(m, g1,g2,g3,g4,g5,g6,g7,g8) {
                    
                     
                        
                        if (g3.toLowerCase() == g4.toLowerCase() &&
                            g5.toLowerCase() == g6.toLowerCase() &&
                            g7.toLowerCase() == g8.toLowerCase()) {
                                
                                return g1+g2+'#' + g3+g5+g7;
                        }
                     
                   
                    return m;
                    
                });
         
        // Remove empty rules.
        istr = istr.replace(/[^\}]+\{;\}/g, "");
/*
        if (linebreakpos >= 0) {
            // Some source control tools don't like it when files containing lines longer
            // than, say 8000 characters, are checked in. The linebreak option is used in
            // that case to split long lines after a specific column.
            int i = 0;
            int linestartpos = 0;
            sb = new StringBuffer(css);
            while (i < sb.length()) {
                char c = sb.charAt(i++);
                if (c == '}' && i - linestartpos > linebreakpos) {
                    sb.insert(i, '\n');
                    linestartpos = i;
                }
            }

            css = sb.toString();
        }
*/
        // Replace the pseudo class for the Box Model Hack
        istr = istr.replace(/___PSEUDOCLASSBMH___/g, "\"\\\\\"}\\\\\"\"");

        // Trim the final string (for any leading or trailing white spaces)
        istr = istr.replace(/^\s+/g, '');
        istr = istr.replace(/\s+$/g, '');


        // Write the output...
        return istr;
}