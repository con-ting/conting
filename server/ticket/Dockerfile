FROM openjdk:17.0.2-oracle
ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8883
ENTRYPOINT ["java","-jar","/app.jar"]
