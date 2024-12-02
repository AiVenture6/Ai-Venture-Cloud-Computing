FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "run", "start"]
