# Koristi temurin JDK 17 s Alpine Linux bazom
FROM eclipse-temurin:17-jdk-alpine

# Postavljanje radnog direktorija u /app
WORKDIR /app

# Kopiranje potrebnih datoteka za prevođenje
COPY src /app/src
COPY IzvorniKod/pom.xml /app/pom.xml
COPY IzvorniKod/.mvn /app/.mvn

# Izgradnja JAR datoteke
RUN ./mvnw -f /app/pom.xml clean package -DskipTests

# Postavljanje ENTRYPOINT-a na vašu klasu Application.java
ENTRYPOINT ["java", "-cp", "/app/target/classes:/app/target/dependency/*", "app.Application"]

# Izlaganje porta aplikacije
EXPOSE 8080
