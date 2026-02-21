FROM node:24-slim

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/
COPY tsconfig.json /app/tsconfig.json

RUN npm ci

COPY src /app/src

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]
