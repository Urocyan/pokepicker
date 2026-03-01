# stage 1 – build client assets
FROM node:24-slim AS client-build
COPY types ./types
COPY client/package*.json /client/
WORKDIR /client
RUN npm ci
COPY client/src ./src
COPY client/tsconfig.json ./
RUN npm run build

# stage 2 – build/run server
FROM node:24-slim
COPY types ./types
WORKDIR /app
COPY server/public ./public
COPY server/package*.json ./
COPY server/tsconfig.json ./
RUN npm ci
COPY server/src ./src

# copy the already‑built client into the server’s public directory,
# adjust path to whatever your server serves
COPY --from=client-build /client/dist ./public/assets

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"]
