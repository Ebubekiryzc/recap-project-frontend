import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from './../../models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss'],
})
export class BrandUpdateComponent implements OnInit {
  updateForm: FormGroup;
  brand: Brand;

  brandLoaded: boolean = false;
  responseLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getById(params['brandId']);
      }
    });
  }

  getById(brandId: number): void {
    this.brandService.getById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandLoaded = true;
    });
  }

  createUpdateForm(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  update(): void {
    if (this.updateForm.valid) {
      let brandModel: Brand = Object.assign({}, this.updateForm.value);
      brandModel.id = this.brand.id;
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success!');
          this.responseLoaded = true;
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        },
        (responseError) => {
          if (!responseError.error.Errors) {
            this.toastrService.error(
              responseError.error.ErrorMessage,
              'Error!'
            );
          } else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Invalid form information.', 'Error!');
    }
  }

  backToList() {
    this.router.navigate(['brands/list']).then(() => {
      window.location.reload();
    });
  }
}
