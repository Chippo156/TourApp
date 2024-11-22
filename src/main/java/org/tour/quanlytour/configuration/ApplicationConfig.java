package org.tour.quanlytour.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationConfig {
    PasswordEncoder passwordEncoder;
}
