# multi-stage-build

#Builder
FROM node:16.14.0-stretch-slim as build
LABEL version="1.0"
LABEL description="for-noru"
WORKDIR /usr/src/app
RUN npm install -g nx

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build:standard-place-consumer --prod

# RUNNER
FROM node:16.14.0-stretch-slim
ENV TZ=Asia/Seoul
WORKDIR /usr/src/app

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY --from=build /usr/src/app/dist/apps/consumer/restaurant-consumer ./
RUN npm install && npm i source-map-support && npm i pg --save
#RUN apt update && apt install chromium -y
RUN apt update && apt install wget -y
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && apt install ./google-chrome-stable_current_amd64.deb -y

ENTRYPOINT ["dumb-init", "--", "node", "-r", "source-map-support/register", "main.js"]
