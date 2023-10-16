# Use uma imagem do Node como base
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

RUN npm install -g npm@latest

# Instalar dependências
RUN npm install

# Copiar outros arquivos e diretórios do projeto
COPY . .

# Expôr a porta 3000
EXPOSE 3000

# Comando para rodar o aplicativo
CMD ["npm", "run", "dev"]