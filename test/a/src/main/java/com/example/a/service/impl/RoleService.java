package com.example.a.service.impl;

import com.example.a.model.Role;
import com.example.a.model.RoleName;
import com.example.a.repository.IRoleRepository;
import com.example.a.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    IRoleRepository roleRepository;
    @Override
    public Optional<Role> findByName(RoleName name) {
        return roleRepository.findByName(name);
    }
}
