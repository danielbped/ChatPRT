FROM node:18.17.0 AS chatprt-backend

WORKDIR /Backend

EXPOSE 3000

ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]