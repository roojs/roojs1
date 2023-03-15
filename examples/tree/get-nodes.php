<?php

 
die("disabled");
$lib  = empty($_REQUEST['lib']) ? dirname(__FILE__)."/../../" : dirname(__FILE__)."/../" ;
$rnode = empty($_REQUEST['node']) ? '' : $_REQUEST['node'];
$node = preg_replace('/^(source|yui)/i', '',$rnode);
 
if (strpos($node, '..') > 0) {
    die("no traversing the tree!");
}
 
$dh = opendir($lib.$node);

$ret = array();
while (false !== ($f = readdir($dh))) {
    if (empty($f) || $f[0] == '.') {
        continue;
    }
    if (is_file($lib.$node.'/'.$f)) {
        $r = array(
            'text' => $f, 
            'id' => $node.'/'.$f,
            'cls' => 'file',
            'leaf' => true,
            'size' => filesize($lib.$node.'/'.$f),
            
        );
        if (isset($_REQUEST['uiProvider'])) {
            $r['uiProvider'] = 'col';
        }
        $ret[] =  $r;
        continue;
    }
    $r = array(
            'text' => $f, 
            'id' => $node.'/'.$f,
            'cls' => 'folder',
            'leaf' => false,
       
    );
    if (isset($_REQUEST['uiProvider'])) {
        $r['uiProvider'] = 'col';
    }
    $ret[] = $r;
    
}
closedir($dh);
header('Content-type: text/javascript');
echo json_encode(array('success' => true, 'data'=>$ret));

