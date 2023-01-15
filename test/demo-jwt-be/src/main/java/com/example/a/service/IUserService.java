package com.example.a.service;

import com.example.a.model.Users;

import java.util.Optional;

public interface IUserService {
    Optional<Users> findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    Users save(Users users);
}
