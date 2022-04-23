//This Dependency Accesses the API through the HttpClient Dependency in order to get a response from the backend server
//acquires the JSON from _embedded.products and places that JSON data into the Product array.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products?size=100";

  constructor(private httpClient: HttpClient) { }

  //Httpclient maps the JSON data from the rest API to the array of Products that is described in the Product Class.
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response => response._embedded.products)
    );
  }
}

//This interface unwraps the JSON data from _embedded.products and places it into Product Array.
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}