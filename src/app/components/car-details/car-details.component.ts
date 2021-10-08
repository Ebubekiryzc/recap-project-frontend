import { DateTimeService } from '../../services/date-time.service';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from '../../services/car.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SanitizerService } from '../../services/sanitizer.service';
import { SafeUrl } from '@angular/platform-browser';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  faCircle = faCircle;

  currentImage: CarImage;
  carImages: CarImage[] = [];
  safeURLs: SafeUrl[] = [];
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

  setDetailImageClass(): string {
    if (this.carImages.length == 1) {
      return 'detail-image not-hidden';
    } else {
      return 'detail-image';
    }
  }

  getCarDetails(carId: number): void {
    this.carService.getCarWithDetailsById(carId).subscribe((response) => {
      this.carInfo = response.data;
      this.carLoaded = true;
    });
  }

  getCarImages(carId: number): void {
    this.imageService.getByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.translateToTrusted();
      this.imagesLoaded = true;
      if (this.imagesLoaded) {
        this.currentImage = this.carImages[0];
      }
    });
  }

  getCurrentCarImageURL(): SafeUrl {
    return this.sanitizer.sanitizeURL(this.currentImage.imagePath);
  }

  getCarImageURL(carImage: CarImage): SafeUrl {
    return this.sanitizer.sanitizeURL(carImage.imagePath);
  }

  getCurrentImageClass(image: CarImage): string {
    return this.currentImage === image
      ? 'carousel-item active'
      : 'carousel-item';
  }

  translateToTrusted() {
    for (let index = 0; index < this.carImages.length; index++) {
      this.safeURLs.push(this.getCarImageURL(this.carImages[index]));
    }
  }

  getSelectedImage(path: string) {
    if (path.startsWith('Safe')) {
      path = path.split('binding: ')[1];
      path = path.split('(see')[0];
    }
    if (this.currentImage) {
      this.currentImage.imagePath = path;
    }
  }

  getDatetimeNow(): string {
    return this.dateTimeService.getTodayWithTime();
  }

  addToCart(): void {}
}
