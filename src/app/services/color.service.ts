import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiURL: string = 'https://localhost:44305/api/colors';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(
      `${this.apiURL}/getall`
    );
  }

  getById(id: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(
      `${this.apiURL}/getbyid?id=${id}`
    );
  }
}
