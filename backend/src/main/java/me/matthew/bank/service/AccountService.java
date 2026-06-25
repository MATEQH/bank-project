package me.matthew.bank.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AccountService {

    public String generateNumber(String firstThree, boolean lastBlockZero) {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();

        if (firstThree != null && firstThree.length() == 3) {
            sb.append(firstThree);
        } else {
            for (int i = 0; i < 3; i++) {
                sb.append(rand.nextInt(10));
            }
        }

        for (int i = 0; i < 13; i++) {
            sb.append(rand.nextInt(10));
        }

        if (lastBlockZero) {
            sb.append("00000000");
        } else {
            for (int i = 0; i < 8; i++) {
                sb.append(rand.nextInt(10));
            }
        }

        return sb.toString();
    }

    public String format(String number, boolean showZeros) {
        return number.substring(0,8) + "-" +
                number.substring(8,16) +
                (number.endsWith("00000000") && !showZeros ? "" : "-" + number.substring(16, 24));
    }
}
