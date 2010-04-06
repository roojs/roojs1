#!/bin/sh
 
DATE=`/bin/date +%Y%m%d`

rm /home/www/devel/roojs1-current.tgz
rm /home/www/devel/roojs1-${DATE}.tgz


cd /home/svn/svn
tar cvzf /home/www/devel/roojs1-${DATE}.tgz roojs1

ln -s /home/www/devel/roojs1-${DATE}.tgz /home/www/devel/roojs1-current.tgz