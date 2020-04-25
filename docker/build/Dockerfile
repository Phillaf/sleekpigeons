FROM nginx

COPY ./docker/dev/docker-entrypoint.sh /
COPY ./conf.d /etc/nginx/conf.d
COPY ./www /www

ENTRYPOINT ["../docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
