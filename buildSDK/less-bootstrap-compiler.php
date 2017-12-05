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
        'variables' => array("@import 'variables.less';")
    ),
    "{$rootDir}/roojs1/less/roojs-bootstrap/roojs-bootstrap.less" => array(
        'baseDir' => "{$rootDir}/roojs1/css-bootstrap",
        'name' => 'roojs-bootstrap-debug.css',
        'minify' => 'roojs-bootstrap.css',
        'variables' => array("@import '../bootstrap/variables.less';")
    )
);

require_once 'HTML/Less.php';

foreach ($files as $src => $file){

    if(!file_exists($src)){
        echo "{$less} does not exist...\n";
        continue;
    }

    try {
        
        $less = new HTML_Less();
        
        $less->setOption('variables', $file['variables']);
        $less->setOption('sourceMap', true);
        
        $css = "{$file['baseDir']}/{$file['name']}";
        
        echo "Compiling - {$src} To {$css}\n";
        
        $less->compileFile($src, $css);
        
        $min = "{$file['baseDir']}/{$file['minify']}";
        
        $less->setOption('compress', true);
        
        echo "Minifing - {$src} To {$min}\n";
        
        $less->compileFile($src, $min);
        
    } catch (Exception $ex) {
        echo "lessphp fatal error: {$ex->getMessage()}\n";
    }
    
}