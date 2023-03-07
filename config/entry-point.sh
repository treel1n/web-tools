#! /bin/sh
 /usr/sbin/nginx -c /www/config/nginx.conf

 echo $(date +"%Y-%m-%d %H:%M:%S") "[INFO] Start console-domain frontend service - OK"

tail -f /var/log/nginx/access.log