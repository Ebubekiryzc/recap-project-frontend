import { DateTimeService } from './../../services/date-time.service';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { SanitizerService } from './../../services/sanitizer.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  currentImage: CarImage;
  carImages: CarImage[] = [];
  carInfo: CarDetail;
  imagesLoaded: boolean = false;
  carLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private imageService: CarImageService,
    private sanitizer: SanitizerService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImages(params['carId']);
      }
    });
    
  }

  getCarImages(carId: number): void {
    this.imageService.getByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.imagesLoaded = true;
      if (this.imagesLoaded) {
        this.currentImage = this.carImages[0];
      }
    });
  }

  getCarDetails(carId: number): void {
    this.carService.getCarWithDetailsById(carId).subscribe((response) => {
      this.carInfo = response.data;
      this.carLoaded = true;
    });
  }

  getCarImageURL(carImage: CarImage): SafeUrl {
    return this.sanitizer.sanitizeURL(carImage.imagePath);
  }

  getCurrentImageClass(image: CarImage): string {
    return this.currentImage === image
      ? 'carousel-item active'
      : 'carousel-item';
  }

  getPreviousImage(): void {
    let indexOfCurrent = this.carImages.indexOf(this.currentImage);
    indexOfCurrent === 0
      ? (this.currentImage = this.carImages[this.carImages.length - 1])
      : (this.currentImage = this.carImages[indexOfCurrent - 1]);
  }

  getNextImage(): void {
    let indexOfCurrent = this.carImages.indexOf(this.currentImage);
    indexOfCurrent === this.carImages.length - 1
      ? (this.currentImage = this.carImages[0])
      : (this.currentImage = this.carImages[indexOfCurrent + 1]);
  }

  getDatetimeNow(): string {
    return this.dateTimeService.getTodayWithTime();
  }

  addToCart(): void {}
}
