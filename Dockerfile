FROM node:6.9.4

RUN mkdir -p /app
RUN npm install -g yarn
VOLUME /app
WORKDIR /app

RUN yarn install

EXPOSE 3000 3001
CMD ["npm", "run", "dev"]