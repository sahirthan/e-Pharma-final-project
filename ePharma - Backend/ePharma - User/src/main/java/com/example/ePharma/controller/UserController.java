package com.example.ePharma.controller;

import com.example.ePharma.data.User;
import com.example.ePharma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    @Autowired
    private UserService userService;

    // Get all user data
    @CrossOrigin
    @GetMapping(path = "/users")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    // crate new user
    @CrossOrigin
    @PostMapping(path = "/users")
    public User adUser(@RequestBody User user){return  userService.addUser(user);}

    // Get user details using user id
    @CrossOrigin
    @GetMapping(path = "/users/{id}")
    public User getUserByID(@PathVariable int id){
        return userService.getUserByID(id);
    }
}
