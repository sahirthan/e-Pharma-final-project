package com.example.ePharma.service;

import com.example.ePharma.data.Order;
import com.example.ePharma.data.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        List<Order> order = orderRepository.findAll();
        return order;
    }

    public Order getOrderById(int id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.get();
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrderById(int id) {
        orderRepository.deleteById(id);
    }

    public List<Order> findOrderByUserID(int user_id) {
        return orderRepository.findOrderByUserID(user_id);
    }

}
