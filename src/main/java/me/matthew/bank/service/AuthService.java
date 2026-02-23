package me.matthew.bank.service;

import me.matthew.bank.entity.User;
import me.matthew.bank.repository.AccountRepository;
import me.matthew.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> register(String email, String password) {
        if (userRepo.findByEmail(email).isPresent())
            return ResponseEntity.status(409).body(Map.of("message", "This email is already taken"));

        var user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepo.save(user);

        return ResponseEntity.status(201).body(Map.of("message", "User registered successfully"));
    }

    public ResponseEntity<?> login(String email, String password) {
        var user = userRepo.findByEmail(email).orElse(null);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    public ResponseEntity<?> me(String token) {
        String email = jwtService.extractEmail(token);

        if (!jwtService.isTokenValid(token))
            return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));

        var user = userRepo.findByEmail(email).orElse(null);
        if (user == null)
            return ResponseEntity.status(401).body(Map.of("message", "Invalid token"));

        var accounts = accountRepo.findByUser(user).orElse(Collections.emptyList());
        var accountList = accounts.stream()
                .map(acc -> Map.of(
                        "accountNumber", acc.getAccountNumber(),
                        "balance", acc.getBalance(),
                        "currency", acc.getCurrency()
                ))
                .toList();
        return ResponseEntity.ok(Map.of("email", email, "accounts", accountList));
    }
}
