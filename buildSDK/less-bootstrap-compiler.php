<?php

$cwd = getcwd();

if(array_pop(explode('/', $cwd)) !== 'roojs1'){
    echo "this should be run in roojs1 directory...\n";
    exit;
}

echo __DIR__;