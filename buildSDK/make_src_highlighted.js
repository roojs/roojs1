
/**
 * Make the highlighted docs = needs more work....
 * 
 * In the top level Roojs directory.. (you need to change the path of the jstoolkit)
 * 
 * 
 * roolite buildSDK/make_src_highlighted.js -L../rooscript/examples/jstoolkit2 
 * 
 * put's the resulting files in docs/symbols/src
 *  (make sure it exists first..)
 *
 * Uses the dependancy order file.. (could do this recursively, it's pretty simple..)
 * 
 * <script type="text/javascript">
 */

include 'prettyPrint.js'; 
 
function main()
{
    
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
    
     for(var i=0; i < files.length; i++)  {
        
        println("reading " +files[i] );
        if (!File.exists(files[i])) {
            throw "missing file: " + files[i];
            continue;
        }
        
        var prettyfile = spath + '/docs/symbols/src/' +files[i].substr(spath.length+1).replace(/\//g, '.').replace(/\.js$/, '.html');
        // should do timestamp stuff!
        if (File.exists(prettyfile) &&
            File.getTimes(prettyfile)[0] > File.getTimes(files[i])[0]
            ) {
            File.chmod(prettyfile, 0644);
            continue;
        }
        
        var str = File.read(files[i]);
        
        // probably want do do templating or something here..
        // we probably want to do some sexy replacement on the comments using our parsed info on the file!? ;)
        
        var pretty = toPretty(str);
        
        
        
        
        println("write : " + prettyfile);
        //throw "done";
        File.write(prettyfile, 
            '<html><head>' +
            '<title>' + files[i].substr(spath.length+1) + '</title>' +
            '<link rel="stylesheet" type="text/css" href="../../../css/highlight-js.css"/>' + 
            '</head><body class="highlightpage">' +
            pretty +
            '</body></html>');
            
        File.chmod(prettyfile, 0644);
    }
}
main();      
   