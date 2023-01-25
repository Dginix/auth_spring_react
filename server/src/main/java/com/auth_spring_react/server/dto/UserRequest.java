package com.auth_spring_react.server.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
public class UserRequest {
    private String username;
    private String email;
    private String password;

    private Set<String> authority;

    public UserRequest(String username, String email, String password, Set<String> authority) {
        this.username = username;
        this.email = email;
        this.password = password;

        if (authority == null) {
            authority = new HashSet<>();
        }
        else {
            this.authority = authority;
        }
    }

    public UserRequest(String username, String email, String password) {
        this(username, email, password, new HashSet<>());
    }
}
