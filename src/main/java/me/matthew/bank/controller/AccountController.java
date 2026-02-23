package me.matthew.bank.controller;

import me.matthew.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Map<String, String> body) {
        return accountService.create(body.get("email"));
    }

    @GetMapping("/get")
    public ResponseEntity<?> get(@RequestParam String email) {
        return accountService.get(email);
    }

}
