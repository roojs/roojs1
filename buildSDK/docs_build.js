//<script type="text/javascript">

/**
 * @version $Id: main.js 570 2008-04-07 23:54:50Z micmath $
 * 
 * 
 * Usage:
 * 
 * - in the top level directory.
 * roolite -L/path/to/rooscript/examples/jstoolkit buildSDK/docs_build.js
 * 
 * 
 * 
 * 
 */


 

include "lib/JSDOC.js";
//include "frame/Opt.js";


var cwd = File.getcwd();

if (!File.exists(cwd+'/Roo.js')) {
    throw "needs to be run from the same directory as Roo.js";
}
 
	// configure it!!! -- see buildDocs.js in the rooscript/jstookit/exammples directory..
    
JSDOC.build(
    {
        _ : [ "Roo.js", "Array.js", "Date.js" , "Function.js" , "Number.js", "String.js", "Roo" ],
        // these are commented out for test builds
        //_ : [ 	 "Roo.js",  "Roo/Component.js", "Roo/util/Observable.js", "Roo/DatePicker.js", "Roo/data/Connection.js", "Roo/BasicLayoutRegion.js",
        //    "Roo/form/Action.js" , "Roo/grid/GridEditor.js", "Roo/Editor.js"   ],
        //_ : [   "Roo/form/BasicForm.js" ],
        //_ : [ 	 "Roo.js"],
        t : cwd + "/buildSDK/doc_templates/", // fixme - I think we should move doc templates to here...
        r : true,
        d : cwd + '/docs/',
        v : true,
        
        //C: true, // true = disable caching.
        C: false, // true = disable caching.
        
        c: false,
        x: false,
        p: false,
        a: false,
        e: '',
        n: false,
        o: false,
        s: false,
        T: false,
        h: false,
        D: [],
        H: [],
         
        usage : function()
        {
            throw "oops - something has gone wrong";
        },
        LOG : {
            warn : function(str) {
                println("Warn: " +str );
            },
            inform : function(str) {
                println("Inform: " +str );
            },
            close : function() { },
            flush : function() { },
            out: false,
            warnings : [],
            verbose : false
                
        }
        
    }
);
