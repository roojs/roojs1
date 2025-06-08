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
    "{$rootDir}/roojs1/less/bootstrap/bootstrap.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'bootstrap.css',
        'minify' => 'bootstrap.min.css',
        'sourceMapRootpath' => '../less/bootstrap/',
        'variables' => array("@import 'variables.less';")
    ),
    "{$rootDir}/roojs1/less/bootstrap/bootstrap-light.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'bootstrap-light.css',
        'minify' => 'bootstrap-light.min.css',
        'sourceMapRootpath' => '../less/bootstrap/',
        'variables' => array("@import 'variables.less';")
    ),
    "{$rootDir}/roojs1/less/bootstrap/bootstrap-wrapped.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'bootstrap-wrapped.css',
        'minify' => 'bootstrap-wrapped.min.css',
        'sourceMapRootpath' => '../less/bootstrap/',
        'variables' => array("@import 'variables.less';")
    ),
    "{$rootDir}/roojs1/less/roojs-bootstrap/roojs-bootstrap.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'roojs-bootstrap-debug.css',
        'minify' => 'roojs-bootstrap.css',
        'sourceMapRootpath' => '../less/roojs-bootstrap/',
        'variables' => array("@import '../bootstrap/variables.less';")
    )
);

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

require_once 'HTML/Less.php';

foreach ($files as $src => $file){

    if(!file_exists($src)){
        echo "{$less} does not exist...\n";
        continue;
    }
    
    try {
        
        $less = new HTML_Less();
        
        $less->setOptions(array(
            'variables' => $file['variables'],
            'sourceMap' => true,
            'sourceMapWriteTo' => "{$file['baseDir']}/{$file['name']}.map",
            'sourceMapURL' => "{$file['name']}.map",
            'sourceMapRootpath' => $file['sourceMapRootpath'],
            'sourceMapBasepath' => dirname(realpath($src))
        ));
        
        $css = "{$file['baseDir']}/{$file['name']}";
        
        echo "Compiling - {$src} To {$css}\n";
        
        $less->compileFile($src, $css);
        
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
        
        $less->compileFile($src, $min);
        
    } catch (Exception $ex) {
        echo "lessphp fatal error: {$ex->getMessage()}\n";
    }
}