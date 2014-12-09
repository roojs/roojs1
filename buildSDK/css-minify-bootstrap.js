
File = imports.File.File;
pack = imports.MinifyCSS.pack;
GLib = imports.gi.GLib;  
// let's see if this works..
// should be run from top level..
var pa = GLib.get_current_dir();

if (!pa.match(/roojs$/)) {
    print("this should be run from the top level directory")
    Seed.quit();
}

var files = Files.list(pa + '/css-bootstrap');
var out = '';
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
    
    out += pack(File.read(pa + '/css-bootstrap/' +f ));
});




File.write(pa+'/css-bootstrap/roojs-bootstrap.css', out);
    