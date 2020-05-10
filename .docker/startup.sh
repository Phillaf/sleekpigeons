#!/bin/bash

mtail --logs /var/log/nginx/access-mtail.log --progs /etc/mtail/ &

nginx -g 'daemon off;'
