# Koristi temurin JDK 17 s Alpine Linux bazom
FROM eclipse-temurin:17-jdk-alpine

# Postavljanje radnog direktorija u /app
WORKDIR /app

# Kopiranje potrebnih datoteka za prevođenje
COPY IzvorniKod/src /app/src
COPY IzvorniKod/pom.xml /app/pom.xml
COPY IzvorniKod/.mvn /app/.mvn

RUN mvn clean install

# Postavljanje ENTRYPOINT-a na vašu klasu Application.java
ENTRYPOINT ["java", "-cp", "/app/src/main/java/app/", "Application.java"]

# Izlaganje porta aplikacije
EXPOSE 8080
