FROM node:18.17.0 AS chatprt-frontend

WORKDIR /Frontend

ENV HOST 0.0.0.0

EXPOSE 8000

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]