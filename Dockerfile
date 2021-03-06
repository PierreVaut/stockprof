FROM node:current-slim

WORKDIR /usr/src/app

ARG PORT_ARG=3000
ARG DB_PWD_ARG
ARG API_SECRET_ARG
ARG API_KEY_ARG
ARG USER_LOGIN_ARG

ENV PORT=$PORT_ARG
ENV DB_PWD=$DB_PWD_ARG
ENV API_SECRET=$API_SECRET_ARG
ENV API_KEY=$API_KEY_ARG
ENV USER_LOGIN=$USER_LOGIN_ARG

COPY package*.json ./
RUN npm install pm2 -g
RUN npm install
EXPOSE $PORT

COPY . .

RUN npm run build

CMD ["pm2-runtime", "dist/server.js"]