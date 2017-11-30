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
    array(
        'less' => array(
            'directory' => "{$rootDir}/roojs1/less/bootstrap",
            'name' => 'bootstrap'
        ),
        'css' => array(
            'directory' => "{$rootDir}/roojs1/css-bootstrap/",
            'name' => 'bootstrap'
        )
    ),
    array(
        'less' => array(
            'directory' => "{$rootDir}/roojs1/less/roojs-bootstrap",
            'name' => 'roojs-bootstrap'
        ),
        'css' => array(
            'directory' => "{$rootDir}/roojs1/css-bootstrap/",
            'name' => 'roojs-bootstrap'
        )
    )
);

print_R($files);exit;

require_once 'HTML/Less.php';
        
$less = new HTML_Less();

require_once 'HTML/CSS/Minify.php';

$minify = new HTML_CSS_Minify();

foreach ($files as $less => $file){

    if(!file_exists($less)){
        echo "{$less} does not exist...\n";
        continue;
    }

    print_R($file);
    exit;
    try {
        
        $css = "{$file['directory']}{$file['name']}.css";
        
        echo "Compiling - {$less} To {$css}\n";
        
        $less->compileFile($less, $css);
        
        if(!file_exists($css)){
            echo "Compile failed?!\n";
            continue;
        }
        
        
        

    } catch (Exception $ex) {
        echo "lessphp fatal error: {$ex->getMessage()}\n";
    }
    

}