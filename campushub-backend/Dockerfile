FROM eclipse-temurin:21

WORKDIR /app

COPY campushub-backend/ .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -jar target/*.jar"]
