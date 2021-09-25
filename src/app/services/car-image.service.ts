import { CarImage } from '../models/carImage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private apiURL: string = 'https://localhost:44305/api/carimages';
  constructor(private httpClient: HttpClient) {}

  getByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(
      `${this.apiURL}/getbycarid?id=${carId}`
    );
  }
}
