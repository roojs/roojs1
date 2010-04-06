/**
 * Usage:
 * 
 * In the top level Roojs directory.. (you need to change the path of the jstoolkit)
 * 
 * roolite buildSDK/bundle_build.js -L/home/svn/svn/rooscript/examples/jstoolkit2
 * 
 * later we will have additional sections in the dep builder for adding/removeing files from list 
 * for smaller builds..
 * <script type="text/javascript">
 */
// pack needs to be in the include path!!

include 'lib/Array.js';
include 'lib/JSDOC.js';
include 'lib/JSDOC/Identifier.js';
include 'lib/JSDOC/TokenReader.js';
include 'lib/JSDOC/Token.js';
include 'lib/JSDOC/TokenStream.js';

include 'lib/JSDOC/CompressWhite.js';
include 'lib/JSDOC/Scope.js';
include 'lib/JSDOC/ScopeParser.js';
include 'lib/JSDOC/Packer.js';



var argv = new Array();
    var gotsep = false;
    for (var i = 0 ; i < arguments.length; i++) {
        if (arguments[i] == '--') {
            gotsep = true;
            continue;
        }
        if (!gotsep) {
            continue;
        }
        argv.push(arguments[i]);
    }

function main() {

   
    println(argv.toSource());
    
    var files = [];
    var spath = File.getcwd();
    var flist = File.read(spath+"/buildSDK/dependancy_order.txt" ).split("\n");
    for(var i = 0; i < flist.length;i++) {
        var f = flist[i];
        if (/^\s*\//.test(f) || !/[a-z]+/i.test(f)) {
            continue;
        }
        //println("ADD"+ f.replace(/\./g, '/'));
        files.push(spath + '/' + f.replace(/\./g, '/').replace(/\s+/g,'')+'.js');
        
    }
     
    
    println(files.toSource());
    
      
    var bpath = spath + '/build';
    if (!File.exists(bpath)) {
        File.mkdir(bpath);
    }
    
    
    var debugfile = spath + "/roojs-debug.js";
    
    
    var allfile = spath + "/roojs-all.js";
    
    
    var pk = new JSDOC.Packer(files, spath);
    pk.translate = false;
    pk.packFiles(bpath, allfile, debugfile);
     
    
    println("Finished!");
  
}

main();
    