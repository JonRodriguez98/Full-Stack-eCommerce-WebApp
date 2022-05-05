package com.luv2code.ecommerce.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.ecommerce.model.Product;
@CrossOrigin("http://localhost:4200")
public interface ProductRepository  extends JpaRepository<Product, Long>{
	//THIS ADDS A NEW ENDPOINT AUTOMATICALLY (THANKS TO SPRING DATA REST) SO NOW WHEN YOU TYPE DEFAULT API ENDPOINT OF /products
	//THIS ADDS NEW ENDPOINT OF /search/findByCategoryId?id=1 the default was established to be 1 but you can replace the number to find the different category ids.
Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

//SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%') Takes in a string parameter from the front end. Uses that name to find a products that match the query.
Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
