FROM hbdev.oray.com/dev/node:18.12.1-alpine3.16 as build

LABEL name="lottery"
LABEL version="1.1"
LABEL author="webdev <webdev@oray.com>"
LABEL maintainer="webdev <webdev@oray.com>"
LABEL description="OrayWeb frontend project building enviroment"

COPY . /www

RUN cd /www \
  && npm run build \
  && mkdir ./dist/docker \
  && mkdir ./dist/config \
  && cp ./config/entry-point.sh ./dist/docker/entry-point.sh \
  && cp ./config/nginx.conf ./dist/config/nginx.conf

FROM hbdev.oray.com/dev/alpine:3.13 as production

COPY --from=build /www/dist /www

RUN apk add nginx=1.18.0-r15 \
  && mkdir -p /var/log/nginx \
  && chmod +x /www/docker/entry-point.sh

WORKDIR /www

EXPOSE 3000

ENTRYPOINT [ "/www/docker/entry-point.sh" ]

