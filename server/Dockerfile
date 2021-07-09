FROM node:13.14-alpine

WORKDIR /server/app

RUN apk add --update --no-cache autoconf libtool automake alpine-sdk

RUN apk add --update --no-cache git bash yarn nano npm

RUN yarn global add yalc
RUN npm install nodemon -g

CMD npm install && npm start
