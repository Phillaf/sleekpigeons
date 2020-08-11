#!/bin/bash

set -eu

cp /nginx/nginx.conf /etc/nginx/nginx.conf
cp /nginx/metrics.conf /etc/nginx/conf.d/metrics.conf

envsubst '${FINNHUB_KEY},${QUANDL_KEY}' < /nginx/default.conf > /etc/nginx/conf.d/default.conf

exec "$@"
