import { CarDetailResponseModel } from './../models/carDetailResponseModel';
import { CarResponseModel } from '../models/carResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiURL: string = 'https://localhost:44305/api/cars';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(`${this.apiURL}/getall`);
  }

  getAllWithDetails(): Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(
      `${this.apiURL}/getcarswithdetail`
    );
  }
}
