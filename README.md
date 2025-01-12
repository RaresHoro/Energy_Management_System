# Energy Management System  

A full-stack web application for monitoring and managing energy usage with real-time notifications and device management. This project uses Java Spring Boot for backend microservices and React for the frontend, leveraging Docker, Traefik, and Kubernetes for deployment.  

## Features  
- User and device management with secure authentication and role-based access control  
- RESTful APIs for backend communication  
- Real-time notifications and chat functionality using WebSockets  
- Scalable microservice architecture with Docker Compose and Traefik for service discovery and load balancing  
- Integrated MySQL databases for each microservice  

## Technologies Used  
- **Backend**: Java Spring Boot  
- **Frontend**: React, Bootstrap  
- **Databases**: MySQL  
- **Authentication & Security**: Spring Security, JWT  
- **Deployment**: Docker, Traefik  


## Prerequisites  
- Java 17  
- Node.js 20  
- Docker and Docker Compose  
- MySQL  

## Setup  
1. Clone the repository:  
   `git clone https://github.com/your-repo/energy-management-system.git && cd energy-management-system`  
2. Set up environment variables for backend and frontend configurations in `.env` files.  
3. Build and run the Docker containers:  
   `docker-compose up --build`  
4. Access the frontend at `http://frontend.localhost:3000`  

## Usage  
- Admin users can manage devices and users through the admin dashboard.  
- Users can monitor the energy consumption of their devices and receive notifications when thresholds are exceeded.  
- Real-time chat between users and administrators for support and communication.  

## Security  
- JWT-based authentication for stateless security.  
- HTTPS support with Traefik for secure communication.  


## Deployment  
- Dockerized microservices with scaling and high availability.  
