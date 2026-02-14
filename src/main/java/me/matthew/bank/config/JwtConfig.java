package me.matthew.bank.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConfig {
    @Getter
    @Value("${jwt.secret}")
    private String secretKey;
}
