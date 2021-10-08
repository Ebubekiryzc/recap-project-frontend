import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './../models/loginModel';
import { Observable } from 'rxjs';
import { RegisterForIndividualCustomer } from './../models/registerModelForIndividualCustomer';
import { SingleResponseModel } from './../models/singleResponseModel';
import { TokenModel } from './../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = 'https://localhost:44305/api/auth';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      `${this.apiURL}/login`,
      loginModel
    );
  }

  registerIndividiualCustomer(
    registerModel: RegisterForIndividualCustomer
  ): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      `${this.apiURL}/registerindividualcustomer`,
      registerModel
    );
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
