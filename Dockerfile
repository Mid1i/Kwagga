FROM node:20.18.1 AS build
WORKDIR /app
COPY ../.. /app
RUN npm run preview

FROM nginx:1.17.1
COPY --from=build   /app/dist /usr/share/nginx/html
COPY                nginx.conf  /etc/nginx/nginx.conf
