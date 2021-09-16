import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailWithIndividualCustomersResponseModel } from './../models/rentalDetailWithIndividualCustomersResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiURL: string = 'https://localhost:44305/api/rentals';
  constructor(private httpClient: HttpClient) {}

  getAllWithIndividualCustomerDetails(): Observable<RentalDetailWithIndividualCustomersResponseModel> {
    return this.httpClient.get<RentalDetailWithIndividualCustomersResponseModel>(
      `${this.apiURL}/getallwithindividualcustomerdetails`
    );
  }
}
