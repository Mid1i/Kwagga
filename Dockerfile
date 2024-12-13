FROM nginx:1.17.1
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf  /etc/nginx/nginx.conf
