import { CarDetail } from 'src/app/models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from './../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[];

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  getCart() {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(car: CarDetail) {
    this.cartService.removeFromCart(car);
    this.toastrService.error(`${car.brandName} ${car.carName} deleted!`);
  }
}
