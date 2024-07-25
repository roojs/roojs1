#!/bin/sh
# run at top leve!!!!

# core and classic UI 
roojspacker -t roojs-core.js -T roojs-core-debug.js -i buildSDK/dependancy_core.txt -i buildSDK/dependancy_core_nodoc.txt
roojspacker -t roojs-ui.js -T roojs-ui-debug.js -i buildSDK/dependancy_ui.txt

cat roojs-core.js  roojs-ui.js >  roojs-all.js
cat roojs-core-debug.js  roojs-ui-debug.js > roojs-debug.js

 
#bootstrap
roojspacker -t roojs-bootstrap.js -T roojs-bootstrap-debug.js -i buildSDK/dependancy_bootstrap.txt -i buildSDK/dependancy_bootstrap_nodoc.txt
 
# mostly not needed?
#calendar
roojspacker -t roojs-calendar.js -T roojs-calendar-debug.js -i buildSDK/dependancy_calendar.txt  
#mailer
roojspacker -t roojs-mailer.js -T roojs-mailer-debug.js -i buildSDK/dependancy_mailer.txt  
#build docbook library
roojspacker -t roojs-doc.js -T roojs-doc-debug.js -i buildSDK/dependancy_doc.txt
#build svg library
roojspacker -t roojs-svg.js -T roojs-svg-debug.js -i buildSDK/dependancy_svg.txt

  

# BUILD DOCS     
 
#new version?? -  
roojspacker -i buildSDK/dependancy_core.txt  -i buildSDK/dependancy_ui.txt  \
    -i buildSDK/dependancy_bootstrap.txt -i buildSDK/dependancy_calendar.txt \
    -i buildSDK/dependancy_svg.txt \
   --doc-target=docs -D

#build old ROOJS css 
seed buildSDK/cssmini.js


# SCSS (really uses the C scss)
php buildSDK/scss-bootstrap.php