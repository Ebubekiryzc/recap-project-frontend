import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiURL: string = 'https://localhost:44305/api/cars';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(`${this.apiURL}/getall`);
  }

  getAllWithDetails(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiURL}/getcarswithdetail`
    );
  }
}
