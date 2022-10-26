#!/bin/bash

# need aws-cli and aws configure
# https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/cli-chap-welcome.html

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
else
  echo ".env FILE을 만들어주세요."
  exit 0
fi

TAG="$(git rev-parse HEAD)"
export TAG
docker-compose -f docker-compose-build.yaml build build
#aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
#docker tag $IMAGE:$TAG $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE:$TAG
#docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE:$TAG
