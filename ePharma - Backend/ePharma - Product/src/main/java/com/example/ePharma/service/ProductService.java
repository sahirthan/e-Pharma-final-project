package com.example.ePharma.service;

import com.example.ePharma.data.Product;
import com.example.ePharma.data.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        List<Product> product = productRepository.findAll();
        return product;
    }
    public Product getProductById(int id) {
        Optional<Product> product = productRepository.findById(id);
        return product.get();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProductById(int id) {
        productRepository.deleteById(id);
    }

    public List<Product> findProductByProductName(String name) {
        return productRepository.findProductByProductName(name) ;
    }

    public List<Product> findProductByCategory(String category) {
        return productRepository.findProductByCategory(category) ;
    }
}
