/*
 * This class lays out the Model layout of the products table
 */
package com.luv2code.ecommerce.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Data //Lombok automatically creates getters and Setters
@Table (name="product")
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name="id")
		private Long id;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable=false)
	private ProductCategory category;
	
	@Column (name="sku")
		private String sku;
	@Column (name="name")
		private String name;
	@Column (name="description")
		private String descripion;
	@Column (name="unit_price")
		private BigDecimal unitPrice;
	@Column (name="image_url")
		private String imageUrl;
	@Column (name="active")
		private boolean active;
	@Column (name="units_in_stock")
		private int unitsInStock;
	@Column (name="date_created")
	@CreationTimestamp 					//Hibernate automatically Manages Creation and Update times in the background
		private Date dateCreated;
	@Column (name="last_updated")
	@UpdateTimestamp
		private Date lastUpdated;
	
	
	

}
