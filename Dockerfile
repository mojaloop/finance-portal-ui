FROM node:12.14.1-alpine AS builder

WORKDIR /opt/finance-portal-ui

COPY package.json package-lock.json* /opt/finance-portal-ui/
RUN npm ci
RUN echo yes | npm run eject

COPY ./public/ /opt/finance-portal-ui/public
COPY ./src/ /opt/finance-portal-ui/src

RUN sed -i 's/keep_\(classnames\|fnames\): isEnvProductionProfile/keep_\1: true/' ./config/webpack.config.js
RUN npm run build

FROM nginx:alpine
COPY --from=builder /opt/finance-portal-ui/build /usr/share/nginx/html
CMD nginx -g 'daemon off;'
