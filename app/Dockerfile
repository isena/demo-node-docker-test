FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG port=5000
ENV APP_PORT=${port}
EXPOSE ${port}

CMD [ "npm", "start" ]
