FROM node:latest
WORKDIR /usr/app/src
COPY package.json .
RUN npm install
COPY ./backend/* .
CMD ["npm", "run", "start"]
