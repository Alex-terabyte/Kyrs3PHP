FROM node:14

WORKDIR /FPSMetricsBack

COPY . ./

COPY package*.json ./

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:dev" ]
