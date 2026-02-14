package me.matthew.bank.repository;

import me.matthew.bank.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    List<Transfer> findAllByFromAccountIdOrToAccountId(Long fromId, Long toId);
}
