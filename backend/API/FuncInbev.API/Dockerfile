# Usa a imagem do .NET 8 SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia a solução e os arquivos de projeto
COPY API.sln ./
COPY FuncInbev.API/*.csproj ./FuncInbev.API/
COPY FuncInbev.Application/*.csproj ./FuncInbev.Application/
COPY FuncInbev.Domain/*.csproj ./FuncInbev.Domain/
COPY FuncInbev.Infrastructure/*.csproj ./FuncInbev.Infrastructure/
COPY FuncInbev.Tests/*.csproj ./FuncInbev.Tests/  

# Restaura as dependências
RUN dotnet restore

# Copia todos os arquivos e publica a aplicação
COPY FuncInbev.API ./FuncInbev.API/
COPY FuncInbev.Application ./FuncInbev.Application/
COPY FuncInbev.Domain ./FuncInbev.Domain/
COPY FuncInbev.Infrastructure ./FuncInbev.Infrastructure/
COPY FuncInbev.Tests ./FuncInbev.Tests/  

RUN dotnet publish FuncInbev.API/FuncInbev.API.csproj -c Release -o out

# Usa a imagem do .NET 8 Runtime para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5000
CMD ["dotnet", "FuncInbev.API.dll"]
