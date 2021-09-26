import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiURL: string = 'https://localhost:44305/api/payments';
  constructor(private httpClient: HttpClient) {}
}
