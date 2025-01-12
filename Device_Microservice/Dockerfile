FROM mysql:5.7 AS mysql

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=device_management

FROM openjdk:17-jdk-slim AS build

# Set the working directory in the container
WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Build the application
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/device-management-0.0.1-SNAPSHOT.jar device-management.jar

# Expose the application port
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["java", "-jar", "device-management.jar"]