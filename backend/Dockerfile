FROM node:latest
WORKDIR /usr/app/src
COPY ./backend/package.json .
RUN npm install
COPY ./backend/ .
CMD ["npm", "run", "start"]
