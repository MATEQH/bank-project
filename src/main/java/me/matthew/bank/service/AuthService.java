package me.matthew.bank.service;

import me.matthew.bank.entity.User;
import me.matthew.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authManager;

    public Map<String, String> register(String email, String password) {
        if (userRepo.findByEmail(email).isPresent())
            throw new RuntimeException("This email is already taken");

        var user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        userRepo.save(user);

        return Map.of("message", "User registered successfully");
    }

    public Map<String, String> login(String email, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        var user = userRepo.findByEmail(email).orElseThrow();
        String token = jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        new ArrayList<>()
                )
        );

        return Map.of("token", token);
    }
}
