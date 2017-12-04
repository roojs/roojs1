<?php

$cwd = getcwd();

if (array_pop(explode('/', $cwd)) !== 'roojs1') {
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
        'variables' => "@import 'variables.less';"
    ),
    "{$rootDir}/roojs1/less/roojs-bootstrap/roojs-bootstrap.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'roojs-bootstrap-debug.css',
        'minify' => 'roojs-bootstrap.css',
        'variables' => "@import '../bootstrap/variables.less';"
    )
);

require_once 'HTML/Less.php';
        
$less = new HTML_Less();

foreach ($files as $src => $file){

    if(!file_exists($src)){
        echo "{$less} does not exist...\n";
        continue;
    }

    try {
        
        $css = "{$file['baseDir']}/{$file['name']}";
        
        echo "Compiling - {$src} To {$css}\n";
        
        $less->compileFile($src, $css);
        
    } catch (Exception $ex) {
        echo "lessphp fatal error: {$ex->getMessage()}\n";
    }
    
}

require_once 'HTML/CSS/Minify.php';

foreach ($files as $src => $file){
    
    $css = "{$file['baseDir']}/{$file['name']}";
    
    if(!file_exists($css)){
        echo "{$css} does not exist...\n";
        continue;
    }
    
    try {
        
        $min = "{$file['baseDir']}/{$file['minify']}";
        
        echo "Minifing - {$css} To {$min}\n";
        
        $minify = new HTML_CSS_Minify($file['baseDir'], $file['baseDir'], array($file['name']));
    
        $content = $minify->minify($file['baseDir']);

        file_put_contents($min, $content);
        
    } catch (Exception $ex) {
        echo "Minify fatal error: {$ex->getMessage()}\n";
    }
    
}
