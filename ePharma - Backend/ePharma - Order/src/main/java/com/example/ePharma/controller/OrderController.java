package com.example.ePharma.controller;

import com.example.ePharma.data.Order;
import com.example.ePharma.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @CrossOrigin
    @GetMapping(path = "/orders")
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @CrossOrigin
    @GetMapping(path = "/orders/{id}")
    public Order getOrderById(@PathVariable int id) {

        return orderService.getOrderById(id);
    }

    @CrossOrigin
    @PostMapping(path = "/orders")
    public Order createOrder(@RequestBody Order order) {

        return orderService.createOrder(order);
    }
    @CrossOrigin
    @PutMapping(path = "/orders")
    public Order updateOrder(@RequestBody Order order) {

        return orderService.updateOrder(order);
    }

    @CrossOrigin
    @DeleteMapping(path = "/orders/{id}")
    public void deleteOrderById(@PathVariable int id) {

        orderService.deleteOrderById(id);
    }

    @CrossOrigin
    @GetMapping(path = "/orders", params = "user_id")
    public List<Order> findOrderByUserID(@RequestParam int user_id) {
        return orderService.findOrderByUserID(user_id);
    }
}
