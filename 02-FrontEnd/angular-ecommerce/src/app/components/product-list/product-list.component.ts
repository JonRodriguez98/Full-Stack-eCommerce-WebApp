/*This class describes the logic behind the Product-List component. This class instantiates an array of Product objects from the 
product class. Injects ProductService (which handles API request to get JSON from database and insert them into an Array of Products)
This injection allows us to use the getProductsList() method. The data recieved from the Service is then injected into the instantiated
array of Products on line 19.*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryName!: string;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //pagination properties (controls howmany products are displayed on the webpage)
  thePageNumber: number = 1;
  thePageSize: number = 12;
  theTotalElements: number = 0;
  
  previousKeyword: string;

  //we add the dependency but also add the Activated route in order to access the route params
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  //calls method on init
  ngOnInit(): void {
    //checks if there is any changes in the url if there are execute code.
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  //defines method on initialization. This method uses the ProductService dependency that was injected through the constructor in
  //order to access the getProductList method which executes an API call to our backend service. The .subscribe to allow obersvation 
  //of the datastream
  listProducts() {

    //check if we're in search mode or not (does the method have some sort of parameter or not) If it does not have a param just display all. if it does then searchmode is true so execute the list view based on search params.
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyword != theKeyword) {
      this.thePageNumber= 1;
    } 

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    //now search products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize, theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert it to a number using the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }

    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    //
    //Check if we have different category than previous since angular will reuse a component if its currently being viewed
    
    //if the category id is different than previous. Reset pageNumber back to 1.
    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber=1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    //now get the products for the given id (Page number is -1 because Bootstrap component is 1 based while SpringDataRest is 0 based)
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
    .subscribe(this.processResult());
  

      
  }

  processResult() { 
    return data  => {
      this.products= data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
  };
  
}
}