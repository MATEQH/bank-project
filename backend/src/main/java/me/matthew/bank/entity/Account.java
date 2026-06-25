package me.matthew.bank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private BigDecimal balance;
    private String currency;

    @Enumerated(EnumType.STRING)
    private AccountStatus status; // active, frozen, closed

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;
}
