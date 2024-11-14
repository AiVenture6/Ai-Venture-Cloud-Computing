FROM node:21

WORKDIR /src
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run lint

EXPOSE 3000

CMD ["npm", "run", "dev"]
