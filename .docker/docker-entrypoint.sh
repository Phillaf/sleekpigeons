#!/bin/bash

set -eu

envsubst '${FINNHUB_KEY}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
