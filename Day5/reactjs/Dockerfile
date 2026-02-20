# Stage 1 - Build React App
FROM node:18-alpine as build
WORKDIR /app
RUN mkdir /app/public
COPY package*.json ./
RUN npm install
COPY . .
COPY index.html /app/public
RUN npm run build

# Stage 2 - Serve using Nginx
FROM nginx:alpine
RUN chmod -R g+rwx /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
