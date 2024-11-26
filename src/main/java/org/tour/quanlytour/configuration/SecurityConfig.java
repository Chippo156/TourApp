package org.tour.quanlytour.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private String[] getPublicEndpoints() {
        return new String[]{
                endpoint + "/users/registration",
                endpoint + "/auth/token",
                endpoint + "/auth/logout",
                endpoint + "/auth/introspect",
                endpoint + "/auth/refresh",
                endpoint + "/users/registration",
                endpoint + "/**",
        };
    }
    private String[] methodGet() {
        return new String[]{
                endpoint + "/destinations",
                endpoint + "/destinations/*",
                endpoint + "/amenities",
                endpoint +"/**"
        };
    }
    @Autowired
    private CustomJwtDecoder customJwtDecoder;

    @Value("${api.prefix}")
    private String endpoint;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request -> {
            request.requestMatchers(HttpMethod.POST, getPublicEndpoints()
                    )
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, methodGet()).permitAll()
                    .requestMatchers(HttpMethod.PUT).permitAll()
                    .requestMatchers(HttpMethod.DELETE).permitAll()
                    .requestMatchers("/api/v1/cloudinary/upload").permitAll()
                    .anyRequest()
                    .authenticated();
        });
        http.oauth2ResourceServer(oauth2 -> {
            oauth2.jwt(jwtConfigurer -> jwtConfigurer
                    .decoder(customJwtDecoder)
                    .jwtAuthenticationConverter(jwtAuthenticationConverter()));
        });
        http.csrf(AbstractHttpConfigurer::disable);

        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("*"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                configuration.setAllowedHeaders(Arrays.asList("authorization", "x-auth-token", "content-type"));
                configuration.setExposedHeaders(List.of("x-auth-token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });
        return http.build();
    }
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
