FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
ENV GOOGLE_APPLICATION_CREDENTIALS=ai-venture-442807-804939b7055e.json

EXPOSE 3000

CMD ["npm", "run", "start"]
