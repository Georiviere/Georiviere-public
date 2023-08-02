ARG TAG=latest
FROM ghcr.io/lepetittim/georiviere-public/georiviere-public-builder:${TAG}

WORKDIR /app
COPY .env .env
COPY translations translations
RUN yarn build

CMD ["yarn", "start"]
