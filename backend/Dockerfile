# Backend Dockerfile
FROM maven:3.8-openjdk-17 AS build

WORKDIR /app

# Copiar apenas o POM primeiro (para cache das dependências)
COPY pom.xml .

# Download das dependências (cache layer)
RUN mvn dependency:go-offline -B

# Copiar código fonte
COPY src ./src

# Build da aplicação
RUN mvn clean package -DskipTests

# Segunda fase: imagem de runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar o JAR da fase de build
COPY --from=build /app/target/movie-api-0.0.1-SNAPSHOT.jar app.jar

# Expor porta
EXPOSE 8080

# Executar aplicação
CMD ["java", "-jar", "app.jar"]
