FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .
RUN npm run build

FROM bitnamilegacy/nginx:1.29
COPY --from=builder /app/build /app
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
