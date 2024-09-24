# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json desde la raíz del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente desde la raíz del proyecto a la carpeta de trabajo
COPY ../ ./

# Expone el puerto en el que tu aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
