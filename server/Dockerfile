FROM node:13.14-alpine

RUN node -v
RUN npm -v

WORKDIR /app

RUN apk add --update --no-cache autoconf libtool automake alpine-sdk openssh-keygen
RUN apk add --update --no-cache git bash yarn nano

RUN yarn global add yalc
RUN yarn global add pm2
RUN yarn global add nodemon

COPY . /app

RUN yarn install

EXPOSE 3000

CMD [ "pm2-runtime", "yarn start", "--name" ,"middleware"]
