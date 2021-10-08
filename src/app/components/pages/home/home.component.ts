import { CarDetail } from './../../../models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from './../../../services/car-image.service';
import { CarService } from './../../../services/car.service';
import { DateTimeService } from './../../../services/date-time.service';
import { Component, OnInit } from '@angular/core';
import {
  faCalendarCheck,
  faSignInAlt,
  faCalendarPlus,
  faStar,
  faStarHalf,
} from '@fortawesome/free-solid-svg-icons';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faCalendarCheck = faCalendarCheck;
  faCalendarPlus = faCalendarPlus;
  faStar = faStar;
  faStarHalf = faStarHalf;

  carsWithDetails: CarDetail[] = [];
  carThumbnails: CarImage[] = [];
  carsLoaded: boolean = false;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private dateTimeService: DateTimeService,
  ) {}

  ngOnInit(): void {
    this.getTopSaleCars();
  }

  getTopSaleCars(): void {
    this.carService.getTopSaleCarDetails().subscribe((response) => {
      this.carsWithDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getCarThumbnailByCarId(carId: number): void {
    this.carImageService.getByCarId(carId).subscribe((response) => {
      this.carThumbnails.push(response.data[0]);
    });
  }

  setCarThumbnails(): void {
    this.carsWithDetails.forEach((c) => {
      this.getCarThumbnailByCarId(c.carId);
    });
  }

  getCarThumbnailURL(carId: number): SafeUrl {
    let imagePath: string = '';
    this.carThumbnails.forEach((image) => {
      if (image.carId === carId) {
        imagePath = image.imagePath;
      }
    });
    return imagePath;
  }

  getCurrentDay(): string {
    return this.dateTimeService.getTodayWithTime();
  }

  addDayToCurrentDay(): string {
    return this.dateTimeService.addDayToDate(this.getCurrentDay(), 1);
  }

  isCarsLoaded(): void {
    this.carsLoaded = true;
    if (this.carsLoaded) this.setCarThumbnails();
  }
}
