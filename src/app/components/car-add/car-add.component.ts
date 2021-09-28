import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Car } from 'src/app/models/car';
import { CarService } from './../../services/car.service';
import { Color } from 'src/app/models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { DateTimeService } from './../../services/date-time.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss'],
})
export class CarAddComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  carAddForm: FormGroup;
  selectedBrandId: number = -1;
  selectedColorId: number = -1;

  responseLoaded: boolean = false;

  constructor(
    private brandService: BrandService,
    private carService: CarService,
    private colorService: ColorService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getAllBrands();
    this.getAllColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      //TODO: model name eklenebilir. updatei ve color update, delete yazmadım.
      description: ['', Validators.required],
      modelYear: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1960),
          Validators.max(parseInt(this.getYear())),
        ]),
      ],
      colorId: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      dailyPrice: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  add(): void {
    if (this.carAddForm.valid) {
      let carModel: Car = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success!');
          this.responseLoaded = true;
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 300);
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors.ErrorMessage[i],
                'Validation Error!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form not valid!');
    }
  }

  getAllBrands(): void {
    this.brandService.getAll().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getAllColors(): void {
    this.colorService.getAll().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getYear(): string {
    return this.dateTimeService.getCurrentYear();
  }

  backToList() {
    this.router.navigate(['cars/list']).then(() => {
      window.location.reload();
    });
  }
}
