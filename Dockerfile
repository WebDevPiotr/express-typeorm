FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm update

RUN npm install

COPY ./ .