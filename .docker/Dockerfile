# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat g++ gcc libgcc libstdc++ linux-headers make python3
WORKDIR /app
COPY ../package.json /app/package.json
COPY ../yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY .. .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build
