#!/bin/sh
# run at top leve!!!!
 
#seed ../gnome.introspection-doc-generator/pack.js \
#     -f buildSDK/dependancy_core.txt -o roojs-core.js -O roojs-core-debug.js
roojspacker -t roojs-core.js -T roojs-core-debug.js -i buildSDK/dependancy_core.txt

#seed ../gnome.introspection-doc-generator/pack.js \
#     -f buildSDK/dependancy_ui.txt -o roojs-ui.js -O roojs-ui-debug.js

roojspacker -t roojs-ui.js -T roojs-ui-debug.js -i buildSDK/dependancy_ui.txt


cat      roojs-core.js  roojs-ui.js >  roojs-all.js
cat roojs-core-debug.js  roojs-ui-debug.js > roojs-debug.js


#build bootstrap library
#seed ../gnome.introspection-doc-generator/pack.js \
#     -f buildSDK/debootstrappendancy_bootstrap.txt -o roojs-bootstrap.js -O roojs-bootstrap-debug.js

roojspacker -t roojs-bootstrap.js -T roojs-bootstrap-debug.js -i buildSDK/dependancy_bootstrap.txt

#build calendar library
seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_calendar.txt -o roojs-calendar.js -O roojs-calendar-debug.js
  
#build mailer library
seed ../gnome.introspection-doc-generator/pack.js \
     -f buildSDK/dependancy_mailer.txt -o roojs-mailer.js -O roojs-mailer-debug.js
  

#build docbook library
roojspacker -t roojs-doc.js -T roojs-doc-debug.js -i buildSDK/dependancy_doc.txt

  

     

#build the docs.. (and properties file)
seed ../gnome.introspection-doc-generator/jsdocbuild.js --baseDir ../roojs1 \
   --target ../roojs1/docs --conf ../roojs1/buildSDK/jsdoc.cfg.json \
   --cacheDirectory /tmp/roocache/
