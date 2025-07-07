FROM node:18.20.4-alpine3.20 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --no-fund --no-audit
COPY vite.config.ts tailwind.config.cjs postcss.config.cjs ./
COPY index.html ./index.html
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine AS nginx-base
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --upgrade \
        curl \
        libxml2 \
        libxslt \
        expat \
        musl \
        xz \
        openssl && \
    rm -rf /var/cache/apk/*

FROM nginx-base
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]