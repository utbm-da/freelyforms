package com.utbm.da50.freelyform.service;


import com.utbm.da50.freelyform.dto.user.UpdateUserRequest;
import com.utbm.da50.freelyform.dto.user.UserSimpleResponse;
import com.utbm.da50.freelyform.model.User;
import com.utbm.da50.freelyform.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    // Business logic in service
    private final UserRepository userRepository;

    // Dependency injection with auto-wiring
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // Returns all the users
    public List<UserSimpleResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(User::toUserSimpleResponse)
                .toList();
    }


}
