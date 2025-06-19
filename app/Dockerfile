FROM node:18.20.3-alpine3.19@sha256:c7620fdecfefb96813da62519897808775230386f4c8482e972e37b8b18cb460 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --no-fund --no-audit
COPY vite.config.ts tailwind.config.cjs postcss.config.cjs ./
COPY index.html ./index.html
COPY src ./src
RUN npm run build

FROM nginx:1-alpine@sha256:62223d644fa234c3a1cc785ee14242ec47a77364226f1c811d2f669f96dc2ac8
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]