import { Component, OnInit } from '@angular/core';
import { RentalDetailWithIndividualCustomers } from 'src/app/models/rentalDetailWithIndividualCustomers';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
})
export class RentalComponent implements OnInit {
  rentalsWithIndividualCustomerDetails: RentalDetailWithIndividualCustomers[] =
    [];
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getAllWithIndividualCustomerDetails();
  }

  getAllWithIndividualCustomerDetails() {
    this.rentalService
      .getAllWithIndividualCustomerDetails()
      .subscribe((response) => {
        this.rentalsWithIndividualCustomerDetails = response.data;
      });
  }
}
