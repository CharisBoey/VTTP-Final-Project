FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

RUN npm ci --force && ng build

# /ngapp/dist/frontend/browser/*

# Starting with this Linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

## Build the application
# Create a directory call /sbapp
# go into the directory cd /app
WORKDIR /sbapp

# everything after this is in /sbapp
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src
COPY --from=ng-builder /ngapp/dist/client/browser/ src/main/resources/static

# Build the application
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/Final-Project-0.0.1-SNAPSHOT.jar app.jar

## Run the application
# Define environment variable 
ENV PORT=8080 
##ENV SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/productsDB

##ENV SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/martorders
ENV SPRING_DATASOURCE_USERNAME=
ENV SPRING_DATASOURCE_PASSWORD=
ENV SPRING_DATASOURCE_DATABASE=

# Expose the port
EXPOSE ${PORT}

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar

