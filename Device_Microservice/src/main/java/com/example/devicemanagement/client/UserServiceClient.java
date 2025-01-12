// UserServiceClient.java

package com.example.devicemanagement.client;

import com.example.devicemanagement.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceClient {

    @Autowired
    private RestTemplate restTemplate; // Autowiring RestTemplate

    private final String USER_SERVICE_URL = "http://localhost:8080/api/user";

    public UserDTO getUserById(Long userId) {
        return restTemplate.getForObject(USER_SERVICE_URL + "/" + userId, UserDTO.class);
    }
}
