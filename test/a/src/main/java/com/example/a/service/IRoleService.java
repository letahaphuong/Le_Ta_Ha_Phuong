package com.example.a.service;

import com.example.a.model.Role;
import com.example.a.model.RoleName;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(RoleName roleName);
}
