import { Router } from '@angular/router';
import { CarDetail } from './../../models/carDetail';
import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() carDetail: CarDetail;
  @Input() carImageURL: SafeUrl;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCarDetails(): void {
    this.router.navigateByUrl(`/cars/details/${this.carDetail.carId}`);
  }
}
