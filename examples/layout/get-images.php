<?php
$dir = dirname(__FILE__) ."/../view/images/thumbs/";

$images = array();
$d = dir($dir);
$id = 0;
while($name = $d->read()){
    if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
    
    
    $size = filesize($dir.$name);
    $lastmod = filemtime($dir.$name)*1000;
    $images[] = array('id' => $id, 'name'=>$name, 'size'=>$size, 
			'lastmod'=>$lastmod, 'url'=>"images/thumbs/".$name);
    $id++;
}
$d->close();
$o = array('images'=>$images);

echo json_encode($o);
