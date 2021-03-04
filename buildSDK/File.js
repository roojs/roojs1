// <script type ="text/Javascript">
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;

//String  = imports.String.String; 
/**
* @namespace File
* 
* Library to wrap GLib and Gio basic File related methods
* 
* usage:
* 
* File = import.File.File;
* 
* var contents = File.read("/tmp/test.txt");
*
* 
* 
*/
var File = {

    SEPARATOR : '/',

    join : function () {
        var out = "";
        for (var i = 0; i < arguments.length; i++) {
            if (i == 0) {
              out += arguments[i].rtrim(File.SEPARATOR);
            }
            else if (i == arguments.length - 1) {
              out += File.SEPARATOR + arguments[i].ltrim(File.SEPARATOR);
            }
            else {
              out += File.SEPARATOR + arguments[i].trim(File.SEPARATOR);
            }
        }
        return out;
    },

    read : function (path) {
        var out = {};
        out = GLib.file_get_contents(path);
        return out['contents'];
    },

    isFile : function (path) {
      return GLib.file_test(path, GLib.FileTest.IS_REGULAR);
    },
    exists : function (path) {
      return GLib.file_test(path, GLib.FileTest.EXISTS);
    },
    isDirectory : function (path) {
      return GLib.file_test(path, GLib.FileTest.IS_DIR);
    },

    list : function (path) {
        var listing = [];

        var f = Gio.file_new_for_path(String(path));
        var file_enum = f.enumerate_children(Gio.FILE_ATTRIBUTE_STANDARD_DISPLAY_NAME, Gio.FileQueryInfoFlags.NONE, null);

        var next_file = null;

        while ((next_file = file_enum.next_file(null)) != null) {
          listing.push(next_file.get_display_name());
        }

        file_enum.close(null);

        listing.sort();

        return listing;
    },

    mtime : function (path) {
        var f = Gio.file_new_for_path(String(path));
        var mtime = new GLib.TimeVal();

        var info = f.query_info(Gio.FILE_ATTRIBUTE_TIME_MODIFIED, Gio.FileQueryInfoFlags.NONE, null);
        info.get_modification_time(mtime);

        return new Date(mtime.tv_sec * 1000);
    },

    canonical : function (path) {
        var f = Gio.file_new_for_path(String(path));
        var can = f.resolve_relative_path('');
        return can.get_path();
    },
    
    /**
     * write
     * @arg path {String} File to write to
     * @arg string {String} Contents of file.
     * 
     */
    write : function (path, string) {
        var f = Gio.file_new_for_path(String(path));
        var data_out = new Gio.DataOutputStream({base_stream:f.replace(null, false, Gio.FileCreateFlags.NONE, null)});
        data_out.put_string(string, null);
        data_out.close(null);
    },
    /**
     * append
     * @arg path {String} File to write to
     * @arg string {String} string to append to file.
     * 
     */
    append : function (path, string) {
        var f = Gio.file_new_for_path(String(path));
        var data_out = new Gio.DataOutputStream({
                base_stream:f.append_to(Gio.FileCreateFlags.NONE, null)
        });
        data_out.put_string(string, null);
        data_out.close(null);
    },
    /**
     * remove 
     * Delete a file.
     * @arg path {String} File to remove
     * 
     * 
     */
    remove : function (path)
    {
        var f = Gio.file_new_for_path(String(path));
        return f['delete']();
    },
    /**
     * silentRecursiveCopy
     * copy files recursively from fromDir, silently ignore them if they already exist in toDir
     *        unless you select overwrite..
     * @arg {String} src source path
     * @arg {String} dest destination path
     * @arg {Gio.FileCopyFlags} options (optional)  - use Gio.FileCopyFlags.OVERWRITE to 
     *      otherwise they will not be copied
     * 
     */
    silentRecursiveCopy : function (fromDir, toDir, opts) {
        
        var filesToCopy = File.recursiveListing(fromDir);
        var srcPath, destPath, src, dest;
        if (typeof(opts) =='undefined') {
            opts = Gio.FileCopyFlags.NONE;
        }
        
        for (var index in filesToCopy) {
            srcPath = File.join(String(fromDir), filesToCopy[index]);
            destPath = File.join(String(toDir), filesToCopy[index]);

            if (File.isDirectory(srcPath) && !File.isDirectory(destPath)) {
                File.mkdir(destPath);
                continue;
            }
            // source is not file..?!?!?
            if (!File.isFile(srcPath)) {
                continue;
            }
            if (File.isFile(destPath) && opts == Gio.FileCopyFlags.NONE) {
                // do not overwrite.. - if file exists and we are not flaged to overwrite.
                continue;
            }
            
            File.copyFile(srcPath, destPath, opts);
           
        }
    },
    
    /**
     * mkdir
     * make a directory..
     * @arg {String} dstPath directory to make
     */
    mkdir : function (destPath) {
        var dest = Gio.file_new_for_path(String(destPath));
        
        return dest.make_directory(null, null);
    },
    /**
     * copyFile
     * @arg {String} src source path
     * @arg {String} dest destination path
     * @arg {Gio.FileCopyFlags} options (optional)  - use Gio.FileCopyFlags.OVERWRITE to .. overwrite..
     * 
     */
    copyFile : function (srcPath, destPath, opts) {
        if (typeof(opts) =='undefined') {
            opts = Gio.FileCopyFlags.NONE;
        }
        var dest = Gio.file_new_for_path(String(destPath));
        var src = Gio.file_new_for_path(String(srcPath));

        // a bit of a hack for the fact that Gio.File.copy arguments
        // can be nulled, but not according to the GIR file
        return src.copy(dest, opts);
    },

    recursiveListing : function (dir) {

        function recursiveListingInternal(prefix, listing, dir) {
          var entries = File.list(dir);
          var next, fullPath;

          for (var index in entries) {
            next = entries[index];
            fullPath = File.join(prefix, dir, next);

            if (File.isDirectory(fullPath)) {
              listing.push(next);
              listing = listing.concat(recursiveListingInternal(next, [], fullPath));
            }
            else {
              if (prefix) {
                next = File.join(prefix, next);
              }
              listing.push(next);
            }
          }

          return listing;
        }

        return recursiveListingInternal('', [], dir);
    }

};
