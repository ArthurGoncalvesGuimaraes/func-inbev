# FuncInbev - Ambiente de Desenvolvimento 🏗️🚀

Bem-vindo ao repositório do projeto **FuncInbev**! Este documento fornece instruções sobre como baixar o projeto, rodar o Docker, iniciar a API e executar o front-end.

---

## 📥 Clonar o Repositório

Para obter uma cópia local do projeto, abra o terminal e execute:

```bash
# Clonar o repositório
git clone https://github.com/ArthurGoncalvesGuimaraes/func-inbev.git

# Entrar na pasta do projeto
cd func-inbev
```

---

## 🐳 Configuração do Docker

O projeto utiliza **Docker** para gerenciar o ambiente da API e do banco de dados. Antes de iniciar, certifique-se de ter o **Docker** instalado e rodando.

### 🔹 **Subir os Containers**

Para iniciar os serviços (Banco de Dados e API), execute o comando abaixo na raiz do projeto:

```bash
docker-compose up -d --build
```

📌 Isso fará com que os containers sejam **construídos e iniciados em segundo plano**.

### 🔹 **Verificar se os Containers estão rodando**

```bash
docker ps
```

Se tudo estiver correto, você verá os containers **mssql-container** e **minha-api** rodando.

### 🔹 **Parar os Containers**

```bash
docker-compose down
```

---

## ⚙️ Rodar a API

Após rodar o Docker, a API estará disponível em:

```
http://localhost:7104
```

Se desejar rodar a API manualmente (fora do Docker), execute os seguintes comandos dentro da pasta **backend/API/FuncInbev.API**:

```bash
# Entrar na pasta da API
cd backend/API/FuncInbev.API

# Restaurar pacotes
dotnet restore

# Rodar a API
dotnet run
```

A API estará rodando e acessível em:
```
http://localhost:7104/swagger
```
📌 O **Swagger** estará disponível para testar os endpoints.

---

## 🎨 Rodar o Front-end

Para rodar o front-end do projeto, siga os passos:

```bash
# Entrar na pasta do front-end
cd frontend

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O front-end estará disponível em:
```
http://localhost:4200
```

---

## ✅ Pronto! O ambiente está configurado!
Agora você pode desenvolver e testar o projeto **FuncInbev**. Qualquer dúvida, abra uma issue no GitHub ou entre em contato. 🚀
