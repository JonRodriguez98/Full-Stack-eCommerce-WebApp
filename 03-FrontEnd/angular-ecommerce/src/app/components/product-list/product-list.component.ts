/*This class describes the logic behind the Product-List component. This class instantiates an array of Product objects from the 
product class. Injects ProductService (which handles API request to get JSON from database and insert them into an Array of Products)
This injection allows us to use the getProductsList() method. The data recieved from the Service is then injected into the instantiated
array of Products on line 19.*/



import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService) { }

  //calls method on init
  ngOnInit(): void {
    this.listProducts();
  }

  //defines method on initialization. This method uses the ProductService dependency that was injected through the constructor in
  //order to access the getProductList method which executes an API call to our backend service. The .subscribe to allow obersvation 
  //of the datastream
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
