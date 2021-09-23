import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';

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
}
