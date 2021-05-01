FROM node:14

WORKDIR /presentation

COPY . ./

COPY package*.json ./

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]
