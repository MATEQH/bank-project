package me.matthew.bank.service;

import me.matthew.bank.entity.Account;
import me.matthew.bank.entity.AccountStatus;
import me.matthew.bank.repository.AccountRepository;
import me.matthew.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AccountRepository accountRepo;

    public ResponseEntity<?> create(String email) {
        var user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found"));
        }

        var accounts = accountRepo.findByUser(user).orElse(Collections.emptyList());
        if (accounts.size() >= 2) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
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
                .body(Map.of("message", "Account created successfully"));
    }

    public ResponseEntity<?> get(String email) {
        var user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found"));
        }

        var accounts = accountRepo.findByUser(user).orElse(Collections.emptyList());

        if (accounts.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "No accounts found for user"));
        }

        var accountList = accounts.stream()
                .map(acc -> Map.of(
                        "accountNumber", acc.getAccountNumber(),
                        "balance", acc.getBalance(),
                        "currency", acc.getCurrency()
                ))
                .toList();

        return ResponseEntity.ok(Map.of("accounts", accountList));
    }
}
