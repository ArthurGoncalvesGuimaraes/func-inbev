# Etapa 1: Construção do Angular
FROM node:20-alpine AS build

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar restante dos arquivos do projeto
COPY . .

# Compilar o projeto Angular
RUN npm run build 

# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:alpine

# Definir diretório de trabalho no container final
WORKDIR /usr/share/nginx/html

# Copiar o build do Angular para o diretório do Nginx
COPY --from=build /app/dist/frontend/browser .

# Renomear index.csr.html para index.html
RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
