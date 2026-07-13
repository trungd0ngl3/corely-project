package com.corely.corely_backend.service;

import com.corely.corely_backend.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class MailService {

    JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    String frontendUrl;

    public void sendVerificationMail(User user, String token) {
        String link = frontendUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify your Corely account");
        message.setText("""
                Welcome to Corely.

                Click link below to verify your account.

                %s

                This link expires in 15 minutes.
                """.formatted(link));

        mailSender.send(message);
    }
}