package com.auth_spring_react.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.auth_spring_react.server.model.User;

public interface UserRepository extends JpaRepository<Long, User> {

}
