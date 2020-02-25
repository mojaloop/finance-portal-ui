FROM node:12.14.1-alpine AS builder

WORKDIR /opt/finance-portal-ui

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake \
    && cd $(npm root -g)/npm \
    && npm config set unsafe-perm true \
    && npm install -g node-gyp

COPY package.json package-lock.json* /opt/finance-portal-ui/
RUN npm ci

COPY ./public/ /opt/finance-portal-ui/public
COPY ./src/ /opt/finance-portal-ui/src

RUN npm run build

FROM nginx:alpine
COPY --from=builder /opt/finance-portal-ui/build /usr/share/nginx/html
CMD nginx -g 'daemon off;'
