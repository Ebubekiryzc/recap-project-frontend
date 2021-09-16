import { HttpClient } from '@angular/common/http';
import { IndividualCustomerResponseModel } from './../models/individualCustomerResponseModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndividualCustomerService {
  private apiURL: string = 'https://localhost:44305/api/individual-customers';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IndividualCustomerResponseModel> {
    return this.httpClient.get<IndividualCustomerResponseModel>(
      `${this.apiURL}/getall`
    );
  }
}
