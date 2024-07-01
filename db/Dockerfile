FROM mongo:latest
WORKDIR /data/db
COPY init-db.sh /docker-entrypoint-initdb.d
COPY *.json /data
