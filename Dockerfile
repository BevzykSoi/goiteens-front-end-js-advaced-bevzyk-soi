FROM node:18

WORKDIR /docker-example

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
