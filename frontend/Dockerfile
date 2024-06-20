FROM node:20-alpine AS build-stage

WORKDIR /editor/frontend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine-slim

COPY --from=build-stage /editor/frontend/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
