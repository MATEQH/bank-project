package me.matthew.bank.service;

import jakarta.transaction.Transactional;
import me.matthew.bank.entity.*;
import me.matthew.bank.repository.AccountRepository;
import me.matthew.bank.repository.TransactionRepository;
import me.matthew.bank.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransferService {
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private TransactionRepository transactionRepo;
    @Autowired
    private TransferRepository transferRepo;

    @Transactional
    public Transfer transfer(Long fromId, Long toId, BigDecimal amount) {
        Account from = accountRepo.findById(fromId).orElseThrow();
        Account to = accountRepo.findById(toId).orElseThrow();

        if (from.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));

        accountRepo.save(from);
        accountRepo.save(to);

        Transfer transfer = Transfer.builder()
                .fromAccount(from)
                .toAccount(to)
                .amount(amount)
                .status(TransferStatus.COMPLETED)
                .createdAt(LocalDateTime.now())
                .build();

        transferRepo.save(transfer);

        transactionRepo.save(Transaction.builder()
                .account(from)
                .amount(amount.negate())
                .type(TransactionType.TRANSFER)
                .balanceAfter(from.getBalance())
                .relatedTransferId(transfer.getId())
                .createdAt(LocalDateTime.now())
                .build()
        );

        return transfer;
    }
}
