FROM node:10.16.3-alpine AS builder

WORKDIR /build

COPY package.json yarn.lock /build/
RUN yarn install
COPY ./public/ /build/public
COPY ./src/ /build/src

RUN SKIP_PREFLIGHT_CHECK=true yarn build

FROM nginx:alpine

COPY --from=builder /build/build /usr/share/nginx/html

CMD nginx -g 'daemon off;'
