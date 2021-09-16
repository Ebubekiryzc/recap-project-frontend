import { ColorResponseModel } from './../models/colorResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiURL: string = 'https://localhost:44305/api/colors';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(`${this.apiURL}/getall`);
  }
}
