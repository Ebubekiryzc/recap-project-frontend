import { SingleResponseModel } from './../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL: string = 'https://localhost:44305/api/users';
  constructor(private httpClient: HttpClient) {}

  getByMail(mail: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      `${this.apiURL}/getbymail?mail=${mail}`
    );
  }
}
