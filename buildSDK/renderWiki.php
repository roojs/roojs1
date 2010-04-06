<?php exit;
?>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>RooJS(1) Generated Documentation</title>
</head>


<html>
<head>
  <title>RooJS (1) - Manual</title>

    
    <style>
   body, table, td {
       font:normal 11px tahoma,arial,helvetica,sans-serif;
      }
    
    
    </style>
<a href="http://www.akbkhome.com/roojs1/docs" target="_top"><h1>  View Documentation Interface  </h1></a>

<?php
// load the class file
 set_include_path('/home/alan/Text_Wiki-1.2.0');
require_once 'Text/Wiki.php';
 

$wiki =& new Text_Wiki();
 
 
$text = file_get_contents(dirname(__FILE__).'/wiki_index.txt');
// transform the wiki text into XHTML
$xhtml = $wiki->transform($text, 'Xhtml');
$xhtml = str_replace( 'onclick="window.open(this.href, \'_blank\'); return false;"', '', $xhtml);
$xhtml = str_replace( '<p>&lt;TSTART&gt;</p>', '<TABLE><TR><TD valign="top">', $xhtml);
$xhtml = str_replace( '&lt;TSEP&gt;<br />', '</TD><TD valign="top">', $xhtml);
$xhtml = str_replace( '<p>&lt;TEND&gt;</p>', '</TD></TR><TABLE>', $xhtml);



// display the transformed text
echo $xhtml;
?>




</body>
</html>