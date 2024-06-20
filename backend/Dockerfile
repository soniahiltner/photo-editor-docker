FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /editor/backend

COPY package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]