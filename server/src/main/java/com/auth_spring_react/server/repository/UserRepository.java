package com.auth_spring_react.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.auth_spring_react.server.model.User;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existByUsername(String username);


}
