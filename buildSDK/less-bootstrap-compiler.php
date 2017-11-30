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
        "roojs1/css-bootstrap/bootstrap.css",
        "roojs1/css-bootstrap/bootstrap.min.css"
    ),
    "roojs1/less/roojs-bootstrap/roojs-bootstrap.less" => array(
        "roojs1/css-bootstrap/roojs-bootstrap-debug.css",
        "roojs1/css-bootstrap/roojs-bootstrap.css"
    )
);

require_once 'HTML/Less.php';
        
$less = new HTML_Less();

foreach ($files as $src => $file){

    if(!file_exists($src)){
        echo "{$src} does not exist...\n";
        continue;
    }
    
    echo "{$src} exist \n";

//    try {
//
//        foreach ($file as $f){
//            echo "Compiling - {$src} To {$f}\n";
//
//            $less->compileFile($src, $f);
//        }
//
//    } catch (Exception $ex) {
//        echo "lessphp fatal error: {$ex->getMessage()}\n";
//    }

}