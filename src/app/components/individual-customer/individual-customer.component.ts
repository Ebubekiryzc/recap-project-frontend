import { IndividualCustomerService } from './../../services/individual-customer.service';
import { IndividualCustomer } from './../../models/individualCustomer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.scss'],
})
export class IndividualCustomerComponent implements OnInit {
  individualCustomers: IndividualCustomer[] = [];
  dataLoaded: boolean = false;

  constructor(private individualCustomerService: IndividualCustomerService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.individualCustomerService.getAll().subscribe((response) => {
      this.individualCustomers = response.data;
    });
  }
}
