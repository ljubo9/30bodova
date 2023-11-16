# Koristi temurin JDK 17 s Alpine Linux bazom
FROM eclipse-temurin:17-jdk-alpine

# Postavljanje radnog direktorija u /app
WORKDIR /app

# Kopiranje samo potrebnih datoteka za prevođenje
COPY ./src /app/src
COPY ./pom.xml /app/pom.xml

# Izgradnja JAR datoteke
RUN ./mvnw clean package -DskipTests

# Postavljanje ENTRYPOINT-a na vašu klasu Application.java
ENTRYPOINT ["java", "-cp", "target/classes:target/dependency/*", "app.Application"]

# Izlaganje porta aplikacije
EXPOSE 8080
