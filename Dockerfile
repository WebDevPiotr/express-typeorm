FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY ./ .

ENV JWT_SECRET=secret
ENV PORT=8080