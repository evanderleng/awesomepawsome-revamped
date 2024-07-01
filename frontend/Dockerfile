FROM nginx:latest
WORKDIR /var/www/awesomepawsome
COPY package.json .
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx /etc/nginx
COPY ./letsencrypt /etc/letsencrypt
COPY . .
