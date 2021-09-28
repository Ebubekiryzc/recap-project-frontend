import { ResponseModel } from './../models/responseModel';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from './../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiURL: string = 'https://localhost:44305/api/brands';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(
      `${this.apiURL}/getall`
    );
  }

  getById(id: number): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.get<SingleResponseModel<Brand>>(
      `${this.apiURL}/getbyid?id=${id}`
    );
  }

  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/add`, brand);
  }

  update(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/update`, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/delete`, brand);
  }
}
