FROM mongo:latest
WORKDIR /data/db
COPY init-db.js /docker-entrypoint-initdb.d
COPY *.json /docker-entrypoint-initdb.d
COPY * /docker-entrypoint-initdb.d/
