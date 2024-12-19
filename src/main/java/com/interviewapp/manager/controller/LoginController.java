package com.interviewapp.manager.controller;

import com.interviewapp.manager.domain.User;
import com.interviewapp.manager.repository.MemoryUserRepository;
import com.interviewapp.manager.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController{

    private final UserRepository userRepository = new MemoryUserRepository();

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestParam String username, @RequestParam String password, HttpServletResponse response) {
        try {
            User user = userRepository.isUser(username, password);

            Cookie cookie = new Cookie("username", username);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok("로그인 성공: " + user.getUserName());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: " + e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestParam String username, @RequestParam String password) {
        if (userRepository.duplicatedUserName(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 사용자 이름입니다.");
        }
        User user = userRepository.createUser(username, password);

        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공: " + user.getUserName());
    }
}