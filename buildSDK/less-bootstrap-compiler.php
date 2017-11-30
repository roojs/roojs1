<?php

$cwd = getcwd();

if(array_pop(explode('/', $cwd)) !== 'roojs1'){
    echo "this should be run in roojs1 directory...\n";
    exit;
}

require_once 'HTML/Less.php';

$less = new HTML_Less();