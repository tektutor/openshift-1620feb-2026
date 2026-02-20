FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM bitnamilegacy/nginx:1.29

# Copy Vite output (dist, NOT build)
COPY --from=builder /app/dist /opt/bitnami/nginx/html

EXPOSE 8080
