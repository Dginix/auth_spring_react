package com.auth_spring_react.server.model;

import com.auth_spring_react.server.dto.UserRequest;
import org.assertj.core.util.Sets;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @Test
    void toUserFromUserRequest() {
        UserRequest userRequest = UserRequest.builder()
                .username("Vasya111")
                .email("blabla@gmail.com")
                .password("aasdasdad123123")
                .authority(Set.of("ADMIN", "USER"))
                .build();

        User user = User.toUserFromUserRequest(userRequest);
    }
}