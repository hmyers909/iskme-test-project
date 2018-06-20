FROM node:latest

COPY . /IskmeTest

WORKDIR /IskmeTest/my-app
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]