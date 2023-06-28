FROM node:19-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

CMD [ "npm", "start" ]
