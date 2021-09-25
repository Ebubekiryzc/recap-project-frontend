import { HttpClient } from '@angular/common/http';
import { IndividualCustomer } from '../models/individualCustomer';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from './../models/singleResponseModel';

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

  getById(id: number): Observable<SingleResponseModel<IndividualCustomer>> {
    return this.httpClient.get<SingleResponseModel<IndividualCustomer>>(
      `${this.apiURL}/getbyid?id=${id}`
    );
  }
}
