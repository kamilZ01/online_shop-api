FROM nodejs-12-centos7

WORKDIR /opt/app-root/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "nodemon", "server.js" ]
