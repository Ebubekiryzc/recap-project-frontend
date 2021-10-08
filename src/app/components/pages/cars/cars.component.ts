import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Car } from 'src/app/models/car';
import { CarDetail } from './../../../models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from './../../../services/car-image.service';
import { CarService } from './../../../services/car.service';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  carThumbnails: CarImage[] = [];
  cars: Car[];
  brands: Brand[] = [];
  colors: Color[] = [];

  carsWithDetails: CarDetail[];

  carsLoaded: boolean = false;
  childComponentColorsLoaded: boolean = false;

  filterBrandId: number = -1;
  filterColorId: number = -1;
  filterCarModelName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private carService: CarService,
    private carImageService: CarImageService,
    private colorService: ColorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId'])
        this.getAllCarsWithDetailsByFilter(
          params['brandId'],
          params['colorId']
        );
      else if (params['brandId'])
        this.getAllCarsWithDetailsByBrandId(params['brandId']);
      else if (params['colorId'])
        this.getAllCarsWithDetailsByColorId(params['colorId']);
      else this.getAllCarsWithDetails();
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
    if (brandId == -1 && colorId == -1) {
      this.getAllCarsWithDetails();
    } else if (brandId != -1) {
      this.getAllCarsWithDetailsByBrandId(brandId);
    } else if (colorId != -1) {
      this.getAllCarsWithDetailsByColorId(colorId);
    } else {
      this.carService
        .getAllCarsWithDetailsByBrandIdAndColorId(brandId, colorId)
        .subscribe((response) => {
          this.carsWithDetails = response.data;
          this.isCarsLoaded();
        });
    }
  }

  removeFilters(): void {
    this.getAllCarsWithDetails();
    this.filterBrandId = -1;
    this.filterColorId = -1;
  }

  getBrands() {
    this.brandService.getAll().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
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

  isCarsLoaded(): void {
    this.carsLoaded = true;
    if (this.carsLoaded) this.setCarThumbnails();
  }
}
