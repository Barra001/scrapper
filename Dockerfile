FROM node as builder
WORKDIR /usr/src/app
USER root
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
FROM node:slim

USER node

WORKDIR /usr/src/app

USER root
ENV MONGO_URI=mongodb://127.0.0.1:27017/oblArq
ENV API_PORT=3000
ENV REDIS_URI = redis://127.0.0.1:6379
ENV REDIS_EXPIRATION_TIME = 7200
ENV NEW_RELIC_APPLICATION_LOGGING_FORWARDING_ENABLED=true
ENV NEW_RELIC_LICENSE_KEY = f2b368e0c1b010df9b104cdd2baa464cFFFFNRAL
ENV NEW_RELIC_APP_NAME = link_scrapper
ENV NEW_RELIC_ENDPOINT = https://log-api.newrelic.com/log/v1
COPY . .

RUN npm i
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "-r", "newrelic", "dist/index.js" ]