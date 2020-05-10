# Base
FROM nginx as base

RUN apt-get update && apt-get install -y curl && \
    curl -L https://github.com/google/mtail/releases/download/v3.0.0-rc10/mtail_v3.0.0-rc10_linux_amd64 \
    --output /usr/bin/mtail --silent && \
    chmod +x /usr/bin/mtail

COPY ./.docker/docker-entrypoint.sh /
COPY ./.docker/startup.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/startup.sh"]

# Build
FROM base as build

COPY ./nginx /nginx
COPY ./www /www
COPY ./mtail /etc/mtail
