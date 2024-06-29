package com.example.ePharma.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query("select p from Product p where p.name=?1")
    List<Product> findProductByProductName(String name);

    @Query("select p from Product p where p.category=?1")
    List<Product> findProductByCategory(String category);

}
