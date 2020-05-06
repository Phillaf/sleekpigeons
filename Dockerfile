# Base
FROM nginx as base

COPY ./.docker/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

# Dev
FROM base AS dev

# Build
FROM base as build

COPY ./conf.d /etc/nginx/conf.d
COPY ./www /www
