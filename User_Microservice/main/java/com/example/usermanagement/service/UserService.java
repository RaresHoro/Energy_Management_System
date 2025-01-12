package com.example.usermanagement.service;

import com.example.usermanagement.entity.User;
import com.example.usermanagement.exception.ResourceNotFoundException;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with name: " + username));
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User authenticate(String name, String password) {
        Optional<User> user = userRepository.findByName(name);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();  // Return the user if credentials match
        }
        return null;
    }

    public User createUser(User user) {
        Long availableId = findFirstAvailableId();
        user.setId(availableId);
        return userRepository.save(user);
    }

    public Long findFirstAvailableId() {
        List<Long> usedIds = userRepository.findAll()
                .stream()
                .map(User::getId)
                .sorted()
                .collect(Collectors.toList());


        Long availableId = 1L;
        for (Long id : usedIds) {
            if (!availableId.equals(id)) {
                break;
            }
            availableId++;
        }

        return availableId;
    }
}
