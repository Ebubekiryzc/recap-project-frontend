import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { RentalDetailWithIndividualCustomers } from '../models/rentalDetailWithIndividualCustomers';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiURL: string = 'https://localhost:44305/api/rentals';
  constructor(private httpClient: HttpClient) {}

  getAllWithIndividualCustomerDetails(): Observable<
    ListResponseModel<RentalDetailWithIndividualCustomers>
  > {
    return this.httpClient.get<
      ListResponseModel<RentalDetailWithIndividualCustomers>
    >(`${this.apiURL}/getallwithindividualcustomerdetails`);
  }
}
