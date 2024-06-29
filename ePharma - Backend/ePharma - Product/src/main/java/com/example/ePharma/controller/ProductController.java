package com.example.ePharma.controller;

import com.example.ePharma.data.Product;
import com.example.ePharma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @CrossOrigin
    @GetMapping(path = "/products")
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    @CrossOrigin
    @GetMapping(path = "/products/{id}")
    public Product getProductById(@PathVariable int id) {

        return productService.getProductById(id);
    }

    @CrossOrigin
    @PostMapping(path = "/products")
    public Product createProduct(@RequestBody Product product) {

        return productService.createProduct(product);
    }

    @CrossOrigin
    @PutMapping(path = "/products")
    public Product updateProduct(@RequestBody Product product) {

        return productService.updateProduct(product);
    }

    @CrossOrigin
    @DeleteMapping(path = "/products/{id}")
    public void deleteProductById(@PathVariable int id) {

        productService.deleteProductById(id);
    }

    @CrossOrigin
    @GetMapping(path = "/products", params = "name")
    public List<Product> findProductByProductName(@RequestParam String name) {
        return productService.findProductByProductName(name);
    }
    @CrossOrigin
    @GetMapping(path = "/products", params = "category")
    public List<Product> findProductByCategory(@RequestParam String category) {
        return productService.findProductByCategory(category);
    }
}
