import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  
  constructor() { }

  addToCart(theCartItem: CartItem) {

    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;
    //find the item in the cart based on item id
    if(this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

       //check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++
    }
    else{
      //add the item to the array
      this.cartItems.push(theCartItem);

    }
   
    //compute total cart price and quantity

    this.computCartTotals();

  }
  computCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish these values to the subscribers

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if(theCartItem.quantity===0) {
      this.remove(theCartItem);
    }

    else{
      this.computCartTotals();
    }
  }

  remove(theCartItem:CartItem) {
    //get index of item in the array
    const itemIndex= this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);

    //remove index from array
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  }
}
