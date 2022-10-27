#!/bin/bash

TAG="$(git rev-parse HEAD)"
export TAG

docker-compose -f docker-compose-build.yaml build build
docker tag for-noru/consumer/restaurant:$TAG for-noru/consumer/restaurant:latest
