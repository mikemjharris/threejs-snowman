FROM dockerfile/nodejs
MAINTAINER Mike Harris "mike.harris@mammal.io"

RUN mkdir -p /var/log/www/
VOLUME /var/log/www/

ADD . /var/www/

WORKDIR /var/www/

CMD npm start

EXPOSE 80
