package com.luv2code.ecommerce.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.model.Product;
@CrossOrigin("http://localhost:4200")
public interface ProductRepository  extends JpaRepository<Product, Long>{

}
