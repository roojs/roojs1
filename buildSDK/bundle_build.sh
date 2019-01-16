#!/bin/sh
# run at top leve!!!!
  
roojspacker -t roojs-core.js -T roojs-core-debug.js -i buildSDK/dependancy_core.txt

 
roojspacker -t roojs-ui.js -T roojs-ui-debug.js -i buildSDK/dependancy_ui.txt


cat      roojs-core.js  roojs-ui.js >  roojs-all.js
cat roojs-core-debug.js  roojs-ui-debug.js > roojs-debug.js

 
#bootstrap
roojspacker -t roojs-bootstrap.js -T roojs-bootstrap-debug.js -i buildSDK/dependancy_bootstrap.txt
 
#calendar
roojspacker -t roojs-calendar.js -T roojs-calendar-debug.js -i buildSDK/dependancy_calendar.txt  
  
  
#mailer
roojspacker -t roojs-mailer.js -T roojs-mailer-debug.js -i buildSDK/dependancy_mailer.txt  
 

#build docbook library
roojspacker -t roojs-doc.js -T roojs-doc-debug.js -i buildSDK/dependancy_doc.txt

  

     
 

#new version?? -  
roojspacker -i buildSDK/dependancy_core.txt  -i buildSDK/dependancy_ui.txt  \
    -i buildSDK/dependancy_bootstrap.txt -i buildSDK/dependancy_calendar.txt \
   --doc-target=docs -D

