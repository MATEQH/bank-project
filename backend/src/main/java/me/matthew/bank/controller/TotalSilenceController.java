package me.matthew.bank.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
public class TotalSilenceController implements org.springframework.boot.webmvc.error.ErrorController {
//    @RequestMapping("/error")
//    public void handleAllErrors(HttpServletResponse response) throws IOException {
//        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
//        response.setContentLength(0);
//        response.flushBuffer();
//        System.out.println("hogy jut ide????");
//    }
}
