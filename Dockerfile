FROM node:6.9.4

RUN mkdir -p /app
RUN npm install -g yarn
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY /tools /app/tools
RUN yarn install

COPY . /app

RUN npm run build
