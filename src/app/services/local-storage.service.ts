import { IndividualCustomer } from './../models/individualCustomer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }

  clean(): void {
    localStorage.clear();
  }

  getEmail(): string {
    return this.get('email');
  }

  getToken(): string {
    return this.get('token');
  }

  setEmail(email: string) {
    return localStorage.setItem('email', email);
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  setIndividualCustomerDetails(individualCustomer: IndividualCustomer) {
    return localStorage.setItem(
      'individual-customer-details',
      JSON.stringify(individualCustomer)
    );
  }

  getIndividualCustomerDetails() {
    return JSON.parse(localStorage.getItem('individual-customer-details'));
  }
}
