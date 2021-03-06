import { CarDetail } from 'src/app/models/carDetail';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car: CarDetail) {
    let item = CartItems.find((c) => c.car.carId === car.carId);
    if (item) {
      item.dayCount += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.dayCount = 1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car: CarDetail) {
    let item: CartItem = CartItems.find(
      (c) => c.car.carId === car.carId
    );
    if (item.dayCount > 1) {
      item.dayCount -= 1;
    } else {
      CartItems.splice(CartItems.indexOf(item), 1);
    }
  }

  list(): CartItem[] {
    return CartItems;
  }
  
}
