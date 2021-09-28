import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
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

  add(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/add`, color);
  }

  update(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/update`, color);
  }

  delete(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiURL}/delete`, color);
  }
}
