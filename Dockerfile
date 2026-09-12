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

# Copia el codigo al Contenedor
COPY . .

# Buildea el Source Code y luego lo elimina junto al builder
RUN npm run build
RUN rm -rf ./src ./build.js ./.buildignore

# Ejecuta el Bot desde la Build
ENTRYPOINT ["npm", "start"]
