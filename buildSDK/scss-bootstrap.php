<?php

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
    //    'variables' => array("@import 'variables.less';")
    ),
    /*
    "{$rootDir}/roojs1/less/roojs-bootstrap/roojs-bootstrap.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'roojs-bootstrap-debug.css',
        'minify' => 'roojs-bootstrap.css',
        'sourceMapRootpath' => '../less/roojs-bootstrap/',
        'variables' => array("@import '../bootstrap/variables.less';")
    )
    */
);
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
        
                // base path for filename normalization
                'sourceMapRootpath' => '',
        
                // base path for filename normalization
                'sourceMapBasepath' => ''
            
        ));
       
   
        $css = "{$file['baseDir']}/{$file['name']}";
        
        echo "Compiling - {$src} To {$css}\n";
        
        $scss->setImportPaths($file['scssDir']);
        $scss->setFormatter('Expanded');
        
        file_put_contents($scss->compile("@import \"{$src}\";"), $css);
        
        
        $min = "{$file['baseDir']}/{$file['minify']}";
        
        $less = new HTML_Less();
        
        $less->setOptions(array(
            'compress' => true,
            'variables' => $file['variables'],
            'sourceMap' => true,
            'sourceMapWriteTo' => "{$file['baseDir']}/{$file['minify']}.map",
            'sourceMapURL' => "{$file['minify']}.map",
            'sourceMapRootpath' => $file['sourceMapRootpath'],
            'sourceMapBasepath' => dirname(realpath($src))
        ));
        
        echo "Minifing - {$src} To {$min}\n";
        
        $scss->setFormatter('Crunched');
        
        file_put_contents($scss->compile("@import \"{$src}\";"), $min);
    } catch (Exception $ex) {
        echo "scss fatal error: {$ex->getMessage()}\n";
    }
}