
File = imports.File.File;
pack = imports.MinifyCSS.pack;
GLib = imports.gi.GLib;  
// let's see if this works..
// should be run from top level..
var pa = GLib.get_current_dir();
print(pa);

if (!pa.match(/roojs1$/)) {
    print("this should be run from the top level directory")
    Seed.quit();
}

var files = File.list(pa + '/css-bootstrap');

var out = '';
var debug_out = '';
files.forEach(function(f) {
    if (f.match(/^roojs/)) {
        return;
    }
    if (f.match(/^bootstrap/)) {
        return;
    }
    if (f.match(/^font-awesome/)) {
        return;
    }
    
    debug_out += "@import url('./" + f + ');\n";
    out += pack(File.read(pa + '/css-bootstrap/' +f ));
    print(f);
});

 
File.write(pa+'/css-bootstrap/roojs-bootstrap.css', out);
File.write(pa+'/css-bootstrap/roojs-bootstrap-debug.css', debug_out);
    