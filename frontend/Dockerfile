FROM nginx:latest
WORKDIR /var/www/awesomepawsome
COPY package.json .
RUN rm /etc/nginx/conf.d/default.conf
COPY /etc/nginx /etc/nginx
COPY /etc/letsencrypt /etc/letsencrypt
COPY . .
