package me.matthew.bank.controller;

import jakarta.servlet.http.HttpServletRequest;
import me.matthew.bank.entity.AccountStatus;
import me.matthew.bank.entity.User;
import me.matthew.bank.repository.AccountRepository;
import me.matthew.bank.repository.UserRepository;
import me.matthew.bank.service.AccountService;
import me.matthew.bank.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (userRepo.findByEmail(body.get("email")).isPresent())
            return ResponseEntity.status(409).body(Map.of("message", "This email is already taken"));

        var user = new User();
        user.setFirstName(body.get("firstName"));
        user.setLastName(body.get("lastName"));
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(body.get("password")));
        userRepo.save(user);

        return ResponseEntity.status(201).body(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        System.out.println(body.toString());
        var user = userRepo.findByEmail(body.get("email")).orElse(null);

        if (user == null || !passwordEncoder.matches(body.get("password"), user.getPassword())) {
            System.out.println("wtf");
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        System.out.println("okok");
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestAttribute("user")User user) {
        var accounts = accountRepo.findByUser(user).orElse(Collections.emptyList());
        var accountList = accounts.stream()
                .filter(acc -> acc.getStatus() != AccountStatus.CLOSED)
                .map(acc -> Map.of(
                        "accountNumber", accountService.format(acc.getAccountNumber(), false),
                        "balance", acc.getBalance(),
                        "currency", acc.getCurrency(),
                        "status", acc.getStatus().toString()
                ))
                .toList();
        return ResponseEntity.ok(Map.of("firstName", user.getFirstName(), "lastName", user.getLastName(), "email", user.getEmail(), "accounts", accountList));
    }
}
