//This Dependency Accesses the API through the HttpClient Dependency in order to get a response from the backend server
//acquires the JSON from _embedded.products and places that JSON data into the Product array.

import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  



  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = 'http://localhost:8080/api/product-category';
 

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {

    //need to build new URL based on category Id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  //Httpclient maps the JSON data from the rest API to the array of Products that is described in the Product Class.
  getProductList(theCategoryId: number): Observable<Product[]> {

    //need to build new URL based on category Id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getProducts(searchUrl);

  }
  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {

    //need to build new URL based on category Id
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products)
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    //need to build URL based on product id
    const productUrl= `${this.baseUrl}/${theProductId}`

    return this.httpClient.get<Product>(productUrl);
  }
}

//This interface unwraps the JSON data from _embedded.products and places it into Product Array.
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }


}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
