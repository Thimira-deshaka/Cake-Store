FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm","start"]