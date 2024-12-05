<?php
if (php_sapi_name() != 'cli') {
    die("CLI ONLY");
}
$cwd = getcwd();

$cc = explode('/', $cwd);
if (array_pop($cc) !== 'roojs1') {
    echo "this should be run in roojs1 directory...\n";
    exit;
}

ini_set('include_path', 
    dirname(__FILE__) . '/../:' .
    dirname(__FILE__) . '/../../pear:' .
    ini_get('include_path')
);

$rootDir = dirname(__FILE__) . '/../..';

$files = array(
    "bootstrap.scss" => array(
        "scssDir" => "{$rootDir}/roojs1/scss/bootstrap",
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap4",
        'name' => 'bootstrap.css',
        'minify' => 'bootstrap.min.css',
        'sourceMapRootpath' => '../scss/bootstrap/',
        'variables' =>  ""
    ),
     "bootstrap-wrapped.scss" => array(
        "scssDir" => "{$rootDir}/roojs1/scss/bootstrap",
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap4",
        'name' => 'bootstrap-wrapped.css',
        'minify' => 'bootstrap-wrapped.min.css',
        'sourceMapRootpath' => '../scss/bootstrap/',
        'variables' =>  ""
    ),
    
    "roojs-bootstrap.scss" => array(
        "scssDir" => "{$rootDir}/roojs1/scss/roojs-bootstrap",
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap4",
        'name' => 'roojs-bootstrap-debug.css',
        'minify' => 'roojs-bootstrap.css',
        'sourceMapRootpath' => '../scss/roojs-bootstrap/',
        'variables' => "@import '../bootstrap/functions';\n@import '../bootstrap/variables';"
    ),
    
    // this is a test to see if we can get this theme to build..
    // note our classic roojs-bootstrap will need a rebuild as well as it uses different variables.
    "sb-admin-2.scss" => array(
        "scssDir" => "{$rootDir}/roojs1/scss/startbootstrap-sb-admin-2",
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap4",
        'name' => 'sb-admin-2.css',
        'minify' => 'sb-admin-2.min.css',
        'sourceMapRootpath' => '../scss/startbootstrap-sb-admin-2/',
        'variables' =>  ""
    ),
    
     
);
require_once 'System.php';
$sassc = System::which("sassc");
if (empty($sassc)) {
    die("INSTALL sassc");
}
foreach($files as $file => $f) {
    
    $tmpFile = tempnam("/tmp/", "scss");
    file_put_contents($tmpFile, "{$f['variables']}\n@import \"{$file}\";\n");
    echo file_get_contents($tmpFile);
    
    
    
    $cmd = "{$sassc}  --sourcemap=auto -I {$f['scssDir']} $tmpFile {$f['baseDir']}/{$f['name']}";
    echo "$cmd\n";
    echo `$cmd`;
    $cmd = "{$sassc} --style=compressed --sourcemap=auto -I {$f['scssDir']} $tmpFile {$f['baseDir']}/{$f['minify']}";
    echo "$cmd\n";
    echo `$cmd`;
}
exit;



/*
foreach ($files as $src => $file){
    
    $css = "{$file['baseDir']}/{$file['name']}";
    
    if(!file_exists($css)){
        continue;
    }
    
    $dir = "{$file['baseDir']}/{$file['sourceMapRootpath']}";
    
    $variable = "{$dir}variables.less";
    
    if(file_exists($variable) && filemtime("{$dir}variables.less") > filemtime($css)){
        continue;
    }
    
    $isLatest = true;
    
    foreach(scandir($dir) as $f) {
                
        if (!strlen($f) || $f[0] == '.') {
            continue;
        }

        $less = "{$dir}{$f}";
        
        if(filemtime($less) > filemtime($css)){
            $isLatest = false;
            break;
        }
    }
    
    if($isLatest){
        echo "{$css} already up-to-date \n";
        unset($files[$src]);
    }
    
}
*/
require_once 'HTML/Scss.php';

foreach ($files as $src => $file){
    
    if(!file_exists($file['scssDir'].'/'. $src)){
        echo "{$file['scssDir']}/{$src} does not exist...\n";
        continue;
    }
    
    try {
        
        $scss = new HTML_Scss();
         
        $scss->setSourceMap(HTML_Scss::SOURCE_MAP_FILE);
        $scss->setSourceMapOptions(array(
                'sourceRoot' => $file['sourceMapRootpath'],
        
                // an optional name of the generated code that this source map is associated with.
                'sourceMapFilename' => "{$file['baseDir']}/{$file['name']}.map",
        
                // url of the map
                'sourceMapURL' => "{$file['name']}.map",
        
                // absolute path to a file to write the map to
                'sourceMapWriteTo' => "{$file['baseDir']}/{$file['name']}.map",
        
                // output source contents?
                'outputSourceFiles' => false,
        
                // this is added to the file path.
                'sourceMapRootpath' =>  '../',
        
                // this is removed from the filepath.
                'sourceMapBasepath' => $rootDir .'/roojs1/scss'
            
        ));
       
   
        $css = "{$file['baseDir']}/{$file['name']}";
        
        echo "Compiling - {$src} To {$css}\n";
        
        $scss->setImportPaths($file['scssDir']);
        $scss->setFormatter('Expanded');
        
        file_put_contents($css, $scss->compile("{$file['variables']}\n@import \"{$src}\";"));
        
        
        $min = "{$file['baseDir']}/{$file['minify']}";
        
         
        
        echo "Minifing - {$src} To {$min}\n";
        
        $scss->setFormatter('Crunched');
        
        file_put_contents($min,  $scss->compile("{$file['variables']}\n@import \"{$src}\";")  );
    } catch (Exception $ex) {
        echo "scss fatal error: {$ex->getMessage()}\n";
    }
}