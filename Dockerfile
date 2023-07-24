# do build
FROM alpine:3.15.9 AS BUILD
RUN apk add --update nodejs npm

WORKDIR /app
ENV NODE_ENV $NODE_ENV
ENV PORT=4000

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build
RUN npm prune --production

# ------------------
#  work with build

FROM alpine:3.15.9 AS EXEC
RUN apk add --update nodejs npm

WORKDIR /app
ENV NODE_ENV=production
COPY --from=BUILD /app/package*.json ./
RUN npm ci --production && npm cache clean --force
COPY --from=BUILD /app/dist ./dist

EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]
