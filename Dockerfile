FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# install git 
RUN apt-get update && apt-get install -y git

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]