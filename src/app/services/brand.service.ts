import { BrandResponseModel } from './../models/brandResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiURL: string = 'https://localhost:44305/api/brands';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(`${this.apiURL}/getall`);
  }
}
