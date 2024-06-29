/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.emailservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author sanug
 */
@RestController
@CrossOrigin
public class EmailController {
    @Autowired private EmailService emailService;
 
    // Sending a simple Email
    @PostMapping("/emails")
    public String
    sendMailSupport(@RequestBody EmailDetails details)
    {
        String status
            = emailService.sendSimpleMailCommon(details);
 
        return status;
    }
    
    
}
