FROM node:latest
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN useradd -m wolfbot
USER wolfbot

RUN npm run build

CMD ["npm", "start"]