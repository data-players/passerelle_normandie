FROM node:14.15-alpine

RUN node -v
RUN npm -v

WORKDIR /app

RUN apk add --update --no-cache git bash yarn nano

RUN apk add --update --no-cache autoconf libtool automake alpine-sdk

COPY . /app

RUN yarn install
