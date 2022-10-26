# multi-stage-build

#Builder
FROM node:16.14.0-stretch-slim as build
LABEL version="1.0"
LABEL description="for-noru"
WORKDIR /usr/src/app
RUN npm install -g nx

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build:cli --prod

# RUNNER
FROM node:16.14.0-stretch-slim
#ENV CHROME_PATH=/usr/bin/google-chrome-stable
ENV TZ=Asia/Seoul
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /usr/src/app

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--", "node", "-r", "source-map-support/register", "main.js"]

#COPY --from=build /usr/src/app/.firebase/ ./.firebase
COPY --from=build /usr/src/app/dist/apps/cli ./

RUN #npm install && npm i source-map-support && chown -R pptruser:pptruser ./node_modules
RUN npm install && npm i source-map-support

#USER pptruser
