package me.matthew.bank.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import me.matthew.bank.repository.UserRepository;
import me.matthew.bank.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepo;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("request url: " + request.getRequestURI());
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtService.extractEmail(token);
                if (email == null) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }

                var user = userRepo.findByEmail(email).orElse(null);
                if (user == null || jwtService.isTokenExpired(token)) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }

                request.setAttribute("user", user);
            } catch (Exception e) {
                return false;
            }
        }
        return true;
    }
}
