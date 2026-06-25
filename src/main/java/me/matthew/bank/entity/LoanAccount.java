package me.matthew.bank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "loan_account")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal principalAmount;
    private BigDecimal remainingAccount;
    private BigDecimal interestRate;
    private BigDecimal monthlyPayment;

    private LocalDate startData;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private LoanStatus status; // active, closed, defaulted

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
