import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualCustomer } from '../models/individualCustomer';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndividualCustomerService {
  private apiURL: string = 'https://localhost:44305/api/individual-customers';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<IndividualCustomer>> {
    return this.httpClient.get<ListResponseModel<IndividualCustomer>>(
      `${this.apiURL}/getall`
    );
  }
}
