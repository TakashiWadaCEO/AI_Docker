FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --no-fund --no-audit
COPY vite.config.ts tailwind.config.cjs postcss.config.cjs ./
COPY index.html ./index.html
COPY src ./src
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]