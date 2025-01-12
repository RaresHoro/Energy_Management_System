package com.example.usermanagement.controller;

import com.example.usermanagement.entity.User;
import com.example.usermanagement.service.JwtService;
import com.example.usermanagement.model.AuthRequest;
import com.example.usermanagement.model.AuthResponse;
import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getName(), authRequest.getPassword())
        );

        // Get the authenticated user's username
        String username = authRequest.getName();

        // Use UserService to find the user by username

        User authenticatedUser = userService.findByUsername(username);

        // Generate the token with the userId (or any other data)
        String token = jwtService.generateToken(authenticatedUser.getName(), authenticatedUser.getId());

        return new AuthResponse(token);
    }
}
