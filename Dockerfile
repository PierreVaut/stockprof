FROM node:current-slim

WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
RUN npm run dev