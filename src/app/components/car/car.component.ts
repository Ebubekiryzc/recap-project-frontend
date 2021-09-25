import { ActivatedRoute } from '@angular/router';
import { Car } from './../../models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { SanitizerService } from './../../services/sanitizer.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  carThumbnails: CarImage[] = [];
  cars: Car[];
  carsWithDetails: CarDetail[];
  carWithDetails: CarDetail;

  carsLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService,
    private sanitizer: SanitizerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params['brandId'] && params['colorId']
        ? this.getAllCarsWithDetailsByFilter(
            params['brandId'],
            params['colorId']
          )
        : params['brandId']
        ? this.getAllCarsWithDetailsByBrandId(params['brandId'])
        : params['colorId']
        ? this.getAllCarsWithDetailsByColorId(params['colorId'])
        : this.getAllCarsWithDetails();
    });
  }

  getAll(): void {
    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getAllCarsWithDetails(): void {
    this.carService.getAllWithDetails().subscribe((response) => {
      this.carsWithDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getCarWithDetailsByCarId(id: number): void {
    this.carService.getCarWithDetailsById(id).subscribe((response) => {
      this.carWithDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getAllCarsWithDetailsByBrandId(brandId: number): void {
    this.carService
      .getAllCarsWithDetailsByBrandId(brandId)
      .subscribe((response) => {
        this.carsWithDetails = response.data;
        this.isCarsLoaded();
      });
  }

  getAllCarsWithDetailsByColorId(colorId: number): void {
    this.carService
      .getAllCarsWithDetailsByColorId(colorId)
      .subscribe((response) => {
        this.carsWithDetails = response.data;
        this.isCarsLoaded();
      });
  }

  getAllCarsWithDetailsByFilter(brandId: number, colorId: number): void {
    this.carService
      .getAllCarsWithDetailsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
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
    return this.sanitizer.sanitizeURL(imagePath);
  }

  isCarsLoaded(): void {
    this.carsLoaded = true;
    if (this.carsLoaded) this.setCarThumbnails();
  }
}
