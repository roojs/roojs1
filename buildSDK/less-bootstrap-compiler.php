<?php

$cwd = getcwd();

if(array_pop(explode('/', $cwd)) !== 'roojs1'){
    echo "this should be run in roojs1 directory...\n";
    exit;
}

 ini_set('include_path', 
            dirname(__FILE__). '../:' . 
        
            dirname(__FILE__).'../pear:' . 
            ini_get('include_path'));

require_once 'HTML/Less.php';

$less = new HTML_Less();