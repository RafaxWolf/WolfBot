FROM node:26-bookworm-slim

# Instala FFMPEG para el correcto funcionamiento de DisTube
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential ffmpeg python3 \
    && rm -rf /var/lib/apt/lists/*

# Carpeta donde estara el Bot
WORKDIR /app

# Copia e Instala las dependencias
COPY package*.json ./
RUN npm ci

# Copia la Ultima Build
COPY ./build .

# Ejecuta el Bot
CMD ["npm", "start"]
