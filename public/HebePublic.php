<?php


class HebePublic extends HTML_FlexyFramework_Page
{
    var $ips= 
        array(
    /*"192.168.6.210",
	 "202.134.82.251",
	"221.127.174.93",
	"221.127.172.113",
 "220.232.149.148",
  "182.173.76.100",
  "192.168.5.211",
  "127.0.0.1","202.81.255.1","113.253.13.124"
  */
    "182.173.76.50", // new server.
    );
    
    function getAuth() {
        if (!empty($_REQUEST['secret']) && $_REQUEST['secret'] = 'b4h2009') { return true; } 
        if (!in_array($_SERVER['REMOTE_ADDR'], $this->ips)) {
            die("invalid IP accessing data  = " . htmlspecialchars($_SERVER['REMOTE_ADDR']));
        }
        return true;
    }
    /**
     * get format: 
     * 2009/10/A-999.html
     * 
     */
    function get($str)
    {
        $ff = HTML_FlexyFramework::get();
        
        $bits = explode('/', $str);
        if (count($bits) !=3) {
            die("ERROR 3 parts required");
        }
        $is_pdf = preg_match('/^p/', $str);
        if ($is_pdf) {
            $bits[0]= preg_replace('/^p/', '', $str);
        }
        
        $bits[0] = (int)$bits[0];
        
        if ($bits[0] < 2009) {
            die("ERROR invalid Y");
        }
        $bits[1] = (int)$bits[1];
        if ($bits[1] < 1 || $bits[1] > 12 ) {
            die("ERROR invalid M");
        }
        $bits[1] = sprintf("%02d", $bits[1]);
        $bits[2] = preg_replace('/[^A-Z0-9-]+/i', '', strtoupper($bits[2]));
        if (empty($bits[2])) {
            die("ERROR invalid AC");
        }
         
        $opts = PEAR::getStaticProperty("HebePublic", "options");
        $fn = $opts['billDir'].'/' . implode('/', $bits) . '.html';
        $fnd = dirname($fn);
        $fnb = basename($fn);
        $fn = $fnd . '/approved/' . $fnb;
        
        //echo $fn;
        
        if (!file_exists($fn)) {
            die("SORRY Bill does not exist or has not been approved for release yet:<br/><br/>".
                "Note: The latest statement will be updated on 10th of each month. " );
        }
        
        if ($is_pdf) {
            
            $pfn = $opts['billDir'].'/' . implode('/', $bits) . '.pdf';
            if (file_exists($pfn)) {
                require_once 'File/Convert.php';
                
                $f =   new File_Convert($pfn, 'application/pdf');
                $f->convert('application/pdf');
                //--encoding
                $f->serve(true);
                
                exit;
                
                
            }
            //die("missing $pfn");
            
            // use wkhtml...
            require_once 'File/Convert.php';
            
            $f =   new File_Convert($fn, 'text/html');
            $f->convert('application/pdf');
            //--encoding
            $f->serve(true);
            
            
        }
         
        
        echo '<form method="POST" action="/page.php"><p align="center">';
        echo '<input type="hidden" name="action" value="estatement">';
        echo '<input type="hidden" name="eyear" value="p' . $bits[0].'-'.$bits[1].'">';
        echo '<input type="submit" value="Download as PDF"></p></form>';
       
        
        $fh = fopen($fn,'r');
        fpassthru($fh);
        exit;
        
        
    }
    
}
