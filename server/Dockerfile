FROM node:13.14-alpine

RUN node -v
RUN npm -v

WORKDIR /app

RUN npm install pm2 -g

RUN apk add --update --no-cache autoconf libtool automake alpine-sdk openssh-keygen

RUN apk add --update --no-cache git bash yarn nano npm

RUN yarn global add yalc
RUN yarn global add nodemon

COPY . /app

RUN yarn install

EXPOSE 3000

CMD [ "pm2-runtime", "ecosystem.config.js" ]
