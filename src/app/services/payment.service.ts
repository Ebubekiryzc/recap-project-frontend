import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentQuery } from './../models/paymentQuery';
import { ResponseModel } from './../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiURL: string = 'https://localhost:44305/api/payments';
  constructor(private httpClient: HttpClient) {}

  getPayment(paymentQuery: PaymentQuery): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiURL}/getpayment`,
      paymentQuery
    );
  }
}
