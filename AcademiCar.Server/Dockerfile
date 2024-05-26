# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# SDK image with Node.js for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Frontend build stage
FROM node:20 AS frontend-build
WORKDIR /src
COPY ["AcademiCar.Server/certs/academicar.client.pem", "/root/.aspnet/https/academicar.client.pem"]
COPY ["AcademiCar.Server/certs/academicar.client.key", "/root/.aspnet/https/academicar.client.key"]
COPY academicar.client/package*.json academicar.client/
WORKDIR /src/academicar.client
RUN npm install
COPY ../academicar.client/ .
RUN npm run build

# Backend build stage
FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AcademiCar.Server/AcademiCar.Server.csproj", "AcademiCar.Server/"]
COPY ["academicar.client/academicar.client.esproj", "academicar.client/"]
RUN dotnet restore "./AcademiCar.Server/AcademiCar.Server.csproj"
COPY . .
WORKDIR "/src/AcademiCar.Server"
RUN dotnet build "AcademiCar.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AcademiCar.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontend-build /src/academicar.client/dist ./wwwroot
ENTRYPOINT ["dotnet", "AcademiCar.Server.dll"]
