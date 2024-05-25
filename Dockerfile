FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

COPY .env ./dist

RUN npm run build

COPY . .

CMD ["npm", "start"]
