package com.example.a.controller;

import com.example.a.dto.request.SignInForm;
import com.example.a.dto.request.SignUpForm;
import com.example.a.dto.response.JwtResponse;
import com.example.a.dto.response.ResponseMessage;
import com.example.a.model.Role;
import com.example.a.model.RoleName;
import com.example.a.model.Users;
import com.example.a.security.jwt.JwtProvider;
import com.example.a.security.userprincal.UserPrinciple;
import com.example.a.service.impl.RoleService;
import com.example.a.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RequestMapping("/api")
@RestController
@CrossOrigin("*")
public class SecurityController {
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtProvider jwtProvider;

    @PostMapping(value = "/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignUpForm signUpForm) {
        if (userService.existsByUsername(signUpForm.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("The username is existed"), HttpStatus.OK);
        }
        if (userService.existsByEmail(signUpForm.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("The email is existed"), HttpStatus.OK);
        }
        Users users = new Users(signUpForm.getName(), signUpForm.getUsername(), signUpForm.getEmail(), passwordEncoder.encode(signUpForm.getPassword()));
        Set<String> strRole = signUpForm.getRoles();
        Set<Role> roles = new HashSet<>();
        strRole.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleService.findByName(RoleName.ADMIN).orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(adminRole);
                    break;
                case "employee":
                    Role employeeRole = roleService.findByName(RoleName.EMPLOYEE).orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(employeeRole);
                    break;
                default:
                    Role customerRole = roleService.findByName(RoleName.CUSTOMER).orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(customerRole);
            }
        });
        users.setRoles(roles);
        userService.save(users);
        return new ResponseEntity<>(new ResponseMessage("Create success!"),HttpStatus.OK);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<?> login(@Valid @RequestBody SignInForm signInForm){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.getUsername(),signInForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 77 tạo token
        String token= jwtProvider.createToken(authentication);
        UserPrinciple userPrinciple= (UserPrinciple) authentication.getPrincipal();// lấy user ra
        return ResponseEntity.ok(new JwtResponse(token,userPrinciple.getName(),userPrinciple.getAuthorities()));
    }

}
