#!/bin/bash

set -eu

cp /nginx/nginx.conf /etc/nginx/nginx.conf
envsubst '${FINNHUB_KEY}' < /nginx/default.conf > /etc/nginx/conf.d/default.conf

exec "$@"
