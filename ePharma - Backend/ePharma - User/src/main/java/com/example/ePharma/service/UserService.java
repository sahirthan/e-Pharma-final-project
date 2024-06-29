package com.example.ePharma.service;

import com.example.ePharma.data.User;
import com.example.ePharma.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Get all user details
    public List<User> getAllUser() {
        List<User> user = userRepository.findAll();
        return user;
    }

    // add new user
    public User addUser(User user){return  userRepository.save(user);}

    // get user details using user id
    public User getUserByID(int id){
        Optional<User> user=userRepository.findById(id);
        return user.get();
    }
}
