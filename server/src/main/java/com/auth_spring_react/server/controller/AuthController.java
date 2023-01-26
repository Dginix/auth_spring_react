package com.auth_spring_react.server.controller;

import com.auth_spring_react.server.dto.UserRequest;
import com.auth_spring_react.server.dto.UserResponse;
import com.auth_spring_react.server.model.User;
import com.auth_spring_react.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.Instant;

import static java.lang.String.format;
import static java.util.stream.Collectors.joining;

@RestController
@RequestMapping(path = "api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtEncoder jwtEncoder;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtEncoder jwtEncoder, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.userService = userService;
    }

    @PostMapping("login")
    public ResponseEntity<UserResponse> login(@RequestBody @Valid UserRequest request) {
        try {
            var authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            var user = (User) authentication.getPrincipal();

            var now = Instant.now();
            var expiry = 36000L;

            var scope =
                    authentication.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(joining(" "));

            var claims =
                    JwtClaimsSet.builder()
                            .issuer("example.io")
                            .issuedAt(now)
                            .expiresAt(now.plusSeconds(expiry))
                            .subject(format("%s,%s", user.getId(), user.getUsername()))
                            .claim("roles", scope)
                            .build();

            var token = this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(UserResponse.toUserResponseFromUser(user));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public UserResponse register(@RequestBody @Valid UserRequest request) {
        return userService.createUser(request);
    }
}
