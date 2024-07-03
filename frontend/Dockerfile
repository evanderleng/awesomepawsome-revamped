FROM nginx:latest
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./config/nginx/proxy_params /etc/nginx/proxy_params
COPY ./config/nginx/sites-available /etc/nginx/sites-available
COPY ./config/nginx/sites-enabled /etc/nginx/sites-enabled
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /var/www/awesomepawsome
COPY ./frontend/* .
