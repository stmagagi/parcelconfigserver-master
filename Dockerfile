# use a node base image
USER gagiyev

FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]
