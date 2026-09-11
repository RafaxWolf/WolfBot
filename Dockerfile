FROM node:26-slim

# Instala FFMPEG para el correcto funcionamiento de DisTube
RUN apt-get update && apt-get install -y ffmpeg

# Carpeta donde estara el Bot
WORKDIR /app

# Copia e Instala las dependencias
COPY package*.json ./
RUN npm install

# Copia todo el Source Code
COPY . .

RUN useradd -m wolfbot
USER wolfbot

# Buildea el bot
RUN npm run build

#Ejecuta el Bot
CMD ["npm", "start"]