import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiURL: string = 'https://localhost:44305/api/cars';
  constructor(private httpClient: HttpClient) {}

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/add`, car);
  }

  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/update`, car);
  }

  delete(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/delete`, car);
  }

  getAll(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(`${this.apiURL}/getall`);
  }

  getById(id: number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      `${this.apiURL}/getbyid?id=${id}`
    );
  }

  getAllWithDetails(): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiURL}/getcarswithdetail`
    );
  }

  getCarWithDetailsById(
    id: number
  ): Observable<SingleResponseModel<CarDetail>> {
    return this.httpClient.get<SingleResponseModel<CarDetail>>(
      `${this.apiURL}/getcarwithdetailbyid?id=${id}`
    );
  }

  getAllCarsWithDetailsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiURL}/getcarswithdetailbybrandid?brandId=${brandId}`
    );
  }

  getAllCarsWithDetailsByColorId(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiURL}/getcarswithdetailbycolorid?colorId=${colorId}`
    );
  }

  getAllCarsWithDetailsByBrandIdAndColorId(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(
      `${this.apiURL}/getcarswithdetailbybrandidandcolorid?brandId=${brandId}&colorId=${colorId}`
    );
  }
}
