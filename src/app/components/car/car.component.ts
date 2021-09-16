import { Car } from './../../models/car';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsWithDetails: CarDetail[] = [];
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getAllCarsWithDetails();
  }

  getAll() {
    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getAllCarsWithDetails() {
    this.carService.getAllWithDetails().subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }
}
