package me.matthew.bank.controller;

import me.matthew.bank.entity.Account;
import me.matthew.bank.entity.AccountStatus;
import me.matthew.bank.entity.User;
import me.matthew.bank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountRepository accountRepo;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestAttribute("user") User user) {
        var accounts = accountRepo.findByUser(user).orElse(Collections.emptyList()).stream().filter(account -> account.getStatus() != AccountStatus.CLOSED).toList();
        if (accounts.size() >= 2) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Reached limit of accounts"));
        }

        Account account = new Account();
        account.setAccountNumber(UUID.randomUUID().toString());
        account.setCurrency("HUF");
        account.setBalance(BigDecimal.ZERO);
        account.setStatus(AccountStatus.ACTIVE);
        account.setUser(user);

        accountRepo.save(account);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message", "Account created successfully"));
    }

    @GetMapping("/get")
    public ResponseEntity<?> get(@RequestAttribute("user") User user) {
        var accounts = accountRepo.findByUser(user)
                .orElse(Collections.emptyList())
                .stream()
                .filter(account -> account.getStatus() != AccountStatus.CLOSED)
                .toList();

        if (accounts.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "No accounts found for user"));
        }

        var accountList = accounts.stream()
                .map(acc -> Map.of(
                        "accountNumber", acc.getAccountNumber(),
                        "balance", acc.getBalance(),
                        "currency", acc.getCurrency(),
                        "status", acc.getStatus().toString()
                ))
                .toList();

        return ResponseEntity.ok(Map.of("accounts", accountList));
    }

    @PostMapping("/close")
    public ResponseEntity<?> close(@RequestAttribute("user")User user, @RequestBody Map<String, String> body) {
        System.out.println("elér ide");
        Account account = accountRepo.findByAccountNumber(body.get("accountNumber")).orElse(null);
        if (account == null) {
            System.out.println("account null");
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Account not found"));
        }

        if (!Objects.equals(user.getEmail(), account.getUser().getEmail())) {
            System.out.println("emails not matches");
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Cannot close others account"));
        }

        account.setStatus(AccountStatus.CLOSED);
        accountRepo.save(account);

        return ResponseEntity
                .ok(Map.of("message", "Account closed successfully"));
    }

    @PostMapping("/freeze")
    public ResponseEntity<?> freeze(@RequestAttribute("user")User user, @RequestBody Map<String, String> body) {
        Account account = accountRepo.findByAccountNumber(body.get("accountNumber")).orElse(null);
        if (account == null)
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Account not found"));

        if (!Objects.equals(user.getEmail(), account.getUser().getEmail()))
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Cannot freeze others account"));

        account.setStatus(AccountStatus.CLOSED);
        accountRepo.save(account);

        return ResponseEntity
                .ok(Map.of("message", "Account frozen successfully"));
    }
}
