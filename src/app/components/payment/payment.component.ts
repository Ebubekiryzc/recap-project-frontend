import { CartItems } from 'src/app/models/cartItems';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentQuery } from './../../models/paymentQuery';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cartItems = CartItems;
  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  getPayment(paymentQuery?: PaymentQuery) {
    this.toastrService.success('Payment Successful.');
  }
}
