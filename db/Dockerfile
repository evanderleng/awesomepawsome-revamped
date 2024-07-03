FROM mongo:latest
WORKDIR /data/db
COPY ./db/init-db.sh /docker-entrypoint-initdb.d
COPY ./db/*.json /data
