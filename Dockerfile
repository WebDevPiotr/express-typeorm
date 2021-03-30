FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g npm@latest
RUN npm install

COPY ./ .