<?php
 
ini_set('include_path', 
    dirname(__FILE__). ':'. 
    dirname(__FILE__).'/pear');
 
$host = empty($_SERVER['HTTP_HOST']) ? '' : $_SERVER['HTTP_HOST'];
 
 
require_once 'HTML/FlexyFramework.php';
new HTML_FlexyFramework( array(
    'project'=> 'HebePublic',
    'debug' => 0,
    'nodatabase' => 1,
    'HTML_Template_Flexy' => array(
        'templateDir' => dirname(__FILE__). '/FlexyWiki/templates',
    ),
    'HebePublic' => array(
       'billDir' =>  $host == 'localhost' ? '/var/lib/php5/bills/web' : dirname(__FILE__) . '/../../bills/web',
        
    )
     
        
   
    
));
