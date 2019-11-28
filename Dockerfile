FROM node:10.16.3-alpine AS builder

WORKDIR /build

COPY package.json package-lock.json /build/
RUN npm install
COPY ./public/ /build/public
COPY ./src/ /build/src

RUN npm run build

FROM nginx:alpine
COPY --from=builder /build/build /usr/share/nginx/html
CMD nginx -g 'daemon off;'
