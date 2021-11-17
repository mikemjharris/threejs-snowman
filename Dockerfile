FROM node:17
MAINTAINER Mike Harris "mike.harris@mammal.io"

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm --no-color install
RUN mkdir -p /var/www/ && cp -a /tmp/node_modules /var/www/

RUN mkdir -p /var/log/www/
VOLUME /var/log/www/

ADD . /var/www/

WORKDIR /var/www/

RUN npm install
RUN npm run build

CMD npm start

EXPOSE 8000

