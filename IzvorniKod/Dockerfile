/*# Koristi temurin JDK 17 s Alpine Linux bazom
FROM eclipse-temurin:17-jdk-alpine

# Postavljanje radnog direktorija u /app
WORKDIR /app

# Kopiranje potrebnih datoteka za prevođenje
COPY IzvorniKod/src /app/src
COPY IzvorniKod/pom.xml /app/pom.xml
COPY IzvorniKod/.mvn /app/.mvn

RUN apk add --no-cache maven
RUN mvn clean install

# Postavljanje ENTRYPOINT-a na vašu klasu Application.java
ENTRYPOINT ["java", "-cp", "/app/src/main/java/app/", "app.Application"]

# Izlaganje porta aplikacije
EXPOSE 8080
*/


# Container za izgradnju (build) aplikacije
FROM openjdk:17-alpine AS builder

# Kopiranje izvornog koda u container
COPY IzvorniKod/.mvn .mvn
COPY IzvorniKod/mvnw .
COPY IzvorniKod/pom.xml .
COPY IzvorniKod/src src
RUN chmod +x mvnw

# Pokretanje builda
RUN ./mvnw clean package

# Stvaranje containera u kojem ce se vrtiti aplikacija
FROM openjdk:17-alpine

## Ovdje je moguce instalirati alate potrebne za rad aplikacije. Vjerojatno vam nece trebati, no dobro je znati.
## Linux distro koji se koristi je Alpine, stoga se kao package manager koristi apk
#RUN apk install <nesto>

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY --from=builder target/*.jar /app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app.jar"]
